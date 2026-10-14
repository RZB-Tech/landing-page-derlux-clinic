"""Clean photo crops taken from the 1:1 Figma screenshot.
Pixels outside each photo's rounded shape are page background (and anti-aliased edges);
they are re-filled from the photo so CSS border-radius clipping leaves no halo.
Hero also loses the overlapping card (with its shadow) and badge."""
import sys, os
sys.path.insert(0, 'D:/temp-pylibs')
import numpy as np, cv2

def shape_mask(w, h, tl, tr, br, bl, shrink=1.5):
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32) + 0.5
    inside = np.ones((h, w), bool)
    for r, cx, cy, sx, sy in ((tl, tl, tl, -1, -1), (tr, w - tr, tr, 1, -1), (br, w - br, h - br, 1, 1), (bl, bl, h - bl, -1, 1)):
        if r <= 0: continue
        zone = ((xx - cx) * sx > 0) & ((yy - cy) * sy > 0)
        inside[zone] = ((xx[zone] - cx) ** 2 + (yy[zone] - cy) ** 2) <= (r - shrink) ** 2
    return inside

def clean(src, dst, radii, extra=None, shadow=None):
    img = cv2.imread(src, cv2.IMREAD_COLOR)
    h, w = img.shape[:2]
    if shadow is not None:
        (cx0, cy0, cw, ch), dy, blur, alpha, rgb = shadow
        pad = 3 * blur
        canvas = np.zeros((h + 2 * pad, w + 2 * pad), np.float32)
        canvas[cy0 + dy + pad: cy0 + dy + ch + pad, cx0 + pad: cx0 + cw + pad] = 1.0
        a = (cv2.GaussianBlur(canvas, (0, 0), sigmaX=blur / 2)[pad:pad + h, pad:pad + w] * alpha)[..., None]
        img = np.clip((img.astype(np.float32) - a * np.array(rgb[::-1], np.float32)) / (1 - a), 0, 255).astype(np.uint8)
    mask = np.zeros((h, w), np.uint8)
    mask[~shape_mask(w, h, *radii)] = 255
    for (x0, y0, x1, y1) in (extra or []):
        mask[max(y0, 0):min(y1, h), max(x0, 0):min(x1, w)] = 255
    cv2.imwrite(dst, cv2.inpaint(img, mask, 7, cv2.INPAINT_TELEA))

src_dir, out_dir = sys.argv[1], sys.argv[2]
os.makedirs(out_dir, exist_ok=True)
# hero: arch r=260 top / 28 bottom; card at crop (-56,520) 293x190 + shadow 0 16 40 rgba(28,26,26,.1); badge at crop (274,40)
clean(f'{src_dir}/hero.png', f'{out_dir}/hero.png', (260, 260, 28, 28),
      extra=[(0, 516, 241, 700), (270, 36, 520, 88)],
      shadow=((-56, 520, 293, 190), 16, 40, 0.10, (28, 26, 26)))
for n in ('derm', 'laser', 'aest', 'gyn', 'endo', 'uzi', 'lab', 'proc'):
    clean(f'{src_dir}/dir-{n}.png', f'{out_dir}/direction-{n}.png', (20, 20, 20, 20))
for i in range(1, 5):
    clean(f'{src_dir}/doc-{i}.png', f'{out_dir}/doctor-{i}.png', (151, 151, 24, 24))
print('ok')
