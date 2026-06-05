export interface Account {
  id: string;
  store: string;
  type: 'receivable' | 'debit';
  amount: number;
  dueDate: string; // ISO date
  status: 'paid' | 'pending' | 'overdue';
}

export const mockAccounts: Account[] = [
  {
    id: 'a1',
    store: 'Lodge Aurora da Virtude',
    type: 'receivable',
    amount: 4500,
    dueDate: '2026-07-01',
    status: 'pending',
  },
  {
    id: 'a2',
    store: 'Cavaleiros da Luz',
    type: 'debit',
    amount: 1200,
    dueDate: '2026-06-15',
    status: 'paid',
  },
  {
    id: 'a3',
    store: 'Estrela do Norte',
    type: 'receivable',
    amount: 3000,
    dueDate: '2026-06-20',
    status: 'overdue',
  },
  // Add more mock entries as needed
];
