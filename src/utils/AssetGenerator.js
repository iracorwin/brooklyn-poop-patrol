import { COLORS } from '../config/GameConfig.js';

// Utility class to generate pixel art textures at runtime
export class AssetGenerator {
    constructor(scene) {
        this.scene = scene;
    }

    // Helper to create a canvas texture
    createTexture(key, width, height, drawFunc) {
        const graphics = this.scene.make.graphics({ x: 0, y: 0, add: false });
        drawFunc(graphics, width, height);
        graphics.generateTexture(key, width, height);
        graphics.destroy();
    }

    generateAll() {
        this.generatePlayer();
        this.generateObstacles();
        this.generateCollectibles();
        this.generatePowerUps();
        this.generateUI();
        this.generateBackgrounds();
        this.generateStore();
    }

    generatePlayer() {
        // Player idle frame (16x24)
        this.createTexture('player_idle', 16, 24, (g) => {
            // Legs (jeans)
            g.fillStyle(COLORS.JEANS);
            g.fillRect(4, 18, 3, 6);
            g.fillRect(9, 18, 3, 6);

            // Body (sparkly pink/purple hoodie)
            g.fillStyle(COLORS.HOODIE_PINK);
            g.fillRect(3, 10, 10, 8);
            // Sparkle details
            g.fillStyle(COLORS.HOODIE_PURPLE);
            g.fillRect(5, 11, 2, 2);
            g.fillRect(9, 13, 2, 2);

            // Arms
            g.fillStyle(COLORS.HOODIE_PINK);
            g.fillRect(1, 12, 2, 5);
            g.fillRect(13, 12, 2, 5);

            // Hands
            g.fillStyle(COLORS.SKIN);
            g.fillRect(1, 17, 2, 2);
            g.fillRect(13, 17, 2, 2);

            // Head
            g.fillStyle(COLORS.SKIN);
            g.fillRect(4, 2, 8, 8);

            // Hair (brown bob cut)
            g.fillStyle(COLORS.HAIR_BROWN);
            g.fillRect(3, 1, 10, 3);
            g.fillRect(2, 2, 2, 6);
            g.fillRect(12, 2, 2, 6);

            // Eyes
            g.fillStyle(COLORS.BLACK);
            g.fillRect(5, 5, 2, 2);
            g.fillRect(9, 5, 2, 2);

            // Mouth (smile)
            g.fillStyle(COLORS.RED);
            g.fillRect(7, 8, 2, 1);
        });

        // Player walk frame 1
        this.createTexture('player_walk1', 16, 24, (g) => {
            // Legs walking
            g.fillStyle(COLORS.JEANS);
            g.fillRect(3, 18, 3, 6);
            g.fillRect(10, 18, 3, 5);

            // Body
            g.fillStyle(COLORS.HOODIE_PINK);
            g.fillRect(3, 10, 10, 8);
            g.fillStyle(COLORS.HOODIE_PURPLE);
            g.fillRect(5, 11, 2, 2);
            g.fillRect(9, 13, 2, 2);

            // Arms swinging
            g.fillStyle(COLORS.HOODIE_PINK);
            g.fillRect(0, 11, 3, 5);
            g.fillRect(13, 13, 3, 5);

            g.fillStyle(COLORS.SKIN);
            g.fillRect(0, 16, 2, 2);
            g.fillRect(14, 18, 2, 2);

            // Head
            g.fillStyle(COLORS.SKIN);
            g.fillRect(4, 2, 8, 8);

            // Hair
            g.fillStyle(COLORS.HAIR_BROWN);
            g.fillRect(3, 1, 10, 3);
            g.fillRect(2, 2, 2, 6);
            g.fillRect(12, 2, 2, 6);

            // Eyes
            g.fillStyle(COLORS.BLACK);
            g.fillRect(5, 5, 2, 2);
            g.fillRect(9, 5, 2, 2);

            g.fillStyle(COLORS.RED);
            g.fillRect(7, 8, 2, 1);
        });

        // Player walk frame 2
        this.createTexture('player_walk2', 16, 24, (g) => {
            // Legs walking opposite
            g.fillStyle(COLORS.JEANS);
            g.fillRect(4, 18, 3, 5);
            g.fillRect(9, 18, 3, 6);

            // Body
            g.fillStyle(COLORS.HOODIE_PINK);
            g.fillRect(3, 10, 10, 8);
            g.fillStyle(COLORS.HOODIE_PURPLE);
            g.fillRect(5, 11, 2, 2);
            g.fillRect(9, 13, 2, 2);

            // Arms swinging opposite
            g.fillStyle(COLORS.HOODIE_PINK);
            g.fillRect(0, 13, 3, 5);
            g.fillRect(13, 11, 3, 5);

            g.fillStyle(COLORS.SKIN);
            g.fillRect(0, 18, 2, 2);
            g.fillRect(14, 16, 2, 2);

            // Head
            g.fillStyle(COLORS.SKIN);
            g.fillRect(4, 2, 8, 8);

            // Hair
            g.fillStyle(COLORS.HAIR_BROWN);
            g.fillRect(3, 1, 10, 3);
            g.fillRect(2, 2, 2, 6);
            g.fillRect(12, 2, 2, 6);

            // Eyes
            g.fillStyle(COLORS.BLACK);
            g.fillRect(5, 5, 2, 2);
            g.fillRect(9, 5, 2, 2);

            g.fillStyle(COLORS.RED);
            g.fillRect(7, 8, 2, 1);
        });

        // Player jump frame
        this.createTexture('player_jump', 16, 24, (g) => {
            // Legs bent up
            g.fillStyle(COLORS.JEANS);
            g.fillRect(4, 16, 3, 5);
            g.fillRect(9, 16, 3, 5);
            g.fillRect(3, 20, 3, 2);
            g.fillRect(10, 20, 3, 2);

            // Body
            g.fillStyle(COLORS.HOODIE_PINK);
            g.fillRect(3, 8, 10, 8);
            g.fillStyle(COLORS.HOODIE_PURPLE);
            g.fillRect(5, 9, 2, 2);
            g.fillRect(9, 11, 2, 2);

            // Arms up
            g.fillStyle(COLORS.HOODIE_PINK);
            g.fillRect(1, 6, 2, 6);
            g.fillRect(13, 6, 2, 6);

            g.fillStyle(COLORS.SKIN);
            g.fillRect(1, 4, 2, 2);
            g.fillRect(13, 4, 2, 2);

            // Head
            g.fillStyle(COLORS.SKIN);
            g.fillRect(4, 0, 8, 8);

            // Hair
            g.fillStyle(COLORS.HAIR_BROWN);
            g.fillRect(3, 0, 10, 2);
            g.fillRect(2, 0, 2, 6);
            g.fillRect(12, 0, 2, 6);

            // Eyes (excited)
            g.fillStyle(COLORS.BLACK);
            g.fillRect(5, 3, 2, 2);
            g.fillRect(9, 3, 2, 2);

            g.fillStyle(COLORS.RED);
            g.fillRect(7, 6, 2, 1);
        });

        // Player scoop frame
        this.createTexture('player_scoop', 16, 24, (g) => {
            // Legs bent
            g.fillStyle(COLORS.JEANS);
            g.fillRect(3, 18, 4, 6);
            g.fillRect(9, 18, 4, 6);

            // Body bent forward
            g.fillStyle(COLORS.HOODIE_PINK);
            g.fillRect(4, 12, 10, 6);
            g.fillStyle(COLORS.HOODIE_PURPLE);
            g.fillRect(6, 13, 2, 2);
            g.fillRect(10, 14, 2, 2);

            // Arms reaching down
            g.fillStyle(COLORS.HOODIE_PINK);
            g.fillRect(12, 16, 4, 4);

            g.fillStyle(COLORS.SKIN);
            g.fillRect(14, 20, 2, 3);

            // Head looking down
            g.fillStyle(COLORS.SKIN);
            g.fillRect(5, 4, 8, 8);

            // Hair
            g.fillStyle(COLORS.HAIR_BROWN);
            g.fillRect(4, 3, 10, 3);
            g.fillRect(3, 4, 2, 6);
            g.fillRect(13, 4, 2, 6);

            // Eyes looking down
            g.fillStyle(COLORS.BLACK);
            g.fillRect(6, 8, 2, 2);
            g.fillRect(10, 8, 2, 2);
        });

        // Player hit frame
        this.createTexture('player_hit', 16, 24, (g) => {
            // Legs
            g.fillStyle(COLORS.JEANS);
            g.fillRect(4, 18, 3, 6);
            g.fillRect(9, 18, 3, 6);

            // Body
            g.fillStyle(COLORS.HOODIE_PINK);
            g.fillRect(3, 10, 10, 8);

            // Arms flailing
            g.fillStyle(COLORS.HOODIE_PINK);
            g.fillRect(0, 8, 3, 5);
            g.fillRect(13, 8, 3, 5);

            g.fillStyle(COLORS.SKIN);
            g.fillRect(0, 6, 2, 2);
            g.fillRect(14, 6, 2, 2);

            // Head
            g.fillStyle(COLORS.SKIN);
            g.fillRect(4, 2, 8, 8);

            // Hair
            g.fillStyle(COLORS.HAIR_BROWN);
            g.fillRect(3, 1, 10, 3);
            g.fillRect(2, 2, 2, 6);
            g.fillRect(12, 2, 2, 6);

            // Eyes X_X
            g.fillStyle(COLORS.BLACK);
            g.fillRect(5, 4, 1, 1);
            g.fillRect(6, 5, 1, 1);
            g.fillRect(5, 6, 1, 1);
            g.fillRect(9, 4, 1, 1);
            g.fillRect(10, 5, 1, 1);
            g.fillRect(9, 6, 1, 1);

            // Mouth (frown)
            g.fillStyle(COLORS.RED);
            g.fillRect(6, 8, 4, 1);
        });
    }

