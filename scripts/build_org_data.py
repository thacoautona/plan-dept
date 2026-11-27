import json
import re

in_path = r"C:\Users\manhh\.gemini\antigravity\brain\65cec3c2-5d13-441b-9d43-d5cb5924f6a1\scratch\pptx_extracted.json"
out_ts = r"d:\Data\App Data\Antigravity\scratch\thaco\src\data\orgData.ts"

with open(in_path, 'r', encoding='utf-8') as f:
    slides = json.load(f)

def clean_text(s):
    s = s.replace('\xa0', ' ').replace('\u200b', '').strip()
    s = re.sub(r'\s+', ' ', s)
    return s

# 1. Extract Business & Management Functions (Slides 7-9, 11-14, 16-20)
function_slides = [
    (7, "Kinh doanh", "Kinh doanh Xe Du lịch", "KDDL"),
    (8, "Kinh doanh", "Kinh doanh Xe Tải, Bus", "KDTB"),
    (9, "Kinh doanh", "Kinh doanh Dịch vụ Phụ tùng (DL / TB)", "DVDL / DVTB"),
    (11, "Nghiệp vụ Quản trị Chuyên ngành", "Quản trị Chi phí, Giá thành", "TCKT"),
    (12, "Nghiệp vụ Quản trị Chuyên ngành", "Quản lý Tiêu chuẩn hoạt động, Cơ sở vật chất", "NVCN"),
    (13, "Nghiệp vụ Quản trị Chuyên ngành", "Quản lý Chất lượng, GNVC & Kho xe", "NVCN"),
    (14, "Nghiệp vụ Quản trị Chuyên ngành", "Hỗ trợ Tín dụng, Bảo hiểm", "HTKD"),
    (16, "Nghiệp vụ Quản trị Cơ bản", "Kế hoạch Tổng hợp", "NVKH"),
    (17, "Nghiệp vụ Quản trị Cơ bản", "Kế toán – Tài chính", "TCKT"),
    (18, "Nghiệp vụ Quản trị Cơ bản", "Nghiệp vụ Nhân sự", "HCNS"),
    (19, "Nghiệp vụ Quản trị Cơ bản", "Marketing", "MKT"),
    (20, "Nghiệp vụ Quản trị Cơ bản", "Quản trị Văn phòng & An sinh đời sống", "HCNS"),
]

dept_functions = []
for slide_num, group, title, dept_code in function_slides:
    s = slides[slide_num - 1]
    sections = []
    if s["tables"]:
        tbl = s["tables"][0]
        headers = [clean_text(" ".join(c)) for c in tbl[0]] if tbl else []
        for r_idx, row in enumerate(tbl[1:], start=1):
            row_label = clean_text(" ".join(row[0])) if row and row[0] else f"Cấp {r_idx}"
            for c_idx, cell in enumerate(row[1:], start=1):
                lines = [clean_text(x) for x in cell if clean_text(x)]
                if lines:
                    col_name = headers[c_idx] if c_idx < len(headers) and headers[c_idx] else f"Phạm vi {c_idx}"
                    sections.append({
                        "level": row_label,
                        "scope": col_name,
                        "items": lines
                    })
    dept_functions.append({
        "id": f"func-{slide_num}",
        "slide": slide_num,
        "group": group,
        "title": title,
        "deptCode": dept_code,
        "sections": sections
    })

