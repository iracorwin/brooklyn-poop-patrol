# Brooklyn Poop Patrol - Game Specification

## Overview

**Brooklyn Poop Patrol** is a retro-style 8-bit side-scrolling game set in New York City. The player controls a 9-year-old girl navigating NYC neighborhoods, avoiding dog poop, collecting points, and cleaning up the streets. The game combines classic platformer mechanics with a humorous urban twist.

### Visual Style
- 8-bit pixelated aesthetic reminiscent of classic NES games like Super Mario Bros.
- Modern color palettes and smooth animations despite the retro pixel art
- Each neighborhood has a distinct visual identity reflecting real NYC locations

### Audio Style
- Background music: Kraftwerk-inspired electronic/synth 8-bit soundtrack
- Upbeat, rhythmic, with a retro-futuristic feel

---

## Core Gameplay Loop

Each level follows a two-phase structure:

### Phase 1: Journey to the Store (Left → Right)
1. Player starts at a neighborhood-appropriate home (brownstone, loft, etc.)
2. Navigate right through the neighborhood, avoiding obstacles
3. Jump over dog poop (touching poop = lose a life)
4. Collect coins and pretzels for points
5. Jump on trash cans to release coins
6. Avoid puddles (slow you down) and pigeons (pause your character)
7. Collect power-ups from random boxes
8. Reach the neighborhood store

### Phase 2: Return Home with Poop Bags (Right → Left)
1. Character automatically exits store with poop bags
2. Navigate left back toward home
3. Same obstacles as Phase 1
4. NEW: Can now scoop poop with the down arrow (optional, for bonus points)
5. Limited poop bags (typically 10) - must manage which poops to collect
6. Reach home and throw bags in trash cans
7. Points animate as bags are disposed
8. Level complete!

---

## Controls

| Key | Action |
|-----|--------|
| Left Arrow | Move left |
| Right Arrow | Move right |
| Up Arrow | Jump |
| Down Arrow | Kneel/Scoop poop (when near poop, Phase 2 only) |

### Movement Details
- Full bidirectional control (can move backward freely)
- Character can jump while moving
- Scooping requires being near poop and pressing down arrow

---

## Player Character

### Appearance
- 9-year-old girl with brown bob-cut hair (mouth-length)
- Outfit: Sparkly/colorful hoodie (Berlin club kid aesthetic, "StarStyling" inspired)
- Blue jeans
- Sneakers

### Animations Required
1. **Idle**: Arms folded, slight breathing animation
2. **Walking/Running**: Standard walk cycle
3. **Jumping**: Arms up, legs tucked
4. **Scooping**: Kneeling down with bag
5. **Hit by poop**: Stumble/fall animation
6. **Wet from puddle**: Dripping, slower movement
7. **Hit by pigeon poop**: Wiping off head, annoyed expression
8. **Victory**: Celebrating at end of level

---

## Obstacles & Hazards

### Dog Poop (Primary Obstacle)
- Brown pixelated poop piles on the ground
- **On contact**: Lose one life
- **Avoidance**: Jump over
- **Collection** (Phase 2 only): Press down arrow when near to scoop into bag
- Points for collection: **2 points per poop**
- Poop placement: Slightly more poops than bags available (e.g., 12 poops, 10 bags)

### Puddles
- Blue/gray water puddles on the ground
- **On contact**: Character gets wet, movement slowed for 10 seconds
- Visual: Dripping water effect on character
- No life lost, just time penalty

### Pigeons
Two types of pigeon hazards:

1. **Flying Pigeons**
   - Fly across the screen at random intervals
   - Player must move out of the way
   - If hit: Pigeon poops on player

2. **Tree Pigeons**
   - Sit in trees in the background/foreground
   - Occasionally poop downward
   - Player must avoid the falling poop

**When hit by pigeon poop**:
- Character pauses for several seconds to clean off
- "Splat" sound effect
- Time penalty (important due to level timer)
- Pigeon frequency increases with level difficulty (but never excessive)

---

## Collectibles & Points

