import jwt from 'jsonwebtoken';
import { getSql } from './db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'placeholder-secret-key';

export function withAuth(handler: Function, allowedCargos?: string[]) {
  return async (req: any, res: any) => {
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

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);
      
      // Fetch user profile from database to get fresh role and potency details
      const sql = getSql();
      const profiles = await sql`
        SELECT cargo, potencia_id FROM public.perfis 
        WHERE id = ${decoded.profileId} LIMIT 1
      `;

      if (profiles.length === 0) {
        return res.status(404).json({ error: 'Perfil do usuário não encontrado.' });
      }

      const profile = profiles[0];
      
      // Verify tenancy alignment: user must belong to requested potency
      const reqPotencyId = req.query.potenciaId || req.body.potencia_id;
      if (reqPotencyId && reqPotencyId !== profile.potencia_id) {
        return res.status(403).json({ error: 'Acesso proibido. Jurisdição inválida.' });
      }

      // Check role/cargo authorization
      if (allowedCargos && allowedCargos.length > 0) {
        const hasAccess = allowedCargos.some(cargo => 
          profile.cargo === cargo || 
          profile.cargo === 'Grão-Mestre' // Grão-Mestre has superuser credentials
        );
        if (!hasAccess) {
          return res.status(403).json({ error: 'Acesso restrito ao cargo autorizado.' });
        }
      }

      req.user = {
        ...decoded,
        cargo: profile.cargo,
        potencyId: profile.potencia_id
      };

      return handler(req, res);
    } catch (error) {
      console.error('Middleware auth error:', error);
      return res.status(401).json({ error: 'Sessão expirada ou inválida.' });
    }
  };
}
