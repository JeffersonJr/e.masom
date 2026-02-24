
import { Outlet, Link, useParams } from 'react-router-dom';
import { Home, Users, Landmark, FileText, Settings, Globe } from 'lucide-react';

export default function LodgeLayout() {
    const { lodgeSlug } = useParams();

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
                <div className="p-6">
                    <Link to={`/${lodgeSlug}/dashboard`} className="block">
                        <img src="/e.mason.svg" alt="e.mason" className="h-6 w-auto" />
                    </Link>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Dashboard da Oficina</p>
                </div>

                <nav className="flex-grow px-4 space-y-1 py-4">
                    <Link to={`/${lodgeSlug}/dashboard`} className="flex items-center gap-3 px-4 py-2 bg-slate-100 rounded-md text-sm font-medium text-mason-blue">
                        <Home size={18} /> Início
                    </Link>
                    <Link to={`/${lodgeSlug}/dashboard/membros`} className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-mason-blue rounded-md text-sm font-medium transition">
                        <Users size={18} /> Quadro de Obreiros
                    </Link>
                    <Link to={`/${lodgeSlug}/dashboard/financeiro`} className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-mason-blue rounded-md text-sm font-medium transition">
                        <Landmark size={18} /> Tesouraria
                    </Link>
                    <Link to={`/${lodgeSlug}/dashboard/processos`} className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-mason-blue rounded-md text-sm font-medium transition">
                        <FileText size={18} /> Processos
                    </Link>
                    <Link to={`/${lodgeSlug}/dashboard/cms`} className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-mason-blue rounded-md text-sm font-medium transition">
                        <Globe size={18} /> Web & CMS
                    </Link>
                </nav>

                <div className="p-4 mt-auto border-t border-slate-100">
                    <Link to={`/${lodgeSlug}/dashboard/config`} className="flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-mason-blue text-sm font-medium">
                        <Settings size={18} /> Configurações
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow flex flex-col">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
                    <div className="text-sm font-medium text-slate-500">Loja / {lodgeSlug}</div>
                    <div className="flex items-center gap-4">
                        <Link to={`/${lodgeSlug}`} className="text-xs text-mason-green hover:underline">Ver Site Público</Link>
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">M</div>
                    </div>
                </header>
                <div className="flex-grow overflow-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
