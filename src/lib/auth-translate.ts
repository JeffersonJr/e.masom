
export const translateAuthError = (message: string): string => {
    const msg = message.toLowerCase();

    if (msg.includes('invalid login credentials')) {
        return 'Credenciais de acesso inválidas. Verifique seu e-mail e senha.';
    }
    if (msg.includes('email not confirmed')) {
        return 'E-mail não confirmado. Por favor, verifique sua caixa de entrada para ativar sua conta.';
    }
    if (msg.includes('user already registered')) {
        return 'Este e-mail já está cadastrado em nossa plataforma.';
    }
    if (msg.includes('password should be at least 6 characters')) {
        return 'A senha deve conter pelo menos 6 caracteres.';
    }
    if (msg.includes('invalid email')) {
        return 'O endereço de e-mail informado não é válido.';
    }
    if (msg.includes('too many requests')) {
        return 'Muitas tentativas em curto período. Por favor, aguarde alguns minutos antes de tentar novamente.';
    }
    if (msg.includes('missing email or phone')) {
        return 'Por favor, informe seu e-mail para continuar.';
    }

    // Default fallback if no specific translation matches
    return message;
};
