"use client";

import { DollarSign, ArrowUpCircle, ArrowDownCircle, TrendingUp, Filter, Search, Plus, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FinancePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Financeiro</h2>
          <p className="text-sm text-muted">Controle seu fluxo de caixa, contas a pagar e receber.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Novo Lançamento
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="glass p-6 border-l-4 border-l-success">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-success/10 text-success">
                <ArrowUpCircle size={24} />
              </div>
              <div>
                <p className="text-sm text-muted font-medium">Contas a Receber</p>
                <h3 className="text-2xl font-bold">R$ 18.250,00</h3>
              </div>
            </div>
         </div>
         <div className="glass p-6 border-l-4 border-l-error">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-error/10 text-error">
                <ArrowDownCircle size={24} />
              </div>
              <div>
                <p className="text-sm text-muted font-medium">Contas a Pagar</p>
                <h3 className="text-2xl font-bold">R$ 6.400,00</h3>
              </div>
            </div>
         </div>
         <div className="glass p-6 border-l-4 border-l-primary">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-sm text-muted font-medium">Saldo em Caixa</p>
                <h3 className="text-2xl font-bold">R$ 12.850,00</h3>
              </div>
            </div>
         </div>
      </div>

      <div className="glass p-20 flex flex-col items-center justify-center text-center space-y-4">
         <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-muted">
            <DollarSign size={32} />
         </div>
         <div>
            <h3 className="text-xl font-bold">Módulo Financeiro em Construção</h3>
            <p className="text-muted max-w-xs mx-auto">Estamos preparando as melhores ferramentas de gestão financeira para sua oficina.</p>
         </div>
      </div>
    </div>
  );
}
