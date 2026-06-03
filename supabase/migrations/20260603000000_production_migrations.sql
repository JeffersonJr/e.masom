-- Table: Presenças (Chamada Litúrgica)
CREATE TABLE IF NOT EXISTS public.presencas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    loja_id UUID REFERENCES public.lojas(id) ON DELETE CASCADE NOT NULL,
    obreiro_id UUID REFERENCES public.perfis(id) ON DELETE CASCADE NOT NULL,
    data_sessao DATE NOT NULL,
    presente BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (loja_id, obreiro_id, data_sessao)
);

-- Table: Assinaturas (Stripe Billing Integration)
CREATE TABLE IF NOT EXISTS public.assinaturas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    potencia_id UUID REFERENCES public.potencias(id) ON DELETE CASCADE UNIQUE NOT NULL,
    stripe_customer_id TEXT NOT NULL,
    stripe_subscription_id TEXT NOT NULL,
    status TEXT NOT NULL, -- e.g. 'active', 'past_due', 'canceled'
    plano TEXT NOT NULL, -- e.g. 'Aprendiz', 'Companheiro', 'Mestre'
    valor NUMERIC(10,2) NOT NULL,
    next_billing_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
