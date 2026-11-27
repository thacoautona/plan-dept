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

const STOP_WORDS = new Set([
  'nhiem', 'vu', 'cua', 'la', 'gi', 'cho', 'toi', 'tim', 'tom', 'tat',
  've', 'va', 'cac', 'tai', 'nhung', 'nay', 'do', 'duoc', 'trong', 'theo',
  'quy', 'trinh', 'dinh', 'che', 'chuc', 'danh', 'ban', 'phong', 'bo', 'phan',
  'nang', 'truong', 'van', 'huong', 'dan', 'thong', 'bao'
]);

const DOC_INTENT_KEYWORDS = [
  'quy dinh', 'quy trinh', 'quy che', 'huong dan', 'thong bao', 'bieu mau', 'van ban', 'vbqt', 'sop'
];
const ORG_INTENT_KEYWORDS = [
  'nhiem vu', 'chuc nang', 'chuc danh', 'vi tri', 'truong phong', 'chuyen vien', 'giam doc', 'ke toan truong', 'to truong', 'quan doc'
];
const DB_INTENT_KEYWORDS = [
  'layout', 'bao cao', 'co so du lieu', 'ban ve', 'tram sac', 'to chuc van hanh'
];

/**
 * Mini-RAG cục bộ: Nhận diện đúng ý định câu hỏi (Quy trình/Quy định vs Chức danh/Nhiệm vụ vs Kho dữ liệu)
 * và lọc tối đa 5 mục khớp nhất để tiết kiệm 90-95% token gửi lên Gemini.
 */
export function retrieveCompactContext(query: string): MiniRagResult {
  const normQuery = normalizeText(query);

  const isDocIntent = DOC_INTENT_KEYWORDS.some((k) => normQuery.includes(k));
  const isOrgIntent = ORG_INTENT_KEYWORDS.some((k) => normQuery.includes(k));
  const isDbIntent = DB_INTENT_KEYWORDS.some((k) => normQuery.includes(k));

  const rawTokens = Array.from(new Set(normQuery.split(/\s+/).filter((w) => w.length >= 2)));
  const meaningfulTokens = rawTokens.filter((w) => !STOP_WORDS.has(w));
  const tokens = meaningfulTokens.length > 0 ? meaningfulTokens : rawTokens;
  const topicPhrase = meaningfulTokens.join(' ');

  const candidates: { score: number; text: string; source: BotSourceLink }[] = [];

  // 1. Search Governance Docs (223 docs)
  for (const doc of mockGovernanceDocs) {
    const normTitle = normalizeText(doc.title);
    const titleScore = scoreMatch(doc.title, tokens) * 3;
    const phraseBonus = topicPhrase.length >= 4 && normTitle.includes(topicPhrase) ? 6 : 0;
    const bodyScore = scoreMatch(`${doc.code} ${doc.department} ${doc.departmentName} ${doc.summary}`, tokens);
    const baseScore = titleScore + phraseBonus + bodyScore;

    if (baseScore > 0) {
      const intentBoost = isDocIntent && !isOrgIntent ? 15 : 0;
      const deptBoost = normQuery.includes(normalizeText(doc.department)) ? 3 : 0;
      candidates.push({
        score: baseScore + intentBoost + deptBoost,
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
    const normTitle = normalizeText(`${pos.title} ${pos.deptName}`);
    const titleScore = scoreMatch(normTitle, tokens) * 3;
    const phraseBonus = topicPhrase.length >= 4 && normTitle.includes(topicPhrase) ? 5 : 0;
    const dutiesSnippet = pos.duties.slice(0, 4).join('; ');
    const bodyScore = scoreMatch(`${pos.deptCode} ${dutiesSnippet}`, tokens);
    const baseScore = titleScore + phraseBonus + bodyScore;

    if (baseScore > 0) {
      const intentBoost = isOrgIntent && !isDocIntent ? 15 : isDocIntent && !isOrgIntent ? -5 : 0;
      candidates.push({
        score: baseScore + intentBoost,
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
    const titleScore = scoreMatch(`${area.title} ${area.deptCode}`, tokens) * 2.5;
    const bodyScore = scoreMatch(`${area.group} ${firstItems}`, tokens);
    const baseScore = titleScore + bodyScore;

    if (baseScore > 0) {
      const intentBoost = isOrgIntent && !isDocIntent ? 12 : isDocIntent && !isOrgIntent ? -5 : 0;
      candidates.push({
        score: baseScore + intentBoost,
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
    const titleScore = scoreMatch(file.name, tokens) * 3;
    const bodyScore = scoreMatch(file.description, tokens);
    const baseScore = titleScore + bodyScore;

    if (baseScore > 0) {
      const intentBoost = isDbIntent ? 15 : 0;
      candidates.push({
        score: baseScore + intentBoost,
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
