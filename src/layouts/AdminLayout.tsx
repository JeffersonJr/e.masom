import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, Store, FileStack, Settings, Users,
    Bell, LogOut, Globe, LayoutTemplate, Menu, X,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function AdminLayout() {
    const location = useLocation();
    const { signOut, profile } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const potenciaSlug = profile?.potencias?.slug;

    // Fechar sidebar ao navegar (mobile)
    useEffect(() => {
        setSidebarOpen(false);
    }, [location.pathname]);

    // Fechar sidebar ao pressionar Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSidebarOpen(false);
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, []);

    return (
        <div className="flex h-screen bg-background overflow-hidden text-primary">

            {/* ── Overlay mobile ─────────────────────────────────────────── */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* ── Sidebar ────────────────────────────────────────────────── */}
            <aside className={`
                fixed lg:static inset-y-0 left-0
                w-72 bg-primary text-primary-foreground flex flex-col shadow-2xl
                z-40 flex-shrink-0
                transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                {/* Logo + fechar (mobile) */}
                <div className="p-6 lg:p-8 relative z-10 flex flex-col items-center">
                    <div className="w-full flex items-center justify-between lg:justify-center">
                        <Link to="/admin" className="block">
                            <img src="/e.mason.svg" alt="e.mason" className="h-7 lg:h-8 w-auto grayscale brightness-200" />
                        </Link>
                        <button
                            className="lg:hidden p-1.5 text-white/40 hover:text-white transition"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <X size={18} />
                        </button>
                    </div>
                    <div className="mt-4 px-3 py-1 bg-white/5 rounded-full inline-block border border-white/10">
                        <p className="text-[10px] text-accent font-black uppercase tracking-[0.2em]">Painel Potência</p>
                    </div>
                </div>

                <nav className="flex-grow px-4 space-y-1 py-4 relative z-10 overflow-y-auto">
                    <SidebarLink to="/admin" icon={LayoutDashboard} label="Dashboard" active={location.pathname === '/admin'} />
                    <SidebarLink to="/admin/lojas" icon={Store} label="Lojas Federadas" active={location.pathname === '/admin/lojas'} />
                    <SidebarLink to="/admin/processos" icon={FileStack} label="Processos & Atas" active={location.pathname === '/admin/processos'} />
                    <SidebarLink to="/admin/obreiros" icon={Users} label="Cadastro de Obreiros" active={location.pathname === '/admin/obreiros'} />

                    {/* Divisor */}
                    <div className="border-t border-white/5 my-2" />

                    <SidebarLink to="/admin/site" icon={LayoutTemplate} label="Site" active={location.pathname.startsWith('/admin/site')} />

                    {potenciaSlug && (
                        <a
                            href={`/p/${potenciaSlug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 text-white/40 hover:bg-white/5 hover:text-white"
                        >
                            <Globe size={20} /> Ver Site da Potência
                        </a>
                    )}

                    {/* Divisor */}
                    <div className="border-t border-white/5 my-2" />

                    <SidebarLink to="/admin/config" icon={Settings} label="Configurações" active={location.pathname.startsWith('/admin/config')} />
                </nav>

                {/* User card */}
                <div className="p-4 lg:p-6 mt-auto border-t border-white/5 relative z-10">
                    <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3 border border-white/5">
                        <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-accent flex items-center justify-center text-primary font-black text-sm shrink-0">
                            {profile?.nome?.[0] || 'U'}
                        </div>
                        <div className="flex-grow min-w-0">
                            <p className="text-sm font-bold truncate">{profile?.nome || 'Usuário'}</p>
                            <p className="text-[10px] text-white/30 uppercase font-black truncate">{profile?.cargo || 'Membro'}</p>
                        </div>
                        <button
                            onClick={() => signOut()}
                            className="text-white/20 hover:text-white transition shrink-0"
                            title="Sair"
                        >
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* ── Main Content ───────────────────────────────────────────── */}
            <main className="flex-grow flex flex-col min-w-0 overflow-hidden">

                {/* Topbar */}
                <header className="h-14 lg:h-16 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 lg:px-10 sticky top-0 z-20 shrink-0">
                    <div className="flex items-center gap-3">
                        {/* Hamburger — só mobile */}
                        <button
                            className="lg:hidden p-2 text-muted-foreground hover:text-primary transition hover:bg-muted/50 rounded-lg"
                            onClick={() => setSidebarOpen(true)}
                            aria-label="Abrir menu"
                        >
                            <Menu size={20} />
                        </button>

                        <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] hidden sm:flex">
                            <span>Páginas</span>
                            <span className="text-border">/</span>
                            <span className="text-primary font-black italic font-serif">Dashboard Administrativo</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Atalho: Site da Potência */}
                        {potenciaSlug ? (
                            <a
                                href={`/p/${potenciaSlug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Ver site da potência"
                                className="p-2 text-muted-foreground hover:text-primary transition rounded-lg hover:bg-muted/50 flex items-center gap-1.5"
                            >
                                <Globe size={18} />
                            </a>
                        ) : (
                            <button title="Configure o slug da potência para ver o site" className="p-2 text-muted-foreground/30 rounded-lg cursor-not-allowed" disabled>
                                <Globe size={18} />
                            </button>
                        )}
                        <div className="w-px h-5 bg-border" />
                        <button className="relative p-2 text-muted-foreground hover:text-primary transition">
                            <Bell size={18} />
                            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-accent rounded-full border border-background shadow-[0_0_8px_oklch(0.769_0.188_70.08)]" />
                        </button>
                    </div>
                </header>

                {/* Page content */}
                <div className="flex-grow overflow-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

// ── SidebarLink ──────────────────────────────────────────────────────────────
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
                ? 'bg-accent text-primary shadow-lg shadow-accent/20'
                : 'text-white/40 hover:bg-white/5 hover:text-white'
                }`}
        >
            <Icon size={20} /> {label}
        </Link>
    );
}
