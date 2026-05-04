const https = require('https');
https.get('https://suno.com/s/gaTpEbwqutK2SD0o', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // try to find where the audio file is located by grepping lines containing "suno" and "mp3" or "audio" or "audio_url"
    const matches = data.match(/https?:\/\/[a-zA-Z0-9_\-\.]+suno[^"'\s]*\.(mp3|m4a|wav|aac)/ig);
    if (matches) console.log("AUDIO URL MATCHES:", matches);
    
    // search for any URL that contains the ID
    const idMatches = data.match(/https?:\/\/[a-zA-Z0-9_\-\.\/]*gaTpEbwqutK2SD0o[^"'\s]*/ig);
    if (idMatches) console.log("ID MATCHES:", Array.from(new Set(idMatches)));
  });
});
