/*
  # Fix Page Views RLS for Anonymous Access

  1. Changes
    - Drop existing policies to avoid conflicts
    - Create new policies that properly handle both authenticated and anonymous users
    - Add explicit policies for anonymous access
    
  2. Security
    - Admin (karl@serpwin.com) can read all data
    - Authenticated users can insert with their user_id
    - Anonymous users can insert with null user_id
    - No modification of existing data allowed
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Admin can read all page views" ON page_views;
DROP POLICY IF EXISTS "Users can insert page views" ON page_views;

-- Enable security by default
ALTER TABLE page_views FORCE ROW LEVEL SECURITY;

-- Admin read policy
CREATE POLICY "Admin can read all page views"
  ON page_views FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'karl@serpwin.com');

-- Authenticated users insert policy
CREATE POLICY "Authenticated users can insert page views"
  ON page_views FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Anonymous users insert policy
CREATE POLICY "Anonymous users can insert page views"
  ON page_views FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

-- Update the page_views table to make user_id optional
ALTER TABLE page_views ALTER COLUMN user_id DROP NOT NULL;