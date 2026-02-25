import InternalHero from '../components/InternalHero';
import { Globe, Palette, Clock, Users } from 'lucide-react';

export default function CmsLojas() {
    return (
        <div className="bg-background">
            <InternalHero
                badge="Identidade Digital"
                title={<>Presença Digital para <br /><span className="text-accent italic font-serif">Sua Oficina.</span></>}
                subtitle="Fortaleça a imagem da sua Loja com um portal profissional. O e.mason provisiona automaticamente um site elegante e um CMS intuitivo para cada oficina da sua jurisdição."
            />

            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-32">
                        <h2 className="text-4xl md:text-6xl font-black text-primary mb-6 tracking-tighter">Ecossistema Digital Completo</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-xl leading-relaxed font-medium">
                            Mais do que um simples site, cada Loja recebe um portal de comunicação e gestão unificado.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        <CmsFeatureCard
                            icon={Palette}
                            title="Design Premium"
                            description="Altere cores, banners e conteúdos em tempo real sem precisar de código. Banners pré-configurados."
                        />
                        <CmsFeatureCard
                            icon={Clock}
                            title="Gestão de Atas"
                            description="Controle de frequência digital por QR Code e repositório de atas seguro e auditável."
                        />
                        <CmsFeatureCard
                            icon={Users}
                            title="Área do Obreiro"
                            description="Espaço restrito para membros consultarem comunicados, documentos e regularidade."
                        />
                        <CmsFeatureCard
                            icon={Globe}
                            title="SEO & Domínio"
                            description="Site otimizado para buscadores e integração com o domínio próprio da sua Loja."
                        />
                    </div>

                    <div className="mt-40 p-16 md:p-24 bg-primary rounded-2xl text-primary-foreground relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px] -mr-40 -mt-40" />
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div>
                                <h3 className="text-4xl md:text-5xl font-black mb-10 tracking-tighter">Gestão Multi-Usuário</h3>
                                <p className="text-primary-foreground/60 text-lg leading-relaxed mb-12 font-medium">
                                    Defina quem pode editar o site, lançar presenças e acessar o financeiro. Permissões granulares para Venerável, Secretário e Tesoureiro.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <div className="px-6 py-2 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/10">Venerável</div>
                                    <div className="px-6 py-2 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/10">Secretário</div>
                                    <div className="px-6 py-2 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/10">Tesoureiro</div>
                                </div>
                            </div>
                            <div className="aspect-video bg-white/5 rounded-xl border border-white/10 flex items-center justify-center relative group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="text-accent font-black tracking-[0.4em] text-[10px] uppercase">Preview do CMS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function CmsFeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
    return (
        <div className="p-12 bg-background rounded-xl border border-border hover:border-accent/40 transition-all group hover:shadow-2xl">
            <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center text-muted-foreground group-hover:bg-accent group-hover:text-primary transition-all duration-500 mb-10 shadow-sm">
                <Icon size={32} />
            </div>
            <h3 className="text-2xl font-black text-primary mb-6 tracking-tight italic font-serif">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed font-medium italic">{description}</p>
        </div>
    );
}
