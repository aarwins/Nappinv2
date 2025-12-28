-- ============================================================================
-- 002_user_subscriptions_and_events.sql
-- Creates user_subscriptions and subscription_events tables with RLS.
-- Safe to run multiple times (idempotent).
-- ============================================================================

-- ============================================================================
-- Table: public.user_subscriptions
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.user_subscriptions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    status text NOT NULL CHECK (status IN ('trialing', 'active', 'past_due', 'canceled', 'expired')),
    product_sku text REFERENCES public.subscription_products(sku),
    platform text NOT NULL DEFAULT 'ios_app_store',
    access_expires_at timestamptz,
    trial_expires_at timestamptz,
    original_transaction_id text,
    latest_transaction_id text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT user_subscriptions_user_id_unique UNIQUE (user_id)
);

-- ============================================================================
-- Table: public.subscription_events
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.subscription_events (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    event_type text NOT NULL,
    product_sku text,
    platform text NOT NULL DEFAULT 'ios_app_store',
    payload jsonb NOT NULL DEFAULT '{}'::jsonb,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================================================
-- Indexes
-- ============================================================================

-- Indexes on user_subscriptions
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id 
    ON public.user_subscriptions(user_id);

CREATE INDEX IF NOT EXISTS idx_user_subscriptions_access_expires_at 
    ON public.user_subscriptions(access_expires_at);

-- Indexes on subscription_events
CREATE INDEX IF NOT EXISTS idx_subscription_events_user_id 
    ON public.subscription_events(user_id);

CREATE INDEX IF NOT EXISTS idx_subscription_events_event_type 
    ON public.subscription_events(event_type);

-- ============================================================================
-- Trigger function for updated_at (reusable)
-- ============================================================================

-- Create or replace the trigger function (safe to run multiple times)
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- Triggers for updated_at
-- ============================================================================

-- Drop existing trigger if it exists (safe re-run)
DROP TRIGGER IF EXISTS set_user_subscriptions_updated_at ON public.user_subscriptions;

-- Create trigger for user_subscriptions
CREATE TRIGGER set_user_subscriptions_updated_at
    BEFORE UPDATE ON public.user_subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- Row Level Security
-- ============================================================================

-- Enable RLS on user_subscriptions
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Enable RLS on subscription_events
ALTER TABLE public.subscription_events ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- RLS Policies for user_subscriptions
-- ============================================================================

-- Drop existing policies if they exist (safe re-run)
DROP POLICY IF EXISTS "Authenticated users can view their own subscriptions" 
    ON public.user_subscriptions;

-- Policy: Authenticated users can SELECT only their own subscriptions
CREATE POLICY "Authenticated users can view their own subscriptions"
    ON public.user_subscriptions
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

-- ============================================================================
-- RLS Policies for subscription_events
-- ============================================================================

-- Drop existing policies if they exist (safe re-run)
DROP POLICY IF EXISTS "Authenticated users can view their own subscription events" 
    ON public.subscription_events;

-- Policy: Authenticated users can SELECT only their own subscription events
CREATE POLICY "Authenticated users can view their own subscription events"
    ON public.subscription_events
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

-- ============================================================================
-- Grant permissions
-- ============================================================================

-- Grant SELECT to authenticated users on user_subscriptions (enforced by RLS)
GRANT SELECT ON public.user_subscriptions TO authenticated;

-- Grant full access to service_role (bypasses RLS) for admin/edge function operations
GRANT ALL ON public.user_subscriptions TO service_role;

-- Grant SELECT to authenticated users on subscription_events (enforced by RLS)
GRANT SELECT ON public.subscription_events TO authenticated;

-- Grant full access to service_role (bypasses RLS) for admin/edge function operations
GRANT ALL ON public.subscription_events TO service_role;

