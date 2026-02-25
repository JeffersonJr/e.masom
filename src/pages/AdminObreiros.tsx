
import { Users, Search, Filter, Download, UserPlus, ShieldCheck } from 'lucide-react';

export default function AdminObreiros() {
    const obreiros = [
        { id: '1', nome: 'Antônio Carlos Silva', loja: 'Aurora (001)', grau: 'Mestre', cargo: 'Venerável Mestre', status: 'Regular' },
        { id: '2', nome: 'Ricardo Mendes', loja: 'Aurora (001)', grau: 'Companheiro', cargo: 'Nenhum', status: 'Regular' },
        { id: '3', nome: 'Lucas Ferreira', loja: 'Cavaleiros (012)', grau: 'Aprendiz', cargo: 'Nenhum', status: 'Regular' },
    ];

    return (
        <div className="p-10 space-y-12 bg-background min-h-screen">
            <header className="flex justify-between items-end border-b border-border pb-10">
                <div>
                    <h1 className="text-5xl font-black text-primary tracking-tighter leading-none mb-4">Cadastro de Obreiros</h1>
                    <p className="text-muted-foreground font-medium flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent rounded-full" />
                        Base unificada de dados da jurisdição
                    </p>
                </div>
                <div className="flex gap-4">
                    <button className="bg-background border border-border text-muted-foreground px-6 py-4 rounded-md font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-2 hover:text-primary hover:border-primary transition shadow-sm">
                        <Download size={16} /> Exportar
                    </button>
                    <button className="bg-accent text-primary px-8 py-4 rounded-md font-black flex items-center gap-2 hover:bg-accent/90 transition shadow-xl shadow-accent/10 uppercase text-[10px] tracking-[0.2em] active:scale-95">
                        <UserPlus size={18} /> Novo Obreiro
                    </button>
                </div>
            </header>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatSimpleCard title="Total Geral" value="1.240" />
                <StatSimpleCard title="Mestres" value="856" />
                <StatSimpleCard title="Aprendizes" value="192" />
                <StatSimpleCard title="Irregulares" value="14" warning />
            </div>

            {/* List */}
            <div className="bg-background border border-border rounded-xl shadow-sm overflow-hidden">
                <div className="p-8 border-b border-border flex gap-6 bg-muted/5">
                    <div className="relative flex-grow max-w-2xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-accent transition" size={18} />
                        <input type="text" placeholder="Buscar por nome, CIM ou Loja..." className="w-full pl-12 pr-6 py-4 bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition font-medium" />
                    </div>
                    <button className="px-6 py-4 bg-background border border-border rounded-md text-muted-foreground font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-2 hover:text-primary hover:border-primary transition">
                        <Filter size={16} /> Filtros
                    </button>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-muted/10 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] border-b border-border">
                        <tr>
                            <th className="px-8 py-6">Obreiro</th>
                            <th className="px-8 py-6">Grau</th>
                            <th className="px-8 py-6">Loja Atual</th>
                            <th className="px-8 py-6">Cargo</th>
                            <th className="px-8 py-6 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-primary">
                        {obreiros.map(worker => (
                            <tr key={worker.id} className="hover:bg-muted/5 transition group">
                                <td className="px-8 py-6 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground group-hover:bg-accent group-hover:text-primary transition-colors">
                                        <Users size={16} />
                                    </div>
                                    <div>
                                        <p className="font-black text-base tracking-tight">{worker.nome}</p>
                                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-0.5">CIM: 123456</p>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-2 font-bold">
                                        <ShieldCheck size={16} className="text-accent" />
                                        {worker.grau}
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-muted-foreground font-medium">{worker.loja}</td>
                                <td className="px-8 py-6 text-muted-foreground font-medium">{worker.cargo}</td>
                                <td className="px-8 py-6 text-right">
                                    <span className="px-4 py-1.5 bg-primary text-primary-foreground rounded-full text-[9px] font-black uppercase tracking-[0.2em]">
                                        {worker.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function StatSimpleCard({ title, value, warning }: { title: string, value: string, warning?: boolean }) {
    return (
        <div className="bg-background p-8 rounded-xl border border-border shadow-sm hover:shadow-xl hover:border-accent/40 transition-all group">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{title}</p>
            <p className={`text-4xl font-black mt-2 tracking-tighter ${warning ? 'text-accent underline decoration-accent/30 decoration-offset-4' : 'text-primary'}`}>{value}</p>
        </div>
    );
}

