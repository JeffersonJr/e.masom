import { getSql } from './lib/db.js';
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

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
  }

  try {
    const sql = getSql();

    // 1. Get user by email
    const users = await sql`
      SELECT id, email, password_hash FROM public.usuarios 
      WHERE email = ${email.toLowerCase()} LIMIT 1
    `;

    if (users.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const user = users[0];

    // 2. Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // 3. Get profile associated with this user
    const profiles = await sql`
      SELECT p.*, l.slug as loja_slug, po.slug as potencia_slug 
      FROM public.perfis p
      LEFT JOIN public.lojas l ON p.loja_id = l.id
      LEFT JOIN public.potencias po ON p.potencia_id = po.id
      WHERE p.user_id = ${user.id} LIMIT 1
    `;

    if (profiles.length === 0) {
      return res.status(404).json({ error: 'Perfil não encontrado para este usuário' });
    }

    const profile = profiles[0];

    // 4. Sign JWT
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        potencyId: profile.potencia_id, 
        profileId: profile.id 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      token,
      user: { id: user.id, email: user.email },
      profile: {
        id: profile.id,
        nome: profile.nome,
        loja_id: profile.loja_id,
        potencia_id: profile.potencia_id,
        grau: profile.grau,
        cargo: profile.cargo,
        status: profile.status,
        lojas: profile.loja_slug ? { slug: profile.loja_slug } : null,
        potencias: profile.potencia_slug ? { slug: profile.potencia_slug } : null
      }
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return res.status(500).json({ error: error.message || 'Erro interno no servidor' });
  }
}
