import { xai } from "@ai-sdk/xai";
import { streamText, convertToModelMessages } from "ai";
import { AIService } from "@/services/ai-service";

export async function POST(req: Request) {
  try {
    if (!process.env.XAI_API_KEY) {
      return new Response("Missing XAI_API_KEY environment variable", {
        status: 500,
      });
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response("Invalid messages format", { status: 400 });
    }

    // Convert UIMessages to ModelMessages
    const modelMessages = convertToModelMessages(messages);

    // Add system prompt for code review context
    const messagesWithSystem = [
      {
        role: "system" as const,
        content: AIService.getSystemPrompt(),
      },
      ...modelMessages,
    ];

    const result = streamText({
      model: xai("grok-3-fast"),
      messages: messagesWithSystem,
      temperature: 0.7,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error in chat API:", error);
    return new Response(
      JSON.stringify({
        error: "An error occurred while processing your request",
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
