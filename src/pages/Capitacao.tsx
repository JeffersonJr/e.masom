

export default function Capitacao() {
    return (
        <div className="bg-white">
            <section className="pt-20 pb-32 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-mason-blue leading-tight mb-8">
                        Módulo de <span className="text-mason-green">Capitação</span>
                    </h1>
                    <p className="max-w-3xl mx-auto text-xl text-slate-500 mb-12 leading-relaxed">
                        Automatize a arrecadação de metais, mensalidades e taxas. Gestão financeira simplificada para a Tesouraria da Potência e das Lojas.
                    </p>
                </div>
            </section>

            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="flex gap-6 items-start">
                                <div className="flex-shrink-0 w-14 h-14 bg-mason-blue/5 rounded-[1.2rem] flex items-center justify-center text-mason-blue italic font-black text-xl border border-mason-blue/10">
                                    01
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-mason-blue mb-3">Arrecadação Inteligente</h3>
                                    <p className="text-slate-500 leading-relaxed text-lg">
                                        Geração em massa de boletos para toda a Potência com apenas um clique. O sistema identifica automaticamente obreiros irregulares e ajusta as cobranças.
                                    </p>
                                    <p className="text-slate-400 text-sm mt-3 italic">• Suporte a PIX, Boleto Registrado e Cartão.</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start">
                                <div className="flex-shrink-0 w-14 h-14 bg-mason-green/5 rounded-[1.2rem] flex items-center justify-center text-mason-green italic font-black text-xl border border-mason-green/10">
                                    02
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-mason-blue mb-3">Dashboard Financeiro</h3>
                                    <p className="text-slate-500 leading-relaxed text-lg">
                                        Gráficos detalhados de saúde financeira por loja ou jurisdição. Previsibilidade de caixa e gestão de inadimplência ativa.
                                    </p>
                                    <p className="text-slate-400 text-sm mt-3 italic">• Fechamento mensal automatizado para as Secretarias.</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start">
                                <div className="flex-shrink-0 w-14 h-14 bg-mason-blue/5 rounded-[1.2rem] flex items-center justify-center text-mason-blue italic font-black text-xl border border-mason-blue/10">
                                    03
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-mason-blue mb-3">Transparência Total</h3>
                                    <p className="text-slate-500 leading-relaxed text-lg">
                                        Cada obreiro pode consultar seu histórico de contribuições pelo portal, reduzindo o trabalho administrativo do Tesoureiro da Loja.
                                    </p>
                                    <p className="text-slate-400 text-sm mt-3 italic">• Extrato detalhado e comprovantes digitais instantâneos.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-mason-blue rounded-[4rem] p-16 text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-80 h-80 bg-mason-green/20 rounded-full blur-[100px] -mr-40 -mt-40" />
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-mason-green mb-8">Performance Garantida</h2>
                            <p className="text-2xl md:text-3xl font-bold leading-tight mb-12 italic tracking-tight">
                                "O e.mason transformou nossa tesouraria. A baixa automática e a integração bancária pouparam centenas de horas de trabalho manual mensal."
                            </p>
                            <div className="flex items-center gap-6 border-t border-white/10 pt-10">
                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-mason-green font-bold text-xl">
                                    TM
                                </div>
                                <div>
                                    <p className="text-lg font-bold">Hugo S.</p>
                                    <p className="text-sm text-slate-400 uppercase tracking-widest font-black">Tesoureiro Master</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
