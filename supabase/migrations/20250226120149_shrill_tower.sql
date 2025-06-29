/*
  # Fix Page Views and User Events RLS Policies

  1. Changes
    - Drop all existing policies to start fresh
    - Create proper RLS policies for both tables
    - Add separate policies for admin and regular users
    
  2. Security
    - Admin (karl@serpwin.com) can read all data
    - All authenticated users can insert their own data
    - No users can modify or delete data
*/

-- First, drop all existing policies
DROP POLICY IF EXISTS "Admin can read page views" ON page_views;
DROP POLICY IF EXISTS "Admin can read user events" ON user_events;
DROP POLICY IF EXISTS "Authenticated users can insert page views" ON page_views;
DROP POLICY IF EXISTS "Authenticated users can insert user events" ON user_events;

-- Page Views Policies
CREATE POLICY "Admin can read all page views"
  ON page_views FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'karl@serpwin.com');

CREATE POLICY "Users can insert page views"
  ON page_views FOR INSERT
  TO authenticated
  WITH CHECK (
    CASE 
      WHEN auth.uid() IS NOT NULL THEN
        COALESCE(user_id = auth.uid(), true)
      ELSE false
    END
  );

-- User Events Policies
CREATE POLICY "Admin can read all user events"
  ON user_events FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'karl@serpwin.com');

CREATE POLICY "Users can insert user events"
  ON user_events FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());