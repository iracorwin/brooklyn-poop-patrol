// Game constants and configuration
export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 450;

// Player settings
export const PLAYER = {
    SPEED: 160,
    JUMP_VELOCITY: -350,
    WIDTH: 16,
    HEIGHT: 24,
    SLOW_MULTIPLIER: 0.5,
    SLOW_DURATION: 10000, // 10 seconds
    IMMUNITY_DURATION: 10000, // 10 seconds for pizza
    PIGEON_PAUSE_DURATION: 2000 // 2 seconds
};

// Level settings
export const LEVEL = {
    TIMER_DURATION: 120, // 120 seconds per level
    LEVEL_WIDTH: 3200, // Level width in pixels
    GROUND_Y: 400 // Ground position
};

// Points
export const POINTS = {
    COIN: 2,
    PRETZEL: 1,
    POOP_BAG: 2,
    TIME_BONUS_MULTIPLIER: 10 // Points per second remaining
};

// Lives
export const LIVES = {
    STARTING: 3,
    MAX: 5
};

// Power-up durations
export const POWERUP = {
    PIZZA_IMMUNITY: 10000,
    BUS_SPEED: 400
};

// Colors (NES-inspired palette)
export const COLORS = {
    // UI colors
    WHITE: 0xfcfcfc,
    BLACK: 0x000000,
    RED: 0xbc0000,
    GREEN: 0x00a800,
    BLUE: 0x0000bc,
    YELLOW: 0xfcfc00,
    ORANGE: 0xfc7400,
    PINK: 0xf878f8,
    PURPLE: 0x9878f8,
    CYAN: 0x00e8d8,

    // Sky colors
    SKY_BLUE: 0x68d8fc,
    SKY_LIGHT: 0xa4e4fc,

    // Building colors
    BROWNSTONE: 0x8c5030,
    BROWNSTONE_LIGHT: 0xa86840,
    BROWNSTONE_DARK: 0x6c3c20,
    BRICK: 0xb85020,

    // Nature colors
    TREE_GREEN: 0x00a800,
    TREE_DARK: 0x007800,
    GRASS: 0x58a028,

    // Character colors
    SKIN: 0xf8b878,
    HAIR_BROWN: 0x503000,
    HOODIE_PINK: 0xf878f8,
    HOODIE_PURPLE: 0x9878f8,
    JEANS: 0x0058f8,

    // Object colors
    POOP_BROWN: 0x6c4400,
    POOP_LIGHT: 0x8c5c18,
    COIN_GOLD: 0xfcbc3c,
    PRETZEL_TAN: 0xd89848,
    PUDDLE_BLUE: 0x68a8fc,
    PIGEON_GRAY: 0xa0a0a0
};
