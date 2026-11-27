import urllib.request
import re

test_urls = [
    "https://drive.google.com/file/d/12FmytZp6vYl5QTAcdJOXnO4UjlQ992OD/view?usp=sharing",
    "https://drive.google.com/file/d/1QKSGHxa86Rah8edgkAHiCE4MkxP6wFaB/view?usp=sharing"
]

for url in test_urls:
    print("Testing:", url)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode("utf-8")
            title = re.findall(r"<title>([^<]+)</title>", html)
            print("Title:", title)
    except Exception as e:
        print("Error:", e)
