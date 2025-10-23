# Changelog

## [Unreleased]

### Added
- **ChatGPT-style polished UI** with professional design and attention to detail
- **Markdown rendering for AI responses** with syntax highlighting for code blocks
  - Support for headings (H1-H6), lists, bold, italics, and inline code
  - Syntax highlighting using `react-syntax-highlighter` with `atomOneDark` theme
  - Language support: JavaScript, TypeScript, Python, Java, C++, HTML, CSS, JSON, Bash
  - Dynamic re-rendering during text streaming
- Real-time streaming responses using Vercel AI SDK v5 (character-by-character display)
- **Avatar icons** for user (profile icon) and AI (lightbulb with gradient)
- **Smart scroll behavior** with manual scroll detection
- **Scroll-to-bottom floating button** that appears when user scrolls up
- **Animated typing indicator** with three pulsing dots
- **Message fade-in animations** for smooth entry
- **Keyboard shortcuts** (Enter to send, Shift+Enter for new line)
- Input validation to prevent empty message submissions
- Error state display with icons for API failures
- System prompt integration from AIService for code review context
- Environment variable validation in API route
- `.env.local.example` template file with xAI API key setup
- **Component-based architecture** with reusable components
- **Custom scrollbar styling** for chat container
- **TypeScript interfaces** for proper type safety

### Changed
- **Switched from OpenAI to xAI (Grok)** - Now using `@ai-sdk/xai` with `grok-3` model
- **Upgraded to AI SDK v5** - Using latest `streamText()` API with `toUIMessageStreamResponse()`
- Environment variable changed from `OPENAI_API_KEY` to `XAI_API_KEY`
- **MessageBubble component** now conditionally renders:
  - Plain text with whitespace preservation for user messages
  - Full markdown rendering for AI assistant responses
- **Replaced Geist font with Inter** for ChatGPT-style typography
- Refactored frontend to use `useChat` hook from `@ai-sdk/react`
- **Extracted components**: MessageBubble, TypingIndicator, MarkdownRenderer
- Updated app metadata (title and description)
- Simplified AI service layer to static helper class with system prompt
- **Improved color palette**: Blue user bubbles, gray AI bubbles with proper shadows
- Enhanced spacing and padding throughout UI
- **Send button now uses icon** (paper plane) instead of text
- Message bubbles with rounded-3xl corners and shadow effects

### Fixed
- **Critical:** Streaming responses now work correctly with xAI integration
- **Critical:** State management using proper `useChat` hook from AI SDK
- **Critical:** Markdown formatting now displays properly instead of plain text
- Missing dependencies for markdown rendering (`react-markdown`, `remark-gfm`)
- Syntax highlighter import issues by using Light version with registered languages
- Model deprecation issue (updated from `grok-beta` to `grok-3`)
- TypeScript type safety issues with message content extraction
- Component integration issue where MessageBubble wasn't being used in main page

### Technical
- **Dependencies Updated:**
  - Upgraded to `ai@5.0.77` (Vercel AI SDK v5)
  - Added `@ai-sdk/xai@2.0.27` and `@ai-sdk/react@2.0.77`
  - Added `react-markdown@10.1.0` and `remark-gfm@4.0.1`
  - Added `react-syntax-highlighter@16.0.0` with language support
  - Removed `openai` and `@ai-sdk/openai` packages
- **API Route Improvements:**
  - Uses `streamText()` with xAI Grok-3 model
  - Proper message format conversion with `convertToModelMessages()`
  - Returns `toUIMessageStreamResponse()` for frontend compatibility
  - Comprehensive error handling with detailed messages
- **Frontend Architecture:**
  - Uses `useChat` hook for automatic state management
  - Extracts text content from UIMessage parts array
  - Proper TypeScript typing throughout components
  - Dynamic markdown rendering that updates during streaming

### UI/UX Improvements
- **Rich text formatting** for AI responses with professional typography
- **Code syntax highlighting** with dark theme and proper spacing
- Smooth scroll animations with proper easing
- Hover states with scale transforms on interactive elements
- Focus states with blue ring and smooth transitions
- Better visual hierarchy with proper font weights and sizes
- Maximum message width (75%) for better readability
- Professional error messages with icons
- Helpful hint text for keyboard shortcuts
- **Streaming-aware markdown rendering** that formats content as it arrives

### Developer Experience
- Clean separation between user message (plain text) and AI response (markdown) rendering
- Modular component structure for easy maintenance
- Comprehensive error handling and logging
- Type-safe message handling with proper interfaces
- Easy environment setup with `.env.local.example`
