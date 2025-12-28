import React, { useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { preloadAllImages } from '../utils/imagePreloader';
import { useAuth } from '../hooks/useAuth';
import { useEntitlements } from '../context/EntitlementsProvider';

const SplashScreen = () => {
  const navigation = useNavigation();
  const { session, loading: authLoading } = useAuth();
  const { entitlements, loading: entitlementsLoading } = useEntitlements();

  useEffect(() => {
    // Start preloading all images silently in the background
    const startPreloading = async () => {
      console.log('Starting image preloading...');
      
      const success = await preloadAllImages();
      
      if (success) {
        console.log('All images preloaded successfully');
      } else {
        console.warn('Some images failed to preload, continuing anyway');
      }
    };

    startPreloading();
  }, []);

  useEffect(() => {
    // Wait for auth state and entitlements to be determined before navigating
    if (authLoading || entitlementsLoading) {
      return;
    }

    // Navigate after exactly 2.5 seconds
    const timer = setTimeout(() => {
      if (session) {
        // User is authenticated - check entitlements
        if (entitlements?.locked === false && entitlements?.has_access === true) {
          // User has access - navigate to main app
          console.log('[SplashScreen] User has access, navigating to Home');
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        } else {
          // User is locked - navigate to paywall (will be determined by device type)
          // For now, navigate to Advanced paywall - device type check can be added later
          console.log('[SplashScreen] User is locked, navigating to paywall');
          navigation.reset({
            index: 0,
            routes: [{ name: 'NappinAdvancedPaywall' }],
          });
        }
      } else {
        // User is not authenticated - go to onboarding
        console.log('[SplashScreen] User is not authenticated, navigating to onboarding');
        navigation.replace('GoalSelection');
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation, session, authLoading, entitlements, entitlementsLoading]);

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <Image
          source={require('../assets/splashlogo.png')}
          style={styles.logo}
          resizeMode="contain"
          onLoad={() => console.log('Splash logo loaded successfully')}
          onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2A38',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginTop: -40, // Position cloud slightly above center
  },
  logo: {
    width: 220,
    height: 220,
  },
});

export default SplashScreen;
