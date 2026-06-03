import { getSql } from './_lib/db.js';

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

  try {
    const sql = getSql();

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { loja_id, nome, email, telefone, mensagem } = req.body;

    if (!nome || !email) {
      return res.status(400).json({ error: 'Nome e E-mail são obrigatórios' });
    }

    const rows = await sql`
      INSERT INTO public.leads_sindicancia (loja_id, nome, email, telefone, mensagem)
      VALUES (${loja_id || null}, ${nome}, ${email}, ${telefone || null}, ${mensagem || null})
      RETURNING *
    `;

    return res.status(201).json(rows[0]);
  } catch (error: any) {
    console.error('Error in api/leads.ts:', error);
    return res.status(500).json({ error: error.message || 'Erro interno no servidor' });
  }
}
