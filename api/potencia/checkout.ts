import { withAuth } from '../lib/auth-middleware.js';

async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { planName } = req.body;
  if (!planName || !['Aprendiz', 'Companheiro', 'Mestre'].includes(planName)) {
    return res.status(400).json({ error: 'Plano inválido ou não fornecido' });
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return res.status(500).json({ error: 'STRIPE_SECRET_KEY não configurada no servidor.' });
  }

  // Map the plan names to Stripe Price IDs from environment variables
  let priceId = '';
  if (planName === 'Aprendiz') {
    priceId = process.env.STRIPE_PRICE_APRENDIZ || '';
  } else if (planName === 'Companheiro') {
    priceId = process.env.STRIPE_PRICE_COMPANHEIRO || '';
  } else if (planName === 'Mestre') {
    priceId = process.env.STRIPE_PRICE_MESTRE || '';
  }

  if (!priceId) {
    return res.status(500).json({ error: `ID do plano Stripe para ${planName} não configurado.` });
  }

  try {
    const successUrl = `${req.headers.origin || 'https://e-masom.vercel.app'}/admin?payment=success`;
    const cancelUrl = `${req.headers.origin || 'https://e-masom.vercel.app'}/admin?payment=cancel`;

    // Encode parameters for x-www-form-urlencoded
    const stripeParams = new URLSearchParams({
      'success_url': successUrl,
      'cancel_url': cancelUrl,
      'mode': 'subscription',
      'line_items[0][price]': priceId,
      'line_items[0][quantity]': '1',
      'metadata[potencyId]': req.user.potencyId,
      'metadata[email]': req.user.email,
      'metadata[planName]': planName,
      'customer_email': req.user.email
    });

    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: stripeParams.toString()
    });

    const sessionData: any = await stripeRes.json();

    if (!stripeRes.ok) {
      console.error('[STRIPE CHECKOUT ERROR]:', sessionData);
      return res.status(500).json({ error: sessionData.error?.message || 'Erro ao criar sessão de checkout no Stripe.' });
    }

    return res.status(200).json({ url: sessionData.url });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return res.status(500).json({ error: error.message || 'Erro interno no servidor' });
  }
}

export default withAuth(handler);
