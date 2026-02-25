import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import NotFound from './NotFound';
import { Loader2 } from 'lucide-react';

export default function LodgePublic() {
    const { lodgeSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [lodgeData, setLodgeData] = useState<any>(null);

    useEffect(() => {
        async function checkLodge() {
            setLoading(true);
            const { data, error } = await supabase
                .from('lojas')
                .select('*, potencias(nome)')
                .eq('slug', lodgeSlug)
                .single();

            if (data && !error) {
                setLodgeData(data);
            }
            setLoading(false);
        }
        checkLodge();
    }, [lodgeSlug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="animate-spin text-accent" size={48} />
            </div>
        );
    }

    if (!lodgeData) {
        return <NotFound />;
    }

    return (
        <div className="min-h-screen bg-background text-left">
            <section className="bg-primary pt-32 pb-48 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,oklch(0.769_0.188_70.08_/_0.1)_0%,transparent_50%)]" />
                <div className="relative z-10">
                    <h1 className="text-6xl md:text-8xl font-black text-primary-foreground mb-8 tracking-tighter leading-none uppercase italic font-serif">A.R.L.S. {lodgeData.nome}</h1>
                    <p className="text-accent font-black uppercase tracking-[0.4em] text-xs">Federada ao {lodgeData.potencias?.nome || 'Grão-Mestrado'}</p>
                </div>
            </section>

            <section className="max-w-4xl mx-auto -mt-24 px-6 relative z-20 pb-32">
                <div className="bg-background border border-border p-12 md:p-16 rounded-xl shadow-2xl">
                    <h2 className="text-3xl md:text-4xl font-black text-primary mb-10 tracking-tighter italic font-serif">Sindicância de Ingresso</h2>
                    <p className="text-muted-foreground mb-12 font-medium leading-relaxed">Manifeste seu interesse em conhecer nossa instituição. Os dados fornecidos serão tratados com o devido sigilo.</p>

                    <form className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Nome Completo</label>
                                <input type="text" className="w-full px-6 py-4 bg-muted/20 border border-border rounded-md focus:border-accent focus:ring-1 focus:ring-accent outline-none font-medium transition-all" placeholder="Como consta no Registro Civil" />
                            </div>
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">E-mail de Contato</label>
                                <input type="email" className="w-full px-6 py-4 bg-muted/20 border border-border rounded-md focus:border-accent focus:ring-1 focus:ring-accent outline-none font-medium transition-all" placeholder="contato@exemplo.com" />
                            </div>
                        </div>
                        <button type="submit" className="w-full py-5 bg-primary text-primary-foreground font-black rounded-md hover:bg-primary/95 transition-all shadow-xl shadow-primary/10 uppercase text-[11px] tracking-[0.3em] active:scale-[0.98]">
                            Enviar Solicitação de Sindicância
                        </button>
                    </form>
                    <p className="mt-8 text-center text-[10px] text-muted-foreground font-medium uppercase tracking-widest">A Maçonaria não faz convites. O interesse deve partir do livre arbítrio.</p>
                </div>
            </section>
        </div>
    );
}
