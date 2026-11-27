/**
 * Cloudflare Worker Proxy cho Trợ lý AI THACO AUTO Nghệ An
 * - Giấu kín GEMINI_API_KEY trong Cloudflare Environment Secrets
 * - Chỉ cho phép website https://thacoautona.github.io (và localhost) gọi vào
 * - Tự động dự phòng model: gemini-3.5-flash-lite -> gemini-3.1-flash-lite -> gemini-2.5-flash-lite
 */

const ALLOWED_ORIGINS = [
  'https://thacoautona.github.io',
  'http://localhost:5173'
];

const MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite',
  'gemini-2.5-flash-lite'
];

function getCorsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const corsHeaders = getCorsHeaders(origin);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    try {
      const body = await request.json();
      const query = String(body.query || '').slice(0, 400).trim();
      const context = String(body.context || '').slice(0, 3500).trim();

      if (!query) {
        return new Response(JSON.stringify({ error: 'Thiếu câu hỏi' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const systemPrompt =
        'Bạn là Trợ lý AI nội bộ của THACO AUTO Nghệ An. ' +
        'Hãy trả lời ngắn gọn, súc tích bằng tiếng Việt (3-5 gạch đầu dòng), dựa trên dữ liệu hệ thống được cung cấp. ' +
        'Nếu dữ liệu không có thông tin, hãy nói rõ là chưa có trong tài liệu được nạp.';

      const userPrompt = context
        ? `Dữ liệu liên quan tìm được từ hệ thống:\n${context}\n\nCâu hỏi của người dùng: ${query}`
        : `Câu hỏi của người dùng: ${query}`;

      let lastError = 'Không gọi được Gemini API';

      for (const model of MODELS) {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${env.GEMINI_API_KEY}`;
        const geminiRes = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
            generationConfig: {
              maxOutputTokens: 600,
              temperature: 0.3
            }
          })
        });

        const data = await geminiRes.json();
        if (geminiRes.ok && data?.candidates?.[0]?.content?.parts?.[0]?.text) {
          return new Response(
            JSON.stringify({
              answer: data.candidates[0].content.parts[0].text,
              model
            }),
            {
              status: 200,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        }

        lastError = data?.error?.message || `HTTP ${geminiRes.status}`;
      }

      return new Response(JSON.stringify({ error: lastError }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message || 'Server error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
};
