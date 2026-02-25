
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { LogIn, Mail, Lock, Loader2, ArrowLeft, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import LeadModal from '../components/LeadModal';
import { translateAuthError } from '../lib/auth-translate';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [signupModalOpen, setSignupModalOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    // Determine initial view from query params or default to 'login'
    const [view, setView] = useState<'login' | 'forgot' | 'reset'>(
        (searchParams.get('view') as any) || 'login'
    );

    // Forgot Password States
    const [forgotSent, setForgotSent] = useState(false);

    // Reset Password States
    const [resetSuccess, setResetSuccess] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        const queryView = searchParams.get('view');
        if (queryView === 'reset') setView('reset');
        else if (queryView === 'forgot') setView('forgot');
        else setView('login');
    }, [searchParams]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const cleanEmail = email.trim();
        const cleanPassword = password.trim();

        if (!cleanEmail || !cleanPassword) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        setLoading(true);
        setError(null);

        console.log('Iniciando tentativa de login para:', cleanEmail);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: cleanEmail,
                password: cleanPassword,
            });

            if (error) {
                console.error('Erro no Supabase Login:', error);
                setError(translateAuthError(error.message));
                setLoading(false);
            } else {
                navigate('/');
            }
        } catch (err: any) {
            console.error('Erro inesperado no Login:', err);
            setError('Ocorreu um erro inesperado. Verifique sua conexão.');
            setLoading(false);
        }
    };

    const handleForgot = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/login?view=reset`,
        });

        if (error) {
            setError(translateAuthError(error.message));
            setLoading(false);
        } else {
            setForgotSent(true);
            setLoading(false);
        }
    };

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        if (password.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            });

            if (error) {
                setError(translateAuthError(error.message));
                setLoading(false);
            } else {
                setResetSuccess(true);
                setLoading(false);
                setTimeout(() => {
                    setView('login');
                    setResetSuccess(false);
                    setPassword('');
                    setConfirmPassword('');
                }, 3000);
            }
        } catch (err: any) {
            setError('Ocorreu um erro inesperado.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-background overflow-hidden">
            {/* Visual Side */}
            <div className="hidden md:flex flex-col justify-between w-1/2 bg-primary p-16 text-primary-foreground relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,oklch(0.769_0.188_70.08_/_0.1)_0%,transparent_60%)]" />

                <Link to="/" className="relative z-10 block">
                    <img src="/e.mason.svg" alt="e.mason" className="h-10 w-auto grayscale brightness-200" />
                </Link>

                <div className="relative z-10 max-w-md">
                    <h2 className="text-6xl font-black mb-8 leading-[0.95] tracking-tighter">
                        Gestão com <br />
                        <span className="text-accent italic font-serif">Propósito.</span>
                    </h2>
                    <p className="text-primary-foreground/60 text-lg leading-relaxed font-medium">
                        Acesse a plataforma de governança maçônica mais avançada do mercado. Segurança, tradição e sobriedade em cada detalhe.
                    </p>
                </div>

                <div className="relative z-10 text-[10px] text-primary-foreground/20 uppercase tracking-[0.3em] font-black">
                    Versão 2.4.0 • © 2026 e.mason
                </div>
            </div>


            {/* Form Side */}
            <div className="flex-grow flex items-center justify-center p-8 bg-background">
                <div className="w-full max-w-md">
                    <Link to="/" className="md:hidden flex items-center gap-2 text-muted-foreground text-sm mb-12 hover:text-primary transition font-bold uppercase tracking-widest text-[10px]">
                        <ArrowLeft size={14} /> Voltar para o início
                    </Link>

                    <header className="mb-12 text-center md:text-left">
                        <h1 className="text-4xl font-black text-primary mb-3 tracking-tighter">
                            {view === 'login' ? 'Login Administrativo' :
                                view === 'forgot' ? 'Recuperar Acesso' : 'Nova Credencial'}
                        </h1>
                        <p className="text-muted-foreground font-medium">
                            {view === 'login' ? 'Insira suas credenciais para acessar o painel.' :
                                view === 'forgot' ? 'Enviaremos um protocolo de restauração para o seu e-mail.' :
                                    'Defina sua nova credencial de acesso soberano.'}
                        </p>
                    </header>


                    {error && (
                        <div className="mb-8 p-5 bg-destructive/5 border border-destructive/20 text-destructive text-[11px] font-black uppercase tracking-widest rounded-md flex gap-4 items-center animate-shake">
                            <div className="w-1.5 h-1.5 bg-destructive rounded-full" />
                            {error}
                        </div>
                    )}

                    {view === 'login' && (
                        <form onSubmit={handleLogin} className="space-y-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] pl-1">Identificação / Email</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 group-focus-within:text-accent transition" size={18} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full bg-background border border-border rounded-md py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent/40 transition font-medium"
                                        placeholder="seu@email.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center pr-1">
                                    <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] pl-1">Credencial de Acesso</label>
                                    <button
                                        type="button"
                                        onClick={() => setSearchParams({ view: 'forgot' })}
                                        className="text-[9px] font-black text-accent hover:text-primary transition uppercase tracking-widest"
                                    >
                                        Recuperar Senha
                                    </button>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 group-focus-within:text-accent transition" size={18} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full bg-background border border-border rounded-md py-4 pl-12 pr-12 outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent/40 transition font-medium"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-primary transition focus:outline-none"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary text-primary-foreground font-black py-4 rounded-md hover:bg-primary/95 transition-all shadow-xl shadow-primary/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 uppercase text-[11px] tracking-[0.2em] active:scale-95"
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : <><LogIn size={18} className="text-accent" /> Acessar Painel</>}
                            </button>
                        </form>
                    )}

                    {view === 'forgot' && !forgotSent && (
                        <form onSubmit={handleForgot} className="space-y-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] pl-1">E-mail para Recuperação</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 group-focus-within:text-accent transition" size={18} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full bg-background border border-border rounded-md py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent/40 transition font-medium"
                                        placeholder="seu@email.com"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-primary text-primary-foreground font-black py-4 rounded-md hover:bg-primary/95 transition-all shadow-xl shadow-primary/10 disabled:opacity-50 flex items-center justify-center gap-3 uppercase text-[11px] tracking-[0.2em]"
                                >
                                    {loading ? <Loader2 className="animate-spin" size={20} /> : 'Enviar Protocolo'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSearchParams({ view: 'login' })}
                                    className="w-full text-muted-foreground hover:text-primary font-black text-[10px] uppercase tracking-widest transition-colors py-2"
                                >
                                    Voltar ao Login
                                </button>
                            </div>
                        </form>
                    )}

                    {view === 'forgot' && forgotSent && (
                        <div className="text-center py-8">
                            <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-8 border border-accent/20">
                                <CheckCircle2 size={40} />
                            </div>
                            <h2 className="text-2xl font-black text-primary mb-4 italic font-serif">Verifique seu E-mail</h2>
                            <p className="text-muted-foreground mb-12 font-medium">Protocolo enviado para <strong>{email}</strong>.</p>
                            <button
                                onClick={() => {
                                    setForgotSent(false);
                                    setSearchParams({ view: 'login' });
                                }}
                                className="w-full bg-primary text-primary-foreground font-black py-4 rounded-md hover:bg-primary/95 transition uppercase text-[11px] tracking-[0.3em]"
                            >
                                Voltar ao Login
                            </button>
                        </div>
                    )}

                    {view === 'reset' && !resetSuccess && (
                        <form onSubmit={handleReset} className="space-y-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] pl-1">Nova Senha</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 group-focus-within:text-accent transition" size={18} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full bg-background border border-border rounded-md py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent/40 transition font-medium"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] pl-1">Confirmar Senha</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 group-focus-within:text-accent transition" size={18} />
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        className="w-full bg-background border border-border rounded-md py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent/40 transition font-medium"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary text-primary-foreground font-black py-4 rounded-md hover:bg-primary/95 transition-all shadow-xl shadow-primary/10 disabled:opacity-50 flex items-center justify-center gap-3 uppercase text-[11px] tracking-[0.2em]"
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Atualizar Credencial'}
                            </button>
                        </form>
                    )}

                    {view === 'reset' && resetSuccess && (
                        <div className="text-center py-8">
                            <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-8 border border-accent/20">
                                <CheckCircle2 size={40} />
                            </div>
                            <h2 className="text-2xl font-black text-primary mb-4 italic font-serif">Senha Atualizada</h2>
                            <p className="text-muted-foreground mb-8 font-medium">Sua nova senha foi salva. Redirecionando...</p>
                        </div>
                    )}

                    {view === 'login' && (
                        <div className="mt-16 text-center">
                            <p className="text-muted-foreground/40 text-[10px] uppercase font-black tracking-widest leading-relaxed">
                                Ainda não tem acesso?
                            </p>
                            <button
                                onClick={() => setSignupModalOpen(true)}
                                className="mt-2 text-primary hover:text-accent font-black text-[10px] uppercase tracking-widest transition-colors border-b border-accent/20 cursor-pointer"
                            >
                                Solicite seu Acesso de 15 Dias
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {signupModalOpen && (
                <LeadModal
                    isOpen={signupModalOpen}
                    onClose={() => setSignupModalOpen(false)}
                    type="trial"
                />
            )}
        </div>
    );
}
