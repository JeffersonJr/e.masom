import { useState } from 'react';
import { X, CheckCircle2, Loader2, Sparkles, User, Mail, Shield, Lock } from 'lucide-react';
import { authService } from '../lib/auth-service';
import { translateAuthError } from '../lib/auth-translate';

interface LeadModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'demo' | 'trial';
}

export default function LeadModal({ isOpen, onClose, type }: LeadModalProps) {
    const [step, setStep] = useState<'form' | 'success'>('form');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        potency: ''
    });


    if (!isOpen) return null;

    const isCorporateEmail = (email: string) => {
        const emailTrimmed = email.trim().toLowerCase();
        const commonProviders = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'icloud.com'];
        const domain = emailTrimmed.split('@')[1];

        console.log('Validating domain:', domain, 'Full email:', emailTrimmed);

        if (!domain) return false;
        return !commonProviders.includes(domain);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Soft corporate email check (warning instead of blocking if possible, or just broader)
        if (type === 'trial' && !isCorporateEmail(formData.email)) {
            // we allow it but log a warning or just proceed. 
            // The prompt asked for "functional", so let's allow common providers but maybe warn.
            // For now, let's keep it but make it clear.
        }

        if (type === 'trial' && formData.password.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres para sua segurança.');
            return;
        }

        setLoading(true);

        try {
            if (type === 'trial') {
                await authService.signupTrial({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password as any,
                    potencyName: formData.potency
                });

                // For trial, we want to "fall into the system" as requested
                setStep('success');
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 2000);
            } else {
                // For demo, just simulate
                await new Promise(resolve => setTimeout(resolve, 1500));
                setStep('success');
            }
        } catch (err: any) {
            setError(translateAuthError(err.message || 'Ocorreu um erro ao processar sua solicitação.'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-primary/40 backdrop-blur-md transition-opacity" onClick={onClose} />

            <div className="relative w-full max-w-xl bg-background rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 border border-border mt-10 md:mt-20">
                <button onClick={onClose} className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-primary transition z-20">
                    <X size={24} />
                </button>

                {step === 'form' ? (
                    <div className="p-10 md:p-14 max-h-[90vh] overflow-y-auto">
                        <div className="mb-10">
                            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-[10px] font-black text-accent mb-6 tracking-[0.3em] uppercase">
                                <Sparkles size={12} /> {type === 'demo' ? 'Demonstração Premium' : 'Teste de 15 Dias'}
                            </div>
                            <h2 className="text-4xl font-black text-primary tracking-tighter italic font-serif leading-none">
                                {type === 'demo'
                                    ? 'Descubra a Governança.'
                                    : 'Acesso Soberano.'}
                            </h2>
                            <p className="text-muted-foreground mt-4 font-medium italic">
                                {type === 'demo'
                                    ? 'Nossos consultores realizarão uma tour personalizada pela infraestrutura e.mason.'
                                    : 'Instancie sua Potência agora e experimente a transformação digital.'}
                            </p>
                        </div>

                        {error && (
                            <div className="mb-8 p-5 bg-destructive/5 border border-destructive/20 text-destructive text-[11px] font-black uppercase tracking-widest rounded-md flex gap-4 items-center animate-shake">
                                <div className="w-1.5 h-1.5 bg-destructive rounded-full" />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] pl-1">Nome Completo</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 group-focus-within:text-accent transition" size={18} />
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-background border border-border rounded-md px-12 py-4 text-primary outline-none focus:border-accent transition font-medium"
                                        placeholder="Irmão / Administrador"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] pl-1">E-mail Corporativo</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 group-focus-within:text-accent transition" size={18} />
                                        <input
                                            required
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-background border border-border rounded-md px-12 py-4 text-primary outline-none focus:border-accent transition font-medium"
                                            placeholder="nome@federacao.org.br"
                                        />
                                    </div>
                                </div>
                            </div>

                            {type === 'trial' && (
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] pl-1">Defina sua Senha de Acesso</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 group-focus-within:text-accent transition" size={18} />
                                        <input
                                            required
                                            type="password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="w-full bg-background border border-border rounded-md px-12 py-4 text-primary outline-none focus:border-accent transition font-medium"
                                            placeholder="Crie uma senha forte"
                                        />
                                    </div>
                                    <p className="text-[9px] text-muted-foreground/60 uppercase tracking-widest pl-1 font-bold italic">Esta será sua credencial de acesso soberano ao e.mason.</p>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] pl-1">Potência / Loja</label>
                                <div className="relative group">
                                    <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 group-focus-within:text-accent transition" size={18} />
                                    <input
                                        required
                                        type="text"
                                        value={formData.potency}
                                        onChange={(e) => setFormData({ ...formData, potency: e.target.value })}
                                        className="w-full bg-background border border-border rounded-md px-12 py-4 text-primary outline-none focus:border-accent transition font-medium"
                                        placeholder="Ex: GOB / Glesp / Oficina Independente"
                                    />
                                </div>
                            </div>

                            <button
                                disabled={loading}
                                type="submit"
                                className="w-full bg-primary text-primary-foreground font-black rounded-md py-5 mt-4 hover:bg-primary/95 transition-all shadow-xl shadow-primary/10 flex items-center justify-center gap-3 disabled:opacity-50 uppercase text-[11px] tracking-[0.3em]"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    type === 'demo' ? 'Agendar com Especialista' : 'Iniciar Teste Sóbrio'
                                )}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="p-16 text-center">
                        <div className="w-24 h-24 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-10 border border-accent/20">
                            <CheckCircle2 size={48} />
                        </div>
                        <h2 className="text-4xl font-black text-primary mb-6 tracking-tighter italic font-serif italic">Protocolo Iniciado!</h2>
                        <p className="text-muted-foreground mb-12 leading-relaxed font-medium italic">
                            {type === 'demo'
                                ? 'Um de nossos consultores entrará em contato em breve para realizar a tour institucional.'
                                : `Instância para ${formData.potency} em fase de provisionamento. Verifique ${formData.email} para confirmar seu acesso.`}
                        </p>
                        <button
                            onClick={onClose}
                            className="w-full bg-muted text-primary font-black rounded-md py-5 hover:bg-muted/80 transition uppercase text-[10px] tracking-[0.3em]"
                        >
                            Retornar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
