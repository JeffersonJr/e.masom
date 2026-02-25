
import InternalHero from '../components/InternalHero';
import { Book, Code, Settings, ShieldCheck, Users, FileText, BarChart3, Globe } from 'lucide-react';

export default function Documentacao() {
    return (
        <div className="bg-background min-h-screen">
            <InternalHero
                badge="Knowledge Base"
                title={<>Central de <br /><span className="text-accent underline decoration-accent/30 decoration-offset-8">Conhecimento.</span></>}
                subtitle="Explore os módulos, guias de integração e especificações técnicas da plataforma e.mason."
            />

            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Sidebar Nav */}
                    <div className="lg:col-span-1 space-y-12">
                        <div>
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6 border-b border-border pb-4">Início Rápido</h3>
                            <ul className="space-y-4 text-sm font-medium text-muted-foreground">
                                <li className="hover:text-accent cursor-pointer transition flex items-center gap-2"><Book size={14} /> Introdução ao e.mason</li>
                                <li className="hover:text-accent cursor-pointer transition flex items-center gap-2"><Settings size={14} /> Configuração de Instância</li>
                                <li className="hover:text-accent cursor-pointer transition flex items-center gap-2"><Users size={14} /> Gestão de Perfis e Ranks</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6 border-b border-border pb-4">Módulos Core</h3>
                            <ul className="space-y-4 text-sm font-medium text-muted-foreground">
                                <li className="hover:text-accent cursor-pointer transition flex items-center gap-2"><ShieldCheck size={14} /> Governança e RLS</li>
                                <li className="hover:text-accent cursor-pointer transition flex items-center gap-2"><BarChart3 size={14} /> Capitação e Finanças</li>
                                <li className="hover:text-accent cursor-pointer transition flex items-center gap-2"><Globe size={14} /> CMS de Lojas</li>
                                <li className="hover:text-accent cursor-pointer transition flex items-center gap-2"><FileText size={14} /> Gestão de Documentos</li>
                            </ul>
                        </div>
                        <div className="p-8 bg-primary rounded-xl text-primary-foreground relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/20 rounded-full blur-2xl -mr-10 -mt-10" />
                            <h4 className="font-black text-xs uppercase tracking-widest mb-4">Precisa de Ajuda?</h4>
                            <p className="text-sm text-primary-foreground/60 mb-6">Nossa equipe de suporte master está disponível para auxiliar na sua implementação.</p>
                            <button className="text-[10px] font-black uppercase tracking-widest border-b border-accent text-accent">Contatar Suporte</button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-2 space-y-16">
                        <section>
                            <h2 className="text-4xl font-black text-primary mb-8 tracking-tighter italic font-serif">Introdução à Arquitetura</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8 font-medium">
                                O e.mason foi construído sobre uma arquitetura de microsserviços isolada por <strong className="text-primary italic">Row Level Security (RLS)</strong>. Isso significa que, embora todas as lojas residam na mesma infraestrutura de nuvem, seus dados são fisicamente inacessíveis por outras entidades, garantindo o sigilo absoluto.
                            </p>
                            <div className="p-8 bg-muted/20 border border-border rounded-xl">
                                <h4 className="flex items-center gap-3 font-black uppercase text-xs tracking-widest text-primary mb-4">
                                    <Code size={16} className="text-accent" /> Exemplo de Proteção de Dados
                                </h4>
                                <code className="text-xs text-primary/70 block bg-background p-6 rounded-md border border-border overflow-x-auto">
                                    ALTER TABLE obreiros ENABLE ROW LEVEL SECURITY;<br />
                                    CREATE POLICY obreiro_isolation ON obreiros <br />
                                    FOR SELECT USING (potencia_id = auth.jwt() -&gt; 'potencia_id');
                                </code>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-4xl font-black text-primary mb-8 tracking-tighter italic font-serif">Módulo de Governança</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8 font-medium">
                                O núcleo do sistema permite que Grandes Secretarias tenham uma visão 360° de sua jurisdição. O sistema gerencia automaticamente a emissão de Atas, Placet de Transferência e Quitação de Obreiros através de workflows de aprovação digitais.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-6 border border-border rounded-lg">
                                    <h5 className="font-black text-sm text-primary mb-2">Workflow Digital</h5>
                                    <p className="text-xs text-muted-foreground">Processos assinados digitalmente com validade jurídica interna.</p>
                                </div>
                                <div className="p-6 border border-border rounded-lg">
                                    <h5 className="font-black text-sm text-primary mb-2">Histórico Perpétuo</h5>
                                    <p className="text-xs text-muted-foreground">Logs imutáveis de todas as alterações cadastrais e financeiras.</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    );
}
