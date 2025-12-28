-- =====================================================
-- Function: get_entitlements_for_current_user()
-- =====================================================
-- Returns JSONB with subscription entitlements for the current authenticated user
-- =====================================================

CREATE OR REPLACE FUNCTION public.get_entitlements_for_current_user()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  now_ts timestamptz;
  sub_record record;
  in_trial boolean;
  in_paid_period boolean;
  has_access boolean;
  result jsonb;
BEGIN
  -- Get current timestamp
  now_ts := now();

  -- Find the most recent active or trialing subscription for the current user
  SELECT 
    us.id,
    us.user_id,
    us.status,
    us.plan_type,
    us.device_type,
    us.billing_interval,
    us.trial_start_at,
    us.trial_end_at,
    us.current_period_start_at,
    us.current_period_end_at,
    p.trial_days
  INTO sub_record
  FROM public.user_subscriptions us
  INNER JOIN public.subscription_products p ON us.product_id = p.id
  WHERE us.user_id = auth.uid()
    AND us.status IN ('trialing', 'active')
  ORDER BY COALESCE(us.current_period_end_at, us.trial_end_at) DESC
  LIMIT 1;

  -- If no subscription found, return default values
  IF sub_record.id IS NULL THEN
    RETURN jsonb_build_object(
      'has_access', false,
      'is_trial', false,
      'plan_type', null,
      'billing_interval', null,
      'trial_days', 0,
      'device_type', null,
      'includes_watch_features', false,
      'locked', true
    );
  END IF;

  -- Compute trial status (defensively handle NULLs)
  in_trial := (
    sub_record.trial_start_at IS NOT NULL 
    AND sub_record.trial_end_at IS NOT NULL
    AND now_ts >= sub_record.trial_start_at
    AND now_ts <= sub_record.trial_end_at
  );

  -- Compute paid period status (defensively handle NULLs)
  in_paid_period := (
    sub_record.current_period_start_at IS NOT NULL 
    AND sub_record.current_period_end_at IS NOT NULL
    AND now_ts >= sub_record.current_period_start_at
    AND now_ts <= sub_record.current_period_end_at
  );

  -- Determine if user has access
  has_access := in_trial OR in_paid_period;

  -- Build and return the result JSONB
  result := jsonb_build_object(
    'has_access', has_access,
    'is_trial', in_trial,
    'plan_type', sub_record.plan_type,
    'billing_interval', sub_record.billing_interval,
    'trial_days', COALESCE(sub_record.trial_days, 0),
    'device_type', sub_record.device_type,
    'includes_watch_features', (sub_record.plan_type = 'precision'),
    'locked', NOT has_access
  );

  RETURN result;
END;
$$;

-- =====================================================
-- Grant execute permission to authenticated users
-- =====================================================
GRANT EXECUTE ON FUNCTION public.get_entitlements_for_current_user() TO authenticated;

-- =====================================================
-- Function Complete
-- =====================================================
-- Usage: SELECT public.get_entitlements_for_current_user();
-- Returns JSONB with user's current subscription entitlements
-- =====================================================

