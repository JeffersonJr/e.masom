
import { useParams } from 'react-router-dom';

export default function LodgePublic() {
    const { lodgeSlug } = useParams();

    return (
        <div className="min-h-screen bg-slate-50">
            <section className="bg-mason-blue py-20 text-center px-4">
                <h1 className="text-4xl font-bold text-white mb-4">Loja Maçônica {lodgeSlug}</h1>
                <p className="text-mason-green font-medium">Potência Federada</p>
            </section>

            <section className="max-w-4xl mx-auto py-16 px-4">
                <div className="bg-white p-8 rounded-xl shadow-md">
                    <h2 className="text-2xl font-bold text-mason-blue mb-6">Interesse em Ingressar</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo</label>
                            <input type="text" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-mason-green outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
                            <input type="email" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-mason-green outline-none" />
                        </div>
                        <button type="submit" className="w-full py-3 bg-mason-green text-mason-blue font-bold rounded-md hover:bg-mason-green-light transition duration-300">
                            Enviar Solicitação de Sindicância
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}
