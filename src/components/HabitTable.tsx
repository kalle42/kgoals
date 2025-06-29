import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus } from 'lucide-react';
import { HabitRow } from './HabitRow';
import { formatDate, getDayName } from '../utils/dateUtils';
import { useHabits } from '../hooks/useHabits';
import { useDateRange } from '../hooks/useDateRange';
import { WeekNavigation } from './WeekNavigation';

export function HabitTable() {
  const { habits, loading, error, addHabit, updateHabitCheck, reorderHabits, deleteHabit } = useHabits();
  const { dates, moveWeek } = useDateRange();
  const [newHabitName, setNewHabitName] = useState('');
  const [habitType, setHabitType] = useState<'positive' | 'negative'>('positive');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;
    
    addHabit(newHabitName, habitType);
    setNewHabitName('');
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(habits);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    reorderHabits(items);
  };

  const getColumnTotal = (date: Date) => {
    const dateStr = formatDate(date);
    return habits.reduce((total, habit) => {
      const checks = habit.checks[dateStr] || 0;
      return total + (habit.type === 'negative' ? -checks : checks);
    }, 0);
  };

  if (loading) {
    return <div className="p-6 text-center">Loading habits...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Habit Tracker</h2>
        <WeekNavigation 
          onPrevWeek={() => moveWeek('prev')}
          onNextWeek={() => moveWeek('next')}
        />
      </div>
      
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            placeholder="New habit name..."
            className="flex-1 p-2 border rounded bg-white"
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-800"
          >
            <Plus className="w-4 h-4" />
            Add Habit
          </button>
        </div>
        
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="habitType"
              value="positive"
              checked={habitType === 'positive'}
              onChange={(e) => setHabitType(e.target.value as 'positive')}
              className="text-black focus:ring-black"
            />
            <span>Positive Habit (track with checkmarks)</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="habitType"
              value="negative"
              checked={habitType === 'negative'}
              onChange={(e) => setHabitType(e.target.value as 'negative')}
              className="text-black focus:ring-black"
            />
            <span>Negative Habit (track with X marks, counts as -1)</span>
          </label>
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 text-left font-medium">Habit</th>
              {dates.map(date => (
                <th key={date.toISOString()} className="p-2 text-center">
                  <div className="font-medium">{getDayName(date)}</div>
                  <div className="text-xs text-gray-500">
                    {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </th>
              ))}
              <th className="w-12"></th>
            </tr>
          </thead>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="habits">
              {(provided) => (
                <tbody
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="divide-y divide-gray-100"
                >
                  {habits.map((habit, index) => (
                    <Draggable key={habit.id} draggableId={habit.id} index={index}>
                      {(provided) => (
                        <HabitRow
                          ref={provided.innerRef}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                          habit={habit}
                          dates={dates}
                          onCheckUpdate={updateHabitCheck}
                          onDelete={deleteHabit}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </DragDropContext>
          <tfoot>
            <tr className="border-t">
              <td className="p-2 font-medium">Total</td>
              {dates.map(date => {
                const total = getColumnTotal(date);
                return (
                  <td 
                    key={date.toISOString()} 
                    className={`p-2 text-center font-medium ${
                      total < 0 ? 'text-red-600' : total > 0 ? 'text-green-600' : ''
                    }`}
                  >
                    {total > 0 ? `+${total}` : total}
                  </td>
                );
              })}
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}