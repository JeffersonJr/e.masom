import fs from 'fs';
import path from 'path';

// Local folder to store compiled HTML files for testing/previewing
const EMAILS_DIR = path.resolve(process.cwd(), 'api/lib/emails');

function ensureEmailsDir() {
  if (!fs.existsSync(EMAILS_DIR)) {
    fs.mkdirSync(EMAILS_DIR, { recursive: true });
  }
}

// Helper to wrap email content in a gorgeous, responsive, premium gold/dark-blue layout
function getBaseTemplate(title: string, bodyContent: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      background-color: #070b13;
      margin: 0;
      padding: 0;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #94a3b8;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #070b13;
      padding: 40px 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #0e1626;
      border: 1px solid #1e293b;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }
    .header-bar {
      height: 4px;
      background: linear-gradient(90deg, #d4af37, #f3e5ab, #d4af37);
    }
    .header {
      padding: 40px 20px 20px 20px;
      text-align: center;
      border-bottom: 1px solid rgba(212, 175, 55, 0.1);
    }
    .logo {
      font-size: 24px;
      font-weight: 900;
      color: #ffffff;
      text-decoration: none;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-family: 'Georgia', serif;
      font-style: italic;
    }
    .sublogo {
      font-size: 8px;
      color: #d4af37;
      text-transform: uppercase;
      letter-spacing: 0.25em;
      margin-top: 5px;
      font-weight: bold;
    }
    .content {
      padding: 40px 30px;
    }
    h1 {
      font-size: 22px;
      font-weight: bold;
      color: #ffffff;
      margin-top: 0;
      margin-bottom: 20px;
      font-family: 'Georgia', serif;
      font-style: italic;
      letter-spacing: -0.02em;
    }
    p {
      font-size: 14px;
      line-height: 1.6;
      margin-top: 0;
      margin-bottom: 20px;
    }
    .button-container {
      text-align: center;
      margin: 30px 0;
    }
    .button {
      display: inline-block;
      padding: 14px 30px;
      background-color: #d4af37;
      color: #070b13 !important;
      font-size: 11px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      text-decoration: none;
      border-radius: 6px;
      box-shadow: 0 4px 15px rgba(212, 175, 55, 0.2);
    }
    .button:hover {
      background-color: #f3e5ab;
    }
    .code-box {
      font-family: monospace;
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 0.2em;
      background-color: #070b13;
      border: 1px solid rgba(212, 175, 55, 0.2);
      color: #d4af37;
      padding: 20px;
      text-align: center;
      border-radius: 8px;
      margin: 25px 0;
    }
    .footer {
      padding: 30px;
      text-align: center;
      border-top: 1px solid #1e293b;
      background-color: #0b111c;
      font-size: 11px;
      color: #475569;
    }
    .footer p {
      margin: 0;
      font-size: 10px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header-bar"></div>
      <div class="header">
        <div class="logo">e.mason</div>
        <div class="sublogo">Soberana Ordem e Governança</div>
      </div>
      <div class="content">
        ${bodyContent}
      </div>
      <div class="footer">
        <p>© 2026 e.mason • Governança Maçônica Digital</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

export const emailService = {
  // 1. Email: Cadastro
  async sendWelcomeEmail(to: string, userName: string) {
    const title = 'Bem-vindo ao e.mason';
    const html = getBaseTemplate(title, `
      <h1>Saudações, Fraternas!</h1>
      <p>Prezado Irmão <strong>${userName}</strong>,</p>
      <p>Seja muito bem-vindo ao <strong>e.mason</strong>, a plataforma definitiva para a governança e administração de potências e oficinas maçônicas.</p>
      <p>Seu cadastro foi realizado com sucesso. Agora, sua oficina possui acesso a ferramentas completas de gestão de obreiros, tesouraria, controle de presenças digital, convites litúrgicos e rituais restritos.</p>
      <div class="button-container">
        <a href="https://e-masom.vercel.app/login" class="button">Acessar Painel</a>
      </div>
      <p>Que o Grande Arquiteto do Universo ilumine e guie os trabalhos em vossa oficina.</p>
    `);
    await this.mockSend('cadastro', to, title, html);
  },

  // 2. Email: Confirmação de e-mail
  async sendEmailVerification(to: string, code: string) {
    const title = 'Confirmação de E-mail';
    const html = getBaseTemplate(title, `
      <h1>Validação de Credencial</h1>
      <p>Olá,</p>
      <p>Para concluir a ativação de sua conta e garantir a integridade e segurança de nossa jurisdição, insira o código de validação abaixo no formulário de verificação:</p>
      <div class="code-box">${code}</div>
      <p>Este código expira em 10 minutos. Se você não solicitou este cadastro, ignore este e-mail com segurança.</p>
    `);
    await this.mockSend('confirmacao_email', to, title, html);
  },

  // 3. Email: Recuperação de senha
  async sendPasswordRecovery(to: string, resetLink: string) {
    const title = 'Restauração de Senha';
    const html = getBaseTemplate(title, `
      <h1>Protocolo de Recuperação de Senha</h1>
      <p>Recebemos uma solicitação para restaurar a credencial de acesso associada a este e-mail.</p>
      <p>Clique no link abaixo para definir uma nova senha. Por segurança, este link é válido por 15 minutos.</p>
      <div class="button-container">
        <a href="https://e-masom.vercel.app${resetLink}" class="button">Redefinir Credencial</a>
      </div>
      <p>Se você não fez essa solicitação, ignore este aviso. Nenhuma alteração foi efetuada.</p>
    `);
    await this.mockSend('recuperacao_senha', to, title, html);
  },

  // 4. Email: Acesso 15 dias (Boas-vindas ao Trial)
  async sendTrialWelcome(to: string, userName: string, potencyName: string) {
    const title = 'Sua Instância de 15 Dias está Pronta!';
    const html = getBaseTemplate(title, `
      <h1>Instanciação de Potência</h1>
      <p>Prezado Irmão <strong>${userName}</strong>,</p>
      <p>Temos a satisfação de informar que a instância provisória de testes para a potência <strong>${potencyName}</strong> foi criada com sucesso e está ativa por <strong>15 dias</strong>.</p>
      <p>A partir de agora, você pode explorar todas as funcionalidades:</p>
      <ul>
        <li>Configuração de Lojas Federadas</li>
        <li>Livro de Presença Digital e Workflow de Iniciação</li>
        <li>Geração de Carteirinhas Digitais e Físicas</li>
        <li>Tronco de solidariedade via Pix da Hospitalaria</li>
      </ul>
      <div class="button-container">
        <a href="https://e-masom.vercel.app/login" class="button">Iniciar Teste Gratuito</a>
      </div>
      <p>Nosso suporte está disponível caso necessite de orientações litúrgicas ou técnicas.</p>
    `);
    await this.mockSend('acesso_15_dias', to, title, html);
  },

  // 5. Email: Acesso temporário chegando ao fim
  async sendTrialEndingWarning(to: string, userName: string, daysLeft: number) {
    const title = 'Atenção: Seu Período de Testes está Próximo do Fim';
    const html = getBaseTemplate(title, `
      <h1>Aviso de Expiração de Instância</h1>
      <p>Prezado Irmão <strong>${userName}</strong>,</p>
      <p>Seu período de testes gratuitos no <strong>e.mason</strong> está chegando ao fim. Restam apenas <strong>${daysLeft} dias</strong> de acesso gratuito à plataforma.</p>
      <p>Para evitar qualquer interrupção na gestão de suas lojas e obreiros, faça o upgrade de plano diretamente na aba de configurações do seu painel administrativo.</p>
      <p>Oferecemos planos segmentados de acordo com o número de obreiros por loja para atender perfeitamente as vossas oficinas.</p>
      <div class="button-container">
        <a href="https://e-masom.vercel.app/admin/config" class="button">Fazer Upgrade Agora</a>
      </div>
    `);
    await this.mockSend('acesso_expirando', to, title, html);
  },

  // 6. Email: Upgrade de plano (Confirmação)
  async sendUpgradeConfirmation(to: string, potencyName: string, planName: string, limit: string) {
    const title = 'Confirmação de Upgrade de Plano';
    const html = getBaseTemplate(title, `
      <h1>Plano de Assinatura Atualizado!</h1>
      <p>Saudações,</p>
      <p>Confirmamos a migração de plano para a potência <strong>${potencyName}</strong>.</p>
      <p>Seu plano vigente agora é: <strong>Plano ${planName}</strong>.</p>
      <p><strong>Especificação do Plano:</strong> ${limit}</p>
      <p>Agradecemos pela parceria e confiança na modernização de vossa governança maçônica.</p>
      <div class="button-container">
        <a href="https://e-masom.vercel.app/admin" class="button">Ir para o Painel</a>
      </div>
    `);
    await this.mockSend('upgrade_plano', to, title, html);
  },

  // Resend sender/backup helper
  async mockSend(type: string, to: string, subject: string, html: string) {
    ensureEmailsDir();
    const filename = `${type}_${Date.now()}.html`;
    const filepath = path.join(EMAILS_DIR, filename);

    try {
      fs.writeFileSync(filepath, html, 'utf8');
      console.log(`[EMAIL LOGGED] Preview locally: file://${filepath}`);
    } catch (err) {
      console.error(`Failed to write email file backup:`, err);
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        console.log(`[RESEND] Attempting to dispatch email to: ${to}...`);
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`
          },
          body: JSON.stringify({
            from: 'e.mason <onboarding@resend.dev>', // Resend Sandbox Sender
            to: [to],
            subject: subject,
            html: html
          })
        });

        const data: any = await res.json();
        if (!res.ok) {
          console.error(`[RESEND ERROR] Status ${res.status}:`, data);
        } else {
          console.log(`[RESEND SUCCESS] Email dispatched. ID:`, data.id);
        }
      } catch (err) {
        console.error(`[RESEND DISPATCH FAILED]:`, err);
      }
    } else {
      console.log(`[EMAIL DISPATCH SKIPPED] RESEND_API_KEY is not defined. Using local file preview.`);
    }
  }
};
