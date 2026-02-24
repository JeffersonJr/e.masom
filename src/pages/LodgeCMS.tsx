
import { useState } from 'react';
import { Globe, Layout, Type, Palette, Save, ExternalLink } from 'lucide-react';

export default function LodgeCMS() {
    const [siteName, setSiteName] = useState('Loja Maçônica Exemplo');
    const [description, setDescription] = useState('Uma oficina dedicada ao estudo e aperfeiçoamento moral.');

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <header className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-mason-blue">Gerenciador de Site (CMS)</h1>
                    <p className="text-slate-500">Configure a presença digital da sua loja em tempo real.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition">
                        <ExternalLink size={18} /> Ver Site
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-mason-green text-mason-blue font-bold rounded-xl hover:bg-mason-green-light transition shadow-lg">
                        <Save size={18} /> Publicar Alterações
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                        <div>
                            <label className="flex items-center gap-2 text-xs font-black text-mason-blue uppercase tracking-widest mb-4">
                                <Type size={14} className="text-mason-green" /> Conteúdo Principal
                            </label>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Nome da Loja</label>
                                    <input
                                        value={siteName}
                                        onChange={(e) => setSiteName(e.target.value)}
                                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-mason-green"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Descrição Curta</label>
                                    <textarea
                                        rows={3}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-mason-green"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-50">
                            <label className="flex items-center gap-2 text-xs font-black text-mason-blue uppercase tracking-widest mb-4">
                                <Palette size={14} className="text-mason-green" /> Estética
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                                <div className="aspect-square bg-mason-blue rounded-lg border-2 border-slate-100 cursor-pointer hover:border-mason-green ring-2 ring-offset-2 ring-transparent transition" />
                                <div className="aspect-square bg-emerald-900 rounded-lg border-2 border-slate-100 cursor-pointer hover:border-mason-green transition" />
                                <div className="aspect-square bg-slate-900 rounded-lg border-2 border-slate-100 cursor-pointer hover:border-mason-green transition" />
                                <div className="aspect-square bg-white rounded-lg border-2 border-slate-100 cursor-pointer hover:border-mason-green transition" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="bg-slate-900 rounded-3xl p-4 shadow-2xl">
                        <div className="flex gap-1.5 mb-4 px-2">
                            <div className="w-2.5 h-2.5 bg-rose-500 rounded-full" />
                            <div className="w-2.5 h-2.5 bg-amber-500 rounded-full" />
                            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                        </div>
                        <div className="bg-white rounded-2xl aspect-[16/10] overflow-hidden border border-slate-800 relative group">
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 flex items-center justify-center transition opacity-0 group-hover:opacity-100">
                                <span className="bg-white px-4 py-2 rounded-full font-bold text-xs shadow-xl flex items-center gap-2">
                                    <Layout size={14} /> Pré-visualização Interativa
                                </span>
                            </div>

                            {/* Mock Site Preview */}
                            <div className="p-10 text-center">
                                <div className="w-12 h-12 bg-mason-blue rounded-xl mx-auto mb-6 flex items-center justify-center text-mason-green font-bold">
                                    L
                                </div>
                                <h2 className="text-3xl font-bold text-mason-blue mb-4">{siteName}</h2>
                                <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed italic border-l-2 border-mason-green pl-4">
                                    "{description}"
                                </p>
                                <div className="mt-10 h-32 bg-slate-50 rounded-2xl border border-dashed border-slate-200 flex items-center justify-center">
                                    <Globe className="text-slate-300" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-center text-[10px] text-slate-400 mt-6 uppercase tracking-[0.2em]">Otimizado para Mobile e Desktop</p>
                </div>
            </div>
        </div>
    );
}
