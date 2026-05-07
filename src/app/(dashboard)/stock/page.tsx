"use client";

import { useState } from "react";
import { 
  Package, 
  Search, 
  Filter, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  AlertTriangle,
  History,
  MoreVertical,
  Layers,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Modal } from "@/components/Modal";
import { PriceComparison } from "@/components/PriceComparison";

const stockItems = [
  { id: 1, name: "Óleo 5W30 Sintético", code: "OIL-001", brand: "Shell", category: "Lubrificantes", qty: 24, min: 10, price: "R$ 45,00", status: "Em Estoque" },
  { id: 2, name: "Filtro de Óleo PSL55", code: "FIL-022", brand: "Tecfil", category: "Filtros", qty: 5, min: 10, price: "R$ 28,00", status: "Baixo Estoque" },
  { id: 3, name: "Pastilha de Freio Diant.", code: "BRK-105", brand: "Fras-le", category: "Freios", qty: 12, min: 5, price: "R$ 180,00", status: "Em Estoque" },
  { id: 4, name: "Lâmpada H7 12V", code: "LMP-007", brand: "Osram", category: "Elétrica", qty: 2, min: 20, price: "R$ 35,00", status: "Baixo Estoque" },
  { id: 5, name: "Vela de Ignição Iridium", code: "IGN-500", brand: "NGK", category: "Motor", qty: 32, min: 8, price: "R$ 65,00", status: "Em Estoque" },
];

export default function StockPage() {
  const [isMLModalOpen, setIsMLModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Estoque de Peças</h2>
          <p className="text-sm text-muted">Gerencie as peças e produtos disponíveis na oficina.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsMLModalOpen(true)}
            className="px-4 py-2 rounded-md border border-border hover:bg-slate-800 text-sm font-medium flex items-center gap-2 text-primary border-primary/20 bg-primary/5"
          >
            <Globe size={18} />
            Consultar Online
          </button>
          <button className="px-4 py-2 rounded-md border border-border hover:bg-slate-800 text-sm font-medium flex items-center gap-2">
            <History size={18} />
            Movimentação
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Plus size={20} />
            Nova Peça
          </button>
        </div>
      </div>

      <Modal 
        isOpen={isMLModalOpen} 
        onClose={() => setIsMLModalOpen(false)} 
        title="Consultar Preços Online"
      >
        <PriceComparison />
      </Modal>

      {/* Stock Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 border-l-4 border-l-blue-500">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
              <Package size={24} />
            </div>
            <div>
              <p className="text-sm text-muted font-medium">Total de Itens</p>
              <h3 className="text-2xl font-bold">1.240</h3>
            </div>
          </div>
        </div>
        <div className="glass p-6 border-l-4 border-l-error">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-error/10 text-error">
              <AlertTriangle size={24} />
            </div>
            <div>
              <p className="text-sm text-muted font-medium">Baixo Estoque</p>
              <h3 className="text-2xl font-bold">18</h3>
            </div>
          </div>
        </div>
        <div className="glass p-6 border-l-4 border-l-primary">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <Layers size={24} />
            </div>
            <div>
              <p className="text-sm text-muted font-medium">Valor em Estoque</p>
              <h3 className="text-2xl font-bold">R$ 42.850</h3>
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
            placeholder="Buscar por nome, código ou aplicação..."
            className="w-full bg-slate-900/50 border border-border rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>
        <select className="bg-slate-900/50 border border-border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
          <option>Todas as Categorias</option>
          <option>Lubrificantes</option>
          <option>Filtros</option>
          <option>Freios</option>
        </select>
      </div>

      {/* Stock Table */}
      <div className="glass overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-slate-800/50">
              <th className="p-4 text-sm font-semibold text-muted">Item / Cód.</th>
              <th className="p-4 text-sm font-semibold text-muted">Categoria</th>
              <th className="p-4 text-sm font-semibold text-muted text-center">Qtd. Atual</th>
              <th className="p-4 text-sm font-semibold text-muted text-center">Qtd. Mín.</th>
              <th className="p-4 text-sm font-semibold text-muted">Preço Venda</th>
              <th className="p-4 text-sm font-semibold text-muted">Status</th>
              <th className="p-4 text-sm font-semibold text-muted text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {stockItems.map((item) => (
              <tr key={item.id} className="border-b border-border/50 hover:bg-slate-800/30 transition-colors group">
                <td className="p-4">
                  <div>
                    <p className="text-sm font-bold">{item.name}</p>
                    <p className="text-xs text-muted">{item.brand} | {item.code}</p>
                  </div>
                </td>
                <td className="p-4 text-sm text-muted">{item.category}</td>
                <td className="p-4 text-center font-bold">{item.qty}</td>
                <td className="p-4 text-center text-muted">{item.min}</td>
                <td className="p-4 text-sm font-bold">{item.price}</td>
                <td className="p-4">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-[10px] font-bold uppercase border",
                    item.status === "Em Estoque" 
                      ? "bg-success/10 text-success border-success/20" 
                      : "bg-error/10 text-error border-error/20"
                  )}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 rounded-md hover:bg-blue-500/10 hover:text-blue-400 transition-colors">
                      <ArrowUpRight size={18} />
                    </button>
                    <button className="p-2 rounded-md hover:bg-orange-500/10 hover:text-orange-400 transition-colors">
                      <ArrowDownRight size={18} />
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
