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
  BookOpen, 
  Search, 
  Filter, 
  Download, 
  Upload,
  FileText,
  Eye,
  Lock,
  Unlock
} from 'lucide-react'
import { getDegreeName, getDegreeColor } from '@/lib/utils'

interface Document {
  id: string
  title: string
  description: string
  documentType: string
  category: string
  degree: number
  fileName: string
  fileSize: number
  uploadedBy: string
  createdAt: string
}

export default function LibraryPage() {
  const { data: session, status } = useSession()
  const [documents, setDocuments] = useState<Document[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDegree, setSelectedDegree] = useState<number>(0)
  const [selectedType, setSelectedType] = useState<string>('')

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      redirect('/login')
    }
    
    loadMockData()
  }, [session, status])

  const loadMockData = () => {
    // Dados mockados para demonstração
    setDocuments([
      {
        id: '1',
        title: 'Ritual de Aprendiz',
        description: 'Ritual completo para o grau de Aprendiz Maçom',
        documentType: 'ritual',
        category: 'Rituais',
        degree: 1,
        fileName: 'ritual_aprendiz.pdf',
        fileSize: 2048576,
        uploadedBy: 'Venerável Mestre',
        createdAt: '2026-02-15'
      },
      {
        id: '2',
        title: 'Prancha do Grau 2',
        description: 'Pranchas simbólicas do grau de Companheiro',
        documentType: 'prancha',
        category: 'Pranchas',
        degree: 2,
        fileName: 'prancha_companheiro.pdf',
        fileSize: 3145728,
        uploadedBy: 'Secretário',
        createdAt: '2026-02-20'
      },
      {
        id: '3',
        title: 'Balaústre - Sessão Magna',
        description: 'Ata da sessão magna de março/2026',
        documentType: 'balastre',
        category: 'Balaústres',
        degree: 1,
        fileName: 'balastre_marco_2026.pdf',
        fileSize: 1048576,
        uploadedBy: 'Secretário',
        createdAt: '2026-03-01'
      },
      {
        id: '4',
        title: 'Ritual de Mestre',
        description: 'Ritual completo para o grau de Mestre Maçom',
        documentType: 'ritual',
        category: 'Rituais',
        degree: 3,
        fileName: 'ritual_mestre.pdf',
        fileSize: 2560000,
        uploadedBy: 'Venerável Mestre',
        createdAt: '2026-02-10'
      },
      {
        id: '5',
        title: 'Instruções do Grau 4',
        description: 'Instruções filosóficas do Mestre Adorado',
        documentType: 'instrucao',
        category: 'Graus Filosóficos',
        degree: 4,
        fileName: 'instrucoes_grau4.pdf',
        fileSize: 4096000,
        uploadedBy: 'Grão Mestre',
        createdAt: '2026-01-25'
      },
      {
        id: '6',
        title: 'Rituais dos Graus Inefáveis',
        description: 'Coleção de rituais dos graus filosóficos',
        documentType: 'ritual',
        category: 'Graus Filosóficos',
        degree: 18,
        fileName: 'rituais_inefaveis.pdf',
        fileSize: 8192000,
        uploadedBy: 'Soberano Grande Inspetor',
        createdAt: '2026-01-15'
      }
    ])
  }

  const userDegree = session?.user?.degree || 1
  const canAccessDocument = (documentDegree: number) => userDegree >= documentDegree

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDegree = selectedDegree === 0 || doc.degree === selectedDegree
    const matchesType = selectedType === '' || doc.documentType === selectedType
    const hasAccess = canAccessDocument(doc.degree)
    
    return matchesSearch && matchesDegree && matchesType && hasAccess
  })

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getDocumentTypeIcon = (type: string) => {
    const icons = {
      ritual: '📿',
      prancha: '📐',
      balastre: '📋',
      instrucao: '📖',
      default: '📄'
    }
    return icons[type as keyof typeof icons] || icons.default
  }

  const documentTypes = Array.from(new Set(documents.map(doc => doc.documentType)))
  const degrees = Array.from(new Set(documents.map(doc => doc.degree))).sort((a, b) => a - b)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-masonic-blue text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold">Biblioteca Digital</h1>
              <p className="text-masonic-gold text-sm">
                Documentos e rituais da Loja • Seu grau: {getDegreeName(userDegree)}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {userDegree >= 3 && (
                <Button variant="ghost" className="text-white hover:bg-masonic-gray">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </Button>
              )}
              <Button variant="ghost" className="text-white hover:bg-masonic-gray">
                Voltar ao Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar documentos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
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
              
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-masonic-blue"
              >
                <option value="">Todos os tipos</option>
                {documentTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Documentos</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredDocuments.length}</div>
              <p className="text-xs text-muted-foreground">
                Disponíveis para seu grau
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rituais</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredDocuments.filter(doc => doc.documentType === 'ritual').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Cerimônias e rituais
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pranchas</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredDocuments.filter(doc => doc.documentType === 'prancha').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Pranchas simbólicas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Balaústres</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredDocuments.filter(doc => doc.documentType === 'balastre').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Atas de sessões
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((document) => {
            const hasAccess = canAccessDocument(document.degree)
            
            return (
              <Card key={document.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{getDocumentTypeIcon(document.documentType)}</span>
                      <div>
                        <CardTitle className="text-lg">{document.title}</CardTitle>
                        <CardDescription className="text-sm">
                          {document.description}
                        </CardDescription>
                      </div>
                    </div>
                    {hasAccess ? (
                      <Unlock className="h-4 w-4 text-green-600" />
                    ) : (
                      <Lock className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{document.category}</Badge>
                      <Badge 
                        variant="outline" 
                        className={getDegreeColor(document.degree)}
                      >
                        {getDegreeName(document.degree)}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <div>Tamanho: {formatFileSize(document.fileSize)}</div>
                      <div>Upload: {document.uploadedBy}</div>
                      <div>Data: {new Date(document.createdAt).toLocaleDateString('pt-BR')}</div>
                    </div>
                    
                    <div className="flex gap-2">
                      {hasAccess ? (
                        <>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="mr-2 h-4 w-4" />
                            Visualizar
                          </Button>
                          <Button size="sm" className="flex-1 masonic-blue">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" disabled className="w-full">
                          <Lock className="mr-2 h-4 w-4" />
                          Acesso Restrito
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum documento encontrado</h3>
            <p className="mt-1 text-sm text-gray-500">
              Tente ajustar os filtros ou o termo de busca.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
