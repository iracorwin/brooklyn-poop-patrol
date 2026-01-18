import { AssetGenerator } from '../utils/AssetGenerator.js';

export class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Show loading text
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        this.add.text(width / 2, height / 2 - 20, 'LOADING...', {
            fontFamily: 'monospace',
            fontSize: '24px',
            color: '#fcfc00'
        }).setOrigin(0.5);

        // Create loading bar
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 + 10, 320, 30);

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xfcfc00, 1);
            progressBar.fillRect(width / 2 - 155, height / 2 + 15, 310 * value, 20);
        });
    }

    create() {
        // Generate all pixel art assets
        const assetGenerator = new AssetGenerator(this);
        assetGenerator.generateAll();

        // Transition to title screen
        this.scene.start('TitleScene');
    }
}
