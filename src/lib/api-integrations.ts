/**
 * Motor de Busca Multicanal - OficinaPro
 */

export interface SearchResult {
  id: string;
  title: string;
  price: number;
  permalink: string;
  thumbnail: string;
  source: "Mercado Livre" | "Canal da Peça" | "AutoZ" | "Shopee";
  condition: string;
}

export async function searchGlobalPrices(query: string): Promise<SearchResult[]> {
  const results: SearchResult[] = [];

  try {
    // 1. Busca no Mercado Livre (Real via API)
    const mlResponse = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(query)}&limit=5`);
    const mlData = await mlResponse.json();
    
    const mlResults: SearchResult[] = mlData.results.map((item: any) => ({
      id: `ml-${item.id}`,
      title: item.title,
      price: item.price,
      permalink: item.permalink,
      thumbnail: item.thumbnail,
      source: "Mercado Livre",
      condition: item.condition === "new" ? "Novo" : "Usado",
    }));

    results.push(...mlResults);

    // 2. Busca no Canal da Peça (Mockado para exemplo de estrutura - requer Crawler no Backend)
    // Em produção, isso seria uma chamada para /api/proxy/canaldapeca
    results.push({
      id: "cp-1",
      title: `${query} (Referência Canal da Peça)`,
      price: mlResults[0] ? mlResults[0].price * 0.95 : 0, // Simulação de preço
      permalink: `https://www.canaldapeca.com.br/busca?q=${encodeURIComponent(query)}`,
      thumbnail: "https://www.canaldapeca.com.br/assets/img/logo-social.png",
      source: "Canal da Peça",
      condition: "Novo",
    });

    // 3. Busca no AutoZ
    results.push({
      id: "az-1",
      title: `${query} (Referência AutoZ)`,
      price: mlResults[0] ? mlResults[0].price * 1.05 : 0, // Simulação de preço
      permalink: `https://www.autoz.com.br/busca?q=${encodeURIComponent(query)}`,
      thumbnail: "https://www.autoz.com.br/static/media/logo-autoz.png",
      source: "AutoZ",
      condition: "Novo",
    });

    return results.sort((a, b) => a.price - b.price); // Ordenar por menor preço
  } catch (error) {
    console.error("Erro na busca global:", error);
    return [];
  }
}
