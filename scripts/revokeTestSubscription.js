/**
 * Revoke Test Subscription Script
 * 
 * Revokes a test subscription by setting status to 'expired' and access_expires_at to now().
 * 
 * Usage: npm run revoke:test-sub -- --user_id <uuid>
 * Example: npm run revoke:test-sub -- --user_id abc123...
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
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--user_id' && args[i + 1]) {
      parsed.user_id = args[i + 1];
      i++;
    }
  }

  return parsed;
}

async function revokeTestSubscription() {
  const { user_id } = parseArgs();

  if (!user_id) {
    console.error('❌ Missing required argument: --user_id');
    console.error('\nUsage: npm run revoke:test-sub -- --user_id <uuid>');
    console.error('\nExample:');
    console.error('  npm run revoke:test-sub -- --user_id abc123-def456-...');
    process.exit(1);
  }

  // Validate user_id format (basic UUID check)
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(user_id)) {
    console.error('❌ Invalid user_id format. Expected UUID.');
    process.exit(1);
  }

  console.log('🔄 Revoking test subscription...\n');
  console.log(`  User ID: ${user_id}\n`);

  const now = new Date();

  try {
    // First, get the existing subscription to log the product_sku
    const { data: existingSubscription, error: fetchError } = await supabase
      .from('user_subscriptions')
      .select('id, product_sku, status')
      .eq('user_id', user_id)
      .single();

    if (fetchError || !existingSubscription) {
      console.error('❌ No subscription found for user_id:', user_id);
      console.error('   Error:', fetchError?.message || 'Subscription not found');
      process.exit(1);
    }

    // Update subscription to expired status
    const { data: updatedSubscription, error: updateError } = await supabase
      .from('user_subscriptions')
      .update({
        status: 'expired',
        access_expires_at: now.toISOString(),
      })
      .eq('user_id', user_id)
      .select()
      .single();

    if (updateError) {
      console.error('❌ Error updating subscription:', updateError);
      process.exit(1);
    }

    // Insert subscription event
    const { error: eventError } = await supabase.from('subscription_events').insert({
      user_id: user_id,
      event_type: 'test_revoke',
      product_sku: existingSubscription.product_sku,
      platform: 'ios_app_store',
      payload: {
        source: 'revokeTestSubscription',
        revoked_at: now.toISOString(),
        previous_status: existingSubscription.status,
      },
    });

    if (eventError) {
      console.error('⚠️  Warning: Subscription revoked but failed to log event:', eventError);
      // Don't exit - subscription was revoked successfully
    }

    console.log('✅ Test subscription revoked successfully!\n');
    console.log(`  Subscription ID: ${updatedSubscription.id}`);
    console.log(`  Previous status: ${existingSubscription.status}`);
    console.log(`  New status: ${updatedSubscription.status}`);
    console.log(`  Access expired at: ${now.toISOString()}`);
    console.log('\n💡 Next steps:');
    console.log('  1. Open the app and trigger refreshEntitlements()');
    console.log('  2. The app should lock and show paywall');
    console.log('  3. To grant again: npm run grant:test-sub -- --user_id', user_id);
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  }
}

// Run the script
revokeTestSubscription().catch((error) => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});

