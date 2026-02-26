
import React, { useState, useEffect, useRef } from 'react';
import {
    X, Upload, Search, ChevronRight, ChevronLeft,
    Check, Store, MapPin, Users, Loader2, AlertCircle,
    Shield, BookOpen, FileEdit, BadgeCheck, Plus, Trash2
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { databaseService, type Loja } from '../lib/database-service';
import { useAuth } from '../contexts/AuthContext';

// ─── Ritos Maçônicos (fallback — em produção virá das configurações da potência) ─
const RITOS_DEFAULT = [
    { value: 'REAA', label: 'Rito Escocês Antigo e Aceito (REAA)' },
    { value: 'York', label: 'Rito de York' },
    { value: 'Brasileiro', label: 'Rito Brasileiro' },
    { value: 'Emulação', label: 'Rito de Emulação' },
    { value: 'Schröder', label: 'Rito de Schröder' },
    { value: 'Memphis-Misraïm', label: 'Rito de Memphis-Misraïm' },
    { value: 'Francês Moderno', label: 'Rito Francês Moderno' },
    { value: 'Sueco', label: 'Rito Sueco' },
    { value: 'Escocês Retificado', label: 'Rito Escocês Retificado' },
    { value: 'Filosófico', label: 'Rito Filosófico' },
    { value: 'Primitivo de Narbonne', label: 'Rito Primitivo de Narbonne' },
    { value: 'Hermético', label: 'Rito Hermético' },
];

// ─── Cargos de Loja ─────────────────────────────────────────────────────────
const CARGOS_LOJA = [
    '1º Vigilante', '2º Vigilante', 'Secretário', 'Tesoureiro',
    'Orador', 'Hospitaleiro', 'Chanceler', 'Mestre de Cerimônias',
    'Cobridor Interno', 'Cobridor Externo', 'Porta-Standarte',
    'Arquiteto', 'Limoeiro', 'Experto',
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function slugify(text: string, numero: string) {
    const base = text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
    const num = numero.trim().replace(/\s+/g, '');
    return num ? `${base}-${num}` : base;
}

function nameToEmailPrefix(name: string): string {
    return name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // remove acentos
        .trim()
        .split(/\s+/)
        .slice(0, 2)  // pega até primeiro e segundo nome
        .join('.')
        .replace(/[^a-z0-9._-]/g, '');
}

// ─── Types ───────────────────────────────────────────────────────────
interface MembroInput {
    id: string; // local UUID for list key
    nome: string;
    email: string;       // só o prefixo (antes do @)
    emailManual: boolean; // true quando o usuário editou o email manualmente
    cargo: string;
    tipo: 'veneravel' | 'cargo' | 'irmao';
}

interface FormData {
    // Step 1
    logoFile: File | null;
    logoPreview: string | null;
    nome: string;
    numero: string;
    rito: string;
    slug: string;
    slugManual: boolean;
    // Step 2
    membros: MembroInput[];
    // Step 3
    cep: string;
    logradouro: string;
    numero_end: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    cepLoading: boolean;
    cepError: string;
}

interface LojaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSaved: () => void;
    editLoja?: Loja | null;
    potenciaRitos?: string[]; // ritos configurados na potência
}

// ─── Componente de linha de membro ───────────────────────────────────────────
function MembroRow({
    membro,
    onChange,
    onRemove,
    showCargo,
    emailSuffix,
    duplicateError,
}: {
    membro: MembroInput;
    onChange: (field: keyof MembroInput, value: string | boolean) => void;
    onRemove: () => void;
    showCargo: boolean;
    emailSuffix: string;
    duplicateError?: string;
}) {
    // Gera prefixo de email a partir do nome: "Jefferson Campos" → "jefferson.campos"
    const handleNomeChange = (nome: string) => {
        onChange('nome', nome);
        if (!membro.emailManual && nome.trim()) {
            onChange('email', nameToEmailPrefix(nome));
            onChange('emailManual', false); // Reset manual flag if name changes and it wasn't manual
        } else if (!nome.trim() && !membro.emailManual) {
            onChange('email', '');
        }
    };

    // Ao editar email manualmente → trava o auto-fill
    const handleEmailPrefix = (val: string) => {
        const prefix = val.includes('@') ? val.split('@')[0] : val;
        const cleaned = prefix.replace(/[^a-zA-Z0-9._+-]/g, '').toLowerCase();
        onChange('email', cleaned);
        onChange('emailManual', true);
    };

    return (
        <div className="flex items-start gap-3 p-4 border border-border rounded-xl bg-muted/5 group/row">
            <div className="flex-1 space-y-3">
                {/* Nome ─ largura cheia */}
                <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground pl-0.5">Nome</label>
                    <input
                        type="text"
                        value={membro.nome}
                        onChange={e => handleNomeChange(e.target.value)}
                        placeholder="Nome completo"
                        className={`w-full border rounded-lg py-2.5 px-3 text-sm bg-background outline-none focus:border-accent/40 transition font-medium text-primary ${duplicateError ? 'border-destructive' : 'border-border'
                            }`}
                    />
                    {duplicateError && (
                        <p className="text-destructive text-[10px] font-black pl-0.5 flex items-center gap-1">
                            <AlertCircle size={10} /> {duplicateError}
                        </p>
                    )}
                </div>

                {/* E-mail prefix + suffix read-only ─ largura cheia */}
                <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground pl-0.5">E-mail</label>
                    <div className="flex items-stretch border border-border rounded-lg overflow-hidden focus-within:border-accent/40 transition">
                        <input
                            type="text"
                            value={membro.email}
                            onChange={e => handleEmailPrefix(e.target.value)}
                            placeholder="prefixo"
                            className="flex-1 min-w-0 py-2.5 px-3 text-sm bg-background outline-none font-mono font-medium text-primary"
                        />
                        <span className="shrink-0 flex items-center px-3 bg-muted/30 text-muted-foreground text-[11px] font-mono border-l border-border whitespace-nowrap">
                            @{emailSuffix || '...'}
                        </span>
                    </div>
                </div>

                {showCargo && (
                    <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground pl-0.5">Cargo</label>
                        <select
                            value={membro.cargo}
                            onChange={e => onChange('cargo', e.target.value)}
                            className="w-full border border-border rounded-lg py-2.5 px-3 text-sm bg-background outline-none focus:border-accent/40 transition font-medium text-primary"
                        >
                            <option value="">Selecionar cargo...</option>
                            {CARGOS_LOJA.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                )}
            </div>
            <button
                type="button"
                onClick={onRemove}
                className="mt-6 p-2 text-muted-foreground hover:text-destructive transition rounded-lg hover:bg-destructive/5"
            >
                <Trash2 size={16} />
            </button>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function LojaModal({ isOpen, onClose, onSaved, editLoja, potenciaRitos }: LojaModalProps) {
    const { profile } = useAuth();
    const [step, setStep] = useState(1);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Ritos disponíveis (potência ou default)
    const ritosDisponiveis = potenciaRitos && potenciaRitos.length > 0
        ? RITOS_DEFAULT.filter(r => potenciaRitos.includes(r.value))
        : RITOS_DEFAULT;

    // Rito search
    const [ritoSearch, setRitoSearch] = useState('');
    const [ritoOpen, setRitoOpen] = useState(false);
    const ritoRef = useRef<HTMLDivElement>(null);

    // ── Domínio da potência para e-mail dos irmãos ───────────────────────
    const [potenciaDomain, setPotenciaDomain] = useState<string>('');

    useEffect(() => {
        if (!profile?.potencia_id || !isOpen) return;
        supabase
            .from('potencias')
            .select('sigla, configuracoes_json')
            .eq('id', profile.potencia_id)
            .single()
            .then(({ data }) => {
                if (!data) return;
                // Prefere o campo domain de configuracoes_json, senão usa sigla em lowercase
                const cfg = (data.configuracoes_json as any) || {};
                const domain = cfg.domain || `${(data.sigla as string).toLowerCase()}.org.br`;
                setPotenciaDomain(domain);
            });
    }, [profile?.potencia_id, isOpen]);

    const emptyMembro = (tipo: MembroInput['tipo']): MembroInput => ({
        id: crypto.randomUUID(),
        nome: '', email: '', emailManual: false, cargo: '', tipo,
    });

    const [form, setForm] = useState<FormData>({
        logoFile: null, logoPreview: null,
        nome: '', numero: '', rito: 'REAA', slug: '', slugManual: false,
        membros: [],
        cep: '', logradouro: '', numero_end: '', complemento: '',
        bairro: '', cidade: '', estado: '',
        cepLoading: false, cepError: '',
    });

    // ── Init from editLoja ────────────────────────────────────────────────
    useEffect(() => {
        if (editLoja && isOpen) {
            const loc = editLoja.localizacao_json || {};
            const mem = editLoja.membros_json || {};
            const membros: MembroInput[] = [];
            if (mem.veneravel_id) {
                membros.push({ id: crypto.randomUUID(), nome: mem.veneravel_id, email: '', cargo: 'Venerável Mestre', tipo: 'veneravel', emailManual: false });
            }
            (mem.cargos || []).forEach((c: any) => {
                membros.push({ id: crypto.randomUUID(), nome: c.nome || c.perfil_id, email: '', cargo: c.cargo, tipo: 'cargo', emailManual: false });
            });
            (mem.irmaos || []).forEach((id: string) => {
                membros.push({ id: crypto.randomUUID(), nome: id, email: '', cargo: '', tipo: 'irmao', emailManual: false });
            });
            setForm(f => ({
                ...f,
                nome: editLoja.nome,
                numero: editLoja.numero,
                rito: editLoja.rito || 'REAA',
                slug: editLoja.slug,
                slugManual: true,
                logoPreview: editLoja.logo_url || null,
                membros,
                cep: (loc as any).cep || '',
                logradouro: (loc as any).logradouro || '',
                numero_end: (loc as any).numero_end || '',
                complemento: (loc as any).complemento || '',
                bairro: (loc as any).bairro || '',
                cidade: (loc as any).cidade || '',
                estado: (loc as any).estado || '',
                cepLoading: false, cepError: '',
            }));
            setRitoSearch(editLoja.rito || 'REAA');
        }
    }, [editLoja, isOpen]);

    // ── Close rito on outside click ───────────────────────────────────────
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ritoRef.current && !ritoRef.current.contains(e.target as Node)) {
                setRitoOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // ── Reset on close ────────────────────────────────────────────────────
    useEffect(() => {
        if (!isOpen) {
            setStep(1);
            setErrors({});
            if (!editLoja) {
                setForm({
                    logoFile: null, logoPreview: null,
                    nome: '', numero: '', rito: 'REAA', slug: '', slugManual: false,
                    membros: [],
                    cep: '', logradouro: '', numero_end: '', complemento: '',
                    bairro: '', cidade: '', estado: '',
                    cepLoading: false, cepError: '',
                });
                setRitoSearch('REAA');
                setRitoOpen(false);
            }
        }
    }, [isOpen]);

    if (!isOpen) return null;

    // ── Auto-slug ─────────────────────────────────────────────────────────
    const handleNomeChange = (nome: string) => {
        setForm(f => ({ ...f, nome, slug: f.slugManual ? f.slug : slugify(nome, f.numero) }));
        setErrors(e => ({ ...e, nome: '' }));
    };

    const handleNumeroChange = (numero: string) => {
        const cleaned = numero.replace(/\D/g, '');
        setForm(f => ({ ...f, numero: cleaned, slug: f.slugManual ? f.slug : slugify(f.nome, cleaned) }));
        setErrors(e => ({ ...e, numero: '' }));
    };

    const handleSlugChange = (slug: string) => {
        setForm(f => ({ ...f, slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, ''), slugManual: true }));
    };

    // ── Logo Upload ───────────────────────────────────────────────────────
    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            setErrors(er => ({ ...er, logo: 'Arquivo muito grande. Máximo: 2 MB.' }));
            return;
        }
        const reader = new FileReader();
        reader.onload = ev => {
            setForm(f => ({ ...f, logoFile: file, logoPreview: ev.target?.result as string }));
            setErrors(er => ({ ...er, logo: '' }));
        };
        reader.readAsDataURL(file);
    };

    // ── Rito Select ───────────────────────────────────────────────────────
    const filteredRitos = ritoSearch.trim()
        ? ritosDisponiveis.filter(r =>
            r.label.toLowerCase().includes(ritoSearch.toLowerCase()) ||
            r.value.toLowerCase().includes(ritoSearch.toLowerCase())
        )
        : ritosDisponiveis;

    const selectRito = (rito: typeof RITOS_DEFAULT[0]) => {
        setForm(f => ({ ...f, rito: rito.value }));
        setRitoSearch(rito.value);
        setRitoOpen(false);
        setErrors(e => ({ ...e, rito: '' }));
    };

    // ── Membros Step 2 ────────────────────────────────────────────────────
    const addMembro = (tipo: MembroInput['tipo']) => {
        // Verifica se já existe nome duplicado vazio (evita rows em branco dup.)
        setErrors(e => ({ ...e, membros_dup: '' }));
        setForm(f => ({ ...f, membros: [...f.membros, emptyMembro(tipo)] }));
    };

    const updateMembro = (id: string, field: keyof MembroInput, value: string | boolean) => {
        setForm(f => ({
            ...f,
            membros: f.membros.map(m => m.id === id ? { ...m, [field]: value } : m)
        }));
        // Limpa erro de duplicado ao editar o nome
        if (field === 'nome') setErrors(e => ({ ...e, membros_dup: '' }));
    };

    const removeMembro = (id: string) => {
        setForm(f => ({ ...f, membros: f.membros.filter(m => m.id !== id) }));
    };

    // Detecta nomes duplicados (case-insensitive)
    const duplicateNames = (): Record<string, string> => {
        const seen: Record<string, number> = {};
        const result: Record<string, string> = {};
        form.membros.forEach(m => {
            const key = m.nome.trim().toLowerCase();
            if (!key) return;
            seen[key] = (seen[key] || 0) + 1;
        });
        form.membros.forEach(m => {
            const key = m.nome.trim().toLowerCase();
            if (key && seen[key] > 1) {
                result[m.id] = 'Nome já cadastrado nesta loja.';
            }
        });
        return result;
    };

    const dupErrors = duplicateNames();

    const veneravel = form.membros.find(m => m.tipo === 'veneravel');
    const cargos = form.membros.filter(m => m.tipo === 'cargo');
    const irmaos = form.membros.filter(m => m.tipo === 'irmao');

    // ── CEP auto-complete (ViaCEP) ────────────────────────────────────────
    const handleCepChange = async (raw: string) => {
        const cep = raw.replace(/\D/g, '').slice(0, 8);
        setForm(f => ({ ...f, cep, cepError: '' }));
        if (cep.length === 8) {
            setForm(f => ({ ...f, cepLoading: true }));
            try {
                const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await res.json();
                if (data.erro) {
                    setForm(f => ({ ...f, cepLoading: false, cepError: 'CEP não encontrado.' }));
                } else {
                    setForm(f => ({
                        ...f,
                        logradouro: data.logradouro || '',
                        bairro: data.bairro || '',
                        cidade: data.localidade || '',
                        estado: data.uf || '',
                        cepLoading: false,
                        cepError: '',
                    }));
                }
            } catch {
                setForm(f => ({ ...f, cepLoading: false, cepError: 'Erro ao buscar CEP. Verifique sua conexão.' }));
            }
        }
    };

    const formatCep = (v: string) => {
        const d = v.replace(/\D/g, '');
        return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
    };

    // ── Validation per step ─────────────────────────────────────────────────
    const validateStep = (s: number) => {
        const errs: Record<string, string> = {};
        if (s === 1) {
            if (!form.nome.trim()) errs.nome = 'Nome é obrigatório.';
            if (!form.numero.trim()) errs.numero = 'Número é obrigatório.';
            if (!form.rito) errs.rito = 'Selecione um rito.';
            if (!form.slug.trim()) errs.slug = 'Slug é obrigatório.';
        }
        if (s === 2) {
            if (!veneravel) errs.venerable = 'Adicione o Venerável Mestre.';
            else if (!veneravel.nome.trim()) errs.venerable = 'Preencha o nome do Venerável.';
            else if (!veneravel.email.trim()) errs.venerable = 'Preencha o e-mail do Venerável.';
            // Nomes duplicados
            if (Object.keys(dupErrors).length > 0) {
                errs.membros_dup = 'Existem irmãos com nomes duplicados. Corrija antes de continuar.';
            }
        }
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const goNext = () => { if (validateStep(step)) setStep(s => s + 1); };
    const goBack = () => setStep(s => s - 1);

    // ── Upload logo to Supabase Storage ───────────────────────────────────
    const uploadLogo = async (): Promise<string | null> => {
        if (!form.logoFile || !profile?.potencia_id) return form.logoPreview || null;
        const ext = form.logoFile.name.split('.').pop();
        const path = `lojas/${profile.potencia_id}/${form.slug}-${Date.now()}.${ext}`;
        const { error } = await supabase.storage
            .from('logos')
            .upload(path, form.logoFile, { upsert: true, contentType: form.logoFile.type });
        if (error) { console.warn('Logo upload failed:', error.message); return null; }
        const { data } = supabase.storage.from('logos').getPublicUrl(path);
        return data.publicUrl;
    };

    // ── Email suffix (reactive to slug + potenciaDomain) ─────────────────
    // Format: slug.urlPotencia  →  e.g. aurora-001.gob.org.br
    const emailSuffix = [form.slug, potenciaDomain].filter(Boolean).join('.');

    // Reconstruct full email from stored prefix + suffix
    const fullEmail = (prefix: string) =>
        prefix && emailSuffix ? `${prefix}@${emailSuffix}` : prefix;

    // ── Save ──────────────────────────────────────────────────────────────
    const handleSave = async (status: 'ativo' | 'rascunho' = 'ativo') => {
        if (status === 'ativo' && !validateStep(step)) return;
        if (!profile?.potencia_id) return;
        setSaving(true);
        setErrors({});
        try {
            const logo_url = await uploadLogo();

            // Payload completo (campos extras podem não existir no banco ainda)
            const fullPayload: Record<string, unknown> = {
                potencia_id: profile.potencia_id,
                nome: form.nome,
                numero: form.numero,
                rito: form.rito,
                slug: form.slug,
                logo_url,
                status,
                localizacao_json: {
                    cep: form.cep,
                    logradouro: form.logradouro,
                    numero_end: form.numero_end,
                    complemento: form.complemento,
                    bairro: form.bairro,
                    cidade: form.cidade,
                    estado: form.estado,
                },
                membros_json: {
                    veneravel: veneravel ? { nome: veneravel.nome, email: fullEmail(veneravel.email) } : undefined,
                    cargos: cargos.map(m => ({ nome: m.nome, email: fullEmail(m.email), cargo: m.cargo })),
                    irmaos: irmaos.map(m => ({ nome: m.nome, email: fullEmail(m.email) })),
                },
            };

            const tryUpsert = async (payload: Record<string, unknown>) => {
                if (editLoja) {
                    return databaseService.updateLoja(editLoja.id, payload as any);
                } else {
                    return databaseService.createLoja(payload as any);
                }
            };

            try {
                await tryUpsert(fullPayload);
            } catch (innerErr: any) {
                const msg: string = innerErr?.message || '';
                console.error('[LojaModal] Erro ao salvar (payload completo):', msg, innerErr);

                // Se o erro for de coluna não existente, tenta com campos básicos
                if (msg.includes('column') || msg.includes('does not exist') || msg.includes('42703')) {
                    console.warn('[LojaModal] Tentando fallback com payload básico...');
                    const basePayload: Record<string, unknown> = {
                        potencia_id: profile.potencia_id,
                        nome: form.nome,
                        numero: form.numero,
                        rito: form.rito,
                        slug: form.slug,
                    };
                    await tryUpsert(basePayload);
                } else {
                    throw innerErr;
                }
            }

            onSaved();
            onClose();
        } catch (err: any) {
            const msg: string = err?.message || '';
            console.error('[LojaModal] Erro final ao salvar:', msg, err);
            if (msg.includes('slug') || msg.includes('duplicate') || msg.includes('23505')) {
                setErrors({ slug: 'Este slug já está em uso. Altere o slug manualmente.' });
                setStep(1);
            } else {
                setErrors({ global: `Erro ao salvar: ${msg || 'Tente novamente.'}` });
            }
        } finally {
            setSaving(false);
        }
    };

    // ── Steps config ──────────────────────────────────────────────────────
    const steps = [
        { icon: Store, label: 'Identidade' },
        { icon: Users, label: 'Membros' },
        { icon: MapPin, label: 'Localização' },
    ];

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-primary/40 backdrop-blur-md" onClick={onClose} />

            {/* Modal */}
            <div className="relative w-full max-w-2xl bg-background border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-border shrink-0">
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-accent mb-1">
                            {editLoja ? 'Editar Oficina' : 'Nova Oficina'}
                        </p>
                        <h2 className="text-2xl font-black text-primary tracking-tighter">
                            {steps[step - 1].label}
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-2 text-muted-foreground hover:text-primary transition rounded-lg hover:bg-muted/50">
                        <X size={20} />
                    </button>
                </div>

                {/* Steps indicator */}
                <div className="flex items-center gap-0 px-8 py-5 border-b border-border bg-muted/5 shrink-0">
                    {steps.map((s, i) => {
                        const num = i + 1;
                        const active = num === step;
                        const done = num < step;
                        return (
                            <React.Fragment key={s.label}>
                                <button
                                    onClick={() => done ? setStep(num) : undefined}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${done ? 'cursor-pointer' : 'cursor-default'}`}
                                >
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black transition-all
                                        ${active ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' :
                                            done ? 'bg-accent text-primary' : 'bg-muted text-muted-foreground'}`}>
                                        {done ? <Check size={14} /> : num}
                                    </div>
                                    <span className={`text-[10px] font-black uppercase tracking-widest transition
                                        ${active ? 'text-primary' : done ? 'text-accent' : 'text-muted-foreground/50'}`}>
                                        {s.label}
                                    </span>
                                </button>
                                {i < steps.length - 1 && (
                                    <div className={`flex-1 h-px mx-2 transition ${done ? 'bg-accent' : 'bg-border'}`} />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                {/* Global error */}
                {errors.global && (
                    <div className="mx-8 mt-4 p-4 bg-destructive/5 border border-destructive/20 rounded-lg flex items-center gap-3 text-destructive text-[11px] font-black uppercase tracking-widest">
                        <AlertCircle size={16} /> {errors.global}
                    </div>
                )}

                {/* Content */}
                <div className="flex-1 overflow-y-auto">

                    {/* ══ STEP 1 ══════════════════════════════════════════ */}
                    {step === 1 && (
                        <div className="px-8 py-8 space-y-7">
                            {/* Logo Upload */}
                            <div className="flex flex-col items-center gap-3">
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-24 h-24 rounded-2xl border-2 border-dashed border-border bg-muted/10 flex items-center justify-center cursor-pointer hover:border-accent hover:bg-accent/5 transition overflow-hidden group relative"
                                >
                                    {form.logoPreview ? (
                                        <>
                                            <img src={form.logoPreview} alt="Logo" className="w-full h-full object-cover" />
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
                                <p className="text-[9px] text-muted-foreground/60 uppercase tracking-widest font-bold">PNG, JPG, WEBP ou SVG · Máx 2 MB</p>
                                {errors.logo && <p className="text-destructive text-[10px] font-black">{errors.logo}</p>}
                            </div>

                            {/* Nome */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground pl-1">
                                    Nome da Loja <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={form.nome}
                                    onChange={e => handleNomeChange(e.target.value)}
                                    placeholder="Ex: Aurora da Virtude"
                                    className={`w-full bg-background border rounded-lg py-3.5 px-4 outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent/40 transition font-medium text-primary ${errors.nome ? 'border-destructive' : 'border-border'}`}
                                />
                                {errors.nome && <p className="text-destructive text-[10px] font-black pl-1">{errors.nome}</p>}
                            </div>

                            {/* Número + Rito */}
                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground pl-1">
                                        Número <span className="text-destructive">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        value={form.numero}
                                        onChange={e => handleNumeroChange(e.target.value)}
                                        placeholder="001"
                                        className={`w-full bg-background border rounded-lg py-3.5 px-4 outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent/40 transition font-mono font-bold ${errors.numero ? 'border-destructive' : 'border-border'}`}
                                    />
                                    {errors.numero && <p className="text-destructive text-[10px] font-black pl-1">{errors.numero}</p>}
                                </div>

                                {/* Rito select with search */}
                                <div className="space-y-2" ref={ritoRef}>
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground pl-1">
                                        Rito <span className="text-destructive">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="relative">
                                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/40" size={14} />
                                            <input
                                                type="text"
                                                value={ritoSearch}
                                                onChange={e => { setRitoSearch(e.target.value); setRitoOpen(true); }}
                                                onFocus={() => setRitoOpen(true)}
                                                placeholder="Buscar rito..."
                                                className={`w-full bg-background border rounded-lg py-3.5 pl-9 pr-4 outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent/40 transition font-medium text-primary text-sm ${errors.rito ? 'border-destructive' : 'border-border'}`}
                                            />
                                        </div>
                                        {/* Dropdown — sempre abre com todos os ritos, filtra ao digitar */}
                                        {ritoOpen && (
                                            <div className="absolute z-10 top-full mt-1 left-0 right-0 bg-background border border-border rounded-lg shadow-xl overflow-hidden max-h-52 overflow-y-auto">
                                                {filteredRitos.length === 0 ? (
                                                    <p className="text-muted-foreground text-xs p-4 text-center">Nenhum rito encontrado.</p>
                                                ) : filteredRitos.map(r => (
                                                    <button
                                                        key={r.value}
                                                        type="button"
                                                        onClick={() => selectRito(r)}
                                                        className={`w-full text-left px-4 py-2.5 text-xs hover:bg-muted/50 transition ${form.rito === r.value ? 'bg-accent/10' : ''}`}
                                                    >
                                                        <span className="font-black text-primary">{r.value}</span>
                                                        <span className="text-muted-foreground/60 text-[10px] block">{r.label}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    {errors.rito && <p className="text-destructive text-[10px] font-black pl-1">{errors.rito}</p>}
                                </div>
                            </div>

                            {/* Slug */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between pl-1">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                                        Slug (URL) <span className="text-destructive">*</span>
                                    </label>
                                    <span className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-widest">Auto-gerado · editável</span>
                                </div>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 text-sm font-mono">/</span>
                                    <input
                                        type="text"
                                        value={form.slug}
                                        onChange={e => handleSlugChange(e.target.value)}
                                        placeholder="aurora-da-virtude-001"
                                        className={`w-full bg-background border rounded-lg py-3.5 pl-7 pr-4 outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent/40 transition font-mono text-sm ${errors.slug ? 'border-destructive' : 'border-border'}`}
                                    />
                                </div>
                                {errors.slug && <p className="text-destructive text-[10px] font-black pl-1">{errors.slug}</p>}
                            </div>
                        </div>
                    )}

                    {/* ══ STEP 2 ══════════════════════════════════════════ */}
                    {step === 2 && (
                        <div className="px-8 py-8 space-y-8">
                            <p className="text-[10px] text-muted-foreground font-medium border border-border rounded-lg px-4 py-3 bg-muted/10 leading-relaxed">
                                Cadastre os membros desta loja. Eles receberão um e-mail de acesso ao painel com permissões de nível loja.
                            </p>

                            {/* ── Venerável ─────────────────────────────────── */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <BadgeCheck size={15} className="text-accent" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                                            Venerável Mestre <span className="text-destructive">*</span>
                                        </span>
                                    </div>
                                </div>

                                {!veneravel ? (
                                    <button
                                        type="button"
                                        onClick={() => addMembro('veneravel')}
                                        className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:border-accent hover:text-accent transition font-black text-[10px] uppercase tracking-widest"
                                    >
                                        <Plus size={14} /> Adicionar Venerável
                                    </button>
                                ) : (
                                    <MembroRow
                                        membro={veneravel}
                                        onChange={(f, v) => updateMembro(veneravel.id, f, v)}
                                        onRemove={() => removeMembro(veneravel.id)}
                                        showCargo={false}
                                        emailSuffix={emailSuffix}
                                        duplicateError={dupErrors[veneravel.id]}
                                    />
                                )}
                                {errors.venerable && (
                                    <p className="text-destructive text-[10px] font-black pl-1 flex items-center gap-1">
                                        <AlertCircle size={11} /> {errors.venerable}
                                    </p>
                                )}
                            </div>

                            {/* ── Cargos ────────────────────────────────────── */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Shield size={15} className="text-accent" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Cargos da Loja</span>
                                </div>

                                <div className="space-y-3">
                                    {cargos.map(m => (
                                        <MembroRow
                                            key={m.id}
                                            membro={m}
                                            onChange={(f, v) => updateMembro(m.id, f, v)}
                                            onRemove={() => removeMembro(m.id)}
                                            showCargo={true}
                                            emailSuffix={emailSuffix}
                                            duplicateError={dupErrors[m.id]}
                                        />
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={() => addMembro('cargo')}
                                    className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:border-accent hover:text-accent transition font-black text-[10px] uppercase tracking-widest"
                                >
                                    <Plus size={14} /> Adicionar Irmão com Cargo
                                </button>
                            </div>

                            {/* ── Demais Irmãos ─────────────────────────────── */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <BookOpen size={15} className="text-accent" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Demais Irmãos</span>
                                </div>

                                <div className="space-y-3">
                                    {irmaos.map(m => (
                                        <MembroRow
                                            key={m.id}
                                            membro={m}
                                            onChange={(f, v) => updateMembro(m.id, f, v)}
                                            onRemove={() => removeMembro(m.id)}
                                            showCargo={false}
                                            emailSuffix={emailSuffix}
                                            duplicateError={dupErrors[m.id]}
                                        />
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={() => addMembro('irmao')}
                                    className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:border-accent hover:text-accent transition font-black text-[10px] uppercase tracking-widest"
                                >
                                    <Plus size={14} /> Adicionar Irmão
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ══ STEP 3 ══════════════════════════════════════════ */}
                    {step === 3 && (
                        <div className="px-8 py-8 space-y-6">
                            {/* CEP */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground pl-1">CEP</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={formatCep(form.cep)}
                                        onChange={e => handleCepChange(e.target.value)}
                                        placeholder="00000-000"
                                        maxLength={9}
                                        className="w-full bg-background border border-border rounded-lg py-3.5 px-4 outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent/40 transition font-mono pr-10"
                                    />
                                    {form.cepLoading && (
                                        <Loader2 size={16} className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-accent" />
                                    )}
                                </div>
                                {form.cepError && (
                                    <p className="text-destructive text-[10px] font-black pl-1 flex items-center gap-1">
                                        <AlertCircle size={11} /> {form.cepError}
                                    </p>
                                )}
                            </div>

                            {/* Logradouro (read-only após CEP) */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground pl-1">Logradouro</label>
                                <input
                                    type="text"
                                    value={form.logradouro}
                                    readOnly={!!form.logradouro}
                                    onChange={e => setForm(f => ({ ...f, logradouro: e.target.value }))}
                                    placeholder="Preenchido automaticamente pelo CEP"
                                    className="w-full bg-muted/10 border border-border rounded-lg py-3.5 px-4 outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent/40 transition font-medium text-primary"
                                />
                            </div>

                            {/* Bairro + Número */}
                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground pl-1">Bairro</label>
                                    <input
                                        type="text"
                                        value={form.bairro}
                                        readOnly={!!form.bairro}
                                        onChange={e => setForm(f => ({ ...f, bairro: e.target.value }))}
                                        placeholder="Auto-preenchido"
                                        className="w-full bg-muted/10 border border-border rounded-lg py-3.5 px-4 outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent/40 transition font-medium text-primary"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground pl-1">Número</label>
                                    <input
                                        type="text"
                                        value={form.numero_end}
                                        onChange={e => setForm(f => ({ ...f, numero_end: e.target.value }))}
                                        placeholder="123"
                                        className="w-full bg-background border border-border rounded-lg py-3.5 px-4 outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent/40 transition font-mono font-bold"
                                    />
                                </div>
                            </div>

                            {/* Cidade + Estado (read-only após CEP) */}
                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground pl-1">Cidade</label>
                                    <input
                                        type="text"
                                        value={form.cidade}
                                        readOnly={!!form.cidade}
                                        onChange={e => setForm(f => ({ ...f, cidade: e.target.value }))}
                                        placeholder="Auto-preenchido"
                                        className="w-full bg-muted/10 border border-border rounded-lg py-3.5 px-4 outline-none transition font-medium text-primary"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground pl-1">Estado (UF)</label>
                                    <input
                                        type="text"
                                        value={form.estado}
                                        readOnly={!!form.estado}
                                        onChange={e => setForm(f => ({ ...f, estado: e.target.value }))}
                                        placeholder="Auto"
                                        className="w-full bg-muted/10 border border-border rounded-lg py-3.5 px-4 outline-none transition font-mono font-bold uppercase"
                                    />
                                </div>
                            </div>

                            {/* Complemento */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground pl-1">Complemento</label>
                                <input
                                    type="text"
                                    value={form.complemento}
                                    onChange={e => setForm(f => ({ ...f, complemento: e.target.value }))}
                                    placeholder="Sala, andar, bloco..."
                                    className="w-full bg-background border border-border rounded-lg py-3.5 px-4 outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent/40 transition font-medium"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="shrink-0 px-8 py-6 border-t border-border bg-muted/5 flex items-center justify-between gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 text-muted-foreground hover:text-primary font-black text-[10px] uppercase tracking-widest transition"
                    >
                        Cancelar
                    </button>

                    <div className="flex items-center gap-3">
                        {/* Draft — available when step 1 is minimally filled */}
                        {form.nome && form.numero && (
                            <button
                                type="button"
                                onClick={() => handleSave('rascunho')}
                                disabled={saving}
                                className="flex items-center gap-2 px-5 py-3 border border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary transition font-black text-[10px] uppercase tracking-widest disabled:opacity-50"
                            >
                                <FileEdit size={14} />
                                {saving ? 'Salvando...' : 'Rascunho'}
                            </button>
                        )}

                        {step > 1 && (
                            <button
                                type="button"
                                onClick={goBack}
                                className="flex items-center gap-2 px-5 py-3 border border-border rounded-lg text-muted-foreground hover:text-primary transition font-black text-[10px] uppercase tracking-widest"
                            >
                                <ChevronLeft size={14} /> Anterior
                            </button>
                        )}

                        {step < 3 ? (
                            <button
                                type="button"
                                onClick={goNext}
                                className="flex items-center gap-2 px-7 py-3 bg-primary text-primary-foreground rounded-lg font-black text-[10px] uppercase tracking-widest hover:bg-primary/90 transition shadow-lg shadow-primary/10"
                            >
                                Próximo <ChevronRight size={14} />
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => handleSave('ativo')}
                                disabled={saving}
                                className="flex items-center gap-2 px-7 py-3 bg-primary text-primary-foreground rounded-lg font-black text-[10px] uppercase tracking-widest hover:bg-primary/90 transition shadow-lg shadow-primary/10 disabled:opacity-50"
                            >
                                {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                                {saving ? 'Salvando...' : 'Salvar Loja'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
