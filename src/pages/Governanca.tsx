
import { ShieldCheck, LayoutDashboard, Database } from 'lucide-react';

export default function Governanca() {
    return (
        <div className="bg-white">
            <section className="pt-20 pb-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-mason-blue/10 border border-mason-blue/20 rounded-full text-xs font-bold text-mason-blue mb-8 tracking-widest uppercase">
                        Plataforma
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-mason-blue leading-tight mb-8 max-w-4xl">
                        Governança Digital para a <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-mason-blue to-mason-green">
                            Tradição Maçônica.
                        </span>
                    </h1>
                    <p className="max-w-2xl text-xl text-slate-500 mb-12 leading-relaxed">
                        Uma solução completa para Grandes Secretarias e Grão-Mestrados gerenciarem suas jurisdições com eficiência, transparência e segurança.
                    </p>
                </div>
            </section>

            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl font-bold text-mason-blue mb-4">Governança 360°</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">Um sistema pensado para as complexidades da administração maçônica moderna.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                            <div className="w-12 h-12 bg-mason-blue rounded-xl flex items-center justify-center text-white">
                                <LayoutDashboard size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-mason-blue leading-tight italic">Macrovisão Jurisdicional</h3>
                            <p className="text-slate-500 leading-relaxed italic">
                                Visualize o status de todas as lojas, membros e processos em um único painel inteligente. Acompanhe o crescimento anual e a regularidade de toda a Potência.
                            </p>
                            <ul className="space-y-3 text-sm text-slate-400 border-t border-slate-50 pt-6">
                                <li className="flex items-center gap-2 italic">✓ Gráficos de Evolução</li>
                                <li className="flex items-center gap-2 italic">✓ Alertas de Irregularidade</li>
                                <li className="flex items-center gap-2 italic">✓ Heatmap de Lojas</li>
                            </ul>
                        </div>
                        <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                            <div className="w-12 h-12 bg-mason-green rounded-xl flex items-center justify-center text-white">
                                <Database size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-mason-blue leading-tight italic">Base de Dados Unificada</h3>
                            <p className="text-slate-500 leading-relaxed italic">
                                Elimine a fragmentação de dados com um repositório centralizado e seguro para toda a Potência. Informação rápida para decisões estratégicas do Grão-Mestrado.
                            </p>
                            <ul className="space-y-3 text-sm text-slate-400 border-t border-slate-50 pt-6">
                                <li className="flex items-center gap-2 italic">✓ Histórico de Gestões</li>
                                <li className="flex items-center gap-2 italic">✓ Registro de Atas Históricas</li>
                                <li className="flex items-center gap-2 italic">✓ Backup Automatizado</li>
                            </ul>
                        </div>
                        <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                            <div className="w-12 h-12 bg-mason-blue rounded-xl flex items-center justify-center text-white">
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-mason-blue leading-tight italic">Conformidade e Sigilo</h3>
                            <p className="text-slate-500 leading-relaxed italic">
                                Controles de acesso rigorosos que respeitam a hierarquia e os graus maçônicos. Documentos sensíveis só podem ser visualizados por quem possui autoridade.
                            </p>
                            <ul className="space-y-3 text-sm text-slate-400 border-t border-slate-50 pt-6">
                                <li className="flex items-center gap-2 italic">✓ Acesso Baseado em Graus</li>
                                <li className="flex items-center gap-2 italic">✓ Logs de Acessos Sensíveis</li>
                                <li className="flex items-center gap-2 italic">✓ Assinatura Digital</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
