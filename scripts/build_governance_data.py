import urllib.request
import re
import json
import html as html_module
from urllib.parse import parse_qs, urlparse

def unwrap_google_link(href):
    if not href:
        return ""
    if "google.com/url?" in href:
        parsed = urlparse(href)
        qs = parse_qs(parsed.query)
        if "q" in qs:
            return qs["q"][0]
    return href

# Dept Mapping Rule from user:
# DVPT DL -> DVDL, DV HTKD -> HCNS, PNS -> HCNS, KD xe DL -> KDDL, KD xe TB -> KDTB, PKH -> NVKH, KD xe QSD -> QSD, DVPT TB -> DVTB
DEPT_STANDARDIZATION = {
    "DVPT DL": "DVDL",
    "DVHTKD": "HCNS",
    "DV HTKD": "HCNS",
    "PNS": "HCNS",
    "KD XE DL": "KDDL",
    "KD xe DL": "KDDL",
    "KD XE TB": "KDTB",
    "KD xe TB": "KDTB",
    "PKH": "NVKH",
    "KD XE QSD": "QSD",
    "KD xe QSD": "QSD",
    "DVPT TB": "DVTB",
    "TCKT": "TCKT",
    "MKT": "MKT",
    "NVCN": "NVCN"
}

DEPT_NAMES = {
    "KDDL": "Kinh doanh xe du lịch",
    "KDTB": "Kinh doanh xe Tải bus",
    "DVDL": "Kinh doanh Dịch vụ phụ tùng du lịch",
    "DVTB": "Kinh doanh dịch vụ phụ tùng tải bus",
    "QSD": "Kinh doanh xe du lịch đã qua sử dụng",
    "TCKT": "Tài chính kế toán",
    "HCNS": "Nhân sự, quản trị văn phòng & an sinh",
    "NVKH": "Kế hoạch",
    "MKT": "Marketing",
    "NVCN": "Tiêu chuẩn & Quản lý chất lượng kho xe",
    "VPDH": "Văn phòng điều hành (VPĐH)"
}

def standardize_dept(raw):
    if not raw or not raw.strip():
        return "NVKH"
    raw_clean = raw.strip()
    
    # Check if multiple departments separated by comma
    parts = [p.strip() for p in raw_clean.split(",")]
    std_parts = []
    for p in parts:
        matched = False
        for k, v in DEPT_STANDARDIZATION.items():
            if p.upper() == k.upper():
                std_parts.append(v)
                matched = True
                break
        if not matched:
            std_parts.append(p)
            
    return ", ".join(std_parts)

