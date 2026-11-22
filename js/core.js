/* ============================================================
   core.js — 共用：顶栏、存储、灯箱、检索、图版构造
   ============================================================ */
(function(){
  "use strict";

  const $  = (s,c=document)=>c.querySelector(s);
  const $$ = (s,c=document)=>Array.from(c.querySelectorAll(s));
  const esc = s => String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

  /* ---------- 存储 ---------- */
  const K = {bm:"sga.bookmarks", rc:"sga.recent", pos:"sga.pos", pref:"sga.pref"};
  const store = {
    get(k,def){ try{ const v=localStorage.getItem(k); return v?JSON.parse(v):def; }catch(e){ return def; } },
    set(k,v){ try{ localStorage.setItem(k,JSON.stringify(v)); }catch(e){} },
    bookmarks(){ return store.get(K.bm,[]); },
    isMarked(type,id){ return store.bookmarks().some(b=>b.type===type && b.id===id); },
    toggleMark(item){
      let list = store.bookmarks();
      const i = list.findIndex(b=>b.type===item.type && b.id===item.id);
      if(i>=0){ list.splice(i,1); }
      else { list.unshift(Object.assign({ts:Date.now()},item)); }
      store.set(K.bm, list.slice(0,300));
      return i<0;
    },
    recent(){ return store.get(K.rc,[]); },
    pushRecent(item){
      let list = store.recent().filter(r=>!(r.type==="chapter" && item.type==="chapter" && r.id===item.id));
      list.unshift(Object.assign({ts:Date.now()},item));
      store.set(K.rc, list.slice(0,40));
    },
    positions(){ return store.get(K.pos,{}); },
    savePos(ch,data){
      const p = store.positions();
      p[ch] = Object.assign({ts:Date.now()},data);
      store.set(K.pos,p);
    },
    getPos(ch){ return store.positions()[ch]; }
  };

  /* ---------- 顶栏 ---------- */
  function mountTopbar(){
    const host = $("[data-topbar]");
    if(!host) return;
    host.outerHTML = `
      <header class="topbar">
        <div class="topbar__inner">
          <a class="brand" href="index.html" aria-label="返回首页">
            <span class="brand__mark">艺术的故事</span>
            <span class="brand__sub">The Story of Art · 数字阅读馆</span>
          </a>
          <span class="topbar__spacer"></span>
          <button class="tbtn" data-open-search aria-label="检索全书">
            <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M16.5 16.5 21 21"/></svg>
            <span>检索</span>
          </button>
          <a class="tbtn tbtn--ghost tbtn--keep" href="artists.html"><span>艺术家</span></a>
          <a class="tbtn tbtn--ghost tbtn--keep" href="study.html"><span>书房</span></a>
        </div>
      </header>`;
  }

  /* ---------- 图版 ---------- */
  function figureHTML(work, opt){
    if(!work) return "";
    opt = opt || {};
    const cap = `
      <figcaption>
        <span class="cap-t">${esc(work.t)}</span>
        <span class="cap-m">${esc(work.a)} · ${esc(work.date)}${work.medium?" · "+esc(work.medium):""}${work.size?" · "+esc(work.size):""}</span>
        <span class="cap-m">${esc(work.place||"")}</span>
        <span class="cap-fig">本书 图${esc(work.fig)}</span>
      </figcaption>`;
    return `<figure class="plate-big${opt.small?" plate-big--sm":""}">
      <div class="frame" data-lb="${esc(work.id)}" role="button" tabindex="0" aria-label="放大查看：${esc(work.t)}">
        <img src="${esc(work.img)}" alt="${esc(work.a)}《${esc(work.t)}》" loading="lazy" decoding="async">
      </div>${cap}
    </figure>`;
  }

  /* {{fig:192}} → 图版 */
  function renderTokens(html, chn){
    return String(html).replace(/\{\{fig:(\d+)\}\}/g, (m,fig)=>{
      const all = window.WORKS||[];
      const w = all.find(x=>String(x.fig)===String(fig) && Number(x.ch)===Number(chn))
             || all.find(x=>String(x.fig)===String(fig));
      return w ? figureHTML(w) : "";
    });
  }

  /* ---------- 灯箱 ---------- */
  let LB = { list:[], i:0, scale:1, x:0, y:0 };
  function ensureLightbox(){
    if($("#lightbox")) return;
    const el = document.createElement("div");
    el.id="lightbox"; el.className="lightbox"; el.setAttribute("role","dialog"); el.setAttribute("aria-modal","true");
    el.innerHTML = `
      <div class="lb-bar">
        <span data-lb-title style="max-width:50%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap"></span>
        <span class="lb-info" data-lb-count style="margin-left:14px;opacity:.45"></span>
        <span style="margin-left:auto"></span>
        <button class="lb-btn" data-lb-out title="缩小"><svg viewBox="0 0 24 24"><path d="M5 12h14"/></svg></button>
        <button class="lb-btn" data-lb-in title="放大"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></button>
        <button class="lb-btn" data-lb-reset title="复位"><svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg></button>
        <button class="lb-btn" data-lb-close title="关闭"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
      </div>
      <div class="lb-stage" data-lb-stage><img alt="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></div>
      <div class="lb-cap" data-lb-cap></div>`;
    document.body.appendChild(el);

    const stage = $("[data-lb-stage]",el), img = $("img",stage);
    let drag=null;
    function apply(){ img.style.transform = `translate(${LB.x}px,${LB.y}px) scale(${LB.scale})`; }
    function setScale(s){ LB.scale = Math.min(6, Math.max(.6, s)); if(LB.scale<=1){LB.x=0;LB.y=0;} apply(); }
    function show(i){
      LB.i = (i+LB.list.length)%LB.list.length;
      const w = LB.list[LB.i];
      img.src = w.img; img.alt = (w.a||"")+(w.t||"");
      $("[data-lb-title]",el).textContent = w.t || "";
      $("[data-lb-count]",el).textContent = (LB.i+1)+" / "+LB.list.length;
      $("[data-lb-cap]",el).innerHTML = `${esc(w.a||"")}《${esc(w.t||"")}》${w.date?" · "+esc(w.date):""}${w.place?" · "+esc(w.place):""}<br><span style="opacity:.55">本书 图${esc(w.fig||"—")} · 滚轮缩放，拖动平移，方向键切换</span>`;
      LB.x=0; LB.y=0; LB.scale=1; apply();
      const fit = ()=>{
        const st = stage.getBoundingClientRect();
        if(!img.naturalWidth || !st.height) return;
        const k = Math.min(2.4, (st.height*0.94)/img.naturalHeight, (st.width*0.96)/img.naturalWidth);
        setScale(Math.max(1, k));
      };
      if(img.complete && img.naturalWidth) fit();
      else img.onload = fit;
    }
    el._show = show;
    $("[data-lb-close]",el).onclick = ()=>closeLightbox();
    $("[data-lb-in]",el).onclick = ()=>setScale(LB.scale*1.35);
    $("[data-lb-out]",el).onclick = ()=>setScale(LB.scale/1.35);
    $("[data-lb-reset]",el).onclick = ()=>{LB.scale=1;LB.x=0;LB.y=0;apply();};
    el.addEventListener("wheel", e=>{ e.preventDefault(); setScale(LB.scale * (e.deltaY>0?.88:1.14)); }, {passive:false});
    stage.addEventListener("pointerdown", e=>{ drag={x:e.clientX-LB.x,y:e.clientY-LB.y}; stage.classList.add("is-drag"); stage.setPointerCapture(e.pointerId); });
    stage.addEventListener("pointermove", e=>{ if(!drag) return; LB.x=e.clientX-drag.x; LB.y=e.clientY-drag.y; apply(); });
    stage.addEventListener("pointerup", ()=>{ drag=null; stage.classList.remove("is-drag"); });
    el.addEventListener("click", e=>{ if(e.target===el) closeLightbox(); });
    document.addEventListener("keydown", e=>{
      if(!el.classList.contains("is-open")) return;
      if(e.key==="Escape") closeLightbox();
      if(e.key==="ArrowRight") show(LB.i+1);
      if(e.key==="ArrowLeft") show(LB.i-1);
      if(e.key==="+"||e.key==="=") setScale(LB.scale*1.2);
      if(e.key==="-") setScale(LB.scale/1.2);
    });
    document.addEventListener("click", e=>{
      const t = e.target.closest("[data-lb]");
      if(!t) return;
      const id = t.getAttribute("data-lb");
      const w = (window.WORKS||[]).find(x=>x.id===id);
      if(!w) return;
      const sameCh = (window.WORKS||[]).filter(x=>x.ch===w.ch);
      openLightbox(sameCh.length?sameCh:[w], sameCh.findIndex(x=>x.id===id));
    });
    document.addEventListener("keydown", e=>{
      if(e.key!=="Enter" && e.key!==" ") return;
      const t = document.activeElement;
      if(t && t.hasAttribute && t.hasAttribute("data-lb")){ e.preventDefault(); t.click(); }
    });
  }
  function openLightbox(list, i){
    ensureLightbox();
    LB.list = list; $("#lightbox").classList.add("is-open");
    document.body.style.overflow="hidden";
    $("#lightbox")._show(i<0?0:i);
  }
  function closeLightbox(){
    const el = $("#lightbox"); if(!el) return;
    el.classList.remove("is-open");
    document.body.style.overflow="";
  }

  /* ---------- 检索 ---------- */
  function buildIndex(){
    const idx=[];
    (window.CHAPTERS||[]).forEach(c=>{
      idx.push({kind:"时期", t:`第${c.no}章 ${c.t}`, d:`${c.s} · ${c.y}`, url:`read.html?id=${c.no}`, ready:!!c.ready});
    });
    (window.ARTISTS||[]).forEach(a=>{
      idx.push({kind:"艺术家", t:a.n, d:`${a.en} · ${a.life} · ${a.tag}`, url:`artist.html?id=${a.id}`, ready:!!a.ready});
    });
    (window.WORKS||[]).forEach(w=>{
      idx.push({kind:"作品", t:`《${w.t}》`, d:`${w.a} · ${w.date} · ${w.place}`, url:`work.html?id=${w.id}`, ready:true});
    });
    if(window.CH15){
      window.CH15.sections.forEach(s=>{
        const plain = s.html.replace(/\{\{fig:\d+\}\}/g,"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
        idx.push({kind:"章节小节", t:`${CH15.title} · ${s.title}`, d:plain.slice(0,90)+"…", url:`read.html?id=15#${s.id}`, ready:true, body:plain});
      });
    }
    return idx;
  }
  function mountSearch(){
    if($("#searchLayer")) return;
    const el=document.createElement("div");
    el.id="searchLayer"; el.className="search-layer";
    el.innerHTML=`
      <div class="search-panel" role="dialog" aria-modal="true" aria-label="检索">
        <div class="search-field">
          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M16.5 16.5 21 21"/></svg>
          <input type="search" placeholder="检索时期、艺术家、作品、正文…" autocomplete="off">
          <button class="search-close">ESC</button>
        </div>
        <div class="search-res"></div>
      </div>`;
    document.body.appendChild(el);
    const input=$("input",el), res=$(".search-res",el);
    let idx=null;
    const hint=`<div class="sr-empty">试试：蒙娜丽莎 / 渐隐法 / 米开朗琪罗 / 西斯廷 / 拉斐尔</div>`;
    res.innerHTML=hint;
    function render(q){
      if(!idx) idx=buildIndex();
      q=q.trim();
      if(!q){ res.innerHTML=hint; return; }
      const ql=q.toLowerCase();
      const hits=idx.map(it=>{
        let score=0;
        const t=(it.t||"").toLowerCase(), d=(it.d||"").toLowerCase(), b=(it.body||"").toLowerCase();
        if(t.includes(ql)) score+=100;
        if(d.includes(ql)) score+=40;
        if(b.includes(ql)) score+=20;
        return {it,score};
      }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,24);
      if(!hits.length){ res.innerHTML=`<div class="sr-empty">没有找到与「${esc(q)}」相关的内容。<br>目前开放的是第15章与三位艺术家档案，其余时期尚在撰写。</div>`; return; }
      res.innerHTML=hits.map(({it})=>`
        <a class="sr-item" href="${it.url}">
          <span class="sr-kind">${esc(it.kind)}${it.ready?"":" · 待开放"}</span>
          <div class="sr-t">${esc(it.t)}</div>
          <div class="sr-d">${esc(it.d||"")}</div>
        </a>`).join("");
    }
    input.addEventListener("input", ()=>render(input.value));
    el.addEventListener("click", e=>{ if(e.target===el) close(); });
    $(".search-close",el).onclick=close;
    function open(){ el.classList.add("is-open"); document.body.style.overflow="hidden"; setTimeout(()=>input.focus(),30); }
    function close(){ el.classList.remove("is-open"); document.body.style.overflow=""; }
    el._open=open;
    document.addEventListener("click", e=>{ if(e.target.closest("[data-open-search]")){ e.preventDefault(); open(); } });
    document.addEventListener("keydown", e=>{
      if(e.key==="Escape" && el.classList.contains("is-open")) close();
      if((e.metaKey||e.ctrlKey) && e.key.toLowerCase()==="k"){ e.preventDefault(); open(); }
    });
  }

  /* ---------- 提示 ---------- */
  let toastT;
  function toast(msg){
    let el=$("#toast");
    if(!el){
      el=document.createElement("div"); el.id="toast";
      el.style.cssText="position:fixed;left:50%;bottom:34px;transform:translate(-50%,10px);background:rgba(36,24,18,.94);color:#f4e8d4;padding:10px 20px;font-family:var(--sans);font-size:12px;letter-spacing:.12em;z-index:120;opacity:0;transition:.3s;border:1px solid rgba(217,189,140,.3);pointer-events:none";
      document.body.appendChild(el);
    }
    el.textContent=msg;
    requestAnimationFrame(()=>{ el.style.opacity="1"; el.style.transform="translate(-50%,0)"; });
    clearTimeout(toastT);
    toastT=setTimeout(()=>{ el.style.opacity="0"; el.style.transform="translate(-50%,10px)"; },1900);
  }

  /* ---------- 进度条 ---------- */
  function mountProgress(){
    if($("#progressbar")) return;
    const d=document.createElement("div"); d.id="progressbar"; d.className="progressbar";
    document.body.appendChild(d);
    const upd=()=>{
      const h=document.documentElement;
      const max=h.scrollHeight-h.clientHeight;
      d.style.width=(max>0?Math.min(100,(h.scrollTop||document.body.scrollTop)/max*100):0)+"%";
    };
    document.addEventListener("scroll",upd,{passive:true}); upd();
  }

  /* 副题与年代拼接：内容重复时只留一份 */
  function duo(a,b){
    a=String(a==null?"":a).trim(); b=String(b==null?"":b).trim();
    if(!a) return b; if(!b) return a;
    if(a===b || a.indexOf(b)>=0) return a;
    if(b.indexOf(a)>=0) return b;
    return a+" · "+b;
  }

  window.SGA = {$, $$, esc, duo, store, figureHTML, renderTokens, openLightbox, toast, mountTopbar, mountSearch, mountProgress, buildIndex};

  document.addEventListener("DOMContentLoaded", ()=>{
    mountTopbar(); mountSearch(); ensureLightbox();
    const p = $("[data-progress]"); if(p) mountProgress();
  });
})();
