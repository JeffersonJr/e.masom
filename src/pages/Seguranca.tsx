
import { ShieldAlert, Key, Lock, EyeOff } from 'lucide-react';

export default function Seguranca() {
    return (
        <div className="bg-white">
            <section className="pt-20 pb-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-mason-blue leading-tight mb-8">
                        Segurança <span className="text-mason-green">Nível Bancário.</span>
                    </h1>
                    <p className="max-w-2xl text-xl text-slate-500 mb-12 leading-relaxed">
                        Protegemos o sigilo da ordem com as tecnologias mais avançadas de criptografia e controle de acesso.
                    </p>
                </div>
            </section>

            <section className="py-24 bg-mason-blue text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-mason-green mb-4">Infraestrutura de Elite</h2>
                        <h3 className="text-4xl font-bold mb-6 italic italic tracking-tight italic">Sua jurisdição protegida por camadas.</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                        <div className="space-y-12">
                            <div className="flex gap-6 items-start">
                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex-shrink-0 flex items-center justify-center border border-white/10">
                                    <Lock className="text-mason-green" size={28} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-4 italic italic uppercase tracking-tighter">Row Level Security (RLS)</h3>
                                    <p className="text-slate-400 leading-relaxed text-lg">Cada registro no banco de dados é protegido individualmente. Um usuário só consegue "ver" o que seu cargo e grau permitem. O sigilo é nativo ao código.</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start">
                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex-shrink-0 flex items-center justify-center border border-white/10">
                                    <Key className="text-mason-green" size={28} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-4 italic italic uppercase tracking-tighter">Criptografia em Repouso</h3>
                                    <p className="text-slate-400 leading-relaxed text-lg">Todos os dados e arquivos são criptografados através do padrão AES-256 antes de serem gravados nos nossos servidores distribuídos.</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start">
                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex-shrink-0 flex items-center justify-center border border-white/10">
                                    <ShieldAlert className="text-mason-green" size={28} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-4 italic italic uppercase tracking-tighter">Auditoria & Compliance</h3>
                                    <p className="text-slate-400 leading-relaxed text-lg">Histórico inalterável de todas as ações sensíveis. Monitoramento 24/7 contra tentativas de intrusão e varreduras de vulnerabilidades constantes.</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-0 bg-mason-green/10 rounded-[4rem] group-hover:scale-105 transition-transform" />
                            <div className="relative aspect-square bg-white/5 rounded-[4rem] border border-white/10 flex items-center justify-center p-12 backdrop-blur-sm">
                                <div className="text-center">
                                    <EyeOff size={100} className="text-mason-green mx-auto mb-10 opacity-40 group-hover:opacity-100 transition-opacity" />
                                    <p className="text-5xl font-black italic tracking-tighter opacity-10 text-white">PRIVACIDADE</p>
                                    <div className="mt-8 space-y-2">
                                        <div className="h-1 w-full bg-mason-green/20 rounded-full" />
                                        <div className="h-1 w-3/4 bg-mason-green/20 rounded-full mx-auto" />
                                        <div className="h-1 w-1/2 bg-mason-green/20 rounded-full mx-auto" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-32 bg-slate-50 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div className="p-8">
                        <p className="text-4xl font-black text-mason-blue mb-4 italic italic tracking-tighter">Backups</p>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Diários & Redundantes</p>
                    </div>
                    <div className="p-8">
                        <p className="text-4xl font-black text-mason-blue mb-4 italic italic tracking-tighter">Uptime</p>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">99.9% de Disponibilidade</p>
                    </div>
                    <div className="p-8">
                        <p className="text-4xl font-black text-mason-blue mb-4 italic italic tracking-tighter">Pentesting</p>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Testes de Invasão Trimestrais</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
