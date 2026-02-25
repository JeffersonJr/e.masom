import {
    Users,
    Store,
    FileText,
    TrendingUp,
    ArrowUpRight,
    AlertCircle,
    Calendar,
    Search,
    Filter
} from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div className="p-10 space-y-12 bg-background min-h-screen">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-10">
                <div>
                    <h1 className="text-5xl font-black text-primary tracking-tighter leading-none mb-4">Macrovisão</h1>
                    <p className="text-muted-foreground font-medium flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent rounded-full" />
                        Jurisdição: <span className="text-primary font-bold">Grande Loja Equinócio</span>
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-accent transition" size={16} />
                        <input
                            type="text"
                            placeholder="Buscar loja ou obreiro..."
                            className="bg-background border border-border rounded-md py-3 pl-12 pr-6 text-sm outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition w-80 font-medium"
                        />
                    </div>
                    <button className="p-3 bg-background border border-border rounded-md text-muted-foreground hover:text-primary hover:border-primary transition shadow-sm">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <MetricCard
                    title="Lojas Federadas"
                    value="42"
                    trend="+2 este mês"
                    icon={Store}
                    color="bg-primary"
                />
                <MetricCard
                    title="Obreiros Ativos"
                    value="1.240"
                    trend="+15% vs ano ant."
                    icon={Users}
                    color="bg-accent"
                    darkIcon
                />
                <MetricCard
                    title="Capitação Global"
                    value="R$ 145k"
                    trend="Meta: 92%"
                    icon={TrendingUp}
                    color="bg-primary"
                />
                <MetricCard
                    title="Processos"
                    value="15"
                    trend="3 Urgentes"
                    icon={FileText}
                    color="bg-primary"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Health Monitoring */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-background rounded-xl border border-border shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-border flex items-center justify-between bg-muted/5">
                            <h3 className="font-black text-primary uppercase tracking-widest text-xs">Status das Lojas</h3>
                            <button className="text-[10px] font-black text-accent uppercase tracking-[0.2em] hover:text-primary transition">Ver todas</button>
                        </div>
                        <div className="divide-y divide-border">
                            <LodgeStatusItem name="Aurora da Virtude" number="001" status="Regular" members={45} revenue="R$ 4.500" />
                            <LodgeStatusItem name="Cavaleiros da Luz" number="012" status="Regular" members={32} revenue="R$ 3.200" />
                            <LodgeStatusItem name="Estrela do Norte" number="045" status="Pendente" members={28} revenue="R$ 0" warning />
                            <LodgeStatusItem name="Fraternidade Universal" number="089" status="Regular" members={54} revenue="R$ 5.400" />
                            <LodgeStatusItem name="Monte Sinai" number="102" status="Regular" members={39} revenue="R$ 3.900" />
                        </div>
                    </div>
                </div>

                {/* Sidebar Alerts / Activities */}
                <div className="space-y-8">
                    <div className="bg-primary rounded-xl p-8 text-primary-foreground relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 rounded-full -mr-20 -mt-20 blur-3xl" />
                        <h3 className="font-black mb-8 flex items-center gap-3 uppercase text-xs tracking-widest">
                            <AlertCircle size={18} className="text-accent" /> Alertas de Gestão
                        </h3>
                        <div className="space-y-6 relative z-10">
                            <div className="text-sm border-l-2 border-accent pl-5 py-2">
                                <p className="font-bold text-base">Relatório Semestral</p>
                                <p className="text-primary-foreground/40 text-xs mt-1">5 lojas ainda não enviaram.</p>
                            </div>
                            <div className="text-sm border-l-2 border-accent/30 pl-5 py-2">
                                <p className="font-bold text-base text-primary-foreground/80">Inadimplência Alta</p>
                                <p className="text-primary-foreground/40 text-xs mt-1">Loja Estrela do Norte (3 meses).</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-background rounded-xl border border-border shadow-sm p-8">
                        <h3 className="font-black text-primary mb-8 flex items-center gap-3 uppercase text-xs tracking-widest">
                            <Calendar size={18} className="text-accent" /> Atividade Recente
                        </h3>
                        <div className="space-y-8">
                            <ActivityItem user="Pedro Soares" action="Aprovou Placet" time="2h atrás" />
                            <ActivityItem user="Loja 042" action="Novo documento enviado" time="4h atrás" />
                            <ActivityItem user="Grão-Mestre" action="Alterou configurações" time="1 dia atrás" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

interface MetricCardProps {
    title: string;
    value: string;
    trend: string;
    icon: React.ElementType;
    color: string;
    darkIcon?: boolean;
}

function MetricCard({ title, value, trend, icon: Icon, color, darkIcon }: MetricCardProps) {
    return (
        <div className="bg-background p-8 rounded-xl border border-border shadow-sm hover:shadow-xl hover:border-accent/40 transition-all group relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 ${color} rounded-md flex items-center justify-center ${darkIcon ? 'text-primary' : 'text-primary-foreground'} shadow-lg shadow-black/5`}>
                    <Icon size={24} />
                </div>
                <div className="text-[10px] font-black text-accent bg-accent/5 px-3 py-1.5 rounded-full flex items-center gap-1.5 uppercase tracking-widest border border-accent/10">
                    <ArrowUpRight size={12} /> {trend}
                </div>
            </div>
            <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{title}</h3>
            <p className="text-4xl font-black mt-2 text-primary tracking-tighter">{value}</p>
        </div>
    );
}


interface LodgeStatusItemProps {
    name: string;
    number: string;
    status: string;
    members: number;
    revenue: string;
    warning?: boolean;
}

function LodgeStatusItem({ name, number, status, members, revenue, warning }: LodgeStatusItemProps) {
    return (
        <div className="p-8 flex items-center justify-between hover:bg-muted/5 transition border-l-4 border-transparent hover:border-accent">
            <div className="flex items-center gap-6">
                <div className={`w-12 h-12 rounded-md flex items-center justify-center font-black text-xs ${warning ? 'bg-accent/10 text-accent border border-accent/20' : 'bg-muted text-muted-foreground border border-border'}`}>
                    {number}
                </div>
                <div>
                    <h4 className="font-black text-primary text-base tracking-tight">{name}</h4>
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-1">{members} obreiros ativos</p>
                </div>
            </div>
            <div className="flex items-center gap-16">
                <div className="text-right hidden md:block">
                    <p className="font-black text-muted-foreground uppercase text-[9px] tracking-[0.2em] mb-1">Tesouraria</p>
                    <p className={`text-lg font-black tracking-tighter ${warning ? 'text-accent underline decoration-accent/30 decoration-offset-4' : 'text-primary'}`}>{revenue || '---'}</p>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] ${warning ? 'bg-accent/10 text-accent border border-accent/20' : 'bg-primary text-primary-foreground'}`}>
                    {status}
                </div>
            </div>
        </div>
    );
}


interface ActivityItemProps {
    user: string;
    action: string;
    time: string;
}

function ActivityItem({ user, action, time }: ActivityItemProps) {
    return (
        <div className="flex gap-5 group">
            <div className="w-10 h-10 rounded-full bg-muted border border-border flex-shrink-0 flex items-center justify-center text-[10px] font-black text-muted-foreground group-hover:bg-accent group-hover:text-primary transition-colors">
                {user.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
                <p className="text-sm font-black text-primary tracking-tight">{user}</p>
                <p className="text-[11px] text-muted-foreground font-medium">{action}</p>
                <p className="text-[9px] text-muted-foreground/40 mt-1 uppercase font-black tracking-widest">{time}</p>
            </div>
        </div>
    );
}

