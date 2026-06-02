import { getSql } from '../lib/db';
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

  const { name, email, password, potencyName } = req.body;

  if (!email || !password || !name || !potencyName) {
    return res.status(400).json({ error: 'Faltam dados obrigatórios' });
  }

  try {
    const sql = getSql();
    const domain = email.split('@')[1].toLowerCase();
    const potencySigla = domain.split('.')[0].toUpperCase();

    // 1. Check if potency exists
    const potRes = await sql`
      SELECT id FROM public.potencias WHERE sigla = ${potencySigla} LIMIT 1
    `;

    let potencyId: string;

    if (potRes.length === 0) {
      // Create new potency
      const trialEndsAt = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString();
      const potSlug = potencySigla.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const insertPot = await sql`
        INSERT INTO public.potencias (nome, sigla, slug, configuracoes_json, trial_ends_at)
        VALUES (${potencyName}, ${potencySigla}, ${potSlug}, ${JSON.stringify({ domain })}::jsonb, ${trialEndsAt})
        RETURNING id
      `;
      potencyId = insertPot[0].id;
    } else {
      potencyId = potRes[0].id;
    }

    // 2. Check if user already exists
    const userRes = await sql`
      SELECT id FROM public.usuarios WHERE email = ${email.toLowerCase()} LIMIT 1
    `;

    if (userRes.length > 0) {
      return res.status(400).json({ error: 'Este e-mail já está cadastrado' });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 4. Create user
    const insertUser = await sql`
      INSERT INTO public.usuarios (email, password_hash)
      VALUES (${email.toLowerCase()}, ${passwordHash})
      RETURNING id
    `;
    const userId = insertUser[0].id;

    // 5. Create profile (linked to potency and user)
    const insertProfile = await sql`
      INSERT INTO public.perfis (user_id, potencia_id, nome, grau, grau_nr, cargo, status)
      VALUES (${userId}, ${potencyId}, ${name}, 'Aprendiz', 1, 'Grão-Mestre', 'Ativo')
      RETURNING id
    `;
    const profileId = insertProfile[0].id;

    // 6. Sign JWT
    const token = jwt.sign(
      { userId, email: email.toLowerCase(), potencyId, profileId },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      token,
      user: { id: userId, email },
      profile: {
        id: profileId,
        nome: name,
        potencia_id: potencyId,
        grau: 'Aprendiz',
        cargo: 'Grão-Mestre',
        status: 'Ativo'
      }
    });
  } catch (error: any) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: error.message || 'Erro interno no servidor' });
  }
}
