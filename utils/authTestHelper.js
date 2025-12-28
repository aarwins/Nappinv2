/**
 * Auth Test Helper
 * 
 * This is a minimal helper file for testing Supabase authentication.
 * DO NOT wire this into any UI screens yet - this is for testing only.
 * 
 * Usage examples:
 * 
 * import { testSignUp, testSignIn, testGetSession } from './utils/authTestHelper';
 * 
 * // Test sign up
 * const { data, error } = await testSignUp('test@example.com', 'password123');
 * 
 * // Test sign in
 * const { data, error } = await testSignIn('test@example.com', 'password123');
 * 
 * // Test get current session
 * const { data, error } = await testGetSession();
 */

import { supabase } from './supabase';

/**
 * Test function to sign up a new user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<{data: any, error: any}>}
 */
export async function testSignUp(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
}

/**
 * Test function to sign in an existing user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<{data: any, error: any}>}
 */
export async function testSignIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

/**
 * Test function to get the current session
 * @returns {Promise<{data: any, error: any}>}
 */
export async function testGetSession() {
  const { data, error } = await supabase.auth.getSession();
  return { data, error };
}

/**
 * Test function to sign out the current user
 * @returns {Promise<{error: any}>}
 */
export async function testSignOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

