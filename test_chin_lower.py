from PIL import Image, ImageDraw

p = Image.open('public/profile.png').convert('RGBA')
pr_raw = Image.open('C:/Users/PIXWAR/.gemini/antigravity-ide/brain/accb3ba4-0138-4dc7-9bdc-857436f75ad1/blue_ranger_matched_1789460652738.jpg').convert('RGB')

w, h = pr_raw.size
pr_rgba = Image.new('RGBA', (w, h), (0, 0, 0, 0))
pr_pixels = pr_raw.load()
out_pixels = pr_rgba.load()

for y in range(h):
    for x in range(w):
        r, g, b = pr_pixels[x, y]
        br = max(r, g, b)
        if br < 8:
            out_pixels[x, y] = (0, 0, 0, 0)
        elif br < 25:
            a = int((br - 8) / 17 * 255)
            out_pixels[x, y] = (r, g, b, a)
        else:
            out_pixels[x, y] = (r, g, b, 255)

s = 1.06
nw, nh = int(w * s), int(h * s)
resized_pr = pr_rgba.resize((nw, nh), Image.Resampling.LANCZOS)
vx = int(507.6 * s)
vy = int(326.8 * s)
base_paste_x = 588 - vx
base_paste_y = 351 - vy

# Let's test lowering shifts:
# dy = 64 (current), 80, 95, 110
shifts = [
    ("dy_64", 64),
    ("dy_80", 80),
    ("dy_95", 95),
    ("dy_110", 110)
]

previews = []
for name, dy in shifts:
    paste_x = base_paste_x
    paste_y = base_paste_y + dy
    
    canvas = Image.new('RGBA', (1200, 1200), (0, 0, 0, 0))
    canvas.paste(resized_pr, (paste_x, paste_y), resized_pr)
    
    bg = Image.new('RGBA', (1200, 1200), (3, 5, 9, 255))
    base = Image.new('RGBA', (1200, 1200), (3, 5, 9, 255))
    base.paste(p, (0, 0), p)
    
    # Reveal circular mask on head/face area
    mask = Image.new('L', (1200, 1200), 0)
    draw = ImageDraw.Draw(mask)
    # Circle covering head
    draw.ellipse((588 - 200, 420 - 200, 588 + 200, 420 + 200), fill=255)
    
    pr_masked = Image.new('RGBA', (1200, 1200), (0, 0, 0, 0))
    pr_masked.paste(canvas, (0, 0), mask)
    
    base.paste(pr_masked, (0, 0), pr_masked)
    
    # Close-up crop of face and chin (X: 360 to 820, Y: 200 to 660)
    crop = base.crop((360, 200, 820, 660))
    previews.append(crop)

collage = Image.new('RGB', (460 * len(previews), 460))
for i, prev in enumerate(previews):
    collage.paste(prev.convert('RGB'), (i * 460, 0))

collage.save('C:/Users/PIXWAR/.gemini/antigravity-ide/brain/accb3ba4-0138-4dc7-9bdc-857436f75ad1/chin_check_lower.jpg', quality=95)
print("Saved chin_check_lower.jpg")
