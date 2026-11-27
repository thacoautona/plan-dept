import { mockGovernanceDocs } from '../data/governanceData';
import { orgPositionsData, deptFunctionAreas } from '../data/orgData';
import { SYSTEM_DATABASE_FILES } from '../data/databaseData';

export interface BotSourceLink {
  title: string;
  subtitle: string;
  url?: string;
}

export interface MiniRagResult {
  contextText: string;
  sources: BotSourceLink[];
}

function normalizeText(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd');
}

function scoreMatch(text: string, tokens: string[]): number {
  const norm = normalizeText(text);
  let score = 0;
  for (const t of tokens) {
    if (t.length >= 2 && norm.includes(t)) {
      score += 1;
    }
  }
  return score;
}

/**
 * Mini-RAG cục bộ: Lọc nhanh tối đa 5 mục khớp nhất trong 223 văn bản, 85 chức danh & kho dữ liệu
 * để tiết kiệm 90-95% lượng token gửi lên Gemini.
 */
export function retrieveCompactContext(query: string): MiniRagResult {
  const normQuery = normalizeText(query);
  const tokens = Array.from(new Set(normQuery.split(/\s+/).filter((w) => w.length >= 2)));

  const candidates: { score: number; text: string; source: BotSourceLink }[] = [];

  // 1. Search Governance Docs (223 docs)
  for (const doc of mockGovernanceDocs) {
    const hay = `${doc.code} ${doc.title} ${doc.department} ${doc.departmentName} ${doc.summary}`;
    const s = scoreMatch(hay, tokens);
    if (s > 0) {
      candidates.push({
        score: s + (normQuery.includes(normalizeText(doc.department)) ? 2 : 0),
        text: `[Văn bản ${doc.code} | ${doc.department} - ${doc.sourceLabel}] ${doc.title}. Tóm tắt: ${doc.summary}`,
        source: {
          title: `${doc.code} - ${doc.title}`,
          subtitle: `${doc.department} • ${doc.sourceLabel}`,
          url: doc.driveLink || undefined
        }
      });
    }
  }

  // 2. Search Org Positions (85 positions)
  for (const pos of orgPositionsData) {
    const dutiesSnippet = pos.duties.slice(0, 4).join('; ');
    const hay = `${pos.title} ${pos.deptCode} ${pos.deptName} ${dutiesSnippet}`;
    const s = scoreMatch(hay, tokens);
    if (s > 0) {
      candidates.push({
        score: s + 0.5,
        text: `[Chức danh | ${pos.deptName}] ${pos.title}. Nhiệm vụ chính: ${pos.duties.slice(0, 5).join(' | ')}`,
        source: {
          title: pos.title,
          subtitle: `${pos.deptName} (${pos.duties.length} nhiệm vụ)`
        }
      });
    }
  }

  // 3. Search Functional Areas (12 areas)
  for (const area of deptFunctionAreas) {
    const firstItems = area.sections.map((sec) => sec.items.slice(0, 2).join('; ')).join(' | ');
    const hay = `${area.title} ${area.deptCode} ${area.group} ${firstItems}`;
    const s = scoreMatch(hay, tokens);
    if (s > 0) {
      candidates.push({
        score: s,
        text: `[Chức năng mảng | ${area.group}] ${area.title}: ${firstItems.slice(0, 300)}`,
        source: {
          title: area.title,
          subtitle: area.group
        }
      });
    }
  }

  // 4. Search Database Files (8 layout/org files)
  for (const file of SYSTEM_DATABASE_FILES) {
    const hay = `${file.name} ${file.description}`;
    const s = scoreMatch(hay, tokens);
    if (s > 0) {
      candidates.push({
        score: s + 0.5,
        text: `[Kho Cơ sở dữ liệu | ${file.format.toUpperCase()} | Cập nhật ${file.updatedAt}] ${file.name}: ${file.description}`,
        source: {
          title: file.name,
          subtitle: `${file.format.toUpperCase()} • ${file.size || ''} • ${file.updatedAt}`,
          url: file.downloadUrl
        }
      });
    }
  }

  candidates.sort((a, b) => b.score - a.score);
  const top = candidates.slice(0, 5);

  return {
    contextText: top.map((c, idx) => `${idx + 1}. ${c.text}`).join('\n'),
    sources: top.map((c) => c.source)
  };
}
