// Teste simples usando as chaves do .env
const fs = require('fs');
const path = require('path');

async function test() {
    // Ler o .env manualmente para não depender de pacotes extras
    const envPath = path.join(__dirname, '..', '.env');
    const envFile = fs.readFileSync(envPath, 'utf8');
    const clientId = envFile.match(/NEXT_PUBLIC_ML_CLIENT_ID=(.*)/)[1].trim();
    const clientSecret = envFile.match(/ML_CLIENT_SECRET=(.*)/)[1].trim();

    console.log("--- TESTE OFICIAL OFICINAPRO ---");
    
    try {
        console.log("1. Gerando Token...");
        const tResp = await fetch("https://api.mercadolibre.com/oauth/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                grant_type: "client_credentials",
                client_id: clientId,
                client_secret: clientSecret
            })
        });
        const tData = await tResp.json();
        
        if (tData.access_token) {
            console.log("✅ Token OK!");
            
            console.log("2. Buscando Peças...");
            const sResp = await fetch("https://api.mercadolibre.com/sites/MLB/search?q=pneu%20175/70%20r14&limit=3", {
                headers: { "Authorization": `Bearer ${tData.access_token}` }
            });
            const sData = await sResp.json();
            
            console.log("\n--- RESULTADOS ---");
            sData.results.forEach(r => {
                console.log(`> ${r.title} - R$ ${r.price}`);
            });
        } else {
            console.log("❌ Erro no Token:", tData);
        }
    } catch (e) {
        console.log("❌ Erro:", e.message);
    }
}

test();
