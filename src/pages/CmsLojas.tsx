
import { Globe, Palette, Clock, Users } from 'lucide-react';

export default function CmsLojas() {
    return (
        <div className="bg-white">
            <section className="pt-20 pb-32 px-6 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#4298B520_0%,transparent_60%)]" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                        Presença Digital para <br />
                        <span className="text-mason-green">Sua Loja.</span>
                    </h1>
                    <p className="max-w-2xl text-xl text-slate-400 mb-12 leading-relaxed">
                        Cada loja da sua jurisdição ganha um site profissional e um sistema de gestão interna pronto para usar.
                    </p>
                </div>
            </section>

            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-bold text-mason-blue mb-4 tracking-tight">Um Ecossistema Digital Completo</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                            Mais do que um simples site, cada Loja recebe um portal de comunicação e gestão integrado.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-mason-blue transition-all group hover:shadow-xl hover:shadow-mason-blue/5">
                            <Palette className="text-mason-blue mb-8 group-hover:scale-110 transition-transform" size={40} />
                            <h3 className="text-xl font-bold text-mason-blue mb-4 leading-tight italic">Design Premium</h3>
                            <p className="text-slate-500 text-sm leading-relaxed italic">Altere cores, banners e conteúdos em tempo real sem precisar de código. Banners pré-configurados para a ordem.</p>
                        </div>
                        <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-mason-blue transition-all group hover:shadow-xl hover:shadow-mason-blue/5">
                            <Clock className="text-mason-blue mb-8 group-hover:scale-110 transition-transform" size={40} />
                            <h3 className="text-xl font-bold text-mason-blue mb-4 leading-tight italic">Gestão de Atas</h3>
                            <p className="text-slate-500 text-sm leading-relaxed italic">Controle de frequência digital por QR Code e repositório de atas de reunião seguro e auditável.</p>
                        </div>
                        <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-mason-blue transition-all group hover:shadow-xl hover:shadow-mason-blue/5">
                            <Users className="text-mason-blue mb-8 group-hover:scale-110 transition-transform" size={40} />
                            <h3 className="text-xl font-bold text-mason-blue mb-4 leading-tight italic">Área do Obreiro</h3>
                            <p className="text-slate-500 text-sm leading-relaxed italic">Espaço restrito para membros cadastrados consultarem comunicados, documentos e regularidade financeira.</p>
                        </div>
                        <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-mason-blue transition-all group hover:shadow-xl hover:shadow-mason-blue/5">
                            <Globe className="text-mason-blue mb-8 group-hover:scale-110 transition-transform" size={40} />
                            <h3 className="text-xl font-bold text-mason-blue mb-4 leading-tight italic">SEO & Domínio</h3>
                            <p className="text-slate-500 text-sm leading-relaxed italic">Site otimizado para buscadores e integração com o domínio próprio da sua Loja (ex: www.loja123.org.br).</p>
                        </div>
                    </div>

                    <div className="mt-20 p-12 bg-mason-blue rounded-[3rem] text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,#00C38930_0%,transparent_50%)]" />
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-3xl font-bold mb-6 italic italic tracking-tight">Gestão Multi-Usuário</h3>
                                <p className="text-slate-300 text-lg leading-relaxed mb-8 italic">
                                    Defina quem pode editar o site, quem pode lançar presenças e quem pode acessar o financeiro. Permissões granulares para Venerável, Secretário e Tesoureiro.
                                </p>
                                <div className="flex gap-4">
                                    <div className="px-4 py-2 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10">Venerável</div>
                                    <div className="px-4 py-2 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10">Secretário</div>
                                    <div className="px-4 py-2 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10">Tesoureiro</div>
                                </div>
                            </div>
                            <div className="aspect-video bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center">
                                <span className="text-mason-green font-black italic tracking-[0.5em] text-sm opacity-50 uppercase">Preview do CMS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
