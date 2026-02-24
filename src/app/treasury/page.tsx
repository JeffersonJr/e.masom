'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  PiggyBank,
  FileText,
  Download,
  Plus,
  Calendar
} from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

interface Payable {
  id: string
  description: string
  amount: number
  dueDate: string
  status: string
  category: string
  isTrunk: boolean
}

interface Receivable {
  id: string
  userName: string
  amount: number
  dueDate: string
  status: string
  month: number
  year: number
}

interface CashFlow {
  id: string
  description: string
  type: 'income' | 'expense'
  amount: number
  category: string
  date: string
  isTrunk: boolean
}

export default function TreasuryPage() {
  const { data: session, status } = useSession()
  const [payables, setPayables] = useState<Payable[]>([])
  const [receivables, setReceivables] = useState<Receivable[]>([])
  const [cashFlow, setCashFlow] = useState<CashFlow[]>([])
  const [stats, setStats] = useState({
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpense: 0,
    trunkBalance: 0
  })

  useEffect(() => {
    if (status === 'loading') return
    if (!session || session.user.degree < 3) {
      redirect('/dashboard')
    }
    
    // Carregar dados mockados
    loadMockData()
  }, [session, status])

  const loadMockData = () => {
    // Dados mockados para demonstração
    setPayables([
      {
        id: '1',
        description: 'Aluguel do Templo',
        amount: 2500,
        dueDate: '2026-03-05',
        status: 'pending',
        category: 'Aluguel',
        isTrunk: false
      },
      {
        id: '2',
        description: 'Material de Ritual',
        amount: 350,
        dueDate: '2026-03-10',
        status: 'pending',
        category: 'Material',
        isTrunk: false
      },
      {
        id: '3',
        description: 'Doação Beneficente',
        amount: 500,
        dueDate: '2026-03-15',
        status: 'pending',
        category: 'Doação',
        isTrunk: true
      }
    ])

    setReceivables([
      {
        id: '1',
        userName: 'João Silva',
        amount: 200,
        dueDate: '2026-03-10',
        status: 'pending',
        month: 3,
        year: 2026
      },
      {
        id: '2',
        userName: 'Pedro Santos',
        amount: 200,
        dueDate: '2026-03-10',
        status: 'paid',
        month: 3,
        year: 2026
      },
      {
        id: '3',
        userName: 'Carlos Oliveira',
        amount: 200,
        dueDate: '2026-03-10',
        status: 'overdue',
        month: 3,
        year: 2026
      }
    ])

    setCashFlow([
      {
        id: '1',
        description: 'Mensalidade - João Silva',
        type: 'income',
        amount: 200,
        category: 'Mensalidade',
        date: '2026-03-01',
        isTrunk: false
      },
      {
        id: '2',
        description: 'Aluguel Fevereiro',
        type: 'expense',
        amount: 2500,
        category: 'Aluguel',
        date: '2026-02-28',
        isTrunk: false
      },
      {
        id: '3',
        description: 'Doação Tronco',
        type: 'income',
        amount: 300,
        category: 'Doação',
        date: '2026-03-02',
        isTrunk: true
      }
    ])

    setStats({
      totalBalance: 15450,
      monthlyIncome: 8400,
      monthlyExpense: 3200,
      trunkBalance: 2300
    })
  }

  const generatePDFReport = () => {
    // Implementação futura com jsPDF
    alert('Relatório PDF será gerado em breve')
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800'
    }
    
    const labels = {
      pending: 'Pendente',
      paid: 'Pago',
      overdue: 'Vencido',
      cancelled: 'Cancelado'
    }

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    )
  }

  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-masonic-blue text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold">Tesouraria</h1>
              <p className="text-masonic-gold text-sm">
                Gestão financeira da Loja
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={generatePDFReport} variant="ghost" className="text-white hover:bg-masonic-gray">
                <Download className="mr-2 h-4 w-4" />
                Relatório PDF
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(stats.totalBalance)}
              </div>
              <p className="text-xs text-muted-foreground">
                Conta corrente da Loja
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(stats.monthlyIncome)}
              </div>
              <p className="text-xs text-muted-foreground">
                {formatCurrency((stats.monthlyIncome / 8400) * 100)}% do esperado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Despesa Mensal</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(stats.monthlyExpense)}
              </div>
              <p className="text-xs text-muted-foreground">
                Contas a pagar este mês
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tronco Beneficência</CardTitle>
              <PiggyBank className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-masonic-gold">
                {formatCurrency(stats.trunkBalance)}
              </div>
              <p className="text-xs text-muted-foreground">
                Fundo de caridade
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="payables" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="payables">Contas a Pagar</TabsTrigger>
            <TabsTrigger value="receivables">Mensalidades</TabsTrigger>
            <TabsTrigger value="cashflow">Fluxo de Caixa</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>

          {/* Contas a Pagar */}
          <TabsContent value="payables">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Contas a Pagar</CardTitle>
                    <CardDescription>Gerencie as despesas da Loja</CardDescription>
                  </div>
                  <Button className="masonic-blue">
                    <Plus className="mr-2 h-4 w-4" />
                    Nova Conta
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payables.map((payable) => (
                    <div key={payable.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-medium">{payable.description}</h4>
                          {payable.isTrunk && (
                            <Badge variant="outline" className="text-masonic-gold border-masonic-gold">
                              Tronco
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span>{payable.category}</span>
                          <span>Vencimento: {formatDate(payable.dueDate)}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold">{formatCurrency(payable.amount)}</div>
                        {getStatusBadge(payable.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mensalidades */}
          <TabsContent value="receivables">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Mensalidades</CardTitle>
                    <CardDescription>Controle de mensalidades dos membros</CardDescription>
                  </div>
                  <Button className="masonic-blue">
                    <Plus className="mr-2 h-4 w-4" />
                    Gerar Mensalidades
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {receivables.map((receivable) => (
                    <div key={receivable.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{receivable.userName}</h4>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span>{receivable.month}/{receivable.year}</span>
                          <span>Vencimento: {formatDate(receivable.dueDate)}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold">{formatCurrency(receivable.amount)}</div>
                        {getStatusBadge(receivable.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Fluxo de Caixa */}
          <TabsContent value="cashflow">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Fluxo de Caixa</CardTitle>
                    <CardDescription>Histórico de movimentações financeiras</CardDescription>
                  </div>
                  <Button className="masonic-blue">
                    <Plus className="mr-2 h-4 w-4" />
                    Lançamento
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cashFlow.map((flow) => (
                    <div key={flow.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          flow.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {flow.type === 'income' ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{flow.description}</h4>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                            <span>{flow.category}</span>
                            <span>{formatDate(flow.date)}</span>
                            {flow.isTrunk && (
                              <Badge variant="outline" className="text-masonic-gold border-masonic-gold">
                                Tronco
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className={`text-lg font-semibold ${
                        flow.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {flow.type === 'income' ? '+' : '-'}{formatCurrency(flow.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Relatórios */}
          <TabsContent value="reports">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Relatório Financeiro</CardTitle>
                  <CardDescription>Relatório completo de finanças</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-masonic-blue" />
                      <span>Relatório mensal de receitas e despesas</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-masonic-blue" />
                      <span>Período: Março/2026</span>
                    </div>
                    <Button className="w-full masonic-blue">
                      <Download className="mr-2 h-4 w-4" />
                      Baixar PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Relatório do Tronco</CardTitle>
                  <CardDescription>Relatório específico do Tronco de Beneficência</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <PiggyBank className="h-5 w-5 text-masonic-gold" />
                      <span>Extrato completo do Tronco</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-masonic-gold" />
                      <span>Saldo atual: {formatCurrency(stats.trunkBalance)}</span>
                    </div>
                    <Button className="w-full masonicGold">
                      <Download className="mr-2 h-4 w-4" />
                      Baixar PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
