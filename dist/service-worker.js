if(!self.define){let s,l={};const e=(e,i)=>(e=new URL(e+".js",i).href,l[e]||new Promise((l=>{if("document"in self){const s=document.createElement("script");s.src=e,s.onload=l,document.head.appendChild(s)}else s=e,importScripts(e),l()})).then((()=>{let s=l[e];if(!s)throw new Error(`Module ${e} didn’t register its module`);return s})));self.define=(i,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(l[r])return;let u={};const c=s=>e(s,r),o={module:{uri:r},exports:u,require:c};l[r]=Promise.all(i.map((s=>o[s]||c(s)))).then((s=>(n(...s),u)))}}define(["./workbox-6567b62a"],(function(s){"use strict";s.setCacheNameDetails({prefix:"insitutodiversificado"}),self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"/css/140.cf56ec9a.css",revision:null},{url:"/css/342.7cc67fa9.css",revision:null},{url:"/css/350.e29ca6cb.css",revision:null},{url:"/css/351.e0261cbe.css",revision:null},{url:"/css/517.b59c6303.css",revision:null},{url:"/css/523.3c32d1ce.css",revision:null},{url:"/css/524.885fc2de.css",revision:null},{url:"/css/559.f4566d2e.css",revision:null},{url:"/css/576.f898b18c.css",revision:null},{url:"/css/816.0c769255.css",revision:null},{url:"/css/923.7b0ea16f.css",revision:null},{url:"/css/962.3d5f82d3.css",revision:null},{url:"/css/app.d87c532d.css",revision:null},{url:"/css/chunk-vendors.630ea325.css",revision:null},{url:"/img/eventos.0ae27bbd.jpg",revision:null},{url:"/img/fondo.e49879c3.png",revision:null},{url:"/img/logos.eddfffa6.png",revision:null},{url:"/index.html",revision:"f6fd5a7e1930508e7f6612f9a40bb1ba"},{url:"/js/140.46c412cf.js",revision:null},{url:"/js/329.b930d9c3.js",revision:null},{url:"/js/342.86bb8018.js",revision:null},{url:"/js/350.6cbd6bab.js",revision:null},{url:"/js/351.dab8138f.js",revision:null},{url:"/js/517.4117bac6.js",revision:null},{url:"/js/523.07a49bde.js",revision:null},{url:"/js/524.2fc5cd67.js",revision:null},{url:"/js/559.84ec0a9d.js",revision:null},{url:"/js/576.504b8e29.js",revision:null},{url:"/js/816.933a3b05.js",revision:null},{url:"/js/923.ff1735a3.js",revision:null},{url:"/js/962.621e51d1.js",revision:null},{url:"/js/app.9b4cd3f9.js",revision:null},{url:"/js/chunk-vendors.69f2523d.js",revision:null},{url:"/manifest.json",revision:"2137d3c2e3ca960555f480a4f43d18d3"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
