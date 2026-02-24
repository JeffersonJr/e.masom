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
        <div className="p-10 space-y-10 bg-slate-50/50 min-h-screen">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-mason-blue tracking-tight">Macrovisão</h1>
                    <p className="text-slate-500 mt-2 font-medium">Jurisdição: Grande Loja Equinócio</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Buscar loja ou obreiro..."
                            className="bg-white border border-slate-200 rounded-full py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-mason-green/20 focus:border-mason-green transition w-64"
                        />
                    </div>
                    <button className="p-2 bg-white border border-slate-200 rounded-full text-slate-500 hover:text-mason-blue transition">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="Lojas Federadas"
                    value="42"
                    trend="+2 este mês"
                    icon={Store}
                    color="bg-blue-500"
                />
                <MetricCard
                    title="Obreiros Ativos"
                    value="1.240"
                    trend="+15% vs ano ant."
                    icon={Users}
                    color="bg-mason-green"
                />
                <MetricCard
                    title="Capitação Global"
                    value="R$ 145k"
                    trend="Meta: 92%"
                    icon={TrendingUp}
                    color="bg-emerald-500"
                />
                <MetricCard
                    title="Processos"
                    value="15"
                    trend="3 Urgentes"
                    icon={FileText}
                    color="bg-rose-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Health Monitoring */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                            <h3 className="font-bold text-mason-blue">Status das Lojas</h3>
                            <button className="text-xs font-bold text-mason-green uppercase tracking-widest hover:underline">Ver todas</button>
                        </div>
                        <div className="divide-y divide-slate-50">
                            <LodgeStatusItem name="Aurora da Virtude" number="001" status="Regular" members={45} revenue="R$ 4.500" />
                            <LodgeStatusItem name="Cavaleiros da Luz" number="012" status="Regular" members={32} revenue="R$ 3.200" />
                            <LodgeStatusItem name="Estrela do Norte" number="045" status="Pendente" members={28} revenue="R$ 0" warning />
                            <LodgeStatusItem name="Fraternidade Universal" number="089" status="Regular" members={54} revenue="R$ 5.400" />
                            <LodgeStatusItem name="Monte Sinai" number="102" status="Regular" members={39} revenue="R$ 3.900" />
                        </div>
                    </div>
                </div>

                {/* Sidebar Alerts / Activities */}
                <div className="space-y-6">
                    <div className="bg-mason-blue rounded-3xl p-6 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-mason-green/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <AlertCircle size={18} className="text-mason-green" /> Alertas de Gestão
                        </h3>
                        <div className="space-y-4 relative z-10">
                            <div className="text-sm border-l-2 border-mason-green pl-3 py-1">
                                <p className="font-bold">Relatório Semestral</p>
                                <p className="text-white/60 text-xs">5 lojas ainda não enviaram.</p>
                            </div>
                            <div className="text-sm border-l-2 border-rose-500 pl-3 py-1">
                                <p className="font-bold">Inadimplência Alta</p>
                                <p className="text-white/60 text-xs">Loja Estrela do Norte (3 meses).</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                        <h3 className="font-bold text-mason-blue mb-6 flex items-center gap-2">
                            <Calendar size={18} className="text-slate-400" /> Atividade Recente
                        </h3>
                        <div className="space-y-6">
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
}

function MetricCard({ title, value, trend, icon: Icon, color }: MetricCardProps) {
    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition group">
            <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                    <Icon size={24} />
                </div>
                <div className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-1">
                    <ArrowUpRight size={10} /> {trend}
                </div>
            </div>
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-widest">{title}</h3>
            <p className="text-3xl font-bold mt-1 text-mason-blue">{value}</p>
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
        <div className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition">
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${warning ? 'bg-rose-50 text-rose-500' : 'bg-slate-100 text-slate-400'}`}>
                    {number}
                </div>
                <div>
                    <h4 className="font-bold text-mason-blue text-sm">{name}</h4>
                    <p className="text-xs text-slate-500">{members} obreiros</p>
                </div>
            </div>
            <div className="flex items-center gap-12 text-sm">
                <div className="text-right hidden md:block">
                    <p className="font-medium text-slate-400 uppercase text-[10px] tracking-widest">Tesouraria</p>
                    <p className={`font-bold ${warning ? 'text-rose-500' : 'text-slate-700'}`}>{revenue}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${warning ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
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
        <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex-shrink-0" />
            <div>
                <p className="text-sm font-bold text-mason-blue">{user}</p>
                <p className="text-xs text-slate-500">{action}</p>
                <p className="text-[10px] text-slate-300 mt-1 uppercase font-bold tracking-widest">{time}</p>
            </div>
        </div>
    );
}
