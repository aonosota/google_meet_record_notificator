// テスト用HTTPサーバー: /xxx-yyy-zzz パターンを test.html にマップ
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const PORT = 7654;

const MIME = {
  '.html': 'text/html',
  '.js':   'application/javascript',
  '.css':  'text/css',
};

http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  let filePath;

  // /xxx-yyy-zzz → test.html にリダイレクト（Meet URL パターン模倣）
  if (/^\/[a-z]+-[a-z]+-[a-z]+/.test(url.pathname)) {
    filePath = path.join(ROOT, 'test/test.html');
  } else {
    filePath = path.join(ROOT, url.pathname);
  }

  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found: ' + filePath); return; }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
    res.end(data);
  });
}).listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