    generateObstacles() {
        // Poop (16x16)
        this.createTexture('poop', 16, 16, (g) => {
            // Base
            g.fillStyle(COLORS.POOP_BROWN);
            g.fillRect(3, 12, 10, 4);
            g.fillRect(4, 10, 8, 2);
            g.fillRect(5, 8, 6, 2);
            g.fillRect(6, 5, 4, 3);
            g.fillRect(7, 3, 2, 2);

            // Highlights
            g.fillStyle(COLORS.POOP_LIGHT);
            g.fillRect(5, 11, 2, 2);
            g.fillRect(6, 6, 2, 2);

            // Stink lines
            g.fillStyle(0x88aa44);
            g.fillRect(2, 1, 1, 3);
            g.fillRect(8, 0, 1, 2);
            g.fillRect(13, 2, 1, 3);
        });

        // Puddle (48x16)
        this.createTexture('puddle', 48, 16, (g) => {
            g.fillStyle(COLORS.PUDDLE_BLUE);
            g.fillRect(4, 10, 40, 4);
            g.fillRect(8, 8, 32, 2);
            g.fillRect(12, 6, 24, 2);

            // Highlight
            g.fillStyle(0xa8d8fc);
            g.fillRect(16, 8, 8, 2);
            g.fillRect(28, 10, 6, 2);
        });

        // Pigeon (16x16)
        this.createTexture('pigeon', 16, 16, (g) => {
            // Body
            g.fillStyle(COLORS.PIGEON_GRAY);
            g.fillRect(4, 8, 10, 6);
            g.fillRect(2, 10, 2, 3);

            // Head
            g.fillStyle(0x808080);
            g.fillRect(10, 4, 5, 5);

            // Eye
            g.fillStyle(COLORS.ORANGE);
            g.fillRect(12, 5, 2, 2);
            g.fillStyle(COLORS.BLACK);
            g.fillRect(13, 5, 1, 1);

            // Beak
            g.fillStyle(COLORS.YELLOW);
            g.fillRect(15, 7, 1, 2);

            // Legs
            g.fillStyle(COLORS.ORANGE);
            g.fillRect(6, 14, 1, 2);
            g.fillRect(10, 14, 1, 2);

            // Wing detail
            g.fillStyle(0x707070);
            g.fillRect(4, 9, 6, 3);
        });

        // Pigeon flying
        this.createTexture('pigeon_fly', 16, 16, (g) => {
            // Body
            g.fillStyle(COLORS.PIGEON_GRAY);
            g.fillRect(4, 8, 10, 4);

            // Wings up
            g.fillStyle(0x909090);
            g.fillRect(2, 3, 4, 5);
            g.fillRect(10, 3, 4, 5);

            // Head
            g.fillStyle(0x808080);
            g.fillRect(6, 6, 4, 4);

            // Eye
            g.fillStyle(COLORS.ORANGE);
            g.fillRect(8, 7, 1, 1);

            // Beak
            g.fillStyle(COLORS.YELLOW);
            g.fillRect(6, 8, 1, 1);
        });

        // Pigeon poop (8x8)
        this.createTexture('pigeon_poop', 8, 8, (g) => {
            g.fillStyle(0xfcfcfc);
            g.fillRect(2, 2, 4, 4);
            g.fillRect(3, 1, 2, 1);
            g.fillRect(3, 6, 2, 1);
        });
    }

