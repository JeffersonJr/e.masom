
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ShieldCheck, FileText, Zap, TrendingUp, Users, Store, AlertCircle } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import LeadModal from '../components/LeadModal';

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
            <section className="relative pt-40 pb-24 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 bg-[radial-gradient(circle_at_50%_0%,oklch(0.769_0.188_70.08_/_0.05)_0%,transparent_50%)]" />

                <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-muted/50 border border-border rounded-full text-[10px] font-black text-primary mb-12 tracking-[0.2em] uppercase">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse shadow-[0_0_8px_oklch(0.769_0.188_70.08)]" />
                        O Futuro da Tradição: Governança em Estado da Arte
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tight text-primary leading-[0.95] mb-10 max-w-4xl">
                        Garanta a <br />
                        <span className="text-muted-foreground italic font-serif">
                            Perenidade da Ordem.
                        </span>
                    </h1>

                    <p className="max-w-2xl text-xl text-muted-foreground mb-14 leading-relaxed font-medium">
                        O e.mason é a ferramenta definitiva para Grão-Mestrados e Grandes Secretarias que buscam soberania digital, controle financeiro absoluto e o resgate da eficiência administrativa.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 mb-24">
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

                    {/* Realistic MacBook Pro Mockup with Scroll Animation */}
                    <div ref={mockupRef} className="relative w-full max-w-5xl group perspective-[2000px]">
                        <div
                            className="relative aspect-[16/10] transition-transform duration-500 ease-out preserve-3d"
                            style={{
                                perspective: '2000px',
                                // The lid (top half) is what rotates. We'll simplify the structure:
                            }}
                        >
                            {/* The Lid (Screen) */}
                            <div
                                className="absolute inset-0 bg-primary rounded-[2rem] p-2 border-4 border-primary shadow-2xl origin-bottom transition-transform duration-75"
                                style={{
                                    transform: `rotateX(calc(var(--scroll-progress, 0) * -110deg + 110deg))`,
                                    zIndex: 20
                                }}
                            >
                                <div className="w-full h-full bg-background rounded-2xl overflow-hidden relative border border-border/50">
                                    <div className="absolute inset-x-0 top-0 h-6 bg-muted/50 flex items-center px-4 gap-1.5 border-b border-border">
                                        <div className="w-2.5 h-2.5 rounded-full bg-border" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-border" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-border" />
                                    </div>

                                    <div className="pt-6 h-full flex">
                                        {/* Sidebar */}
                                        <div className="w-20 md:w-48 bg-primary h-full border-r border-border flex flex-col p-4 gap-4">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <div key={i} className="h-2 w-full bg-muted-foreground/10 rounded" />
                                            ))}
                                            <div className="mt-auto h-8 w-full bg-accent/20 rounded border border-accent/30" />
                                        </div>
                                        {/* Dashboard Content */}
                                        <div className="flex-grow bg-[#FDFDFD] p-6 lg:p-10 flex flex-col gap-6 text-left overflow-hidden">
                                            <div className="flex justify-between items-end mb-4">
                                                <div>
                                                    <div className="h-2 w-24 bg-muted mb-2 rounded" />
                                                    <div className="h-6 w-48 bg-primary rounded" />
                                                </div>
                                                <div className="h-10 w-10 bg-muted rounded-full" />
                                            </div>

                                            {/* Metrics Grid */}
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="p-4 border border-border rounded-lg bg-white shadow-sm">
                                                    <div className="flex justify-between mb-4"><Users size={14} className="text-muted-foreground" /><TrendingUp size={12} className="text-accent" /></div>
                                                    <div className="h-6 w-full bg-primary/10 rounded" />
                                                </div>
                                                <div className="p-4 border border-border rounded-lg bg-white shadow-sm">
                                                    <div className="flex justify-between mb-4"><Store size={14} className="text-muted-foreground" /><TrendingUp size={12} className="text-accent" /></div>
                                                    <div className="h-6 w-full bg-primary/10 rounded" />
                                                </div>
                                                <div className="p-4 border border-border rounded-lg bg-white shadow-sm">
                                                    <div className="flex justify-between mb-4"><AlertCircle size={14} className="text-muted-foreground" /><div className="h-2 w-2 rounded-full bg-accent animate-pulse" /></div>
                                                    <div className="h-6 w-full bg-primary/10 rounded" />
                                                </div>
                                            </div>

                                            {/* Activity Chart Area */}
                                            <div className="flex-grow bg-white rounded-xl border border-border shadow-sm p-6 relative">
                                                <div className="h-3 w-1/2 bg-muted/30 rounded mb-8" />
                                                <div className="space-y-4">
                                                    {[1, 2, 3].map(i => (
                                                        <div key={i} className="flex items-center gap-4">
                                                            <div className="w-8 h-8 rounded-full bg-muted/20" />
                                                            <div className="flex-grow h-2 bg-muted/10 rounded" />
                                                            <div className="w-12 h-2 bg-accent/20 rounded" />
                                                        </div>
                                                    ))}
                                                </div>
                                                {/* Abstract Chart Overlay */}
                                                <div className="absolute bottom-4 left-4 right-4 h-24 flex items-end gap-1 opacity-20">
                                                    {[30, 50, 40, 70, 45, 60, 80, 55, 65, 90, 75, 85].map((h, i) => (
                                                        <div key={i} className="flex-grow bg-primary rounded-t" style={{ height: `${h}%` }} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* The Base (Keyboard) */}
                            <div className="absolute inset-0 bg-primary/95 rounded-[2rem] border-4 border-primary shadow-lg overflow-hidden translate-y-2 origin-top rotateX-[80deg] -z-10">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1)_0%,transparent_60%)]" />
                            </div>
                        </div>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[110%] h-4 bg-primary/90 rounded-b-2xl shadow-xl hidden md:block" />
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
                                className="px-12 py-5 bg-accent text-primary font-black rounded-md hover:scale-105 transition-transform uppercase text-xs tracking-widest shadow-xl shadow-accent/20 active:scale-95"
                            >
                                Iniciar Teste Grátis
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

            <LeadModal
                isOpen={modalConfig.open}
                onClose={closeModal}
                type={modalConfig.type}
            />
        </div>
    );
}
