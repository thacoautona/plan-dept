import urllib.request
import re
import json

url = "https://docs.google.com/spreadsheets/d/1cZS7XjR-FHrUcu_PBdlQtzh3BmKyRSqW01UuAhYN3Lw/htmlview"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode("utf-8")

matches = re.findall(r'items\.push\({\s*name:\s*\"([^\"]+)\"[^}}]*?gid:\s*\"([0-9]+)\"', html)
print("Found items:", len(matches))
for name, gid in matches:
    print(f"Sheet Name: '{name}' -> gid: {gid}")
