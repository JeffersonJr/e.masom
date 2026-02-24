# Configuração do Banco de Dados Local

## Opção 1: PostgreSQL Local (Recomendado para Desenvolvimento)

### 1. Instalar PostgreSQL

#### macOS (via Homebrew)
```bash
brew install postgresql
brew services start postgresql
```

#### Ubuntu/Debian
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### Windows
- Baixe e instale o PostgreSQL de: https://www.postgresql.org/download/windows/

### 2. Criar Banco de Dados

```bash
# Acessar o PostgreSQL
psql -U postgres

# Criar banco de dados
CREATE DATABASE lodge_management;

# Criar usuário (opcional)
CREATE USER lodge_user WITH PASSWORD 'sua_senha_aqui';
GRANT ALL PRIVILEGES ON DATABASE lodge_management TO lodge_user;

# Sair
\q
```

### 3. Configurar Variáveis de Ambiente

O arquivo `.env.local` já está configurado com:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/lodge_management"
```

Se você criou um usuário diferente, ajuste para:
```env
DATABASE_URL="postgresql://lodge_user:sua_senha_aqui@localhost:5432/lodge_management"
```

### 4. Executar Migrações

```bash
npm run db:generate
npm run db:push
```

## Opção 2: Docker PostgreSQL

### 1. Criar docker-compose.yml

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: lodge_management
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### 2. Iniciar Container

```bash
docker-compose up -d
```

## Opção 3: Supabase (Produção)

### 1. Criar Projeto Supabase

1. Acesse https://supabase.com
2. Crie um novo projeto
3. Copie a URL e a chave anônima

### 2. Configurar .env.local

```env
DATABASE_URL="postgresql://postgres.SUA_CHAVE@aws-0-sa-east-1.pooler.supabase.com:6543/postgres"
```

## Verificar Conexão

Para testar se a conexão está funcionando:

```bash
# Testar com Node.js
node -e "
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/lodge_management'
});
pool.query('SELECT NOW()').then(res => console.log('✅ Conexão OK:', res.rows[0])).catch(console.error);
"
```

## Iniciar Aplicação

```bash
npm run dev
```

A aplicação estará disponível em: http://localhost:3000

## Problemas Comuns

### Porta 5432 já em uso
```bash
# Verificar processo
lsof -i :5432

# Mudar porta no PostgreSQL
sudo -u postgres psql -c "ALTER SYSTEM SET port = 5433;"
```

### Permissão negada
```bash
# Verificar se o PostgreSQL está rodando
brew services list | grep postgresql  # macOS
sudo systemctl status postgresql    # Linux

# Iniciar serviço
brew services start postgresql     # macOS
sudo systemctl start postgresql    # Linux
```

### Senha incorreta
- Verifique a senha no arquivo `.env.local`
- Redefina a senha do PostgreSQL se necessário
