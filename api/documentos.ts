import { getSql } from './_lib/db.js';
import { withAuth } from './_lib/auth-middleware.js';

async function handler(req: any, res: any) {
  try {
    const sql = getSql();

    // GET Method (List documents)
    if (req.method === 'GET') {
      const { potenciaId } = req.query;

      if (!potenciaId) {
        return res.status(400).json({ error: 'Parâmetro potenciaId é obrigatório' });
      }

      const rows = await sql`
        SELECT d.*, l.nome as loja_nome, l.numero as loja_numero
        FROM public.documentos d
        LEFT JOIN public.lojas l ON d.loja_id = l.id
        WHERE d.potencia_id = ${potenciaId}
        ORDER BY d.created_at DESC
      `;

      const mapped = rows.map(r => ({
        id: r.id,
        loja_id: r.loja_id,
        potencia_id: r.potencia_id,
        tipo: r.tipo,
        status: r.status,
        arquivo_url: r.arquivo_url,
        titulo: r.titulo,
        grau_minimo: r.grau_minimo,
        created_at: r.created_at,
        lojas: r.loja_id ? { nome: r.loja_nome, numero: r.loja_numero } : null
      }));

      return res.status(200).json(mapped);
    }

    // PUT/PATCH Method (Update document status)
    if (req.method === 'PUT' || req.method === 'PATCH') {
      // Role validation
      const allowedCargos = ['Venerável Mestre', 'Grão-Mestre'];
      if (!allowedCargos.includes(req.user.cargo)) {
        return res.status(403).json({ error: 'Acesso restrito para aprovação de documentos.' });
      }

      const { id } = req.query;
      const { status } = req.body;

      if (!id || !status) {
        return res.status(400).json({ error: 'ID do documento e status são obrigatórios' });
      }

      if (status !== 'Aprovado' && status !== 'Rejeitado' && status !== 'Pendente') {
        return res.status(400).json({ error: 'Status inválido' });
      }

      // Tenancy check
      const doc = await sql`SELECT potencia_id FROM public.documentos WHERE id = ${id} LIMIT 1`;
      if (doc.length === 0) {
        return res.status(404).json({ error: 'Documento não encontrado' });
      }

      if (doc[0].potencia_id !== req.user.potencyId) {
        return res.status(403).json({ error: 'Acesso proibido. Jurisdição inválida.' });
      }

      const rows = await sql`
        UPDATE public.documentos
        SET status = ${status}
        WHERE id = ${id}
        RETURNING *
      `;

      return res.status(200).json(rows[0]);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('Error in api/documentos.ts:', error);
    return res.status(500).json({ error: error.message || 'Erro interno no servidor' });
  }
}

export default withAuth(handler);
