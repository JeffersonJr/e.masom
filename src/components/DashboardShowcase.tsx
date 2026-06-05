import { useEffect, useRef, useState } from 'react';
import { Users, Store, BarChart3, TrendingUp, ChevronRight, DollarSign, Activity } from 'lucide-react';

export default function DashboardShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.15 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const stats = [
        { label: 'Obreiros Ativos', value: '2.847', change: '+12%', icon: Users, color: '#0071e3' },
        { label: 'Lojas Filiadas', value: '186', change: '+8%', icon: Store, color: '#34c759' },
        { label: 'Arrecadação', value: 'R$ 482k', change: '+23%', icon: DollarSign, color: '#ff9f0a' },
    ];

    const chartBars = [35, 52, 44, 68, 58, 74, 62, 80, 72, 88, 78, 92];
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    return (
        <div ref={containerRef} className="relative w-full max-w-5xl mx-auto">
            {/* Ambient glow */}
            <div className="absolute -inset-10 bg-gradient-to-b from-accent/5 via-transparent to-transparent rounded-[3rem] blur-3xl -z-10" />

            {/* Main window */}
            <div
                className="relative rounded-2xl overflow-hidden border border-border/80 shadow-2xl shadow-black/5 dark:shadow-black/30 transition-all duration-1000"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.97)',
                }}
            >
                {/* Window chrome */}
                <div className="h-11 bg-white dark:bg-[#1d1d1f] border-b border-border/60 flex items-center px-4 gap-2">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                    </div>
                    <div className="flex-1 flex justify-center">
                        <div className="flex items-center gap-2 px-4 py-1 bg-secondary/60 dark:bg-white/5 rounded-md text-[11px] text-muted-foreground font-medium">
                            <Activity size={10} />
                            e.mason — Painel da Jurisdição
                        </div>
                    </div>
                    <div className="w-16" />
                </div>

                {/* Dashboard body */}
                <div className="flex bg-white dark:bg-[#0d0d0d]">
                    {/* Sidebar */}
                    <div className="hidden md:flex flex-col w-56 bg-[#fafafa] dark:bg-[#141414] border-r border-border/40 p-4 gap-1">
                        <div className="flex items-center gap-3 mb-6 px-2">
                            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                                <span className="text-white font-bold text-xs">e.</span>
                            </div>
                            <div>
                                <div className="text-xs font-semibold text-foreground">e.mason</div>
                                <div className="text-[10px] text-muted-foreground">Administrador</div>
                            </div>
                        </div>
                        {[
                            { label: 'Dashboard', active: true },
                            { label: 'Lojas' },
                            { label: 'Obreiros' },
                            { label: 'Financeiro' },
                            { label: 'Documentos' },
                            { label: 'Frequência' },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                                    item.active
                                        ? 'bg-accent/10 text-accent'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                                }`}
                            >
                                {item.label}
                            </div>
                        ))}
                    </div>

                    {/* Main content */}
                    <div className="flex-1 p-6 md:p-8">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mb-1">Visão Geral</div>
                                <h2 className="text-lg font-semibold text-foreground tracking-tight">Grande Oriente</h2>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="hidden sm:inline text-[10px] bg-green-500/10 text-green-600 dark:text-green-400 px-2.5 py-1 rounded-full font-semibold">● Sistema Online</span>
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center text-white text-[10px] font-bold">JC</div>
                            </div>
                        </div>

                        {/* Stats row */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                            {stats.map((stat, i) => (
                                <div
                                    key={stat.label}
                                    className="relative p-5 rounded-xl border border-border/60 bg-white dark:bg-[#1a1a1a] overflow-hidden group transition-all duration-500"
                                    style={{
                                        opacity: isVisible ? 1 : 0,
                                        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                                        transitionDelay: `${300 + i * 150}ms`,
                                    }}
                                >
                                    <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-[0.04]" style={{ backgroundColor: stat.color, filter: 'blur(20px)' }} />
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: stat.color + '12' }}>
                                            <stat.icon size={14} style={{ color: stat.color }} />
                                        </div>
                                        <span className="text-[10px] font-semibold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">{stat.change}</span>
                                    </div>
                                    <div className="text-xl font-bold text-foreground tracking-tight">{stat.value}</div>
                                    <div className="text-[10px] text-muted-foreground font-medium mt-0.5">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Chart */}
                        <div
                            className="p-6 rounded-xl border border-border/60 bg-white dark:bg-[#1a1a1a] transition-all duration-700"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                                transitionDelay: '750ms',
                            }}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <div className="text-xs font-semibold text-foreground">Arrecadação Mensal</div>
                                    <div className="text-[10px] text-muted-foreground mt-0.5">Evolução dos últimos 12 meses</div>
                                </div>
                                <div className="flex items-center gap-1 text-[10px] text-accent font-semibold cursor-pointer hover:underline">
                                    Ver Relatório <ChevronRight size={12} />
                                </div>
                            </div>

                            <div className="flex items-end gap-[6px] h-32">
                                {chartBars.map((height, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                        <div
                                            className="w-full rounded-md transition-all duration-1000 ease-out"
                                            style={{
                                                height: isVisible ? `${height}%` : '0%',
                                                transitionDelay: `${800 + i * 80}ms`,
                                                background: i === chartBars.length - 1
                                                    ? 'var(--accent)'
                                                    : i >= chartBars.length - 3
                                                        ? 'linear-gradient(to top, var(--accent), var(--accent))'
                                                        : 'var(--secondary)',
                                                opacity: i >= chartBars.length - 3 ? 1 : 0.6,
                                            }}
                                        />
                                        <span className="text-[8px] text-muted-foreground font-medium hidden sm:block">{months[i]}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Mini trend line */}
                            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/30">
                                <TrendingUp size={12} className="text-green-500" />
                                <span className="text-[10px] text-muted-foreground">Crescimento de <span className="text-green-500 font-semibold">+23%</span> em relação ao trimestre anterior</span>
                            </div>
                        </div>

                        {/* Activity feed */}
                        <div
                            className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-700"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                                transitionDelay: '1200ms',
                            }}
                        >
                            <div className="p-5 rounded-xl border border-border/60 bg-white dark:bg-[#1a1a1a]">
                                <div className="text-xs font-semibold text-foreground mb-3 flex items-center gap-2">
                                    <BarChart3 size={12} className="text-accent" /> Atividade Recente
                                </div>
                                {[
                                    { text: 'Loja Estrela do Sul fez pagamento', time: '2 min' },
                                    { text: 'Novo obreiro registrado', time: '15 min' },
                                    { text: 'Documento aprovado', time: '1h' },
                                ].map((act, i) => (
                                    <div key={i} className="flex items-center justify-between py-2 border-b border-border/20 last:border-0">
                                        <span className="text-[10px] text-muted-foreground">{act.text}</span>
                                        <span className="text-[9px] text-muted-foreground/60 whitespace-nowrap ml-2">{act.time}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="p-5 rounded-xl border border-border/60 bg-white dark:bg-[#1a1a1a]">
                                <div className="text-xs font-semibold text-foreground mb-3 flex items-center gap-2">
                                    <Store size={12} className="text-accent" /> Lojas em Destaque
                                </div>
                                {[
                                    { name: 'Loja Estrela do Sul', members: 47, status: 'Em dia' },
                                    { name: 'Loja Fraternidade', members: 38, status: 'Em dia' },
                                    { name: 'Loja Luz do Oriente', members: 52, status: 'Pendente' },
                                ].map((lodge, i) => (
                                    <div key={i} className="flex items-center justify-between py-2 border-b border-border/20 last:border-0">
                                        <div>
                                            <div className="text-[10px] font-medium text-foreground">{lodge.name}</div>
                                            <div className="text-[9px] text-muted-foreground">{lodge.members} membros</div>
                                        </div>
                                        <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${lodge.status === 'Em dia' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}`}>
                                            {lodge.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating badges */}
            <div
                className="absolute -left-4 top-1/4 z-10 flex items-center gap-2 px-3 py-2 bg-white dark:bg-card border border-border/60 rounded-xl shadow-lg transition-all duration-700"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                    transitionDelay: '1400ms',
                }}
            >
                <div className="w-6 h-6 rounded-md bg-green-500/10 flex items-center justify-center">
                    <TrendingUp size={12} className="text-green-500" />
                </div>
                <div>
                    <div className="text-[10px] font-bold text-foreground">+40%</div>
                    <div className="text-[8px] text-muted-foreground">Eficiência</div>
                </div>
            </div>

            <div
                className="absolute -right-4 top-1/3 z-10 flex items-center gap-2 px-3 py-2 bg-white dark:bg-card border border-border/60 rounded-xl shadow-lg transition-all duration-700"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
                    transitionDelay: '1600ms',
                }}
            >
                <div className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center">
                    <Activity size={12} className="text-accent" />
                </div>
                <div>
                    <div className="text-[10px] font-bold text-foreground">99.9%</div>
                    <div className="text-[8px] text-muted-foreground">Uptime</div>
                </div>
            </div>
        </div>
    );
}
