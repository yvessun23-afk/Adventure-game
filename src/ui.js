// Menüs: Titel, Intro, Pause-Menü, Optionen, Speichern/Laden, Hilfe, Karte
window.NN = window.NN || {};

NN.ui = (function () {
  const G = NN.game, A = NN.assets;
  const overlay = document.getElementById('overlay');
  let inGame = false;

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  let previewTimer = null;
  function startPreview() {
    clearTimeout(previewTimer); clearInterval(previewTimer);
    const box = overlay.querySelector('#tpv'), el = overlay.querySelector('.tptext');
    if (!box || !el) return;
    box.style.backgroundImage = 'url(assets/backgrounds/low/bg_01_zhangs_imbiss.webp)';
    const full = 'Pixel: „Das ist eine Vorschau. So erscheint der Text später im Spiel.“';
    el.style.display = NN.opts.subtitles ? '' : 'none';
    const words = full.split(' '); let n = 0; setReveal(el, words, 0);
    previewTimer = setInterval(() => {
      n += NN.opts.textSpeed * 3.4 * 0.12; setReveal(el, words, Math.floor(n) + 1);
      if (n >= words.length) {
        clearInterval(previewTimer);
        setReveal(el, words, 1e9); if (!NN.opts.autoAdvance) el.insertAdjacentText('beforeend', '  ▼');
        previewTimer = setTimeout(startPreview, NN.opts.autoAdvance ? 2600 : 1800);
      }
    }, 120);
  }

  function open(html, cls) {
    clearTimeout(previewTimer); clearInterval(previewTimer);
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

  // ---------- Grafik-Buttons (optional): assets/sprites/ui/menu_<key>.png, sonst Textknopf ----------
  const MENU_KEYS = ['neues_spiel', 'fortsetzen', 'laden', 'speichern', 'optionen', 'hilfe', 'hauptmenue', 'weiter', 'zurueck', 'tab_grafik', 'tab_sound', 'tab_text'];
  const imgSrc = k => 'assets/sprites/ui/menu_' + k + '.png';
  function preload() {
    return Promise.all(MENU_KEYS.map(k => A.load(imgSrc(k))).concat([A.load('assets/sprites/ui/menu_panel.png')])).then(() => {
      document.body.classList.toggle('gfx-panel', !!A.get('assets/sprites/ui/menu_panel.png'));
    });
  }
  // key: Grafikname, label: Text-Fallback, attrs: z. B. 'data-a="new"', cls: zusätzliche Klassen
  function B(key, label, attrs, cls) {
    const img = key && A.get(imgSrc(key));
    if (img) return `<button class="btn gimg ${cls || ''}" ${attrs || ''} aria-label="${esc(label)}"><img src="${imgSrc(key)}" alt="${esc(label)}" draggable="false"></button>`;
    return `<button class="btn ${cls || ''}" ${attrs || ''}>${esc(label)}</button>`;
  }

  // ---------- Titel ----------
  async function showTitle() {
    inGame = false; G.paused = true;
    const bg = document.getElementById('titlebg') || document.body.appendChild(Object.assign(document.createElement('div'), { id: 'titlebg' }));
    bg.classList.remove('hidden');
    NN.audio.playMusic('mus_titel');
    const found = await A.loadFirst(['assets/intro/titel.webp', 'assets/raw/titel.png']);
    if (found) bg.style.backgroundImage = `url(${found.src})`;
    const latest = NN.latestSlot();
    open(`<div class="panel title">
      <div class="logo">NEON NOODLE</div><div class="sub">Der Fall der verschwundenen Nudelsuppe</div>
      ${B('neues_spiel', 'Neues Spiel', 'data-a="new"', 'big primary')}
      ${latest ? B('fortsetzen', 'Fortsetzen', 'data-a="cont"', 'big') : ''}
      ${B('laden', 'Laden', 'data-a="load"', 'big')}
      ${B('optionen', 'Optionen', 'data-a="opts"', 'big')}
      <div class="muted small" style="margin-top:10px">Linksklick: gehen/benutzen · Rechtsklick: ansehen · H oder Leertaste: Hotspots zeigen · Esc: Menü</div>
    </div>`, found ? 'clear title-art' : 'clear');
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
  // Text Wort für Wort aufdecken; der noch unsichtbare Rest bleibt im Layout, dadurch wächst der Text von links nach rechts
  function setReveal(el, words, n) {
    const k = Math.min(words.length, n);
    el.dataset.full = k >= words.length ? '1' : '0';
    el.innerHTML = esc(words.slice(0, k).join(' ')) + '<span style="visibility:hidden">' + (k ? ' ' : '') + esc(words.slice(k).join(' ')) + '</span>';
  }

  function playSequence(panels, onDone, skipLabel) {
    const el = document.createElement('div'); el.className = 'intro';
    el.innerHTML = `<div class="pic"></div><div class="txt"></div><button class="btn skip">${skipLabel || 'Überspringen (Esc)'}</button>`;
    document.body.appendChild(el);
    const pic = el.querySelector('.pic'), txt = el.querySelector('.txt');
    let idx = -1, done = false, typing = null;
    const finish = () => { if (done) return; done = true; clearInterval(typing); document.removeEventListener('keydown', onKey, true); el.remove(); onDone(); };
    async function show(i) {
      idx = i; if (i >= panels.length) return finish();
      const p = panels[i];
      const found = p.img ? await A.loadFirst([`assets/intro/${p.img}.webp`, `assets/raw/${p.img}.png`]) : null;
      pic.style.opacity = 0;
      setTimeout(() => { pic.style.backgroundImage = found ? `url(${found.src})` : ''; pic.style.opacity = 1; }, 80);
      setReveal(txt, p.text.split(' '), 0); clearInterval(typing);
      const words = p.text.split(' '); let n = 0;
      typing = setInterval(() => { n++; setReveal(txt, words, n); NN.audio.blip(1.3); if (n >= words.length) clearInterval(typing); }, 330 / NN.opts.textSpeed);
    }
    const next = () => {
      const p = panels[idx];
      if (p && txt.dataset.full !== '1') { clearInterval(typing); setReveal(txt, p.text.split(' '), 1e9); return; }
      show(idx + 1);
    };
    const onKey = e => { if (e.key === 'Escape') { e.stopPropagation(); finish(); } else if (e.key === ' ' || e.key === 'Enter') { e.stopPropagation(); e.preventDefault(); next(); } };
    el.addEventListener('click', e => { if (e.target.classList.contains('skip')) finish(); else next(); });
    document.addEventListener('keydown', onKey, true);
    show(0);
  }

  async function playIntro() {
    hideTitleBg(); close();
    playSequence(NN.intro, startNew);
  }

  const ENDING = [
    { img: 'ende_01', text: 'Kleo schmeckte zum ersten Mal in ihrem Leben. Es war bitter, warm und das Beste, was sie je erlebt hatte.' },
    { img: 'ende_02', text: 'Oma Zhang kochte mit dem zurückgebrachten Kristall die erste echte Suppe seit Tagen. Überall in Neo-Nagoya-Heights liefen die Suppenautomaten wieder, und die Stadt roch nach Brühe, nach Hoffnung und ein wenig nach Toast.' },
    { img: 'ende_03', text: 'Und am Tresen von Zhangs Imbiss saßen Pixel, Krümel, Oma Zhang, Kleo und Teddy-Bot und teilten sich die beste Nudelsuppe der Welt.' },
    { img: 'ende_03', text: 'NEON NOODLE · Der Fall der verschwundenen Nudelsuppe · Ende. Danke fürs Spielen!' }
  ];

  function showEnding(done) {
    inGame = false; G.paused = true;
    NN.audio.playMusic('mus_finale');
    playSequence(ENDING, () => { if (done) done(); showTitle(); }, 'Überspringen (Esc)');
  }

  // ---------- Pause-Menü ----------
  function showMenu() {
    if (!inGame) return;
    open(`<div class="panel title"><h1>Menü</h1>
      ${B('weiter', 'Weiterspielen', 'data-a="resume"', 'big primary')}
      ${B('speichern', 'Speichern', 'data-a="save"', 'big')}
      ${B('laden', 'Laden', 'data-a="load"', 'big')}
      ${B('optionen', 'Optionen', 'data-a="opts"', 'big')}
      ${B('hilfe', 'Hilfe', 'data-a="help"', 'big')}
      ${B('hauptmenue', 'Hauptmenü', 'data-a="main"', 'big')}</div>`);
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
      { k: 'controlMode', t: 'select', label: 'Steuerung', opts: [['auto', 'Automatik (Klick = passende Aktion)'], ['scumm', 'SCUMM (Verben wählen)']] },
      { k: 'quality', t: 'select', label: 'Grafikqualität', opts: [['hi', 'Hoch'], ['mid', 'Mittel'], ['low', 'Niedrig (schneller)']] },
      { k: 'screenRes', t: 'select', label: 'Auflösung der Zeichenfläche', opts: [['quality', 'Wie Grafikqualität'], ['native', 'Gerätenativ (volle Schärfe, z. B. iPhone)'], ['full', 'Voll (1920 × 1200)']] },
      { k: 'display', t: 'select', label: 'Bildanzeige', opts: [['fit', 'Anpassen (schwarze Ränder, unverzerrt)'], ['wide', 'Breiter (15 % gestreckt, kaum sichtbar)'], ['fill', 'Füllen (ganzer Bildschirm, deutlich gestreckt)']] },
      { t: 'btn', label: 'iPhone', text: 'Für iPhone optimieren', fn: (back, refresh) => { Object.assign(NN.opts, { screenRes: 'native', display: 'fill', textSize: 'l', filter: 'none', quality: 'mid' }); applyOptions('quality'); G.toast = { text: 'iPhone-Einstellungen gesetzt', t: 2.4 }; refresh(); } },
      { k: 'fullscreen', t: 'check', label: 'Vollbild (auch mit Taste F)' },
      { k: 'smoothing', t: 'check', label: 'Bildglättung' },
      { k: 'filter', t: 'select', label: 'Bildfilter', opts: [['none', 'Keiner'], ['neon', 'Neon-Glühen'], ['crt', 'Röhrenmonitor (Scanlines)']] },
      { k: 'fps', t: 'select', label: 'Bildrate', opts: [[60, '60 FPS'], [30, '30 FPS']] },
      { k: 'reduceAnim', t: 'check', label: 'Animationen reduzieren' },
      { k: 'hotspotHints', t: 'check', label: 'Hotspots beim Spielstart kurz zeigen' },
      { k: 'hotspotTime', t: 'range', label: 'Hotspots (Taste H): Anzeigedauer in Sekunden', min: 1, max: 10, step: 0.5 },
      { k: 'highContrast', t: 'check', label: 'Hoher Kontrast bei Markierungen' },
    ],
    sound: [
      { k: 'vMaster', t: 'range', label: 'Gesamtlautstärke' }, { k: 'vMusic', t: 'range', label: 'Musik' },
      { k: 'vSfx', t: 'range', label: 'Effekte' }, { k: 'vBlips', t: 'range', label: 'Sprechgeräusche' },
      { k: 'ttsOn', t: 'check', get label() { return 'Sprachausgabe (Figuren sprechen den Text)' + (NN.tts.supported && NN.tts.germanVoices().length ? '' : ' – keine deutsche Stimme auf diesem Gerät gefunden'); } },
      { k: 'ttsVol', t: 'range', label: 'Sprachausgabe: Lautstärke', min: 0.1, max: 1, step: 0.05 },
      { k: 'ttsRate', t: 'range', label: 'Sprachausgabe: Tempo', min: 0.6, max: 1.6, step: 0.05 },
      { k: 'ttsVoice', t: 'select', label: 'Sprachausgabe: Stimme', opts: () => [['auto', 'Automatisch (je Figur verschieden)']].concat(NN.tts.germanVoices()) },
      { t: 'btn', label: 'Stimme', text: 'Stimme testen', fn: () => NN.tts.test() },
      { k: 'muteAll', t: 'check', label: 'Alles stumm' }, { k: 'muteBlur', t: 'check', label: 'Stumm, wenn das Fenster nicht aktiv ist' }
    ],
    text: [
      { k: 'lang', t: 'select', label: 'Sprache', opts: [['de', 'Deutsch']] },
      { k: 'textSize', t: 'select', label: 'Textgröße', opts: [['s', 'Klein'], ['m', 'Mittel'], ['l', 'Groß'], ['xl', 'Sehr groß']] },
      { k: 'font', t: 'select', label: 'Schriftart', opts: [['comic', 'Comic (Stil)'], ['readable', 'Gut lesbar'], ['dyslexic', 'Dyslexie-freundlich']] },
      { k: 'subtitles', t: 'check', label: 'Text über den Figuren anzeigen' },
      { k: 'textSpeed', t: 'range', label: 'Textgeschwindigkeit (links langsamer)', min: 0.3, max: 2, step: 0.05 },
      { k: 'autoAdvance', t: 'select', label: 'Text weiterschalten', opts: [['true', 'Automatisch'], ['false', 'Erst nach Klick']] },
      { k: 'textBg', t: 'range', label: 'Textbox-Hintergrund', min: 0, max: 0.85, step: 0.05 },
      { k: 'tShadow', t: 'check', label: 'Textschatten' },
      { k: 'tShadowColor', t: 'select', label: 'Schattenfarbe', opts: [['#000000', 'Schwarz'], ['#2a0f55', 'Dunkelviolett'], ['#ff3cc8', 'Neon-Pink'], ['#27e6ff', 'Neon-Cyan'], ['#ffb347', 'Neon-Orange'], ['#ffffff', 'Weiß']] },
      { k: 'tShadowDist', t: 'range', label: 'Schatten: Abstand', min: 0, max: 12, step: 0.5 },
      { k: 'tShadowBlur', t: 'range', label: 'Schatten: Weichzeichnung', min: 0, max: 20, step: 1 },
      { k: 'tShadowOpacity', t: 'range', label: 'Schatten: Stärke', min: 0.1, max: 1, step: 0.05 }
    ]
  };
  const TAB_NAMES = { grafik: 'Grafik', sound: 'Sound', text: 'Text' };

  function applyOptions(key) {
    NN.saveOptions();
    G.applyGraphics();
    if (key === 'quality' && G.def) G.reloadBg();
    NN.audio.applyMusicVolume();
    if (key === 'muteAll') NN.audio.setMuted(NN.opts.muteAll);
    if (key === 'fullscreen') G.toggleFullscreen(!!NN.opts.fullscreen);
  }

  function showOptions(tab, back) {
    const rows = SCHEMA[tab].map((c, i) => {
      const v = NN.opts[c.k];
      if (c.t === 'select') return `<div class="row"><label>${c.label}</label><select data-i="${i}">${(typeof c.opts === 'function' ? c.opts() : c.opts).map(o => `<option value="${o[0]}" ${String(o[0]) === String(v) ? 'selected' : ''}>${o[1]}</option>`).join('')}</select></div>`;
      if (c.t === 'check') return `<div class="row"><label>${c.label}</label><input type="checkbox" data-i="${i}" ${v ? 'checked' : ''}></div>`;
      if (c.t === 'range') return `<div class="row"><label>${c.label}</label><input type="range" data-i="${i}" min="${c.min ?? 0}" max="${c.max ?? 1}" step="${c.step ?? 0.05}" value="${v}"><span class="val">${Math.round(v * 100) / 100}</span></div>`;
      return `<div class="row"><label>${c.label}</label><button class="btn" data-btn="${i}">${c.text}</button></div>`;
    }).join('');
    open(`<div class="panel wide"><h1>Optionen</h1>
      <div class="tabs">${Object.keys(SCHEMA).map(t => B('tab_' + t, TAB_NAMES[t], `data-tab="${t}"`, t === tab ? 'on' : '')).join('')}</div>
      ${rows}
      ${tab === 'text' ? '<h2>Vorschau</h2><div class="tpreview" id="tpv"><div class="tptext"></div><div class="who">So sieht der Text im Spiel aus (Hintergrund: Imbiss)</div></div><button class="btn" data-a="replay">Vorschau neu starten</button>' : ''}
      <div style="margin-top:14px">${B('zurueck', 'Zurück', 'data-a="back"', 'primary')}<button class="btn" data-a="reset">Standard wiederherstellen</button></div></div>`);
    on('[data-tab]', el => showOptions(el.dataset.tab, back));
    if (tab === 'text') { on('[data-a=replay]', startPreview); startPreview(); }
    on('[data-a=back]', () => (back ? back() : close()));
    on('[data-a=reset]', () => { Object.assign(NN.opts, NN.defaults); applyOptions('quality'); showOptions(tab, back); });
    on('[data-btn]', el => SCHEMA[tab][+el.dataset.btn].fn(back, () => showOptions(tab, back)));
    overlay.querySelectorAll('[data-i]').forEach(el => {
      const c = SCHEMA[tab][+el.dataset.i];
      const apply = () => {
        let v = el.type === 'checkbox' ? el.checked : el.value;
        if (c.t === 'range') { v = parseFloat(v); el.nextElementSibling.textContent = Math.round(v * 100) / 100; }
        else if (c.k === 'fps') v = parseInt(v, 10);
        else if (c.k === 'autoAdvance') v = v === true || v === 'true';
        NN.opts[c.k] = v; applyOptions(c.k); if (tab === 'text') startPreview();
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
    open(`<div class="panel" style="width:min(820px,92vw)"><h1>${mode === 'save' ? 'Speichern' : 'Laden'}</h1>
      <div style="margin:0 0 4px"><button class="btn" data-a="expall">⭳ Alle Spielstände als Datei sichern</button> <button class="btn" data-a="impall">⭱ Spielstände aus Datei laden</button> <button class="btn small" data-a="copyall" title="Falls der Download nicht klappt">Als Text kopieren</button> <button class="btn small" data-a="pasteall" title="Text aus der Zwischenablage laden">Text einfügen</button></div>
      <div id="exportmsg" class="small" style="margin:0 0 6px;color:#7dffb0;min-height:1.2em"></div>
      <div class="muted small" style="margin-bottom:10px">Die Datei kannst du in einem anderen Browser oder auf einem anderen Gerät laden (auch iPhone).</div>
${items.join('')}
      ${B('zurueck', 'Zurück', 'data-a="back"', 'primary')}<input type="file" id="importfile" accept=".neonsave,.json" hidden><input type="file" id="importall" accept=".neonsave,.json,application/json" hidden></div>`);
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
    on('[data-a=expall]', () => {
      const txt = NN.exportAll();
      const d = new Date(), stamp = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([txt], { type: 'application/json' }));
      a.download = 'neon-noodle-' + stamp + '.neonsave'; document.body.appendChild(a); a.click(); a.remove();
      const msg = overlay.querySelector('#exportmsg');
      if (msg) msg.textContent = '✔ Datei „' + a.download + '“ wurde erzeugt und liegt jetzt im Download-Ordner deines Browsers. Wenn nichts erscheint: Downloads für diese Seite erlauben oder „Als Text kopieren" nehmen.';
    });
    on('[data-a=copyall]', async () => {
      const msg = overlay.querySelector('#exportmsg'), txt = NN.exportAll();
      try { await navigator.clipboard.writeText(txt); msg.textContent = '✔ Spielstände als Text in die Zwischenablage kopiert. In einer Textdatei speichern oder im anderen Browser mit „Text einfügen" laden.'; }
      catch (e) { msg.style.color = '#ffb347'; msg.textContent = 'Kopieren nicht erlaubt. Text zum Markieren: '; const ta = document.createElement('textarea'); ta.value = txt; ta.style.cssText = 'width:100%;height:80px'; msg.appendChild(ta); ta.select(); }
    });
    on('[data-a=pasteall]', () => {
      const t = prompt('Text der Spielstand-Datei hier einfügen:');
      if (!t) return;
      try { const r = NN.importAny(t); G.toast = { text: r.slot ? 'Importiert in Platz ' + r.slot : r.count + ' Spielstände geladen', t: 2.8 }; showSlots(mode, back); }
      catch (e) { alert('Das war kein gültiger Spielstand: ' + e.message); }
    });
    const allInput = overlay.querySelector('#importall');
    on('[data-a=impall]', () => allInput.click());
    allInput.addEventListener('change', async () => {
      const f = allInput.files[0]; if (!f) return;
      try { const r = NN.importAny(await f.text()); G.toast = { text: r.slot ? 'Importiert in Platz ' + r.slot : r.count + ' Spielstände geladen', t: 2.8 }; }
      catch (e) { alert('Datei konnte nicht gelesen werden: ' + e.message); }
      showSlots(mode, back);
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
    if (!cur) { open(`<div class="panel"><h1>Hilfe</h1><p>Alles erledigt! Keine offenen Rätsel.</p>${B('zurueck', 'Zurück', 'data-a="back"', 'primary')}</div>`); on('[data-a=back]', close); return; }
    const tier = S.hintTier[cur.id] || 0;
    const labels = ['Hinweis zeigen', 'Ansatz zeigen', 'Lösung zeigen'];
    const shown = cur.tiers.slice(0, tier).map((t, i) => `<div class="hint"><b>${['Hinweis', 'Ansatz', 'Lösung'][i]}:</b> ${esc(t)}</div>`).join('');
    open(`<div class="panel"><h1>Hilfe</h1>
      <h2>${esc(cur.title)}</h2>
      <p class="muted">Du kannst selbst entscheiden, wie viel du verraten bekommen willst.</p>
      ${shown}
      ${tier < 3 ? `<button class="btn primary" data-a="more">${labels[tier]}</button>` : ''}
      <button class="btn" data-a="spots">Hotspots zeigen</button>
      ${B('zurueck', 'Zurück', 'data-a="back"')}</div>`);
    on('[data-a=more]', () => { S.hintTier[cur.id] = tier + 1; showHelp(); });
    on('[data-a=spots]', () => { G.hintFlash = NN.opts.hotspotTime || 3; close(); });
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
        ${locs.map(l => `<button class="pin ${cur && cur.scene === l.scene ? 'here' : ''} ${travel || (cur && cur.scene === l.scene) ? '' : 'locked'}" data-scene="${l.scene}" style="left:${l.x * 100}%;top:${l.y * 100}%" title="${esc(l.name)}">${esc(l.short || l.name)}</button>`).join('')}
      </div>
      <p class="muted small">${locs.length ? 'Orte erscheinen, sobald du sie besucht hast.' : 'Hier warst du noch nie.'} ${travel ? 'Klicke einen Ort, um dorthin zu reisen.' : 'Schnellreise ist noch nicht freigeschaltet. Krümel braucht erst wieder Strom.'}</p>
      ${B('zurueck', 'Zurück', 'data-a="back"', 'primary')}</div>`);
    const cv = overlay.querySelector('.map canvas');
    cv.width = 900; cv.height = 506;
    const c2 = cv.getContext('2d');
    c2.fillStyle = 'rgba(6,3,16,0.93)'; c2.fillRect(0, 0, 900, 506);
    c2.globalCompositeOperation = 'destination-out';
    locs.forEach(l => { const g = c2.createRadialGradient(l.x * 900, l.y * 506, 40, l.x * 900, l.y * 506, 260); g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c2.fillStyle = g; c2.fillRect(0, 0, 900, 506); });
    on('[data-lvl]', el => showMap(el.dataset.lvl));
    on('[data-a=back]', close);
    on('[data-scene]', el => {
      const sc = el.dataset.scene; if (sc === S.scene) return close();
      if (!travel) { G.toast = { text: 'Schnellreise noch nicht freigeschaltet.', t: 2.6 }; return close(); }
      close(); G.changeScene(sc, 'default');
    });
  }

  function showActEnd(title, text, done) {
    open(`<div class="panel title"><h1>${esc(title)}</h1><p>${esc(text)}</p>
      ${B('weiter', 'Weiter', 'data-a="ok"', 'big primary')}</div>`);
    on('[data-a=ok]', () => { close(); if (done) done(); });
  }

  G.onMenu = showMenu; G.onHelp = showHelp; G.onMap = showMap;

  return { preload, showEnding, showTitle, showMenu, showOptions, showSlots, showHelp, showMap, showActEnd, close, open };
})();
