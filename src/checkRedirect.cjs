const https = require('https');
https.get('https://suno.com/s/gaTpEbwqutK2SD0o', (res) => {
  console.log("Status:", res.statusCode);
  console.log("Headers:", res.headers);
});
