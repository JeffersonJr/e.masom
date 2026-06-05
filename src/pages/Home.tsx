
import { useState } from 'react';
import { ArrowRight, ShieldCheck, FileText, Zap, TrendingUp, Plus, CheckCircle2, Clock, Shield, Globe, Database, MessageSquare, ChevronRight, Layers, BarChart3, Users } from 'lucide-react';
import LeadModal from '../components/LeadModal';
import DashboardShowcase from '../components/DashboardShowcase';

export default function Home() {
    const [modalConfig, setModalConfig] = useState<{ open: boolean; type: 'demo' | 'trial' }>({
        open: false,
        type: 'demo'
    });

    const openModal = (type: 'demo' | 'trial') => setModalConfig({ open: true, type });
    const closeModal = () => setModalConfig(prev => ({ ...prev, open: false }));

    return (
        <div className="flex flex-col bg-background">

            {/* ═══════════════════════════════ HERO ═══════════════════════════════ */}
            <section className="relative pt-28 pb-8 md:pt-40 md:pb-16 px-6 overflow-hidden">
                {/* Background gradient — Atlassian-inspired radial */}
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(0,113,227,0.08),transparent_70%)]" />

                <div className="max-w-7xl mx-auto text-center relative">
                    {/* Pill badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/5 border border-accent/15 rounded-full text-[11px] font-semibold text-accent mb-8 tracking-wide">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                        Plataforma de Governança Maçônica
                    </div>

                    {/* Giant headline — Atlassian + Apple style */}
                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold tracking-tight text-foreground leading-[1.05] mb-6 max-w-5xl mx-auto">
                        Toda a sua jurisdição.{' '}
                        <span className="bg-gradient-to-r from-accent via-blue-400 to-accent bg-clip-text text-transparent">
                            Uma plataforma.
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground mb-10 leading-relaxed">
                        Gestão de lojas, obreiros, financeiro e documentos em um sistema seguro e
                        inteligente, projetado para Grandes Orientes e Grandes Lojas.
                    </p>

                    {/* CTA row */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16 md:mb-24">
                        <button
                            onClick={() => openModal('trial')}
                            className="px-8 py-3.5 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 text-sm active:scale-[0.98] cursor-pointer shadow-lg shadow-accent/20"
                        >
                            Começar Gratuitamente <ArrowRight size={16} />
                        </button>
                        <button
                            onClick={() => openModal('demo')}
                            className="px-8 py-3.5 bg-white dark:bg-card hover:bg-secondary text-foreground border border-border font-semibold rounded-lg transition-all text-sm active:scale-[0.98] cursor-pointer"
                        >
                            Solicitar Demonstração
                        </button>
                    </div>

                    {/* Dashboard Showcase */}
                    <DashboardShowcase />
                </div>
            </section>

            {/* ═══════════════════════════════ SOCIAL PROOF BAR ═══════════════════════════════ */}
            <section className="py-12 px-6 border-y border-border/40">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                        {[
                            { value: '2.800+', label: 'Obreiros Gerenciados' },
                            { value: '186', label: 'Lojas Ativas' },
                            { value: '99.9%', label: 'Uptime Garantido' },
                            { value: '< 200ms', label: 'Tempo de Resposta' },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{stat.value}</div>
                                <div className="text-xs text-muted-foreground mt-1 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════ FEATURES GRID ═══════════════════════════════ */}
            <section className="py-20 md:py-28 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/5 border border-accent/15 rounded-full text-[10px] font-semibold text-accent mb-5 tracking-widest uppercase">
                            Recursos
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                            Tudo que sua potência precisa
                        </h2>
                        <p className="text-muted-foreground text-base md:text-lg">
                            Ferramentas poderosas pensadas por quem entende de maçonaria.
                        </p>
                    </div>

                    {/* Bento Grid — Atlassian inspired layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {/* Feature 1 — Large */}
                        <div className="lg:col-span-2 p-8 md:p-10 bg-gradient-to-br from-accent/5 to-accent/[0.02] border border-accent/10 rounded-2xl group hover:border-accent/25 transition-all duration-500">
                            <div className="flex flex-col md:flex-row md:items-start gap-6">
                                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent shrink-0 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                                    <ShieldCheck size={26} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-foreground mb-2 tracking-tight">Segurança de Nível Bancário</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                        Isolamento RLS (Row Level Security) que garante que cada Loja acesse apenas
                                        o que lhe é de direito. Seus dados ficam protegidos com criptografia de
                                        ponta a ponta e backups automatizados.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {['RLS Ativo', 'Criptografia E2E', 'Backup 24h'].map((tag) => (
                                            <span key={tag} className="px-2.5 py-1 bg-accent/5 border border-accent/10 rounded-md text-[10px] font-semibold text-accent">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-8 bg-card border border-border/60 rounded-2xl group hover:border-accent/25 hover:shadow-xl hover:shadow-accent/5 transition-all duration-500">
                            <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500 mb-5 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                                <Zap size={22} />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2 tracking-tight">Capitação Instantânea</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Arrecadação de metais 100% automatizada com conciliação bancária nativa e transparência total.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-8 bg-card border border-border/60 rounded-2xl group hover:border-accent/25 hover:shadow-xl hover:shadow-accent/5 transition-all duration-500">
                            <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center text-violet-500 mb-5 group-hover:bg-violet-500 group-hover:text-white transition-all duration-500">
                                <FileText size={22} />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2 tracking-tight">Despachos Digitais</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Pranchas, placets e processos 100% digitais. Workflow entre Lojas e Grande Secretaria em tempo real.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="p-8 bg-card border border-border/60 rounded-2xl group hover:border-accent/25 hover:shadow-xl hover:shadow-accent/5 transition-all duration-500">
                            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 mb-5 group-hover:bg-green-500 group-hover:text-white transition-all duration-500">
                                <Users size={22} />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2 tracking-tight">Gestão de Obreiros</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Cadastro completo, controle de grau, frequência e histórico maçônico de cada membro.
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="p-8 bg-card border border-border/60 rounded-2xl group hover:border-accent/25 hover:shadow-xl hover:shadow-accent/5 transition-all duration-500">
                            <div className="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center text-rose-500 mb-5 group-hover:bg-rose-500 group-hover:text-white transition-all duration-500">
                                <BarChart3 size={22} />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2 tracking-tight">Relatórios Avançados</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Dashboards em tempo real com KPIs de adimplência, crescimento e performance da jurisdição.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════ COMPARISON ═══════════════════════════════ */}
            <section className="py-20 md:py-28 px-6 bg-secondary/30 dark:bg-secondary/10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                            Antes e depois do <span className="text-accent">e.mason</span>
                        </h2>
                        <p className="text-muted-foreground text-base md:text-lg">
                            Veja como sua administração se transforma.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Before */}
                        <div className="p-8 md:p-10 bg-card border border-border/60 rounded-2xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-destructive/10 rounded-xl flex items-center justify-center">
                                    <Plus className="text-destructive rotate-45" size={18} />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground">Gestão Manual</h3>
                            </div>
                            <div className="space-y-4">
                                {[
                                    "Dependência de processos físicos e burocráticos",
                                    "Dificuldade na prestação de contas em tempo real",
                                    "Risco de perda de dados históricos e legados",
                                    "Arrecadação de metais lenta e descentralizada"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                        <Plus className="text-destructive/60 rotate-45 shrink-0 mt-0.5" size={14} />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* After */}
                        <div className="p-8 md:p-10 bg-gradient-to-br from-accent/5 to-accent/[0.02] border border-accent/15 rounded-2xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                                    <CheckCircle2 className="text-accent" size={18} />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground">Com o e.mason</h3>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { title: "Soberania Digital", desc: "Controle total da jurisdição em um clique." },
                                    { title: "Transparência Financeira", desc: "Dashboard de metais em tempo real." },
                                    { title: "Segurança Institucional", desc: "Proteção de dados com RLS e criptografia." },
                                    { title: "Automação Completa", desc: "Processos digitais de ponta a ponta." }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="text-accent shrink-0 mt-0.5" size={14} />
                                        <div>
                                            <span className="text-sm font-semibold text-foreground">{item.title}</span>
                                            <span className="text-sm text-muted-foreground ml-1">— {item.desc}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════ STATS DARK ═══════════════════════════════ */}
            <section className="py-20 md:py-28 px-6 bg-foreground text-background relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,113,227,0.08),transparent_70%)]" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Impacto Real</h2>
                        <p className="text-background/50 text-base md:text-lg">Resultados medidos em potências de excelência.</p>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Clock, value: "65%", label: "Redução em Trabalho Manual" },
                            { icon: CheckCircle2, value: "100%", label: "Conciliação Bancária" },
                            { icon: Shield, value: "Zero", label: "Vulnerabilidades" },
                            { icon: Globe, value: "24/7", label: "Disponibilidade" }
                        ].map((stat) => (
                            <div key={stat.label} className="p-8 bg-background/5 border border-background/10 rounded-2xl backdrop-blur-sm text-center group hover:bg-background/10 transition-all">
                                <stat.icon size={22} className="text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                                <div className="text-[10px] uppercase tracking-widest text-background/40 font-semibold">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════ ECOSYSTEM ═══════════════════════════════ */}
            <section className="py-20 md:py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col items-center text-center mb-12">
                        <div className="px-3 py-1 bg-accent/5 border border-accent/15 rounded-full text-[10px] font-semibold text-accent mb-5 tracking-widest uppercase">
                            Integrações
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">
                            Ecossistema Integrado
                        </h2>
                        <p className="text-muted-foreground text-base max-w-lg">
                            Conecte-se com as melhores ferramentas do mercado.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                        {[
                            { name: 'Neon', icon: Database },
                            { name: 'Stripe', icon: Zap },
                            { name: 'WhatsApp', icon: MessageSquare },
                            { name: 'Zapier', icon: Layers },
                            { name: 'PostgreSQL', icon: Shield },
                            { name: 'Vercel', icon: Globe }
                        ].map((item) => (
                            <div key={item.name} className="flex flex-col items-center justify-center p-6 md:p-8 border border-border/60 rounded-2xl hover:bg-accent/5 hover:border-accent/20 transition-all duration-300 group cursor-default">
                                <item.icon size={28} className="text-muted-foreground/40 mb-3 group-hover:text-accent transition-colors" />
                                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════ FINAL CTA ═══════════════════════════════ */}
            <section className="py-20 md:py-28 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="relative bg-gradient-to-br from-accent via-blue-600 to-accent rounded-3xl p-12 md:p-20 text-center overflow-hidden">
                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
                        <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />

                        <div className="relative z-10">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                                Pronto para transformar <br className="hidden md:block" />
                                sua jurisdição?
                            </h2>
                            <p className="text-white/70 text-base md:text-lg mb-10 max-w-xl mx-auto">
                                Junte-se às potências que já escolheram a excelência.
                                Comece gratuitamente em menos de 2 minutos.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => openModal('trial')}
                                    className="px-10 py-4 bg-white text-accent font-bold rounded-lg hover:bg-white/90 transition-all text-sm active:scale-[0.98] cursor-pointer shadow-xl"
                                >
                                    Teste Grátis por 15 Dias
                                </button>
                                <button
                                    onClick={() => openModal('demo')}
                                    className="px-10 py-4 bg-transparent text-white font-semibold rounded-lg hover:bg-white/10 transition-all text-sm border-2 border-white/20 active:scale-[0.98] cursor-pointer"
                                >
                                    Falar com Consultor
                                </button>
                            </div>
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
