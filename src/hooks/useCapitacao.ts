
import { useState, useMemo } from 'react';

export interface Obreiro {
    id: string;
    nome: string;
    grau: 'Aprendiz' | 'Companheiro' | 'Mestre';
    status: 'Ativo' | 'Quiescente' | 'Irregular';
}

export function useCapitacao(obreiros: Obreiro[], taxaBase: number) {
    const [taxaFederativa, setTaxaFederativa] = useState(taxaBase);

    const ativosCount = useMemo(() => {
        return obreiros.filter(o => o.status === 'Ativo').length;
    }, [obreiros]);

    const totalMensal = useMemo(() => {
        return ativosCount * taxaFederativa;
    }, [ativosCount, taxaFederativa]);

    const stats = {
        totalObreiros: obreiros.length,
        ativos: ativosCount,
        taxaPorObreiro: taxaFederativa,
        totalFatura: totalMensal,
    };

    return { stats, setTaxaFederativa };
}
