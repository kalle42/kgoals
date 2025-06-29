/*
  # Create habits schema

  1. New Tables
    - `habits`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `position` (integer)
      - `created_at` (timestamp)
    - `habit_checks`
      - `id` (uuid, primary key)
      - `habit_id` (uuid, references habits)
      - `date` (date)
      - `checks` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
*/

-- Create habits table
CREATE TABLE habits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  position integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create habit_checks table
CREATE TABLE habit_checks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  habit_id uuid REFERENCES habits ON DELETE CASCADE NOT NULL,
  date date NOT NULL,
  checks integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(habit_id, date)
);

-- Enable RLS
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE habit_checks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own habits"
  ON habits
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage checks for their habits"
  ON habit_checks
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM habits 
      WHERE habits.id = habit_checks.habit_id 
      AND habits.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM habits 
      WHERE habits.id = habit_checks.habit_id 
      AND habits.user_id = auth.uid()
    )
  );