import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {handler} from '../lib/core.js';
const root=resolve('public'),types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.glb':'model/gltf-binary','.json':'application/json','.jpg':'image/jpeg','.png':'image/png'};
http.createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');if(url.pathname.startsWith('/api/'))return await handler(url.pathname.slice(5))(req,res);const path=resolve(root,'.'+decodeURIComponent(url.pathname));if(!path.startsWith(root+sep)&&path!==root){res.writeHead(403);return res.end();}const file=(await stat(path)).isDirectory()?resolve(path,'index.html'):path;res.setHeader('Content-Type',types[extname(file)]||'application/octet-stream');res.end(await readFile(file));}catch{res.writeHead(404);res.end('Not found');}}).listen(3000,'127.0.0.1',()=>console.log('http://localhost:3000 — Ctrl+C to stop'));
