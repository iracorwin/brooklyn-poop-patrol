import { GAME_WIDTH, GAME_HEIGHT } from '../config/GameConfig.js';
import { CLINTON_HILL } from '../config/LevelConfig.js';
import { gameState } from '../managers/GameStateManager.js';
import { audioManager } from '../utils/ChiptuneGenerator.js';

export class StoreTransitionScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StoreTransitionScene' });
    }

    create() {
        const level = CLINTON_HILL;

        // Background
        this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x1a1a2e);

        // Store image
        const store = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 40, 'store_mrcoco');
        store.setScale(3);

        // Store name
        this.add.text(GAME_WIDTH / 2, 60, level.storeName.toUpperCase(), {
            fontFamily: 'monospace',
            fontSize: '36px',
            color: '#00ff00',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        // Buying text
        const buyingText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT - 120, 'BUYING POOP BAGS...', {
            fontFamily: 'monospace',
            fontSize: '24px',
            color: '#fcfc00',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        // Animate dots
        let dots = 0;
        this.time.addEvent({
            delay: 400,
            callback: () => {
                dots = (dots + 1) % 4;
                buyingText.setText('BUYING POOP BAGS' + '.'.repeat(dots));
            },
            loop: true
        });

        // Show bag count
        const bagIcon = this.add.image(GAME_WIDTH / 2 - 40, GAME_HEIGHT - 60, 'poop_bag');
        bagIcon.setScale(3);

        const bagText = this.add.text(GAME_WIDTH / 2 + 20, GAME_HEIGHT - 60, `x ${level.bagCount}`, {
            fontFamily: 'monospace',
            fontSize: '28px',
            color: '#40ff40',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0, 0.5);

        // Play purchase sound
        audioManager.playCoin();

        // Transition to phase 2 after delay
        this.time.delayedCall(3000, () => {
            gameState.transitionToPhase2();
            audioManager.playMenuSelect();
            this.scene.start('GameScene');
        });
    }
}
