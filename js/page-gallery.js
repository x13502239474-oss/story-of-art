/* 画廊 */
(function(){
  const {$, esc, store, toast} = SGA;
  const qs = new URLSearchParams(location.search);
  const chFilter = qs.get("ch");
  const artFilter = qs.get("artist");
  const eraFilter = qs.get("era");

  const all = window.WORKS.slice();
  const chaptersWithWorks = Array.from(new Set(all.map(w=>w.ch))).sort((a,b)=>a-b);
  const erasWithWorks = window.ERAS.filter(e=>window.CHAPTERS.some(c=>c.era===e.id && chaptersWithWorks.includes(c.no)));

  /* ---------- 筛选栏：时期 / 章 / 艺术家 三行 ---------- */
  const f = $("#galFilter");
  f.innerHTML = `
    <div class="gal-frow">
      <a class="gal-chip ${!chFilter&&!artFilter&&!eraFilter?"is-active":""}" href="gallery.html">全部 ${all.length} 幅</a>
      ${erasWithWorks.map(e=>`<a class="gal-chip ${eraFilter===e.id?"is-active":""}" href="gallery.html?era=${e.id}">${esc(e.name)}</a>`).join("")}
    </div>
    <div class="gal-frow">
      ${chaptersWithWorks.map(ch=>{
        const c = window.CHAPTERS.find(x=>x.no===ch);
        return `<a class="gal-chip gal-chip--no ${String(ch)===chFilter?"is-active":""}" href="gallery.html?ch=${ch}" title="第${ch}章 ${esc(c.t)}">${String(ch).padStart(2,"0")}</a>`;
      }).join("")}
    </div>
    <div class="gal-frow">
      ${window.ARTISTS.filter(a=>a.ready).map(a=>`
        <a class="gal-chip ${artFilter===a.id?"is-active":""}" href="gallery.html?artist=${a.id}">${esc(a.n)}</a>`).join("")}
      <span class="gal-hint">点击图片放大 · 滚轮缩放 · 方向键切换</span>
    </div>`;

  /* ---------- 列表 ---------- */
  let list = all.slice();
  if(chFilter) list = list.filter(w=>String(w.ch)===chFilter);
  if(eraFilter){
    const nos = window.CHAPTERS.filter(c=>c.era===eraFilter).map(c=>c.no);
    list = list.filter(w=>nos.includes(w.ch));
  }
  if(artFilter) list = list.filter(w=>w.artist===artFilter);

  const isAll = !chFilter && !artFilter && !eraFilter;
  const host = $("#galList");
  const total = list.length;

  if(!list.length){
    host.innerHTML = `<p style="color:rgba(239,227,207,.5);text-align:center;padding:80px 0">这一组还没有图版。</p>`;
    return;
  }

  /* 全部视图先给「一章一幅」的精选，再提供展开 */
  let shown = isAll ? Array.from(new Set(list.map(w=>w.ch))).map(ch=>list.find(w=>w.ch===ch)).filter(Boolean) : list;

  function rowHTML(w){
    const c = window.CHAPTERS.find(x=>x.no===w.ch);
    return `<article class="gal-work">
      <div class="gal-work__img" data-lb="${esc(w.id)}" role="button" tabindex="0" aria-label="放大查看《${esc(w.t)}》">
        <img src="${esc(w.img)}" alt="${esc(w.a)}《${esc(w.t)}》" loading="lazy" decoding="async">
      </div>
      <div class="gal-work__label">
        <div>
          <div class="gal-work__t">${esc(w.t)}</div>
          <div class="gal-work__a">${esc(w.a)||"&nbsp;"}</div>
        </div>
        <div class="gal-work__d">
          ${esc(w.date)}${w.medium?"<br>"+esc(w.medium):""}${w.size?" · "+esc(w.size):""}${w.place?"<br>"+esc(w.place):""}<br>
          <span style="color:var(--gold-2)">本书 图${esc(w.fig)}</span>
        </div>
        <p class="gal-work__note">${esc(w.note||"")}</p>
        <div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap">
          <a class="gal-work__link" href="work.html?id=${w.id}">作品档案 →</a>
          <a class="gal-work__link" href="read.html?id=${w.ch}" style="border-color:transparent;color:rgba(239,227,207,.45)">见第${w.ch}章 · ${esc(c.t)}</a>
          <button class="gal-work__link" data-mark="${w.id}" style="border-color:transparent;color:rgba(239,227,207,.45)">收藏</button>
        </div>
      </div>
    </article>`;
  }

  function paint(){
    host.innerHTML = shown.map(rowHTML).join("") + (isAll && shown.length < total ? `
      <div style="text-align:center;padding:clamp(40px,7vw,80px) 0 10px">
        <p style="color:rgba(239,227,207,.5);font-family:var(--sans);font-size:12px;letter-spacing:.12em;margin-bottom:18px">
          精选 ${shown.length} 幅 · 全馆共 ${total} 幅
        </p>
        <button class="gal-more" data-more>展开全部 ${total} 幅图版</button>
      </div>` : "");
    const marks = new Set(store.bookmarks().filter(b=>b.type==="work").map(b=>b.id));
    host.querySelectorAll("[data-mark]").forEach(b=>{ if(marks.has(b.dataset.mark)) b.textContent="已收藏"; });
  }
  paint();

  host.addEventListener("click", e=>{
    const more = e.target.closest("[data-more]");
    if(more){
      shown = list.slice();
      paint();
      window.scrollTo({top:document.querySelector(".gal-work").offsetTop, behavior:"instant"});
      return;
    }
    const b = e.target.closest("[data-mark]");
    if(b){
      const w = window.WORKS.find(x=>x.id===b.dataset.mark);
      const added = store.toggleMark({type:"work", id:w.id, title:`《${w.t}》`, sub:w.a, img:w.img, url:`work.html?id=${w.id}`});
      toast(added?"已收藏到书房":"已取消收藏");
      b.textContent = added?"已收藏":"收藏";
    }
  });
})();
