// Engine-Kern: Szenen, Figuren, Laufen, Sprechblasen, Dialogauswahl, Inventarleiste, Editor-Modus
window.NN = window.NN || {};

(function () {
  const U = NN.util, A = NN.assets;
  const W = 1920, H = 1200, VH = 1080; // logische Größe: Spielfläche 1920x1080 + Leiste 120
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');

  const G = NN.game = {
    scene: null, def: null, bgImg: null, view: { fx: 1, fy: 1, ox: 0, oy: 0 },
    tok: 0, busy: false, selected: null, hover: null, mouse: { x: 0, y: 0 },
    fade: 0, speech: null, choices: null, toast: null, paused: true, editor: false, editPts: [],
    invPage: 0, time: 0, keys: {}, onMenu: null, onMap: null, onHelp: null, shownHint: null
  };
  const pixel = G.pixel = { id: 'pixel', x: 0, y: 0, dir: 'right', target: null, walkRes: null, t: 0, moving: false, talking: false, anim: null, animT: 0, lastH: 240, vdir: 'side' };
  const kru = G.kruemel = { x: 0, y: 0, bob: 0, spin: 0 };

  // ---------- Darstellung: Schrift, Farben ----------
  const SIZE = { s: 0.85, m: 1, l: 1.2, xl: 1.45 };
  const FONTS = {
    comic: '"Patrick Hand","Comic Sans MS","Comic Neue","Chalkboard SE",cursive,sans-serif',
    readable: '"Atkinson Hyperlegible",Verdana,"Segoe UI",sans-serif',
    dyslexic: '"OpenDyslexic","Comic Sans MS",Verdana,sans-serif'
  };
  const font = (px, weight) => `${weight || 'bold'} ${Math.round(px * SIZE[NN.opts.textSize])}px ${FONTS[NN.opts.font]}`;
  const speaker = who => (NN.speakers && NN.speakers[who]) || { color: '#ffffff', pitch: 1.1 };

  // ---------- Koordinaten ----------
  const CHAR = 1.75; // globaler Größenfaktor für alle Figuren
  const L = (x, y) => [x * G.view.fx + G.view.ox, y * G.view.fy + G.view.oy];
  const toScene = (lx, ly) => [(lx - G.view.ox) / G.view.fx, (ly - G.view.oy) / G.view.fy];
  G.toLogical = L; G.toScene = toScene;

  function computeView(def) {
    const [sw, sh] = def.space;
    if (def.fit === 'contain') {
      const f = Math.min(W / sw, VH / sh);
      G.view = { fx: f, fy: f, ox: (W - sw * f) / 2, oy: (VH - sh * f) / 2 };
    } else G.view = { fx: W / sw, fy: VH / sh, ox: 0, oy: 0 };
  }

  const depthScale = y => {
    const d = G.def.depth || { y0: 0, y1: 1, s0: 1, s1: 1 };
    return U.lerp(d.s0, d.s1, U.clamp((y - d.y0) / (d.y1 - d.y0), 0, 1)) * (G.def.charScale || 1) * CHAR;
  };

  // ---------- Größe der Zeichenfläche (Grafik-Qualität, Fenster) ----------
  const RENDER_SCALE = { hi: 1, mid: 0.67, low: 0.5 };
  G.applyGraphics = function () {
    const rs = RENDER_SCALE[NN.opts.quality] || 1;
    canvas.width = Math.round(W * rs); canvas.height = Math.round(H * rs);
    canvas.classList.toggle('pixelated', !NN.opts.smoothing);
    document.documentElement.style.setProperty('--tb', String(NN.opts.textBg));
    document.documentElement.style.setProperty('--tshadow', NN.opts.tShadow ? `${NN.opts.tShadowDist * 0.8}px ${NN.opts.tShadowDist * 0.8}px ${NN.opts.tShadowBlur * 0.8}px ${NN.shadowRGBA()}` : 'none');
    document.body.classList.toggle('fx-neon', NN.opts.filter === 'neon');
    document.body.classList.toggle('fx-crt', NN.opts.filter === 'crt');
    document.body.classList.remove('size-s', 'size-m', 'size-l', 'size-xl', 'font-comic', 'font-readable', 'font-dyslexic');
    document.body.classList.add('size-' + NN.opts.textSize, 'font-' + NN.opts.font);
    G.resize();
  };
  G.toggleFullscreen = function (force) {
    const on = force === undefined ? !document.fullscreenElement : force;
    try {
      if (on && !document.fullscreenElement) (document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen).call(document.documentElement);
      else if (!on && document.fullscreenElement) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    } catch (e) { /* nicht erlaubt */ }
  };
  document.addEventListener('fullscreenchange', () => { NN.opts.fullscreen = !!document.fullscreenElement; NN.saveOptions(); G.resize(); });
  // Option „Vollbild“: beim ersten Klick/Tastendruck automatisch aktivieren (Browser verlangen eine Benutzeraktion)
  ['pointerdown', 'keydown'].forEach(ev => window.addEventListener(ev, function once() {
    if (NN.opts.fullscreen && !document.fullscreenElement) G.toggleFullscreen(true);
    window.removeEventListener(ev, once);
  }, { passive: true }));

  G.resize = function () {
    const s = Math.min(window.innerWidth / W, window.innerHeight / H);
    canvas.style.width = Math.floor(W * s) + 'px'; canvas.style.height = Math.floor(H * s) + 'px';
    const crt = document.getElementById('crt');
    crt.style.width = canvas.style.width; crt.style.height = canvas.style.height;
  };
  window.addEventListener('resize', G.resize);

  // ---------- Szene betreten ----------
  function bgCandidates(def) {
    if (def.bg.file) return [def.bg.file];
    const tiers = { hi: ['hi', 'mid', 'low'], mid: ['mid', 'low', 'hi'], low: ['low', 'mid', 'hi'] }[NN.opts.quality] || ['hi'];
    return tiers.map(t => `assets/backgrounds/${t}/${def.bg.tiers}.webp`).concat([`assets/raw/${def.bg.tiers}.png`]);
  }

  // ---------- Vorladen ----------
  const SPR = 'assets/sprites/';
  function actorFiles(def) {
    const out = [];
    (def.actors || []).forEach(a => {
      if (!a.sprite) return;
      const names = typeof a.sprite === 'function' ? ['wuschel_defekt', 'wuschel_repariert', 'teddy', 'teddy_sensor'].filter(n => n.length) : [a.sprite];
      names.forEach(n => out.push(SPR + 'npcs/' + n + '_idle.png', SPR + 'npcs/' + n + '_talk.png'));
    });
    return out;
  }
  function pixelFiles() {
    const o = NN.S.flags.outfit, pre = o === 'gala' ? 'pixel_gala_' : o === 'suit' ? 'pixel_suit_' : 'pixel_';
    const poses = ['idle_front', 'idle_side', 'idle_back', 'talk_a', 'talk_b', 'walk_1', 'walk_2', 'walk_3', 'walk_4', 'walk_5', 'walk_6', 'walk_7', 'walk_front', 'walk_back'];
    return poses.map(p => SPR + 'characters/' + pre + p + '.png');
  }
  const KRUEMEL = ['hover_1', 'hover_2', 'hover_3', 'hover_4', 'hover_front', 'talk_a', 'talk_b', 'scan_a', 'scan_b', 'sad'].map(n => SPR + 'characters/kruemel_' + n + '.png');
  const warmed = new Set();
  // Alles, was eine Szene sofort braucht (Hintergrund wird getrennt geladen)
  const sceneFiles = def => actorFiles(def).concat(pixelFiles(), KRUEMEL, (def.pickups || []).map(p => SPR + 'items/' + p.item + '.png'));
  // Nachbar-Szenen im Hintergrund vorbereiten
  function warmNeighbors(def) {
    (def.exits || []).forEach(e => {
      if (!e.to || warmed.has(e.to) || !NN.scenes[e.to]) return;
      warmed.add(e.to);
      const nd = NN.scenes[e.to];
      A.preload([bgCandidates(nd)[0]].concat(actorFiles(nd)), 2);
    });
  }
  // Einmalig im Leerlauf: Props, Items, Pixel-Outfits
  let idleWarmed = false;
  function warmAll() {
    if (idleWarmed) return; idleWarmed = true;
    const list = [];
    ['props', 'items'].forEach(d => (NN.assetIndex && NN.assetIndex[d] || []).forEach(n => list.push(SPR + d + '/' + n)));
    A.preload(list, 3);
  }

  G.loading = false;
  G.enterScene = async function (id, spawn, defer) {
    const def = NN.scenes[id];
    if (!def) throw new Error('Unbekannte Szene: ' + id);
    cancelWalk(); G.speech = null; G.choices = null; G.hover = null;
    G.def = def; G.scene = id; NN.S.scene = id; NN.S.visited[id] = true;
    computeView(def);
    const t0 = performance.now();
    const showTimer = setTimeout(() => { G.loading = true; }, 250);
    const [found] = await Promise.all([A.loadFirst(bgCandidates(def)), A.preload(sceneFiles(def), 8)]);
    clearTimeout(showTimer); G.loading = false;
    G.bgImg = found ? found.img : null;
    const p = Array.isArray(spawn) ? spawn : (def.spawns[spawn] || def.spawns.default);
    pixel.x = p[0]; pixel.y = p[1]; pixel.dir = 'right'; pixel.anim = null;
    { const lp = L(pixel.x, pixel.y); kru.x = lp[0] - 95 * G.view.fx; kru.y = lp[1] - 240 * G.view.fy; }
    if (def.music) NN.audio.playMusic(def.music);
    G.tok++;
    G.lastLoadMs = Math.round(performance.now() - t0);
    setTimeout(() => { warmNeighbors(def); warmAll(); }, 400);
    const run = async () => { if (def.onEnter && !G.loadedFromSave) { G.busy = true; try { await def.onEnter(api); } catch (e) { console.error(e); } G.busy = false; } G.loadedFromSave = false; };
    if (defer) return run;
    await run();
  };

  G.reloadBg = async function () {
    if (!G.def) return;
    const found = await A.loadFirst(bgCandidates(G.def));
    G.bgImg = found ? found.img : null;
  };

  G.changeScene = async function (id, spawn) {
    G.busy = true; NN.audio.whoosh();
    await fade(1, 0.16);
    const run = await G.enterScene(id, spawn, true);
    await fade(0, 0.2);
    NN.saveGame(0, null);
    await run();
    G.busy = false;
  };

  const fade = (to, sec) => new Promise(res => {
    if (NN.opts.reduceAnim) sec = 0.01;
    G.fadeAnim = { from: G.fade, to, t: 0, dur: sec, res };
  });

  // ---------- Laufen ----------
  function cancelWalk() { pixel.target = null; if (pixel.walkRes) { const r = pixel.walkRes; pixel.walkRes = null; r(false); } }

  function walkPixel(x, y) {
    cancelWalk();
    const t = U.clampToPoly(x, y, G.def.walk);
    if (U.dist(t[0], t[1], pixel.x, pixel.y) < 4) return Promise.resolve(true);
    pixel.target = t;
    return new Promise(res => { pixel.walkRes = res; });
  }
  U.dist = (a, b, c, d) => Math.hypot(c - a, d - b);

  function updatePixel(dt) {
    const p = pixel;
    if (p.anim) { p.animT -= dt; if (p.animT <= 0) p.anim = null; }
    if (!p.target) { p.moving = false; return; }
    const dx = p.target[0] - p.x, dy = p.target[1] - p.y, d = Math.hypot(dx, dy);
    const speed = 330 * (depthScale(p.y) / (G.def.charScale || 1) / CHAR) * (G.def.space[0] / 1376);
    const step = speed * dt;
    p.moving = true; p.t += dt;
    if (Math.abs(dy) > Math.abs(dx) * 1.7) { p.vdir = dy < 0 ? 'up' : 'down'; p.dir = p.vdir; } else { p.vdir = 'side'; p.dir = dx < 0 ? 'left' : 'right'; }
    if (d <= step) { p.x = p.target[0]; p.y = p.target[1]; p.target = null; p.moving = false; if (p.walkRes) { const r = p.walkRes; p.walkRes = null; r(true); } return; }
    const nx = p.x + dx / d * step, ny = p.y + dy / d * step;
    if (U.inPoly(nx, ny, G.def.walk)) { p.x = nx; p.y = ny; }
    else {
      const c = U.clampToPoly(nx, ny, G.def.walk);
      if (U.dist(c[0], c[1], p.x, p.y) < 0.2) { p.target = null; p.moving = false; if (p.walkRes) { const r = p.walkRes; p.walkRes = null; r(true); } }
      else { p.x = c[0]; p.y = c[1]; }
    }
  }

  function updateKruemel(dt) {
    const [px, py] = L(pixel.x, pixel.y), ds = depthScale(pixel.y) * G.view.fx;
    if (pixel.dir === 'left') kru.side = 1; else if (pixel.dir === 'right') kru.side = -1; else if (!kru.side) kru.side = -1;
    const moving = !!pixel.moving, calm = NN.opts.reduceAnim;
    kru.t = (kru.t || 0) + dt;
    // beim Laufen langsam hinter Pixel hin und her schweben, im Stand mit Abstand sanft wiegen
    const sway = calm ? 0 : moving ? Math.sin(kru.t * 1.6) * 55 * ds : Math.sin(kru.t * 0.8) * 8 * ds;
    const dist = (moving ? 110 : 95) * ds;
    const tx = px + kru.side * dist + sway, ty = py - (pixel.lastH || 300) * 0.7 - (kru.h || 80) / 2 + (calm ? 0 : Math.sin(kru.t * 1.1) * (moving ? 12 : 7));
    const k = 1 - Math.pow(0.05, dt);
    kru.x += (tx - kru.x) * k; kru.y += (ty - kru.y) * k;
    kru.bob += dt * 2; kru.spin += dt * 40;
  }

  // ---------- Sprechen ----------
  function actorHead(who) {
    if (who === 'pixel') { const [x, y] = L(pixel.x, pixel.y); return { x, top: y - pixel.lastH - 10 }; }
    if (who === 'kruemel') return { x: kru.x, top: kru.y - (kru.h || 100) * 0.5 - 20 };
    const a = (G.def.actors || []).find(o => o.id === who);
    if (a) { const [x, y] = L(a.x, a.y); return { x, top: y - (a.h || 180) * depthScale(a.y) * G.view.fy - 14 }; }
    return { x: W / 2, top: 220 };
  }

  function say(who, text) {
    if (NN.debug && NN.debug.fast) return Promise.resolve();
    return new Promise(res => {
      const ends = []; const re = /\S+/g; let m;
      while ((m = re.exec(text))) ends.push(m.index + m[0].length);
      const wps = 3.4 * NN.opts.textSpeed; // Wörter pro Sekunde
      const dur = Math.max(2.2, ends.length / wps + 1.5);
      G.speech = { who, text, t: 0, ends, wps, dur, res, words: 0 };
      if (who === 'pixel') pixel.talking = true;
    });
  }

  function endSpeech() {
    const s = G.speech; if (!s) return;
    G.speech = null; pixel.talking = false; s.res();
  }

  // Anzahl bereits sichtbarer Wörter
  const wordsShown = sp => Math.min(sp.ends.length, Math.floor(sp.t * sp.wps) + 1);
  const speechDone = sp => wordsShown(sp) >= sp.ends.length;

  function updateSpeech(dt) {
    const s = G.speech; if (!s) return;
    s.t += dt;
    const n = wordsShown(s);
    if (n > s.words) { s.words = n; NN.audio.blip(speaker(s.who).pitch); }
    if (s.who !== 'pixel') pixel.talking = false;
    if (NN.opts.autoAdvance && s.t >= s.dur) endSpeech();
  }

  function choose(options) {
    if (NN.debug && NN.debug.fast) { const q = NN.debug.choices; return Promise.resolve(q && q.length ? q.shift() : options.length - 1); }
    return new Promise(res => { G.choices = { options, res, hover: -1 }; });
  }

  // ---------- Hotspots ----------
  // Sichtbare Einsammel-Gegenstände einer Szene: {item, x, y (unten mitte), w, hot, [flag], [if]}
  function pickupVisible(pk) {
    return !NN.S.flags[pk.flag || ('gab_' + pk.item)] && !NN.S.inv.includes(pk.item) && (!pk.if || pk.if(NN.S));
  }
  function pickupHit(sx, sy) {
    const list = G.def.pickups || [];
    for (let i = list.length - 1; i >= 0; i--) {
      const pk = list[i]; if (!pickupVisible(pk)) continue;
      const img = A.get('assets/sprites/items/' + pk.item + '.png'); if (!img) continue;
      const w = pk.w, h = w * img.height / img.width;
      if (sx >= pk.x - w / 2 - 6 && sx <= pk.x + w / 2 + 6 && sy >= pk.y - h - 6 && sy <= pk.y + 6) {
        const hs = (G.def.hotspots || []).find(x => x.id === pk.hot);
        if (hs) return { kind: 'hot', obj: Object.assign({}, hs, { name: NN.items[pk.item].name }), pickup: pk };
      }
    }
    return null;
  }
  function hitTest(sx, sy) {
    const def = G.def;
    const pk = pickupHit(sx, sy); if (pk) return pk;
    for (const e of def.exits || []) if ((!e.if || e.if(NN.S)) && U.inPoly(sx, sy, e.poly)) return { kind: 'exit', obj: e };
    const hs = def.hotspots || [];
    for (let i = hs.length - 1; i >= 0; i--) {
      const h = hs[i];
      if (h.if && !h.if(NN.S)) continue;
      if (U.inPoly(sx, sy, h.poly)) return { kind: 'hot', obj: h };
    }
    return null;
  }

  const FAILS = [
    'Das passt nicht zusammen.', 'Damit kann ich hier nichts anfangen.', 'Netter Versuch. Funktioniert aber nicht.',
    'Das wäre ein sehr kreativer Fehler.', 'Nein. Einfach nein.'
  ];
  const fail = () => FAILS[Math.floor(Math.random() * FAILS.length)];

  async function run(handler) {
    if (!handler) return;
    G.busy = true;
    try {
      if (typeof handler === 'string') await say('pixel', handler);
      else await handler(api);
    } catch (e) { console.error(e); }
    G.busy = false;
  }

  async function approach(obj) {
    const t = obj.walkTo || U.clampToPoly(...U.centroid(obj.poly), G.def.walk);
    const tok = ++G.tok;
    const ok = await walkPixel(t[0], t[1]);
    if (!ok || tok !== G.tok) return false;
    if (obj.facing) pixel.dir = obj.facing === 'up' ? 'up' : obj.facing === 'down' ? 'down' : obj.facing;
    return true;
  }

  async function interact(hit, mode) {
    if (hit.kind === 'exit') {
      const e = hit.obj;
      if (!(await approach(e))) return;
      return G.changeScene(e.to, e.spawn);
    }
    const h = hit.obj;
    if (mode === 'look') {
      if (!(await approach(h))) return;
      return run(h.look || 'Nichts Besonderes.');
    }
    if (mode === 'item') {
      const id = G.selected;
      if (!(await approach(h))) return;
      G.selected = null;
      const fn = h.useWith && (h.useWith[id] || h.useWith._default);
      if (fn) return run(fn);
      NN.audio.fail();
      return run(id === 'kruemel' ? async g => g.say('kruemel', 'Hier gibt es nichts zu scannen, toasten oder kommentieren. Leider.') : fail());
    }
    if (!(await approach(h))) return;
    return run(h.use || 'Damit kann ich nichts anfangen.');
  }

  // ---------- API für Skripte ----------
  const api = {
    get S() { return NN.S; },
    say, choose,
    get: k => !!NN.S.flags[k],
    flag: (k, v) => { NN.S.flags[k] = v === undefined ? true : v; },
    has: id => NN.S.inv.includes(id),
    give(id) {
      if (!NN.S.inv.includes(id)) NN.S.inv.push(id);
      NN.S.flags['gab_' + id] = true;
      G.toast = { text: 'Neu im Inventar: ' + NN.items[id].name, t: 2.6 };
      NN.audio.pickup();
      const page = Math.floor((NN.S.inv.length - 1) / 8); G.invPage = page;
    },
    remove(id) { NN.S.inv = NN.S.inv.filter(i => i !== id); if (G.selected === id) G.selected = null; },
    toast(text) { G.toast = { text, t: 3.6 }; },
    goto: (scene, spawn) => G.changeScene(scene, spawn),
    walk: (x, y) => walkPixel(x, y),
    face(dir) { pixel.dir = dir; },
    wait: sec => new Promise(r => setTimeout(r, sec * 1000)),
    animate(name, sec) { pixel.anim = name; pixel.animT = sec; return new Promise(r => setTimeout(r, sec * 1000)); },
    ending() { return new Promise(res => { NN.saveGame(0, null); NN.ui.showEnding(res); }); },
    actEnd(title, text) { return new Promise(res => { NN.ui.showActEnd(title, text, res); }); },
    async kruemelScan() { NN.audio.scan(); G.scan = 1.2; await new Promise(r => setTimeout(r, 1300)); }
  };
  G.api = api;

  // ---------- Inventarleiste (Zeichnen und Treffer) ----------
  const BAR = { y: VH, h: H - VH };
  const VERBS = [['walk', 'Gehe zu'], ['look', 'Schau an'], ['take', 'Nimm'], ['use', 'Benutze'], ['talk', 'Sprich mit'], ['give', 'Gib']];
  const VERB_LABEL = Object.fromEntries(VERBS);
  let layoutMode = ''; G.verb = 'walk';
  function applyLayout() {
    const mode = NN.opts.controlMode === 'scumm' ? 'scumm' : 'auto';
    if (mode === layoutMode) return; layoutMode = mode;
    const y = VH + 10;
    if (mode === 'scumm') {
      Object.assign(BAR, {
        verbs: VERBS.map(([id, label], i) => ({ id, label, x: 20 + (i % 3) * 176, y: y + Math.floor(i / 3) * 52, w: 168, h: 48 })),
        kru: { x: 560, y, w: 110, h: 100 }, slotX: 684, slotW: 98, slotH: 100, slotGap: 6, slots: 7,
        prev: { x: 1450, y, w: 40, h: 100 }, next: { x: 1494, y, w: 40, h: 100 },
        map: { x: 1560, y, w: 110, h: 100 }, help: { x: 1680, y, w: 110, h: 100 }, menu: { x: 1800, y, w: 100, h: 100 }
      });
    } else {
      Object.assign(BAR, {
        verbs: null,
        kru: { x: 24, y, w: 140, h: 100 }, slotX: 190, slotW: 112, slotH: 100, slotGap: 8, slots: 8,
        prev: { x: 1160, y, w: 46, h: 100 }, next: { x: 1212, y, w: 46, h: 100 },
        map: { x: 1300, y, w: 170, h: 100 }, help: { x: 1484, y, w: 170, h: 100 }, menu: { x: 1668, y, w: 170, h: 100 }
      });
    }
    G.invPage = 0;
  }
  applyLayout();
  const inR = (r, x, y) => x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;

  function barHit(x, y) {
    if (BAR.verbs) for (const v of BAR.verbs) if (inR(v, x, y)) return { type: 'verb', id: v.id };
    if (inR(BAR.kru, x, y)) return { type: 'kru' };
    for (let i = 0; i < BAR.slots; i++) {
      const r = { x: BAR.slotX + i * (BAR.slotW + BAR.slotGap), y: BAR.y + 10, w: BAR.slotW, h: BAR.slotH };
      if (inR(r, x, y)) { const id = NN.S.inv[G.invPage * BAR.slots + i]; return id ? { type: 'slot', id } : { type: 'empty' }; }
    }
    for (const k of ['prev', 'next', 'map', 'help', 'menu']) if (inR(BAR[k], x, y)) return { type: k };
    return { type: 'bar' };
  }

  function panel(r, label, active) {
    ctx.save();
    ctx.fillStyle = active ? '#4a2a8a' : '#21103f'; ctx.strokeStyle = active ? '#ffb347' : '#27e6ff'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(r.x, r.y, r.w, r.h, 12); ctx.fill(); ctx.stroke();
    if (label) { ctx.fillStyle = '#f4ecff'; ctx.font = font(26); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(label, r.x + r.w / 2, r.y + r.h / 2); }
    ctx.restore();
  }

  function drawKruemelShape(x, y, s, withLabel) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    ctx.lineWidth = 5; ctx.strokeStyle = '#1a0f26'; ctx.lineJoin = 'round';
    ctx.strokeStyle = '#1a0f26';
    ctx.beginPath(); ctx.moveTo(-14, -48); ctx.lineTo(-30, -82); ctx.stroke();
    ctx.fillStyle = '#a9b6c8'; ctx.beginPath(); ctx.roundRect(-44, -48, 88, 62, 14); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#6b7689'; ctx.fillRect(-44, 4, 88, 10);
    ctx.fillStyle = '#fff'; [-17, 17].forEach(dx => { ctx.beginPath(); ctx.arc(dx, -20, 13, 0, 7); ctx.fill(); ctx.stroke(); });
    ctx.fillStyle = '#1a0f26'; [-17, 17].forEach(dx => { ctx.beginPath(); ctx.arc(dx + 2, -19, 5, 0, 7); ctx.fill(); });
    ctx.fillStyle = '#d9a25c'; ctx.fillRect(-6, -2, 12, 9);
    const w = Math.abs(Math.cos(kru.spin)) * 34 + 6;
    ctx.fillStyle = '#7b8aa0'; ctx.beginPath(); ctx.ellipse(0, -58, w, 5, 0, 0, 7); ctx.fill(); ctx.stroke();
    ctx.restore();
  }

  // Bild-Objekt in Szenenkoordinaten zeichnen (unten mittig verankert, Breite w in Szenen-Pixeln)
  NN.drawProp = function (name, x, y, w) {
    const img = A.get('assets/sprites/props/' + name + '.png');
    if (!img) return;
    const [lx, ly] = L(x, y), k = (w * G.view.fx) / img.width;
    ctx.drawImage(img, lx - img.width * k / 2, ly - img.height * k, img.width * k, img.height * k);
  };

  const KRU = 'assets/sprites/characters/kruemel_';
  function kruemelSpriteName() {
    const f = NN.S.flags;
    if (G.scan > 0) return Math.floor(G.time * 4) % 2 ? 'scan_b' : 'scan_a';
    if (G.speech && G.speech.who === 'kruemel') return Math.floor(G.time * 6) % 2 ? 'talk_a' : 'talk_b';
    if (f.kruemel_leer && !f.kruemel_geladen) return 'sad';
    if (NN.opts.reduceAnim) return 'hover_1';
    return 'hover_' + (1 + Math.floor(G.time * 10) % 4);
  }

  function drawKruemel() {
    const sad = NN.S.flags.kruemel_leer && !NN.S.flags.kruemel_geladen;
    const bob = NN.opts.reduceAnim ? 0 : Math.sin(kru.bob) * 4;
    const img = A.get(KRU + kruemelSpriteName() + '.png') || A.get(KRU + 'hover_1.png');
    if (!img) { drawKruemelShape(kru.x, kru.y + bob, 0.85 * Math.max(0.7, depthScale(pixel.y))); kru.h = 100; return; }
    const sc = 0.42 * depthScale(pixel.y) * G.view.fy;
    const h = img.height * sc, w = img.width * sc;
    ctx.save(); ctx.translate(kru.x, kru.y + bob + (sad ? 28 : 0) + h / 2);
    if (pixel.dir === 'left') ctx.scale(-1, 1);
    ctx.drawImage(img, -w / 2, -h / 2, w, h);
    ctx.restore();
    kru.h = h;
  }

  // ---------- Neon-Leiste (Hintergrund wird einmal vorgezeichnet) ----------
  let barCache = null, barKey = '';
  const NEON = { pink: '#ff3cc8', amber: '#ffb347', cyan: '#27e6ff', violet: '#9b5cff' };

  function neonRect(c, x, y, w, h, r, color, width, glow) {
    c.save(); c.lineJoin = 'round';
    c.shadowColor = color; c.shadowBlur = glow; c.strokeStyle = color; c.lineWidth = width;
    c.beginPath(); c.roundRect(x, y, w, h, r); c.stroke(); c.stroke();
    c.shadowBlur = 0; c.strokeStyle = 'rgba(255,255,255,0.75)'; c.lineWidth = Math.max(1, width * 0.32);
    c.beginPath(); c.roundRect(x, y, w, h, r); c.stroke();
    c.restore();
  }
  function clamp(c, x, y) { c.save(); c.fillStyle = '#07030d'; c.beginPath(); c.arc(x, y, 5, 0, 7); c.fill(); c.restore(); }
  // Rahmen aus zwei Neonröhren (außen und innen), Halterungen an den Ecken
  function neonFrame(c, r, outer, inner) {
    neonRect(c, r.x, r.y, r.w, r.h, 16, outer, 5, 16);
    neonRect(c, r.x + 8, r.y + 8, r.w - 16, r.h - 16, 10, inner, 3, 10);
    clamp(c, r.x + 4, r.y + 4); clamp(c, r.x + r.w - 4, r.y + r.h - 4);
  }
  function neonText(c, text, cx, cy, color, size) {
    c.save(); c.font = font(size); c.textAlign = 'center'; c.textBaseline = 'middle';
    c.shadowColor = color; c.shadowBlur = 14; c.fillStyle = color; c.fillText(text, cx, cy); c.fillText(text, cx, cy);
    c.shadowBlur = 0; c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillText(text, cx, cy); c.restore();
  }

  function buildBar() {
    const rs = canvas.width / W, c = document.createElement('canvas');
    c.width = Math.round(W * rs); c.height = Math.round(BAR.h * rs);
    const x = c.getContext('2d'); x.scale(rs, rs); x.translate(0, -BAR.y);
    // Backsteinwand
    const grd = x.createLinearGradient(0, BAR.y, 0, H); grd.addColorStop(0, '#1b0d33'); grd.addColorStop(1, '#0a0514');
    x.fillStyle = grd; x.fillRect(0, BAR.y, W, BAR.h);
    x.strokeStyle = 'rgba(150,90,230,0.13)'; x.lineWidth = 2;
    for (let row = 0, yy = BAR.y + 6; yy < H; row++, yy += 30) {
      x.beginPath(); x.moveTo(0, yy); x.lineTo(W, yy); x.stroke();
      for (let xx = (row % 2) * 45; xx < W; xx += 90) { x.beginPath(); x.moveTo(xx, yy); x.lineTo(xx, yy + 30); x.stroke(); }
    }
    // Leuchtlinie oben
    neonRect(x, -10, BAR.y + 2, W + 20, 0.01, 0, NEON.pink, 5, 20);
    // Krümel-Feld, Slots, Pfeile, Knöpfe
    if (BAR.verbs) BAR.verbs.forEach(v => { neonFrame(x, v, NEON.cyan, NEON.violet); neonText(x, v.label, v.x + v.w / 2, v.y + v.h / 2, NEON.cyan, 24); });
    neonFrame(x, BAR.kru, NEON.cyan, NEON.pink);
    for (let i = 0; i < BAR.slots; i++) neonFrame(x, { x: BAR.slotX + i * (BAR.slotW + BAR.slotGap), y: BAR.y + 10, w: BAR.slotW, h: BAR.slotH }, NEON.pink, NEON.violet);
    [BAR.prev, BAR.next].forEach((r, i) => { neonFrame(x, r, NEON.violet, NEON.pink); neonText(x, i ? '▶' : '◀', r.x + r.w / 2, r.y + r.h / 2, NEON.cyan, 24); });
    [[BAR.map, 'Karte'], [BAR.help, 'Hilfe'], [BAR.menu, 'Menü']].forEach(([r, t]) => { neonFrame(x, r, NEON.amber, NEON.pink); neonText(x, t, r.x + r.w / 2, r.y + r.h / 2, NEON.amber, BAR.verbs ? 24 : 30); });
    return c;
  }

  function drawBar() {
    applyLayout();
    const key = canvas.width + '|' + NN.opts.font + '|' + NN.opts.textSize + '|' + layoutMode;
    if (!barCache || barKey !== key) { barCache = buildBar(); barKey = key; }
    ctx.drawImage(barCache, 0, BAR.y, W, BAR.h);
    if (BAR.verbs) BAR.verbs.forEach(v => { if (v.id === G.verb) neonRect(ctx, v.x - 3, v.y - 3, v.w + 6, v.h + 6, 18, NEON.amber, 5, 20); });
    // Krümel-Symbol und Akku
    if (G.selected === 'kruemel') neonRect(ctx, BAR.kru.x - 3, BAR.kru.y - 3, BAR.kru.w + 6, BAR.kru.h + 6, 18, NEON.amber, 5, 20);
    const kimg = A.get(KRU + 'hover_front.png');
    if (kimg) { const k = 80 / kimg.height; ctx.drawImage(kimg, BAR.kru.x + (BAR.kru.w - kimg.width * k) / 2, BAR.kru.y + 8, kimg.width * k, 80); }
    else drawKruemelShape(BAR.kru.x + BAR.kru.w / 2, BAR.kru.y + 76, 0.75);
    const low = NN.S.flags.kruemel_leer && !NN.S.flags.kruemel_geladen;
    ctx.fillStyle = low ? '#ff6a6a' : '#7dffb0';
    ctx.fillRect(BAR.kru.x + 22, BAR.kru.y + BAR.kru.h - 16, (BAR.kru.w - 44) * (low ? 0.06 : 1), 5);
    for (let i = 0; i < BAR.slots; i++) {
      const r = { x: BAR.slotX + i * (BAR.slotW + BAR.slotGap), y: BAR.y + 10, w: BAR.slotW, h: BAR.slotH };
      const id = NN.S.inv[G.invPage * BAR.slots + i];
      if (!id) continue;
      if (G.selected === id) neonRect(ctx, r.x - 3, r.y - 3, r.w + 6, r.h + 6, 18, NEON.amber, 5, 20);
      const img = A.get('assets/sprites/items/' + id + '.png');
      if (img) { const k = Math.min(70 / img.width, 70 / img.height); ctx.drawImage(img, r.x + (r.w - img.width * k) / 2, r.y + (r.h - img.height * k) / 2, img.width * k, img.height * k); }
      else { ctx.fillStyle = NEON.amber; ctx.font = font(18); ctx.textAlign = 'center'; ctx.fillText(NN.items[id].name.slice(0, 10), r.x + r.w / 2, r.y + r.h / 2); }
    }
    const pages = Math.max(1, Math.ceil(NN.S.inv.length / BAR.slots));
    ctx.fillStyle = '#a795c9'; ctx.font = font(16); ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; ctx.fillText((G.invPage + 1) + '/' + pages, (BAR.prev.x + BAR.next.x + BAR.next.w) / 2, BAR.y + 118);
  }

  // ---------- Zeichnen der Szene ----------
  // Fußposition aus data/assets.js (vorab berechnet, funktioniert auch beim Öffnen per Doppelklick)
  const footCache = new WeakMap();
  function footInfo(img) {
    let f = footCache.get(img);
    if (f) return f;
    const key = decodeURIComponent((img.src.split('assets/sprites/')[1] || '').split('?')[0]);
    const e = NN.feet && NN.feet[key];
    f = e ? { gap: e[0], cx: e[1], w: e[2] } : { gap: 0, cx: 0.5, w: 0.4 };
    footCache.set(img, f);
    return f;
  }

  function drawSprite(img, lx, ly, scale, flip, shadow) {
    const w = img.width * scale, h = img.height * scale, f = footInfo(img);
    const groundY = ly; // hier stehen die Fußsohlen
    ly += f.gap * h;    // leeren Rand unter dem Bild ausgleichen
    if (shadow) {
      const fx = lx + (flip ? -1 : 1) * (f.cx - 0.5) * w, rx = Math.max(28, f.w * w * 0.85), ry = Math.max(9, rx * 0.24);
      ctx.save(); ctx.translate(fx, groundY - ry * 0.35); ctx.scale(1, ry / rx);
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
      g.addColorStop(0, 'rgba(0,0,0,0.85)'); g.addColorStop(0.6, 'rgba(0,0,0,0.55)'); g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, rx, 0, 7); ctx.fill(); ctx.restore();
    }
    ctx.save(); ctx.translate(lx, ly);
    if (flip) ctx.scale(-1, 1);
    ctx.drawImage(img, -w / 2, -h, w, h);
    ctx.restore();
    return h;
  }

  function pixelSpriteName() {
    const p = pixel;
    if (p.anim) return p.anim;
    if (p.moving) {
      if (p.vdir === 'up') return Math.floor(p.t * 6) % 2 ? 'walk_back' : 'idle_back';
      if (p.vdir === 'down') return Math.floor(p.t * 6) % 2 ? 'walk_front' : 'stand_front';
      return 'walk_' + (1 + Math.floor(p.t * 9) % 7);
    }
    if (p.talking && G.speech) return Math.floor(G.time * 6) % 2 ? 'talk_a' : 'talk_b';
    if (p.dir === 'up') return 'idle_back';
    if (p.dir === 'down') return 'idle_front';
    return 'idle_side';
  }

  function drawPixel() {
    const [lx, ly] = L(pixel.x, pixel.y);
    const name = pixelSpriteName();
    const o = NN.S.flags.outfit, pre = o === 'gala' ? 'pixel_gala_' : o === 'suit' ? 'pixel_suit_' : 'pixel_';
    const dirC = 'assets/sprites/characters/';
    const img = A.get(dirC + pre + name + '.png') || A.get(dirC + 'pixel_' + name + '.png') || A.get(dirC + pre + 'idle_front.png') || A.get(dirC + 'pixel_idle_front.png');
    const sc = depthScale(pixel.y) * G.view.fy;
    if (img) {
      pixel.lastH = drawSprite(img, lx, ly, sc, pixel.dir === 'left', true);
    } else {
      ctx.fillStyle = '#ffb347'; ctx.fillRect(lx - 30, ly - 200 * sc, 60, 200 * sc); pixel.lastH = 200 * sc;
    }
  }

  function drawNpc(a) {
    const [lx, ly] = L(a.x, a.y);
    const sc = depthScale(a.y) * G.view.fy * (a.scale || 1);
    if (!a.sprite) { a.draw(ctx, lx, ly, sc); return; }
    const base = typeof a.sprite === 'function' ? a.sprite(NN.S) : a.sprite;
    const talking = G.speech && G.speech.who === a.id && Math.floor(G.time * 6) % 2;
    const dir = 'assets/sprites/npcs/';
    const img = A.get(dir + base + (talking ? '_talk' : '_idle') + '.png') || A.get(dir + base + '_idle.png');
    if (!img) return;
    a.h = img.height * (a.scale || 1);
    ctx.save();
    if (a.clipY) { ctx.beginPath(); ctx.rect(0, 0, W, L(0, a.clipY)[1]); ctx.clip(); }
    drawSprite(img, lx, ly, sc, !!a.flip, !a.clipY);
    ctx.restore();
    if (a.after) a.after(ctx, lx, ly - img.height * sc, sc, NN.S);
  }

  function drawScene() {
    const def = G.def;
    ctx.fillStyle = '#0b0714'; ctx.fillRect(0, 0, W, VH);
    if (G.bgImg) ctx.drawImage(G.bgImg, G.view.ox, G.view.oy, def.space[0] * G.view.fx, def.space[1] * G.view.fy);
    else {
      const g = ctx.createLinearGradient(0, 0, 0, VH); g.addColorStop(0, '#2a1650'); g.addColorStop(1, '#0b0714');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, VH);
      ctx.fillStyle = '#a795c9'; ctx.font = font(48); ctx.textAlign = 'center'; ctx.fillText('[Platzhalter] ' + def.name, W / 2, VH / 2);
    }
    (def.props || []).forEach(p => { if (!p.if || p.if(NN.S)) p.draw(ctx, L, NN.S); });
    (def.pickups || []).forEach(pk => {
      if (!pickupVisible(pk)) return;
      const img = A.get('assets/sprites/items/' + pk.item + '.png'); if (!img) return;
      const [lx, ly] = L(pk.x, pk.y), k = (pk.w * G.view.fx) / img.width;
      const hov = G.hover && G.hover.pickup === pk;
      ctx.save();
      if (NN.opts.hotspotHints !== false) { const t = performance.now() / 1000; ctx.shadowColor = '#ffb347'; ctx.shadowBlur = hov ? 28 : 8 + 6 * Math.sin(t * 2.4 + pk.x); }
      ctx.drawImage(img, lx - img.width * k / 2, ly - img.height * k, img.width * k, img.height * k);
      ctx.restore();
    });
    // Figuren nach Tiefe sortiert
    const list = [{ y: pixel.y, draw: drawPixel }, { y: pixel.y - 0.5, draw: drawKruemel }]; // Krümel direkt hinter Pixel
    (def.actors || []).forEach(a => { if (!a.hide || !a.hide(NN.S)) list.push({ y: a.y, draw: () => drawNpc(a) }); });
    list.sort((a, b) => a.y - b.y).forEach(o => o.draw());
    if (G.scan > 0 && !A.get(KRU + 'scan_a.png')) {
      const a = Math.min(1, G.scan);
      ctx.save(); ctx.globalAlpha = a * 0.6; ctx.fillStyle = '#27e6ff';
      ctx.beginPath(); ctx.moveTo(kru.x - 10, kru.y + 20); ctx.lineTo(kru.x + 90, kru.y + 330); ctx.lineTo(kru.x - 110, kru.y + 330); ctx.closePath(); ctx.fill(); ctx.restore();
    }
    drawHotspotHints();
    drawSpeech();
  }

  function drawHotspotHints() {
    if (!(G.keys[' '] || (NN.opts.hotspotHints && G.hintFlash > 0))) return;
    ctx.save(); ctx.lineWidth = NN.opts.highContrast ? 5 : 3;
    const pulse = 0.55 + Math.sin(G.time * 6) * 0.25;
    (G.def.hotspots || []).forEach(h => {
      if (h.if && !h.if(NN.S)) return;
      const c = U.centroid(h.poly), [lx, ly] = L(c[0], c[1]);
      ctx.fillStyle = `rgba(255,179,71,${pulse})`; ctx.strokeStyle = '#1a0f26';
      ctx.beginPath(); ctx.arc(lx, ly, 15, 0, 7); ctx.fill(); ctx.stroke();
    });
    (G.def.exits || []).forEach(e => {
      if (e.if && !e.if(NN.S)) return;
      const c = U.centroid(e.poly), [lx, ly] = L(c[0], c[1]);
      ctx.fillStyle = `rgba(39,230,255,${pulse})`; ctx.strokeStyle = '#1a0f26';
      ctx.beginPath(); ctx.arc(lx, ly - 8, 15, 0, 7); ctx.fill(); ctx.stroke();
    });
    ctx.restore();
  }

  function drawSpeech() {
    const s = G.speech; if (!s || !NN.opts.subtitles) return;
    ctx.save();
    ctx.font = font(44); ctx.textBaseline = 'alphabetic';
    const maxW = 820, lines = U.wrap(ctx, s.text, maxW), lh = 54 * SIZE[NN.opts.textSize];
    if (!s.pos) s.pos = actorHead(s.who); // Position einmal festlegen: Text bleibt still stehen
    const head = s.pos;
    const widest = Math.max(...lines.map(l => ctx.measureText(l).width));
    let cx = U.clamp(head.x, widest / 2 + 40, W - widest / 2 - 40);
    let y0 = U.clamp(head.top - lines.length * lh, 50, VH - lines.length * lh - 30);
    if (s.who === 'erzaehler') { cx = W / 2; y0 = 160; }
    if (NN.opts.textBg > 0) {
      ctx.fillStyle = `rgba(10,5,22,${NN.opts.textBg})`;
      ctx.beginPath(); ctx.roundRect(cx - widest / 2 - 18, y0 - lh * 0.85, widest + 36, lines.length * lh + 16, 16); ctx.fill();
    }
    const nWords = wordsShown(s);
    let shown = s.ends[nWords - 1] || 0;
    ctx.textAlign = 'left'; ctx.lineJoin = 'round'; ctx.lineWidth = 9; ctx.strokeStyle = '#120a22';
    lines.forEach((line, i) => {
      const part = line.slice(0, Math.max(0, Math.min(line.length, shown))); shown -= line.length + 1;
      const x = cx - widest / 2, y = y0 + i * lh; // Block ist fertig platziert, Text wächst von links nach rechts
      ctx.save();
      if (NN.opts.tShadow) { // Textschatten (Farbe, Abstand, Weichheit, Stärke einstellbar)
        const d = NN.opts.tShadowDist * 1.4;
        ctx.shadowColor = NN.shadowRGBA(); ctx.shadowBlur = NN.opts.tShadowBlur * 1.4; ctx.shadowOffsetX = d; ctx.shadowOffsetY = d;
      }
      ctx.strokeText(part, x, y);
      ctx.restore();
      ctx.fillStyle = speaker(s.who).color; ctx.fillText(part, x, y);
    });
    if (!NN.opts.autoAdvance && speechDone(s) && Math.floor(G.time * 2) % 2 === 0) {
      const last = lines[lines.length - 1], lx = cx + ctx.measureText(last).width / 2 + 22, ly = y0 + (lines.length - 1) * lh - 10;
      ctx.fillStyle = speaker(s.who).color; ctx.strokeStyle = '#120a22'; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(lx - 10, ly - 10); ctx.lineTo(lx + 10, ly - 10); ctx.lineTo(lx, ly + 6); ctx.closePath(); ctx.stroke(); ctx.fill();
    }
    ctx.restore();
  }

  function drawChoices() {
    const c = G.choices; if (!c) return;
    ctx.save();
    const lh = 66 * SIZE[NN.opts.textSize], h = c.options.length * lh + 30, y0 = VH - h;
    ctx.fillStyle = 'rgba(12,6,28,0.9)'; ctx.fillRect(0, y0, W, h);
    ctx.fillStyle = '#ff3cc8'; ctx.fillRect(0, y0, W, 4);
    ctx.font = font(42); ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
    c.options.forEach((o, i) => {
      const y = y0 + 15 + i * lh + lh / 2;
      ctx.fillStyle = i === c.hover ? '#ffb347' : '#e8ddff';
      ctx.fillText((i + 1) + '.  ' + o, 120, y);
    });
    ctx.restore();
  }

  function drawOverlayText() {
    if (G.toast && G.toast.t > 0) {
      ctx.save(); ctx.globalAlpha = Math.min(1, G.toast.t * 2);
      ctx.font = font(34); ctx.textAlign = 'center';
      const w = ctx.measureText(G.toast.text).width + 50;
      ctx.fillStyle = 'rgba(12,6,28,0.88)'; ctx.strokeStyle = '#ffb347'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.roundRect(W / 2 - w / 2, 22, w, 64, 16); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#ffd27a'; ctx.textBaseline = 'middle'; ctx.fillText(G.toast.text, W / 2, 55);
      ctx.restore();
    }
    // Ausgewähltes Item als Mauszeiger
    if (G.selected && G.selected !== 'kruemel' && G.mouse.y < H) {
      const img = A.get('assets/sprites/items/' + G.selected + '.png');
      if (img) {
        const k = Math.min(110 / img.width, 110 / img.height), w = img.width * k, h = img.height * k;
        ctx.save(); ctx.shadowColor = NEON.amber; ctx.shadowBlur = 18; ctx.globalAlpha = 0.95;
        ctx.drawImage(img, G.mouse.x - w / 2, G.mouse.y - h / 2, w, h); ctx.restore();
      }
    }
    if (scumm() && !G.choices) {
      const t = scummSentence();
      ctx.save(); ctx.font = font(34); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      const w = ctx.measureText(t).width + 60, x = W / 2, y = VH - 34;
      ctx.fillStyle = 'rgba(12,6,28,0.82)'; ctx.beginPath(); ctx.roundRect(x - w / 2, y - 26, w, 52, 14); ctx.fill();
      neonRect(ctx, x - w / 2, y - 26, w, 52, 14, G.selected ? NEON.amber : NEON.cyan, 3, 12);
      ctx.fillStyle = '#fff'; ctx.fillText(t, x, y); ctx.restore();
    } else
    // Label unter dem Mauszeiger
    if (G.hover && G.mouse.y < VH && !G.choices) {
      let label = G.hover.obj.name;
      if (G.selected) label = 'Benutze ' + (G.selected === 'kruemel' ? 'Krümel' : NN.items[G.selected].name) + ' mit ' + label;
      else if (G.hover.kind === 'exit') label = '→ ' + label;
      ctx.save(); ctx.font = font(34); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      const w = ctx.measureText(label).width + 36, x = U.clamp(G.mouse.x, w / 2 + 10, W - w / 2 - 10), y = Math.max(40, G.mouse.y - (G.selected ? 90 : 50));
      ctx.fillStyle = 'rgba(12,6,28,0.85)'; ctx.beginPath(); ctx.roundRect(x - w / 2, y - 26, w, 52, 12); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.fillText(label, x, y); ctx.restore();
    } else if (!G.hover && G.selected && G.mouse.y < VH) {
      ctx.save(); ctx.font = font(30); ctx.textAlign = 'left'; ctx.fillStyle = '#ffd27a'; ctx.strokeStyle = '#120a22'; ctx.lineWidth = 6;
      const t = 'Benutze ' + (G.selected === 'kruemel' ? 'Krümel' : NN.items[G.selected].name) + ' mit …';
      ctx.strokeText(t, G.mouse.x + 22, G.mouse.y + 40); ctx.fillText(t, G.mouse.x + 22, G.mouse.y + 40); ctx.restore();
    }
  }

  // ---------- Editor-Modus (F2) ----------
  function drawEditor() {
    if (!G.editor) return;
    ctx.save(); ctx.lineWidth = 3;
    const poly = (pts, fill, stroke) => { ctx.beginPath(); pts.forEach((p, i) => { const [x, y] = L(p[0], p[1]); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); ctx.strokeStyle = stroke; ctx.stroke(); };
    poly(G.def.walk, 'rgba(0,255,120,0.22)', '#00ff78');
    (G.def.hotspots || []).forEach(h => { poly(h.poly, 'rgba(255,0,200,0.16)', '#ff00c8'); const c = U.centroid(h.poly), [x, y] = L(c[0], c[1]); ctx.fillStyle = '#fff'; ctx.font = '22px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(h.id, x, y); });
    (G.def.exits || []).forEach(e => poly(e.poly, 'rgba(39,230,255,0.25)', '#27e6ff'));
    if (G.editPts.length) { ctx.fillStyle = '#ffe600'; G.editPts.forEach(p => { const [x, y] = L(p[0], p[1]); ctx.beginPath(); ctx.arc(x, y, 7, 0, 7); ctx.fill(); }); }
    const [sx, sy] = toScene(G.mouse.x, G.mouse.y);
    ctx.fillStyle = '#000'; ctx.fillRect(10, 10, 620, 70);
    ctx.fillStyle = '#ffe600'; ctx.font = '24px monospace'; ctx.textAlign = 'left';
    ctx.fillText(`EDITOR  Maus: [${Math.round(sx)}, ${Math.round(sy)}]  Punkte: ${G.editPts.length}`, 20, 38);
    ctx.fillText('Klick = Punkt · Enter = kopieren · C = leeren', 20, 66);
    ctx.restore();
  }

  function draw() {
    ctx.setTransform(canvas.width / W, 0, 0, canvas.height / H, 0, 0);
    ctx.imageSmoothingEnabled = NN.opts.smoothing;
    ctx.clearRect(0, 0, W, H);
    if (!G.def) return;
    drawScene(); drawEditor(); drawChoices(); drawBar(); drawOverlayText();
    if (G.fade > 0) { ctx.fillStyle = `rgba(0,0,0,${G.fade})`; ctx.fillRect(0, 0, W, H); }
    if (G.loading) { ctx.save(); ctx.font = font(40); ctx.textAlign = 'center'; ctx.fillStyle = '#ffd27a'; ctx.fillText('Lädt' + '.'.repeat(1 + Math.floor(G.time * 3) % 3), W / 2, VH / 2); ctx.restore(); }
  }

  // ---------- Hauptschleife ----------
  let last = 0;
  function frame(ts) {
    requestAnimationFrame(frame);
    const minDt = NN.opts.fps === 30 ? 1 / 31 : 0;
    let dt = (ts - last) / 1000;
    if (dt < minDt) return;
    last = ts; dt = Math.min(dt, 0.05);
    if (!G.def) return;
    if (!G.paused) { G.time += dt; NN.S.playtime += dt; update(dt); }
    draw();
  }

  function update(dt) {
    updatePixel(dt); updateKruemel(dt); updateSpeech(dt);
    if (G.toast) G.toast.t -= dt;
    if (G.scan > 0) G.scan -= dt;
    if (G.hintFlash > 0) G.hintFlash -= dt;
    const f = G.fadeAnim;
    if (f) { f.t += dt; const k = Math.min(1, f.t / f.dur); G.fade = U.lerp(f.from, f.to, k); if (k >= 1) { G.fadeAnim = null; f.res(); } }
    G.autoT = (G.autoT || 0) + dt;
    if (G.autoT > 90) { G.autoT = 0; if (!G.busy) NN.saveGame(0, null); }
  }

  // ---------- Eingabe ----------
  function mousePos(e) {
    const r = canvas.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width * W, y: (e.clientY - r.top) / r.height * H };
  }

  canvas.addEventListener('mousemove', e => {
    G.mouse = mousePos(e);
    if (G.paused || !G.def) return;
    if (G.choices) {
      const c = G.choices, lh = 66 * SIZE[NN.opts.textSize], y0 = VH - (c.options.length * lh + 30);
      c.hover = G.mouse.y >= y0 && G.mouse.y < VH ? Math.floor((G.mouse.y - y0 - 15) / lh) : -1;
      if (c.hover >= c.options.length) c.hover = -1;
    }
    G.hover = G.mouse.y < VH && !G.choices ? hitTest(...toScene(G.mouse.x, G.mouse.y)) : null;
    canvas.classList.toggle('cur-hot', !!G.hover || (G.mouse.y >= VH));
    canvas.classList.toggle('cur-item', !!G.selected && G.selected !== 'kruemel' && !!A.get('assets/sprites/items/' + G.selected + '.png'));
  });

  canvas.addEventListener('contextmenu', e => e.preventDefault());

  canvas.addEventListener('mousedown', async e => {
    NN.audio.ensure();
    if (G.paused || !G.def) return;
    G.mouse = mousePos(e);
    const { x, y } = G.mouse;
    if (G.choices) {
      const c = G.choices;
      if (c.hover >= 0) { const r = c.res; G.choices = null; NN.audio.click(); r(c.hover); }
      return;
    }
    if (G.speech) { if (!speechDone(G.speech)) G.speech.t = G.speech.ends.length / G.speech.wps + 0.05; else endSpeech(); return; }
    if (G.busy) return;
    if (G.editor && y < VH) {
      const p = toScene(x, y); G.editPts.push([Math.round(p[0]), Math.round(p[1])]); return;
    }
    if (y >= VH) return barClick(e.button, barHit(x, y));
    const [sx, sy] = toScene(x, y), hit = hitTest(sx, sy);
    if (e.button === 2) {
      if (G.selected) { G.selected = null; return; }
      if (hit) return interact(hit, 'look');
      return;
    }
    G.tok++; cancelWalk();
    if (scumm()) return scummClick(hit, sx, sy);
    if (hit) {
      if (G.selected && hit.kind === 'hot') return interact(hit, 'item');
      return interact(hit, 'use');
    }
    G.selected = null;
    walkPixel(sx, sy);
  });

  // ---------- SCUMM-Modus (Verben wählen) ----------
  const scumm = () => NN.opts.controlMode === 'scumm';
  const say1 = text => run(async g => g.say('pixel', text));
  const isNpc = h => (G.def.actors || []).some(a => a.id === h.id);
  const isTakeable = (h, pk) => !!pk || h.take || (G.def.pickups || []).some(p => p.hot === h.id && pickupVisible(p));
  function scummClick(hit, sx, sy) {
    const verb = G.verb;
    G.verb = 'walk';
    if (G.selected) { // Gegenstand gewählt: Ziel anklicken
      if (hit && hit.kind === 'hot') return interact(hit, 'item');
      G.selected = null; return walkPixel(sx, sy);
    }
    if (verb === 'walk') { if (hit && hit.kind === 'exit') return interact(hit, 'use'); return walkPixel(sx, sy); }
    if (verb === 'give') { NN.audio.fail(); return say1('Erst muss ich einen Gegenstand aus dem Inventar wählen.'); }
    if (!hit) return walkPixel(sx, sy);
    if (verb === 'look') return interact(hit, 'look');
    if (hit.kind === 'exit') return interact(hit, 'use');
    if (verb === 'take') {
      if (isTakeable(hit.obj, hit.pickup)) return interact(hit, 'use');
      NN.audio.fail(); return say1(isNpc(hit.obj) ? 'Ich kann niemanden einfach mitnehmen. Das wäre unhöflich.' : 'Das kann ich nicht mitnehmen.');
    }
    if (verb === 'talk') {
      if (isNpc(hit.obj)) return interact(hit, 'use');
      NN.audio.fail(); return say1('Mit dem Ding rede ich lieber nicht. Es antwortet sowieso nicht.');
    }
    return interact(hit, 'use'); // Benutze
  }
  function scummSentence() {
    const nm = id => id === 'kruemel' ? 'Krümel' : NN.items[id].name;
    let t = G.selected ? (G.verb === 'give' ? 'Gib ' + nm(G.selected) + ' an' : 'Benutze ' + nm(G.selected) + ' mit') : VERB_LABEL[G.verb];
    if (G.hover && G.mouse.y < VH) t += ' ' + G.hover.obj.name;
    return t;
  }

  async function barClick(button, h) {
    NN.audio.click();
    if (h.type === 'verb') { G.selected = null; G.verb = h.id; return; }
    if (h.type === 'map') return G.onMap && G.onMap();
    if (h.type === 'help') return G.onHelp && G.onHelp();
    if (h.type === 'menu') return G.onMenu && G.onMenu();
    if (h.type === 'prev') { G.invPage = Math.max(0, G.invPage - 1); return; }
    if (h.type === 'next') { G.invPage = Math.min(Math.ceil(NN.S.inv.length / BAR.slots) - 1, G.invPage + 1); G.invPage = Math.max(0, G.invPage); return; }
    if (h.type === 'kru') {
      if (G.selected && G.selected !== 'kruemel') {
        const b = G.selected, comb = NN.items[b].combine && NN.items[b].combine.kruemel; G.selected = null;
        if (comb) return run(comb);
        NN.audio.fail(); return run(async g => g.say('kruemel', 'Das kann ich weder toasten noch scannen.'));
      }
      G.selected = G.selected === 'kruemel' ? null : 'kruemel'; return;
    }
    if (h.type === 'slot') {
      const id = h.id;
      if (button === 2 || (scumm() && !G.selected && G.verb === 'look')) { G.verb = 'walk'; return run(async g => g.say('pixel', NN.items[id].look)); }
      if (scumm() && !G.selected && G.verb === 'take') { G.verb = 'walk'; return say1('Das habe ich doch schon.'); }
      if (scumm() && !G.selected && G.verb !== 'give') G.verb = 'use';
      if (!G.selected) { G.selected = id; return; }
      if (G.selected === id) { G.selected = null; const it = NN.items[id]; if (it.useSelf) return run(it.useSelf); return; }
      const a = G.selected, b = id;
      G.selected = null;
      const ia = a === 'kruemel' ? NN.kruemelTool : NN.items[a];
      const comb = (ia.combine && ia.combine[b]) || (NN.items[b].combine && NN.items[b].combine[a]);
      if (comb) return run(comb);
      NN.audio.fail();
      return run(a === 'kruemel' ? async g => g.say('kruemel', 'Ich kann das toasten, scannen oder anschauen. Aber nicht das.') : fail());
    }
  }

  window.addEventListener('keydown', e => {
    G.keys[e.key] = true;
    if (G.paused) return;
    if (e.key === ' ') { e.preventDefault(); }
    if (e.key === 'Escape') { G.selected = null; G.onMenu && G.onMenu(); }
    if (e.key === 'F2') { e.preventDefault(); G.editor = !G.editor; G.editPts = []; }
    if (e.key === 'f' || e.key === 'F') { if (!G.editor) G.toggleFullscreen(); }
    if (G.editor && e.key === 'c') G.editPts = [];
    if (G.editor && e.key === 'Enter') {
      const txt = JSON.stringify(G.editPts);
      console.log('Editor-Punkte:', txt);
      if (navigator.clipboard) navigator.clipboard.writeText(txt).catch(() => {});
      G.toast = { text: 'Punkte kopiert (' + G.editPts.length + ')', t: 2 };
    }
    if (e.key.toLowerCase() === 'm') G.onMap && G.onMap();
    if (e.key.toLowerCase() === 'h') G.onHelp && G.onHelp();
    if (G.choices && /^[1-9]$/.test(e.key)) {
      const i = +e.key - 1, c = G.choices;
      if (i < c.options.length) { const r = c.res; G.choices = null; r(i); }
    }
  });
  window.addEventListener('keyup', e => { G.keys[e.key] = false; });
  window.addEventListener('blur', () => { if (NN.opts.muteBlur) NN.audio.setMuted(true); });
  window.addEventListener('focus', () => { if (!NN.opts.muteAll) NN.audio.setMuted(false); });

  // ---------- Start ----------
  G.start = async function (state, fromSave) {
    NN.S = state;
    G.paused = false; G.busy = false; G.selected = null; G.verb = 'walk'; G.invPage = 0; G.fade = 0; G.fadeAnim = null;
    G.loadedFromSave = !!fromSave;
    const spawn = fromSave && state.pos ? state.pos : 'default';
    await G.enterScene(state.scene || 'imbiss', spawn);
    G.hintFlash = 3;
  };

  G.thumbnail = function () {
    try {
      const c = document.createElement('canvas'); c.width = 240; c.height = 135;
      c.getContext('2d').drawImage(canvas, 0, 0, canvas.width, canvas.height * VH / H, 0, 0, 240, 135);
      return c.toDataURL('image/jpeg', 0.6);
    } catch (e) { return null; } // bei file:// nicht erlaubt
  };

  // Debug-Hilfen für Tests
  NN.debug = {
    fast: false, choices: [],
    unlockTravel() { NN.S.flags.schnellreise = true; },
    giveAll() { Object.keys(NN.items).forEach(i => api.give(i)); },
    // Hotspot oder Ausgang direkt auslösen (ohne Laufen). mode: 'use' | 'look' | 'item'
    async act(id, mode, item, choices) {
      NN.debug.choices = (choices || []).slice();
      const hit = (G.def.exits || []).concat(G.def.hotspots || []).find(o => o.id === id);
      if (!hit) throw new Error('Kein Hotspot ' + id + ' in ' + G.scene);
      if (hit.to) return G.changeScene(hit.to, hit.spawn);
      const h = mode === 'look' ? hit.look : mode === 'item' ? (hit.useWith && (hit.useWith[item] || hit.useWith._default)) : hit.use;
      if (!h) throw new Error('Keine Aktion ' + mode + ' ' + (item || '') + ' bei ' + id);
      await run(h);
    },
    async combine(a, b) {
      const ia = a === 'kruemel' ? NN.kruemelTool : NN.items[a];
      const comb = (ia.combine && ia.combine[b]) || (NN.items[b].combine && NN.items[b].combine[a]);
      if (!comb) throw new Error('Keine Kombination ' + a + '+' + b);
      await run(comb);
    },
    async item(id) { const it = NN.items[id]; await run(it.useSelf); }
  };

  requestAnimationFrame(frame);
})();
