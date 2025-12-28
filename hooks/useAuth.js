import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { navigationRef } from '../navigationRef';

/**
 * useAuth hook that subscribes to Supabase auth state changes
 * Returns the current session and loading state
 */
export function useAuth() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session ?? null);
      setLoading(false);
    });

    // Subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession ?? null);
      setLoading(false);
      console.log('[useAuth] Auth state changed, event:', event, 'session:', newSession ? 'authenticated' : 'null');

      // Handle password recovery flow
      if (event === 'PASSWORD_RECOVERY') {
        console.log('[useAuth] PASSWORD_RECOVERY event detected, navigating to ResetPassword');
        // User tapped the reset link in email and came back via nappin://reset-password
        navigationRef.current?.navigate('ResetPassword', {
          accessToken: newSession?.access_token,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { session, loading };
}

