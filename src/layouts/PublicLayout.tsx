import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import LeadModal from '../components/LeadModal';

export default function PublicLayout() {
    const [modalConfig, setModalConfig] = useState<{ open: boolean; type: 'demo' | 'trial' }>({
        open: false,
        type: 'demo'
    });

    const openModal = (type: 'demo' | 'trial') => setModalConfig({ open: true, type });
    const closeModal = () => setModalConfig(prev => ({ ...prev, open: false }));

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center">
                        <img src="/e.mason.svg" alt="e.mason" className="h-8 w-auto" />
                    </Link>

                    <nav className="hidden md:flex gap-10 text-sm font-medium text-slate-500 uppercase tracking-widest">
                        <Link to="/governanca" className="hover:text-mason-blue transition">Governança</Link>
                        <Link to="/capitacao" className="hover:text-mason-blue transition">Capitação</Link>
                        <Link to="/cms-lojas" className="hover:text-mason-blue transition">CMS Lojas</Link>
                    </nav>

                    <div className="flex items-center gap-6">
                        <Link to="/login" className="text-sm font-bold text-mason-blue">
                            Acessar Painel
                        </Link>
                        <button
                            onClick={() => openModal('demo')}
                            className="hidden sm:block px-5 py-2.5 bg-mason-blue text-white text-sm font-bold rounded-full hover:bg-mason-blue-light transition"
                        >
                            Solicitar Demonstração
                        </button>
                    </div>
                </div>
            </header>

            <LeadModal
                isOpen={modalConfig.open}
                onClose={closeModal}
                type={modalConfig.type}
            />

            <main className="flex-grow pt-20">
                <Outlet />
            </main>

            <footer className="bg-slate-50 border-t border-slate-100 py-20 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2 space-y-4">
                        <div className="text-2xl font-bold text-mason-blue">e.mason</div>
                        <p className="text-slate-500 max-w-sm text-lg leading-relaxed">
                            A próxima geração em governança maçônica. Tecnologia de ponta para a tradição secular.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-mason-blue mb-4 uppercase text-xs tracking-widest">Plataforma</h4>
                        <ul className="space-y-2 text-slate-500 text-sm">
                            <li><Link to="/governanca" className="hover:text-mason-blue transition">Governança Digital</Link></li>
                            <li><Link to="/capitacao" className="hover:text-mason-blue transition">Módulo de Capitação</Link></li>
                            <li><Link to="/cms-lojas" className="hover:text-mason-blue transition">CMS para Lojas</Link></li>
                            <li><Link to="/seguranca" className="hover:text-mason-blue transition">Segurança RLS</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-mason-blue mb-4 uppercase text-xs tracking-widest">Suporte</h4>
                        <ul className="space-y-2 text-slate-500 text-sm">
                            <li><Link to="/documentacao" className="hover:text-mason-blue transition">Documentação</Link></li>
                            <li><Link to="/suporte" className="hover:text-mason-blue transition">Atendimento Master</Link></li>
                            <li><Link to="/termos" className="hover:text-mason-blue transition">Termos de Uso</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-200 text-slate-400 text-xs flex justify-between">
                    <span>© 2026 e.mason. Todos os direitos reservados.</span>
                    <div className="flex gap-4">
                        <span>Privacidade</span>
                        <span>Segurança</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
