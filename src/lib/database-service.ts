
import { supabase } from './supabase';

export interface Loja {
    id: string;
    potencia_id: string;
    nome: string;
    numero: string;
    rito: string | null;
    slug: string;
    created_at: string;
}

export interface Obreiro {
    id: string;
    user_id: string;
    nome: string | null;
    loja_id: string | null;
    potencia_id: string | null;
    grau: 'Aprendiz' | 'Companheiro' | 'Mestre';
    cargo: string | null;
    status: 'Ativo' | 'Quiescente' | 'Irregular';
}

export interface Documento {
    id: string;
    loja_id: string | null;
    potencia_id: string | null;
    tipo: 'Ata' | 'Placet' | 'Prancha';
    status: 'Pendente' | 'Aprovado' | 'Rejeitado';
    arquivo_url: string;
    titulo: string;
    created_at: string;
}

export const databaseService = {
    // LOJAS
    async getLojas(potenciaId: string) {
        const { data, error } = await supabase
            .from('lojas')
            .select('*')
            .eq('potencia_id', potenciaId)
            .order('nome');

        if (error) throw error;
        return data as Loja[];
    },

    async createLoja(data: Partial<Loja>) {
        const { data: newLoja, error } = await supabase
            .from('lojas')
            .insert(data)
            .select()
            .single();

        if (error) throw error;
        return newLoja as Loja;
    },

    // OBREIROS
    async getObreiros(potenciaId: string) {
        const { data, error } = await supabase
            .from('perfis')
            .select('*, lojas(nome, numero)')
            .eq('potencia_id', potenciaId)
            .order('nome');

        if (error) throw error;
        return data as (Obreiro & { lojas: { nome: string; numero: string } | null })[];
    },

    // DOCUMENTOS
    async getDocumentos(potenciaId: string) {
        const { data, error } = await supabase
            .from('documentos')
            .select('*, lojas(nome, numero)')
            .eq('potencia_id', potenciaId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as (Documento & { lojas: { nome: string; numero: string } | null })[];
    },

    async updateDocumentStatus(id: string, status: 'Aprovado' | 'Rejeitado') {
        const { data, error } = await supabase
            .from('documentos')
            .update({ status })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    }
};
