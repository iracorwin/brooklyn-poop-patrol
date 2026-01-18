// Level configuration for Clinton Hill (Level 1)
export const CLINTON_HILL = {
    name: 'Clinton Hill',
    number: 1,
    storeName: 'Mr. Coco',
    poopCount: 10,
    bagCount: 10,

    // Background layer colors for parallax
    background: {
        skyColor: 0x68d8fc,
        cloudColor: 0xfcfcfc,
        farBuildingColor: 0x786890,
        midBuildingColor: 0x8c5030,
        nearElementColor: 0x00a800,
        groundColor: 0x888888
    },

    // Obstacle placements (x positions)
    obstacles: {
        // Poop positions in Phase 1 (player goes right)
        poops: [
            { x: 400, phase: 1 },
            { x: 650, phase: 1 },
            { x: 900, phase: 1 },
            { x: 1150, phase: 1 },
            { x: 1400, phase: 1 },
            { x: 1700, phase: 1 },
            { x: 1950, phase: 1 },
            { x: 2200, phase: 1 },
            { x: 2500, phase: 1 },
            { x: 2800, phase: 1 }
        ],
        puddles: [
            { x: 550, width: 48 },
            { x: 1050, width: 64 },
            { x: 1600, width: 48 },
            { x: 2100, width: 56 },
            { x: 2650, width: 48 }
        ],
        pigeons: [
            { x: 750, type: 'flying' },
            { x: 1300, type: 'tree' },
            { x: 1850, type: 'flying' },
            { x: 2400, type: 'tree' }
        ]
    },

    // Collectible placements
    collectibles: {
        trashCans: [
            { x: 300 },
            { x: 800 },
            { x: 1250 },
            { x: 1750 },
            { x: 2300 }
        ],
        pretzels: [
            { x: 450, y: 320 },
            { x: 700, y: 300 },
            { x: 1000, y: 320 },
            { x: 1350, y: 300 },
            { x: 1550, y: 320 },
            { x: 1900, y: 300 },
            { x: 2250, y: 320 },
            { x: 2550, y: 300 },
            { x: 2750, y: 320 }
        ]
    },

    // Power-up placements
    powerUps: [
        { x: 600, type: 'pizza' },
        { x: 1500, type: 'metrocard' },
        { x: 2000, type: 'hotdog' },
        { x: 2600, type: 'omny' }
    ],

    // Level boundaries
    startX: 100,
    storeX: 3000,
    homeX: 100
};

export const LEVELS = [CLINTON_HILL];
