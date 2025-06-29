/*
  # Add habit type column

  1. Changes
    - Add `type` column to `habits` table with default value 'positive'
    - Update existing rows to have type='positive'
  
  2. Notes
    - Uses safe migration pattern with IF NOT EXISTS check
    - Sets default for new rows
    - Updates existing rows
*/

DO $$ 
BEGIN
  -- Add type column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'habits' AND column_name = 'type'
  ) THEN
    -- Add the column with a default value
    ALTER TABLE habits 
    ADD COLUMN type text NOT NULL DEFAULT 'positive' 
    CHECK (type IN ('positive', 'negative'));

    -- Update existing rows to have type='positive'
    UPDATE habits SET type = 'positive' WHERE type IS NULL;
  END IF;
END $$;