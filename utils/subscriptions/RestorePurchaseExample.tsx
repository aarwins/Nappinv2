/**
 * Example: Restore Purchase Button Component
 * 
 * This is an example showing how to use restoreSubscription() in a React Native component.
 * Copy and adapt this pattern to your actual "Restore Purchase" button.
 */

import React, { useState } from 'react';
import { TouchableOpacity, Text, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { supabase } from '../supabase';
import { restoreSubscription } from './restore';
import { useSubscription } from './SubscriptionContext';

// Note: You'll need to implement getAppStoreReceipt() using your preferred method
// Example implementations:
// - For expo-in-app-purchases: import * as InAppPurchases from 'expo-in-app-purchases';
// - For react-native-iap: import RNIap from 'react-native-iap';
async function getAppStoreReceipt(): Promise<string | null> {
  // TODO: Implement your receipt fetching logic here
  // This is a placeholder - replace with your actual implementation
  // Example with react-native-iap:
  // try {
  //   const receipt = await RNIap.getReceiptIOS();
  //   return receipt;
  // } catch (error) {
  //   console.error('Error getting receipt:', error);
  //   return null;
  // }
  return null;
}

interface RestorePurchaseButtonProps {
  deviceType: 'apple_watch' | 'non_watch';
  disabled?: boolean;
}

export function RestorePurchaseButton({ 
  deviceType, 
  disabled = false 
}: RestorePurchaseButtonProps) {
  const [isRestoring, setIsRestoring] = useState(false);
  const { refreshEntitlements } = useSubscription();

  const handleRestorePurchase = async () => {
    if (isRestoring) return;

    try {
      setIsRestoring(true);

      // Get App Store receipt
      const receipt = await getAppStoreReceipt();
      
      if (!receipt) {
        Alert.alert(
          'Receipt Not Found',
          'Unable to retrieve your purchase receipt. Please ensure you are signed in to the App Store and try again.',
          [{ text: 'OK' }]
        );
        setIsRestoring(false);
        return;
      }

      // Call restore subscription function
      const entitlements = await restoreSubscription({
        supabaseClient: supabase,
        receipt,
        deviceType,
      });

      // Update the SubscriptionContext with new entitlements
      // The context will automatically update all components that use useSubscription()
      await refreshEntitlements();

      // Show success message based on result
      if (entitlements.has_access) {
        Alert.alert(
          'Purchase Restored',
          `Your ${entitlements.plan_type || 'subscription'} has been restored successfully.`,
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert(
          'No Purchases Found',
          'We couldn\'t find any active purchases associated with your Apple ID. Make sure you\'re signed in with the correct account.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('[RestorePurchaseButton] Error restoring purchase:', error);
      
      // Show user-friendly error message
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred while restoring your purchase.';
      
      Alert.alert(
        'Restore Failed',
        errorMessage,
        [{ text: 'OK' }]
      );
    } finally {
      setIsRestoring(false);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, (disabled || isRestoring) && styles.buttonDisabled]}
      onPress={handleRestorePurchase}
      disabled={disabled || isRestoring}
    >
      {isRestoring ? (
        <>
          <ActivityIndicator size="small" color="#FFFFFF" style={styles.spinner} />
          <Text style={styles.buttonText}>Restoring...</Text>
        </>
      ) : (
        <Text style={styles.buttonText}>Restore Purchase</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minHeight: 44,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  spinner: {
    marginRight: 8,
  },
});

/**
 * Alternative: Hook-based approach
 * 
 * If you prefer to separate the restore logic from the UI component:
 */

export function useRestorePurchase() {
  const [isRestoring, setIsRestoring] = useState(false);
  const { refreshEntitlements } = useSubscription();

  const restorePurchase = async (receipt: string, deviceType: 'apple_watch' | 'non_watch') => {
    if (isRestoring) {
      throw new Error('Restore already in progress');
    }

    try {
      setIsRestoring(true);

      const entitlements = await restoreSubscription({
        supabaseClient: supabase,
        receipt,
        deviceType,
      });

      // Update context
      await refreshEntitlements();

      return entitlements;
    } finally {
      setIsRestoring(false);
    }
  };

  return {
    restorePurchase,
    isRestoring,
  };
}

/**
 * Usage example with the hook:
 * 
 * function MyScreen() {
 *   const { restorePurchase, isRestoring } = useRestorePurchase();
 * 
 *   const handleRestore = async () => {
 *     const receipt = await getAppStoreReceipt();
 *     if (!receipt) {
 *       Alert.alert('Error', 'No receipt found');
 *       return;
 *     }
 * 
 *     try {
 *       const entitlements = await restorePurchase(receipt, 'non_watch');
 *       Alert.alert('Success', 'Purchase restored!');
 *     } catch (error) {
 *       Alert.alert('Error', error.message);
 *     }
 *   };
 * 
 *   return (
 *     <TouchableOpacity onPress={handleRestore} disabled={isRestoring}>
 *       <Text>Restore Purchase</Text>
 *     </TouchableOpacity>
 *   );
 * }
 */

