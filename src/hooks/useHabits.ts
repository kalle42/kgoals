import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { Habit } from '../types';

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchHabits();
    }
  }, [user]);

  async function fetchHabits() {
    try {
      const { data: habitsData, error: habitsError } = await supabase
        .from('habits')
        .select(`
          id,
          name,
          position,
          type,
          habit_checks (
            date,
            checks
          )
        `)
        .order('position');

      if (habitsError) throw habitsError;

      const formattedHabits: Habit[] = habitsData.map(habit => ({
        id: habit.id,
        name: habit.name,
        type: habit.type || 'positive',
        checks: habit.habit_checks.reduce((acc: Record<string, number>, check: any) => {
          acc[check.date] = check.checks;
          return acc;
        }, {})
      }));

      setHabits(formattedHabits);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  async function addHabit(name: string, type: 'positive' | 'negative' = 'positive') {
    if (!user) return;

    try {
      const position = habits.length;
      const { data, error } = await supabase
        .from('habits')
        .insert({ name, position, type, user_id: user.id })
        .select()
        .single();

      if (error) throw error;

      setHabits([...habits, { id: data.id, name: data.name, type: data.type, checks: {} }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  }

  async function deleteHabit(habitId: string) {
    try {
      const { error } = await supabase
        .from('habits')
        .delete()
        .eq('id', habitId);

      if (error) throw error;

      setHabits(habits.filter(habit => habit.id !== habitId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  }

  async function updateHabitCheck(habitId: string, date: string, checks: number) {
    try {
      setHabits(habits.map(habit =>
        habit.id === habitId
          ? { ...habit, checks: { ...habit.checks, [date]: checks } }
          : habit
      ));

      const { error } = await supabase
        .from('habit_checks')
        .upsert(
          { habit_id: habitId, date, checks },
          { onConflict: 'habit_id,date' }
        );

      if (error) {
        await fetchHabits();
        throw error;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  }

  async function reorderHabits(newHabits: Habit[]) {
    if (!user) return;

    try {
      setHabits(newHabits);

      const updates = newHabits.map((habit, index) => ({
        id: habit.id,
        name: habit.name,
        type: habit.type,
        position: index,
        user_id: user.id
      }));

      const { error } = await supabase
        .from('habits')
        .upsert(updates, {
          onConflict: 'id'
        });

      if (error) {
        await fetchHabits();
        throw error;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  }

  return {
    habits,
    loading,
    error,
    addHabit,
    deleteHabit,
    updateHabitCheck,
    reorderHabits,
  };
}