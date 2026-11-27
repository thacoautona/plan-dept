/**
 * Cấu hình Trợ lý AI (Gemini qua Cloudflare Workers Proxy)
 */
export const BOT_CONFIG = {
  /**
   * Dán URL Cloudflare Worker của bạn vào đây sau khi deploy xong
   * Ví dụ: 'https://thaco-ai-bot.manhhung.workers.dev'
   */
  WORKER_URL: 'https://script.google.com/macros/s/AKfycbwcanBFgfHP-yJD1XdKRSRuzMcRXpd4-fxjGcC-5dtGmMzPiNRGk-VXIbJA9k_AH_Mx/exec',

  BOT_NAME: 'Trợ lý AI THACO AUTO Nghệ An',
  MAX_INPUT_CHARS: 400,
  COOLDOWN_SECONDS: 5
};
