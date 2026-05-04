const https = require('https');
https.get('https://suno.com/s/gaTpEbwqutK2SD0o', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/https:\/\/cdn[0-9]*\.suno\.ai\/[a-zA-Z0-9_\-]+\.mp3/);
    if(match) console.log("FOUND:", match[0]);
    else console.log("NOT FOUND");
  });
});
