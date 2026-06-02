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

const getHeaders = () => {
    const token = localStorage.getItem('emason_token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

export const databaseService = {
    // ── LOJAS ──────────────────────────────────────────────────────────────────
    async getLojas(potenciaId: string) {
        const res = await fetch(`/api/lojas?potenciaId=${potenciaId}`, {
            headers: getHeaders()
        });
        if (!res.ok) throw new Error('Falha ao buscar lojas');
        return await res.json() as Loja[];
    },

    async createLoja(data: Partial<Loja>) {
        const res = await fetch('/api/lojas', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Falha ao criar loja');
        return await res.json() as Loja;
    },

    async updateLoja(id: string, data: Partial<Loja>) {
        const res = await fetch(`/api/lojas?id=${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Falha ao atualizar loja');
        return await res.json() as Loja;
    },

    async archiveLoja(id: string) {
        const res = await fetch(`/api/lojas?id=${id}`, {
            method: 'PATCH',
            headers: getHeaders(),
            body: JSON.stringify({ status: 'arquivado' })
        });
        if (!res.ok) throw new Error('Falha ao arquivar loja');
    },

    async activateLoja(id: string) {
        const res = await fetch(`/api/lojas?id=${id}`, {
            method: 'PATCH',
            headers: getHeaders(),
            body: JSON.stringify({ status: 'ativo' })
        });
        if (!res.ok) throw new Error('Falha ao ativar loja');
    },

    async deleteLoja(id: string) {
        const res = await fetch(`/api/lojas?id=${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (!res.ok) throw new Error('Falha ao excluir loja');
    },

    async updateLojaMeta(id: string, data: {
        per_capita_paga?: boolean;
        per_capita_data?: string | null;
        per_capita_vencimento?: number | null;
        per_capita_valor_obreiro?: number | null;
        per_capita_historico_json?: Loja['per_capita_historico_json'];
        encontros_json?: Loja['encontros_json'];
    }) {
        const res = await fetch(`/api/lojas?id=${id}`, {
            method: 'PATCH',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Falha ao atualizar metadados da loja');
    },

    // ── OBREIROS ───────────────────────────────────────────────────────────────
    async getObreiros(potenciaId: string) {
        const res = await fetch(`/api/obreiros?potenciaId=${potenciaId}`, {
            headers: getHeaders()
        });
        if (!res.ok) throw new Error('Falha ao buscar obreiros');
        return await res.json() as (Obreiro & { lojas: { nome: string; numero: string } | null })[];
    },

    async getObreirosByPotencia(potenciaId: string) {
        const res = await fetch(`/api/obreiros?potenciaId=${potenciaId}&status=Ativo`, {
            headers: getHeaders()
        });
        if (!res.ok) throw new Error('Falha ao buscar obreiros da potência');
        return await res.json() as Pick<Obreiro, 'id' | 'nome' | 'cargo' | 'grau' | 'status'>[];
    },

    // ── DOCUMENTOS ─────────────────────────────────────────────────────────────
    async getDocumentos(potenciaId: string) {
        const res = await fetch(`/api/documentos?potenciaId=${potenciaId}`, {
            headers: getHeaders()
        });
        if (!res.ok) throw new Error('Falha ao buscar documentos');
        return await res.json() as (Documento & { lojas: { nome: string; numero: string } | null })[];
    },

    async updateDocumentStatus(id: string, status: 'Aprovado' | 'Rejeitado') {
        const res = await fetch(`/api/documentos?id=${id}`, {
            method: 'PATCH',
            headers: getHeaders(),
            body: JSON.stringify({ status })
        });
        if (!res.ok) throw new Error('Falha ao atualizar status do documento');
        return await res.json();
    },
};
