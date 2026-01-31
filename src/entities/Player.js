import { PLAYER, COLORS } from '../config/GameConfig.js';
import { gameState } from '../managers/GameStateManager.js';
import { audioManager } from '../utils/ChiptuneGenerator.js';

export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player_idle');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Physics setup
        this.setCollideWorldBounds(true);
        this.setBounce(0);
        this.setSize(12, 22);
        this.setOffset(2, 2);

        // State
        this.isJumping = false;
        this.isScooping = false;
        this.isHit = false;
        this.isSlowed = false;
        this.hasImmunity = false;
        this.isPaused = false;
        this.facingRight = true;

        // Timers
        this.slowTimer = null;
        this.immunityTimer = null;
        this.hitTimer = null;
        this.pauseTimer = null;
        this.immunityFlashTimer = null;

        // Create animations
        this.createAnimations();

        // Set scale for pixel art
        this.setScale(2);
        this.setDepth(20); // Player renders above obstacles
    }

    createAnimations() {
        const scene = this.scene;

        // Idle animation (single frame)
        if (!scene.anims.exists('player_idle')) {
            scene.anims.create({
                key: 'player_idle',
                frames: [{ key: 'player_idle' }],
                frameRate: 1
            });
        }

        // Walk animation
        if (!scene.anims.exists('player_walk')) {
            scene.anims.create({
                key: 'player_walk',
                frames: [
                    { key: 'player_walk1' },
                    { key: 'player_idle' },
                    { key: 'player_walk2' },
                    { key: 'player_idle' }
                ],
                frameRate: 8,
                repeat: -1
            });
        }

        // Jump animation
        if (!scene.anims.exists('player_jump')) {
            scene.anims.create({
                key: 'player_jump',
                frames: [{ key: 'player_jump' }],
                frameRate: 1
            });
        }

        // Scoop animation
        if (!scene.anims.exists('player_scoop')) {
            scene.anims.create({
                key: 'player_scoop',
                frames: [{ key: 'player_scoop' }],
                frameRate: 1
            });
        }

        // Hit animation
        if (!scene.anims.exists('player_hit')) {
            scene.anims.create({
                key: 'player_hit',
                frames: [{ key: 'player_hit' }],
                frameRate: 1
            });
        }
    }

    update(cursors) {
        if (this.isPaused || this.isHit || this.isScooping) {
            return;
        }

        const speed = this.isSlowed ? PLAYER.SPEED * PLAYER.SLOW_MULTIPLIER : PLAYER.SPEED;
        const onGround = this.body.blocked.down || this.body.touching.down;

        // Horizontal movement
        if (cursors.left.isDown) {
            this.setVelocityX(-speed);
            this.facingRight = false;
            this.setFlipX(true);
            if (onGround) {
                this.play('player_walk', true);
            }
        } else if (cursors.right.isDown) {
            this.setVelocityX(speed);
            this.facingRight = true;
            this.setFlipX(false);
            if (onGround) {
                this.play('player_walk', true);
            }
        } else {
            this.setVelocityX(0);
            if (onGround && !this.isJumping) {
                this.play('player_idle', true);
            }
        }

        // Jump
        if (cursors.up.isDown && onGround) {
            this.setVelocityY(PLAYER.JUMP_VELOCITY);
            this.isJumping = true;
            this.play('player_jump', true);
            audioManager.playJump();
        }

        // Update jump state
        if (onGround && this.isJumping) {
            this.isJumping = false;
        }

        // In air
        if (!onGround) {
            this.play('player_jump', true);
        }

        // Scoop (Phase 2 only, down arrow)
        if (cursors.down.isDown && !this.isJumping && gameState.phase === 2) {
            this.startScoop();
        }
    }

    startScoop() {
        if (this.isScooping || gameState.bagsRemaining <= 0) return;

        this.isScooping = true;
        this.setVelocityX(0);
        this.play('player_scoop', true);

        // Scoop duration
        this.scene.time.delayedCall(400, () => {
            this.isScooping = false;
        });
    }

    hit() {
        if (this.isHit || this.hasImmunity) return false;

        this.isHit = true;

        // Teleport player backwards to escape the obstacle
        const knockbackDistance = 50;
        if (this.facingRight) {
            this.x -= knockbackDistance;
        } else {
            this.x += knockbackDistance;
        }

        this.setVelocityX(0);
        this.setVelocityY(0);

        this.play('player_hit', true);
        audioManager.playDamage();

        // Flash red
        this.setTint(0xff0000);

        // Brief invincibility after hit
        this.scene.time.delayedCall(1000, () => {
            this.isHit = false;
            this.clearTint();
        });

        return true;
    }

    applySlow() {
        if (this.isSlowed) return;

        this.isSlowed = true;
        gameState.isSlowed = true;
        this.setTint(0x6688ff);
        audioManager.playSplash();

        // Clear existing timer
        if (this.slowTimer) {
            this.slowTimer.remove();
        }

        this.slowTimer = this.scene.time.delayedCall(PLAYER.SLOW_DURATION, () => {
            this.isSlowed = false;
            gameState.isSlowed = false;
            if (!this.hasImmunity) {
                this.clearTint();
            }
        });
    }

    applyImmunity(duration = PLAYER.IMMUNITY_DURATION) {
        this.hasImmunity = true;
        gameState.hasImmunity = true;

        // Flash effect
        if (this.immunityFlashTimer) {
            this.immunityFlashTimer.remove();
        }

        this.immunityFlashTimer = this.scene.time.addEvent({
            delay: 100,
            callback: () => {
                if (this.tintTopLeft === 0xffff00) {
                    this.clearTint();
                } else {
                    this.setTint(0xffff00);
                }
            },
            repeat: duration / 100
        });

        // Clear existing timer
        if (this.immunityTimer) {
            this.immunityTimer.remove();
        }

        this.immunityTimer = this.scene.time.delayedCall(duration, () => {
            this.hasImmunity = false;
            gameState.hasImmunity = false;
            this.clearTint();
            if (this.immunityFlashTimer) {
                this.immunityFlashTimer.remove();
            }
        });
    }

    pauseForPigeon() {
        if (this.isPaused) return;

        this.isPaused = true;
        gameState.isPigeonPaused = true;
        this.setVelocity(0, 0);
        this.play('player_hit', true);
        this.setTint(0xaaaaaa);

        if (this.pauseTimer) {
            this.pauseTimer.remove();
        }

        this.pauseTimer = this.scene.time.delayedCall(PLAYER.PIGEON_PAUSE_DURATION, () => {
            this.isPaused = false;
            gameState.isPigeonPaused = false;
            this.clearTint();
        });
    }

    destroy() {
        if (this.slowTimer) this.slowTimer.remove();
        if (this.immunityTimer) this.immunityTimer.remove();
        if (this.hitTimer) this.hitTimer.remove();
        if (this.pauseTimer) this.pauseTimer.remove();
        if (this.immunityFlashTimer) this.immunityFlashTimer.remove();
        super.destroy();
    }
}
