
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
        <div className="p-10 space-y-12 bg-background min-h-screen">
            <header className="flex justify-between items-end border-b border-border pb-10">
                <div>
                    <h1 className="text-5xl font-black text-primary tracking-tighter leading-none mb-4 italic font-serif">Processos & Placets</h1>
                    <p className="text-muted-foreground font-medium flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent rounded-full" />
                        Fluxo de aprovação soberana entre Oficina e Potência
                    </p>
                </div>
                <div className="flex bg-muted/20 p-1.5 rounded-md border border-border">
                    <button
                        onClick={() => setActiveTab('upload')}
                        className={`px-6 py-2.5 rounded-md text-[10px] font-black tracking-[0.2em] transition-all uppercase ${activeTab === 'upload' ? 'bg-primary text-primary-foreground shadow-xl' : 'text-muted-foreground hover:text-primary font-bold'}`}
                    >
                        Solicitar
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`px-6 py-2.5 rounded-md text-[10px] font-black tracking-[0.2em] transition-all uppercase ${activeTab === 'history' ? 'bg-primary text-primary-foreground shadow-xl' : 'text-muted-foreground hover:text-primary font-bold'}`}
                    >
                        Meus Processos
                    </button>
                </div>
            </header>

            {activeTab === 'upload' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="bg-background p-10 rounded-xl border border-border shadow-sm border-t-4 border-t-accent">
                        <h2 className="text-3xl font-black text-primary mb-8 italic font-serif tracking-tight">Novo Requerimento</h2>
                        <form className="space-y-8">
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Tipo de Processo</label>
                                <select className="w-full bg-muted/20 border border-border rounded-md px-4 py-4 outline-none focus:border-accent font-medium text-primary text-sm transition-all appearance-none cursor-pointer">
                                    <option>Placet de Transferência</option>
                                    <option>Indicação de Candidato</option>
                                    <option>Aumento de Salário</option>
                                    <option>Exaltação</option>
                                </select>
                            </div>

                            <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-accent/40 bg-muted/5 transition group cursor-pointer relative overflow-hidden">
                                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative z-10">
                                    <div className="w-20 h-20 bg-muted rounded-md flex items-center justify-center mx-auto mb-6 group-hover:bg-accent group-hover:text-primary transition-all duration-500 shadow-sm">
                                        <FileUp size={32} />
                                    </div>
                                    <p className="text-base font-black text-primary tracking-tight">Arraste seu arquivo PDF aqui</p>
                                    <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-widest font-black">ou clique para selecionar o documento</p>
                                </div>
                            </div>

                            <button className="w-full py-5 bg-primary text-primary-foreground font-black rounded-md hover:bg-primary/95 transition shadow-xl shadow-primary/10 uppercase text-[11px] tracking-[0.3em] active:scale-[0.98]">
                                Enviar para a Potência
                            </button>
                        </form>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-primary p-10 rounded-xl text-primary-foreground relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl -mr-24 -mt-24" />
                            <h3 className="font-black text-[10px] mb-8 text-accent uppercase tracking-[0.4em] flex items-center gap-3">
                                <Clock size={16} /> Protocolos Atuais
                            </h3>
                            <div className="space-y-8 relative z-10">
                                <div className="border-l-2 border-accent/30 pl-8 space-y-2">
                                    <p className="font-black text-lg italic font-serif">Validação Formal</p>
                                    <p className="text-primary-foreground/40 text-xs font-medium leading-relaxed">
                                        Todos os documentos devem estar assinados pelo Venerável Mestre e Secretário conforme o RGF.
                                    </p>
                                </div>
                                <div className="border-l-2 border-accent/10 pl-8 space-y-2">
                                    <p className="font-black text-lg italic font-serif">Tempo de Resposta</p>
                                    <p className="text-primary-foreground/40 text-xs font-medium leading-relaxed">
                                        O prazo médio de despacho pela Grande Secretaria é de 72 horas úteis.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-background rounded-xl border border-border shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-border flex items-center gap-6 bg-muted/5">
                        <div className="relative flex-grow max-w-2xl">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-accent transition" size={18} />
                            <input type="text" placeholder="Filtrar processos por protocolo ou tipo..." className="w-full bg-background border border-border rounded-md py-4 pl-14 pr-6 text-sm outline-none focus:border-accent transition font-medium" />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-muted/10 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] border-b border-border">
                                <tr>
                                    <th className="px-8 py-6">Protocolo</th>
                                    <th className="px-8 py-6">Documento</th>
                                    <th className="px-8 py-6">Data Envio</th>
                                    <th className="px-8 py-6">Status</th>
                                    <th className="px-8 py-6"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border text-primary font-medium">
                                {processes.map(p => (
                                    <tr key={p.id} className="hover:bg-muted/5 transition-colors group">
                                        <td className="px-8 py-6 font-black tracking-tight underline decoration-accent/10 decoration-offset-4 italic font-serif">#2026-00{p.id}</td>
                                        <td className="px-8 py-6 text-sm">{p.tipo}</td>
                                        <td className="px-8 py-6 text-xs text-muted-foreground">{p.data}</td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest italic font-serif">
                                                {getStatusIcon(p.status)}
                                                {p.status}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="text-[10px] font-black text-accent uppercase tracking-[0.2em] hover:underline decoration-offset-4">Detalhes</button>
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
