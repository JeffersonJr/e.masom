import { getSql } from './lib/db.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'placeholder-secret-key';

export default async function handler(req: any, res: any) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'E-mail é obrigatório' });
  }

  try {
    const sql = getSql();

    // 1. Check if user exists
    const users = await sql`
      SELECT id, email FROM public.usuarios 
      WHERE email = ${email.toLowerCase()} LIMIT 1
    `;

    if (users.length === 0) {
      return res.status(200).json({
        message: 'Se o e-mail estiver cadastrado, um protocolo de recuperação foi enviado.'
      });
    }

    const user = users[0];

    // 2. Generate token valid for 15 minutes
    const token = jwt.sign(
      { userId: user.id, email: user.email, purpose: 'reset' },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    return res.status(200).json({
      message: 'Se o e-mail estiver cadastrado, um protocolo de recuperação foi enviado.',
      devLink: `/login?view=reset&token=${token}`
    });
  } catch (error: any) {
    console.error('Forgot password error:', error);
    return res.status(500).json({ error: error.message || 'Erro interno no servidor' });
  }
}
