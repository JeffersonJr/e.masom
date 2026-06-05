
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, Mail, Lock, Loader2, ArrowLeft, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import LeadModal from '../components/LeadModal';
import { translateAuthError } from '../lib/auth-translate';

export default function Login() {
    const { signIn } = useAuth();
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
    const [devLink, setDevLink] = useState<string | null>(null);

    // Reset Password States
    const [resetSuccess, _setResetSuccess] = useState(false);
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
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: cleanEmail, password: cleanPassword })
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                setError(translateAuthError(errData.error || 'Erro ao realizar login.'));
                setLoading(false);
            } else {
                const data = await res.json();
                signIn(data.token, data.user, data.profile);
                navigate('/dashboard');
            }
        } catch (err: any) {
            console.error('Erro inesperado no Login:', err);
            setError('Ocorreu um erro inesperado. Verifique sua conexão.');
            setLoading(false);
        }
    };

    const handleForgot = async (e: React.FormEvent) => {
        e.preventDefault();
        const cleanEmail = email.trim();
        if (!cleanEmail) {
            setError('Por favor, preencha o campo de e-mail.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/auth/forgot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: cleanEmail })
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                setError(errData.error || 'Erro ao enviar protocolo de recuperação.');
                setLoading(false);
            } else {
                const data = await res.json();
                setForgotSent(true);
                if (data.devLink) {
                    setDevLink(data.devLink);
                }
                setLoading(false);
            }
        } catch (err: any) {
            console.error('Erro no Forgot:', err);
            setError('Ocorreu um erro inesperado.');
            setLoading(false);
        }
    };

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = searchParams.get('token');
        if (!token) {
            setError('Token de recuperação inválido ou ausente.');
            return;
        }

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
            const res = await fetch('/api/auth/reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, password })
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                setError(errData.error || 'Erro ao redefinir a senha.');
                setLoading(false);
            } else {
                _setResetSuccess(true);
                setTimeout(() => {
                    setSearchParams({ view: 'login' });
                    _setResetSuccess(false);
                    setPassword('');
                    setConfirmPassword('');
                }, 3000);
            }
        } catch (err: any) {
            console.error('Erro no Reset:', err);
            setError('Ocorreu um erro inesperado.');
            setLoading(false);
        }
    };

     return (
        <div className="min-h-screen flex flex-col md:flex-row bg-background overflow-hidden">
            {/* Visual Side */}
            <div className="hidden md:flex flex-col justify-between w-1/2 bg-foreground p-16 text-background relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(10,132,255,0.08)_0%,transparent_60%)]" />

                <Link to="/" className="relative z-10 block hover:opacity-85 transition-opacity">
                    <img src="/e.mason.svg" alt="e.mason" className="h-6 w-auto invert brightness-200" />
                </Link>

                <div className="relative z-10 max-w-md">
                    <h2 className="text-5xl font-bold mb-6 leading-tight tracking-tight">
                        Gestão com <br />
                        <span className="text-accent">Propósito.</span>
                    </h2>
                    <p className="text-muted-foreground text-base leading-relaxed font-normal">
                        Acesse a plataforma de governança maçônica mais avançada do mercado. Segurança, tradição e sobriedade em cada detalhe.
                    </p>
                </div>

                <div className="relative z-10 text-[10px] text-muted-foreground/40 uppercase tracking-wider font-semibold">
                    Versão 2.4.0 • © 2026 e.mason
                </div>
            </div>


            {/* Form Side */}
            <div className="flex-grow flex items-center justify-center p-8 bg-background">
                <div className="w-full max-w-md">
                    <Link to="/" className="md:hidden flex items-center gap-2 text-muted-foreground text-xs mb-10 hover:text-foreground transition-colors font-medium">
                        <ArrowLeft size={14} /> Voltar para o início
                    </Link>

                    <header className="mb-10 text-center md:text-left">
                        <h1 className="text-3xl font-semibold text-foreground mb-2 tracking-tight">
                            {view === 'login' ? 'Login Administrativo' :
                                view === 'forgot' ? 'Recuperar Acesso' : 'Nova Credencial'}
                        </h1>
                        <p className="text-muted-foreground text-sm font-normal">
                            {view === 'login' ? 'Insira suas credenciais para acessar o painel.' :
                                view === 'forgot' ? 'Enviaremos um protocolo de restauração para o seu e-mail.' :
                                    'Defina sua nova credencial de acesso soberano.'}
                        </p>
                    </header>


                    {error && (
                        <div className="mb-6 p-4 bg-destructive/5 border border-destructive/20 text-destructive text-xs font-medium rounded-xl flex gap-3 items-center animate-shake">
                            <div className="w-1.5 h-1.5 bg-destructive rounded-full" />
                            {error}
                        </div>
                    )}

                    {view === 'login' && (
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-semibold text-foreground/80 pl-0.5">Identificação / Email</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-accent transition" size={16} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full bg-card border border-border rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition font-normal text-sm text-foreground"
                                        placeholder="seu@email.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex justify-between items-center pr-0.5">
                                    <label className="text-[11px] font-semibold text-foreground/80 pl-0.5">Credencial de Acesso</label>
                                    <button
                                        type="button"
                                        onClick={() => setSearchParams({ view: 'forgot' })}
                                        className="text-[11px] font-medium text-accent hover:underline transition-all"
                                    >
                                        Esqueceu a senha?
                                    </button>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-accent transition" size={16} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full bg-card border border-border rounded-xl py-3 pl-11 pr-11 outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition font-normal text-sm text-foreground"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground transition focus:outline-none"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-accent hover:bg-accent/95 text-white font-medium py-3 rounded-full transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm active:scale-95 cursor-pointer"
                            >
                                {loading ? <Loader2 className="animate-spin" size={16} /> : <><LogIn size={16} /> Acessar Painel</>}
                            </button>
                        </form>
                    )}

                    {view === 'forgot' && !forgotSent && (
                        <form onSubmit={handleForgot} className="space-y-6">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-semibold text-foreground/80 pl-0.5">E-mail para Recuperação</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-accent transition" size={16} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full bg-card border border-border rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition font-normal text-sm text-foreground"
                                        placeholder="seu@email.com"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-accent hover:bg-accent/95 text-white font-medium py-3 rounded-full transition-all shadow-sm disabled:opacity-50 flex items-center justify-center gap-2 text-sm cursor-pointer"
                                >
                                    {loading ? <Loader2 className="animate-spin" size={16} /> : 'Enviar Email'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSearchParams({ view: 'login' })}
                                    className="w-full text-muted-foreground hover:text-foreground font-medium text-xs transition-colors py-2"
                                >
                                    Voltar ao Login
                                </button>
                            </div>
                        </form>
                    )}

                    {view === 'forgot' && forgotSent && (
                        <div className="text-center py-6">
                            <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6 border border-accent/20">
                                <CheckCircle2 size={32} />
                            </div>
                            <h2 className="text-2xl font-bold text-foreground mb-2 tracking-tight">Verifique seu E-mail</h2>
                            <p className="text-muted-foreground text-sm mb-8 font-normal">Protocolo enviado para <strong>{email}</strong>.</p>
                            
                            {devLink && (
                                <div className="mb-6 p-4 bg-accent/5 border border-accent/20 rounded-xl text-left text-xs font-normal text-accent leading-relaxed">
                                    <p className="font-semibold mb-2">Simulação de e-mail (Ambiente de Testes):</p>
                                    <Link
                                        to={devLink}
                                        className="text-foreground underline hover:text-accent font-medium break-all block"
                                    >
                                        Clique aqui para redefinir a senha
                                    </Link>
                                </div>
                            )}

                            <button
                                onClick={() => {
                                    setForgotSent(false);
                                    setDevLink(null);
                                    setSearchParams({ view: 'login' });
                                }}
                                className="w-full bg-accent hover:bg-accent/95 text-white font-medium py-3 rounded-full transition text-sm cursor-pointer"
                            >
                                Voltar ao Login
                            </button>
                        </div>
                    )}
                    {view === 'reset' && !resetSuccess && (
                        <form onSubmit={handleReset} className="space-y-6">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-semibold text-foreground/80 pl-0.5">Nova Senha</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-accent transition" size={16} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full bg-card border border-border rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition font-normal text-sm text-foreground"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-semibold text-foreground/80 pl-0.5">Confirmar Senha</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-accent transition" size={16} />
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        className="w-full bg-card border border-border rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition font-normal text-sm text-foreground"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-accent hover:bg-accent/95 text-white font-medium py-3 rounded-full transition-all shadow-sm disabled:opacity-50 flex items-center justify-center gap-2 text-sm cursor-pointer"
                            >
                                {loading ? <Loader2 className="animate-spin" size={16} /> : 'Atualizar Credencial'}
                            </button>
                        </form>
                    )}

                    {view === 'reset' && resetSuccess && (
                        <div className="text-center py-6">
                            <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6 border border-accent/20">
                                <CheckCircle2 size={32} />
                            </div>
                            <h2 className="text-2xl font-bold text-foreground mb-2 tracking-tight">Senha Atualizada</h2>
                            <p className="text-muted-foreground text-sm mb-6 font-normal">Sua nova senha foi salva. Redirecionando...</p>
                        </div>
                    )}

                    {view === 'login' && (
                        <div className="mt-12 text-center border-t border-border/40 pt-6">
                            <p className="text-muted-foreground text-xs font-normal">
                                Ainda não tem acesso?
                            </p>
                            <button
                                onClick={() => setSignupModalOpen(true)}
                                className="mt-2 text-accent hover:underline font-medium text-xs transition-colors cursor-pointer"
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
