
import InternalHero from '../components/InternalHero';

export default function Termos() {
    return (
        <div className="bg-background min-h-screen">
            <InternalHero
                badge="Conformidade"
                title={<>Termos de <br /><span className="text-accent underline decoration-accent/30 decoration-offset-8">Uso.</span></>}
                subtitle="Regras e diretrizes para o uso ético e seguro da plataforma e.mason."
            />

            <section className="py-24 px-6 max-w-4xl mx-auto">
                <div className="prose prose-slate max-w-none text-primary/80 font-medium">
                    <h2 className="text-3xl font-black text-primary mb-8 tracking-tight font-serif italic">1. Aceitação dos Termos</h2>
                    <p className="mb-8 leading-relaxed">
                        Ao acessar a plataforma e.mason, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais e regulamentos internos de sua Jurisdição.
                    </p>

                    <h2 className="text-3xl font-black text-primary mb-8 tracking-tight font-serif italic">2. Licença de Uso</h2>
                    <p className="mb-8 leading-relaxed">
                        A licença concedida é para uso interno e institucional, conforme o plano contratado pela sua Potência ou Loja. É vetada a redistribuição, engenharia reversa ou uso para fins não condizentes com a finalidade de governança maçônica.
                    </p>

                    <h2 className="text-3xl font-black text-primary mb-8 tracking-tight font-serif italic">3. Responsabilidades</h2>
                    <p className="mb-8 leading-relaxed">
                        Cada usuário é responsável pela guarda de suas credenciais de acesso. O e.mason não se responsabiliza por atos decorrentes de negligência na segurança das senhas individuais. A integridade das informações lançadas é de responsabilidade exclusiva da Loja ou Potência detentora da conta.
                    </p>

                    <h2 className="text-3xl font-black text-primary mb-8 tracking-tight font-serif italic">4. Modificações</h2>
                    <p className="mb-8 leading-relaxed">
                        O e.mason pode revisar estes termos de serviço a qualquer momento, visando sempre a melhoria da segurança e conformidade da plataforma. O uso continuado do sistema implica na aceitação dos termos revisados.
                    </p>
                </div>

                <div className="mt-16 pt-12 border-t border-border flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">
                    <span>Jurisdição Digital Soberana</span>
                    <span>Atualizado: Fevereiro 2026</span>
                </div>
            </section>
        </div>
    );
}
