/* 书房 */
(function(){
  const {$, $$, esc, store, toast} = SGA;
  const panel = $("#panel");
  const KIND = {chapter:"时期", work:"作品", artist:"艺术家"};

  function row(item, extra){
    return `<div class="list-row">
      ${item.img?`<img src="${esc(item.img)}" alt="" loading="lazy">`:""}
      <div style="min-width:0">
        <a href="${esc(item.url||"#")}" class="list-row__t" style="letter-spacing:.03em">${esc(item.title)}</a>
        <div class="list-row__m">${esc(item.sub||"")}</div>
        ${extra||""}
      </div>
      <button class="list-row__x" data-del="${esc(item.type)}|${esc(item.id)}">移除</button>
    </div>`;
  }

  function renderMarks(){
    const list = store.bookmarks();
    if(!list.length) return `<div class="empty">还没有书签。<br>在章节顶部或作品档案里点「收藏」，它们会出现在这里。</div>`;
    return `<p class="small" style="margin:0 0 8px">${list.length} 条</p>` + list.map(b=>{
      const kind = KIND[b.type]||"";
      return `<div class="list-row">
        ${b.img?`<img src="${esc(b.img)}" alt="" loading="lazy">`:""}
        <div style="min-width:0">
          <a href="${esc(b.url||"#")}" class="list-row__t">${esc(b.title)}</a>
          <div class="list-row__m">${esc(kind)} · ${esc(b.sub||"")}</div>
        </div>
        <button class="list-row__x" data-del="${esc(b.type)}|${esc(b.id)}">移除</button>
      </div>`;
    }).join("");
  }

  function renderRecent(){
    const list = store.recent();
    if(!list.length) return `<div class="empty">还没有阅读记录。<br><a class="ref" href="read.html?id=15" style="color:var(--burgundy)">从第15章开始</a></div>`;
    return list.map(r=>{
      const d = new Date(r.ts);
      const time = `${d.getMonth()+1}月${d.getDate()}日 ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
      return `<div class="list-row">
        ${r.img?`<img src="${esc(r.img)}" alt="" loading="lazy">`:""}
        <div style="min-width:0">
          <a href="${esc(r.url||"#")}" class="list-row__t">${esc(r.title)}</a>
          <div class="list-row__m">${esc(r.sub||"")}</div>
          <div class="list-row__m" style="color:var(--ink-faint)">${time}</div>
        </div>
        <a class="list-row__x" href="${esc(r.url||"#")}">继续 →</a>
      </div>`;
    }).join("");
  }

  function renderPos(){
    const p = store.positions();
    const keys = Object.keys(p);
    if(!keys.length) return `<div class="empty">还没有保存的阅读位置。<br>读到一半离开，回来时会自动停在你上次的位置。</div>`;
    return keys.sort((a,b)=>p[b].ts-p[a].ts).map(k=>{
      const c = window.CHAPTERS.find(x=>x.no===Number(k));
      if(!c) return "";
      const pct = Math.round((p[k].ratio||0)*100);
      const d = new Date(p[k].ts);
      return `<div class="list-row">
        <div style="min-width:0;flex:1">
          <a href="read.html?id=${c.no}" class="list-row__t">第${c.no}章 ${esc(c.t)}</a>
          <div class="list-row__m">${esc(c.sub)} · 读到 ${pct}% · ${d.getMonth()+1}月${d.getDate()}日</div>
          <div style="height:3px;background:rgba(58,38,24,.1);margin-top:10px;max-width:280px"><div style="height:3px;width:${pct}%;background:var(--burgundy)"></div></div>
        </div>
        <a class="list-row__x" href="read.html?id=${c.no}">继续 →</a>
      </div>`;
    }).join("");
  }

  function renderData(){
    return `<div style="max-width:36rem">
      <p style="font-size:15.5px;line-height:2">本站不要求登录，也不向任何服务器发送你的阅读数据。下列内容仅存于当前浏览器的 localStorage：</p>
      <table class="label-table">
        <tr><th>书签</th><td>${store.bookmarks().length} 条</td></tr>
        <tr><th>阅读记录</th><td>${store.recent().length} 条</td></tr>
        <tr><th>阅读位置</th><td>${Object.keys(store.positions()).length} 个章节</td></tr>
        <tr><th>存储键</th><td style="font-family:var(--sans);font-size:12px">sga.bookmarks / sga.recent / sga.pos</td></tr>
      </table>
      <p class="small">清空后无法恢复；换浏览器或换设备也不会带过去。</p>
      <button class="cta" id="clearAll" style="margin-top:18px;padding:11px 22px;font-size:12px;border-color:var(--burgundy);color:var(--burgundy);background:none">清空全部本地数据</button>
    </div>`;
  }

  function draw(tab){
    panel.innerHTML = tab==="marks"?renderMarks():tab==="recent"?renderRecent():tab==="pos"?renderPos():renderData();
  }
  draw("marks");

  $$(".study-tab").forEach(t=>t.onclick = ()=>{
    $$(".study-tab").forEach(x=>x.classList.remove("is-active"));
    t.classList.add("is-active");
    draw(t.dataset.tab);
  });

  panel.addEventListener("click", e=>{
    const del = e.target.closest("[data-del]");
    if(del){
      const [type,id] = del.dataset.del.split("|");
      const list = store.bookmarks().filter(b=>!(b.type===type && b.id===id));
      store.set("sga.bookmarks", list);
      draw("marks"); toast("已移除");
    }
    if(e.target.id==="clearAll"){
      if(confirm("将清空书签、最近阅读与阅读位置，且无法恢复。确定吗？")){
        ["sga.bookmarks","sga.recent","sga.pos"].forEach(k=>localStorage.removeItem(k));
        draw("data"); toast("本地数据已清空");
      }
    }
  });
})();
