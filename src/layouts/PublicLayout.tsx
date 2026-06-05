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
            <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 dark:bg-background/70 backdrop-blur-md border-b border-border/80">
                <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
                    <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
                        <img src="/e.mason.svg" alt="e.mason" className="h-5 w-auto dark:invert dark:brightness-100 transition-all duration-300" />
                    </Link>

                    <nav className="hidden md:flex gap-8 text-xs font-normal text-foreground/80">
                        <Link to="/governanca" className="hover:text-accent transition-colors">Governança</Link>
                        <Link to="/capitacao" className="hover:text-accent transition-colors">Capitação</Link>
                        <Link to="/cms-lojas" className="hover:text-accent transition-colors">CMS Lojas</Link>
                    </nav>

                    <div className="flex items-center gap-5">
                        <Link to="/login" className="text-xs font-normal text-muted-foreground hover:text-foreground transition-colors">
                            Acessar
                        </Link>
                        <button
                            onClick={() => openModal('demo')}
                            className="hidden sm:block px-4 py-1.5 bg-accent hover:bg-accent/90 text-white text-[11px] font-medium rounded-full transition-all shadow-sm active:scale-95 cursor-pointer"
                        >
                            Demonstração
                        </button>
                    </div>
                </div>
            </header>

            {modalConfig.open && (
                <LeadModal
                    isOpen={modalConfig.open}
                    onClose={closeModal}
                    type={modalConfig.type}
                />
            )}

            <main className="flex-grow pt-12">
                <Outlet />
            </main>

            <footer className="bg-secondary/40 dark:bg-secondary/20 py-16 px-6 border-t border-border/60">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-xs">
                        <div className="col-span-1 md:col-span-2 space-y-4">
                            <Link to="/" className="inline-block">
                                <img src="/e.mason.svg" alt="e.mason" className="h-4 w-auto dark:invert transition-all duration-300" />
                            </Link>
                            <p className="text-muted-foreground max-w-sm leading-relaxed font-normal">
                                A próxima geração em governança maçônica. Tecnologia de ponta projetada sob medida para a tradição secular de Grandes Orientes e Grandes Lojas.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground mb-3 tracking-tight">Plataforma</h4>
                            <ul className="space-y-2 text-muted-foreground">
                                <li><Link to="/governanca" className="hover:text-accent transition-colors">Governança Digital</Link></li>
                                <li><Link to="/capitacao" className="hover:text-accent transition-colors">Módulo de Capitação</Link></li>
                                <li><Link to="/cms-lojas" className="hover:text-accent transition-colors">CMS para Lojas</Link></li>
                                <li><Link to="/seguranca" className="hover:text-accent transition-colors">Segurança RLS</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground mb-3 tracking-tight">Suporte</h4>
                            <ul className="space-y-2 text-muted-foreground">
                                <li><Link to="/documentacao" className="hover:text-accent transition-colors">Documentação</Link></li>
                                <li><Link to="/suporte" className="hover:text-accent transition-colors">Atendimento Master</Link></li>
                                <li><Link to="/termos" className="hover:text-accent transition-colors">Termos de Uso</Link></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="mt-12 pt-6 border-t border-border/40 text-[11px] text-muted-foreground flex flex-col md:flex-row justify-between gap-4 font-normal">
                        <span>© 2026 e.mason. Todos os direitos reservados. Desenvolvido por <a href="https://evolves.site" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors font-medium">evolves tecnologia</a></span>
                        <div className="flex gap-6">
                            <Link to="/privacidade" className="hover:text-foreground transition-colors">Privacidade</Link>
                            <Link to="/seguranca" className="hover:text-foreground transition-colors">Segurança</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
