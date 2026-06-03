import { getSql } from './lib/db.js';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const sql = getSql();
    const result = await sql`SELECT 1 as test`;
    return res.status(200).json({ status: 'ok', importOk: true, result });
  } catch (error: any) {
    return res.status(500).json({ status: 'error', error: error.message });
  }
}
