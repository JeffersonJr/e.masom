import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
    X, Edit2, MapPin, Crown, Shield, User, Star, Calendar,
    Clock, CheckCircle2, XCircle, Plus, Trash2,
    ChevronRight, Building2, Hash, Landmark, ExternalLink,
} from 'lucide-react';
import { databaseService, type Loja } from '../lib/database-service';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DIAS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
const TIPOS_ENCONTRO = ['Administrativa', 'Filosófica', 'Iniciação', 'Elevação', 'Exaltação', 'Especial'];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="space-y-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 pl-0.5">{title}</h3>
            {children}
        </div>
    );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string | null }) {
    if (!value) return null;
    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5 text-muted-foreground/40 shrink-0">{icon}</div>
            <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">{label}</p>
                <p className="text-sm font-semibold text-primary mt-0.5">{value}</p>
            </div>
        </div>
    );
}

// Extrai nome exibível do membro
function membroNome(m: { nome: string; email?: string } | string): string {
    return typeof m === 'string' ? m : m.nome;
}

// ─── Per Capita Section ───────────────────────────────────────────────────────
function PerCapitaStatusBadge({ status }: { status: string }) {
    const config: Record<string, { label: string; bg: string; text: string; icon: any }> = {
        'pago': { label: 'Pago', bg: 'bg-emerald-100 text-emerald-700', text: 'text-emerald-600', icon: CheckCircle2 },
        'pago com atraso': { label: 'Pago com Atraso', bg: 'bg-amber-100 text-amber-700', text: 'text-amber-600', icon: CheckCircle2 },
        'em atraso': { label: 'Em Atraso', bg: 'bg-destructive/10 text-destructive', text: 'text-destructive', icon: XCircle },
        'pendente': { label: 'Pendente', bg: 'bg-muted text-muted-foreground', text: 'text-muted-foreground', icon: Clock },
    };
    const c = config[status] || config['pendente'];
    return (
        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md ${c.bg} text-[10px] font-black uppercase tracking-tighter`}>
            <c.icon size={11} /> {c.label}
        </div>
    );
}

function PerCapitaSection({ loja, onUpdate }: { loja: Loja; onUpdate: (data: Partial<Loja>) => void }) {
    const [saving, setSaving] = useState(false);
    const history = loja.per_capita_historico_json || [];
    const vencimentoDay = loja.per_capita_vencimento || 10;
    const valorObreiro = loja.per_capita_valor_obreiro || 0;

    // Calculate total members
    const mem = (loja.membros_json as any) || {};
    const totalMembros = (mem.irmaos?.length || 0) + (mem.cargos?.length || 0) + (mem.veneravel ? 1 : 0);
    const totalMensal = totalMembros * valorObreiro;

    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
    const today = new Date();
    const isPastDue = today.getDate() > vencimentoDay;

    const currentPayment = history.find(h => h.mes === currentMonth);

    let currentStatus: 'pago' | 'pago com atraso' | 'em atraso' | 'pendente' = 'pendente';
    if (currentPayment) {
        currentStatus = currentPayment.status;
    } else if (isPastDue) {
        currentStatus = 'em atraso';
    }

    const markAsPaid = async () => {
        setSaving(true);
        try {
            const status: any = isPastDue ? 'pago com atraso' : 'pago';
            const newPayment = {
                mes: currentMonth,
                status,
                data_pagamento: new Date().toISOString().slice(0, 10),
                valor_pago: totalMensal,
                total_membros: totalMembros
            };

            const updatedHistory = [newPayment, ...history].slice(0, 12); // Keep last 12
            await databaseService.updateLojaMeta(loja.id, {
                per_capita_historico_json: updatedHistory
            });
            onUpdate({ per_capita_historico_json: updatedHistory });
        } catch (e) { console.error(e); }
        finally { setSaving(false); }
    };

    return (
        <div className="space-y-4">
            {/* Dashboard Brief */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/10 border border-border rounded-xl p-4 space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/50">Membros Ativos</p>
                    <p className="text-xl font-black text-primary tracking-tighter">{totalMembros}</p>
                </div>
                <div className="bg-accent/5 border border-accent/10 rounded-xl p-4 space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-accent/60">Total Mensal</p>
                    <p className="text-xl font-black text-accent tracking-tighter">R$ {totalMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
            </div>

            {/* Current Month Card */}
            <div className="border border-border rounded-2xl p-5 bg-muted/20 space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Mês Atual</p>
                        <p className="text-sm font-black text-primary capitalize">{new Date().toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}</p>
                    </div>
                    <PerCapitaStatusBadge status={currentStatus} />
                </div>

                <div className="flex items-center justify-between text-[11px] py-3 border-y border-border/40">
                    <span className="text-muted-foreground/60 font-medium">Vencimento todo dia {vencimentoDay}</span>
                    <span className="font-black text-primary">Total: R$ {totalMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>

                {!currentPayment && (
                    <button
                        onClick={markAsPaid}
                        disabled={saving || !valorObreiro}
                        className="w-full py-3 bg-primary text-primary-foreground rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition disabled:opacity-50"
                    >
                        {saving ? 'Processando...' : 'Confirmar Pagamento'}
                    </button>
                )}
            </div>

            {/* History List */}
            {history.length > 0 && (
                <div className="space-y-3 pt-2">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 pl-1">Histórico Recente</h4>
                    <div className="space-y-2">
                        {history.map((h, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-border bg-background hover:bg-muted/5 transition">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${h.status.startsWith('pago') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-muted text-muted-foreground'}`}>
                                        <Landmark size={14} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-primary uppercase">{h.mes}</p>
                                        <p className="text-[10px] text-muted-foreground font-medium">{h.data_pagamento ? new Date(h.data_pagamento).toLocaleDateString('pt-BR') : '---'}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-black text-primary">R$ {h.valor_pago.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                    <p className={`text-[9px] font-bold uppercase ${h.status === 'pago com atraso' ? 'text-amber-500' : 'text-emerald-500'}`}>{h.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

const FREQUENCIAS = [
    'Semanal',
    '1ª Semana',
    '2ª Semana',
    '3ª Semana',
    '4ª Semana',
    'Última Semana',
    '1ª e 3ª Semanas',
    '2ª e 4ª Semanas',
];

// ─── Encontros Section ────────────────────────────────────────────────────────
function EncontrosSection({ loja, onUpdate }: { loja: Loja; onUpdate: (data: Partial<Loja>) => void }) {
    const [encontros, setEncontros] = useState<NonNullable<Loja['encontros_json']>>(loja.encontros_json ?? []);
    const [saving, setSaving] = useState(false);
    const [adding, setAdding] = useState(false);
    const [draft, setDraft] = useState({ dia: 'Segunda', horario: '19:30', tipo: 'Administrativa', frequencia: 'Semanal' });

    const save = async (updated: NonNullable<Loja['encontros_json']>) => {
        setSaving(true);
        try {
            await databaseService.updateLojaMeta(loja.id, { encontros_json: updated });
            onUpdate({ encontros_json: updated });
            setEncontros(updated);
        } catch (e) { console.error(e); }
        finally { setSaving(false); }
    };

    const add = async () => {
        const updated = [...encontros, draft];
        await save(updated);
        setAdding(false);
        setDraft({ dia: 'Segunda', horario: '19:30', tipo: 'Administrativa', frequencia: 'Semanal' });
    };

    const remove = async (idx: number) => {
        const updated = encontros.filter((_, i) => i !== idx);
        await save(updated);
    };

    return (
        <div className="space-y-4">
            {encontros.length === 0 && !adding && (
                <p className="text-xs text-muted-foreground/40 italic px-1">Nenhum encontro cadastrado.</p>
            )}
            <div className="space-y-2">
                {encontros.map((enc, i) => (
                    <div key={i} className="flex flex-col gap-1.5 border border-border rounded-xl p-4 bg-muted/20 group relative">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Calendar size={13} className="text-accent" />
                                <span className="font-black text-sm text-primary uppercase tracking-tighter">{enc.dia}</span>
                                <span className="text-[10px] font-bold text-muted-foreground/60 border-l border-border pl-2 uppercase tracking-widest">{enc.frequencia || 'Semanal'}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5 bg-background border border-border rounded-md px-2 py-1">
                                    <Clock size={12} className="text-muted-foreground/40" />
                                    <span className="font-mono text-xs font-black text-primary">{enc.horario}</span>
                                </div>
                                <button
                                    onClick={() => remove(i)}
                                    disabled={saving}
                                    className="p-1.5 text-destructive/40 hover:text-destructive hover:bg-destructive/5 rounded-lg transition"
                                >
                                    <Trash2 size={13} />
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="px-2 py-0.5 bg-accent/10 rounded text-[9px] font-black uppercase text-accent tracking-widest">{enc.tipo}</div>
                        </div>
                    </div>
                ))}
            </div>

            {adding ? (
                <div className="border border-accent/20 rounded-2xl p-5 space-y-4 bg-accent/5">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-[10px] font-black">
                            <Plus size={12} />
                        </div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-accent">Novo Encontro</h4>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 pl-1">Dia da Semana</label>
                            <select
                                value={draft.dia}
                                onChange={e => setDraft(d => ({ ...d, dia: e.target.value }))}
                                className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-xs font-black outline-none focus:ring-2 focus:ring-accent/20 transition"
                            >
                                {DIAS.map(d => <option key={d}>{d}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 pl-1">Horário</label>
                            <input
                                type="time"
                                value={draft.horario}
                                onChange={e => setDraft(d => ({ ...d, horario: e.target.value }))}
                                className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-xs font-black outline-none focus:ring-2 focus:ring-accent/20 transition"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 pl-1">Frequência</label>
                            <select
                                value={draft.frequencia}
                                onChange={e => setDraft(d => ({ ...d, frequencia: e.target.value }))}
                                className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-xs font-black outline-none focus:ring-2 focus:ring-accent/20 transition text-accent"
                            >
                                {FREQUENCIAS.map(f => <option key={f}>{f}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 pl-1">Tipo de Sessão</label>
                            <select
                                value={draft.tipo}
                                onChange={e => setDraft(d => ({ ...d, tipo: e.target.value }))}
                                className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-xs font-black outline-none focus:ring-2 focus:ring-accent/20 transition"
                            >
                                {TIPOS_ENCONTRO.map(t => <option key={t}>{t}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                        <button onClick={add} disabled={saving} className="flex-1 py-3 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition shadow-lg shadow-primary/10">
                            {saving ? 'Processando...' : 'Confirmar Encontro'}
                        </button>
                        <button onClick={() => setAdding(false)} className="px-5 py-3 bg-muted text-muted-foreground text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-muted/70 transition">
                            Desistir
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setAdding(true)}
                    className="w-full flex items-center justify-center gap-2 py-4 border border-dashed border-border rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-accent hover:border-accent/40 hover:bg-accent/5 transition-all"
                >
                    <Plus size={14} className="text-accent" /> Adicionar Encontro Periódico
                </button>
            )}
        </div>
    );
}



// ─── Main Component ────────────────────────────────────────────────────────────
export default function LojaDetail({ open, onClose, loja, onEdit, onChanged }: {
    open: boolean;
    onClose: () => void;
    loja: Loja | null;
    onEdit: (l: Loja) => void;
    onChanged: () => void;
}) {
    const [cur, setCur] = useState<Loja | null>(loja);

    // Sync when loja prop changes
    useEffect(() => {
        setCur(loja);
    }, [loja]);

    const updateLocal = (data: Partial<Loja>) => {
        if (cur) {
            const updated = { ...cur, ...data };
            setCur(updated);
            onChanged(); // Notify parent to refresh list if needed
        }
    };

    if (!open || !cur) return null;
    const activeLoja = cur;

    const loc = (activeLoja.localizacao_json as any) || {};
    const endereco = [loc.logradouro, loc.numero_end, loc.bairro].filter(Boolean).join(', ');
    const locCompleta = [loc.cidade, loc.estado].filter(Boolean).join(' / ');

    return createPortal(
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-y-0 right-0 left-0 lg:left-72 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Full-screen panel */}
            <div
                className={`fixed inset-y-0 right-0 left-0 lg:left-72 z-50 flex flex-col bg-background transition-all duration-300 ease-out ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98] pointer-events-none'}`}
            >
                {!cur ? null : (
                    <>
                        {/* ── Top bar ───────────────────────────────────────── */}
                        <div className="flex items-center gap-3 px-4 md:px-8 py-4 border-b border-border bg-background/80 backdrop-blur-sm shrink-0 flex-wrap">
                            {cur.logo_url ? (
                                <img src={cur.logo_url} alt={cur.nome} className="w-10 h-10 md:w-11 md:h-11 rounded-xl object-contain border border-border bg-muted/30 shrink-0" />
                            ) : (
                                <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-primary/5 border border-border flex items-center justify-center shrink-0">
                                    <Building2 size={20} className="text-primary/30" />
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <h1 className="font-black text-lg md:text-xl text-primary leading-tight truncate">{cur.nome}</h1>
                                <div className="flex items-center gap-2 md:gap-3 mt-0.5 flex-wrap">
                                    <span className="font-mono text-[11px] font-bold text-muted-foreground">Nº {cur.numero}</span>
                                    {cur.rito && (
                                        <div className="flex gap-1.5 ml-1">
                                            {cur.rito.split(',').map(r => (
                                                <span key={r} className="px-2 py-0.5 bg-muted border border-border rounded text-[9px] font-black uppercase text-muted-foreground/70 tracking-tighter">
                                                    {r.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    {locCompleta && (
                                        <span className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground/50">
                                            <MapPin size={10} /> {locCompleta}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-1 md:gap-2 shrink-0">
                                <button
                                    onClick={() => window.open(`/${cur.slug}`, '_blank')}
                                    className="flex items-center gap-1.5 px-3 py-2 text-xs md:text-sm font-bold text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-xl transition border border-transparent hover:border-border"
                                >
                                    <ExternalLink size={14} /> <span className="hidden sm:inline">Ver Site</span>
                                </button>
                                <button
                                    onClick={() => onEdit(cur)}
                                    className="flex items-center gap-1.5 px-3 md:px-4 py-2 text-xs md:text-sm font-black bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition"
                                >
                                    <Edit2 size={14} /> Editar
                                </button>
                                <button
                                    onClick={onClose}
                                    className="p-2 text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-xl transition"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* ── Body ──────────────────────────────────────────── */}
                        <div className="flex-1 overflow-y-auto md:overflow-hidden md:grid md:grid-cols-3 gap-0">

                            {/* Col 1+2 — principal */}
                            <div className="md:col-span-2 overflow-y-auto p-4 md:p-8 space-y-8 md:space-y-10 border-b md:border-b-0 md:border-r border-border">

                                {/* Diretoria */}
                                <Section title="Diretoria">
                                    <div className="grid grid-cols-2 gap-4">
                                        {(() => {
                                            const mem = cur.membros_json as any || {};
                                            const veneravel = mem.veneravel ? mem.veneravel.nome : (mem.veneravel_id || null);
                                            const pastMaster = (mem.cargos || []).find((c: any) => c.cargo?.toLowerCase().includes('past'));
                                            return (
                                                <>
                                                    {veneravel ? (
                                                        <div className="flex items-center gap-4 border border-amber-200 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/5 rounded-2xl px-5 py-4">
                                                            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                                                                <Crown size={20} className="text-amber-600 dark:text-amber-400" />
                                                            </div>
                                                            <div>
                                                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-amber-600/70 dark:text-amber-400/60">Venerável Mestre</p>
                                                                <p className="font-black text-base text-amber-700 dark:text-amber-300 mt-0.5">{veneravel}</p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-4 border border-dashed border-border rounded-2xl px-5 py-4">
                                                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                                                                <Crown size={20} className="text-muted-foreground/30" />
                                                            </div>
                                                            <p className="text-sm text-muted-foreground/40 italic">Venerável não cadastrado</p>
                                                        </div>
                                                    )}
                                                    {pastMaster ? (
                                                        <div className="flex items-center gap-4 border border-border bg-muted/20 rounded-2xl px-5 py-4">
                                                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                                                                <Star size={18} className="text-muted-foreground" />
                                                            </div>
                                                            <div>
                                                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">Past Master</p>
                                                                <p className="font-black text-base text-primary mt-0.5">{pastMaster.nome}</p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-4 border border-dashed border-border rounded-2xl px-5 py-4">
                                                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                                                                <Star size={18} className="text-muted-foreground/30" />
                                                            </div>
                                                            <p className="text-sm text-muted-foreground/40 italic">Past Master não cadastrado</p>
                                                        </div>
                                                    )}
                                                </>
                                            );
                                        })()}
                                    </div>
                                </Section>

                                {/* Irmãos com Cargo */}
                                {(() => {
                                    const mem = cur.membros_json as any || {};
                                    const cargos: { nome: string; cargo: string }[] = (mem.cargos || []).filter((c: any) => !c.cargo?.toLowerCase().includes('past'));
                                    if (cargos.length === 0) return null;
                                    return (
                                        <Section title={`Irmãos com Cargo (${cargos.length})`}>
                                            <div className="grid grid-cols-2 gap-3">
                                                {cargos.map((c, i) => (
                                                    <div key={i} className="flex items-center gap-3 border border-border rounded-xl px-4 py-3 bg-muted/10 hover:bg-muted/20 transition">
                                                        <div className="w-9 h-9 rounded-full bg-primary/5 border border-border flex items-center justify-center shrink-0">
                                                            <Shield size={14} className="text-primary/50" />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="font-bold text-sm text-primary truncate">{c.nome}</p>
                                                            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest">{c.cargo}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </Section>
                                    );
                                })()}

                                {/* Irmãos */}
                                {(() => {
                                    const mem = cur.membros_json as any || {};
                                    const irmaos: (string | { nome: string })[] = mem.irmaos || [];
                                    if (irmaos.length === 0) return null;
                                    return (
                                        <Section title={`Irmãos (${irmaos.length})`}>
                                            <div className="grid grid-cols-3 gap-2">
                                                {irmaos.map((irm, i) => (
                                                    <div key={i} className="flex items-center gap-2.5 border border-border rounded-xl px-3 py-2.5 bg-muted/10 hover:bg-muted/20 transition">
                                                        <div className="w-7 h-7 rounded-full bg-muted/50 flex items-center justify-center shrink-0">
                                                            <User size={12} className="text-muted-foreground/60" />
                                                        </div>
                                                        <span className="text-xs font-semibold text-primary/80 truncate">{membroNome(irm)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </Section>
                                    );
                                })()}

                                {/* Agenda */}
                                <Section title="Agenda de Encontros">
                                    <EncontrosSection loja={cur} onUpdate={updateLocal} />
                                </Section>
                            </div>

                            {/* Col 3 — sidebar direita */}
                            <div className="overflow-y-auto p-4 md:p-8 space-y-6 md:space-y-8">

                                {/* Per Capita */}
                                <Section title="Per Capita">
                                    <PerCapitaSection loja={cur} onUpdate={updateLocal} />
                                </Section>

                                {/* Localização */}
                                <Section title="Localização">
                                    <div className="border border-border rounded-2xl p-5 bg-muted/10 space-y-4">
                                        <InfoRow icon={<MapPin size={14} />} label="Endereço" value={endereco || undefined} />
                                        <InfoRow icon={<Hash size={14} />} label="CEP" value={loc.cep} />
                                        <InfoRow icon={<Landmark size={14} />} label="Cidade / Estado" value={locCompleta || undefined} />
                                        {loc.complemento && <InfoRow icon={<ChevronRight size={14} />} label="Complemento" value={loc.complemento} />}
                                        {!endereco && !locCompleta && (
                                            <p className="text-xs text-muted-foreground/40 italic">Localização não cadastrada.</p>
                                        )}
                                    </div>
                                </Section>

                                {/* Rito */}
                                <Section title="Rito Praticado">
                                    <div className="flex flex-wrap gap-2">
                                        {cur.rito ? (
                                            cur.rito.split(',').map(r => (
                                                <div key={r} className="px-3 py-1.5 bg-primary/5 border border-primary/10 rounded-xl text-xs font-black text-primary uppercase tracking-tight">
                                                    {r.trim()}
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-xs text-muted-foreground/40 italic pl-1">Não informado.</p>
                                        )}
                                    </div>
                                </Section>

                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
        , document.body);
}
