// use server'

/**
 * @fileOverview Provides chatbot assistance for app-related queries.
 *
 * - chatbotAssistance - A function that provides chatbot assistance based on user queries.
 * - ChatbotAssistanceInput - The input type for the chatbotAssistance function.
 * - ChatbotAssistanceOutput - The return type for the chatbotAssistance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotAssistanceInputSchema = z.object({
  query: z.string().describe('The user query about the app.'),
});
export type ChatbotAssistanceInput = z.infer<typeof ChatbotAssistanceInputSchema>;

const ChatbotAssistanceOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user query.'),
});
export type ChatbotAssistanceOutput = z.infer<typeof ChatbotAssistanceOutputSchema>;

export async function chatbotAssistance(input: ChatbotAssistanceInput): Promise<ChatbotAssistanceOutput> {
  return chatbotAssistanceFlow(input);
}

const chatbotAssistancePrompt = ai.definePrompt({
  name: 'chatbotAssistancePrompt',
  input: {schema: ChatbotAssistanceInputSchema},
  output: {schema: ChatbotAssistanceOutputSchema},
  prompt: `You are a helpful chatbot assistant for the QuickBite Delight app.
  Your goal is to answer user questions about the app and its features.
  Use the following context to provide helpful and informative answers.

  App Description: QuickBite Delight is a food ordering app that allows users to browse food stalls,
  view menu items with images and prices, add items to a cart, place orders with various payment methods,
  track order status, manage favorite food items, and access a digital wallet.

  User Query: {{{query}}}

  Response:`, // Keep the response concise and helpful.
});

const chatbotAssistanceFlow = ai.defineFlow(
  {
    name: 'chatbotAssistanceFlow',
    inputSchema: ChatbotAssistanceInputSchema,
    outputSchema: ChatbotAssistanceOutputSchema,
  },
  async input => {
    const {output} = await chatbotAssistancePrompt(input);
    return output!;
  }
);
