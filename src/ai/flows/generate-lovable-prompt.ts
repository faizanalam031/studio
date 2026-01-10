'use server';

/**
 * @fileOverview Generates a friendly and engaging prompt for a lovable app introduction.
 *
 * - generateLovablePrompt - A function that generates the prompt.
 * - GenerateLovablePromptInput - The input type for the generateLovablePrompt function.
 * - GenerateLovablePromptOutput - The return type for the generateLovablePrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLovablePromptInputSchema = z.object({
  appName: z.string().describe('The name of the application.'),
});
export type GenerateLovablePromptInput = z.infer<typeof GenerateLovablePromptInputSchema>;

const GenerateLovablePromptOutputSchema = z.object({
  prompt: z.string().describe('A friendly and engaging prompt for the application.'),
});
export type GenerateLovablePromptOutput = z.infer<typeof GenerateLovablePromptOutputSchema>;

export async function generateLovablePrompt(input: GenerateLovablePromptInput): Promise<GenerateLovablePromptOutput> {
  return generateLovablePromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLovablePromptPrompt',
  input: {schema: GenerateLovablePromptInputSchema},
  output: {schema: GenerateLovablePromptOutputSchema},
  prompt: `You are an expert in creating friendly and engaging prompts for new applications.
  Your goal is to create a prompt for the application {{appName}} that sounds welcoming and encourages user engagement.
  The prompt should be concise, clear, and convey a sense of excitement about the application's features.
  Generate a prompt that is no more than 50 words.`,
});

const generateLovablePromptFlow = ai.defineFlow(
  {
    name: 'generateLovablePromptFlow',
    inputSchema: GenerateLovablePromptInputSchema,
    outputSchema: GenerateLovablePromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
