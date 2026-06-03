# 🏛️ e.mason — Governança Maçônica Digital

**e.mason** é uma plataforma premium de governança e administração digital para Potências (Grão-Mestrados / Grandes Orientes) e Oficinas (Lojas Maçônicas). Com uma interface elegante de alta fidelidade e fluxo seguro, o sistema automatiza ritos, controle financeiro, histórico litúrgico, e geração de carteirinhas de membros.

---

## 🎨 Identidade Visual e Estética Premium

O sistema utiliza um design clean, elegante e institucional baseado no contraste de cores tradicionais e tipografia moderna:
*   **60% Branco / Cinza Claro (`#ffffff` / `#f8fafc`)**: Telas de dados e áreas de trabalho limpas.
*   **30% Azul Profundo (`#031222`)**: Tom azul institucional para menus laterais, divisores e inputs.
*   **10% Ouro Destaque (`#d4af37`)**: Badges de plano, destaques litúrgicos e links importantes.
*   **Tipografia**: Sem serifa elegante (`Inter` / `sans-serif`) para alta legibilidade.

---

## 🚀 Principais Funcionalidades

### 1. Arquitetura de Permissões e Acessos (Multi-tenant)
*   **Nível Potência (Admin Master)**: Painel de controle global para gerenciar lojas federadas, relatórios consolidados, envio de comunicados gerais e finanças.
*   **Nível Loja (Admin Local)**: Painel específico para a Secretaria e Tesouraria da Loja gerenciar frequência dos obreiros, atas de sessões e contribuições mensais.
*   **Nível Usuário (Irmão)**: Perfil pessoal, acesso a materiais pedagógicos restritos por grau (Aprendiz, Companheiro e Mestre) e carteirinha digital de identificação.

### 2. Módulos e Gestão Integrada
*   **Identidade e Carteirinhas**: Emissão automática de carteirinhas de membros em formato vertical (celular) e horizontal (impressão física 85x55mm) com dados do CIM, foto e QR Code criptografado para validação rápida.
*   **Chamada Litúrgica Real**: Lançamento de presenças persistido diretamente em banco de dados conectado a dashboards de acompanhamento.
*   **Sindicância e Admissão**: Fluxo de aprovação de novos candidatos com controle de status (Pendente, Aprovado, Rejeitado).
*   **Tronco de Solidariedade Pix**: QR Code dinâmico do Pix da Hospitalaria de cada loja para facilitar arrecadações de caridade.

### 3. Integração de Faturamento e Assinaturas (Stripe)
*   **Billing Per-Seat (Por volume de uso)**: Cobrança inteligente segmentada:
    *   **Potência**: Paga taxa plana + adicionais por obreiro cadastrado + adicionais por loja federada + armazenamento de arquivos.
    *   **Loja**: Paga taxa plana + adicionais por obreiro cadastrado + armazenamento.
*   **Atualização em Tempo Real**: Quantidades de usuários sincronizadas de forma contínua com a Stripe.
*   **Stripe Webhook**: Processamento automático de aprovações de pagamento (`checkout.session.completed`), cancelamentos (`customer.subscription.deleted`) e histórico de faturamento (`invoice.payment_succeeded`).

### 4. Gateway de E-mails (Resend)
*   Disparo automatizado de e-mails em formato HTML premium com os seguintes templates configurados:
    *   Boas-vindas ao Cadastro.
    *   Confirmação de e-mail (Token).
    *   Recuperação de Senhas.
    *   Boas-vindas ao período trial (15 dias).
    *   Alerta de expiração de trial.
    *   Confirmação e recibo de Upgrade de planos.

---

## 🛠️ Tecnologias Utilizadas

*   **Frontend**: React (v19) + TypeScript + Vite + Tailwind CSS.
*   **Backend / Serverless**: Vercel Serverless Functions (Node.js/TS sob `api/`).
*   **Banco de Dados**: Neon Serverless Postgres.
*   **Pagamentos**: Stripe API REST (completamente integrado sem SDK pesado).
*   **E-mails**: Resend REST API (Templates HTML inline).

---

## 💻 Configuração Local

### 1. Requisitos
*   Node.js (v18+)
*   NPM ou Yarn

### 2. Instalação e Execução
Clone o repositório, instale as dependências e inicie o servidor local:
```bash
npm install
npm run dev
```

### 3. Variáveis de Ambiente (`.env`)
Copie o template abaixo em um arquivo `.env` na raiz do projeto:
```env
DATABASE_URL="postgresql://username:password@hostname/dbname?sslmode=require"
JWT_SECRET="sua_chave_secreta_jwt"

# Stripe
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Stripe Preços (Potências)
STRIPE_PRICE_POTENCIA_APRENDIZ_BASE="price_..."
STRIPE_PRICE_POTENCIA_COMPANHEIRO_BASE="price_..."
STRIPE_PRICE_POTENCIA_MESTRE_BASE="price_..."
STRIPE_PRICE_POTENCIA_OBREIRO="price_..."
STRIPE_PRICE_POTENCIA_LOJA="price_..."
STRIPE_PRICE_POTENCIA_STORAGE="price_..."

# Stripe Preços (Lojas)
STRIPE_PRICE_LOJA_APRENDIZ_BASE="price_..."
STRIPE_PRICE_LOJA_COMPANHEIRO_BASE="price_..."
STRIPE_PRICE_LOJA_MESTRE_BASE="price_..."
STRIPE_PRICE_LOJA_OBREIRO="price_..."
STRIPE_PRICE_LOJA_STORAGE="price_..."

# Resend
RESEND_API_KEY="re_..."
```

---

## ☁️ Deploy na Vercel

O projeto está otimizado para deploy instantâneo na Vercel. 
As configurações do compilador estão preparadas na raiz e as funções serverless localizadas em `/api` são mapeadas automaticamente para rotas de backend.

1.  Conecte o repositório na sua conta Vercel.
2.  Adicione as Variáveis de Ambiente listadas acima nas configurações do projeto na Vercel.
3.  Configure o Webhook da Stripe para enviar eventos para `https://seu-dominio.vercel.app/api/webhook/stripe`.
4.  Realize o Deploy.
