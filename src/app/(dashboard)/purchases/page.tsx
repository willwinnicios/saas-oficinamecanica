"use client";

import { useState } from "react";
import { 
  ShoppingCart, 
  Search, 
  Plus, 
  Filter,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  ExternalLink,
  MoreVertical,
  Calendar,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

const purchaseOrders = [
  { 
    id: "OC-2024-001", 
    supplier: "Auto Peças Central", 
    items: 12, 
    total: "R$ 4.250,00", 
    status: "Recebido", 
    date: "20/05/2026",
    deliveryDate: "22/05/2026"
  },
  { 
    id: "OC-2024-002", 
    supplier: "Distribuidora Sul", 
    items: 5, 
    total: "R$ 1.890,00", 
    status: "A Caminho", 
    date: "24/05/2026",
    deliveryDate: "26/05/2026"
  },
  { 
    id: "OC-2024-003", 
    supplier: "Mecânica Global", 
    items: 8, 
    total: "R$ 2.400,00", 
    status: "Pendente", 
    date: "25/05/2026",
    deliveryDate: "28/05/2026"
  },
  { 
    id: "OC-2024-004", 
    supplier: "Tecfil Oficial", 
    items: 20, 
    total: "R$ 3.150,00", 
    status: "Aguardando Aprovação", 
    date: "26/05/2026",
    deliveryDate: "---"
  },
];

export default function PurchasesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Gestão de Compras</h2>
          <p className="text-sm text-muted">Acompanhe seus pedidos de compra e reposição de estoque.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-md border border-border hover:bg-slate-800 text-sm font-medium flex items-center gap-2">
            <FileText size={18} />
            Relatórios
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Plus size={20} />
            Nova Ordem de Compra
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
              <ShoppingCart size={24} />
            </div>
            <div>
              <p className="text-sm text-muted font-medium">Pedidos Mês</p>
              <h3 className="text-2xl font-bold">42</h3>
            </div>
          </div>
        </div>
        <div className="glass p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm text-muted font-medium">Pendentes</p>
              <h3 className="text-2xl font-bold">08</h3>
            </div>
          </div>
        </div>
        <div className="glass p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <Truck size={24} />
            </div>
            <div>
              <p className="text-sm text-muted font-medium">A Caminho</p>
              <h3 className="text-2xl font-bold">05</h3>
            </div>
          </div>
        </div>
        <div className="glass p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-success/10 text-success">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-sm text-muted font-medium">Total Investido</p>
              <h3 className="text-2xl font-bold text-nowrap">R$ 15.400</h3>
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
            placeholder="Buscar por fornecedor ou número do pedido..."
            className="w-full bg-slate-900/50 border border-border rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>
        <div className="flex gap-2">
          <select className="bg-slate-900/50 border border-border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Status: Todos</option>
            <option>Pendente</option>
            <option>Aprovado</option>
            <option>Recebido</option>
          </select>
          <button className="p-2 rounded-md border border-border hover:bg-slate-800 text-muted transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="glass overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-slate-800/50">
              <th className="p-4 text-sm font-semibold text-muted">ID / Fornecedor</th>
              <th className="p-4 text-sm font-semibold text-muted">Data Emissão</th>
              <th className="p-4 text-sm font-semibold text-muted">Previsão Entrega</th>
              <th className="p-4 text-sm font-semibold text-muted text-center">Itens</th>
              <th className="p-4 text-sm font-semibold text-muted">Valor Total</th>
              <th className="p-4 text-sm font-semibold text-muted">Status</th>
              <th className="p-4 text-sm font-semibold text-muted text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {purchaseOrders.map((order) => (
              <tr key={order.id} className="border-b border-border/50 hover:bg-slate-800/30 transition-colors group">
                <td className="p-4">
                  <div>
                    <p className="text-sm font-bold">{order.id}</p>
                    <p className="text-xs text-muted">{order.supplier}</p>
                  </div>
                </td>
                <td className="p-4 text-sm text-muted">
                   <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      {order.date}
                   </div>
                </td>
                <td className="p-4 text-sm text-muted">
                   <div className="flex items-center gap-2">
                      <Truck size={14} />
                      {order.deliveryDate}
                   </div>
                </td>
                <td className="p-4 text-center font-medium">{order.items}</td>
                <td className="p-4 text-sm font-bold">{order.total}</td>
                <td className="p-4">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-[10px] font-bold uppercase border",
                    order.status === "Recebido" && "bg-success/10 text-success border-success/20",
                    order.status === "A Caminho" && "bg-primary/10 text-primary border-primary/20",
                    order.status === "Pendente" && "bg-amber-500/10 text-amber-500 border-amber-500/20",
                    order.status === "Aguardando Aprovação" && "bg-slate-500/10 text-slate-400 border-slate-500/20",
                  )}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 rounded-md hover:bg-primary/10 hover:text-primary transition-colors">
                      <ExternalLink size={18} />
                    </button>
                    <button className="p-2 rounded-md hover:bg-slate-800 transition-colors">
                      <MoreVertical size={18} />
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
