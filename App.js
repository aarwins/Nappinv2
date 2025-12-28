import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { PersonalizationProvider } from './components/PersonalizationProvider';
import { EntitlementsProvider, useEntitlements } from './context/EntitlementsProvider';
import { useAuth } from './hooks/useAuth';
import { navigationRef } from './navigationRef';

// Ensure WebBrowser auth sessions are completed correctly for OAuth flows
WebBrowser.maybeCompleteAuthSession();

// Root navigator structure:
// RootStack (single stack with all screens):
//   - Onboarding screens (Splash → GoalSelection → WellnessFocus → NapEnvironment → NapTiming → DailySchedule → ChooseDevice → AppleWatchSetup → OnboardingAccountEntry) - uses slide_from_right
//   - Auth screens (CreateAccount, EmailSignUp, Login, ForgotPassword, ResetPassword) - uses slide_from_right
//   - Subscription/Paywall screens (PrecisionPaywall, SpecialOffer, NappinAdvancedPaywall, NappinAdvancedSetup, NappinAdvancedSuccess, TrialOffer, TrialNotification) - uses slide_from_right
//   - Main app screens (Home, Features, Profile, History, and all related screens) - uses animation: 'none' (no slide)
// Note: Bottom navigation bar is implemented as inline UI components within screens, not as a Tab Navigator

// Import all screens
import SplashScreen from './screens/SplashScreen';
import GoalSelectionScreen from './screens/GoalSelectionScreen';
import WellnessFocusScreen from './screens/WellnessFocusScreen';
import NapEnvironmentScreen from './screens/NapEnvironmentScreen';
import NapTimingScreen from './screens/NapTimingScreen';
import DailyScheduleScreen from './screens/DailyScheduleScreen';
import ChooseDeviceScreen from './screens/ChooseDeviceScreen';
import AppleWatchSetupScreen from './screens/AppleWatchSetupScreen';
import OnboardingAccountEntryScreen from './screens/OnboardingAccountEntryScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import EmailSignUpScreen from './screens/EmailSignUpScreen';
import LoginScreen from './screens/LoginScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import PrecisionPaywallScreen from './screens/PrecisionPaywallScreen';
import SpecialOfferScreen from './screens/SpecialOfferScreen';
import NappinAdvancedPaywallScreen from './screens/NappinAdvancedPaywallScreen';
import NappinAdvancedPaywallNonAppleScreen from './screens/NappinAdvancedPaywallNonAppleScreen';
import AdvancedSpecialOfferScreen from './screens/AdvancedSpecialOfferScreen';
import NappinAdvancedSetupScreen from './screens/NappinAdvancedSetupScreen';
import NappinAdvancedSuccessScreen from './screens/NappinAdvancedSuccessScreen';

import HomeScreen from './screens/HomeScreen';
import FinalizeNapScreen from './screens/FinalizeNapScreen';
import NapInProgressScreen from './screens/NapInProgressScreen';
import NapCompleteScreen from './screens/NapCompleteScreen';
import NapHistoryScreen from './screens/NapHistoryScreen';
import NapShareScreen from './screens/NapShareScreen';
import FeaturesScreen from './screens/FeaturesScreen';
import SoundsScreen from './screens/SoundsScreen';
import BreathingExerciseScreen from './screens/BreathingExerciseScreen';
import FocusExerciseScreen from './screens/FocusExerciseScreen';
import NapSchedulerScreen from './screens/NapSchedulerScreen';
import CustomNapReminderScreen from './screens/CustomNapReminderScreen';
import JournalScreen from './screens/JournalScreen';
import NewJournalEntryScreen from './screens/NewJournalEntryScreen';
import JournalEntryDetailScreen from './screens/JournalEntryDetailScreen';
import DailyNapPlannerScreen from './screens/DailyNapPlannerScreen';
import ProfileScreen from './screens/ProfileScreen';
import AccountScreen from './screens/AccountScreen';
import EditDisplayNameScreen from './screens/EditDisplayNameScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import NappinAiDataScreen from './screens/NappinAiDataScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import IntegrationsScreen from './screens/IntegrationsScreen';
import AppPreferencesScreen from './screens/AppPreferencesScreen';
import DataAndLegalScreen from './screens/DataAndLegalScreen';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';
import TermsOfUseScreen from './screens/TermsOfUseScreen';
import TrialOfferScreen from './screens/TrialOfferScreen';
import TrialNotificationScreen from './screens/TrialNotificationScreen';

