/* ============================================================
   元数据：原著目录（据三联版/广西美术出版社 范景中译本 toc.ncx 核对）
   时期分组与年代标注为编者所加，非原著所有
   ============================================================ */

window.BOOK = {
  title: "艺术的故事",
  latin: "The Story of Art",
  author: "E. H. 贡布里希",
  authorFull: "Ernst Hans Gombrich（1909—2001）",
  trans: "范景中 译 / 杨成凯 校",
  edition: "三联书店版（广西美术出版社，2008）",
  chapters: 28
};

/* 原著 28 章（章名、副题均照录目录） */
window.CHAPTERS = [
  {no:1,  t:"奇特的起源",        s:"史前期和原始民族；古代美洲",              y:"约公元前30000年—公元16世纪", era:"origins", ready:true},
  {no:2,  t:"追求永恒的艺术",    s:"埃及，美索不达米亚，克里特",              y:"约公元前3000—前1100年", era:"origins", ready:true},
  {no:3,  t:"伟大的觉醒",        s:"希腊，公元前7世纪至公元前5世纪",          y:"前7世纪—前5世纪", era:"ancient", ready:true},
  {no:4,  t:"美的王国",          s:"希腊和希腊化世界，公元前4世纪至公元1世纪", y:"前4世纪—公元1世纪", era:"ancient", ready:true},
  {no:5,  t:"天下的征服者",      s:"罗马人，佛教徒，犹太人和基督教徒，1至4世纪", y:"1—4世纪", era:"ancient", ready:true},
  {no:6,  t:"十字路口",          s:"罗马和拜占庭，5至13世纪",                 y:"5—13世纪", era:"faith", ready:true},
  {no:7,  t:"向东瞻望",          s:"伊斯兰教国家，中国，2至13世纪",           y:"2—13世纪", era:"faith", ready:true},
  {no:8,  t:"西方美术的融合",    s:"欧洲，6至11世纪",                        y:"6—11世纪", era:"faith", ready:true},
  {no:9,  t:"战斗的基督教",      s:"12世纪",                                 y:"12世纪", era:"faith", ready:true},
  {no:10, t:"胜利的基督教",      s:"13世纪",                                 y:"13世纪", era:"faith", ready:true},
  {no:11, t:"朝臣和市民",        s:"14世纪",                                 y:"14世纪", era:"faith", ready:true},
  {no:12, t:"征服真实",          s:"15世纪初期",                             y:"约1400—1450年", era:"renaissance", ready:true},
  {no:13, t:"传统和创新（一）",  s:"意大利，15世纪后期",                      y:"约1450—1500年", era:"renaissance", ready:true},
  {no:14, t:"传统和创新（二）",  s:"北方各国，15世纪",                        y:"15世纪", era:"renaissance", ready:true},
  {no:15, t:"和谐的获得",        s:"托斯卡纳和罗马，16世纪初期",               y:"约1500—1520年", era:"renaissance", ready:true},
  {no:16, t:"光线和色彩",        s:"威尼斯和意大利北部，16世纪初期",           y:"约1500—1576年", era:"renaissance", ready:true},
  {no:17, t:"新知识的传播",      s:"德国和尼德兰，16世纪初期",                y:"约1500—1550年", era:"renaissance", ready:true},
  {no:18, t:"艺术的危机",        s:"欧洲，16世纪后期",                        y:"约1520—1600年", era:"baroque", ready:true},
  {no:19, t:"视觉和视像",        s:"欧洲的天主教地区，17世纪前半叶",           y:"17世纪前半叶", era:"baroque", ready:true},
  {no:20, t:"自然的镜子",        s:"荷兰，17世纪",                            y:"17世纪", era:"baroque", ready:true},
  {no:21, t:"权力和荣耀（一）",  s:"意大利，17世纪后期至18世纪",              y:"17世纪后期—18世纪", era:"baroque", ready:true},
  {no:22, t:"权力和荣耀（二）",  s:"法国，德国，奥地利，17世纪晚期至18世纪初期", y:"17世纪晚期—18世纪初期", era:"baroque", ready:true},
  {no:23, t:"理性的时代",        s:"英国和法国，18世纪",                      y:"18世纪", era:"baroque", ready:true},
  {no:24, t:"传统的中断",        s:"英国，美国，法国，18世纪晚期和19世纪初期",  y:"约1780—1830年", era:"modern", ready:true},
  {no:25, t:"持久的革命",        s:"19世纪",                                 y:"19世纪", era:"modern", ready:true},
  {no:26, t:"寻求新标准",        s:"19世纪晚期",                             y:"约1870—1900年", era:"modern", ready:true},
  {no:27, t:"实验性美术",        s:"20世纪前半叶",                           y:"20世纪前半叶", era:"modern", ready:true},
  {no:28, t:"没有结尾的故事",    s:"现代主义的胜利 / 潮流的再次转变 / 改变着的历史", y:"1945年至今", era:"modern", ready:true}
];

