
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/login`,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            setSent(true);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
            <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-10 md:p-14">
                <Link to="/login" className="flex items-center gap-2 text-slate-400 text-sm mb-12 hover:text-mason-blue transition font-bold uppercase tracking-widest">
                    <ArrowLeft size={16} /> Voltar para o Login
                </Link>

                {!sent ? (
                    <>
                        <header className="mb-10">
                            <h1 className="text-3xl font-bold text-mason-blue mb-2 tracking-tight">Recuperar Senha</h1>
                            <p className="text-slate-500">Enviaremos um link de recuperação para o seu e-mail.</p>
                        </header>

                        {error && (
                            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 text-sm rounded-2xl flex gap-3 items-center">
                                <div className="w-2 h-2 bg-rose-500 rounded-full" />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleReset} className="space-y-6">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-mason-blue uppercase tracking-widest pl-1">E-mail Cadastrado</label>
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

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-mason-blue text-white font-bold py-5 rounded-2xl hover:bg-mason-blue-light transition shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Enviar Link de Recuperação'}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-6">
                        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
                            <CheckCircle2 size={40} />
                        </div>
                        <h2 className="text-3xl font-bold text-mason-blue mb-4">Verifique seu E-mail</h2>
                        <p className="text-slate-500 mb-10 leading-relaxed">
                            Enviamos as instruções de recuperação para <strong>{email}</strong>. Por favor, verifique sua caixa de entrada e spam.
                        </p>
                        <Link
                            to="/login"
                            className="block w-full bg-slate-100 text-slate-600 font-bold rounded-2xl py-4 hover:bg-slate-200 transition"
                        >
                            Voltar para o Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
