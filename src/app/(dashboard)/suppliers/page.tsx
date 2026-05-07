"use client";

import { useState } from "react";
import { 
  Truck, 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  MapPin, 
  MoreVertical,
  Star,
  ExternalLink,
  ShieldCheck,
  Building2
} from "lucide-react";
import { cn } from "@/lib/utils";

const suppliers = [
  { 
    id: 1, 
    name: "Auto Peças Central", 
    cnpj: "12.345.678/0001-90", 
    category: "Peças Mecânicas", 
    rating: 4.8, 
    phone: "(11) 3456-7890", 
    email: "contato@central.com",
    status: "Ativo"
  },
  { 
    id: 2, 
    name: "Distribuidora Sul", 
    cnpj: "98.765.432/0001-10", 
    category: "Lubrificantes", 
    rating: 4.5, 
    phone: "(51) 3222-4455", 
    email: "vendas@suldistri.com.br",
    status: "Ativo"
  },
  { 
    id: 3, 
    name: "Mecânica Global", 
    cnpj: "45.678.901/0001-22", 
    category: "Ferramentas", 
    rating: 4.2, 
    phone: "(21) 2555-6677", 
    email: "atendimento@global.com",
    status: "Pendente"
  },
  { 
    id: 4, 
    name: "Tecfil Oficial", 
    cnpj: "33.222.111/0001-44", 
    category: "Filtros", 
    rating: 5.0, 
    phone: "0800-777-888", 
    email: "suporte@tecfil.com.br",
    status: "Ativo"
  },
];

export default function SuppliersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Fornecedores</h2>
          <p className="text-sm text-muted">Gerencie sua rede de parceiros e fornecedores de peças.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Novo Fornecedor
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <Truck size={24} />
            </div>
            <div>
              <p className="text-sm text-muted font-medium">Total de Fornecedores</p>
              <h3 className="text-2xl font-bold">24</h3>
            </div>
          </div>
        </div>
        <div className="glass p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-success/10 text-success">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-sm text-muted font-medium">Parceiros Premium</p>
              <h3 className="text-2xl font-bold">12</h3>
            </div>
          </div>
        </div>
        <div className="glass p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
              <Building2 size={24} />
            </div>
            <div>
              <p className="text-sm text-muted font-medium">Categorias Atendidas</p>
              <h3 className="text-2xl font-bold">08</h3>
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
            placeholder="Buscar por nome, CNPJ ou categoria..."
            className="w-full bg-slate-900/50 border border-border rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {suppliers.map((supplier) => (
          <div key={supplier.id} className="glass p-6 hover:border-primary/30 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-border group-hover:border-primary/50 transition-colors">
                  <Building2 size={24} className="text-muted" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{supplier.name}</h3>
                  <p className="text-xs text-muted font-mono">{supplier.cnpj}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-amber-500/10 text-amber-500 px-2 py-1 rounded text-xs font-bold">
                <Star size={12} fill="currentColor" />
                {supplier.rating}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Phone size={14} className="text-primary" />
                  {supplier.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Mail size={14} className="text-primary" />
                  <span className="truncate">{supplier.email}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted">
                   <div className={cn(
                    "w-2 h-2 rounded-full",
                    supplier.status === "Ativo" ? "bg-success" : "bg-amber-500"
                   )} />
                   {supplier.status}
                </div>
                <div className="text-xs font-medium px-2 py-1 bg-slate-800 rounded border border-border w-fit text-muted">
                  {supplier.category}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border/50 flex justify-between items-center">
              <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                <ExternalLink size={14} />
                Ver Catálogo
              </button>
              <div className="flex gap-2">
                 <button className="p-2 rounded-md hover:bg-slate-800 text-muted transition-colors">
                   <MoreVertical size={18} />
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
