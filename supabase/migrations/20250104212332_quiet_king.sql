/*
  # Fix RLS policies for habits and habit checks

  1. Changes
    - Update RLS policies to properly handle all operations
    - Add missing user_id checks
    - Fix policy definitions for better security

  2. Security
    - Ensure users can only access their own habits
    - Protect habit checks through habit ownership
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can manage their own habits" ON habits;
DROP POLICY IF EXISTS "Users can manage checks for their habits" ON habit_checks;

-- Create new policies for habits table
CREATE POLICY "Users can read their own habits"
  ON habits FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own habits"
  ON habits FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own habits"
  ON habits FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own habits"
  ON habits FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create new policies for habit_checks table
CREATE POLICY "Users can read checks for their habits"
  ON habit_checks FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM habits 
      WHERE habits.id = habit_checks.habit_id 
      AND habits.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert checks for their habits"
  ON habit_checks FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM habits 
      WHERE habits.id = habit_checks.habit_id 
      AND habits.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update checks for their habits"
  ON habit_checks FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM habits 
      WHERE habits.id = habit_checks.habit_id 
      AND habits.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete checks for their habits"
  ON habit_checks FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM habits 
      WHERE habits.id = habit_checks.habit_id 
      AND habits.user_id = auth.uid()
    )
  );