
import { useState, useEffect } from 'react';
import { Store, Plus, Search, Filter, MoreVertical, ExternalLink, Loader2 } from 'lucide-react';
import { databaseService, type Loja } from '../lib/database-service';
import { useAuth } from '../contexts/AuthContext';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";

export default function AdminLojas() {
    const { profile } = useAuth();
    const [lojas, setLojas] = useState<Loja[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Form state
    const [newLoja, setNewLoja] = useState({
        nome: '',
        numero: '',
        rito: 'REAA',
        slug: ''
    });

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

    const handleCreateLoja = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!profile?.potencia_id) return;

        try {
            await databaseService.createLoja({
                ...newLoja,
                potencia_id: profile.potencia_id,
                slug: newLoja.slug || newLoja.nome.toLowerCase().replace(/ /g, '-')
            });
            setIsDialogOpen(false);
            setNewLoja({ nome: '', numero: '', rito: 'REAA', slug: '' });
            loadLojas();
        } catch (error) {
            console.error('Erro ao criar loja:', error);
            alert('Erro ao criar loja. Verifique se o slug ou número já existem.');
        }
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

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <button className="bg-primary text-primary-foreground px-8 py-4 rounded-md font-black flex items-center gap-2 hover:bg-primary/95 transition shadow-xl shadow-primary/10 uppercase text-[10px] tracking-[0.2em] active:scale-95">
                            <Plus size={20} className="text-accent" /> Nova Loja
                        </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black tracking-tighter uppercase">Cadastrar Nova Oficina</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleCreateLoja} className="space-y-6 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="nome" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Nome da Loja</Label>
                                <Input
                                    id="nome"
                                    value={newLoja.nome}
                                    onChange={e => setNewLoja({ ...newLoja, nome: e.target.value })}
                                    placeholder="Ex: Aurora da Virtude"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="numero" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Número</Label>
                                    <Input
                                        id="numero"
                                        value={newLoja.numero}
                                        onChange={e => setNewLoja({ ...newLoja, numero: e.target.value })}
                                        placeholder="000"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="rito" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Rito</Label>
                                    <Input
                                        id="rito"
                                        value={newLoja.rito}
                                        onChange={e => setNewLoja({ ...newLoja, rito: e.target.value })}
                                        placeholder="REAA"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="slug" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Slug (URL Personalizada)</Label>
                                <Input
                                    id="slug"
                                    value={newLoja.slug}
                                    onChange={e => setNewLoja({ ...newLoja, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                                    placeholder="aurora-001"
                                />
                            </div>
                            <DialogFooter>
                                <Button type="submit" className="w-full bg-primary text-primary-foreground font-black uppercase tracking-widest text-[10px] py-6">Criar Loja</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
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
                    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-2">
                        <Store size={40} className="opacity-20" />
                        <p className="font-bold">Nenhuma loja encontrada.</p>
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
                                            <div className="w-12 h-12 bg-muted border border-border rounded-xl flex items-center justify-center text-muted-foreground group-hover:bg-accent group-hover:text-primary transition-colors duration-500">
                                                <Store size={20} />
                                            </div>
                                            <span className="font-black text-lg tracking-tight text-primary">{loja.nome}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 font-mono text-xs font-bold text-muted-foreground tracking-widest">{loja.numero}</td>
                                    <td className="px-8 py-6 text-muted-foreground font-medium">{loja.rito || 'REAA'}</td>
                                    <td className="px-8 py-6 text-center font-medium text-muted-foreground text-xs">
                                        {new Date(loja.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] bg-primary text-primary-foreground border border-white/5">
                                            Regular
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <button className="p-3 text-muted-foreground hover:text-primary transition hover:bg-muted/50 rounded-md">
                                                <ExternalLink size={18} />
                                            </button>
                                            <button className="p-3 text-muted-foreground hover:text-primary transition hover:bg-muted/50 rounded-md">
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
        </div>
    );
}
