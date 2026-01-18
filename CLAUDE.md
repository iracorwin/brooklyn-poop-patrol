# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Brooklyn Poop Patrol is a retro-style 8-bit side-scrolling browser game built with HTML5 Canvas and JavaScript. Players control a 9-year-old girl navigating five NYC neighborhoods, avoiding dog poop, collecting coins/pretzels, and cleaning up streets. Each level has two phases: journey to a store (left→right) then return home with poop bags (right→left).

## Tech Stack

- HTML5 Canvas for 2D rendering
- Vanilla JavaScript (no framework specified)
- Web Audio API for sound
- localStorage for high score persistence
- Target: 60fps, modern browsers, keyboard controls (arrow keys)

## Game Architecture

### Core Systems
- **Game State Manager**: Handles phases (Phase 1: to store, Phase 2: return home), lives (3 hearts), score, 120-second timer per level
- **Physics/Collision**: Ground-based platformer with jumping, obstacle collision
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

## Audio Style

Kraftwerk-inspired electronic/synth 8-bit chiptune soundtrack. Required tracks: title theme, gameplay loop, level complete jingle, game over jingle, final victory music.

## Specification Reference

The complete game specification is in `brooklyn-poop-patrol-spec.md` (529 lines). Consult this for detailed requirements on:
- UI layout and element positioning
- Exact point values and timing
- Character appearance and animations
- Neighborhood visual themes
- Sound effect descriptions
- Power-up mechanics
