-- ============================================================================
-- 001_subscription_products.sql
-- Creates the subscription_products table for storing subscription plan metadata.
-- Safe to run multiple times (idempotent).
-- ============================================================================

-- Create table if not exists
CREATE TABLE IF NOT EXISTS public.subscription_products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    sku text NOT NULL UNIQUE,
    plan_type text NOT NULL CHECK (plan_type IN ('advanced', 'precision')),
    device_type text NOT NULL CHECK (device_type IN ('non_watch', 'apple_watch')),
    billing_interval text NOT NULL CHECK (billing_interval IN ('month', 'year')),
    price_cents integer NOT NULL CHECK (price_cents > 0),
    trial_days integer NOT NULL DEFAULT 0 CHECK (trial_days >= 0),
    app_store_product_id text NOT NULL,
    currency text NOT NULL DEFAULT 'USD',
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create index on sku for fast lookups
CREATE INDEX IF NOT EXISTS idx_subscription_products_sku 
    ON public.subscription_products(sku);

-- Create index on app_store_product_id for receipt validation lookups
CREATE INDEX IF NOT EXISTS idx_subscription_products_app_store_product_id 
    ON public.subscription_products(app_store_product_id);

-- Create index on is_active for filtering active products
CREATE INDEX IF NOT EXISTS idx_subscription_products_is_active 
    ON public.subscription_products(is_active) 
    WHERE is_active = true;

-- ============================================================================
-- Trigger function to auto-update updated_at on row changes
-- ============================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists (safe re-run)
DROP TRIGGER IF EXISTS set_updated_at ON public.subscription_products;

-- Create trigger to update updated_at on row updates
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.subscription_products
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- Row Level Security
-- ============================================================================

-- Enable RLS on the table
ALTER TABLE public.subscription_products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (safe re-run)
DROP POLICY IF EXISTS "Authenticated users can read active subscription products" 
    ON public.subscription_products;

-- Policy: Authenticated users can SELECT only active products
CREATE POLICY "Authenticated users can read active subscription products"
    ON public.subscription_products
    FOR SELECT
    TO authenticated
    USING (is_active = true);

-- ============================================================================
-- Grant permissions
-- ============================================================================

-- Grant SELECT to authenticated users (enforced by RLS policy above)
GRANT SELECT ON public.subscription_products TO authenticated;

-- Grant full access to service_role (bypasses RLS) for admin operations
GRANT ALL ON public.subscription_products TO service_role;

