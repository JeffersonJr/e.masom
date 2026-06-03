import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      return res.status(500).json({ status: 'error', message: 'DATABASE_URL not set' });
    }

    // Test bcryptjs
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('test', salt);
    const bcryptOk = await bcrypt.compare('test', hash);

    // Test jsonwebtoken
    const token = jwt.sign({ test: true }, 'secret', { expiresIn: '1h' });
    const decoded = jwt.verify(token, 'secret');

    const sql = neon(databaseUrl);
    const result = await sql`SELECT NOW() as time, current_database() as db`;
    return res.status(200).json({
      status: 'ok',
      database: result[0].db,
      time: result[0].time,
      bcryptOk,
      jwtOk: !!decoded,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
      stack: error.stack,
    });
  }
}
