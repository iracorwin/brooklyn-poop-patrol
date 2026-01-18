import { GAME_WIDTH, GAME_HEIGHT, COLORS } from '../config/GameConfig.js';
import { gameState } from '../managers/GameStateManager.js';
import { audioManager } from '../utils/ChiptuneGenerator.js';

export class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' });
    }

    create() {
        // Background
        this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, COLORS.SKY_BLUE);

        // Ground
        this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT - 25, GAME_WIDTH, 50, 0x888888);

        // Title text with shadow
        this.add.text(GAME_WIDTH / 2 + 3, 83, 'BROOKLYN', {
            fontFamily: 'monospace',
            fontSize: '48px',
            color: '#000000'
        }).setOrigin(0.5);

        this.add.text(GAME_WIDTH / 2, 80, 'BROOKLYN', {
            fontFamily: 'monospace',
            fontSize: '48px',
            color: '#f878f8'
        }).setOrigin(0.5);

        this.add.text(GAME_WIDTH / 2 + 3, 133, 'POOP PATROL', {
            fontFamily: 'monospace',
            fontSize: '48px',
            color: '#000000'
        }).setOrigin(0.5);

        this.add.text(GAME_WIDTH / 2, 130, 'POOP PATROL', {
            fontFamily: 'monospace',
            fontSize: '48px',
            color: '#fcfc00'
        }).setOrigin(0.5);

        // Decorative elements
        this.add.image(150, GAME_HEIGHT - 80, 'player_idle').setScale(4);
        this.add.image(650, GAME_HEIGHT - 60, 'poop').setScale(3);
        this.add.image(580, GAME_HEIGHT - 60, 'poop').setScale(2.5);
        this.add.image(720, GAME_HEIGHT - 60, 'poop').setScale(2);

        // Pigeon
        const pigeon = this.add.image(500, 120, 'pigeon_fly').setScale(3);
        this.tweens.add({
            targets: pigeon,
            x: 300,
            y: 100,
            duration: 3000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // High score
        const highScore = gameState.getHighScore();
        this.add.text(GAME_WIDTH / 2, 200, `HIGH SCORE: ${highScore}`, {
            fontFamily: 'monospace',
            fontSize: '20px',
            color: '#fcfcfc',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        // Instructions
        this.add.text(GAME_WIDTH / 2, 280, 'ARROW KEYS TO MOVE', {
            fontFamily: 'monospace',
            fontSize: '16px',
            color: '#fcfcfc',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);

        this.add.text(GAME_WIDTH / 2, 305, 'UP TO JUMP', {
            fontFamily: 'monospace',
            fontSize: '16px',
            color: '#fcfcfc',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);

        this.add.text(GAME_WIDTH / 2, 330, 'DOWN TO SCOOP POOP', {
            fontFamily: 'monospace',
            fontSize: '16px',
            color: '#fcfcfc',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);

        // Start prompt (blinking)
        const startText = this.add.text(GAME_WIDTH / 2, 390, 'PRESS SPACE TO START', {
            fontFamily: 'monospace',
            fontSize: '24px',
            color: '#fcfc00',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        this.tweens.add({
            targets: startText,
            alpha: 0.3,
            duration: 500,
            yoyo: true,
            repeat: -1
        });

        // Input handling
        this.input.keyboard.once('keydown-SPACE', () => {
            audioManager.init();
            audioManager.resume();
            audioManager.playMenuSelect();
            gameState.reset();
            this.scene.start('LevelIntroScene');
        });

        // Also allow Enter
        this.input.keyboard.once('keydown-ENTER', () => {
            audioManager.init();
            audioManager.resume();
            audioManager.playMenuSelect();
            gameState.reset();
            this.scene.start('LevelIntroScene');
        });
    }
}