    generateCollectibles() {
        // Coin (8x8)
        this.createTexture('coin', 8, 8, (g) => {
            g.fillStyle(COLORS.COIN_GOLD);
            g.fillRect(1, 0, 6, 8);
            g.fillRect(0, 1, 8, 6);

            // Shine
            g.fillStyle(0xfcfc7c);
            g.fillRect(2, 1, 2, 2);

            // Dollar sign
            g.fillStyle(0xc89c28);
            g.fillRect(3, 2, 2, 4);
            g.fillRect(2, 3, 1, 1);
            g.fillRect(5, 4, 1, 1);
        });

        // Pretzel (12x12)
        this.createTexture('pretzel', 12, 12, (g) => {
            g.fillStyle(COLORS.PRETZEL_TAN);
            // Main loops
            g.fillRect(1, 3, 3, 6);
            g.fillRect(8, 3, 3, 6);
            g.fillRect(3, 1, 6, 2);
            g.fillRect(3, 9, 6, 2);
            g.fillRect(4, 5, 4, 2);

            // Salt specks
            g.fillStyle(COLORS.WHITE);
            g.fillRect(2, 4, 1, 1);
            g.fillRect(5, 2, 1, 1);
            g.fillRect(9, 5, 1, 1);
            g.fillRect(4, 10, 1, 1);
        });

        // Trash can (16x24)
        this.createTexture('trashcan', 16, 24, (g) => {
            // Can body
            g.fillStyle(0x606060);
            g.fillRect(2, 6, 12, 18);

            // Lid
            g.fillStyle(0x707070);
            g.fillRect(0, 2, 16, 4);
            g.fillRect(2, 0, 12, 2);

            // Handle
            g.fillStyle(0x505050);
            g.fillRect(6, 1, 4, 1);

            // Ridges
            g.fillStyle(0x505050);
            g.fillRect(2, 10, 12, 1);
            g.fillRect(2, 15, 12, 1);
            g.fillRect(2, 20, 12, 1);
        });

        // Trash can tipped
        this.createTexture('trashcan_tipped', 24, 16, (g) => {
            // Can body sideways
            g.fillStyle(0x606060);
            g.fillRect(6, 2, 18, 12);

            // Lid
            g.fillStyle(0x707070);
            g.fillRect(2, 0, 4, 16);
            g.fillRect(0, 2, 2, 12);

            // Ridges
            g.fillStyle(0x505050);
            g.fillRect(10, 2, 1, 12);
            g.fillRect(15, 2, 1, 12);
            g.fillRect(20, 2, 1, 12);
        });

        // Poop bag (12x12)
        this.createTexture('poop_bag', 12, 12, (g) => {
            // Bag
            g.fillStyle(0x40a040);
            g.fillRect(2, 2, 8, 8);
            g.fillRect(1, 3, 10, 6);

            // Tie
            g.fillStyle(0x308030);
            g.fillRect(4, 0, 4, 2);

            // Handles
            g.fillRect(3, 1, 2, 2);
            g.fillRect(7, 1, 2, 2);
        });
    }