### Coins
- Golden pixel coins
- Found by jumping on trash cans (trash can tips over, coins spill out)
- **Value: 2 points each**
- Sound: "DING!"

### Pretzels
- Classic NYC pretzel shape
- Float in the air at various heights
- Collected by touching/jumping into them
- **Value: 1 point each**
- Sound: "DING!"

### Poop (Phase 2)
- Scoop with down arrow when near
- Uses one poop bag from inventory
- **Value: 2 points each**
- Sound: Little "ta-da!" beep

### Trash Cans
- Scattered throughout level
- Jump and land on top to tip over
- Releases 3-5 coins when tipped
- Sound: Crashing noise
- Cannot be tipped twice

---

## Power-Ups

Power-ups appear in boxes/crates scattered throughout levels. Player must jump and land on them (like Mario's ? blocks) to activate.

| Power-Up | Icon | Effect |
|----------|------|--------|
| MetroCard | Yellow/blue card | Gain one extra life (heart refills) |
| OMNY Card | Blue tap card | Auto-ride a bus forward, skipping several obstacles |
| Hot Dog | NYC hot dog | +1 poop bag added to inventory |
| Pizza Slice | NYC pizza slice | "Special Boots" - immune to poop damage for 10 seconds |

### Power-Up Details

**MetroCard**
- Instantly restores one lost heart
- If at full health, adds to reserve (if implementing extra lives beyond 3)
- Or simply maxes out at 3 hearts

**OMNY Card**
- A bus appears and character automatically hops on
- Bus drives forward for several seconds
- Player cannot control movement during ride
- Safely passes over any obstacles in path
- Automatic dismount after set distance

**Pizza Slice (Special Boots)**
- 10-second duration
- Visual indicator: Sparkly boots or glowing feet effect
- Can walk directly through poop without dying
- Does NOT auto-collect poop
- Timer or visual countdown for remaining duration

**Hot Dog**
- +1 poop bag to inventory
- Only useful if collected before or during Phase 2
- Visual: Bag count increases

---

## Lives System

### Hearts Display
- 3 hearts shown in top-left corner
- Full heart = life available (filled with color)
- Empty heart = life lost (outline only, no fill)
- Reference: Player's hand-drawn heart designs

### Life Loss Triggers
- Stepping in dog poop
- Timer running out

### On Death
- Death animation plays
- Respawn at:
  - Beginning of level (if in Phase 1)
  - Store entrance (if in Phase 2)
- Obstacles reset to original positions

### Game Over
- Occurs when all 3 lives lost
- "Game Over" screen displays
- Option to restart from current level (not Level 1)
- High score saved if applicable

---

## Timer System

- **120 seconds per level** (both phases combined)
- Displayed at top-center of screen
- Counts down continuously
- **Time bonuses**: 1 point per 5 seconds remaining at level completion
- **Time penalties**:
  - Puddles slow movement (indirect time loss)
  - Pigeon poop pauses character (direct time loss)
  - Poop scooping takes time (strategic choice)
- **Timer expires**: Lose one life, restart current phase

---

## UI Layout

```
┌─────────────────────────────────────────────────────────────┐
│  ♥ ♥ ♡           1:45            SCORE: 00247              │
│  🛍️ x 7                                                     │
│                                                             │
│                                                             │
│                    [GAME AREA]                              │
│                                                             │
│                                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### UI Elements

| Position | Element | Details |
|----------|---------|---------|
| Top-Left | Lives | 3 heart icons (filled/empty) |
| Below Lives | Bag Count | Poop bag icon + number (Phase 2 only) |
| Top-Center | Timer | Countdown in M:SS format |
| Top-Right | Score | Current point total |

---

## Levels & Neighborhoods

### Level Progression
5 levels, each representing a NYC neighborhood. Difficulty increases through:
- More dog poop
- Fewer poop bags
- More pigeons
- More puddles
- Tighter timing

### Level 1: Clinton Hill
**Visual Theme**: Beautiful old brownstones, tree-lined streets, classic Brooklyn charm
- Brownstone buildings in background
- Lots of mature trees (with occasional pigeons)
- Wrought iron fences
- Stoops with potted plants

**Home**: Classic brownstone with stoop
**Store**: Mr. Coco (neighborhood bodega)
**Difficulty**: Easy introduction
- Poop count: ~10
- Bag count: 10
- Minimal pigeons

### Level 2: Park Slope
**Visual Theme**: Family-friendly, playgrounds, schools, restaurants
- Brownstones similar to Clinton Hill
- Playground equipment visible
- School buildings
- Restaurant awnings
- Stroller-friendly sidewalks

**Home**: Brownstone with garden
**Store**: Union Market
**Difficulty**: Slightly harder
- Poop count: ~12
- Bag count: 10
- More puddles (it's a bit rainier here)

### Level 3: Williamsburg
**Visual Theme**: Industrial lofts meet trendy cafes, hipster aesthetic
- Old factory buildings converted to lofts
- Trendy coffee shops
- Street art/murals on walls
- Vintage clothing stores
- Bike lanes

**Home**: Industrial loft building
**Store**: Variety Coffee (or similar trendy spot)
**Difficulty**: Medium
- Poop count: ~14
- Bag count: 9
- More obstacles overall

### Level 4: Coney Island
**Visual Theme**: Amusement park, boardwalk, beach vibes
- Boardwalk planks
- Amusement park rides in background (Wonder Wheel, Cyclone)
- Beach and ocean visible
- Hot dog stands
- Arcade buildings

**Home**: Beach bungalow/apartment
**Store**: Nathan's Famous (iconic!)
**Difficulty**: Hard
- Poop count: ~16
- Bag count: 8
- Lots of pigeons (seagulls too?)
- Boardwalk has more gaps/obstacles

### Level 5: Manhattan
**Visual Theme**: Big city, classic skyscrapers, urban jungle
- Tall buildings (Empire State, Chrysler-style architecture)
- Yellow taxis in background
- Busy sidewalks feel
- Street vendors
- Subway entrances

**Home**: Apartment building entrance
**Store**: Iconic NYC deli/bodega
**Difficulty**: Hardest
- Poop count: ~18
- Bag count: 7
- Maximum pigeons
- Fastest pace
- Most obstacles

---

## Background & Parallax Scrolling

### Parallax Layers (back to front)
1. **Sky**: Clouds slowly moving (like Super Mario)
2. **Far Background**: Distant buildings/skyline
3. **Mid Background**: Trees, buildings appropriate to neighborhood
4. **Near Background**: Fences, stoops, street furniture
5. **Ground Layer**: Sidewalk where player walks
6. **Foreground**: Occasional elements that pass in front

### Neighborhood-Specific Elements
Reference player's drawings for:
- Trees with round, fluffy tops and simple trunks
- Tall buildings with antenna on top
- Grass texture at ground level

---

## Screens & Flow

### 1. Title Screen
- "BROOKLYN POOP PATROL" logo (8-bit styled)
- Animated character and poop
- "PRESS START" or "PLAY" button
- High Score display
- Options/Settings button (if applicable)

### 2. Neighborhood Intro Screen
- Full-screen display of neighborhood name
- Brief visual of the area
- "LEVEL X: [NEIGHBORHOOD NAME]"
- Example: "LEVEL 1: CLINTON HILL"
- Auto-transitions after 2-3 seconds or press any key

### 3. Gameplay Screen
- Main game area with UI overlay
- Pause functionality (ESC or P key)

### 4. Store Transition
- Brief animation of character entering store
- "BUYING POOP BAGS..." text
- Character exits with bags
- Bag count appears in UI
- Phase 2 begins (direction reverses)

### 5. Level Complete Screen
- "LEVEL COMPLETE!" banner
- Stats display:
  - Poops collected: X/Y
  - Points from poop: X
  - Coins collected: X
  - Pretzels collected: X
  - Time bonus: X points
  - **TOTAL SCORE: XXXX**
- "CONTINUE" button to next level

### 6. Game Over Screen
- "GAME OVER" text
- Final score display
- "TRY AGAIN" (restart current level)
- "QUIT" (return to title)
- High score update if applicable

### 7. Victory Screen (After Level 5)
- Congratulations message
- Final total score
- All neighborhoods completed celebration
- Character victory dance animation
- Option to play again

---

## Sound Effects

| Action | Sound Description |
|--------|-------------------|
| Coin/Pretzel collect | "DING!" - bright, cheerful chime |
| Trash can tip | Crashing/clattering noise |
| Poop scoop | "Ta-da!" triumphant little beep |
| Pigeon poop hit | "SPLAT!" wet impact sound |
| Step in poop | Squelching/gross noise + sad tone |
| Jump | Classic 8-bit jump sound |
| Puddle splash | Water splash sound |
| Power-up collect | Magical ascending tone |
| Life lost | Descending sad tone |
| Level complete | Triumphant fanfare |
| Game over | Classic game over jingle |
| Timer warning | Ticking sound when under 30 seconds |

---

## Music

### Style Reference: Kraftwerk
- Electronic/synth-based
- Rhythmic and hypnotic
- 8-bit chiptune interpretation
- Upbeat but not frantic (casual game feel)

### Tracks Needed
1. **Title Screen**: Catchy main theme
2. **Gameplay**: Looping background track (per neighborhood or universal)
3. **Level Complete**: Short victory jingle
4. **Game Over**: Brief sad jingle
5. **Final Victory**: Extended celebration music

### Optional: Neighborhood Variations
Each neighborhood could have slight musical variations while maintaining the Kraftwerk-inspired base style.

---

## High Score System

### Local Storage
- Save highest score achieved
- Persist between browser sessions
- Display on title screen

### Score Breakdown
| Source | Points |
|--------|--------|
| Coin | 2 |
| Pretzel | 1 |
| Poop scooped | 2 |
| Time bonus | 1 per 5 seconds remaining |

---

## Technical Requirements

### Platform
- In-browser game (HTML5/JavaScript)
- Responsive design for various screen sizes
- Keyboard controls (arrow keys)

### Performance
- Smooth 60fps gameplay
- Efficient sprite handling for parallax backgrounds
- Optimized for modern browsers

### Assets Needed
1. **Character Sprites**: All animations for main character
2. **Obstacle Sprites**: Poop, puddles, pigeons
3. **Collectible Sprites**: Coins, pretzels
4. **Power-up Sprites**: MetroCard, OMNY, hot dog, pizza
5. **UI Sprites**: Hearts, poop bags, numbers
6. **Environment Sprites**: Per-neighborhood tilesets
7. **Background Layers**: Per-neighborhood parallax images
8. **Sound Effects**: All listed sounds
9. **Music Tracks**: All listed music

### Reference Art (from player)
- Heart designs (full and empty) - for life display
- Tree and building - for background elements
- Character design - girl with bob cut
- Poop design - for obstacle sprites

---

## Future Enhancements (Post-MVP)

These features are not required for initial build but may be added later:

1. **Additional Characters**: Different playable characters with unique looks
2. **Character Abilities**: Different characters with different abilities
3. **Mobile Controls**: Touch screen support
4. **More Neighborhoods**: Queens, Bronx, Staten Island
5. **Boss Battles**: Giant pigeon? Aggressive unleashed dog?
6. **Multiplayer**: Co-op or competitive modes
7. **Achievements**: Unlock badges for special accomplishments
8. **Costume Shop**: Spend points on new outfits

---

## Summary

Brooklyn Poop Patrol is a charming, casual 8-bit side-scroller that combines classic platformer mechanics with a uniquely NYC experience. Players navigate five distinct neighborhoods, avoiding hazards, collecting points, and cleaning up the streets one poop at a time. With Kraftwerk-inspired music, pixelated visuals, and a lovable protagonist, the game offers nostalgic gameplay with a modern urban twist.

**Key Features**:
- 5 unique NYC neighborhood levels
- Two-phase gameplay (to store and back)
- Strategic poop bag management
- Multiple obstacle types (poop, puddles, pigeons)
- Power-up system with NYC-themed items
- Time pressure with 120-second limit
- High score persistence
- 8-bit retro aesthetic with modern polish
