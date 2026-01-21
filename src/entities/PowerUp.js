import { gameState } from '../managers/GameStateManager.js';
import { audioManager } from '../utils/ChiptuneGenerator.js';

// Power-up box that spawns power-ups when hit from below
export class PowerUpBox extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, powerUpType = 'pizza') {
        super(scene, x, y, 'powerup_box');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(2);
        this.setDepth(14); // Render above most obstacles
        this.body.setAllowGravity(false);
        this.setImmovable(true);
        this.setSize(16, 16);

        this.powerUpType = powerUpType;
        this.used = false;
        this.spawnedPowerUp = null;

        // Subtle floating animation
        scene.tweens.add({
            targets: this,
            y: y - 3,
            duration: 500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    hit() {
        if (this.used) return null;

        this.used = true;
        this.setTexture('powerup_box_used');

        // Bounce effect
        this.scene.tweens.add({
            targets: this,
            y: this.y - 10,
            duration: 100,
            yoyo: true,
            ease: 'Quad.easeOut'
        });

        // Spawn power-up
        let powerUp;
        switch (this.powerUpType) {
            case 'metrocard':
                powerUp = new MetroCard(this.scene, this.x, this.y - 32);
                break;
            case 'pizza':
                powerUp = new PizzaSlice(this.scene, this.x, this.y - 32);
                break;
            case 'hotdog':
                powerUp = new HotDog(this.scene, this.x, this.y - 32);
                break;
            case 'omny':
                powerUp = new OmnyCard(this.scene, this.x, this.y - 32);
                break;
            default:
                powerUp = new PizzaSlice(this.scene, this.x, this.y - 32);
        }

        this.spawnedPowerUp = powerUp;
        audioManager.playPowerUp();

        return powerUp;
    }

    getPowerUp() {
        return this.spawnedPowerUp && this.spawnedPowerUp.active ? this.spawnedPowerUp : null;
    }
}

// Base power-up class
class BasePowerUp extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(2);
        this.setDepth(14); // Render above most obstacles
        this.body.setAllowGravity(true);
        this.setSize(14, 10);
        this.body.setBounce(0.2);

        this.collected = false;

        // Pop up animation - gravity will handle the fall
        this.body.setVelocityY(-200);
    }

    collect() {
        if (this.collected) return false;

        this.collected = true;

        // Collect animation
        this.scene.tweens.add({
            targets: this,
            y: this.y - 30,
            alpha: 0,
            scaleX: 3,
            scaleY: 3,
            duration: 300,
            onComplete: () => {
                this.destroy();
            }
        });

        return true;
    }

    apply(player) {
        // Override in subclasses
    }
}

// MetroCard - Extra life
export class MetroCard extends BasePowerUp {
    constructor(scene, x, y) {
        super(scene, x, y, 'metrocard');
        this.powerUpType = 'metrocard';
    }

    apply(player) {
        if (gameState.gainLife()) {
            // Show +1 life text
            const text = this.scene.add.text(this.x, this.y - 20, '+1 LIFE', {
                fontFamily: 'monospace',
                fontSize: '14px',
                color: '#ff4444',
                stroke: '#000000',
                strokeThickness: 2
            }).setOrigin(0.5);

            this.scene.tweens.add({
                targets: text,
                y: text.y - 30,
                alpha: 0,
                duration: 1000,
                onComplete: () => text.destroy()
            });
        }
    }
}

// Pizza Slice - Temporary immunity
export class PizzaSlice extends BasePowerUp {
    constructor(scene, x, y) {
        super(scene, x, y, 'pizza');
        this.powerUpType = 'pizza';
    }

    apply(player) {
        player.applyImmunity();

        const text = this.scene.add.text(this.x, this.y - 20, 'IMMUNITY!', {
            fontFamily: 'monospace',
            fontSize: '14px',
            color: '#ffff00',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);

        this.scene.tweens.add({
            targets: text,
            y: text.y - 30,
            alpha: 0,
            duration: 1000,
            onComplete: () => text.destroy()
        });
    }
}

// Hot Dog - Extra bag
export class HotDog extends BasePowerUp {
    constructor(scene, x, y) {
        super(scene, x, y, 'hotdog');
        this.powerUpType = 'hotdog';
    }

    apply(player) {
        gameState.addBag();

        const text = this.scene.add.text(this.x, this.y - 20, '+1 BAG', {
            fontFamily: 'monospace',
            fontSize: '14px',
            color: '#44ff44',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);

        this.scene.tweens.add({
            targets: text,
            y: text.y - 30,
            alpha: 0,
            duration: 1000,
            onComplete: () => text.destroy()
        });
    }
}

// OMNY Card - Bus ride (auto-travel)
export class OmnyCard extends BasePowerUp {
    constructor(scene, x, y) {
        super(scene, x, y, 'omny');
        this.powerUpType = 'omny';
    }

    apply(player) {
        // Trigger bus ride in scene
        if (this.scene.startBusRide) {
            this.scene.startBusRide();
        }
    }
}