    generatePowerUps() {
        // Power-up box (16x16)
        this.createTexture('powerup_box', 16, 16, (g) => {
            // Box
            g.fillStyle(COLORS.YELLOW);
            g.fillRect(1, 1, 14, 14);

            // Border
            g.fillStyle(COLORS.ORANGE);
            g.fillRect(0, 0, 16, 2);
            g.fillRect(0, 14, 16, 2);
            g.fillRect(0, 0, 2, 16);
            g.fillRect(14, 0, 2, 16);

            // Question mark
            g.fillStyle(COLORS.BLACK);
            g.fillRect(6, 3, 4, 2);
            g.fillRect(9, 4, 2, 3);
            g.fillRect(6, 6, 4, 2);
            g.fillRect(6, 7, 2, 2);
            g.fillRect(6, 11, 2, 2);
        });

        // Used power-up box
        this.createTexture('powerup_box_used', 16, 16, (g) => {
            g.fillStyle(0x606060);
            g.fillRect(1, 1, 14, 14);

            g.fillStyle(0x404040);
            g.fillRect(0, 0, 16, 2);
            g.fillRect(0, 14, 16, 2);
            g.fillRect(0, 0, 2, 16);
            g.fillRect(14, 0, 2, 16);
        });

        // MetroCard (16x10)
        this.createTexture('metrocard', 16, 10, (g) => {
            // Card body
            g.fillStyle(COLORS.YELLOW);
            g.fillRect(0, 0, 16, 10);

            // Stripe
            g.fillStyle(COLORS.BLUE);
            g.fillRect(0, 7, 16, 3);

            // M
            g.fillStyle(COLORS.BLACK);
            g.fillRect(2, 2, 2, 4);
            g.fillRect(4, 3, 1, 1);
            g.fillRect(5, 2, 2, 4);
        });

        // Pizza slice (16x16)
        this.createTexture('pizza', 16, 16, (g) => {
            // Crust
            g.fillStyle(COLORS.PRETZEL_TAN);
            g.fillRect(0, 12, 16, 4);

            // Cheese
            g.fillStyle(COLORS.YELLOW);
            g.fillRect(2, 2, 12, 10);
            g.fillRect(4, 0, 8, 2);
            g.fillRect(0, 10, 2, 2);
            g.fillRect(14, 10, 2, 2);

            // Pepperoni
            g.fillStyle(COLORS.RED);
            g.fillRect(4, 4, 3, 3);
            g.fillRect(9, 6, 3, 3);
            g.fillRect(6, 9, 3, 3);
        });

        // Hot dog (16x8)
        this.createTexture('hotdog', 16, 8, (g) => {
            // Bun
            g.fillStyle(COLORS.PRETZEL_TAN);
            g.fillRect(1, 1, 14, 6);
            g.fillRect(0, 2, 16, 4);

            // Dog
            g.fillStyle(0xc87048);
            g.fillRect(2, 2, 12, 3);
            g.fillRect(1, 3, 14, 1);

            // Mustard
            g.fillStyle(COLORS.YELLOW);
            g.fillRect(3, 2, 2, 1);
            g.fillRect(7, 2, 2, 1);
            g.fillRect(11, 2, 2, 1);
        });

        // OMNY card (16x10)
        this.createTexture('omny', 16, 10, (g) => {
            // Card body
            g.fillStyle(COLORS.BLACK);
            g.fillRect(0, 0, 16, 10);

            // OMNY waves
            g.fillStyle(COLORS.CYAN);
            g.fillRect(4, 2, 2, 6);
            g.fillRect(7, 1, 2, 8);
            g.fillRect(10, 2, 2, 6);
        });

        // Bus (48x32)
        this.createTexture('bus', 48, 32, (g) => {
            // Body
            g.fillStyle(COLORS.BLUE);
            g.fillRect(0, 4, 48, 22);

            // Windows
            g.fillStyle(COLORS.CYAN);
            g.fillRect(4, 8, 8, 8);
            g.fillRect(14, 8, 8, 8);
            g.fillRect(24, 8, 8, 8);
            g.fillRect(36, 8, 8, 8);

            // Windshield
            g.fillRect(40, 6, 6, 14);

            // Wheels
            g.fillStyle(COLORS.BLACK);
            g.fillRect(6, 24, 8, 8);
            g.fillRect(34, 24, 8, 8);

            // Wheel hubs
            g.fillStyle(0x808080);
            g.fillRect(8, 26, 4, 4);
            g.fillRect(36, 26, 4, 4);

            // MTA stripe
            g.fillStyle(COLORS.YELLOW);
            g.fillRect(0, 18, 48, 2);
        });
    }

