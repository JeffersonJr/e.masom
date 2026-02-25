import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('seu-projeto')) {
    console.warn('Supabase: URL ou Anon Key não configurados corretamente. Verifique o arquivo .env.local');
}

// Inicializa o cliente mesmo se estiver faltando dados para evitar erro de runtime no import
// Em caso de falta de dados, as chamadas às APIs do Supabase falharão, mas a UI irá renderizar.
export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder'
);

