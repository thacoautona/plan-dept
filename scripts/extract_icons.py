import os
from PIL import Image
import numpy as np

src_path = r"C:\Users\manhh\Downloads\Bộ biểu tượng quản trị và chiến lược tối giản.png"
out_dir_light = r"d:\Data\App Data\Antigravity\scratch\thaco\public\icons\light"
out_dir_dark = r"d:\Data\App Data\Antigravity\scratch\thaco\public\icons\dark"

os.makedirs(out_dir_light, exist_ok=True)
os.makedirs(out_dir_dark, exist_ok=True)

img = Image.open(src_path).convert("RGB")
arr = np.array(img, dtype=np.float32)

# Row boundaries
row_segs = [(55, 215), (250, 405), (440, 590), (620, 770), (810, 965)]

icon_matrix = [
    # Row 0:
    ["strategy_knight", "target_goal", "checklist_clipboard", "presentation_chart", "idea_bulb", "growth_chart"],
    # Row 1:
    ["calendar_clock", "time_clock", "operations_gear", "team_people", "org_chart", "workflow_process"],
    # Row 2:
    ["dashboard_laptop", "report_document", "data_analytics", "global_network", "raci_network", "database_shield"],
    # Row 3:
    ["partnership_handshake", "training_presenter", "folder_archive", "cloud_upload", "compliance_shield", "award_trophy"],
    # Row 4:
    ["audit_search", "edit_document", "binder_archive", "deadline_hourglass", "pdca_cycle", "task_schedule"]
]

# Calculate background color from edges
bg_r, bg_g, bg_b = 254.0, 254.0, 254.0

for r_idx, (r_start, r_end) in enumerate(row_segs):
    row_slice = arr[r_start:r_end, :]
    lum = 0.299 * row_slice[:, :, 0] + 0.587 * row_slice[:, :, 1] + 0.114 * row_slice[:, :, 2]
    is_fg = lum < 242.0

    col_proj = np.sum(is_fg, axis=0)
    active = col_proj > 0

    col_segs = []
    in_icon = False
    start = 0
    for i, val in enumerate(active):
        if val and not in_icon:
            in_icon = True
            start = i
        elif not val and in_icon:
            if not np.any(active[i:min(i + 40, len(active))]):
                in_icon = False
                col_segs.append((start, i))
    if in_icon:
        col_segs.append((start, len(active)))

    print(f"Row {r_idx}: detected {len(col_segs)} icons.")
    if len(col_segs) != 6:
        print(f"Warning: expected 6 icons in row {r_idx}, found {len(col_segs)}: {col_segs}")

    for c_idx in range(min(6, len(col_segs))):
        c_start, c_end = col_segs[c_idx]
        name = icon_matrix[r_idx][c_idx]

        # Extract icon block
        icon_arr = arr[r_start:r_end, c_start:c_end, :].copy()
        icon_lum = 0.299 * icon_arr[:, :, 0] + 0.587 * icon_arr[:, :, 1] + 0.114 * icon_arr[:, :, 2]
        fg_mask = icon_lum < 242.0

        coords = np.argwhere(fg_mask)
        if len(coords) == 0:
            continue
        y_min, x_min = coords.min(axis=0)
        y_max, x_max = coords.max(axis=0)

        # Add 12px padding around icon content
        pad = 12
        y1 = max(0, y_min - pad)
        y2 = min(icon_arr.shape[0], y_max + pad + 1)
        x1 = max(0, x_min - pad)
        x2 = min(icon_arr.shape[1], x_max + pad + 1)

        cropped = icon_arr[y1:y2, x1:x2, :]
        ch, cw, _ = cropped.shape

        # Create transparent RGBA
        cropped_lum = 0.299 * cropped[:, :, 0] + 0.587 * cropped[:, :, 1] + 0.114 * cropped[:, :, 2]

        # Alpha calculation with anti-aliasing
        # Pure white > 248 -> alpha 0
        # Dark lines < 210 -> alpha 255
        # Between 210 and 248 -> linear transition
        alpha = np.zeros((ch, cw), dtype=np.float32)
        opaque_mask = cropped_lum <= 210.0
        semi_mask = (cropped_lum > 210.0) & (cropped_lum < 248.0)

        alpha[opaque_mask] = 255.0
        alpha[semi_mask] = 255.0 * (248.0 - cropped_lum[semi_mask]) / (248.0 - 210.0)

        # Un-premultiply background to remove white halo
        alpha_ratio = np.clip(alpha / 255.0, 0.001, 1.0)[:, :, np.newaxis]
        cleaned_rgb = (cropped - [bg_r, bg_g, bg_b] * (1.0 - alpha_ratio)) / alpha_ratio
        cleaned_rgb = np.clip(cleaned_rgb, 0.0, 255.0)

        # Light version image
        light_rgba = np.zeros((ch, cw, 4), dtype=np.uint8)
        light_rgba[:, :, :3] = cleaned_rgb.astype(np.uint8)
        light_rgba[:, :, 3] = alpha.astype(np.uint8)

        # Dark version image
        dark_rgba = np.zeros((ch, cw, 4), dtype=np.uint8)
        dark_rgba[:, :, 3] = alpha.astype(np.uint8)

        # Color classification: Gold/Amber vs Dark Navy
        cr = cleaned_rgb[:, :, 0]
        cg = cleaned_rgb[:, :, 1]
        cb = cleaned_rgb[:, :, 2]

        is_gold = (cr > 110.0) & (cr > cb + 35.0) & (cg > cb + 15.0)

        # Gold lines in dark mode: bright luminous gold (#FBBF24 / 251, 191, 36)
        dark_rgba[is_gold, 0] = 251
        dark_rgba[is_gold, 1] = 191
        dark_rgba[is_gold, 2] = 36

        # Navy lines in dark mode: sleek silver/white (#E2E8F0 / 226, 232, 240)
        not_gold = ~is_gold
        dark_rgba[not_gold, 0] = 232
        dark_rgba[not_gold, 1] = 238
        dark_rgba[not_gold, 2] = 246

        # Put on centered square canvas of size max(cw, ch) + 8
        canvas_size = max(cw, ch) + 8
        canvas_light = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
        canvas_dark = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))

        offset_x = (canvas_size - cw) // 2
        offset_y = (canvas_size - ch) // 2

        img_light = Image.fromarray(light_rgba, "RGBA")
        img_dark = Image.fromarray(dark_rgba, "RGBA")

        canvas_light.paste(img_light, (offset_x, offset_y), img_light)
        canvas_dark.paste(img_dark, (offset_x, offset_y), img_dark)

        # Resize to standard crisp 128x128 with Lanczos
        final_light = canvas_light.resize((128, 128), Image.Resampling.LANCZOS)
        final_dark = canvas_dark.resize((128, 128), Image.Resampling.LANCZOS)

        final_light.save(os.path.join(out_dir_light, f"{name}.png"), "PNG")
        final_dark.save(os.path.join(out_dir_dark, f"{name}.png"), "PNG")

print("All 30 icons extracted in Light & Dark transparent formats successfully!")
