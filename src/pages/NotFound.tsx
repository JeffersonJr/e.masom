
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
            {/* Background Decorative Element */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.769_0.188_70.08_/_0.05)_0%,transparent_70%)] -z-10" />

            <div className="w-24 h-24 bg-primary text-accent rounded-full flex items-center justify-center mb-12 shadow-2xl animate-pulse">
                <Compass size={48} />
            </div>

            <h1 className="text-8xl md:text-[12rem] font-black text-primary leading-none tracking-tighter mb-4 opacity-5 italic font-serif select-none">
                404
            </h1>

            <div className="relative -mt-20 md:-mt-32 z-10">
                <h2 className="text-4xl md:text-6xl font-black text-primary mb-6 tracking-tighter italic font-serif">
                    Caminho <span className="text-accent underline decoration-accent/30 decoration-offset-8">Extraviado.</span>
                </h2>
                <p className="max-w-md mx-auto text-muted-foreground text-lg mb-12 leading-relaxed font-medium italic">
                    Parece que você se afastou das pranchas traçadas. Esta rota não consta em nossos registros de governança.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link
                        to="/"
                        className="px-10 py-4 bg-primary text-primary-foreground font-black rounded-md hover:bg-primary/95 transition-all flex items-center justify-center gap-3 uppercase text-[10px] tracking-[0.3em] active:scale-95 shadow-xl shadow-primary/10"
                    >
                        <ArrowLeft size={16} className="text-accent" /> Retornar à Segurança
                    </Link>
                </div>
            </div>

            <div className="mt-24 text-[10px] font-black text-muted-foreground/20 uppercase tracking-[0.5em]">
                Soberania Digital • e.mason
            </div>
        </div>
    );
}
