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
        <div className="p-10 space-y-8 bg-slate-50/50 min-h-screen">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-mason-blue tracking-tight italic">Gestão de Processos</h1>
                    <p className="text-slate-500 mt-2 font-medium">Oversight Jurisdicional: Todos os documentos federados em um só lugar.</p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold text-sm hover:border-mason-green transition-all shadow-sm flex items-center gap-2">
                        <Download size={18} /> Exportar Relatório
                    </button>
                    <button className="px-6 py-3 bg-mason-blue text-white rounded-2xl font-bold text-sm shadow-xl shadow-mason-blue/20 hover:bg-mason-blue-light transition-all">
                        Novo Despacho Circular
                    </button>
                </div>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Pendentes', value: '24', icon: Clock, color: 'orange' },
                    { label: 'Aprovados (Mês)', value: '142', icon: CheckCircle2, color: 'emerald' },
                    { label: 'Nível de Urgência', value: 'High', icon: AlertCircle, color: 'rose' },
                    { label: 'Total Digitalizado', value: '3.2k', icon: FileText, color: 'blue' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-mason-green transition-colors">
                        <div>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="text-2xl font-bold text-mason-blue">{stat.value}</p>
                        </div>
                        <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-50 flex items-center justify-center text-${stat.color}-600`}>
                            <stat.icon size={24} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Search and Filters */}
            <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por título, loja ou número do processo..."
                        className="w-full pl-12 pr-6 py-4 bg-slate-50 border-transparent focus:border-mason-green focus:bg-white rounded-2xl text-sm font-medium transition-all outline-none"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-4 bg-slate-50 text-slate-600 rounded-2xl hover:bg-slate-100 transition whitespace-nowrap flex items-center gap-2 font-bold text-sm">
                        <Filter size={20} /> Filtros Avançados
                    </button>
                </div>
            </div>

            {/* Document Table */}
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-50">
                                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Documento</th>
                                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Loja Federada</th>
                                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Data</th>
                                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {mockDocuments.map((doc) => (
                                <tr key={doc.id} className="group hover:bg-slate-50/50 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 relative overflow-hidden group-hover:bg-mason-green/10 group-hover:text-mason-green transition-colors">
                                                <FileText size={20} />
                                                {doc.importance === 'high' && <div className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full" />}
                                            </div>
                                            <div>
                                                <p className="font-bold text-mason-blue">{doc.title}</p>
                                                <p className="text-xs font-medium text-slate-400">{doc.type}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-bold text-slate-600">{doc.lodge}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-medium text-slate-400">{doc.date}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <StatusBadge status={doc.status} />
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 text-slate-400 hover:text-mason-green hover:bg-mason-green/5 rounded-lg transition">
                                                <Eye size={18} />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-mason-blue hover:bg-mason-blue/5 rounded-lg transition">
                                                <Download size={18} />
                                            </button>
                                            <button className="p-2 text-slate-300 hover:text-slate-600 rounded-lg transition">
                                                <MoreVertical size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Exibindo 5 de 24 processos pendentes</p>
                    <div className="flex items-center gap-2">
                        <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-mason-blue disabled:opacity-50" disabled>
                            <ChevronRight size={18} className="rotate-180" />
                        </button>
                        <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-mason-blue text-white font-bold text-xs ring-4 ring-mason-blue/10">1</button>
                        <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-mason-blue font-bold text-xs">2</button>
                        <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-mason-blue font-bold text-xs">3</button>
                        <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-mason-blue">
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
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest">
                    <CheckCircle2 size={12} /> Aprovado
                </span>
            );
        case 'pending':
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-[10px] font-black uppercase tracking-widest">
                    <Clock size={12} /> Em Análise
                </span>
            );
        case 'rejected':
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-[10px] font-black uppercase tracking-widest">
                    <AlertCircle size={12} /> Rejeitado
                </span>
            );
        default:
            return null;
    }
}
