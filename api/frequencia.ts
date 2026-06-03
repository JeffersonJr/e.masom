import { neon } from '@neondatabase/serverless';
import { withAuth } from './lib/auth-middleware.js';

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

async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { lojaId, dataSessao, frequencias } = req.body;

  if (!lojaId || !frequencias || !Array.isArray(frequencias)) {
    return res.status(400).json({ error: 'Faltam campos obrigatórios: lojaId, frequencias' });
  }

  // Restrict access to authorized offices/cargos
  const allowedCargos = ['Secretário', 'Secretário Geral', 'Venerável Mestre', 'Grão-Mestre'];
  if (!allowedCargos.includes(req.user.cargo)) {
    return res.status(403).json({ error: 'Acesso restrito para marcar presenças.' });
  }

  const sql = getSql();

  try {
    const date = dataSessao || new Date().toISOString().split('T')[0];

    // Perform upserts for each worker's presence record
    for (const f of frequencias) {
      await sql`
        INSERT INTO public.presencas (loja_id, obreiro_id, data_sessao, presente)
        VALUES (${lojaId}, ${f.obreiroId}, ${date}, ${f.presente})
        ON CONFLICT (loja_id, obreiro_id, data_sessao)
        DO UPDATE SET presente = EXCLUDED.presente
      `;
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Error saving frequency:', error);
    return res.status(500).json({ error: error.message || 'Erro ao sincronizar livro de presenças' });
  }
}

export default withAuth(handler);
