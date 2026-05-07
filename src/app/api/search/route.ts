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

    // 2. Buscar no Mercado Livre com o Token
    const mlResponse = await fetch(
      `https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(query)}&limit=15`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const mlData = await mlResponse.json();

    return NextResponse.json({
      results: mlData.results || [],
    });
  } catch (error) {
    console.error("Erro na busca segura:", error);
    return NextResponse.json({ error: "Falha na busca" }, { status: 500 });
  }
}
