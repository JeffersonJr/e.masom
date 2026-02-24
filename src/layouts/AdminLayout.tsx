import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Store, FileStack, Settings, Users, Bell, LogOut } from 'lucide-react';

export default function AdminLayout() {
    const location = useLocation();

    return (
        <div className="flex min-h-screen bg-slate-50/30">
            {/* Sidebar */}
            <aside className="w-72 bg-mason-blue text-white flex flex-col shadow-2xl relative z-20">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                <div className="p-8 relative z-10 flex flex-col items-center">
                    <Link to="/admin" className="block">
                        <img src="/e.mason.svg" alt="e.mason" className="h-8 w-auto brightness-0 invert" />
                    </Link>
                    <div className="mt-4 px-3 py-1 bg-white/10 rounded-full inline-block">
                        <p className="text-[10px] text-mason-green font-bold uppercase tracking-[0.2em]">Painel Potência</p>
                    </div>
                </div>

                <nav className="flex-grow px-4 space-y-1 py-4 relative z-10">
                    <SidebarLink to="/admin" icon={LayoutDashboard} label="Dashboard" active={location.pathname === '/admin'} />
                    <SidebarLink to="/admin/lojas" icon={Store} label="Lojas Federadas" active={location.pathname === '/admin/lojas'} />
                    <SidebarLink to="/admin/processos" icon={FileStack} label="Processos & Atas" active={location.pathname === '/admin/processos'} />
                    <SidebarLink to="/admin/obreiros" icon={Users} label="Cadastro de Obreiros" active={location.pathname === '/admin/obreiros'} />
                </nav>

                <div className="p-6 mt-auto border-t border-white/5 relative z-10 space-y-4">
                    <Link to="/admin/config" className="flex items-center gap-3 px-4 py-2 text-white/50 hover:text-white text-sm font-medium transition group">
                        <Settings size={18} className="group-hover:rotate-90 transition-transform duration-500" /> Configurações
                    </Link>

                    <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-mason-green flex items-center justify-center text-mason-blue font-bold">JD</div>
                        <div className="flex-grow min-w-0">
                            <p className="text-sm font-bold truncate">José Duarte</p>
                            <p className="text-[10px] text-white/40 uppercase font-black truncate">Grão-Mestre</p>
                        </div>
                        <button className="text-white/30 hover:text-white transition">
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow flex flex-col relative z-10">
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-10">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        <span>Páginas</span>
                        <span className="text-slate-200">/</span>
                        <span className="text-mason-blue">Dashboard Administrativo</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative p-2 text-slate-400 hover:text-mason-blue transition">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
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
                ? 'bg-mason-green text-mason-blue shadow-lg shadow-mason-green/20'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
        >
            <Icon size={20} /> {label}
        </Link>
    );
}
