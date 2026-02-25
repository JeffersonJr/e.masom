
import InternalHero from '../components/InternalHero';

export default function Privacidade() {
    return (
        <div className="bg-background">
            <InternalHero
                badge="Transparência"
                title={<>Privacidade <br /><span className="text-accent underline decoration-accent/30 decoration-offset-8">Soberana.</span></>}
                subtitle="Nossa política de tratamento de dados respeita o sigilo absoluto e a soberania do indivíduo."
            />

            <section className="py-24 px-6 max-w-4xl mx-auto">
                <div className="prose prose-slate max-w-none text-primary/80 font-medium">
                    <h2 className="text-3xl font-black text-primary mb-8 tracking-tight font-serif italic">1. Coleta de Dados</h2>
                    <p className="mb-8 leading-relaxed">
                        Coletamos apenas as informações estritamente necessárias para a gestão administrativa das jurisdições. Isso inclui dados básicos de identificação, formação maçônica e registros financeiros internos das oficinas.
                    </p>

                    <h2 className="text-3xl font-black text-primary mb-8 tracking-tight font-serif italic">2. Uso da Informação</h2>
                    <p className="mb-8 leading-relaxed">
                        Os dados são utilizados exclusivamente para o funcionamento das ferramentas de governança, emissão de metais e comunicação institucional dentro da própria Potência/Lojas. Não compartilhamos informações com terceiros externos à jurisdição.
                    </p>

                    <h2 className="text-3xl font-black text-primary mb-8 tracking-tight font-serif italic">3. Segurança</h2>
                    <p className="mb-8 leading-relaxed">
                        Utilizamos tecnologias de isolamento total de dados (Row Level Security) e criptografia de ponta para garantir que cada Loja e cada Obreiro acessem apenas aquilo que lhes é de direito, conforme seus Graus e Cargos.
                    </p>

                    <h2 className="text-3xl font-black text-primary mb-8 tracking-tight font-serif italic">4. Seus Direitos</h2>
                    <p className="mb-8 leading-relaxed">
                        Todo obreiro tem o direito de consultar seus dados e solicitar correções junto à Secretaria de sua respectiva oficina, conforme as leis vigentes e o Regimento Interno de sua Jurisdição.
                    </p>
                </div>
            </section>
        </div>
    );
}
