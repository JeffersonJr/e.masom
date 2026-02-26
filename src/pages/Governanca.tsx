import InternalHero from '../components/InternalHero';
import { ShieldCheck, LayoutDashboard, Database, BarChart3, Users, FileCheck, CheckCircle2 } from 'lucide-react';

export default function Governanca() {
    return (
        <div className="bg-background">
            <InternalHero
                badge="Soberania Digital"
                title={<>Governança para a <br /><span className="text-accent underline decoration-accent/30 decoration-offset-8">Tradição Maçônica.</span></>}
                subtitle="Dê o próximo passo na evolução administrativa da sua Jurisdição. O e.mason oferece o controle absoluto, a discrição necessária e a eficiência que a modernidade exige, sem nunca ferir a tradição secular."
            />

            {/* Quick Stats Section */}
            <section className="py-20 border-b border-border bg-muted/20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {[
                            { label: "Visão Geral", value: "360°" },
                            { label: "Sincronização", value: "Realtime" },
                            { label: "Segurança", value: "RLS" },
                            { label: "Disponibilidade", value: "99.9%" }
                        ].map((stat, i) => (
                            <div key={i} className="text-center group">
                                <div className="text-2xl font-black text-primary group-hover:text-accent transition-colors">{stat.value}</div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-40">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-32">
                        <h2 className="text-5xl md:text-6xl font-black text-primary mb-6 tracking-tighter italic font-serif">A Maestria na Gestão</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-xl font-medium">Arquitetura de dados pensada para as complexidades administrativas da jurisdição.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        <GovernancaCard
                            icon={LayoutDashboard}
                            title="Macrovisão Jurisdicional"
                            description="Visualize o status de todas as oficinas, obreiros e processos em um único painel inteligente. Acompanhe a regularidade sistêmica."
                            items={["Evolução Orgânica", "Alertas de Irregularidade", "Relatórios Dinâmicos"]}
                        />
                        <GovernancaCard
                            icon={Database}
                            title="Base de Dados Unificada"
                            description="Elimine a fragmentação com um repositório centralizado e seguro. Informação imediata para decisões estratégicas."
                            items={["Histórico de Gestões", "Atas Históricas", "Backup Automático"]}
                            accent
                        />
                        <GovernancaCard
                            icon={ShieldCheck}
                            title="Conformidade e Sigilo"
                            description="Controles de acesso rigorosos que respeitam a hierarquia e os graus. Documentos sensíveis sob autoridade restrita."
                            items={["Acesso por Graus", "Logs de Auditoria", "Assinatura Digital"]}
                        />
                    </div>
                </div>
            </section>

            {/* Deep Feature Section */}
            <section className="py-40 bg-primary text-primary-foreground overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-1/2" />
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-24 items-center">
                        <div className="flex-1 space-y-12">
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic font-serif leading-tight">
                                Decisões Baseadas em <span className="text-accent underline decoration-accent/20 underline-offset-8">Dados Reais.</span>
                            </h2>
                            <p className="text-xl text-primary-foreground/60 leading-relaxed font-medium">
                                Chega de suposições. Com o e.mason, o Grão-Mestre e as Grandes Secretarias têm acesso a indicadores precisos de crescimento, saúde financeira e atividades das Lojas.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {[
                                    { icon: BarChart3, text: "Análise de Tendências" },
                                    { icon: Users, text: "Censo Cadastral Ativo" },
                                    { icon: FileCheck, text: "Auditoria Sistêmica" },
                                    { icon: ShieldCheck, text: "Proteção Institucional" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-accent">
                                        <item.icon size={20} />
                                        {item.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 w-full max-w-2xl bg-white/5 rounded-3xl border border-white/10 p-4 aspect-[4/3] backdrop-blur-sm relative">
                            {/* Representative UI element for depth */}
                            <div className="absolute inset-8 bg-white/10 rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
                                <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-6 gap-2">
                                    <div className="w-2 h-2 rounded-full bg-white/20" />
                                    <div className="w-2 h-2 rounded-full bg-white/20" />
                                </div>
                                <div className="flex-1 p-8 space-y-6">
                                    <div className="h-4 w-1/2 bg-accent/40 rounded-full" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="h-24 bg-white/5 rounded-xl border border-white/5" />
                                        <div className="h-24 bg-white/5 rounded-xl border border-white/5" />
                                    </div>
                                    <div className="h-32 bg-accent/10 rounded-xl border border-accent/20" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function GovernancaCard({ icon: Icon, title, description, items, accent }: { icon: any, title: string, description: string, items: string[], accent?: boolean }) {
    return (
        <div className={`p-10 rounded-3xl border transition-all duration-500 hover:shadow-2xl ${accent ? 'bg-white border-accent text-primary shadow-xl scale-105 relative z-10' : 'bg-background border-border text-primary hover:border-accent/40'}`}>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-10 shadow-inner ${accent ? 'bg-accent/10 text-accent' : 'bg-muted/50 text-muted-foreground'}`}>
                <Icon size={28} />
            </div>
            <h3 className="text-2xl font-black mb-6 leading-tight italic font-serif tracking-tight">{title}</h3>
            <p className={`${accent ? 'text-muted-foreground' : 'text-muted-foreground/80'} leading-relaxed font-medium mb-10 text-sm`}>
                {description}
            </p>
            <ul className={`space-y-4 text-[9px] font-black uppercase tracking-[0.2em] pt-8 border-t ${accent ? 'border-accent/10 text-accent' : 'border-border text-muted-foreground/40'}`}>
                {items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                        <CheckCircle2 size={12} className={accent ? 'text-accent' : 'text-muted-foreground/20'} />
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}
