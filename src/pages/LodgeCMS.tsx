
import { useState } from 'react';
import { Globe, Layout, Type, Palette, Save, ExternalLink } from 'lucide-react';

export default function LodgeCMS() {
    const [siteName, setSiteName] = useState('Loja Maçônica Exemplo');
    const [description, setDescription] = useState('Uma oficina dedicada ao estudo e aperfeiçoamento moral.');

    return (
        <div className="p-10 space-y-12 bg-background min-h-screen">
            <header className="flex justify-between items-end border-b border-border pb-10">
                <div>
                    <h1 className="text-5xl font-black text-primary tracking-tighter leading-none mb-4 italic font-serif">Editor da Oficina</h1>
                    <p className="text-muted-foreground font-medium flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent rounded-full" />
                        Configure sua presença digital em tempo real
                    </p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-6 py-4 bg-background border border-border text-muted-foreground font-black uppercase text-[10px] tracking-[0.2em] rounded-md hover:text-primary hover:border-primary transition shadow-sm">
                        <ExternalLink size={16} /> Ver Site
                    </button>
                    <button className="flex items-center gap-2 px-8 py-4 bg-accent text-primary font-black uppercase text-[10px] tracking-[0.2em] rounded-md hover:bg-accent/90 transition shadow-xl shadow-accent/10 active:scale-95">
                        <Save size={18} /> Publicar Alterações
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-background p-8 rounded-xl border border-border shadow-sm space-y-8">
                        <div>
                            <label className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-6">
                                <Type size={14} className="text-accent" /> Conteúdo Principal
                            </label>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="block text-[9px] text-muted-foreground font-black uppercase tracking-widest ml-1">Nome da Oficina</label>
                                    <input
                                        value={siteName}
                                        onChange={(e) => setSiteName(e.target.value)}
                                        className="w-full bg-muted/20 border border-border rounded-md px-4 py-3 text-sm font-medium outline-none focus:border-accent transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-[9px] text-muted-foreground font-black uppercase tracking-widest ml-1">Descrição</label>
                                    <textarea
                                        rows={4}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full bg-muted/20 border border-border rounded-md px-4 py-3 text-sm font-medium outline-none focus:border-accent transition-all resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-border">
                            <label className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-6">
                                <Palette size={14} className="text-accent" /> Estética Fundamental
                            </label>
                            <div className="grid grid-cols-4 gap-3">
                                <div className="aspect-square bg-primary rounded-md border-2 border-primary cursor-pointer hover:scale-105 transition active:scale-95 shadow-lg" />
                                <div className="aspect-square bg-accent rounded-md border border-border cursor-pointer hover:scale-105 transition active:scale-95" />
                                <div className="aspect-square bg-zinc-400 rounded-md border border-border cursor-pointer hover:scale-105 transition active:scale-95" />
                                <div className="aspect-square bg-white rounded-md border border-border cursor-pointer hover:scale-105 transition active:scale-95" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="bg-primary rounded-xl p-4 shadow-2xl relative">
                        <div className="flex gap-2 mb-4 px-2">
                            <div className="w-2.5 h-2.5 bg-accent/20 rounded-full" />
                            <div className="w-2.5 h-2.5 bg-accent/20 rounded-full" />
                            <div className="w-2.5 h-2.5 bg-accent/20 rounded-full" />
                        </div>
                        <div className="bg-background rounded-lg aspect-[16/10] overflow-hidden border border-white/5 shadow-inner relative group">
                            <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-500 z-30 backdrop-blur-[2px]">
                                <span className="bg-background text-primary px-6 py-3 rounded-md font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                    <Layout size={14} className="text-accent" /> Pré-visualização
                                </span>
                            </div>

                            {/* Mock Site Preview */}
                            <div className="p-16 text-center h-full flex flex-col justify-center bg-background">
                                <div className="w-16 h-16 bg-primary rounded-md mx-auto mb-8 flex items-center justify-center text-accent font-black text-2xl shadow-xl italic font-serif">
                                    {siteName.charAt(0)}
                                </div>
                                <h2 className="text-4xl font-black text-primary mb-6 tracking-tighter italic font-serif">{siteName}</h2>
                                <p className="text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed font-medium italic border-l-4 border-accent pl-6 text-left">
                                    {description}
                                </p>
                                <div className="mt-12 h-24 bg-muted/20 border border-border rounded-xl border-dashed flex items-center justify-center">
                                    <Globe className="text-muted-foreground/30" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-center text-[10px] text-muted-foreground mt-8 uppercase tracking-[0.3em] font-black">Otimizado para mobile e desktop v603010</p>
                </div>
            </div>
        </div>
    );
}
