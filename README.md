# Sistema Integrado de Gestão Maçônica

Plataforma completa para gestão de Loja Maçônica com controle de acesso por grau, dashboard administrativo e site público.

## 🏗️ Arquitetura

### Tecnologias Utilizadas
- **Frontend**: Next.js 14, React 18, TypeScript
- **UI**: Tailwind CSS, Shadcn/UI, Radix UI
- **Backend**: Next.js API Routes, Drizzle ORM
- **Database**: PostgreSQL
- **Auth**: NextAuth.js com controle por grau maçônico
- **File Upload**: React Dropzone
- **PDF Generation**: jsPDF
- **QR Code**: react-qrcode

## 📋 Módulos

### 🔐 Autenticação e Controle de Acesso
- Sistema de login seguro com NextAuth.js
- Controle de acesso por grau maçônico (1-33)
- Middleware de proteção de rotas
- Sessões gerenciadas por JWT

### 👥 Gestão de Membros
- Cadastro completo de obreiros
- Controle por grau maçônico
- Histórico de presenças (Chancelaria)
- Fotos e informações pessoais
- Cargos e posições

### 💰 Tesouraria
- Fluxo de caixa completo
- Controle de mensalidades
- Contas a pagar/receber
- Tronco de Beneficência (separado)
- Relatórios financeiros em PDF

### 📚 Biblioteca Digital
- Repositório de pranchas e rituais
- Organização por grau maçônico
- Controle de acesso por conteúdo
- Upload e download seguro

### 📝 Secretaria
- Gestão de Balaústres (atas)
- Calendário de sessões
- Controle de presença via QR Code
- Documentos administrativos

### 🖼️ Galeria de Fotos
- Upload de fotos de eventos
- Galerias organizadas
- Controle de acesso

### 🌐 Site Builder
- 3 templates disponíveis
- Editor de identidade visual
- Upload de logo e favicon
- Paleta de cores personalizável
- Gerenciador de páginas simples

## 🚀 Instalação

### Pré-requisitos
- Node.js 18+
- PostgreSQL
- npm ou yarn

### Passos

1. **Clone o repositório**
   ```bash
   git clone <repository-url>
   cd e.masom
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure o ambiente**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Configure as variáveis de ambiente:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/lodge_management"
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Configure o banco de dados**
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. **Inicie o desenvolvimento**
   ```bash
   npm run dev
   ```

Acesse `http://localhost:3000`

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router Next.js
│   ├── api/               # API Routes
│   ├── dashboard/         # Dashboard principal
│   ├── login/             # Página de login
│   ├── members/           # Gestão de membros
│   ├── treasury/          # Tesouraria
│   ├── library/           # Biblioteca digital
│   ├── secretary/         # Secretaria
│   ├── gallery/           # Galeria de fotos
│   └── site-builder/      # Site builder
├── components/
│   ├── ui/                # Componentes UI (Shadcn)
│   └── ...                # Componentes específicos
├── lib/
│   ├── db/                # Database schema e conexão
│   ├── auth.ts            # Configuração NextAuth
│   └── utils.ts           # Utilitários
└── types/                 # Tipos TypeScript
```

## 🔐 Níveis de Acesso

O sistema implementa controle rigoroso por grau maçônico:

- **Aprendiz (1°)**: Acesso básico ao dashboard e módulos fundamentais
- **Companheiro (2°)**: Acesso à secretaria e documentos
- **Mestre (3°)**: Acesso completo incluindo tesouraria e site builder
- **Graus Filosóficos (4°-33°)**: Acesso a conteúdos filosóficos especiais

## 🎨 Design e UX

- **Cores Temáticas**: Azul marinho, dourado e cinza escuro
- **Design Responsivo**: 100% mobile-friendly
- **Componentes Modernos**: Baseados em Shadcn/UI
- **Acessibilidade**: Segue padrões WCAG

## 📱 Funcionalidades Mobile

O sistema é totalmente responsivo e otimizado para uso em:
- Smartphones durante reuniões
- Tablets para gestão administrativa
- Desktop para operações completas

## 🔒 Segurança

- Autenticação segura com NextAuth.js
- Controle de acesso granular
- Middleware de proteção
- Validação de inputs
- SQL Injection protection via Drizzle ORM

## 📊 Relatórios

Sistema gera relatórios automáticos:
- Financeiros (PDF)
- Presença em sessões
- Estatísticas de membros
- Histórico de documentos

## 🌐 Site Público

O sistema inclui um site builder com:
- 3 templates profissionais
- Personalização completa
- Integração com dados da loja
- Design responsivo

## 🤝 Contribuição

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob licença MIT.

## 📞 Suporte

Para suporte técnico ou dúvidas, entre em contato através do sistema de tickets da loja.

---

**Desenvolvido com ❤️ para a comunidade maçônica**
