/**
 * Cấu hình Trợ lý AI (Gemini qua Cloudflare Workers Proxy)
 */
export const BOT_CONFIG = {
  /**
   * Dán URL Cloudflare Worker của bạn vào đây sau khi deploy xong
   * Ví dụ: 'https://thaco-ai-bot.manhhung.workers.dev'
   */
  WORKER_URL: 'https://thaco-ai-bot.backup-thaco.workers.dev',

  BOT_NAME: 'Trợ lý AI THACO AUTO Nghệ An',
  MAX_INPUT_CHARS: 400,
  COOLDOWN_SECONDS: 5
};
