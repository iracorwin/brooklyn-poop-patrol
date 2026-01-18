export class Poop extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'poop');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(2);
        this.body.setAllowGravity(false);
        this.setImmovable(true);
        this.setSize(12, 12);
        this.setOffset(2, 4);

        this.scooped = false;
    }

    scoop() {
        if (this.scooped) return false;

        this.scooped = true;

        // Animate scoop
        this.scene.tweens.add({
            targets: this,
            alpha: 0,
            scaleX: 0,
            scaleY: 0,
            duration: 200,
            onComplete: () => {
                this.destroy();
            }
        });

        return true;
    }
}
