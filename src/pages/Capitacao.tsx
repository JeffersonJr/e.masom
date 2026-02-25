import InternalHero from '../components/InternalHero';

export default function Capitacao() {
    return (
        <div className="bg-background">
            <InternalHero
                badge="Eficiência Master"
                title={<>Módulo de <span className="text-accent underline decoration-accent/30 decoration-offset-8">Capitação.</span></>}
                subtitle="Transforme a saúde financeira da sua Jurisdição. Automatize arrecadações, reduza a inadimplência e ofereça transparência absoluta para cada Obreiro e cada Oficina sob sua guarda."
            />

            <section className="py-40 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                        <div className="space-y-16">
                            <CapitacaoStep
                                number="01"
                                title="Arrecadação Inteligente"
                                description="Geração em massa de boletos para toda a Potência com apenas um clique. Identificação automática de regularidade."
                                detail="Suporte a PIX, Boleto Registrado e Cartão."
                            />
                            <CapitacaoStep
                                number="02"
                                title="Insights Financeiros"
                                description="Gráficos detalhados de saúde financeira por oficina ou jurisdição. Previsibilidade de caixa absoluta."
                                detail="Fechamento mensal automatizado para as Secretarias."
                                accent
                            />
                            <CapitacaoStep
                                number="03"
                                title="Transparência Soberana"
                                description="Cada obreiro consulta seu histórico pelo portal, reduzindo a carga administrativa do Tesoureiro."
                                detail="Extrato detalhado e comprovantes digitais instantâneos."
                            />
                        </div>
                        <div className="bg-primary rounded-2xl p-16 md:p-24 text-primary-foreground relative overflow-hidden shadow-2xl border border-white/5">
                            <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-[100px] -mr-40 -mt-40" />
                            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-12">Performance de Elite</h2>
                            <p className="text-3xl md:text-5xl font-black leading-tight mb-16 italic font-serif tracking-tighter">
                                "O e.mason transformou nossa tesouraria. A baixa automática poupa centenas de horas mensais."
                            </p>
                            <div className="flex items-center gap-8 border-t border-white/10 pt-12">
                                <div className="w-20 h-20 bg-white/5 rounded-xl flex items-center justify-center text-accent font-black text-2xl shadow-inner italic font-serif">
                                    TM
                                </div>
                                <div className="space-y-1">
                                    <p className="text-2xl font-black tracking-tight underline decoration-accent/30 italic font-serif uppercase">Hugo S.</p>
                                    <p className="text-[10px] text-primary-foreground/40 uppercase tracking-[0.3em] font-black">Tesourario Master</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function CapitacaoStep({ number, title, description, detail, accent }: { number: string, title: string, description: string, detail: string, accent?: boolean }) {
    return (
        <div className="flex gap-10 items-start group">
            <div className={`flex-shrink-0 w-20 h-20 rounded-xl flex items-center justify-center italic font-serif font-black text-3xl border transition-all duration-500 ${accent ? 'bg-accent text-primary border-accent shadow-xl' : 'bg-muted border-border text-primary group-hover:bg-primary group-hover:text-primary-foreground'}`}>
                {number}
            </div>
            <div className="space-y-4">
                <h3 className="text-3xl font-black text-primary tracking-tighter italic font-serif">{title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                    {description}
                </p>
                <p className="text-accent text-[10px] font-black uppercase tracking-[0.2em] pt-2">{detail}</p>
            </div>
        </div>
    );
}
