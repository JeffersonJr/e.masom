import { sql } from './lib/db';

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
    // GET Method
    if (req.method === 'GET') {
      const { slug, id } = req.query;

      if (id) {
        const rows = await sql`
          SELECT * FROM public.potencias WHERE id = ${id} LIMIT 1
        `;
        if (rows.length === 0) return res.status(404).json({ error: 'Potência não encontrada' });
        return res.status(200).json(rows[0]);
      }

      if (slug) {
        const rows = await sql`
          SELECT * FROM public.potencias WHERE sigla = ${slug.toUpperCase()} OR sigla = ${slug} LIMIT 1
        `;

        if (rows.length === 0) {
          const fallback = await sql`
            SELECT * FROM public.potencias WHERE sigla ILIKE ${slug} LIMIT 1
          `;
          if (fallback.length === 0) {
            return res.status(404).json({ error: 'Potência não encontrada' });
          }
          return res.status(200).json(fallback[0]);
        }

        return res.status(200).json(rows[0]);
      }

      return res.status(400).json({ error: 'Parâmetro slug ou id é obrigatório' });
    }

    // PUT/PATCH Method (Update Potencia)
    if (req.method === 'PUT' || req.method === 'PATCH') {
      const { id } = req.query;
      const { nome, sigla, descricao, logo_url, configuracoes_json } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'ID da potência é obrigatório' });
      }

      const current = await sql`SELECT * FROM public.potencias WHERE id = ${id} LIMIT 1`;
      if (current.length === 0) {
        return res.status(404).json({ error: 'Potência não encontrada' });
      }

      const p = current[0];

      const updatedNome = nome !== undefined ? nome : p.nome;
      const updatedSigla = sigla !== undefined ? sigla : p.sigla;
      const updatedDescricao = descricao !== undefined ? descricao : p.descricao;
      const updatedLogoUrl = logo_url !== undefined ? logo_url : p.logo_url;
      const updatedConfig = configuracoes_json !== undefined ? configuracoes_json : p.configuracoes_json;

      const rows = await sql`
        UPDATE public.potencias
        SET 
          nome = ${updatedNome},
          sigla = ${updatedSigla},
          configuracoes_json = ${JSON.stringify(updatedConfig)}::jsonb,
          logo_url = ${updatedLogoUrl}
        WHERE id = ${id}
        RETURNING *
      `;

      return res.status(200).json(rows[0]);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('Error in api/potencias.ts:', error);
    return res.status(500).json({ error: error.message || 'Erro interno no servidor' });
  }
}
