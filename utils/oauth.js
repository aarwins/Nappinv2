import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { supabase } from './supabase';

// Ensure WebBrowser auth sessions are completed (also done in App entry, but safe here)
WebBrowser.maybeCompleteAuthSession();

// Generate redirect URI based on app scheme from app.json
// This will use the scheme from app.json (currently "nappin")
// Result: nappin://auth-callback
const redirectUri = AuthSession.makeRedirectUri({
  path: 'auth-callback',
});

/**
 * SUPABASE DASHBOARD SETUP REQUIRED:
 * 
 * 1. Go to Supabase Dashboard → Your Project
 * 2. Navigate to: Authentication → URL Configuration
 * 3. Under "Redirect URLs", add:
 *    - nappin://auth-callback
 *    - (Optional) exp://127.0.0.1:19000 for local dev if needed
 * 4. Go to Authentication → Providers
 * 5. For Apple provider:
 *    - Enable Apple provider
 *    - Add redirect URL: nappin://auth-callback
 * 6. For Google provider:
 *    - Enable Google provider
 *    - Add redirect URL: nappin://auth-callback
 */

/**
 * Core OAuth sign-in function using expo-auth-session
 * @param {'apple' | 'google'} provider - The OAuth provider
 * @returns {Promise<{data: any, error: any}>} Result object with data and error
 */
export async function signInWithProvider(provider) {
  try {
    // Start the OAuth flow via Supabase
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectUri,
        skipBrowserRedirect: true, // We'll handle browser opening manually
      },
    });

    if (error) {
      console.error(`OAuth error for ${provider}:`, error);
      return { data: null, error };
    }

    if (!data?.url) {
      const err = new Error(`No OAuth URL returned for ${provider}`);
      console.error(`OAuth error for ${provider}:`, err);
      return { data: null, error: err };
    }

    // Open the OAuth URL in the browser using WebBrowser
    const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUri);

    console.log(`[OAuth ${provider}] Browser result:`, result.type);

    // Handle different result types
    if (result.type === 'success') {
      // The URL in result.url contains the auth callback
      // Supabase will automatically handle the callback when the app receives the deep link
      // We just need to wait a moment for Supabase to process it
      try {
        // Give Supabase a moment to process the callback
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if we now have a session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error(`[OAuth ${provider}] Session error after callback:`, sessionError);
          return { data: null, error: sessionError };
        }

        if (sessionData?.session) {
          console.log(`[OAuth ${provider}] Successfully authenticated`);
          return { data: sessionData.session, error: null };
        } else {
          console.warn(`[OAuth ${provider}] No session found after callback`);
          return { data: null, error: new Error('Authentication failed: No session created') };
        }
      } catch (sessionErr) {
        console.error(`[OAuth ${provider}] Error checking session:`, sessionErr);
        return { data: null, error: sessionErr };
      }
    } else if (result.type === 'cancel' || result.type === 'dismiss') {
      console.log(`[OAuth ${provider}] User cancelled authentication`);
      return { data: null, error: new Error('Authentication cancelled by user') };
    } else {
      console.error(`[OAuth ${provider}] Unexpected browser result:`, result.type);
      return { data: null, error: new Error(`Authentication failed: ${result.type}`) };
    }
  } catch (err) {
    console.error(`Unexpected OAuth error for ${provider}:`, err);
    return { data: null, error: err };
  }
}

/**
 * Sign in with Apple
 */
export async function signInWithApple() {
  return signInWithProvider('apple');
}

/**
 * Sign in with Google
 */
export async function signInWithGoogle() {
  return signInWithProvider('google');
}

