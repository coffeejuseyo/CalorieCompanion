
import React, { useState } from 'react';

interface FoodFormProps {
  onAddFood: (name: string, calories: number) => void;
}

const FoodForm: React.FC<FoodFormProps> = ({ onAddFood }) => {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const calorieValue = parseInt(calories, 10);
    if (name.trim() && !isNaN(calorieValue) && calorieValue > 0) {
      onAddFood(name, calorieValue);
      setName('');
      setCalories('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
      <div className="sm:col-span-2">
        <label htmlFor="food-name" className="block text-sm font-medium text-slate-700">Food Name</label>
        <input
          type="text"
          id="food-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Apple"
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="calories" className="block text-sm font-medium text-slate-700">Calories</label>
        <input
          type="number"
          id="calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          placeholder="e.g., 95"
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
       <button type="submit" className="sm:col-span-3 w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300">
        Add Food
      </button>
    </form>
  );
};

export default FoodForm;
