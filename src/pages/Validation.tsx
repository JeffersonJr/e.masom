import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, XCircle, ArrowLeft, RefreshCw, Award, Landmark } from 'lucide-react';

interface MockMember {
    cim: string;
    nome: string;
    email: string;
    grau: string;
    cargo: string;
    loja: string;
    potencia: string;
    status: 'Regular' | 'Pendente' | 'Irregular';
    dataIniciacao: string;
}

export default function Validation() {
    const { cim } = useParams<{ cim: string }>();
    const [loading, setLoading] = useState(true);
    const [member, setMember] = useState<MockMember | null>(null);

    useEffect(() => {
        // Simulate a database check
        const timer = setTimeout(() => {
            const cleanCim = cim || '000000';
            
            // If checking a specific admin CIM or fallback
            if (cleanCim === '12345' || cleanCim.toLowerCase() === 'jefferson') {
                setMember({
                    cim: '12345',
                    nome: 'Jefferson Campos',
                    email: 'contato@evolves.site',
                    grau: 'Mestre (Grau 3)',
                    cargo: 'Grão-Mestre',
                    loja: 'Aurora da Virtude nº 001',
                    potencia: 'Grande Oriente Evolves',
                    status: 'Regular',
                    dataIniciacao: '12/03/2018'
                });
            } else {
                // Generate dynamic consistent mock data based on CIM
                const index = parseInt(cleanCim) || 42;
                const names = ['Pedro Alencar', 'Mário Silva', 'Adriano Fontes', 'Humberto Nobre', 'Carlos Drummond'];
                const statusOptions: ('Regular' | 'Pendente' | 'Irregular')[] = ['Regular', 'Regular', 'Irregular'];
                
                setMember({
                    cim: cleanCim,
                    nome: names[index % names.length],
                    email: `obreiro.${cleanCim}@emason.org.br`,
                    grau: index % 3 === 0 ? 'Mestre' : index % 3 === 1 ? 'Companheiro' : 'Aprendiz',
                    cargo: index % 5 === 0 ? 'Venerável Mestre' : 'Obreiro',
                    loja: `Fraternidade Cósmica nº 0${(index % 90) + 10}`,
                    potencia: 'Grande Oriente Evolves',
                    status: statusOptions[index % statusOptions.length],
                    dataIniciacao: '24/06/2021'
                });
            }
            setLoading(false);
        }, 1200);

        return () => clearTimeout(timer);
    }, [cim]);

    return (
        <div className="min-h-screen bg-[#070b13] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -ml-20 -mt-20 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-20 -mb-20 pointer-events-none" />

            <div className="w-full max-w-lg bg-[#0e1626] border border-border/40 rounded-2xl shadow-2xl relative z-10 overflow-hidden">
                {/* Premium Gold Header border */}
                <div className="h-1.5 w-full bg-gradient-to-r from-primary via-accent to-primary" />

                <div className="p-8 md:p-12">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <img src="/e.mason.svg" alt="e.mason" className="h-6 w-auto mx-auto grayscale brightness-200 mb-6" />
                        <h1 className="text-xl font-bold uppercase tracking-[0.25em] text-accent font-serif italic">
                            Sistema de Validação
                        </h1>
                        <p className="text-muted-foreground/60 text-xs mt-1 uppercase tracking-widest font-black">
                            Soberana Ordem e Governança
                        </p>
                    </div>

                    {loading ? (
                        <div className="py-12 flex flex-col items-center justify-center gap-6">
                            <RefreshCw className="animate-spin text-accent" size={48} />
                            <p className="text-muted-foreground uppercase tracking-[0.2em] text-[10px] font-black">
                                Consultando Registro Geral...
                            </p>
                        </div>
                    ) : member ? (
                        <div className="space-y-8 animate-in fade-in zoom-in duration-300">
                            {/* Status Banner */}
                            <div className="text-center">
                                {member.status === 'Regular' ? (
                                    <div className="inline-flex flex-col items-center gap-3">
                                        <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/5 animate-pulse">
                                            <ShieldCheck size={44} />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black text-emerald-400 uppercase tracking-wide">
                                                Regular / Ativo
                                            </h2>
                                            <p className="text-muted-foreground/60 text-[10px] uppercase font-black tracking-widest mt-1">
                                                Acesso Soberano Autorizado
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="inline-flex flex-col items-center gap-3">
                                        <div className="w-20 h-20 bg-destructive/10 text-destructive border border-destructive/20 rounded-full flex items-center justify-center shadow-lg shadow-destructive/5">
                                            <XCircle size={44} />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black text-destructive uppercase tracking-wide">
                                                Não Regular
                                            </h2>
                                            <p className="text-muted-foreground/60 text-[10px] uppercase font-black tracking-widest mt-1">
                                                Acesso Restrito à Oficina
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Divider */}
                            <div className="border-t border-border/20" />

                            {/* Member Details */}
                            <div className="space-y-5 bg-background/30 rounded-xl p-6 border border-border/10">
                                <DetailRow label="Nome Completo" value={member.nome} highlighted />
                                <DetailRow label="CIM" value={member.cim} />
                                <DetailRow label="Grau" value={member.grau} icon={Award} />
                                <DetailRow label="Cargo / Ofício" value={member.cargo} />
                                <DetailRow label="Oficina / Loja" value={member.loja} icon={Landmark} />
                                <DetailRow label="Potência Federada" value={member.potencia} />
                                <DetailRow label="Data de Iniciação" value={member.dataIniciacao} />
                            </div>

                            {/* Footer actions */}
                            <div className="text-center pt-4">
                                <Link
                                    to="/login"
                                    className="inline-flex items-center gap-2 text-xs font-bold text-accent hover:text-primary transition uppercase tracking-widest"
                                >
                                    <ArrowLeft size={14} /> Voltar ao Painel Administrativo
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="py-8 text-center space-y-6">
                            <XCircle className="text-destructive mx-auto" size={48} />
                            <h2 className="text-xl font-bold text-primary">Cadastro não encontrado</h2>
                            <p className="text-muted-foreground text-sm">O CIM fornecido não consta na base central.</p>
                            <Link to="/login" className="inline-flex items-center gap-2 text-xs font-bold text-accent hover:text-primary transition uppercase tracking-widest">
                                <ArrowLeft size={14} /> Voltar
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

interface DetailRowProps {
    label: string;
    value: string;
    highlighted?: boolean;
    icon?: React.ComponentType<{ size: number; className?: string }>;
}

function DetailRow({ label, value, highlighted, icon: Icon }: DetailRowProps) {
    return (
        <div className="flex justify-between items-start gap-4">
            <div>
                <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">{label}</p>
                <div className="flex items-center gap-2 mt-1">
                    {Icon && <Icon size={14} className="text-accent shrink-0" />}
                    <p className={`text-sm ${highlighted ? 'font-black text-primary text-base' : 'font-semibold text-primary/80'}`}>
                        {value}
                    </p>
                </div>
            </div>
        </div>
    );
}
