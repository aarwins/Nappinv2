/**
 * Subscription Products Service
 * Fetches subscription product data from Supabase for displaying pricing
 */

import { supabase } from '../utils/supabase';

/**
 * Fetches active subscription products for a specific device type
 * @param {string} deviceType - 'non_watch' | 'apple_watch'
 * @returns {Promise<Array>} Array of active subscription products, sorted: yearly first, then monthly
 */
export async function fetchProductsForDevice(deviceType) {
  if (__DEV__) {
    console.log('[subscriptionProductsService] Fetching products for device type:', deviceType);
  }

  try {
    const { data, error } = await supabase
      .from('subscription_products')
      .select('*')
      .eq('is_active', true)
      .eq('device_type', deviceType)
      .order('billing_interval', { ascending: false }); // Year first (year='year', month='month' alphabetically)

    if (error) {
      console.error('[subscriptionProductsService] Error fetching products:', error);
      return [];
    }

    if (!data || data.length === 0) {
      if (__DEV__) {
        console.warn('[subscriptionProductsService] No active products found for device type:', deviceType);
      }
      return [];
    }

    // Sort: yearly first, then monthly
    const sorted = data.sort((a, b) => {
      if (a.billing_interval === 'year' && b.billing_interval === 'month') return -1;
      if (a.billing_interval === 'month' && b.billing_interval === 'year') return 1;
      return 0;
    });

    if (__DEV__) {
      console.log('[subscriptionProductsService] Fetched products:', sorted.map(p => ({ sku: p.sku, price: p.price_cents, trial: p.trial_days })));
    }

    return sorted;
  } catch (error) {
    console.error('[subscriptionProductsService] Unexpected error:', error);
    return [];
  }
}

/**
 * Formats price in cents to a display string
 * @param {number} priceCents - Price in cents
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} Formatted price string (e.g., "$3.99")
 */
export function formatPrice(priceCents, currency = 'USD') {
  const price = priceCents / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

/**
 * Formats trial days into a display string
 * @param {number} trialDays - Number of trial days
 * @returns {string} Formatted trial string (e.g., "7-day free trial")
 */
export function formatTrial(trialDays) {
  if (trialDays === 0) {
    return '';
  }
  if (trialDays === 1) {
    return '1-day free trial';
  }
  return `${trialDays}-day free trial`;
}

