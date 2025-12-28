/**
 * Entitlements Helper
 * Fetches user subscription entitlements from Supabase
 */

import type { SupabaseClient } from '@supabase/supabase-js';

export type Entitlements = {
  has_access: boolean;
  is_trial: boolean;
  plan_type: 'advanced' | 'precision' | null;
  billing_interval: 'month' | 'year' | null;
  trial_days: number;
  device_type: 'apple_watch' | 'non_watch' | 'fitbit' | 'oura' | 'garmin' | 'other' | null;
  includes_watch_features: boolean;
  locked: boolean;
};

/**
 * Default locked entitlements returned when user has no subscription
 */
const DEFAULT_LOCKED_ENTITLEMENTS: Entitlements = {
  has_access: false,
  is_trial: false,
  plan_type: null,
  billing_interval: null,
  trial_days: 0,
  device_type: null,
  includes_watch_features: false,
  locked: true,
};

/**
 * Fetches entitlements for the current authenticated user
 * @param supabaseClient - Supabase client instance (must have authenticated session)
 * @returns Promise<Entitlements> - User's subscription entitlements
 */
export async function fetchEntitlements(
  supabaseClient: SupabaseClient
): Promise<Entitlements> {
  try {
    const { data, error } = await supabaseClient.rpc(
      'get_entitlements_for_current_user'
    );

    if (error) {
      console.error('[fetchEntitlements] Error calling RPC:', error);
      return DEFAULT_LOCKED_ENTITLEMENTS;
    }

    if (!data) {
      console.warn('[fetchEntitlements] No data returned from RPC');
      return DEFAULT_LOCKED_ENTITLEMENTS;
    }

    // Type assertion to ensure data matches Entitlements type
    const entitlements = data as Entitlements;

    // Validate required fields exist
    if (typeof entitlements.has_access !== 'boolean') {
      console.warn('[fetchEntitlements] Invalid entitlements data:', data);
      return DEFAULT_LOCKED_ENTITLEMENTS;
    }

    return entitlements;
  } catch (error) {
    console.error('[fetchEntitlements] Unexpected error:', error);
    return DEFAULT_LOCKED_ENTITLEMENTS;
  }
}

