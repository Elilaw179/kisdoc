'use server';

/**
 * @fileOverview Provides personalized food recommendations based on user dietary needs and health goals.
 *
 * - `getPersonalizedFoodRecommendations` - A function that generates personalized food recommendations.
 * - `PersonalizedFoodRecommendationsInput` - The input type for the `getPersonalizedFoodRecommendations` function.
 * - `PersonalizedFoodRecommendationsOutput` - The return type for the `getPersonalizedFoodRecommendations` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedFoodRecommendationsInputSchema = z.object({
  dietaryNeeds: z
    .string()
    .describe(
      'Specific dietary needs or restrictions, e.g., vegetarian, vegan, gluten-free, dairy-free.'
    ),
  healthGoals: z
    .string()
    .describe(
      'Health goals, e.g., weight loss, muscle gain, improved energy levels.'
    ),
  foodPreferences: z
    .string()
    .describe('Food preferences, e.g., likes, dislikes, allergies.'),
});
export type PersonalizedFoodRecommendationsInput = z.infer<
  typeof PersonalizedFoodRecommendationsInputSchema
>;

const PersonalizedFoodRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'A list of personalized food recommendations based on the provided dietary needs, health goals, and food preferences.'
    ),
  reasoning: z
    .string()
    .describe(
      'Explanation of why the food recommendations are suitable for the user.'
    ),
});
export type PersonalizedFoodRecommendationsOutput = z.infer<
  typeof PersonalizedFoodRecommendationsOutputSchema
>;

export async function getPersonalizedFoodRecommendations(
  input: PersonalizedFoodRecommendationsInput
): Promise<PersonalizedFoodRecommendationsOutput> {
  return personalizedFoodRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedFoodRecommendationsPrompt',
  input: {schema: PersonalizedFoodRecommendationsInputSchema},
  output: {schema: PersonalizedFoodRecommendationsOutputSchema},
  prompt: `You are a nutritionist providing personalized food recommendations.

  Based on the user's dietary needs, health goals, and food preferences, provide a list of food recommendations and explain why they are suitable.

  Dietary Needs: {{{dietaryNeeds}}}
  Health Goals: {{{healthGoals}}}
  Food Preferences: {{{foodPreferences}}}

  Provide the recommendations in a concise and easy-to-understand format.
  Include a reasoning section to explain why the recommendations are appropriate.`,
});

const personalizedFoodRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedFoodRecommendationsFlow',
    inputSchema: PersonalizedFoodRecommendationsInputSchema,
    outputSchema: PersonalizedFoodRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
