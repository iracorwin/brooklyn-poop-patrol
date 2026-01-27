import { GAME_WIDTH, GAME_HEIGHT, LEVEL, PLAYER } from '../config/GameConfig.js';
import { CLINTON_HILL } from '../config/LevelConfig.js';
import { Player } from '../entities/Player.js';
import { Poop } from '../entities/Poop.js';
import { Puddle } from '../entities/Puddle.js';
import { Pigeon, PigeonPoop } from '../entities/Pigeon.js';
import { Coin } from '../entities/Coin.js';
import { Pretzel } from '../entities/Pretzel.js';
import { TrashCan } from '../entities/TrashCan.js';
import { PowerUpBox } from '../entities/PowerUp.js';
import { ParallaxManager } from '../managers/ParallaxManager.js';
import { gameState } from '../managers/GameStateManager.js';
import { HUD } from '../ui/HUD.js';
import { audioManager } from '../utils/ChiptuneGenerator.js';

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        this.levelConfig = CLINTON_HILL;

        // Create parallax backgrounds
        this.parallaxManager = new ParallaxManager(this);
        this.parallaxManager.create(this.levelConfig);

        // Create ground platform
        this.ground = this.physics.add.staticGroup();
        for (let x = 0; x < LEVEL.LEVEL_WIDTH + 64; x += 32) {
            const tile = this.ground.create(x, LEVEL.GROUND_Y + 25, 'ground');
            tile.setScale(1).refreshBody();
            tile.setDepth(-10); // Behind all game entities
        }

        // Create player (spawn at store if Phase 2, home if Phase 1)
        const playerX = gameState.phase === 2 ? this.levelConfig.storeX : this.levelConfig.startX;
        this.player = new Player(this, playerX, LEVEL.GROUND_Y - 30);
        this.physics.add.collider(this.player, this.ground);

        // Create entity groups (disable gravity for static obstacles)
        this.poops = this.physics.add.group({ allowGravity: false, immovable: true });
        this.puddles = this.physics.add.group({ allowGravity: false, immovable: true });
        this.pigeons = [];
        this.coins = this.physics.add.group({ allowGravity: false });
        this.pretzels = this.physics.add.group({ allowGravity: false });
        this.trashCans = this.physics.add.group({ allowGravity: false, immovable: true });
        this.powerUpBoxes = [];
        this.activePowerUps = this.physics.add.group({ allowGravity: true });

        // Spawn entities
        this.spawnEntities();

        // Create store at end
        this.createStore();

        // Create home at start
        this.createHome();

        // Setup collisions
        this.setupCollisions();

        // Create HUD
        this.hud = new HUD(this);
        this.hud.create();

        // Setup camera
        this.cameras.main.setBounds(0, 0, LEVEL.LEVEL_WIDTH, GAME_HEIGHT);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

        // Set physics world bounds to match level width
        this.physics.world.setBounds(0, 0, LEVEL.LEVEL_WIDTH, GAME_HEIGHT);

        // Setup input
        this.cursors = this.input.keyboard.createCursorKeys();

        // Timer
        this.timerEvent = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });

        // Start background music
        audioManager.startBackgroundMusic();

        // Bus ride state
        this.isOnBus = false;
        this.bus = null;
    }

    spawnEntities() {
        const config = this.levelConfig;

        // Spawn poops
        config.obstacles.poops.forEach(poop => {
            const p = new Poop(this, poop.x, LEVEL.GROUND_Y - 16);
            this.poops.add(p);
        });

        // Spawn puddles
        config.obstacles.puddles.forEach(puddle => {
            const p = new Puddle(this, puddle.x, LEVEL.GROUND_Y + 2, puddle.width);
            this.puddles.add(p);
        });

        // Spawn pigeons
        config.obstacles.pigeons.forEach(pigeon => {
            const y = pigeon.type === 'tree' ? LEVEL.GROUND_Y - 80 : LEVEL.GROUND_Y - 120;
            const p = new Pigeon(this, pigeon.x, y, pigeon.type);
            this.pigeons.push(p);
        });

        // Spawn trash cans
        config.collectibles.trashCans.forEach(tc => {
            const t = new TrashCan(this, tc.x, LEVEL.GROUND_Y);
            this.trashCans.add(t);
        });

        // Spawn pretzels
        config.collectibles.pretzels.forEach(pretzel => {
            const p = new Pretzel(this, pretzel.x, pretzel.y);
            this.pretzels.add(p);
        });

        // Spawn power-up boxes
        config.powerUps.forEach(pu => {
            const box = new PowerUpBox(this, pu.x, LEVEL.GROUND_Y - 80, pu.type);
            this.powerUpBoxes.push(box);
        });
    }

    createStore() {
        this.store = this.add.image(this.levelConfig.storeX, LEVEL.GROUND_Y - 48, 'store_mrcoco');
        this.store.setOrigin(0.5, 1);
        this.store.setScale(2);
        this.store.setDepth(-5); // Behind game entities

        // Store text
        this.add.text(this.levelConfig.storeX, LEVEL.GROUND_Y - 180, this.levelConfig.storeName.toUpperCase(), {
            fontFamily: 'monospace',
            fontSize: '16px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5).setDepth(25); // Above player
    }

    createHome() {
        this.home = this.add.image(50, LEVEL.GROUND_Y, 'home');
        this.home.setOrigin(0.5, 1);
        this.home.setScale(2);
        this.home.setDepth(-5); // Behind game entities

        // Home stoop
        this.add.image(50, LEVEL.GROUND_Y, 'home_stoop').setOrigin(0.5, 1).setScale(2).setDepth(-5);

        // Home label
        this.add.text(50, LEVEL.GROUND_Y - 130, 'HOME', {
            fontFamily: 'monospace',
            fontSize: '14px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5).setDepth(25); // Above player
    }

    setupCollisions() {
        // Poop collision
        this.physics.add.overlap(this.player, this.poops, this.hitPoop, null, this);

        // Puddle collision
        this.physics.add.overlap(this.player, this.puddles, this.hitPuddle, null, this);

        // Coin collection
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);

        // Pretzel collection
        this.physics.add.overlap(this.player, this.pretzels, this.collectPretzel, null, this);

        // Trash can - jump on top
        this.physics.add.collider(this.player, this.trashCans, this.hitTrashCan, null, this);

        // Power-up box - hit from below
        this.powerUpBoxes.forEach(box => {
            this.physics.add.collider(this.player, box, this.hitPowerUpBox, null, this);
        });

        // Power-up collection
        this.physics.add.overlap(this.player, this.activePowerUps, this.collectPowerUp, null, this);

        // Power-ups land on ground
        this.physics.add.collider(this.activePowerUps, this.ground);
    }

    hitPoop(player, poop) {
        if (poop.scooped) return; // Already scooped, ignore
        if (!poop.body || !poop.body.enable) return; // Body disabled, ignore

        // Phase 2: Can scoop poop if pressing down
        if (gameState.phase === 2 && player.isScooping) {
            if (gameState.scoopPoop()) {
                poop.scoop();
                audioManager.playScoop();
            }
            return;
        }

        // Phase 2 with bags: Poop is harmless, just don't damage the player
        if (gameState.phase === 2 && gameState.bagsRemaining > 0) {
            return;
        }

        // Phase 1 or Phase 2 without bags: Take damage if touching poop (and not immune)
        if (!player.hasImmunity && !player.isHit && gameState.lives > 0) {
            if (player.hit()) {
                gameState.loseLife();

                // Disable this poop's collision temporarily to prevent repeat hits
                poop.body.enable = false;
                this.time.delayedCall(1500, () => {
                    if (poop && poop.body) {
                        poop.body.enable = true;
                    }
                });

                if (gameState.lives <= 0) {
                    this.gameOver();
                }
            }
        }
    }

    hitPuddle(player, puddle) {
        if (player.hasImmunity) return;
        player.applySlow();
    }

    collectCoin(player, coin) {
        if (coin.collect()) {
            gameState.collectCoin();
            audioManager.playCoin();
        }
    }

    collectPretzel(player, pretzel) {
        if (pretzel.collect()) {
            gameState.collectPretzel();
            audioManager.playPretzel();
        }
    }

    hitTrashCan(player, trashCan) {
        // Only tip if player landed on top (player's bottom touching trash can's top)
        if (player.body.touching.down && player.y < trashCan.y - 20) {
            const newCoins = trashCan.tip();
            newCoins.forEach(coin => {
                this.coins.add(coin);
                this.physics.add.collider(coin, this.ground);
            });
            player.setVelocityY(-200); // Bounce off
        }
    }

    hitPowerUpBox(player, box) {
        // Only activate if hitting from below (player's head hits bottom of box)
        if (player.body.touching.up && player.y > box.y) {
            const powerUp = box.hit();
            if (powerUp) {
                this.activePowerUps.add(powerUp);
            }
        }
    }

    collectPowerUp(player, powerUp) {
        if (powerUp.collect()) {
            powerUp.apply(player);
            audioManager.playPowerUp();
        }
    }

    updateTimer() {
        if (this.isOnBus) return;

        gameState.timeRemaining--;
        if (gameState.timeRemaining <= 0) {
            this.gameOver();
        }
    }

    checkPigeonPoops() {
        this.pigeons.forEach(pigeon => {
            if (!pigeon.active) return;

            pigeon.getPoops().forEach(poop => {
                poop.update();

                // Check collision with player
                if (Phaser.Geom.Intersects.RectangleToRectangle(
                    this.player.getBounds(),
                    poop.getBounds()
                )) {
                    if (!this.player.hasImmunity) {
                        this.player.pauseForPigeon();
                    }
                    poop.destroy();
                }
            });
        });
    }

    checkPhaseTransition() {
        if (gameState.phase === 1) {
            // Check if reached store
            if (this.player.x >= this.levelConfig.storeX - 50) {
                this.transitionToStore();
            }
        } else if (gameState.phase === 2) {
            // Check if reached home
            if (this.player.x <= this.levelConfig.homeX + 50) {
                this.levelComplete();
            }
        }
    }

    transitionToStore() {
        audioManager.stopBackgroundMusic();
        this.timerEvent.remove();
        this.scene.start('StoreTransitionScene');
    }

    levelComplete() {
        audioManager.stopBackgroundMusic();
        audioManager.playLevelComplete();
        this.timerEvent.remove();
        this.scene.start('LevelCompleteScene');
    }

    gameOver() {
        audioManager.stopBackgroundMusic();
        audioManager.playGameOver();
        this.timerEvent.remove();
        this.scene.start('GameOverScene');
    }

    startBusRide() {
        if (this.isOnBus) return;

        this.isOnBus = true;
        gameState.isOnBus = true;
        this.player.setVisible(false);

        // Create bus
        this.bus = this.add.image(this.player.x - 100, LEVEL.GROUND_Y - 32, 'bus');
        this.bus.setOrigin(0.5, 1);
        this.bus.setScale(2);
        this.bus.setDepth(50);

        // Determine destination
        const targetX = gameState.phase === 1 ? this.levelConfig.storeX - 100 : this.levelConfig.homeX + 100;

        this.tweens.add({
            targets: this.bus,
            x: targetX,
            duration: 3000,
            ease: 'Sine.easeInOut',
            onUpdate: () => {
                this.cameras.main.scrollX = this.bus.x - GAME_WIDTH / 2;
            },
            onComplete: () => {
                this.player.x = targetX;
                this.player.setVisible(true);
                this.bus.destroy();
                this.isOnBus = false;
                gameState.isOnBus = false;
                this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
            }
        });
    }

    update() {
        if (this.isOnBus) return;

        // Update player
        this.player.update(this.cursors);

        // Update HUD
        this.hud.update();

        // Check pigeon poops
        this.checkPigeonPoops();

        // Check phase transitions
        this.checkPhaseTransition();

        // Update power-up box spawned items
        this.powerUpBoxes.forEach(box => {
            const pu = box.getPowerUp();
            if (pu && !this.activePowerUps.contains(pu)) {
                this.activePowerUps.add(pu);
            }
        });

        // Update trash can coins
        this.trashCans.getChildren().forEach(tc => {
            tc.getCoins().forEach(coin => {
                if (!this.coins.contains(coin)) {
                    this.coins.add(coin);
                }
            });
        });
    }
}
