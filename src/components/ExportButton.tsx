import React from 'react';
import { Download } from 'lucide-react';
import * as XLSX from 'xlsx';

type ExportFormat = 'csv' | 'xlsx';

interface ExportButtonProps {
  data: Record<string, any>[]; // array of objects
  fileName?: string;
  format?: ExportFormat;
}

export default function ExportButton({ data, fileName = 'relatorio', format = 'csv' }: ExportButtonProps) {
  const handleExport = () => {
    if (format === 'xlsx') {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      const wbout = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
      const blob = new Blob([wbout], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      // CSV export
      const header = Object.keys(data[0] || {});
      const rows = data.map(row =>
        header.map(field => JSON.stringify(row[field] ?? '')).join(',')
      );
      const csvContent = [header.join(','), ...rows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full text-sm font-medium text-accent hover:bg-accent/20 transition"
    >
      <Download size={16} />
      Exportar {format.toUpperCase()}
    </button>
  );
}
