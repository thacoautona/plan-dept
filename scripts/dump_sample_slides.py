import zipfile
import xml.etree.ElementTree as ET
import re

pptx_path = r"C:\Users\manhh\.gemini\antigravity\brain\65cec3c2-5d13-441b-9d43-d5cb5924f6a1\scratch\bo_tl_htqt.pptx"

ns = {
    'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
    'p': 'http://schemas.openxmlformats.org/presentationml/2006/main',
    'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
}

def get_text(elem):
    paras = []
    for p in elem.findall('.//a:p', ns):
        t = ''.join([node.text for node in p.findall('.//a:t', ns) if node.text])
        if t.strip():
            paras.append(t.strip())
    return '\n'.join(paras)

def dump_slide(z, slide_num):
    s = f"ppt/slides/slide{slide_num}.xml"
    root = ET.fromstring(z.read(s))
    print(f"=== SLIDE {slide_num} ===")
    
    # Tables
    tables = root.findall('.//a:tbl', ns)
    for idx, tbl in enumerate(tables):
        print(f"--- Table {idx+1} ---")
        for r_idx, tr in enumerate(tbl.findall('.//a:tr', ns)):
            cells = []
            for tc in tr.findall('.//a:tc', ns):
                cells.append(get_text(tc).replace('\n', ' | '))
            print(f"  Row {r_idx}: {cells}")
    
    # Non-table shapes with text
    print("--- Shapes ---")
    for sp in root.findall('.//p:sp', ns):
        txt = get_text(sp)
        if txt:
            print(f"  Shape: {txt.replace(chr(10), ' / ')}")

    # Images or embedded objects
    rels_path = f"ppt/slides/_rels/slide{slide_num}.xml.rels"
    if rels_path in z.namelist():
        rels = ET.fromstring(z.read(rels_path))
        for rel in rels:
            t = rel.attrib.get('Target', '')
            if 'media/' in t or 'embeddings/' in t:
                print(f"  Media/Embed: {t}")

with zipfile.ZipFile(pptx_path, 'r') as z:
    for n in [4, 5, 7, 16, 22, 24, 43]:
        dump_slide(z, n)
        print()
