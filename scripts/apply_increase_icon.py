import os
import base64
from PIL import Image

src_path = r"C:\Users\manhh\Downloads\increase.png"
public_dir = r"d:\Data\App Data\Antigravity\scratch\thaco\public"
os.makedirs(public_dir, exist_ok=True)

img = Image.open(src_path).convert("RGBA")

# 1. Save master icon in public
img.save(os.path.join(public_dir, "increase.png"), "PNG")
img.save(os.path.join(public_dir, "logo-thaco-na.png"), "PNG")

# 2. Export multiple favicon resolutions with Lanczos resampling for maximum sharpness
sizes = {
    "favicon-16x16.png": 16,
    "favicon-32x32.png": 32,
    "favicon-48x48.png": 48,
    "favicon-64x64.png": 64,
    "apple-touch-icon.png": 180
}

for filename, s in sizes.items():
    resized = img.resize((s, s), Image.Resampling.LANCZOS)
    resized.save(os.path.join(public_dir, filename), "PNG")

# 3. Create multi-resolution .ico file
img_16 = img.resize((16, 16), Image.Resampling.LANCZOS)
img_32 = img.resize((32, 32), Image.Resampling.LANCZOS)
img_48 = img.resize((48, 48), Image.Resampling.LANCZOS)
img_32.save(
    os.path.join(public_dir, "favicon.ico"),
    format="ICO",
    sizes=[(16, 16), (32, 32), (48, 48)]
)

# 4. Create SVG Favicon wrapping the high-res PNG for vector SVG browser support
with open(src_path, "rb") as f:
    b64_data = base64.b64encode(f.read()).decode("utf-8")

svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <image href="data:image/png;base64,{b64_data}" width="512" height="512"/>
</svg>
"""

with open(os.path.join(public_dir, "favicon.svg"), "w", encoding="utf-8") as f:
    f.write(svg_content)

print("Applied increase.png to all Favicon and Logo formats successfully!")
