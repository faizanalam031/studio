'use server';
import { chatbotAssistance } from '@/ai/flows/chatbot-assistance';
import { z } from 'zod';

const chatSchema = z.object({
  query: z.string(),
});

export async function getChatbotResponse(input: { query: string }) {
  const validatedInput = chatSchema.safeParse(input);
  if (!validatedInput.success) {
    return { error: 'Invalid input' };
  }
  try {
    const result = await chatbotAssistance(validatedInput.data);
    return { response: result.response };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to get response from AI. Please try again.' };
  }
}
