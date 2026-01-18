import { GAME_WIDTH, GAME_HEIGHT, POINTS } from '../config/GameConfig.js';
import { CLINTON_HILL } from '../config/LevelConfig.js';
import { gameState } from '../managers/GameStateManager.js';
import { audioManager } from '../utils/ChiptuneGenerator.js';

export class LevelCompleteScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelCompleteScene' });
    }

    create() {
        const level = CLINTON_HILL;
        const scores = gameState.getLevelScore();

        // Background
        this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x1a1a2e);

        // Level complete text
        this.add.text(GAME_WIDTH / 2, 50, 'LEVEL COMPLETE!', {
            fontFamily: 'monospace',
            fontSize: '36px',
            color: '#00ff00',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.add.text(GAME_WIDTH / 2, 90, level.name.toUpperCase(), {
            fontFamily: 'monospace',
            fontSize: '24px',
            color: '#f878f8',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        // Score breakdown
        const scoreItems = [
            { label: 'COINS:', value: `${gameState.coinsCollected} x ${POINTS.COIN} = ${scores.coins}`, icon: 'coin' },
            { label: 'PRETZELS:', value: `${gameState.pretzelsCollected} x ${POINTS.PRETZEL} = ${scores.pretzels}`, icon: 'pretzel' },
            { label: 'POOPS SCOOPED:', value: `${gameState.poopsScooped} x ${POINTS.POOP_BAG} = ${scores.poopsScooped}`, icon: 'poop_bag' },
            { label: 'TIME BONUS:', value: `${Math.floor(gameState.timeRemaining)}s x ${POINTS.TIME_BONUS_MULTIPLIER} = ${scores.timeBonus}`, icon: null }
        ];

        let yOffset = 140;
        scoreItems.forEach((item, index) => {
            // Animate in with delay
            const row = this.add.container(GAME_WIDTH / 2, yOffset);
            row.setAlpha(0);

            if (item.icon) {
                const icon = this.add.image(-180, 0, item.icon).setScale(2);
                row.add(icon);
            }

            const label = this.add.text(-140, 0, item.label, {
                fontFamily: 'monospace',
                fontSize: '18px',
                color: '#fcfcfc',
                stroke: '#000000',
                strokeThickness: 2
            }).setOrigin(0, 0.5);
            row.add(label);

            const value = this.add.text(140, 0, item.value, {
                fontFamily: 'monospace',
                fontSize: '18px',
                color: '#fcfc00',
                stroke: '#000000',
                strokeThickness: 2
            }).setOrigin(1, 0.5);
            row.add(value);

            this.tweens.add({
                targets: row,
                alpha: 1,
                x: GAME_WIDTH / 2,
                duration: 300,
                delay: index * 400
            });

            yOffset += 40;
        });

        // Total score
        const totalY = yOffset + 30;
        const totalRow = this.add.container(GAME_WIDTH / 2, totalY);
        totalRow.setAlpha(0);

        const totalLabel = this.add.text(-100, 0, 'TOTAL SCORE:', {
            fontFamily: 'monospace',
            fontSize: '24px',
            color: '#00ff00',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0, 0.5);
        totalRow.add(totalLabel);

        const totalValue = this.add.text(140, 0, gameState.score.toString(), {
            fontFamily: 'monospace',
            fontSize: '24px',
            color: '#fcfc00',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(1, 0.5);
        totalRow.add(totalValue);

        this.tweens.add({
            targets: totalRow,
            alpha: 1,
            duration: 500,
            delay: scoreItems.length * 400 + 200
        });

        // Add time bonus to score
        gameState.addScore(scores.timeBonus);

        // Check for high score
        const isHighScore = gameState.saveHighScore();
        if (isHighScore) {
            const highScoreText = this.add.text(GAME_WIDTH / 2, totalY + 50, 'NEW HIGH SCORE!', {
                fontFamily: 'monospace',
                fontSize: '20px',
                color: '#ff4444'
            }).setOrigin(0.5).setAlpha(0);

            this.tweens.add({
                targets: highScoreText,
                alpha: 1,
                scaleX: 1.2,
                scaleY: 1.2,
                duration: 300,
                delay: scoreItems.length * 400 + 600,
                yoyo: true,
                repeat: 2
            });
        }

        // Continue prompt
        const continueText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT - 50, 'PRESS SPACE TO CONTINUE', {
            fontFamily: 'monospace',
            fontSize: '18px',
            color: '#fcfc00',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5).setAlpha(0);

        this.tweens.add({
            targets: continueText,
            alpha: 1,
            duration: 500,
            delay: scoreItems.length * 400 + 800
        });

        this.tweens.add({
            targets: continueText,
            alpha: 0.3,
            duration: 500,
            delay: scoreItems.length * 400 + 1300,
            yoyo: true,
            repeat: -1
        });

        // Input handling (delayed)
        this.time.delayedCall(scoreItems.length * 400 + 800, () => {
            this.input.keyboard.once('keydown-SPACE', () => {
                audioManager.playMenuSelect();
                // For now, go back to title (only Level 1 implemented)
                this.scene.start('TitleScene');
            });

            this.input.keyboard.once('keydown-ENTER', () => {
                audioManager.playMenuSelect();
                this.scene.start('TitleScene');
            });
        });
    }
}
