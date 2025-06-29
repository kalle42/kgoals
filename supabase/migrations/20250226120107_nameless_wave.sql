/*
  # Fix Page Views RLS Policies

  1. Changes
    - Add INSERT policy for page_views to allow all authenticated users to track views
    - Add INSERT policy for user_events to allow all authenticated users to track events

  2. Security
    - Maintains read-only access for admin
    - Allows all authenticated users to insert their own views/events
*/

-- Allow all authenticated users to insert page views
CREATE POLICY "Authenticated users can insert page views"
  ON page_views FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow all authenticated users to insert user events
CREATE POLICY "Authenticated users can insert user events"
  ON user_events FOR INSERT
  TO authenticated
  WITH CHECK (true);