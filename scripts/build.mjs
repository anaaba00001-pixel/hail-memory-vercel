import {cp,mkdir,rm,readFile,access} from 'node:fs/promises';
const {exhibits}=await import('../public/assets/js/exhibits.js');
for(const item of exhibits)if(item.file)await access(new URL('../public/'+item.file,import.meta.url));
await rm(new URL('../dist',import.meta.url),{recursive:true,force:true});
await mkdir(new URL('../dist',import.meta.url),{recursive:true});
await cp(new URL('../public',import.meta.url),new URL('../dist',import.meta.url),{recursive:true});
console.log('Built static museum. Vercel deploys api/*.js as Node.js functions.');
