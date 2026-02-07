/**
 * VibeQuest Audio-Based Haptics
 * Uses low-frequency audio to create physical vibration through phone speaker
 * Works on iOS Safari where navigator.vibrate is blocked!
 */

let ctx, hapticGain;

function initHaptics() {
    if (ctx) return;
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    hapticGain = ctx.createGain();
    hapticGain.gain.value = 1.0; // Full volume for max vibration
    hapticGain.connect(ctx.destination);
}

// Resume audio context (required for iOS)
function resumeAudio() {
    if (ctx && ctx.state === 'suspended') {
        ctx.resume();
    }
}

// Low rumble - creates physical vibration
function playRumble(freq, duration, intensity) {
    if (!ctx) initHaptics();
    resumeAudio();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.value = freq; // Low frequencies vibrate the speaker

    gain.gain.setValueAtTime(intensity, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.connect(gain).connect(hapticGain);
    osc.start();
    osc.stop(ctx.currentTime + duration);
}

// Impact haptics - short low-frequency burst
window.hapticImpact = function (style = 'medium') {
    const settings = {
        light: { freq: 60, dur: 0.05, int: 0.6 },
        medium: { freq: 45, dur: 0.08, int: 0.8 },
        heavy: { freq: 30, dur: 0.15, int: 1.0 }
    };
    const s = settings[style] || settings.medium;
    playRumble(s.freq, s.dur, s.int);
};

// Notification haptics - patterned pulses
window.hapticNotify = function (type = 'success') {
    if (!ctx) initHaptics();
    resumeAudio();

    const patterns = {
        success: [ // Two quick rising pulses
            { freq: 50, dur: 0.06, int: 0.7, delay: 0 },
            { freq: 70, dur: 0.08, int: 0.9, delay: 0.1 }
        ],
        warning: [ // Three quick pulses
            { freq: 40, dur: 0.05, int: 0.8, delay: 0 },
            { freq: 40, dur: 0.05, int: 0.8, delay: 0.08 },
            { freq: 40, dur: 0.05, int: 0.8, delay: 0.16 }
        ],
        error: [ // Two heavy thuds
            { freq: 25, dur: 0.12, int: 1.0, delay: 0 },
            { freq: 25, dur: 0.15, int: 1.0, delay: 0.15 }
        ]
    };

    const pattern = patterns[type] || patterns.success;
    pattern.forEach(p => {
        setTimeout(() => playRumble(p.freq, p.dur, p.int), p.delay * 1000);
    });
};

// Selection haptic - tiny tick
window.hapticSelection = function () {
    playRumble(80, 0.02, 0.5);
};

// Volume control
window.setHapticVolume = function (v) {
    if (hapticGain) hapticGain.gain.value = v;
};

// Initialize on first user interaction (required for iOS)
document.addEventListener('touchstart', initHaptics, { once: true });
document.addEventListener('click', initHaptics, { once: true });
