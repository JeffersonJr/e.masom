
import InternalHero from '../components/InternalHero';
import { Shield, Lock, EyeOff, Server } from 'lucide-react';

export default function Seguranca() {
    return (
        <div className="bg-background">
            <InternalHero
                badge="Infraestrutura"
                title={<>Segurança <br /><span className="text-accent underline decoration-accent/30 decoration-offset-8">Inquebrável.</span></>}
                subtitle="Tecnologia de nível militar para proteger o sigilo secular da Ordem."
            />

            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <SecurityFeature
                            icon={Shield}
                            title="Isolamento RLS"
                            description="Row Level Security garante que os dados de uma Loja sejam fisicamente inacessíveis por outra, criando um ambiente multi-inquilino (multi-tenant) de segurança absoluta."
                        />
                        <SecurityFeature
                            icon={Lock}
                            title="Criptografia AES-256"
                            description="Todos os dados sensíveis e documentos são criptografados em repouso e em trânsito, utilizando os mais altos padrões da indústria tecnológica."
                        />
                        <SecurityFeature
                            icon={EyeOff}
                            title="Acesso por Graus"
                            description="O sistema reconhece a hierarquia maçônica. Atas e documentos de Graus superiores são invisíveis para quem não possui a respectiva elevação."
                        />
                        <SecurityFeature
                            icon={Server}
                            title="Backup Georredundante"
                            description="Nossa infraestrutura conta com cópias de segurança em múltiplas zonas geográficas, garantindo a perenidade do histórico institucional."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

function SecurityFeature({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
    return (
        <div className="p-12 bg-muted/20 border border-border rounded-xl group hover:border-accent/40 transition-all">
            <div className="w-16 h-16 bg-primary text-accent rounded-md flex items-center justify-center mb-8 shadow-xl">
                <Icon size={32} />
            </div>
            <h3 className="text-3xl font-black text-primary mb-6 tracking-tight italic font-serif">{title}</h3>
            <p className="text-muted-foreground leading-relaxed font-medium italic">{description}</p>
        </div>
    );
}
