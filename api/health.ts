import { getSql } from './lib/db';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const sql = getSql();
    const result = await sql`SELECT NOW() as time, current_database() as db`;
    return res.status(200).json({
      status: 'ok',
      database: result[0].db,
      time: result[0].time,
      env: {
        hasDbUrl: !!process.env.DATABASE_URL,
        hasJwtSecret: !!process.env.JWT_SECRET,
      }
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
      env: {
        hasDbUrl: !!process.env.DATABASE_URL,
        hasJwtSecret: !!process.env.JWT_SECRET,
      }
    });
  }
}
