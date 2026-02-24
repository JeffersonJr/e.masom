
import { Book, Code, Search } from 'lucide-react';

export default function Documentacao() {
    return (
        <div className="bg-white min-h-screen pt-20">
            <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-16">
                <aside className="w-full md:w-64 space-y-8">
                    <div>
                        <h4 className="font-bold text-mason-blue mb-4 uppercase text-xs tracking-widest px-4">Primeiros Passos</h4>
                        <ul className="space-y-1">
                            <li className="px-4 py-2 bg-slate-50 text-mason-blue font-bold rounded-lg cursor-pointer">Visão Geral</li>
                            <li className="px-4 py-2 text-slate-500 hover:bg-slate-50 rounded-lg cursor-pointer transition">Configuração Inicial</li>
                            <li className="px-4 py-2 text-slate-500 hover:bg-slate-50 rounded-lg cursor-pointer transition">Importação de Dados</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-mason-blue mb-4 uppercase text-xs tracking-widest px-4">Tutoriais</h4>
                        <ul className="space-y-1">
                            <li className="px-4 py-2 text-slate-500 hover:bg-slate-50 rounded-lg cursor-pointer transition">Gestão de Graus</li>
                            <li className="px-4 py-2 text-slate-500 hover:bg-slate-50 rounded-lg cursor-pointer transition">Emissão de Taxas</li>
                            <li className="px-4 py-2 text-slate-500 hover:bg-slate-50 rounded-lg cursor-pointer transition">Configuração de CMS</li>
                        </ul>
                    </div>
                </aside>

                <main className="flex-grow max-w-4xl">
                    <div className="relative mb-12">
                        <h1 className="text-5xl font-bold text-mason-blue mb-6 tracking-tight italic">Central de Documentação</h1>
                        <p className="text-xl text-slate-500 mb-8 leading-relaxed italic">
                            Tudo o que você precisa saber para operar a plataforma e.mason com maestria e total controle jurisdicional.
                        </p>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Pequise por recursos, APIs ou tutoriais..."
                                className="w-full h-16 bg-slate-50 border border-slate-200 rounded-2xl px-12 text-mason-blue focus:border-mason-green outline-none transition"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                        <div className="p-8 border border-slate-100 rounded-[2rem] bg-slate-50 hover:border-mason-green transition-all cursor-pointer group hover:shadow-xl hover:shadow-mason-green/5">
                            <Book className="text-mason-blue mb-6 group-hover:scale-110 transition-transform" size={32} />
                            <h3 className="font-bold text-mason-blue text-xl mb-2 italic uppercase tracking-tighter">Manuais do Usuário</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Guia passo-a-passo especializado para Secretários de Lojas, Tesoureiros e Grão-Mestrados.</p>
                        </div>
                        <div className="p-8 border border-slate-100 rounded-[2rem] bg-slate-50 hover:border-mason-green transition-all cursor-pointer group hover:shadow-xl hover:shadow-mason-green/5">
                            <Code className="text-mason-blue mb-6 group-hover:scale-110 transition-transform" size={32} />
                            <h3 className="font-bold text-mason-blue text-xl mb-2 italic uppercase tracking-tighter">Documentação Técnica</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Referência completa de APIs, Webhooks e modelos de dados para integrações avançadas.</p>
                        </div>
                    </div>

                    <div className="prose prose-slate max-w-none">
                        <h2 className="text-3xl font-bold text-mason-blue mb-8 border-b border-slate-100 pb-4">Visão Geral do Ecossistema</h2>
                        <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                            A plataforma e.mason foi desenhada para ser intuitiva, mas entendemos que a gestão de uma Potência envolve processos complexos e ritos específicos. Esta documentação serve como seu guia definitivo de governança digital.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 not-prose">
                            <div className="space-y-4">
                                <h4 className="font-black text-mason-blue uppercase tracking-widest text-xs">Conceitos Chave</h4>
                                <ul className="space-y-4 text-slate-600">
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 bg-mason-green rounded-full mt-2 flex-shrink-0" />
                                        <span><strong>Multi-tenant:</strong> Como as jurisdições são isoladas logicamente no banco de dados.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 bg-mason-green rounded-full mt-2 flex-shrink-0" />
                                        <span><strong>Taxas Federativas:</strong> Configuração de cálculos dinâmicos por obreiro.</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h4 className="font-black text-mason-blue uppercase tracking-widest text-xs">Segurança</h4>
                                <ul className="space-y-4 text-slate-600">
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 bg-mason-green rounded-full mt-2 flex-shrink-0" />
                                        <span><strong>Níveis de Acesso:</strong> Mapeamento de cargos administrativos para permissões e.mason.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="w-1.5 h-1.5 bg-mason-green rounded-full mt-2 flex-shrink-0" />
                                        <span><strong>Sigilo RLS:</strong> Detalhes técnicos sobre a proteção de registros individuais.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
