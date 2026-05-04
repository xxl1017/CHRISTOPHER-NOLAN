const https = require('https');
https.get('https://studio-api.suno.ai/api/external/clips/?ids=gaTpEbwqutK2SD0o', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(data);
  });
});
