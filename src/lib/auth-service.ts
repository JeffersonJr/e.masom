
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

        // 1. Sign up the user
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
                data: {
                    full_name: data.name,
                }
            }
        });

        if (authError) throw authError;
        if (!authData.user) throw new Error('Falha ao criar usuário.');

        // 2. Check if Potency exists for this domain
        // Note: The potency table doesn't have a domain field yet. We should add it or use sigla.
        // For the purpose of this task, we will create a new potency per signup or map by domain.

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

        // 3. Update Profile (trigger creates it, we link it)
        const { error: profileError } = await supabase
            .from('perfis')
            .update({
                potencia_id: potencyId,
                cargo: 'Grão-Mestre', // First user of instance
                status: 'Ativo'
            })
            .eq('user_id', authData.user.id);

        if (profileError) throw profileError;

        return authData;
    }
};
