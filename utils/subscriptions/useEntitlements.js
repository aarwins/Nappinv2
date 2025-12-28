/**
 * Hook for checking subscription entitlements
 * Provides helper functions for paywall gating
 */

import { useSubscription } from './SubscriptionContext';

/**
 * Helper hook that provides entitlement checking utilities
 * @returns {Object} { isLocked, hasAccess, entitlements, isLoading }
 */
export function useEntitlements() {
  const { entitlements, isLoading } = useSubscription();

  // isLocked: true if loading OR if entitlements are locked
  const isLocked = isLoading ? true : entitlements?.locked ?? true;

  // hasAccess: true if not loading AND has access
  const hasAccess = !isLoading && entitlements?.has_access === true;

  return {
    isLocked,
    hasAccess,
    entitlements,
    isLoading,
  };
}

