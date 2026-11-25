(async()=>{await new Promise(r=>setTimeout(r,3500));
const R={vw:innerWidth,sw:document.documentElement.scrollWidth,issues:[]};
const b=document.getElementById('vxl-krulkaart');if(!b){R.issues.push('geen box');return R}
const mode=b.dataset.mode;R.mode=mode;const root=mode==='pdp'?document.querySelector('.vkp'):b;
if(!root||!root.querySelector('.vkw-n')){R.issues.push('niet gerenderd');return R}
root.scrollIntoView();await new Promise(r=>setTimeout(r,1500));
const bad=[...root.querySelectorAll('img')].filter(i=>i.getAttribute('src')&&!(i.complete&&i.naturalWidth));if(bad.length)R.issues.push(bad.length+' foto(s) niet geladen');
R.nodes=root.querySelectorAll('.vkw-n').length;
if(R.sw>R.vw+1)R.issues.push('horizontaal scrollen '+R.sw);
const rb=root.getBoundingClientRect();if(rb.right>innerWidth+1||rb.left<-1)R.issues.push('buiten beeld '+Math.round(rb.left)+'-'+Math.round(rb.right));
const links=[...root.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')).filter(h=>h&&h!=='#'&&!/cart/.test(h));
for(const l of [...new Set(links)]){const s=(await fetch(l,{method:'HEAD'})).status;if(s!==200)R.issues.push('link '+s+' '+l)}R.links=new Set(links).size;
const on=root.querySelector('.vkw-n.on');R.on=on&&on.getAttribute('aria-label');
await new Promise(r=>setTimeout(r,1000));
const ptr=root.querySelector('.vkw-ptr').getBoundingClientRect(),ob=on.getBoundingClientRect();if(Math.abs((ob.left+ob.width/2)-(ptr.left+ptr.width/2))>8)R.issues.push('selectie niet onder pijl');
[...root.querySelectorAll('button')].forEach(x=>{const r=x.getBoundingClientRect();if(x.offsetParent&&r.width>0&&(r.width<32||r.height<32)&&!x.classList.contains('vkw-n'))R.issues.push('kleine knop '+(x.textContent||x.getAttribute('aria-label')).trim().slice(0,15)+' '+Math.round(r.width)+'x'+Math.round(r.height))});
if(mode==='pdp'){const g=document.querySelector('ul.product-slider');if(g&&g.style.display!=='none')R.issues.push('galerij zichtbaar');
 R.lbl=root.querySelector('.vkp-lbl').textContent;R.pills=[...root.querySelectorAll('.vkk-w')].map(x=>x.textContent+(x.classList.contains('on')?'*':'')).join(' | ');
 R.h1=document.querySelector('h1').textContent.trim();if(!document.getElementById('product_configure_form'))R.issues.push('geen form');
 R.tiers=[...document.querySelectorAll('.vxlp-q')].map(x=>x.textContent).join('/');R.thumbs=root.querySelectorAll('.vkp-th').length;
}else{R.ws=[...b.querySelectorAll('.vkk-w')].map(x=>x.textContent+(x.classList.contains('on')?'*':'')).join(' | ');R.th=[...b.querySelectorAll('.vkw-thb')].map(x=>x.textContent).join(',');
 R.hd=b.querySelector('.vkw-hd h3')?.textContent;R.tiers=[...b.querySelectorAll('.vkw-tier')].map(x=>x.textContent).join('/');R.tot=b.querySelector('.vkw-tot')?.textContent;
 const cta=b.querySelector('.vkw-add').getBoundingClientRect();if(cta.width<120||cta.height<40)R.issues.push('knop te klein');R.mob=b.classList.contains('vkw-m');
 R.sub=(b.querySelector('.vkw-sub')||{}).textContent;}
R.krulCount=document.querySelectorAll('#vxl-krulkaart').length;R.h1=R.h1||document.querySelector('h1')?.textContent.trim();return R})()
