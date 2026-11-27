import urllib.request
import re

url = "https://docs.google.com/spreadsheets/d/1cZS7XjR-FHrUcu_PBdlQtzh3BmKyRSqW01UuAhYN3Lw/htmlview"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode("utf-8")
        print("HTML view length:", len(html))
        
        # Find sheet tabs in htmlview
        # e.g. <li id="sheet-button-1561956432">... or <a href="#gid=...">Sheet Name</a>
        sheet_tabs = re.findall(r'<li id="sheet-button-([0-9]+)"[^>]*><a[^>]*>([^<]+)</a>', html)
        print("Sheet tabs found:", sheet_tabs)
        
        if not sheet_tabs:
            sheet_tabs2 = re.findall(r'item-([0-9]+)[^>]*>([^<]+)', html)
            print("Sheet tabs 2:", sheet_tabs2[:10])
except Exception as e:
    print("Error:", e)
