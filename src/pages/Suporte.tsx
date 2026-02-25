
import { MessageSquare, Phone, Mail } from 'lucide-react';

export default function Suporte() {
    return (
        <div className="bg-background min-h-screen">
            <section className="pt-32 pb-48 px-6 text-center bg-muted/20">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-accent/10 border border-accent/20 rounded-full text-[10px] font-black text-accent mb-12 tracking-[0.4em] uppercase">
                        Master Support
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-primary mb-8 tracking-tighter italic font-serif">Atendimento Master</h1>
                    <p className="text-xl md:text-2xl text-muted-foreground mb-16 italic font-medium leading-relaxed">
                        Suporte técnico soberano com atendimento prioritário para Grão-Mestres e Secretarias de Potências.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                        <SupportCard
                            icon={MessageSquare}
                            title="Chat Ao Vivo"
                            detail="Resposta média: ~5 min"
                            action="Iniciar Chat"
                        />
                        <SupportCard
                            icon={Mail}
                            title="E-mail SLA"
                            detail="suporte@emason.com.br"
                            action="Copiar Endereço"
                        />
                        <SupportCard
                            icon={Phone}
                            title="Linha Soberana"
                            detail="0800-MASON-VIP"
                            action="Ligar Agora"
                        />
                    </div>

                    <div className="bg-primary p-12 md:p-24 rounded-xl text-primary-foreground text-left overflow-hidden relative shadow-2xl">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-[100px] -mr-40 -mt-40" />
                        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-12">Compromisso SLA de Elite</h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                            <div className="space-y-8">
                                <h3 className="text-4xl font-black italic tracking-tighter italic leading-tight font-serif italic">Estabilidade Absoluta. <br /> Resposta Imediata.</h3>
                                <p className="text-primary-foreground/40 leading-relaxed font-medium">Nosso contrato de nível de serviço prevê disponibilidade máxima e resolução priorizada para incidentes críticos que afetem a governança da jurisdição.</p>
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="p-8 bg-white/5 rounded-xl border border-white/10 group hover:border-accent/40 transition-colors">
                                    <p className="text-5xl font-black italic font-serif text-accent mb-2">2h</p>
                                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary-foreground/40">Resposta Crítica</p>
                                </div>
                                <div className="p-8 bg-white/5 rounded-xl border border-white/10 group hover:border-accent/40 transition-colors">
                                    <p className="text-5xl font-black italic font-serif text-accent mb-2">99.9%</p>
                                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary-foreground/40">Uptime Garantido</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-40 px-6 bg-background">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-5xl font-black text-primary mb-24 text-center italic font-serif tracking-tighter">Perguntas Frequentes</h2>
                    <div className="space-y-8">
                        {[
                            { q: "Como importar meus dados antigos?", a: "Nossa equipe Master realiza a migração guiada sem custo para Potências Federadas." },
                            { q: "Existe limite de usuários?", a: "Não. A plataforma é escalonável para qualquer número de Lojas ou Obreiros da jurisdição." },
                            { q: "O sistema funciona em celulares?", a: "Sim. O e.mason é 100% responsivo e otimizado para a soberania móvel." }
                        ].map((item, i) => (
                            <div key={i} className="p-10 bg-muted/10 rounded-xl border border-border hover:border-accent/20 transition-all group">
                                <h4 className="text-xl font-black text-primary mb-4 italic font-serif tracking-tight">{item.q}</h4>
                                <p className="text-muted-foreground font-medium leading-relaxed italic">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

function SupportCard({ icon: Icon, title, detail, action }: { icon: any, title: string, detail: string, action: string }) {
    return (
        <div className="bg-background p-12 rounded-xl shadow-sm border border-border hover:border-accent/40 transition-all duration-500 group">
            <div className="w-20 h-20 bg-muted rounded-md flex items-center justify-center text-muted-foreground mx-auto mb-10 group-hover:bg-accent group-hover:text-primary transition-all duration-500 shadow-sm">
                <Icon size={32} />
            </div>
            <h3 className="text-2xl font-black text-primary mb-4 italic font-serif tracking-tight">{title}</h3>
            <p className="text-sm text-muted-foreground mb-10 font-medium italic underline underline-offset-8 decoration-accent/20">{detail}</p>
            <button className="w-full py-4 bg-primary text-primary-foreground rounded-md text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary/95 transition shadow-xl shadow-primary/10 active:scale-95">
                {action}
            </button>
        </div>
    );
}
