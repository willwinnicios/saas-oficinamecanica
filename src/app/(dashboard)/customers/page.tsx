"use client";

import { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  UserPlus,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";

const customers = [
  { id: 1, name: "João Pereira", document: "123.456.789-00", phone: "(11) 98765-4321", email: "joao@email.com", status: "Ativo", vehicles: 2, lastService: "15/04/2024" },
  { id: 2, name: "Maria Oliveira", document: "234.567.890-11", phone: "(11) 97765-4322", email: "maria@email.com", status: "Ativo", vehicles: 1, lastService: "10/04/2024" },
  { id: 3, name: "Transportadora Silva", document: "12.345.678/0001-99", phone: "(11) 3344-5566", email: "contato@silva.com", status: "Ativo", vehicles: 5, lastService: "02/05/2024" },
  { id: 4, name: "Ricardo Santos", document: "345.678.901-22", phone: "(11) 96655-4433", email: "ricardo@email.com", status: "Inativo", vehicles: 1, lastService: "15/02/2024" },
  { id: 5, name: "Fernanda Lima", document: "456.789.012-33", phone: "(11) 95544-3322", email: "fernanda@email.com", status: "Ativo", vehicles: 1, lastService: "20/04/2024" },
];

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Clientes</h2>
          <p className="text-sm text-muted">Gerencie o cadastro de clientes da sua oficina.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 w-fit">
          <UserPlus size={20} />
          Novo Cliente
        </button>
      </div>

      {/* Filters & Search */}
      <div className="glass p-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
          <input
            type="text"
            placeholder="Buscar por nome, telefone ou CPF/CNPJ..."
            className="w-full bg-slate-900/50 border border-border rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-md border border-border hover:bg-slate-800 text-muted flex items-center gap-2 px-3">
            <Filter size={18} />
            <span className="text-sm">Filtros</span>
          </button>
          <select className="bg-slate-900/50 border border-border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Todos os Status</option>
            <option>Ativos</option>
            <option>Inativos</option>
          </select>
        </div>
      </div>

      {/* Customers Table */}
      <div className="glass overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-slate-800/50">
              <th className="p-4 text-sm font-semibold text-muted">Cliente</th>
              <th className="p-4 text-sm font-semibold text-muted">Documento</th>
              <th className="p-4 text-sm font-semibold text-muted">Contato</th>
              <th className="p-4 text-sm font-semibold text-muted">Veículos</th>
              <th className="p-4 text-sm font-semibold text-muted">Status</th>
              <th className="p-4 text-sm font-semibold text-muted text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b border-border/50 hover:bg-slate-800/30 transition-colors group">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{customer.name}</p>
                      <p className="text-xs text-muted">Último serviço: {customer.lastService}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-muted">{customer.document}</td>
                <td className="p-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <Phone size={12} />
                      {customer.phone}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <Mail size={12} />
                      {customer.email}
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded-full bg-slate-800 text-[10px] font-bold border border-border">
                    {customer.vehicles} {customer.vehicles === 1 ? "Veículo" : "Veículos"}
                  </span>
                </td>
                <td className="p-4">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-[10px] font-bold uppercase border",
                    customer.status === "Ativo" 
                      ? "bg-success/10 text-success border-success/20" 
                      : "bg-slate-500/10 text-slate-500 border-slate-500/20"
                  )}>
                    {customer.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 rounded-md hover:bg-blue-500/10 hover:text-blue-400 transition-colors" title="Visualizar">
                      <Eye size={18} />
                    </button>
                    <button className="p-2 rounded-md hover:bg-amber-500/10 hover:text-amber-400 transition-colors" title="Editar">
                      <Edit size={18} />
                    </button>
                    <button className="p-2 rounded-md hover:bg-error/10 hover:text-error transition-colors" title="Excluir">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">Mostrando 5 de 128 clientes</p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 rounded-md border border-border hover:bg-slate-800 disabled:opacity-50" disabled>Anterior</button>
          <button className="px-3 py-1 rounded-md bg-primary text-white font-medium">1</button>
          <button className="px-3 py-1 rounded-md border border-border hover:bg-slate-800">2</button>
          <button className="px-3 py-1 rounded-md border border-border hover:bg-slate-800">3</button>
          <button className="px-3 py-1 rounded-md border border-border hover:bg-slate-800">Próximo</button>
        </div>
      </div>
    </div>
  );
}
