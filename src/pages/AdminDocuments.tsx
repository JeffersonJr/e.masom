import {
    Search,
    Filter,
    FileText,
    CheckCircle2,
    Clock,
    AlertCircle,
    Download,
    Eye,
    MoreVertical,
    ChevronRight
} from 'lucide-react';

const mockDocuments = [
    { id: 1, title: 'Ata de Sessão Econômica', lodge: 'Loja Estrela do Norte nº 42', date: '2024-05-20', type: 'Ata', status: 'pending', importance: 'medium' },
    { id: 2, title: 'Iniciação de Candidato', lodge: 'Loja Luz da Verdade nº 15', date: '2024-05-19', type: 'Processo', status: 'approved', importance: 'high' },
    { id: 3, title: 'Pedido de Placet Ex-voto', lodge: 'Loja Silêncio e Virtude nº 03', date: '2024-05-18', type: 'Placet', status: 'rejected', importance: 'high' },
    { id: 4, title: 'Relatório Trimestral Tesouraria', lodge: 'Loja Fraternidade Universal nº 01', date: '2024-05-15', type: 'Relatório', status: 'approved', importance: 'medium' },
    { id: 5, title: 'Ata de Eleição de Diretoria', lodge: 'Loja Estrela do Norte nº 42', date: '2024-05-12', type: 'Ata', status: 'pending', importance: 'high' },
];

export default function AdminDocuments() {
    return (
        <div className="p-10 space-y-12 bg-background min-h-screen">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-10">
                <div>
                    <h1 className="text-5xl font-black text-primary tracking-tighter leading-none mb-4 italic font-serif">Processos & Atas</h1>
                    <p className="text-muted-foreground font-medium flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent rounded-full" />
                        Oversight Jurisdicional: Todos os documentos federados
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <button className="px-6 py-4 bg-background border border-border text-muted-foreground rounded-md font-black uppercase text-[10px] tracking-[0.2em] hover:text-primary hover:border-primary transition shadow-sm flex items-center gap-2">
                        <Download size={16} /> Exportar Relatório
                    </button>
                    <button className="px-8 py-4 bg-primary text-primary-foreground rounded-md font-black uppercase text-[10px] tracking-[0.2em] shadow-xl shadow-primary/10 hover:bg-primary/95 transition-all">
                        Novo Despacho Circular
                    </button>
                </div>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                    { label: 'Pendentes', value: '24', icon: Clock, accent: true },
                    { label: 'Aprovados (Mês)', value: '142', icon: CheckCircle2 },
                    { label: 'Nível de Urgência', value: 'Alta', icon: AlertCircle, accent: true },
                    { label: 'Total Digitalizado', value: '3.2k', icon: FileText },
                ].map((stat, i) => (
                    <div key={i} className="bg-background p-8 rounded-xl border border-border shadow-sm flex items-center justify-between group hover:border-accent/40 transition-all">
                        <div>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                            <p className={`text-3xl font-black ${stat.accent ? 'text-accent underline decoration-accent/30 decoration-offset-4' : 'text-primary'}`}>{stat.value}</p>
                        </div>
                        <div className={`w-14 h-14 rounded-md flex items-center justify-center ${stat.accent ? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground'} transition-colors`}>
                            <stat.icon size={22} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Search and Filters */}
            <div className="bg-background p-6 rounded-xl border border-border shadow-sm flex flex-col md:flex-row items-center gap-6 bg-muted/5">
                <div className="relative flex-grow group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-accent transition" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar por título, loja ou número do processo..."
                        className="w-full pl-12 pr-6 py-4 bg-background border border-border rounded-md focus:border-accent transition-all outline-none font-medium"
                    />
                </div>
                <button className="px-6 py-4 bg-background border border-border rounded-md text-muted-foreground font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-2 hover:text-primary hover:border-primary transition">
                    <Filter size={16} /> Filtros Avançados
                </button>
            </div>

            {/* Document Table */}
            <div className="bg-background rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-muted/10 border-b border-border">
                                <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Documento</th>
                                <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Loja Federada</th>
                                <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Data</th>
                                <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Status</th>
                                <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border text-primary font-medium">
                            {mockDocuments.map((doc) => (
                                <tr key={doc.id} className="group hover:bg-muted/5 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-12 bg-muted border border-border rounded-md flex items-center justify-center text-muted-foreground group-hover:bg-accent group-hover:text-primary transition-colors">
                                                <FileText size={20} />
                                                {doc.importance === 'high' && <div className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-full animate-pulse" />}
                                            </div>
                                            <div>
                                                <p className="font-black text-primary tracking-tight">{doc.title}</p>
                                                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{doc.type}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-bold">{doc.lodge}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-xs font-medium text-muted-foreground font-mono">{doc.date}</p>
                                    </td>
                                    <td className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.2em]">
                                        <StatusBadge status={doc.status} />
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center justify-end gap-3">
                                            <button className="p-3 text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-md transition">
                                                <Eye size={18} />
                                            </button>
                                            <button className="p-3 text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-md transition">
                                                <Download size={18} />
                                            </button>
                                            <button className="p-3 text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-md transition">
                                                <MoreVertical size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-8 py-6 border-t border-border flex items-center justify-between bg-muted/5">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Exibindo 5 de 24 processos</p>
                    <div className="flex items-center gap-3">
                        <button className="h-10 w-10 flex items-center justify-center rounded-md bg-background border border-border text-muted-foreground hover:text-primary disabled:opacity-30" disabled>
                            <ChevronRight size={18} className="rotate-180" />
                        </button>
                        <button className="h-10 w-10 flex items-center justify-center rounded-md bg-primary text-primary-foreground font-black text-xs">1</button>
                        <button className="h-10 w-10 flex items-center justify-center rounded-md bg-background border border-border text-muted-foreground hover:text-primary font-black text-xs transition-colors">2</button>
                        <button className="h-10 w-10 flex items-center justify-center rounded-md bg-background border border-border text-muted-foreground hover:text-primary transition-all">
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    switch (status) {
        case 'approved':
            return (
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-[9px] font-black uppercase tracking-[0.2em]">
                    <CheckCircle2 size={12} className="text-accent" /> Aprovado
                </span>
            );
        case 'pending':
            return (
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[9px] font-black uppercase tracking-[0.2em]">
                    <Clock size={12} /> Em Análise
                </span>
            );
        case 'rejected':
            return (
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-muted border border-border text-muted-foreground text-[9px] font-black uppercase tracking-[0.2em]">
                    <AlertCircle size={12} /> Rejeitado
                </span>
            );
        default:
            return null;
    }
}
