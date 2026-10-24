# Art credits and sources

## Original collection

The original 60 procedural/sprite scenes, UI, renderer and animation choreography were created for Pixel Cabinet. Code and original artwork: MIT (see LICENSE).

## Tiny Creatures

- Artist: **Clint Bellanger**. Source: https://opengameart.org/node/160872
- Original pack: https://opengameart.org/sites/default/files/tiny-creatures.zip
- License: **CC0 1.0 Universal**, https://creativecommons.org/publicdomain/zero/1.0/
- Original licence: `licenses/tiny-creatures.txt`.
- 180 source sprites become 175 scenes; five alternate wing pairs form frame animations. Other sprites use original procedural motion, squash/stretch, turns, particles and camera choreography in this app. They are not presented as source-authored walk cycles.

## Ninja Adventure / Superpowers

- Artist: **Pixel-Boy**, Sparklin Labs (Ninja Adventure credits also name AAA).
- Sources: https://github.com/sparklinlabs/superpowers-asset-packs/tree/master/ninja-adventure and https://pixel-boy.itch.io/ninja-adventure-asset-pack
- License: **CC0 1.0 Universal**. Original licence: `licenses/superpowers.txt`.
- Character and monster sheets retain their authored direction and animation frames. Items receive procedural turns, steam, glints and movement. Only selected visual assets are included, encoded as palette-indexed pixel frames. No audio or game code is included.

## Seasons of Forest — free animal sample

- Artist: **inkBubi**.
- Source: https://opengameart.org/content/free-sample-16x16-pixel-forest-animal-pack-%E2%80%93-top-down-rpg-style
- Artist page: https://inkbubi.itch.io/seasons-of-forest-animal-pack
- License: **CC0 1.0 Universal**. Original licence: `licenses/forest-animals.txt`.
- Five animals, each with four-direction idle and running animation. Frame timing and choreography are adapted for seven-second scenes.

## Import process

`tools/import-art.py` converts selected PNGs into compact palette-indexed `catalog-data.js`. Native 16×16 artwork retains its source pixels; small sprites are centered. The forest sample frames are cropped to consistent bounds and resized with nearest-neighbour sampling to fit 16×16. The app animates these data locally without external network requests.

Other sources researched but not bundled: SpritePilot (downloads returned HTTP 403); AWTRIX community icons (no blanket artwork licence established); PIXEL LED ART (CC BY-NC, 32×32; excluded to keep included art CC0 or MIT).
