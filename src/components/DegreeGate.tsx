
import type { ReactNode } from 'react';
import type { MasonicDegree } from '../lib/rbac';
import { hasRequiredDegree } from '../lib/rbac';

interface DegreeGateProps {
    children: ReactNode;
    userDegree: MasonicDegree;
    requiredDegree: MasonicDegree;
    fallback?: ReactNode;
}

export default function DegreeGate({
    children,
    userDegree,
    requiredDegree,
    fallback = <div className="p-4 bg-slate-50 rounded-md border border-slate-200 text-xs text-slate-400 italic">Conteúdo restrito ao Grau de {requiredDegree}</div>
}: DegreeGateProps) {
    if (hasRequiredDegree(userDegree, requiredDegree)) {
        return <>{children}</>;
    }

    return <>{fallback}</>;
}
