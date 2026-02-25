

import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requirePotencia?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requirePotencia = false }) => {
    const { session, profile, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="animate-spin text-mason-green" size={40} />
            </div>
        );
    }

    if (!session) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requirePotencia && !profile?.potencia_id) {
        // If they don't have a profile yet, but loading is over, they aren't an admin.
        return <Navigate to="/dashboard" replace />;
    }

    // If it's a lodge route, we could add lodge_id check here too if needed

    return <>{children}</>;
};

export default ProtectedRoute;
