interface ChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  disabled: boolean;
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  disabled,
}: ChatInputProps) {
  return (
    <div className="border-t border-gray-200 bg-white">
      <form onSubmit={onSubmit} className="max-w-3xl mx-auto px-4 py-4">
        <div className="relative flex items-end gap-2 bg-white border border-gray-300 rounded-2xl shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
          <textarea
            value={value}
            onChange={onChange}
            placeholder="Paste your code here for review..."
            className="flex-1 p-4 pr-12 bg-transparent resize-none focus:outline-none text-[15px] max-h-[200px] min-h-[60px]"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onSubmit(e as any);
              }
            }}
          />
          <button
            type="submit"
            disabled={disabled || !value.trim()}
            className="absolute right-2 bottom-2 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all hover:shadow-md disabled:hover:shadow-none transform hover:scale-105 disabled:hover:scale-100"
            aria-label="Send message"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500 text-center">
          Press Enter to send, Shift+Enter for new line
        </div>
      </form>
    </div>
  );
}
