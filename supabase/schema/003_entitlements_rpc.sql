-- ============================================================================
-- 003_entitlements_rpc.sql
-- Creates get_entitlements_for_current_user() RPC function.
-- Safe to run multiple times (idempotent via CREATE OR REPLACE).
-- ============================================================================

-- ============================================================================
-- Function: public.get_entitlements_for_current_user()
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_entitlements_for_current_user()
RETURNS TABLE (
    locked boolean,
    has_access boolean,
    is_trial boolean,
    plan_type text,
    device_type text,
    billing_interval text,
    trial_days integer,
    product_sku text,
    access_expires_at timestamptz,
    trial_expires_at timestamptz,
    status text
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id uuid;
    v_now timestamptz;
BEGIN
    -- Get current user ID
    v_user_id := auth.uid();
    v_now := now();

    -- If no user, return locked/default values
    IF v_user_id IS NULL THEN
        RETURN QUERY SELECT
            true::boolean as locked,
            false::boolean as has_access,
            false::boolean as is_trial,
            NULL::text as plan_type,
            NULL::text as device_type,
            NULL::text as billing_interval,
            0::integer as trial_days,
            NULL::text as product_sku,
            NULL::timestamptz as access_expires_at,
            NULL::timestamptz as trial_expires_at,
            NULL::text as status;
        RETURN;
    END IF;

    -- Return entitlements from the most recent subscription
    RETURN QUERY
    SELECT
        -- locked = NOT has_access
        NOT (
            us.status IN ('trialing', 'active', 'past_due')
            AND us.access_expires_at IS NOT NULL
            AND v_now < us.access_expires_at
        ) as locked,
        -- has_access = true if status is active/trialing/past_due AND not expired
        (
            us.status IN ('trialing', 'active', 'past_due')
            AND us.access_expires_at IS NOT NULL
            AND v_now < us.access_expires_at
        ) as has_access,
        -- is_trial = true if status is trialing AND trial not expired
        (
            us.status = 'trialing'
            AND us.trial_expires_at IS NOT NULL
            AND v_now < us.trial_expires_at
        ) as is_trial,
        -- Product details from subscription_products join
        sp.plan_type,
        sp.device_type,
        sp.billing_interval,
        COALESCE(sp.trial_days, 0) as trial_days,
        us.product_sku,
        us.access_expires_at,
        us.trial_expires_at,
        us.status
    FROM public.user_subscriptions us
    LEFT JOIN public.subscription_products sp ON us.product_sku = sp.sku
    WHERE us.user_id = v_user_id
    ORDER BY 
        -- Prefer active/trialing subscriptions
        CASE 
            WHEN us.status IN ('trialing', 'active', 'past_due') THEN 0
            ELSE 1
        END,
        -- Then by most recent expiration date
        COALESCE(us.access_expires_at, us.trial_expires_at, us.created_at) DESC
    LIMIT 1;

    -- If no subscription found, return locked/default values
    IF NOT FOUND THEN
        RETURN QUERY SELECT
            true::boolean as locked,
            false::boolean as has_access,
            false::boolean as is_trial,
            NULL::text as plan_type,
            NULL::text as device_type,
            NULL::text as billing_interval,
            0::integer as trial_days,
            NULL::text as product_sku,
            NULL::timestamptz as access_expires_at,
            NULL::timestamptz as trial_expires_at,
            NULL::text as status;
    END IF;
END;
$$;

-- ============================================================================
-- Grant execute permission to authenticated users
-- ============================================================================

GRANT EXECUTE ON FUNCTION public.get_entitlements_for_current_user() TO authenticated;

