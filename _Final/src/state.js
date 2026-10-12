// Spielzustand, Optionen, Speichern und Laden (localStorage)
window.NN = window.NN || {};

NN.VERSION = 1;

NN.defaults = {
  quality: 'hi', fullscreen: false, smoothing: true, filter: 'none', fps: 60, reduceAnim: false, hotspotHints: true, hotspotTime: 3, highContrast: false,
  vMaster: 0.8, vMusic: 0.6, vSfx: 0.8, vBlips: 0.6, muteAll: false, muteBlur: true,
  lang: 'de', textSize: 'm', font: 'comic', subtitles: true, textSpeed: 0.7, autoAdvance: true, textBg: 0.35, tShadow: true, tShadowColor: '#000000', tShadowDist: 4, tShadowBlur: 6, tShadowOpacity: 0.8, controlMode: 'auto', screenRes: 'quality', display: 'fit', ttsOn: true, ttsVol: 0.9, ttsRate: 1, ttsVoice: 'auto', optV: 2
};

NN.opts = Object.assign({}, NN.defaults);

NN.newState = function () {
  return { v: NN.VERSION, flags: {}, inv: [], scene: 'imbiss', pos: null, visited: {}, playtime: 0, hintTier: {} };
};
NN.S = NN.newState();

function safeGet(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
function safeSet(key, val) { try { localStorage.setItem(key, val); return true; } catch (e) { console.warn('Speichern nicht möglich', e); return false; } }

NN.loadOptions = function () {
  try {
    const stored = JSON.parse(safeGet('nn.options') || '{}');
    if (NN.isMobile && !stored.quality) NN.opts.quality = 'mid';
    if (stored.optV !== 2) { stored.textSpeed = NN.defaults.textSpeed; stored.optV = 2; } // Version 2: langsamerer Text
    Object.assign(NN.opts, stored);
  } catch (e) { /* defaults */ }
};
NN.saveOptions = function () { safeSet('nn.options', JSON.stringify(NN.opts)); };

// Slot 0 = Autosave, 1..10 = manuell
NN.SLOTS = 10;

NN.saveGame = function (slot, thumb) {
  const g = NN.game;
  if (g && g.pixel && g.def) NN.S.pos = [Math.round(g.pixel.x), Math.round(g.pixel.y)];
  const meta = { ts: Date.now(), scene: NN.S.scene, playtime: Math.round(NN.S.playtime), thumb: thumb || null };
  return safeSet('nn.save.' + slot, JSON.stringify({ meta, state: NN.S }));
};

NN.readSlot = function (slot) {
  try { return JSON.parse(safeGet('nn.save.' + slot) || 'null'); } catch (e) { return null; }
};

NN.deleteSlot = function (slot) { try { localStorage.removeItem('nn.save.' + slot); } catch (e) { /* ignore */ } };

// Dateiformat (.neonsave): { nnBundle: 1, saved, slots: { Platz: { meta, state } }, options }
// Jeder Export (auch ein einzelner Platz) enthält die Einstellungen. Beim Laden kann man wählen: nur Spielstand, nur Einstellungen oder beides.
NN.exportSave = function (slot) {
  const s = NN.readSlot(slot); if (!s) return null;
  return JSON.stringify({ nnBundle: 1, saved: Date.now(), slots: { [slot]: s }, options: NN.opts });
};

// Alle Spielstände und Einstellungen in einer Datei sichern (auch für den Wechsel zwischen Browsern und Geräten)
NN.exportAll = function () {
  const slots = {};
  for (let i = 0; i <= NN.SLOTS; i++) { const s = NN.readSlot(i); if (s) slots[i] = s; }
  // laufendes Spiel als aktueller Stand mit aufnehmen
  if (NN.game && NN.game.def) { NN.saveGame(0, null); const a = NN.readSlot(0); if (a) slots[0] = a; }
  return JSON.stringify({ nnBundle: 1, saved: Date.now(), slots, options: NN.opts });
};

// Inhalt einer Datei lesen (neues Format und alte Einzel-Speicherdateien)
NN.parseImport = function (text) {
  const d = JSON.parse(text);
  if (d && d.nnBundle && d.slots) {
    const slots = {};
    Object.keys(d.slots).forEach(k => { const s = d.slots[k]; if (s && s.state && s.meta) slots[k] = s; });
    return { slots, options: d.options && typeof d.options === 'object' ? d.options : null, legacy: false };
  }
  if (d && d.state && d.meta) return { slots: { 1: d }, options: null, legacy: true }; // alte Datei: nur ein Spielstand
  throw new Error('Keine gültige Speicherdatei');
};
NN.importInfo = function (text) { const p = NN.parseImport(text); return { slotCount: Object.keys(p.slots).length, hasOptions: !!p.options }; };

function importOptions(o) { Object.assign(NN.opts, o); NN.saveOptions(); }

// what = { saves: true/false, options: true/false } (ohne Angabe: beides)
NN.importAny = function (text, what) {
  what = what || { saves: true, options: true };
  const p = NN.parseImport(text), res = { count: 0, slot: null, options: false };
  if (what.saves) {
    const keys = Object.keys(p.slots);
    if (p.legacy || (keys.length === 1 && keys[0] === '0')) { // einzelner Spielstand: in den ersten freien Platz (sonst Platz 1)
      let slot = 1; for (let i = 1; i <= NN.SLOTS; i++) { if (!NN.readSlot(i)) { slot = i; break; } }
      safeSet('nn.save.' + slot, JSON.stringify(p.slots[keys[0]])); res.count = 1; res.slot = slot;
    } else keys.forEach(k => { safeSet('nn.save.' + k, JSON.stringify(p.slots[k])); res.count++; });
  }
  if (what.options && p.options) { importOptions(p.options); res.options = true; }
  return res;
};

// Einzelner Platz aus einer Datei in den gewählten Platz laden
NN.importSave = function (slot, text, what) {
  what = what || { saves: true, options: true };
  const p = NN.parseImport(text), res = { count: 0, slot: null, options: false };
  if (what.saves) {
    const keys = Object.keys(p.slots); if (!keys.length) throw new Error('Kein Spielstand in der Datei');
    safeSet('nn.save.' + slot, JSON.stringify(p.slots[keys[0]])); res.count = 1; res.slot = slot;
  }
  if (what.options && p.options) { importOptions(p.options); res.options = true; }
  return res;
};

NN.latestSlot = function () {
  let best = null;
  for (let i = 0; i <= NN.SLOTS; i++) {
    const s = NN.readSlot(i);
    if (s && (!best || s.meta.ts > best.data.meta.ts)) best = { slot: i, data: s };
  }
  return best;
};

NN.formatTime = function (sec) {
  const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60);
  return h + ':' + String(m).padStart(2, '0') + ' h';
};

// Schattenfarbe mit Stärke als rgba()
NN.shadowRGBA = function () {
  const h = (NN.opts.tShadowColor || '#000000').replace('#', '');
  const n = parseInt(h.length === 3 ? h.replace(/./g, '$&$&') : h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${NN.opts.tShadowOpacity})`;
};
