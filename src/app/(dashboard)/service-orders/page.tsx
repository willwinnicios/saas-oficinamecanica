"use client";

import { 
  ClipboardList, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Printer,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const orders = [
  { id: 2024001, customer: "João Pereira", vehicle: "Toyota Corolla (ABC-1234)", date: "05/05/2024", total: "R$ 1.250,00", status: "Em Execução" },
  { id: 2024002, customer: "Maria Oliveira", vehicle: "Honda Civic (XYZ-5678)", date: "06/05/2024", total: "R$ 450,00", status: "Aguardando Peça" },
  { id: 2024003, customer: "Transportadora Silva", vehicle: "MB Sprinter (LOG-9012)", date: "06/05/2024", total: "R$ 3.800,00", status: "Finalizada" },
  { id: 2024004, customer: "Ricardo Santos", vehicle: "VW Gol (GOL-1020)", date: "07/05/2024", total: "R$ 150,00", status: "Em Diagnóstico" },
  { id: 2024005, customer: "Fernanda Lima", vehicle: "Hyundai HB20 (KJA-4455)", date: "07/05/2024", total: "R$ 890,00", status: "Aberta" },
];

const statusConfig = {
  "Aberta": { color: "bg-slate-500/10 text-slate-500 border-slate-500/20", icon: AlertCircle },
  "Em Diagnóstico": { color: "bg-amber-500/10 text-amber-500 border-amber-500/20", icon: Search },
  "Aguardando Aprovação": { color: "bg-purple-500/10 text-purple-400 border-purple-500/20", icon: Clock },
  "Em Execução": { color: "bg-blue-500/10 text-blue-400 border-blue-500/20", icon: Clock },
  "Aguardando Peça": { color: "bg-orange-500/10 text-orange-400 border-orange-500/20", icon: AlertCircle },
  "Finalizada": { color: "bg-success/10 text-success border-success/20", icon: CheckCircle2 },
  "Cancelada": { color: "bg-error/10 text-error border-error/20", icon: AlertCircle },
};

export default function ServiceOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Ordens de Serviço</h2>
          <p className="text-sm text-muted">Acompanhe o fluxo de trabalho da sua oficina.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 w-fit">
          <Plus size={20} />
          Nova OS
        </button>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass p-4 text-center">
          <p className="text-xs text-muted font-bold uppercase mb-1">Abertas</p>
          <p className="text-2xl font-bold text-blue-400">12</p>
        </div>
        <div className="glass p-4 text-center">
          <p className="text-xs text-muted font-bold uppercase mb-1">Execução</p>
          <p className="text-2xl font-bold text-amber-400">08</p>
        </div>
        <div className="glass p-4 text-center">
          <p className="text-xs text-muted font-bold uppercase mb-1">Prontas</p>
          <p className="text-2xl font-bold text-success">15</p>
        </div>
        <div className="glass p-4 text-center">
          <p className="text-xs text-muted font-bold uppercase mb-1">Faturamento</p>
          <p className="text-2xl font-bold text-primary">R$ 18k</p>
        </div>
      </div>

      {/* Filters */}
      <div className="glass p-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
          <input
            type="text"
            placeholder="Buscar por OS #, cliente ou placa..."
            className="w-full bg-slate-900/50 border border-border rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>
        <button className="p-2 rounded-md border border-border hover:bg-slate-800 text-muted flex items-center gap-2 px-4">
          <Filter size={18} />
          <span className="text-sm">Filtros Avançados</span>
        </button>
      </div>

      {/* OS Table */}
      <div className="glass overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-slate-800/50">
              <th className="p-4 text-sm font-semibold text-muted">Nº OS</th>
              <th className="p-4 text-sm font-semibold text-muted">Cliente / Veículo</th>
              <th className="p-4 text-sm font-semibold text-muted">Data Entrada</th>
              <th className="p-4 text-sm font-semibold text-muted">Total</th>
              <th className="p-4 text-sm font-semibold text-muted">Status</th>
              <th className="p-4 text-sm font-semibold text-muted text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const config = statusConfig[order.status as keyof typeof statusConfig] || statusConfig["Aberta"];
              return (
                <tr key={order.id} className="border-b border-border/50 hover:bg-slate-800/30 transition-colors group">
                  <td className="p-4">
                    <span className="text-sm font-bold text-primary">#{order.id}</span>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="text-sm font-bold">{order.customer}</p>
                      <p className="text-xs text-muted">{order.vehicle}</p>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-muted">{order.date}</td>
                  <td className="p-4 text-sm font-bold">{order.total}</td>
                  <td className="p-4">
                    <div className={cn(
                      "flex items-center gap-2 px-2 py-1 rounded-full text-[10px] font-bold uppercase border w-fit",
                      config.color
                    )}>
                      <config.icon size={12} />
                      {order.status}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-md hover:bg-primary/10 hover:text-primary transition-colors">
                        <Printer size={18} />
                      </button>
                      <button className="p-2 rounded-md hover:bg-amber-500/10 hover:text-amber-400 transition-colors">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 rounded-md bg-slate-800 hover:bg-primary text-white transition-colors">
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
