/**
 * Restore Subscription Helper
 * Calls the restore-subscription Edge Function to restore App Store purchases
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Entitlements } from './entitlements';

interface RestoreSubscriptionOptions {
  supabaseClient: SupabaseClient;
  receipt: string;
  deviceType: 'apple_watch' | 'non_watch';
}

/**
 * Restores a subscription by verifying an App Store receipt
 * @param opts - Options object containing supabaseClient, receipt, and deviceType
 * @returns Promise<Entitlements> - Updated user entitlements after restoration
 * @throws Error if restoration fails
 */
export async function restoreSubscription(
  opts: RestoreSubscriptionOptions
): Promise<Entitlements> {
  const { supabaseClient, receipt, deviceType } = opts;

  try {
    // Get current session to extract access token
    const {
      data: { session },
      error: sessionError,
    } = await supabaseClient.auth.getSession();

    if (sessionError || !session) {
      throw new Error('Not authenticated. Please sign in to restore purchases.');
    }

    const accessToken = session.access_token;

    // Get Supabase URL from environment (same as used in utils/supabase.js)
    const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl) {
      throw new Error('Supabase URL not configured. Please set EXPO_PUBLIC_SUPABASE_URL in your .env file.');
    }

    // Construct Edge Function URL
    const functionUrl = `${supabaseUrl}/functions/v1/restore-subscription`;

    // Call the Edge Function
    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        receipt,
        device_type: deviceType,
      }),
    });

    // Check if response is OK
    if (!response.ok) {
      let errorMessage = `Failed to restore subscription (${response.status})`;

      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (e) {
        // If JSON parsing fails, use status text
        errorMessage = response.statusText || errorMessage;
      }

      throw new Error(errorMessage);
    }

    // Parse response as Entitlements
    const entitlements: Entitlements = await response.json();

    // Validate response structure
    if (typeof entitlements.has_access !== 'boolean') {
      throw new Error('Invalid response from server: missing has_access field');
    }

    return entitlements;
  } catch (error) {
    // Re-throw known errors as-is
    if (error instanceof Error) {
      throw error;
    }

    // Wrap unknown errors
    throw new Error(
      `Failed to restore subscription: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

