import { neon } from '@neondatabase/serverless';
import jwt from 'jsonwebtoken';
import { emailService } from '../lib/email-service.js';

const JWT_SECRET = process.env.JWT_SECRET || 'placeholder-secret-key';

let _sql: any = null;
function getSql() {
  if (!_sql) {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not set.');
    }
    _sql = neon(databaseUrl);
  }
  return _sql;
}

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

  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido ou inválido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const sql = getSql();

    // 1. Verify token
    const decoded: any = jwt.verify(token, JWT_SECRET);

    const { planName } = req.body;
    if (!planName || !['Aprendiz', 'Companheiro', 'Mestre'].includes(planName)) {
      return res.status(400).json({ error: 'Plano inválido ou não fornecido' });
    }

    // 2. Fetch potency and verify user belongs to it
    const potencies = await sql`
      SELECT * FROM public.potencias WHERE id = ${decoded.potencyId} LIMIT 1
    `;

    if (potencies.length === 0) {
      return res.status(404).json({ error: 'Potência não encontrada' });
    }

    const potency = potencies[0];

    // Get limits text
    let limitText = '';
    if (planName === 'Aprendiz') {
      limitText = 'Até 30 Obreiros por Loja';
    } else if (planName === 'Companheiro') {
      limitText = 'Até 60 Obreiros por Loja';
    } else if (planName === 'Mestre') {
      limitText = 'Obreiros ilimitados por Loja';
    }

    // 3. Update configuracoes_json
    const config = typeof potency.configuracoes_json === 'string'
      ? JSON.parse(potency.configuracoes_json)
      : (potency.configuracoes_json || {});

    config.plan = planName;

    const updatedRows = await sql`
      UPDATE public.potencias
      SET configuracoes_json = ${JSON.stringify(config)}::jsonb
      WHERE id = ${potency.id}
      RETURNING *
    `;

    const updatedPotency = updatedRows[0];

    // 4. Send upgrade confirmation email
    await emailService.sendUpgradeConfirmation(
      decoded.email,
      potency.nome,
      planName,
      limitText
    );

    return res.status(200).json({
      message: 'Upgrade realizado com sucesso',
      potencia: {
        id: updatedPotency.id,
        nome: updatedPotency.nome,
        sigla: updatedPotency.sigla,
        slug: updatedPotency.slug,
        trial_ends_at: updatedPotency.trial_ends_at,
        configuracoes_json: config
      }
    });
  } catch (error: any) {
    console.error('Upgrade plan error:', error);
    return res.status(500).json({ error: error.message || 'Erro interno no servidor' });
  }
}
