import { MarkdownRenderer } from "./MarkdownRenderer";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === "user";

  if (isUser) {
    // User messages: gray bubble style
    return (
      <div className="flex justify-end animate-fade-in">
        <div className="max-w-[75%] bg-gray-100 text-gray-900 rounded-3xl px-5 py-3 shadow-sm">
          <div className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
            {content}
          </div>
        </div>
      </div>
    );
  }

  // AI messages: plain black text with markdown rendering
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="max-w-[90%]">
        <div className="text-[15px] leading-relaxed break-words text-gray-900">
          <MarkdownRenderer content={content} />
        </div>
      </div>
    </div>
  );
}
