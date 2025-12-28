import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const APPSTORE_VERIFY_URL = 'https://buy.itunes.apple.com/verifyReceipt';

interface RequestBody {
  receipt: string;
  device_type: 'apple_watch' | 'non_watch';
}

interface AppStoreReceiptInfo {
  product_id: string;
  original_transaction_id: string;
  transaction_id: string;
  purchase_date_ms: string;
  expires_date_ms?: string;
}

interface AppStoreResponse {
  status: number;
  latest_receipt_info?: AppStoreReceiptInfo[];
  latest_receipt?: string;
}

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, content-type',
      },
    });
  }

  try {
    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get Authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Missing or invalid Authorization header' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Extract JWT token
    const jwt = authHeader.replace('Bearer ', '');

    // Get user from JWT
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(jwt);

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired token' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Parse request body
    const body: RequestBody = await req.json();
    const { receipt, device_type } = body;

    if (!receipt || !device_type) {
      return new Response(
        JSON.stringify({ error: 'Missing receipt or device_type in request body' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Get App Store shared secret
    const appSharedSecret = Deno.env.get('APP_SHARED_SECRET');
    if (!appSharedSecret) {
      console.error('[restore-subscription] APP_SHARED_SECRET not configured');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Verify receipt with Apple App Store
    console.log('[restore-subscription] Verifying receipt with Apple...');
    const verifyResponse = await fetch(APPSTORE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'receipt-data': receipt,
        password: appSharedSecret,
        'exclude-old-transactions': true,
      }),
    });

    if (!verifyResponse.ok) {
      console.error('[restore-subscription] Apple verification request failed:', verifyResponse.status);
      return new Response(
        JSON.stringify({ error: 'Failed to verify receipt with Apple' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const appStoreJson: AppStoreResponse = await verifyResponse.json();

    // Check Apple response status
    if (appStoreJson.status !== 0) {
      console.error('[restore-subscription] Apple returned status:', appStoreJson.status);
      return new Response(
        JSON.stringify({ error: 'Invalid receipt' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Parse latest receipt info
    const latestReceiptInfo = appStoreJson.latest_receipt_info;
    if (!latestReceiptInfo || latestReceiptInfo.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No receipt information found' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Get the latest receipt entry (first one)
    const latestReceipt = latestReceiptInfo[0];
    const {
      product_id,
      original_transaction_id,
      transaction_id,
      purchase_date_ms,
      expires_date_ms,
    } = latestReceipt;

    if (!product_id || !transaction_id) {
      return new Response(
        JSON.stringify({ error: 'Invalid receipt data: missing product_id or transaction_id' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Find subscription product by app_store_product_id
    const { data: product, error: productError } = await supabase
      .from('subscription_products')
      .select('*')
      .eq('app_store_product_id', product_id)
      .single();

    if (productError || !product) {
      console.error('[restore-subscription] Product not found:', product_id, productError);
      return new Response(
        JSON.stringify({ error: 'Unknown product' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Convert timestamps from milliseconds to ISO strings
    const purchaseDate = new Date(parseInt(purchase_date_ms)).toISOString();
    const expiresDate = expires_date_ms
      ? new Date(parseInt(expires_date_ms)).toISOString()
      : null;

    // Determine subscription status
    const now = new Date();
    const expiresAt = expires_date_ms ? new Date(parseInt(expires_date_ms)) : null;
    const status = expiresAt && expiresAt > now ? 'active' : 'expired';

    // Calculate trial dates
    let trialEndAt: string | null = null;
    if (product.trial_days > 0) {
      const trialEndDate = new Date(parseInt(purchase_date_ms));
      trialEndDate.setDate(trialEndDate.getDate() + product.trial_days);
      trialEndAt = trialEndDate.toISOString();
    }

    // Upsert user subscription
    // Note: Using service role to bypass RLS for upsert
    const { data: subscription, error: subscriptionError } = await supabase
      .from('user_subscriptions')
      .upsert(
        {
          user_id: user.id,
          product_id: product.id,
          status,
          plan_type: product.plan_type,
          device_type: product.device_type,
          billing_interval: product.billing_interval,
          trial_start_at: purchaseDate,
          trial_end_at: trialEndAt,
          current_period_start_at: purchaseDate,
          current_period_end_at: expiresDate,
          platform_transaction_id: transaction_id,
          original_transaction_id: original_transaction_id || transaction_id,
          latest_receipt: appStoreJson.latest_receipt || null,
        },
        {
          onConflict: 'user_id,product_id',
        }
      )
      .select()
      .single();

    if (subscriptionError) {
      console.error('[restore-subscription] Error upserting subscription:', subscriptionError);
      return new Response(
        JSON.stringify({ error: 'Failed to save subscription' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Log subscription event
    await supabase.from('subscription_events').insert({
      user_subscription_id: subscription.id,
      user_id: user.id,
      event_type: 'subscription_restored',
      payload: appStoreJson,
    });

    // Get and return entitlements
    // Create a client with user's JWT for the RPC call (which uses auth.uid())
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabaseUserClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    });

    const { data: entitlements, error: entitlementsError } = await supabaseUserClient.rpc(
      'get_entitlements_for_current_user'
    );

    if (entitlementsError) {
      console.error('[restore-subscription] Error fetching entitlements:', entitlementsError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch entitlements' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(JSON.stringify(entitlements), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('[restore-subscription] Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
});

