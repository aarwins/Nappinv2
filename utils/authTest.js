// utils/authTest.js
import { supabase } from './supabase';

// Simple helpers for manual testing in dev tools or temporary buttons later
export async function testSignUp(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    console.error('[Supabase] Sign up error:', error);
    throw error;
  }
  console.log('[Supabase] Signed up:', data);
  return data;
}

export async function testSignIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    console.error('[Supabase] Sign in error:', error);
    throw error;
  }
  console.log('[Supabase] Signed in:', data);
  return data;
}

export async function testSignOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('[Supabase] Sign out error:', error);
    throw error;
  }
  console.log('[Supabase] Signed out');
}

