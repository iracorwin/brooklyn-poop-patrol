export class Coin extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'coin');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(2);
        this.setDepth(12); // Render above obstacles
        this.body.setAllowGravity(false);
        this.setSize(8, 8);

        // Spinning animation
        scene.tweens.add({
            targets: this,
            scaleX: 0.2,
            duration: 200,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Bobbing
        scene.tweens.add({
            targets: this,
            y: y - 4,
            duration: 400,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        this.collected = false;
    }

    collect() {
        if (this.collected) return false;

        this.collected = true;

        // Collect animation
        this.scene.tweens.add({
            targets: this,
            y: this.y - 30,
            alpha: 0,
            duration: 300,
            onComplete: () => {
                this.destroy();
            }
        });

        return true;
    }
}
