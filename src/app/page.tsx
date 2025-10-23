"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const chat = useChat({
    id: "code-review-chat",
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [userScrolled, setUserScrolled] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const isLoading = chat.status === "streaming";
  const messages = chat.messages;
  const error = chat.error;

  // Check if user has scrolled up manually
  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        messagesContainerRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isAtBottom);
      setUserScrolled(!isAtBottom);
    }
  };

  // Auto-scroll to bottom when new messages arrive (unless user scrolled up)
  useEffect(() => {
    if (!userScrolled) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, userScrolled]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setUserScrolled(false);
    chat.sendMessage({ text: inputValue });
    setInputValue("");

    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const scrollToBottom = () => {
    setUserScrolled(false);
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Helper to extract text content from message parts
  const getMessageText = (message: (typeof messages)[0]) => {
    return message.parts
      .filter((part) => part.type === "text")
      .map((part) => (part.type === "text" ? part.text : ""))
      .join("");
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <h1 className="text-lg font-normal text-gray-800">
            ChatGPT (Code Review)
          </h1>
        </div>
      </div>

      {/* Messages Container */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto chat-container relative"
      >
        <div className="max-w-3xl mx-auto px-4 py-6 pb-32">
          {messages.length === 0 ? null : (
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 animate-fade-in ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] ${
                      message.role === "user"
                        ? "bg-gray-100 text-black rounded-3xl px-5 py-3"
                        : "text-black"
                    }`}
                  >
                    <div className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
                      {getMessageText(message)}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 animate-fade-in">
                  <div className="text-black">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full typing-dot"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full typing-dot"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full typing-dot"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Scroll to bottom button */}
        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-full p-2 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            aria-label="Scroll to bottom"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="max-w-3xl mx-auto px-4 py-2">
          <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm border border-red-200 shadow-sm">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{error.message}</span>
            </div>
          </div>
        </div>
      )}

      {/* Input Form */}
      <div className="fixed bottom-0 left-0 right-0 bg-white">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-4 py-4">
          <div className="relative flex items-center gap-2 bg-white border border-gray-300 rounded-full shadow-sm focus-within:border-gray-400 transition-all px-1">
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Add attachment"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything"
              className="flex-1 py-3 px-2 bg-transparent resize-none focus:outline-none text-[15px] max-h-[200px] min-h-[24px]"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  handleSubmit(e as any);
                }
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="p-2 text-gray-500 hover:text-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
              aria-label="Send message"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
