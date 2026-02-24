'use client'

import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const errorMessages: Record<string, string> = {
    'CredentialsSignin': 'Email ou senha incorretos',
    'AccessDenied': 'Acesso negado',
    'OAuthSignin': 'Erro ao autenticar com provedor',
    'OAuthCallback': 'Erro no callback de autenticação',
    'OAuthCreateAccount': 'Erro ao criar conta',
    'EmailCreateAccount': 'Erro ao criar conta com email',
    'Callback': 'Erro no callback de autenticação',
    'OAuthAccountNotLinked': 'Conta não vinculada',
    'SessionRequired': 'Sessão requerida',
    'Default': 'Erro de autenticação'
  }

  const errorMessage = errorMessages[error || ''] || errorMessages['Default']

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-600">
            Erro de Autenticação
          </CardTitle>
          <CardDescription>
            Ocorreu um erro durante o processo de autenticação
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-red-50 p-4 border border-red-200">
            <p className="text-sm text-red-800 font-medium">
              {errorMessage}
            </p>
            {error && (
              <p className="text-xs text-red-600 mt-2">
                Código do erro: {error}
              </p>
            )}
          </div>
          
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/login">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Tentar Novamente
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="w-full">
              <Link href="/">
                Página Inicial
              </Link>
            </Button>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>Se o problema persistir, contate o administrador:</p>
            <p className="font-medium">veneravel@lojamaconica.com.br</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
