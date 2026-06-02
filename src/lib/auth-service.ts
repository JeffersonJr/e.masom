export interface TrialSignupData {
    name: string;
    email: string;
    password: string;
    potencyName: string;
}

export const authService = {
    async signupTrial(data: TrialSignupData) {
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.error || 'Falha ao realizar cadastro.');
        }

        return await res.json();
    }
};
