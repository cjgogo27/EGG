const {JSDOM}=require('jsdom');
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const root=path.join(__dirname,'..');
const data=JSON.parse(fs.readFileSync(path.join(root,'data/resources.json'),'utf8'));
const picks=JSON.parse(fs.readFileSync(path.join(root,'data/track-picks.json'),'utf8'));
const dom=new JSDOM(fs.readFileSync(path.join(root,'index.html'),'utf8'),{url:'https://cjgogo27.github.io/EGG/',runScripts:'outside-only',pretendToBeVisual:true});
const w=dom.window,d=w.document;
let download=null;
w.fetch=async url=>({ok:true,json:async()=>JSON.parse(fs.readFileSync(path.join(root,url),'utf8'))});
w.CSS={escape:s=>s.replace(/[^a-zA-Z0-9_-]/g,c=>'\\'+c)};
w.HTMLElement.prototype.scrollIntoView=function(){};
w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};
w.HTMLDialogElement.prototype.close=function(){this.open=false;};
w.URL.createObjectURL=()=> 'blob:test';w.URL.revokeObjectURL=()=>{};
w.HTMLAnchorElement.prototype.click=function(){download={href:this.href,name:this.download};};
const errors=[];w.console.error=(...x)=>errors.push(x.join(' '));
w.eval(fs.readFileSync(path.join(root,'assets/app.js'),'utf8'));
const click=s=>{const el=d.querySelector(s);assert(el,'Missing '+s);el.click();};
const search=q=>{const e=d.querySelector('#search');e.value=q;e.dispatchEvent(new w.Event('input',{bubbles:true}));};
const count=()=>d.querySelectorAll('.resource').length;
setImmediate(()=>{
 try{
  assert.equal(errors.length,0);assert.equal(count(),data.projects.length);assert.equal(d.querySelector('#stat-total').textContent,String(data.projects.length));
  assert.equal(picks.length,7);
  for(let i=0;i<7;i++){click(`[data-pick="${i}"]`);assert.equal(d.querySelectorAll('.pick-card').length,3);for(const p of picks[i].projects)assert(data.projects.some(x=>x.repo.toLowerCase()===p.repo.toLowerCase()),p.repo);}
  click('[data-find]');assert.equal(count(),1);assert(d.querySelector('.resource details').open);click('#clear-filters');
  search('wjq-learning/CBraMod');assert.equal(count(),1);assert(d.querySelector('.project-title').textContent.includes('CBraMod'));
  click('[data-save]');assert.equal(JSON.parse(w.localStorage.getItem('egg-saved')).length,1);click('#clear-filters');click('[data-quick="saved"]');assert.equal(count(),1);click('[data-save]');assert.equal(count(),0);assert(!d.querySelector('#empty-state').hidden);click('#empty-reset');
  click('[data-category="基座与预训练"]');assert.equal(count(),data.projects.filter(x=>x.category==='基座与预训练').length);
  const track=d.querySelector('[data-track="睡眠"]');track.focus();track.click();assert.equal(d.activeElement.dataset.track,'睡眠');assert(count()>0);click('#clear-filters');
  click('[data-quick="new"]');assert.equal(count(),data.projects.filter(x=>x.year===2026).length);
  click('[data-quick="licensed"]');assert.equal(count(),data.projects.filter(x=>x.licenseClass==='open').length);click('#clear-filters');
  const ready=d.querySelector('#readiness');ready.value='partial';ready.dispatchEvent(new w.Event('change'));assert.equal(count(),data.projects.filter(x=>x.readiness==='partial').length);assert(count()>0);click('#clear-filters');
  const buttons=[...d.querySelectorAll('[data-compare]')];buttons.slice(0,5).forEach(b=>b.click());assert.equal(d.querySelector('#compare-count').textContent,'已选 4 / 4 个项目');click('#open-compare');assert(d.querySelector('#compare-dialog').open);assert.equal(d.querySelectorAll('.compare-table thead th').length,5);assert(d.querySelector('#compare-dialog').hasAttribute('aria-labelledby'));click('#close-compare');click('#clear-compare');assert(d.querySelector('#compare-tray').hidden);
  search('不存在的模型xyz');assert.equal(count(),0);click('#empty-reset');assert.equal(count(),data.projects.length);
  click('#export');assert(download.name.endsWith('.csv'));assert(download.href==='blob:test');
  search('SSVEP');assert(count()>0);assert(w.location.search.includes('SSVEP'));
  assert.equal(errors.length,0);assert.equal(d.querySelectorAll('a[href="#"]').length,2);
  console.log(JSON.stringify({passed:true,projects:data.projects.length,topPicks:21,checks:['data load','seven track selections','recommendation jump','search','favorite save/remove','category and track filters','keyboard focus','year and license filters','code readiness filter','four-project compare limit','named dialog','empty state','CSV download','URL filter state']},null,2));
 }catch(error){console.error(error);process.exitCode=1;}
 finally{dom.window.close();}
});
