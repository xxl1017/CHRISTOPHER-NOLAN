const https = require('https');
https.get('https://cdn1.suno.ai/gaTpEbwqutK2SD0o.mp3', {headers: {"User-Agent": "Mozilla/5.0", "Referer": "https://suno.com/"}},(res) => {
    console.log(res.statusCode);
});