/* 编者所加的分卷分组（原著无此分卷） */
window.ERAS = [
  {id:"origins",    name:"艺术的起源",   years:"史前 — 前1100", range:"序章：图像为何诞生"},
  {id:"ancient",    name:"古代世界",     years:"前7世纪 — 4世纪", range:"希腊的觉醒与罗马的继承"},
  {id:"faith",      name:"信仰的时代",   years:"5 — 14世纪", range:"拜占庭、修道院与哥特主教堂"},
  {id:"renaissance",name:"文艺复兴",     years:"15 — 16世纪", range:"征服真实，再到和谐的获得"},
  {id:"baroque",    name:"巴洛克与启蒙", years:"17 — 18世纪", range:"权势、信仰与理性的三种光线"},
  {id:"modern",     name:"现代的开端",   years:"1780 — 今", range:"传统的断裂与实验的世纪"}
];

/* 重点艺术家（档案逐步开放） */
window.ARTISTS = [
  {id:"giotto",      n:"乔托",           en:"Giotto di Bondone",         life:"约1267—1337",     ch:10, tag:"把人物从金色背景里请回人间", ready:true},
  {id:"masaccio",    n:"马萨乔",         en:"Masaccio",                  life:"1401—1428",       ch:12, tag:"用透视与光把神话变成现场", ready:true},
  {id:"leonardo",    n:"莱奥纳尔多·达·芬奇", en:"Leonardo da Vinci",     life:"1452—1519",       ch:15, tag:"以实验代替权威，以渐隐法征服生硬", ready:true},
  {id:"michelangelo",n:"米开朗琪罗",     en:"Michelangelo Buonarroti",   life:"1475—1564",       ch:15, tag:"把石头里沉睡的形象解放出来", ready:true},
  {id:"raphael",     n:"拉斐尔",         en:"Raphael Santi",             life:"1483—1520",       ch:15, tag:"以完美构图安放自由运动的人物", ready:true},
  {id:"giorgione",   n:"乔尔乔内",       en:"Giorgione",                 life:"约1478—1510",     ch:16, tag:"第一次让风景成为题材", ready:true},
  {id:"durer",       n:"丢勒",           en:"Albrecht Dürer",            life:"1471—1528",       ch:17, tag:"北方把技艺写成理论", ready:true},
  {id:"titian",      n:"提香",           en:"Titian",                    life:"约1485—1576",     ch:16, tag:"让色彩自己发光", ready:true},
  {id:"rembrandt",   n:"伦勃朗",         en:"Rembrandt van Rijn",        life:"1606—1669",       ch:20, tag:"用光阅读人的内心", ready:true},
  {id:"vermeer",     n:"维米尔",         en:"Johannes Vermeer",          life:"1632—1675",       ch:20, tag:"把日常房间变成静谧的几何", ready:true},
  {id:"velazquez",   n:"委拉斯开兹",     en:"Diego Velázquez",           life:"1599—1660",       ch:19, tag:"让观看本身成为题材", ready:true},
  {id:"rubens",      n:"鲁本斯",         en:"Peter Paul Rubens",         life:"1577—1640",       ch:19, tag:"巴洛克的动能与外交家的手", ready:true},
  {id:"monet",       n:"莫奈",           en:"Claude Monet",              life:"1840—1926",       ch:25, tag:"把光当作真正的主角", ready:true},
  {id:"renoir",      n:"雷诺阿",         en:"Pierre-Auguste Renoir",     life:"1841—1919",       ch:25, tag:"印象派的社交之光", ready:true},
  {id:"cezanne",     n:"塞尚",           en:"Paul Cézanne",              life:"1839—1906",       ch:26, tag:"用圆柱、球体重造自然", ready:true},
  {id:"vangogh",     n:"梵高",           en:"Vincent van Gogh",          life:"1853—1890",       ch:26, tag:"以笔触承担情感的全部重量", ready:true},
  {id:"gauguin",     n:"高更",           en:"Paul Gauguin",              life:"1848—1903",       ch:26, tag:"以平面与象征逃离欧洲", ready:true},
  {id:"picasso",     n:"毕加索",         en:"Pablo Picasso",             life:"1881—1973",       ch:27, tag:"把看见的与知道的画在一起", ready:true}
];

