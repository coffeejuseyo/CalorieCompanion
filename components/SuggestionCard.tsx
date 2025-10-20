
import React from 'react';
import { MealSuggestion } from '../types';

interface SuggestionCardProps {
  suggestion: MealSuggestion;
}

const MealTypeIcon: React.FC<{ mealType: MealSuggestion['mealType'] }> = ({ mealType }) => {
    let emoji = '🍽️';
    if (mealType === 'Breakfast') emoji = '🥞';
    if (mealType === 'Lunch') emoji = '🥗';
    if (mealType === 'Dinner') emoji = '🍲';
    if (mealType === 'Snack') emoji = '🍎';

    return <span className="text-2xl mr-3">{emoji}</span>
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ suggestion }) => {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start">
        <div>
           <div className="flex items-center">
                <MealTypeIcon mealType={suggestion.mealType} />
                <div>
                    <p className="font-bold text-indigo-700">{suggestion.mealType}</p>
                    <h4 className="text-lg font-semibold text-slate-800">{suggestion.name}</h4>
                </div>
           </div>
          <p className="mt-2 text-sm text-slate-600">{suggestion.description}</p>
        </div>
        <div className="ml-4 text-right flex-shrink-0">
          <p className="text-lg font-bold text-indigo-600">{suggestion.calories}</p>
          <p className="text-xs text-slate-500">kcal</p>
        </div>
      </div>
    </div>
  );
};

export default SuggestionCard;
