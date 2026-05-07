"use client";

import { useState } from "react";
import { searchGlobalPrices, SearchResult } from "@/lib/api-integrations";
import { Search, ShoppingBag, ExternalLink, Loader2, AlertCircle, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface PriceComparisonProps {
  initialQuery?: string;
}

export function PriceComparison({ initialQuery = "" }: PriceComparisonProps) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setHasSearched(true);
    const globalResults = await searchGlobalPrices(query);
    setResults(globalResults);
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar peça (Mercado Livre, Canal da Peça, AutoZ...)"
            className="w-full bg-slate-900/50 border border-border rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="btn-primary flex items-center gap-2 whitespace-nowrap"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
          Comparar Preços
        </button>
      </form>

      {hasSearched && !loading && (
        <div className="flex items-center justify-between px-2">
          <p className="text-xs text-muted">
            Encontramos <span className="font-bold text-foreground">{results.length}</span> resultados ordenados por menor preço.
          </p>
          <div className="flex gap-2">
            <span className="px-2 py-0.5 rounded bg-blue-500/10 text-[10px] text-blue-400 border border-blue-500/20">Mercado Livre</span>
            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-[10px] text-amber-400 border border-amber-500/20">C. da Peça</span>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {loading && (
          <div className="flex flex-col items-center justify-center py-8 text-muted">
            <Loader2 className="animate-spin mb-2" size={32} />
            <p className="text-sm">Escaneando múltiplos marketplaces...</p>
          </div>
        )}

        {!loading && hasSearched && results.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-muted glass">
            <AlertCircle className="mb-2" size={32} />
            <p className="text-sm">Nenhum resultado encontrado.</p>
          </div>
        )}

        {results.map((item) => (
          <div key={item.id} className="glass p-3 flex items-center justify-between hover:border-primary/30 transition-all group relative overflow-hidden">
            {/* Source indicator bar */}
            <div className={cn(
              "absolute left-0 top-0 bottom-0 w-1",
              item.source === "Mercado Livre" ? "bg-yellow-400" : 
              item.source === "Canal da Peça" ? "bg-blue-600" : "bg-orange-500"
            )} />
            
            <div className="flex items-center gap-4 pl-2">
              <div className="w-12 h-12 rounded bg-white p-1 flex items-center justify-center shrink-0">
                <img src={item.thumbnail} alt={item.title} className="max-w-full max-h-full object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium line-clamp-1">{item.title}</h4>
                  <span className="px-1.5 py-0.5 rounded-sm bg-slate-800 text-[9px] font-bold uppercase border border-border">
                    {item.source}
                  </span>
                </div>
                <p className="text-xs text-muted flex items-center gap-2 mt-0.5">
                  <span className="text-success font-bold text-sm">
                    {item.price > 0 ? `R$ ${item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : "Consultar Site"}
                  </span>
                  <span>•</span>
                  <span>{item.condition}</span>
                </p>
              </div>
            </div>
            <a 
              href={item.permalink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-primary/10 text-primary transition-colors flex items-center gap-1 group-hover:underline text-xs"
            >
              <span className="hidden sm:inline">Ver Loja</span>
              <ExternalLink size={14} />
            </a>
          </div>
        ))}

        {!loading && !hasSearched && (
          <div className="p-8 text-center text-muted border-2 border-dashed border-border rounded-lg">
            <ShoppingBag className="mx-auto mb-2 opacity-20" size={48} />
            <p className="text-sm italic">Digite o nome da peça para comparar preços online.</p>
          </div>
        )}
      </div>

      <div className="pt-2 flex items-center gap-2 justify-center opacity-50">
        <span className="text-[10px] uppercase font-bold tracking-tighter">Powered by</span>
        <img src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.21.22/mercadolibre/logo__large_plus.png" className="h-3 invert grayscale" alt="ML" />
      </div>
    </div>
  );
}
