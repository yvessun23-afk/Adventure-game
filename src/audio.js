// Audio: generative Ambient-Musik (WebAudio, keine Dateien nötig), weiche Effekte, sanfte Sprech-Töne.
// Liegt unter assets/audio/music/<name>.ogg oder .mp3 eine Datei, wird sie statt der synthetischen Musik gespielt.
window.NN = window.NN || {};

NN.audio = (function () {
  let ctx = null, master = null, reverbIn = null, delayIn = null;
  let musicBus = null, sfxBus = null, blipBus = null, analyser = null;
  let session = null, pendingTheme = null, fileAudio = null, noiseBuf = null, lastBlipMidi = 60;

  const mtof = m => 440 * Math.pow(2, (m - 69) / 12);
  const vol = k => (NN.opts.muteAll ? 0 : NN.opts.vMaster * NN.opts['v' + k]);
  const rnd = (a, b) => a + Math.random() * (b - a);
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];

  // ---------- Themen (Stimmung je Ort), Klangbild angelehnt an düstere Sci-Fi-Soundtracks ----------
  // Tiefe Drones, langsam aufschwellende Akkordflächen, sehr lange Hallfahnen, einzelne weite Melodielinien.
  // chords: bass = Basston (MIDI), notes = Flächen. lead = Tonvorrat für Melodielinien (leer = keine)
  const THEMES = {
    warm: { cut: 620, pad: 0.05, sub: 0.17, chordSec: 26, lead: [74, 77, 79, 81, 84, 86], leadEvery: [10, 18], braam: [40, 70], glass: [14, 26],
      noise: 0.006, pulse: 0, chords: [
        { bass: 38, notes: [50, 57, 60, 64, 69] }, { bass: 34, notes: [46, 53, 57, 62, 64] },
        { bass: 31, notes: [43, 50, 58, 62, 65] }, { bass: 33, notes: [45, 52, 57, 62, 64] }] },
    groove: { cut: 560, pad: 0.05, sub: 0.2, chordSec: 24, lead: [72, 75, 77, 80, 82, 84], leadEvery: [14, 26], braam: [28, 55], glass: [16, 30],
      noise: 0.008, pulse: 58, chords: [
        { bass: 29, notes: [41, 48, 53, 56, 60] }, { bass: 37, notes: [49, 53, 56, 60] },
        { bass: 34, notes: [46, 53, 58, 61] }, { bass: 36, notes: [48, 55, 60, 65] }] },
    dark: { cut: 430, pad: 0.055, sub: 0.2, chordSec: 30, lead: [69, 72, 76, 79], leadEvery: [26, 44], braam: [45, 80], glass: [18, 34],
      noise: 0.012, pulse: 0, chords: [
        { bass: 33, notes: [45, 52, 57, 60] }, { bass: 29, notes: [41, 48, 55, 60] },
        { bass: 31, notes: [43, 50, 55, 62] }, { bass: 33, notes: [45, 52, 59, 64] }] },
    lofi: { cut: 520, pad: 0.042, sub: 0.15, chordSec: 24, lead: [63, 67, 70, 72, 75, 79], leadEvery: [8, 15], braam: [60, 100], glass: [12, 20],
      noise: 0.009, pulse: 66, epiano: true, chords: [
        { bass: 36, notes: [48, 55, 58, 62, 65] }, { bass: 41, notes: [53, 60, 63, 67] },
        { bass: 37, notes: [49, 56, 60, 63] }, { bass: 31, notes: [43, 53, 59, 63, 65] }] },
    airy: { cut: 820, pad: 0.045, sub: 0.1, chordSec: 26, lead: [79, 81, 83, 86, 88, 91], leadEvery: [7, 13], braam: [60, 100], glass: [9, 18],
      noise: 0.01, pulse: 0, chords: [
        { bass: 43, notes: [55, 62, 66, 69, 74] }, { bass: 40, notes: [52, 59, 63, 66, 71] },
        { bass: 36, notes: [48, 55, 59, 64, 67] }, { bass: 38, notes: [50, 57, 61, 64, 69] }] },
    pulse: { cut: 600, pad: 0.04, sub: 0.2, chordSec: 24, lead: [76, 79, 81, 83, 86], leadEvery: [12, 22], braam: [32, 60], glass: [14, 26],
      noise: 0.005, pulse: 72, chords: [
        { bass: 28, notes: [40, 47, 52, 55, 59] }, { bass: 36, notes: [48, 52, 55, 59] },
        { bass: 31, notes: [43, 50, 55, 59] }, { bass: 26, notes: [38, 45, 50, 54] }] }
  };
  const THEME_OF = { mus_titel: 'warm', mus_imbiss: 'warm', mus_unterstadt: 'groove', mus_kanal: 'dark', mus_bar: 'lofi',
    mus_dach: 'airy', mus_bahn: 'pulse', mus_mittelstadt: 'groove', mus_konzern: 'pulse', mus_casino: 'lofi', mus_klinik: 'airy',
    mus_oberstadt: 'airy', mus_raumhafen: 'pulse', mus_orbit: 'dark', mus_mond: 'dark', mus_kleo: 'warm', mus_finale: 'warm' };

  // ---------- Aufbau ----------
  function impulse(sec, decay) {
    const len = Math.floor(ctx.sampleRate * sec), buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c); let lp = 0;
      for (let i = 0; i < len; i++) {
        lp += (Math.random() * 2 - 1 - lp) * 0.35; // dunkleres Rauschen
        d[i] = lp * Math.pow(1 - i / len, decay);
      }
    }
    return buf;
  }

  function build() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -20; comp.knee.value = 24; comp.ratio.value = 3; comp.attack.value = 0.03; comp.release.value = 0.35;
    master = ctx.createGain(); master.gain.value = 0.9;
    analyser = ctx.createAnalyser(); analyser.fftSize = 2048;
    master.connect(comp); comp.connect(analyser); comp.connect(ctx.destination);

    musicBus = ctx.createGain(); sfxBus = ctx.createGain(); blipBus = ctx.createGain();
    [musicBus, sfxBus, blipBus].forEach(b => b.connect(master));

    const conv = ctx.createConvolver(); conv.buffer = impulse(10, 1.7);
    const revOut = ctx.createGain(); revOut.gain.value = 1.1;
    reverbIn = ctx.createGain(); reverbIn.connect(conv); conv.connect(revOut); revOut.connect(master);

    // weiches Stereo-Echo
    delayIn = ctx.createGain();
    const dl = ctx.createDelay(1.5), dr = ctx.createDelay(1.5), fb = ctx.createGain(), lpf = ctx.createBiquadFilter();
    dl.delayTime.value = 0.39; dr.delayTime.value = 0.58; fb.gain.value = 0.38; lpf.type = 'lowpass'; lpf.frequency.value = 1800;
    const merger = ctx.createChannelMerger(2);
    delayIn.connect(dl); dl.connect(lpf); lpf.connect(dr); dr.connect(fb); fb.connect(dl);
    dl.connect(merger, 0, 0); dr.connect(merger, 0, 1);
    const dout = ctx.createGain(); dout.gain.value = 0.5; merger.connect(dout); dout.connect(master); dout.connect(reverbIn);

    const n = ctx.sampleRate * 2; noiseBuf = ctx.createBuffer(1, n, ctx.sampleRate);
    const nd = noiseBuf.getChannelData(0); let b0 = 0;
    for (let i = 0; i < n; i++) { b0 = 0.97 * b0 + (Math.random() * 2 - 1) * 0.12; nd[i] = b0 * 3; } // rosa-ish
    applyVolumes(true);
  }

  function ensure() {
    if (!ctx) build();
    if (ctx && ctx.state === 'suspended' && !NN.opts.muteAll) ctx.resume();
    if (ctx && pendingTheme) { const t = pendingTheme; pendingTheme = null; startTheme(t); }
    return ctx;
  }

  function applyVolumes(instant) {
    if (!ctx) return;
    const set = (g, v) => { if (instant) g.gain.value = v; else g.gain.setTargetAtTime(v, ctx.currentTime, 0.08); };
    set(musicBus, vol('Music') * 0.55); set(sfxBus, vol('Sfx') * 0.9); set(blipBus, vol('Blips') * 0.8);
    if (fileAudio) fileAudio.volume = Math.min(1, vol('Music') * 0.6);
  }

  // Verbindet einen Klangknoten mit Dry-Bus und Effekten
  function emit(node, bus, wet, echo) {
    node.connect(bus);
    if (wet) { const w = ctx.createGain(); w.gain.value = wet; node.connect(w); w.connect(bus._wet || reverbIn); }
    if (echo) { const e = ctx.createGain(); e.gain.value = echo; node.connect(e); e.connect(delayIn); }
  }

  // ---------- Musik ----------
  function startTheme(name) {
    const key = THEME_OF[name] || 'warm', th = THEMES[key], t0 = ctx.currentTime;
    const s = { name, th, dry: ctx.createGain(), wetIn: ctx.createGain(), timer: null, chord: 0, alive: true, nodes: [],
      nextChord: t0 + 0.3, nextLead: t0 + rnd(th.leadEvery[0] * 0.5, th.leadEvery[0]), nextBraam: t0 + rnd(th.braam[0], th.braam[1]),
      nextGlass: t0 + rnd(th.glass[0], th.glass[1]), nextPulse: t0 + 2, nextRiser: t0 + rnd(22, 40), leadIdx: 2 };
    s.dry.gain.value = 0.0001; s.dry.gain.linearRampToValueAtTime(1, t0 + 8);
    s.wetIn.gain.value = 1; s.dry._wet = s.wetIn; s.dry.connect(musicBus); s.wetIn.connect(reverbIn);
    const old = session; session = s;
    if (old) stopSession(old, 8);
    s.timer = setInterval(() => {
      if (!s.alive) return;
      const now = ctx.currentTime;
      while (s.nextChord < now + 1) { pad(s, s.nextChord, th.chords[s.chord % th.chords.length], th.chordSec); s.nextChord += th.chordSec - 3; s.chord++; }
      if (s.nextLead < now + 1) { lead(s, s.nextLead); s.nextLead += rnd(th.leadEvery[0], th.leadEvery[1]); }
      if (s.nextBraam < now + 1) { braam(s, s.nextBraam, th.chords[(s.chord + 3) % th.chords.length].bass); s.nextBraam += rnd(th.braam[0], th.braam[1]); }
      if (s.nextGlass < now + 1) { glass(s, s.nextGlass); s.nextGlass += rnd(th.glass[0], th.glass[1]); }
      if (s.nextRiser < now + 1) { riser(s, s.nextRiser); s.nextRiser += rnd(45, 80); }
      if (th.pulse) while (s.nextPulse < now + 0.5) { thump(s, s.nextPulse, 0.13); s.nextPulse += 60 / th.pulse; }
    }, 120);
    ambience(s);
  }

  function stopSession(s, fade) {
    s.alive = false; clearInterval(s.timer);
    const t = ctx.currentTime;
    s.dry.gain.cancelScheduledValues(t); s.dry.gain.setValueAtTime(s.dry.gain.value, t); s.dry.gain.linearRampToValueAtTime(0.0001, t + fade);
    s.wetIn.gain.setValueAtTime(s.wetIn.gain.value, t); s.wetIn.gain.linearRampToValueAtTime(0.0001, t + fade + 4);
    setTimeout(() => { try { s.nodes.forEach(n => { try { n.stop(); } catch (e) { /* schon gestoppt */ } }); s.dry.disconnect(); s.wetIn.disconnect(); } catch (e) { /* ignore */ } }, (fade + 12) * 1000);
  }

  // Lange, langsam aufschwellende Akkordfläche mit Sub-Drone
  function pad(s, t, chord, dur) {
    const th = s.th, filter = ctx.createBiquadFilter(), env = ctx.createGain(), att = 10, rel = 11;
    filter.type = 'lowpass'; filter.frequency.value = th.cut; filter.Q.value = 1.3;
    const lfo = ctx.createOscillator(), lg = ctx.createGain(); lfo.frequency.value = 0.025 + Math.random() * 0.03; lg.gain.value = th.cut * 0.55;
    lfo.connect(lg); lg.connect(filter.frequency); lfo.start(t); lfo.stop(t + dur + rel + 1); s.nodes.push(lfo);
    env.gain.setValueAtTime(0.0001, t); env.gain.linearRampToValueAtTime(1, t + att); env.gain.setValueAtTime(1, t + dur - 1); env.gain.linearRampToValueAtTime(0.0001, t + dur + rel);
    chord.notes.forEach(n => {
      [-9, 0, 9].forEach(det => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'sawtooth'; o.frequency.value = mtof(n); o.detune.value = det + rnd(-3, 3); g.gain.value = th.pad / (chord.notes.length * 0.75);
        o.connect(g); g.connect(filter); o.start(t); o.stop(t + dur + rel + 0.1); s.nodes.push(o);
      });
    });
    filter.connect(env); emit(env, s.dry, 1.2, 0.15);
    shimmer(s, t, chord, dur);
    // Sub-Drone: tiefer Sinus plus rauere Oktave
    const bass = mtof(chord.bass), so = ctx.createOscillator(), sg = ctx.createGain(), go = ctx.createOscillator(), gg = ctx.createGain(), gf = ctx.createBiquadFilter();
    so.type = 'sine'; so.frequency.value = bass; go.type = 'sawtooth'; go.frequency.value = bass * 2; go.detune.value = 5;
    gf.type = 'lowpass'; gf.frequency.value = 180;
    sg.gain.setValueAtTime(0.0001, t); sg.gain.linearRampToValueAtTime(th.sub, t + 4); sg.gain.setValueAtTime(th.sub, t + dur - 1); sg.gain.linearRampToValueAtTime(0.0001, t + dur + 5);
    gg.gain.setValueAtTime(0.0001, t); gg.gain.linearRampToValueAtTime(th.sub * 0.18, t + 6); gg.gain.setValueAtTime(th.sub * 0.18, t + dur - 1); gg.gain.linearRampToValueAtTime(0.0001, t + dur + 5);
    so.connect(sg); go.connect(gf); gf.connect(gg); emit(sg, s.dry, 0.08, 0); emit(gg, s.dry, 0.4, 0);
    so.start(t); go.start(t); so.stop(t + dur + 5.2); go.stop(t + dur + 5.2); s.nodes.push(so, go);
  }

  // Hohe, schimmernde Obertöne, die sehr langsam ein- und ausschwellen
  function shimmer(s, t, chord, dur) {
    const top = chord.notes.slice(-3);
    top.forEach((n, i) => {
      [12, 19].forEach(iv => {
        const o = ctx.createOscillator(), g = ctx.createGain(), lfo = ctx.createOscillator(), lg = ctx.createGain(), base = 0.009 / (i + 1);
        o.type = 'sine'; o.frequency.value = mtof(n + iv); o.detune.value = rnd(-6, 6);
        lfo.frequency.value = 0.05 + Math.random() * 0.08; lg.gain.value = base * 0.8; lfo.connect(lg); lg.connect(g.gain);
        g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(base, t + 12); g.gain.setValueAtTime(base, t + dur - 2); g.gain.linearRampToValueAtTime(0.0001, t + dur + 10);
        o.connect(g); emit(g, s.dry, 1.3, 0.5); o.start(t); lfo.start(t); o.stop(t + dur + 10.5); lfo.stop(t + dur + 10.5); s.nodes.push(o, lfo);
      });
    });
  }

  // Langer, dunkler Geräusch-Anstieg wie ein ferner Sturm
  function riser(s, t) {
    const src = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain(), len = rnd(9, 14);
    src.buffer = noiseBuf; f.type = 'bandpass'; f.Q.value = 1.4;
    f.frequency.setValueAtTime(180, t); f.frequency.exponentialRampToValueAtTime(rnd(1400, 2600), t + len * 0.8); f.frequency.exponentialRampToValueAtTime(400, t + len);
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.03, t + len * 0.7); g.gain.exponentialRampToValueAtTime(0.0001, t + len);
    src.connect(f); f.connect(g); emit(g, s.dry, 1.3, 0.3); src.start(t, rnd(0, 1)); src.stop(t + len + 0.1);
  }

  // Tiefer, brassartiger Schwellklang, selten und leise
  function braam(s, t, bassMidi) {
    const f = ctx.createBiquadFilter(), env = ctx.createGain();
    f.type = 'lowpass'; f.Q.value = 2; f.frequency.setValueAtTime(140, t); f.frequency.exponentialRampToValueAtTime(1100, t + 1.1); f.frequency.exponentialRampToValueAtTime(220, t + 5);
    env.gain.setValueAtTime(0.0001, t); env.gain.linearRampToValueAtTime(0.085, t + 0.5); env.gain.exponentialRampToValueAtTime(0.0001, t + 6);
    [0, 7, 12, 19].forEach((iv, k) => {
      [-7, 0, 7].forEach(det => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'sawtooth'; o.frequency.value = mtof(bassMidi + 12 + iv); o.detune.value = det; g.gain.value = k === 0 ? 0.4 : 0.22;
        o.connect(g); g.connect(f); o.start(t); o.stop(t + 6.2); s.nodes.push(o);
      });
    });
    f.connect(env); emit(env, s.dry, 0.9, 0);
  }

  // Weite, einsame Melodielinie (2 bis 4 lange Töne)
  function lead(s, t) {
    const th = s.th, sc = th.lead; if (!sc.length) return;
    const count = Math.floor(rnd(2, 5)); let tt = t;
    for (let k = 0; k < count; k++) {
      s.leadIdx = Math.max(0, Math.min(sc.length - 1, s.leadIdx + pick([-2, -1, -1, 0, 1, 1, 2])));
      const f = mtof(sc[s.leadIdx]), len = rnd(3.2, 5.5), o1 = ctx.createOscillator(), o2 = ctx.createOscillator(), g = ctx.createGain(), lp = ctx.createBiquadFilter();
      const vib = ctx.createOscillator(), vg = ctx.createGain();
      o1.type = th.epiano ? 'triangle' : 'sine'; o2.type = 'triangle'; o1.frequency.value = f; o2.frequency.value = f; o2.detune.value = 6;
      vib.frequency.value = 4.6; vg.gain.value = f * 0.004; vib.connect(vg); vg.connect(o1.frequency); vg.connect(o2.frequency);
      lp.type = 'lowpass'; lp.frequency.value = 2400; const g2 = ctx.createGain(); g2.gain.value = 0.4;
      o1.connect(g); o2.connect(g2); g2.connect(g); g.connect(lp);
      g.gain.setValueAtTime(0.0001, tt); g.gain.linearRampToValueAtTime(0.05, tt + 0.9); g.gain.exponentialRampToValueAtTime(0.0001, tt + len);
      emit(lp, s.dry, 1.3, 0.8);
      [o1, o2, vib].forEach(o => { o.start(tt); o.stop(tt + len + 0.1); });
      tt += rnd(2.6, 4.2);
    }
  }

  // Glasiger, metallischer Einzelton mit langem Nachklang
  function glass(s, t) {
    const base = mtof(pick(s.th.lead) + 12);
    [1, 2.76, 5.4].forEach((m, i) => {
      const o = ctx.createOscillator(), g = ctx.createGain(); o.type = 'sine'; o.frequency.value = base * m;
      g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.022 / (i + 1), t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + 5 - i);
      o.connect(g); emit(g, s.dry, 0.95, 0.6); o.start(t); o.stop(t + 5.2);
    });
  }

  // Tiefer, dumpfer Puls (Herzschlag)
  function thump(s, t, gain) {
    const o = ctx.createOscillator(), g = ctx.createGain(), lp = ctx.createBiquadFilter();
    o.type = 'sine'; o.frequency.setValueAtTime(74, t); o.frequency.exponentialRampToValueAtTime(38, t + 0.4);
    lp.type = 'lowpass'; lp.frequency.value = 160;
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(gain, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
    o.connect(lp); lp.connect(g); emit(g, s.dry, 0.35, 0); o.start(t); o.stop(t + 0.8);
  }

  function ambience(s) {
    const src = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain(), lfo = ctx.createOscillator(), lg = ctx.createGain();
    src.buffer = noiseBuf; src.loop = true; f.type = 'bandpass'; f.frequency.value = 420; f.Q.value = 0.6;
    g.gain.value = s.th.noise * 1.8; lfo.frequency.value = 0.02; lg.gain.value = 320; lfo.connect(lg); lg.connect(f.frequency);
    src.connect(f); f.connect(g); emit(g, s.dry, 0.4, 0); src.start(); lfo.start(); s.nodes.push(src, lfo);
  }

  function playMusic(name) {
    if (!name) return;
    if (session && session.name === name) return;
    tryFile(name);
    if (!ctx || ctx.state === 'suspended') { pendingTheme = name; ensure(); return; }
    startTheme(name);
  }

  // Optional: echte Musikdatei hat Vorrang
  function tryFile(name) {
    if (fileAudio) { fileAudio.pause(); fileAudio = null; }
    const a = new Audio(); a.loop = true; a.preload = 'auto';
    let triedMp3 = false;
    a.addEventListener('error', () => { if (!triedMp3) { triedMp3 = true; a.src = 'assets/audio/music/' + name + '.mp3'; } });
    a.addEventListener('canplaythrough', () => {
      if (fileAudio === a) return;
      fileAudio = a; a.volume = Math.min(1, vol('Music') * 0.6);
      if (session) { stopSession(session, 2); session = null; }
      const p = a.play(); if (p && p.catch) p.catch(() => {});
    }, { once: true });
    a.src = 'assets/audio/music/' + name + '.ogg';
  }

  // ---------- Effekte (alle weich, ohne Rechteckwellen) ----------
  function tone(type, f0, f1, len, peak, bus, wet, echo, attack) {
    const c = ensure(); if (!c) return;
    const o = ctx.createOscillator(), g = ctx.createGain(), lp = ctx.createBiquadFilter(), t = ctx.currentTime;
    o.type = type; o.frequency.setValueAtTime(f0, t); if (f1) o.frequency.exponentialRampToValueAtTime(f1, t + len);
    lp.type = 'lowpass'; lp.frequency.value = 2600;
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(peak, t + (attack || 0.008)); g.gain.exponentialRampToValueAtTime(0.0001, t + len);
    o.connect(lp); lp.connect(g); g.connect(bus);
    if (wet) { const w = ctx.createGain(); w.gain.value = wet; g.connect(w); w.connect(reverbIn); }
    if (echo) { const e = ctx.createGain(); e.gain.value = echo; g.connect(e); e.connect(delayIn); }
    o.start(t); o.stop(t + len + 0.05);
  }

  const PENTA = [0, 2, 4, 7, 9];
  return {
    ensure, playMusic, applyVolumes, stats() {
      if (!analyser) return null;
      const d = new Float32Array(analyser.fftSize); analyser.getFloatTimeDomainData(d);
      let pk = 0, sum = 0; for (const v of d) { pk = Math.max(pk, Math.abs(v)); sum += v * v; }
      return { peak: pk, rms: Math.sqrt(sum / d.length), state: ctx.state };
    },
    applyMusicVolume() { applyVolumes(false); },
    // Sprech-Ton: weiche Marimba-Note aus einer Pentatonik, sehr leise
    blip(pitch) {
      if (!ensure() || !vol('Blips')) return;
      const base = 60 + 12 * Math.log2(Math.max(0.3, pitch || 1));
      let m = Math.round(base) + pick(PENTA); if (Math.abs(m - lastBlipMidi) > 9) m = lastBlipMidi + pick([-2, 2, 4]); lastBlipMidi = m;
      tone('sine', mtof(m), 0, 0.22, 0.05, blipBus, 0.5, 0.15, 0.006);
      tone('sine', mtof(m) * 2, 0, 0.12, 0.012, blipBus, 0.3, 0, 0.004);
    },
    click() { tone('sine', 620, 430, 0.09, 0.045, sfxBus, 0.2, 0, 0.01); },
    pickup() { tone('sine', mtof(84), 0, 0.9, 0.06, sfxBus, 0.8, 0.4, 0.008); setTimeout(() => tone('sine', mtof(91), 0, 1.1, 0.05, sfxBus, 0.8, 0.4, 0.008), 110); setTimeout(() => tone('sine', mtof(96), 0, 1.3, 0.035, sfxBus, 0.9, 0.5, 0.008), 230); },
    fail() { tone('sine', 190, 120, 0.22, 0.05, sfxBus, 0.25, 0, 0.012); },
    scan() { tone('sine', 380, 1500, 1.2, 0.05, sfxBus, 0.7, 0.45, 0.25); tone('triangle', 760, 3000, 1.2, 0.012, sfxBus, 0.7, 0.3, 0.25); },
    whoosh() {
      if (!ensure()) return;
      const src = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain(), t = ctx.currentTime;
      src.buffer = noiseBuf; f.type = 'bandpass'; f.Q.value = 0.9; f.frequency.setValueAtTime(300, t); f.frequency.exponentialRampToValueAtTime(1600, t + 0.35);
      g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.07, t + 0.12); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
      src.connect(f); f.connect(g); g.connect(sfxBus); src.start(t, rnd(0, 1)); src.stop(t + 0.5);
    },
    setMuted(flag) {
      if (!ctx) return;
      if (flag) ctx.suspend(); else ctx.resume();
      if (fileAudio) { if (flag) fileAudio.pause(); else { const p = fileAudio.play(); if (p && p.catch) p.catch(() => {}); } }
    }
  };
})();

// Audio erst nach der ersten Benutzeraktion starten (Browser-Vorgabe)
['pointerdown', 'keydown'].forEach(ev => window.addEventListener(ev, () => NN.audio.ensure(), { once: false, passive: true }));
