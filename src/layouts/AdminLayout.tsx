import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Store, FileStack, Settings, Users, Bell, LogOut } from 'lucide-react';

export default function AdminLayout() {
    const location = useLocation();

    return (
        <div className="flex min-h-screen bg-background">
            {/* Sidebar */}
            <aside className="w-72 bg-primary text-primary-foreground flex flex-col shadow-2xl relative z-20">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                <div className="p-8 relative z-10 flex flex-col items-center">
                    <Link to="/admin" className="block">
                        <img src="/e.mason.svg" alt="e.mason" className="h-8 w-auto grayscale brightness-200" />
                    </Link>
                    <div className="mt-4 px-3 py-1 bg-white/5 rounded-full inline-block border border-white/10">
                        <p className="text-[10px] text-accent font-black uppercase tracking-[0.2em]">Painel Potência</p>
                    </div>
                </div>

                <nav className="flex-grow px-4 space-y-1 py-4 relative z-10">
                    <SidebarLink to="/admin" icon={LayoutDashboard} label="Dashboard" active={location.pathname === '/admin'} />
                    <SidebarLink to="/admin/lojas" icon={Store} label="Lojas Federadas" active={location.pathname === '/admin/lojas'} />
                    <SidebarLink to="/admin/processos" icon={FileStack} label="Processos & Atas" active={location.pathname === '/admin/processos'} />
                    <SidebarLink to="/admin/obreiros" icon={Users} label="Cadastro de Obreiros" active={location.pathname === '/admin/obreiros'} />
                </nav>

                <div className="p-6 mt-auto border-t border-white/5 relative z-10 space-y-4">
                    <Link to="/admin/config" className="flex items-center gap-3 px-4 py-2 text-white/40 hover:text-white text-sm font-medium transition group">
                        <Settings size={18} className="group-hover:rotate-90 transition-transform duration-500" /> Configurações
                    </Link>

                    <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3 border border-white/5">
                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary font-black">JD</div>
                        <div className="flex-grow min-w-0">
                            <p className="text-sm font-bold truncate">José Duarte</p>
                            <p className="text-[10px] text-white/30 uppercase font-black truncate">Grão-Mestre</p>
                        </div>
                        <button className="text-white/20 hover:text-white transition">
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>
            </aside>


            {/* Main Content */}
            <main className="flex-grow flex flex-col relative z-10">
                <header className="h-20 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-10 sticky top-0 z-10">
                    <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                        <span>Páginas</span>
                        <span className="text-border">/</span>
                        <span className="text-primary font-black italic font-serif">Dashboard Administrativo</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative p-2 text-muted-foreground hover:text-primary transition">
                            <Bell size={18} />
                            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-accent rounded-full border border-background shadow-[0_0_8px_oklch(0.769_0.188_70.08)]" />
                        </button>
                    </div>
                </header>


                <div className="flex-grow overflow-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

interface SidebarLinkProps {
    to: string;
    icon: React.ElementType;
    label: string;
    active: boolean;
}

function SidebarLink({ to, icon: Icon, label, active }: SidebarLinkProps) {
    return (
        <Link
            to={to}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${active
                ? 'bg-accent text-primary shadow-lg shadow-accent/20 active:scale-95'
                : 'text-white/40 hover:bg-white/5 hover:text-white'
                }`}
        >

            <Icon size={20} /> {label}
        </Link>
    );
}
