-- =====================================================
-- Seed subscription_products table with initial products
-- =====================================================
-- This can be run multiple times safely (idempotent)
-- =====================================================

INSERT INTO public.subscription_products (
  sku,
  name,
  description,
  plan_type,
  device_type,
  billing_interval,
  price_cents,
  currency,
  trial_days,
  app_store_product_id
) VALUES
  (
    'advanced_monthly',
    'Nappin Advanced Monthly',
    'Advanced nap tracking and optimization features - Monthly billing',
    'advanced',
    'non_watch',
    'month',
    399,
    'USD',
    3,
    'nappin.advanced.monthly'
  ),
  (
    'advanced_yearly',
    'Nappin Advanced Yearly',
    'Advanced nap tracking and optimization features - Yearly billing',
    'advanced',
    'non_watch',
    'year',
    2499,
    'USD',
    7,
    'nappin.advanced.yearly'
  ),
  (
    'precision_monthly',
    'Nappin Precision Monthly (Apple Watch)',
    'Precision nap tracking with Apple Watch integration - Monthly billing',
    'precision',
    'apple_watch',
    'month',
    799,
    'USD',
    7,
    'nappin.precision.monthly'
  ),
  (
    'precision_yearly',
    'Nappin Precision Yearly (Apple Watch)',
    'Precision nap tracking with Apple Watch integration - Yearly billing',
    'precision',
    'apple_watch',
    'year',
    5999,
    'USD',
    14,
    'nappin.precision.yearly'
  )
ON CONFLICT (sku) DO NOTHING;

