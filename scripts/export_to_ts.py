import json

with open(r"src\data\governanceDocs.json", encoding="utf-8") as f:
    docs = json.load(f)

ts_content = f"""import {{ GovernanceDoc }} from '../types';

export const mockGovernanceDocs: GovernanceDoc[] = {json.dumps(docs, ensure_ascii=False, indent=2)};
"""

with open(r"src\data\governanceData.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"Exported {len(docs)} documents to src/data/governanceData.ts successfully!")
