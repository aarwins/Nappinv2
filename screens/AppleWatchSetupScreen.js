import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Linking,
} from 'react-native';
import { Svg, Path } from 'react-native-svg';

// TODO: Uncomment for Xcode/native build testing
// import AppleHealthKit, { HealthKitPermissions } from 'react-native-health';



const MonitorIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path d="M24 24H0V0H24V24Z" stroke="#E5E7EB"/>
    <Path d="M20 3H4C2.89543 3 2 3.89543 2 5V15C2 16.1046 2.89543 17 4 17H20C21.1046 17 22 16.1046 22 15V5C22 3.89543 21.1046 3 20 3Z" stroke="#1E2A38" strokeWidth="2"/>
    <Path d="M8 21H16" stroke="#1E2A38" strokeWidth="2"/>
    <Path d="M12 17V21" stroke="#1E2A38" strokeWidth="2"/>
  </Svg>
);

const HeartIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path d="M24 24H0V0H24V24Z" stroke="#E5E7EB"/>
    <Path d="M20.84 4.60999C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.60999L12 5.66999L10.94 4.60999C9.90831 3.5783 8.50903 2.9987 7.05 2.9987C5.59097 2.9987 4.19169 3.5783 3.16 4.60999C2.12831 5.64169 1.54871 7.04096 1.54871 8.49999C1.54871 9.95903 2.12831 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7564 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.49999C22.4518 7.77751 22.3095 7.0621 22.0329 6.39464C21.7564 5.72718 21.351 5.12075 20.84 4.60999Z" stroke="#1E2A38" strokeWidth="2"/>
  </Svg>
);

const ToggleSwitch = ({ isEnabled }) => (
  <View style={[styles.toggleContainer, isEnabled && styles.toggleContainerEnabled]}>
    <View style={[styles.toggleCircle, isEnabled && styles.toggleCircleEnabled]} />
  </View>
);

const ChecklistItem = ({ icon, title, isEnabled = false, onPress = null }) => (
  <TouchableOpacity
    style={styles.checklistItem}
    onPress={onPress}
    disabled={!onPress}
    activeOpacity={onPress ? 0.7 : 1}
  >
    <View style={styles.checklistContent}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={styles.checklistTitle}>{title}</Text>
    </View>
    <ToggleSwitch isEnabled={isEnabled} />
  </TouchableOpacity>
);

