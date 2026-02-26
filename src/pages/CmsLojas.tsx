import InternalHero from '../components/InternalHero';
import { Globe, Palette, Clock, Users, Zap, Layout, Monitor, CheckCircle2 } from 'lucide-react';

export default function CmsLojas() {
    return (
        <div className="bg-background">
            <InternalHero
                badge="Identidade Digital"
                title={<>Presença Digital para <br /><span className="text-accent italic font-serif underline decoration-accent/30 underline-offset-8">Sua Oficina.</span></>}
                subtitle="Fortaleça a imagem da sua Loja com um portal profissional. O e.mason provisiona automaticamente um site elegante e um CMS intuitivo para cada oficina da sua jurisdição."
            />

            {/* Quick Benefits */}
            <section className="py-20 border-b border-border bg-muted/20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { icon: Monitor, label: "Totalmente Responsivo" },
                            { icon: Layout, label: "Template Maçônico" },
                            { icon: Zap, label: "Provisionamento Instantâneo" },
                            { icon: Globe, label: "Domínio Customizado" }
                        ].map((benefit, i) => (
                            <div key={i} className="flex items-center gap-4 group">
                                <div className="p-3 bg-white border border-border rounded-xl group-hover:border-accent group-hover:text-accent transition-all">
                                    <benefit.icon size={20} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary">{benefit.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-40 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-32">
                        <h2 className="text-5xl md:text-6xl font-black text-primary mb-6 tracking-tighter italic font-serif leading-tight">Identidade & Comunicação</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-xl leading-relaxed font-medium">
                            Construa a ponte digital entre sua Loja e o mundo (externo e interno) com maestria.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <CmsFeatureCard
                            icon={Palette}
                            title="Design Premium"
                            description="Altere cores, banners e conteúdos em tempo real sem precisar de código. Banners pré-configurados."
                            items={["Templates Customizáveis", "Galeria de Banners", "Editor Visual"]}
                        />
                        <CmsFeatureCard
                            icon={Clock}
                            title="Gestão de Atas"
                            description="Controle de frequência digital por QR Code e repositório de atas seguro e auditável."
                            items={["QR Code dinâmico", "Histórico de Frequência", "Geração de Certificados"]}
                        />
                        <CmsFeatureCard
                            icon={Users}
                            title="Área do Obreiro"
                            description="Espaço restrito para membros consultarem comunicados, documentos e regularidade."
                            items={["Login Seguro", "Pasta Administrativa", "Fórum de Estudos"]}
                        />
                        <CmsFeatureCard
                            icon={Globe}
                            title="SEO & Domínio"
                            description="Site otimizado para buscadores e integração com o domínio próprio da sua Loja."
                            items={["HTTPS Gratuito", "Carregamento Rápido", "Indexação Google"]}
                        />
                    </div>

                    {/* Integrated CMS Preview Section */}
                    <div className="mt-40 bg-primary rounded-[3rem] p-12 md:p-32 text-primary-foreground relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-[50%] h-full bg-accent/5 -skew-x-12 translate-x-1/4" />
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                            <div className="space-y-12">
                                <h3 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter italic font-serif leading-tight">Simplicidade <br /> que <span className="text-accent underline decoration-accent/20 underline-offset-8">Impressiona.</span></h3>
                                <div className="space-y-8">
                                    {[
                                        { title: "Gestão Multi-Usuário", desc: "Permissões granulares para Venerável, Secretário e Tesoureiro." },
                                        { title: "Provisionamento Automático", desc: "Sua Loja online em menos de 5 minutos após a ativação." },
                                        { title: "Resistência & Segurança", desc: "Infraestrutura escalável que suporta milhares de acessos simultâneos." }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-6">
                                            <CheckCircle2 className="text-accent shrink-0" size={24} />
                                            <div>
                                                <h4 className="text-sm font-black uppercase tracking-widest text-accent mb-2">{item.title}</h4>
                                                <p className="text-primary-foreground/60 font-medium">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Representative Browser UI */}
                            <div className="relative w-full aspect-[16/10] bg-white rounded-3xl shadow-2xl border border-white/10 overflow-hidden transform hover:scale-105 transition-transform duration-700">
                                <div className="h-10 bg-muted/30 border-b border-border flex items-center px-6 gap-2">
                                    <div className="flex gap-2">
                                        <div className="w-2 h-2 rounded-full bg-red-400/20" />
                                        <div className="w-2 h-2 rounded-full bg-yellow-400/20" />
                                        <div className="w-2 h-2 rounded-full bg-green-400/20" />
                                    </div>
                                    <div className="ml-4 h-4 w-1/2 bg-muted/40 rounded-full" />
                                </div>
                                <div className="p-8 flex flex-col h-full gap-6">
                                    <div className="flex justify-between items-center">
                                        <div className="h-6 w-32 bg-primary/10 rounded-lg" />
                                        <div className="h-8 w-8 bg-muted rounded-full" />
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="h-24 bg-[#F9FAFB] rounded-xl" />
                                        <div className="h-24 bg-[#F9FAFB] rounded-xl" />
                                        <div className="h-24 bg-accent/5 rounded-xl border border-accent/10" />
                                    </div>
                                    <div className="h-32 bg-[#F9FAFB] rounded-xl w-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function CmsFeatureCard({ icon: Icon, title, description, items }: { icon: any, title: string, description: string, items: string[] }) {
    return (
        <div className="p-10 bg-white rounded-[2rem] border border-border group hover:border-accent/40 transition-all hover:shadow-2xl relative overflow-hidden">
            <div className="w-14 h-14 bg-muted/50 rounded-2xl flex items-center justify-center text-muted-foreground group-hover:bg-accent group-hover:text-primary transition-all duration-500 mb-10 shadow-inner">
                <Icon size={24} />
            </div>
            <h3 className="text-2xl font-black text-primary mb-6 tracking-tight italic font-serif leading-tight">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed font-medium italic mb-10">{description}</p>
            <ul className="space-y-3 pt-8 border-t border-border">
                {items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 group-hover:text-primary transition-colors">
                        <div className="w-1 h-1 bg-accent rounded-full" />
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}
