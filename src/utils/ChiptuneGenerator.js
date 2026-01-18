// Web Audio API chiptune sound generator
export class ChiptuneGenerator {
    constructor() {
        this.audioContext = null;
        this.masterGain = null;
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;

        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.audioContext.createGain();
        this.masterGain.gain.value = 0.3;
        this.masterGain.connect(this.audioContext.destination);
        this.initialized = true;
    }

    resume() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }

    // Create oscillator with envelope
    createOscillator(type, frequency, duration, startTime = 0) {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = type;
        osc.frequency.value = frequency;
        osc.connect(gain);
        gain.connect(this.masterGain);

        const now = this.audioContext.currentTime + startTime;
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

        osc.start(now);
        osc.stop(now + duration);

        return osc;
    }

    // Play a simple note
    playNote(frequency, duration = 0.1, type = 'square') {
        this.init();
        this.createOscillator(type, frequency, duration);
    }

    // Sound effects
    playJump() {
        this.init();
        const now = this.audioContext.currentTime;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);

        osc.connect(gain);
        gain.connect(this.masterGain);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

        osc.start(now);
        osc.stop(now + 0.15);
    }

    playCoin() {
        this.init();
        this.createOscillator('square', 988, 0.05); // B5
        this.createOscillator('square', 1319, 0.1, 0.05); // E6
    }

    playPretzel() {
        this.init();
        this.createOscillator('triangle', 880, 0.08); // A5
    }

    playDamage() {
        this.init();
        const now = this.audioContext.currentTime;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.3);

        osc.connect(gain);
        gain.connect(this.masterGain);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

        osc.start(now);
        osc.stop(now + 0.3);
    }

    playScoop() {
        this.init();
        // Triumphant sound
        this.createOscillator('square', 523, 0.1); // C5
        this.createOscillator('square', 659, 0.1, 0.1); // E5
        this.createOscillator('square', 784, 0.15, 0.2); // G5
    }

    playSplash() {
        this.init();
        const now = this.audioContext.currentTime;

        // Noise-like splash using multiple oscillators
        for (let i = 0; i < 5; i++) {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();

            osc.type = 'triangle';
            osc.frequency.value = 100 + Math.random() * 200;

            osc.connect(gain);
            gain.connect(this.masterGain);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

            osc.start(now);
            osc.stop(now + 0.2);
        }
    }

    playPowerUp() {
        this.init();
        // Ascending arpeggio
        const notes = [262, 330, 392, 523]; // C4, E4, G4, C5
        notes.forEach((freq, i) => {
            this.createOscillator('square', freq, 0.1, i * 0.08);
        });
    }

    playMenuSelect() {
        this.init();
        this.createOscillator('square', 440, 0.05);
        this.createOscillator('square', 880, 0.1, 0.05);
    }

    playLevelComplete() {
        this.init();
        // Victory fanfare
        const melody = [
            { freq: 523, dur: 0.15 },  // C5
            { freq: 659, dur: 0.15 },  // E5
            { freq: 784, dur: 0.15 },  // G5
            { freq: 1047, dur: 0.3 }   // C6
        ];
        let time = 0;
        melody.forEach(note => {
            this.createOscillator('square', note.freq, note.dur, time);
            time += note.dur;
        });
    }

    playGameOver() {
        this.init();
        // Sad descending
        const melody = [
            { freq: 392, dur: 0.2 },   // G4
            { freq: 349, dur: 0.2 },   // F4
            { freq: 330, dur: 0.2 },   // E4
            { freq: 262, dur: 0.4 }    // C4
        ];
        let time = 0;
        melody.forEach(note => {
            this.createOscillator('triangle', note.freq, note.dur, time);
            time += note.dur;
        });
    }

    // Background music - Kraftwerk-inspired loop
    startBackgroundMusic() {
        this.init();
        if (this.musicInterval) return;

        const bpm = 120;
        const beatDuration = 60 / bpm;
        let beat = 0;

        // Bass pattern (C-C-G-G)
        const bassPattern = [131, 131, 196, 196]; // C3, G3
        // Melody pattern
        const melodyPattern = [523, 0, 659, 0, 784, 0, 659, 0]; // C5, E5, G5

        this.musicInterval = setInterval(() => {
            const now = this.audioContext.currentTime;

            // Bass
            if (beat % 2 === 0) {
                const bassNote = bassPattern[Math.floor(beat / 2) % bassPattern.length];
                const osc = this.audioContext.createOscillator();
                const gain = this.audioContext.createGain();
                osc.type = 'triangle';
                osc.frequency.value = bassNote;
                osc.connect(gain);
                gain.connect(this.masterGain);
                gain.gain.setValueAtTime(0.15, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + beatDuration * 0.8);
                osc.start(now);
                osc.stop(now + beatDuration * 0.8);
            }

            // Melody (every other beat)
            const melodyNote = melodyPattern[beat % melodyPattern.length];
            if (melodyNote > 0) {
                const osc = this.audioContext.createOscillator();
                const gain = this.audioContext.createGain();
                osc.type = 'square';
                osc.frequency.value = melodyNote;
                osc.connect(gain);
                gain.connect(this.masterGain);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + beatDuration * 0.5);
                osc.start(now);
                osc.stop(now + beatDuration * 0.5);
            }

            // Hi-hat style click
            if (beat % 2 === 1) {
                const osc = this.audioContext.createOscillator();
                const gain = this.audioContext.createGain();
                osc.type = 'square';
                osc.frequency.value = 1200;
                osc.connect(gain);
                gain.connect(this.masterGain);
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                osc.start(now);
                osc.stop(now + 0.05);
            }

            beat++;
        }, beatDuration * 1000 / 2); // Half-beats
    }

    stopBackgroundMusic() {
        if (this.musicInterval) {
            clearInterval(this.musicInterval);
            this.musicInterval = null;
        }
    }

    setVolume(value) {
        if (this.masterGain) {
            this.masterGain.gain.value = Math.max(0, Math.min(1, value));
        }
    }
}

// Singleton instance
export const audioManager = new ChiptuneGenerator();
