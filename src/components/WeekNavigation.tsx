import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface WeekNavigationProps {
  onPrevWeek: () => void;
  onNextWeek: () => void;
}

export function WeekNavigation({ onPrevWeek, onNextWeek }: WeekNavigationProps) {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={onPrevWeek}
        className="p-1 hover:bg-gray-100 rounded"
        aria-label="Previous week"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={onNextWeek}
        className="p-1 hover:bg-gray-100 rounded"
        aria-label="Next week"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}