def generate_summary(title, category, dept, source_level):
    title_clean = title.strip()
    source_name = "Văn phòng Điều hành (VPĐH)" if source_level == "VPDH" else "THACO AUTO Nghệ An"
    
    # Specialized semantic summary based on keywords
    t_lower = title_clean.lower()
    if "tài chính" in t_lower or "báo cáo tài chính" in t_lower or "kế toán" in t_lower or "khấu hao" in t_lower:
        return f"Quy định nguyên tắc hạch toán, kiểm soát chứng từ và quản trị dòng tiền phục vụ điều hành hoạt động tại {source_name}."
    elif "linh động" in t_lower or "thẩm quyền" in t_lower or "quyết định" in t_lower:
        return f"Phân định phạm vi quyền hạn và hạn mức phê duyệt dành cho Giám đốc và các Trưởng bộ phận trong vận hành kinh doanh."
    elif "bán hàng" in t_lower or "hợp đồng" in t_lower or "giao xe" in t_lower or "ddms" in t_lower:
        return f"Quy chuẩn quy trình đón tiếp, báo giá, lập hợp đồng bán hàng và thủ tục bàn giao xe đúng tiêu chuẩn nhận diện thương hiệu."
    elif "dịch vụ" in t_lower or "phụ tùng" in t_lower or "bảo dưỡng" in t_lower or "sửa chữa" in t_lower:
        return f"Chuẩn hóa luồng tiếp nhận dịch vụ, định mức giờ công, báo giá phụ tùng và kiểm soát chất lượng kỹ thuật xuất xưởng."
    elif "nhân sự" in t_lower or "lương" in t_lower or "thưởng" in t_lower or "đồng phục" in t_lower or "khen thưởng" in t_lower:
        return f"Quy chế quản lý nhân sự, chế độ đãi ngộ, văn hóa doanh nghiệp và quy tắc ứng xử nội bộ đối với toàn thể CBNV."
    elif "hành chính" in t_lower or "tài sản" in t_lower or "5s" in t_lower or "văn phòng phẩm" in t_lower or "nhiên liệu" in t_lower:
        return f"Hướng dẫn kiểm soát chi phí hành chính, quản lý tài sản cơ sở vật chất và duy trì tiêu chuẩn môi trường làm việc 5S."
    elif "kế hoạch" in t_lower or "báo cáo" in t_lower or "tuần" in t_lower or "tháng" in t_lower:
        return f"Quy định thời hạn lập kế hoạch, tổng hợp số liệu tiến độ KPI định kỳ và tham mưu giải pháp nâng cao hiệu quả vận hành."
    elif "marketing" in t_lower or "sự kiện" in t_lower or "truyền thông" in t_lower:
        return f"Quy định kế hoạch triển khai các chương trình lái thử, quảng bá thương hiệu và chăm sóc khách hàng tại địa bàn."
    elif "kho xe" in t_lower or "gnvc" in t_lower or "giao nhận" in t_lower or "pdi" in t_lower:
        return f"Quy chuẩn tiếp nhận xe từ nhà máy Chu Lai, bảo quản lưu kho và thủ tục xuất kho bàn giao xe an toàn tuyệt đối."
    else:
        return f"Văn bản quản trị {category.lower()} hướng dẫn chi tiết nghiệp vụ tác nghiệp và bảo đảm tính tuân thủ tại {source_name}."

