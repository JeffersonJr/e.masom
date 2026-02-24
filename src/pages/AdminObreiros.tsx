
import { Users, Search, Filter, Download, UserPlus, ShieldCheck } from 'lucide-react';

export default function AdminObreiros() {
    const obreiros = [
        { id: '1', nome: 'Antônio Carlos Silva', loja: 'Aurora (001)', grau: 'Mestre', cargo: 'Venerável Mestre', status: 'Regular' },
        { id: '2', nome: 'Ricardo Mendes', loja: 'Aurora (001)', grau: 'Companheiro', cargo: 'Nenhum', status: 'Regular' },
        { id: '3', nome: 'Lucas Ferreira', loja: 'Cavaleiros (012)', grau: 'Aprendiz', cargo: 'Nenhum', status: 'Regular' },
    ];

    return (
        <div className="p-10 space-y-8">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-mason-blue">Cadastro de Obreiros</h1>
                    <p className="text-slate-500 mt-1">Base unificada de dados de todos os maçons da jurisdição.</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition">
                        <Download size={18} /> Exportar
                    </button>
                    <button className="bg-mason-green text-mason-blue px-6 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-mason-green-light transition shadow-xl uppercase text-xs tracking-widest">
                        <UserPlus size={18} /> Novo Obreiro
                    </button>
                </div>
            </header>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Geral</p>
                    <p className="text-3xl font-bold text-mason-blue">1.240</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Mestres</p>
                    <p className="text-3xl font-bold text-mason-blue">856</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Aprendizes</p>
                    <p className="text-3xl font-bold text-mason-blue">192</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Irregulares</p>
                    <p className="text-3xl font-bold text-rose-500">14</p>
                </div>
            </div>

            {/* List */}
            <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden text-sm">
                <div className="p-6 border-b border-slate-100 flex gap-4">
                    <div className="relative flex-grow">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="text" placeholder="Buscar por nome, CIM ou Loja..." className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-mason-green/20 transition" />
                    </div>
                    <button className="px-5 py-3 bg-white border border-slate-200 rounded-2xl text-slate-500 font-bold flex items-center gap-2">
                        <Filter size={18} /> Filtros
                    </button>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                        <tr>
                            <th className="px-8 py-5">Obreiro</th>
                            <th className="px-8 py-5">Grau</th>
                            <th className="px-8 py-5">Loja Atual</th>
                            <th className="px-8 py-5">Cargo</th>
                            <th className="px-8 py-5">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-mason-blue">
                        {obreiros.map(worker => (
                            <tr key={worker.id} className="hover:bg-slate-50/30 transition group">
                                <td className="px-8 py-5 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                        <Users size={14} />
                                    </div>
                                    <span className="font-bold">{worker.nome}</span>
                                </td>
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck size={14} className="text-mason-green" />
                                        {worker.grau}
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-slate-500">{worker.loja}</td>
                                <td className="px-8 py-5 text-slate-500">{worker.cargo}</td>
                                <td className="px-8 py-5">
                                    <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest tracking-tighter">
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
