# Honey Lost in Space

A small browser game built with plain HTML, CSS, and JavaScript. Honey is lost in space, and sneaky Cat Enemies in spaceships are trying to catch her. Move her around the screen to dodge the ships. If she gets caught three times, the game is over.

## How to run

You don't need to build or install anything.

1. Clone or download this repository.
2. Open `index.html` in a web browser.

You can also serve the folder with any static server (for example the VS Code Live Server extension, or `npx serve .`) and open the URL it prints.

## How to play

| Key | Action |
| --- | --- |
| ← Left arrow | Move Honey left |
| → Right arrow | Move Honey right |
| ↑ Up arrow | Move Honey up |
| ↓ Down arrow | Move Honey down |

- Click **Start Game** on the welcome screen.
- Enemy spaceships appear at the top of the play area and fall downward.
- Every time a ship touches Honey, you lose one of your three hearts.
- When all three hearts are gone, the **Game Over** screen appears. Click **Play again** to start a new round.

## Project structure

```
honey-goes-to-space/
├── index.html          # Page markup: welcome, game and end screens
├── style.css           # Layout, colors, fonts and animations
├── javascript/
│   ├── enemy.js        # Enemy class (falling spaceships)
│   ├── honey.js        # Honey class (the player)
│   ├── game.js         # Game class (game loop, collisions, lives, screens)
│   └── index.js        # Button and keyboard event wiring
└── images/             # Sprites and background art
```

The scripts are loaded in this order at the end of `index.html`: `enemy.js`, `honey.js`, `game.js`, `index.js`. The classes are globals, so `game.js` needs to load after `enemy.js` and `honey.js`, and `index.js` needs to load last.

## Screens

`index.html` has three screens. Each one has the shared `scream` class, which sets a 60vw × 70vh area with centered content.

### Welcome screen (`.welcome-layout`)
- Dark purple panel (`rgb(55, 1, 105)`) with rounded corners.
- Title "Honey Lost in space", a short story, the "How to play" list, and the **Start Game** button.
- The `hi-honey.png` picture of Honey is shown next to the text.

### Game screen (`.game-screen`)
- Hidden until the game starts.
- Semi-transparent purple play area (`rgba(55, 1, 105, 0.5)`), 55vw × 80vh, `position: relative`, so Honey and the enemies are positioned inside it.
- Three heart images (`heart_full.png`) in the top-left corner show the remaining lives.

### End screen (`.end-screen`)
- Hidden until the game ends.
- A large yellow "Game Over" heading, the `honey_game_over.png` picture, and the **Play again** button.

## Code overview

### `Honey` ([javascript/honey.js](javascript/honey.js))

The player character. It's a `div` with the `honey transparent.png` background image, added to the game screen.

| Property | Value |
| --- | --- |
| Starting position | `x = 300`, `y = 350` |
| Size | 150 × 165 px |
| Step size | 16 px per key press |
| Animation | `honey-float 2s ease-in-out infinite` (bobs up and down by 12px) |

Methods:
- `moveUp()`, `moveDown()`, `moveLeft()`, `moveRight()` change `x`/`y` by 16px, with bounds checks:
  - up: moves only while `y >= 0`
  - down: moves only while `y <= 530`
  - left: moves only while `x >= 10`
  - right: moves only while `x <= 800`
- `drawHoney()` copies `x` and `y` to the element's `left` and `top` styles. The game loop calls it, so a key press changes the stored position and the screen catches up on the next tick.

### `Enemy` ([javascript/enemy.js](javascript/enemy.js))

A falling spaceship. Each enemy is a 50 × 50 px `div` that:
- starts at the top (`y = 0`) at a random horizontal position from 0 to 799 px,
- uses one of three random sprites: `enemy_saucer.png`, `enemy_fighter.png`, or `enemy_mothership.png`,
- moves down 1px each time `move()` is called.

### `Game` ([javascript/game.js](javascript/game.js))

Controls the game state.

| Property | Purpose |
| --- | --- |
| `honey` | The current `Honey` instance |
| `enemies` | Array of enemies on screen |
| `lives` | Starts at 3 |
| `enemyInterval` | Timer that spawns enemies |
| `movementInterval` | Timer for the main game loop |

