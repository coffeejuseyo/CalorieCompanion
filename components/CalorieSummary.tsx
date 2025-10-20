
import React from 'react';

interface CalorieSummaryProps {
  totalCalories: number;
}

const DAILY_GOAL = 2000;

const CalorieSummary: React.FC<CalorieSummaryProps> = ({ totalCalories }) => {
  const progressPercentage = Math.min((totalCalories / DAILY_GOAL) * 100, 100);

  return (
    <div className="mt-6 pt-6 border-t border-slate-200">
      <div className="flex justify-between items-baseline mb-2">
        <h3 className="text-lg font-bold text-slate-800">Total Calories</h3>
        <p className="text-2xl font-bold text-indigo-600">
          {totalCalories} <span className="text-base font-medium text-slate-500">/ {DAILY_GOAL} kcal</span>
        </p>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-4">
        <div
          className="bg-indigo-600 h-4 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default CalorieSummary;
