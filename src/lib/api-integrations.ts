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

// Cache para o token para não pedir um novo a cada busca
let cachedToken: string | null = null;
let tokenExpiry: number = 0;

async function getMLAccessToken() {
  const clientId = process.env.NEXT_PUBLIC_ML_CLIENT_ID;
  const clientSecret = process.env.ML_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.warn("ML Credentials not found, using public access");
    return null;
  }

  // Se o token ainda for válido, retorna o cache
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  try {
    const response = await fetch("https://api.mercadolibre.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    const data = await response.json();
    if (data.access_token) {
      cachedToken = data.access_token;
      tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // Expira 1 min antes
      return cachedToken;
    }
  } catch (error) {
    console.error("Erro ao obter token ML:", error);
  }
  return null;
}

export async function searchGlobalPrices(query: string): Promise<SearchResult[]> {
  const results: SearchResult[] = [];

  try {
    // Agora chamamos nossa PRÓPRIA API (que é segura)
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      console.error(`Erro na busca interna: ${response.status}`);
      return [];
    }

    const data = await response.json();
    const mlDataResults = data.results || [];
    
    const mlResults: SearchResult[] = mlDataResults.map((item: any) => ({
      id: `ml-${item.id}`,
      title: item.title,
      price: item.price || 0,
      permalink: item.permalink,
      thumbnail: item.thumbnail?.replace("http://", "https://") || "",
      source: "Mercado Livre",
      condition: item.condition === "new" ? "Novo" : "Usado",
    }));

    results.push(...mlResults);

    // 2. Simulação Canal da Peça
    if (mlResults.length > 0) {
      results.push({
        id: "cp-1",
        title: `${query} (Referência Canal da Peça)`,
        price: mlResults[0].price * 0.95,
        permalink: `https://www.canaldapeca.com.br/busca?q=${encodeURIComponent(query)}`,
        thumbnail: "https://www.canaldapeca.com.br/assets/img/logo-social.png",
        source: "Canal da Peça",
        condition: "Novo",
      });
    }

    return results.sort((a, b) => a.price - b.price);
  } catch (error) {
    console.error("Erro na busca global:", error);
    return [];
  }
}

