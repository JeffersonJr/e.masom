
import { supabase } from './supabase';

export interface Loja {
    id: string;
    potencia_id: string;
    nome: string;
    numero: string;
    rito: string | null;
    slug: string;
    logo_url: string | null;
    status: 'ativo' | 'rascunho' | 'arquivado';
    ano_fundacao: number | null;
    per_capita_paga: boolean | null;
    per_capita_data: string | null; // ISO date YYYY-MM-DD
    per_capita_vencimento: number | null; // 1-31
    per_capita_valor_obreiro: number | null;
    per_capita_historico_json: {
        mes: string; // YYYY-MM
        status: 'pago' | 'pago com atraso' | 'em atraso' | 'pendente';
        data_pagamento: string | null;
        valor_pago: number;
        total_membros: number;
    }[] | null;
    encontros_json: {
        dia: string;
        horario: string;
        tipo: string;
        frequencia?: string;
    }[] | null;
    localizacao_json: {
        cidade?: string;
        estado?: string;
        cep?: string;
        logradouro?: string;
        numero_end?: string;
        bairro?: string;
        complemento?: string;
    } | null;
    membros_json: {
        veneravel?: { nome: string; email?: string };
        veneravel_id?: string; // compat formato antigo
        cargos?: { nome: string; email?: string; cargo: string }[];
        irmaos?: ({ nome: string; email?: string } | string)[];
    } | null;
    site_config_json: any | null;
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
    // ── LOJAS ──────────────────────────────────────────────────────────────────
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

    async updateLoja(id: string, data: Partial<Loja>) {
        const { data: updated, error } = await supabase
            .from('lojas')
            .update(data)
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return updated as Loja;
    },

    async archiveLoja(id: string) {
        const { error } = await supabase
            .from('lojas')
            .update({ status: 'arquivado' })
            .eq('id', id);
        if (error) throw error;
    },

    async activateLoja(id: string) {
        const { error } = await supabase
            .from('lojas')
            .update({ status: 'ativo' })
            .eq('id', id);
        if (error) throw error;
    },

    async deleteLoja(id: string) {
        const { error } = await supabase
            .from('lojas')
            .delete()
            .eq('id', id);
        if (error) throw error;
    },

    async updateLojaMeta(id: string, data: {
        per_capita_paga?: boolean;
        per_capita_data?: string | null;
        per_capita_vencimento?: number | null;
        per_capita_valor_obreiro?: number | null;
        per_capita_historico_json?: Loja['per_capita_historico_json'];
        encontros_json?: Loja['encontros_json'];
    }) {
        const { error } = await supabase
            .from('lojas')
            .update(data)
            .eq('id', id);
        if (error) throw error;
    },

    // ── OBREIROS ───────────────────────────────────────────────────────────────
    async getObreiros(potenciaId: string) {
        const { data, error } = await supabase
            .from('perfis')
            .select('*, lojas(nome, numero)')
            .eq('potencia_id', potenciaId)
            .order('nome');
        if (error) throw error;
        return data as (Obreiro & { lojas: { nome: string; numero: string } | null })[];
    },

    async getObreirosByPotencia(potenciaId: string) {
        const { data, error } = await supabase
            .from('perfis')
            .select('id, nome, cargo, grau, status')
            .eq('potencia_id', potenciaId)
            .eq('status', 'Ativo')
            .order('nome');
        if (error) throw error;
        return data as Pick<Obreiro, 'id' | 'nome' | 'cargo' | 'grau' | 'status'>[];
    },

    // ── DOCUMENTOS ─────────────────────────────────────────────────────────────
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
    },
};
