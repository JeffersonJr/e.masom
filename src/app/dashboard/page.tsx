'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SafeRender } from '@/components/ui/safe-render'
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  Calendar, 
  FileText, 
  Camera, 
  Settings,
  Home,
  Bell
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Carregando...</div>
  }

  if (!session) {
    redirect('/login')
  }

  const userDegree = session.user.degree
  const userName = session.user.name

  const modules = [
    {
      title: 'Membros',
      description: 'Gestão de obreiros e avisos',
      icon: Users,
      href: '/members',
      degree: 1,
      color: 'bg-blue-500'
    },
    {
      title: 'Biblioteca',
      description: 'Pranchas, rituais e documentos',
      icon: BookOpen,
      href: '/library',
      degree: 1,
      color: 'bg-green-500'
    },
    {
      title: 'Tesouraria',
      description: 'Controle financeiro e mensalidades',
      icon: DollarSign,
      href: '/treasury',
      degree: 3,
      color: 'bg-yellow-500'
    },
    {
      title: 'Secretaria',
      description: 'Balaústres e calendário',
      icon: Calendar,
      href: '/secretary',
      degree: 2,
      color: 'bg-purple-500'
    },
    {
      title: 'Documentos',
      description: 'Gestão de arquivos e atas',
      icon: FileText,
      href: '/documents',
      degree: 2,
      color: 'bg-red-500'
    },
    {
      title: 'Galeria',
      description: 'Fotos de eventos',
      icon: Camera,
      href: '/gallery',
      degree: 1,
      color: 'bg-pink-500'
    },
    {
      title: 'Site Builder',
      description: 'Personalização do site público',
      icon: Settings,
      href: '/site-builder',
      degree: 3,
      color: 'bg-indigo-500'
    },
    {
      title: 'Página Inicial',
      description: 'Visitar site público',
      icon: Home,
      href: '/',
      degree: 1,
      color: 'bg-gray-500'
    }
  ]

  const accessibleModules = modules.filter(module => userDegree >= module.degree)

  return (
    <SafeRender fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    }>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-masonic-blue text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div>
                <h1 className="text-2xl font-bold">Portal Maçônico</h1>
                <p className="text-masonic-gold text-sm">
                  Bem-vindo, {userName} • {getDegreeName(userDegree)}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="text-white hover:bg-masonic-gray">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" className="text-white hover:bg-masonic-gray">
                  Sair
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
            <p className="text-gray-600 mt-2">
              Gerencie sua Loja Maçônica com nossas ferramentas integradas
            </p>
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accessibleModules.map((module) => {
              const IconComponent = module.icon
              return (
                <Card key={module.title} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${module.color}`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        <CardDescription>{module.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Link href={module.href}>
                      <Button className="w-full masonic-blue">
                        Acessar Módulo
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Membros Ativos</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">
                  +2 desde último mês
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sessões este Mês</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">
                  Próxima: 15/03
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 8.400</div>
                <p className="text-xs text-muted-foreground">
                  85% arrecadado
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Documentos</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127</div>
                <p className="text-xs text-muted-foreground">
                  12 novos este mês
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SafeRender>
  )
}

function getDegreeName(degree: number): string {
  const degrees = {
    1: 'Aprendiz',
    2: 'Companheiro', 
    3: 'Mestre',
    4: 'Mestre Adorado',
    5: 'Perfeito Maçom',
    // ... outros graus
  }
  return degrees[degree as keyof typeof degrees] || `Grau ${degree}`
}
