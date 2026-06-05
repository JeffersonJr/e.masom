 
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface Profile {
    id: string;
    nome: string | null;
    loja_id: string | null;
    potencia_id: string | null;
    grau: string;
    cargo: string;
    status: string;
    lojas?: {
        slug: string;
    } | null;
    potencias?: {
        slug: string;
        trial_ends_at?: string | null;
        configuracoes_json?: {
            plan?: string;
            domain?: string;
            [key: string]: any;
        } | null;
    } | null;
}

export interface User {
    id: string;
    email: string;
}

export interface Session {
    user: User;
    token: string;
}

interface AuthContextType {
    session: Session | null;
    user: User | null;
    profile: Profile | null;
    loading: boolean;
    signOut: () => Promise<void>;
    signIn: (token: string, user: User, profile: Profile) => void;
    updateProfile: (profileData: Profile) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('emason_token');
        if (!token) {
            setLoading(false);
            return;
        }

        // Fetch user session using the JWT token
        fetchProfile(token);
    }, []);

    const fetchProfile = async (token: string) => {
        try {
            const res = await fetch('/api/auth/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!res.ok) {
                throw new Error('Sessão expirada ou inválida');
            }

            const data = await res.json();
            setSession({ token, user: data.user });
            setProfile(data.profile);
        } catch (error) {
            console.error('Session restore error:', error);
            // Clear invalid session
            localStorage.removeItem('emason_token');
            setSession(null);
            setProfile(null);
        } finally {
            setLoading(false);
        }
    };

    const signIn = (token: string, user: User, profileData: Profile) => {
        localStorage.setItem('emason_token', token);
        setSession({ token, user });
        setProfile(profileData);
    };

    const updateProfile = (profileData: Profile) => {
        setProfile(profileData);
    };

    const signOut = async () => {
        localStorage.removeItem('emason_token');
        setSession(null);
        setProfile(null);
    };

    return (
        <AuthContext.Provider value={{ session, user: session?.user ?? null, profile, loading, signOut, signIn, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
