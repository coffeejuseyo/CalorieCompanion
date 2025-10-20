
import React, { useState, useMemo } from 'react';
import { FoodItem, MealSuggestion } from './types';
import { fetchMealSuggestions } from './services/geminiService';
import Header from './components/Header';
import FoodForm from './components/FoodForm';
import FoodList from './components/FoodList';
import CalorieSummary from './components/CalorieSummary';
import SuggestionCard from './components/SuggestionCard';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [suggestions, setSuggestions] = useState<MealSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const totalCalories = useMemo(() => {
    return foodItems.reduce((total, item) => total + item.calories, 0);
  }, [foodItems]);

  const addFoodItem = (name: string, calories: number) => {
    const newItem: FoodItem = {
      id: new Date().toISOString(),
      name,
      calories,
    };
    setFoodItems(prevItems => [...prevItems, newItem]);
  };

  const removeFoodItem = (id: string) => {
    setFoodItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleGetSuggestions = async () => {
    setIsLoading(true);
    setError(null);
    setSuggestions([]);
    try {
      const result = await fetchMealSuggestions(foodItems, totalCalories);
      setSuggestions(result);
    } catch (err) {
      setError('Sorry, I couldn\'t fetch suggestions. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Calorie Tracker */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Today's Log</h2>
            <FoodForm onAddFood={addFoodItem} />
            <FoodList items={foodItems} onRemove={removeFoodItem} />
            <CalorieSummary totalCalories={totalCalories} />
          </div>

          {/* Right Column: AI Suggestions */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-slate-800">Meal Suggestions</h2>
                <button
                onClick={handleGetSuggestions}
                disabled={isLoading}
                className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors duration-300"
                >
                {isLoading ? 'Thinking...' : 'Get Suggestions'}
                </button>
            </div>
            
            <div className="space-y-4">
              {isLoading && (
                  <div className="flex justify-center items-center h-48">
                      <LoadingSpinner />
                  </div>
              )}
              {error && <p className="text-red-500 text-center">{error}</p>}
              {!isLoading && !error && suggestions.length === 0 && (
                <div className="text-center py-10 text-slate-500 bg-slate-100 rounded-lg">
                  <p>Log some food and click "Get Suggestions"</p>
                  <p className="text-sm">Our AI will provide balanced meal ideas for you!</p>
                </div>
              )}
              {suggestions.map((suggestion, index) => (
                <SuggestionCard key={index} suggestion={suggestion} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
