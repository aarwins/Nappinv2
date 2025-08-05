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
import NappinFreeScreen from './screens/NappinFreeScreen';
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
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="GoalSelection" component={GoalSelectionScreen} />
          <Stack.Screen name="WellnessFocus" component={WellnessFocusScreen} />
          <Stack.Screen name="NapEnvironment" component={NapEnvironmentScreen} />
          <Stack.Screen name="NapTiming" component={NapTimingScreen} />
          <Stack.Screen name="DailySchedule" component={DailyScheduleScreen} />
          <Stack.Screen name="ChooseDevice" component={ChooseDeviceScreen} />
          <Stack.Screen name="AppleWatchSetup" component={AppleWatchSetupScreen} />
          <Stack.Screen name="OnboardingAccountEntry" component={OnboardingAccountEntryScreen} />
          <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="PrecisionPaywall" component={PrecisionPaywallScreen} />
          <Stack.Screen name="SpecialOffer" component={SpecialOfferScreen} />
          <Stack.Screen name="NappinAdvancedPaywall" component={NappinAdvancedPaywallScreen} />
          <Stack.Screen name="NappinAdvancedPaywallNonApple" component={NappinAdvancedPaywallNonAppleScreen} />
          <Stack.Screen name="AdvancedSpecialOffer" component={AdvancedSpecialOfferScreen} />
          <Stack.Screen name="NappinAdvancedSetup" component={NappinAdvancedSetupScreen} />
          <Stack.Screen name="NappinAdvancedSuccess" component={NappinAdvancedSuccessScreen} />
          <Stack.Screen name="NappinFree" component={NappinFreeScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="FinalizeNap" component={FinalizeNapScreen} />
          <Stack.Screen name="NapInProgress" component={NapInProgressScreen} />
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
        </Stack.Navigator>
      </NavigationContainer>
    </PersonalizationProvider>
  );
}
