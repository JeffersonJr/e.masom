
import { MessageSquare, Phone, Mail } from 'lucide-react';

export default function Suporte() {
    return (
        <div className="bg-slate-50 min-h-screen pt-20">
            <section className="py-24 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-mason-blue/10 border border-mason-blue/20 rounded-full text-xs font-bold text-mason-blue mb-8 tracking-widest uppercase">
                        Master Support
                    </div>
                    <h1 className="text-6xl font-bold text-mason-blue mb-6 tracking-tight italic">Atendimento Master</h1>
                    <p className="text-xl text-slate-500 mb-16 italic">
                        Suporte técnico especializado com atendimento humano prioritário para Grão-Mestres e Secretarias de Potências.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:border-mason-green transition group">
                            <MessageSquare className="text-mason-green mx-auto mb-6 group-hover:scale-110 transition-transform" size={40} />
                            <h3 className="font-bold text-mason-blue mb-2 italic">Chat Ao Vivo</h3>
                            <p className="text-sm text-slate-500 mb-6 italic">Tempo de resposta médio: <span className="text-mason-blue font-bold">~5 min</span></p>
                            <button className="px-6 py-2 bg-mason-blue text-white rounded-full text-sm font-bold hover:bg-mason-green hover:text-mason-blue transition">Iniciar Chat</button>
                        </div>
                        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:border-mason-green transition group">
                            <Mail className="text-mason-green mx-auto mb-6 group-hover:scale-110 transition-transform" size={40} />
                            <h3 className="font-bold text-mason-blue mb-2 italic">E-mail</h3>
                            <p className="text-sm text-slate-500 mb-6 italic">Tickets técnicos e solicitações SLA.</p>
                            <p className="text-mason-blue font-bold text-sm select-all">suporte@emason.com.br</p>
                        </div>
                        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:border-mason-green transition group">
                            <Phone className="text-mason-green mx-auto mb-6 group-hover:scale-110 transition-transform" size={40} />
                            <h3 className="font-bold text-mason-blue mb-2 italic">Telefone VIP</h3>
                            <p className="text-sm text-slate-500 mb-6 italic">Atendimento direto para titulares.</p>
                            <p className="text-mason-blue font-bold text-sm italic">0800-MASON-VIP</p>
                        </div>
                    </div>

                    <div className="bg-mason-blue p-12 rounded-[3rem] text-white text-left overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-mason-green/10 rounded-full blur-3xl -mr-32 -mt-32" />
                        <h4 className="text-xs font-black uppercase tracking-[0.4em] text-mason-green mb-8">Compromisso SLA</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <h3 className="text-3xl font-bold italic tracking-tight italic leading-tight">Garantimos estabilidade e <br /> resposta imediata. Ever.</h3>
                                <p className="text-slate-400 leading-relaxed italic">Nosso contrato de nível de serviço prevê disponibilidade máxima e resolução priorizada para incidentes críticos que afetem a governança da jurisdição.</p>
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                                    <p className="text-3xl font-black italic text-mason-green mb-1">2h</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Resposta Crítica</p>
                                </div>
                                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                                    <p className="text-3xl font-black italic text-mason-green mb-1">99.9%</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Uptime Garantido</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 bg-white border-t border-slate-200">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-mason-blue mb-12 text-center">Perguntas Frequentes (FAQ)</h2>
                    <div className="space-y-6">
                        {[
                            { q: "Como importar meus dados antigos?", a: "Nossa equipe Master realiza a migração guiada sem custo para Potências." },
                            { q: "Existe limite de usuários?", a: "Não, a plataforma é escalonável para qualquer número de Lojas ou Obreiros." },
                            { q: "O sistema funciona em celulares?", a: "Sim, e.mason é 100% responsivo e otimizado para dispositivos móveis." }
                        ].map((item, i) => (
                            <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                <h4 className="font-bold text-mason-blue mb-2">{item.q}</h4>
                                <p className="text-slate-500 text-sm italic">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
