"""Berechnet pro NPC das Größenverhältnis idle/talk (Körperhöhe), damit Sprechbilder nicht springen. -> data/npcfit.js"""
import json, glob, os
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
out = {}
def bb(im):
    return im.convert('RGBA').getchannel('A').point(lambda v: 255 if v > 40 else 0).getbbox()
for f in sorted(glob.glob(ROOT + '/assets/sprites/npcs/*_idle.png')):
    n = os.path.basename(f)[:-9]
    a = bb(Image.open(f))
    for suffix, key in (('_talk', n), ('_a', n + '_a'), ('_b', n + '_b')):
        g = ROOT + f'/assets/sprites/npcs/{n}{suffix}.png'
        if os.path.exists(g):
            b = bb(Image.open(g))
            out[key] = round((a[3] - a[1]) / (b[3] - b[1]), 4)
open(ROOT + '/data/npcfit.js', 'w').write('// erzeugt von tools/make_npcfit.py\nNN.npcFit = ' + json.dumps(out) + ';\n')
print(len(out), 'NPCs')