    generateUI() {
        // Heart (12x12)
        this.createTexture('heart', 12, 12, (g) => {
            g.fillStyle(COLORS.RED);
            g.fillRect(1, 2, 4, 4);
            g.fillRect(7, 2, 4, 4);
            g.fillRect(0, 3, 12, 4);
            g.fillRect(1, 6, 10, 2);
            g.fillRect(2, 8, 8, 2);
            g.fillRect(3, 10, 6, 1);
            g.fillRect(4, 11, 4, 1);
        });

        // Empty heart
        this.createTexture('heart_empty', 12, 12, (g) => {
            g.fillStyle(0x404040);
            g.fillRect(1, 2, 4, 4);
            g.fillRect(7, 2, 4, 4);
            g.fillRect(0, 3, 12, 4);
            g.fillRect(1, 6, 10, 2);
            g.fillRect(2, 8, 8, 2);
            g.fillRect(3, 10, 6, 1);
            g.fillRect(4, 11, 4, 1);
        });
    }

    generateBackgrounds() {
        // Ground tile (32x32)
        this.createTexture('ground', 32, 32, (g) => {
            // Sidewalk
            g.fillStyle(0x888888);
            g.fillRect(0, 0, 32, 32);

            // Cracks
            g.fillStyle(0x707070);
            g.fillRect(8, 0, 1, 32);
            g.fillRect(24, 0, 1, 32);
            g.fillRect(0, 16, 32, 1);
        });

        // Sky (repeating, 64x450)
        this.createTexture('sky', 64, 450, (g) => {
            // Gradient effect
            g.fillStyle(COLORS.SKY_LIGHT);
            g.fillRect(0, 0, 64, 150);
            g.fillStyle(COLORS.SKY_BLUE);
            g.fillRect(0, 150, 64, 300);
        });

        // Cloud (48x24)
        this.createTexture('cloud', 48, 24, (g) => {
            g.fillStyle(COLORS.WHITE);
            g.fillRect(8, 8, 32, 12);
            g.fillRect(4, 12, 40, 8);
            g.fillRect(0, 14, 48, 4);
            g.fillRect(16, 4, 16, 8);
        });

        // Far building (64x120)
        this.createTexture('far_building', 64, 120, (g) => {
            g.fillStyle(0x786890);
            g.fillRect(0, 0, 64, 120);

            // Windows
            g.fillStyle(0x404050);
            for (let y = 10; y < 110; y += 20) {
                for (let x = 8; x < 56; x += 16) {
                    g.fillRect(x, y, 8, 12);
                }
            }
        });

        // Brownstone (80x100)
        this.createTexture('brownstone', 80, 100, (g) => {
            g.fillStyle(COLORS.BROWNSTONE);
            g.fillRect(0, 0, 80, 100);

            // Lighter trim
            g.fillStyle(COLORS.BROWNSTONE_LIGHT);
            g.fillRect(0, 0, 80, 8);
            g.fillRect(0, 0, 4, 100);
            g.fillRect(76, 0, 4, 100);

            // Windows
            g.fillStyle(0x303040);
            g.fillRect(10, 15, 20, 25);
            g.fillRect(50, 15, 20, 25);
            g.fillRect(10, 55, 20, 25);
            g.fillRect(50, 55, 20, 25);

            // Window frames
            g.fillStyle(COLORS.BROWNSTONE_LIGHT);
            g.fillRect(10, 15, 20, 2);
            g.fillRect(50, 15, 20, 2);
            g.fillRect(10, 55, 20, 2);
            g.fillRect(50, 55, 20, 2);

            // Door
            g.fillStyle(COLORS.BROWNSTONE_DARK);
            g.fillRect(32, 60, 16, 40);
        });

        // Tree (32x64)
        this.createTexture('tree', 32, 64, (g) => {
            // Trunk
            g.fillStyle(0x6c4c34);
            g.fillRect(12, 32, 8, 32);

            // Foliage
            g.fillStyle(COLORS.TREE_GREEN);
            g.fillRect(4, 8, 24, 28);
            g.fillRect(0, 16, 32, 16);
            g.fillRect(8, 0, 16, 12);

            // Darker patches
            g.fillStyle(COLORS.TREE_DARK);
            g.fillRect(6, 20, 8, 8);
            g.fillRect(18, 12, 8, 8);
        });

        // Stoop (32x24)
        this.createTexture('stoop', 32, 24, (g) => {
            g.fillStyle(COLORS.BROWNSTONE);
            g.fillRect(0, 8, 32, 16);
            g.fillRect(4, 0, 24, 8);
            g.fillRect(8, 4, 16, 4);

            // Steps
            g.fillStyle(COLORS.BROWNSTONE_LIGHT);
            g.fillRect(0, 8, 32, 2);
            g.fillRect(4, 4, 24, 1);
        });

        // Fence (32x24)
        this.createTexture('fence', 32, 24, (g) => {
            g.fillStyle(0x303030);
            // Posts
            g.fillRect(0, 0, 2, 24);
            g.fillRect(15, 0, 2, 24);
            g.fillRect(30, 0, 2, 24);
            // Rails
            g.fillRect(0, 4, 32, 2);
            g.fillRect(0, 18, 32, 2);
            // Spikes
            for (let x = 4; x < 30; x += 4) {
                g.fillRect(x, 0, 2, 20);
            }
        });
    }

