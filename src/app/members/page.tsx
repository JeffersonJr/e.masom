'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Users, 
  Calendar, 
  Bell, 
  Camera,
  Plus,
  Search,
  Filter,
  Cake,
  Edit,
  Eye,
  Mail,
  Phone
} from 'lucide-react'
import { formatDate, getDegreeName, getDegreeColor } from '@/lib/utils'

interface Member {
  id: string
  name: string
  email: string
  phone: string
  degree: number
  position?: string
  initiationDate: string
  birthDate: string
  photo?: string
  isActive: boolean
  address: string
}

interface Notice {
  id: string
  title: string
  content: string
  priority: 'low' | 'normal' | 'high' | 'urgent'
  targetDegree: number
  isActive: boolean
  expiryDate?: string
  createdBy: string
  createdAt: string
}

interface PhotoGallery {
  id: string
  title: string
  description: string
  eventDate: string
  coverPhoto: string
  photosCount: number
  isActive: boolean
  createdBy: string
  createdAt: string
}

export default function MembersPage() {
  const { data: session, status } = useSession()
  const [members, setMembers] = useState<Member[]>([])
  const [notices, setNotices] = useState<Notice[]>([])
  const [galleries, setGalleries] = useState<PhotoGallery[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDegree, setSelectedDegree] = useState<number>(0)

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      redirect('/login')
    }
    
    loadMockData()
  }, [session, status])

  const loadMockData = () => {
    // Dados mockados para demonstração
    setMembers([
      {
        id: '1',
        name: 'João Silva',
        email: 'joao.silva@email.com',
        phone: '(11) 98765-4321',
        degree: 3,
        position: 'Venerável Mestre',
        initiationDate: '2020-03-15',
        birthDate: '1985-06-15',
        photo: '/avatars/joao.jpg',
        isActive: true,
        address: 'Rua das Acácias, 123 - São Paulo/SP'
      },
      {
        id: '2',
        name: 'Pedro Santos',
        email: 'pedro.santos@email.com',
        phone: '(11) 97654-3210',
        degree: 2,
        position: '1° Vigilante',
        initiationDate: '2021-06-20',
        birthDate: '1990-12-10',
        photo: '/avatars/pedro.jpg',
        isActive: true,
        address: 'Av. dos Maçons, 456 - São Paulo/SP'
      },
      {
        id: '3',
        name: 'Carlos Oliveira',
        email: 'carlos.oliveira@email.com',
        phone: '(11) 96543-2109',
        degree: 1,
        position: '2° Vigilante',
        initiationDate: '2022-09-10',
        birthDate: '1988-03-25',
        photo: '/avatars/carlos.jpg',
        isActive: true,
        address: 'Rua do Esquadro, 789 - São Paulo/SP'
      },
      {
        id: '4',
        name: 'Antonio Costa',
        email: 'antonio.costa@email.com',
        phone: '(11) 95432-1098',
        degree: 1,
        initiationDate: '2023-01-15',
        birthDate: '1992-08-18',
        photo: '/avatars/antonio.jpg',
        isActive: true,
        address: 'Praça do Compasso, 321 - São Paulo/SP'
      },
      {
        id: '5',
        name: 'Francisco Lima',
        email: 'francisco.lima@email.com',
        phone: '(11) 94321-0987',
        degree: 1,
        initiationDate: '2023-11-20',
        birthDate: '1987-05-30',
        photo: '/avatars/francisco.jpg',
        isActive: true,
        address: 'Alameda do Nível, 654 - São Paulo/SP'
      }
    ])

    setNotices([
      {
        id: '1',
        title: 'Sessão Ordinária de Março',
        content: 'Convidamos todos os obreiros para a sessão ordinária do dia 15 de março, às 19:30h. Trazejamos vossos instrumentos.',
        priority: 'high',
        targetDegree: 1,
        isActive: true,
        expiryDate: '2026-03-16',
        createdBy: 'Venerável Mestre',
        createdAt: '2026-03-01'
      },
      {
        id: '2',
        title: 'Elevação de Graus',
        content: 'No dia 25 de março teremos sessão magna para elevação de graus. Compareçam pontualmente.',
        priority: 'urgent',
        targetDegree: 2,
        isActive: true,
        expiryDate: '2026-03-26',
        createdBy: 'Secretário',
        createdAt: '2026-03-05'
      },
      {
        id: '3',
        title: 'Pagamento de Mensalidades',
        content: 'Lembramos a todos os obreiros sobre o vencimento das mensalidades no dia 10 de março.',
        priority: 'normal',
        targetDegree: 1,
        isActive: true,
        expiryDate: '2026-03-11',
        createdBy: 'Tesoureiro',
        createdAt: '2026-03-01'
      }
    ])

    setGalleries([
      {
        id: '1',
        title: 'Sessão Magna - Janeiro 2026',
        description: 'Fotos da sessão magna de elevação de graus',
        eventDate: '2026-01-20',
        coverPhoto: '/galleries/magna_janeiro.jpg',
        photosCount: 45,
        isActive: true,
        createdBy: 'Mestre de Cerimônias',
        createdAt: '2026-01-21'
      },
      {
        id: '2',
        title: 'Festa de Aniversário da Loja',
        description: 'Celebração de aniversário da Loja',
        eventDate: '2025-12-15',
        coverPhoto: '/galleries/aniversario.jpg',
        photosCount: 68,
        isActive: true,
        createdBy: 'Secretário',
        createdAt: '2025-12-16'
      },
      {
        id: '3',
        title: 'Sessão Ordinária - Fevereiro 2026',
        description: 'Registro da sessão ordinária de fevereiro',
        eventDate: '2026-02-15',
        coverPhoto: '/galleries/ordinaria_fevereiro.jpg',
        photosCount: 32,
        isActive: true,
        createdBy: 'Mestre de Cerimônias',
        createdAt: '2026-02-16'
      }
    ])
  }

  const userDegree = session?.user?.degree || 1

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDegree = selectedDegree === 0 || member.degree === selectedDegree
    return matchesSearch && matchesDegree
  })

  const visibleNotices = notices.filter(notice => 
    notice.isActive && userDegree >= notice.targetDegree
  )

  const getPriorityBadge = (priority: string) => {
    const variants = {
      low: 'bg-gray-100 text-gray-800',
      normal: 'bg-blue-100 text-blue-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800'
    }
    
    const labels = {
      low: 'Baixa',
      normal: 'Normal',
      high: 'Alta',
      urgent: 'Urgente'
    }

    return (
      <Badge className={variants[priority as keyof typeof variants]}>
        {labels[priority as keyof typeof labels]}
      </Badge>
    )
  }

  const getUpcomingBirthdays = () => {
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentDay = today.getDate()
    
    return members
      .filter(member => {
        const birthDate = new Date(member.birthDate)
        return birthDate.getMonth() === currentMonth && 
               birthDate.getDate() >= currentDay
      })
      .sort((a, b) => {
        const dateA = new Date(a.birthDate).getDate()
        const dateB = new Date(b.birthDate).getDate()
        return dateA - dateB
      })
      .slice(0, 5)
  }

  const degrees = Array.from(new Set(members.map(member => member.degree))).sort((a, b) => a - b)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-masonic-blue text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold">Área dos Membros</h1>
              <p className="text-masonic-gold text-sm">
                Gestão de obreiros, avisos e eventos
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-white hover:bg-masonic-gray">
                Voltar ao Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Obreiros</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{members.length}</div>
              <p className="text-xs text-muted-foreground">
                Membros ativos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aniversariantes</CardTitle>
              <Cake className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getUpcomingBirthdays().length}</div>
              <p className="text-xs text-muted-foreground">
                Este mês
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avisos Ativos</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{visibleNotices.length}</div>
              <p className="text-xs text-muted-foreground">
                Para seu grau
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Galerias</CardTitle>
              <Camera className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{galleries.length}</div>
              <p className="text-xs text-muted-foreground">
                Álbuns de fotos
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="members" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="members">Obreiros</TabsTrigger>
            <TabsTrigger value="notices">Avisos</TabsTrigger>
            <TabsTrigger value="gallery">Galeria</TabsTrigger>
          </TabsList>

          {/* Obreiros */}
          <TabsContent value="members">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Gestão de Obreiros</CardTitle>
                    <CardDescription>Gerencie os membros da Loja</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Buscar obreiros..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <select
                      value={selectedDegree}
                      onChange={(e) => setSelectedDegree(Number(e.target.value))}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-masonic-blue"
                    >
                      <option value={0}>Todos os graus</option>
                      {degrees.map(degree => (
                        <option key={degree} value={degree}>
                          {getDegreeName(degree)}
                        </option>
                      ))}
                    </select>
                    {userDegree >= 3 && (
                      <Button className="masonic-blue">
                        <Plus className="mr-2 h-4 w-4" />
                        Novo Obreiro
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMembers.map((member) => (
                    <Card key={member.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={member.photo} alt={member.name} />
                            <AvatarFallback>
                              {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg truncate">{member.name}</CardTitle>
                            <CardDescription className="flex items-center space-x-2">
                              <Badge className={getDegreeColor(member.degree)}>
                                {getDegreeName(member.degree)}
                              </Badge>
                              {member.position && (
                                <Badge variant="outline">{member.position}</Badge>
                              )}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span className="truncate">{member.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span>{member.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>Iniciação: {formatDate(member.initiationDate)}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="mr-2 h-4 w-4" />
                            Ver
                          </Button>
                          {userDegree >= 3 && (
                            <Button size="sm" variant="outline">
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Avisos */}
          <TabsContent value="notices">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Mural de Avisos</CardTitle>
                        <CardDescription>Comunicados importantes da Loja</CardDescription>
                      </div>
                      {userDegree >= 3 && (
                        <Button className="masonic-blue">
                          <Plus className="mr-2 h-4 w-4" />
                          Novo Aviso
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {visibleNotices.map((notice) => (
                        <div key={notice.id} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-medium">{notice.title}</h4>
                                {getPriorityBadge(notice.priority)}
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{notice.content}</p>
                              <div className="text-xs text-gray-500">
                                Por: {notice.createdBy} • {formatDate(notice.createdAt)}
                                {notice.expiryDate && ` • Expira: ${formatDate(notice.expiryDate)}`}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Cake className="h-5 w-5 text-masonic-gold" />
                      <span>Aniversariantes</span>
                    </CardTitle>
                    <CardDescription>Obreiros fazendo aniversário este mês</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {getUpcomingBirthdays().map((member) => {
                        const birthDate = new Date(member.birthDate)
                        const day = birthDate.getDate()
                        const month = birthDate.getMonth() + 1
                        
                        return (
                          <div key={member.id} className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50">
                            <div className="w-10 h-10 bg-masonic-blue rounded-full flex items-center justify-center text-white font-semibold">
                              {day}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{member.name}</div>
                              <div className="text-sm text-gray-600">{day}/{month}</div>
                            </div>
                            <Badge className={getDegreeColor(member.degree)}>
                              {getDegreeName(member.degree)}
                            </Badge>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Galeria */}
          <TabsContent value="gallery">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Galeria de Fotos</CardTitle>
                    <CardDescription>Registros dos eventos da Loja</CardDescription>
                  </div>
                  {userDegree >= 2 && (
                    <Button className="masonic-blue">
                      <Plus className="mr-2 h-4 w-4" />
                      Nova Galeria
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {galleries.map((gallery) => (
                    <Card key={gallery.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-video bg-gray-200 relative">
                        <img
                          src={gallery.coverPhoto}
                          alt={gallery.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                          {gallery.photosCount} fotos
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{gallery.title}</CardTitle>
                        <CardDescription>{gallery.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="text-sm text-gray-600">
                            <div>Evento: {formatDate(gallery.eventDate)}</div>
                            <div>Criado por: {gallery.createdBy}</div>
                          </div>
                          <Button className="w-full masonic-blue">
                            <Camera className="mr-2 h-4 w-4" />
                            Ver Galeria
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
