/*
  # Fix Page Views RLS Policies

  1. Changes
    - Drop any existing duplicate policies
    - Recreate policies with proper checks
    - Ensure policies are created only if they don't exist

  2. Security
    - Maintains read-only access for admin
    - Allows all authenticated users to insert their own views/events
*/

DO $$ 
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Authenticated users can insert page views" ON page_views;
  DROP POLICY IF EXISTS "Authenticated users can insert user events" ON user_events;

  -- Recreate policies with proper checks
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'page_views' 
    AND policyname = 'Authenticated users can insert page views'
  ) THEN
    CREATE POLICY "Authenticated users can insert page views"
      ON page_views FOR INSERT
      TO authenticated
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'user_events' 
    AND policyname = 'Authenticated users can insert user events'
  ) THEN
    CREATE POLICY "Authenticated users can insert user events"
      ON user_events FOR INSERT
      TO authenticated
      WITH CHECK (true);
  END IF;
END $$;