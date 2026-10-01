// Sprachausgabe (Browser-Sprachsynthese, Deutsch). Jede Figur bekommt Stimme, Tonhöhe und Tempo.
window.NN = window.NN || {};
(function () {
  const synth = window.speechSynthesis;
  let voices = [], cur = null;

  function loadVoices() { voices = synth ? synth.getVoices() : []; }
  if (synth) { loadVoices(); synth.addEventListener && synth.addEventListener('voiceschanged', loadVoices); }

  const german = () => voices.filter(v => /^de(-|_|$)/i.test(v.lang));
  const quality = v => (/natural|online|neural/i.test(v.name) ? 3 : 0) + (/google|microsoft|anna|petra|markus|yannick|katja|conrad|amala|killian/i.test(v.name) ? 1 : 0) + (v.localService ? 0 : 0);

  const hash = s => [...String(s)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

  function pickVoice(who) {
    const g = german().sort((a, b) => quality(b) - quality(a));
    if (!g.length) return null;
    const wanted = NN.opts.ttsVoice;
    if (wanted && wanted !== 'auto') { const v = g.find(x => x.voiceURI === wanted); if (v) return v; }
    // gleichwertig gute Stimmen reihum an die Figuren verteilen
    const top = g.filter(v => quality(v) >= quality(g[0]));
    return top[hash(who) % top.length];
  }

  NN.tts = {
    supported: !!synth,
    germanVoices() { return german().map(v => [v.voiceURI, v.name]); },
    enabled() { return !!synth && NN.opts.ttsOn && !NN.opts.muteAll && german().length > 0; },
    // opt: { onword(charIndex), onend() }
    speak(who, text, opt) {
      if (!this.enabled()) return false;
      this.cancel();
      const sp = (NN.speakers && NN.speakers[who]) || { pitch: 1 };
      const u = new SpeechSynthesisUtterance(String(text).replace(/\s+/g, ' ').replace(/…/g, '...'));
      const v = pickVoice(who);
      if (v) { u.voice = v; u.lang = v.lang; } else u.lang = 'de-DE';
      u.pitch = Math.max(0.1, Math.min(2, 0.55 + sp.pitch * 0.45));
      u.rate = Math.max(0.5, Math.min(2, (NN.opts.ttsRate || 1) * (sp.rate || 1)));
      u.volume = Math.max(0, Math.min(1, (NN.opts.ttsVol ?? 0.9) * (NN.opts.vMaster ?? 1) / 0.8));
      u.onboundary = e => { if (e.name === 'word' || e.name === undefined) opt && opt.onword && opt.onword(e.charIndex); };
      u.onend = u.onerror = () => { if (cur === u) cur = null; opt && opt.onend && opt.onend(); };
      cur = u;
      synth.speak(u);
      return true;
    },
    cancel() { if (synth && (synth.speaking || synth.pending)) { cur = null; synth.cancel(); } cur = null; },
    test() { this.speak('pixel', 'Hallo, ich bin Pixel. So klingt meine Stimme im Spiel.', {}); }
  };
  window.addEventListener('blur', () => NN.tts.cancel());
})();
