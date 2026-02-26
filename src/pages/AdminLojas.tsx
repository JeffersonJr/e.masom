
import { useState, useEffect } from 'react';
import { Store, Plus, Search, Filter, MoreVertical, ExternalLink, Loader2, FileEdit } from 'lucide-react';
import { databaseService, type Loja } from '../lib/database-service';
import { useAuth } from '../contexts/AuthContext';
import LojaModal from '../components/LojaModal';

export default function AdminLojas() {
    const { profile } = useAuth();
    const [lojas, setLojas] = useState<Loja[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editLoja, setEditLoja] = useState<Loja | null>(null);

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

    useEffect(() => {
        loadLojas();
    }, [profile?.potencia_id]);

    const openCreate = () => {
        setEditLoja(null);
        setIsModalOpen(true);
    };

    const openEdit = (loja: Loja) => {
        setEditLoja(loja);
        setIsModalOpen(true);
    };

    const filteredLojas = lojas.filter(l =>
        l.nome.toLowerCase().includes(search.toLowerCase()) ||
        l.numero.includes(search)
    );

    return (
        <div className="p-10 space-y-12 bg-background min-h-screen">
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
            <div className="flex gap-6">
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
                <button className="px-6 py-4 bg-background border border-border rounded-md text-muted-foreground font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-2 hover:text-primary hover:border-primary transition shadow-sm">
                    <Filter size={16} /> Filtros
                </button>
            </div>

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
                        <button
                            onClick={openCreate}
                            className="mt-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-black text-[10px] uppercase tracking-widest hover:bg-primary/90 transition"
                        >
                            Criar primeira loja
                        </button>
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-muted/10 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] border-b border-border">
                            <tr>
                                <th className="px-8 py-6">Loja</th>
                                <th className="px-8 py-6">Número</th>
                                <th className="px-8 py-6">Rito</th>
                                <th className="px-8 py-6 text-center">Data Criad.</th>
                                <th className="px-8 py-6">Status</th>
                                <th className="px-8 py-6"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border text-primary">
                            {filteredLojas.map(loja => (
                                <tr key={loja.id} className="hover:bg-muted/5 transition group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-muted border border-border rounded-xl flex items-center justify-center text-muted-foreground overflow-hidden group-hover:border-accent/30 transition-colors duration-300">
                                                {loja.logo_url ? (
                                                    <img src={loja.logo_url} alt={loja.nome} className="w-full h-full object-cover" />
                                                ) : (
                                                    <Store size={20} className="group-hover:text-accent transition-colors duration-300" />
                                                )}
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
                                        {loja.status === 'rascunho' ? (
                                            <span className="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] bg-muted text-muted-foreground border border-border flex items-center gap-1.5 w-fit">
                                                <FileEdit size={10} /> Rascunho
                                            </span>
                                        ) : (
                                            <span className="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] bg-primary text-primary-foreground border border-white/5 w-fit block">
                                                Regular
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <button
                                                className="p-3 text-muted-foreground hover:text-primary transition hover:bg-muted/50 rounded-md"
                                                title="Ver página da loja"
                                                onClick={() => window.open(`/loja/${loja.slug}`, '_blank')}
                                            >
                                                <ExternalLink size={18} />
                                            </button>
                                            <button
                                                className="p-3 text-muted-foreground hover:text-primary transition hover:bg-muted/50 rounded-md"
                                                title="Editar loja"
                                                onClick={() => openEdit(loja)}
                                            >
                                                <MoreVertical size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <LojaModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSaved={loadLojas}
                editLoja={editLoja}
            />
        </div>
    );
}
