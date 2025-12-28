/**
 * List Subscription Products Script
 * 
 * This script displays all subscription products from the database.
 * Useful for inspecting current product configuration.
 * 
 * Usage: npm run list:products
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

async function listSubscriptionProducts() {
  console.log('Using Supabase URL:', process.env.EXPO_PUBLIC_SUPABASE_URL);
  console.log('Fetching subscription products...\n');

  const { data, error } = await supabase
    .from('subscription_products')
    .select(
      'id, name, sku, plan_type, device_type, billing_interval, price_cents, currency, trial_days, app_store_product_id, is_active, created_at, updated_at'
    )
    .order('plan_type', { ascending: true })
    .order('billing_interval', { ascending: false }); // Year first, then month

  if (error) {
    console.error('❌ Error fetching products:', error);
    console.error('\nError details:', JSON.stringify(error, null, 2));
    process.exit(1);
  }

  if (!data || data.length === 0) {
    console.log('⚠️  No subscription products found in the database.');
    console.log('   Run "npm run sync:products" to add products.\n');
    process.exit(0);
  }

  console.log(`✅ Found ${data.length} product(s):\n`);

  // Display products in a formatted table
  data.forEach((product, index) => {
    console.log(`${index + 1}. ${product.name}`);
    console.log(`   ID: ${product.id}`);
    console.log(`   SKU: ${product.sku}`);
    console.log(`   Plan Type: ${product.plan_type}`);
    console.log(`   Device Type: ${product.device_type}`);
    console.log(`   Billing Interval: ${product.billing_interval}`);
    console.log(`   Price: $${(product.price_cents / 100).toFixed(2)} ${product.currency}`);
    console.log(`   Trial Days: ${product.trial_days}`);
    console.log(`   App Store Product ID: ${product.app_store_product_id}`);
    console.log(`   Active: ${product.is_active ? 'Yes' : 'No'}`);
    
    if (product.created_at) {
      const createdDate = new Date(product.created_at).toLocaleString();
      console.log(`   Created: ${createdDate}`);
    }
    if (product.updated_at) {
      const updatedDate = new Date(product.updated_at).toLocaleString();
      console.log(`   Updated: ${updatedDate}`);
    }
    
    console.log('');
  });

  console.log(`✅ Total: ${data.length} product(s)\n`);
  process.exit(0);
}

// Run the list
listSubscriptionProducts().catch((error) => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});
