import { groq } from '@ai-sdk/groq';
import { streamText, tool, convertToModelMessages } from 'ai';
import { z } from 'zod';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: groq('llama-3.3-70b-versatile'),
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
        description: 'Navigate the page and mutate content in response to a user query',
        inputSchema: z.object({
          section: z.enum([
            'hero',
            'models',
            'features',
            'comparison',
            'pricing',
            'booking',
            'contact'
          ]).describe('The page section to scroll to'),
          mutation: z.object({
            type: z.enum([
              'filter_models',
              'compare_models',
              'prefill_booking',
              'highlight_model',
              'change_currency',
              'show_feature',
              'reset'
            ]),
            payload: z.record(z.string(), z.any()).describe('Mutation-specific data (e.g. filters, model IDs, form values, currency)')
          }),
          reply: z.string().describe('Natural-language reply to show in the chat panel')
        }),
      })
    },
  });

  return result.toUIMessageStreamResponse();
}
