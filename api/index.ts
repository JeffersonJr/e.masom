import authLogin from './_routes/auth/login';
import authForgot from './_routes/auth/forgot';
import authReset from './_routes/auth/reset';
import authMe from './_routes/auth/me';
import authSignup from './_routes/auth/signup';
import potenciaCheckout from './_routes/potencia/checkout';
import potenciaUpgrade from './_routes/potencia/upgrade';
import webhookStripe from './_routes/webhook/stripe';
import documentos from './_routes/documentos';
import frequencia from './_routes/frequencia';
import health from './_routes/health';
import leads from './_routes/leads';
import lojas from './_routes/lojas';
import obreiros from './_routes/obreiros';
import ping from './_routes/ping';
import potencias from './_routes/potencias';

const routes: Record<string, any> = {
  '/api/auth/login': authLogin,
  '/api/auth/forgot': authForgot,
  '/api/auth/reset': authReset,
  '/api/auth/me': authMe,
  '/api/auth/signup': authSignup,
  '/api/potencia/checkout': potenciaCheckout,
  '/api/potencia/upgrade': potenciaUpgrade,
  '/api/webhook/stripe': webhookStripe,
  '/api/documentos': documentos,
  '/api/frequencia': frequencia,
  '/api/health': health,
  '/api/leads': leads,
  '/api/lojas': lojas,
  '/api/obreiros': obreiros,
  '/api/ping': ping,
  '/api/potencias': potencias,
};

export default async function handler(req: any, res: any) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Extrair rota ignorando query params (ex: /api/auth/login?token=123 -> /api/auth/login)
  const urlPath = req.url?.split('?')[0] || '';

  // Remover barra no final, caso exista (ex: /api/health/ -> /api/health)
  const normalizedPath = urlPath.endsWith('/') && urlPath !== '/' 
    ? urlPath.slice(0, -1) 
    : urlPath;

  const routeHandler = routes[normalizedPath];

  if (routeHandler) {
    try {
      return await routeHandler(req, res);
    } catch (error: any) {
      console.error(`Error in route ${normalizedPath}:`, error);
      return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }

  return res.status(404).json({ error: `API route ${normalizedPath} not found` });
}
