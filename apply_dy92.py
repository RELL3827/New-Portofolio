from PIL import Image

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

# Test dy = 92
dy = 92
paste_x = base_paste_x
paste_y = base_paste_y + dy

canvas = Image.new('RGBA', (1200, 1200), (0, 0, 0, 0))
canvas.paste(resized_pr, (paste_x, paste_y), resized_pr)

# Composite on dark bg with profile 50-50
bg = Image.new('RGBA', (1200, 1200), (3, 5, 9, 255))
comp_p = Image.new('RGBA', (1200, 1200), (3, 5, 9, 255))
comp_p.paste(p, (0, 0), p)

comp_pr = Image.new('RGBA', (1200, 1200), (3, 5, 9, 255))
comp_pr.paste(canvas, (0, 0), canvas)

blend = Image.blend(comp_p.convert('RGB'), comp_pr.convert('RGB'), 0.5)

triple = Image.new('RGB', (3600, 1200))
triple.paste(comp_p.convert('RGB'), (0, 0))
triple.paste(comp_pr.convert('RGB'), (1200, 0))
triple.paste(blend, (2400, 0))

preview = triple.resize((1800, 600), Image.Resampling.LANCZOS)
preview.save('C:/Users/PIXWAR/.gemini/antigravity-ide/brain/accb3ba4-0138-4dc7-9bdc-857436f75ad1/full_body_dy92_check.jpg', quality=95)

# Save to public/powerranger.png immediately!
canvas.save('public/powerranger.png', 'PNG')
print("Saved dy=92 to public/powerranger.png and full_body_dy92_check.jpg")
