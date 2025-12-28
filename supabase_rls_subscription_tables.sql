-- =====================================================
-- Configure Row Level Security (RLS) for Subscription Tables
-- =====================================================
-- This script enables RLS and sets up read-only policies for authenticated users
-- All write operations (INSERT/UPDATE/DELETE) require service role
-- =====================================================

-- =====================================================
-- 1. subscription_products table
-- =====================================================

-- Enable RLS
ALTER TABLE public.subscription_products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for clean re-run)
DROP POLICY IF EXISTS "authenticated_users_select_all_products" ON public.subscription_products;
DROP POLICY IF EXISTS "Authenticated users can view active products" ON public.subscription_products;

-- Policy: Authenticated users can SELECT all rows (read-only)
CREATE POLICY "authenticated_users_select_all_products"
ON public.subscription_products
FOR SELECT
TO authenticated
USING (true);

-- =====================================================
-- 2. user_subscriptions table
-- =====================================================

-- Enable RLS
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for clean re-run)
DROP POLICY IF EXISTS "authenticated_users_select_own_subscriptions" ON public.user_subscriptions;
DROP POLICY IF EXISTS "Users can view own subscriptions" ON public.user_subscriptions;
DROP POLICY IF EXISTS "Service role can manage all subscriptions" ON public.user_subscriptions;

-- Policy: Authenticated users can SELECT rows where user_id = auth.uid()
CREATE POLICY "authenticated_users_select_own_subscriptions"
ON public.user_subscriptions
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Policy: Service role can manage all subscriptions (for Edge Functions/backend)
CREATE POLICY "service_role_manage_all_subscriptions"
ON public.user_subscriptions
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- =====================================================
-- 3. subscription_events table
-- =====================================================

-- Enable RLS
ALTER TABLE public.subscription_events ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for clean re-run)
DROP POLICY IF EXISTS "authenticated_users_select_own_events" ON public.subscription_events;
DROP POLICY IF EXISTS "Users can view own subscription events" ON public.subscription_events;
DROP POLICY IF EXISTS "Service role can manage all events" ON public.subscription_events;

-- Policy: Authenticated users can SELECT rows where user_id = auth.uid()
CREATE POLICY "authenticated_users_select_own_events"
ON public.subscription_events
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Policy: Service role can manage all events (for Edge Functions/backend)
CREATE POLICY "service_role_manage_all_events"
ON public.subscription_events
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- =====================================================
-- RLS Configuration Complete
-- =====================================================
-- Summary:
-- - subscription_products: Authenticated users can SELECT all rows
-- - user_subscriptions: Authenticated users can SELECT their own rows only
-- - subscription_events: Authenticated users can SELECT their own events only
-- - All INSERT/UPDATE/DELETE operations require service role
-- =====================================================

