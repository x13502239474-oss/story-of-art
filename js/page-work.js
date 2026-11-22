/* 作品档案页 */
(function(){
  const {$, esc, store, toast} = SGA;
  const qs = new URLSearchParams(location.search);
  const id = qs.get("id") || "mona-lisa";
  const w = window.WORKS.find(x=>x.id===id);
  const host = $("#workHost");

  if(!w){
    host.innerHTML = `<p style="padding:60px 0">没有找到这件作品。<a class="ref" href="gallery.html">回到画廊</a></p>`;
    return;
  }

  document.title = `《${w.t}》${w.a} · 艺术的故事`;
  const ch = window.CHAPTERS.find(c=>c.no===w.ch);
  const artist = (w.artist && window.ARTIST_PAGES) ? window.ARTIST_PAGES[w.artist] : null;
  const siblings = window.WORKS.filter(x=>x.ch===w.ch && x.id!==w.id).slice(0,6);

  host.innerHTML = `
    <nav style="font-family:var(--sans);font-size:11px;letter-spacing:.14em;color:var(--ink-faint);margin-bottom:22px">
      <a href="index.html">阅读馆</a> / <a href="gallery.html?ch=${w.ch}">第${w.ch}章图版</a> / <span style="color:var(--ink-soft)">图${esc(w.fig)}</span>
    </nav>

    <div class="article__no">作品档案 · 本书图${esc(w.fig)}</div>
    <h1 class="article__title" style="margin-bottom:6px">${esc(w.t)}</h1>
    <p class="article__sub" style="margin-bottom:26px">${esc(w.a)} · ${esc(w.date)}</p>

    <div class="frame" data-lb="${esc(w.id)}" role="button" tabindex="0" aria-label="放大查看"
         style="cursor:zoom-in;background:#ece1ce;box-shadow:0 3px 8px rgba(40,25,15,.1),0 30px 60px -40px rgba(40,25,15,.8)">
      <img src="${esc(w.img)}" alt="${esc(w.a)}《${esc(w.t)}》" style="width:100%;height:auto">
    </div>
    <p class="small" style="font-size:12px;margin-top:10px;text-align:right">点击放大 · 滚轮缩放 · 拖动平移</p>

    <table class="label-table" style="margin-top:30px">
      <tr><th>作者</th><td>${artist?`<a class="ref" href="artist.html?id=${artist.id}">${esc(w.a)}</a>`:esc(w.a)}</td></tr>
      <tr><th>年代</th><td>${esc(w.date)}</td></tr>
      ${w.medium?`<tr><th>材质</th><td>${esc(w.medium)}</td></tr>`:""}
      ${w.size?`<tr><th>尺寸</th><td>${esc(w.size)}</td></tr>`:""}
      ${w.place?`<tr><th>现藏</th><td>${esc(w.place)}</td></tr>`:""}
      <tr><th>原著位置</th><td>第${w.ch}章《${esc(ch.t)}》 · 图${esc(w.fig)}</td></tr>
    </table>

    <h2 style="font-size:20px;font-weight:400;letter-spacing:.08em;border-bottom:1px solid var(--line);padding-bottom:10px;margin:44px 0 16px">展签说明</h2>
    <p style="font-size:16px;line-height:2.05">${esc(w.note||"")}</p>

    <div class="aside-note">
      <span class="aside-note__t">关于这张图</span>
      图像取自《艺术的故事》纸书插图（图${esc(w.fig)}），分辨率受原书印刷限制。它服务于阅读中的对照，不能替代原作观摩；作品的色彩、尺寸与肌理，仍需到 ${esc(w.place||"收藏机构")} 去看。
    </div>

    <div style="display:flex;gap:12px;flex-wrap:wrap;margin:34px 0 10px">
      <a class="cta" href="read.html?id=${w.ch}#s6" style="padding:12px 20px;font-size:12px;background:var(--burgundy);border-color:var(--burgundy);color:#f8eeda">在章节中读它的分析 →</a>
      <button class="cta" id="markBtn" style="padding:12px 20px;font-size:12px;background:none;border-color:var(--line-strong);color:var(--ink)">收藏作品</button>
    </div>

    <h2 style="font-size:20px;font-weight:400;letter-spacing:.08em;border-bottom:1px solid var(--line);padding-bottom:10px;margin:56px 0 20px">同一章的图版</h2>
    <div class="plate-grid">
      ${siblings.map(s=>`
        <a class="plate" href="work.html?id=${s.id}">
          <div class="plate__frame plate__frame--contain" style="aspect-ratio:4/3"><img src="${esc(s.img)}" alt="${esc(s.t)}" loading="lazy"></div>
          <div class="plate__cap"><div class="plate__t">${esc(s.t)}</div><div class="plate__a">图${esc(s.fig)} · ${esc(s.a)}</div></div>
        </a>`).join("")}
    </div>`;

  const btn = $("#markBtn");
  const sync=()=>{ btn.textContent = store.isMarked("work",w.id) ? "已收藏（点击取消）" : "收藏作品"; };
  sync();
  btn.onclick = ()=>{
    const added = store.toggleMark({type:"work", id:w.id, title:`《${w.t}》`, sub:w.a, img:w.img, url:`work.html?id=${w.id}`});
    sync(); toast(added?"已收藏到书房":"已取消收藏");
  };
})();
