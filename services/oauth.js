import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { supabase } from '../utils/supabase';

WebBrowser.maybeCompleteAuthSession();

// Build redirect URL based on app scheme → nappin://auth-callback
const getRedirectUrl = () => {
  const url = process.env.EXPO_PUBLIC_SUPABASE_REDIRECT_URL || Linking.createURL('auth-callback');
  console.log('[OAuth] Using redirect URL:', url);
  return url;
};

// Parse hash params from final redirect URL (tokens live in URL fragment)
const parseHashParams = (url) => {
  const hashIndex = url.indexOf('#');
  if (hashIndex === -1) return {};
  const hash = url.substring(hashIndex + 1);
  const params = {};
  hash.split('&').forEach((part) => {
    if (!part) return;
    const [rawKey, rawValue] = part.split('=');
    const key = decodeURIComponent(rawKey || '');
    const value = decodeURIComponent(rawValue || '');
    if (key) params[key] = value;
  });
  return params;
};

// Start OAuth flow using Supabase + expo-web-browser session
const startOAuthFlow = async (provider) => {
  try {
    console.log(`[OAuth] Starting ${provider} sign-in`);
    const redirectTo = getRedirectUrl();

    // Get hosted provider auth URL from Supabase
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
        skipBrowserRedirect: true, // we'll open the browser ourselves
      },
    });
    if (error) {
      console.error('[OAuth] Error requesting auth URL:', error);
      throw error;
    }
    const authUrl = data?.url;
    if (!authUrl) {
      const err = new Error('[OAuth] No auth URL returned from Supabase');
      console.error(err);
      throw err;
    }

    // Open browser session and wait for redirect back to nappin://auth-callback
    console.log('[OAuth] Opening auth session for provider:', provider);
    const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectTo);
    console.log('[OAuth] Auth session result:', result);

    if (result.type !== 'success' || !result.url) {
      const err = new Error(`[OAuth] Auth session did not complete successfully (type=${result.type})`);
      console.warn(err);
      throw err;
    }

    // Extract tokens from URL fragment
    const params = parseHashParams(result.url);
    const access_token = params['access_token'];
    const refresh_token = params['refresh_token'];
    if (!access_token || !refresh_token) {
      console.error('[OAuth] Missing tokens in redirect URL', params);
      throw new Error('[OAuth] Missing access_token or refresh_token');
    }

    // Set Supabase session explicitly
    console.log('[OAuth] Setting Supabase session from OAuth tokens');
    const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
    if (sessionError) {
      console.error('[OAuth] Error setting session:', sessionError);
      throw sessionError;
    }

    const { session, user } = sessionData || {};
    console.log('[OAuth] Session established:', session);
    console.log('[OAuth] User:', user);
    console.log('[OAuth] Session established. User:', user?.id);
    return { session, user, cancelled: false };
  } catch (err) {
    const msg = String(err?.message ?? '');
    const cancelled =
      err?.type === 'cancel' ||
      msg.includes('type=cancel') ||
      msg.toLowerCase().includes('cancel');

    if (cancelled) {
      console.log('[OAuth] User cancelled sign-in');
      return { session: null, user: null, cancelled: true };
    }

    // real errors only
    console.error('[OAuth] Flow error:', err);
    throw err;
  }
};

// New API (requested names)
export const signInWithAppleOAuth = () => startOAuthFlow('apple');
export const signInWithGoogleOAuth = () => startOAuthFlow('google');

// Back-compat exports used elsewhere in the app
export const signInWithApple = () => startOAuthFlow('apple');
export const signInWithGoogle = () => startOAuthFlow('google');

// UX helper for non-cancel errors
import { Alert } from 'react-native';
export const showOAuthError = () => {
  Alert.alert('Sign-In Error', 'Unable to sign in. Please try again.');
};

