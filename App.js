import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
