import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  ExternalLink,
  Bot,
  Trash2
} from 'lucide-react';
import { BOT_CONFIG } from '../config/botConfig';
import { retrieveCompactContext, BotSourceLink } from '../utils/botSearch';
import { AuthUser } from '../config/authConfig';
import { logActivity } from '../utils/activityLogger';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  sources?: BotSourceLink[];
}

interface AiAssistantBotProps {
  authUser: AuthUser | null;
}

const SUGGESTIONS = [
  'Nhiệm vụ của TP Kế hoạch tổng hợp là gì?',
  'Tìm quy định về bảo hành hoặc dịch vụ phụ tùng',
  'Layout cải tạo Showroom Lê Lợi',
  'Tóm tắt chức năng mảng Kinh doanh Xe Du lịch'
];

export const AiAssistantBot: React.FC<AiAssistantBotProps> = ({ authUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cooldownLeft, setCooldownLeft] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Xin chào! Tôi là Trợ lý AI THACO AUTO Nghệ An. Tôi có thể giúp bạn tìm kiếm nhanh và tóm tắt nội dung từ 223 văn bản Quy trình Quy định, 85 Chức danh và Kho Cơ sở dữ liệu.'
    }
  ]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (cooldownLeft <= 0) return;
    const timer = setTimeout(() => setCooldownLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldownLeft]);

  const handleSend = async (customText?: string) => {
    const query = (customText ?? input).trim();
    if (!query || isLoading || cooldownLeft > 0) return;

    const clippedQuery = query.slice(0, BOT_CONFIG.MAX_INPUT_CHARS);
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: clippedQuery
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInput('');
    setIsLoading(true);
    setCooldownLeft(BOT_CONFIG.COOLDOWN_SECONDS);

    logActivity({
      userEmail: authUser?.email || 'khach',
      userName: authUser?.name || 'Khách truy cập',
      method: authUser?.method || 'guest',
      action: 'view_tab',
      detail: `Hỏi Trợ lý AI: "${clippedQuery}"`
    });

    const { contextText, sources } = retrieveCompactContext(clippedQuery);

    // If Cloudflare Worker URL is not configured yet, provide clean local search results
    if (!BOT_CONFIG.WORKER_URL) {
      const fallbackReply =
        sources.length > 0
          ? `Tôi đã tìm thấy **${sources.length} mục liên quan nhất** trên hệ thống (chế độ tìm kiếm cục bộ — gắn URL Cloudflare Worker để bật tóm tắt thông minh bằng Gemini):\n\n` +
            sources.map((s, idx) => `${idx + 1}. **${s.title}** (${s.subtitle})`).join('\n')
          : 'Không tìm thấy tài liệu hoặc chức danh nào khớp với từ khóa của bạn. Bạn thử nhập từ khóa ngắn gọn hơn (VD: "bảo hành", "kế hoạch", "Showroom Lê Lợi").';

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          text: fallbackReply,
          sources
        }
      ]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(BOT_CONFIG.WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: clippedQuery,
          context: contextText
        })
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Lỗi kết nối máy chủ AI');
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          text: data.answer || 'Không có phản hồi từ AI.',
          sources
        }
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          text: `Không thể kết nối AI lúc này (${err?.message || 'lỗi mạng'}). Dưới đây là các tài liệu khớp nhất tìm được trực tiếp:`,
          sources
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#004B87] hover:bg-[#003A69] text-white shadow-xl hover:shadow-2xl transition-all text-xs font-semibold border border-blue-400/30"
          title="Mở Trợ lý AI tìm kiếm & tóm tắt tài liệu"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Trợ lý AI</span>
        </button>
      )}

      {/* Chat Drawer */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 z-50 w-[360px] sm:w-[400px] h-[540px] max-h-[85vh] bg-white dark:bg-[#202020] rounded-2xl border border-gray-200 dark:border-[#333] shadow-2xl flex flex-col overflow-hidden animate-in fade-in duration-150">
          {/* Header */}
          <div className="px-4 py-3 bg-[#004B87] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-white/15">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold leading-tight">{BOT_CONFIG.BOT_NAME}</h3>
                <p className="text-[10px] text-blue-100">
                  {BOT_CONFIG.WORKER_URL ? 'Gemini Flash-Lite • Bảo mật Proxy' : 'Tìm kiếm nhanh (Chưa gắn Worker AI)'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessages(messages.slice(0, 1))}
                className="p-1.5 rounded-lg hover:bg-white/15 text-blue-100"
                title="Xóa hội thoại"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/15 text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-[#FBFBFA] dark:bg-[#191919]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'bg-[#004B87] text-white rounded-br-sm'
                      : 'bg-white dark:bg-[#252525] text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-[#333] rounded-bl-sm shadow-2xs'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Source Links */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-1.5 w-[88%] space-y-1">
                    {msg.sources.map((src, i) => (
                      <div
                        key={i}
                        className="px-2.5 py-1.5 rounded-lg bg-blue-50/70 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 flex items-center justify-between gap-2 text-[11px]"
                      >
                        <div className="min-w-0">
                          <div className="font-semibold text-[#004B87] dark:text-blue-300 truncate">
                            {src.title}
                          </div>
                          <div className="text-[10px] text-gray-500 truncate">{src.subtitle}</div>
                        </div>
                        {src.url && (
                          <a
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded text-[#004B87] dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 flex-shrink-0"
                            title="Mở tài liệu"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start">
                <div className="px-3.5 py-2 rounded-2xl bg-white dark:bg-[#252525] border border-gray-200 dark:border-[#333] text-xs text-gray-400">
                  Đang tra cứu & tóm tắt...
                </div>
              </div>
            )}
          </div>

          {/* Quick Suggestions */}
          {messages.length <= 1 && (
            <div className="px-3 py-2 border-t border-gray-100 dark:border-[#2F2F2F] bg-white dark:bg-[#202020] flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(sug)}
                  className="text-[10px] px-2 py-1 rounded-full bg-[#F7F6F3] dark:bg-[#2A2A2A] hover:bg-blue-50 dark:hover:bg-blue-950/40 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 transition-colors text-left"
                >
                  {sug}
                </button>
              ))}
            </div>
          )}

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-gray-200 dark:border-[#333] bg-white dark:bg-[#202020] space-y-1.5"
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                maxLength={BOT_CONFIG.MAX_INPUT_CHARS}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Hỏi về quy trình, chức danh, layout..."
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-[#F7F6F3] dark:bg-[#2A2A2A] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-[#004B87]"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading || cooldownLeft > 0}
                className="p-2 rounded-xl bg-[#004B87] hover:bg-[#003A69] disabled:opacity-40 text-white transition-colors"
                title="Gửi câu hỏi"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between text-[10px] text-gray-400 px-1">
              <span>{input.length}/{BOT_CONFIG.MAX_INPUT_CHARS} ký tự</span>
              {cooldownLeft > 0 && <span>Đợi {cooldownLeft}s để hỏi tiếp</span>}
            </div>
          </form>
        </div>
      )}
    </>
  );
};
