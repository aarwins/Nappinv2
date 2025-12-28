/**
 * Supabase Admin Client
 * 
 * This client uses the service role key and should ONLY be used in:
 * - Node.js scripts (e.g., scripts/syncSubscriptionProducts.js)
 * - Server-side code
 * 
 * NEVER import this in React Native code or client-side components.
 * The service role key bypasses Row Level Security and should be kept secret.
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL) {
  throw new Error(
    'Missing SUPABASE_URL or EXPO_PUBLIC_SUPABASE_URL environment variable. ' +
    'Please set it in your .env file.'
  );
}

if (!SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error(
    'Missing SUPABASE_SERVICE_ROLE_KEY environment variable. ' +
    'Please set it in your .env file. ' +
    'You can find it in Supabase Dashboard > Settings > API > service_role key (secret)'
  );
}

/**
 * Admin Supabase client with service role key
 * This client bypasses RLS and should only be used in server-side scripts
 */
export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

