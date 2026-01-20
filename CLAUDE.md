# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Brooklyn Poop Patrol is a retro-style 8-bit side-scrolling browser game built with Phaser 3 and JavaScript. Players control a 9-year-old girl navigating five NYC neighborhoods, avoiding dog poop, collecting coins/pretzels, and cleaning up streets. Each level has two phases: journey to a store (left→right) then return home with poop bags (right→left).

## Tech Stack

- **Phaser 3** - Game framework (loaded from CDN in index.html)
- **HTML5 Canvas** - 2D rendering (handled by Phaser)
- **Vanilla JavaScript** - ES6 modules, no other frameworks
- **Web Audio API** - Procedural 8-bit chiptune generation
- **localStorage** - High score persistence
- Target: 60fps, modern browsers, keyboard controls (arrow keys)

## Development Setup

### Quick Start
```bash
# Start local server (from project root)
python3 -m http.server 8080

# Open browser to http://localhost:8080
```

### Project Structure
```
src/
├── main.js                 # Entry point, Phaser config, scene registration
├── config/
│   ├── GameConfig.js       # Game constants (dimensions, physics, colors, points)
│   └── LevelConfig.js      # Per-level spawn configurations
├── scenes/                 # Phaser scene classes (screen states)
│   ├── BootScene.js        # Asset generation at startup
│   ├── TitleScene.js       # Title screen
│   ├── LevelIntroScene.js  # Neighborhood intro
│   ├── GameScene.js        # Main gameplay loop (Phase 1 & 2)
│   ├── StoreTransitionScene.js # Phase 1→2 transition
│   ├── LevelCompleteScene.js   # Level results screen
│   └── GameOverScene.js    # Game over screen
├── entities/               # Game objects with physics/rendering
│   ├── Player.js           # Controllable character with 8 animation states
│   ├── Poop.js             # Static obstacle
│   ├── Puddle.js           # Slowing obstacle
│   ├── Pigeon.js           # Flying enemy + projectiles
│   ├── Coin.js             # Collectible from trash cans
│   ├── Pretzel.js          # Floating collectible
│   ├── TrashCan.js         # Source of coins
│   └── PowerUp.js          # MetroCard, OMNY Card, Pizza Slice, Hot Dog
├── managers/
│   ├── GameStateManager.js # Singleton tracking lives, score, phase, timer
│   └── ParallaxManager.js  # 6-layer background parallax per neighborhood
├── ui/
│   └── HUD.js              # Score, timer, hearts display
└── utils/
    ├── ChiptuneGenerator.js # Web Audio procedural music/sfx
    └── AssetGenerator.js    # Procedural sprite generation (pixels)
```

## Architecture & Key Patterns

### Scene Management (Phaser 3)
The game uses Phaser's scene system for state management. Each scene is a complete screen state:
- Scenes transition via `this.scene.start('SceneName')` or `this.scene.switch()`
- GameScene handles both Phase 1 and Phase 2 gameplay (toggled via `gameState.currentPhase`)
- Global game state is managed by singleton `gameState` (GameStateManager.js)

### Game State Manager (Singleton)
Located in `src/managers/GameStateManager.js`. Tracks:
- `currentLevel`: 0-4 (Clinton Hill through Manhattan)
- `currentPhase`: 1 or 2 (to store or return home)
- `lives`: Current life count (starts at 3)
- `score`: Running total across all levels
- `levelTimer`: Countdown from 120 seconds
- `highScore`: Persisted to localStorage
- Game progress flags (phase completion, etc.)

Access globally: `import { gameState } from '../managers/GameStateManager.js'`

### Physics & Collision
- **Arcade physics**: Gravity only affects player and enemies
- **Ground collider**: Player collides with static ground group
- **Obstacle detection**: OnOverlap used for pickups (coins, pretzels); OnCollide for damage (poop)
- Entity groups are created per-scene and destroyed on scene transition

### Asset Generation
Two utility modules generate assets procedurally (no external image/audio files):
- **AssetGenerator.js**: Creates pixel-art sprites as Phaser texture cache entries
- **ChiptuneGenerator.js**: Generates 8-bit audio tracks using Web Audio API

Both run during BootScene to populate the cache before gameplay begins.

### Entity Spawning
Level configuration in `src/config/LevelConfig.js` defines spawn positions per level:
- Each level exports an object (e.g., `CLINTON_HILL`) with arrays of entity spawn data
- GameScene iterates these configs and instantiates entities at setup time
- Positions are absolute coordinates within the 3200px-wide level

### Parallax Scrolling
ParallaxManager creates 6 background layers per neighborhood. Camera follows player:
- Layers at different depths scroll at different speeds
- Layer depth in Phaser controls parallax effect
- Background is re-created when changing neighborhoods

### Core Systems
- **Game State Manager**: Handles phases (Phase 1: to store, Phase 2: return home), lives (3 hearts), score, 120-second timer per level
- **Physics/Collision**: Ground-based platformer with jumping, obstacle collision (Phaser Arcade Physics)
- **Parallax Scrolling**: 6 background layers per neighborhood (sky → clouds → far buildings → mid buildings → near elements → foreground)

### Entity Types
- **Player**: 8 animation states (idle, walking, jumping, scooping, hit, wet, pigeon-hit, victory)
- **Obstacles**: Dog poop (lose life on contact), puddles (slow 10s), pigeons (flying + tree-based, pause on hit)
- **Collectibles**: Coins (2pts, from trash cans), pretzels (1pt, floating), poop bags (Phase 2 only, 2pts each)
- **Power-ups**: MetroCard (+1 life), OMNY Card (auto-bus ride), Pizza Slice (10s poop immunity), Hot Dog (+1 bag)

### Level Structure
5 levels with increasing difficulty:
1. **Clinton Hill** - 10 poops, 10 bags, store: Mr. Coco
2. **Park Slope** - 12 poops, 10 bags, store: Union Market
3. **Williamsburg** - 14 poops, 9 bags, store: Variety Coffee
4. **Coney Island** - 16 poops, 8 bags, store: Nathan's Famous
5. **Manhattan** - 18 poops, 7 bags, maximum obstacles

### Screen Flow
Title → Neighborhood Intro → Phase 1 Gameplay → Store Transition → Phase 2 Gameplay → Level Complete → (Next Level or Victory)

## Audio & Procedural Generation

**Chiptune Audio** (ChiptuneGenerator.js):
- Generates Kraftwerk-inspired electronic/synth 8-bit audio using Web Audio API
- No external audio files required
- Produces: title theme, gameplay loop, level complete jingle, game over jingle, final victory music

**Sprite Generation** (AssetGenerator.js):
- Procedurally generates all pixel-art graphics as canvas textures
- Stores textures in Phaser's cache for runtime use
- Runs once at boot before any scene gameplay starts

## Specification Reference

The complete game specification is in `brooklyn-poop-patrol-spec.md`. Consult this for detailed requirements on:
- UI layout and element positioning
- Exact point values and timing
- Character appearance and animations
- Neighborhood visual themes
- Sound effect descriptions
- Power-up mechanics
