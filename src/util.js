// Hilfsfunktionen: Geometrie, Text, Bildladen
window.NN = window.NN || {};

// Ältere Safari-Versionen (iPhone) kennen roundRect nicht
if (window.CanvasRenderingContext2D && !CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    r = Math.min(Array.isArray(r) ? r[0] : (r || 0), w / 2, h / 2);
    this.moveTo(x + r, y); this.arcTo(x + w, y, x + w, y + h, r); this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r); this.arcTo(x, y, x + w, y, r); this.closePath();
  };
}
NN.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 1 && /Mac/.test(navigator.platform));

NN.util = (function () {
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const rect = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];

  function inPoly(x, y, poly) {
    let c = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i], [xj, yj] = poly[j];
      if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c;
    }
    return c;
  }

  function nearestOnPoly(x, y, poly) {
    let best = poly[0], bd = Infinity;
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length];
      const dx = b[0] - a[0], dy = b[1] - a[1], l2 = dx * dx + dy * dy;
      const t = l2 ? clamp(((x - a[0]) * dx + (y - a[1]) * dy) / l2, 0, 1) : 0;
      const px = a[0] + dx * t, py = a[1] + dy * t, d = (px - x) ** 2 + (py - y) ** 2;
      if (d < bd) { bd = d; best = [px, py]; }
    }
    return best;
  }

  function centroid(poly) {
    let x = 0, y = 0;
    poly.forEach(p => { x += p[0]; y += p[1]; });
    return [x / poly.length, y / poly.length];
  }

  // Punkt in die Lauffläche schieben (leicht nach innen, damit er sicher drin liegt).
  function clampToPoly(x, y, poly) {
    if (inPoly(x, y, poly)) return [x, y];
    const p = nearestOnPoly(x, y, poly), c = centroid(poly);
    const dx = c[0] - p[0], dy = c[1] - p[1], l = Math.hypot(dx, dy) || 1;
    return [p[0] + dx / l * 2, p[1] + dy / l * 2];
  }

  function wrap(ctx, text, maxW) {
    const words = String(text).split(/\s+/), lines = [];
    let cur = '';
    for (const w of words) {
      const t = cur ? cur + ' ' + w : w;
      if (ctx.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t;
    }
    if (cur) lines.push(cur);
    return lines;
  }

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  return { clamp, lerp, rect, inPoly, nearestOnPoly, centroid, clampToPoly, wrap, sleep };
})();

// Bild-Cache. get() liefert das Bild oder null (und stößt das Laden an). Fehlende Dateien sind kein Fehler.
NN.assets = (function () {
  const cache = new Map();
  function entry(src) {
    let e = cache.get(src);
    if (!e) {
      e = { img: new Image(), ok: false, fail: false, waiters: [] };
      e.img.onload = () => {
        const done = () => { e.ok = true; e.waiters.splice(0).forEach(f => f(e.img)); };
        if (e.img.decode) e.img.decode().then(done, done); else done(); // vorab dekodieren: kein Ruckeln beim ersten Zeichnen
      };
      e.img.onerror = () => { e.fail = true; e.waiters.splice(0).forEach(f => f(null)); };
      e.img.src = src;
      cache.set(src, e);
    }
    return e;
  }
  const get = src => { const e = entry(src); return e.ok ? e.img : null; };
  const load = src => new Promise(res => {
    const e = entry(src);
    if (e.ok) res(e.img); else if (e.fail) res(null); else e.waiters.push(res);
  });
  async function loadFirst(list) {
    for (const src of list) { const img = await load(src); if (img) return { img, src }; }
    return null;
  }
  // Mehrere Bilder laden (mit begrenzter Parallelität). Fehlende Dateien sind kein Fehler.
  async function preload(list, concurrency) {
    const queue = list.filter(Boolean).slice(); const n = Math.max(1, concurrency || 6);
    await Promise.all(Array.from({ length: n }, async () => { while (queue.length) await load(queue.shift()); }));
  }
  return { get, load, loadFirst, preload };
})();
