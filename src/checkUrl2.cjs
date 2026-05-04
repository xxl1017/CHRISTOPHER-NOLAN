const https = require('https');
https.get('https://cdn1.suno.ai/gaTpEbwqutK2S999.mp3', {headers: {"User-Agent": "Mozilla/5.0"}},(res) => {
    console.log(res.statusCode);
});