/* 作品档案：第15、16章（逐幅编目，见 works-more.js 续） */
window.WORKS = [
  {
    id:"last-supper", ch:15, fig:"192",
    t:"最后的晚餐", a:"莱奥纳尔多·达·芬奇", artist:"leonardo",
    date:"1495—1498", medium:"石膏底蛋胶画", size:"460 × 880 cm",
    place:"米兰，圣玛丽亚慈悲修道院餐厅", img:"img/ch15/fig192.jpg",
    note:"占据餐厅一端整面墙。基督说「你们中间有一个人要卖我了」的一刻，十二人分成四组、三三相应，骚动被安置在秩序里。"
  },
  {
    id:"mona-lisa", ch:15, fig:"193",
    t:"蒙娜·丽莎", a:"莱奥纳尔多·达·芬奇", artist:"leonardo",
    date:"约1502", medium:"木板油画", size:"77 × 53 cm",
    place:"巴黎，卢浮宫", img:"img/ch15/fig193.jpg",
    note:"嘴角与眼角被有意画得模糊，表情因此永远无法被确定；左右背景地平线不等高，构成全画最冒险的一笔。"
  },
  {
    id:"sistine-ceiling", ch:15, fig:"198",
    t:"西斯廷礼拜堂天顶画", a:"米开朗琪罗", artist:"michelangelo",
    date:"1508—1512", medium:"湿壁画", size:"约 13.7 × 39 m",
    place:"梵蒂冈，西斯廷礼拜堂", img:"img/ch15/fig198.jpg",
    note:"一个人、四年、仰面而画。中央九幅创世叙事，四周先知与女预言家，边框与拱肩填满裸体青年，整体却出奇地单纯。"
  },
  {
    id:"creation-of-adam", ch:15, fig:"200",
    t:"创造亚当", a:"米开朗琪罗", artist:"michelangelo",
    date:"约1511（天顶画局部）", medium:"湿壁画", size:"局部",
    place:"梵蒂冈，西斯廷礼拜堂", img:"img/ch15/fig200.jpg",
    note:"两只手将触未触，把创世的重心从「动作」移到「将要发生」的那一瞬。"
  },
  {
    id:"dying-slave", ch:15, fig:"201",
    t:"垂死的奴隶", a:"米开朗琪罗", artist:"michelangelo",
    date:"约1513", medium:"大理石", size:"高 229 cm",
    place:"巴黎，卢浮宫", img:"img/ch15/fig201.jpg",
    note:"为尤利乌斯二世陵墓所作。身体在松弛，轮廓仍被石块的方形约束着——这正是他「从石头中解放形象」的方法论。"
  },
  {
    id:"tempietto", ch:15, fig:"187",
    t:"小神庙", a:"多纳托·布拉曼特", artist:null,
    date:"1502", medium:"建筑（礼拜堂）", size:"",
    place:"罗马，圣皮耶特罗在蒙托里奥教堂院内", img:"img/ch15/fig187.jpg",
    note:"圆形平面、多立安柱廊、栏杆收头。文艺复兴建筑第一次把「古典的比例」当作目的本身。"
  },
  {
    id:"st-peter-medal", ch:15, fig:"186",
    t:"新圣彼得教堂建造纪念章", a:"卡拉多索", artist:null,
    date:"1506", medium:"青铜", size:"直径 5.6 cm",
    place:"伦敦，大英博物馆", img:"img/ch15/fig186.jpg",
    note:"布拉曼特方案的唯一完整图像证据：希腊十字、中央大穹顶。教堂未按此建成，但观念留在了这枚小铜章上。"
  },
  {
    id:"granduca-madonna", ch:15, fig:"203",
    t:"大公爵的圣母", a:"拉斐尔", artist:"raphael",
    date:"约1505", medium:"木板油画", size:"84 × 55 cm",
    place:"佛罗伦萨，皮蒂宫", img:"img/ch15/fig203.jpg",
    note:"老师佩鲁吉诺的图式在此获得体温：轮廓融进阴影，斗篷裹住有实体感的身体，变动一分就破坏和谐。"
  },
  {
    id:"galatea", ch:15, fig:"204",
    t:"海中仙女该拉特亚的凯旋", a:"拉斐尔", artist:"raphael",
    date:"约1512—1514", medium:"湿壁画", size:"295 × 225 cm",
    place:"罗马，法尔内西纳别墅", img:"img/ch15/fig204.jpg",
    note:"全画的直线——爱神的箭、缰绳、纱巾的褶——都汇向中央那张回望的脸。运动遍布画面，宁静毫发无损。"
  },
  {
    id:"leo-x", ch:15, fig:"206",
    t:"教皇莱奥十世与两位红衣主教", a:"拉斐尔", artist:"raphael",
    date:"1518", medium:"木板油画", size:"154 × 119 cm",
    place:"佛罗伦萨，乌菲齐美术馆", img:"img/ch15/fig206.jpg",
    note:"近视的教皇刚放下放大镜查看一部古代写本。天鹅绒与锦缎越华贵，越显出座中人的不自在。"
  },
  {
    id:"colleoni", ch:15, fig:"188",
    t:"巴尔托洛梅奥·科莱奥尼骑马像", a:"安德烈亚·德尔·韦罗基奥", artist:null,
    date:"1479", medium:"青铜", size:"马与骑者高 395 cm",
    place:"威尼斯，圣若望及保禄广场", img:"img/ch15/fig188.jpg",
    note:"莱奥纳尔多的老师之作。马的解剖、骑士睥睨的姿态、处处清楚的轮廓——作坊训练能给出的最高水准。"
  },
  {
    id:"st-bernard", ch:15, fig:"202",
    t:"圣母出现在圣贝尔纳德面前", a:"彼得罗·佩鲁吉诺", artist:null,
    date:"约1513", medium:"木板油画（祭坛画）", size:"173 × 170 cm",
    place:"慕尼黑，老绘画陈列馆", img:"img/ch15/fig202.jpg",
    note:"近于对称的布局里没有一处生硬。为这种和谐付出的代价，是对自然的忠实。"
  },
  {
    id:"colleoni-detail", ch:15, fig:"189",
    t:"科莱奥尼骑马像（局部）", a:"安德烈亚·德尔·韦罗基奥", artist:null,
    date:"1479", medium:"青铜（局部）", size:"",
    place:"威尼斯，圣若望及保禄广场", img:"img/ch15/fig189.jpg",
    note:"局部可见骑士面部与马颈的转折：轮廓清楚，肌肉与血脉被逐一交代。作坊训练把「观察」变成可传授的手艺。"
  },
  {
    id:"anatomy-study", ch:15, fig:"190",
    t:"解剖研究（喉部与腿部）", a:"莱奥纳尔多·达·芬奇", artist:"leonardo",
    date:"约1510", medium:"蘸水笔、褐色墨水、黑粉笔画于纸上", size:"",
    place:"温莎堡，皇家图书馆", img:"img/ch15/fig190.jpg",
    note:"不是为解剖学论文而作，而是为绘画建立可靠的人体知识：肌肉如何附着、关节如何转动。左边是喉部，右边是腿部肌肉的分层。"
  },
  {
    id:"refectory", ch:15, fig:"191",
    t:"圣玛丽亚慈悲修道院餐厅（《最后的晚餐》所在墙面）", a:"米兰，圣玛丽亚慈悲修道院", artist:null,
    date:"1495—1498", medium:"建筑内景", size:"",
    place:"米兰", img:"img/ch15/fig191.jpg",
    note:"画面里的长桌与修士们的餐桌平行。壁画因此不是「一幅画挂在墙上」，而是把餐厅向外延伸出另一个大厅。"
  },
  {
    id:"mona-lisa-detail", ch:15, fig:"194",
    t:"蒙娜·丽莎（局部）", a:"莱奥纳尔多·达·芬奇", artist:"leonardo",
    date:"约1502", medium:"木板油画（局部）", size:"",
    place:"巴黎，卢浮宫", img:"img/ch15/fig194.jpg",
    note:"看嘴角与眼角：形状在阴影里消失，表情因此无法被判定。渐隐法不是「画得模糊」，而是精确地决定哪些信息不给。"
  },
  {
    id:"nativity-ghirlandaio", ch:15, fig:"195",
    t:"圣母诞生", a:"多梅尼科·吉兰达约", artist:null,
    date:"1491", medium:"湿壁画", size:"",
    place:"佛罗伦萨，新圣母教堂", img:"img/ch15/fig195.jpg",
    note:"米开朗琪罗的师傅之作：把圣经故事搬进15世纪佛罗伦萨的上流客厅，背景还画了一块仿古的跳舞儿童浮雕。"
  },
  {
    id:"sistine-interior", ch:15, fig:"196",
    t:"西斯廷礼拜堂内部（清洗之前）", a:"梵蒂冈，西斯廷礼拜堂", artist:null,
    date:"1508—1512（天顶）", medium:"建筑内景", size:"",
    place:"梵蒂冈", img:"img/ch15/fig196.jpg",
    note:"高而窄的集会厅，拱顶平缓。这张旧照记录了八十年代清除烛灰与尘垢之前的状态——色调比今天暗得多。"
  },
  {
    id:"sistine-detail", ch:15, fig:"197",
    t:"西斯廷天顶画（局部：先知但以理与波斯女预言家）", a:"米开朗琪罗", artist:"michelangelo",
    date:"1508—1512", medium:"湿壁画（局部）", size:"",
    place:"梵蒂冈，西斯廷礼拜堂", img:"img/ch15/fig197.jpg",
    note:"两人分坐弧形两端，各自埋头读书，中间由一对扭身的裸体青年把构图拉紧。同样的专注，相反的方向。"
  },
  {
    id:"sibyl-study", ch:15, fig:"199",
    t:"女预言家草图", a:"米开朗琪罗", artist:"michelangelo",
    date:"约1510", medium:"红粉笔，浅黄色纸", size:"28.9 × 21.4 cm",
    place:"纽约，大都会艺术博物馆", img:"img/ch15/fig199.jpg",
    note:"为天顶画所作的习作：同一模特儿的多种姿态被反复推敲。肌肉的相互作用，自古代名家之后少有人这样观察。"
  },
  {
    id:"galatea-detail", ch:15, fig:"205",
    t:"该拉特亚的凯旋（局部）", a:"拉斐尔", artist:"raphael",
    date:"约1512—1514", medium:"湿壁画（局部）", size:"",
    place:"罗马，法尔内西纳别墅", img:"img/ch15/fig205.jpg",
    note:"局部可见仙女回身的角度与海神群的反向运动：一个转身，把整幅画的向量收束到她的脸上。"
  },
  {
    id:"loggia", ch:15, fig:"207",
    t:"拉斐尔作坊装饰梵蒂冈凉廊", a:"拉斐尔作坊", artist:null,
    date:"约1518", medium:"灰泥浮雕与壁画", size:"",
    place:"梵蒂冈，凉廊", img:"img/ch15/fig207.jpg",
    note:"助手们正在涂灰泥、作画。盛期风格的传播，靠的正是这种可复制的作坊作业，而不只是天才的手。"
  },

  /* ---------- 第16章 威尼斯 ---------- */
  {
    id:"marciana", ch:16, fig:"207",
    t:"圣马可图书馆", a:"雅各布·桑索维诺", artist:null,
    date:"1536", medium:"建筑", size:"",
    place:"威尼斯，圣马可广场", img:"img/ch16/fig207.jpg",
    note:"多立安在下、爱奥尼亚在上，拱洞由另一套小柱支撑，柱式因此「连锁」起来。威尼斯的光把石头的轮廓软化，建筑因此显得欢乐而非严峻。"
  },
  {
    id:"san-zaccaria", ch:16, fig:"208",
    t:"圣母和圣徒（圣扎卡里亚祭坛画）", a:"乔瓦尼·贝利尼", artist:null,
    date:"1505", medium:"木板油画（后转移至画布）", size:"402 × 273 cm",
    place:"威尼斯，圣扎卡里亚教堂", img:"img/ch16/fig208.jpg",
    note:"近于对称的圣像布局，却因色彩与光而有了温度。贝利尼把拜占庭式的僵硬队列，改成一群彼此有关系的人。"
  },
  {
    id:"tempest", ch:16, fig:"209",
    t:"暴风雨", a:"乔尔乔内", artist:"giorgione",
    date:"约1508", medium:"布面油画", size:"82 × 73 cm",
    place:"威尼斯，学院美术馆", img:"img/ch16/fig209.jpg",
    note:"题材至今没有定论。真正的新东西是：风景不再是人物背后的布景，雷电、空气与树影自己成了主角。"
  },
  {
    id:"pesaro-madonna", ch:16, fig:"210",
    t:"圣母、圣徒和佩萨罗家族的成员", a:"提香", artist:"titian",
    date:"1519—1526", medium:"布面油画", size:"478 × 266 cm",
    place:"威尼斯，弗拉里荣耀圣母教堂", img:"img/ch16/fig210.jpg",
    note:"圣母被移出中轴，构图靠一面旗来平衡。冒犯规则却更和谐——因为统一画面的是光、空气与色彩，而不是几何。"
  },
  {
    id:"pesaro-detail", ch:16, fig:"211",
    t:"佩萨罗祭坛画（局部：供养人家族）", a:"提香", artist:"titian",
    date:"1519—1526", medium:"布面油画（局部）", size:"",
    place:"威尼斯，弗拉里荣耀圣母教堂", img:"img/ch16/fig211.jpg",
    note:"跪在角落的一家人，被圣芳济引向圣婴。肖像的写实与神圣叙事在这里接上了。"
  },
  {
    id:"young-englishman", ch:16, fig:"212",
    t:"男子肖像（「年轻的英国人」）", a:"提香", artist:"titian",
    date:"约1540—1545", medium:"布面油画", size:"111 × 93 cm",
    place:"佛罗伦萨，皮蒂宫", img:"img/ch16/fig212.jpg",
    note:"没有《蒙娜·丽莎》那种精微的造型，只有一层层薄涂的颜色——却让人觉得这个人正在看着你。"
  },
  {
    id:"young-englishman-detail", ch:16, fig:"213",
    t:"「年轻的英国人」（局部：面部）", a:"提香", artist:"titian",
    date:"约1540—1545", medium:"布面油画（局部）", size:"",
    place:"佛罗伦萨，皮蒂宫", img:"img/ch16/fig213.jpg",
    note:"靠近看，眼睛不过是粗糙画布上的颜料；退开一步，它就变成了目光。提香的笔触在这两个距离之间工作。"
  },
  {
    id:"paul-iii", ch:16, fig:"214",
    t:"教皇保罗三世与亚历山大、奥塔维奥·法尔内塞", a:"提香", artist:"titian",
    date:"1546", medium:"布面油画", size:"200 × 173 cm",
    place:"那不勒斯，卡波迪蒙特博物馆", img:"img/ch16/fig214.jpg",
    note:"三个人三种心思：老教皇转身，红衣主教俯身，另一个平静地看着我们。提香把拉斐尔式的群像变成了心理剧。"
  },
  {
    id:"nativity-correggio", ch:16, fig:"215",
    t:"圣诞之夜（牧人来拜）", a:"科雷乔", artist:null,
    date:"约1530", medium:"木板油画", size:"256 × 188 cm",
    place:"德累斯顿，历代大师画廊", img:"img/ch16/fig215.jpg",
    note:"画面左边挤满人，右边几乎空着；平衡完全由那束从圣婴发出的光完成。光在这里不只是照明，是构图本身。"
  },
  {
    id:"assumption-study", ch:16, fig:"216",
    t:"圣母升天（穹顶画草图）", a:"科雷乔", artist:null,
    date:"约1526", medium:"红粉笔，纸本", size:"27.8 × 23.8 cm",
    place:"伦敦，大英博物馆", img:"img/ch16/fig216.jpg",
    note:"几道粉笔线就暗示出倾泻而下的光。比湿壁画成品更容易读懂他的构思。"
  },
  {
    id:"assumption-parma", ch:16, fig:"217",
    t:"圣母升天（帕尔马主教座堂穹顶）", a:"科雷乔", artist:null,
    date:"约1526—1530", medium:"湿壁画", size:"",
    place:"帕尔马，主教座堂", img:"img/ch16/fig217.jpg",
    note:"仰头看时，穹顶像是打开了：云、天使的腿、旋转的光。这是后来巴洛克天顶画的直接源头。"
  },
  {
    id:"venetian-orchestra", ch:16, fig:"—",
    t:"威尼斯画家管弦乐队（《迦拿的婚礼》局部）", a:"保罗·韦罗内塞", artist:null,
    date:"1562—1563", medium:"布面油画（局部）", size:"",
    place:"巴黎，卢浮宫", img:"img/ch16/figorch.jpg",
    note:"左起：韦罗内塞（次中音提琴）、雅各布·巴萨诺（高音短号）、丁托列托（小提琴）、提香（低音提琴）。四位画家被画成一支乐队——威尼斯画派的自画像。"
  }
];

window.chapterByNo = function(n){ return window.CHAPTERS.find(c=>c.no===+n); };
window.workById = function(id){ return window.WORKS.find(w=>w.id===id); };
window.artistById = function(id){ return window.ARTISTS.find(a=>a.id===id); };
