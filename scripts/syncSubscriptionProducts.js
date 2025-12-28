/**
 * Sync Subscription Products Script
 * 
 * This script upserts the 4 subscription products into the subscription_products table.
 * It's idempotent - safe to run multiple times without creating duplicates.
 * 
 * Usage: npm run sync:products
 */

// Load environment variables from .env.local (or fallback to .env)
require('dotenv').config({
  path: require('fs').existsSync('.env.local') ? '.env.local' : '.env'
});

// Validate environment variables immediately
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error("❌ Missing SUPABASE_SERVICE_ROLE_KEY. Add it to .env.local or .env");
  process.exit(1);
}
if (!process.env.EXPO_PUBLIC_SUPABASE_URL) {
  console.error("❌ Missing EXPO_PUBLIC_SUPABASE_URL. Add it to .env.local or .env");
  process.exit(1);
}

const { createClient } = require('@supabase/supabase-js');

// Create Supabase admin client with service role key (bypasses RLS)
const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

// Define the 4 subscription products
const PRODUCTS = [
  // Nappin Advanced (non-watch)
  {
    name: 'Nappin Advanced Monthly',
    sku: 'advanced_monthly',
    plan_type: 'advanced',
    device_type: 'non_watch',
    billing_interval: 'month',
    price_cents: 399,
    currency: 'USD',
    trial_days: 3,
    app_store_product_id: 'YOUR_APPLE_ID_ADVANCED_MONTHLY', // TODO: Replace with actual App Store product ID
    is_active: true,
  },
  {
    name: 'Nappin Advanced Yearly',
    sku: 'advanced_yearly',
    plan_type: 'advanced',
    device_type: 'non_watch',
    billing_interval: 'year',
    price_cents: 2499,
    currency: 'USD',
    trial_days: 7,
    app_store_product_id: 'YOUR_APPLE_ID_ADVANCED_YEARLY', // TODO: Replace with actual App Store product ID
    is_active: true,
  },
  // Nappin Precision (Apple Watch)
  {
    name: 'Nappin Precision Monthly',
    sku: 'precision_monthly',
    plan_type: 'precision',
    device_type: 'apple_watch',
    billing_interval: 'month',
    price_cents: 799,
    currency: 'USD',
    trial_days: 7,
    app_store_product_id: 'YOUR_APPLE_ID_PRECISION_MONTHLY', // TODO: Replace with actual App Store product ID
    is_active: true,
  },
  {
    name: 'Nappin Precision Yearly',
    sku: 'precision_yearly',
    plan_type: 'precision',
    device_type: 'apple_watch',
    billing_interval: 'year',
    price_cents: 5999,
    currency: 'USD',
    trial_days: 14,
    app_store_product_id: 'YOUR_APPLE_ID_PRECISION_YEARLY', // TODO: Replace with actual App Store product ID
    is_active: true,
  },
];

async function syncSubscriptionProducts() {
  console.log('Using Supabase URL:', process.env.EXPO_PUBLIC_SUPABASE_URL);
  console.log('Product keys:', Object.keys(PRODUCTS[0] || {}));
  console.log('Syncing', PRODUCTS.length, 'products...\n');

  // Upsert products (idempotent - updates if exists, inserts if new)
  const { data, error } = await supabase
    .from('subscription_products')
    .upsert(PRODUCTS, { onConflict: 'sku' })
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('❌ Error syncing products:', error);
    console.error('\nError details:', JSON.stringify(error, null, 2));
    process.exit(1);
  }

  if (!data || data.length === 0) {
    console.error('❌ No products returned from upsert operation.');
    process.exit(1);
  }

  console.log('✅ Synced', data.length, 'subscription products.\n');
  
  // Display products in a formatted table
  data.forEach((product, index) => {
    console.log(`${index + 1}. ${product.name}`);
    console.log(`   SKU: ${product.sku}`);
    console.log(`   Plan: ${product.plan_type} | Device: ${product.device_type} | Billing: ${product.billing_interval}`);
    console.log(`   Price: $${(product.price_cents / 100).toFixed(2)} ${product.currency}`);
    console.log(`   Trial: ${product.trial_days} days`);
    console.log(`   App Store ID: ${product.app_store_product_id}`);
    console.log(`   Active: ${product.is_active ? 'Yes' : 'No'}`);
    console.log('');
  });

  process.exit(0);
}

// Run the sync
syncSubscriptionProducts().catch((error) => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});
