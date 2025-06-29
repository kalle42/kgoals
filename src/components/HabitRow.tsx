import React, { forwardRef } from 'react';
import { GripVertical, Check, X } from 'lucide-react';
import type { Habit } from '../types';
import { DeleteHabitButton } from './DeleteHabitButton';

interface HabitRowProps {
  habit: Habit;
  dates: Date[];
  onCheckUpdate: (habitId: string, date: string, checks: number) => void;
  onDelete: (habitId: string) => Promise<void>;
  dragHandleProps?: any;
  draggableProps?: any;
}

export const HabitRow = forwardRef<HTMLTableRowElement, HabitRowProps>(
  ({ habit, dates, onCheckUpdate, onDelete, dragHandleProps, draggableProps }, ref) => {
    return (
      <tr ref={ref} {...draggableProps} className="bg-white hover:bg-gray-50">
        <td className="p-2 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <div {...dragHandleProps} className="cursor-grab">
              <GripVertical className="w-4 h-4 text-gray-400" />
            </div>
            <span className="flex items-center gap-2">
              {habit.name}
              <span className={`text-xs px-2 py-0.5 rounded ${
                habit.type === 'positive' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {habit.type === 'positive' ? 'Positive' : 'Negative'}
              </span>
            </span>
          </div>
        </td>
        {dates.map((date) => {
          const dateStr = date.toISOString().split('T')[0];
          const checks = habit.checks[dateStr] || 0;
          return (
            <td key={dateStr} className="p-2 text-center">
              <button
                onClick={() => onCheckUpdate(habit.id, dateStr, (checks + 1) % 4)}
                className="w-full h-8 rounded flex items-center justify-center gap-1 hover:bg-gray-100"
              >
                {[...Array(checks)].map((_, i) => (
                  habit.type === 'positive' ? (
                    <Check key={i} className="w-4 h-4 text-green-500" />
                  ) : (
                    <X key={i} className="w-4 h-4 text-red-500" />
                  )
                ))}
              </button>
            </td>
          );
        })}
        <td className="p-2 text-center">
          <DeleteHabitButton habitId={habit.id} onDelete={onDelete} />
        </td>
      </tr>
    );
  }
);