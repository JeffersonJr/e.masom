import { useState } from 'react';
import {
    Shield, Bell, Globe, Database, Users,
    ChevronRight, Lock, Mail, Sliders, Save, Check, Loader2,
    AlertCircle, Eye, EyeOff, Info,
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

function ToggleSetting({ label, desc, checked, onChange }: {
    label: string; desc: string; checked: boolean; onChange: (v: boolean) => void;
}) {
    return (
        <div className="flex items-start justify-between gap-4 py-4 border-b border-border last:border-0">
            <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-primary">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
            </div>
            <button
                onClick={() => onChange(!checked)}
                className={`relative w-11 h-6 rounded-full transition-colors shrink-0 mt-0.5 ${checked ? 'bg-accent' : 'bg-border'}`}
            >
                <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
        </div>
    );
}

const TABS = [
    { id: 'geral', icon: Sliders, label: 'Geral' },
    { id: 'seguranca', icon: Shield, label: 'Segurança' },
    { id: 'notificacoes', icon: Bell, label: 'Notificações' },
    { id: 'integracao', icon: Globe, label: 'Integrações' },
    { id: 'sistema', icon: Database, label: 'Sistema' },
] as const;

type Tab = typeof TABS[number]['id'];

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AdminConfig() {
    const [tab, setTab] = useState<Tab>('geral');
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [showSecret, setShowSecret] = useState(false);

    // Geral
    const [geral, setGeral] = useState({
        nomeSistema: 'e.mason',
        idioma: 'pt-BR',
        fuso: 'America/Sao_Paulo',
        dataFormato: 'DD/MM/YYYY',
        paginaInicial: '/admin',
    });

    // Segurança
    const [seguranca, setSeguranca] = useState({
        mfaObrigatorio: false,
        sessaoTimeout: '60',
        ipWhitelist: '',
        apiKey: 'sk-em-prod-••••••••••••••••',
    });

    // Notificações
    const [notifs, setNotifs] = useState({
        emailNovoObreiro: true,
        emailPerCapita: true,
        emailDocumento: false,
        emailSistema: true,
        pushNavegador: false,
        emailSmtp: '',
        smtpHost: '',
        smtpPort: '587',
        smtpUser: '',
        smtpPass: '',
    });

    // Integrações
    const [integracoes, setIntegracoes] = useState({
        webhookUrl: '',
        webhookAtivo: false,
        supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
        slackWebhook: '',
        zapierKey: '',
    });

    // Sistema
    const [sistema, setSistema] = useState({
        manutencao: false,
        debugMode: false,
        logLevel: 'error',
        maxUploadMb: '10',
        backupAuto: true,
    });

    const handleSave = async () => {
        setSaving(true);
        await new Promise(r => setTimeout(r, 900));
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const inputCls = "w-full text-sm bg-background border border-border rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent/40 transition font-medium text-primary";
    const selectCls = inputCls;

    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* ── Header ─────────────────────────────────────────────────── */}
            <div className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border">
                <div className="px-4 md:px-10 pt-6 pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-1">Sistema</p>
                            <h1 className="text-2xl md:text-4xl font-black text-primary tracking-tighter leading-none">Configurações</h1>
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-xs md:text-sm font-black hover:bg-primary/90 transition shadow-lg disabled:opacity-50 self-start sm:self-auto"
                        >
                            {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <Check size={14} /> : <Save size={14} />}
                            {saving ? 'Salvando...' : saved ? 'Salvo!' : 'Salvar'}
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-0 overflow-x-auto">
                        {TABS.map(t => (
                            <button
                                key={t.id}
                                onClick={() => setTab(t.id)}
                                className={`flex items-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all border-b-2 ${tab === t.id ? 'border-accent text-primary' : 'border-transparent text-muted-foreground hover:text-primary'}`}
                            >
                                <t.icon size={13} /> {t.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Content ──────────────────────────────────────────────────── */}
            <div className="flex-1 px-4 md:px-10 py-8 max-w-4xl w-full mx-auto space-y-6">

                {/* ═══ GERAL ══════════════════════════════════════════ */}
                {tab === 'geral' && (
                    <div className="space-y-6">
                        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-5">
                            <div className="flex items-center gap-3 mb-2">
                                <Sliders size={18} className="text-accent" />
                                <h2 className="text-sm font-black uppercase tracking-widest text-primary">Configurações Gerais</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <Field label="Nome do sistema">
                                    <input className={inputCls} value={geral.nomeSistema} onChange={e => setGeral(g => ({ ...g, nomeSistema: e.target.value }))} />
                                </Field>
                                <Field label="Idioma">
                                    <select className={selectCls} value={geral.idioma} onChange={e => setGeral(g => ({ ...g, idioma: e.target.value }))}>
                                        <option value="pt-BR">Português (Brasil)</option>
                                        <option value="en-US">English (US)</option>
                                        <option value="es">Español</option>
                                    </select>
                                </Field>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <Field label="Fuso horário">
                                    <select className={selectCls} value={geral.fuso} onChange={e => setGeral(g => ({ ...g, fuso: e.target.value }))}>
                                        <option value="America/Sao_Paulo">America/São_Paulo (GMT-3)</option>
                                        <option value="America/Manaus">America/Manaus (GMT-4)</option>
                                        <option value="America/Belem">America/Belém (GMT-3)</option>
                                        <option value="America/Fortaleza">America/Fortaleza (GMT-3)</option>
                                    </select>
                                </Field>
                                <Field label="Formato de data">
                                    <select className={selectCls} value={geral.dataFormato} onChange={e => setGeral(g => ({ ...g, dataFormato: e.target.value }))}>
                                        <option value="DD/MM/YYYY">DD/MM/AAAA</option>
                                        <option value="MM/DD/YYYY">MM/DD/AAAA</option>
                                        <option value="YYYY-MM-DD">AAAA-MM-DD</option>
                                    </select>
                                </Field>
                            </div>

                            <Field label="Página inicial após login">
                                <select className={selectCls} value={geral.paginaInicial} onChange={e => setGeral(g => ({ ...g, paginaInicial: e.target.value }))}>
                                    <option value="/admin">Dashboard</option>
                                    <option value="/admin/lojas">Lojas Federadas</option>
                                    <option value="/admin/obreiros">Cadastro de Obreiros</option>
                                </select>
                            </Field>
                        </div>

                        {/* Informações do plano */}
                        <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                                    <Info size={18} className="text-accent" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-black text-sm text-primary mb-1">Plano atual: <span className="text-accent">Pro</span></p>
                                    <p className="text-xs text-muted-foreground">Lojas ilimitadas · SEO completo · Analytics · Suporte prioritário</p>
                                    <button className="mt-3 flex items-center gap-1 text-xs font-black text-accent hover:underline">
                                        Ver detalhes do plano <ChevronRight size={12} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ═══ SEGURANÇA ══════════════════════════════════════════ */}
                {tab === 'seguranca' && (
                    <div className="space-y-6">
                        <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <Shield size={18} className="text-accent" />
                                <h2 className="text-sm font-black uppercase tracking-widest text-primary">Autenticação & Acesso</h2>
                            </div>

                            <ToggleSetting
                                label="Autenticação em 2 fatores (MFA)"
                                desc="Exige verificação adicional no login de todos os administradores"
                                checked={seguranca.mfaObrigatorio}
                                onChange={v => setSeguranca(s => ({ ...s, mfaObrigatorio: v }))}
                            />
                            <div className="py-4">
                                <Field label="Timeout de sessão (minutos)" hint="Usuário é deslogado após inatividade">
                                    <input type="number" className={inputCls} value={seguranca.sessaoTimeout} onChange={e => setSeguranca(s => ({ ...s, sessaoTimeout: e.target.value }))} min={5} max={480} />
                                </Field>
                            </div>
                            <Field label="IP Whitelist" hint="IPs permitidos para acesso admin (separados por vírgula). Deixe vazio para permitir todos.">
                                <input className={inputCls} value={seguranca.ipWhitelist} onChange={e => setSeguranca(s => ({ ...s, ipWhitelist: e.target.value }))} placeholder="192.168.1.1, 10.0.0.0/24" />
                            </Field>
                        </div>

                        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4">
                            <div className="flex items-center gap-3 mb-2">
                                <Lock size={18} className="text-accent" />
                                <h2 className="text-sm font-black uppercase tracking-widest text-primary">API Key</h2>
                            </div>
                            <Field label="Chave de API" hint="Use para integrar sistemas externos via REST API">
                                <div className="flex gap-2">
                                    <input
                                        type={showSecret ? 'text' : 'password'}
                                        readOnly
                                        value={seguranca.apiKey}
                                        className={`${inputCls} font-mono flex-1`}
                                    />
                                    <button
                                        onClick={() => setShowSecret(v => !v)}
                                        className="px-3 py-2 border border-border rounded-lg text-muted-foreground hover:text-primary transition"
                                    >
                                        {showSecret ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </Field>
                            <button className="text-xs font-black text-destructive hover:underline">Revogar e regenerar chave</button>
                        </div>
                    </div>
                )}

                {/* ═══ NOTIFICAÇÕES ═══════════════════════════════════════ */}
                {tab === 'notificacoes' && (
                    <div className="space-y-6">
                        <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <Bell size={18} className="text-accent" />
                                <h2 className="text-sm font-black uppercase tracking-widest text-primary">Alertas por E-mail</h2>
                            </div>

                            <ToggleSetting label="Novo obreiro cadastrado" desc="Notifica quando um novo membro é adicionado ao sistema" checked={notifs.emailNovoObreiro} onChange={v => setNotifs(n => ({ ...n, emailNovoObreiro: v }))} />
                            <ToggleSetting label="Per capita pendente" desc="Aviso quando uma loja tem per capita em atraso" checked={notifs.emailPerCapita} onChange={v => setNotifs(n => ({ ...n, emailPerCapita: v }))} />
                            <ToggleSetting label="Novo documento enviado" desc="Notifica quando uma ata ou placet é submetido" checked={notifs.emailDocumento} onChange={v => setNotifs(n => ({ ...n, emailDocumento: v }))} />
                            <ToggleSetting label="Alertas do sistema" desc="Erros críticos ou manutenção programada" checked={notifs.emailSistema} onChange={v => setNotifs(n => ({ ...n, emailSistema: v }))} />
                            <ToggleSetting label="Push (navegador)" desc="Notificações push no navegador enquanto logado" checked={notifs.pushNavegador} onChange={v => setNotifs(n => ({ ...n, pushNavegador: v }))} />
                        </div>

                        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-5">
                            <div className="flex items-center gap-3 mb-2">
                                <Mail size={18} className="text-accent" />
                                <h2 className="text-sm font-black uppercase tracking-widest text-primary">Servidor SMTP</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <Field label="Host SMTP">
                                    <input className={inputCls} value={notifs.smtpHost} onChange={e => setNotifs(n => ({ ...n, smtpHost: e.target.value }))} placeholder="smtp.gmail.com" />
                                </Field>
                                <Field label="Porta">
                                    <input type="number" className={inputCls} value={notifs.smtpPort} onChange={e => setNotifs(n => ({ ...n, smtpPort: e.target.value }))} placeholder="587" />
                                </Field>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <Field label="Usuário / E-mail">
                                    <input className={inputCls} value={notifs.smtpUser} onChange={e => setNotifs(n => ({ ...n, smtpUser: e.target.value }))} placeholder="sistema@potencia.org.br" />
                                </Field>
                                <Field label="Senha">
                                    <input type="password" className={inputCls} value={notifs.smtpPass} onChange={e => setNotifs(n => ({ ...n, smtpPass: e.target.value }))} placeholder="••••••••" />
                                </Field>
                            </div>
                            <button className="text-xs font-black text-accent hover:underline">Testar conexão SMTP</button>
                        </div>
                    </div>
                )}

                {/* ═══ INTEGRAÇÕES ═══════════════════════════════════════ */}
                {tab === 'integracao' && (
                    <div className="space-y-6">
                        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-5">
                            <div className="flex items-center gap-3 mb-2">
                                <Globe size={18} className="text-accent" />
                                <h2 className="text-sm font-black uppercase tracking-widest text-primary">Webhook</h2>
                            </div>
                            <ToggleSetting label="Webhook ativo" desc="Dispara requisições automáticas para a URL configurada em eventos do sistema" checked={integracoes.webhookAtivo} onChange={v => setIntegracoes(i => ({ ...i, webhookAtivo: v }))} />
                            <Field label="URL do Webhook" hint="Receberá um POST com payload JSON para cada evento">
                                <input className={inputCls} value={integracoes.webhookUrl} onChange={e => setIntegracoes(i => ({ ...i, webhookUrl: e.target.value }))} placeholder="https://meusite.com/webhook" />
                            </Field>
                        </div>

                        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-5">
                            <h2 className="text-sm font-black uppercase tracking-widest text-primary mb-4">Outros</h2>
                            <Field label="Slack Webhook URL" hint="Envia alertas diretamente para um canal Slack">
                                <input className={inputCls} value={integracoes.slackWebhook} onChange={e => setIntegracoes(i => ({ ...i, slackWebhook: e.target.value }))} placeholder="https://hooks.slack.com/..." />
                            </Field>
                            <Field label="Zapier API Key" hint="Para automações via Zapier">
                                <input className={inputCls} value={integracoes.zapierKey} onChange={e => setIntegracoes(i => ({ ...i, zapierKey: e.target.value }))} placeholder="zap_..." />
                            </Field>
                        </div>
                    </div>
                )}

                {/* ═══ SISTEMA ══════════════════════════════════════════ */}
                {tab === 'sistema' && (
                    <div className="space-y-6">
                        <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <Database size={18} className="text-accent" />
                                <h2 className="text-sm font-black uppercase tracking-widest text-primary">Sistema</h2>
                            </div>

                            <ToggleSetting label="Modo manutenção" desc="Exibe página de manutenção para usuários não-admin" checked={sistema.manutencao} onChange={v => setSistema(s => ({ ...s, manutencao: v }))} />
                            <ToggleSetting label="Backup automático diário" desc="Exporta dados do sistema a cada 24 horas para armazenamento seguro" checked={sistema.backupAuto} onChange={v => setSistema(s => ({ ...s, backupAuto: v }))} />
                            <ToggleSetting label="Modo debug" desc="Ativa logs detalhados no console (não use em produção)" checked={sistema.debugMode} onChange={v => setSistema(s => ({ ...s, debugMode: v }))} />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 py-4">
                                <Field label="Nível de log">
                                    <select className={selectCls} value={sistema.logLevel} onChange={e => setSistema(s => ({ ...s, logLevel: e.target.value }))}>
                                        <option value="error">Apenas erros</option>
                                        <option value="warn">Avisos + Erros</option>
                                        <option value="info">Info + Avisos + Erros</option>
                                        <option value="debug">Debug (tudo)</option>
                                    </select>
                                </Field>
                                <Field label="Tamanho máximo de upload (MB)">
                                    <input type="number" className={inputCls} value={sistema.maxUploadMb} onChange={e => setSistema(s => ({ ...s, maxUploadMb: e.target.value }))} min={1} max={100} />
                                </Field>
                            </div>
                        </div>

                        <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                            <h2 className="text-sm font-black uppercase tracking-widest text-primary mb-4">Gerenciamento de Usuários</h2>
                            <div className="space-y-3">
                                {[
                                    { icon: Users, label: 'Exportar todos os usuários', desc: 'CSV com todos os obreiros e administradores', action: 'Exportar CSV' },
                                    { icon: Database, label: 'Exportar dados JSON', desc: 'Backup completo dos dados da potência', action: 'Exportar JSON' },
                                    { icon: AlertCircle, label: 'Limpar cache do sistema', desc: 'Força reload de todos os caches internos', action: 'Limpar', danger: true },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between gap-4 p-4 rounded-xl border border-border bg-muted/10 hover:bg-muted/20 transition">
                                        <div className="flex items-start gap-3">
                                            <item.icon size={16} className="text-muted-foreground mt-0.5 shrink-0" />
                                            <div>
                                                <p className="text-sm font-bold text-primary">{item.label}</p>
                                                <p className="text-xs text-muted-foreground">{item.desc}</p>
                                            </div>
                                        </div>
                                        <button className={`text-xs font-black px-3 py-1.5 rounded-lg border transition shrink-0 ${(item as any).danger ? 'border-destructive/30 text-destructive hover:bg-destructive/5' : 'border-border text-muted-foreground hover:text-primary hover:border-primary/30'}`}>
                                            {item.action}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Version info */}
                        <div className="text-center py-4 space-y-1">
                            <p className="text-[10px] text-muted-foreground/40 font-mono">e.mason v1.0.0 · build 2026.02</p>
                            <p className="text-[10px] text-muted-foreground/30">Powered by Supabase + React + Vite</p>
                        </div>
                    </div>
                )}
            </div>

            {/* ── Mobile save bar ─────────────────────────────────────────── */}
            <div className="sticky bottom-0 bg-background/95 backdrop-blur border-t border-border px-4 py-3 flex items-center justify-between md:hidden">
                <span className="text-xs text-muted-foreground font-medium">Configurações do sistema</span>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-xs font-black hover:bg-primary/90 transition disabled:opacity-50"
                >
                    {saving ? <Loader2 size={13} className="animate-spin" /> : saved ? <Check size={13} /> : <Save size={13} />}
                    {saving ? 'Salvando...' : saved ? 'Salvo!' : 'Salvar'}
                </button>
            </div>
        </div>
    );
}
