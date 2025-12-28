/**
 * Entitlements Service
 * Fetches user subscription entitlements from Supabase RPC
 */

import { supabase } from '../utils/supabase';

/**
 * Default locked entitlements returned when user has no subscription or on error
 */
const DEFAULT_LOCKED_ENTITLEMENTS = {
  locked: true,
  has_access: false,
  is_trial: false,
  plan_type: null,
  device_type: null,
  billing_interval: null,
  trial_days: 0,
  product_sku: null,
  access_expires_at: null,
  trial_expires_at: null,
  status: null,
};

/**
 * Gets entitlements for the current authenticated user via RPC
 * @returns {Promise<Object>} User's subscription entitlements object
 */
export async function getEntitlements() {
  if (__DEV__) {
    console.log('[entitlementsService] Fetching entitlements...');
  }
  try {
    const { data, error } = await supabase.rpc('get_entitlements_for_current_user');

    if (error) {
      console.error('[entitlementsService] Error calling RPC get_entitlements_for_current_user:', error);
      return DEFAULT_LOCKED_ENTITLEMENTS;
    }

    if (!data || data.length === 0) {
      console.warn('[entitlementsService] No data returned from RPC');
      return DEFAULT_LOCKED_ENTITLEMENTS;
    }

    // RPC returns a single row as an array, take the first (and only) result
    const entitlements = Array.isArray(data) ? data[0] : data;

    // Validate required fields exist
    if (typeof entitlements.locked !== 'boolean' || typeof entitlements.has_access !== 'boolean') {
      console.warn('[entitlementsService] Invalid entitlements data:', entitlements);
      return DEFAULT_LOCKED_ENTITLEMENTS;
    }

    if (__DEV__) {
      console.log('[entitlementsService] Fetched entitlements:', entitlements);
    }
    return entitlements;
  } catch (error) {
    console.error('[entitlementsService] Unexpected error:', error);
    return DEFAULT_LOCKED_ENTITLEMENTS;
  }
}

/**
 * @deprecated Use getEntitlements() instead
 * Kept for backward compatibility
 */
export async function fetchEntitlements() {
  return getEntitlements();
}

