/* Run once after editing local CSS/JS: node tools/renew-assets.mjs
   Renews all local CSS/JS tokens together, and checks every HTML reference.
   These are publication tokens, never generated for a visitor request. */
import { readdir, readFile, writeFile, access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomBytes } from 'node:crypto';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const token=randomBytes(8).toString('hex');
async function walk(dir){const out=[];for(const item of await readdir(dir,{withFileTypes:true})){if(['.git','node_modules'].includes(item.name))continue;const path=resolve(dir,item.name);if(item.isDirectory())out.push(...await walk(path));else if(item.name.endsWith('.html'))out.push(path);}return out;}
let count=0;
for(const path of await walk(root)){
 let html=await readFile(path,'utf8');
 const matches=[...html.matchAll(/(?:src|href)="([^"?#]+\.(?:js|css))(?:\?v=[a-f0-9]+)?"/g)];
 for(const match of matches){if(/^(?:https?:)?\/\//.test(match[1]))continue;await access(resolve(dirname(path),match[1]));html=html.replace(match[0],match[0].replace(/(?:\?v=[a-f0-9]+)?"$/,`?v=${token}"`));count++;}
 await writeFile(path,html);
}
console.log(`Renewed ${count} local resource references. Publication token: ${token}`);
