import urllib.request
import re

sheet_id = "1cZS7XjR-FHrUcu_PBdlQtzh3BmKyRSqW01UuAhYN3Lw"
url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/edit"

req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode("utf-8")

for m in re.finditer(r"1561956432", html):
    start = max(0, m.start() - 100)
    end = min(len(html), m.end() + 200)
    print("Found around 1561956432:", html[start:end])
    print("="*40)

for m in re.finditer(r"VBQT", html):
    start = max(0, m.start() - 100)
    end = min(len(html), m.end() + 200)
    print("Found around VBQT:", html[start:end])
    print("="*40)
