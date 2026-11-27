import zipfile
import xml.etree.ElementTree as ET
import re

pptx_path = r"C:\Users\manhh\.gemini\antigravity\brain\65cec3c2-5d13-441b-9d43-d5cb5924f6a1\scratch\bo_tl_htqt.pptx"

def inspect_pptx(path):
    with zipfile.ZipFile(path, 'r') as z:
        slides = [f for f in z.namelist() if re.match(r'^ppt/slides/slide\d+\.xml$', f)]
        # Sort slides numerically
        slides.sort(key=lambda s: int(re.search(r'slide(\d+)\.xml', s).group(1)))
        print(f"Total slides: {len(slides)}\n")
        
        ns = {
            'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
            'p': 'http://schemas.openxmlformats.org/presentationml/2006/main',
            'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
        }
        
        for s in slides:
            slide_num = re.search(r'slide(\d+)\.xml', s).group(1)
            xml_content = z.read(s)
            root = ET.fromstring(xml_content)
            
            # Extract all text paragraphs
            texts = []
            for p in root.findall('.//a:p', ns):
                p_text = ''.join([t.text for t in p.findall('.//a:t', ns) if t.text])
                if p_text.strip():
                    texts.append(p_text.strip())
            
            # Check tables
            tables = root.findall('.//a:tbl', ns)
            
            title = texts[0] if texts else "(No text)"
            second = texts[1] if len(texts) > 1 else ""
            print(f"Slide {slide_num}: [Tables: {len(tables)}, Texts: {len(texts)}] | {title[:80]} || {second[:60]}")

if __name__ == "__main__":
    inspect_pptx(pptx_path)
