import { useState, useEffect } from 'react';
import FilterBar from '../components/FilterBar';
import FinanceTable from '../components/FinanceTable';
import ExportButton from '../components/ExportButton';
import { mockAccounts, Account } from '../data/financeData';

export default function Finance() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [filtered, setFiltered] = useState<Account[]>([]);

  // Simular fetch (could be replaced by real API call)
  useEffect(() => {
    // In real scenario: fetch('/api/finance/accounts').then(...)
    setAccounts(mockAccounts);
    setFiltered(mockAccounts);
  }, []);

  const handleSearch = (query: string) => {
    const lowered = query.toLowerCase();
    const result = accounts.filter(
      (a) =>
        a.store.toLowerCase().includes(lowered) ||
        a.type.toLowerCase().includes(lowered) ||
        a.status.toLowerCase().includes(lowered)
    );
    setFiltered(result);
  };

  const handleFilterChange = (filters: Record<string, string>) => {
    let result = [...accounts];
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter((a: any) => String(a[key]) === value);
      }
    });
    setFiltered(result);
  };

  // Example filter options (could be dynamic)
  const filterOptions = {
    status: [
      { label: 'Pago', value: 'paid' },
      { label: 'Pendente', value: 'pending' },
      { label: 'Vencido', value: 'overdue' },
    ],
    type: [
      { label: 'Recebível', value: 'receivable' },
      { label: 'Debitável', value: 'debit' },
    ],
  };

  return (
    <div className="p-8 min-h-screen bg-background/80 backdrop-blur-lg">
      <h1 className="text-4xl font-black text-primary mb-6">Gestão Financeira</h1>

      <FilterBar onSearch={handleSearch} onFilterChange={handleFilterChange} filterOptions={filterOptions} />

      <div className="flex justify-between items-center mt-6 mb-4">
        <h2 className="text-2xl font-bold text-primary">Contas {filtered.length > 0 && `(${filtered.length})`}</h2>
        <ExportButton data={filtered} fileName="contas_financeiras" format="csv" />
      </div>

      <FinanceTable data={filtered} />
    </div>
  );
}
