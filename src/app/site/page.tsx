'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Instagram,
  ChevronRight,
  BookOpen,
  Heart
} from 'lucide-react'

interface SiteData {
  siteName: string
  logo?: string
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

export default function SitePage() {
  const [siteData, setSiteData] = useState<SiteData>({
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

  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    // Carregar dados do site da API
    loadSiteData()
  }, [])

  const loadSiteData = async () => {
    // Mock dos dados - na implementação real viria da API
    console.log('Loading site data...')
  }

  const renderClassicTemplate = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header 
        className="text-white shadow-lg"
        style={{ backgroundColor: siteData.primaryColor }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              {siteData.logo ? (
                <img src={siteData.logo} alt="Logo" className="h-12 w-12" />
              ) : (
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <BookOpen className="h-6 w-6" style={{ color: siteData.primaryColor }} />
                </div>
              )}
              <h1 className="text-2xl font-bold">{siteData.siteName}</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => setActiveSection('home')}
                className={`hover:text-gray-200 transition-colors ${
                  activeSection === 'home' ? 'text-yellow-300' : ''
                }`}
              >
                Início
              </button>
              <button 
                onClick={() => setActiveSection('about')}
                className={`hover:text-gray-200 transition-colors ${
                  activeSection === 'about' ? 'text-yellow-300' : ''
                }`}
              >
                Quem Somos
              </button>
              <button 
                onClick={() => setActiveSection('contact')}
                className={`hover:text-gray-200 transition-colors ${
                  activeSection === 'contact' ? 'text-yellow-300' : ''
                }`}
              >
                Contato
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {activeSection === 'home' && (
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Bem-vindo à Nossa Loja
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {siteData.homeText}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <Card className="text-center p-8">
                  <CardContent className="pt-6">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: siteData.secondaryColor }}
                    >
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Tradição</h3>
                    <p className="text-gray-600">
                      Mais de 70 anos de história e tradição maçônica
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center p-8">
                  <CardContent className="pt-6">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: siteData.secondaryColor }}
                    >
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Irmandade</h3>
                    <p className="text-gray-600">
                      Uma fraternidade unida pelos princípios maçônicos
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center p-8">
                  <CardContent className="pt-6">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: siteData.secondaryColor }}
                    >
                      <Heart className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Caridade</h3>
                    <p className="text-gray-600">
                      Compromisso com o bem-estar da comunidade
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <Button 
                  size="lg"
                  className="text-white px-8 py-3"
                  style={{ backgroundColor: siteData.secondaryColor }}
                >
                  Saiba Mais
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'about' && (
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Quem Somos
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {siteData.aboutText}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Nossa História</h3>
                  <p className="text-gray-600 mb-6">
                    Fundada em 1950 por um grupo de maçons dedicados, nossa Loja tem sido 
                    um farol de luz e sabedoria na comunidade. Ao longo das décadas, 
                    mantivemos nossos princípios fundamentais enquanto adaptamos nossos 
                    métodos para servir melhor às necessidades contemporâneas.
                  </p>
                  <p className="text-gray-600">
                    Nossos membros vêm de diversas formações profissionais, unidos 
                    pelo desejo comum de aperfeiçoamento moral e espiritual através 
                    dos ensinamentos maçônicos.
                  </p>
                </div>
                <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                  <BookOpen className="h-24 w-24 text-gray-400" />
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'contact' && (
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Entre em Contato
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {siteData.contactText}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <Card className="text-center p-8">
                  <CardContent className="pt-6">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: siteData.secondaryColor }}
                    >
                      <Mail className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">E-mail</h3>
                    <p className="text-gray-600">{siteData.contactEmail}</p>
                  </CardContent>
                </Card>

                <Card className="text-center p-8">
                  <CardContent className="pt-6">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: siteData.secondaryColor }}
                    >
                      <Phone className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Telefone</h3>
                    <p className="text-gray-600">{siteData.contactPhone}</p>
                  </CardContent>
                </Card>

                <Card className="text-center p-8">
                  <CardContent className="pt-6">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: siteData.secondaryColor }}
                    >
                      <MapPin className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Endereço</h3>
                    <p className="text-gray-600">{siteData.contactAddress}</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="max-w-2xl mx-auto">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6 text-center">
                    Envie uma Mensagem
                  </h3>
                  <form className="space-y-6">
                    <div>
                      <input
                        type="text"
                        placeholder="Seu nome"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Seu e-mail"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Sua mensagem"
                        rows={5}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <Button 
                      type="submit"
                      className="w-full text-white py-3"
                      style={{ backgroundColor: siteData.secondaryColor }}
                    >
                      Enviar Mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer 
        className="text-white py-12"
        style={{ backgroundColor: siteData.primaryColor }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">{siteData.siteName}</h3>
              <p className="text-gray-300">
                Uma instituição dedicada aos princípios de liberdade, 
                igualdade e fraternidade.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => setActiveSection('home')}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Início
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveSection('about')}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Quem Somos
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveSection('contact')}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Contato
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Redes Sociais</h4>
              <div className="flex space-x-4">
                <button className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors">
                  <Facebook className="h-5 w-5" />
                </button>
                <button className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors">
                  <Instagram className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-600 text-center">
            <p className="text-gray-300">
              © 2026 {siteData.siteName}. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )

  const renderModernTemplate = () => (
    <div className="min-h-screen bg-white">
      {/* Header Moderno */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              {siteData.logo ? (
                <img src={siteData.logo} alt="Logo" className="h-10 w-10" />
              ) : (
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5" style={{ color: siteData.primaryColor }} />
                </div>
              )}
              <h1 
                className="text-xl font-bold"
                style={{ color: siteData.primaryColor }}
              >
                {siteData.siteName}
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => setActiveSection('home')}
                className={`font-medium transition-colors ${
                  activeSection === 'home' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Início
              </button>
              <button 
                onClick={() => setActiveSection('about')}
                className={`font-medium transition-colors ${
                  activeSection === 'about' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Quem Somos
              </button>
              <button 
                onClick={() => setActiveSection('contact')}
                className={`font-medium transition-colors ${
                  activeSection === 'contact' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Contato
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {activeSection === 'home' && (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                {siteData.siteName}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                {siteData.homeText}
              </p>
              <Button 
                size="lg"
                className="text-white px-8 py-3 rounded-full"
                style={{ backgroundColor: siteData.secondaryColor }}
              >
                Conheça Nossa História
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Conteúdo específico de cada seção */}
      <main>
        {activeSection === 'about' && (
          <section className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
                Quem Somos
              </h2>
              <div className="prose prose-lg mx-auto">
                <p className="text-gray-600 leading-relaxed">
                  {siteData.aboutText}
                </p>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'contact' && (
          <section className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
                Entre em Contato
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Informações</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5" style={{ color: siteData.secondaryColor }} />
                      <span>{siteData.contactEmail}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5" style={{ color: siteData.secondaryColor }} />
                      <span>{siteData.contactPhone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5" style={{ color: siteData.secondaryColor }} />
                      <span>{siteData.contactAddress}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Envie uma Mensagem</h3>
                  <form className="space-y-4">
                    <input
                      type="text"
                      placeholder="Nome"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="email"
                      placeholder="E-mail"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      placeholder="Mensagem"
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button 
                      type="submit"
                      className="w-full text-white py-3 rounded-lg"
                      style={{ backgroundColor: siteData.secondaryColor }}
                    >
                      Enviar
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer Moderno */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2026 {siteData.siteName}. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )

  const renderInstitutionalTemplate = () => (
    <div className="min-h-screen bg-gray-100">
      {/* Header Institucional */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-6">
              {siteData.logo ? (
                <img src={siteData.logo} alt="Logo" className="h-14 w-14" />
              ) : (
                <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-7 w-7" style={{ color: siteData.primaryColor }} />
                </div>
              )}
              <div>
                <h1 
                  className="text-2xl font-bold text-gray-900"
                >
                  {siteData.siteName}
                </h1>
                <p className="text-sm text-gray-600">Desde 1950</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => setActiveSection('home')}
                className={`font-semibold transition-colors ${
                  activeSection === 'home' ? 'text-red-600' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Início
              </button>
              <button 
                onClick={() => setActiveSection('about')}
                className={`font-semibold transition-colors ${
                  activeSection === 'about' ? 'text-red-600' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Quem Somos
              </button>
              <button 
                onClick={() => setActiveSection('contact')}
                className={`font-semibold transition-colors ${
                  activeSection === 'contact' ? 'text-red-600' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Contato
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Conteúdo Institucional */}
      <main>
        {activeSection === 'home' && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-lg shadow-lg p-12">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">
                    Bem-vindo
                  </h2>
                  <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: siteData.secondaryColor }}></div>
                  <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                    {siteData.homeText}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div 
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: siteData.primaryColor }}
                    >
                      <BookOpen className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Missão</h3>
                    <p className="text-gray-600">
                      Promover o desenvolvimento moral e espiritual de nossos membros
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div 
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: siteData.primaryColor }}
                    >
                      <Users className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Visão</h3>
                    <p className="text-gray-600">
                      Ser referência em excelência maçônica e serviço à comunidade
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div 
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: siteData.primaryColor }}
                    >
                      <Heart className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Valores</h3>
                    <p className="text-gray-600">
                      Liberdade, Igualdade, Fraternidade e Caridade
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'about' && (
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-lg shadow-lg p-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
                  Nossa História
                </h2>
                <div className="w-24 h-1 mx-auto mb-12" style={{ backgroundColor: siteData.secondaryColor }}></div>
                <div className="prose prose-lg mx-auto">
                  <p className="text-gray-700 leading-relaxed text-center">
                    {siteData.aboutText}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'contact' && (
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-lg shadow-lg p-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
                  Contato
                </h2>
                <div className="w-24 h-1 mx-auto mb-12" style={{ backgroundColor: siteData.secondaryColor }}></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Informações</h3>
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <Mail className="h-6 w-6 mt-1" style={{ color: siteData.secondaryColor }} />
                        <div>
                          <p className="font-semibold text-gray-900">E-mail</p>
                          <p className="text-gray-600">{siteData.contactEmail}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <Phone className="h-6 w-6 mt-1" style={{ color: siteData.secondaryColor }} />
                        <div>
                          <p className="font-semibold text-gray-900">Telefone</p>
                          <p className="text-gray-600">{siteData.contactPhone}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <MapPin className="h-6 w-6 mt-1" style={{ color: siteData.secondaryColor }} />
                        <div>
                          <p className="font-semibold text-gray-900">Endereço</p>
                          <p className="text-gray-600">{siteData.contactAddress}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Entre em Contato</h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                        <input
                          type="email"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mensagem</label>
                        <textarea
                          rows={4}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <Button 
                        type="submit"
                        className="w-full text-white py-3 rounded-lg font-semibold"
                        style={{ backgroundColor: siteData.secondaryColor }}
                      >
                        Enviar Mensagem
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer Institucional */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">{siteData.siteName}</h3>
            <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: siteData.secondaryColor }}></div>
            <p className="text-gray-400 mb-8">
              {siteData.contactText}
            </p>
            <p className="text-gray-500">
              © 2026 {siteData.siteName}. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )

  // Renderizar o template selecionado
  switch (siteData.template) {
    case 'modern':
      return renderModernTemplate()
    case 'institutional':
      return renderInstitutionalTemplate()
    default:
      return renderClassicTemplate()
  }
}
