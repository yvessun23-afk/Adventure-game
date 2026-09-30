// Audio: Text-Blips und einfache Effekte per WebAudio (keine Dateien nötig), Musik optional aus assets/audio/music
window.NN = window.NN || {};

NN.audio = (function () {
  let ctx = null, music = null, musicName = null;

  function ensure() {
    if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { ctx = null; } }
    if (ctx && ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  const vol = kind => (NN.opts.muteAll ? 0 : NN.opts.vMaster * NN.opts['v' + kind]);

  function tone(freq, dur, type, gain, kind, slideTo) {
    const c = ensure(); if (!c) return;
    const v = vol(kind) * gain; if (v < 0.002) return;
    const o = c.createOscillator(), g = c.createGain(), t = c.currentTime;
    o.type = type; o.frequency.setValueAtTime(freq, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(c.destination); o.start(t); o.stop(t + dur + 0.02);
  }

  function applyMusicVolume() { if (music) music.volume = Math.min(1, vol('Music') * 0.6); }

  function playMusic(name) {
    if (!name || name === musicName) return;
    musicName = name;
    if (music) { music.pause(); music = null; }
    const a = new Audio();
    a.loop = true;
    a.addEventListener('error', () => { if (a.src.endsWith('.ogg')) { a.src = 'assets/audio/music/' + name + '.mp3'; } });
    a.src = 'assets/audio/music/' + name + '.ogg';
    music = a; applyMusicVolume();
    const p = a.play(); if (p && p.catch) p.catch(() => { /* Autoplay gesperrt oder Datei fehlt */ });
  }

  return {
    ensure, playMusic, applyMusicVolume,
    blip(pitch) { tone(170 * (pitch || 1) * (0.9 + Math.random() * 0.25), 0.05, 'square', 0.06, 'Blips'); },
    click() { tone(520, 0.05, 'triangle', 0.1, 'Sfx'); },
    pickup() { tone(660, 0.09, 'triangle', 0.14, 'Sfx'); setTimeout(() => tone(990, 0.12, 'triangle', 0.14, 'Sfx'), 90); },
    fail() { tone(220, 0.16, 'sawtooth', 0.08, 'Sfx', 140); },
    scan() { tone(300, 0.6, 'sine', 0.12, 'Sfx', 1400); },
    whoosh() { tone(400, 0.25, 'sawtooth', 0.05, 'Sfx', 120); },
    setMuted(flag) { if (!ctx) return; if (flag) ctx.suspend(); else ctx.resume(); if (music) { flag ? music.pause() : music.play().catch(() => {}); } }
  };
})();