    generateStore() {
        // Store front - Mr. Coco (128x96)
        this.createTexture('store_mrcoco', 128, 96, (g) => {
            // Building
            g.fillStyle(COLORS.BROWNSTONE);
            g.fillRect(0, 0, 128, 96);

            // Awning
            g.fillStyle(COLORS.GREEN);
            g.fillRect(0, 0, 128, 16);
            g.fillStyle(0x006800);
            g.fillRect(0, 12, 128, 4);

            // Window
            g.fillStyle(0x404050);
            g.fillRect(16, 24, 40, 48);

            // Door
            g.fillStyle(0x303040);
            g.fillRect(72, 24, 40, 72);

            // Door handle
            g.fillStyle(COLORS.YELLOW);
            g.fillRect(100, 56, 4, 8);

            // Sign area
            g.fillStyle(COLORS.WHITE);
            g.fillRect(20, 28, 32, 12);

            // Products in window
            g.fillStyle(COLORS.ORANGE);
            g.fillRect(24, 52, 8, 8);
            g.fillRect(36, 52, 8, 8);
            g.fillRect(30, 60, 8, 8);
        });

        // Home (64x80)
        this.createTexture('home', 64, 80, (g) => {
            // Building
            g.fillStyle(COLORS.BROWNSTONE);
            g.fillRect(0, 0, 64, 80);

            // Roof
            g.fillStyle(COLORS.BROWNSTONE_DARK);
            g.fillRect(0, 0, 64, 8);

            // Window
            g.fillStyle(0x6090c0);
            g.fillRect(8, 20, 20, 24);
            g.fillRect(36, 20, 20, 24);

            // Window frame
            g.fillStyle(COLORS.WHITE);
            g.fillRect(8, 20, 20, 2);
            g.fillRect(36, 20, 20, 2);
            g.fillRect(17, 20, 2, 24);
            g.fillRect(45, 20, 2, 24);

            // Door
            g.fillStyle(COLORS.RED);
            g.fillRect(24, 48, 16, 32);

            // Door handle
            g.fillStyle(COLORS.YELLOW);
            g.fillRect(28, 64, 3, 3);
        });

        // Stoop for home
        this.createTexture('home_stoop', 32, 16, (g) => {
            g.fillStyle(COLORS.BROWNSTONE_LIGHT);
            g.fillRect(0, 0, 32, 16);
            g.fillRect(0, 8, 32, 2);
        });
    }
}
