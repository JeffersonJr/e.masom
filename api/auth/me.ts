import { sql } from '../lib/db.js';
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

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido ou inválido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // 1. Verify token
    const decoded: any = jwt.verify(token, JWT_SECRET);

    // 2. Fetch user profile
    const profiles = await sql`
      SELECT p.*, l.slug as loja_slug, po.slug as potencia_slug 
      FROM public.perfis p
      LEFT JOIN public.lojas l ON p.loja_id = l.id
      LEFT JOIN public.potencias po ON p.potencia_id = po.id
      WHERE p.id = ${decoded.profileId} LIMIT 1
    `;

    if (profiles.length === 0) {
      return res.status(404).json({ error: 'Perfil não encontrado' });
    }

    const profile = profiles[0];

    return res.status(200).json({
      user: { id: decoded.userId, email: decoded.email },
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
    console.error('Session verify error:', error);
    return res.status(401).json({ error: 'Sessão inválida ou expirada' });
  }
}
