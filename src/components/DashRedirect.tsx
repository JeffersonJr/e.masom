
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export default function DashRedirect() {
    const { profile, loading, session } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('DashRedirect State:', { profile, loading, session });

        if (loading) return;

        if (!session) {
            console.log('No session, redirecting to /login');
            navigate('/login');
            return;
        }

        if (profile) {
            console.log('Profile found:', profile);
            // Priority 1: Master Admin (Potência)
            if (profile.potencia_id && (!profile.loja_id || profile.cargo === 'Grão-Mestre' || profile.cargo === 'Secretário Geral' || profile.cargo === 'Administrador Master')) {
                console.log('Redirecting to /admin');
                navigate('/admin');
                return;
            }

            // Priority 2: Lodge Admin/Member
            if (profile.loja_id) {
                if (profile.lojas?.slug) {
                    console.log('Redirecting to lodge dashboard:', profile.lojas.slug);
                    navigate(`/${profile.lojas.slug}/dashboard`);
                } else {
                    console.log('Lodge ID exists but no slug, fallback to /admin or /');
                    if (profile.potencia_id) navigate('/admin');
                    else navigate('/');
                }
                return;
            }

            // Fallback: If no specific role is found but has profile
            console.log('Fallback to /, no specific route found for profile');
            navigate('/');
        } else if (!loading && session) {
            console.log('Session exists but no profile, waiting 5s...');
            // Stay in loading state for 5 seconds while AuthContext retries profile fetch
            const timer = setTimeout(() => {
                if (!profile) {
                    console.log('Profile fetch timeout, redirecting to /');
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
