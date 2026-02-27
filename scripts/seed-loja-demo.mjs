/**
 * Script para inserir uma loja de demonstração com todos os dados mockados.
 * Rode: node scripts/seed-loja-demo.mjs
 */

const SUPABASE_URL = 'https://uhavtorvptwgckouvvrc.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_rLypfosL1EXA-RFDT9Vabg_0w6n7CuI';

const headers = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
};

// 1. Buscar primeira potência existente
const potRes = await fetch(`${SUPABASE_URL}/rest/v1/potencias?select=id,nome&limit=1`, { headers });
const potencias = await potRes.json();

if (!potencias.length) {
    console.error('❌ Nenhuma potência encontrada. Crie uma potência primeiro.');
    process.exit(1);
}

const potencia = potencias[0];
console.log(`✅ Usando potência: ${potencia.nome} (${potencia.id})`);

// 2. site_config armazena todos os dados extras como JSON
const siteConfig = {
    // Dados identity
    ano_fundacao: 1958,
    rito: 'Emulação',
    descricao: 'Loja maçônica fundada em 1958, praticante do Rito de Emulação, com forte tradição fraterna e filosófica no coração de São Paulo.',

    // Localização
    localizacao: {
        logradouro: 'Rua das Acácias',
        numero_end: '123',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01310-100',
        complemento: 'Sala 301 — Ed. Maçônico',
    },

    // Membros e diretoria
    membros: {
        veneravel: {
            nome: 'Ir. Jefferson Silva',
            email: 'jefferson.silva@gmail.com',
        },
        cargos: [
            { cargo: 'Past Master', nome: 'Ir. Roberto Almeida', email: 'roberto@gmail.com' },
            { cargo: '1º Vigilante', nome: 'Ir. Carlos Mendes', email: 'carlos@gmail.com' },
            { cargo: '2º Vigilante', nome: 'Ir. Paulo Ferreira', email: 'paulo@gmail.com' },
            { cargo: 'Orador', nome: 'Ir. André Costa', email: 'andre@gmail.com' },
            { cargo: 'Secretário', nome: 'Ir. Marcos Lima', email: 'marcos@gmail.com' },
            { cargo: 'Tesoureiro', nome: 'Ir. Ricardo Souza', email: 'ricardo@gmail.com' },
            { cargo: 'Hospitaleiro', nome: 'Ir. Fernando Nunes', email: 'fernando@gmail.com' },
            { cargo: 'Chanceler', nome: 'Ir. Rafael Barbosa', email: 'rafael@gmail.com' },
        ],
        irmaos: [
            { nome: 'Ir. Lucas Pereira' },
            { nome: 'Ir. Gabriel Torres' },
            { nome: 'Ir. Bruno Carvalho' },
            { nome: 'Ir. Diego Rocha' },
            { nome: 'Ir. Thiago Nascimento' },
            { nome: 'Ir. Vitor Oliveira' },
            { nome: 'Ir. Eduardo Martins' },
            { nome: 'Ir. Fábio Gomes' },
            { nome: 'Ir. Henrique Correia' },
            { nome: 'Ir. Igor Santos' },
            { nome: 'Ir. Leandro Pinto' },
            { nome: 'Ir. Mauro Castro' },
        ],
    },

    // Agenda de sessões (definida pela própria loja)
    encontros: [
        { dia: 'Terça-feira', horario: '20:00', tipo: 'Administrativa', descricao: '1ª e 3ª Terças do mês' },
        { dia: 'Terça-feira', horario: '20:00', tipo: 'Instrução', descricao: '2ª Terça do mês' },
        { dia: 'Quinta-feira', horario: '19:30', tipo: 'Filosófica', descricao: '4ª Quinta do mês' },
    ],

    // Financeiro
    per_capita: {
        pago: true,
        data: '2025-03-01',
        valor: 240.0,
    },

    // Contato
    contato: {
        email: 'secretaria@fraternidadeeluz77.org.br',
        telefone: '(11) 3210-4567',
        whatsapp: '+5511999887766',
    },
};

const enderecoStr = 'Rua das Acácias, 123 — Sala 301, Centro, São Paulo/SP';

const lojaDemo = {
    potencia_id: potencia.id,
    nome: 'Loja Fraternidade e Luz Nº 77',
    numero: '77',
    slug: 'fraternidade-e-luz-77',
    rito: 'Emulação',
    endereco: enderecoStr,
    status: 'ativo',
    site_config: siteConfig,
};

// 3. Verificar se loja já existe (por slug)
const checkRes = await fetch(`${SUPABASE_URL}/rest/v1/lojas?slug=eq.fraternidade-e-luz-77&select=id`, { headers });
const existing = await checkRes.json();

if (existing.length) {
    console.log('⚠️  Loja já existe. Atualizando...');
    const upRes = await fetch(`${SUPABASE_URL}/rest/v1/lojas?id=eq.${existing[0].id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(lojaDemo),
    });
    const upText = await upRes.text();
    if (!upRes.ok) {
        console.error('❌ Erro ao atualizar:', upText);
        process.exit(1);
    }
    console.log('✅ Loja atualizada com sucesso!');
} else {
    const insRes = await fetch(`${SUPABASE_URL}/rest/v1/lojas`, {
        method: 'POST',
        headers,
        body: JSON.stringify(lojaDemo),
    });
    const insText = await insRes.text();
    if (!insRes.ok) {
        console.error('❌ Erro ao inserir:', insText);
        process.exit(1);
    }
    console.log('✅ Loja inserida com sucesso!');
    console.log(insText);
}

console.log('\n📍 Slug: fraternidade-e-luz-77');
console.log('🌐 URL pública: /fraternidade-e-luz-77');
console.log('📅 Encontros: Terças (20h) e Quintas (19h30)');
console.log('👥 Membros: 1 Venerável + 8 cargos + 12 irmãos = 21 membros');
