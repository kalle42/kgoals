import { useState } from 'react';

export function useDateRange() {
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 6);
    return date;
  });

  const getDates = (): Date[] => {
    const dates: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const moveWeek = (direction: 'prev' | 'next') => {
    setStartDate(current => {
      const newDate = new Date(current);
      newDate.setDate(current.getDate() + (direction === 'next' ? 7 : -7));
      return newDate;
    });
  };

  return {
    dates: getDates(),
    moveWeek,
  };
}