Methods:
- **`startGame()`** hides the welcome screen, shows the game screen, creates Honey, and starts two timers:
  - **Spawn timer:** adds a new enemy every **1000 ms**.
  - **Game loop:** runs every **14 ms** (about 71 times a second). On each tick it moves every enemy, removes enemies that reach `y >= 630`, redraws Honey, and checks for collisions. `move()` is called twice per enemy on each tick, so enemies fall about 2px per tick (around 140px per second).
- **`spawnEnemy()`** creates an `Enemy` and adds it to the array.
- **`checkCollision(honey, enemy, index)`** checks whether the two rectangles overlap (an axis-aligned bounding box test). On a hit it removes the enemy, takes away one life, and hides the matching heart. When `lives` reaches 0, it stops both timers and calls `gameOver()`.
- **`gameOver()`** hides the game screen and shows the end screen.
- **`resetGame()`** removes Honey and all enemies from the page, clears the enemy array, and shows all three hearts again.

### Event wiring ([javascript/index.js](javascript/index.js))

After the page `load` event:
- **Start Game** creates a new `Game` and calls `startGame()`.
- **Play again** calls `resetGame()` on the old game, creates a new `Game`, starts it, hides the end screen, and shows the game screen.
- A `keydown` listener sends the arrow keys to Honey's move methods. It also logs every pressed key to the console (`console.log(e.key)`).

## Styling and animations ([style.css](style.css))

- **Fonts:** headings use Georgia / Times New Roman (serif). Body text and list items use Arial / Helvetica (sans-serif), 16px, line height 1.5.
- **Colors:**
  - Headings: yellow `rgb(248, 212, 5)`
  - Body text: light lavender `#f0e6fb`
  - Buttons: pink `rgb(248, 152, 214)`, lighter pink `rgb(251, 172, 224)` on hover, black bold text, 4px radius
  - Panels: deep purple `rgb(55, 1, 105)`
- **Parallax background:** the `body` stacks three background layers: `bg_layer3_near.png` (front), `bg_layer2_planets.png`, and `bg_layer1_sky.png` (back). The `slide-layers` animation (5s, ease-in-out, infinite, alternate) moves the near layer 200px right and the planets layer 100px left while the sky stays still, which gives a sense of depth.
- **Honey float:** the `honey-float` keyframes move Honey up 12px and back down every 2 seconds, so she looks like she's floating.

## Assets

All in [images/](images/):

| File | Used for |
| --- | --- |
| `bg_layer1_sky.png` | Back background layer |
| `bg_layer2_planets.png` | Middle background layer (planets) |
| `bg_layer3_near.png` | Front background layer |
| `honey transparent.png` | Honey's in-game sprite |
| `hi-honey.png` | Welcome screen picture |
| `honey_game_over.png` | Game over screen picture |
| `heart_full.png` | Life indicator |
| `enemy_saucer.png`, `enemy_fighter.png`, `enemy_mothership.png` | Enemy sprites |
| `pickup_biscuit.png` | Not used yet (maybe for a future pickup) |
| `space_background.png` | Not used yet |

## Known issues and ideas

- **Fixed pixel bounds:** enemy spawn positions (0–799px), Honey's movement limits (x up to about 816px, y up to about 546px) and the removal line (`y >= 630`) are fixed numbers, but the play area is sized in `vw`/`vh`. On small or large windows, enemies and Honey can go past the edge of the play area or stop before it.
- **Edge overshoot:** the bounds are checked before the 16px step, so Honey can move up to one step past the limit (for example to `y = -16`).
- **Arrow keys before starting:** pressing an arrow key on the welcome screen causes a console error, because `game` doesn't exist yet.
- **Removing items during a loop:** enemies are removed with `splice` inside `forEach`, so the next enemy in the array can be skipped for that tick.
- **Double move:** `enemy.move()` is called twice per tick (once in each `forEach`). This may be on purpose to set the speed, but changing the speed in `move()` would be clearer.
- **Debug log:** `index.js` logs every key press to the console.
- **Naming:** the shared screen class is spelled `scream` (probably meant to be `screen`). The page title says "Honey Lost in Space" while the repository is called `honey-goes-to-space`.
- **Ideas:** use `pickup_biscuit.png` for collectibles or extra lives, add a score or survival timer, and make enemies fall faster over time.
