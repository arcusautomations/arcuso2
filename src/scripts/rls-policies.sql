-- Arcus Automations Row Level Security Policies
-- Run this script AFTER migrate.sql in your Supabase SQL Editor

-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_resource_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_purchases ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PROFILES POLICIES
-- Users can only view and update their own profile
-- ============================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Allow users to view their own profile
CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ============================================
-- PROJECTS POLICIES
-- Users can only CRUD their own projects
-- ============================================

DROP POLICY IF EXISTS "Users can view own projects" ON projects;
DROP POLICY IF EXISTS "Users can create own projects" ON projects;
DROP POLICY IF EXISTS "Users can update own projects" ON projects;
DROP POLICY IF EXISTS "Users can delete own projects" ON projects;

-- Allow users to view their own projects
CREATE POLICY "Users can view own projects"
  ON projects
  FOR SELECT
  USING (auth.uid() = user_id);

-- Allow users to create their own projects
CREATE POLICY "Users can create own projects"
  ON projects
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own projects
CREATE POLICY "Users can update own projects"
  ON projects
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own projects
CREATE POLICY "Users can delete own projects"
  ON projects
  FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- RESOURCES POLICIES
-- Published resources are viewable by all authenticated users
-- Only admins can modify resources (handled via service role)
-- ============================================

DROP POLICY IF EXISTS "Anyone can view published resources" ON resources;

-- Allow authenticated users to view published resources
CREATE POLICY "Anyone can view published resources"
  ON resources
  FOR SELECT
  USING (is_published = true);

-- ============================================
-- USER RESOURCE PROGRESS POLICIES
-- Users can only CRUD their own progress
-- ============================================

DROP POLICY IF EXISTS "Users can view own progress" ON user_resource_progress;
DROP POLICY IF EXISTS "Users can create own progress" ON user_resource_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON user_resource_progress;
DROP POLICY IF EXISTS "Users can delete own progress" ON user_resource_progress;

-- Allow users to view their own progress
CREATE POLICY "Users can view own progress"
  ON user_resource_progress
  FOR SELECT
  USING (auth.uid() = user_id);

-- Allow users to create their own progress records
CREATE POLICY "Users can create own progress"
  ON user_resource_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own progress
CREATE POLICY "Users can update own progress"
  ON user_resource_progress
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own progress
CREATE POLICY "Users can delete own progress"
  ON user_resource_progress
  FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- USER PURCHASES POLICIES
-- Users can only view their own purchases
-- Purchases are created via server-side (service role)
-- ============================================

DROP POLICY IF EXISTS "Users can view own purchases" ON user_purchases;

-- Allow users to view their own purchases
CREATE POLICY "Users can view own purchases"
  ON user_purchases
  FOR SELECT
  USING (auth.uid() = user_id);

-- ============================================
-- STORAGE POLICIES (if using Supabase Storage)
-- ============================================

-- Create storage bucket for avatars if it doesn't exist
-- Note: Run this separately or via Supabase dashboard
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('avatars', 'avatars', true)
-- ON CONFLICT (id) DO NOTHING;

-- Allow users to upload their own avatar
-- CREATE POLICY "Users can upload own avatar"
--   ON storage.objects
--   FOR INSERT
--   WITH CHECK (
--     bucket_id = 'avatars' AND
--     auth.uid()::text = (storage.foldername(name))[1]
--   );

-- Allow users to update their own avatar
-- CREATE POLICY "Users can update own avatar"
--   ON storage.objects
--   FOR UPDATE
--   USING (
--     bucket_id = 'avatars' AND
--     auth.uid()::text = (storage.foldername(name))[1]
--   );

-- Allow anyone to view avatars (public bucket)
-- CREATE POLICY "Anyone can view avatars"
--   ON storage.objects
--   FOR SELECT
--   USING (bucket_id = 'avatars');


