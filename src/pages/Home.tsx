
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ShieldCheck, FileText, Zap, TrendingUp, BarChart3, Lock, MessageSquare, Plus, CheckCircle2, Clock, Shield, Globe, Database } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import LeadModal from '../components/LeadModal';
import IsometricMockup from '../components/IsometricMockup';
import FloatingPill from '../components/FloatingPill';

export default function Home() {
    const [modalConfig, setModalConfig] = useState<{ open: boolean; type: 'demo' | 'trial' }>({
        open: false,
        type: 'demo'
    });
    const mockupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!mockupRef.current) return;

            const rect = mockupRef.current.getBoundingClientRect();
            const viewHeight = window.innerHeight;

            // Start opening when the top of the mockup is 80% from the top of the viewport
            // Finish opening when it's at 20%
            const start = viewHeight * 0.8;
            const end = viewHeight * 0.2;

            let progress = (start - rect.top) / (start - end);
            progress = Math.min(1, Math.max(0, progress));

            mockupRef.current.style.setProperty('--scroll-progress', progress.toString());
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const openModal = (type: 'demo' | 'trial') => setModalConfig({ open: true, type });
    const closeModal = () => setModalConfig(prev => ({ ...prev, open: false }));

    return (
        <div className="flex flex-col bg-background">

            {/* Hero Section */}
            <section className="relative pt-40 pb-40 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 bg-[radial-gradient(circle_at_50%_0%,oklch(0.769_0.188_70.08_/_0.05)_0%,transparent_50%)]" />

                <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative">
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-muted/50 border border-border rounded-full text-[10px] font-black text-primary mb-12 tracking-[0.2em] uppercase">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse shadow-[0_0_8px_oklch(0.769_0.188_70.08)]" />
                        O Futuro da Tradição: Governança em Estado da Arte
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tight text-primary leading-[0.95] mb-10 max-w-4xl">
                        Soberania Digital. <br />
                        <span className="text-muted-foreground italic font-serif">
                            Legado Institucional.
                        </span>
                    </h1>

                    <p className="max-w-2xl text-xl text-muted-foreground mb-14 leading-relaxed font-medium">
                        O e.mason é a ferramenta definitiva para Grão-Mestrados e Grandes Secretarias que buscam soberania digital, controle financeiro absoluto e o resgate da eficiência administrativa.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 mb-32 z-10">
                        <button
                            onClick={() => openModal('demo')}
                            className="px-10 py-4 bg-primary text-primary-foreground font-black rounded-md hover:bg-primary/90 transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-primary/20 uppercase text-xs tracking-widest active:scale-95"
                        >
                            Solicitar Demonstração <ArrowRight size={16} className="text-accent" />
                        </button>
                        <button
                            onClick={() => openModal('trial')}
                            className="px-10 py-4 bg-background border-2 border-primary text-primary font-black rounded-md hover:bg-muted transition-all uppercase text-xs tracking-widest active:scale-95"
                        >
                            Teste Grátis por 15 Dias
                        </button>
                    </div>

                    {/* New Isometric Mockup Section */}
                    <div className="relative w-full flex justify-center">
                        <FloatingPill
                            icon={BarChart3}
                            text="+40% de Eficiência"
                            className="top-20 left-[5%] md:left-[10%]"
                            delay="0s"
                        />
                        <FloatingPill
                            icon={Lock}
                            text="Segurança RLS Ativa"
                            className="top-40 right-[5%] md:right-[15%]"
                            delay="1.5s"
                        />
                        <FloatingPill
                            icon={MessageSquare}
                            text="Pranchas Digitais"
                            className="bottom-20 left-[10%] md:left-[20%]"
                            delay="0.7s"
                        />
                        <FloatingPill
                            icon={TrendingUp}
                            text="Gestão de Metais"
                            className="bottom-40 right-[10%] md:right-[20%]"
                            delay="2.2s"
                        />
                        <IsometricMockup />
                    </div>
                </div>
            </section>

            {/* Features (Conversion focused labels) */}
            <section className="py-40 px-6 bg-background relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24 max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-6xl font-black text-primary mb-8 tracking-tighter italic font-serif">O Soberano no comando da sua jurisdição.</h2>
                        <p className="text-xl text-muted-foreground font-medium italic">Elimine a desordem administrativa e financeira com ferramentas pensadas por quem entende de maçonaria.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        <FeatureCard
                            icon={ShieldCheck}
                            title="Segurança Inviolável"
                            description="Isolamento RLS (Row Level Security) que garante que cada Loja acesse apenas o que lhe é de direito. Sigilo absoluto em nível de banco de dados."
                        />
                        <FeatureCard
                            icon={Zap}
                            title="Capitação Instantânea"
                            description="Arrecadação de metais e mensalidades 100% automatizada. Baixa bancária nativa e transparência total para as Oficinas."
                            delay="100ms"
                        />
                        <FeatureCard
                            icon={FileText}
                            title="Despachos Digitais"
                            description="Fluxo de pranchas, placets e processos 100% digitais. Workflow de aprovação entre Lojas e Grande Secretaria em tempo real."
                            delay="200ms"
                        />
                    </div>
                </div>
            </section>

            {/* Comparison Section: Battle vs Solution */}
            <section className="py-24 px-6 bg-muted/30">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="flex-1 space-y-8">
                            <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tighter">
                                A Realidade da <span className="text-muted-foreground italic font-serif">Gestão Manual</span>
                            </h2>
                            <p className="text-lg text-muted-foreground font-medium">
                                Planilhas soltas, processos em papel e falta de transparência financeira consomem o tempo precioso da administração.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Dependência de processos físicos e burocráticos",
                                    "Dificuldade na prestação de contas em tempo real",
                                    "Risco de perda de dados históricos e legados",
                                    "Arrecadação de metais lenta e descentralizada"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 text-sm font-bold text-primary/70">
                                        <Plus className="text-red-500 rotate-45" size={18} />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 bg-white p-8 md:p-12 rounded-3xl border border-border shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4">
                                <CheckCircle2 className="text-accent" size={32} />
                            </div>
                            <h3 className="text-3xl font-black text-primary mb-8 tracking-tighter">A Solução <span className="text-accent underline decoration-2 underline-offset-8">e.mason</span></h3>
                            <div className="space-y-6">
                                {[
                                    { title: "Soberania Digital", desc: "Controle total da jurisdição em um clique." },
                                    { title: "Transparência Financeira", desc: "Dashboard de metais em tempo real." },
                                    { title: "Segurança de Grado Maçônico", desc: "Proteção de dados em nível institucional." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="mt-1 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                                            <div className="w-2 h-2 rounded-full bg-accent" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-primary text-sm uppercase tracking-wider">{item.title}</h4>
                                            <p className="text-muted-foreground text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Section: Stats */}
            <section className="py-40 px-6 bg-primary text-primary-foreground relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(0.769_0.188_70.08_/_0.1)_0%,transparent_70%)]" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">O Impacto em Números</h2>
                        <p className="text-primary-foreground/60 text-xl font-medium">Resultados reais para potências de excelência.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Clock, value: "65%", label: "Redução em Trabalho Manual" },
                            { icon: CheckCircle2, value: "100%", label: "Conciliação Bancária Ativa" },
                            { icon: Shield, value: "Zero", label: "Vulnerabilidade de Dados" },
                            { icon: Globe, value: "24/7", label: "Disponibilidade da Jurisdição" }
                        ].map((stat, i) => (
                            <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm text-center group hover:bg-white/10 transition-all">
                                <stat.icon size={32} className="text-accent mx-auto mb-6 group-hover:scale-110 transition-transform" />
                                <div className="text-4xl font-black mb-2">{stat.value}</div>
                                <div className="text-xs uppercase tracking-[0.2em] text-primary-foreground/40 font-bold">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Ecosystem Section */}
            <section className="py-24 px-6 bg-background">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col items-center text-center mb-16">
                        <div className="px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-[10px] font-black text-accent mb-6 uppercase tracking-widest">
                            Conectividade
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tighter">
                            Ecossistema Integrado
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        {[
                            { name: 'Supabase', icon: Database },
                            { name: 'Stripe', icon: Zap },
                            { name: 'WhatsApp', icon: MessageSquare },
                            { name: 'Zapier', icon: TrendingUp },
                            { name: 'PostgreSQL', icon: Shield },
                            { name: 'Vercel', icon: Globe }
                        ].map((item) => (
                            <div key={item.name} className="flex flex-col items-center justify-center p-8 border border-border rounded-2xl hover:bg-muted/50 transition-colors group">
                                <div className="h-8 w-8 text-primary/40 mb-3 group-hover:text-primary transition-colors">
                                    <item.icon size={32} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-tighter text-primary">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-40 px-6">
                <div className="max-w-5xl mx-auto bg-primary text-primary-foreground rounded-2xl p-16 md:p-24 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(0.769_0.188_70.08_/_0.15)_0%,transparent_60%)]" />
                    <div className="relative z-10">
                        <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter leading-tight italic font-serif">A Era da Maestria <br /> Digital Chegou.</h2>
                        <p className="text-primary-foreground/60 text-xl mb-16 max-w-xl mx-auto font-medium leading-relaxed">
                            Junte-se às potências que já escolheram a excelência. Recupere o controle e projete sua jurisdição para o futuro.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <button
                                onClick={() => openModal('trial')}
                                className="px-12 py-5 bg-accent text-primary font-black rounded-md hover:scale-110 hover:-rotate-1 transition-all uppercase text-xs tracking-widest shadow-xl shadow-accent/20 active:scale-95"
                            >
                                Reivindicar Soberania
                            </button>
                            <button
                                onClick={() => openModal('demo')}
                                className="px-12 py-5 bg-transparent text-white font-black rounded-md hover:bg-white/5 transition-all uppercase text-xs tracking-widest border-2 border-white/10"
                            >
                                Falar com Consultor Master
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {modalConfig.open && (
                <LeadModal
                    isOpen={modalConfig.open}
                    onClose={closeModal}
                    type={modalConfig.type}
                />
            )}
        </div>
    );
}
