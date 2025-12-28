import { supabase } from '../utils/supabase';
import * as Linking from 'expo-linking';

const redirectTo = Linking.createURL('/auth-callback'); // keep consistent with current OAuth behavior

/**
 * Sign up with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<{data: any, error: any}>}
 */
export async function signUpWithEmail(email, password) {
  if (!email || !password) {
    return { error: new Error('Email and password are required') };
  }

  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
  });

  return { data, error };
}

/**
 * Sign in with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<{data: any, error: any}>}
 */
export async function signInWithEmail(email, password) {
  if (!email || !password) {
    return { error: new Error('Email and password are required') };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  return { data, error };
}

/**
 * Sign out current user
 * @returns {Promise<{error: any}>}
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

/**
 * Sign in with OAuth provider (Google or Apple)
 * @param {'google' | 'apple'} provider - OAuth provider
 * @returns {Promise<{data: any, error: any}>}
 */
export async function signInWithProvider(provider) {
  // provider: 'google' | 'apple'
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
    },
  });

  return { data, error };
}

/**
 * Subscribe to auth state changes
 * @param {(event: string, session: any) => void} callback - Callback function
 * @returns {{data: {subscription: any}}} - Subscription object with unsubscribe method
 */
export function onAuthStateChange(callback) {
  // callback: (event, session) => void
  return supabase.auth.onAuthStateChange(callback);
}

// Legacy exports for backward compatibility (can be removed later if not needed)
export const signInWithApple = () => signInWithProvider('apple');
export const signInWithGoogle = () => signInWithProvider('google');
