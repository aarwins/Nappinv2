/**
 * Subscription Context Provider
 * Provides subscription entitlements throughout the app
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../supabase';
import { fetchEntitlements as fetchEntitlementsService } from '../../services/entitlementsService';

/**
 * Entitlements type matching the RPC return schema
 */
export type Entitlements = {
  locked: boolean;
  has_access: boolean;
  is_trial: boolean;
  plan_type: 'advanced' | 'precision' | null;
  device_type: 'apple_watch' | 'non_watch' | 'fitbit' | 'oura' | 'garmin' | 'other' | null;
  billing_interval: 'month' | 'year' | null;
  trial_days: number;
  product_sku: string | null;
  access_expires_at: string | null;
  trial_expires_at: string | null;
  status: string | null;
  // Derived field for backward compatibility
  includes_watch_features?: boolean;
};

interface SubscriptionContextType {
  entitlements: Entitlements | null;
  isLoading: boolean;
  error: Error | null;
  refreshEntitlements: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

interface SubscriptionProviderProps {
  children: ReactNode;
}

export function SubscriptionProvider({ children }: SubscriptionProviderProps) {
  const [entitlements, setEntitlements] = useState<Entitlements | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refreshEntitlements = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // No session, return locked entitlements
        setEntitlements({
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
          includes_watch_features: false,
        });
        setIsLoading(false);
        return;
      }

      // Fetch entitlements for authenticated user via RPC
      const result = await fetchEntitlementsService();
      
      // Add derived field for backward compatibility
      const entitlementsWithDerived = {
        ...result,
        includes_watch_features: result.plan_type === 'precision',
      };
      
      setEntitlements(entitlementsWithDerived);
    } catch (err) {
      console.error('[SubscriptionProvider] Error fetching entitlements:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch entitlements'));
      // Set locked entitlements on error
      setEntitlements({
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
        includes_watch_features: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch entitlements on mount and when auth state changes
  useEffect(() => {
    refreshEntitlements();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('[SubscriptionProvider] Auth state changed:', event, 'session:', session ? 'authenticated' : 'null');
      if (event === 'SIGNED_IN') {
        // User signed in - fetch entitlements
        refreshEntitlements();
      } else if (event === 'SIGNED_OUT') {
        // User signed out - reset to locked state
        setEntitlements({
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
          includes_watch_features: false,
        });
        setIsLoading(false);
      } else if (event === 'TOKEN_REFRESHED') {
        // Token refreshed - refresh entitlements
        refreshEntitlements();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <SubscriptionContext.Provider
      value={{
        entitlements,
        isLoading,
        error,
        refreshEntitlements,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

/**
 * Hook to access subscription entitlements
 * @returns SubscriptionContextType
 */
export function useSubscription(): SubscriptionContextType {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}