# 2. Extract Positions & Duties (Slides 24-51)
# Map slide ranges to logical departments & hierarchy tiers
slide_dept_map = {
    24: ("BGD", "Ban Lãnh đạo Công ty", "Lãnh đạo"),
    25: ("KDX", "Kinh doanh Xe (VP Công ty)", "Kinh doanh"),
    26: ("KDX", "Kinh doanh Xe (VP Công ty)", "Kinh doanh"),
    27: ("KDX", "Kinh doanh Xe (VP Công ty)", "Kinh doanh"),
    28: ("QSD", "Kinh doanh Xe Du lịch đã QSD", "Kinh doanh"),
    29: ("SR_KD", "Bán hàng Xe - Showroom", "Showroom"),
    30: ("SR_KD", "Bán hàng Xe - Showroom", "Showroom"),
    31: ("DVPT", "Kinh doanh Dịch vụ Phụ tùng (VP Công ty)", "Dịch vụ"),
    32: ("DVPT", "Kinh doanh Dịch vụ Phụ tùng (VP Công ty)", "Dịch vụ"),
    33: ("DVPT", "Kinh doanh Dịch vụ Phụ tùng (VP Công ty)", "Dịch vụ"),
    34: ("DVPT", "Kinh doanh Dịch vụ Phụ tùng (VP Công ty)", "Dịch vụ"),
    35: ("SR_DV", "Dịch vụ Phụ tùng - Showroom", "Showroom"),
    36: ("SR_DV", "Dịch vụ Phụ tùng - Showroom", "Showroom"),
    37: ("SR_DV", "Dịch vụ Phụ tùng - Showroom", "Showroom"),
    38: ("QTCP", "Quản trị Chi phí, Giá thành", "Nghiệp vụ Chuyên ngành"),
    39: ("TCHĐ", "Quản lý TCHĐ & Cơ sở vật chất", "Nghiệp vụ Chuyên ngành"),
    40: ("QLCL", "Quản lý Chất lượng, GNVC & Kho xe", "Nghiệp vụ Chuyên ngành"),
    41: ("QLCL", "Quản lý Chất lượng, GNVC & Kho xe", "Nghiệp vụ Chuyên ngành"),
    42: ("TDBH", "Hỗ trợ Tín dụng, Bảo hiểm", "Nghiệp vụ Chuyên ngành"),
    43: ("NVKH", "Kế hoạch Tổng hợp", "Nghiệp vụ Cơ bản"),
    44: ("TCKT", "Kế toán – Tài chính", "Nghiệp vụ Cơ bản"),
    45: ("HCNS", "Nghiệp vụ Nhân sự", "Nghiệp vụ Cơ bản"),
    46: ("MKT", "Marketing", "Nghiệp vụ Cơ bản"),
    47: ("QTVP", "Quản trị Văn phòng & An sinh đời sống", "Nghiệp vụ Cơ bản"),
    48: ("HTKD", "Hỗ trợ Kinh doanh", "Hỗ trợ"),
    49: ("HTKD", "Hỗ trợ Kinh doanh", "Hỗ trợ"),
    50: ("HTKD", "Hỗ trợ Kinh doanh", "Hỗ trợ"),
    51: ("HTKD", "Hỗ trợ Kinh doanh", "Hỗ trợ"),
}

def infer_tier(title):
    t = title.lower()
    if t.startswith(("tgđ", "p.tgđ", "gđ ", "gđ/")):
        return 1 # Ban Giám đốc / Giám đốc mảng
    if t.startswith(("tp ", "tp/", "tpquản", "qđ ")):
        return 2 # Trưởng phòng / Quản đốc
    if t.startswith(("tn ", "tổ trưởng", "tt ")):
        return 3 # Trưởng nhóm / Tổ trưởng
    return 4 # Chuyên viên / Nhân viên / KTV / TVBH

positions = []
pos_counter = 1
for slide_num in range(24, 52):
    s = slides[slide_num - 1]
    dept_code, dept_name, category = slide_dept_map[slide_num]
    for tbl in s["tables"]:
        for r in tbl[1:]:
            if not r or not r[0]:
                continue
            raw_title = clean_text(" ".join(r[0]))
            # Fix missing spaces like "TPQuản trị" or "Tổ trưởngBảo vệ"
            raw_title = re.sub(r'^(TP|TN|TT|CV|NV|GĐ)([A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯẠ-Ỹ])', r'\1 \2', raw_title)
            raw_title = raw_title.replace("Tổ trưởngBảo", "Tổ trưởng Bảo")
            if not raw_title or raw_title.upper() in ["CHỨC DANH", "VỊ TRÍ CHỨC DANH"]:
                continue
            duties = []
            for cell in r[1:]:
                for line in cell:
                    cl = clean_text(line)
                    if cl:
                        duties.append(cl)
            if not duties:
                continue
            tier = infer_tier(raw_title)
            positions.append({
                "id": f"pos-{pos_counter}",
                "order": pos_counter,
                "slide": slide_num,
                "deptCode": dept_code,
                "deptName": dept_name,
                "category": category,
                "title": raw_title,
                "tier": tier,
                "duties": duties
            })
            pos_counter += 1

print(f"Extracted {len(dept_functions)} functional areas and {len(positions)} positions.")

ts_content = f"""export interface DeptFunctionSection {{
  level: string;
  scope: string;
  items: string[];
}}

export interface DeptFunctionArea {{
  id: string;
  slide: number;
  group: string;
  title: string;
  deptCode: string;
  sections: DeptFunctionSection[];
}}

export interface OrgPositionItem {{
  id: string;
  order: number;
  slide: number;
  deptCode: string;
  deptName: string;
  category: string;
  title: string;
  tier: number; // 1: Lãnh đạo, 2: Trưởng phòng/QĐ, 3: Trưởng nhóm/TT, 4: Chuyên viên/NV
  duties: string[];
}}

export const deptFunctionAreas: DeptFunctionArea[] = {json.dumps(dept_functions, ensure_ascii=False, indent=2)};

export const orgPositionsData: OrgPositionItem[] = {json.dumps(positions, ensure_ascii=False, indent=2)};
"""

with open(out_ts, 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Written {out_ts}")
