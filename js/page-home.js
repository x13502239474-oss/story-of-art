/* 首页渲染 */
(function(){
  const {$, esc, store} = SGA;

  /* ---- 时间轴 ---- */
  const tl = $("#timelineScroll");
  if(tl){
    tl.innerHTML = window.ERAS.map(era=>{
      const list = window.CHAPTERS.filter(c=>c.era===era.id);
      return `<div class="tl-era">
        <div class="tl-era__name">${esc(era.name)}</div>
        <div class="tl-era__years">${esc(era.years)}</div>
        ${list.map(c=>`
          <a class="tl-item ${c.ready?"tl-item--live":"tl-item--soon"}" href="${c.ready?`read.html?id=${c.no}`:"#openChapter"}" ${c.ready?"":'data-soon="1"'}>
            <span class="tl-item__no">${String(c.no).padStart(2,"0")}</span><span class="tl-item__title">${esc(c.t)}</span>
            ${c.ready?`<span class="tl-item__badge">${[15,16].includes(c.no)?"精读":"导读"}</span>`:'<span class="tl-item__badge tl-item__badge--soon">待写</span>'}
          </a>`).join("")}
      </div>`;
    }).join("");
    tl.addEventListener("click", e=>{
      const a = e.target.closest("[data-soon]");
      if(a){ e.preventDefault(); SGA.toast("这一章尚未撰写"); document.querySelector("#openChapter").scrollIntoView({behavior:"smooth"}); }
    });
  }

  /* ---- 已开放章节 ---- */
  const oc = $("#openChapter");
  if(oc){
    const ready = (window.CHAPTER_DATA ? Object.keys(window.CHAPTER_DATA).map(Number).sort((a,b)=>a-b) : []).map(n=>window.CHAPTER_DATA[n]).filter(Boolean);
    const picks = [15, 12, 20, 25];
    const feat = picks.map(n=>ready.find(c=>c.no===n)).filter(Boolean);
    const feats = feat.map((c,i)=>{
      const first = i===0;
      const cover = window.WORKS.find(w=>w.ch===c.no && w.fig===String(c.no===15?198:210)) || window.WORKS.find(w=>w.ch===c.no);
      if(first) return `
      <article style="display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:clamp(20px,4vw,54px);align-items:center" class="feat">
        <div>
          <div class="frame" data-lb="${cover.id}" style="cursor:zoom-in;background:#e6dac6;box-shadow:0 3px 6px rgba(40,25,15,.1),0 30px 60px -40px rgba(40,25,15,.8)">
            <img src="${cover.img}" alt="${esc(cover.t)}" loading="lazy" style="width:100%">
          </div>
          <p class="small" style="margin-top:10px;font-size:12px">${esc(cover.a)} · ${esc(cover.t)} · ${esc(cover.date)} · 本书图${esc(cover.fig)}</p>
        </div>
        <div>
          <p class="eyebrow">第 ${c.no} 章 · ${esc(c.eraName)}</p>
          <h3 style="font-size:clamp(26px,3.4vw,38px);font-weight:400;letter-spacing:.06em;margin:10px 0 6px;line-height:1.3">${esc(c.title)}</h3>
          <p class="small" style="font-family:var(--sans);letter-spacing:.1em;margin:0 0 18px">${esc(c.sub)} · ${esc(c.years)}</p>
          <p style="font-size:15.5px;line-height:2;color:var(--ink-2);margin:0 0 18px">${esc(c.lede.slice(0,150))}…</p>
          <ul style="font-size:14px;line-height:1.95;color:var(--ink-soft);padding-left:1.1em;margin:0 0 24px">
            ${c.keypoints.slice(0,3).map(k=>`<li style="margin-bottom:8px">${esc(k)}</li>`).join("")}
          </ul>
          <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
            <a class="cta" href="read.html?id=${c.no}" style="padding:12px 22px;font-size:12px;border-color:var(--burgundy);background:var(--burgundy);color:#f8eeda">阅读本章 <span class="cta__arrow">→</span></a>
            <a class="sec-link" href="gallery.html?ch=${c.no}">${window.WORKS.filter(w=>w.ch===c.no).length} 幅图版</a>
          </div>
          <p class="small" style="margin-top:22px;font-size:12.5px;color:var(--ink-faint)">${esc(c.readTime)} · ${c.sections.length} 节 · ${window.WORKS.filter(w=>w.ch===c.no).length} 幅图版</p>
        </div>
      </article>`;
      return `
      <article style="display:grid;grid-template-columns:170px minmax(0,1fr);gap:clamp(16px,3vw,36px);align-items:center;margin-top:clamp(30px,4vw,48px);padding-top:clamp(26px,4vw,40px);border-top:1px solid var(--line)" class="feat2">
        <div class="frame" data-lb="${cover.id}" style="cursor:zoom-in;background:#e6dac6;box-shadow:0 2px 4px rgba(40,25,15,.1),0 20px 40px -30px rgba(40,25,15,.7)">
          <img src="${cover.img}" alt="${esc(cover.t)}" loading="lazy" style="width:100%">
        </div>
        <div>
          <p class="eyebrow">第 ${c.no} 章 · ${esc(c.eraName)}</p>
          <h3 style="font-size:clamp(22px,2.6vw,30px);font-weight:400;letter-spacing:.05em;margin:8px 0 6px">${esc(c.title)}</h3>
          <p class="small" style="font-family:var(--sans);letter-spacing:.08em;margin:0 0 12px">${esc(c.sub)} · ${esc(c.years)}</p>
          <p style="font-size:14.5px;line-height:1.95;color:var(--ink-2);margin:0 0 16px;max-width:44rem">${esc(c.lede.slice(0,110))}…</p>
          <div style="display:flex;gap:20px;align-items:center;flex-wrap:wrap">
            <a class="sec-link" href="read.html?id=${c.no}">阅读本章 →</a>
            <a class="sec-link" href="gallery.html?ch=${c.no}" style="color:var(--ink-soft);border-color:var(--line-strong)">${window.WORKS.filter(w=>w.ch===c.no).length} 幅图版</a>
          </div>
        </div>
      </article>`;
    }).join("");

    oc.innerHTML = feats + `
      <div style="margin-top:clamp(40px,6vw,70px);border-top:1px solid var(--line);padding-top:26px">
        <p class="eyebrow" style="margin-bottom:14px">全部 ${ready.length} 章 · ${window.WORKS.length} 幅图版 · ${window.ARTISTS.filter(a=>a.ready).length} 位艺术家</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          ${window.ERAS.map(e=>`<a class="chip" href="#timeline">${esc(e.name)}</a>`).join("")}
          <a class="chip" href="gallery.html">全部图版</a>
          <a class="chip" href="artists.html">艺术家索引</a>
          <a class="chip" href="artist.html?id=titian">提香</a>
          <a class="chip" href="artist.html?id=giorgione">乔尔乔内</a>
          <a class="chip" href="artist.html?id=leonardo">莱奥纳尔多</a>
          <a class="chip" href="artist.html?id=michelangelo">米开朗琪罗</a>
          <a class="chip" href="artist.html?id=raphael">拉斐尔</a>
        </div>
      </div>`;
  }

  /* ---- 时期入口 ---- */
  const pgrid = $("#periodGrid");
  if(pgrid){
    pgrid.innerHTML = window.ERAS.map((era,i)=>{
      const list = window.CHAPTERS.filter(c=>c.era===era.id);
      const first = list.find(c=>c.ready) || list[0];
      const live = list.some(c=>c.ready);
      const openCount = list.filter(c=>c.ready).length;
      return `<a class="period ${live?"":"period--soon"}" href="read.html?id=${first.no}">
        <span class="period__no">${String(i+1).padStart(2,"0")} · 第${list[0].no}—${list[list.length-1].no}章</span>
        <span class="period__title">${esc(era.name)}</span>
        <span class="period__sub">${esc(era.range)}</span>
        <span class="period__sub" style="font-size:11.5px;letter-spacing:.06em">${esc(era.years)}</span>
        <span class="period__state">${openCount?`已开放 ${openCount} 章`:"尚未撰写"}</span>
      </a>`;
    }).join("");
  }

  /* ---- 继续阅读 ---- */
  const cs = $("#continueSection"), cl = $("#continueList");
  if(cs && cl){
    const recent = (window.SGA ? SGA.store.recent() : []).slice(0,3);
    const pos = (window.SGA ? SGA.store.positions() : {});
    if(recent.length){
      cs.style.display = "";
      cl.innerHTML = recent.map(r=>{
        const p = pos[r.id];
        const pct = p ? Math.round((p.ratio||0)*100) : null;
        return `<a class="list-row" href="${r.url}" style="text-decoration:none">
          ${r.img?`<img src="${r.img}" alt="" loading="lazy">`:""}
          <span style="min-width:0">
            <span class="list-row__t" style="display:block">${SGA.esc(r.title)}</span>
            <span class="list-row__m">${SGA.esc(r.sub||"")}${pct!==null?" · 读到 "+pct+"%":""}</span>
          </span>
          <span class="list-row__x">继续 →</span>
        </a>`;
      }).join("");
    }
  }

  /* ---- 艺术家 ---- */
  const pl = $("#peopleList");
  if(pl){
    pl.innerHTML = window.ARTISTS.map(a=>{
      const inner = `
        <div class="person__name">${esc(a.n)}</div>
        <div class="person__life">${esc(a.life)}</div>
        <div class="person__tag">${esc(a.tag)}</div>`;
      return a.ready
        ? `<a class="person" href="artist.html?id=${a.id}">${inner}</a>`
        : `<div class="person" style="opacity:.62;cursor:default">${inner}<div class="person__life" style="margin-top:8px;color:var(--ink-faint)">档案撰写中</div></div>`;
    }).join("");
  }

  /* ---- 图版选览 ---- */
  const pg = $("#plateGrid");
  if(pg){
    const pick = ["creation-of-adam","mona-lisa","galatea","tempest","pesaro-madonna","young-englishman"];
    pg.innerHTML = pick.map(id=>{
      const w = window.WORKS.find(x=>x.id===id); if(!w) return "";
      return `<button class="plate" data-lb="${w.id}" aria-label="放大查看《${esc(w.t)}》">
        <div class="plate__frame" style="aspect-ratio:4/5"><img src="${esc(w.img)}" alt="${esc(w.t)}" loading="lazy"></div>
        <div class="plate__cap">
          <div class="plate__t">${esc(w.t)}</div>
          <div class="plate__a">${esc(w.a)} · ${esc(w.date)}</div>
        </div>
      </button>`;
    }).join("");
  }

  /* ---- 响应式：特征区在窄屏堆叠 ---- */
  const style = document.createElement("style");
  style.textContent = "@media (max-width:820px){.feat,.feat2{grid-template-columns:1fr!important}}";
  document.head.appendChild(style);
})();
