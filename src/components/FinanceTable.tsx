import React from 'react';
import { Account } from '../data/financeData';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface FinanceTableProps {
  data: Account[];
}

export default function FinanceTable({ data }: FinanceTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-background shadow-sm">
      <table className="w-full min-w-[600px] table-auto text-left">
        <thead className="bg-muted/10">
          <tr>
            <th className="px-4 py-2 font-medium text-sm">Loja</th>
            <th className="px-4 py-2 font-medium text-sm">Tipo</th>
            <th className="px-4 py-2 font-medium text-sm">Valor</th>
            <th className="px-4 py-2 font-medium text-sm">Vencimento</th>
            <th className="px-4 py-2 font-medium text-sm">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((acc) => (
            <tr key={acc.id} className="border-t border-border hover:bg-muted/5 transition-colors">
              <td className="px-4 py-2 text-sm font-medium text-primary">{acc.store}</td>
              <td className="px-4 py-2 text-sm flex items-center gap-1">
                {acc.type === 'receivable' ? (
                  <ArrowUpRight className="text-green-500" size={14} />
                ) : (
                  <ArrowDownLeft className="text-red-500" size={14} />
                )}
                {acc.type === 'receivable' ? 'Recebível' : 'Debitável'}
              </td>
              <td className="px-4 py-2 text-sm font-semibold text-accent">R$ {acc.amount.toLocaleString('pt-BR')}</td>
              <td className="px-4 py-2 text-sm text-muted-foreground">{new Date(acc.dueDate).toLocaleDateString('pt-BR')}</td>
              <td className="px-4 py-2 text-sm">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    acc.status === 'paid'
                      ? 'bg-green-100 text-green-800'
                      : acc.status === 'pending'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {acc.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
