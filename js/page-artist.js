/* 艺术家档案页 */
(function(){
  const {$, esc, store, toast} = SGA;
  const qs = new URLSearchParams(location.search);
  const id = qs.get("id") || "leonardo";
  const a = window.ARTIST_PAGES ? window.ARTIST_PAGES[id] : null;
  const basic = window.ARTISTS.find(x=>x.id===id);
  const hero = $("#heroHost"), host = $("#artistHost");

  if(!a){
    hero.innerHTML = `<div class="artist-hero__inner"><div>
      <p class="eyebrow eyebrow--light">艺术家档案</p>
      <h1>${esc(basic?basic.n:"未找到")}</h1>
      <p class="artist-hero__life">${esc(basic?basic.life:"")}</p>
      <p class="artist-hero__intro">这位艺术家的档案尚未收齐。他的作品仍可在<a href="gallery.html" style="border-bottom:1px solid var(--line-strong)">图版画廊</a>中查看。</p>
      <div style="margin-top:22px"><a class="cta" href="artists.html" style="padding:12px 22px;font-size:12px">回到艺术家索引 →</a></div>
    </div></div>`;
    host.innerHTML = "";
    return;
  }

  document.title = `${a.n} · 艺术的故事`;
  const works = a.works.map(x=>window.WORKS.find(w=>w.id===x)).filter(Boolean);
  const ch = window.CHAPTERS.find(c=>c.no===a.chapter);

  hero.innerHTML = `
    <div class="artist-hero__inner">
      <div>
        <p class="eyebrow eyebrow--light">艺术家档案 · 第${a.chapter}章</p>
        <h1>${esc(a.n)}</h1>
        <p class="artist-hero__life">${esc(a.en)} · ${esc(a.life)} · ${esc(a.role)}</p>
        <p class="artist-hero__intro">${esc(a.intro)}</p>
        <div style="margin-top:26px;display:flex;gap:12px;flex-wrap:wrap">
          <a class="cta" href="read.html?id=${a.chapter}" style="padding:11px 20px;font-size:12px">读第${a.chapter}章 →</a>
          <button class="tbtn" id="markA" style="color:#e9dcc7">收藏档案</button>
        </div>
      </div>
      <div class="artist-hero__img">
        <img src="${esc(a.portrait)}" alt="${esc(a.n)}作品图">
        <p class="small" style="color:rgba(217,189,140,.6);font-size:11.5px;margin-top:10px;line-height:1.7">${esc(a.portraitCap)}</p>
      </div>
    </div>`;

  host.innerHTML = `
    <section>
      <h2 style="font-size:clamp(20px,2.4vw,25px);font-weight:400;letter-spacing:.08em;border-bottom:1px solid var(--line);padding-bottom:12px;margin:0 0 20px">人物简介</h2>
      ${a.bio.map(p=>`<p style="font-size:16px;line-height:2.05;margin:0 0 1.3em;text-align:justify">${esc(p)}</p>`).join("")}
    </section>

    <section style="margin-top:clamp(38px,5vw,58px)">
      <h2 style="font-size:clamp(20px,2.4vw,25px);font-weight:400;letter-spacing:.08em;border-bottom:1px solid var(--line);padding-bottom:12px;margin:0 0 22px">生平时间线</h2>
      <div class="tl-list">
        ${a.timeline.map(([y,t])=>`<div class="tl-row"><div class="tl-row__y">${esc(y)}</div><div class="tl-row__t">${esc(t)}</div></div>`).join("")}
      </div>
    </section>

    <section style="margin-top:clamp(38px,5vw,58px)">
      <h2 style="font-size:clamp(20px,2.4vw,25px);font-weight:400;letter-spacing:.08em;border-bottom:1px solid var(--line);padding-bottom:12px;margin:0 0 20px">艺术风格</h2>
      <div style="display:grid;gap:16px">
        ${a.style.map(s=>`<div style="border-left:2px solid var(--gold);padding-left:16px;font-size:15.5px;line-height:2">${s}</div>`).join("")}
      </div>
    </section>

    <section style="margin-top:clamp(38px,5vw,58px)">
      <h2 style="font-size:clamp(20px,2.4vw,25px);font-weight:400;letter-spacing:.08em;border-bottom:1px solid var(--line);padding-bottom:12px;margin:0 0 20px">代表作品</h2>
      <div class="plate-grid">
        ${works.map(w=>`
          <a class="plate" href="work.html?id=${w.id}">
            <div class="plate__frame plate__frame--contain" style="aspect-ratio:4/5"><img src="${esc(w.img)}" alt="${esc(w.t)}" loading="lazy"></div>
            <div class="plate__cap"><div class="plate__t">${esc(w.t)}</div><div class="plate__a">${esc(w.date)} · 图${esc(w.fig)}</div></div>
          </a>`).join("")}
      </div>
    </section>

    <section style="margin-top:clamp(38px,5vw,58px)">
      <h2 style="font-size:clamp(20px,2.4vw,25px);font-weight:400;letter-spacing:.08em;border-bottom:1px solid var(--line);padding-bottom:12px;margin:0 0 20px">重要艺术思想</h2>
      <div style="display:grid;gap:18px">
        ${a.thoughts.map(t=>`<div style="background:rgba(232,219,197,.32);padding:18px 20px;font-size:15px;line-height:2">${t}</div>`).join("")}
      </div>
    </section>

    <section style="margin-top:clamp(38px,5vw,58px)">
      <h2 style="font-size:clamp(20px,2.4vw,25px);font-weight:400;letter-spacing:.08em;border-bottom:1px solid var(--line);padding-bottom:12px;margin:0 0 20px">在艺术史中的地位</h2>
      <p style="font-size:16px;line-height:2.05">${esc(a.status)}</p>
      <div class="aside-note">
        <span class="aside-note__t">出处说明</span>
        本页为编者撰写的独立档案，不属于《艺术的故事》原文。涉及的生平年份与作品信息以通行艺术史资料为准；贡布里希本人的评述，请见酒红色引文块与<a class="ref" href="read.html?id=${a.chapter}">第${a.chapter}章</a>正文。
      </div>
    </section>

    <div class="ch-end">
      <a href="artists.html"><span class="ch-end__dir">← 索引</span><span class="ch-end__t">全部艺术家</span></a>
      <a href="read.html?id=${a.chapter}" style="text-align:right"><span class="ch-end__dir">回到原著叙事 →</span><span class="ch-end__t">第${a.chapter}章 ${esc(ch.t)}</span></a>
    </div>`;

  const btn = $("#markA");
  const sync=()=>{ btn.textContent = store.isMarked("artist",a.id) ? "已收藏（点击取消）" : "收藏档案"; };
  sync();
  btn.onclick = ()=>{
    const added = store.toggleMark({type:"artist", id:a.id, title:a.n, sub:`${a.en} · ${a.life}`, img:a.portrait, url:`artist.html?id=${a.id}`});
    sync(); toast(added?"已收藏到书房":"已取消收藏");
  };
})();
