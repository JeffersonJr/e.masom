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
  process.exit(1);
}

const sql = neon(databaseUrl);

async function main() {
  const migrationFile = process.argv[2] || 'supabase/migrations/20260603000000_production_migrations.sql';
  console.log(`🔄 Running database migration: ${migrationFile} on Neon...`);
  const migrationPath = path.resolve(process.cwd(), migrationFile);
  
  if (!fs.existsSync(migrationPath)) {
    console.error('❌ Migration file not found at:', migrationPath);
    process.exit(1);
  }

  const queriesContent = fs.readFileSync(migrationPath, 'utf8');

  try {
    // Split the SQL file queries by semicolon to execute them sequentially
    const queries = queriesContent.split(';').map(q => q.trim()).filter(q => q.length > 0);
    
    for (const q of queries) {
      console.log(`Executing: ${q.substring(0, 50)}...`);
      await sql.query(q);
    }
    console.log('🎉 Database migrations executed successfully!');
  } catch (error) {
    console.error('❌ Migration run failed:', error);
    process.exit(1);
  }
}

main();
