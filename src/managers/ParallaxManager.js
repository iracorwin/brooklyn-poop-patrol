import { GAME_WIDTH, GAME_HEIGHT, LEVEL } from '../config/GameConfig.js';

export class ParallaxManager {
    constructor(scene) {
        this.scene = scene;
        this.layers = [];
    }

    create(levelConfig) {
        const colors = levelConfig.background;

        // Layer 0: Sky (static)
        this.createSkyLayer(colors.skyColor);

        // Layer 1: Clouds (slowest scrolling)
        this.createCloudLayer(0.1);

        // Layer 2: Far buildings (slow)
        this.createFarBuildingLayer(colors.farBuildingColor, 0.2);

        // Layer 3: Mid buildings (brownstones)
        this.createMidBuildingLayer(0.4);

        // Layer 4: Near elements (trees, fences, stoops)
        this.createNearElementLayer(0.6);

        // Layer 5: Ground (moves with camera)
        this.createGroundLayer();
    }

    createSkyLayer(color) {
        const sky = this.scene.add.rectangle(
            GAME_WIDTH / 2,
            GAME_HEIGHT / 2,
            GAME_WIDTH,
            GAME_HEIGHT,
            color
        );
        sky.setScrollFactor(0);
        sky.setDepth(-100);
        this.layers.push({ sprite: sky, scrollFactor: 0 });
    }

    createCloudLayer(scrollFactor) {
        const container = this.scene.add.container(0, 0);
        container.setDepth(-90);

        // Add clouds at various positions
        const cloudPositions = [
            { x: 100, y: 60 },
            { x: 350, y: 40 },
            { x: 600, y: 80 },
            { x: 900, y: 50 },
            { x: 1200, y: 70 },
            { x: 1500, y: 45 },
            { x: 1800, y: 85 },
            { x: 2100, y: 55 },
            { x: 2400, y: 65 },
            { x: 2700, y: 75 },
            { x: 3000, y: 50 }
        ];

        cloudPositions.forEach(pos => {
            const cloud = this.scene.add.image(pos.x, pos.y, 'cloud');
            cloud.setScale(1 + Math.random() * 0.5);
            cloud.setAlpha(0.9);
            container.add(cloud);
        });

        container.setScrollFactor(scrollFactor);
        this.layers.push({ sprite: container, scrollFactor });
    }

    createFarBuildingLayer(color, scrollFactor) {
        const container = this.scene.add.container(0, 0);
        container.setDepth(-80);

        // Create silhouette buildings with light, desaturated color for depth
        for (let x = 0; x < LEVEL.LEVEL_WIDTH + GAME_WIDTH; x += 80) {
            const height = 80 + Math.random() * 60;
            const building = this.scene.add.image(x, LEVEL.GROUND_Y - height / 2 + 10, 'far_building');
            building.setScale(1, height / 120);
            // Use very light blue-gray to blend with sky and create depth
            building.setTint(0xb0c8d8);
            container.add(building);
        }

        container.setScrollFactor(scrollFactor);
        this.layers.push({ sprite: container, scrollFactor });
    }

    createMidBuildingLayer(scrollFactor) {
        const container = this.scene.add.container(0, 0);
        container.setDepth(-70);

        // Create brownstone buildings with lighter tint for depth
        for (let x = 0; x < LEVEL.LEVEL_WIDTH + GAME_WIDTH; x += 100) {
            const brownstone = this.scene.add.image(x, LEVEL.GROUND_Y + 16, 'brownstone');
            brownstone.setOrigin(0.5, 1);
            // No tint needed - sprite is already gray
            container.add(brownstone);
        }

        container.setScrollFactor(scrollFactor);
        this.layers.push({ sprite: container, scrollFactor });
    }

    createNearElementLayer(scrollFactor) {
        const container = this.scene.add.container(0, 0);
        container.setDepth(-60);

        // Mix of trees, fences, and stoops
        for (let x = 50; x < LEVEL.LEVEL_WIDTH + GAME_WIDTH; x += 150) {
            const rand = Math.random();

            if (rand < 0.4) {
                // Tree
                const tree = this.scene.add.image(x, LEVEL.GROUND_Y, 'tree');
                tree.setOrigin(0.5, 1);
                container.add(tree);
            } else if (rand < 0.7) {
                // Fence section
                const fence = this.scene.add.image(x, LEVEL.GROUND_Y - 12, 'fence');
                fence.setOrigin(0.5, 1);
                container.add(fence);
            } else {
                // Stoop
                const stoop = this.scene.add.image(x, LEVEL.GROUND_Y - 12, 'stoop');
                stoop.setOrigin(0.5, 1);
                container.add(stoop);
            }
        }

        container.setScrollFactor(scrollFactor);
        this.layers.push({ sprite: container, scrollFactor });
    }

    createGroundLayer() {
        // Ground tiles that move with camera
        const groundGroup = this.scene.add.group();

        for (let x = 0; x < LEVEL.LEVEL_WIDTH + 64; x += 32) {
            const tile = this.scene.add.image(x, LEVEL.GROUND_Y + 16, 'ground');
            tile.setDepth(-50);
            groundGroup.add(tile);
        }

        this.layers.push({ sprite: groundGroup, scrollFactor: 1 });
    }

    update(cameraX) {
        // Parallax is handled by Phaser's scrollFactor, no manual update needed
    }

    destroy() {
        this.layers.forEach(layer => {
            if (layer.sprite.destroy) {
                layer.sprite.destroy();
            }
        });
        this.layers = [];
    }
}
