import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
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
  console.error('❌ Error: DATABASE_URL is not set.');
  process.exit(1);
}

const sql = neon(databaseUrl);

async function main() {
  console.log('🔄 Cleaning up database and creating admin master user...');

  try {
    // 1. Delete all existing data to start clean
    console.log('🗑️ Deleting existing records from all tables...');
    await sql`DELETE FROM public.leads_sindicancia`;
    await sql`DELETE FROM public.documentos`;
    await sql`DELETE FROM public.perfis`;
    await sql`DELETE FROM public.usuarios`;
    await sql`DELETE FROM public.lojas`;
    await sql`DELETE FROM public.potencias`;
    console.log('✅ All tables cleared.');

    // 2. Create the default Potency
    console.log('🏢 Creating Potência "EVOLVES"...');
    const potencyName = 'Grande Oriente Evolves';
    const potencySigla = 'EVOLVES';
    const domain = 'evolves.site';
    
    const insertPot = await sql`
      INSERT INTO public.potencias (nome, sigla, configuracoes_json, trial_ends_at)
      VALUES (${potencyName}, ${potencySigla}, ${JSON.stringify({ domain })}::jsonb, ${new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()})
      RETURNING id
    `;
    const potencyId = insertPot[0].id;
    console.log(`✅ Potência created with ID: ${potencyId}`);

    // 3. Hash the password
    console.log('🔐 Hashing password...');
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('256398Emason@2026', salt);

    // 4. Create the admin user
    console.log('👤 Creating user account...');
    const insertUser = await sql`
      INSERT INTO public.usuarios (email, password_hash)
      VALUES ('contato@evolves.site', ${passwordHash})
      RETURNING id
    `;
    const userId = insertUser[0].id;
    console.log(`✅ User account created with ID: ${userId}`);

    // 5. Create the profile linked to the potency and user
    console.log('📋 Creating profile...');
    const insertProfile = await sql`
      INSERT INTO public.perfis (user_id, potencia_id, nome, grau, grau_nr, cargo, status)
      VALUES (${userId}, ${potencyId}, 'Jefferson Campos', 'Mestre', 3, 'Grão-Mestre', 'Ativo')
      RETURNING id
    `;
    const profileId = insertProfile[0].id;
    console.log(`✅ Profile created with ID: ${profileId}`);

    console.log('🎉 Admin master user "Jefferson Campos" created successfully!');
    console.log('📧 Email: contato@evolves.site');
    console.log('🔑 Senha: [Configurada]');
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
}

main();