def parse_all():
    docs = []
    
    # 1. PARSE SHEET 1: VBQT NỘI BỘ (Đang áp dụng) (gid=1561956432)
    url1 = "https://docs.google.com/spreadsheets/d/1cZS7XjR-FHrUcu_PBdlQtzh3BmKyRSqW01UuAhYN3Lw/htmlview/sheet?headers=true&gid=1561956432"
    req1 = urllib.request.Request(url1, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req1) as resp:
        html1 = resp.read().decode("utf-8")
        
    rows1 = re.findall(r'<tr[^>]*>(.*?)</tr>', html1, re.DOTALL)
    for r in rows1:
        cells = re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>', r, re.DOTALL)
        clean = [re.sub(r'<[^>]+>', '', c).strip() for c in cells]
        
        # Check STT
        if len(clean) > 8 and clean[1].isdigit():
            stt = int(clean[1])
            raw_title = html_module.unescape(clean[2])
            code = clean[4] if len(clean) > 4 else ""
            date = clean[5] if len(clean) > 5 else ""
            approver = clean[6] if len(clean) > 6 else ""
            raw_dept = clean[7] if len(clean) > 7 else ""
            coordination = clean[8] if len(clean) > 8 else ""
            category_label = clean[9] if len(clean) > 9 else "Quy định"
            issue_type = clean[11] if len(clean) > 11 else ""
            notes = clean[13] if len(clean) > 13 else ""
            
            # Extract link
            link_m = re.search(r'href=\"([^\"]+)\"', r)
            link = unwrap_google_link(link_m.group(1)) if link_m else ""
            
            dept_std = standardize_dept(raw_dept)
            
            # Map category
            cat_lower = category_label.lower()
            if "quy chế" in cat_lower:
                cat = "quy_che"
            elif "quy trình" in cat_lower or "sop" in cat_lower:
                cat = "quy_trinh"
            elif "thông báo" in cat_lower:
                cat = "thong_bao"
            elif "hướng dẫn" in cat_lower:
                cat = "huong_dan"
            elif "biểu mẫu" in cat_lower:
                cat = "bieu_mau"
            else:
                cat = "quy_dinh"
                
            summary = generate_summary(raw_title, category_label, dept_std, "NOI_BO")
            
            docs.append({
                "id": f"nb-{stt}",
                "stt": stt,
                "title": raw_title,
                "code": code,
                "effectiveDate": date,
                "approvedBy": approver,
                "department": dept_std,
                "departmentName": DEPT_NAMES.get(dept_std, dept_std),
                "sourceLevel": "NOI_BO",
                "sourceLabel": "THACO AUTO Nghệ An",
                "category": cat,
                "categoryLabel": category_label,
                "coordination": coordination,
                "issueType": issue_type,
                "notes": notes,
                "driveLink": link,
                "summary": summary
            })
            
    print(f"Parsed {len(docs)} documents from VBQT Nội bộ")

    # 2. PARSE SHEET 2: VBQT KHUNG (gid=256048327)
    url2 = "https://docs.google.com/spreadsheets/d/1cZS7XjR-FHrUcu_PBdlQtzh3BmKyRSqW01UuAhYN3Lw/htmlview/sheet?headers=true&gid=256048327"
    req2 = urllib.request.Request(url2, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req2) as resp:
        html2 = resp.read().decode("utf-8")
        
    rows2 = re.findall(r'<tr[^>]*>(.*?)</tr>', html2, re.DOTALL)
    khung_count = 0
    for r in rows2:
        cells = re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>', r, re.DOTALL)
        clean = [re.sub(r'<[^>]+>', '', c).strip() for c in cells]
        
        if len(clean) > 7 and clean[1].isdigit():
            stt = int(clean[1])
            raw_title = html_module.unescape(clean[2])
            code = clean[3] if len(clean) > 3 else ""
            date = clean[4] if len(clean) > 4 else ""
            approver = clean[5] if len(clean) > 5 else ""
            raw_dept = clean[6] if len(clean) > 6 else "VPĐH"
            issuer = clean[7] if len(clean) > 7 else "VPĐH THACO AUTO"
            category_label = clean[8] if len(clean) > 8 else "Quy định"
            notes = clean[9] if len(clean) > 9 else ""
            
            link_m = re.search(r'href=\"([^\"]+)\"', r)
            link = unwrap_google_link(link_m.group(1)) if link_m else ""
            
            cat_lower = category_label.lower()
            if "quy chế" in cat_lower:
                cat = "quy_che"
            elif "quy trình" in cat_lower or "sop" in cat_lower:
                cat = "quy_trinh"
            elif "thông báo" in cat_lower:
                cat = "thong_bao"
            elif "hướng dẫn" in cat_lower:
                cat = "huong_dan"
            elif "biểu mẫu" in cat_lower:
                cat = "bieu_mau"
            else:
                cat = "quy_dinh"
                
            summary = generate_summary(raw_title, category_label, "VPDH", "VPDH")
            
            docs.append({
                "id": f"khung-{stt}",
                "stt": stt,
                "title": raw_title,
                "code": code,
                "effectiveDate": date,
                "approvedBy": approver,
                "department": "VPDH",
                "departmentName": f"Văn phòng Điều hành ({raw_dept})",
                "sourceLevel": "VPDH",
                "sourceLabel": "Văn phòng Điều hành (VPĐH)",
                "category": cat,
                "categoryLabel": category_label,
                "coordination": "Toàn hệ thống",
                "issueType": "Khung Tập đoàn",
                "notes": notes,
                "driveLink": link,
                "summary": summary
            })
            khung_count += 1
            
    print(f"Parsed {khung_count} documents from VBQT Khung")
    print(f"Total documents combined: {len(docs)}")
    
    out_path = r"d:\Data\App Data\Antigravity\scratch\thaco\src\data\governanceDocs.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(docs, f, ensure_ascii=False, indent=2)
        
    print(f"Saved to {out_path} successfully!")

parse_all()
