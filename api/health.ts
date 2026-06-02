import { neon } from '@neondatabase/serverless';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      return res.status(500).json({ status: 'error', message: 'DATABASE_URL not set' });
    }
    const sql = neon(databaseUrl);
    const result = await sql`SELECT NOW() as time, current_database() as db`;
    return res.status(200).json({
      status: 'ok',
      database: result[0].db,
      time: result[0].time,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
      stack: error.stack,
    });
  }
}
