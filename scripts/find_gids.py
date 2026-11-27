import urllib.request
import re

url = "https://docs.google.com/spreadsheets/d/1cZS7XjR-FHrUcu_PBdlQtzh3BmKyRSqW01UuAhYN3Lw/htmlview"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode("utf-8")

# Let's search for any 'gid='
gids = re.findall(r'gid=([0-9]+)', html)
print("Unique gids in htmlview:", set(gids))

# Let's print snippets around gid=
for m in re.finditer(r'gid=([0-9]+)', html):
    s = max(0, m.start() - 50)
    e = min(len(html), m.end() + 100)
    print("Snippet:", html[s:e])
    break
