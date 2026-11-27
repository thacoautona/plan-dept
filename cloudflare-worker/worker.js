/**
 * Cloudflare Worker Proxy cho Trợ lý AI THACO AUTO Nghệ An
 * - Model mặc định: gemini-3.5-flash-lite
 * - Giấu kín GEMINI_API_KEY trong Cloudflare Environment Secrets
 */

const ALLOWED_ORIGINS = [
  'https://thacoautona.github.io',
  'http://localhost:5173'
];

const MODEL = 'gemini-3.5-flash-lite';

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
      if (!env.GEMINI_API_KEY) {
        return new Response(JSON.stringify({ error: 'Chưa cấu hình GEMINI_API_KEY trong Cloudflare Secrets' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const body = await request.json();
      const query = String(body.query || '').slice(0, 400).trim();
      const context = String(body.context || '').slice(0, 3500).trim();

      if (!query) {
        return new Response(JSON.stringify({ error: 'Thiếu câu hỏi' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const promptText =
        'Bạn là Trợ lý AI nội bộ của THACO AUTO Nghệ An. ' +
        'Hãy trả lời ngắn gọn, súc tích bằng tiếng Việt (3-5 gạch đầu dòng), dựa trên dữ liệu hệ thống được cung cấp. ' +
        'Nếu dữ liệu không có thông tin, hãy nói rõ là chưa có trong tài liệu được nạp.\n\n' +
        (context ? `Dữ liệu liên quan tìm được từ hệ thống:\n${context}\n\n` : '') +
        `Câu hỏi của người dùng: ${query}`;

      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${env.GEMINI_API_KEY}`;
      const geminiRes = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: promptText }] }],
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
            model: MODEL
          }),
          {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }

      const errMsg = data?.error?.message || `HTTP ${geminiRes.status}`;
      return new Response(JSON.stringify({ error: errMsg }), {
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
