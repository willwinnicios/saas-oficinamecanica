"use client";

import { useState, useMemo } from "react";
import { searchGlobalPrices, SearchResult } from "@/lib/api-integrations";
import { 
  Search, 
  ShoppingBag, 
  ExternalLink, 
  Loader2, 
  AlertCircle, 
  TrendingDown,
  ChevronRight,
  History,
  ShieldCheck,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// Mock de histórico de preços (No futuro vira real)
const mockHistory = [
  { date: '01/05', price: 450 },
  { date: '05/05', price: 430 },
  { date: '10/05', price: 445 },
  { date: '15/05', price: 410 },
  { date: '20/05', price: 425 },
  { date: '25/05', price: 395 },
];

export function PriceComparison({ initialQuery = "" }: PriceComparisonProps) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const lowestPrice = useMemo(() => {
    if (results.length === 0) return 0;
    return Math.min(...results.map(r => r.price));
  }, [results]);

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
    <div className="space-y-6">
      {/* Search Input - Estilo Zoom */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Qual peça você procura hoje?"
            className="w-full bg-slate-900 border-2 border-border rounded-xl py-3 pl-12 pr-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-lg"
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="bg-primary hover:bg-primary/90 text-white font-bold px-8 rounded-xl shadow-lg transition-all flex items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
          Buscar
        </button>
      </form>

      {hasSearched && !loading && results.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Coluna da Esquerda: Produto e Histórico */}
          <div className="lg:col-span-1 space-y-4">
            <div className="glass p-6 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3">
                 <div className="bg-success/10 text-success text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 border border-success/20">
                    <TrendingDown size={12} />
                    MELHOR PREÇO
                 </div>
              </div>
              <div className="aspect-square bg-white rounded-xl p-4 flex items-center justify-center">
                 <img src={results[0].thumbnail} alt={query} className="max-h-full object-contain" />
              </div>
              <div>
                <h2 className="text-xl font-bold line-clamp-2">{results[0].title}</h2>
                <div className="flex items-center gap-2 mt-2">
                   <div className="flex text-amber-400">
                      {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                   </div>
                   <span className="text-xs text-muted">(42 avaliações)</span>
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                 <p className="text-xs text-muted font-medium mb-1 flex items-center gap-1 uppercase tracking-wider">
                    <History size={14} /> 
                    Histórico de Preços
                 </p>
                 <div className="h-32 w-full pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockHistory}>
                        <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} dot={false} />
                        <Tooltip 
                           contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                           itemStyle={{ color: '#fff' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                 </div>
              </div>
            </div>
          </div>

          {/* Coluna da Direita: Lista de Lojas */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-2">
               <h3 className="font-bold flex items-center gap-2">
                  <ShoppingBag size={18} className="text-primary" />
                  Compare em {results.length} lojas
               </h3>
               <div className="text-xs text-muted">
                  Menor preço: <span className="text-success font-bold text-sm ml-1">R$ {lowestPrice.toLocaleString('pt-BR')}</span>
               </div>
            </div>

            <div className="space-y-3">
              {results.map((item) => (
                <div key={item.id} className="glass p-4 hover:border-primary/50 transition-all group flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-16 h-16 rounded bg-slate-800/50 p-2 flex items-center justify-center shrink-0">
                      <img 
                        src={item.source === "Mercado Livre" ? "https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.21.22/mercadolibre/logo__large_plus.png" : "https://www.canaldapeca.com.br/assets/img/logo-social.png"} 
                        alt={item.source} 
                        className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all" 
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-muted uppercase">{item.source}</span>
                        {item.price === lowestPrice && (
                          <span className="bg-success/20 text-success text-[10px] px-1.5 py-0.5 rounded font-bold">MENOR PREÇO</span>
                        )}
                      </div>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-2xl font-black text-foreground">
                          R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                        <span className="text-xs text-muted">no PIX</span>
                      </div>
                      <p className="text-[10px] text-muted">ou 10x de R$ {(item.price / 10).toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center sm:items-end gap-2 shrink-0">
                     <div className="flex items-center gap-1 text-[10px] text-success font-bold mb-1">
                        <ShieldCheck size={12} />
                        LOJA CONFIÁVEL
                     </div>
                     <a 
                      href={item.permalink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-primary text-white hover:bg-primary/90 px-6 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2 group-hover:scale-105 active:scale-95 shadow-lg"
                    >
                      Ir à loja
                      <ChevronRight size={16} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="glass p-20 flex flex-col items-center justify-center space-y-4">
           <div className="relative">
              <Loader2 className="animate-spin text-primary" size={48} />
              <Search className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" size={20} />
           </div>
           <div className="text-center">
              <h3 className="text-lg font-bold">Escaneando o Mercado...</h3>
              <p className="text-muted text-sm">Buscando os melhores preços no Mercado Livre e lojas parceiras.</p>
           </div>
        </div>
      )}

      {!loading && !hasSearched && (
        <div className="glass p-16 flex flex-col items-center justify-center text-center space-y-6">
           <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center text-primary animate-pulse">
              <ShoppingBag size={40} />
           </div>
           <div className="max-w-md">
              <h3 className="text-xl font-bold mb-2">Seu comparador de peças inteligente</h3>
              <p className="text-muted">
                 Economize tempo e dinheiro. Nós buscamos as peças em múltiplos marketplaces e te mostramos onde está mais barato, igual ao Zoom.
              </p>
           </div>
           <div className="flex flex-wrap justify-center gap-2">
              {['Amortecedor Civic', 'Bateria Heliar', 'Óleo 5W30', 'Pneu 175/70'].map(tag => (
                <button 
                  key={tag}
                  onClick={() => { setQuery(tag); }}
                  className="px-3 py-1.5 rounded-full bg-slate-800 border border-border text-xs text-muted hover:text-primary hover:border-primary transition-all"
                >
                  {tag}
                </button>
              ))}
           </div>
        </div>
      )}
    </div>
  );
}

