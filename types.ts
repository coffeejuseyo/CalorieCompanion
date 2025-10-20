
export interface FoodItem {
  id: string;
  name: string;
  calories: number;
}

export interface MealSuggestion {
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  name: string;
  description: string;
  calories: number;
}
