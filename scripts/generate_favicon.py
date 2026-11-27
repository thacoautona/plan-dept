import os
from PIL import Image, ImageDraw, ImageFilter
import math

public_dir = r"d:\Data\App Data\Antigravity\scratch\thaco\public"
os.makedirs(public_dir, exist_ok=True)

# 1. GENERATE RICH VECTOR SVG FAVICON
svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="100%" height="100%">
  <defs>
    <!-- THACO Corporate Blue Gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#003566"/>
      <stop offset="50%" stop-color="#004B87"/>
      <stop offset="100%" stop-color="#001F3F"/>
    </linearGradient>

    <!-- Radiant Gold Accent Gradient -->
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE047"/>
      <stop offset="50%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>

    <!-- Subtle drop shadow -->
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.4"/>
    </filter>
  </defs>

  <!-- Solid Badge Background with Gold Rim -->
  <rect x="4" y="4" width="120" height="120" rx="28" fill="url(#bgGrad)" stroke="url(#goldGrad)" stroke-width="4.5" filter="url(#shadow)"/>

  <!-- High-contrast Target & Arrow Emblem -->
  <g filter="url(#shadow)">
    <!-- Outer Target Ring (Crisp Pure White) -->
    <circle cx="56" cy="72" r="36" fill="none" stroke="#FFFFFF" stroke-width="8.5"/>
    
    <!-- Middle Target Ring (Crisp Pure White) -->
    <circle cx="56" cy="72" r="23" fill="none" stroke="#FFFFFF" stroke-width="7"/>

    <!-- Inner Bullseye Core (Radiant Gold) -->
    <circle cx="56" cy="72" r="10.5" fill="url(#goldGrad)"/>

    <!-- Golden Strategic Arrow -->
    <!-- Shaft -->
    <line x1="42" y1="86" x2="88" y2="40" stroke="url(#goldGrad)" stroke-width="9" stroke-linecap="round"/>

    <!-- Arrowhead -->
    <polygon points="76,32 100,28 96,52 89,45 83,51 77,45 83,39" fill="url(#goldGrad)"/>
    
    <!-- Flight Tail Feathers -->
    <path d="M36,92 L44,84 M40,96 L48,88" stroke="url(#goldGrad)" stroke-width="4.5" stroke-linecap="round"/>
  </g>
</svg>
"""

with open(os.path.join(public_dir, "favicon.svg"), "w", encoding="utf-8") as f:
    f.write(svg_content)

# 2. GENERATE HIGH-RES RASTER PNGs (512x512 supersampled down to 180, 64, 48, 32, 16)
size = 512
img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

# Background squircle
pad = 16
rect = [pad, pad, size - pad, size - pad]

# Gradient simulation for PIL
for i in range(pad, size - pad):
    pass # drawn as solid rich color with border for maximum icon sharpness

draw.rounded_rectangle(rect, radius=110, fill="#004680", outline="#F59E0B", width=16)

# Inner soft glow border
draw.rounded_rectangle([pad + 8, pad + 8, size - pad - 8, size - pad - 8], radius=102, outline="#002D54", width=4)

# Emblem coordinates
cx, cy = 224, 288

# Outer ring (Crisp Pure White)
draw.ellipse([cx - 144, cy - 144, cx + 144, cy + 144], outline="#FFFFFF", width=34)

# Middle ring (Crisp Pure White)
draw.ellipse([cx - 92, cy - 92, cx + 92, cy + 92], outline="#FFFFFF", width=28)

# Core Bullseye (Radiant Gold #FBBF24)
draw.ellipse([cx - 42, cy - 42, cx + 42, cy + 42], fill="#FBBF24")

# Arrow shaft (Gold #FBBF24)
draw.line([(cx - 56, cy + 56), (352, 160)], fill="#FBBF24", width=36)

# Arrowhead
head_points = [(304, 128), (400, 112), (384, 208), (356, 180), (332, 204), (308, 180), (332, 156)]
draw.polygon(head_points, fill="#FBBF24")

# Flight tail notches
draw.line([(cx - 80, cy + 80), (cx - 48, cy + 48)], fill="#FBBF24", width=18)
draw.line([(cx - 64, cy + 96), (cx - 32, cy + 64)], fill="#FBBF24", width=18)

# Save Master Logo
img.save(os.path.join(public_dir, "logo-thaco-na.png"), "PNG")

# Export multiple favicon sizes using high quality Lanczos downsampling
sizes = {
    "favicon-16x16.png": 16,
    "favicon-32x32.png": 32,
    "favicon-48x48.png": 48,
    "apple-touch-icon.png": 180
}

for filename, s in sizes.items():
    resized = img.resize((s, s), Image.Resampling.LANCZOS)
    resized.save(os.path.join(public_dir, filename), "PNG")

# Create multi-resolution .ico file
img_16 = img.resize((16, 16), Image.Resampling.LANCZOS)
img_32 = img.resize((32, 32), Image.Resampling.LANCZOS)
img_48 = img.resize((48, 48), Image.Resampling.LANCZOS)
img_32.save(os.path.join(public_dir, "favicon.ico"), format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])

print("All Favicon formats and Logo created successfully!")
