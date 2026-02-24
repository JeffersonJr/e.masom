import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isAuthenticated = !!req.auth
  const userDegree = req.auth?.user?.degree || 1

  // Rotas públicas
  const publicRoutes = ['/', '/login', '/site', '/api/auth']
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Se não está autenticado e não é rota pública, redirecionar para login
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Proteção de rotas por grau
  const protectedRoutes = {
    '/dashboard': 1, // Todos os membros
    '/treasury': 3, // Apenas Mestres e acima
    '/secretary': 2, // Companheiro e acima
    '/library': 1, // Todos os membros
    '/members': 1, // Todos os membros
    '/site-builder': 3, // Apenas Mestres e acima
    '/admin': 3, // Apenas Mestres e acima
  }

  for (const [route, requiredDegree] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(route) && userDegree < requiredDegree) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
