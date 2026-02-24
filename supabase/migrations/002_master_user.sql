-- Insert a master Potência
INSERT INTO potencias (id, nome, sigla, estado)
VALUES ('77777777-7777-7777-7777-777777777777', 'Grande Oriente do Brasil', 'GOB', 'DF')
ON CONFLICT DO NOTHING;

-- Note: The actual user creation must be done via Supabase Auth API/UI 
-- to generate a valid hash. This migration handles the profile linking.

-- Instructions for the user:
-- 1. Go to Supabase Auth -> Users -> Add User
-- 2. Email: contato@jeffersonjunior.com.br
-- 3. Password: [Password provided: 123456]
-- 4. Copy the Generated User ID

-- Then run this (replacing <USER_ID>):
-- INSERT INTO perfis (user_id, potencia_id, nome, cargo, grau)
-- VALUES ('<USER_ID>', '77777777-7777-7777-7777-777777777777', 'Jefferson Junior', 'Administrador Master', 'Mestre');
