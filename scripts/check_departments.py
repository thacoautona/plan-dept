import urllib.request
import re
from urllib.parse import parse_qs, urlparse

url = "https://docs.google.com/spreadsheets/d/1cZS7XjR-FHrUcu_PBdlQtzh3BmKyRSqW01UuAhYN3Lw/htmlview/sheet?headers=true&gid=1561956432"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode("utf-8")

rows = re.findall(r'<tr[^>]*>(.*?)</tr>', html, re.DOTALL)
departments_found = {}

for r in rows:
    cells = re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>', r, re.DOTALL)
    clean_cells = [re.sub(r'<[^>]+>', '', c).strip() for c in cells]
    if len(clean_cells) > 7 and clean_cells[1].isdigit():
        bp = clean_cells[7]
        departments_found[bp] = departments_found.get(bp, 0) + 1

print("Unique BP ban hành in VBQT nội bộ:")
for k, v in sorted(departments_found.items()):
    print(f"'{k}': {v}")
