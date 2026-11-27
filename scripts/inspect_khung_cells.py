import urllib.request
import re

url = "https://docs.google.com/spreadsheets/d/1cZS7XjR-FHrUcu_PBdlQtzh3BmKyRSqW01UuAhYN3Lw/htmlview/sheet?headers=true&gid=256048327"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode("utf-8")

rows = re.findall(r'<tr[^>]*>(.*?)</tr>', html, re.DOTALL)
for r in rows[:10]:
    cells = re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>', r, re.DOTALL)
    clean_cells = [re.sub(r'<[^>]+>', '', c).strip() for c in cells]
    print(clean_cells)
