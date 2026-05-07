"use client";

import { useState } from "react";
import { 
  FileText, 
  Search, 
  Plus, 
  Filter,
  MoreVertical,
  Printer,
  Mail,
  ArrowRight,
  Clock,
  CheckCircle2,
  XCircle,
  FileSearch
} from "lucide-react";
import { cn } from "@/lib/utils";

const quotes = [
  { 
    id: "ORC-1004", 
    customer: "Ricardo Santos", 
    vehicle: "Civic G10", 
    date: "25/05/2026", 
    total: "R$ 1.450,00", 
    status: "Enviado",
    validUntil: "28/05/2026"
  },
  { 
    id: "ORC-1005", 
    customer: "Mariana Oliveira", 
    vehicle: "HB20 2022", 
    date: "26/05/2026", 
    total: "R$ 890,00", 
    status: "Aprovado",
    validUntil: "29/05/2026"
  },
  { 
    id: "ORC-1006", 
    customer: "Fernando Costa", 
    vehicle: "Amarok V6", 
    date: "26/05/2026", 
    total: "R$ 4.200,00", 
    status: "Pendente",
    validUntil: "29/05/2026"
  },
  { 
    id: "ORC-1007", 
    customer: "Clínica Saúde+", 
    vehicle: "Ducato Ambulância", 
    date: "26/05/2026", 
    total: "R$ 2.150,00", 
    status: "Recusado",
    validUntil: "29/05/2026"
  },
];

export default function QuotesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Orçamentos</h2>
          <p className="text-sm text-muted">Crie e gerencie orçamentos para seus clientes.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Novo Orçamento
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
              <FileText size={24} />
            </div>
            <div>
              <p className="text-sm text-muted font-medium">Emitidos (Mês)</p>
              <h3 className="text-2xl font-bold">124</h3>
            </div>
          </div>
        </div>
        <div className="glass p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-success/10 text-success">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-sm text-muted font-medium">Taxa de Conversão</p>
              <h3 className="text-2xl font-bold">65%</h3>
            </div>
          </div>
        </div>
        <div className="glass p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm text-muted font-medium">Aguardando Resposta</p>
              <h3 className="text-2xl font-bold">18</h3>
            </div>
          </div>
        </div>
        <div className="glass p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <FileSearch size={24} />
            </div>
            <div>
              <p className="text-sm text-muted font-medium">Ticket Médio</p>
              <h3 className="text-2xl font-bold">R$ 1.850</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass p-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
          <input
            type="text"
            placeholder="Buscar por cliente, placa ou número..."
            className="w-full bg-slate-900/50 border border-border rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>
        <button className="p-2 rounded-md border border-border hover:bg-slate-800 text-muted transition-colors">
          <Filter size={18} />
        </button>
      </div>

      {/* Quotes Table */}
      <div className="glass overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-slate-800/50">
              <th className="p-4 text-sm font-semibold text-muted">Nº / Cliente</th>
              <th className="p-4 text-sm font-semibold text-muted">Veículo</th>
              <th className="p-4 text-sm font-semibold text-muted">Data</th>
              <th className="p-4 text-sm font-semibold text-muted">Validade</th>
              <th className="p-4 text-sm font-semibold text-muted">Total</th>
              <th className="p-4 text-sm font-semibold text-muted">Status</th>
              <th className="p-4 text-sm font-semibold text-muted text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote) => (
              <tr key={quote.id} className="border-b border-border/50 hover:bg-slate-800/30 transition-colors group">
                <td className="p-4">
                  <div>
                    <p className="text-sm font-bold">{quote.id}</p>
                    <p className="text-xs text-muted">{quote.customer}</p>
                  </div>
                </td>
                <td className="p-4 text-sm text-muted">{quote.vehicle}</td>
                <td className="p-4 text-sm text-muted">{quote.date}</td>
                <td className="p-4 text-sm text-muted">{quote.validUntil}</td>
                <td className="p-4 text-sm font-bold">{quote.total}</td>
                <td className="p-4">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-[10px] font-bold uppercase border",
                    quote.status === "Aprovado" && "bg-success/10 text-success border-success/20",
                    quote.status === "Enviado" && "bg-primary/10 text-primary border-primary/20",
                    quote.status === "Pendente" && "bg-amber-500/10 text-amber-400 border-amber-500/20",
                    quote.status === "Recusado" && "bg-error/10 text-error border-error/20",
                  )}>
                    {quote.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 rounded-md hover:bg-blue-500/10 hover:text-blue-400 transition-colors" title="Imprimir">
                      <Printer size={18} />
                    </button>
                    <button className="p-2 rounded-md hover:bg-success/10 hover:text-success transition-colors" title="Enviar WhatsApp">
                      <Mail size={18} />
                    </button>
                    <button className="p-2 rounded-md hover:bg-slate-800 transition-colors">
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
