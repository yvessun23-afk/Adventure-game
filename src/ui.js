// Menüs: Titel, Intro, Pause-Menü, Optionen, Speichern/Laden, Hilfe, Karte
window.NN = window.NN || {};

NN.ui = (function () {
  const G = NN.game, A = NN.assets;
  const overlay = document.getElementById('overlay');
  let inGame = false;

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function open(html, cls) {
    overlay.className = cls || '';
    overlay.innerHTML = html;
    G.paused = true;
    const first = overlay.querySelector('.btn'); if (first) first.focus();
  }
  function close() {
    overlay.className = 'hidden'; overlay.innerHTML = '';
    if (inGame) G.paused = false;
  }
  function on(sel, fn) { overlay.querySelectorAll(sel).forEach(el => el.addEventListener('click', e => { NN.audio.click(); fn(el, e); })); }

  // ---------- Titel ----------
  async function showTitle() {
    inGame = false; G.paused = true;
    const bg = document.getElementById('titlebg') || document.body.appendChild(Object.assign(document.createElement('div'), { id: 'titlebg' }));
    bg.classList.remove('hidden');
    const found = await A.loadFirst(['assets/intro/titel.png', 'assets/raw/titel.png']);
    if (found) bg.style.backgroundImage = `url(${found.src})`;
    const latest = NN.latestSlot();
    open(`<div class="panel title">
      <div class="logo">NEON NOODLE</div><div class="sub">Der Fall der verschwundenen Nudelsuppe</div>
      <button class="btn big primary" data-a="new">Neues Spiel</button>
      ${latest ? '<button class="btn big" data-a="cont">Fortsetzen</button>' : ''}
      <button class="btn big" data-a="load">Laden</button>
      <button class="btn big" data-a="opts">Optionen</button>
      <div class="muted small" style="margin-top:10px">Linksklick: gehen/benutzen · Rechtsklick: ansehen · Leertaste: Hotspots zeigen · Esc: Menü</div>
    </div>`, 'clear');
    on('[data-a=new]', () => { NN.audio.ensure(); playIntro(); });
    on('[data-a=cont]', () => startFromSave(latest.data));
    on('[data-a=load]', () => showSlots('load', showTitle));
    on('[data-a=opts]', () => showOptions('grafik', showTitle));
  }

  function hideTitleBg() { const bg = document.getElementById('titlebg'); if (bg) bg.classList.add('hidden'); }

  async function startNew() {
    hideTitleBg(); inGame = true; close();
    await G.start(NN.newState(), false);
    NN.saveGame(0, G.thumbnail());
  }

  async function startFromSave(data) {
    hideTitleBg(); inGame = true; close();
    await G.start(JSON.parse(JSON.stringify(data.state)), true);
  }

  // ---------- Intro ----------
  async function playIntro() {
    hideTitleBg(); close();
    const panels = NN.intro;
    const el = document.createElement('div'); el.className = 'intro';
    el.innerHTML = '<div class="pic"></div><div class="txt"></div><button class="btn skip">Überspringen (Esc)</button>';
    document.body.appendChild(el);
    const pic = el.querySelector('.pic'), txt = el.querySelector('.txt');
    let idx = -1, done = false, typing = null;
    const finish = () => { if (done) return; done = true; document.removeEventListener('keydown', onKey); el.remove(); startNew(); };
    async function show(i) {
      idx = i; if (i >= panels.length) return finish();
      const p = panels[i];
      const found = await A.loadFirst([`assets/intro/${p.img}.png`, `assets/raw/${p.img}.png`]);
      pic.style.opacity = 0;
      setTimeout(() => { pic.style.backgroundImage = found ? `url(${found.src})` : ''; pic.style.opacity = 1; }, 80);
      txt.textContent = '';
      clearInterval(typing);
      let n = 0;
      typing = setInterval(() => { n++; txt.textContent = p.text.slice(0, n); if (n % 3 === 0) NN.audio.blip(1.3); if (n >= p.text.length) clearInterval(typing); }, 28 / NN.opts.textSpeed);
    }
    const next = () => {
      const p = panels[idx];
      if (p && txt.textContent.length < p.text.length) { clearInterval(typing); txt.textContent = p.text; return; }
      show(idx + 1);
    };
    const onKey = e => { if (e.key === 'Escape') { e.stopPropagation(); finish(); } else if (e.key === ' ' || e.key === 'Enter') { e.stopPropagation(); next(); } };
    el.addEventListener('click', e => { if (e.target.classList.contains('skip')) finish(); else next(); });
    document.addEventListener('keydown', onKey);
    show(0);
  }

  // ---------- Pause-Menü ----------
  function showMenu() {
    if (!inGame) return;
    open(`<div class="panel title"><h1>Menü</h1>
      <button class="btn big primary" data-a="resume">Weiterspielen</button>
      <button class="btn big" data-a="save">Speichern</button>
      <button class="btn big" data-a="load">Laden</button>
      <button class="btn big" data-a="opts">Optionen</button>
      <button class="btn big" data-a="help">Hilfe</button>
      <button class="btn big" data-a="main">Hauptmenü</button></div>`);
    on('[data-a=resume]', close);
    on('[data-a=save]', () => showSlots('save', showMenu));
    on('[data-a=load]', () => showSlots('load', showMenu));
    on('[data-a=opts]', () => showOptions('grafik', showMenu));
    on('[data-a=help]', showHelp);
    on('[data-a=main]', () => { if (confirm('Zum Hauptmenü? Nicht gespeicherter Fortschritt geht verloren.')) { inGame = false; showTitle(); } });
  }

  // ---------- Optionen ----------
  const SCHEMA = {
    grafik: [
      { k: 'quality', t: 'select', label: 'Grafikqualität', opts: [['hi', 'Hoch'], ['mid', 'Mittel'], ['low', 'Niedrig (schneller)']] },
      { k: 'smoothing', t: 'check', label: 'Bildglättung' },
      { k: 'filter', t: 'select', label: 'Bildfilter', opts: [['none', 'Keiner'], ['neon', 'Neon-Glühen'], ['crt', 'Röhrenmonitor (Scanlines)']] },
      { k: 'fps', t: 'select', label: 'Bildrate', opts: [[60, '60 FPS'], [30, '30 FPS']] },
      { k: 'reduceAnim', t: 'check', label: 'Animationen reduzieren' },
      { k: 'hotspotHints', t: 'check', label: 'Hotspots beim Start kurz zeigen' },
      { k: 'highContrast', t: 'check', label: 'Hoher Kontrast bei Markierungen' },
      { t: 'button', label: 'Vollbild', text: 'Vollbild umschalten', fn: () => { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen().catch(() => {}); } }
    ],
    sound: [
      { k: 'vMaster', t: 'range', label: 'Gesamtlautstärke' }, { k: 'vMusic', t: 'range', label: 'Musik' },
      { k: 'vSfx', t: 'range', label: 'Effekte' }, { k: 'vBlips', t: 'range', label: 'Sprechgeräusche' },
      { k: 'muteAll', t: 'check', label: 'Alles stumm' }, { k: 'muteBlur', t: 'check', label: 'Stumm, wenn das Fenster nicht aktiv ist' }
    ],
    text: [
      { k: 'lang', t: 'select', label: 'Sprache', opts: [['de', 'Deutsch']] },
      { k: 'textSize', t: 'select', label: 'Textgröße', opts: [['s', 'Klein'], ['m', 'Mittel'], ['l', 'Groß'], ['xl', 'Sehr groß']] },
      { k: 'font', t: 'select', label: 'Schriftart', opts: [['comic', 'Comic (Stil)'], ['readable', 'Gut lesbar'], ['dyslexic', 'Dyslexie-freundlich']] },
      { k: 'subtitles', t: 'check', label: 'Text über den Figuren anzeigen' },
      { k: 'textSpeed', t: 'range', label: 'Textgeschwindigkeit', min: 0.5, max: 2.5, step: 0.25 },
      { k: 'autoAdvance', t: 'check', label: 'Text automatisch weiterschalten' },
      { k: 'textBg', t: 'range', label: 'Textbox-Hintergrund', min: 0, max: 0.85, step: 0.05 }
    ]
  };
  const TAB_NAMES = { grafik: 'Grafik', sound: 'Sound', text: 'Text' };

  function applyOptions(key) {
    NN.saveOptions();
    G.applyGraphics();
    if (key === 'quality' && G.def) G.reloadBg();
    NN.audio.applyMusicVolume();
    if (key === 'muteAll') NN.audio.setMuted(NN.opts.muteAll);
  }

  function showOptions(tab, back) {
    const rows = SCHEMA[tab].map((c, i) => {
      const v = NN.opts[c.k];
      if (c.t === 'select') return `<div class="row"><label>${c.label}</label><select data-i="${i}">${c.opts.map(o => `<option value="${o[0]}" ${String(o[0]) === String(v) ? 'selected' : ''}>${o[1]}</option>`).join('')}</select></div>`;
      if (c.t === 'check') return `<div class="row"><label>${c.label}</label><input type="checkbox" data-i="${i}" ${v ? 'checked' : ''}></div>`;
      if (c.t === 'range') return `<div class="row"><label>${c.label}</label><input type="range" data-i="${i}" min="${c.min ?? 0}" max="${c.max ?? 1}" step="${c.step ?? 0.05}" value="${v}"><span class="val">${Math.round(v * 100) / 100}</span></div>`;
      return `<div class="row"><label>${c.label}</label><button class="btn" data-btn="${i}">${c.text}</button></div>`;
    }).join('');
    open(`<div class="panel"><h1>Optionen</h1>
      <div class="tabs">${Object.keys(SCHEMA).map(t => `<button class="btn ${t === tab ? 'on' : ''}" data-tab="${t}">${TAB_NAMES[t]}</button>`).join('')}</div>
      ${rows}
      <div style="margin-top:14px"><button class="btn primary" data-a="back">Zurück</button><button class="btn" data-a="reset">Standard wiederherstellen</button></div></div>`);
    on('[data-tab]', el => showOptions(el.dataset.tab, back));
    on('[data-a=back]', () => (back ? back() : close()));
    on('[data-a=reset]', () => { Object.assign(NN.opts, NN.defaults); applyOptions('quality'); showOptions(tab, back); });
    on('[data-btn]', el => SCHEMA[tab][+el.dataset.btn].fn());
    overlay.querySelectorAll('[data-i]').forEach(el => {
      const c = SCHEMA[tab][+el.dataset.i];
      const apply = () => {
        let v = el.type === 'checkbox' ? el.checked : el.value;
        if (c.t === 'range') { v = parseFloat(v); el.nextElementSibling.textContent = Math.round(v * 100) / 100; }
        else if (c.k === 'fps') v = parseInt(v, 10);
        NN.opts[c.k] = v; applyOptions(c.k);
      };
      el.addEventListener(el.type === 'range' ? 'input' : 'change', apply);
    });
  }

  // ---------- Speichern / Laden ----------
  function showSlots(mode, back) {
    const items = [];
    for (let i = (mode === 'load' ? 0 : 1); i <= NN.SLOTS; i++) {
      const s = NN.readSlot(i);
      const date = s ? new Date(s.meta.ts).toLocaleString('de-DE') : '';
      const name = s ? (NN.scenes[s.meta.scene] ? NN.scenes[s.meta.scene].name : s.meta.scene) : '';
      items.push(`<div class="slot"><div class="thumb" style="${s && s.meta.thumb ? `background-image:url(${s.meta.thumb})` : ''}"></div>
        <div class="info"><b>${i === 0 ? 'Autosave' : 'Platz ' + i}</b><br>${s ? `${esc(name)}<br><span class="muted small">${date} · ${NN.formatTime(s.meta.playtime)}</span>` : '<span class="muted">leer</span>'}</div>
        <div>${mode === 'save' ? `<button class="btn" data-save="${i}">Speichern</button>` : `<button class="btn" data-load="${i}" ${s ? '' : 'disabled'}>Laden</button>`}
        ${s ? `<button class="btn small" data-export="${i}" title="Als Datei sichern">⭳</button>` : ''}
        ${s && i > 0 ? `<button class="btn small" data-del="${i}" title="Löschen">✕</button>` : ''}
        <button class="btn small" data-import="${i}" title="Aus Datei laden" ${i === 0 ? 'hidden' : ''}>⭱</button></div></div>`);
    }
    open(`<div class="panel" style="width:min(820px,92vw)"><h1>${mode === 'save' ? 'Speichern' : 'Laden'}</h1>${items.join('')}
      <button class="btn primary" data-a="back">Zurück</button><input type="file" id="importfile" accept=".neonsave,.json" hidden></div>`);
    on('[data-a=back]', () => (back ? back() : close()));
    on('[data-save]', el => {
      const slot = +el.dataset.save;
      const ok = NN.saveGame(slot, G.thumbnail());
      G.toast = { text: ok ? 'Gespeichert (Platz ' + slot + ')' : 'Speichern fehlgeschlagen', t: 2.4 };
      showSlots(mode, back);
    });
    on('[data-load]', el => { const s = NN.readSlot(+el.dataset.load); if (s) startFromSave(s); });
    on('[data-del]', el => { if (confirm('Spielstand löschen?')) { NN.deleteSlot(+el.dataset.del); showSlots(mode, back); } });
    on('[data-export]', el => {
      const txt = NN.exportSave(+el.dataset.export); if (!txt) return;
      const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([txt], { type: 'application/json' }));
      a.download = 'neon-noodle-platz' + el.dataset.export + '.neonsave'; a.click();
    });
    const fileInput = overlay.querySelector('#importfile');
    let importSlot = 1;
    on('[data-import]', el => { importSlot = +el.dataset.import; fileInput.click(); });
    fileInput.addEventListener('change', async () => {
      const f = fileInput.files[0]; if (!f) return;
      try { NN.importSave(importSlot, await f.text()); G.toast = { text: 'Importiert in Platz ' + importSlot, t: 2.4 }; }
      catch (e) { alert('Datei konnte nicht gelesen werden: ' + e.message); }
      showSlots(mode, back);
    });
  }

  // ---------- Hilfe ----------
  function showHelp() {
    const S = NN.S;
    const open_ = NN.hints.filter(h => !h.done(S));
    const cur = open_[0];
    if (!cur) { open('<div class="panel"><h1>Hilfe</h1><p>Alles erledigt! Keine offenen Rätsel.</p><button class="btn primary" data-a="back">Zurück</button></div>'); on('[data-a=back]', close); return; }
    const tier = S.hintTier[cur.id] || 0;
    const labels = ['Hinweis zeigen', 'Ansatz zeigen', 'Lösung zeigen'];
    const shown = cur.tiers.slice(0, tier).map((t, i) => `<div class="hint"><b>${['Hinweis', 'Ansatz', 'Lösung'][i]}:</b> ${esc(t)}</div>`).join('');
    open(`<div class="panel"><h1>Hilfe</h1>
      <h2>${esc(cur.title)}</h2>
      <p class="muted">Du kannst selbst entscheiden, wie viel du verraten bekommen willst.</p>
      ${shown}
      ${tier < 3 ? `<button class="btn primary" data-a="more">${labels[tier]}</button>` : ''}
      <button class="btn" data-a="spots">Hotspots zeigen</button>
      <button class="btn" data-a="back">Zurück</button></div>`);
    on('[data-a=more]', () => { S.hintTier[cur.id] = tier + 1; showHelp(); });
    on('[data-a=spots]', () => { G.hintFlash = 5; close(); });
    on('[data-a=back]', () => (inGame ? close() : showTitle()));
  }

  // ---------- Karte ----------
  async function showMap(levelId) {
    if (!inGame) return;
    const S = NN.S, levels = NN.map.levels;
    const cur = NN.map.locations.find(l => l.scene === S.scene);
    const lvl = levels.find(l => l.id === (levelId || (cur && cur.level))) || levels[0];
    const locs = NN.map.locations.filter(l => l.level === lvl.id && S.visited[l.scene]);
    const found = await A.loadFirst(lvl.img);
    const travel = !!S.flags.schnellreise;
    open(`<div class="panel"><h1>Karte</h1>
      <div class="tabs">${levels.map(l => `<button class="btn ${l.id === lvl.id ? 'on' : ''}" data-lvl="${l.id}">${l.name}</button>`).join('')}</div>
      <div class="map" style="${found ? `background-image:url(${found.src})` : 'background-image:linear-gradient(135deg,#10203c,#2a1650)'}">
        <canvas></canvas>
        ${locs.map(l => `<button class="pin ${cur && cur.scene === l.scene ? 'here' : ''} ${travel || (cur && cur.scene === l.scene) ? '' : 'locked'}" data-scene="${l.scene}" style="left:${l.x * 100}%;top:${l.y * 100}%">${esc(l.name)}</button>`).join('')}
      </div>
      <p class="muted small">${locs.length ? 'Orte erscheinen, sobald du sie besucht hast.' : 'Hier warst du noch nie.'} ${travel ? 'Klicke einen Ort, um dorthin zu reisen.' : 'Schnellreise ist noch nicht freigeschaltet. Krümel braucht erst wieder Strom.'}</p>
      <button class="btn primary" data-a="back">Zurück</button></div>`);
    const cv = overlay.querySelector('.map canvas');
    cv.width = 900; cv.height = 506;
    const c2 = cv.getContext('2d');
    c2.fillStyle = 'rgba(6,3,16,0.93)'; c2.fillRect(0, 0, 900, 506);
    c2.globalCompositeOperation = 'destination-out';
    locs.forEach(l => { const g = c2.createRadialGradient(l.x * 900, l.y * 506, 20, l.x * 900, l.y * 506, 150); g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c2.fillStyle = g; c2.fillRect(0, 0, 900, 506); });
    on('[data-lvl]', el => showMap(el.dataset.lvl));
    on('[data-a=back]', close);
    on('[data-scene]', el => {
      const sc = el.dataset.scene; if (sc === S.scene) return close();
      if (!travel) { G.toast = { text: 'Schnellreise noch nicht freigeschaltet.', t: 2.6 }; return close(); }
      close(); G.changeScene(sc, 'default');
    });
  }

  G.onMenu = showMenu; G.onHelp = showHelp; G.onMap = showMap;

  return { showTitle, showMenu, showOptions, showSlots, showHelp, showMap, close, open };
})();
