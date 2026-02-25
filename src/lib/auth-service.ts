
import { supabase } from './supabase';

export interface TrialSignupData {
    name: string;
    email: string;
    password: string;
    potencyName: string;
}

export const authService = {
    async signupTrial(data: TrialSignupData) {
        const domain = data.email.split('@')[1].toLowerCase();

        // 1. Check if Potency exists for this domain
        let { data: existingPotency } = await supabase
            .from('potencias')
            .select('id')
            .eq('sigla', domain.split('.')[0].toUpperCase())
            .single();

        let potencyId;

        if (!existingPotency) {
            const { data: newPotency, error: potencyError } = await supabase
                .from('potencias')
                .insert({
                    nome: data.potencyName,
                    sigla: domain.split('.')[0].toUpperCase(),
                    configuracoes_json: { domain: domain }
                })
                .select()
                .single();

            if (potencyError) throw potencyError;
            potencyId = newPotency.id;
        } else {
            potencyId = existingPotency.id;
        }

        // 2. Sign up the user with metadata (trigger will handle profile)
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
                data: {
                    full_name: data.name,
                    potencia_id: potencyId,
                    cargo: 'Grão-Mestre'
                }
            }
        });

        if (authError) throw authError;
        if (!authData.user) throw new Error('Falha ao criar usuário.');

        return authData;
    }
};
