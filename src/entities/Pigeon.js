import { LEVEL } from '../config/GameConfig.js';

export class Pigeon extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type = 'flying') {
        super(scene, x, y, type === 'flying' ? 'pigeon_fly' : 'pigeon');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(2);
        this.setDepth(15); // Render above ground obstacles
        this.body.setAllowGravity(false);
        this.setImmovable(true);

        this.pigeonType = type;
        this.startX = x;
        this.startY = y;
        this.poopTimer = null;
        this.poops = [];

        if (type === 'flying') {
            this.setupFlying();
        } else {
            this.setupTree();
        }

        this.startPoopTimer();
    }

    setupFlying() {
        // Flying back and forth
        this.scene.tweens.add({
            targets: this,
            x: this.startX + 100,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Bobbing motion
        this.scene.tweens.add({
            targets: this,
            y: this.startY - 20,
            duration: 500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    setupTree() {
        // Perched, occasional movement
        this.scene.tweens.add({
            targets: this,
            angle: 5,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    startPoopTimer() {
        // Random interval between poops
        const scheduleNextPoop = () => {
            const delay = 2000 + Math.random() * 3000;
            this.poopTimer = this.scene.time.delayedCall(delay, () => {
                this.dropPoop();
                scheduleNextPoop();
            });
        };

        scheduleNextPoop();
    }

    dropPoop() {
        if (!this.active) return;

        const poop = new PigeonPoop(this.scene, this.x, this.y + 16);
        this.poops.push(poop);

        // Clean up old poops
        this.poops = this.poops.filter(p => p.active);
    }

    getPoops() {
        return this.poops.filter(p => p.active);
    }

    destroy() {
        if (this.poopTimer) {
            this.poopTimer.remove();
        }
        this.poops.forEach(p => p.destroy());
        super.destroy();
    }
}

export class PigeonPoop extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'pigeon_poop');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(2);
        this.setDepth(16); // Render above pigeon
        this.body.setGravityY(300);
        this.setSize(6, 6);
        this.setOffset(1, 1);

        // Destroy when hitting ground
        this.groundY = LEVEL.GROUND_Y;
    }

    update() {
        if (this.y >= this.groundY - 8) {
            // Splat effect
            this.scene.tweens.add({
                targets: this,
                alpha: 0,
                scaleX: 2,
                scaleY: 0.5,
                duration: 200,
                onComplete: () => {
                    this.destroy();
                }
            });
            this.body.setVelocity(0, 0);
            this.body.setAllowGravity(false);
        }
    }
}
