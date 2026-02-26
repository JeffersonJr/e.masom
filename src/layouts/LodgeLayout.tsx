
import { Outlet, Link, useParams } from 'react-router-dom';
import { Home, Users, Landmark, FileText, Settings, Globe, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function LodgeLayout() {
    const { lodgeSlug } = useParams();
    const { signOut, profile } = useAuth();

    return (
        <div className="flex h-screen bg-background text-primary overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-primary text-primary-foreground flex flex-col shadow-xl flex-shrink-0">
                <div className="p-8">
                    <Link to={`/${lodgeSlug}/dashboard`} className="block">
                        <img src="/e.mason.svg" alt="e.mason" className="h-6 w-auto grayscale brightness-200" />
                    </Link>
                    <p className="text-[10px] text-primary-foreground/40 uppercase tracking-[0.2em] font-black mt-2">Painel de Oficina</p>
                </div>

                <nav className="flex-grow px-4 space-y-2 py-4">
                    <SidebarLink to={`/${lodgeSlug}/dashboard`} icon={Home} label="Início" />
                    <SidebarLink to={`/${lodgeSlug}/dashboard/membros`} icon={Users} label="Quadro de Obreiros" />
                    <SidebarLink to={`/${lodgeSlug}/dashboard/financeiro`} icon={Landmark} label="Tesouraria" />
                    <SidebarLink to={`/${lodgeSlug}/dashboard/processos`} icon={FileText} label="Processos" />
                    <SidebarLink to={`/${lodgeSlug}/dashboard/cms`} icon={Globe} label="Web & CMS" />
                </nav>

                <div className="p-6 mt-auto border-t border-white/5 space-y-4">
                    <Link to={`/${lodgeSlug}/dashboard/config`} className="flex items-center gap-3 px-4 py-2 text-primary-foreground/40 hover:text-white text-sm font-medium transition">
                        <Settings size={18} /> Configurações
                    </Link>

                    <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3 border border-white/5">
                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary font-black">
                            {profile?.nome?.[0] || 'U'}
                        </div>
                        <div className="flex-grow min-w-0">
                            <p className="text-sm font-bold truncate">{profile?.nome || 'Usuário'}</p>
                            <button
                                onClick={() => signOut()}
                                className="flex items-center gap-1 text-[10px] text-white/30 uppercase font-black hover:text-white transition"
                            >
                                <LogOut size={10} /> Sair do Sistema
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow flex flex-col relative min-w-0 overflow-hidden">
                <header className="h-16 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-10 sticky top-0 z-10">
                    <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                        Loja <span className="text-border mx-2">/</span> <span className="text-primary italic font-serif">{lodgeSlug}</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link to={`/${lodgeSlug}`} className="text-[10px] font-black text-accent uppercase tracking-[0.2em] hover:text-primary transition">Ver Site Público</Link>
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
}

function SidebarLink({ to, icon: Icon, label }: SidebarLinkProps) {
    return (
        <Link
            to={to}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-primary-foreground/40 hover:bg-white/5 hover:text-white transition-all duration-300"
        >
            <Icon size={20} /> {label}
        </Link>
    );
}

