import { getSql } from '../lib/db.js';
import bcrypt from 'bcryptjs';
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

  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ error: 'Token e nova senha são obrigatórios' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres' });
  }

  try {
    // 1. Verify reset token
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(400).json({ error: 'Token de recuperação inválido ou expirado' });
    }

    if (decoded.purpose !== 'reset') {
      return res.status(400).json({ error: 'Token inválido para esta operação' });
    }

    const sql = getSql();

    // 2. Hash new password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 3. Update password in DB
    const updateResult = await sql`
      UPDATE public.usuarios 
      SET password_hash = ${passwordHash} 
      WHERE id = ${decoded.userId}
      RETURNING id
    `;

    if (updateResult.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    return res.status(200).json({
      message: 'Sua senha foi atualizada com sucesso.'
    });
  } catch (error: any) {
    console.error('Reset password error:', error);
    return res.status(500).json({ error: error.message || 'Erro interno no servidor' });
  }
}
