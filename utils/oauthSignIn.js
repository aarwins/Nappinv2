import { Alert } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import { supabase } from './supabase';

const redirectTo = AuthSession.makeRedirectUri({
  scheme: 'nappin.realnap.app',
  path: 'auth-callback',
});

/**
 * Start Supabase OAuth in React Native using expo-auth-session.
 * - provider: 'apple' | 'google'
 * - setBusy: React setState function to toggle loading for that button
 */
export async function signInWithProvider(provider, setBusy) {
  try {
    setBusy(true);

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
        skipBrowserRedirect: true, // IMPORTANT for React Native
      },
    });

    if (error) {
      console.error('[OAuth] Supabase signInWithOAuth error:', error);
      Alert.alert('Sign in failed', error.message || 'Please try again.');
      return;
    }

    if (!data || !data.url) {
      console.error('[OAuth] No URL returned from Supabase.');
      Alert.alert('Sign in failed', 'Invalid response from sign-in provider.');
      return;
    }

    const authUrl = data.url;

    const result = await AuthSession.startAsync({
      authUrl,
      returnUrl: redirectTo,
    });

    console.log('[OAuth] AuthSession result:', result);

    if (result.type === 'success') {
      // Supabase deep-link handler will store the session.
      // We can optionally fetch the current user:
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError) {
          console.warn('[OAuth] getUser error:', userError);
        } else {
          console.log('[OAuth] Logged in user:', user?.id);
        }
      } catch (userErr) {
        console.warn('[OAuth] getUser try/catch error:', userErr);
      }
    } else if (result.type === 'dismiss' || result.type === 'cancel') {
      console.log('[OAuth] User cancelled sign-in.');
    } else if (result.type === 'error') {
      console.error('[OAuth] AuthSession error:', result.error);
      Alert.alert('Sign in failed', result.error || 'Please try again.');
    }
  } catch (err) {
    console.error('[OAuth] Unexpected error:', err);
    Alert.alert('Sign in failed', 'Unexpected error occurred.');
  } finally {
    setBusy(false);
  }
}

