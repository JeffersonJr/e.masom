import { getSql } from '../../_lib/db.js';
import { emailService } from '../../_lib/email-service.js';
import crypto from 'crypto';

// Disable default Vercel body parser to get raw body needed for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

async function getRawBody(req: any): Promise<string> {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

function verifySignature(payload: string, header: string, secret: string): boolean {
  const parts = header.split(',');
  let timestamp = '';
  const signatures: string[] = [];

  for (const part of parts) {
    const [key, value] = part.split('=');
    if (key === 't') {
      timestamp = value;
    } else if (key === 'v1') {
      signatures.push(value);
    }
  }

  if (!timestamp || signatures.length === 0) {
    return false;
  }

  const signedPayload = `${timestamp}.${payload}`;
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(signedPayload);
  const expectedSignature = hmac.digest('hex');

  for (const signature of signatures) {
    try {
      const sigBuffer = Buffer.from(signature, 'hex');
      const expectedBuffer = Buffer.from(expectedSignature, 'hex');
      if (sigBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
        return true;
      }
    } catch {
      // Continue comparison if encoding or buffer parsing fails
    }
  }

  return false;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripeSignature = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let rawBody = '';
  try {
    rawBody = await getRawBody(req);
  } catch (error: any) {
    console.error('[STRIPE WEBHOOK ERROR] Error reading raw body:', error);
    return res.status(400).json({ error: 'Erro ao ler o corpo da requisição' });
  }

  // Verify signature if webhook secret is configured
  if (webhookSecret) {
    if (!stripeSignature) {
      console.error('[STRIPE WEBHOOK ERROR] Missing stripe-signature header.');
      return res.status(400).json({ error: 'Assinatura Stripe ausente' });
    }

    const isValid = verifySignature(rawBody, stripeSignature, webhookSecret);
    if (!isValid) {
      console.error('[STRIPE WEBHOOK ERROR] Invalid stripe signature.');
      return res.status(400).json({ error: 'Assinatura Stripe inválida' });
    }
  } else {
    console.warn('[STRIPE WEBHOOK WARNING] STRIPE_WEBHOOK_SECRET is not set. Signature verification was skipped.');
  }

  let event: any;
  try {
    event = JSON.parse(rawBody);
  } catch (error: any) {
    console.error('[STRIPE WEBHOOK ERROR] JSON parse error:', error);
    return res.status(400).json({ error: 'Corpo da requisição inválido' });
  }

  console.log(`[STRIPE WEBHOOK] Received event: ${event.type}`);

  try {
    const sql = getSql();
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const potencyId = session.metadata?.potencyId || null;
      const lojaId = session.metadata?.lojaId || null;
      const email = session.metadata?.email;
      const planName = session.metadata?.planName;
      const accountType = session.metadata?.accountType || 'potencia';
      const subscriptionId = session.subscription;
      const customerId = session.customer;

      if ((accountType === 'potencia' && !potencyId) || (accountType === 'loja' && !lojaId) || !subscriptionId) {
        console.error('[STRIPE WEBHOOK ERROR] Missing metadata identifiers or subscriptionId in session:', session.id);
        return res.status(400).json({ error: 'Metadados ausentes na sessão de checkout' });
      }

      // Fetch full subscription details from Stripe
      if (!stripeSecretKey) {
        console.error('[STRIPE WEBHOOK ERROR] STRIPE_SECRET_KEY is not configured.');
        return res.status(500).json({ error: 'Configuração interna pendente' });
      }

      const subRes = await fetch(`https://api.stripe.com/v1/subscriptions/${subscriptionId}`, {
        headers: {
          'Authorization': `Bearer ${stripeSecretKey}`
        }
      });

      if (!subRes.ok) {
        const errorText = await subRes.text();
        console.error(`[STRIPE WEBHOOK ERROR] Failed to fetch subscription ${subscriptionId} details from Stripe:`, errorText);
        return res.status(500).json({ error: 'Falha ao buscar detalhes da assinatura no Stripe' });
      }

      const subscription = await subRes.json();
      const status = subscription.status || 'active';
      const nextBillingDate = new Date(subscription.current_period_end * 1000).toISOString();
      const valor = (subscription.items?.data?.[0]?.price?.unit_amount || 0) / 100;

      console.log(`[STRIPE WEBHOOK] Checkout completed for ${accountType === 'potencia' ? 'Potency: ' + potencyId : 'Lodge: ' + lojaId}, Plan: ${planName}`);

      // Upsert Subscription in database
      if (accountType === 'potencia') {
        await sql`
          INSERT INTO public.assinaturas (potencia_id, stripe_customer_id, stripe_subscription_id, status, plano, valor, next_billing_date)
          VALUES (${potencyId}, ${customerId}, ${subscriptionId}, ${status}, ${planName}, ${valor}, ${nextBillingDate})
          ON CONFLICT (potencia_id) 
          DO UPDATE SET 
            stripe_customer_id = EXCLUDED.stripe_customer_id,
            stripe_subscription_id = EXCLUDED.stripe_subscription_id,
            status = EXCLUDED.status,
            plano = EXCLUDED.plano,
            valor = EXCLUDED.valor,
            next_billing_date = EXCLUDED.next_billing_date,
            created_at = NOW()
        `;

        // Fetch current potency settings
        const potencies = await sql`
          SELECT * FROM public.potencias WHERE id = ${potencyId} LIMIT 1
        `;

        if (potencies.length > 0) {
          const potency = potencies[0];
          const config = typeof potency.configuracoes_json === 'string'
            ? JSON.parse(potency.configuracoes_json)
            : (potency.configuracoes_json || {});

          config.plan = planName;

          // Update plan in potency table
          await sql`
            UPDATE public.potencias
            SET configuracoes_json = ${JSON.stringify(config)}::jsonb,
                trial_ends_at = NULL -- Reset trial ends since payment is active
            WHERE id = ${potencyId}
          `;

          // Send confirmation email
          let limitText = 'Acesso Premium';
          if (planName === 'Aprendiz') {
            limitText = 'Até 30 Obreiros por Loja';
          } else if (planName === 'Companheiro') {
            limitText = 'Até 60 Obreiros por Loja';
          } else if (planName === 'Mestre') {
            limitText = 'Obreiros ilimitados por Loja';
          }

          if (email) {
            await emailService.sendUpgradeConfirmation(
              email,
              potency.nome,
              planName,
              limitText
            );
          }
        }
      } else {
        await sql`
          INSERT INTO public.assinaturas (loja_id, stripe_customer_id, stripe_subscription_id, status, plano, valor, next_billing_date)
          VALUES (${lojaId}, ${customerId}, ${subscriptionId}, ${status}, ${planName}, ${valor}, ${nextBillingDate})
          ON CONFLICT (loja_id) 
          DO UPDATE SET 
            stripe_customer_id = EXCLUDED.stripe_customer_id,
            stripe_subscription_id = EXCLUDED.stripe_subscription_id,
            status = EXCLUDED.status,
            plano = EXCLUDED.plano,
            valor = EXCLUDED.valor,
            next_billing_date = EXCLUDED.next_billing_date,
            created_at = NOW()
        `;

        // Fetch current lodge settings
        const lodges = await sql`
          SELECT * FROM public.lojas WHERE id = ${lojaId} LIMIT 1
        `;

        if (lodges.length > 0) {
          const lodge = lodges[0];
          const config = typeof lodge.site_config_json === 'string'
            ? JSON.parse(lodge.site_config_json)
            : (lodge.site_config_json || {});

          config.plan = planName;

          // Update plan in lodge table
          await sql`
            UPDATE public.lojas
            SET site_config_json = ${JSON.stringify(config)}::jsonb
            WHERE id = ${lojaId}
          `;

          // Send confirmation email
          let limitText = 'Acesso Premium Loja';
          if (planName === 'Aprendiz') {
            limitText = 'Até 30 Obreiros';
          } else if (planName === 'Companheiro') {
            limitText = 'Até 60 Obreiros';
          } else if (planName === 'Mestre') {
            limitText = 'Obreiros ilimitados';
          }

          if (email) {
            await emailService.sendUpgradeConfirmation(
              email,
              lodge.nome,
              planName,
              limitText
            );
          }
        }
      }
    }

    else if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object;
      const subscriptionId = subscription.id;

      console.log(`[STRIPE WEBHOOK] Subscription deleted: ${subscriptionId}`);

      const rows = await sql`
        SELECT * FROM public.assinaturas WHERE stripe_subscription_id = ${subscriptionId} LIMIT 1
      `;

      if (rows.length > 0) {
        const potencyId = rows[0].potencia_id;
        const lojaId = rows[0].loja_id;

        // Update signature record
        await sql`
          UPDATE public.assinaturas
          SET status = 'canceled', next_billing_date = NULL
          WHERE stripe_subscription_id = ${subscriptionId}
        `;

        if (potencyId) {
          // Fetch potency config to remove plan
          const potencies = await sql`
            SELECT * FROM public.potencias WHERE id = ${potencyId} LIMIT 1
          `;

          if (potencies.length > 0) {
            const potency = potencies[0];
            const config = typeof potency.configuracoes_json === 'string'
              ? JSON.parse(potency.configuracoes_json)
              : (potency.configuracoes_json || {});
            
            delete config.plan;

            // Lock account by expiring trial access immediately
            await sql`
              UPDATE public.potencias
              SET configuracoes_json = ${JSON.stringify(config)}::jsonb,
                  trial_ends_at = NOW() - INTERVAL '1 day'
              WHERE id = ${potencyId}
            `;
          }
        } else if (lojaId) {
          // Fetch lodge config to remove plan
          const lodges = await sql`
            SELECT * FROM public.lojas WHERE id = ${lojaId} LIMIT 1
          `;

          if (lodges.length > 0) {
            const lodge = lodges[0];
            const config = typeof lodge.site_config_json === 'string'
              ? JSON.parse(lodge.site_config_json)
              : (lodge.site_config_json || {});
            
            delete config.plan;

            // Lock account by cleaning up active plan
            await sql`
              UPDATE public.lojas
              SET site_config_json = ${JSON.stringify(config)}::jsonb
              WHERE id = ${lojaId}
            `;
          }
        }
      }
    }

    else if (event.type === 'invoice.payment_succeeded') {
      const invoice = event.data.object;
      const subscriptionId = invoice.subscription;

      if (subscriptionId) {
        if (!stripeSecretKey) {
          console.error('[STRIPE WEBHOOK ERROR] STRIPE_SECRET_KEY is not configured.');
          return res.status(500).json({ error: 'Configuração interna pendente' });
        }

        const subRes = await fetch(`https://api.stripe.com/v1/subscriptions/${subscriptionId}`, {
          headers: {
            'Authorization': `Bearer ${stripeSecretKey}`
          }
        });

        if (subRes.ok) {
          const subscription = await subRes.json();
          const status = subscription.status || 'active';
          const nextBillingDate = new Date(subscription.current_period_end * 1000).toISOString();
          const valor = (subscription.items?.data?.[0]?.price?.unit_amount || 0) / 100;

          await sql`
            UPDATE public.assinaturas
            SET status = ${status}, next_billing_date = ${nextBillingDate}, valor = ${valor}
            WHERE stripe_subscription_id = ${subscriptionId}
          `;
          console.log(`[STRIPE WEBHOOK] Subscription ${subscriptionId} status updated to: ${status}, next billing: ${nextBillingDate}`);
        }
      }
    }

    else if (event.type === 'invoice.payment_failed') {
      const invoice = event.data.object;
      const subscriptionId = invoice.subscription;

      if (subscriptionId) {
        await sql`
          UPDATE public.assinaturas
          SET status = 'past_due'
          WHERE stripe_subscription_id = ${subscriptionId}
        `;
        console.log(`[STRIPE WEBHOOK] Subscription ${subscriptionId} payment failed. Marked as past_due.`);
      }
    }

    return res.status(200).json({ received: true });
  } catch (error: any) {
    console.error('[STRIPE WEBHOOK PROCESS ERROR]:', error);
    return res.status(500).json({ error: 'Erro interno ao processar o webhook' });
  }
}
