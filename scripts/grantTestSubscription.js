/**
 * Grant Test Subscription Script
 * 
 * Grants a temporary test subscription to a user for testing entitlements.
 * 
 * Usage: npm run grant:test-sub -- --user_id <uuid> [--sku <sku>] [--days <number>]
 * Example: npm run grant:test-sub -- --user_id abc123... --sku advanced_yearly --days 1
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

// Parse CLI arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {
    user_id: null,
    sku: 'advanced_monthly',
    days: 1,
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--user_id' && args[i + 1]) {
      parsed.user_id = args[i + 1];
      i++;
    } else if (args[i] === '--sku' && args[i + 1]) {
      parsed.sku = args[i + 1];
      i++;
    } else if (args[i] === '--days' && args[i + 1]) {
      parsed.days = parseInt(args[i + 1], 10);
      i++;
    }
  }

  return parsed;
}

async function grantTestSubscription() {
  const { user_id, sku, days } = parseArgs();

  if (!user_id) {
    console.error('❌ Missing required argument: --user_id');
    console.error('\nUsage: npm run grant:test-sub -- --user_id <uuid> [--sku <sku>] [--days <number>]');
    console.error('\nExample:');
    console.error('  npm run grant:test-sub -- --user_id abc123-def456-... --sku advanced_yearly --days 1');
    process.exit(1);
  }

  // Validate user_id format (basic UUID check)
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(user_id)) {
    console.error('❌ Invalid user_id format. Expected UUID.');
    process.exit(1);
  }

  // Validate days
  if (isNaN(days) || days < 1) {
    console.error('❌ Invalid days value. Must be a positive number.');
    process.exit(1);
  }

  console.log('🔄 Granting test subscription...\n');
  console.log(`  User ID: ${user_id}`);
  console.log(`  SKU: ${sku}`);
  console.log(`  Days: ${days}\n`);

  // Calculate expiration date
  const now = new Date();
  const accessExpiresAt = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

  try {
    // Upsert user subscription
    const { data: subscription, error: subscriptionError } = await supabase
      .from('user_subscriptions')
      .upsert(
        {
          user_id: user_id,
          status: 'active',
          product_sku: sku,
          platform: 'ios_app_store',
          access_expires_at: accessExpiresAt.toISOString(),
          trial_expires_at: null,
          original_transaction_id: `test_${Date.now()}`,
          latest_transaction_id: `test_${Date.now()}`,
        },
        {
          onConflict: 'user_id',
        }
      )
      .select()
      .single();

    if (subscriptionError) {
      console.error('❌ Error upserting subscription:', subscriptionError);
      process.exit(1);
    }

    // Insert subscription event
    const { error: eventError } = await supabase.from('subscription_events').insert({
      user_id: user_id,
      event_type: 'test_grant',
      product_sku: sku,
      platform: 'ios_app_store',
      payload: {
        source: 'grantTestSubscription',
        days: days,
        granted_at: now.toISOString(),
      },
    });

    if (eventError) {
      console.error('⚠️  Warning: Subscription granted but failed to log event:', eventError);
      // Don't exit - subscription was created successfully
    }

    console.log('✅ Test subscription granted successfully!\n');
    console.log(`  Subscription ID: ${subscription.id}`);
    console.log(`  Access expires at: ${accessExpiresAt.toISOString()}`);
    console.log(`  Status: ${subscription.status}`);
    console.log('\n💡 Next steps:');
    console.log('  1. Open the app and trigger refreshEntitlements()');
    console.log('  2. The app should unlock and show premium features');
    console.log(`  3. Access will expire in ${days} day(s)`);
    console.log('  4. To revoke: npm run revoke:test-sub -- --user_id', user_id);
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  }
}

// Run the script
grantTestSubscription().catch((error) => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});

