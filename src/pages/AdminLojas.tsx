
import { Store, Plus, Search, Filter, MoreVertical, ExternalLink } from 'lucide-react';

export default function AdminLojas() {
    const lojas = [
        { id: '1', nome: 'Aurora da Virtude', numero: '001', oriente: 'Vila Velha/ES', membros: 42, status: 'Regular' },
        { id: '2', nome: 'Cavaleiros da Luz', numero: '012', oriente: 'Vitória/ES', membros: 35, status: 'Regular' },
        { id: '3', nome: 'Estrela do Norte', numero: '045', oriente: 'Serra/ES', membros: 28, status: 'Pendente' },
    ];

    return (
        <div className="p-10 space-y-8">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-mason-blue">Lojas Federadas</h1>
                    <p className="text-slate-500 mt-1">Gestão e acompanhamento das oficinas da jurisdição.</p>
                </div>
                <button className="bg-mason-blue text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-mason-blue-light transition shadow-xl">
                    <Plus size={20} /> Nova Loja
                </button>
            </header>

            {/* Filters */}
            <div className="flex gap-4">
                <div className="relative flex-grow max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="text" placeholder="Buscar por nome ou número..." className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-mason-green/20 transition" />
                </div>
                <button className="px-5 py-3 bg-white border border-slate-200 rounded-2xl text-slate-500 font-bold flex items-center gap-2 hover:bg-slate-50 transition">
                    <Filter size={18} /> Filtros
                </button>
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                        <tr>
                            <th className="px-8 py-5">Loja</th>
                            <th className="px-8 py-5">Número</th>
                            <th className="px-8 py-5">Oriente</th>
                            <th className="px-8 py-5 text-center">Membros</th>
                            <th className="px-8 py-5">Status</th>
                            <th className="px-8 py-5"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {lojas.map(loja => (
                            <tr key={loja.id} className="hover:bg-slate-50/30 transition group">
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-mason-green group-hover:text-mason-blue transition duration-500">
                                            <Store size={20} />
                                        </div>
                                        <span className="font-bold text-mason-blue">{loja.nome}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5 font-mono text-xs">{loja.numero}</td>
                                <td className="px-8 py-5 text-slate-500">{loja.oriente}</td>
                                <td className="px-8 py-5 text-center font-bold text-mason-blue">{loja.membros}</td>
                                <td className="px-8 py-5">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${loja.status === 'Regular' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                                        }`}>
                                        {loja.status}
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 text-slate-300 hover:text-mason-blue transition">
                                            <ExternalLink size={18} />
                                        </button>
                                        <button className="p-2 text-slate-300 hover:text-mason-blue transition">
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
