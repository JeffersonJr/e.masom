-- Make potencia_id in public.assinaturas nullable
ALTER TABLE public.assinaturas ALTER COLUMN potencia_id DROP NOT NULL;

-- Add loja_id column if it does not exist
ALTER TABLE public.assinaturas ADD COLUMN IF NOT EXISTS loja_id UUID REFERENCES public.lojas(id) ON DELETE CASCADE UNIQUE;

-- Add check constraint to ensure either potencia_id or loja_id is present, but not both
ALTER TABLE public.assinaturas DROP CONSTRAINT IF EXISTS check_potencia_or_loja;
ALTER TABLE public.assinaturas ADD CONSTRAINT check_potencia_or_loja CHECK (
    (potencia_id IS NOT NULL AND loja_id IS NULL) OR
    (loja_id IS NOT NULL AND potencia_id IS NULL)
);

-- Add size column to documentos if it does not exist
ALTER TABLE public.documentos ADD COLUMN IF NOT EXISTS tamanho_bytes BIGINT DEFAULT 0 NOT NULL;
