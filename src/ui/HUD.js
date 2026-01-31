import { GAME_WIDTH, LIVES } from '../config/GameConfig.js';
import { gameState } from '../managers/GameStateManager.js';

export class HUD {
    constructor(scene) {
        this.scene = scene;
        this.hearts = [];
        this.scoreText = null;
        this.timerText = null;
        this.bagsText = null;
        this.bagsIcon = null;
        this.outOfBagsWarning = null;
        this.outOfBagsShownTime = null;
    }

    create() {
        // Hearts (top-left)
        this.createHearts();

        // Timer (top-center)
        this.timerText = this.scene.add.text(GAME_WIDTH / 2, 16, '2:00', {
            fontFamily: 'monospace',
            fontSize: '24px',
            color: '#fcfcfc',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(100);

        // Score (top-right)
        this.scoreText = this.scene.add.text(GAME_WIDTH - 16, 16, 'SCORE: 0', {
            fontFamily: 'monospace',
            fontSize: '18px',
            color: '#fcfc00',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(1, 0).setScrollFactor(0).setDepth(100);

        // Bags (below hearts, only shown in Phase 2)
        this.bagsIcon = this.scene.add.image(20, 60, 'poop_bag');
        this.bagsIcon.setScale(2).setScrollFactor(0).setDepth(100);
        this.bagsIcon.setVisible(false);

        this.bagsText = this.scene.add.text(44, 52, 'x 10', {
            fontFamily: 'monospace',
            fontSize: '18px',
            color: '#40ff40',
            stroke: '#000000',
            strokeThickness: 3
        }).setScrollFactor(0).setDepth(100);
        this.bagsText.setVisible(false);

        // Out of bags warning (center screen)
        this.outOfBagsWarning = this.scene.add.text(GAME_WIDTH / 2, 120, 'OUT OF BAGS!', {
            fontFamily: 'monospace',
            fontSize: '32px',
            color: '#ff0000',
            stroke: '#000000',
            strokeThickness: 5
        }).setOrigin(0.5).setScrollFactor(0).setDepth(150);
        this.outOfBagsWarning.setVisible(false);
    }

    createHearts() {
        for (let i = 0; i < LIVES.MAX; i++) {
            const heart = this.scene.add.image(20 + i * 28, 20, 'heart');
            heart.setScale(2);
            heart.setScrollFactor(0);
            heart.setDepth(100);
            this.hearts.push(heart);
        }
        this.updateHearts();
    }

    updateHearts() {
        this.hearts.forEach((heart, index) => {
            if (index < gameState.lives) {
                heart.setTexture('heart');
                heart.setVisible(true);
            } else if (index < LIVES.MAX) {
                heart.setTexture('heart_empty');
                heart.setVisible(index < LIVES.STARTING); // Show empty hearts up to starting amount
            }
        });
    }

    updateTimer(timeRemaining) {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = Math.floor(timeRemaining % 60);
        this.timerText.setText(`${minutes}:${seconds.toString().padStart(2, '0')}`);

        // Flash red when low on time
        if (timeRemaining <= 30) {
            this.timerText.setColor(timeRemaining % 1 < 0.5 ? '#ff0000' : '#fcfcfc');
        } else {
            this.timerText.setColor('#fcfcfc');
        }
    }

    updateScore(score) {
        this.scoreText.setText(`SCORE: ${score}`);
    }

    updateBags(bags) {
        this.bagsText.setText(`x ${bags}`);

        // Flash when low on bags
        if (bags <= 2 && bags > 0) {
            this.bagsText.setColor(Math.floor(Date.now() / 200) % 2 === 0 ? '#ff4040' : '#40ff40');
        } else if (bags === 0) {
            this.bagsText.setColor('#ff4040');
        } else {
            this.bagsText.setColor('#40ff40');
        }
    }

    showBags(show) {
        this.bagsIcon.setVisible(show);
        this.bagsText.setVisible(show);
    }

    update() {
        this.updateHearts();
        this.updateTimer(gameState.timeRemaining);
        this.updateScore(gameState.score);
        this.updateBags(gameState.bagsRemaining);

        // Show bags only in Phase 2
        this.showBags(gameState.phase === 2);

        // Show "OUT OF BAGS!" warning in Phase 2 when bags are 0
        if (gameState.phase === 2 && gameState.bagsRemaining === 0) {
            const now = Date.now();

            // Track when warning was first shown
            if (this.outOfBagsShownTime === null) {
                this.outOfBagsShownTime = now;
            }

            const elapsed = (now - this.outOfBagsShownTime) / 1000; // seconds

            if (elapsed < 5) {
                // Flash for the first 5 seconds
                this.outOfBagsWarning.setVisible(true);
                this.outOfBagsWarning.setAlpha(Math.floor(now / 300) % 2 === 0 ? 1 : 0.5);
            } else if (elapsed < 6) {
                // Fade out over 1 second (from 5s to 6s)
                this.outOfBagsWarning.setVisible(true);
                const fadeProgress = elapsed - 5; // 0 to 1
                this.outOfBagsWarning.setAlpha(1 - fadeProgress);
            } else {
                // Completely hidden after 6 seconds
                this.outOfBagsWarning.setVisible(false);
                this.outOfBagsWarning.setAlpha(0);
            }
        } else {
            this.outOfBagsWarning.setVisible(false);
            this.outOfBagsShownTime = null; // Reset timer when bags are replenished
        }
    }

    destroy() {
        this.hearts.forEach(heart => heart.destroy());
        this.timerText.destroy();
        this.scoreText.destroy();
        this.bagsText.destroy();
        this.bagsIcon.destroy();
        this.outOfBagsWarning.destroy();
    }
}
