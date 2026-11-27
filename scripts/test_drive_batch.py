import urllib.request
import re
from urllib.parse import parse_qs, urlparse

# Let's write a function to get Drive title with timeout
def get_drive_info(link):
    if not link or "drive.google.com" not in link:
        return ""
    try:
        req = urllib.request.Request(link, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=3) as resp:
            html = resp.read(50000).decode("utf-8", errors="ignore")
            title_m = re.search(r"<title>([^<]+)</title>", html)
            if title_m:
                t = title_m.group(1).replace(" - Google Drive", "").strip()
                return t
    except Exception:
        pass
    return ""

print("Test function ready")
