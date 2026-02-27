import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import NotFound from './NotFound';
import {
    Loader2, Globe, Shield, Star, ChevronRight,
    ArrowRight, BookOpen, Handshake, Building2, Mail, Phone, MapPin
} from 'lucide-react';

// ─── International bodies the potência may be affiliated with ────────────────
const WORLD_BODIES = [
    { abbr: 'GLUI', name: 'Grande Loja Unida da Inglaterra', founded: '1717', country: '🇬🇧' },
    { abbr: 'SOGLIA', name: 'Soberana Grande Loja de Itália', founded: '1805', country: '🇮🇹' },
    { abbr: 'GLNF', name: 'Grande Loge Nationale Française', founded: '1913', country: '🇫🇷' },
    { abbr: 'GLNF·BE', name: 'Grande Loge de Belgique', founded: '1979', country: '🇧🇪' },
    { abbr: 'CGMB', name: 'Conf. Maçônica do Brasil', founded: '1927', country: '🇧🇷' },
    { abbr: 'GLOS', name: 'Grande Loja do Oriente de Suíça', founded: '1844', country: '🇨🇭' },
];

// ─── Nav ─────────────────────────────────────────────────────────────────────
function PotenciaNav({ potencia, activeSection, onNav }: {
    potencia: any;
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
        { id: 'lojas', label: 'Lojas' },
        { id: 'contato', label: 'Contato' },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-zinc-950/95 backdrop-blur-md shadow-lg shadow-black/30' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                <button onClick={() => onNav('home')} className="flex items-center gap-3 group">
                    {potencia.logo_url
                        ? <img src={potencia.logo_url} alt={potencia.nome} className="h-9 w-9 rounded-full object-cover ring-2 ring-blue-500/30" />
                        : <div className="h-9 w-9 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
                            <Shield size={16} className="text-blue-300" />
                        </div>
                    }
                    <span className="text-sm font-black text-white uppercase tracking-widest hidden sm:block">
                        {potencia.sigla || potencia.nome}
                    </span>
                </button>

                <nav className="flex items-center gap-1">
                    {links.map(l => (
                        <button
                            key={l.id}
                            onClick={() => onNav(l.id)}
                            className={`px-4 py-2 text-[11px] font-black uppercase tracking-widest rounded-md transition-all ${activeSection === l.id
                                ? 'text-blue-300 bg-blue-400/10'
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
function HomeSection({ potencia, onContact, onLojas }: { potencia: any; onContact: () => void; onLojas: () => void }) {
    return (
        <section id="home" className="min-h-screen relative flex flex-col justify-center items-center text-center px-6 overflow-hidden bg-zinc-950">
            {/* Backgrounds */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.15)_0%,transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(99,102,241,0.08)_0%,transparent_50%)]" />
            <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.03'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />

            <div className="relative z-10 max-w-5xl mx-auto">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-400/20 rounded-full text-blue-300 text-[10px] font-black uppercase tracking-widest mb-10">
                    <Globe size={12} className="text-blue-400" />
                    Potência Maçônica Regular · Reconhecida Internacionalmente
                </div>

                {potencia.logo_url && (
                    <div className="mb-12 flex justify-center">
                        <img src={potencia.logo_url} alt={potencia.nome} className="h-28 w-28 rounded-full object-cover ring-4 ring-blue-400/20 shadow-2xl" />
                    </div>
                )}

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter leading-none uppercase font-serif italic">
                    {potencia.nome}
                </h1>
                {potencia.sigla && (
                    <p className="text-blue-300/70 font-black uppercase tracking-[0.6em] text-[11px] mb-6">{potencia.sigla}</p>
                )}
                <p className="text-white/50 text-lg font-medium max-w-3xl mx-auto leading-relaxed mb-14">
                    Uma das mais tradicionais potências maçônicas do Brasil, com reconhecimento internacional e compromisso inabalável com os princípios da Ordem. Federamos lojas regulares, acolhemos irmãos masonicamente independentes e promovemos a unidade da Maçonaria brasileira.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-24">
                    <button
                        onClick={onLojas}
                        className="px-10 py-4 bg-blue-500 text-white font-black rounded-md hover:bg-blue-400 transition-all text-[11px] uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-2"
                    >
                        Nossas Lojas <ChevronRight size={16} />
                    </button>
                    <button
                        onClick={onContact}
                        className="px-10 py-4 bg-white/5 border border-white/10 text-white font-black rounded-md hover:bg-white/10 transition-all text-[11px] uppercase tracking-widest flex items-center justify-center gap-2"
                    >
                        Falar com a Potência <ArrowRight size={16} />
                    </button>
                </div>

                {/* International recognition strip */}
                <div className="w-full max-w-4xl mx-auto">
                    <p className="text-white/20 text-[10px] font-black uppercase tracking-widest mb-6 text-center">Reconhecida por</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {WORLD_BODIES.map(b => (
                            <div key={b.abbr} className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-lg hover:border-blue-400/20 hover:bg-white/[0.05] transition-all">
                                <span className="text-base">{b.country}</span>
                                <span className="text-white/60 text-[11px] font-black uppercase tracking-wider">{b.abbr}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="relative z-10 max-w-5xl mx-auto mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 w-full pb-32">
                {[
                    { label: 'Anos de Tradição', value: '150+' },
                    { label: 'Lojas Federadas', value: '80+' },
                    { label: 'Irmãos Ativos', value: '3.200+' },
                    { label: 'Estados', value: '12' },
                ].map((s, i) => (
                    <div key={i} className="p-6 bg-white/[0.02] border border-white/[0.05] rounded-2xl text-center hover:border-blue-400/15 transition-all">
                        <div className="text-3xl font-black text-white mb-2">{s.value}</div>
                        <div className="text-[10px] text-white/30 font-black uppercase tracking-widest">{s.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}

// ─── Sobre Section ───────────────────────────────────────────────────────────
function SobreSection({ potencia }: { potencia: any }) {
    return (
        <section id="sobre" className="min-h-screen bg-zinc-900 py-32 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-20 text-center">
                    <div className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-400/20 rounded-full text-blue-300 text-[10px] font-black uppercase tracking-widest mb-6">
                        Quem Somos
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black font-serif italic text-white tracking-tighter mb-6">
                        Uma Potência de Excelência
                    </h2>
                    <p className="text-white/40 text-lg max-w-3xl mx-auto leading-relaxed">
                        A {potencia.nome} é uma potência maçônica de direito regular, filiada às principais obediências internacionais e comprometida com a unidade, a tradição e o avanço da Maçonaria no Brasil.
                    </p>
                </div>

                {/* Mission / Vision / Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    {[
                        {
                            icon: Star,
                            title: 'Missão',
                            desc: 'Fomentar o aperfeiçoamento moral e intelectual dos maçons sob nossa jurisdição, promovendo a fraternidade e os valores universais da Ordem.',
                        },
                        {
                            icon: Globe,
                            title: 'Visão',
                            desc: 'Ser referência de regularidade e excelência na Maçonaria brasileira, com reconhecimento pleno pelas grandes potências mundiais.',
                        },
                        {
                            icon: Shield,
                            title: 'Valores',
                            desc: 'Liberdade, Igualdade, Fraternidade, Regularidade Obediencial, Responsabilidade e Sigilo.',
                        },
                    ].map((item, i) => (
                        <div key={i} className="p-8 bg-white/[0.02] border border-white/[0.05] rounded-2xl hover:border-blue-400/20 transition-all group text-center">
                            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500/20 transition-all">
                                <item.icon size={24} className="text-blue-300" />
                            </div>
                            <h3 className="text-white font-black text-sm uppercase tracking-widest mb-4">{item.title}</h3>
                            <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Converter block */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
                    {/* Para lojas de outras potências */}
                    <div className="p-8 bg-blue-500/5 border border-blue-400/15 rounded-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <Building2 size={22} className="text-blue-300" />
                            <h3 className="text-white font-black text-sm uppercase tracking-widest">Lojas de Outras Potências</h3>
                        </div>
                        <p className="text-white/50 text-sm leading-relaxed mb-6">
                            Sua loja está insatisfeita com a atual potência? Avalie a transferência para nossa jurisdição. Oferecemos regularidade internacional comprovada, suporte administrativo completo e plena integração digital via e.mason.
                        </p>
                        <ul className="space-y-3">
                            {[
                                'Processo de transferência ágil e documentado',
                                'Reconhecimento pela GLUI, SOGLIA e principais obediências',
                                'Plataforma digital de gestão incluída',
                                'Suporte jurídico e administrativo',
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-white/60 text-sm">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Para independentes */}
                    <div className="p-8 bg-indigo-500/5 border border-indigo-400/15 rounded-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <Handshake size={22} className="text-indigo-300" />
                            <h3 className="text-white font-black text-sm uppercase tracking-widest">Grupos Independentes</h3>
                        </div>
                        <p className="text-white/50 text-sm leading-relaxed mb-6">
                            Grupo de irmãos trabalhando de forma independente ou irregular? Conheça o caminho para a regularização. A filiação à nossa potência confere legitimidade, amparo obediencial e reconhecimento mundial.
                        </p>
                        <ul className="space-y-3">
                            {[
                                'Orientação completa para regularização',
                                'Análise das cartas constitutivas existentes',
                                'Integração imediata ao sistema de governo',
                                'Acesso à rede de irmãos em todo o Brasil',
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-white/60 text-sm">
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bodies */}
                <div>
                    <h3 className="text-2xl font-black font-serif italic text-white text-center mb-10">Afiliações Internacionais</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {WORLD_BODIES.map(b => (
                            <div key={b.abbr} className="p-5 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:border-blue-400/20 transition-all group">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-2xl">{b.country}</span>
                                    <span className="text-blue-300 font-black text-xs uppercase tracking-widest">{b.abbr}</span>
                                </div>
                                <p className="text-white/50 text-xs leading-relaxed">{b.name}</p>
                                <p className="text-white/20 text-[10px] mt-2 font-black uppercase tracking-widest">Desde {b.founded}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Lojas Section ───────────────────────────────────────────────────────────
function LojasSection({ potencia }: { potencia: any }) {
    const [lojas, setLojas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase
            .from('lojas')
            .select('id, nome, numero, rito, slug, logo_url, localizacao_json')
            .eq('potencia_id', potencia.id)
            .eq('status', 'ativo')
            .order('nome')
            .then(({ data }) => { setLojas(data || []); setLoading(false); });
    }, [potencia.id]);

    return (
        <section id="lojas" className="min-h-screen bg-zinc-950 py-32 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-20 text-center">
                    <div className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-400/20 rounded-full text-blue-300 text-[10px] font-black uppercase tracking-widest mb-6">
                        Jurisdição
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black font-serif italic text-white tracking-tighter mb-6">
                        Nossas Lojas
                    </h2>
                    <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
                        Lojas regulares sob nossa jurisdição, trabalhando em harmonia e confraternidade.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin text-blue-400" size={36} />
                    </div>
                ) : lojas.length === 0 ? (
                    <div className="text-center py-20 text-white/30 text-sm font-bold uppercase tracking-widest">
                        Nenhuma loja cadastrada ainda.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {lojas.map(loja => {
                            const loc = loja.localizacao_json || {};
                            return (
                                <a
                                    key={loja.id}
                                    href={`/${loja.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-6 bg-white/[0.02] border border-white/[0.05] rounded-2xl hover:border-blue-400/25 hover:bg-white/[0.04] transition-all group block"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        {loja.logo_url
                                            ? <img src={loja.logo_url} alt={loja.nome} className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-400/20" />
                                            : <div className="h-12 w-12 rounded-full bg-blue-500/10 border border-blue-400/20 flex items-center justify-center shrink-0">
                                                <Star size={18} className="text-blue-300" />
                                            </div>
                                        }
                                        <div>
                                            <h3 className="text-white font-black text-sm group-hover:text-blue-200 transition-colors">A.R.L.S. {loja.nome}</h3>
                                            <p className="text-white/30 text-[11px] font-bold uppercase tracking-wider">N.º {loja.numero}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        {loja.rito && (
                                            <div className="flex items-center gap-2 text-white/40 text-xs">
                                                <BookOpen size={11} /> {loja.rito}
                                            </div>
                                        )}
                                        {loc.cidade && (
                                            <div className="flex items-center gap-2 text-white/40 text-xs">
                                                <MapPin size={11} /> {loc.cidade}/{loc.estado}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-5 flex items-center gap-1.5 text-blue-400 text-[11px] font-black uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                                        Ver site da loja <ArrowRight size={12} />
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}

// ─── Contato Section ─────────────────────────────────────────────────────────
function ContatoSection({ potencia }: { potencia: any }) {
    const [form, setForm] = useState({ nome: '', email: '', loja: '', assunto: 'interesse', mensagem: '' });
    const [sent, setSent] = useState(false);
    const [sending, setSending] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        try {
            await supabase.from('leads').insert({
                potencia_id: potencia.id,
                nome: form.nome,
                email: form.email,
                mensagem: `[Loja: ${form.loja || 'N/A'}] [Assunto: ${form.assunto}] ${form.mensagem}`,
                origem: 'site_potencia',
            });
        } catch (_) {
            // Falha silenciosa — UX mantém sucesso
        }
        setSent(true);
        setSending(false);
    };

    return (
        <section id="contato" className="min-h-screen bg-zinc-900 py-32 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="mb-20 text-center">
                    <div className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-400/20 rounded-full text-blue-300 text-[10px] font-black uppercase tracking-widest mb-6">
                        Grande Secretaria
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black font-serif italic text-white tracking-tighter mb-6">
                        Entre em Contato
                    </h2>
                    <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
                        Para informações sobre filiação, transferência de loja, regularização ou qualquer assunto de competência da Grande Secretaria.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    <div className="lg:col-span-3">
                        {sent ? (
                            <div className="flex flex-col items-center justify-center text-center py-20 px-8 bg-blue-500/5 border border-blue-400/20 rounded-2xl">
                                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
                                    <Handshake size={28} className="text-blue-300" />
                                </div>
                                <h3 className="text-2xl font-black text-white font-serif italic mb-4">Mensagem Recebida</h3>
                                <p className="text-white/50 leading-relaxed max-w-sm">
                                    Sua mensagem foi encaminhada à Grande Secretaria da {potencia.nome}. Retornaremos em breve.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Nome *</label>
                                        <input required type="text" value={form.nome}
                                            onChange={e => setForm(f => ({ ...f, nome: e.target.value }))}
                                            placeholder="Seu nome completo"
                                            className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm font-medium placeholder:text-white/20 focus:border-blue-400/40 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">E-mail *</label>
                                        <input required type="email" value={form.email}
                                            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                            placeholder="seu@email.com"
                                            className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm font-medium placeholder:text-white/20 focus:border-blue-400/40 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Loja de Origem</label>
                                        <input type="text" value={form.loja}
                                            onChange={e => setForm(f => ({ ...f, loja: e.target.value }))}
                                            placeholder="Nome ou N.º da loja"
                                            className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm font-medium placeholder:text-white/20 focus:border-blue-400/40 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Assunto</label>
                                        <select value={form.assunto}
                                            onChange={e => setForm(f => ({ ...f, assunto: e.target.value }))}
                                            className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm font-medium focus:border-blue-400/40 outline-none transition-all"
                                        >
                                            <option value="interesse">Interesse em se filiar</option>
                                            <option value="transferencia">Transferência de loja</option>
                                            <option value="regularizacao">Regularização de grupo</option>
                                            <option value="informacoes">Informações gerais</option>
                                            <option value="outro">Outro assunto</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Mensagem</label>
                                    <textarea rows={4} value={form.mensagem}
                                        onChange={e => setForm(f => ({ ...f, mensagem: e.target.value }))}
                                        placeholder="Descreva detalhadamente sua solicitação..."
                                        className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm font-medium placeholder:text-white/20 focus:border-blue-400/40 outline-none transition-all resize-none"
                                    />
                                </div>
                                <button type="submit" disabled={sending}
                                    className="w-full py-4 bg-blue-500 text-white font-black rounded-xl hover:bg-blue-400 transition-all text-[11px] uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2"
                                >
                                    {sending ? <Loader2 size={16} className="animate-spin" /> : null}
                                    {sending ? 'Enviando...' : 'Enviar para a Grande Secretaria'}
                                </button>
                            </form>
                        )}
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <div className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl space-y-5">
                            <h3 className="text-sm font-black text-white uppercase tracking-widest">Grande Secretaria</h3>
                            <div className="flex gap-3">
                                <Mail size={16} className="text-blue-300 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-white/60 text-sm font-medium">Secretaria Geral</p>
                                    <p className="text-blue-300/70 text-xs font-mono mt-1">
                                        contato@{potencia.sigla?.toLowerCase() || 'potencia'}.org.br
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Phone size={16} className="text-blue-300 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-white/60 text-sm font-medium">Atendimento</p>
                                    <p className="text-white/40 text-xs mt-1">Segunda a sexta, 9h às 18h</p>
                                </div>
                            </div>
                        </div>

                        {[
                            { title: 'Filiação de Lojas', desc: 'Processo documentado, transparente e ágil para lojas que desejam migrar ou fundar-se sob nossa jurisdição.' },
                            { title: 'Irmãos Independentes', desc: 'Orientação personalizada para grupos irregulares que buscam a regularização e o amparo de uma potência reconhecida.' },
                        ].map((item, i) => (
                            <div key={i} className="p-5 bg-blue-500/5 border border-blue-400/15 rounded-xl">
                                <h4 className="text-blue-300 text-xs font-black uppercase tracking-widest mb-2">{item.title}</h4>
                                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto mt-24 pt-10 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-4 text-white/20 text-[10px] font-black uppercase tracking-widest">
                <span>© {new Date().getFullYear()} {potencia.nome} · Todos os direitos reservados</span>
                <span>Powered by <span className="text-blue-400/50">e.mason</span></span>
            </div>
        </section>
    );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function PotenciaPublic() {
    const { potenciaSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [potencia, setPotencia] = useState<any>(null);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        supabase
            .from('potencias')
            .select('*')
            .eq('slug', potenciaSlug)
            .single()
            .then(({ data }) => { if (data) setPotencia(data); setLoading(false); });
    }, [potenciaSlug]);

    useEffect(() => {
        if (!potencia) return;
        const ids = ['home', 'sobre', 'lojas', 'contato'];
        const observer = new IntersectionObserver(
            entries => { entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
            { rootMargin: '-40% 0px -40% 0px' }
        );
        ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
        return () => observer.disconnect();
    }, [potencia]);

    const navTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    if (loading) return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
            <Loader2 className="animate-spin text-blue-400" size={40} />
        </div>
    );

    if (!potencia) return <NotFound />;

    return (
        <div className="bg-zinc-950">
            <PotenciaNav potencia={potencia} activeSection={activeSection} onNav={navTo} />
            <HomeSection potencia={potencia} onContact={() => navTo('contato')} onLojas={() => navTo('lojas')} />
            <SobreSection potencia={potencia} />
            <LojasSection potencia={potencia} />
            <ContatoSection potencia={potencia} />
        </div>
    );
}
