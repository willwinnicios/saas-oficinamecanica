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
            console.log("✅ Token de Acesso Gerado!");
            
            // Busca simplificada
            const query = "pneu";
            const sResp = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}&limit=2`, {
                headers: { "Authorization": `Bearer ${tData.access_token}` }
            });
            const sData = await sResp.json();
            
            if (sData.results) {
                console.log("✅ Busca retornou resultados!");
                console.log("Exemplo do 1º item:");
                console.log(`- Título: ${sData.results[0].title}`);
                console.log(`- Preço: ${sData.results[0].price}`);
            } else {
                console.log("❌ Resposta sem resultados. Corpo da resposta:");
                console.log(JSON.stringify(sData, null, 2));
            }
        }
    } catch (e) {
        console.log("❌ Erro fatal:", e.message);
    }
}

test();
