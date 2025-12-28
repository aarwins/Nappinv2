/**
 * Entitlements Provider
 * Centralized context for subscription entitlements
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { getEntitlements } from '../services/entitlementsService';

const EntitlementsContext = createContext(undefined);

export function EntitlementsProvider({ children }) {
  const [entitlements, setEntitlements] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshEntitlements = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // No session, set locked entitlements
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
        });
        setLoading(false);
        return;
      }

      // Fetch entitlements for authenticated user
      const result = await getEntitlements();
      setEntitlements(result);
    } catch (err) {
      console.error('[EntitlementsProvider] Error fetching entitlements:', err);
      setError(err);
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
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch entitlements on mount and when auth state changes
  useEffect(() => {
    refreshEntitlements();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (__DEV__) {
        console.log('[EntitlementsProvider] Auth state changed:', event, 'session:', session ? 'authenticated' : 'null');
      }
      
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
        });
        setLoading(false);
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
    <EntitlementsContext.Provider
      value={{
        entitlements,
        loading,
        error,
        refreshEntitlements,
      }}
    >
      {children}
    </EntitlementsContext.Provider>
  );
}

/**
 * Hook to access entitlements
 */
export function useEntitlements() {
  const context = useContext(EntitlementsContext);
  if (context === undefined) {
    throw new Error('useEntitlements must be used within an EntitlementsProvider');
  }
  return context;
}

