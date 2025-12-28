/**
 * Subscription Products Helper
 * Fetches subscription product data from Supabase for displaying pricing
 */

import type { SupabaseClient } from '@supabase/supabase-js';

export type SubscriptionProduct = {
  id: string;
  sku: string;
  plan_type: 'advanced' | 'precision';
  billing_interval: 'month' | 'year';
  device_type: 'apple_watch' | 'non_watch';
  price_cents: number;
  trial_days: number;
  name: string;
  description: string | null;
  currency: string;
  app_store_product_id: string;
};

/**
 * Fetches all active subscription products from Supabase
 * @param supabaseClient - Supabase client instance
 * @returns Promise<SubscriptionProduct[]> - Array of active subscription products
 */
export async function fetchActiveProducts(
  supabaseClient: SupabaseClient
): Promise<SubscriptionProduct[]> {
  try {
    const { data, error } = await supabaseClient
      .from('subscription_products')
      .select('*')
      .eq('is_active', true)
      .order('plan_type', { ascending: true })
      .order('billing_interval', { ascending: false }); // Year first, then month

    if (error) {
      console.error('[fetchActiveProducts] Error fetching products:', error);
      return [];
    }

    if (!data || data.length === 0) {
      console.warn('[fetchActiveProducts] No active products found');
      return [];
    }

    return data as SubscriptionProduct[];
  } catch (error) {
    console.error('[fetchActiveProducts] Unexpected error:', error);
    return [];
  }
}

/**
 * Formats price in cents to a display string
 * @param priceCents - Price in cents
 * @param currency - Currency code (default: 'USD')
 * @returns Formatted price string (e.g., "$3.99")
 */
export function formatPrice(priceCents: number, currency: string = 'USD'): string {
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
 * @param trialDays - Number of trial days
 * @returns Formatted trial string (e.g., "7-day free trial")
 */
export function formatTrial(trialDays: number): string {
  if (trialDays === 0) {
    return '';
  }
  if (trialDays === 1) {
    return '1-day free trial';
  }
  return `${trialDays}-day free trial`;
}

/**
 * Gets products by plan type
 * @param products - Array of all products
 * @param planType - 'advanced' | 'precision'
 * @returns Array of products matching the plan type
 */
export function getProductsByPlanType(
  products: SubscriptionProduct[],
  planType: 'advanced' | 'precision'
): SubscriptionProduct[] {
  return products.filter((p) => p.plan_type === planType);
}

/**
 * Gets a specific product by SKU
 * @param products - Array of all products
 * @param sku - Product SKU (e.g., 'advanced_monthly')
 * @returns Product or undefined
 */
export function getProductBySku(
  products: SubscriptionProduct[],
  sku: string
): SubscriptionProduct | undefined {
  return products.find((p) => p.sku === sku);
}

/**
 * Gets products by plan type and device type
 * @param products - Array of all products
 * @param planType - 'advanced' | 'precision'
 * @param deviceType - 'apple_watch' | 'non_watch'
 * @returns Array of matching products
 */
export function getProductsByPlanAndDevice(
  products: SubscriptionProduct[],
  planType: 'advanced' | 'precision',
  deviceType: 'apple_watch' | 'non_watch'
): SubscriptionProduct[] {
  return products.filter(
    (p) => p.plan_type === planType && p.device_type === deviceType
  );
}

/**
 * Formats price with billing interval for display
 * @param product - Subscription product
 * @returns Formatted price string with interval (e.g., "$3.99 / mo" or "$24.99 / yr")
 */
export function formatPriceWithInterval(product: SubscriptionProduct): string {
  const price = formatPrice(product.price_cents, product.currency);
  const interval = product.billing_interval === 'month' ? 'mo' : 'yr';
  return `${price} / ${interval}`;
}

/**
 * Calculates monthly equivalent for yearly plans
 * @param yearlyPriceCents - Yearly price in cents
 * @returns Monthly equivalent in cents
 */
export function calculateMonthlyEquivalent(yearlyPriceCents: number): number {
  return Math.round(yearlyPriceCents / 12);
}

/**
 * Formats monthly equivalent for yearly plans
 * @param yearlyPriceCents - Yearly price in cents
 * @param currency - Currency code (default: 'USD')
 * @returns Formatted monthly equivalent (e.g., "$2.08 / mo")
 */
export function formatMonthlyEquivalent(
  yearlyPriceCents: number,
  currency: string = 'USD'
): string {
  const monthlyCents = calculateMonthlyEquivalent(yearlyPriceCents);
  const price = formatPrice(monthlyCents, currency);
  return `${price} / mo`;
}

