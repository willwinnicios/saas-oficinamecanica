const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

async function testIntegration() {
    const clientId = process.env.NEXT_PUBLIC_ML_CLIENT_ID;
    const clientSecret = process.env.ML_CLIENT_SECRET;

    console.log("--- TESTE DE INTEGRAÇÃO MERCADO LIVRE ---");
    console.log(`Usando Client ID: ${clientId}`);

    try {
        // 1. Testar Geração de Token
        console.log("\n1. Solicitando Token de Acesso...");
        const tokenResponse = await fetch("https://api.mercadolibre.com/oauth/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                grant_type: "client_credentials",
                client_id: clientId,
                client_secret: clientSecret,
            }),
        });

        const tokenData = await tokenResponse.json();
        if (!tokenData.access_token) {
            console.error("Falha ao obter token:", tokenData);
            return;
        }
        console.log("✅ Token obtido com sucesso!");

        // 2. Testar Busca com o Token
        console.log("\n2. Realizando busca por 'retrovisor gol'...");
        const mlResponse = await fetch(
            `https://api.mercadolibre.com/sites/MLB/search?q=retrovisor%20gol&limit=2`,
            {
                headers: {
                    Authorization: `Bearer ${tokenData.access_token}`,
                },
            }
        );

        const mlData = await mlResponse.json();
        console.log("✅ Busca realizada!");
        
        console.log("\n--- RESULTADOS ENCONTRADOS ---");
        mlData.results.forEach((item, index) => {
            console.log(`${index + 1}. ${item.title}`);
            console.log(`   Preço: R$ ${item.price}`);
            console.log(`   Link: ${item.permalink.substring(0, 50)}...`);
        });

    } catch (error) {
        console.error("Erro no teste:", error);
    }
}

testIntegration();
