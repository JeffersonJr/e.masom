
import { useState } from 'react';
import { FileUp, Clock, CheckCircle2, XCircle, Search } from 'lucide-react';

export default function ApprovalWorkflow() {
    const [activeTab, setActiveTab] = useState<'upload' | 'history'>('upload');

    const processes = [
        { id: '1', tipo: 'Placet de Transferência', loja: 'Loja Exemplo 123', data: '22/02/2026', status: 'Pendente' },
        { id: '2', tipo: 'Pedido de Iniciação', loja: 'Loja Exemplo 123', data: '15/02/2026', status: 'Aprovado' },
        { id: '3', tipo: 'Prancha de Quitacao', loja: 'Loja Exemplo 123', data: '10/02/2026', status: 'Rejeitado' },
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Aprovado': return <CheckCircle2 className="text-emerald-500" size={18} />;
            case 'Rejeitado': return <XCircle className="text-rose-500" size={18} />;
            default: return <Clock className="text-amber-500" size={18} />;
        }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <header className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-mason-blue font-serif">Processos e Placets</h1>
                    <p className="text-slate-500">Workflow de aprovação entre Oficina e Potência.</p>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button
                        onClick={() => setActiveTab('upload')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'upload' ? 'bg-white shadow-sm text-mason-blue' : 'text-slate-400'}`}
                    >
                        SOLICITAR
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'history' ? 'bg-white shadow-sm text-mason-blue' : 'text-slate-400'}`}
                    >
                        MEUS PROCESSOS
                    </button>
                </div>
            </header>

            {activeTab === 'upload' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl border-t-4 border-t-mason-green">
                        <h2 className="text-xl font-bold text-mason-blue mb-6">Novo Requerimento</h2>
                        <form className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Tipo de Processo</label>
                                <select className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-mason-green">
                                    <option>Placet de Transferência</option>
                                    <option>Indicação de Candidato</option>
                                    <option>Aumento de Salário</option>
                                    <option>Exaltação</option>
                                </select>
                            </div>

                            <div className="border-2 border-dashed border-slate-200 rounded-3xl p-10 text-center hover:border-mason-green transition group cursor-pointer">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-mason-green/10 group-hover:text-mason-green transition">
                                    <FileUp size={32} />
                                </div>
                                <p className="text-sm font-bold text-mason-blue">Arraste seu arquivo PDF aqui</p>
                                <p className="text-xs text-slate-400 mt-1 uppercase tracking-tighter">ou clique para selecionar</p>
                            </div>

                            <button className="w-full py-4 bg-mason-blue text-white font-bold rounded-2xl hover:bg-mason-blue-light transition shadow-lg">
                                Enviar para a Potência
                            </button>
                        </form>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-mason-blue p-8 rounded-3xl text-white">
                            <h3 className="font-bold text-lg mb-4 text-mason-green italic underline underline-offset-8">Instruções Importantes</h3>
                            <ul className="space-y-4 text-sm text-white/70">
                                <li className="flex gap-3"><span className="text-mason-green font-bold">01.</span> Todos os documentos devem estar assinados pelo Venerável Mestre e Secretário.</li>
                                <li className="flex gap-3"><span className="text-mason-green font-bold">02.</span> O prazo médio de despacho pela Potência é de 72 horas úteis.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
                    <div className="p-6 border-b border-slate-50 flex items-center gap-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <input type="text" placeholder="Filtrar processos..." className="w-full bg-slate-50 rounded-full py-2 pl-12 pr-4 text-sm outline-none border border-transparent focus:border-slate-200" />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                <tr>
                                    <th className="px-8 py-4 text-left">Protocolo</th>
                                    <th className="px-8 py-4 text-left">Documento</th>
                                    <th className="px-8 py-4 text-left">Data Envio</th>
                                    <th className="px-8 py-4 text-left">Status</th>
                                    <th className="px-8 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {processes.map(p => (
                                    <tr key={p.id} className="hover:bg-slate-50/50 transition">
                                        <td className="px-8 py-5 text-sm font-bold text-mason-blue">#2026-00{p.id}</td>
                                        <td className="px-8 py-5 text-sm text-slate-600 font-medium">{p.tipo}</td>
                                        <td className="px-8 py-5 text-sm text-slate-400">{p.data}</td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2 text-xs font-bold italic">
                                                {getStatusIcon(p.status)}
                                                {p.status}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <button className="text-xs font-bold text-mason-green hover:underline">Detalhes</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
