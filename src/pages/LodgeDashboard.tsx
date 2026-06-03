import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
    Landmark, FileText, Globe, Sparkles, BookOpen, Lock, Unlock, CheckSquare, 
    CreditCard, Calendar, Share2, Download, AlertTriangle, Activity, Send, CheckCircle2, DollarSign, Wallet
} from 'lucide-react';

// Predefined mock data
const mockNews = [
    { id: 1, title: "Sessão Magna de Exaltação", date: "05/06/2026", content: "Convocamos todos os Mestres Maçons da jurisdição para a Sessão Magna de Exaltação do Irmão Alan Kardec. Traje: Rigor Maçônico (Terno preto, gravata preta, sapatos pretos e balandrau/aventais).", category: "Edital" },
    { id: 2, title: "Decreto nº 42 - Regularização de Capitação", date: "01/06/2026", content: "O Grão-Mestre Geral decreta novas diretrizes para repasse da taxa federativa pelas oficinas a partir do segundo semestre de 2026.", category: "Decreto" },
    { id: 3, title: "Campanha do Agasalho 2026 - Hospitalaria", date: "28/05/2026", content: "Iniciamos a arrecadação anual. As caixas coletoras estão no átrio da Loja. Que a caridade e a solidariedade continuem a guiar nossas ações.", category: "Hospitalaria" }
];

const mockRituals = [
    { id: '1', title: "Ritual do Aprendiz Maçom (REAA)", type: "Ritual", docUrl: "#" },
    { id: '2', title: "Manual de Instruções do Companheiro (REAA)", type: "Manual", docUrl: "#" },
    { id: '3', title: "Guia de Cerimonial do Mestre Maçom (REAA)", type: "Guia", docUrl: "#" },
    { id: '4', title: "Decreto Administrativo de Conduta Interna", type: "Decreto", docUrl: "#" }
];

const mockAttendance = [
    { session: "Sessão 26/05", rate: 92, date: "26/05/2026" },
    { session: "Sessão 19/05", rate: 85, date: "19/05/2026" },
    { session: "Sessão 12/05", rate: 78, date: "12/05/2026" },
    { session: "Sessão 05/05", rate: 90, date: "05/05/2026" },
    { session: "Sessão 28/04", rate: 88, date: "28/04/2026" }
];

const mockDormants = [
    { nome: "Pedro Alencar", faltas: 4, status: "Aviso Pendente" },
    { nome: "Carlos Drummond", faltas: 5, status: "Adormecido Rápido" },
    { nome: "Mário Silva", faltas: 3, status: "Em Observação" }
];

const mockCandidates = [
    { id: 1, nome: "René Descartes", sindicancia: true, certidao: true, parecer: false, escrutinio: false },
    { id: 2, nome: "Isaac Newton", sindicancia: true, certidao: true, parecer: true, escrutinio: true }
];

const mockActiveObreiros = [
    { id: '1', nome: 'Jefferson Campos', grau: 'Mestre', cargo: 'Grão-Mestre', cCim: '12345', present: true },
    { id: '2', nome: 'Alan Kardec', grau: 'Mestre', cargo: 'Orador', cCim: '001202', present: true },
    { id: '3', nome: 'Pierre Simon', grau: 'Companheiro', cargo: 'Obreiro', cCim: '002341', present: false },
    { id: '4', nome: 'Francis Bacon', grau: 'Aprendiz', cargo: 'Obreiro', cCim: '003456', present: true }
];

