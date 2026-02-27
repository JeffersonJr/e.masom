
import { useState, useEffect, useRef } from 'react';
import {
    Store, Plus, Search, ExternalLink, Loader2,
    FileEdit, Edit2, Trash2, MoreVertical, AlertTriangle, X, PowerOff, Power, Eye
} from 'lucide-react';
import { databaseService, type Loja } from '../lib/database-service';
import { useAuth } from '../contexts/AuthContext';
import LojaModal from '../components/LojaModal';
import LojaDetail from '../components/LojaDetail';

// ─── Confirmation Dialog ──────────────────────────────────────────────────────
function ConfirmDialog({
    open, onClose, onConfirm, loading,
    title, description, confirmLabel, variant,
}: {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
    title: string;
    description: string;
    confirmLabel: string;
    variant: 'danger' | 'warning';
}) {
    if (!open) return null;
    const colors = variant === 'danger'
        ? 'bg-destructive text-white hover:bg-destructive/90'
        : 'bg-amber-500 text-white hover:bg-amber-600';

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative z-10 w-full max-w-md bg-background border border-border rounded-2xl shadow-2xl p-8 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-start gap-4 mb-6">
                    <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${variant === 'danger' ? 'bg-destructive/10' : 'bg-amber-500/10'}`}>
                        <AlertTriangle size={20} className={variant === 'danger' ? 'text-destructive' : 'text-amber-500'} />
                    </div>
                    <div>
                        <h3 className="text-base font-black text-primary">{title}</h3>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{description}</p>
                    </div>
                    <button onClick={onClose} className="ml-auto p-1 text-muted-foreground hover:text-primary transition">
                        <X size={18} />
                    </button>
                </div>
                <div className="flex gap-3 justify-end">
                    <button onClick={onClose} disabled={loading}
                        className="px-5 py-2.5 text-sm font-black text-primary border border-border rounded-md hover:bg-muted transition uppercase tracking-widest text-[10px]">
                        Cancelar
                    </button>
                    <button onClick={onConfirm} disabled={loading}
                        className={`px-5 py-2.5 text-[10px] font-black rounded-md transition uppercase tracking-widest flex items-center gap-2 ${colors} disabled:opacity-60`}>
                        {loading && <Loader2 size={14} className="animate-spin" />}
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Row Action Menu ──────────────────────────────────────────────────────────
function RowMenu({
    loja,
    onEdit,
    onToggleStatus,
    onDelete,
}: {
    loja: Loja;
    onEdit: () => void;
    onToggleStatus: () => void;
    onDelete: () => void;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const isActive = loja.status === 'ativo';

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen(o => !o)}
                className="p-2.5 text-muted-foreground hover:text-primary transition hover:bg-muted/50 rounded-md"
                title="Ações"
            >
                <MoreVertical size={18} />
            </button>

            {open && (
                <div className="absolute right-0 top-full mt-1 w-52 bg-background border border-border rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                    <button
                        onClick={() => { setOpen(false); onEdit(); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-primary hover:bg-muted/50 transition"
                    >
                        <Edit2 size={15} className="text-muted-foreground" /> Editar
                    </button>

                    <button
                        onClick={() => { setOpen(false); window.open(`/${loja.slug}`, '_blank'); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-primary hover:bg-muted/50 transition"
                    >
                        <ExternalLink size={15} className="text-muted-foreground" /> Ver Site
                    </button>

                    <div className="border-t border-border" />

                    <button
                        onClick={() => { setOpen(false); onToggleStatus(); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold transition ${isActive
                            ? 'text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-500/10'
                            : 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10'
                            }`}
                    >
                        {isActive
                            ? <><PowerOff size={15} /> Desativar</>
                            : <><Power size={15} /> Ativar</>
                        }
                    </button>

                    <button
                        onClick={() => { setOpen(false); onDelete(); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-destructive hover:bg-destructive/5 transition"
                    >
                        <Trash2 size={15} /> Excluir
                    </button>
                </div>
            )}
        </div>
    );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: Loja['status'] }) {
    if (status === 'rascunho') return (
        <span className="px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] bg-muted text-muted-foreground border border-border flex items-center gap-1.5 w-fit">
            <FileEdit size={10} /> Rascunho
        </span>
    );
    if (status === 'arquivado') return (
        <span className="px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20 flex items-center gap-1.5 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" /> Desativada
        </span>
    );
    return (
        <span className="px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] bg-primary text-primary-foreground border border-white/5 w-fit block">
            Regular
        </span>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdminLojas() {
    const { profile } = useAuth();
    const [lojas, setLojas] = useState<Loja[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<'todos' | 'ativo' | 'rascunho' | 'arquivado'>('todos');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editLoja, setEditLoja] = useState<Loja | null>(null);
    const [modalKey, setModalKey] = useState(0);
    const [detailLoja, setDetailLoja] = useState<Loja | null>(null);

    // Confirm dialog state (só para excluir)
    const [confirm, setConfirm] = useState<{
        open: boolean;
        loja: Loja | null;
        loading: boolean;
    }>({ open: false, loja: null, loading: false });

    const loadLojas = async () => {
        if (!profile?.potencia_id) return;
        try {
            setLoading(true);
            const data = await databaseService.getLojas(profile.potencia_id);
            setLojas(data);
        } catch (error) {
            console.error('Erro ao carregar lojas:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadLojas(); }, [profile?.potencia_id]);

    const openCreate = () => { setEditLoja(null); setModalKey(k => k + 1); setIsModalOpen(true); };
    const openEdit = (loja: Loja) => {
        // Seta ambos em batch (React 18 auto-batches) → modal remonta com editLoja já definido
        setEditLoja(loja);
        setModalKey(k => k + 1);
        setIsModalOpen(true);
    };

    const askDelete = (loja: Loja) =>
        setConfirm({ open: true, loja, loading: false });

    // Ativar / Desativar sem confirm
    const handleToggleStatus = async (loja: Loja) => {
        try {
            if (loja.status === 'ativo') {
                await databaseService.archiveLoja(loja.id);
            } else {
                await databaseService.activateLoja(loja.id);
            }
            await loadLojas();
        } catch (err) {
            console.error('Erro ao alterar status:', err);
        }
    };

    const handleConfirm = async () => {
        if (!confirm.loja) return;
        setConfirm(c => ({ ...c, loading: true }));
        try {
            await databaseService.deleteLoja(confirm.loja.id);
            await loadLojas();
            setConfirm({ open: false, loja: null, loading: false });
        } catch (err) {
            console.error('Erro ao excluir:', err);
            setConfirm(c => ({ ...c, loading: false }));
        }
    };

    const filteredLojas = lojas.filter(l => {
        const matchSearch =
            l.nome.toLowerCase().includes(search.toLowerCase()) ||
            l.numero.includes(search);
        const matchStatus = statusFilter === 'todos' || l.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const counts = {
        todos: lojas.length,
        ativo: lojas.filter(l => l.status === 'ativo').length,
        rascunho: lojas.filter(l => l.status === 'rascunho').length,
        arquivado: lojas.filter(l => l.status === 'arquivado').length,
    };

    return (
        <div className="p-10 space-y-10 bg-background min-h-screen">
            <header className="flex justify-between items-end border-b border-border pb-10">
                <div>
                    <h1 className="text-5xl font-black text-primary tracking-tighter leading-none mb-4">Lojas Federadas</h1>
                    <p className="text-muted-foreground font-medium flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent rounded-full" />
                        Gestão e acompanhamento das oficinas da jurisdição
                    </p>
                </div>
                <button
                    onClick={openCreate}
                    className="bg-primary text-primary-foreground px-8 py-4 rounded-md font-black flex items-center gap-2 hover:bg-primary/95 transition shadow-xl shadow-primary/10 uppercase text-[10px] tracking-[0.2em] active:scale-95"
                >
                    <Plus size={20} className="text-accent" /> Nova Loja
                </button>
            </header>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
                <div className="relative flex-grow max-w-2xl group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-accent transition" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar por nome ou número..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-12 pr-6 py-4 bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition font-medium"
                    />
                </div>

                {/* Status filter tabs */}
                <div className="flex items-center gap-1 p-1 bg-muted/30 border border-border rounded-lg">
                    {([
                        { key: 'todos', label: 'Todas' },
                        { key: 'ativo', label: 'Ativas' },
                        { key: 'rascunho', label: 'Rascunho' },
                        { key: 'arquivado', label: 'Desativadas' },
                    ] as const).map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setStatusFilter(tab.key)}
                            className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-md transition-all flex items-center gap-1.5 ${statusFilter === tab.key
                                ? 'bg-background text-primary shadow-sm border border-border'
                                : 'text-muted-foreground hover:text-primary'
                                }`}
                        >
                            {tab.label}
                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black ${statusFilter === tab.key ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'
                                }`}>
                                {counts[tab.key]}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-background border border-border rounded-xl shadow-sm overflow-hidden min-h-[400px]">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4">
                        <Loader2 className="animate-spin text-accent" size={40} />
                        <p className="font-black uppercase tracking-[0.2em] text-[10px]">Carregando Oficinas...</p>
                    </div>
                ) : filteredLojas.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4">
                        <Store size={40} className="opacity-20" />
                        <p className="font-bold">Nenhuma loja encontrada.</p>
                        {statusFilter === 'todos' && (
                            <button
                                onClick={openCreate}
                                className="mt-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-black text-[10px] uppercase tracking-widest hover:bg-primary/90 transition"
                            >
                                Criar primeira loja
                            </button>
                        )}
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-muted/10 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] border-b border-border">
                            <tr>
                                <th className="px-8 py-6">Loja</th>
                                <th className="px-8 py-6">Número</th>
                                <th className="px-8 py-6">Rito</th>
                                <th className="px-8 py-6 text-center">Criada em</th>
                                <th className="px-8 py-6">Status</th>
                                <th className="px-8 py-6" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border text-primary">
                            {filteredLojas.map(loja => (
                                <tr key={loja.id} className={`hover:bg-muted/5 transition group ${loja.status === 'arquivado' ? 'opacity-60' : ''}`}>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-muted border border-border rounded-xl flex items-center justify-center text-muted-foreground overflow-hidden group-hover:border-accent/30 transition-colors duration-300">
                                                {loja.logo_url
                                                    ? <img src={loja.logo_url} alt={loja.nome} className="w-full h-full object-cover" />
                                                    : <Store size={20} className="group-hover:text-accent transition-colors duration-300" />
                                                }
                                            </div>
                                            <div>
                                                <span className="font-black text-lg tracking-tight text-primary block">{loja.nome}</span>
                                                <span className="text-[10px] text-muted-foreground font-mono">/{loja.slug}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 font-mono text-xs font-bold text-muted-foreground tracking-widest">{loja.numero}</td>
                                    <td className="px-8 py-6 text-muted-foreground font-medium text-sm">{loja.rito || 'REAA'}</td>
                                    <td className="px-8 py-6 text-center font-medium text-muted-foreground text-xs">
                                        {new Date(loja.created_at).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="px-8 py-6">
                                        <StatusBadge status={loja.status} />
                                    </td>
                                    <td className="px-8 py-6 flex items-center justify-end gap-1">
                                        <button
                                            onClick={() => setDetailLoja(loja)}
                                            className="p-2.5 text-muted-foreground hover:text-primary transition hover:bg-muted/50 rounded-md"
                                            title="Ver detalhes"
                                        >
                                            <Eye size={16} />
                                        </button>
                                        <RowMenu
                                            loja={loja}
                                            onEdit={() => openEdit(loja)}
                                            onToggleStatus={() => handleToggleStatus(loja)}
                                            onDelete={() => askDelete(loja)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Lodge Modal */}
            <LojaModal
                key={modalKey}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSaved={loadLojas}
                editLoja={editLoja}
            />

            {/* Lodge Detail Drawer */}
            <LojaDetail
                open={!!detailLoja}
                loja={detailLoja}
                onClose={() => setDetailLoja(null)}
                onEdit={(loja) => { setDetailLoja(null); openEdit(loja); }}
                onChanged={loadLojas}
            />

            {/* Confirm Dialog */}
            <ConfirmDialog
                open={confirm.open}
                onClose={() => setConfirm(c => ({ ...c, open: false }))}
                onConfirm={handleConfirm}
                loading={confirm.loading}
                variant="danger"
                title={`Excluir "${confirm.loja?.nome}"?`}
                description="Esta ação é permanente e irreversível. Todos os dados da loja serão removidos do banco de dados."
                confirmLabel="Sim, excluir"
            />
        </div>
    );
}
