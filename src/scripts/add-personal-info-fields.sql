-- Add personal information fields to profiles table
-- Run this script in your Supabase SQL Editor

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS first_name TEXT,
ADD COLUMN IF NOT EXISTS last_name TEXT,
ADD COLUMN IF NOT EXISTS mobile_number TEXT,
ADD COLUMN IF NOT EXISTS date_of_birth DATE;

-- Create index for mobile number lookups (if needed)
CREATE INDEX IF NOT EXISTS profiles_mobile_number_idx ON profiles(mobile_number) WHERE mobile_number IS NOT NULL;

-- Update existing full_name to split into first_name and last_name if possible
-- This is a one-time migration for existing users
UPDATE profiles
SET 
  first_name = SPLIT_PART(full_name, ' ', 1),
  last_name = CASE 
    WHEN POSITION(' ' IN full_name) > 0 THEN 
      SUBSTRING(full_name FROM POSITION(' ' IN full_name) + 1)
    ELSE NULL
  END
WHERE full_name IS NOT NULL 
  AND first_name IS NULL 
  AND last_name IS NULL;