export default function LodgeDashboard() {
    const { lodgeSlug } = useParams<{ lodgeSlug: string }>();
    const { profile } = useAuth();
    const userCargo = profile?.cargo || 'Obreiro';

    // Tabs control
    const [activeTab, setActiveTab] = useState<'mural' | 'carteirinha' | 'biblioteca' | 'convites' | 'secretaria' | 'tesouraria' | 'venerabilidade'>('mural');

    // States for various modules
    const [palavraSagrada, setPalavraSagrada] = useState('');
    const [ritualsUnlocked, setRitualsUnlocked] = useState(false);
    const [ritualsError, setRitualsError] = useState('');
    const [inviteData, setInviteData] = useState({
        loja: `Loja Aurora da Virtude nº 001`,
        data: '2026-06-05',
        hora: '20:00',
        grau: 'Mestre (Grau 3)',
        traje: 'Terno Escuro + Gravata Preta',
    });
    const [troncoOpen, setTroncoOpen] = useState(false);
    const [pixCopied, setPixCopied] = useState(false);
    const [cardView, setCardView] = useState<'digital' | 'physical'>('digital');

    // Newsletter State
    const [newsInput, setNewsInput] = useState({ title: '', content: '', category: 'Geral' });
    const [localNews, setLocalNews] = useState(mockNews);
    const [newsSent, setNewsSent] = useState(false);

    // Candidate workflow state
    const [candidates, setCandidates] = useState(mockCandidates);

    // Attendance registry state
    const [attendanceList, setAttendanceList] = useState(mockActiveObreiros);
    const [attendanceSaved, setAttendanceSaved] = useState(false);

    // Unlock Rituals logic
    const handleUnlockRituals = (e: React.FormEvent) => {
        e.preventDefault();
        const pwd = palavraSagrada.trim().toLowerCase();
        
        // Allowed passwords: Apprentice: boaz, Fellow: schibboleth, Master: macbenac
        if (pwd === 'boaz' || pwd === 'schibboleth' || pwd === 'macbenac') {
            setRitualsUnlocked(true);
            setRitualsError('');
        } else {
            setRitualsError('Palavra Incorreta. Tente novamente.');
            setRitualsUnlocked(false);
        }
    };

    // Solidary PIX Copy logic
    const handleCopyPix = () => {
        navigator.clipboard.writeText("00020101021126360014br.gov.pix.dict0114emason.solidario.hospitalaria");
        setPixCopied(true);
        setTimeout(() => setPixCopied(false), 2000);
    };

    // Newsletter Send logic
    const handleSendNews = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newsInput.title || !newsInput.content) return;

        const newPost = {
            id: localNews.length + 1,
            title: newsInput.title,
            date: new Date().toLocaleDateString('pt-BR'),
            content: newsInput.content,
            category: newsInput.category
        };
        setLocalNews([newPost, ...localNews]);
        setNewsInput({ title: '', content: '', category: 'Geral' });
        setNewsSent(true);
        setTimeout(() => setNewsSent(false), 3000);
    };

    // Determine permissions
    const isVeneravel = userCargo === 'Venerável Mestre' || userCargo === 'Grão-Mestre';
    const isSecretario = userCargo === 'Secretário' || userCargo === 'Secretário Geral' || isVeneravel;
    const isTesoureiro = userCargo === 'Tesoureiro' || isVeneravel;

    return (
        <div className="p-6 md:p-10 space-y-8 bg-[#070b13] min-h-screen text-slate-100">
            {/* Header */}
            <header className="border-b border-border/40 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-4xl font-black text-primary tracking-tighter leading-none mb-3 font-serif italic uppercase flex items-center gap-3">
                        <Landmark className="text-accent" size={32} /> Painel da Oficina
                    </h1>
                    <p className="text-muted-foreground text-sm font-medium flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                        Loja atual: <span className="text-primary font-bold uppercase">{lodgeSlug}</span>
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setTroncoOpen(true)}
                        className="bg-accent/10 border border-accent/20 hover:border-accent text-accent px-5 py-3 rounded-lg font-black uppercase text-[10px] tracking-[0.2em] transition-all flex items-center gap-2 active:scale-95 shadow-md shadow-accent/5"
                    >
                        <Wallet size={14} /> Tronco de Solidariedade
                    </button>
                </div>
            </header>

            {/* Dashboard Tabs navigation */}
            <nav className="flex flex-wrap gap-2 border-b border-border/20 pb-3 overflow-x-auto">
                <TabButton label="Mural & Boletins" icon={FileText} active={activeTab === 'mural'} onClick={() => setActiveTab('mural')} />
                <TabButton label="Carteirinha" icon={CreditCard} active={activeTab === 'carteirinha'} onClick={() => setActiveTab('carteirinha')} />
                <TabButton label="Biblioteca" icon={BookOpen} active={activeTab === 'biblioteca'} onClick={() => setActiveTab('biblioteca')} />
                <TabButton label="Convites" icon={Calendar} active={activeTab === 'convites'} onClick={() => setActiveTab('convites')} />
                {isSecretario && <TabButton label="Secretaria" icon={CheckSquare} active={activeTab === 'secretaria'} onClick={() => setActiveTab('secretaria')} />}
                {isTesoureiro && <TabButton label="Tesouraria" icon={DollarSign} active={activeTab === 'tesouraria'} onClick={() => setActiveTab('tesouraria')} />}
                {isVeneravel && <TabButton label="Venerabilidade" icon={Activity} active={activeTab === 'venerabilidade'} onClick={() => setActiveTab('venerabilidade')} />}
            </nav>

            {/* Content Tabs */}
            <div className="space-y-6">

                {/* ── TAB 1: MURAL & BOLETINS ────────────────────────────────────── */}
                {activeTab === 'mural' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <h2 className="text-xl font-bold uppercase tracking-wider text-accent border-b border-border/20 pb-3 flex items-center gap-2">
                                Mural de Comunicação
                            </h2>
                            <div className="space-y-4">
                                {localNews.map(item => (
                                    <div key={item.id} className="bg-[#0e1626] border border-border/40 p-6 rounded-xl relative hover:border-accent/40 transition-all group">
                                        <div className="absolute top-6 right-6 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-[9px] font-black uppercase text-accent tracking-widest">
                                            {item.category}
                                        </div>
                                        <h3 className="text-lg font-black text-primary font-serif italic mb-2">{item.title}</h3>
                                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-4">{item.date}</p>
                                        <p className="text-muted-foreground text-sm leading-relaxed">{item.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bulletin Creator (Only Secretary/Venerável) */}
                        <div className="space-y-6">
                            <div className="bg-[#0e1626] border border-border/40 p-6 rounded-xl">
                                <h3 className="text-sm font-black text-primary uppercase tracking-widest border-b border-border/20 pb-4 mb-6">
                                    Enviar Boletim de Notícias
                                </h3>
                                {isSecretario ? (
                                    <form onSubmit={handleSendNews} className="space-y-4">
                                        {newsSent && (
                                            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-2">
                                                <CheckCircle2 size={16} /> Comunicado enviado com sucesso!
                                            </div>
                                        )}
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Título do Comunicado</label>
                                            <input
                                                type="text"
                                                required
                                                value={newsInput.title}
                                                onChange={e => setNewsInput({ ...newsInput, title: e.target.value })}
                                                placeholder="Ex: Pauta da Próxima Sessão"
                                                className="w-full bg-[#070b13] border border-border/40 rounded-lg p-3 text-sm text-slate-100 outline-none focus:border-accent transition font-medium"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Categoria</label>
                                            <select
                                                value={newsInput.category}
                                                onChange={e => setNewsInput({ ...newsInput, category: e.target.value })}
                                                className="w-full bg-[#070b13] border border-border/40 rounded-lg p-3 text-sm text-slate-100 outline-none focus:border-accent transition font-medium"
                                            >
                                                <option value="Geral">Geral</option>
                                                <option value="Edital">Edital</option>
                                                <option value="Decreto">Decreto</option>
                                                <option value="Hospitalaria">Hospitalaria</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Conteúdo</label>
                                            <textarea
                                                required
                                                rows={4}
                                                value={newsInput.content}
                                                onChange={e => setNewsInput({ ...newsInput, content: e.target.value })}
                                                placeholder="Insira os detalhes do edital..."
                                                className="w-full bg-[#070b13] border border-border/40 rounded-lg p-3 text-sm text-slate-100 outline-none focus:border-accent transition font-medium"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black py-3 rounded-lg uppercase text-[10px] tracking-[0.2em] transition flex items-center justify-center gap-2 active:scale-95 shadow-xl shadow-black/10"
                                        >
                                            <Send size={14} /> Disparar para Obreiros
                                        </button>
                                    </form>
                                ) : (
                                    <div className="p-4 bg-muted/20 border border-border/20 text-muted-foreground rounded-lg text-xs font-medium leading-relaxed">
                                        O envio de comunicados no mural e boletins por e-mail é de acesso exclusivo para o <strong>Secretário</strong> ou <strong>Venerável Mestre</strong>.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* ── TAB 2: CARTEIRINHA ─────────────────────────────────────────── */}
                {activeTab === 'carteirinha' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                        {/* Control Box */}
                        <div className="bg-[#0e1626] border border-border/40 p-8 rounded-xl space-y-6">
                            <h2 className="text-xl font-bold uppercase tracking-wider text-accent border-b border-border/20 pb-3 flex items-center gap-2 font-serif italic">
                                Geração de Credencial Maçônica
                            </h2>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Visualize e configure sua credencial oficial federada. A carteirinha contém assinatura criptografada e um código de validação QR que pode ser digitalizado no templo para confirmar status de regularidade em tempo real.
                            </p>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setCardView('digital')}
                                    className={`flex-grow py-3 rounded-lg font-black uppercase text-[10px] tracking-[0.2em] transition ${cardView === 'digital' ? 'bg-accent text-primary' : 'bg-background border border-border/40 text-muted-foreground'}`}
                                >
                                    Carteirinha Digital (Vertical)
                                </button>
                                <button
                                    onClick={() => setCardView('physical')}
                                    className={`flex-grow py-3 rounded-lg font-black uppercase text-[10px] tracking-[0.2em] transition ${cardView === 'physical' ? 'bg-accent text-primary' : 'bg-background border border-border/40 text-muted-foreground'}`}
                                >
                                    Carteirinha Física (Horizontal)
                                </button>
                            </div>

                            <div className="pt-4 flex gap-4">
                                <a
                                    href={`/validar/${profile?.id || 'jefferson'}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full text-center bg-background border border-border/40 hover:border-primary text-primary-foreground font-black py-4 rounded-lg uppercase text-[10px] tracking-[0.2em] transition flex items-center justify-center gap-2 active:scale-95"
                                >
                                    <Globe size={14} className="text-accent" /> Simular Leitura do QR Code
                                </a>
                            </div>
                        </div>

                        {/* Card Preview Renderer */}
                        <div className="flex items-center justify-center py-6">
                            {cardView === 'digital' ? (
                                /* DIGITAL VERTICAL CARD */
                                <div className="w-[320px] h-[500px] bg-gradient-to-b from-[#09101d] to-[#121c2e] border-2 border-accent rounded-2xl shadow-2xl relative overflow-hidden flex flex-col items-center justify-between p-6">
                                    {/* Gold Trim Elements */}
                                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
                                    <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

                                    {/* Header */}
                                    <div className="text-center w-full pb-3 border-b border-accent/10">
                                        <img src="/e.mason.svg" alt="Logo" className="h-5 mx-auto grayscale brightness-200" />
                                        <p className="text-[8px] text-accent uppercase tracking-[0.3em] font-black mt-1">Grande Oriente de São Paulo</p>
                                    </div>

                                    {/* Card Content */}
                                    <div className="flex-grow flex flex-col items-center justify-center gap-4 w-full">
                                        {/* Mock Profile Pic */}
                                        <div className="w-24 h-24 rounded-full border-2 border-accent p-1 bg-background/50 relative overflow-hidden flex items-center justify-center">
                                            <div className="w-full h-full rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-primary-foreground font-black text-2xl">
                                                {profile?.nome?.[0] || 'J'}
                                            </div>
                                        </div>

                                        {/* Identity */}
                                        <div className="text-center space-y-1">
                                            <h3 className="text-lg font-black text-primary tracking-tight font-serif italic">{profile?.nome || 'Jefferson Campos'}</h3>
                                            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{profile?.cargo || 'Grão-Mestre'}</p>
                                        </div>

                                        {/* Status badge */}
                                        <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/25 rounded-full text-[9px] font-black uppercase text-emerald-400 tracking-widest">
                                            Status: Regular
                                        </div>

                                        {/* Details list */}
                                        <div className="w-full grid grid-cols-2 gap-2 text-center text-[10px] bg-background/20 p-3 rounded-lg border border-border/10">
                                            <div>
                                                <span className="text-muted-foreground uppercase tracking-wider block text-[8px] font-black">CIM</span>
                                                <span className="font-bold text-primary-foreground">#12345</span>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground uppercase tracking-wider block text-[8px] font-black">Grau</span>
                                                <span className="font-bold text-accent">{profile?.grau || 'Mestre'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer with scan QR */}
                                    <div className="w-full flex items-center justify-between border-t border-accent/10 pt-3">
                                        <div className="text-left">
                                            <p className="text-[7px] text-muted-foreground uppercase font-black">Validade Sócio</p>
                                            <p className="text-[9px] font-bold text-primary-foreground">DEZ / 2026</p>
                                        </div>
                                        {/* QR code mock icon */}
                                        <Link to={`/validar/${profile?.id || 'jefferson'}`} target="_blank" className="w-12 h-12 bg-white rounded-lg p-1.5 flex items-center justify-center hover:scale-105 transition-all">
                                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://e-masom.vercel.app/validar/12345" alt="QR" className="w-full h-full" />
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                /* PHYSICAL HORIZONTAL CARD */
                                <div className="w-[450px] h-[260px] bg-gradient-to-r from-[#09101d] to-[#121c2e] border-2 border-accent rounded-xl shadow-2xl relative overflow-hidden flex flex-col justify-between p-5">
                                    {/* Gold Trim elements */}
                                    <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-transparent via-accent to-transparent" />
                                    <div className="absolute top-0 bottom-0 right-0 w-1 bg-gradient-to-b from-transparent via-accent to-transparent" />

                                    {/* Top Bar */}
                                    <div className="flex justify-between items-center pb-2 border-b border-accent/15">
                                        <div>
                                            <img src="/e.mason.svg" alt="Logo" className="h-4 grayscale brightness-200" />
                                            <p className="text-[7px] text-accent uppercase tracking-widest font-black">Grande Loja Equinócio</p>
                                        </div>
                                        <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/25 rounded-full text-[8px] font-black uppercase text-emerald-400 tracking-wider">
                                            Regular
                                        </div>
                                    </div>

                                    {/* Mid section (Side-by-side) */}
                                    <div className="flex-grow flex items-center gap-4 py-2">
                                        {/* Photo */}
                                        <div className="w-20 h-20 rounded-lg border border-accent p-0.5 bg-background/50 flex-shrink-0 flex items-center justify-center">
                                            <div className="w-full h-full rounded bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-primary-foreground font-black text-xl">
                                                {profile?.nome?.[0] || 'J'}
                                            </div>
                                        </div>

                                        {/* Personal data */}
                                        <div className="flex-grow space-y-1">
                                            <h3 className="text-base font-black text-primary font-serif italic leading-none">{profile?.nome || 'Jefferson Campos'}</h3>
                                            <p className="text-[9px] text-accent uppercase font-black tracking-widest">{profile?.cargo || 'Grão-Mestre'}</p>
                                            
                                            <div className="grid grid-cols-2 gap-x-2 gap-y-1 pt-1.5 text-[9px] text-muted-foreground border-t border-border/10">
                                                <p>CIM: <strong className="text-slate-200 font-bold">#12345</strong></p>
                                                <p>Grau: <strong className="text-slate-200 font-bold">{profile?.grau || 'Mestre'}</strong></p>
                                                <p>Expiração: <strong className="text-slate-200 font-bold">31/12/2026</strong></p>
                                                <p>Iniciação: <strong className="text-slate-200 font-bold">12/03/2018</strong></p>
                                            </div>
                                        </div>

                                        {/* QR code */}
                                        <Link to={`/validar/${profile?.id || 'jefferson'}`} target="_blank" className="w-18 h-18 bg-white rounded-lg p-1.5 flex items-center justify-center shrink-0 hover:scale-105 transition-all">
                                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://e-masom.vercel.app/validar/12345" alt="QR" className="w-full h-full" />
                                        </Link>
                                    </div>

                                    {/* Bottom footer bar */}
                                    <div className="text-[7px] text-muted-foreground/60 uppercase tracking-widest text-center border-t border-border/15 pt-2 font-bold">
                                        Credencial física oficial de obreiro soberano • e.mason 2026
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ── TAB 3: BIBLIOTECA RITUALÍSTICA ────────────────────────────────── */}
                {activeTab === 'biblioteca' && (
                    <div className="bg-[#0e1626] border border-border/40 p-8 rounded-xl space-y-6">
                        <div className="flex justify-between items-center border-b border-border/20 pb-4">
                            <h2 className="text-xl font-bold uppercase tracking-wider text-accent flex items-center gap-2 font-serif italic">
                                Biblioteca Central Ritualística
                            </h2>
                            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground bg-background px-3 py-1.5 rounded-full border border-border/40">
                                Grau Atual: <span className="text-accent font-bold">{profile?.grau || 'Mestre'}</span>
                            </div>
                        </div>

                        {!ritualsUnlocked ? (
                            /* Passwords Lock screen */
                            <div className="max-w-md mx-auto py-10 text-center space-y-6">
                                <div className="w-16 h-16 bg-accent/5 text-accent border border-accent/20 rounded-full flex items-center justify-center mx-auto">
                                    <Lock size={32} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-primary">Acesso Restrito ao Grau</h3>
                                    <p className="text-muted-foreground text-xs leading-relaxed mt-2">
                                        Digite a <strong>Palavra Sagrada</strong> do seu grau para descriptografar os rituais e materiais disponíveis.
                                    </p>
                                </div>
                                <form onSubmit={handleUnlockRituals} className="space-y-4">
                                    {ritualsError && (
                                        <div className="p-3 bg-destructive/5 border border-destructive/25 text-destructive rounded-lg text-xs font-black uppercase tracking-wider">
                                            {ritualsError}
                                        </div>
                                    )}
                                    <input
                                        type="password"
                                        required
                                        value={palavraSagrada}
                                        onChange={e => setPalavraSagrada(e.target.value)}
                                        placeholder="Digite a Palavra Sagrada..."
                                        className="w-full bg-[#070b13] border border-border/40 rounded-lg p-4 text-center text-sm tracking-[0.2em] text-slate-100 outline-none focus:border-accent transition font-bold"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full bg-accent hover:bg-accent/90 text-primary font-black py-4 rounded-lg uppercase text-[10px] tracking-[0.2em] transition-all flex items-center justify-center gap-2 active:scale-95"
                                    >
                                        <Unlock size={14} /> Desbloquear Biblioteca
                                    </button>
                                </form>
                                <div className="text-[10px] text-muted-foreground/40 font-bold uppercase tracking-wider bg-background p-3 rounded-lg border border-border/20">
                                    💡 Testes: Aprendiz = <strong className="text-accent">boaz</strong>, Companheiro = <strong className="text-accent">schibboleth</strong>, Mestre = <strong className="text-accent">macbenac</strong>
                                </div>
                            </div>
                        ) : (
                            /* Unlocked Rituals page */
                            <div className="space-y-6 animate-in fade-in zoom-in duration-300">
                                <div className="p-4 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 rounded-lg text-xs font-black uppercase tracking-wider flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 size={16} /> Biblioteca Desbloqueada com Sucesso!
                                    </div>
                                    <button
                                        onClick={() => {
                                            setRitualsUnlocked(false);
                                            setPalavraSagrada('');
                                        }}
                                        className="text-[9px] uppercase tracking-wider font-black border border-emerald-500/30 hover:border-emerald-500 px-3 py-1 rounded transition"
                                    >
                                        Bloquear Acesso
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {mockRituals.map(rit => (
                                        <div key={rit.id} className="bg-background/40 border border-border/40 p-6 rounded-xl hover:border-accent/40 transition-all flex justify-between items-center group">
                                            <div>
                                                <span className="text-[9px] font-black uppercase tracking-widest text-accent bg-accent/5 border border-accent/10 px-2 py-1 rounded">
                                                    {rit.type}
                                                </span>
                                                <h4 className="text-base font-black text-primary font-serif italic mt-3">{rit.title}</h4>
                                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Disponível no Rito Escocês Antigo e Aceito</p>
                                            </div>
                                            <button
                                                onClick={() => alert(`Abertura simulada do arquivo: ${rit.title}`)}
                                                className="bg-accent/10 border border-accent/25 hover:bg-accent text-accent hover:text-primary p-3 rounded-lg transition-all"
                                                title="Ler Documento"
                                            >
                                                <BookOpen size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* ── TAB 4: CONVITES INTELIGENTES ─────────────────────────────────── */}
                {activeTab === 'convites' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                        {/* Customization panel */}
                        <div className="bg-[#0e1626] border border-border/40 p-8 rounded-xl space-y-6">
                            <h2 className="text-xl font-bold uppercase tracking-wider text-accent border-b border-border/20 pb-3 flex items-center gap-2 font-serif italic">
                                Gerador de Convite Litúrgico
                            </h2>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Crie de forma rápida e padronizada artes para divulgação e convites às sessões ordinárias ou magnas da oficina. Personalize os campos principais e baixe em alta resolução para partilhar.
                            </p>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Loja Promotora</label>
                                    <input
                                        type="text"
                                        value={inviteData.loja}
                                        onChange={e => setInviteData({ ...inviteData, loja: e.target.value })}
                                        className="w-full bg-[#070b13] border border-border/40 rounded-lg p-3 text-sm text-slate-100 outline-none focus:border-accent transition font-medium"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Data da Sessão</label>
                                        <input
                                            type="date"
                                            value={inviteData.data}
                                            onChange={e => setInviteData({ ...inviteData, data: e.target.value })}
                                            className="w-full bg-[#070b13] border border-border/40 rounded-lg p-3 text-sm text-slate-100 outline-none focus:border-accent transition font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Horário</label>
                                        <input
                                            type="time"
                                            value={inviteData.hora}
                                            onChange={e => setInviteData({ ...inviteData, hora: e.target.value })}
                                            className="w-full bg-[#070b13] border border-border/40 rounded-lg p-3 text-sm text-slate-100 outline-none focus:border-accent transition font-medium"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Grau da Sessão</label>
                                    <select
                                        value={inviteData.grau}
                                        onChange={e => setInviteData({ ...inviteData, grau: e.target.value })}
                                        className="w-full bg-[#070b13] border border-border/40 rounded-lg p-3 text-sm text-slate-100 outline-none focus:border-accent transition font-medium"
                                    >
                                        <option value="Aprendiz (Grau 1)">Aprendiz (Grau 1)</option>
                                        <option value="Companheiro (Grau 2)">Companheiro (Grau 2)</option>
                                        <option value="Mestre (Grau 3)">Mestre (Grau 3)</option>
                                        <option value="Sessão Magna (Grau 4+ / Festiva)">Sessão Magna (Grau 4+ / Festiva)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Traje Exigido</label>
                                    <select
                                        value={inviteData.traje}
                                        onChange={e => setInviteData({ ...inviteData, traje: e.target.value })}
                                        className="w-full bg-[#070b13] border border-border/40 rounded-lg p-3 text-sm text-slate-100 outline-none focus:border-accent transition font-medium"
                                    >
                                        <option value="Terno Escuro + Gravata Preta">Terno Escuro + Gravata Preta</option>
                                        <option value="Balandrau Preto + Avental de Grau">Balandrau Preto + Avental de Grau</option>
                                        <option value="Terno Preto + Gravata Maçônica">Terno Preto + Gravata Maçônica</option>
                                        <option value="Esporte Fino / Festivo">Esporte Fino / Festivo</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button
                                    onClick={() => alert('Download do convite gerado com sucesso em PDF/Imagem!')}
                                    className="flex-grow bg-accent hover:bg-accent/90 text-primary font-black py-4 rounded-lg uppercase text-[10px] tracking-[0.2em] transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md shadow-accent/5"
                                >
                                    <Download size={14} /> Baixar Arte
                                </button>
                                <button
                                    onClick={() => alert('Link do convite copiado para área de transferência!')}
                                    className="px-5 bg-background border border-border/40 hover:border-primary rounded-lg text-primary-foreground transition-all flex items-center justify-center"
                                >
                                    <Share2 size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Invite Visual Card */}
                        <div className="flex items-center justify-center py-6">
                            <div className="w-[360px] h-[520px] bg-[#0c1220] border-4 border-double border-accent/60 rounded-2xl shadow-2xl relative flex flex-col justify-between p-8 text-center text-slate-100">
                                {/* Watermark square */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.04)_0%,transparent_70%)] pointer-events-none" />
                                
                                {/* Logo header */}
                                <div className="space-y-1">
                                    <img src="/e.mason.svg" alt="Logo" className="h-5 mx-auto grayscale brightness-200 opacity-60" />
                                    <p className="text-[7px] text-accent/60 uppercase tracking-[0.3em] font-black">A.·. G.·. A.·. D.·. U.·.</p>
                                </div>

                                {/* Body convite */}
                                <div className="space-y-6 py-4">
                                    <p className="text-[10px] text-accent uppercase tracking-[0.25em] font-black">S.·. F.·. U.·.</p>
                                    
                                    <div className="space-y-2">
                                        <p className="text-muted-foreground/60 text-[9px] uppercase font-black tracking-widest leading-none">Aos Irmãos da Coluna</p>
                                        <h3 className="text-xl font-bold font-serif italic text-primary leading-tight">
                                            {inviteData.loja}
                                        </h3>
                                    </div>

                                    <div className="w-12 h-0.5 bg-accent/30 mx-auto" />

                                    <div className="space-y-3">
                                        <p className="text-xs text-muted-foreground leading-relaxed px-4">
                                            Temos a honra de convidar os amados irmãos para a nossa próxima sessão ordinária de instrução no grau de:
                                        </p>
                                        <p className="text-base font-black text-accent uppercase tracking-wider">{inviteData.grau}</p>
                                    </div>

                                    <div className="w-12 h-0.5 bg-accent/30 mx-auto" />

                                    {/* Data block */}
                                    <div className="grid grid-cols-2 gap-4 text-center bg-background/40 p-4 rounded-xl border border-border/10">
                                        <div>
                                            <p className="text-[7px] text-muted-foreground uppercase font-black">Data da Sessão</p>
                                            <p className="text-xs font-bold text-slate-200 mt-1">{new Date(inviteData.data + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
                                        </div>
                                        <div>
                                            <p className="text-[7px] text-muted-foreground uppercase font-black">Horário</p>
                                            <p className="text-xs font-bold text-slate-200 mt-1">{inviteData.hora} HS</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-[7px] text-muted-foreground uppercase font-black">Traje Solicitado</p>
                                        <p className="text-[10px] font-bold text-slate-300 mt-1 uppercase tracking-wide">{inviteData.traje}</p>
                                    </div>
                                </div>

                                {/* Footer stamp */}
                                <div className="text-[7px] text-muted-foreground/30 uppercase tracking-[0.2em] font-black border-t border-accent/10 pt-4">
                                    Fraternalmente convidamos • e.mason 2026
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── TAB 5: SECRETARIA ───────────────────────────────────────────── */}
                {activeTab === 'secretaria' && isSecretario && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        {/* Attendance Book */}
                        <div className="bg-[#0e1626] border border-border/40 p-8 rounded-xl space-y-6">
                            <div className="flex justify-between items-center border-b border-border/20 pb-4">
                                <h2 className="text-xl font-bold uppercase tracking-wider text-accent flex items-center gap-2 font-serif italic">
                                    Livro de Presença Digital
                                </h2>
                                <span className="px-3 py-1 bg-accent/10 border border-accent/25 rounded-full text-[9px] font-black uppercase text-accent tracking-wider">
                                    Sessão Aberta
                                </span>
                            </div>

                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Marque a presença dos obreiros participantes na sessão de hoje. Irmãos ausentes sem justificativa serão reportados automaticamente no painel de assiduidade do Venerável Mestre.
                            </p>

                            {attendanceSaved && (
                                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-2 animate-bounce">
                                    <CheckCircle2 size={16} /> Livro de presenças salvo e sincronizado!
                                </div>
                            )}

                            <div className="divide-y divide-border/20">
                                {attendanceList.map(worker => (
                                    <div key={worker.id} className="py-4 flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-slate-200">{worker.nome}</p>
                                            <p className="text-[9px] text-muted-foreground uppercase tracking-widest mt-0.5">{worker.cargo} • CIM #{worker.cCim}</p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={worker.present}
                                            onChange={e => {
                                                const updated = attendanceList.map(w => w.id === worker.id ? { ...w, present: e.target.checked } : w);
                                                setAttendanceList(updated);
                                            }}
                                            className="w-5 h-5 accent-accent border border-border/40 bg-background rounded cursor-pointer"
                                        />
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => {
                                    setAttendanceSaved(true);
                                    setTimeout(() => setAttendanceSaved(false), 3000);
                                }}
                                className="w-full bg-accent hover:bg-accent/90 text-primary font-black py-4 rounded-lg uppercase text-[10px] tracking-[0.2em] transition-all flex items-center justify-center gap-2 active:scale-95"
                            >
                                Sincronizar Frequência Geral
                            </button>
                        </div>

                        {/* Candidate Checklist workflow */}
                        <div className="bg-[#0e1626] border border-border/40 p-8 rounded-xl space-y-6">
                            <h2 className="text-xl font-bold uppercase tracking-wider text-accent border-b border-border/20 pb-4 font-serif italic">
                                Workflow de Candidatos / Sindicância
                            </h2>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Acompanhe o andamento dos processos de iniciação de profanos. Marque os requisitos documentais coletados para avançar ao escrutínio secreto das colunas.
                            </p>

                            <div className="space-y-6">
                                {candidates.map(cand => (
                                    <div key={cand.id} className="bg-background/30 border border-border/20 p-5 rounded-xl space-y-4">
                                        <div className="flex justify-between items-center border-b border-border/10 pb-2">
                                            <h4 className="font-black text-slate-200">{cand.nome}</h4>
                                            <span className={`text-[8px] font-black uppercase px-2.5 py-1 rounded-full ${cand.escrutinio ? 'bg-primary text-primary-foreground border border-white/5' : 'bg-accent/10 text-accent border border-accent/20'}`}>
                                                {cand.escrutinio ? 'Aprovado' : 'Em Triagem'}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                                            <label className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-slate-200 transition">
                                                <input
                                                    type="checkbox"
                                                    checked={cand.sindicancia}
                                                    onChange={e => {
                                                        const updated = candidates.map(c => c.id === cand.id ? { ...c, sindicancia: e.target.checked } : c);
                                                        setCandidates(updated);
                                                    }}
                                                    className="w-4 h-4 accent-accent rounded"
                                                />
                                                Sindicância Feita
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-slate-200 transition">
                                                <input
                                                    type="checkbox"
                                                    checked={cand.certidao}
                                                    onChange={e => {
                                                        const updated = candidates.map(c => c.id === cand.id ? { ...c, certidao: e.target.checked } : c);
                                                        setCandidates(updated);
                                                    }}
                                                    className="w-4 h-4 accent-accent rounded"
                                                />
                                                Certidão Antecedentes
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-slate-200 transition">
                                                <input
                                                    type="checkbox"
                                                    checked={cand.parecer}
                                                    onChange={e => {
                                                        const updated = candidates.map(c => c.id === cand.id ? { ...c, parecer: e.target.checked } : c);
                                                        setCandidates(updated);
                                                    }}
                                                    className="w-4 h-4 accent-accent rounded"
                                                />
                                                Parecer Vigilantes
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-slate-200 transition">
                                                <input
                                                    type="checkbox"
                                                    checked={cand.escrutinio}
                                                    onChange={e => {
                                                        const updated = candidates.map(c => c.id === cand.id ? { ...c, escrutinio: e.target.checked } : c);
                                                        setCandidates(updated);
                                                    }}
                                                    className="w-4 h-4 accent-accent rounded"
                                                />
                                                Aprovado Escrutínio
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ── TAB 6: TESOURARIA ───────────────────────────────────────────── */}
                {activeTab === 'tesouraria' && isTesoureiro && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Lodge Invoices */}
                        <div className="lg:col-span-2 bg-[#0e1626] border border-border/40 p-8 rounded-xl space-y-6">
                            <h2 className="text-xl font-bold uppercase tracking-wider text-accent border-b border-border/20 pb-4 font-serif italic">
                                Cobrança de Mensalidades
                            </h2>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Emita mensalidades e gerencie boletos/chaves PIX dos obreiros para custeio operacional e per capita federativo da oficina.
                            </p>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-muted/10 text-[9px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/20">
                                        <tr>
                                            <th className="px-6 py-4">Obreiro</th>
                                            <th className="px-6 py-4">Referência</th>
                                            <th className="px-6 py-4">Valor</th>
                                            <th className="px-6 py-4 text-right">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/10 text-xs font-semibold">
                                        <tr className="hover:bg-muted/5 transition">
                                            <td className="px-6 py-4">Pierre Simon</td>
                                            <td className="px-6 py-4">Mensalidade Junho</td>
                                            <td className="px-6 py-4 font-bold text-accent">R$ 150,00</td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => alert('Chave PIX gerada para Pierre Simon: 150.00')} className="text-accent hover:underline uppercase text-[9px] font-black tracking-wider">Enviar Cobrança</button>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-muted/5 transition">
                                            <td className="px-6 py-4">Francis Bacon</td>
                                            <td className="px-6 py-4">Mensalidade Junho</td>
                                            <td className="px-6 py-4 font-bold text-accent">R$ 150,00</td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => alert('Chave PIX gerada para Francis Bacon: 150.00')} className="text-accent hover:underline uppercase text-[9px] font-black tracking-wider">Enviar Cobrança</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Hospitalaria Digital Status */}
                        <div className="bg-[#0e1626] border border-border/40 p-8 rounded-xl space-y-6">
                            <h2 className="text-xl font-bold uppercase tracking-wider text-accent border-b border-border/20 pb-4 font-serif italic">
                                Hospitalaria & Solidariedade
                            </h2>
                            <div className="text-center py-6 bg-background/50 border border-border/20 rounded-xl p-6">
                                <Landmark className="text-accent mx-auto mb-3" size={32} />
                                <p className="text-3xl font-black text-slate-100 tracking-tighter">R$ 680,00</p>
                                <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest mt-1">Tronco de Beneficência (Mês Atual)</p>
                            </div>
                            <p className="text-muted-foreground text-xs leading-relaxed">
                                Valores coletados anonimamente através do Tronco de Solidariedade Digital. Estes fundos destinam-se exclusivamente para auxílio de viúvas e irmãos em necessidade.
                            </p>
                            <button
                                onClick={() => setTroncoOpen(true)}
                                className="w-full bg-accent hover:bg-accent/90 text-primary font-black py-4 rounded-lg uppercase text-[10px] tracking-[0.2em] transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md shadow-accent/5"
                            >
                                <Wallet size={14} /> Ativar Tronco Digital
                            </button>
                        </div>
                    </div>
                )}

                {/* ── TAB 7: VENERABILIDADE ───────────────────────────────────────── */}
                {activeTab === 'venerabilidade' && isVeneravel && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Attendance Chart */}
                        <div className="lg:col-span-2 bg-[#0e1626] border border-border/40 p-8 rounded-xl space-y-6">
                            <h2 className="text-xl font-bold uppercase tracking-wider text-accent border-b border-border/20 pb-4 font-serif italic">
                                Assiduidade e Frequência das Colunas
                            </h2>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Gráfico de assiduidade das últimas sessões ordinárias. Monitore a assiduidade global para incentivar o comparecimento às oficinas.
                            </p>

                            {/* SVG Column Chart */}
                            <div className="pt-6">
                                <div className="flex justify-between items-end h-40 gap-4 px-4 bg-[#070b13] p-6 rounded-xl border border-border/10">
                                    {mockAttendance.map(att => (
                                        <div key={att.session} className="flex flex-col items-center flex-grow group relative">
                                            {/* Tooltip */}
                                            <span className="absolute bottom-full mb-2 bg-[#0e1626] text-accent border border-accent/20 text-[10px] font-bold px-2.5 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                {att.rate}%
                                            </span>
                                            {/* Bar */}
                                            <div
                                                style={{ height: `${att.rate}%` }}
                                                className="w-full bg-gradient-to-t from-primary to-accent group-hover:from-accent group-hover:to-primary rounded-t transition-all duration-500"
                                            />
                                            {/* Label */}
                                            <span className="text-[9px] font-black uppercase text-muted-foreground mt-3 tracking-wider">{att.session.split(' ')[1]}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Dormant / Warnings */}
                        <div className="space-y-6">
                            <div className="bg-[#0e1626] border border-border/40 p-8 rounded-xl space-y-6">
                                <h3 className="text-sm font-black text-accent uppercase tracking-widest border-b border-border/20 pb-4 flex items-center gap-2">
                                    <AlertTriangle size={16} /> Obreiros "Adormecidos"
                                </h3>
                                <div className="space-y-4">
                                    {mockDormants.map(dorm => (
                                        <div key={dorm.nome} className="p-4 bg-background/50 border border-border/20 rounded-lg flex justify-between items-center">
                                            <div>
                                                <p className="font-bold text-xs text-slate-200">{dorm.nome}</p>
                                                <p className="text-[9px] text-muted-foreground mt-0.5 uppercase tracking-widest">{dorm.faltas} faltas consecutivas</p>
                                            </div>
                                            <span className="text-[8px] font-black uppercase px-2 py-0.5 bg-accent/10 border border-accent/20 text-accent rounded">
                                                {dorm.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Minutes Approval */}
                            <div className="bg-[#0e1626] border border-border/40 p-8 rounded-xl space-y-6">
                                <h3 className="text-sm font-black text-primary uppercase tracking-widest border-b border-border/20 pb-4">
                                    Aprovação de Atas pendentes
                                </h3>
                                <div className="space-y-3">
                                    <div className="p-4 bg-background/50 border border-border/20 rounded-lg flex justify-between items-center hover:border-accent transition">
                                        <div>
                                            <p className="font-bold text-xs text-slate-200">Ata Ordinária - 26/05/2026</p>
                                            <p className="text-[8px] text-muted-foreground uppercase tracking-widest mt-0.5">Elaborada por: Pierre Simon</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                alert('Ata aprovada e chancelada digitalmente com sucesso!');
                                            }}
                                            className="text-[9px] font-black text-accent border border-accent/20 hover:border-accent hover:bg-accent/5 px-3 py-1.5 rounded uppercase tracking-wider transition-all"
                                        >
                                            Aprovar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* ── MODAL: SOLIDARY PIX (TRONCO SOLIDÁRIO) ────────────────────── */}
            {troncoOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-primary/60 backdrop-blur-md transition-opacity" onClick={() => setTroncoOpen(false)} />

                    <div className="relative w-full max-w-md bg-[#0e1626] border border-accent/30 rounded-2xl shadow-2xl p-8 text-center animate-in fade-in zoom-in duration-300">
                        {/* Gold Trim border */}
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/25 rounded-full text-[9px] font-black text-accent uppercase tracking-widest mb-6">
                            <Sparkles size={12} /> Solidariedade Soberana
                        </div>

                        <h3 className="text-2xl font-black font-serif italic text-primary tracking-tight mb-3">
                            Tronco de Beneficência Digital
                        </h3>
                        <p className="text-muted-foreground text-xs leading-relaxed mb-6 px-4">
                            Faça sua doação de forma totalmente anônima e discreta. O valor será creditado no fundo de solidariedade da Hospitalaria.
                        </p>

                        {/* Pix QR Code Mock */}
                        <div className="w-48 h-48 bg-white border border-accent/20 rounded-xl p-3 mx-auto mb-6 flex items-center justify-center">
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=00020101021126360014br.gov.pix.dict0114emason.solidario.hospitalaria" alt="PIX QR" className="w-full h-full" />
                        </div>

                        {/* PIX Key copy */}
                        <div className="space-y-4">
                            {pixCopied ? (
                                <div className="p-3 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 rounded-lg text-xs font-black uppercase tracking-wider">
                                    Cópia realizada com sucesso!
                                </div>
                            ) : (
                                <button
                                    onClick={handleCopyPix}
                                    className="w-full bg-[#070b13] border border-border/40 hover:border-accent text-slate-300 text-xs font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition"
                                >
                                    Copiar Chave Copia e Cola
                                </button>
                            )}

                            <button
                                onClick={() => setTroncoOpen(false)}
                                className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-black py-4 rounded-lg uppercase text-[10px] tracking-[0.2em] transition-all"
                            >
                                Fechar Tronco
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Subcomponent TabButton helper
interface TabButtonProps {
    label: string;
    icon: React.ComponentType<{ size: number; className?: string }>;
    active: boolean;
    onClick: () => void;
}

function TabButton({ label, icon: Icon, active, onClick }: TabButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2.5 px-5 py-3.5 rounded-xl text-xs font-bold transition-all duration-300 uppercase tracking-wider shrink-0 border border-transparent ${active
                ? 'bg-accent text-primary shadow-lg shadow-accent/20 font-black'
                : 'text-muted-foreground hover:bg-[#0e1626] hover:text-slate-200 border-border/10'
                }`}
        >
            <Icon size={16} className={active ? 'text-primary' : 'text-accent'} /> {label}
        </button>
    );
}
