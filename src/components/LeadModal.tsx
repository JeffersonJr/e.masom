
import React, { useState } from 'react';
import { X, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

interface LeadModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'demo' | 'trial';
}

export default function LeadModal({ isOpen, onClose, type }: LeadModalProps) {
    const [step, setStep] = useState<'form' | 'success'>('form');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setStep('success');
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-mason-blue/40 backdrop-blur-md transition-opacity" onClick={onClose} />

            <div className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-mason-blue transition">
                    <X size={24} />
                </button>

                {step === 'form' ? (
                    <div className="p-10 md:p-14">
                        <div className="mb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-mason-green/10 text-mason-green rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                                <Sparkles size={12} /> {type === 'demo' ? 'Solicite uma Demonstração' : 'Acesso Antecipado'}
                            </div>
                            <h2 className="text-3xl font-bold text-mason-blue">
                                {type === 'demo'
                                    ? 'Veja o e.mason em ação.'
                                    : 'Comece seu teste gratuito de 15 dias.'}
                            </h2>
                            <p className="text-slate-500 mt-4">
                                {type === 'demo'
                                    ? 'Nossos consultores entrarão em contato para agendar uma tour personalizada.'
                                    : 'Descubra como podemos transformar a governança da sua jurisdição hoje.'}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Nome Completo</label>
                                <input required type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-mason-blue outline-none focus:ring-4 focus:ring-mason-green/10 focus:border-mason-green transition" placeholder="Ex: José Duarte" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">E-mail Corporativo</label>
                                <input required type="email" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-mason-blue outline-none focus:ring-4 focus:ring-mason-green/10 focus:border-mason-green transition" placeholder="jose.duarte@potencia.org.br" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Potência / Loja</label>
                                <input required type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-mason-blue outline-none focus:ring-4 focus:ring-mason-green/10 focus:border-mason-green transition" placeholder="Ex: Grande Loja Equinócio" />
                            </div>

                            <button
                                disabled={loading}
                                type="submit"
                                className="w-full bg-mason-blue text-white font-bold rounded-2xl py-5 mt-6 hover:bg-mason-blue-light transition-all shadow-xl shadow-mason-blue/20 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    type === 'demo' ? 'Enviar Solicitação' : 'Ativar 15 Dias Grátis'
                                )}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="p-10 md:p-14 text-center">
                        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
                            <CheckCircle2 size={40} />
                        </div>
                        <h2 className="text-3xl font-bold text-mason-blue mb-4">Solicitação Enviada!</h2>
                        <p className="text-slate-500 mb-10 leading-relaxed">
                            {type === 'demo'
                                ? 'Um de nossos especialistas entrará em contato em breve no seu e-mail para agendar a demonstração.'
                                : 'Suas credenciais de acesso temporário foram enviadas para o seu e-mail. Aproveite sua jornada digital!'}
                        </p>
                        <button
                            onClick={onClose}
                            className="w-full bg-slate-100 text-slate-600 font-bold rounded-2xl py-4 hover:bg-slate-200 transition"
                        >
                            Fechar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
