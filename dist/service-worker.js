if(!self.define){let s,l={};const e=(e,i)=>(e=new URL(e+".js",i).href,l[e]||new Promise((l=>{if("document"in self){const s=document.createElement("script");s.src=e,s.onload=l,document.head.appendChild(s)}else s=e,importScripts(e),l()})).then((()=>{let s=l[e];if(!s)throw new Error(`Module ${e} didn’t register its module`);return s})));self.define=(i,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(l[r])return;let u={};const c=s=>e(s,r),o={module:{uri:r},exports:u,require:c};l[r]=Promise.all(i.map((s=>o[s]||c(s)))).then((s=>(n(...s),u)))}}define(["./workbox-6567b62a"],(function(s){"use strict";s.setCacheNameDetails({prefix:"insitutodiversificado"}),self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"/css/140.cf56ec9a.css",revision:null},{url:"/css/176.0d52a2ec.css",revision:null},{url:"/css/186.132a68bd.css",revision:null},{url:"/css/342.83e3f847.css",revision:null},{url:"/css/351.e0261cbe.css",revision:null},{url:"/css/5.c342fc76.css",revision:null},{url:"/css/523.3c32d1ce.css",revision:null},{url:"/css/559.f4566d2e.css",revision:null},{url:"/css/576.f898b18c.css",revision:null},{url:"/css/718.a6af2f1f.css",revision:null},{url:"/css/923.7b0ea16f.css",revision:null},{url:"/css/962.3d5f82d3.css",revision:null},{url:"/css/app.845e72dd.css",revision:null},{url:"/css/chunk-vendors.630ea325.css",revision:null},{url:"/img/eventos.0ae27bbd.jpg",revision:null},{url:"/img/fondo.e49879c3.png",revision:null},{url:"/img/logos.eddfffa6.png",revision:null},{url:"/index.html",revision:"0f360892e9bb9fb4a9c1ed4e581f2d48"},{url:"/js/140.46c412cf.js",revision:null},{url:"/js/176.44c1c030.js",revision:null},{url:"/js/186.5df32240.js",revision:null},{url:"/js/329.b930d9c3.js",revision:null},{url:"/js/342.6726bc32.js",revision:null},{url:"/js/351.dab8138f.js",revision:null},{url:"/js/5.a292b85d.js",revision:null},{url:"/js/523.07a49bde.js",revision:null},{url:"/js/559.84ec0a9d.js",revision:null},{url:"/js/576.504b8e29.js",revision:null},{url:"/js/718.72828335.js",revision:null},{url:"/js/923.ff1735a3.js",revision:null},{url:"/js/962.621e51d1.js",revision:null},{url:"/js/app.c24373fd.js",revision:null},{url:"/js/chunk-vendors.69f2523d.js",revision:null},{url:"/manifest.json",revision:"2137d3c2e3ca960555f480a4f43d18d3"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
