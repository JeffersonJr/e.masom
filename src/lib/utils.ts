import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function getDegreeName(degree: number): string {
  const degrees = {
    1: 'Aprendiz',
    2: 'Companheiro', 
    3: 'Mestre',
    4: 'Mestre Adorado',
    5: 'Perfeito Maçom',
    6: 'Secretário Íntimo',
    7: 'Preboste e Juiz',
    8: 'Intendente dos Edifícios',
    9: 'Mestre Eleito dos Nove',
    10: 'Mestre Eleito dos Quinze',
    11: 'Sublime Cavaleiro Eleito',
    12: 'Grão Mestre Arquiteto',
    13: 'Real Arco',
    14: 'Perfeito Maçom',
    15: 'Cavaleiro do Oriente',
    16: 'Príncipe de Jerusalém',
    17: 'Cavaleiro do Oriente e do Ocidente',
    18: 'Soberano Príncipe Rosa-Cruz',
    19: 'Grande Pontífice',
    20: 'Venerável Grão Mestre',
    21: 'Noachita ou Cavaleiro Prussiano',
    22: 'Cavaleiro do Real Machado',
    23: 'Chefe do Tabernáculo',
    24: 'Príncipe do Tabernáculo',
    25: 'Cavaleiro da Serpente de Bronze',
    26: 'Príncipe da Mercê',
    27: 'Grande Comendador do Templo',
    28: 'Cavaleiro do Sol',
    29: 'Grande Escocês de Santo André',
    30: 'Cavaleiro Kadosh',
    31: 'Grande Inspetor Inquisidor',
    32: 'Sublime Príncipe do Real Segredo',
    33: 'Soberano Grande Inspetor Geral',
  }
  return degrees[degree as keyof typeof degrees] || `Grau ${degree}`
}

export function getDegreeColor(degree: number): string {
  if (degree <= 3) return 'text-blue-600'
  if (degree <= 9) return 'text-purple-600'
  if (degree <= 18) return 'text-amber-600'
  if (degree <= 30) return 'text-red-600'
  return 'text-yellow-600'
}

export function canAccessContent(userDegree: number, requiredDegree: number): boolean {
  return userDegree >= requiredDegree
}

export function generateQRCodeText(sessionId: string, userId: string): string {
  return `SESSION:${sessionId}:USER:${userId}`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
