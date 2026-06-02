import { getSql } from './lib/db';

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

    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { potenciaId, status } = req.query;

    if (!potenciaId) {
      return res.status(400).json({ error: 'Parâmetro de consulta potenciaId é obrigatório' });
    }

    let rows;
    
    if (status) {
      // getObreirosByPotencia
      rows = await sql`
        SELECT id, nome, cargo, grau, status
        FROM public.perfis
        WHERE potencia_id = ${potenciaId} AND status = ${status}
        ORDER BY nome
      `;
      return res.status(200).json(rows);
    } else {
      // getObreiros
      rows = await sql`
        SELECT p.*, l.nome as loja_nome, l.numero as loja_numero
        FROM public.perfis p
        LEFT JOIN public.lojas l ON p.loja_id = l.id
        WHERE p.potencia_id = ${potenciaId}
        ORDER BY p.nome
      `;

      const mapped = rows.map(r => ({
        id: r.id,
        user_id: r.user_id,
        nome: r.nome,
        loja_id: r.loja_id,
        potencia_id: r.potencia_id,
        grau: r.grau,
        cargo: r.cargo,
        status: r.status,
        created_at: r.created_at,
        lojas: r.loja_id ? { nome: r.loja_nome, numero: r.loja_numero } : null
      }));

      return res.status(200).json(mapped);
    }

  } catch (error: any) {
    console.error('Error in api/obreiros.ts:', error);
    return res.status(500).json({ error: error.message || 'Erro interno no servidor' });
  }
}
