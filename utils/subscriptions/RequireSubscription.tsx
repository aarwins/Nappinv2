/**
 * RequireSubscription Component
 * Wrapper component that handles subscription requirements for protected routes/screens
 */

import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useSubscription } from './SubscriptionContext';

interface RequireSubscriptionProps {
  children: React.ReactNode;
  onLocked?: () => void; // Optional callback when subscription is locked
  showPaywall?: (planType: 'advanced' | 'precision' | null) => void; // Optional callback to show paywall
}

/**
 * Component that wraps children and ensures subscription access
 * - Shows loading state while checking entitlements
 * - Calls onLocked or showPaywall if subscription is required
 * - Renders children if user has access
 */
export function RequireSubscription({
  children,
  onLocked,
  showPaywall,
}: RequireSubscriptionProps) {
  const { entitlements, isLoading } = useSubscription();

  useEffect(() => {
    if (!isLoading && entitlements?.locked) {
      // User doesn't have access
      if (showPaywall) {
        // Show appropriate paywall based on plan type
        showPaywall(entitlements.plan_type);
      } else if (onLocked) {
        onLocked();
      }
    }
  }, [entitlements, isLoading, onLocked, showPaywall]);

  // Show loading state while checking entitlements
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#B7AFC5" />
      </View>
    );
  }

  // If locked, don't render children (let parent handle navigation/paywall)
  if (entitlements?.locked) {
    return null;
  }

  // User has access - render children
  return <>{children}</>;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1E2A38',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

/**
 * Hook version for use in functional components
 * Returns whether subscription is required and loading state
 */
export function useRequireSubscription() {
  const { entitlements, isLoading } = useSubscription();

  const hasAccess = !entitlements?.locked;
  const isLocked = entitlements?.locked === true;

  return {
    hasAccess,
    isLocked,
    isLoading,
    entitlements,
  };
}

