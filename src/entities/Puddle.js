export class Puddle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, width = 48) {
        super(scene, x, y, 'puddle');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(width / 48, 1);
        this.body.setAllowGravity(false);
        this.setImmovable(true);
        this.setSize(width - 8, 8);
        this.setOffset(4, 8);

        // Subtle wave animation
        scene.tweens.add({
            targets: this,
            scaleY: 0.9,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }
}
