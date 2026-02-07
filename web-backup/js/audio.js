/**
 * VibeQuest Procedural Audio Engine
 * All sounds generated with Web Audio API - no external files
 */

let ctx, masterGain, ambientNode;

function initAudio() {
    if (ctx) return;
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = ctx.createGain();
    masterGain.gain.value = 0.4;
    masterGain.connect(ctx.destination);
}

// Sonar ping - descending sine sweep (scan)
function playSonar() {
    if (!ctx) initAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.4);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    osc.connect(gain).connect(masterGain);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
}

// Move beep - short clean tone
function playMove() {
    if (!ctx) initAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 520;
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
    osc.connect(gain).connect(masterGain);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
}

// Wall thud - low frequency impact
function playWall() {
    if (!ctx) initAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(80, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    osc.connect(gain).connect(masterGain);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
}

// Hazard buzz - warning tremolo
function playHazard() {
    if (!ctx) initAudio();
    const osc = ctx.createOscillator();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = 180;
    lfo.type = 'sine';
    lfo.frequency.value = 12;
    lfoGain.gain.value = 0.4;
    gain.gain.value = 0.25;
    lfo.connect(lfoGain).connect(gain.gain);
    osc.connect(gain).connect(masterGain);
    lfo.start(); osc.start();
    osc.stop(ctx.currentTime + 0.35);
    lfo.stop(ctx.currentTime + 0.35);
}

// Reset thud - heavy impact
function playReset() {
    if (!ctx) initAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(60, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(25, ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.6, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    osc.connect(gain).connect(masterGain);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
}

// Win chime - ascending arpeggio
function playWin() {
    if (!ctx) initAudio();
    [523, 659, 784, 1047].forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = f;
        const t = ctx.currentTime + i * 0.12;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.25, t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);
        osc.connect(gain).connect(masterGain);
        osc.start(t);
        osc.stop(t + 0.35);
    });
}

// Turn click - short noise burst
function playTurn() {
    if (!ctx) initAudio();
    const bufSize = ctx.sampleRate * 0.015;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) d[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    const gain = ctx.createGain();
    noise.buffer = buf;
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.015);
    noise.connect(gain).connect(masterGain);
    noise.start();
}

// Ambient ocean - looping filtered noise
function startAmbient() {
    if (!ctx) initAudio();
    if (ambientNode) return;
    const bufSize = ctx.sampleRate * 2;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) d[i] = Math.random() * 2 - 1;
    ambientNode = ctx.createBufferSource();
    ambientNode.buffer = buf;
    ambientNode.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 120;
    const gain = ctx.createGain();
    gain.gain.value = 0.06;
    ambientNode.connect(filter).connect(gain).connect(masterGain);
    ambientNode.start();
}

function stopAmbient() {
    if (ambientNode) { ambientNode.stop(); ambientNode = null; }
}

function setVolume(v) {
    if (masterGain) masterGain.gain.value = v;
}

// Expose globally
window.initAudio = initAudio;
window.playSonar = playSonar;
window.playMove = playMove;
window.playWall = playWall;
window.playHazard = playHazard;
window.playReset = playReset;
window.playWin = playWin;
window.playTurn = playTurn;
window.startAmbient = startAmbient;
window.stopAmbient = stopAmbient;
window.setVolume = setVolume;
