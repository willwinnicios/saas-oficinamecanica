const fs = require('fs');
const path = require('path');

async function test() {
    const envPath = path.join(__dirname, '..', '.env');
    const envFile = fs.readFileSync(envPath, 'utf8');
    const clientId = envFile.match(/NEXT_PUBLIC_ML_CLIENT_ID=(.*)/)[1].trim();
    const clientSecret = envFile.match(/ML_CLIENT_SECRET=(.*)/)[1].trim();

    try {
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
            
            // Tenta busca com User-Agent
            console.log("Tentando busca com User-Agent...");
            const sResp = await fetch("https://api.mercadolibre.com/sites/MLB/search?q=pneu&limit=1", {
                headers: { 
                    "Authorization": `Bearer ${tData.access_token}`,
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
                }
            });
            const sData = await sResp.json();
            
            if (sData.results) {
                console.log("✅ SUCESSO! A API retornou dados corretamente.");
                console.log(`- Primeiro item: ${sData.results[0].title}`);
            } else {
                console.log("❌ Continua bloqueado:", sData.message);
            }
        }
    } catch (e) {
        console.log("❌ Erro:", e.message);
    }
}

test();
