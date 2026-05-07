"use client";

import { 
  Car, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Plus,
  User,
  Hash,
  Calendar,
  Settings2
} from "lucide-react";
import { cn } from "@/lib/utils";

const vehicles = [
  { id: 1, owner: "João Pereira", brand: "Toyota", model: "Corolla", year: 2022, plate: "ABC-1234", color: "Prata", mileage: "45.000 km", status: "Em Oficina" },
  { id: 2, owner: "Maria Oliveira", brand: "Honda", model: "Civic", year: 2021, plate: "XYZ-5678", color: "Preto", mileage: "32.000 km", status: "Aguardando" },
  { id: 3, owner: "Transportadora Silva", brand: "Mercedes-Benz", model: "Sprinter", year: 2023, plate: "LOG-9012", color: "Branco", mileage: "12.000 km", status: "Finalizado" },
  { id: 4, owner: "Ricardo Santos", brand: "Volkswagen", model: "Gol", year: 2018, plate: "GOL-1020", color: "Vermelho", mileage: "120.000 km", status: "Em Oficina" },
  { id: 5, owner: "Fernanda Lima", brand: "Hyundai", model: "HB20", year: 2020, plate: "KJA-4455", color: "Azul", mileage: "68.000 km", status: "Finalizado" },
];

export default function VehiclesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Veículos</h2>
          <p className="text-sm text-muted">Acompanhe todos os veículos cadastrados no sistema.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 w-fit">
          <Plus size={20} />
          Novo Veículo
        </button>
      </div>

      {/* Filters */}
      <div className="glass p-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
          <input
            type="text"
            placeholder="Buscar por placa, modelo ou cliente..."
            className="w-full bg-slate-900/50 border border-border rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-md border border-border hover:bg-slate-800 text-muted flex items-center gap-2 px-3">
            <Filter size={18} />
            <span className="text-sm">Filtros</span>
          </button>
          <select className="bg-slate-900/50 border border-border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Todas as Marcas</option>
            <option>Toyota</option>
            <option>Honda</option>
            <option>Volkswagen</option>
          </select>
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="glass p-6 group hover:border-primary/50 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <Car size={24} />
              </div>
              <span className={cn(
                "px-2 py-1 rounded-full text-[10px] font-bold uppercase border",
                vehicle.status === "Em Oficina" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                vehicle.status === "Aguardando" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                "bg-success/10 text-success border-success/20"
              )}>
                {vehicle.status}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-bold">{vehicle.brand} {vehicle.model}</h3>
                <p className="text-xs text-muted flex items-center gap-1 mt-1">
                  <User size={12} /> {vehicle.owner}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 py-3 border-y border-border/50">
                <div className="space-y-1">
                  <p className="text-[10px] text-muted uppercase font-semibold">Placa</p>
                  <p className="text-sm font-bold flex items-center gap-2">
                    <Hash size={14} className="text-primary" />
                    {vehicle.plate}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted uppercase font-semibold">Ano</p>
                  <p className="text-sm font-bold flex items-center gap-2">
                    <Calendar size={14} className="text-primary" />
                    {vehicle.year}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted uppercase font-semibold">Cor</p>
                  <p className="text-sm font-bold">{vehicle.color}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted uppercase font-semibold">Km Atual</p>
                  <p className="text-sm font-bold">{vehicle.mileage}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button className="flex-1 btn-primary py-2 text-sm flex items-center justify-center gap-2">
                  <Eye size={16} />
                  Ver Histórico
                </button>
                <button className="p-2 rounded-md border border-border hover:bg-slate-800 transition-colors">
                  <Edit size={18} />
                </button>
                <button className="p-2 rounded-md border border-border hover:bg-error/10 hover:text-error hover:border-error/50 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
