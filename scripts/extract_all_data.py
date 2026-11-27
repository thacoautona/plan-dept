import urllib.request
import re
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

def parse_sheet_rows(gid, sheet_type):
    url = f"https://docs.google.com/spreadsheets/d/1cZS7XjR-FHrUcu_PBdlQtzh3BmKyRSqW01UuAhYN3Lw/htmlview/sheet?headers=true&gid={gid}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode("utf-8")
        
    rows = re.findall(r'<tr[^>]*>(.*?)</tr>', html, re.DOTALL)
    print(f"Sheet {sheet_type} ({gid}) raw rows: {len(rows)}")
    
    docs = []
    # Find data rows (starting around row 4 where STT is a number)
    for r_idx, r in enumerate(rows):
        cells = re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>', r, re.DOTALL)
        if len(cells) < 4:
            continue
            
        clean_cells = [re.sub(r'<[^>]+>', '', c).strip() for c in cells]
        
        # Check if cell 1 or 2 is a numeric STT or has title
        # Let's inspect where title is
        stt_cand = clean_cells[1] if len(clean_cells) > 1 else ""
        if not stt_cand.isdigit():
            # sometimes cell 0 or cell 2 has STT
            continue
            
        # Find link in row
        link_match = re.search(r'href=\"([^\"]+)\"[^>]*>([^<]*)</a>', r)
        raw_link = link_match.group(1) if link_match else ""
        clean_link = unwrap_google_link(raw_link)
        
        docs.append({
            "rowIndex": r_idx,
            "stt": stt_cand,
            "cells": clean_cells,
            "link": clean_link
        })
        
    print(f"Extracted {len(docs)} documents from {sheet_type}")
    if docs:
        print("Sample doc 0 cells:", docs[0]["cells"])
        print("Sample doc 0 link:", docs[0]["link"])
    return docs

docs_noibo = parse_sheet_rows("1561956432", "VBQT nội bộ")
docs_khung = parse_sheet_rows("256048327", "VBQT Khung")