const RootStack = createNativeStackNavigator();

// Root Stack: All screens registered here, with animation controlled per screen
// Onboarding/Auth/Subscription screens use slide_from_right
// Main app screens (Home, Features, Profile, History, etc.) use animation: 'none'
function AppStack() {
  return (
    <RootStack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right', // Default: slide for onboarding/auth/subscription
      }}
    >
      {/* Onboarding screens - use slide animation */}
      <RootStack.Screen name="Splash" component={SplashScreen} options={{ gestureEnabled: false }} />
      <RootStack.Screen name="GoalSelection" component={GoalSelectionScreen} options={{ gestureEnabled: false }} />
      <RootStack.Screen name="WellnessFocus" component={WellnessFocusScreen} options={{ gestureEnabled: false }} />
      <RootStack.Screen name="NapEnvironment" component={NapEnvironmentScreen} options={{ gestureEnabled: false }} />
      <RootStack.Screen name="NapTiming" component={NapTimingScreen} options={{ gestureEnabled: false }} />
      <RootStack.Screen name="DailySchedule" component={DailyScheduleScreen} options={{ gestureEnabled: false }} />
      <RootStack.Screen name="ChooseDevice" component={ChooseDeviceScreen} options={{ gestureEnabled: false }} />
      <RootStack.Screen name="AppleWatchSetup" component={AppleWatchSetupScreen} options={{ gestureEnabled: false }} />
      <RootStack.Screen name="OnboardingAccountEntry" component={OnboardingAccountEntryScreen} options={{ gestureEnabled: false }} />

      {/* Auth screens - use slide animation */}
      <RootStack.Screen name="CreateAccount" component={CreateAccountScreen} options={{ gestureEnabled: false }} />
      <RootStack.Screen name="EmailSignUp" component={EmailSignUpScreen} options={{ gestureEnabled: false }} />
      <RootStack.Screen name="Login" component={LoginScreen} options={{ gestureEnabled: false }} />
      <RootStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ gestureEnabled: false }} />
      <RootStack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ gestureEnabled: false }} />

      {/* Subscription/Paywall screens - use slide animation */}
      <RootStack.Screen name="PrecisionPaywall" component={PrecisionPaywallScreen} options={{ gestureEnabled: false }} />
      <RootStack.Screen name="SpecialOffer" component={SpecialOfferScreen} options={{ gestureEnabled: false }} />
      <RootStack.Screen name="NappinAdvancedPaywall" component={NappinAdvancedPaywallScreen} options={{ gestureEnabled: false }} />
      <RootStack.Screen name="NappinAdvancedPaywallNonApple" component={NappinAdvancedPaywallNonAppleScreen} options={{ gestureEnabled: false }} />
      <RootStack.Screen name="AdvancedSpecialOffer" component={AdvancedSpecialOfferScreen} options={{ gestureEnabled: false }} />
      <RootStack.Screen name="NappinAdvancedSetup" component={NappinAdvancedSetupScreen} options={{ gestureEnabled: false }} />
      <RootStack.Screen name="NappinAdvancedSuccess" component={NappinAdvancedSuccessScreen} options={{ gestureEnabled: false }} />
      <RootStack.Screen name="TrialOffer" component={TrialOfferScreen} options={{ gestureEnabled: false }} />
      <RootStack.Screen name="TrialNotification" component={TrialNotificationScreen} options={{ gestureEnabled: false }} />

      {/* Main app screens - NO slide animation */}
      <RootStack.Screen name="Home" component={HomeScreen} options={{ animation: 'none' }} />
      <RootStack.Screen name="FinalizeNap" component={FinalizeNapScreen} options={{ animation: 'none' }} />
      <RootStack.Screen name="NapInProgress" component={NapInProgressScreen} options={{ animation: 'none' }} />
      <RootStack.Screen name="NapComplete" component={NapCompleteScreen} options={{ animation: 'none' }} />
      <RootStack.Screen name="NapHistory" component={NapHistoryScreen} options={{ animation: 'none' }} />
      <RootStack.Screen name="NapShareScreen" component={NapShareScreen} options={{ animation: 'none' }} />
      <RootStack.Screen name="Features" component={FeaturesScreen} options={{ animation: 'none' }} />
      <RootStack.Screen name="Sounds" component={SoundsScreen} options={{ animation: 'none' }} />
      <RootStack.Screen name="BreathingExercise" component={BreathingExerciseScreen} options={{ animation: 'none' }} />
      <RootStack.Screen name="FocusExercise" component={FocusExerciseScreen} options={{ animation: 'none' }} />
      <RootStack.Screen name="NapScheduler" component={NapSchedulerScreen} options={{ animation: 'none' }} />
      <RootStack.Screen name="CustomNapReminder" component={CustomNapReminderScreen} options={{ animation: 'none' }} />
      <RootStack.Screen name="Journal" component={JournalScreen} options={{ animation: 'none' }} />
      <RootStack.Screen name="NewJournalEntry" component={NewJournalEntryScreen} options={{ animation: 'none' }} />
      <RootStack.Screen name="JournalEntryDetail" component={JournalEntryDetailScreen} options={{ animation: 'none' }} />
      <RootStack.Screen name="DailyNapPlanner" component={DailyNapPlannerScreen} options={{ animation: 'none' }} />
      <RootStack.Screen name="Profile" component={ProfileScreen} options={{ animation: 'none' }} />
      <RootStack.Screen name="Account" component={AccountScreen} options={{ animation: 'none' }} />
      <RootStack.Screen name="EditDisplayName" component={EditDisplayNameScreen} options={{ animation: 'none' }} />
      <RootStack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ animation: 'none' }} />
      <RootStack.Screen name="NappinAiData" component={NappinAiDataScreen} options={{ animation: 'none' }} />
      <RootStack.Screen name="Notifications" component={NotificationsScreen} options={{ animation: 'none' }} />
      <RootStack.Screen name="Integrations" component={IntegrationsScreen} options={{ animation: 'none' }} />
      <RootStack.Screen name="AppPreferences" component={AppPreferencesScreen} options={{ animation: 'none' }} />
      <RootStack.Screen name="DataAndLegal" component={DataAndLegalScreen} options={{ animation: 'none' }} />
      <RootStack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={{ animation: 'none' }} />
      <RootStack.Screen name="TermsOfUse" component={TermsOfUseScreen} options={{ animation: 'none' }} />
    </RootStack.Navigator>
  );
}

