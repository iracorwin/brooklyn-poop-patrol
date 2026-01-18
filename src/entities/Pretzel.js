export class Pretzel extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'pretzel');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(2);
        this.body.setAllowGravity(false);
        this.setSize(12, 12);

        // Gentle floating
        scene.tweens.add({
            targets: this,
            y: y - 8,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Slight rotation
        scene.tweens.add({
            targets: this,
            angle: 10,
            duration: 800,
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
            y: this.y - 20,
            alpha: 0,
            scaleX: 3,
            scaleY: 3,
            duration: 250,
            onComplete: () => {
                this.destroy();
            }
        });

        return true;
    }
}
