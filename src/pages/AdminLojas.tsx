
import { Store, Plus, Search, Filter, MoreVertical, ExternalLink } from 'lucide-react';

export default function AdminLojas() {
    const lojas = [
        { id: '1', nome: 'Aurora da Virtude', numero: '001', oriente: 'Vila Velha/ES', membros: 42, status: 'Regular' },
        { id: '2', nome: 'Cavaleiros da Luz', numero: '012', oriente: 'Vitória/ES', membros: 35, status: 'Regular' },
        { id: '3', nome: 'Estrela do Norte', numero: '045', oriente: 'Serra/ES', membros: 28, status: 'Pendente' },
    ];

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
                <button className="bg-primary text-primary-foreground px-8 py-4 rounded-md font-black flex items-center gap-2 hover:bg-primary/95 transition shadow-xl shadow-primary/10 uppercase text-[10px] tracking-[0.2em] active:scale-95">
                    <Plus size={20} className="text-accent" /> Nova Loja
                </button>
            </header>

            {/* Filters */}
            <div className="flex gap-6">
                <div className="relative flex-grow max-w-2xl group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-accent transition" size={18} />
                    <input type="text" placeholder="Buscar por nome ou número..." className="w-full pl-12 pr-6 py-4 bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition font-medium" />
                </div>
                <button className="px-6 py-4 bg-background border border-border rounded-md text-muted-foreground font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-2 hover:text-primary hover:border-primary transition shadow-sm">
                    <Filter size={16} /> Filtros
                </button>
            </div>

            <div className="bg-background border border-border rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-muted/10 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] border-b border-border">
                        <tr>
                            <th className="px-8 py-6">Loja</th>
                            <th className="px-8 py-6">Número</th>
                            <th className="px-8 py-6">Oriente</th>
                            <th className="px-8 py-6 text-center">Membros</th>
                            <th className="px-8 py-6">Status</th>
                            <th className="px-8 py-6"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-primary">
                        {lojas.map(loja => (
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
                                <td className="px-8 py-6 text-muted-foreground font-medium">{loja.oriente}</td>
                                <td className="px-8 py-6 text-center font-black text-primary">{loja.membros}</td>
                                <td className="px-8 py-6">
                                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] ${loja.status === 'Regular'
                                        ? 'bg-primary text-primary-foreground border border-white/5'
                                        : 'bg-accent/10 text-accent border border-accent/20 underline decoration-accent/30 decoration-offset-4'
                                        }`}>
                                        {loja.status}
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
            </div>
        </div>
    );
}