// Inner component that can use hooks
function AppContent() {
  const { session, loading: authLoading } = useAuth();
  const { entitlements, loading: entitlementsLoading } = useEntitlements();

  useEffect(() => {
    console.log('[App] mounted');
  }, []);

  // Manual deep-link handler for password reset
  // This intercepts URLs matching nappin://reset-password... and navigates directly
  useEffect(() => {
    const handleDeepLink = (url) => {
      console.log('[DeepLink] Received URL:', url);

      // First parse with expo-linking
      const parsed = Linking.parse(url);
      console.log('[DeepLink] Parsed:', parsed);

      const { path, hostname, queryParams, scheme } = parsed;

      // Some environments put "reset-password" in hostname instead of path
      const routeSegment = path || hostname;

      // Try to get token from query first
      let token =
        queryParams?.access_token ||
        queryParams?.token ||
        queryParams?.refresh_token ||
        null;

      // Supabase often puts values in the fragment (#...)
      if (!token && url.includes('#')) {
        try {
          const hash = url.split('#')[1];
          const hashParams = new URLSearchParams(hash);
          token =
            hashParams.get('access_token') ||
            hashParams.get('token') ||
            hashParams.get('refresh_token') ||
            token;
        } catch (e) {
          console.log('[DeepLink] Failed to parse hash params:', e);
        }
      }

      console.log('[DeepLink] routeSegment:', routeSegment, 'token:', token);

      // Check if this is a reset-password link
      if (routeSegment === 'reset-password') {
        console.log('[DeepLink] reset-password token:', token);

        // Wait for navigation to be ready, then reset to ResetPassword screen
        const tryNavigate = () => {
          if (navigationRef.isReady() && token) {
            console.log('[DeepLink] Resetting navigation to ResetPassword with token:', token);
            // Use reset() to replace the entire navigation stack with ResetPassword
            // This ensures the Reset Password screen is always the top route
            navigationRef.reset({
              index: 0,
              routes: [
                {
                  name: 'ResetPassword',
                  params: { access_token: token },
                },
              ],
            });
          } else if (!token) {
            console.log('[DeepLink] No token found in reset-password link');
          } else {
            // Retry after a short delay if navigation isn't ready yet
            console.log('[DeepLink] Navigation not ready yet, retrying...');
            setTimeout(tryNavigate, 100);
          }
        };

        // Small delay to ensure navigation container is mounted
        setTimeout(tryNavigate, 100);

        // We handled this link completely
        return;
      }
    };

    // Initial URL when app is cold-started
    const getInitialUrl = async () => {
      const initialUrl = await Linking.getInitialURL();
      console.log('[DeepLink] Initial URL:', initialUrl);
      if (initialUrl) {
        handleDeepLink(initialUrl);
      }
    };

    getInitialUrl();

    // Listener for when app is already open
    const subscription = Linking.addEventListener('url', ({ url }) => {
      handleDeepLink(url);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // Navigation gating logic:
  // - If auth/entitlements loading -> show loading screen
  // - If not authenticated -> AppStack handles (shows auth screens)
  // - If authenticated + locked -> AppStack handles (shows paywall screens)
  // - If authenticated + unlocked -> AppStack handles (shows main app)
  // Note: AppStack contains all screens; navigation within AppStack is handled by individual screens
  
  if (authLoading || entitlementsLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#B7AFC5" />
      </View>
    );
  }

  // React Navigation linking configuration for deep links
  // This ensures password reset links (nappin://reset-password?token=XYZ) navigate correctly
  const linking = {
    prefixes: [
      'nappin://',
      'https://wmndnpwmzmendrlfvzug.supabase.co', // Supabase project URL for web fallbacks
    ],
    config: {
      screens: {
        // ResetPassword is registered directly on both AppStack and AuthStack
        // Map the deep link path to the route name
        ResetPassword: 'reset-password',
        // Note: auth-callback URLs are filtered out in subscribe/getInitialURL
        // to prevent React Navigation from resetting to initial route on OAuth callback
      },
    },
    // Handle deep links when app is already open
    subscribe(listener) {
      const onReceiveURL = ({ url }) => {
        console.log('[DeepLink] Received URL:', url);
        // Ignore auth-callback URLs - they're handled by OAuth flow, not navigation
        if (url && url.includes('auth-callback')) {
          console.log('[DeepLink] Ignoring auth-callback URL (handled by OAuth flow)');
          return;
        }
        listener(url);
      };

      // Listen for URL events when app is already running
      const subscription = Linking.addEventListener('url', onReceiveURL);

      return () => {
        subscription.remove();
      };
    },
    // Handle deep links when app is opened from closed state
    async getInitialURL() {
      const url = await Linking.getInitialURL();
      console.log('[DeepLink] Initial URL:', url);
      // Ignore auth-callback URLs - they're handled by OAuth flow, not navigation
      if (url && url.includes('auth-callback')) {
        console.log('[DeepLink] Ignoring auth-callback initial URL (handled by OAuth flow)');
        return null;
      }
      // If there's an initial URL, React Navigation will use it instead of restoring saved state
      // This ensures password reset links work even when app was previously on another screen
      return url;
    },
  };

  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      {/* Always use the original app stack so launch follows the original flow (Splash → onboarding, etc.) */}
      <AppStack />
    </NavigationContainer>
  );
}

// Root App component with providers
export default function App() {
  return (
    <PersonalizationProvider>
      <EntitlementsProvider>
        <AppContent />
      </EntitlementsProvider>
    </PersonalizationProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1E2A38',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
