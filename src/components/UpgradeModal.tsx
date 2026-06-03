import { useState } from 'react';
import { X, Check, Sparkles, Shield, Star, Award, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
    const { profile, session, updateProfile } = useAuth();
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    if (!isOpen) return null;

    // Get current plan from profile config
    const currentPlan = profile?.potencias?.configuracoes_json?.plan || null;

    const plans = [
        {
            name: 'Aprendiz',
            price: '99',
            description: 'Perfeito para oficinas em estágio inicial ou pequenas lojas.',
            limit: 'Até 30 Obreiros por Loja',
            badge: 'Bronze',
            color: 'from-amber-700 to-amber-900',
            borderColor: 'border-amber-700/20',
            textColor: 'text-amber-500',
            icon: Shield,
            features: [
                'Gestão de até 30 Obreiros por Loja',
                'Carteirinha Digital Básica',
                'Controle de Presença Litúrgico',
                'Acesso a materiais do grau de Aprendiz',
                'Painel básico da Tesouraria e Secretaria',
                'Suporte por email'
            ]
        },
        {
            name: 'Companheiro',
            price: '189',
            description: 'Ideal para oficinas consolidadas com fluxo médio de obreiros.',
            limit: 'Até 60 Obreiros por Loja',
            badge: 'Prata (Recomendado)',
            color: 'from-slate-400 to-slate-600',
            borderColor: 'border-accent/40',
            textColor: 'text-accent',
            icon: Star,
            featured: true,
            features: [
                'Gestão de até 60 Obreiros por Loja',
                'Carteirinhas Digitais e Física (PDF)',
                'QR Code de Validação de Presença',
                'Gestão completa de ritos (Foco REAA)',
                'Acesso a materiais de Aprendiz e Companheiro',
                'Relatórios avançados e conciliação de quotas',
                'Suporte prioritário via WhatsApp'
            ]
        },
        {
            name: 'Mestre',
            price: '299',
            description: 'Para grandes Lojas ou Potências com múltiplos templos federados.',
            limit: 'Membros Ilimitados',
            badge: 'Ouro / Premium',
            color: 'from-yellow-500 to-amber-600',
            borderColor: 'border-yellow-500/30',
            textColor: 'text-yellow-500',
            icon: Award,
            features: [
                'Obreiros Ilimitados por Loja',
                'Personalização completa de carteirinhas',
                'Acesso total aos graus e rituais restritos',
                'Assinatura digital e workflows de sindicância',
                'Biblioteca centralizada e comunicação global',
                'Dashboard completo para Venerável e Oficiais',
                'Gerente de conta exclusivo'
            ]
        }
    ];

    const handleUpgrade = async (planName: string) => {
        if (!session?.token) {
            setError('Sessão expirada. Faça login novamente.');
            return;
        }

        setLoadingPlan(planName);
        setError(null);
        setSuccess(null);

        try {
            const res = await fetch('/api/potencia/upgrade', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.token}`
                },
                body: JSON.stringify({ planName })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Ocorreu um erro no upgrade de plano.');
            }

            // Update local state context
            if (profile) {
                const updatedProfile = {
                    ...profile,
                    potencias: profile.potencias ? {
                        ...profile.potencias,
                        configuracoes_json: {
                            ...profile.potencias.configuracoes_json,
                            plan: planName
                        }
                    } : null
                };
                updateProfile(updatedProfile);
            }

            setSuccess(`Parabéns! O plano da potência foi atualizado com sucesso para ${planName}.`);
            setTimeout(() => {
                onClose();
                setSuccess(null);
            }, 3000);
        } catch (err: any) {
            setError(err.message || 'Falha ao processar o upgrade.');
        } finally {
            setLoadingPlan(null);
        }
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop with blur */}
            <div className="fixed inset-0 bg-primary/45 backdrop-blur-md transition-opacity" onClick={onClose} />

            {/* Modal Body */}
            <div className="relative w-full max-w-6xl bg-background border border-border rounded-xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-300">
                
                {/* Header Gradient Border */}
                <div className="h-1 bg-gradient-to-r from-accent via-yellow-500 to-accent" />

                {/* Close Button */}
                <button 
                    onClick={onClose} 
                    className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-primary rounded-lg hover:bg-muted/10 transition z-10"
                >
                    <X size={20} />
                </button>

                <div className="p-8 md:p-12">
                    
                    {/* Header */}
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/15 border border-accent/30 rounded-full text-[10px] font-black text-accent uppercase tracking-widest mb-4">
                            <Sparkles size={12} className="animate-pulse" /> PLANOS & LICENÇAS
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif font-black italic tracking-tight text-primary leading-tight">
                            Eleve a Gestão da vossa Oficina
                        </h2>
                        <p className="text-muted-foreground text-sm mt-3 font-medium">
                            Selecione o plano ideal de acordo com a quantidade de obreiros por loja. Garanta conformidade, segurança e relatórios litúrgicos completos.
                        </p>
                    </div>

                    {/* Feedback Messages */}
                    {error && (
                        <div className="mb-6 p-4 bg-accent/10 border border-accent/20 rounded-lg text-accent text-xs font-bold text-center">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/25 rounded-lg text-emerald-400 text-xs font-bold text-center">
                            {success}
                        </div>
                    )}

                    {/* Plan Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan) => {
                            const isCurrent = currentPlan === plan.name;
                            const isLesserOrEqual = currentPlan === 'Mestre' || (currentPlan === 'Companheiro' && plan.name === 'Aprendiz');
                            const Icon = plan.icon;

                            return (
                                <div 
                                    key={plan.name}
                                    className={`relative flex flex-col rounded-xl border p-6 bg-[#0c1220]/50 backdrop-blur-sm transition-all duration-300 ${
                                        plan.featured 
                                            ? 'border-accent shadow-xl md:-translate-y-2' 
                                            : 'border-border shadow-md hover:border-accent/40'
                                    }`}
                                >
                                    {plan.featured && (
                                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-[#070b13] text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
                                            Recomendado
                                        </div>
                                    )}

                                    {/* Plan Title & Badge */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Plano</span>
                                            <h3 className="text-xl font-bold font-serif text-primary tracking-tight">{plan.name}</h3>
                                        </div>
                                        <div className={`p-2 rounded-lg bg-gradient-to-br ${plan.color} text-primary-foreground`}>
                                            <Icon size={18} />
                                        </div>
                                    </div>

                                    {/* Limits description badge */}
                                    <div className="mb-6 py-2 px-3 bg-muted/30 border border-border rounded-lg text-center">
                                        <p className="text-xs font-bold text-primary">{plan.limit}</p>
                                    </div>

                                    {/* Pricing */}
                                    <div className="mb-6">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-xl font-bold text-primary">R$</span>
                                            <span className="text-4xl font-black text-primary tracking-tighter">{plan.price}</span>
                                            <span className="text-xs font-medium text-muted-foreground">/ mês</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-2 leading-relaxed h-10">
                                            {plan.description}
                                        </p>
                                    </div>

                                    {/* Upgrade Action Button */}
                                    <div className="mb-6">
                                        {isCurrent ? (
                                            <div className="w-full py-3 bg-muted border border-border text-muted-foreground text-[10px] font-black text-center uppercase tracking-widest rounded-lg">
                                                Plano Vigente
                                            </div>
                                        ) : (
                                            <button
                                                disabled={loadingPlan !== null || !!success}
                                                onClick={() => handleUpgrade(plan.name)}
                                                className={`w-full py-3 text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                                                    plan.featured 
                                                        ? 'bg-accent text-[#070b13] hover:bg-[#f3e5ab] shadow-md shadow-accent/10' 
                                                        : 'bg-muted text-primary hover:bg-muted/80 border border-border hover:border-accent/40'
                                                } disabled:opacity-50`}
                                            >
                                                {loadingPlan === plan.name ? (
                                                    <>
                                                        <Loader2 size={12} className="animate-spin" /> Processando
                                                    </>
                                                ) : (
                                                    isLesserOrEqual ? 'Alternar Plano' : 'Ativar Plano'
                                                )}
                                            </button>
                                        )}
                                    </div>

                                    {/* Features List */}
                                    <div className="mt-auto space-y-3.5 border-t border-border/60 pt-6">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground block">Funcionalidades:</span>
                                        {plan.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                                                <Check size={14} className="text-accent mt-0.5 flex-shrink-0" />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            );
                        })}
                    </div>

                    {/* Security badge footer */}
                    <div className="mt-12 text-center border-t border-border pt-8">
                        <p className="text-[10px] text-muted-foreground font-semibold tracking-wider flex items-center justify-center gap-2">
                            <Shield size={12} className="text-accent" /> PAGAMENTOS SEGUROS E INTEGRADOS VIA ASSINATURA RECORRENTE MAÇÔNICA
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
