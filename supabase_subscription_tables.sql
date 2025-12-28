-- =====================================================
-- Nappin App Subscription Tables
-- =====================================================
-- Run this SQL in Supabase SQL Editor
-- This creates subscription management tables for the app
-- =====================================================

-- =====================================================
-- 1. subscription_products table
-- Stores all subscription product offerings
-- =====================================================
CREATE TABLE IF NOT EXISTS public.subscription_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sku text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  plan_type text NOT NULL CHECK (plan_type IN ('advanced', 'precision')),
  device_type text NOT NULL CHECK (device_type IN ('apple_watch', 'non_watch')),
  billing_interval text NOT NULL CHECK (billing_interval IN ('month', 'year')),
  price_cents integer NOT NULL,
  currency text NOT NULL DEFAULT 'USD',
  trial_days integer NOT NULL DEFAULT 0,
  app_store_product_id text NOT NULL UNIQUE,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Index on sku for fast lookups
CREATE INDEX IF NOT EXISTS idx_subscription_products_sku 
ON public.subscription_products(sku);

-- Index on plan_type and device_type for filtering
CREATE INDEX IF NOT EXISTS idx_subscription_products_plan_device 
ON public.subscription_products(plan_type, device_type);

-- Index on is_active for filtering active products
CREATE INDEX IF NOT EXISTS idx_subscription_products_is_active 
ON public.subscription_products(is_active);

-- =====================================================
-- 2. user_subscriptions table
-- Tracks user subscription status and billing periods
-- =====================================================
CREATE TABLE IF NOT EXISTS public.user_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES public.subscription_products(id) ON DELETE RESTRICT,
  status text NOT NULL CHECK (status IN ('trialing', 'active', 'expired', 'canceled', 'refunded')),
  plan_type text NOT NULL,
  device_type text NOT NULL,
  billing_interval text NOT NULL,
  trial_start_at timestamptz,
  trial_end_at timestamptz,
  current_period_start_at timestamptz,
  current_period_end_at timestamptz,
  canceled_at timestamptz,
  expired_at timestamptz,
  platform text NOT NULL DEFAULT 'app_store',
  platform_transaction_id text,
  original_transaction_id text,
  latest_receipt text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Index on user_id for fast user lookup
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id 
ON public.user_subscriptions(user_id);

-- Index on status for filtering by subscription status
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_status 
ON public.user_subscriptions(status);

-- Index on user_id and status for common queries
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_status 
ON public.user_subscriptions(user_id, status);

-- Index on current_period_end_at for finding expiring subscriptions
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_period_end 
ON public.user_subscriptions(current_period_end_at);

-- =====================================================
-- 3. subscription_events table
-- Audit log of all subscription-related events
-- =====================================================
CREATE TABLE IF NOT EXISTS public.subscription_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_subscription_id uuid REFERENCES public.user_subscriptions(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type text NOT NULL,
  payload jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Index on user_id and created_at for event history queries
CREATE INDEX IF NOT EXISTS idx_subscription_events_user_created 
ON public.subscription_events(user_id, created_at DESC);

-- Index on user_subscription_id for subscription-specific events
CREATE INDEX IF NOT EXISTS idx_subscription_events_subscription_id 
ON public.subscription_events(user_subscription_id);

-- Index on event_type for filtering by event type
CREATE INDEX IF NOT EXISTS idx_subscription_events_event_type 
ON public.subscription_events(event_type);

-- =====================================================
-- 4. Add sleep_device_type column to profiles table
-- =====================================================
DO $$
BEGIN
  -- Check if profiles table exists before adding column
  IF EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles'
  ) THEN
    ALTER TABLE public.profiles
    ADD COLUMN IF NOT EXISTS sleep_device_type text
    CHECK (sleep_device_type IN ('apple_watch', 'fitbit', 'oura', 'garmin', 'other'));
  END IF;
END $$;

-- =====================================================
-- 5. Enable Row Level Security (RLS) on tables
-- =====================================================

-- Enable RLS on subscription_products (read-only for authenticated users)
ALTER TABLE public.subscription_products ENABLE ROW LEVEL SECURITY;

-- Policy: Authenticated users can read active subscription products
CREATE POLICY IF NOT EXISTS "Authenticated users can view active products"
ON public.subscription_products
FOR SELECT
TO authenticated
USING (is_active = true);

-- Enable RLS on user_subscriptions (users can only see their own)
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view their own subscriptions
CREATE POLICY IF NOT EXISTS "Users can view own subscriptions"
ON public.user_subscriptions
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Policy: Service role can manage all subscriptions (for backend operations)
CREATE POLICY IF NOT EXISTS "Service role can manage all subscriptions"
ON public.user_subscriptions
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Enable RLS on subscription_events (users can only see their own events)
ALTER TABLE public.subscription_events ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view their own subscription events
CREATE POLICY IF NOT EXISTS "Users can view own subscription events"
ON public.subscription_events
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Policy: Service role can manage all events (for backend operations)
CREATE POLICY IF NOT EXISTS "Service role can manage all events"
ON public.subscription_events
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- =====================================================
-- 6. Create function to automatically update updated_at timestamp
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for subscription_products
DROP TRIGGER IF EXISTS update_subscription_products_updated_at ON public.subscription_products;
CREATE TRIGGER update_subscription_products_updated_at
  BEFORE UPDATE ON public.subscription_products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger for user_subscriptions
DROP TRIGGER IF EXISTS update_user_subscriptions_updated_at ON public.user_subscriptions;
CREATE TRIGGER update_user_subscriptions_updated_at
  BEFORE UPDATE ON public.user_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- SQL Script Complete
-- =====================================================
-- All tables, indexes, RLS policies, and triggers have been created.
-- You can now insert subscription products and manage user subscriptions.
-- =====================================================

