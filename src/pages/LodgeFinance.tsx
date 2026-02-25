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
        <div className="p-10 space-y-12 bg-background min-h-screen">
            <header className="flex justify-between items-end border-b border-border pb-10">
                <div>
                    <h1 className="text-5xl font-black text-primary tracking-tighter leading-none mb-4 italic font-serif uppercase">Tesouraria & Capitação</h1>
                    <p className="text-muted-foreground font-medium flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent rounded-full" />
                        Gestão financeira e obrigações federativas
                    </p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 bg-background rounded-xl border border-border shadow-sm hover:border-accent/40 transition-all group">
                    <div className="flex items-center gap-3 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-6">
                        <Landmark size={18} className="text-accent" /> TAXA FEDERATIVA
                    </div>
                    <p className="text-5xl font-black text-primary tracking-tighter">
                        <span className="text-xl text-muted-foreground align-top mt-2">R$</span> {stats.totalFatura.toFixed(0)}
                        <span className="text-xl font-bold">,{(stats.totalFatura % 1).toFixed(2).split('.')[1]}</span>
                    </p>
                    <p className="text-[9px] font-black text-muted-foreground mt-4 uppercase tracking-[0.1em]">
                        Atual: {stats.ativos} Ativos × R$ {stats.taxaPorObreiro.toFixed(2)}
                    </p>
                </div>

                <div className="p-8 bg-background rounded-xl border border-border shadow-sm hover:border-primary/40 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12" />
                    <div className="flex items-center gap-3 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-6">
                        <TrendingUp size={18} className="text-primary" /> SALDO EM CONTA
                    </div>
                    <p className="text-5xl font-black text-primary tracking-tighter">
                        <span className="text-xl text-muted-foreground align-top mt-2">R$</span> 12.450
                        <span className="text-xl font-bold">,00</span>
                    </p>
                    <p className="text-[9px] font-black text-muted-foreground mt-4 uppercase tracking-[0.1em]">Disponível para custeio operacional</p>
                </div>

                <div className="p-8 bg-accent/5 rounded-xl border border-accent/20 shadow-sm hover:border-accent transition-all group">
                    <div className="flex items-center gap-3 text-[10px] font-black text-accent uppercase tracking-[0.2em] mb-6">
                        <AlertCircle size={18} /> PENDÊNCIAS
                    </div>
                    <p className="text-5xl font-black text-accent tracking-tighter underline decoration-accent/30 decoration-offset-8">02</p>
                    <p className="text-[9px] font-black text-accent/70 mt-4 uppercase tracking-[0.1em]">Meses em atraso com a potência</p>
                </div>
            </div>

            <div className="bg-background border border-border rounded-xl shadow-sm overflow-hidden">
                <div className="p-8 border-b border-border flex justify-between items-center bg-muted/5">
                    <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Histórico de Cobrança (Capitação)</h2>
                    <button className="text-[10px] font-black text-accent uppercase tracking-[0.2em] hover:underline decoration-offset-4">Ver Detalhamento</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-muted/10 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] border-b border-border">
                            <tr>
                                <th className="px-8 py-6">Referência</th>
                                <th className="px-8 py-6">Obreiros Ativos</th>
                                <th className="px-8 py-6">Valor Total</th>
                                <th className="px-8 py-6 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border text-primary font-medium">
                            <tr className="hover:bg-muted/5 transition-colors">
                                <td className="px-8 py-6 font-black tracking-tight underline italic font-serif">Fevereiro 2026</td>
                                <td className="px-8 py-6">32</td>
                                <td className="px-8 py-6 font-bold">R$ 1.760,00</td>
                                <td className="px-8 py-6 text-right">
                                    <span className="px-4 py-1.5 bg-primary text-primary-foreground border border-white/5 rounded-full text-[9px] font-black uppercase tracking-[0.2em]">Liquidado</span>
                                </td>
                            </tr>
                            <tr className="hover:bg-muted/5 transition-colors">
                                <td className="px-8 py-6 font-black tracking-tight underline italic font-serif">Janeiro 2026</td>
                                <td className="px-8 py-6">31</td>
                                <td className="px-8 py-6 font-bold">R$ 1.705,00</td>
                                <td className="px-8 py-6 text-right">
                                    <span className="px-4 py-1.5 bg-primary text-primary-foreground border border-white/5 rounded-full text-[9px] font-black uppercase tracking-[0.2em]">Liquidado</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
