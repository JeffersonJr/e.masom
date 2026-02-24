
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock, Loader2, ArrowLeft, Eye, EyeOff } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-white overflow-hidden">
            {/* Visual Side */}
            <div className="hidden md:flex flex-col justify-between w-1/2 bg-mason-blue p-16 text-white relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#D4AF3720_0%,transparent_60%)]" />

                <Link to="/" className="relative z-10 block">
                    <img src="/e.mason.svg" alt="e.mason" className="h-10 w-auto brightness-0 invert" />
                </Link>

                <div className="relative z-10 max-w-md">
                    <h2 className="text-5xl font-bold mb-6 leading-tight">
                        Gestão com <br />
                        <span className="text-mason-green">Propósito.</span>
                    </h2>
                    <p className="text-white/60 text-lg leading-relaxed">
                        Acesse a plataforma de governança maçônica mais avançada do mercado. Segurança, tradição e eficiência em um só lugar.
                    </p>
                </div>

                <div className="relative z-10 text-xs text-white/40 uppercase tracking-widest">
                    Versão 2.4.0 • © 2026 e.mason
                </div>
            </div>

            {/* Form Side */}
            <div className="flex-grow flex items-center justify-center p-8 bg-slate-50 md:bg-white">
                <div className="w-full max-w-md">
                    <Link to="/" className="md:hidden flex items-center gap-2 text-slate-400 text-sm mb-12 hover:text-mason-blue transition">
                        <ArrowLeft size={16} /> Voltar para o início
                    </Link>

                    <header className="mb-10 text-center md:text-left">
                        <h1 className="text-3xl font-bold text-mason-blue mb-2 tracking-tight">Login Administrativo</h1>
                        <p className="text-slate-500">Insira suas credenciais para acessar o painel.</p>
                    </header>

                    {error && (
                        <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 text-sm rounded-2xl flex gap-3 items-center animate-shake">
                            <div className="w-2 h-2 bg-rose-500 rounded-full" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-mason-blue uppercase tracking-widest pl-1">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-mason-green transition" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-mason-green/20 focus:border-mason-green transition"
                                    placeholder="seu@email.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between items-center pr-1">
                                <label className="text-[10px] font-black text-mason-blue uppercase tracking-widest pl-1">Senha</label>
                                <Link to="/forgot-password" className="text-[10px] font-bold text-mason-green hover:underline uppercase tracking-widest">Esqueci a senha</Link>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-mason-green transition" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-12 outline-none focus:ring-2 focus:ring-mason-green/20 focus:border-mason-green transition"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-mason-blue transition focus:outline-none"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-mason-blue text-white font-bold py-4 rounded-2xl hover:bg-mason-blue-light transition shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : <><LogIn size={20} /> Entrar no Sistema</>}
                        </button>
                    </form>

                    <p className="mt-12 text-center text-slate-400 text-xs">
                        Ainda não tem acesso? <Link to="/contato" className="text-mason-blue font-bold hover:underline">Solicite aqui.</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
