import { LIVES, LEVEL, POINTS } from '../config/GameConfig.js';

// Manages game state across scenes
export class GameStateManager {
    constructor() {
        this.reset();
    }

    reset() {
        this.currentLevel = 1;
        this.phase = 1; // 1 = going to store, 2 = returning home
        this.lives = LIVES.STARTING;
        this.score = 0;
        this.timeRemaining = LEVEL.TIMER_DURATION;
        this.bagsRemaining = 0;
        this.bagsCollected = 0;
        this.coinsCollected = 0;
        this.pretzelsCollected = 0;
        this.poopsScooped = 0;

        // Power-up states
        this.hasImmunity = false;
        this.isSlowed = false;
        this.isOnBus = false;
        this.isPigeonPaused = false;
    }

    startLevel(levelConfig) {
        this.phase = 1;
        this.timeRemaining = LEVEL.TIMER_DURATION;
        this.bagsRemaining = levelConfig.bagCount;
        this.bagsCollected = 0;
        this.coinsCollected = 0;
        this.pretzelsCollected = 0;
        this.poopsScooped = 0;
        this.hasImmunity = false;
        this.isSlowed = false;
        this.isOnBus = false;
        this.isPigeonPaused = false;
    }

    transitionToPhase2() {
        this.phase = 2;
    }

    addScore(points) {
        this.score += points;
    }

    collectCoin() {
        this.coinsCollected++;
        this.addScore(POINTS.COIN);
    }

    collectPretzel() {
        this.pretzelsCollected++;
        this.addScore(POINTS.PRETZEL);
    }

    collectBag() {
        this.bagsCollected++;
        this.addScore(POINTS.POOP_BAG);
    }

    scoopPoop() {
        if (this.bagsRemaining > 0) {
            this.bagsRemaining--;
            this.poopsScooped++;
            this.addScore(POINTS.POOP_BAG);
            return true;
        }
        return false;
    }

    loseLife() {
        this.lives--;
        return this.lives > 0;
    }

    gainLife() {
        if (this.lives < LIVES.MAX) {
            this.lives++;
            return true;
        }
        return false;
    }

    addBag() {
        this.bagsRemaining++;
    }

    calculateTimeBonus() {
        return Math.floor(this.timeRemaining) * POINTS.TIME_BONUS_MULTIPLIER;
    }

    getLevelScore() {
        return {
            coins: this.coinsCollected * POINTS.COIN,
            pretzels: this.pretzelsCollected * POINTS.PRETZEL,
            poopsScooped: this.poopsScooped * POINTS.POOP_BAG,
            timeBonus: this.calculateTimeBonus(),
            total: this.score
        };
    }

    isGameOver() {
        return this.lives <= 0;
    }

    // High score management
    getHighScore() {
        return parseInt(localStorage.getItem('brooklynPoopPatrolHighScore') || '0', 10);
    }

    saveHighScore() {
        const currentHigh = this.getHighScore();
        if (this.score > currentHigh) {
            localStorage.setItem('brooklynPoopPatrolHighScore', this.score.toString());
            return true;
        }
        return false;
    }
}

// Singleton instance
export const gameState = new GameStateManager();
