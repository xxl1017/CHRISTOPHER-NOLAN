const https = require('https');
https.get('https://suno.com/embed/gaTpEbwqutK2SD0o', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const d = data;
    const matches = d.match(/https:\/\/[^"]+\.mp3/g);
    if(matches) console.log("MP3 Matches:", matches);
    const audioUrlMatches = d.match(/audio_url[\s"':]+([^"']+)/g);
    if(audioUrlMatches) console.log("Audio URL Matches:", audioUrlMatches);
  });
});
