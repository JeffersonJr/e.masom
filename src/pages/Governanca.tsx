import InternalHero from '../components/InternalHero';
import { ShieldCheck, LayoutDashboard, Database } from 'lucide-react';

export default function Governanca() {
    return (
        <div className="bg-background">
            <InternalHero
                badge="Soberania Digital"
                title={<>Governança para a <br /><span className="text-accent underline decoration-accent/30 decoration-offset-8">Tradição Maçônica.</span></>}
                subtitle="Dê o próximo passo na evolução administrativa da sua Jurisdição. O e.mason oferece o controle absoluto, a discrição necessária e a eficiência que a modernidade exige, sem nunca ferir a tradição secular."
            />

            <section className="py-40">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-32 border-b border-border pb-16">
                        <h2 className="text-5xl font-black text-primary mb-6 tracking-tighter italic font-serif">Governança 360°</h2>
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
        </div>
    );
}

function GovernancaCard({ icon: Icon, title, description, items, accent }: { icon: any, title: string, description: string, items: string[], accent?: boolean }) {
    return (
        <div className={`p-12 rounded-xl border transition-all duration-500 hover:shadow-2xl ${accent ? 'bg-primary border-primary text-primary-foreground shadow-xl scale-105 relative z-10' : 'bg-background border-border text-primary hover:border-accent/40'}`}>
            <div className={`w-16 h-16 rounded-md flex items-center justify-center mb-10 shadow-lg ${accent ? 'bg-accent text-primary' : 'bg-muted text-muted-foreground'}`}>
                <Icon size={32} />
            </div>
            <h3 className="text-3xl font-black mb-8 leading-tight italic font-serif tracking-tight">{title}</h3>
            <p className={`${accent ? 'text-primary-foreground/60' : 'text-muted-foreground'} leading-relaxed font-medium mb-10`}>
                {description}
            </p>
            <ul className={`space-y-4 text-[10px] font-black uppercase tracking-[0.2em] pt-10 border-t ${accent ? 'border-white/10 text-accent/80' : 'border-border text-muted-foreground/60'}`}>
                {items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}
