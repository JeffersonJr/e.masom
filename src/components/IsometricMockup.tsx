import { TrendingUp, Users, Store, AlertCircle } from 'lucide-react';

export default function IsometricMockup() {
    return (
        <div className="relative w-full max-w-5xl py-20 px-4 md:px-0">
            {/* The layered structure - Sidebar slightly behind the dashboard content */}
            <div className="relative aspect-[16/10] bg-muted/20 rounded-[2rem] overflow-hidden">

                {/* Layer 1: The Sidebar (Background) */}
                <div className="absolute top-0 left-0 bottom-0 w-20 md:w-64 bg-primary p-6 flex flex-col gap-6 z-10 shadow-2xl">
                    <div className="h-10 w-10 bg-accent rounded-xl mb-4" />
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="h-2 w-full bg-white/10 rounded" />
                    ))}
                    <div className="mt-auto h-12 w-full bg-white/5 rounded-xl border border-white/10" />
                </div>

                {/* Layer 2: The Main Dashboard (Foreground) */}
                <div className="absolute top-4 right-4 bottom-4 left-24 md:left-72 bg-white rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col z-20">
                    {/* Browser UI */}
                    <div className="h-12 bg-muted/20 border-b border-border flex items-center px-6 gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400/30" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400/30" />
                        <div className="w-3 h-3 rounded-full bg-green-400/30" />
                        <div className="ml-4 h-4 w-1/3 bg-muted/40 rounded-full" />
                    </div>

                    <div className="flex-1 p-8 md:p-12 overflow-hidden flex flex-col gap-8">
                        {/* Dashboard Content */}
                        <div className="flex justify-between items-center">
                            <div className="space-y-3">
                                <div className="h-2 w-24 bg-muted mb-2 rounded" />
                                <div className="h-10 w-48 md:w-80 bg-primary/10 rounded-xl" />
                            </div>
                            <div className="h-14 w-14 bg-muted/30 rounded-full border-2 border-white shadow-inner" />
                        </div>

                        {/* Stats Widgets */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { icon: Users, color: 'text-blue-500' },
                                { icon: Store, color: 'text-orange-500' },
                                { icon: AlertCircle, color: 'text-accent' }
                            ].map((stat, i) => (
                                <div key={i} className="p-6 bg-[#F9FAFB] border border-border rounded-2xl space-y-4">
                                    <div className="flex justify-between">
                                        <stat.icon size={20} className={stat.color} />
                                        <TrendingUp size={16} className="text-muted-foreground" />
                                    </div>
                                    <div className="h-4 w-full bg-muted/20 rounded" />
                                </div>
                            ))}
                        </div>

                        {/* Chart Area */}
                        <div className="flex-1 bg-white border border-border rounded-2xl p-8 relative overflow-hidden">
                            <div className="h-4 w-40 bg-muted/20 rounded mb-10" />
                            <div className="absolute bottom-0 left-0 right-0 h-40 flex items-end gap-3 px-8 opacity-20">
                                {[30, 50, 40, 70, 45, 80, 60, 90, 55, 100, 75, 85].map((h, i) => (
                                    <div key={i} className="flex-1 bg-primary rounded-t-xl" style={{ height: `${h}%` }} />
                                ))}
                            </div>
                            <div className="relative z-10 space-y-6">
                                {[1, 2].map((item) => (
                                    <div key={item} className="flex items-center gap-6">
                                        <div className="w-10 h-10 rounded-xl bg-muted/10 blur-[1px]" />
                                        <div className="flex-1 h-3 bg-muted/5 rounded-full" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ambient Glows */}
                <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-accent/5 blur-3xl rounded-full" />
                <div className="absolute bottom-[-10%] left-[10%] w-80 h-80 bg-primary/5 blur-3xl rounded-full" />
            </div>
        </div>
    );
}
