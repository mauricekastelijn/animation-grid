"""Rebuild catalog-data.js from locally downloaded, CC0 source packs.
Usage: python tools/import-art.py /path/to/pixel-assets
Requires Pillow. Download URLs and source attribution are in CREDITS.md.
Source folders: tiny-creatures/tiny-creatures, superpowers/ninja-adventure, forest.
"""
import json,sys,pathlib
from PIL import Image
root=pathlib.Path(sys.argv[1]);out=[]
chars='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/'
def encode(id,name,category,kind,source,frames):
 colors=[(0,0,0,0)]
 encoded=[]
 for im in frames:
  im=im.convert('RGBA');assert im.size==(16,16)
  raw=''
  for px in im.getdata():
   px=px if px[3]>127 else (0,0,0,0)
   if px not in colors:colors.append(px)
   raw+=chars[colors.index(px)]
  encoded.append(raw)
 out.append(dict(id=id,name=name,category=category,kind=kind,source=source,palette=[None]+['#%02x%02x%02x'%p[:3] for p in colors[1:]],frames=encoded))
# File ordering is the source tilemap's row-major ordering.
names='''Zombie,Skeleton,Vampire,Flaming skull,Wraith,Floating eye,Helping hand,Medusa,Hungry plant,Leprechaun
Goblin,Orc,Fairy,Mushroom fellow,Ogre,Wendigo,Green knight,Blue knight,Red knight,Wight
Minotaur,Centaur,Forest centaur,Wolf,Werewolf,Dryad,Siren,Mermaid,Arachne,Succubus
White dragon,Blue dragon,Black dragon,Red dragon,Green dragon,Seraph,Cherub,Sky guardian,Devil,Imp
Asp,Adder,Troll,Yeti,Sasquatch,Fire elemental,Water elemental,Earth elemental,Air elemental,Ice elemental
Horse,Unicorn,Pegasus,Seahorse,Nightmare,Fire sprite,Water sprite,Earth sprite,Air sprite,Ice sprite
Bass,Trout,Salmon,Catfish,Carp,Dark wizard,Sleeping wizard,Harpy,Patchwork monster,Gargoyle
Little bass,Little trout,Little salmon,Little catfish,Little carp,Purple worm,Naga,Lizardfolk,Dragonkin,Kobold
Giant jelly,Jelly cube,Little jelly,Queen slime,Slime,Slime drop,Mud king,Mud creature,Mud drop,Will o wisp
Gnoll,Hyena,Wererat,Catfolk,Cat,Mummy,Lich,Dark knight,Banshee,Ghoul
Witch,Satyr,Hellhound,Cockatrice,Gryphon,Hippogryph,Manticore,Chimera,Sphinx,Genie
Hydra,Kraken,Tentacle,Tree guardian,Shrub guardian,Bare tree guardian,Bare shrub guardian,Owlbear,Brownie,Pixie
Little eye,Octopus kraken,Little tentacle,Demon,Hobgoblin,Bugbear,Clay golem,Stone golem,Iron golem,Camel
Owl,Winged owl,Hawk,Winged hawk,Eagle,Winged eagle,Raven,Winged raven,Bat,Winged bat
Bee,Mosquito,Ant,Beetle,Centipede,Scorpion,Lizard,Frog,Crocodile,Turtle
Chicken,Cow,Goat,Sheep,Ostrich,Zebra,Lion,Tiger,Elephant,Giraffe
Boar,Deer,Elk,Brown bear,Polar bear,Black bear,Gorilla,Ape,Monkey,Dog
Rhino,Hippo,Shark,Whale,Dolphin,Squirrel,Ferret,Rabbit,Raccoon,Badger'''.replace('\n',',').split(',')
assert len(names)==180
base=root/'tiny-creatures/tiny-creatures/Tiles'
for i,name in enumerate(names):
 if 130<=i<140 and i%2:continue # Fold alternating wing poses into one genuine frame animation.
 frames=[Image.open(base/f'tile_{i+1:04d}.png')]
 if 130<=i<140:frames.append(Image.open(base/f'tile_{i+2:04d}.png'))
 category='Animals' if i>=129 or i in [23,50] or 60<=i<65 or 70<=i<75 or i in [91,94] else 'Fantasy'
 kind='swim' if 60<=i<65 or 70<=i<75 or i in [172,173,174] else 'fly' if 130<=i<142 or i in [2,3,4,5,12,51,52,89,99,109,119,120] else 'walk'
 encode(f'tiny-{i}',name,category,kind,'tiny',frames)
base=root/'superpowers/ninja-adventure'
for folder,cat,kind in [('characters','Characters','hero'),('monsters','Fantasy','monster')]:
 for p in sorted((base/folder).glob('*.png')):
  im=Image.open(p);w,h=im.size
  if w==64 and h>=32:
   frames=[im.crop((x*16,y*16,x*16+16,y*16+16)) for y in range(min(3,h//16)) for x in range(4)]
   encode('ninja-'+folder+'-'+p.stem,('Village adventurer ' if kind=='hero' else 'Dungeon creature ')+p.stem,cat,kind,'ninja',frames)
  elif p.stem=='dog':encode('ninja-dog','Village dog','Animals','walk','ninja',[im.crop((x,0,x+16,16)) for x in [0,16]])
for p in sorted((base/'items').rglob('*.png')):
 if p.stem=='all':continue
 im=Image.open(p).convert('RGBA');w,h=im.size
 if w<=16 and h<=16:
  frame=Image.new('RGBA',(16,16));frame.paste(im,((16-w)//2,(16-h)//2));frames=[frame]
 elif p.stem=='coin-2':
  frames=[]
  for x in range(4):
   f=Image.new('RGBA',(16,16));f.paste(im.crop((x*10,0,x*10+10,10)),(3,3));frames.append(f)
 elif w==32 and h<=16:
  frames=[]
  for x in [0,16]:
   f=Image.new('RGBA',(16,16));f.paste(im.crop((x,0,x+16,h)),(0,(16-h)//2));frames.append(f)
 else:continue
 encode('item-'+p.stem,p.stem.replace('-',' ').title(),'Objects','food' if p.parent.name=='food' else 'item','ninja',frames)
for d in sorted((root/'forest').iterdir()):
 if not d.is_dir():continue
 frames=[]
 for action in ['idle','run']:
  for direction in ['front','back','left','right']:
   files=sorted(d.glob(f'{action}_{direction}_frame_*.png'));assert files
   for f in range(4):frames.append(Image.open(files[f%len(files)]))
 boxes=[im.convert('RGBA').getbbox() for im in frames];box=(min(b[0] for b in boxes),min(b[1] for b in boxes),max(b[2] for b in boxes),max(b[3] for b in boxes))
 normalized=[]
 for im in frames:
  im=im.convert('RGBA').crop(box);im.thumbnail((16,16),Image.Resampling.NEAREST);f=Image.new('RGBA',(16,16));f.paste(im,((16-im.width)//2,(16-im.height)//2));normalized.append(f)
 frames=normalized
 encode('forest-'+d.name,{'squirle':'Squirrel'}.get(d.name,d.name.title())+' woodland adventure','Animals','forest','forest',frames)
path=pathlib.Path(__file__).resolve().parents[1]/'catalog-data.js'
path.write_text('export const art = '+json.dumps(out,separators=(',',':'))+';\n')
print(len(out),'imported scenes;',sum(len(a['frames']) for a in out),'source frames;',path.stat().st_size,'bytes')
