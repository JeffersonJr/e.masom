
export type MasonicDegree = 'Aprendiz' | 'Companheiro' | 'Mestre';

export const DEGREE_LEVELS: Record<MasonicDegree, number> = {
    'Aprendiz': 1,
    'Companheiro': 2,
    'Mestre': 3,
};

export function hasRequiredDegree(userDegree: MasonicDegree, requiredDegree: MasonicDegree): boolean {
    return DEGREE_LEVELS[userDegree] >= DEGREE_LEVELS[requiredDegree];
}

export function canAccessTreasury(cargo: string, isVeneravel: boolean): boolean {
    // Veneráveis and Tesoureiros usually have full access
    const treasuryCargos = ['Tesoureiro', '2º Tesoureiro'];
    return isVeneravel || treasuryCargos.includes(cargo);
}
