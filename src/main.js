import { GAME_WIDTH, GAME_HEIGHT } from './config/GameConfig.js';
import { BootScene } from './scenes/BootScene.js';
import { TitleScene } from './scenes/TitleScene.js';
import { LevelIntroScene } from './scenes/LevelIntroScene.js';
import { GameScene } from './scenes/GameScene.js';
import { StoreTransitionScene } from './scenes/StoreTransitionScene.js';
import { LevelCompleteScene } from './scenes/LevelCompleteScene.js';
import { GameOverScene } from './scenes/GameOverScene.js';

// Phaser game configuration
const config = {
    type: Phaser.AUTO,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    parent: 'game-container',
    pixelArt: true,
    backgroundColor: '#1a1a2e',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },
    scene: [
        BootScene,
        TitleScene,
        LevelIntroScene,
        GameScene,
        StoreTransitionScene,
        LevelCompleteScene,
        GameOverScene
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

// Create and start the game
const game = new Phaser.Game(config);

// Handle window focus/blur for audio
window.addEventListener('blur', () => {
    if (game.scene.isActive('GameScene')) {
        // Optionally pause game when window loses focus
    }
});

window.addEventListener('focus', () => {
    // Resume audio context if needed
    const audioContext = window.AudioContext || window.webkitAudioContext;
    if (audioContext) {
        // Audio will be resumed on next user interaction
    }
});
