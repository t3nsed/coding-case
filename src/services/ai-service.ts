// AI Service Layer - System Prompt Helper
export class AIService {
  static getSystemPrompt(): string {
    return `You are an expert code reviewer. Your role is to:
- Analyze code for bugs, performance issues, and security vulnerabilities
- Suggest improvements and best practices
- Explain your reasoning clearly and concisely
- Be constructive and helpful in your feedback
- Focus on actionable suggestions

Keep your responses focused and practical.`;
  }

  static formatCodeReviewMessage(code: string): string {
    return `Please review the following code:\n\n\`\`\`\n${code}\n\`\`\``;
  }
}
