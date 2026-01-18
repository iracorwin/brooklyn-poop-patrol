import { GAME_WIDTH, GAME_HEIGHT } from '../config/GameConfig.js';
import { gameState } from '../managers/GameStateManager.js';
import { audioManager } from '../utils/ChiptuneGenerator.js';

export class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    create() {
        // Background
        this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x1a1a2e);

        // Game over text
        const gameOverText = this.add.text(GAME_WIDTH / 2, 100, 'GAME OVER', {
            fontFamily: 'monospace',
            fontSize: '48px',
            color: '#ff0000',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        // Shake effect
        this.tweens.add({
            targets: gameOverText,
            x: GAME_WIDTH / 2 + 5,
            duration: 50,
            yoyo: true,
            repeat: 5
        });

        // Sad player
        const player = this.add.image(GAME_WIDTH / 2, 200, 'player_hit');
        player.setScale(6);

        // Poop around player
        this.add.image(GAME_WIDTH / 2 - 80, 230, 'poop').setScale(3);
        this.add.image(GAME_WIDTH / 2 + 80, 240, 'poop').setScale(2.5);
        this.add.image(GAME_WIDTH / 2 + 40, 250, 'poop').setScale(2);

        // Final score
        this.add.text(GAME_WIDTH / 2, 300, `FINAL SCORE: ${gameState.score}`, {
            fontFamily: 'monospace',
            fontSize: '24px',
            color: '#fcfc00',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        // High score
        const highScore = gameState.getHighScore();
        const isHighScore = gameState.saveHighScore();

        if (isHighScore) {
            const newHighText = this.add.text(GAME_WIDTH / 2, 340, 'NEW HIGH SCORE!', {
                fontFamily: 'monospace',
                fontSize: '20px',
                color: '#00ff00'
            }).setOrigin(0.5);

            this.tweens.add({
                targets: newHighText,
                scaleX: 1.1,
                scaleY: 1.1,
                duration: 300,
                yoyo: true,
                repeat: -1
            });
        } else {
            this.add.text(GAME_WIDTH / 2, 340, `HIGH SCORE: ${highScore}`, {
                fontFamily: 'monospace',
                fontSize: '18px',
                color: '#888888'
            }).setOrigin(0.5);
        }

        // Menu options
        const retryText = this.add.text(GAME_WIDTH / 2, 400, 'PRESS SPACE TO RETRY', {
            fontFamily: 'monospace',
            fontSize: '20px',
            color: '#fcfc00',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);

        this.tweens.add({
            targets: retryText,
            alpha: 0.3,
            duration: 500,
            yoyo: true,
            repeat: -1
        });

        this.add.text(GAME_WIDTH / 2, 430, 'PRESS Q FOR TITLE', {
            fontFamily: 'monospace',
            fontSize: '16px',
            color: '#888888'
        }).setOrigin(0.5);

        // Input handling
        this.input.keyboard.once('keydown-SPACE', () => {
            audioManager.playMenuSelect();
            gameState.reset();
            this.scene.start('LevelIntroScene');
        });

        this.input.keyboard.once('keydown-ENTER', () => {
            audioManager.playMenuSelect();
            gameState.reset();
            this.scene.start('LevelIntroScene');
        });

        this.input.keyboard.once('keydown-Q', () => {
            audioManager.playMenuSelect();
            this.scene.start('TitleScene');
        });
    }
}
