-- =====================================================
-- Add unique constraint for upsert conflict resolution
-- =====================================================
-- This allows the restore-subscription Edge Function to use
-- onConflict: 'user_id,product_id' in upsert operations
-- =====================================================

-- Add unique constraint on user_id and product_id combination
-- This ensures one subscription record per user per product
-- Note: A user can still have multiple subscriptions for different products
DO $$
BEGIN
  -- Check if constraint already exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'user_subscriptions_user_product_unique'
  ) THEN
    ALTER TABLE public.user_subscriptions
    ADD CONSTRAINT user_subscriptions_user_product_unique
    UNIQUE (user_id, product_id);
  END IF;
END $$;
