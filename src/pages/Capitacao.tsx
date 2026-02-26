import InternalHero from '../components/InternalHero';
import { CreditCard, PieChart, Smartphone, TrendingUp, Clock, CheckCircle2, Zap } from 'lucide-react';

export default function Capitacao() {
    return (
        <div className="bg-background">
            <InternalHero
                badge="Eficiência Master"
                title={<>Módulo de <span className="text-accent underline decoration-accent/30 decoration-offset-8">Capitação.</span></>}
                subtitle="Transforme a saúde financeira da sua Jurisdição. Automatize arrecadações, reduza a inadimplência e ofereça transparência absoluta para cada Obreiro e cada Oficina sob sua guarda."
            />

            {/* Financial Highlights */}
            <section className="py-20 bg-muted/30 border-b border-border">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-wrap justify-center gap-12 md:gap-24">
                        {[
                            { icon: CreditCard, label: "Multi-meios de Pagamento" },
                            { icon: Zap, label: "Baixa Automática" },
                            { icon: PieChart, label: "Relatórios de Inadimplência" },
                            { icon: Smartphone, label: "App do Obreiro" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 group">
                                <item.icon size={20} className="text-accent group-hover:scale-110 transition-transform" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-40 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-32">
                        <h2 className="text-5xl md:text-6xl font-black text-primary mb-6 tracking-tighter italic font-serif">Fluxo Financeiro Blindado</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-xl font-medium">Da emissão à conciliação: controle total sobre os metais da sua Jurisdição.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                        <div className="space-y-12">
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

                        <div className="relative group">
                            <div className="absolute -inset-4 bg-accent/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative bg-primary rounded-3xl p-12 md:p-20 text-primary-foreground overflow-hidden shadow-2xl border border-white/5">
                                <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-[100px] -mr-40 -mt-40" />
                                <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-12">Performance de Elite</h2>
                                <p className="text-3xl md:text-5xl font-black leading-tight mb-16 italic font-serif tracking-tighter">
                                    "O e.mason transformou nossa tesouraria. A baixa automática poupa centenas de horas mensais."
                                </p>
                                <div className="flex items-center gap-8 border-t border-white/10 pt-12">
                                    <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center text-accent font-black text-2xl shadow-inner italic font-serif">
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
                </div>
            </section>

            {/* Stats Breakdown */}
            <section className="py-40 bg-background relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="bg-[#F9FAFB] border border-border rounded-[3rem] p-12 md:p-24 overflow-hidden relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-black text-primary mb-10 tracking-tighter italic font-serif leading-tight">
                                    Adeus ao Caos das <br /><span className="text-accent underline decoration-accent/20 underline-offset-8">Mensalidades.</span>
                                </h2>
                                <div className="space-y-8">
                                    <div className="flex gap-6">
                                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                                            <TrendingUp className="text-accent" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-primary uppercase tracking-widest text-xs mb-2">Aumento de Arrecadação</h4>
                                            <p className="text-muted-foreground font-medium">Redução histórica de 35% na inadimplência em menos de 6 meses.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6">
                                        <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                                            <Clock className="text-primary" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-primary uppercase tracking-widest text-xs mb-2">Economia de Tempo</h4>
                                            <p className="text-muted-foreground font-medium">As oficinas economizam até 40 horas mensais com baixas manuais.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                {[35, 75, 55, 95].map((w, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                            <span>Métrica de Recuperação {i + 1}</span>
                                            <span className="text-accent">{w}%</span>
                                        </div>
                                        <div className="h-4 bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-primary rounded-full" style={{ width: `${w}%` }} />
                                        </div>
                                    </div>
                                ))}
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
            <div className={`flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center italic font-serif font-black text-3xl border transition-all duration-500 ${accent ? 'bg-accent text-primary border-accent shadow-xl rotate-3' : 'bg-white border-border text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:-rotate-3'}`}>
                {number}
            </div>
            <div className="space-y-4">
                <h3 className="text-3xl font-black text-primary tracking-tighter italic font-serif">{title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                    {description}
                </p>
                <div className="flex items-center gap-3 pt-2">
                    <CheckCircle2 size={14} className="text-accent" />
                    <p className="text-accent text-[10px] font-black uppercase tracking-[0.2em]">{detail}</p>
                </div>
            </div>
        </div>
    );
}
