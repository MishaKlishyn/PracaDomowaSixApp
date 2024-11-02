const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const PORT = 3000;

http.createServer((req, res) => {
    const query = url.parse(req.url, true).query;
    const fileName = query.file;

    if (!fileName) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        return res.end('Podaj dobrze imie (np, ?file=example.txt)');
    }

    const filePath = path.join(__dirname, fileName);

    const readStream = fs.createReadStream(filePath);

    readStream.on('error', () => {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('error: pliku nie znaleziono');
    });

    res.writeHead(200, { 'Content-Type': 'text/plain' }); // Заголовки отправляются перед стримингом
    readStream.pipe(res);
}).listen(PORT, () => {
    console.log(`Serwer dziala tu:  http://localhost:${PORT}`);
});
