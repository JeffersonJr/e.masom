
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export default function DashRedirect() {
    const { profile, loading, session } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;

        if (!session) {
            navigate('/login');
            return;
        }

        if (profile) {
            // Priority 1: Master Admin (Potência)
            // If they have a potency_id, they are likely a potency-level admin
            if (profile.potencia_id && (!profile.loja_id || profile.cargo === 'Grão-Mestre' || profile.cargo === 'Secretário Geral')) {
                navigate('/admin');
                return;
            }

            // Priority 2: Lodge Admin/Member
            if (profile.loja_id) {
                if (profile.lojas?.slug) {
                    navigate(`/${profile.lojas.slug}/dashboard`);
                } else {
                    if (profile.potencia_id) navigate('/admin');
                    else navigate('/');
                }
                return;
            }

            // Fallback: If no specific role is found but has profile
            navigate('/');
        } else if (!loading && session) {
            // Stay in loading state for 5 seconds while AuthContext retries profile fetch
            const timer = setTimeout(() => {
                if (!profile) {
                    navigate('/');
                }
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [profile, loading, session, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
                <Loader2 className="animate-spin text-accent mx-auto mb-4" size={40} />
                <p className="text-muted-foreground font-medium uppercase tracking-[0.2em] text-[10px]">
                    Sincronizando Sessão...
                </p>
            </div>
        </div>
    );
}
