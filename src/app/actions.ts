'use server';

import { z } from 'zod';
import { aiTripRecommendations, type AiTripRecommendationsInput, type AiTripRecommendationsOutput } from '@/ai/flows/ai-trip-recommendations';

const tripSchema = z.object({
  preferences: z.string().min(10, "Please describe your preferences in a bit more detail."),
  budget: z.number().min(100, "Budget must be at least $100."),
  travelHistory: z.string().optional(),
});

export type FormState = {
  message: string;
  recommendations?: AiTripRecommendationsOutput['recommendations'];
  fields?: Record<string, string>;
  issues?: string[];
};

export async function getAITripRecommendations(
  prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = tripSchema.safeParse({
    ...formData,
    budget: Number(formData.budget),
  });

  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => issue.message);
    return {
      message: "Invalid form data.",
      issues,
    };
  }

  try {
    const input: AiTripRecommendationsInput = {
      preferences: parsed.data.preferences,
      budget: parsed.data.budget,
      travelHistory: parsed.data.travelHistory || 'None',
    };

    const result = await aiTripRecommendations(input);
    
    if (!result?.recommendations) {
      return { message: "Sorry, I couldn't generate recommendations at this time. Please try again." };
    }

    return { message: "success", recommendations: result.recommendations };
  } catch (e) {
    console.error(e);
    return { message: "An unexpected error occurred. Please try again later." };
  }
}
