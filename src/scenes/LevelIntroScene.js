import { GAME_WIDTH, GAME_HEIGHT, COLORS } from '../config/GameConfig.js';
import { CLINTON_HILL } from '../config/LevelConfig.js';
import { gameState } from '../managers/GameStateManager.js';
import { audioManager } from '../utils/ChiptuneGenerator.js';

export class LevelIntroScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelIntroScene' });
    }

    create() {
        const level = CLINTON_HILL;

        // Background
        this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x1a1a2e);

        // Level number
        this.add.text(GAME_WIDTH / 2, 120, `LEVEL ${level.number}`, {
            fontFamily: 'monospace',
            fontSize: '32px',
            color: '#fcfc00',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setAlpha(0);

        // Neighborhood name
        const nameText = this.add.text(GAME_WIDTH / 2, 180, level.name.toUpperCase(), {
            fontFamily: 'monospace',
            fontSize: '48px',
            color: '#f878f8',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setAlpha(0);

        // Mission info
        const missionText = this.add.text(GAME_WIDTH / 2, 260, `GET TO ${level.storeName.toUpperCase()}`, {
            fontFamily: 'monospace',
            fontSize: '20px',
            color: '#fcfcfc',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5).setAlpha(0);

        const missionText2 = this.add.text(GAME_WIDTH / 2, 290, 'AND BUY POOP BAGS!', {
            fontFamily: 'monospace',
            fontSize: '20px',
            color: '#fcfcfc',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5).setAlpha(0);

        // Hazard info
        const hazardText = this.add.text(GAME_WIDTH / 2, 340, `${level.poopCount} POOPS TO AVOID!`, {
            fontFamily: 'monospace',
            fontSize: '16px',
            color: '#bc7000',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5).setAlpha(0);

        // Animate in
        const elements = [
            this.children.list[1], // Level number
            nameText,
            missionText,
            missionText2,
            hazardText
        ];

        elements.forEach((el, index) => {
            this.tweens.add({
                targets: el,
                alpha: 1,
                y: el.y,
                duration: 500,
                delay: index * 200,
                ease: 'Back.easeOut'
            });
        });

        // Ready text
        const readyText = this.add.text(GAME_WIDTH / 2, 400, 'GET READY...', {
            fontFamily: 'monospace',
            fontSize: '24px',
            color: '#00ff00'
        }).setOrigin(0.5).setAlpha(0);

        this.tweens.add({
            targets: readyText,
            alpha: 1,
            duration: 500,
            delay: 1500
        });

        // Start level after delay
        this.time.delayedCall(3000, () => {
            gameState.startLevel(level);
            this.scene.start('GameScene');
        });
    }
}
