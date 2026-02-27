import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import NotFound from './NotFound';
import { Loader2, Heart, Eye, Users, BookOpen, Mail, MapPin, ChevronRight, Star, Shield, Globe } from 'lucide-react';

// ─── Nav ────────────────────────────────────────────────────────────────────
function LodgeNav({ lodge, activeSection, onNav }: {
    lodge: any;
    activeSection: string;
    onNav: (s: string) => void;
}) {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const h = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', h);
        return () => window.removeEventListener('scroll', h);
    }, []);

    const links = [
        { id: 'home', label: 'Início' },
        { id: 'sobre', label: 'Sobre' },
        { id: 'contato', label: 'Contato' },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-stone-950/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'}`}>
            <div className="max-w-6xl mx-auto px-6 h-18 py-5 flex items-center justify-between">
                <button onClick={() => onNav('home')} className="flex items-center gap-3 group">
                    {lodge.logo_url
                        ? <img src={lodge.logo_url} alt={lodge.nome} className="h-9 w-9 rounded-full object-cover ring-2 ring-amber-500/30" />
                        : <div className="h-9 w-9 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                            <Star size={16} className="text-amber-400" />
                        </div>
                    }
                    <span className="text-sm font-black text-white uppercase tracking-widest hidden sm:block">
                        A.R.L.S. {lodge.nome}
                    </span>
                </button>

                <nav className="flex items-center gap-1">
                    {links.map(l => (
                        <button
                            key={l.id}
                            onClick={() => onNav(l.id)}
                            className={`px-4 py-2 text-[11px] font-black uppercase tracking-widest rounded-md transition-all ${activeSection === l.id
                                ? 'text-amber-400 bg-amber-400/10'
                                : 'text-white/60 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {l.label}
                        </button>
                    ))}
                </nav>
            </div>
        </header>
    );
}

// ─── Home Section ────────────────────────────────────────────────────────────
function HomeSection({ lodge, onContact }: { lodge: any; onContact: () => void }) {
    const loc = (lodge.localizacao_json as any) || {};
    const mem = (lodge.membros_json as any) || {};
    const veneravel = mem.veneravel?.nome || null;
    const cidade = loc.cidade ? `${loc.cidade}${loc.estado ? `, ${loc.estado}` : ''}` : null;

    return (
        <section id="home" className="min-h-screen relative flex flex-col justify-center items-center text-center px-6 overflow-hidden bg-stone-950 pt-28 md:pt-36 pb-20">
            {/* Ornamental background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(180,130,40,0.15)_0%,transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(180,130,40,0.07)_0%,transparent_50%)]" />
            <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b48228' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
            {/* Decorative lines */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-40 bg-gradient-to-b from-transparent via-amber-500/20 to-transparent" />

            <div className="relative z-10 max-w-4xl mx-auto w-full">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-[10px] font-black uppercase tracking-widest mb-8 md:mb-10 flex-wrap justify-center">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse shrink-0" />
                    <span>{lodge.rito || 'Rito Escocês Antigo e Aceito'}</span>
                    {cidade && <><span className="text-amber-400/30 mx-1">·</span><span>{cidade}</span></>}
                </div>

                {lodge.logo_url && (
                    <div className="mb-8 md:mb-10 flex justify-center">
                        <div className="relative">
                            <div className="absolute -inset-3 rounded-full bg-amber-400/5 border border-amber-400/10 animate-pulse" />
                            <img src={lodge.logo_url} alt={lodge.nome} className="relative h-20 w-20 md:h-24 md:w-24 rounded-full object-cover ring-4 ring-amber-400/20 shadow-2xl shadow-amber-900/40" />
                        </div>
                    </div>
                )}

                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 md:mb-6 tracking-tighter leading-[0.9] uppercase font-serif italic px-2">
                    A.R.L.S. {lodge.nome}
                </h1>
                <p className="text-amber-400/80 font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-[11px] mb-3">
                    N.º {lodge.numero} · Federada à {lodge.potencias?.nome || 'Grande Oriente'}
                </p>
                {veneravel && (
                    <p className="text-white/30 font-medium text-sm mb-6 md:mb-8">
                        Venerável Mestre: <span className="text-white/60 font-bold">{veneravel}</span>
                    </p>
                )}
                <p className="text-white/50 text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed mb-10 md:mb-14 px-4 md:px-0">
                    Uma fraternidade de homens livres e de bons costumes, comprometidos com o aperfeiçoamento moral e intelectual do ser humano e da sociedade.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4 sm:px-0">
                    <button
                        onClick={onContact}
                        className="w-full sm:w-auto px-8 md:px-10 py-4 bg-amber-500 text-stone-900 font-black rounded-md hover:bg-amber-400 transition-all text-[11px] uppercase tracking-widest shadow-xl shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-2"
                    >
                        Manifestar Interesse <ChevronRight size={16} />
                    </button>
                    <button
                        onClick={() => document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' })}
                        className="w-full sm:w-auto px-8 md:px-10 py-4 bg-white/5 border border-white/10 text-white font-black rounded-md hover:bg-white/10 transition-all text-[11px] uppercase tracking-widest"
                    >
                        Conhecer a Loja
                    </button>
                </div>
            </div>

            {/* Pillars */}
            <div className="relative z-10 max-w-5xl mx-auto mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full">
                {[
                    { icon: Heart, title: 'Fraternidade', desc: 'Vínculos que transcendem o tempo, fundados na confiança e no respeito mútuo entre irmãos.' },
                    { icon: Eye, title: 'Luz & Verdade', desc: 'A busca constante pelo conhecimento, pela verdade e pelo aperfeiçoamento do espírito.' },
                    { icon: Shield, title: 'Integridade', desc: 'Compromisso inabalável com a ética, a moral e os princípios que regem a boa conduta.' },
                ].map((p, i) => (
                    <div key={i} className="p-6 md:p-8 bg-white/[0.03] border border-white/[0.06] rounded-2xl hover:bg-white/[0.06] hover:border-amber-500/20 transition-all group text-left">
                        <p.icon size={28} className="text-amber-400 mb-4 md:mb-5 group-hover:scale-110 transition-transform" />
                        <h3 className="text-white font-black text-sm uppercase tracking-widest mb-2 md:mb-3">{p.title}</h3>
                        <p className="text-white/40 text-sm leading-relaxed">{p.desc}</p>
                    </div>
                ))}
            </div>

            {/* Quote */}
            <div className="relative z-10 mt-16 md:mt-24 max-w-2xl mx-auto text-center pb-8 md:pb-16">
                <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-amber-500/40 to-transparent mx-auto mb-6 md:mb-8" />
                <p className="text-white/30 text-sm italic leading-relaxed font-medium px-4">
                    "A Maçonaria não convida. O interesse deve surgir do livre arbítrio,<br className="hidden sm:block" />da busca genuína pela Luz."
                </p>
            </div>
        </section>
    );
}

// ─── Sobre Section ───────────────────────────────────────────────────────────
function SobreSection({ lodge }: { lodge: any }) {
    const loc = lodge.localizacao_json || {};

    return (
        <section id="sobre" className="min-h-screen bg-stone-900 py-32 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-20 text-center">
                    <div className="inline-block px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-[10px] font-black uppercase tracking-widest mb-6">
                        Nossa História
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black font-serif italic text-white tracking-tighter mb-6">
                        Sobre a A.R.L.S. {lodge.nome}
                    </h2>
                    <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
                        Uma oficina edificada sobre os alicerces da Liberdade, Igualdade e Fraternidade, trabalhando sob a luz da razão e da ciência.
                    </p>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    {[
                        { label: 'Número da Loja', value: `N.º ${lodge.numero}` },
                        { label: 'Rito Praticado', value: lodge.rito || 'Rito Escocês Antigo e Aceito (REAA)' },
                        { label: 'Potência Federante', value: lodge.potencias?.nome || '—' },
                        { label: 'Localização', value: loc.cidade ? `${loc.cidade}, ${loc.estado}` : 'Consulte-nos' },
                    ].map((item, i) => (
                        <div key={i} className="p-6 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:border-amber-500/20 transition-all">
                            <p className="text-[10px] font-black text-amber-400/70 uppercase tracking-widest mb-2">{item.label}</p>
                            <p className="text-white font-black text-lg">{item.value}</p>
                        </div>
                    ))}
                </div>

                {/* Valores / Pilares */}
                <div className="mb-20">
                    <h3 className="text-2xl font-black text-white font-serif italic mb-10 text-center">O que nos une</h3>
                    <div className="space-y-4">
                        {[
                            { icon: Users, title: 'Irmandade Universal', desc: 'Reunimos homens de diferentes origens, profissões e crenças em torno de valores comuns: o respeito, a ética e o desenvolvimento humano.' },
                            { icon: BookOpen, title: 'Aperfeiçoamento Moral', desc: 'A Maçonaria é uma escola de moral que usa a alegoria e o simbolismo como ferramentas para o crescimento interior e a reflexão filosófica.' },
                            { icon: Globe, title: 'Compromisso Social', desc: 'Nossos membros se comprometem a ser agentes de transformação positiva na sociedade, contribuindo para um mundo mais justo e fraterno.' },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-6 p-6 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:border-amber-500/10 transition-all group">
                                <div className="shrink-0 w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/20 transition-all">
                                    <item.icon size={20} className="text-amber-400" />
                                </div>
                                <div>
                                    <h4 className="text-white font-black text-sm uppercase tracking-wider mb-2">{item.title}</h4>
                                    <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quem pode ser Maçom */}
                <div className="p-8 md:p-12 bg-amber-500/5 border border-amber-500/15 rounded-2xl text-center">
                    <h3 className="text-2xl font-black text-white font-serif italic mb-4">Quem pode ser Maçom?</h3>
                    <p className="text-white/50 leading-relaxed max-w-2xl mx-auto mb-6">
                        Todo homem livre, de boa reputação, que acredita em um Princípio Criador e que busca o aperfeiçoamento pessoal e o bem da humanidade. A iniciação é precedida de um processo de sindicância que avalia o caráter e a motivação do candidato.
                    </p>
                    <p className="text-amber-400/70 text-[11px] font-black uppercase tracking-widest">
                        A Maçonaria não faz proselitismo · O interesse deve ser espontâneo
                    </p>
                </div>
            </div>
        </section>
    );
}

// ─── Contato Section ─────────────────────────────────────────────────────────
function ContatoSection({ lodge }: { lodge: any }) {
    const [form, setForm] = useState({ nome: '', email: '', telefone: '', mensagem: '' });
    const [sent, setSent] = useState(false);
    const [sending, setSending] = useState(false);
    const loc = lodge.localizacao_json || {};

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        try {
            await supabase.from('leads').insert({
                loja_id: lodge.id,
                potencia_id: lodge.potencia_id,
                nome: form.nome,
                email: form.email,
                telefone: form.telefone,
                mensagem: form.mensagem,
                origem: 'site_loja',
            });
        } catch (_) {
            // Falha silenciosa — UX mantém sucesso
        }
        setSent(true);
        setSending(false);
    };

    return (
        <section id="contato" className="min-h-screen bg-stone-950 py-32 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-20 text-center">
                    <div className="inline-block px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-[10px] font-black uppercase tracking-widest mb-6">
                        Sindicância de Ingresso
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black font-serif italic text-white tracking-tighter mb-6">
                        Manifeste seu Interesse
                    </h2>
                    <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
                        Preencha o formulário abaixo com seus dados. Suas informações serão tratadas com sigilo absoluto. Um irmão entrará em contato.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Form */}
                    <div className="lg:col-span-3">
                        {sent ? (
                            <div className="flex flex-col items-center justify-center text-center py-20 px-8 bg-amber-500/5 border border-amber-500/20 rounded-2xl">
                                <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mb-6">
                                    <Heart size={28} className="text-amber-400" />
                                </div>
                                <h3 className="text-2xl font-black text-white font-serif italic mb-4">Solicitação Recebida</h3>
                                <p className="text-white/50 leading-relaxed max-w-sm">
                                    Sua manifestação foi registrada. Um irmão da A.R.L.S. {lodge.nome} entrará em contato em breve.
                                </p>
                                <p className="mt-6 text-amber-400/60 text-[10px] font-black uppercase tracking-widest">
                                    Que a Luz ilumine seu caminho
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Nome Completo *</label>
                                        <input
                                            required
                                            type="text"
                                            value={form.nome}
                                            onChange={e => setForm(f => ({ ...f, nome: e.target.value }))}
                                            placeholder="Como consta no RG"
                                            className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm font-medium placeholder:text-white/20 focus:border-amber-500/40 focus:bg-white/[0.06] outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">E-mail *</label>
                                        <input
                                            required
                                            type="email"
                                            value={form.email}
                                            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                            placeholder="seu@email.com"
                                            className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm font-medium placeholder:text-white/20 focus:border-amber-500/40 focus:bg-white/[0.06] outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Telefone / WhatsApp</label>
                                    <input
                                        type="tel"
                                        value={form.telefone}
                                        onChange={e => setForm(f => ({ ...f, telefone: e.target.value }))}
                                        placeholder="(00) 00000-0000"
                                        className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm font-medium placeholder:text-white/20 focus:border-amber-500/40 focus:bg-white/[0.06] outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Motivo do Interesse</label>
                                    <textarea
                                        rows={4}
                                        value={form.mensagem}
                                        onChange={e => setForm(f => ({ ...f, mensagem: e.target.value }))}
                                        placeholder="Conte-nos brevemente o que o motiva a buscar a Maçonaria..."
                                        className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm font-medium placeholder:text-white/20 focus:border-amber-500/40 focus:bg-white/[0.06] outline-none transition-all resize-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="w-full py-4 bg-amber-500 text-stone-900 font-black rounded-xl hover:bg-amber-400 transition-all text-[11px] uppercase tracking-widest shadow-xl shadow-amber-500/20 active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2"
                                >
                                    {sending ? <Loader2 size={16} className="animate-spin" /> : null}
                                    {sending ? 'Enviando...' : 'Enviar Manifestação'}
                                </button>
                                <p className="text-center text-[10px] text-white/20 font-medium uppercase tracking-widest">
                                    Seus dados são confidenciais e tratados com sigilo
                                </p>
                            </form>
                        )}
                    </div>

                    {/* Sidebar info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl space-y-6">
                            <h3 className="text-sm font-black text-white uppercase tracking-widest">Informações da Loja</h3>
                            {loc.cidade && (
                                <div className="flex gap-4">
                                    <MapPin size={18} className="text-amber-400 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-white/70 text-sm font-medium">
                                            {loc.logradouro}{loc.numero_end ? `, ${loc.numero_end}` : ''}
                                            {loc.complemento ? ` - ${loc.complemento}` : ''}
                                        </p>
                                        <p className="text-white/40 text-xs mt-1">{loc.bairro} · {loc.cidade}/{loc.estado}</p>
                                    </div>
                                </div>
                            )}
                            <div className="flex gap-4">
                                <Mail size={18} className="text-amber-400 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-white/70 text-sm font-medium">E-mail Institucional</p>
                                    <p className="text-amber-400/70 text-xs mt-1 font-mono">contato@{lodge.slug}.org</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-amber-500/5 border border-amber-500/15 rounded-2xl">
                            <h3 className="text-amber-400 text-xs font-black uppercase tracking-widest mb-3">Aviso Importante</h3>
                            <p className="text-white/40 text-sm leading-relaxed">
                                A Maçonaria não recruta membros nem faz proselitismo. Somente candidatos que manifestem interesse espontaneamente serão considerados.
                            </p>
                        </div>

                        <div className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
                            <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">Potência Federante</p>
                            <p className="text-white font-black">{lodge.potencias?.nome || '—'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="max-w-5xl mx-auto mt-24 pt-10 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-4 text-white/20 text-[10px] font-black uppercase tracking-widest">
                <span>© {new Date().getFullYear()} A.R.L.S. {lodge.nome} · Todos os direitos reservados</span>
                <span>Powered by <a href="https://emason.evolves.site" target="_blank" rel="noopener noreferrer" className="text-amber-400/60 hover:text-amber-400 transition">e.mason</a></span>
            </div>
        </section>
    );
}

// ─── Main ────────────────────────────────────────────────────────────────────
export default function LodgePublic() {
    const { lodgeSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [lodgeData, setLodgeData] = useState<any>(null);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        async function fetchLodge() {
            setLoading(true);
            const { data } = await supabase
                .from('lojas')
                .select('*, potencias(nome)')
                .eq('slug', lodgeSlug)
                .single();
            if (data) setLodgeData(data);
            setLoading(false);
        }
        fetchLodge();
    }, [lodgeSlug]);

    // Track active section on scroll
    useEffect(() => {
        const ids = ['home', 'sobre', 'contato'];
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
            },
            { rootMargin: '-40% 0px -40% 0px' }
        );
        ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
        return () => observer.disconnect();
    }, [lodgeData]);

    const navTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    if (loading) return (
        <div className="min-h-screen bg-stone-950 flex items-center justify-center">
            <Loader2 className="animate-spin text-amber-400" size={40} />
        </div>
    );

    if (!lodgeData) return <NotFound />;

    return (
        <div className="bg-stone-950">
            <LodgeNav lodge={lodgeData} activeSection={activeSection} onNav={navTo} />
            <HomeSection lodge={lodgeData} onContact={() => navTo('contato')} />
            <SobreSection lodge={lodgeData} />
            <ContatoSection lodge={lodgeData} />
        </div>
    );
}
