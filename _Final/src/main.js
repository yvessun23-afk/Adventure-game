// Start
(function () {
  NN.loadOptions();
  NN.game.applyGraphics();
  NN.ui.preload().then(() => NN.ui.showTitle());
})();

// Versionsanzeige (klein, unten rechts): zeigt, welcher Stand geladen ist – hilft bei Cache-Problemen
(function () {
  const d = new Date((+NN.buildId || 0) * 1000), p = n => String(n).padStart(2, '0');
  const el = document.createElement('div');
  el.textContent = 'Stand ' + p(d.getDate()) + '.' + p(d.getMonth() + 1) + '. ' + p(d.getHours()) + ':' + p(d.getMinutes()) + ' · ' + NN.buildId;
  el.style.cssText = 'position:fixed;right:6px;bottom:3px;font:11px sans-serif;color:#fff;opacity:.35;pointer-events:none;z-index:5;text-shadow:0 0 3px #000';
  document.body.appendChild(el);
})();
