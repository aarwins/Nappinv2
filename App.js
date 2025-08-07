import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PersonalizationProvider } from './components/PersonalizationProvider';

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
import LoginScreen from './screens/LoginScreen';
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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PersonalizationProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} options={{ gestureEnabled: false }} />
          <Stack.Screen name="GoalSelection" component={GoalSelectionScreen} options={{ gestureEnabled: false }} />
          <Stack.Screen name="WellnessFocus" component={WellnessFocusScreen} options={{ gestureEnabled: false }} />
          <Stack.Screen name="NapEnvironment" component={NapEnvironmentScreen} options={{ gestureEnabled: false }} />
          <Stack.Screen name="NapTiming" component={NapTimingScreen} options={{ gestureEnabled: false }} />
          <Stack.Screen name="DailySchedule" component={DailyScheduleScreen} options={{ gestureEnabled: false }} />
          <Stack.Screen name="ChooseDevice" component={ChooseDeviceScreen} options={{ gestureEnabled: false }} />
          <Stack.Screen name="AppleWatchSetup" component={AppleWatchSetupScreen} options={{ gestureEnabled: false }} />
          <Stack.Screen name="OnboardingAccountEntry" component={OnboardingAccountEntryScreen} options={{ gestureEnabled: false }} />
          <Stack.Screen name="CreateAccount" component={CreateAccountScreen} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ gestureEnabled: false }} />
          <Stack.Screen name="PrecisionPaywall" component={PrecisionPaywallScreen} options={{ gestureEnabled: false }} />
          <Stack.Screen name="SpecialOffer" component={SpecialOfferScreen} options={{ gestureEnabled: false }} />
          <Stack.Screen name="NappinAdvancedPaywall" component={NappinAdvancedPaywallScreen} options={{ gestureEnabled: false }} />
          <Stack.Screen name="NappinAdvancedPaywallNonApple" component={NappinAdvancedPaywallNonAppleScreen} options={{ gestureEnabled: false }} />
          <Stack.Screen name="AdvancedSpecialOffer" component={AdvancedSpecialOfferScreen} options={{ gestureEnabled: false }} />
          <Stack.Screen name="NappinAdvancedSetup" component={NappinAdvancedSetupScreen} options={{ gestureEnabled: false }} />
          <Stack.Screen name="NappinAdvancedSuccess" component={NappinAdvancedSuccessScreen} options={{ gestureEnabled: false }} />

          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="FinalizeNap" component={FinalizeNapScreen} options={{ gestureEnabled: false }} />
          <Stack.Screen name="NapInProgress" component={NapInProgressScreen} options={{ gestureEnabled: false }} />
          <Stack.Screen name="NapComplete" component={NapCompleteScreen} />
          <Stack.Screen name="NapHistory" component={NapHistoryScreen} />
          <Stack.Screen name="NapShareScreen" component={NapShareScreen} />
          <Stack.Screen name="Features" component={FeaturesScreen} />
          <Stack.Screen name="Sounds" component={SoundsScreen} />
          <Stack.Screen name="BreathingExercise" component={BreathingExerciseScreen} />
          <Stack.Screen name="FocusExercise" component={FocusExerciseScreen} />
          <Stack.Screen name="NapScheduler" component={NapSchedulerScreen} />
          <Stack.Screen name="CustomNapReminder" component={CustomNapReminderScreen} />
          <Stack.Screen name="Journal" component={JournalScreen} />
          <Stack.Screen name="NewJournalEntry" component={NewJournalEntryScreen} />
          <Stack.Screen name="JournalEntryDetail" component={JournalEntryDetailScreen} />
          <Stack.Screen name="DailyNapPlanner" component={DailyNapPlannerScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Account" component={AccountScreen} />
          <Stack.Screen name="EditDisplayName" component={EditDisplayNameScreen} />
          <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
          <Stack.Screen name="NappinAiData" component={NappinAiDataScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="Integrations" component={IntegrationsScreen} />
          <Stack.Screen name="AppPreferences" component={AppPreferencesScreen} />
          <Stack.Screen name="DataAndLegal" component={DataAndLegalScreen} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
          <Stack.Screen name="TermsOfUse" component={TermsOfUseScreen} />
          <Stack.Screen name="TrialOffer" component={TrialOfferScreen} options={{ gestureEnabled: false }} />
          <Stack.Screen name="TrialNotification" component={TrialNotificationScreen} options={{ gestureEnabled: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PersonalizationProvider>
  );
}
