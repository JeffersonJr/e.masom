import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Configuração do OpenAI via Vercel AI Gateway
// O Gateway unifica múltiplas APIs e oferece monitoramento e fallbacks.
const openai = createOpenAI({
    apiKey: import.meta.env.AI_GATEWAY_API_KEY || '',
    // Se for usar o AI Gateway da Vercel, a URL base deve ser apontada para o gateway
    // baseURL: 'https://gateway.ai.cloudflare.com/v1/...', // Ou conforme documentação da Vercel
});

/**
 * Serviço de IA para geração de texto
 * Utiliza o modelo gpt-4 pelo gateway da Vercel.
 */
export async function generateManagementInsight(prompt: string) {
    try {
        const result = streamText({
            model: openai('gpt-4o'),
            prompt: prompt,
            system: 'Você é um assistente especializado em gestão e governança maçônica, focado em sobriedade e eficiência.',
        });

        return result;
    } catch (error) {
        console.error('Erro ao gerar insight de IA:', error);
        throw error;
    }
}
