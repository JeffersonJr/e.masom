import { useState } from 'react';
import { ArrowRight, ShieldCheck, Zap, Globe, Users, FileText, LayoutDashboard } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import LeadModal from '../components/LeadModal';

export default function Home() {
    const [modalConfig, setModalConfig] = useState<{ open: boolean; type: 'demo' | 'trial' }>({
        open: false,
        type: 'demo'
    });

    const openModal = (type: 'demo' | 'trial') => setModalConfig({ open: true, type });
    const closeModal = () => setModalConfig(prev => ({ ...prev, open: false }));

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                {/* Subtle Background Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 bg-[radial-gradient(circle_at_50%_0%,#4298B510_0%,transparent_50%)]" />

                <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-xs font-bold text-mason-blue mb-8 tracking-widest uppercase">
                        <span className="w-2 h-2 bg-mason-green rounded-full animate-pulse" />
                        Nova Versão: 2.0 Disponível
                    </div>

                    <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-mason-blue leading-tight mb-8">
                        Governança Digital <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-mason-blue via-slate-600 to-mason-green">
                            Para a Tradição.
                        </span>
                    </h1>

                    <p className="max-w-2xl text-xl text-slate-500 mb-12 leading-relaxed">
                        e.mason une o rigor secular da maçonaria com a tecnologia de ponta do século XXI.
                        Uma plataforma multi-tenant segura para gestão de Potências e Lojas.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => openModal('demo')}
                            className="px-8 py-4 bg-mason-blue text-white font-bold rounded-full hover:shadow-2xl hover:bg-mason-blue-light transition flex items-center gap-2"
                        >
                            Solicitar Demonstração <ArrowRight size={18} />
                        </button>
                        <button
                            onClick={() => openModal('trial')}
                            className="px-8 py-4 bg-white border border-slate-200 text-mason-blue font-bold rounded-full hover:border-mason-blue transition"
                        >
                            Explorar Plataforma
                        </button>
                    </div>

                    {/* MacBook Pro Mockup Preview */}
                    <div className="mt-24 relative w-full max-w-5xl group">
                        {/* MacBook Frame */}
                        <div className="relative aspect-[16/10] bg-slate-900 rounded-[2rem] p-2 border-4 border-slate-800 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-1 bg-slate-700 rounded-b-lg hidden md:block" />

                            {/* Screen Content */}
                            <div className="w-full h-full bg-white rounded-2xl overflow-hidden relative">
                                <div className="absolute inset-x-0 top-0 h-6 bg-slate-100 flex items-center px-4 gap-1.5 border-b border-slate-200">
                                    <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                                    <div className="ml-4 h-3 w-32 bg-slate-200 rounded-full" />
                                </div>

                                <div className="pt-6 h-full flex">
                                    {/* Mock Admin Sidebar */}
                                    <div className="w-16 md:w-48 bg-mason-blue h-full border-r border-slate-200 flex flex-col p-4 gap-3">
                                        <div className="h-6 w-full bg-white/10 rounded-lg" />
                                        <div className="h-6 w-full bg-white/10 rounded-lg" />
                                        <div className="h-6 w-3/4 bg-white/10 rounded-lg" />
                                        <div className="mt-auto h-12 w-full bg-mason-green/20 rounded-xl" />
                                    </div>
                                    {/* Mock Main Content */}
                                    <div className="flex-grow bg-slate-50/50 p-6 flex flex-col gap-6">
                                        <div className="flex justify-between items-center">
                                            <div className="h-4 w-32 bg-slate-200 rounded-full" />
                                            <div className="h-8 w-8 bg-slate-200 rounded-full" />
                                        </div>
                                        <div className="grid grid-cols-3 gap-6">
                                            <div className="h-24 bg-white rounded-2xl border border-slate-100 shadow-sm" />
                                            <div className="h-24 bg-white rounded-2xl border border-slate-100 shadow-sm" />
                                            <div className="h-24 bg-white rounded-2xl border border-slate-100 shadow-sm" />
                                        </div>
                                        <div className="flex-grow bg-white rounded-2xl border border-slate-100 shadow-sm" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* MacBook Base */}
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[110%] h-4 bg-slate-800 rounded-b-2xl shadow-lg hidden md:block" />
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-32 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <div className="max-w-lg">
                            <h2 className="text-xs font-bold text-mason-green uppercase tracking-[0.3em] mb-4">Recursos</h2>
                            <p className="text-4xl font-bold text-mason-blue leading-tight">
                                Tudo o que sua Potência precisa para escalar com ordem e segurança.
                            </p>
                        </div>
                        <p className="text-slate-500 max-w-sm">
                            Desenvolvemos módulos específicos que resolvem do dia a dia da tesouraria à alta governança do Grão-Mestrado.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={ShieldCheck}
                            title="Hierarquia Multi-Tenant"
                            description="Potências gerenciam centenas de Lojas com isolamento total de dados e permissões granulares baseadas em graus e cargos."
                        />
                        <FeatureCard
                            icon={Zap}
                            title="Capitação Automática"
                            description="Cálculos automáticos de taxas federativas por obreiro ativo, com geração de boletos em massa e baixa automática."
                            delay="100ms"
                        />
                        <FeatureCard
                            icon={FileText}
                            title="Workflows de Aprovação"
                            description="Solicitações de Placet e Pranchas com despacho digital em tempo real, eliminando papelada e burocracia."
                            delay="200ms"
                        />
                        <FeatureCard
                            icon={Globe}
                            title="CMS para Lojas"
                            description="Crie o site da sua loja em minutos com nosso gerador dinâmico, integrado nativamente ao banco de dados."
                            delay="300ms"
                        />
                        <FeatureCard
                            icon={Users}
                            title="Gestão de Obreiros"
                            description="Acompanhamento de graus, cargos e regularidade com histórico completo do currículo maçônico e frequência."
                            delay="400ms"
                        />
                        <FeatureCard
                            icon={LayoutDashboard}
                            title="Relatórios Estratégicos"
                            description="Visualize a macrovisão da sua jurisdição com gráficos de crescimento, saúde financeira e atividades recentes."
                            delay="500ms"
                        />
                    </div>
                </div>
            </section>

            {/* How it Works Section */}
            <section className="py-32 px-6 bg-slate-50 border-y border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-bold text-mason-blue mb-4 tracking-tight">Como o e.mason Funciona</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto italic text-lg leading-relaxed">
                            Uma jornada de modernização simplificada para a sua Potência.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
                        {/* Connecting Line (hidden on mobile) */}
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-mason-blue/5 -translate-y-1/2 hidden md:block" />

                        {[
                            { step: "01", title: "Setup da Potência", desc: "Configuramos sua Grande Secretaria com segurança RLS nível bancário." },
                            { step: "02", title: "Criação das Lojas", desc: "Cada loja federada recebe seu próprio sub-sistema de gestão e site." },
                            { step: "03", title: "Importação de Dados", desc: "Migramos seu cadastro atual e histórico de obreiros com suporte Master." },
                            { step: "04", title: "Gestão Unificada", desc: "Opere toda a jurisdição em tempo real, com transparência e sigilo." }
                        ].map((item, i) => (
                            <div key={i} className="relative z-10 flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
                                <div className="w-16 h-16 bg-mason-blue text-white rounded-2xl flex items-center justify-center font-black italic text-2xl mb-6 shadow-xl shadow-mason-blue/20">
                                    {item.step}
                                </div>
                                <h4 className="font-bold text-mason-blue text-lg mb-4 leading-tight">{item.title}</h4>
                                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section className="py-32 px-6 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-xs font-bold text-mason-green uppercase tracking-[0.3em] mb-4">Números de Impacto</h2>
                        <h3 className="text-5xl font-bold text-mason-blue mb-8 leading-tight">Resultados reais para <br /> gestões de excelência.</h3>
                        <p className="text-slate-500 text-xl mb-12 leading-relaxed">
                            O e.mason não é apenas um software, é uma ferramenta de transformação administrativa que gera eficiência imediata.
                        </p>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <p className="text-5xl font-black text-mason-blue mb-2 font-serif tracking-tighter italic">98%</p>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Redução de papelada nas Secretarias</p>
                            </div>
                            <div>
                                <p className="text-5xl font-black text-mason-green mb-2 font-serif tracking-tighter italic">45%</p>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Melhoria na arrecadação (Metais)</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-0 bg-mason-blue rounded-[3rem] -rotate-3 transition group-hover:rotate-0" />
                        <div className="relative aspect-square bg-slate-900 rounded-[3rem] overflow-hidden border-4 border-slate-800 shadow-2xl flex items-center justify-center p-12">
                            <div className="text-center">
                                <ShieldCheck size={120} className="text-mason-green mx-auto mb-10 opacity-30 animate-pulse" />
                                <p className="text-4xl font-black text-white italic tracking-tighter">SIGILO ABSOLUTO</p>
                                <p className="text-slate-400 mt-4 font-bold uppercase tracking-widest text-sm">Criptografia AES-256 de Ponta a Ponta</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust / CTA Section */}
            <section className="py-32 px-6">
                <div className="max-w-5xl mx-auto bg-mason-blue rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-mason-green/20 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-bold mb-8">
                            Pronto para modernizar sua gestão?
                        </h2>
                        <p className="text-white/60 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
                            Junte-se às Potências que já estão utilizando o e.mason para elevar o nível da sua administração.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => openModal('trial')}
                                className="px-10 py-5 bg-mason-green text-mason-blue font-black rounded-full hover:bg-mason-green-light transition uppercase text-sm tracking-widest shadow-xl"
                            >
                                Começar Agora
                            </button>
                            <button
                                onClick={() => openModal('demo')}
                                className="px-10 py-5 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition uppercase text-sm tracking-widest backdrop-blur-md"
                            >
                                Falar com consultor
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <LeadModal
                isOpen={modalConfig.open}
                onClose={closeModal}
                type={modalConfig.type}
            />
        </div>
    );
}
