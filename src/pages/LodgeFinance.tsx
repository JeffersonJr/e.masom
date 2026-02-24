import { useCapitacao, type Obreiro } from '../hooks/useCapitacao';
import { Landmark, TrendingUp, AlertCircle } from 'lucide-react';

const mockObreiros: Obreiro[] = [
    { id: '1', nome: 'Irmão A', grau: 'Mestre', status: 'Ativo' },
    { id: '2', nome: 'Irmão B', grau: 'Mestre', status: 'Ativo' },
    { id: '3', nome: 'Irmão C', grau: 'Aprendiz', status: 'Ativo' },
    { id: '4', nome: 'Irmão D', grau: 'Companheiro', status: 'Quiescente' },
];

export default function LodgeFinance() {
    const { stats } = useCapitacao(mockObreiros, 55.00); // R$ 55,00 per active member

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <header className="mb-10">
                <h1 className="text-3xl font-bold text-mason-blue">Tesouraria e Capitação</h1>
                <p className="text-slate-500">Gestão financeira e obrigações federativas da oficina.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 text-mason-blue font-bold text-sm mb-4">
                        <Landmark size={18} className="text-mason-green" /> TAXA FEDERATIVA
                    </div>
                    <p className="text-4xl font-bold text-mason-blue">
                        R$ {stats.totalFatura.toFixed(2)}
                    </p>
                    <p className="text-xs text-slate-400 mt-2 uppercase tracking-wider">
                        Fat. Atual: {stats.ativos} Obreiros × R$ {stats.taxaPorObreiro.toFixed(2)}
                    </p>
                </div>

                <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 text-mason-blue font-bold text-sm mb-4">
                        <TrendingUp size={18} className="text-emerald-500" /> SALDO EM CONTA
                    </div>
                    <p className="text-4xl font-bold text-emerald-600">
                        R$ 12.450,00
                    </p>
                    <p className="text-xs text-slate-400 mt-2 uppercase tracking-wider">Disponível para custeio</p>
                </div>

                <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 shadow-sm">
                    <div className="flex items-center gap-3 text-amber-700 font-bold text-sm mb-4">
                        <AlertCircle size={18} /> PENDÊNCIAS
                    </div>
                    <p className="text-4xl font-bold text-amber-800">02</p>
                    <p className="text-xs text-amber-600/70 mt-2 uppercase tracking-wider">Meses em atraso</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                    <h2 className="font-bold text-mason-blue">Histórico de Cobrança (Capitação)</h2>
                    <button className="text-xs font-bold text-mason-green hover:underline">Ver Detalhamento</button>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest">
                        <tr>
                            <th className="px-6 py-4">Referência</th>
                            <th className="px-6 py-4">Obreiros Ativos</th>
                            <th className="px-6 py-4">Valor Total</th>
                            <th className="px-6 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-sm italic text-slate-600">
                        <tr>
                            <td className="px-6 py-4 font-medium not-italic text-mason-blue">Fevereiro 2026</td>
                            <td className="px-6 py-4">32</td>
                            <td className="px-6 py-4 text-mason-blue">R$ 1.760,00</td>
                            <td className="px-6 py-4">
                                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold uppercase">Pago</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 font-medium not-italic text-mason-blue">Janeiro 2026</td>
                            <td className="px-6 py-4">31</td>
                            <td className="px-6 py-4 text-mason-blue">R$ 1.705,00</td>
                            <td className="px-6 py-4">
                                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold uppercase">Pago</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
