/* Slek Lab interactions. No framework, build step or external runtime. */
(() => {
 'use strict';
 const language = document.documentElement.lang;
 const lang = language === 'pt-BR' ? 1 : language === 'en' ? 2 : 0;
 const tr = (values) => values[lang];
 const strings = {
  all:['Todos','Todos','All'],retro:['Retro mods','Retro mods','Retro mods'],nintendo:['Nintendo mods','Nintendo mods','Nintendo mods'],maintenance:['Mantenimiento','Manutenção','Maintenance'],
  details:['Ver servicio','Ver serviço','View service'],quote:['A consultar','Sob consulta','On request'],
  results:['servicios disponibles','serviços disponíveis','services available'],more:['Ver más servicios','Ver mais serviços','View more services'],empty:['No hay servicios con estos filtros. Prueba otra búsqueda.','Nenhum serviço com esses filtros. Tente outra busca.','No services match these filters. Try another search.'],
  total:['Precio del servicio','Preço do serviço','Service price'],addon:['Complemento opcional','Complemento opcional','Optional add-on'],
  greeting:['Hola, Diego. Me interesa este servicio de Slek Lab:','Olá, Diego. Tenho interesse neste serviço da Slek Lab:','Hi Diego. I’m interested in this Slek Lab service:'],
  request:['Quisiera confirmar compatibilidad, presupuesto y condiciones de envío.','Gostaria de confirmar compatibilidade, orçamento e condições de envio.','I’d like to confirm compatibility, a quote and shipping arrangements.'],
  from:['Envío desde','Envio de','Shipping from'],pending:['por confirmar','a confirmar','to be confirmed'],
  general:['Hola, Diego. Me gustaría solicitar información sobre los servicios de Slek Lab y las condiciones de envío.','Olá, Diego. Gostaria de saber mais sobre os serviços da Slek Lab e as condições de envio.','Hi Diego. I’d like to know more about Slek Lab services and shipping arrangements.']
 };
 const text = key => tr(strings[key]);
 const icons = {
  console:'<rect x="3" y="6" width="26" height="20" rx="3"/><path d="M3 19h26M9 11v4m-2-2h4m10 0h3"/>',
  disc:'<rect x="3" y="7" width="26" height="19" rx="3"/><circle cx="16" cy="16" r="6"/><circle cx="16" cy="16" r="1.5"/><path d="M7 22h2m14 0h2"/>',
  chip:'<rect x="8" y="8" width="16" height="16" rx="2"/><path d="M12 12h8v8h-8zM12 3v5m8-5v5m-8 16v5m8-5v5M3 12h5m-5 8h5m16-8h5m-5 8h5"/>',
  handheld:'<rect x="7" y="2" width="18" height="28" rx="3"/><path d="M10 6h12v11H10zM11 23h6m-3-3v6m6-3h1m1-3h1"/>',
  gamepad:'<path d="M10 9h12c4 0 6 4 7 13 .3 4-3 5-5 2l-3-3H11l-3 3c-2 3-5 2-5-2 1-9 3-13 7-13Z"/><path d="M8 15h7m-3.5-3.5v7M22 14h.1m3 3h.1M13 9V5h6"/>',
  tools:'<path d="m19 5 3 3 5-1a7 7 0 0 1-9 9L8 27a3 3 0 0 1-4-4l11-10a7 7 0 0 1 4-8Z"/>'
 };
 const icon = name => `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
 const euro = value => new Intl.NumberFormat(language,{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(value);
 // This is a verified-format Spanish number; Brazilian normalization does not apply.
 const whatsapp = message => `https://wa.me/34641241166?text=${encodeURIComponent(message)}`;
 document.querySelectorAll('[data-contact]').forEach(a => {a.href=whatsapp(text('general'));});
 const featured=['atari-av','ps1-pico','gbc-ips','n64-combo','ps5','switch'];
 const services=[...featured.map(id=>window.SLEK_SERVICES.find(s=>s.id===id)),...window.SLEK_SERVICES.filter(s=>!featured.includes(s.id))];
 const grid=document.getElementById('service-grid');
 const search=document.getElementById('service-search');
 const count=document.getElementById('results-count');
 let filter='all',limit=6;
 const more=document.createElement('button');
 more.type='button';more.className='button secondary load-more';more.setAttribute('aria-controls','service-grid');
 grid.after(more);
 const normalize=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 function render(){
  const query=normalize(search.value.trim());
  const filtered=services.filter(s=>(filter==='all'||s.group===filter)&&normalize(`${s.console} ${tr(s.name)} ${tr(s.description)}`).includes(query));
  grid.innerHTML=filtered.length?filtered.slice(0,limit).map(s=>`<article class="service-card"><div class="card-top"><span class="device-icon">${icon(s.icon)}</span><span class="category-label">${text(s.group)}</span></div><div class="card-body"><p class="console-name">${s.console}</p><h3>${tr(s.name)}</h3><p>${tr(s.description)}</p>${s.addon?`<p class="card-note">+ ${tr(s.addon.name)} · ${euro(s.addon.price)}</p>`:''}</div><div class="price-row"><span class="price ${s.price===null?'quote':''}">${s.price===null?text('quote'):euro(s.price)}</span><button class="detail-button" data-service="${s.id}" aria-label="${text('details')}: ${s.console}, ${tr(s.name)}">${text('details')} <span aria-hidden="true">↗</span></button></div></article>`).join(''):`<p class="empty">${text('empty')}</p>`;
  count.textContent=`${String(filtered.length).padStart(2,'0')} ${text('results')}`;
  more.hidden=filtered.length<=limit;
  more.textContent=`${text('more')} (${Math.max(0,filtered.length-limit)}) ↓`;
 }
 document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  filter=button.dataset.filter;limit=6;
  document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  render();
 }));
 search.addEventListener('input',()=>{limit=6;render();});
 more.addEventListener('click',()=>{const previous=limit;limit+=6;render();grid.querySelectorAll('.detail-button')[previous]?.focus({preventScroll:true});});
 const dialog=document.getElementById('service-dialog');
 const title=document.getElementById('dialog-title');
 const consoleLabel=document.getElementById('dialog-console');
 const description=document.getElementById('dialog-description');
 const addonBox=document.getElementById('dialog-addon');
 const country=document.getElementById('shipping-country');
 const total=document.getElementById('dialog-price');
 const quoteLink=document.getElementById('dialog-whatsapp');
 let activeService=null;
 function updateQuote(){
  const s=activeService;
  if(!s)return;
  const checked=addonBox.querySelector('input')?.checked;
  const price=s.price===null?null:s.price+(checked?s.addon.price:0);
  total.textContent=price===null?text('quote'):euro(price);
  const message=[text('greeting'),`${s.console} — ${tr(s.name)}`,checked?`${text('addon')}: ${tr(s.addon.name)} (+${euro(s.addon.price)})`:null,`${text('total')}: ${price===null?text('quote'):euro(price)}`,`${text('from')}: ${country.value.trim()||text('pending')}`,text('request')].filter(Boolean).join('\n');
  quoteLink.href=whatsapp(message);
 }
 let trigger=null;
 grid.addEventListener('click',event=>{
  const button=event.target.closest('[data-service]');
  if(!button)return;
  trigger=button;
  activeService=services.find(s=>s.id===button.dataset.service);
  const s=activeService;
  title.textContent=tr(s.name);consoleLabel.textContent=s.console;description.textContent=tr(s.detail);
  addonBox.innerHTML=s.addon?`<label class="addon"><input type="checkbox"><span>${tr(s.addon.name)} <strong>+${euro(s.addon.price)}</strong></span></label>`:'';
  updateQuote();dialog.showModal();document.body.style.overflow='hidden';
 });
 addonBox.addEventListener('change',updateQuote);country.addEventListener('input',updateQuote);
 document.getElementById('dialog-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>{document.body.style.overflow='';trigger?.focus();});
 const menuButton=document.getElementById('menu-toggle');
 const nav=document.getElementById('navigation');
 const closeMenu=()=>{menuButton.setAttribute('aria-expanded','false');nav.classList.remove('is-open');};
 menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('is-open')){closeMenu();menuButton.focus();}});
 document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))closeMenu();});
 const mobileContact=document.querySelector('.mobile-contact');
 if('IntersectionObserver' in window){new IntersectionObserver(entries=>{mobileContact.classList.toggle('is-hidden',entries[0].isIntersecting);}).observe(document.getElementById('contact'));}
 if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target);}}),{threshold:.08});
  document.querySelectorAll('.section-heading,.step,.about-panel,.shipping').forEach(el=>{el.classList.add('will-reveal');observer.observe(el);});
 }
 render();
})();
