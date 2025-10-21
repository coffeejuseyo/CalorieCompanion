
import { GoogleGenAI, Type } from "@google/genai";
import { FoodItem, MealSuggestion } from "../types";

const API_KEY = process.env.API_KEY;
let ai = null;

if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        mealType: {
          type: Type.STRING,
          description: "The type of meal, e.g., 'Breakfast', 'Lunch', 'Dinner', or 'Snack'.",
          enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack']
        },
        name: {
          type: Type.STRING,
          description: "The name of the meal suggestion.",
        },
        description: {
          type: Type.STRING,
          description: "A brief, appealing description of the meal.",
        },
        calories: {
          type: Type.INTEGER,
          description: "The estimated calorie count for the meal.",
        },
      },
      required: ["mealType", "name", "description", "calories"],
    },
};


export const fetchMealSuggestions = async (
  consumedItems: FoodItem[],
  totalCalories: number
): Promise<MealSuggestion[]> => {

  const consumedList = consumedItems.length > 0
    ? consumedItems.map(item => `- ${item.name} (${item.calories} kcal)`).join('\n')
    : 'None yet.';

  const prompt = `
    You are an expert nutritionist and meal planner AI.
    A user is tracking their daily calorie intake and wants meal suggestions. Their daily goal is 2000 calories.

    Current Consumption:
    - Total calories consumed so far: ${totalCalories} kcal.
    - Food items consumed:
    ${consumedList}

    Task:
    Based on their consumption, suggest three healthy and balanced meal options to help them stay within their 2000 calorie goal.
    - Prioritize meals that would be appropriate for the remainder of the day (e.g., if they've had a big breakfast, suggest a lighter lunch and dinner).
    - Ensure variety in the meal types (e.g., one breakfast, one lunch, one dinner, or a mix that makes sense).
    - Provide an estimated calorie count for each suggestion.
    - Make the meal names and descriptions appealing and concise.

    Provide the response strictly in the specified JSON format.
  `;
  

  if (!ai) {

    throw new Error("API_KEY environment variable not set. Please set it in your .env.local file.");

  } else {

    try {
      const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
          config: {
              responseMimeType: "application/json",
              responseSchema: responseSchema,
          },
      });

      const jsonText = response.text.trim();
      const suggestions = JSON.parse(jsonText);
      
      // Basic validation to ensure the response is an array
      if (!Array.isArray(suggestions)) {
        console.error("Invalid response format from Gemini API.");
        throw new Error("Invalid response format from Gemini API.");
      }


      return suggestions as MealSuggestion[];

    } catch (error) {
      console.error("Error fetching suggestions from Gemini API:", error);
      throw new Error("Failed to parse or fetch suggestions from Gemini API.");
    }

  }
};
