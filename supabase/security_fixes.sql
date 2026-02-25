-- Resolução de Alertas de Segurança Supabase - e.mason

-- 1. Ativar Row Level Security (RLS)
ALTER TABLE IF EXISTS public.potencias ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.perfis ENABLE ROW LEVEL SECURITY;

-- 2. Políticas para a tabela 'potencias'
-- Permite leitura pública (necessário para o formulário de cadastro verificar domínios)
DROP POLICY IF EXISTS "Allow public read for potency basic info" ON public.potencias;
CREATE POLICY "Allow public read for potency basic info" ON public.potencias
FOR SELECT USING (true);

-- Permite que usuários autenticados criem novas potências (primeiro cadastro)
DROP POLICY IF EXISTS "Allow authenticated users to insert potency" ON public.potencias;
CREATE POLICY "Allow authenticated users to insert potency" ON public.potencias
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 3. Políticas para a tabela 'perfis'
-- Nota: Usando 'id' como referência ao usuário autenticado (conforme estrutura atual do DB)
-- Usuários podem ver apenas seu próprio perfil
DROP POLICY IF EXISTS "Users can see their own profile" ON public.perfis;
CREATE POLICY "Users can see their own profile" ON public.perfis
FOR SELECT USING (auth.uid() = id);

-- Usuários podem atualizar apenas seu próprio perfil
DROP POLICY IF EXISTS "Users can update their own profile" ON public.perfis;
CREATE POLICY "Users can update their own profile" ON public.perfis
FOR UPDATE USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- 4. Ajuste do Gatilho de Novo Usuário (Schema Alignment)
-- Garante que o trigger use a coluna 'id' em vez de 'user_id'
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.perfis (id, grau, grau_nr, status)
  VALUES (new.id, 'Aprendiz', 1, 'Ativo');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Nota sobre Proteção de Senhas Vazadas
-- Esta configuração deve ser ativada manualmente no Dashboard do Supabase:
-- Auth -> Base Configuration -> Password Protection -> Enable "Have I Been Pwned"
