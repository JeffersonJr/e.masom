
import { useParams } from 'react-router-dom';

export default function LodgeDashboard() {
    const { lodgeSlug } = useParams();

    return (
        <div className="p-10 space-y-12 bg-background min-h-screen">
            <header className="border-b border-border pb-10">
                <h1 className="text-5xl font-black text-primary tracking-tighter leading-none mb-4 italic font-serif uppercase">Painel da Oficina</h1>
                <p className="text-muted-foreground font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent rounded-full" />
                    Identificação: <span className="text-primary font-bold">{lodgeSlug}</span>
                </p>
            </header>
            <div className="bg-background border border-border p-8 rounded-xl shadow-sm hover:border-accent/40 transition-all group">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4">status da gestão</p>
                <p className="text-primary font-medium text-lg leading-relaxed">
                    Bem-vindo ao centro de comando da sua oficina. Gerencie membros, tesouraria e documentos com a soberania e discrição necessárias.
                </p>
            </div>
        </div>
    );
}
