'use server';

/**
 * @fileOverview An AI-powered trip recommendation agent.
 *
 * - aiTripRecommendations - A function that provides personalized trip recommendations.
 * - AiTripRecommendationsInput - The input type for the aiTripRecommendations function.
 * - AiTripRecommendationsOutput - The return type for the aiTripRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiTripRecommendationsInputSchema = z.object({
  preferences: z
    .string()
    .describe('The user preferences for the trip, such as interests and activities.'),
  budget: z.number().describe('The budget for the trip in USD.'),
  travelHistory: z
    .string()
    .describe(
      'The user travel history, including previously visited destinations and trip types.'
    ),
});
export type AiTripRecommendationsInput = z.infer<
  typeof AiTripRecommendationsInputSchema
>;

const AiTripRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'A list of personalized trip recommendations based on the user preferences, budget, and travel history.'
    ),
});
export type AiTripRecommendationsOutput = z.infer<
  typeof AiTripRecommendationsOutputSchema
>;

export async function aiTripRecommendations(
  input: AiTripRecommendationsInput
): Promise<AiTripRecommendationsOutput> {
  return aiTripRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiTripRecommendationsPrompt',
  input: {schema: AiTripRecommendationsInputSchema},
  output: {schema: AiTripRecommendationsOutputSchema},
  prompt: `You are a trip recommendation expert. Given the user preferences, budget, and travel history, provide personalized trip recommendations.

User Preferences: {{{preferences}}}
Budget: {{{budget}}} USD
Travel History: {{{travelHistory}}}

Provide a list of personalized trip recommendations that suit the user needs. Consider destinations, activities, and available travel packages. Be concise. If the user provides information that is irrelevant or contradictory, ignore it.
`,
});

const aiTripRecommendationsFlow = ai.defineFlow(
  {
    name: 'aiTripRecommendationsFlow',
    inputSchema: AiTripRecommendationsInputSchema,
    outputSchema: AiTripRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
