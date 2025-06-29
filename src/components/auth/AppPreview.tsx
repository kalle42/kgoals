import React from 'react';
import { ChevronLeft, ChevronRight, GripVertical, X } from 'lucide-react';

export function AppPreview() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Habit Tracker</h2>
        <div className="flex gap-1">
          <button className="p-2 hover:bg-gray-100 rounded-md" aria-label="Previous week">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-md" aria-label="Next week">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="New habit name..."
          className="flex-1 px-4 py-2 border rounded-md bg-white"
          disabled
        />
        <button
          className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2"
          disabled
        >
          <span>+</span> Add Habit
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="p-4 font-medium">Habit</th>
              {[
                { day: 'Sun', date: 'Dec 29' },
                { day: 'Mon', date: 'Dec 30' },
                { day: 'Tue', date: 'Dec 31' },
                { day: 'Wed', date: 'Jan 1' },
                { day: 'Thu', date: 'Jan 2' },
                { day: 'Fri', date: 'Jan 3' },
                { day: 'Sat', date: 'Jan 4' }
              ].map(({ day, date }) => (
                <th key={day} className="p-4 text-center font-medium">
                  <div>{day}</div>
                  <div className="text-xs text-gray-500">{date}</div>
                </th>
              ))}
              <th className="w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { name: 'Habit', checks: [2,0,0,0,2,0,1] },
              { name: 'habit2', checks: [0,2,2,0,2,0,3] },
              { name: 'habit3', checks: [2,0,0,0,0,0,1] }
            ].map((habit, index) => (
              <tr key={index} className="group hover:bg-gray-50">
                <td className="p-4 flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-gray-400" />
                  {habit.name}
                </td>
                {habit.checks.map((count, i) => (
                  <td key={i} className="p-4 text-center">
                    <div className="flex justify-center gap-0.5">
                      {Array(count).fill('✓').map((_, j) => (
                        <span key={j} className="text-green-500">✓</span>
                      ))}
                    </div>
                  </td>
                ))}
                <td className="p-4 text-center">
                  <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500">
                    <X className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="p-4 font-medium">Total</td>
              {[4,2,2,0,4,0,5].map((total, i) => (
                <td key={i} className="p-4 text-center font-medium">{total}</td>
              ))}
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}