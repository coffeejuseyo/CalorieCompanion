
import React from 'react';
import { FoodItem } from '../types';

interface FoodListProps {
  items: FoodItem[];
  onRemove: (id: string) => void;
}

const FoodList: React.FC<FoodListProps> = ({ items, onRemove }) => {
  if (items.length === 0) {
    return <p className="text-slate-500 text-center my-8">No food logged yet.</p>;
  }

  return (
    <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
      {items.map(item => (
        <div key={item.id} className="flex justify-between items-center bg-slate-100 p-3 rounded-lg">
          <div>
            <p className="font-semibold text-slate-800">{item.name}</p>
            <p className="text-sm text-slate-600">{item.calories} kcal</p>
          </div>
          <button 
            onClick={() => onRemove(item.id)}
            className="text-red-500 hover:text-red-700 font-semibold p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            aria-label={`Remove ${item.name}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default FoodList;
