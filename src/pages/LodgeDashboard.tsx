
import { useParams } from 'react-router-dom';

export default function LodgeDashboard() {
    const { lodgeSlug } = useParams();

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-mason-blue mb-6">Painel da Loja: {lodgeSlug}</h1>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                <p className="text-slate-600">Gestão interna da loja, tesouraria e documentos.</p>
            </div>
        </div>
    );
}
