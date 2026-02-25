
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
            if (profile.potencia_id && !profile.loja_id) {
                navigate('/admin');
                return;
            }

            // Priority 2: Lodge Admin/Member
            if (profile.loja_id) {
                // For now, we use a placeholder slug if we don't have it in profile
                // Ideally, profile should contain the slug or we fetch it.
                // Assuming "loja-padrao" as fallback for now to avoid break
                navigate('/dashboard/view');
                return;
            }

            // Fallback: If no specific role is found but has profile
            navigate('/');
        } else {
            // If logged in but no profile yet (shouldn't happen with trigger)
            navigate('/');
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
