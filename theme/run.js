(async(pages,widths)=>{const code=await fetch('https://raw.githubusercontent.com/Sitecom244/krullint-fotos/5335f94/theme/test.js').then(r=>r.text());const out=[];
for(const w of widths){for(const p of pages){const f=document.createElement('iframe');f.style.cssText='position:fixed;left:0;top:0;width:'+w+'px;height:900px;border:0;z-index:-1;opacity:0.01';document.body.appendChild(f);
 await new Promise(res=>{f.onload=res;f.src=p+(p.includes('?')?'&':'?')+'it='+Date.now();setTimeout(res,20000)});
 let r;try{r=await Promise.race([f.contentWindow.eval(code),new Promise(x=>setTimeout(()=>x({issues:['timeout']}),40000))])}catch(e){r={issues:['err '+e.message]}}
 out.push(w+' '+p.replace(/^https?:\/\/[^/]+/,'').slice(0,60)+' | '+(r.issues&&r.issues.length?'FOUT: '+r.issues.join('; '):'ok')+' | n='+r.nodes+(r.bord?' +bord':'')+' | '+(r.lbl||r.hd||'')+' | '+(r.ws||r.pills||'')+' | t='+(r.tiers||'').replace(/€ ?[\d,]+/g,'')+(r.mob?' | mob':'')+' | c='+r.krulCount);
 f.remove()}}return out})
