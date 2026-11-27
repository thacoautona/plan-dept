/**
 * Google Apps Script Proxy cho Trợ lý AI THACO AUTO Nghệ An
 * - Chạy trực tiếp trên máy chủ Google (không bị lỗi User location is not supported)
 * - Model mặc định: gemini-3.5-flash-lite
 */

const GEMINI_API_KEY = 'DAN_API_KEY_GEMINI_CUA_BAN_VAO_DAY';
const MODEL = 'gemini-3.5-flash-lite';

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    const query = String(body.query || '').slice(0, 400).trim();
    const context = String(body.context || '').slice(0, 3500).trim();

    if (!query) {
      return jsonResponse({ error: 'Thiếu câu hỏi' });
    }

    const promptText =
      'Bạn là Trợ lý AI nội bộ của THACO AUTO Nghệ An. ' +
      'Hãy trả lời ngắn gọn, súc tích bằng tiếng Việt (3-5 gạch đầu dòng), dựa trên dữ liệu hệ thống được cung cấp. ' +
      'Nếu dữ liệu không có thông tin, hãy nói rõ là chưa có trong tài liệu được nạp.\n\n' +
      (context ? 'Dữ liệu liên quan tìm được từ hệ thống:\n' + context + '\n\n' : '') +
      'Câu hỏi của người dùng: ' + query;

    const url =
      'https://generativelanguage.googleapis.com/v1beta/models/' +
      MODEL +
      ':generateContent?key=' +
      GEMINI_API_KEY;

    const options = {
      method: 'post',
      contentType: 'application/json',
      muteHttpExceptions: true,
      payload: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: promptText }] }],
        generationConfig: {
          maxOutputTokens: 600,
          temperature: 0.3
        }
      })
    };

    const res = UrlFetchApp.fetch(url, options);
    const data = JSON.parse(res.getContentText());

    if (res.getResponseCode() === 200 && data.candidates && data.candidates[0]) {
      return jsonResponse({
        answer: data.candidates[0].content.parts[0].text,
        model: MODEL
      });
    }

    const errMsg = (data.error && data.error.message) || ('HTTP ' + res.getResponseCode());
    return jsonResponse({ error: errMsg });
  } catch (err) {
    return jsonResponse({ error: err.message || 'Server error' });
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
