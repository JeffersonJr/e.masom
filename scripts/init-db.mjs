import { neon } from '@neondatabase/serverless';
import path from 'path';
import fs from 'fs';

// Load environment variables manually
const loadEnv = (fileName) => {
  const envPath = path.resolve(process.cwd(), fileName);
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx > 0) {
        const key = trimmed.substring(0, eqIdx).trim();
        let val = trimmed.substring(eqIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.substring(1, val.length - 1);
        }
        process.env[key] = val;
      }
    });
  }
};

loadEnv('.env');
loadEnv('.env.local');

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ Error: DATABASE_URL environment variable is not defined.');
  console.log('Please create a .env.local file with: DATABASE_URL="postgresql://..."');
  process.exit(1);
}

const sql = neon(databaseUrl);

async function main() {
  console.log('🔄 Connecting to Neon and creating schema...');

  try {
    // 1. Enable uuid extension
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    console.log('✅ Extension uuid-ossp enabled.');

    // 2. Table: potencias
    await sql`
      CREATE TABLE IF NOT EXISTS public.potencias (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        nome TEXT NOT NULL,
        sigla TEXT NOT NULL,
        slug TEXT UNIQUE,
        logo_url TEXT,
        configuracoes_json JSONB DEFAULT '{}'::jsonb,
        trial_ends_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
      )
    `;
    console.log('✅ Table "potencias" created.');

    // 3. Table: lojas
    await sql`
      CREATE TABLE IF NOT EXISTS public.lojas (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        potencia_id UUID REFERENCES public.potencias(id) ON DELETE CASCADE NOT NULL,
        nome TEXT NOT NULL,
        numero TEXT NOT NULL,
        rito TEXT,
        slug TEXT UNIQUE NOT NULL,
        logo_url TEXT, -- Added for storing base64 logo
        dominio_custom TEXT,
        site_config_json JSONB DEFAULT '{}'::jsonb,
        status TEXT CHECK (status IN ('ativo', 'rascunho', 'arquivado')) DEFAULT 'ativo',
        ano_fundacao INTEGER,
        per_capita_paga BOOLEAN DEFAULT FALSE,
        per_capita_data TIMESTAMP WITH TIME ZONE,
        per_capita_vencimento INTEGER,
        per_capita_valor_obreiro NUMERIC,
        per_capita_historico_json JSONB DEFAULT '[]'::jsonb,
        encontros_json JSONB DEFAULT '[]'::jsonb,
        localizacao_json JSONB DEFAULT '{}'::jsonb,
        membros_json JSONB DEFAULT '{}'::jsonb,
        site_config_json_v2 JSONB DEFAULT '{}'::jsonb,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
      )
    `;
    console.log('✅ Table "lojas" created.');

    // 4. Table: usuarios (Supabase Auth replacement)
    await sql`
      CREATE TABLE IF NOT EXISTS public.usuarios (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
      )
    `;
    console.log('✅ Table "usuarios" created.');

    // 5. Table: perfis
    await sql`
      CREATE TABLE IF NOT EXISTS public.perfis (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID REFERENCES public.usuarios(id) ON DELETE CASCADE UNIQUE NOT NULL,
        loja_id UUID REFERENCES public.lojas(id) ON DELETE SET NULL,
        potencia_id UUID REFERENCES public.potencias(id) ON DELETE SET NULL,
        nome TEXT,
        grau TEXT CHECK (grau IN ('Aprendiz', 'Companheiro', 'Mestre')) DEFAULT 'Aprendiz',
        grau_nr INTEGER DEFAULT 1, -- 1: Aprendiz, 2: Companheiro, 3: Mestre
        cargo TEXT DEFAULT 'Obreiro',
        status TEXT CHECK (status IN ('Ativo', 'Quiescente', 'Irregular')) DEFAULT 'Ativo',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
      )
    `;
    console.log('✅ Table "perfis" created.');

    // 6. Table: documentos
    await sql`
      CREATE TABLE IF NOT EXISTS public.documentos (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        loja_id UUID REFERENCES public.lojas(id) ON DELETE CASCADE,
        potencia_id UUID REFERENCES public.potencias(id) ON DELETE CASCADE,
        tipo TEXT CHECK (tipo IN ('Ata', 'Placet', 'Prancha')),
        status TEXT CHECK (status IN ('Pendente', 'Aprovado', 'Rejeitado')) DEFAULT 'Pendente',
        arquivo_url TEXT NOT NULL,
        titulo TEXT NOT NULL,
        grau_minimo INTEGER DEFAULT 1,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
      )
    `;
    console.log('✅ Table "documentos" created.');

    // 7. Table: leads_sindicancia
    await sql`
      CREATE TABLE IF NOT EXISTS public.leads_sindicancia (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        loja_id UUID REFERENCES public.lojas(id) ON DELETE CASCADE,
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        telefone TEXT,
        mensagem TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
      )
    `;
    console.log('✅ Table "leads_sindicancia" created.');

    console.log('🎉 Neon database schema initialized successfully!');
  } catch (error) {
    console.error('❌ Error initializing database schema:', error);
    process.exit(1);
  }
}

main();