export default function AppleWatchSetupScreen({ navigation }) {
  const [watchAppDownloaded, setWatchAppDownloaded] = useState(false);
  const [healthDataAllowed, setHealthDataAllowed] = useState(false);



  const handleDone = () => {
    // Check if both steps are completed before navigating
    if (watchAppDownloaded && healthDataAllowed) {
      navigation.navigate('NappinAdvancedSetup');
    } else {
      console.log('Please complete both setup steps before continuing');
      // TODO: Show alert to user that both steps need to be completed
    }
  };

  const handleNeedHelp = () => {
    // Open Apple Support page for downloading apps on Apple Watch
    Linking.openURL('https://support.apple.com/en-us/109023');
  };

  // Simulate checking for Apple Watch app installation
  const checkWatchAppInstallation = () => {
    // In a real implementation, you would check if the app is installed on the watch
    // For now, we'll toggle it after a short delay to simulate detection
    setTimeout(() => {
      setWatchAppDownloaded(true);
    }, 2000);
  };

  // Initialize HealthKit and request permissions
  const initializeHealthKit = () => {
    // TODO: Uncomment for Xcode/native build testing
    /*
    const permissions = {
      permissions: {
        read: [
          AppleHealthKit.Constants.Permissions.HeartRate,
          AppleHealthKit.Constants.Permissions.Steps,
          AppleHealthKit.Constants.Permissions.SleepAnalysis,
        ],
      },
    };

    AppleHealthKit.initHealthKit(permissions, (error) => {
      if (error) {
        console.log('[ERROR] Cannot grant permissions!');
        Alert.alert(
          'Health Access Required',
          'Nappin needs access to your health data to provide accurate sleep insights. Please enable health data access in the settings.',
          [{ text: 'OK' }]
        );
        return;
      }

      // Check if permissions were granted
      checkHealthDataPermissions();
    });
    */

    // Expo fallback - simple simulation
    console.log('Health permissions would be requested here (disabled for Expo)');
    setTimeout(() => {
      setHealthDataAllowed(true);
    }, 1000);
  };

  // Check current health data permissions
  const checkHealthDataPermissions = () => {
    // TODO: Uncomment for Xcode/native build testing
    /*
    AppleHealthKit.getAuthStatus(AppleHealthKit.Constants.Permissions.HeartRate, (error, status) => {
      if (error) {
        console.log('[ERROR] Cannot check health permission status');
        return;
      }

      // Set toggle to true if permission is granted
      setHealthDataAllowed(status === AppleHealthKit.Constants.AuthorizationStatus.SharingAuthorized);
    });
    */

    // Expo fallback - simple simulation
    console.log('Health permission status would be checked here (disabled for Expo)');
    setTimeout(() => {
      setHealthDataAllowed(true);
    }, 3000);
  };

  // Start checking for completion when component mounts
  React.useEffect(() => {
    checkWatchAppInstallation();
    // Health permissions will be requested when user taps the health data item
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Apple Watch Setup</Text>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Title */}
          <Text style={styles.mainTitle}>Just two quick steps!</Text>

          {/* Checklist Container */}
          <View style={styles.checklistContainer}>
            <ChecklistItem
              icon={<MonitorIcon />}
              title="Download the Nappin app on your Apple Watch"
              isEnabled={watchAppDownloaded}
            />

            <View style={styles.separator} />

            <ChecklistItem
              icon={<HeartIcon />}
              title="Allow health data access"
              isEnabled={healthDataAllowed}
              onPress={initializeHealthKit}
            />
          </View>

          {/* Done Button */}
          <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>

          {/* Help Link */}
          <TouchableOpacity style={styles.helpLink} onPress={handleNeedHelp}>
            <Text style={styles.helpLinkText}>Need help? Learn how to pair here →</Text>
          </TouchableOpacity>
        </View>

        {/* Footer Message */}
        <Text style={styles.footerMessage}>
          You can change your permission settings anytime in the settings page.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2A38',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    height: 48,
    backgroundColor: '#1E2A38',
    marginTop: 48,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FDFDFD',
    fontFamily: 'Inter',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 60,
    flex: 1,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FDFDFD',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 44,
    fontFamily: 'Inter',
  },
  checklistContainer: {
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    paddingVertical: 0,
    paddingHorizontal: 16,
    marginBottom: 36,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 16,
    minHeight: 56,
  },
  checklistContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  iconContainer: {
    width: 24,
    height: 24,
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checklistTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E2A38',
    lineHeight: 24,
    fontFamily: 'Inter',
    flex: 1,
    marginRight: 12,
    flexWrap: 'wrap',
  },
  toggleContainer: {
    width: 32,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#8B7A99',
    padding: 2,
    justifyContent: 'center',
    marginTop: 2,
  },
  toggleContainerEnabled: {
    backgroundColor: '#B7AFC5',
  },
  toggleCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FDFDFD',
    alignSelf: 'flex-start',
  },
  toggleCircleEnabled: {
    alignSelf: 'flex-end',
  },
  separator: {
    height: 1,
    backgroundColor: '#FDFDFD',
    opacity: 0.2,
    marginHorizontal: 0,
  },
  doneButton: {
    backgroundColor: '#B7AFC5',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    marginBottom: 19,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
  },
  doneButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FDFDFD',
    fontFamily: 'Inter',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  helpLink: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 20,
  },
  helpLinkText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#B7AFC5',
    fontFamily: 'Inter',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  footerMessage: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FDFDFD',
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: 'Inter',
    paddingHorizontal: 28,
    paddingTop: 30,
    paddingBottom: 58,
    marginTop: 'auto',
  },
});
