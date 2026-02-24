import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import bcrypt from 'bcryptjs'

async function seedDatabase() {
  try {
    console.log('🌱 Iniciando seed do banco de dados...')

    // Criar usuário Venerável Mestre (Grau 3)
    const veneravelPassword = await bcrypt.hash('veneravel123', 10)
    const veneravelExists = await db.select().from(users).where(eq(users.email, 'veneravel@lojamaconica.com.br')).limit(1)
    
    if (!veneravelExists.length) {
      await db.insert(users).values({
        id: 'veneravel-001',
        name: 'João da Silva Santos',
        email: 'veneravel@lojamaconica.com.br',
        password: veneravelPassword,
        degree: 3,
        position: 'Venerável Mestre',
        initiationDate: new Date('2020-03-15'),
        birthDate: new Date('1985-06-15'),
        phone: '(11) 98765-4321',
        address: 'Rua das Acácias, 123 - São Paulo/SP',
        isActive: true,
      })
      console.log('✅ Venerável Mestre criado')
    }

    // Criar usuário Companheiro (Grau 2)
    const companheiroPassword = await bcrypt.hash('companheiro123', 10)
    const companheiroExists = await db.select().from(users).where(eq(users.email, 'companheiro@lojamaconica.com.br')).limit(1)
    
    if (!companheiroExists.length) {
      await db.insert(users).values({
        id: 'companheiro-001',
        name: 'Pedro de Oliveira Costa',
        email: 'companheiro@lojamaconica.com.br',
        password: companheiroPassword,
        degree: 2,
        position: '1° Vigilante',
        initiationDate: new Date('2021-06-20'),
        birthDate: new Date('1990-12-10'),
        phone: '(11) 97654-3210',
        address: 'Av. dos Maçons, 456 - São Paulo/SP',
        isActive: true,
      })
      console.log('✅ Companheiro criado')
    }

    // Criar usuário Aprendiz (Grau 1)
    const aprendizPassword = await bcrypt.hash('aprendiz123', 10)
    const aprendizExists = await db.select().from(users).where(eq(users.email, 'aprendiz@lojamaconica.com.br')).limit(1)
    
    if (!aprendizExists.length) {
      await db.insert(users).values({
        id: 'aprendiz-001',
        name: 'Carlos Alberto Ferreira',
        email: 'aprendiz@lojamaconica.com.br',
        password: aprendizPassword,
        degree: 1,
        position: 'Aprendiz',
        initiationDate: new Date('2023-01-15'),
        birthDate: new Date('1988-03-25'),
        phone: '(11) 96543-2109',
        address: 'Rua do Esquadro, 789 - São Paulo/SP',
        isActive: true,
      })
      console.log('✅ Aprendiz criado')
    }

    // Criar usuário Mestre Adorado (Grau 4) - para testes de acesso
    const mestreAdoradoPassword = await bcrypt.hash('mestre4321', 10)
    const mestreAdoradoExists = await db.select().from(users).where(eq(users.email, 'mestre4@lojamaconica.com.br')).limit(1)
    
    if (!mestreAdoradoExists.length) {
      await db.insert(users).values({
        id: 'mestre4-001',
        name: 'Antonio Marcos Pereira',
        email: 'mestre4@lojamaconica.com.br',
        password: mestreAdoradoPassword,
        degree: 4,
        position: 'Mestre Adorado',
        initiationDate: new Date('2019-11-20'),
        birthDate: new Date('1987-05-30'),
        phone: '(11) 95432-1098',
        address: 'Praça do Compasso, 321 - São Paulo/SP',
        isActive: true,
      })
      console.log('✅ Mestre Adorado criado')
    }

    console.log('🎉 Seed concluído com sucesso!')
    console.log('')
    console.log('📋 Usuários criados:')
    console.log('')
    console.log('🔑 CREDENCIAIS DE ACESSO:')
    console.log('')
    console.log('1️⃣ VENERÁVEL MESTRE (Acesso Total):')
    console.log('   Email: veneravel@lojamaconica.com.br')
    console.log('   Senha: veneravel123')
    console.log('   Grau: 3 (Mestre)')
    console.log('')
    console.log('2️⃣ COMPANHEIRO (Acesso Médio):')
    console.log('   Email: companheiro@lojamaconica.com.br')
    console.log('   Senha: companheiro123')
    console.log('   Grau: 2 (Companheiro)')
    console.log('')
    console.log('3️⃣ APRENDIZ (Acesso Básico):')
    console.log('   Email: aprendiz@lojamaconica.com.br')
    console.log('   Senha: aprendiz123')
    console.log('   Grau: 1 (Aprendiz)')
    console.log('')
    console.log('4️⃣ MESTRE ADORADO (Acesso Avançado):')
    console.log('   Email: mestre4@lojamaconica.com.br')
    console.log('   Senha: mestre4321')
    console.log('   Grau: 4 (Mestre Adorado)')
    console.log('')
    console.log('🌐 Acesse: http://localhost:3000/login')
    
  } catch (error) {
    console.error('❌ Erro no seed:', error)
  }
}

// Import necessário para a query
import { eq } from 'drizzle-orm'

// Executar o seed
seedDatabase()
  .then(() => process.exit(0))
  .catch(() => process.exit(1))
