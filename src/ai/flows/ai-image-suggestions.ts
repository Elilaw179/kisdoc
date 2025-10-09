'use server';

/**
 * @fileOverview An AI agent to suggest images for food content.
 *
 * - suggestImages - A function that suggests relevant images for given food content.
 * - SuggestImagesInput - The input type for the suggestImages function.
 * - SuggestImagesOutput - The return type for the suggestImages function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestImagesInputSchema = z.object({
  foodContent: z
    .string()
    .describe('The textual content describing a food or food category.'),
  numSuggestions: z
    .number()
    .min(1)
    .max(5)
    .default(3)
    .describe('The number of image suggestions to generate.'),
});

export type SuggestImagesInput = z.infer<typeof SuggestImagesInputSchema>;

const SuggestImagesOutputSchema = z.object({
  imageSuggestions: z
    .array(z.string())
    .describe('An array of image suggestions based on the food content.'),
});

export type SuggestImagesOutput = z.infer<typeof SuggestImagesOutputSchema>;

export async function suggestImages(input: SuggestImagesInput): Promise<SuggestImagesOutput> {
  return suggestImagesFlow(input);
}

const suggestImagesPrompt = ai.definePrompt({
  name: 'suggestImagesPrompt',
  input: {schema: SuggestImagesInputSchema},
  output: {schema: SuggestImagesOutputSchema},
  prompt: `You are an AI assistant specialized in suggesting images for food-related content.

  Based on the provided food content, suggest {{numSuggestions}} relevant images that would visually represent the content.
  Return the image suggestions as a list of descriptive keywords that can be used to find images.

  Food Content: {{{foodContent}}}

  Image Suggestions:`,
});

const suggestImagesFlow = ai.defineFlow(
  {
    name: 'suggestImagesFlow',
    inputSchema: SuggestImagesInputSchema,
    outputSchema: SuggestImagesOutputSchema,
  },
  async input => {
    const {output} = await suggestImagesPrompt(input);
    return output!;
  }
);
