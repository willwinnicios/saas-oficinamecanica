import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const clientId = process.env.NEXT_PUBLIC_ML_CLIENT_ID;
  const clientSecret = process.env.ML_CLIENT_SECRET;

  try {
    // 1. Obter Token de Acesso
    const tokenResponse = await fetch("https://api.mercadolibre.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId!,
        client_secret: clientSecret!,
      }),
    });

    const tokenData = await tokenResponse.json();
    const token = tokenData.access_token;

    // 2. Busca Real no Mercado Livre (Usando um servidor diferente ou cabeçalhos limpos)
    const mlResponse = await fetch(
      `https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(query)}&limit=15`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        },
      }
    );

    const mlData = await mlResponse.json();
    const mlResults = (mlData.results || []).map((item: any) => ({
      id: `ml-${item.id}`,
      title: item.title,
      price: item.price,
      permalink: item.permalink, // LINK REAL DO MERCADO LIVRE
      thumbnail: item.thumbnail?.replace("http://", "https://") || "",
      source: "Mercado Livre",
    }));

    // 3. Gerador de Links Diretos (Deep Links) para outras lojas
    // Isso garante que você clique e já caia na busca da loja
    const directLinks = [
      {
        id: `amz-link`,
        title: `Ver "${query}" na Amazon`,
        price: 0,
        permalink: `https://www.amazon.com.br/s?k=${encodeURIComponent(query)}&ref=oficinapro`,
        thumbnail: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        source: "Amazon",
      },
      {
        id: `mgl-link`,
        title: `Ver "${query}" no Magalu`,
        price: 0,
        permalink: `https://www.magazineluiza.com.br/busca/${encodeURIComponent(query)}/`,
        thumbnail: "https://logodownload.org/wp-content/uploads/2014/04/magazine-luiza-logo-0.png",
        source: "Magazine Luiza",
      },
      {
        id: `shp-link`,
        title: `Ver "${query}" na Shopee`,
        price: 0,
        permalink: `https://shopee.com.br/search?keyword=${encodeURIComponent(query)}`,
        thumbnail: "https://logodownload.org/wp-content/uploads/2021/03/shopee-logo-0.png",
        source: "Shopee",
      }
    ];

    return NextResponse.json({
      results: [...mlResults, ...directLinks],
    });


  } catch (error) {
    console.error("Erro na busca segura:", error);
    return NextResponse.json({ error: "Falha na busca" }, { status: 500 });
  }
}
