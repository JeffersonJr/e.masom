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

    // GET Method
    if (req.method === 'GET') {
      const { potenciaId, id, slug } = req.query;

      if (id) {
        const rows = await sql`
          SELECT * FROM public.lojas WHERE id = ${id} LIMIT 1
        `;
        if (rows.length === 0) return res.status(404).json({ error: 'Loja não encontrada' });
        return res.status(200).json(rows[0]);
      }

      if (slug) {
        const rows = await sql`
          SELECT * FROM public.lojas WHERE slug = ${slug} LIMIT 1
        `;
        if (rows.length === 0) return res.status(404).json({ error: 'Loja não encontrada' });
        return res.status(200).json(rows[0]);
      }

      if (potenciaId) {
        const rows = await sql`
          SELECT * FROM public.lojas WHERE potencia_id = ${potenciaId} ORDER BY nome
        `;
        return res.status(200).json(rows);
      }

      return res.status(400).json({ error: 'Parâmetro de consulta ausente (potenciaId, id ou slug)' });
    }

    // POST Method (Create Loja)
    if (req.method === 'POST') {
      const body = req.body;
      const {
        potencia_id,
        nome,
        numero,
        rito,
        slug,
        logo_url,
        dominio_custom,
        site_config_json,
        status,
        ano_fundacao,
        per_capita_paga,
        per_capita_data,
        per_capita_vencimento,
        per_capita_valor_obreiro,
        per_capita_historico_json,
        encontros_json,
        localizacao_json,
        membros_json
      } = body;

      if (!potencia_id || !nome || !numero || !slug) {
        return res.status(400).json({ error: 'Campos obrigatórios ausentes: potencia_id, nome, numero, slug' });
      }

      const rows = await sql`
        INSERT INTO public.lojas (
          potencia_id, nome, numero, rito, slug, logo_url, dominio_custom,
          site_config_json, status, ano_fundacao, per_capita_paga, per_capita_data,
          per_capita_vencimento, per_capita_valor_obreiro, per_capita_historico_json,
          encontros_json, localizacao_json, membros_json
        )
        VALUES (
          ${potencia_id}, ${nome}, ${numero}, ${rito || null}, ${slug}, ${logo_url || null}, ${dominio_custom || null},
          ${JSON.stringify(site_config_json || {})}::jsonb, ${status || 'ativo'}, ${ano_fundacao || null}, 
          ${per_capita_paga || false}, ${per_capita_data || null}, ${per_capita_vencimento || null}, 
          ${per_capita_valor_obreiro || null}, ${JSON.stringify(per_capita_historico_json || [])}::jsonb,
          ${JSON.stringify(encontros_json || [])}::jsonb, ${JSON.stringify(localizacao_json || {})}::jsonb,
          ${JSON.stringify(membros_json || {})}::jsonb
        )
        RETURNING *
      `;

      return res.status(201).json(rows[0]);
    }

    // PUT/PATCH Method (Update Loja)
    if (req.method === 'PUT' || req.method === 'PATCH') {
      const { id } = req.query;
      const body = req.body;

      if (!id) {
        return res.status(400).json({ error: 'ID da loja não fornecido' });
      }

      // Check if updating only a subset of fields (e.g. status)
      const current = await sql`SELECT * FROM public.lojas WHERE id = ${id} LIMIT 1`;
      if (current.length === 0) {
        return res.status(404).json({ error: 'Loja não encontrada' });
      }

      const l = current[0];

      // Merge current values with incoming body
      const nome = body.nome !== undefined ? body.nome : l.nome;
      const numero = body.numero !== undefined ? body.numero : l.numero;
      const rito = body.rito !== undefined ? body.rito : l.rito;
      const slug = body.slug !== undefined ? body.slug : l.slug;
      const logo_url = body.logo_url !== undefined ? body.logo_url : l.logo_url;
      const dominio_custom = body.dominio_custom !== undefined ? body.dominio_custom : l.dominio_custom;
      const status = body.status !== undefined ? body.status : l.status;
      const ano_fundacao = body.ano_fundacao !== undefined ? body.ano_fundacao : l.ano_fundacao;
      const per_capita_paga = body.per_capita_paga !== undefined ? body.per_capita_paga : l.per_capita_paga;
      const per_capita_data = body.per_capita_data !== undefined ? body.per_capita_data : l.per_capita_data;
      const per_capita_vencimento = body.per_capita_vencimento !== undefined ? body.per_capita_vencimento : l.per_capita_vencimento;
      const per_capita_valor_obreiro = body.per_capita_valor_obreiro !== undefined ? body.per_capita_valor_obreiro : l.per_capita_valor_obreiro;

      const site_config_json = body.site_config_json !== undefined ? body.site_config_json : l.site_config_json;
      const per_capita_historico_json = body.per_capita_historico_json !== undefined ? body.per_capita_historico_json : l.per_capita_historico_json;
      const encontros_json = body.encontros_json !== undefined ? body.encontros_json : l.encontros_json;
      const localizacao_json = body.localizacao_json !== undefined ? body.localizacao_json : l.localizacao_json;
      const membros_json = body.membros_json !== undefined ? body.membros_json : l.membros_json;

      const rows = await sql`
        UPDATE public.lojas
        SET 
          nome = ${nome},
          numero = ${numero},
          rito = ${rito},
          slug = ${slug},
          logo_url = ${logo_url},
          dominio_custom = ${dominio_custom},
          status = ${status},
          ano_fundacao = ${ano_fundacao},
          per_capita_paga = ${per_capita_paga},
          per_capita_data = ${per_capita_data},
          per_capita_vencimento = ${per_capita_vencimento},
          per_capita_valor_obreiro = ${per_capita_valor_obreiro},
          site_config_json = ${JSON.stringify(site_config_json)}::jsonb,
          per_capita_historico_json = ${JSON.stringify(per_capita_historico_json)}::jsonb,
          encontros_json = ${JSON.stringify(encontros_json)}::jsonb,
          localizacao_json = ${JSON.stringify(localizacao_json)}::jsonb,
          membros_json = ${JSON.stringify(membros_json)}::jsonb
        WHERE id = ${id}
        RETURNING *
      `;

      return res.status(200).json(rows[0]);
    }

    // DELETE Method
    if (req.method === 'DELETE') {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'ID da loja não fornecido' });
      }

      await sql`
        DELETE FROM public.lojas WHERE id = ${id}
      `;

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('Error in api/lojas.ts:', error);
    return res.status(500).json({ error: error.message || 'Erro interno no servidor' });
  }
}
