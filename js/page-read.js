/* 阅读页 */
(function(){
  const {$, $$, esc, store, renderTokens, toast} = SGA;
  const qs = new URLSearchParams(location.search);
  const id = qs.get("id") || "15";
  const chNo = parseInt(id,10);
  const meta = window.CHAPTERS.find(c=>c.no===chNo) || window.CHAPTERS[14];
  const data = (window.CHAPTER_DATA && window.CHAPTER_DATA[chNo]) ? window.CHAPTER_DATA[chNo] : null;

  /* ---------- 左栏 ---------- */
  function railHTML(){
    const groups = window.ERAS.map(era=>{
      const items = window.CHAPTERS.filter(c=>c.era===era.id).map(c=>{
        if(c.ready) return `<a class="nav-item ${c.no===chNo?"is-active":""}" href="read.html?id=${c.no}">
          <span class="nav-item__no">${String(c.no).padStart(2,"0")}</span>${esc(c.t)}</a>`;
        return `<div class="nav-item nav-item--soon"${c.no===chNo?' style="color:var(--burgundy);border-left:2px solid var(--burgundy);padding-left:8px;background:rgba(107,31,42,.04)"':''}>
          <span><span class="nav-item__no">${String(c.no).padStart(2,"0")}</span>${esc(c.t)}</span>
          <span class="nav-item__soon">待写</span></div>`;
      }).join("");
      return `<div class="nav-group">
        <div class="nav-group__t">${esc(era.name)}</div>${items}</div>`;
    }).join("");

    const toc = data ? `<div class="nav-group">
      <div class="nav-group__t">本章目录</div>
      ${data.sections.map(s=>`<a class="toc-item" href="#${s.id}" data-toc="${s.id}">${esc(s.num)}、${esc(s.title)}</a>`).join("")}
    </div>` : "";

    return `<div class="rail__label">目录 · ${meta.no} / 28</div>${groups}${toc}`;
  }
  $("#railL").innerHTML = railHTML();

  /* ---------- 章节未开放 ---------- */
  if(!data){
    document.title = `第${meta.no}章 ${meta.t} · 尚未撰写`;
    $("#topTitle").innerHTML = `第${meta.no}章 ${esc(meta.t)}<span>${esc(meta.sub)}</span>`;
    $("#railR").innerHTML = "";
    $("#article").innerHTML = `
      <div class="article__head">
        <div class="article__no">第 ${meta.no} 章 · ${esc(meta.y)}</div>
        <h1 class="article__title">${esc(meta.t)}</h1>
        <p class="article__sub">${esc(meta.sub)}</p>
      </div>
      <div class="aside-note" style="margin-top:0">
        <span class="aside-note__t">状态：尚未撰写</span>
        这一章还没有写。我们不做「先占位、后补内容」的事——一个只有三句简介和几张图的页面，对读者没有价值，也会让它旁边的章节显得可疑。
      </div>
      <p>本章将按与第15章相同的体例撰写：历史背景、艺术发展的具体变化、核心风格的技术分析、代表艺术家与作品细读、艺术史意义、与前后时期的联系，并配以本书图版与原著摘录。</p>
      <p>本章的正文正在撰写中。已完成的部分可以直接阅读，未完成的章节在目录里标为「待写」。</p>
      <div class="chip-row">
        <a class="chip" href="read.html?id=15">去读第15章</a>
        <a class="chip" href="index.html">回到时间轴</a>
      </div>`;
    document.querySelectorAll("[data-soon]").forEach(a=>{});
    return;
  }

  /* ---------- 顶部与页面标题 ---------- */
  document.title = `第${data.no}章 ${data.title} · 艺术的故事`;
  $("#topTitle").innerHTML = `第${data.no}章 ${esc(data.title)}<span>${esc(data.sub)}</span>`;
  $("#btnGallery").href = `gallery.html?ch=${data.no}`;

  /* ---------- 正文 ---------- */
  const head = `
    <div class="article__head">
      <div class="article__no">第 ${data.no} 章 · ${esc(data.eraName)} · ${esc(data.years)}</div>
      <h1 class="article__title">${esc(data.title)}</h1>
      <p class="article__sub">${esc(data.sub)}</p>
      <p class="article__lede">${esc(data.lede)}</p>
      <div style="display:flex;gap:16px;flex-wrap:wrap;margin-top:22px;font-family:var(--sans);font-size:11px;letter-spacing:.14em;color:var(--ink-faint)">
        <span>${esc(data.readTime)}</span><span>·</span><span>${data.sections.length} 节</span><span>·</span><span>图版 ${window.WORKS.filter(w=>w.ch===data.no).length} 幅</span>
      </div>
    </div>
    <div class="aside-note" style="background:rgba(232,219,197,.28);border-color:rgba(58,38,24,.14)">
      <span class="aside-note__t">本章要点</span>
      <ul style="margin:6px 0 0;padding-left:1.15em;font-size:14.5px;line-height:1.95">
        ${data.keypoints.map(k=>`<li style="margin-bottom:6px">${esc(k)}</li>`).join("")}
      </ul>
    </div>`;

  const body = data.sections.map(s=>`
    <h2 id="${s.id}"><span class="h2-no">${esc(s.num)}</span>${esc(s.title)}</h2>
    ${renderTokens(s.html, data.no)}
  `).join("");

  const prev = window.CHAPTERS.find(c=>c.no===meta.no-1);
  const next = window.CHAPTERS.find(c=>c.no===meta.no+1);
  const end = `
    <div class="ch-end">
      <a href="${prev?`read.html?id=${prev.no}`:"index.html"}">
        <span class="ch-end__dir">← 上一章</span>
        <span class="ch-end__t">${prev?`第${prev.no}章 ${esc(prev.t)}`:"回到时间轴"}${prev&&!prev.ready?"（待写）":""}</span>
      </a>
      <a href="${next?`read.html?id=${next.no}`:"index.html"}" style="text-align:right">
        <span class="ch-end__dir">下一章 →</span>
        <span class="ch-end__t">${next?`第${next.no}章 ${esc(next.t)}`:"回到时间轴"}${next&&!next.ready?"（待写）":""}</span>
      </a>
    </div>
    <p class="small" style="margin-top:26px;font-size:12px;color:var(--ink-faint);line-height:1.9">
      本章正文由本站撰写；酒红色引文块中文字逐字引自贡布里希《艺术的故事》第${data.no}章（范景中译，三联版）。
      图版均取自本书插图，保留原书图号。作品著作权不属于本站，仅供个人阅读与研究使用。
    </p>`;

  $("#article").innerHTML = head + body + end;

  /* ---------- 右栏 ---------- */
  const rail = data.rail;
  $("#railR").innerHTML = `
    <div class="rail-card">
      <div class="rail-card__t">本章艺术家</div>
      ${rail.artists.map(a=>{
        const ar = window.ARTISTS.find(x=>x.id===a.id);
        return ar && ar.ready
          ? `<a class="rail-person" href="artist.html?id=${a.id}"><span class="rail-person__n">${esc(a.n)}</span><span class="rail-person__d">${esc(a.d)}</span></a>`
          : `<div class="rail-person"><span class="rail-person__n">${esc(a.n)}</span><span class="rail-person__d">${esc(a.d)}</span></div>`;
      }).join("")}
      <div style="height:10px"></div>
      ${rail.extras.map(a=>`<div class="rail-person"><span class="rail-person__n" style="font-size:13px">${esc(a.n)}</span><span class="rail-person__d">${esc(a.d)}</span></div>`).join("")}
    </div>

    <div class="rail-card">
      <div class="rail-card__t">本章图版</div>
      ${window.WORKS.filter(w=>w.ch===data.no).slice(0,7).map(w=>`
        <a class="rail-work" href="work.html?id=${w.id}">
          <img src="${esc(w.img)}" alt="" loading="lazy">
          <span><span class="rail-work__t">${esc(w.t)}</span><br><span class="rail-work__a">图${esc(w.fig)} · ${esc(w.a)}</span></span>
        </a>`).join("")}
      <a class="sec-link" style="display:inline-block;margin-top:14px" href="gallery.html?ch=${data.no}">全部 ${window.WORKS.filter(w=>w.ch===data.no).length} 幅 →</a>
    </div>

    <div class="rail-card">
      <div class="rail-card__t">关键信息</div>
      ${rail.facts.map(f=>`<div class="rail-fact" style="margin-bottom:12px"><b>${esc(f.k)}</b>${esc(f.v)}</div>`).join("")}
    </div>

    <div class="rail-card">
      <div class="rail-card__t">关键词</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px">
        ${rail.keywords.map(k=>`<span style="font-family:var(--sans);font-size:11px;letter-spacing:.06em;color:var(--ink-soft);border:1px solid var(--line);padding:3px 8px">${esc(k)}</span>`).join("")}
      </div>
    </div>`;

  /* ---------- 书签 ---------- */
  const markItem = {type:"chapter", id:String(data.no), title:`第${data.no}章 ${data.title}`, sub:data.sub, img:"img/ch15/fig198.jpg", url:`read.html?id=${data.no}`};
  const btnMark = $("#btnMark");
  function syncMark(){
    const on = store.isMarked("chapter", String(data.no));
    btnMark.classList.toggle("is-on", on);
    btnMark.title = on ? "已加入书签（点击移除）" : "加入书签";
  }
  syncMark();
  btnMark.onclick = ()=>{
    const added = store.toggleMark(markItem);
    syncMark(); toast(added?"已加入书房书签":"已从书签移除");
  };

  /* ---------- 最近阅读 ---------- */
  store.pushRecent({type:"chapter", id:String(data.no), title:`第${data.no}章 ${data.title}`, sub:`${data.sub} · ${data.years}`, img:"img/ch15/fig198.jpg", url:`read.html?id=${data.no}`});

  /* ---------- 目录抽屉 ---------- */
  const railL = $("#railL"), scrim = $("#scrim");
  $("#btnMenu").onclick = ()=>{ railL.classList.add("is-open"); scrim.classList.add("is-open"); };
  scrim.onclick = ()=>closeDrawer();
  function closeDrawer(){ railL.classList.remove("is-open"); scrim.classList.remove("is-open"); }
  railL.addEventListener("click", e=>{ if(e.target.closest("a")) closeDrawer(); });

  /* ---------- 滚动监听 ---------- */
  const heads = $$("#article h2[id]");
  const tocLinks = $$("[data-toc]");
  const prog = $("#progressbar");
  function onScroll(){
    const y = window.scrollY + 120;
    let cur = heads[0];
    heads.forEach(h=>{ if(h.offsetTop <= y) cur = h; });
    if(cur){
      tocLinks.forEach(a=>a.classList.toggle("is-active", a.dataset.toc===cur.id));
    }
    const max = document.documentElement.scrollHeight - innerHeight;
    if(prog) prog.style.width = (max>0 ? Math.min(100, window.scrollY/max*100) : 0)+"%";
  }

  /* ---------- 阅读位置 ---------- */
  let saveT;
  function savePos(){
    const ratio = window.scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const y = window.scrollY + 140;
    let sec = heads[0];
    heads.forEach(h=>{ if(h.offsetTop <= y) sec = h; });
    store.savePos(data.no, {ratio:Math.min(1,ratio), section:sec?sec.id:null, y:window.scrollY});
  }
  window.addEventListener("scroll", ()=>{
    onScroll();
    clearTimeout(saveT); saveT = setTimeout(savePos, 500);
  }, {passive:true});
  window.addEventListener("beforeunload", savePos);
  onScroll();

  /* 恢复 */
  const pos = store.getPos(data.no);
  if(pos && pos.y > 400){
    setTimeout(()=>{
      window.scrollTo({top:pos.y, behavior:"auto"});
      const secName = (data.sections.find(s=>s.id===pos.section)||{}).title;
      toast(secName ? `已回到上次读到的地方：${secName}` : "已回到上次阅读位置");
    }, 120);
  }
})();
