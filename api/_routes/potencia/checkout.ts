import { getSql } from '../../_lib/db.js';
import { withAuth } from '../../_lib/auth-middleware.js';

async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { planName, accountType = 'potencia' } = req.body;
  if (!planName || !['Aprendiz', 'Companheiro', 'Mestre'].includes(planName)) {
    return res.status(400).json({ error: 'Plano inválido ou não fornecido' });
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return res.status(500).json({ error: 'STRIPE_SECRET_KEY não configurada no servidor.' });
  }

  const sql = getSql();

  try {
    let obreirosCount = 0;
    let lojasCount = 0;
    let storageGB = 1;

    // 1. Calculate active counts from database for seat-based checkout pricing
    if (accountType === 'potencia') {
      if (!req.user.potencyId) {
        return res.status(400).json({ error: 'Potência não associada ao usuário' });
      }

      // Count obreiros in the potency
      const obreirosRes = await sql`
        SELECT COUNT(*)::int as count FROM public.perfis WHERE potencia_id = ${req.user.potencyId}
      `;
      obreirosCount = Math.max(1, obreirosRes[0]?.count || 1);

      // Count lodges in the potency
      const lojasRes = await sql`
        SELECT COUNT(*)::int as count FROM public.lojas WHERE potencia_id = ${req.user.potencyId}
      `;
      lojasCount = Math.max(1, lojasRes[0]?.count || 1);

      // Count storage (ceil to nearest GB)
      const storageRes = await sql`
        SELECT COALESCE(SUM(tamanho_bytes), 0)::bigint as total_bytes FROM public.documentos WHERE potencia_id = ${req.user.potencyId}
      `;
      const totalBytes = Number(storageRes[0]?.total_bytes || 0);
      storageGB = Math.max(1, Math.ceil(totalBytes / (1024 * 1024 * 1024)));
    } else {
      if (!req.user.lojaId) {
        return res.status(400).json({ error: 'Loja não associada ao usuário' });
      }

      // Count obreiros in the lodge
      const obreirosRes = await sql`
        SELECT COUNT(*)::int as count FROM public.perfis WHERE loja_id = ${req.user.lojaId}
      `;
      obreirosCount = Math.max(1, obreirosRes[0]?.count || 1);

      // Count storage (ceil to nearest GB)
      const storageRes = await sql`
        SELECT COALESCE(SUM(tamanho_bytes), 0)::bigint as total_bytes FROM public.documentos WHERE loja_id = ${req.user.lojaId}
      `;
      const totalBytes = Number(storageRes[0]?.total_bytes || 0);
      storageGB = Math.max(1, Math.ceil(totalBytes / (1024 * 1024 * 1024)));
    }

    // 2. Map pricing variables
    let basePriceId = '';
    let obreiroPriceId = '';
    let lojaPriceId = '';
    let storagePriceId = '';

    if (accountType === 'potencia') {
      if (planName === 'Aprendiz') {
        basePriceId = process.env.STRIPE_PRICE_POTENCIA_APRENDIZ_BASE || '';
      } else if (planName === 'Companheiro') {
        basePriceId = process.env.STRIPE_PRICE_POTENCIA_COMPANHEIRO_BASE || '';
      } else if (planName === 'Mestre') {
        basePriceId = process.env.STRIPE_PRICE_POTENCIA_MESTRE_BASE || '';
      }
      obreiroPriceId = process.env.STRIPE_PRICE_POTENCIA_OBREIRO || '';
      lojaPriceId = process.env.STRIPE_PRICE_POTENCIA_LOJA || '';
      storagePriceId = process.env.STRIPE_PRICE_POTENCIA_STORAGE || '';
    } else {
      if (planName === 'Aprendiz') {
        basePriceId = process.env.STRIPE_PRICE_LOJA_APRENDIZ_BASE || '';
      } else if (planName === 'Companheiro') {
        basePriceId = process.env.STRIPE_PRICE_LOJA_COMPANHEIRO_BASE || '';
      } else if (planName === 'Mestre') {
        basePriceId = process.env.STRIPE_PRICE_LOJA_MESTRE_BASE || '';
      }
      obreiroPriceId = process.env.STRIPE_PRICE_LOJA_OBREIRO || '';
      storagePriceId = process.env.STRIPE_PRICE_LOJA_STORAGE || '';
    }

    // Fallback for simple base price if new variables are not configured yet
    if (!basePriceId) {
      if (planName === 'Aprendiz') {
        basePriceId = process.env.STRIPE_PRICE_APRENDIZ || '';
      } else if (planName === 'Companheiro') {
        basePriceId = process.env.STRIPE_PRICE_COMPANHEIRO || '';
      } else if (planName === 'Mestre') {
        basePriceId = process.env.STRIPE_PRICE_MESTRE || '';
      }
    }

    if (!basePriceId) {
      return res.status(500).json({ error: `ID do plano base Stripe para ${planName} não configurado.` });
    }

    const successUrl = `${req.headers.origin || 'https://e-masom.vercel.app'}/admin?payment=success`;
    const cancelUrl = `${req.headers.origin || 'https://e-masom.vercel.app'}/admin?payment=cancel`;

    // 3. Build Stripe URL Parameters
    const stripeParams = new URLSearchParams();
    stripeParams.append('success_url', successUrl);
    stripeParams.append('cancel_url', cancelUrl);
    stripeParams.append('mode', 'subscription');
    stripeParams.append('customer_email', req.user.email);
    
    // Metadata for billing tracking
    stripeParams.append('metadata[potencyId]', req.user.potencyId || '');
    stripeParams.append('metadata[lojaId]', req.user.lojaId || '');
    stripeParams.append('metadata[email]', req.user.email);
    stripeParams.append('metadata[planName]', planName);
    stripeParams.append('metadata[accountType]', accountType);

    let lineItemIndex = 0;

    // Base Price
    stripeParams.append(`line_items[${lineItemIndex}][price]`, basePriceId);
    stripeParams.append(`line_items[${lineItemIndex}][quantity]`, '1');
    lineItemIndex++;

    // Obreiros Price
    if (obreiroPriceId) {
      stripeParams.append(`line_items[${lineItemIndex}][price]`, obreiroPriceId);
      stripeParams.append(`line_items[${lineItemIndex}][quantity]`, obreirosCount.toString());
      lineItemIndex++;
    }

    // Lojas Price (Potencia only)
    if (accountType === 'potencia' && lojaPriceId) {
      stripeParams.append(`line_items[${lineItemIndex}][price]`, lojaPriceId);
      stripeParams.append(`line_items[${lineItemIndex}][quantity]`, lojasCount.toString());
      lineItemIndex++;
    }

    // Storage Price
    if (storagePriceId) {
      stripeParams.append(`line_items[${lineItemIndex}][price]`, storagePriceId);
      stripeParams.append(`line_items[${lineItemIndex}][quantity]`, storageGB.toString());
      lineItemIndex++;
    }

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
