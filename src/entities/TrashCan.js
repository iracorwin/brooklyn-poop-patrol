import { Coin } from './Coin.js';

export class TrashCan extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'trashcan');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(2);
        this.setDepth(8); // Render above backgrounds
        this.setOrigin(0.5, 1);
        this.body.setAllowGravity(false);
        this.setImmovable(true);
        this.setSize(14, 20);
        this.setOffset(1, 4);

        this.tipped = false;
        this.coins = [];
    }

    tip() {
        if (this.tipped) return [];

        this.tipped = true;

        // Change to tipped texture
        this.setTexture('trashcan_tipped');
        this.setOrigin(0.5, 1);

        // Tip animation
        this.scene.tweens.add({
            targets: this,
            angle: -90,
            duration: 300,
            ease: 'Bounce.easeOut'
        });

        // Spawn coins
        const coinCount = 3 + Math.floor(Math.random() * 3); // 3-5 coins
        const spawnedCoins = [];

        for (let i = 0; i < coinCount; i++) {
            this.scene.time.delayedCall(100 + i * 50, () => {
                const coin = new Coin(
                    this.scene,
                    this.x + (Math.random() - 0.5) * 40,
                    this.y - 20 - i * 10
                );

                // Give coins initial velocity
                coin.body.setAllowGravity(true);
                coin.body.setVelocity(
                    (Math.random() - 0.5) * 100,
                    -150 - Math.random() * 100
                );
                coin.body.setBounce(0.5);

                spawnedCoins.push(coin);
                this.coins.push(coin);
            });
        }

        return spawnedCoins;
    }

    getCoins() {
        return this.coins.filter(c => c.active && !c.collected);
    }
}
