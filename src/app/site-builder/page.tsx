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
  Palette, 
  Layout, 
  Settings, 
  Eye,
  Upload,
  Save,
  Globe,
  FileText,
  Image as ImageIcon,
  Type,
  Plus,
  Edit,
  Trash2,
  ExternalLink
} from 'lucide-react'

interface SiteSettings {
  id: string
  siteName: string
  logo?: string
  favicon?: string
  primaryColor: string
  secondaryColor: string
  template: 'classic' | 'modern' | 'institutional'
  homeText: string
  aboutText: string
  contactText: string
  contactEmail: string
  contactPhone: string
  contactAddress: string
  isActive: boolean
}

interface SitePage {
  id: string
  title: string
  slug: string
  content: string
  isActive: boolean
  order: number
  showInMenu: boolean
}

export default function SiteBuilderPage() {
  const { data: session, status } = useSession()
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    id: '1',
    siteName: 'Loja Maçônica União e Fraternidade',
    primaryColor: '#1e3a5f',
    secondaryColor: '#d4af37',
    template: 'classic',
    homeText: 'Bem-vindo à Loja Maçônica União e Fraternidade. Uma instituição dedicada aos princípios de liberdade, igualdade e fraternidade.',
    aboutText: 'Fundada em 1950, nossa Loja tem como missão promover o desenvolvimento moral e espiritual de seus membros através dos ensinamentos maçônicos.',
    contactText: 'Entre em contato conosco para saber mais sobre a Maçonaria e nossa Loja.',
    contactEmail: 'contato@lojamaconica.com.br',
    contactPhone: '(11) 3333-4444',
    contactAddress: 'Rua das Acácias, 123 - São Paulo/SP',
    isActive: true
  })
  
  const [pages, setPages] = useState<SitePage[]>([
    {
      id: '1',
      title: 'Início',
      slug: 'home',
      content: '<h1>Bem-vindo</h1><p>Conteúdo da página inicial...</p>',
      isActive: true,
      order: 0,
      showInMenu: true
    },
    {
      id: '2',
      title: 'Quem Somos',
      slug: 'about',
      content: '<h1>Sobre Nós</h1><p>História da nossa Loja...</p>',
      isActive: true,
      order: 1,
      showInMenu: true
    },
    {
      id: '3',
      title: 'Contato',
      slug: 'contact',
      content: '<h1>Contato</h1><p>Informações de contato...</p>',
      isActive: true,
      order: 2,
      showInMenu: true
    }
  ])

  const [selectedTemplate, setSelectedTemplate] = useState<string>('classic')

  useEffect(() => {
    if (status === 'loading') return
    if (!session || session.user.degree < 3) {
      redirect('/dashboard')
    }
  }, [session, status])

  const templates = [
    {
      id: 'classic',
      name: 'Clássico/Sóbrio',
      description: 'Design tradicional e formal, ideal para Lojas conservadoras',
      preview: '/templates/classic.jpg',
      colors: {
        primary: '#1e3a5f',
        secondary: '#d4af37'
      }
    },
    {
      id: 'modern',
      name: 'Moderno/Minimalista',
      description: 'Design limpo e contemporâneo, focado em usabilidade',
      preview: '/templates/modern.jpg',
      colors: {
        primary: '#2c3e50',
        secondary: '#3498db'
      }
    },
    {
      id: 'institutional',
      name: 'Institucional',
      description: 'Design corporativo e profissional, para Lojas com imagem pública forte',
      preview: '/templates/institutional.jpg',
      colors: {
        primary: '#34495e',
        secondary: '#e74c3c'
      }
    }
  ]

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Implementação futura de upload
      console.log('Logo upload:', file)
    }
  }

  const handleFaviconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Implementação futura de upload
      console.log('Favicon upload:', file)
    }
  }

  const saveSettings = () => {
    // Implementação futura de salvamento
    console.log('Saving settings:', siteSettings)
    alert('Configurações salvas com sucesso!')
  }

  const previewSite = () => {
    window.open('/site', '_blank')
  }

  const addNewPage = () => {
    const newPage: SitePage = {
      id: Date.now().toString(),
      title: 'Nova Página',
      slug: 'nova-pagina',
      content: '<h1>Nova Página</h1><p>Conteúdo da nova página...</p>',
      isActive: true,
      order: pages.length,
      showInMenu: true
    }
    setPages([...pages, newPage])
  }

  const deletePage = (pageId: string) => {
    setPages(pages.filter(page => page.id !== pageId))
  }

  const updatePage = (pageId: string, updates: Partial<SitePage>) => {
    setPages(pages.map(page => 
      page.id === pageId ? { ...page, ...updates } : page
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-masonic-blue text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold">Site Builder</h1>
              <p className="text-masonic-gold text-sm">
                Personalize o site público da Loja
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={previewSite} variant="ghost" className="text-white hover:bg-masonic-gray">
                <Eye className="mr-2 h-4 w-4" />
                Visualizar Site
              </Button>
              <Button onClick={saveSettings} className="bg-green-600 hover:bg-green-700">
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
              <Button variant="ghost" className="text-white hover:bg-masonic-gray">
                Voltar ao Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <Tabs defaultValue="identity" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="identity">Identidade Visual</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="content">Conteúdo</TabsTrigger>
            <TabsTrigger value="pages">Páginas</TabsTrigger>
          </TabsList>

          {/* Identidade Visual */}
          <TabsContent value="identity">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ImageIcon className="h-5 w-5" />
                    <span>Logo e Favicon</span>
                  </CardTitle>
                  <CardDescription>
                    Carregue o logo e favicon da Loja
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Logo da Loja</label>
                    <div className="flex items-center space-x-4">
                      <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                        {siteSettings.logo ? (
                          <img src={siteSettings.logo} alt="Logo" className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <ImageIcon className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                          id="logo-upload"
                        />
                        <label htmlFor="logo-upload">
                          <Button variant="outline" className="cursor-pointer">
                            <Upload className="mr-2 h-4 w-4" />
                            Carregar Logo
                          </Button>
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG ou GIF (máx. 2MB)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Favicon</label>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                        {siteSettings.favicon ? (
                          <img src={siteSettings.favicon} alt="Favicon" className="w-full h-full object-cover rounded" />
                        ) : (
                          <ImageIcon className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFaviconUpload}
                          className="hidden"
                          id="favicon-upload"
                        />
                        <label htmlFor="favicon-upload">
                          <Button variant="outline" className="cursor-pointer">
                            <Upload className="mr-2 h-4 w-4" />
                            Carregar Favicon
                          </Button>
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                          ICO ou PNG 32x32px
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="h-5 w-5" />
                    <span>Cores do Site</span>
                  </CardTitle>
                  <CardDescription>
                    Personalize as cores principais do site
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Cor Primária</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={siteSettings.primaryColor}
                        onChange={(e) => setSiteSettings({...siteSettings, primaryColor: e.target.value})}
                        className="w-16 h-10 border rounded cursor-pointer"
                      />
                      <Input
                        value={siteSettings.primaryColor}
                        onChange={(e) => setSiteSettings({...siteSettings, primaryColor: e.target.value})}
                        placeholder="#1e3a5f"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Cor Secundária</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={siteSettings.secondaryColor}
                        onChange={(e) => setSiteSettings({...siteSettings, secondaryColor: e.target.value})}
                        className="w-16 h-10 border rounded cursor-pointer"
                      />
                      <Input
                        value={siteSettings.secondaryColor}
                        onChange={(e) => setSiteSettings({...siteSettings, secondaryColor: e.target.value})}
                        placeholder="#d4af37"
                      />
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Preview</h4>
                    <div className="space-y-2">
                      <div 
                        className="p-3 rounded text-white text-center"
                        style={{ backgroundColor: siteSettings.primaryColor }}
                      >
                        Cabeçalho Principal
                      </div>
                      <div 
                        className="p-2 rounded text-white text-center text-sm"
                        style={{ backgroundColor: siteSettings.secondaryColor }}
                      >
                        Botões e Destaques
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Templates */}
          <TabsContent value="templates">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Layout className="h-5 w-5" />
                  <span>Escolha um Template</span>
                </CardTitle>
                <CardDescription>
                  Selecione o design que melhor representa sua Loja
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {templates.map((template) => (
                    <div 
                      key={template.id}
                      className={`relative border rounded-lg overflow-hidden cursor-pointer transition-all ${
                        selectedTemplate === template.id ? 'ring-2 ring-masonic-blue' : 'hover:shadow-lg'
                      }`}
                      onClick={() => {
                        setSelectedTemplate(template.id)
                        setSiteSettings({
                          ...siteSettings,
                          template: template.id as 'classic' | 'modern' | 'institutional',
                          primaryColor: template.colors.primary,
                          secondaryColor: template.colors.secondary
                        })
                      }}
                    >
                      <div className="aspect-video bg-gray-200 relative">
                        <img
                          src={template.preview}
                          alt={template.name}
                          className="w-full h-full object-cover"
                        />
                        {selectedTemplate === template.id && (
                          <div className="absolute top-2 right-2 bg-masonic-blue text-white px-2 py-1 rounded text-sm">
                            Selecionado
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium mb-2">{template.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                        <div className="flex space-x-2">
                          <div 
                            className="w-6 h-6 rounded border"
                            style={{ backgroundColor: template.colors.primary }}
                          />
                          <div 
                            className="w-6 h-6 rounded border"
                            style={{ backgroundColor: template.colors.secondary }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Conteúdo */}
          <TabsContent value="content">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Type className="h-5 w-5" />
                    <span>Textos do Site</span>
                  </CardTitle>
                  <CardDescription>
                    Edite os textos principais das páginas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nome da Loja</label>
                    <Input
                      value={siteSettings.siteName}
                      onChange={(e) => setSiteSettings({...siteSettings, siteName: e.target.value})}
                      placeholder="Loja Maçônica União e Fraternidade"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Texto da Página Inicial</label>
                    <textarea
                      value={siteSettings.homeText}
                      onChange={(e) => setSiteSettings({...siteSettings, homeText: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-masonic-blue"
                      rows={4}
                      placeholder="Bem-vindo à Loja Maçônica..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Texto "Quem Somos"</label>
                    <textarea
                      value={siteSettings.aboutText}
                      onChange={(e) => setSiteSettings({...siteSettings, aboutText: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-masonic-blue"
                      rows={4}
                      placeholder="História da nossa Loja..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Texto "Contato"</label>
                    <textarea
                      value={siteSettings.contactText}
                      onChange={(e) => setSiteSettings({...siteSettings, contactText: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-masonic-blue"
                      rows={3}
                      placeholder="Entre em contato conosco..."
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>Informações de Contato</span>
                  </CardTitle>
                  <CardDescription>
                    Dados para a página de contato
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">E-mail</label>
                    <Input
                      type="email"
                      value={siteSettings.contactEmail}
                      onChange={(e) => setSiteSettings({...siteSettings, contactEmail: e.target.value})}
                      placeholder="contato@lojamaconica.com.br"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Telefone</label>
                    <Input
                      value={siteSettings.contactPhone}
                      onChange={(e) => setSiteSettings({...siteSettings, contactPhone: e.target.value})}
                      placeholder="(11) 3333-4444"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Endereço</label>
                    <textarea
                      value={siteSettings.contactAddress}
                      onChange={(e) => setSiteSettings({...siteSettings, contactAddress: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-masonic-blue"
                      rows={3}
                      placeholder="Rua das Acácias, 123 - São Paulo/SP"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="site-active"
                      checked={siteSettings.isActive}
                      onChange={(e) => setSiteSettings({...siteSettings, isActive: e.target.checked})}
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="site-active" className="text-sm font-medium">
                      Site público ativo
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Páginas */}
          <TabsContent value="pages">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>Gerenciar Páginas</span>
                    </CardTitle>
                    <CardDescription>
                      Crie e edite as páginas do site
                    </CardDescription>
                  </div>
                  <Button onClick={addNewPage} className="masonic-blue">
                    <Plus className="mr-2 h-4 w-4" />
                    Nova Página
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pages.map((page) => (
                    <div key={page.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-medium">{page.title}</h4>
                          <Badge variant="outline">/{page.slug}</Badge>
                          {page.showInMenu && (
                            <Badge className="bg-green-100 text-green-800">No Menu</Badge>
                          )}
                          {page.isActive ? (
                            <Badge className="bg-green-100 text-green-800">Ativa</Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-800">Inativa</Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span>Ordem: {page.order}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => deletePage(page.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
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
