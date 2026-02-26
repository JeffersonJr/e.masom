/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Session, User } from '@supabase/supabase-js';

interface Profile {
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
}

interface AuthContextType {
    session: Session | null;
    user: User | null;
    profile: Profile | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session) fetchProfile(session.user.id);
            else setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event: string, session: Session | null) => {
            setSession(session);

            if (event === 'PASSWORD_RECOVERY') {
                window.location.href = '/login?view=reset';
            }

            if (session) fetchProfile(session.user.id);
            else {
                setProfile(null);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchProfile = async (userId: string, retries = 5) => {
        console.log('Fetching profile for:', userId, 'Retries left:', retries);
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('perfis')
                .select('*, lojas(slug)')
                .eq('user_id', userId)
                .single();

            if (error) {
                console.error('Profile fetch error:', error);
                throw error;
            }

            if (data) {
                console.log('Profile loaded successfully:', data);
                setProfile(data);
                setLoading(false);
            } else if (retries > 0) {
                console.log('Profile not found, retrying...');
                setTimeout(() => fetchProfile(userId, retries - 1), 1000);
            } else {
                console.log('Profile not found after retries.');
                setLoading(false);
            }
        } catch (error: any) {
            console.error('Fatal profile fetch error:', error);
            if (retries > 0) {
                setTimeout(() => fetchProfile(userId, retries - 1), 1000);
            } else {
                setLoading(false);
            }
        }
    };

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ session, user: session?.user ?? null, profile, loading, signOut }}>
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
