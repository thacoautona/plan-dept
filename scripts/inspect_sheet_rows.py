import urllib.request
import re
from bs4 import BeautifulSoup

def inspect_sheet(gid, name):
    url = f"https://docs.google.com/spreadsheets/d/1cZS7XjR-FHrUcu_PBdlQtzh3BmKyRSqW01UuAhYN3Lw/htmlview/sheet?headers=true&gid={gid}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode("utf-8")
    
    print(f"=== Sheet: {name} (gid={gid}) ===")
    print("HTML length:", len(html))
    
    # Let's count table rows
    rows = re.findall(r'<tr[^>]*>(.*?)</tr>', html, re.DOTALL)
    print(f"Total rows: {len(rows)}")
    
    # Check headers (first non-empty row)
    for i, r in enumerate(rows[:5]):
        cells = re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>', r, re.DOTALL)
        clean_cells = [re.sub(r'<[^>]+>', '', c).strip() for c in cells]
        print(f"Row {i} ({len(cells)} cells):", clean_cells[:14])
        # Look for links in this row
        links = re.findall(r'href=\"([^\"]+)\"', r)
        if links:
            print("  Links:", links[:3])

inspect_sheet("1561956432", "VBQT nội bộ")
inspect_sheet("256048327", "VBQT Khung")
