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
        <div className="flex flex-col min-h-screen bg-background">
            <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center">
                        <img src="/e.mason.svg" alt="e.mason" className="h-8 w-auto grayscale brightness-50" />
                    </Link>

                    <nav className="hidden md:flex gap-10 text-sm font-medium text-muted-foreground uppercase tracking-widest">
                        <Link to="/governanca" className="hover:text-primary transition">Governança</Link>
                        <Link to="/capitacao" className="hover:text-primary transition">Capitação</Link>
                        <Link to="/cms-lojas" className="hover:text-primary transition">CMS Lojas</Link>
                    </nav>

                    <div className="flex items-center gap-6">
                        <Link to="/login" className="text-sm font-bold text-primary hover:text-accent transition">
                            Acessar Painel
                        </Link>
                        <button
                            onClick={() => openModal('demo')}
                            className="hidden sm:block px-6 py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-md hover:bg-primary/90 transition shadow-sm border border-transparent active:scale-95"
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

            <footer className="bg-muted py-24 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <div className="text-2xl font-black text-primary tracking-tighter uppercase italic">
                            e.mason<span className="text-accent">.</span>
                        </div>
                        <p className="text-muted-foreground max-w-sm text-lg leading-relaxed">
                            A próxima geração em governança maçônica. Tecnologia de ponta voltada à tradição secular.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-primary mb-6 uppercase text-xs tracking-[0.2em]">Plataforma</h4>
                        <ul className="space-y-3 text-muted-foreground text-sm">
                            <li><Link to="/governanca" className="hover:text-accent transition">Governança Digital</Link></li>
                            <li><Link to="/capitacao" className="hover:text-accent transition">Módulo de Capitação</Link></li>
                            <li><Link to="/cms-lojas" className="hover:text-accent transition">CMS para Lojas</Link></li>
                            <li><Link to="/seguranca" className="hover:text-accent transition">Segurança RLS</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-primary mb-6 uppercase text-xs tracking-[0.2em]">Suporte</h4>
                        <ul className="space-y-3 text-muted-foreground text-sm">
                            <li><Link to="/documentacao" className="hover:text-accent transition">Documentação</Link></li>
                            <li><Link to="/suporte" className="hover:text-accent transition">Atendimento Master</Link></li>
                            <li><Link to="/termos" className="hover:text-accent transition">Termos de Uso</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-border/50 text-muted-foreground/60 text-[10px] flex flex-col md:flex-row justify-between gap-4 uppercase tracking-widest font-medium">
                    <span>© 2026 e.mason. Todos os direitos reservados. Powered by <a href="https://evolvestecnologia.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition">evolves tecnologia</a></span>
                    <div className="flex gap-8">
                        <Link to="/privacidade" className="hover:text-primary transition">Privacidade</Link>
                        <Link to="/seguranca" className="hover:text-primary transition">Segurança</Link>
                    </div>
                </div>
            </footer>

        </div>
    );
}
