import zipfile
import xml.etree.ElementTree as ET
import re
import json

pptx_path = r"C:\Users\manhh\.gemini\antigravity\brain\65cec3c2-5d13-441b-9d43-d5cb5924f6a1\scratch\bo_tl_htqt.pptx"
out_path = r"C:\Users\manhh\.gemini\antigravity\brain\65cec3c2-5d13-441b-9d43-d5cb5924f6a1\scratch\pptx_extracted.json"

ns = {
    'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
    'p': 'http://schemas.openxmlformats.org/presentationml/2006/main',
    'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
}

def get_paras(elem):
    paras = []
    for p in elem.findall('.//a:p', ns):
        t = ''.join([node.text for node in p.findall('.//a:t', ns) if node.text])
        if t.strip():
            paras.append(t.strip())
    return paras

data = []
with zipfile.ZipFile(pptx_path, 'r') as z:
    slides = [f for f in z.namelist() if re.match(r'^ppt/slides/slide\d+\.xml$', f)]
    slides.sort(key=lambda s: int(re.search(r'slide(\d+)\.xml', s).group(1)))
    
    for s in slides:
        slide_num = int(re.search(r'slide(\d+)\.xml', s).group(1))
        root = ET.fromstring(z.read(s))
        
        tables = []
        for tbl in root.findall('.//a:tbl', ns):
            rows = []
            for tr in tbl.findall('.//a:tr', ns):
                row_cells = []
                for tc in tr.findall('.//a:tc', ns):
                    row_cells.append(get_paras(tc))
                rows.append(row_cells)
            tables.append(rows)
            
        shapes = []
        for sp in root.findall('.//p:sp', ns):
            ps = get_paras(sp)
            if ps:
                shapes.append(ps)
                
        media = []
        rels_path = f"ppt/slides/_rels/slide{slide_num}.xml.rels"
        if rels_path in z.namelist():
            rels = ET.fromstring(z.read(rels_path))
            for rel in rels:
                t = rel.attrib.get('Target', '')
                if 'media/' in t or 'embeddings/' in t:
                    media.append(t)
                    
        data.append({
            "slide": slide_num,
            "shapes": shapes,
            "tables": tables,
            "media": media
        })

with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Extracted {len(data)} slides to {out_path}")

# Print summary of positions in slides 24-51
print("\n=== POSITIONS SUMMARY (Slides 24-51) ===")
for item in data:
    if 24 <= item["slide"] <= 51:
        header = " / ".join(item["shapes"][0]) if item["shapes"] else ""
        positions = []
        for tbl in item["tables"]:
            for r in tbl[1:]:
                if r and r[0]:
                    positions.append(" ".join(r[0]))
        print(f"Slide {item['slide']} [{header}]: {positions}")
