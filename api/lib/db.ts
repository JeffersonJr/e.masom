import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn('Warning: DATABASE_URL is not set in environment variables.');
}

// Exports the Neon serverless SQL client
export const sql = neon(databaseUrl || 'postgresql://placeholder:placeholder@localhost:5432/placeholder');
