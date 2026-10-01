"""Berechnet pro NPC das Größenverhältnis idle/talk (Körperhöhe), damit Sprechbilder nicht springen. -> data/npcfit.js"""
import json, glob, os
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
out = {}
def bb(im):
    return im.convert('RGBA').getchannel('A').point(lambda v: 255 if v > 40 else 0).getbbox()
for f in sorted(glob.glob(ROOT + '/assets/sprites/npcs/*_talk.png')):
    n = os.path.basename(f)[:-9]
    idle = ROOT + f'/assets/sprites/npcs/{n}_idle.png'
    if not os.path.exists(idle): continue
    a, b = bb(Image.open(idle)), bb(Image.open(f))
    out[n] = round((a[3] - a[1]) / (b[3] - b[1]), 4)
open(ROOT + '/data/npcfit.js', 'w').write('// erzeugt von tools/make_npcfit.py\nNN.npcFit = ' + json.dumps(out) + ';\n')
print(len(out), 'NPCs')
