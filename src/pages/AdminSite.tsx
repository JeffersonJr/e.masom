import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import {
    Loader2, Check, Upload, Palette, Type, Info,
    ExternalLink, AlertCircle, Search, BarChart2, Tag,
} from 'lucide-react';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground pl-1">{label}</label>
            {children}
            {hint && <p className="text-[10px] text-muted-foreground/50 pl-1">{hint}</p>}
        </div>
    );
}

function Input({ value, onChange, placeholder, type = 'text', maxLength, readOnly }: {
    value: string; onChange?: (v: string) => void; placeholder?: string;
    type?: string; maxLength?: number; readOnly?: boolean;
}) {
    return (
        <input
            type={type}
            maxLength={maxLength}
            readOnly={readOnly}
            value={value}
            onChange={e => onChange?.(e.target.value)}
            placeholder={placeholder}
            className={`w-full bg-background border border-border rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent/40 transition font-medium text-primary text-sm ${readOnly ? 'opacity-60 cursor-not-allowed' : ''}`}
        />
    );
}

const TAB_CLASSES = {
    active: 'border-b-2 border-accent text-primary font-black',
    inactive: 'text-muted-foreground hover:text-primary border-b-2 border-transparent',
};

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AdminSite() {
    const { profile } = useAuth();
    const [activeTab, setActiveTab] = useState<'identidade' | 'aparencia' | 'seo' | 'contato'>('identidade');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState('');
    const [potencia, setPotencia] = useState<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [logoFile, setLogoFile] = useState<File | null>(null);

    const [form, setForm] = useState({
        // Identidade
        nome: '', sigla: '', slug: '', descricao: '', fundacao: '',
        // Aparência
        corPrimaria: '#1e3a5f', corAcento: '#b48228', fontFamily: 'Inter',
        // SEO
        seoTitle: '', seoDescription: '', seoKeywords: '',
        gtmId: '', gaId: '', fbPixelId: '', robotsTxt: 'index, follow',
        ogImage: '', canonicalUrl: '',
        // Contato
        email: '', telefone: '', whatsapp: '', endereco: '', cidade: '', estado: '', cep: '',
    });

    const set = (k: keyof typeof form) => (v: string) => setForm(f => ({ ...f, [k]: v }));

    useEffect(() => {
        if (!profile?.potencia_id) return;
        supabase
            .from('potencias')
            .select('*')
            .eq('id', profile.potencia_id)
            .single()
            .then(({ data }) => {
                if (!data) return;
                setPotencia(data);
                setLogoPreview(data.logo_url || null);
                const cfg = (data.configuracoes_json as any) || {};
                setForm({
                    nome: data.nome || '',
                    sigla: data.sigla || '',
                    slug: data.slug || '',
                    descricao: data.descricao || '',
                    fundacao: cfg.fundacao || '',
                    corPrimaria: cfg.corPrimaria || '#1e3a5f',
                    corAcento: cfg.corAcento || '#b48228',
                    fontFamily: cfg.fontFamily || 'Inter',
                    seoTitle: cfg.seoTitle || data.nome || '',
                    seoDescription: cfg.seoDescription || data.descricao || '',
                    seoKeywords: cfg.seoKeywords || '',
                    gtmId: cfg.gtmId || '',
                    gaId: cfg.gaId || '',
                    fbPixelId: cfg.fbPixelId || '',
                    robotsTxt: cfg.robotsTxt || 'index, follow',
                    ogImage: cfg.ogImage || data.logo_url || '',
                    canonicalUrl: cfg.canonicalUrl || '',
                    email: cfg.email || '',
                    telefone: cfg.telefone || '',
                    whatsapp: cfg.whatsapp || '',
                    endereco: cfg.endereco || '',
                    cidade: cfg.cidade || '',
                    estado: cfg.estado || '',
                    cep: cfg.cep || '',
                });
                setLoading(false);
            });
    }, [profile?.potencia_id]);

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) { setError('Logo deve ter no máximo 2 MB.'); return; }
        setLogoFile(file);
        const reader = new FileReader();
        reader.onload = (ev) => setLogoPreview(ev.target?.result as string);
        reader.readAsDataURL(file);
    };

    const handleSave = async () => {
        if (!potencia) return;
        setSaving(true);
        setError('');
        try {
            let logo_url = potencia.logo_url;
            if (logoFile) {
                const ext = logoFile.name.split('.').pop();
                const path = `potencias/${potencia.id}/logo.${ext}`;
                const { error: upErr } = await supabase.storage.from('logos').upload(path, logoFile, { upsert: true });
                if (upErr) throw upErr;
                const { data: urlData } = supabase.storage.from('logos').getPublicUrl(path);
                logo_url = urlData.publicUrl;
            }

            const cfg = {
                ...((potencia.configuracoes_json as any) || {}),
                fundacao: form.fundacao,
                corPrimaria: form.corPrimaria,
                corAcento: form.corAcento,
                fontFamily: form.fontFamily,
                seoTitle: form.seoTitle,
                seoDescription: form.seoDescription,
                seoKeywords: form.seoKeywords,
                gtmId: form.gtmId,
                gaId: form.gaId,
                fbPixelId: form.fbPixelId,
                robotsTxt: form.robotsTxt,
                ogImage: form.ogImage,
                canonicalUrl: form.canonicalUrl,
                email: form.email,
                telefone: form.telefone,
                whatsapp: form.whatsapp,
                endereco: form.endereco,
                cidade: form.cidade,
                estado: form.estado,
                cep: form.cep,
            };

            const { error: updateErr } = await supabase
                .from('potencias')
                .update({ nome: form.nome, sigla: form.sigla, descricao: form.descricao, logo_url, configuracoes_json: cfg })
                .eq('id', potencia.id);

            if (updateErr) throw updateErr;
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err: any) {
            setError(err.message || 'Erro ao salvar.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-full min-h-[60vh]">
            <Loader2 className="animate-spin text-accent" size={32} />
        </div>
    );

    const potenciaSlug = potencia?.slug;

    const tabs: { id: typeof activeTab; icon: React.ElementType; label: string }[] = [
        { id: 'identidade', icon: Type, label: 'Identidade' },
        { id: 'aparencia', icon: Palette, label: 'Aparência' },
        { id: 'seo', icon: Search, label: 'SEO & Analytics' },
        { id: 'contato', icon: Info, label: 'Contato' },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* ── Page Header ──────────────────────────────────────────────── */}
            <div className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border">
                <div className="px-4 md:px-10 pt-6 pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-1">Configurações</p>
                            <h1 className="text-2xl md:text-4xl font-black text-primary tracking-tighter leading-none">Site da Potência</h1>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            {potenciaSlug && (
                                <a
                                    href={`/p/${potenciaSlug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-3 md:px-4 py-2.5 border border-border rounded-lg text-xs md:text-sm font-bold text-muted-foreground hover:text-primary hover:border-primary transition"
                                >
                                    <ExternalLink size={14} /> <span className="hidden sm:inline">Ver site</span>
                                </a>
                            )}
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex items-center gap-2 px-4 md:px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-xs md:text-sm font-black hover:bg-primary/90 transition shadow-lg disabled:opacity-50"
                            >
                                {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <Check size={14} /> : null}
                                {saving ? 'Salvando...' : saved ? 'Salvo!' : 'Salvar'}
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-0 overflow-x-auto">
                        {tabs.map(t => (
                            <button
                                key={t.id}
                                onClick={() => setActiveTab(t.id)}
                                className={`flex items-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all ${activeTab === t.id ? TAB_CLASSES.active : TAB_CLASSES.inactive}`}
                            >
                                <t.icon size={14} /> {t.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Content ──────────────────────────────────────────────────── */}
            <div className="flex-1 px-4 md:px-10 py-8 max-w-4xl w-full mx-auto space-y-6">

                {error && (
                    <div className="flex items-center gap-3 p-4 bg-destructive/5 border border-destructive/20 rounded-xl text-destructive text-sm font-medium">
                        <AlertCircle size={16} /> {error}
                    </div>
                )}

                {/* ═══ TAB: IDENTIDADE ═══════════════════════════════════════ */}
                {activeTab === 'identidade' && (
                    <div className="space-y-6">
                        {/* Logo */}
                        <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                            <h2 className="text-sm font-black uppercase tracking-widest text-primary mb-6">Logo</h2>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-24 h-24 rounded-2xl border-2 border-dashed border-border bg-muted/10 flex items-center justify-center cursor-pointer hover:border-accent hover:bg-accent/5 transition overflow-hidden group relative shrink-0"
                                >
                                    {logoPreview ? (
                                        <>
                                            <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                                <Upload size={20} className="text-white" />
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-accent transition">
                                            <Upload size={20} />
                                            <span className="text-[9px] font-black uppercase tracking-widest">Logo</span>
                                        </div>
                                    )}
                                </div>
                                <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" className="hidden" onChange={handleLogoChange} />
                                <div>
                                    <p className="font-bold text-sm text-primary mb-1">Logo da Potência</p>
                                    <p className="text-xs text-muted-foreground">PNG, JPG, WEBP ou SVG · Máx 2 MB</p>
                                    <p className="text-xs text-muted-foreground mt-1">Exibido no header do site e nos cards de lojas.</p>
                                    <button onClick={() => fileInputRef.current?.click()} className="mt-3 text-xs font-black text-accent hover:underline">
                                        Alterar logo
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Dados */}
                        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-5">
                            <h2 className="text-sm font-black uppercase tracking-widest text-primary">Dados da Potência</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <Field label="Nome oficial *">
                                    <Input value={form.nome} onChange={set('nome')} placeholder="Grande Oriente do Brasil" />
                                </Field>
                                <Field label="Sigla" hint="Exibida no header do site">
                                    <Input value={form.sigla} onChange={set('sigla')} placeholder="GOB" />
                                </Field>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <Field label="Slug da URL" hint="Não altere sem necessidade">
                                    <Input value={form.slug} readOnly placeholder="grande-oriente-brasil" />
                                </Field>
                                <Field label="Ano de fundação">
                                    <Input value={form.fundacao} onChange={set('fundacao')} placeholder="1822" />
                                </Field>
                            </div>
                            <Field label="Descrição / Subtítulo" hint="Exibida no hero do site público">
                                <textarea
                                    rows={3}
                                    value={form.descricao}
                                    onChange={e => set('descricao')(e.target.value)}
                                    placeholder="Uma das mais tradicionais potências maçônicas do Brasil..."
                                    className="w-full text-sm bg-background border border-border rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent/40 transition font-medium text-primary resize-none"
                                />
                            </Field>
                        </div>
                    </div>
                )}

                {/* ═══ TAB: APARÊNCIA ════════════════════════════════════════ */}
                {activeTab === 'aparencia' && (
                    <div className="space-y-6">
                        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6">
                            <h2 className="text-sm font-black uppercase tracking-widest text-primary">Cores Institucionais</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {([
                                    { key: 'corPrimaria' as const, label: 'Cor Primária', hint: 'Botões, destaques principais' },
                                    { key: 'corAcento' as const, label: 'Cor de Destaque (Accent)', hint: 'Links, badges, highlights' },
                                ]).map(({ key, label, hint }) => (
                                    <Field key={key} label={label} hint={hint}>
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-lg border border-border cursor-pointer shrink-0 overflow-hidden"
                                                style={{ background: form[key] }}
                                            >
                                                <input
                                                    type="color"
                                                    value={form[key]}
                                                    onChange={e => set(key)(e.target.value)}
                                                    className="w-full h-full opacity-0 cursor-pointer"
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                value={form[key]}
                                                onChange={e => set(key)(e.target.value)}
                                                placeholder="#1e3a5f"
                                                className="flex-1 bg-background border border-border rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent/40 transition font-mono text-sm text-primary"
                                            />
                                        </div>
                                        {/* Preview swatch */}
                                        <div className="mt-2 h-2 rounded-full" style={{ background: form[key] }} />
                                    </Field>
                                ))}
                            </div>

                            {/* Preview */}
                            <div className="mt-4 p-5 rounded-xl border border-border bg-muted/10">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">Pré-visualização</p>
                                <div className="flex flex-wrap items-center gap-3">
                                    <span
                                        className="px-4 py-2 rounded-lg text-white text-sm font-black"
                                        style={{ background: form.corPrimaria }}
                                    >
                                        Botão principal
                                    </span>
                                    <span
                                        className="px-4 py-2 rounded-lg text-sm font-black border"
                                        style={{ color: form.corAcento, borderColor: form.corAcento + '40', background: form.corAcento + '10' }}
                                    >
                                        Destaque / Link
                                    </span>
                                    <span className="w-3 h-3 rounded-full" style={{ background: form.corAcento }} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-5">
                            <h2 className="text-sm font-black uppercase tracking-widest text-primary">Tipografia</h2>
                            <Field label="Família de fonte" hint="Fonte principal usada no site">
                                <select
                                    value={form.fontFamily}
                                    onChange={e => set('fontFamily')(e.target.value)}
                                    className="w-full text-sm bg-background border border-border rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent/40 transition font-medium text-primary"
                                >
                                    {['Inter', 'Roboto', 'Playfair Display', 'Lora', 'Oswald', 'Montserrat'].map(f => (
                                        <option key={f} value={f}>{f}</option>
                                    ))}
                                </select>
                            </Field>
                        </div>
                    </div>
                )}

                {/* ═══ TAB: SEO & ANALYTICS ══════════════════════════════════ */}
                {activeTab === 'seo' && (
                    <div className="space-y-6">
                        {/* SEO Meta */}
                        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-5">
                            <div className="flex items-center gap-3 mb-2">
                                <Search size={18} className="text-accent" />
                                <h2 className="text-sm font-black uppercase tracking-widest text-primary">SEO — Meta Tags</h2>
                            </div>

                            <Field label="Title (meta title)" hint="Título exibido no Google · Máx 60 caracteres">
                                <Input value={form.seoTitle} onChange={set('seoTitle')} placeholder="Grande Oriente do Brasil — Maçonaria Oficial" />
                                <div className="flex justify-end mt-1">
                                    <span className={`text-[10px] font-mono ${form.seoTitle.length > 60 ? 'text-destructive' : 'text-muted-foreground/40'}`}>
                                        {form.seoTitle.length}/60
                                    </span>
                                </div>
                            </Field>

                            <Field label="Meta Description" hint="Descrição exibida no Google · Máx 160 caracteres">
                                <textarea
                                    rows={3}
                                    value={form.seoDescription}
                                    onChange={e => set('seoDescription')(e.target.value)}
                                    placeholder="A maior e mais tradicional potência maçônica do Brasil, fundada em..."
                                    className="w-full text-sm bg-background border border-border rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent/40 transition font-medium text-primary resize-none"
                                />
                                <div className="flex justify-end mt-1">
                                    <span className={`text-[10px] font-mono ${form.seoDescription.length > 160 ? 'text-destructive' : 'text-muted-foreground/40'}`}>
                                        {form.seoDescription.length}/160
                                    </span>
                                </div>
                            </Field>

                            <Field label="Keywords" hint="Separadas por vírgula">
                                <Input value={form.seoKeywords} onChange={set('seoKeywords')} placeholder="maçonaria, grande oriente, loja maçônica, fraternidade" />
                            </Field>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <Field label="Robots" hint="Diretiva para crawlers">
                                    <select
                                        value={form.robotsTxt}
                                        onChange={e => set('robotsTxt')(e.target.value)}
                                        className="w-full text-sm bg-background border border-border rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent/40 transition text-primary"
                                    >
                                        <option value="index, follow">index, follow (Padrão)</option>
                                        <option value="noindex, follow">noindex, follow</option>
                                        <option value="index, nofollow">index, nofollow</option>
                                        <option value="noindex, nofollow">noindex, nofollow</option>
                                    </select>
                                </Field>
                                <Field label="URL Canônica" hint="Evita conteúdo duplicado">
                                    <Input value={form.canonicalUrl} onChange={set('canonicalUrl')} placeholder="https://seudomain.com.br" />
                                </Field>
                            </div>

                            <Field label="Imagem OG (Open Graph)" hint="URL da imagem para compartilhamentos em redes sociais (1200×630)">
                                <Input value={form.ogImage} onChange={set('ogImage')} placeholder="https://..." />
                            </Field>
                        </div>

                        {/* Analytics */}
                        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-5">
                            <div className="flex items-center gap-3 mb-2">
                                <BarChart2 size={18} className="text-accent" />
                                <h2 className="text-sm font-black uppercase tracking-widest text-primary">Analytics & Rastreamento</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <Field label="Google Tag Manager (GTM)" hint="ID do contêiner GTM">
                                    <Input value={form.gtmId} onChange={set('gtmId')} placeholder="GTM-XXXXXXX" />
                                </Field>
                                <Field label="Google Analytics (GA4)" hint="ID da propriedade GA4">
                                    <Input value={form.gaId} onChange={set('gaId')} placeholder="G-XXXXXXXXXX" />
                                </Field>
                            </div>

                            <Field label="Facebook Pixel ID" hint="ID do pixel do Meta Ads">
                                <Input value={form.fbPixelId} onChange={set('fbPixelId')} placeholder="123456789012345" />
                            </Field>

                            {/* Info box */}
                            <div className="p-4 bg-accent/5 border border-accent/20 rounded-xl">
                                <div className="flex items-start gap-3">
                                    <Tag size={15} className="text-accent shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-xs font-black text-primary mb-1">Como funciona o GTM</p>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            O Google Tag Manager centraliza todos os seus scripts de rastreamento. Adicione o ID GTM aqui e gerencie todas as tags (GA, Meta, Hotjar, etc.) diretamente pelo painel do GTM — sem alterar o código.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ═══ TAB: CONTATO ══════════════════════════════════════════ */}
                {activeTab === 'contato' && (
                    <div className="space-y-6">
                        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-5">
                            <h2 className="text-sm font-black uppercase tracking-widest text-primary">Informações de Contato</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <Field label="E-mail institucional">
                                    <Input type="email" value={form.email} onChange={set('email')} placeholder="secretaria@potencia.org.br" />
                                </Field>
                                <Field label="Telefone">
                                    <Input type="tel" value={form.telefone} onChange={set('telefone')} placeholder="(11) 99999-9999" />
                                </Field>
                            </div>
                            <Field label="WhatsApp (com DDI)" hint="Ex: +5511999999999">
                                <Input value={form.whatsapp} onChange={set('whatsapp')} placeholder="+5511999999999" />
                            </Field>
                        </div>

                        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-5">
                            <h2 className="text-sm font-black uppercase tracking-widest text-primary">Endereço</h2>
                            <Field label="Logradouro / Endereço">
                                <Input value={form.endereco} onChange={set('endereco')} placeholder="Rua das Acácias, 123 — Sala 01" />
                            </Field>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <Field label="CEP">
                                    <Input value={form.cep} onChange={set('cep')} placeholder="00000-000" maxLength={9} />
                                </Field>
                                <Field label="Cidade" >
                                    <div className="sm:col-span-2">
                                        <Input value={form.cidade} onChange={set('cidade')} placeholder="São Paulo" />
                                    </div>
                                </Field>
                                <Field label="UF">
                                    <Input value={form.estado} onChange={v => set('estado')(v.toUpperCase())} placeholder="SP" maxLength={2} />
                                </Field>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ── Bottom bar (mobile save) ─────────────────────────────────── */}
            <div className="sticky bottom-0 bg-background/95 backdrop-blur border-t border-border px-4 py-3 flex items-center justify-between md:hidden">
                <span className="text-xs text-muted-foreground font-medium">Configurações do site</span>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-xs font-black hover:bg-primary/90 transition disabled:opacity-50"
                >
                    {saving ? <Loader2 size={13} className="animate-spin" /> : saved ? <Check size={13} /> : null}
                    {saving ? 'Salvando...' : saved ? 'Salvo!' : 'Salvar'}
                </button>
            </div>
        </div>
    );
}
