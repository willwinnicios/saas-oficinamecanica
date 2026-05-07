"use client";

import { PriceComparison } from "@/components/PriceComparison";
import { Globe, ShieldCheck, Zap, Info } from "lucide-react";

export default function ComparePage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Hero Header */}
      <div className="relative overflow-hidden glass p-8 rounded-2xl border-primary/20">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Globe size={24} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Busca Inteligente</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">Comparador de Preços Web</h2>
          <p className="text-muted max-w-2xl text-lg">
            Pesquise peças em tempo real no Mercado Livre, Canal da Peça e outros marketplaces automotivos. 
            Encontre a melhor margem para sua oficina.
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass p-4 flex items-start gap-3">
          <div className="p-2 bg-success/10 text-success rounded-lg">
            <Zap size={18} />
          </div>
          <div>
            <h4 className="text-sm font-bold">Tempo Real</h4>
            <p className="text-xs text-muted">Resultados diretos da API oficial do Mercado Livre.</p>
          </div>
        </div>
        <div className="glass p-4 flex items-start gap-3">
          <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
            <ShieldCheck size={18} />
          </div>
          <div>
            <h4 className="text-sm font-bold">Garantia</h4>
            <p className="text-xs text-muted">Acesso aos vendedores com melhor reputação.</p>
          </div>
        </div>
        <div className="glass p-4 flex items-start gap-3">
          <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
            <Info size={18} />
          </div>
          <div>
            <h4 className="text-sm font-bold">Margem</h4>
            <p className="text-xs text-muted">Compare custos e defina preços de venda competitivos.</p>
          </div>
        </div>
      </div>

      {/* Main Search Component */}
      <div className="glass p-6 md:p-8">
        <PriceComparison />
      </div>

      {/* Tips Section */}
      <div className="bg-slate-900/50 border border-border/50 rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center">
        <div className="text-center md:text-left flex-1">
          <h4 className="font-bold mb-1">Dica de Especialista</h4>
          <p className="text-sm text-muted">
            Ao pesquisar, tente incluir o modelo do carro ou o código original da peça (OEM) para resultados mais precisos. 
            Exemplo: "Pneu 175/70 R14" ou "Retrovisor Corolla 2018".
          </p>
        </div>
        <div className="flex gap-4">
           <div className="px-3 py-2 bg-slate-800 rounded-lg text-xs font-mono text-muted border border-border">
              pneu 205/55 r16
           </div>
           <div className="px-3 py-2 bg-slate-800 rounded-lg text-xs font-mono text-muted border border-border">
              filtro psl55
           </div>
        </div>
      </div>
    </div>
  );
}
