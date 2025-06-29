/*
  # Create admin analytics tables

  1. New Tables
    - `page_views`
      - `id` (uuid, primary key)
      - `path` (text)
      - `user_id` (uuid, nullable)
      - `created_at` (timestamp)
    - `user_events`
      - `id` (uuid, primary key)
      - `user_id` (uuid)
      - `event_type` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for admin access
*/

CREATE TABLE IF NOT EXISTS page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL,
  user_id uuid REFERENCES auth.users,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  event_type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can read page views"
  ON page_views FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'karl@serpwin.com');

CREATE POLICY "Admin can read user events"
  ON user_events FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'karl@serpwin.com');