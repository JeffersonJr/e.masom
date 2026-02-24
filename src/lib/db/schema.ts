import { pgTable, uuid, varchar, timestamp, boolean, integer, text, decimal, jsonb } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

// Tabela de Usuários (Obreiros)
export const users = pgTable('users', {
  id: varchar('id', { length: 128 }).primaryKey().$defaultFn(() => createId()),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  degree: integer('degree').notNull().default(1), // 1=Aprendiz, 2=Companheiro, 3=Mestre, 4-33=Filosóficos
  position: varchar('position', { length: 100 }), // Cargo atual (Venerável, etc.)
  initiationDate: timestamp('initiation_date'),
  birthDate: timestamp('birth_date'),
  phone: varchar('phone', { length: 20 }),
  address: text('address'),
  photo: varchar('photo', { length: 500 }), // URL da foto
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Tabela de Sessões
export const sessions = pgTable('sessions', {
  id: varchar('id', { length: 128 }).primaryKey().$defaultFn(() => createId()),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  sessionType: varchar('session_type', { length: 50 }).notNull(), // Ordinária, Magna, etc.
  sessionDate: timestamp('session_date').notNull(),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time'),
  location: varchar('location', { length: 255 }),
  createdBy: varchar('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
})

// Tabela de Presenças (Chancelaria)
export const attendances = pgTable('attendances', {
  id: varchar('id', { length: 128 }).primaryKey().$defaultFn(() => createId()),
  sessionId: varchar('session_id').references(() => sessions.id).notNull(),
  userId: varchar('user_id').references(() => users.id).notNull(),
  status: varchar('status', { length: 20 }).notNull().default('present'), // present, absent, justified
  checkInTime: timestamp('check_in_time'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
})

// Tabela de Documentos (Balaústres, Pranchas, etc.)
export const documents = pgTable('documents', {
  id: varchar('id', { length: 128 }).primaryKey().$defaultFn(() => createId()),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  documentType: varchar('document_type', { length: 50 }).notNull(), // balastre, prancha, ritual, etc.
  category: varchar('category', { length: 100 }), // Ata, Ritual, etc.
  degree: integer('degree').notNull().default(1), // Grau mínimo para acessar
  filePath: varchar('file_path', { length: 500 }),
  fileName: varchar('file_name', { length: 255 }),
  fileSize: integer('file_size'),
  mimeType: varchar('mime_type', { length: 100 }),
  uploadedBy: varchar('uploaded_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Tabela Financeira - Contas a Pagar
export const payables = pgTable('payables', {
  id: varchar('id', { length: 128 }).primaryKey().$defaultFn(() => createId()),
  description: varchar('description', { length: 255 }).notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  dueDate: timestamp('due_date').notNull(),
  paymentDate: timestamp('payment_date'),
  status: varchar('status', { length: 20 }).notNull().default('pending'), // pending, paid, cancelled
  category: varchar('category', { length: 100 }), // Aluguel, Material, etc.
  isTrunk: boolean('is_trunk').default(false), // Se é do Tronco de Beneficência
  notes: text('notes'),
  createdBy: varchar('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Tabela Financeira - Contas a Receber (Mensalidades)
export const receivables = pgTable('receivables', {
  id: varchar('id', { length: 128 }).primaryKey().$defaultFn(() => createId()),
  userId: varchar('user_id').references(() => users.id).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  dueDate: timestamp('due_date').notNull(),
  paymentDate: timestamp('payment_date'),
  status: varchar('status', { length: 20 }).notNull().default('pending'), // pending, paid, overdue
  month: integer('month').notNull(), // Mês de referência
  year: integer('year').notNull(), // Ano de referência
  paymentMethod: varchar('payment_method', { length: 50 }), // Dinheiro, Transferência, etc.
  notes: text('notes'),
  createdBy: varchar('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Tabela de Fluxo de Caixa
export const cashFlow = pgTable('cash_flow', {
  id: varchar('id', { length: 128 }).primaryKey().$defaultFn(() => createId()),
  description: varchar('description', { length: 255 }).notNull(),
  type: varchar('type', { length: 20 }).notNull(), // income, expense
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  category: varchar('category', { length: 100 }),
  isTrunk: boolean('is_trunk').default(false), // Se é do Tronco de Beneficência
  referenceId: varchar('reference_id'), // ID da conta a pagar/receber relacionada
  referenceType: varchar('reference_type', { length: 20 }), // payable, receivable
  date: timestamp('date').notNull(),
  notes: text('notes'),
  createdBy: varchar('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
})

// Tabela de Avisos
export const notices = pgTable('notices', {
  id: varchar('id', { length: 128 }).primaryKey().$defaultFn(() => createId()),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  priority: varchar('priority', { length: 20 }).notNull().default('normal'), // low, normal, high, urgent
  targetDegree: integer('target_degree').default(1), // Grau mínimo para visualizar
  isActive: boolean('is_active').default(true),
  expiryDate: timestamp('expiry_date'),
  createdBy: varchar('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Tabela de Galerias de Fotos
export const photoGalleries = pgTable('photo_galleries', {
  id: varchar('id', { length: 128 }).primaryKey().$defaultFn(() => createId()),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  eventDate: timestamp('event_date'),
  coverPhoto: varchar('cover_photo', { length: 500 }),
  isActive: boolean('is_active').default(true),
  createdBy: varchar('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Tabela de Fotos
export const photos = pgTable('photos', {
  id: varchar('id', { length: 128 }).primaryKey().$defaultFn(() => createId()),
  galleryId: varchar('gallery_id').references(() => photoGalleries.id).notNull(),
  fileName: varchar('file_name', { length: 255 }).notNull(),
  filePath: varchar('file_path', { length: 500 }).notNull(),
  fileSize: integer('file_size'),
  description: text('description'),
  uploadedBy: varchar('uploaded_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
})

// Tabela de Configurações do Site
export const siteSettings = pgTable('site_settings', {
  id: varchar('id', { length: 128 }).primaryKey().$defaultFn(() => createId()),
  siteName: varchar('site_name', { length: 255 }).notNull(),
  logo: varchar('logo', { length: 500 }),
  favicon: varchar('favicon', { length: 500 }),
  primaryColor: varchar('primary_color', { length: 7 }).default('#1e3a5f'),
  secondaryColor: varchar('secondary_color', { length: 7 }).default('#d4af37'),
  template: varchar('template', { length: 50 }).default('classic'), // classic, modern, institutional
  homeText: text('home_text'),
  aboutText: text('about_text'),
  contactText: text('contact_text'),
  contactEmail: varchar('contact_email', { length: 255 }),
  contactPhone: varchar('contact_phone', { length: 20 }),
  contactAddress: text('contact_address'),
  isActive: boolean('is_active').default(true),
  updatedBy: varchar('updated_by').references(() => users.id),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Tabela de Páginas do Site
export const sitePages = pgTable('site_pages', {
  id: varchar('id', { length: 128 }).primaryKey().$defaultFn(() => createId()),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  content: text('content'),
  isActive: boolean('is_active').default(true),
  order: integer('order').default(0),
  showInMenu: boolean('show_in_menu').default(true),
  createdBy: varchar('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Tabela de Logs de Auditoria
export const auditLogs = pgTable('audit_logs', {
  id: varchar('id', { length: 128 }).primaryKey().$defaultFn(() => createId()),
  userId: varchar('user_id').references(() => users.id),
  action: varchar('action', { length: 100 }).notNull(), // create, update, delete, login, etc.
  entity: varchar('entity', { length: 100 }).notNull(), // user, document, session, etc.
  entityId: varchar('entity_id'),
  oldValues: jsonb('old_values'),
  newValues: jsonb('new_values'),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow(),
})
