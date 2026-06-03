import { neon } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';

// Load environment variables manually
const envPath = path.resolve(process.cwd(), '.env');
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

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

const sql = neon(databaseUrl);

async function check() {
  try {
    const users = await sql`SELECT id, email, created_at FROM public.usuarios`;
    console.log('--- Users ---');
    console.log(JSON.stringify(users, null, 2));
    
    const potencies = await sql`SELECT id, nome, sigla, trial_ends_at FROM public.potencias`;
    console.log('--- Potencies ---');
    console.log(JSON.stringify(potencies, null, 2));
  } catch (error) {
    console.error('Error querying database:', error);
  }
}

check();
