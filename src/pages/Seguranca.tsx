import InternalHero from '../components/InternalHero';
import { Shield, Lock, EyeOff, Server, ShieldAlert, CheckCircle2, TrendingDown } from 'lucide-react';

export default function Seguranca() {
    return (
        <div className="bg-background">
            <InternalHero
                badge="Infraestrutura"
                title={<>Segurança <br /><span className="text-accent underline decoration-accent/30 decoration-offset-8 italic font-serif">Inquebrável.</span></>}
                subtitle="Tecnologia de nível militar para proteger o sigilo secular da Ordem. O e.mason foi construído com segurança 'by design' em cada linha de código."
            />

            {/* Security Protocol Highlights */}
            <section className="py-20 bg-primary text-primary-foreground">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-wrap justify-center gap-10 md:gap-20">
                        {[
                            { icon: Shield, label: "RLS Ativo" },
                            { icon: Lock, label: "AES-256" },
                            { icon: ShieldAlert, label: "WAF Proteção" },
                            { icon: Server, label: "ISO 27001" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-accent">
                                <item.icon size={20} />
                                {item.label}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-40 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-32">
                        <h2 className="text-5xl md:text-6xl font-black text-primary mb-6 tracking-tighter italic font-serif leading-tight">Fortaleza de Dados</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-xl leading-relaxed font-medium font-serif italic">
                            Onde a tecnologia moderna encontra o sigilo institucional.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <SecurityFeature
                            icon={Shield}
                            title="Isolamento RLS"
                            description="Row Level Security garante que os dados de uma Loja sejam fisicamente inacessíveis por outra, criando um ambiente multi-inquilino de segurança absoluta."
                            items={["Segregação em nível de DB", "Políticas de Acesso Granular", "Zero data leak"]}
                        />
                        <SecurityFeature
                            icon={Lock}
                            title="Criptografia AES-256"
                            description="Todos os dados sensíveis e documentos são criptografados em repouso e em trânsito, utilizando os mais altos padrões da indústria tecnológica."
                            items={["SSL de 2048 bits", "Hashing de Senhas Argon2", "Vault de chaves"]}
                            accent
                        />
                        <SecurityFeature
                            icon={EyeOff}
                            title="Acesso por Graus"
                            description="O sistema reconhece a hierarquia maçônica. Atas e documentos de Graus superiores são invisíveis para quem não possui a respectiva elevação."
                            items={["RBAC Dinâmico", "Controle de Visualização", "Histórico de Acessos"]}
                        />
                        <SecurityFeature
                            icon={Server}
                            title="Backup Georredundante"
                            description="Nossa infraestrutura conta com cópias de segurança em múltiplas zonas geográficas, garantindo a perenidade do histórico institucional."
                            items={["Disaster Recovery", "Point-in-time recovery", "Uptime de 99.9%"]}
                        />
                    </div>

                    {/* Security Visual Section */}
                    <div className="mt-40 bg-[#F9FAFB] border border-border rounded-[3rem] p-12 md:p-24 overflow-hidden relative">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                            <div className="space-y-12">
                                <h3 className="text-4xl md:text-6xl font-black text-primary tracking-tighter italic font-serif leading-tight">Privacidade <br /><span className="text-accent underline decoration-accent/20 underline-offset-8">como Prioridade.</span></h3>
                                <div className="space-y-8">
                                    <div className="flex gap-6 items-start">
                                        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                                            <ShieldAlert size={24} className="text-accent" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-primary text-sm uppercase tracking-widest mb-2">Prevenção de Ataques</h4>
                                            <p className="text-muted-foreground font-medium text-sm">Proteção contra SQL Injection, XSS e ataques de força bruta no login.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6 items-start text-accent">
                                        <TrendingDown size={24} className="shrink-0" />
                                        <div>
                                            <h4 className="font-black text-primary text-sm uppercase tracking-widest mb-2">Redução de Vulnerabilidade</h4>
                                            <p className="text-muted-foreground font-medium text-sm">Eliminação total de papeis soltos e planilhas inseguras.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                {/* Visualizing layers of security */}
                                <div className="space-y-4">
                                    {[
                                        { l: 'Camada de Aplicação (WAF)', w: '100%', op: 'opacity-100' },
                                        { l: 'Criptografia de Sessão', w: '90%', op: 'opacity-80' },
                                        { l: 'Autorização por Graus', w: '80%', op: 'opacity-60' },
                                        { l: 'Banco de Dados (RLS)', w: '70%', op: 'opacity-40' }
                                    ].map((layer, i) => (
                                        <div key={i} className={`h-16 bg-primary rounded-2xl flex items-center px-8 text-[10px] font-black uppercase tracking-[0.2em] text-accent border border-white/5 shadow-2xl ${layer.op}`} style={{ width: layer.w, marginLeft: `${(100 - parseInt(layer.w)) / 2}%` }}>
                                            <CheckCircle2 size={16} className="mr-4" />
                                            {layer.l}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function SecurityFeature({ icon: Icon, title, description, items, accent }: { icon: React.ElementType, title: string, description: string, items: string[], accent?: boolean }) {
    return (
        <div className={`p-12 rounded-[2.5rem] border transition-all duration-500 group relative overflow-hidden ${accent ? 'bg-white border-accent shadow-2xl scale-105 z-10' : 'bg-muted/10 border-border hover:border-accent/40'}`}>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 shadow-xl ${accent ? 'bg-accent text-primary' : 'bg-primary text-accent'}`}>
                <Icon size={32} />
            </div>
            <h3 className="text-3xl font-black text-primary mb-6 tracking-tight italic font-serif">{title}</h3>
            <p className="text-muted-foreground leading-relaxed font-medium italic mb-10 text-sm">
                {description}
            </p>
            <ul className="space-y-4 pt-10 border-t border-border">
                {items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 transition-colors">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}
