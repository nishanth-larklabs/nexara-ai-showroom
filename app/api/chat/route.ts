import { groq } from "@ai-sdk/groq";
import { streamText, tool, convertToModelMessages } from "ai";
import { z } from "zod";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const sanitizedMessages = messages.map((msg: any) => {
    if (msg.role === "assistant" && msg.parts) {
      const toolPart = msg.parts.find(
        (p: any) =>
          p.type === "tool-navigate_and_mutate" ||
          p.type === "tool-call" ||
          p.type === "tool-invocation",
      );

      if (toolPart) {
        const payload = toolPart.args || toolPart.input;
        return {
          ...msg,
          parts: [
            { type: "text", text: payload?.reply || "Request processed." },
          ],
        };
      }
    }
    return msg;
  });

  const modelMessages = await convertToModelMessages(sanitizedMessages);

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    messages: modelMessages,
    system: `You are the AI navigation assistant for NEXARA Motors, a premium electric vehicle dealership.
Your job is to understand the user's intent and ALWAYS trigger the 'navigate_and_mutate' tool to scroll the page, change content appropriately, and provide a short, natural language reply.
You must handle at least the following intents:
- Finding cars within budget or by type (filter_models, section: models)
- Comparing two specific cars (compare_models, section: comparison)
- Test drive booking (prefill_booking, section: booking)
- Asking for a recommendation (highlight_model, section: models)
- Showing prices in a different currency (change_currency, section: pricing)
- Showing specific features like safety, tech (show_feature, section: features)

Never return a raw text response to the user. You MUST always call the navigate_and_mutate tool.`,
    tools: {
      navigate_and_mutate: tool({
        description:
          "Navigate the page and mutate content in response to a user query",
        inputSchema: z.object({
          section: z.enum([
            "hero",
            "models",
            "features",
            "comparison",
            "pricing",
            "booking",
            "contact",
          ]),
          reply: z
            .string()
            .describe("Natural-language reply to show in the chat panel"),
          mutation: z.discriminatedUnion("type", [
            z.object({
              type: z.literal("filter_models"),
              payload: z.object({
                types: z.array(z.string()).optional(),
                maxPrice: z.number().optional(),
                minPrice: z.number().optional(),
                fuelTypes: z.array(z.string()).optional(),
                minSeating: z.number().optional(),
              }),
            }),
            z.object({
              type: z.literal("compare_models"),
              payload: z.object({ modelIds: z.array(z.string()) }),
            }),
            z.object({
              type: z.literal("prefill_booking"),
              payload: z.object({
                modelId: z.string().optional(),
                city: z.string().optional(),
                date: z.string().optional(),
                name: z.string().optional(),
                phone: z.string().optional(),
                email: z.string().optional(),
              }),
            }),
            z.object({
              type: z.literal("highlight_model"),
              payload: z.object({
                modelId: z.string(),
                reason: z.string().optional(),
              }),
            }),
            z.object({
              type: z.literal("change_currency"),
              payload: z.object({
                currency: z.enum(["INR", "USD", "EUR", "GBP"]),
              }),
            }),
            z.object({
              type: z.literal("show_feature"),
              payload: z.object({ featureId: z.string() }),
            }),
            z.object({
              type: z.literal("reset"),
              payload: z.any().optional(),
            }),
          ]),
        }),
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
