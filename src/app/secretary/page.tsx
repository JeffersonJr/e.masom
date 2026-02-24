'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calendar, 
  Users, 
  FileText, 
  QrCode,
  Plus,
  Edit,
  Download,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'
import { formatDate, formatDateTime } from '@/lib/utils'

interface Session {
  id: string
  title: string
  description: string
  sessionType: string
  sessionDate: string
  startTime: string
  endTime: string
  location: string
  status: 'scheduled' | 'in_progress' | 'completed'
}

interface Attendance {
  id: string
  sessionId: string
  userName: string
  userDegree: number
  status: 'present' | 'absent' | 'justified'
  checkInTime?: string
  notes?: string
}

interface Balastre {
  id: string
  title: string
  sessionDate: string
  sessionType: string
  content: string
  status: 'draft' | 'approved' | 'published'
  createdBy: string
  createdAt: string
}

export default function SecretaryPage() {
  const { data: session, status } = useSession()
  const [sessions, setSessions] = useState<Session[]>([])
  const [attendances, setAttendances] = useState<Attendance[]>([])
  const [balastres, setBalastres] = useState<Balastre[]>([])
  const [selectedSession, setSelectedSession] = useState<string>('')

  useEffect(() => {
    if (status === 'loading') return
    if (!session || session.user.degree < 2) {
      redirect('/dashboard')
    }
    
    loadMockData()
  }, [session, status])

  const loadMockData = () => {
    // Dados mockados para demonstração
    setSessions([
      {
        id: '1',
        title: 'Sessão Ordinária de Março',
        description: 'Sessão mensal regular da Loja',
        sessionType: 'Ordinária',
        sessionDate: '2026-03-15',
        startTime: '19:30',
        endTime: '22:00',
        location: 'Templo da Loja',
        status: 'scheduled'
      },
      {
        id: '2',
        title: 'Sessão Magna de Elevação',
        description: 'Elevação de Aprendizes a Companheiros',
        sessionType: 'Magna',
        sessionDate: '2026-03-25',
        startTime: '19:00',
        endTime: '23:00',
        location: 'Templo da Loja',
        status: 'scheduled'
      },
      {
        id: '3',
        title: 'Sessão Ordinária de Fevereiro',
        description: 'Sessão mensal regular da Loja',
        sessionType: 'Ordinária',
        sessionDate: '2026-02-15',
        startTime: '19:30',
        endTime: '22:00',
        location: 'Templo da Loja',
        status: 'completed'
      }
    ])

    setAttendances([
      {
        id: '1',
        sessionId: '3',
        userName: 'João Silva',
        userDegree: 1,
        status: 'present',
        checkInTime: '2026-02-15T19:25:00'
      },
      {
        id: '2',
        sessionId: '3',
        userName: 'Pedro Santos',
        userDegree: 2,
        status: 'present',
        checkInTime: '2026-02-15T19:30:00'
      },
      {
        id: '3',
        sessionId: '3',
        userName: 'Carlos Oliveira',
        userDegree: 3,
        status: 'absent'
      },
      {
        id: '4',
        sessionId: '3',
        userName: 'Antonio Costa',
        userDegree: 1,
        status: 'justified',
        notes: 'Motivo de saúde'
      }
    ])

    setBalastres([
      {
        id: '1',
        title: 'Balaústre - Sessão Ordinária de Fevereiro',
        sessionDate: '2026-02-15',
        sessionType: 'Ordinária',
        content: 'Ata completa da sessão ordinária realizada em fevereiro...',
        status: 'published',
        createdBy: 'Secretário',
        createdAt: '2026-02-16'
      },
      {
        id: '2',
        title: 'Balaústre - Sessão Magna de Janeiro',
        sessionDate: '2026-01-20',
        sessionType: 'Magna',
        content: 'Ata da sessão magna de elevação de graus...',
        status: 'published',
        createdBy: 'Secretário',
        createdAt: '2026-01-21'
      },
      {
        id: '3',
        title: 'Balaústre - Sessão Ordinária de Março (Rascunho)',
        sessionDate: '2026-03-15',
        sessionType: 'Ordinária',
        content: 'Rascunho da ata da próxima sessão...',
        status: 'draft',
        createdBy: 'Secretário',
        createdAt: '2026-03-10'
      }
    ])
  }

  const getSessionStatusBadge = (status: string) => {
    const variants = {
      scheduled: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800'
    }
    
    const labels = {
      scheduled: 'Agendada',
      in_progress: 'Em Andamento',
      completed: 'Realizada'
    }

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    )
  }

  const getAttendanceStatusBadge = (status: string) => {
    const variants = {
      present: 'bg-green-100 text-green-800',
      absent: 'bg-red-100 text-red-800',
      justified: 'bg-yellow-100 text-yellow-800'
    }
    
    const labels = {
      present: 'Presente',
      absent: 'Ausente',
      justified: 'Justificado'
    }

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    )
  }

  const getBalastreStatusBadge = (status: string) => {
    const variants = {
      draft: 'bg-gray-100 text-gray-800',
      approved: 'bg-blue-100 text-blue-800',
      published: 'bg-green-100 text-green-800'
    }
    
    const labels = {
      draft: 'Rascunho',
      approved: 'Aprovado',
      published: 'Publicado'
    }

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    )
  }

  const generateQRCode = (sessionId: string) => {
    // Implementação futura com QR Code
    alert(`QR Code para sessão ${sessionId} será gerado`)
  }

  const getAttendanceIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'absent':
        return <XCircle className="h-4 w-4 text-red-600" />
      case 'justified':
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const sessionAttendances = selectedSession 
    ? attendances.filter(att => att.sessionId === selectedSession)
    : attendances.filter(att => att.sessionId === sessions[0]?.id)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-masonic-blue text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold">Secretaria</h1>
              <p className="text-masonic-gold text-sm">
                Gestão de sessões, presenças e balaústres
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
              <CardTitle className="text-sm font-medium">Sessões este Mês</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                1 ordinária, 1 magna
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Presença Média</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">75%</div>
              <p className="text-xs text-muted-foreground">
                Última sessão
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Balaústres</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                Publicados este ano
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próxima Sessão</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15/03</div>
              <p className="text-xs text-muted-foreground">
                Sessão Ordinária
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="sessions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sessions">Sessões</TabsTrigger>
            <TabsTrigger value="attendance">Presenças</TabsTrigger>
            <TabsTrigger value="balastres">Balaústres</TabsTrigger>
          </TabsList>

          {/* Sessões */}
          <TabsContent value="sessions">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Calendário de Sessões</CardTitle>
                    <CardDescription>Gerencie as sessões da Loja</CardDescription>
                  </div>
                  <Button className="masonic-blue">
                    <Plus className="mr-2 h-4 w-4" />
                    Nova Sessão
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-medium">{session.title}</h4>
                          {getSessionStatusBadge(session.status)}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{session.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span>{session.sessionType}</span>
                          <span>{formatDate(session.sessionDate)}</span>
                          <span>{session.startTime} - {session.endTime}</span>
                          <span>{session.location}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {session.status === 'scheduled' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => generateQRCode(session.id)}
                          >
                            <QrCode className="mr-2 h-4 w-4" />
                            QR Code
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Presenças */}
          <TabsContent value="attendance">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Controle de Presença</CardTitle>
                    <CardDescription>Gerencie as presenças dos obreiros</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <select
                      value={selectedSession}
                      onChange={(e) => setSelectedSession(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-masonic-blue"
                    >
                      {sessions.map(session => (
                        <option key={session.id} value={session.id}>
                          {session.title}
                        </option>
                      ))}
                    </select>
                    <Button className="masonic-blue">
                      <Plus className="mr-2 h-4 w-4" />
                      Registrar Presença
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sessionAttendances.map((attendance) => (
                    <div key={attendance.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getAttendanceIcon(attendance.status)}
                        <div>
                          <h4 className="font-medium">{attendance.userName}</h4>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                            <span>Grau {attendance.userDegree}</span>
                            {attendance.checkInTime && (
                              <span>Entrada: {formatDateTime(attendance.checkInTime)}</span>
                            )}
                            {attendance.notes && (
                              <span>Obs: {attendance.notes}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      {getAttendanceStatusBadge(attendance.status)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Balaústres */}
          <TabsContent value="balastres">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Balaústres (Atas)</CardTitle>
                    <CardDescription>Gerencie as atas das sessões</CardDescription>
                  </div>
                  <Button className="masonic-blue">
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Balaústre
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {balastres.map((balastre) => (
                    <div key={balastre.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-medium">{balastre.title}</h4>
                          {getBalastreStatusBadge(balastre.status)}
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {balastre.content}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span>{balastre.sessionType}</span>
                          <span>{formatDate(balastre.sessionDate)}</span>
                          <span>Criado por: {balastre.createdBy}</span>
                          <span>{formatDate(balastre.createdAt)}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
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
