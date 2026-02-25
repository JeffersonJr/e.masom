
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { translateAuthError } from '../lib/auth-translate';

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
            setError(translateAuthError(error.message));
            setLoading(false);
        } else {
            setSent(true);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-6">
            <div className="w-full max-w-lg bg-background rounded-xl border border-border shadow-2xl p-10 md:p-16 border-t-4 border-t-accent">
                <Link to="/login" className="flex items-center gap-3 text-muted-foreground text-[10px] mb-16 hover:text-primary transition font-black uppercase tracking-[0.3em]">
                    <ArrowLeft size={16} /> Voltar ao Portal
                </Link>

                {!sent ? (
                    <>
                        <header className="mb-12">
                            <h1 className="text-4xl font-black text-primary mb-4 tracking-tighter italic font-serif italic">Recuperar Soberania</h1>
                            <p className="text-muted-foreground font-medium italic">Enviaremos um link de restauração para sua conta.</p>
                        </header>

                        {error && (
                            <div className="mb-8 p-6 bg-accent/5 border border-accent/20 text-accent text-xs font-black uppercase tracking-widest rounded-md flex gap-4 items-center">
                                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleReset} className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] ml-1">E-mail Cadastrado</label>
                                <div className="relative group">
                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-accent transition" size={18} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full bg-muted/20 border border-border rounded-md py-4 pl-14 pr-6 outline-none focus:border-accent transition font-medium text-sm"
                                        placeholder="seu@identidade.com"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary text-primary-foreground font-black py-5 rounded-md hover:bg-primary/95 transition shadow-xl shadow-primary/10 disabled:opacity-50 flex items-center justify-center gap-3 uppercase text-[11px] tracking-[0.3em]"
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Enviar Protocolo'}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-10">
                        <div className="w-24 h-24 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner border border-accent/20">
                            <CheckCircle2 size={48} />
                        </div>
                        <h2 className="text-4xl font-black text-primary mb-6 italic font-serif">Verifique seu E-mail</h2>
                        <p className="text-muted-foreground mb-12 leading-relaxed font-medium italic">
                            Protocolo enviado para <strong>{email}</strong>.
                        </p>
                        <Link
                            to="/login"
                            className="block w-full bg-muted text-primary font-black rounded-md py-5 hover:bg-muted/80 transition uppercase text-[10px] tracking-[0.3em]"
                        >
                            Retornar ao Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
