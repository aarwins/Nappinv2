import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Alert,
} from 'react-native';
import { Svg, Path, G, Defs, ClipPath } from 'react-native-svg';

// Back arrow icon for header
const BackArrowIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M0.439453 10.9441C-0.146484 11.5301 -0.146484 12.4816 0.439453 13.0676L7.93945 20.5676C8.52539 21.1535 9.47695 21.1535 10.0629 20.5676C10.6488 19.9816 10.6488 19.0301 10.0629 18.4441L5.11758 13.5035H19.4988C20.3285 13.5035 20.9988 12.8332 20.9988 12.0035C20.9988 11.1738 20.3285 10.5035 19.4988 10.5035H5.12227L10.0582 5.56289C10.6441 4.97695 10.6441 4.02539 10.0582 3.43945C9.47227 2.85352 8.5207 2.85352 7.93477 3.43945L0.434766 10.9395L0.439453 10.9441Z"
      fill="#FDFDFD"
    />
  </Svg>
);

// Apple Health icon (heart)
const AppleHealthIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M2.23125 14.0813L10.7016 21.9891C11.0531 22.3172 11.5172 22.5 12 22.5C12.4828 22.5 12.9469 22.3172 13.2984 21.9891L21.7687 14.0813C23.1938 12.7547 24 10.8938 24 8.94844V8.67657C24 5.40001 21.6328 2.60626 18.4031 2.06719C16.2656 1.71094 14.0906 2.40938 12.5625 3.93751L12 4.50001L11.4375 3.93751C9.90938 2.40938 7.73438 1.71094 5.59688 2.06719C2.36719 2.60626 0 5.40001 0 8.67657V8.94844C0 10.8938 0.80625 12.7547 2.23125 14.0813Z"
      fill="#1E2A38"
    />
  </Svg>
);

// Apple Watch icon (clock)
const AppleWatchIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <G clipPath="url(#clip0_300_1418)">
      <Path
        d="M21.75 12C21.75 14.5859 20.7228 17.0658 18.8943 18.8943C17.0658 20.7228 14.5859 21.75 12 21.75C9.41414 21.75 6.93419 20.7228 5.10571 18.8943C3.27723 17.0658 2.25 14.5859 2.25 12C2.25 9.41414 3.27723 6.93419 5.10571 5.10571C6.93419 3.27723 9.41414 2.25 12 2.25C14.5859 2.25 17.0658 3.27723 18.8943 5.10571C20.7228 6.93419 21.75 9.41414 21.75 12ZM0 12C0 15.1826 1.26428 18.2348 3.51472 20.4853C5.76516 22.7357 8.8174 24 12 24C15.1826 24 18.2348 22.7357 20.4853 20.4853C22.7357 18.2348 24 15.1826 24 12C24 8.8174 22.7357 5.76516 20.4853 3.51472C18.2348 1.26428 15.1826 0 12 0C8.8174 0 5.76516 1.26428 3.51472 3.51472C1.26428 5.76516 0 8.8174 0 12ZM10.875 5.625V12C10.875 12.375 11.0625 12.7266 11.3766 12.9375L15.8766 15.9375C16.3922 16.2844 17.0906 16.1437 17.4375 15.6234C17.7844 15.1031 17.6437 14.4094 17.1234 14.0625L13.125 11.4V5.625C13.125 5.00156 12.6234 4.5 12 4.5C11.3766 4.5 10.875 5.00156 10.875 5.625Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_300_1418">
        <Path d="M0 0H24V24H0V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);



// Custom toggle switch component (improved visibility)
const ToggleSwitch = ({ isEnabled, onToggle, testID }) => {
  return (
    <TouchableOpacity
      style={[
        styles.toggleContainer,
        { backgroundColor: isEnabled ? '#B7AFC5' : '#6B7280' }
      ]}
      onPress={onToggle}
      activeOpacity={0.8}
      testID={testID}
    >
      <View
        style={[
          styles.toggleCircle,
          {
            transform: [{ translateX: isEnabled ? 14 : 0 }],
            backgroundColor: isEnabled ? '#FDFDFD' : '#E5E8EC'
          }
        ]}
      />
    </TouchableOpacity>
  );
};

// Integration Item Component
const IntegrationItem = ({ icon, title, subtitle, value, onValueChange, testID, showDivider = true }) => (
  <View>
    <View style={styles.integrationItem}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <View style={styles.integrationContent}>
        <Text style={styles.integrationTitle}>{title}</Text>
        {subtitle && <Text style={styles.integrationSubtitle}>{subtitle}</Text>}
      </View>
      <ToggleSwitch
        isEnabled={value}
        onToggle={() => onValueChange(!value)}
        testID={testID}
      />
    </View>
    {showDivider && <View style={styles.divider} />}
  </View>
);

export default function IntegrationsScreen({ navigation }) {
  const [appleHealthEnabled, setAppleHealthEnabled] = useState(false);
  const [appleWatchEnabled, setAppleWatchEnabled] = useState(false);

  useEffect(() => {
    // Check for existing connections when component mounts
    checkConnectionStatus();
  }, []);

  const checkConnectionStatus = async () => {
    try {
      // Check Apple Health connection status
      // This would typically check if HealthKit permissions are granted
      // For now, we'll simulate based on some stored state or system check
      const healthConnected = await isAppleHealthConnected();
      const watchConnected = await isAppleWatchConnected();
      
      setAppleHealthEnabled(healthConnected);
      setAppleWatchEnabled(watchConnected);
    } catch (error) {
      console.error('Error checking connection status:', error);
    }
  };

  // Mock functions - in a real app these would check actual connection status
  const isAppleHealthConnected = async () => {
    // This would check if HealthKit permissions are granted
    // For demo purposes, we'll return true to show connected state
    return true;
  };

  const isAppleWatchConnected = async () => {
    // This would check if Apple Watch is paired and app is installed
    // For demo purposes, we'll return true to show connected state
    return true;
  };

  const handleAppleHealthToggle = (newValue) => {
    if (!newValue && appleHealthEnabled) {
      // User is trying to disconnect
      Alert.alert(
        'Disconnect Apple Health',
        'Are you sure you want to disconnect from Apple Health? This will stop syncing your health data with Nappin.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Disconnect',
            style: 'destructive',
            onPress: () => {
              setAppleHealthEnabled(false);
              console.log('Apple Health disconnected');
            },
          },
        ],
        { cancelable: true }
      );
    } else {
      // User is trying to connect
      setAppleHealthEnabled(newValue);
      if (newValue) {
        console.log('Apple Health connected');
      }
    }
  };

  const handleAppleWatchToggle = (newValue) => {
    if (!newValue && appleWatchEnabled) {
      // User is trying to disconnect
      Alert.alert(
        'Disconnect Apple Watch',
        'Are you sure you want to disconnect from Apple Watch? This will stop syncing your watch data with Nappin.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Disconnect',
            style: 'destructive',
            onPress: () => {
              setAppleWatchEnabled(false);
              console.log('Apple Watch disconnected');
            },
          },
        ],
        { cancelable: true }
      );
    } else {
      // User is trying to connect
      setAppleWatchEnabled(newValue);
      if (newValue) {
        console.log('Apple Watch connected');
      }
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleManageDevices = () => {
    // Navigate to device selection screen with integration flag
    navigation.navigate('ChooseDevice', { fromIntegrations: true });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <BackArrowIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Integrations</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Integrations Card */}
        <View style={styles.integrationsCard}>
          <IntegrationItem
            icon={<AppleHealthIcon />}
            title="Apple Health"
            subtitle={appleHealthEnabled ? "Connected" : "Not connected"}
            value={appleHealthEnabled}
            onValueChange={handleAppleHealthToggle}
            testID="apple-health-toggle"
          />

          <IntegrationItem
            icon={<AppleWatchIcon />}
            title="Apple Watch (Beta)"
            subtitle={appleWatchEnabled ? "Connected" : "Not connected"}
            value={appleWatchEnabled}
            onValueChange={handleAppleWatchToggle}
            testID="apple-watch-toggle"
            showDivider={false}
          />
        </View>

        {/* Description Text */}
        <Text style={styles.descriptionText}>
          Nappin connects to these apps in order to calculate your sleep. You can disconnect at any time.
        </Text>

        {/* Manage Devices Button */}
        <TouchableOpacity style={styles.manageDevicesButton} onPress={handleManageDevices}>
          <Text style={styles.manageDevicesButtonText}>Manage Devices</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2A38',
  },
  content: {
    flex: 1,
    paddingTop: 48,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28,
    color: '#FDFDFD',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 24,
    height: 24,
  },
  integrationsCard: {
    marginTop: 12,
    marginHorizontal: 16,
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  integrationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  integrationContent: {
    flex: 1,
    justifyContent: 'center',
  },
  integrationTitle: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: '#1E2A38',
  },
  integrationSubtitle: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: '#6B7280',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#1E2A38',
    opacity: 0.2,
    marginLeft: 36,
  },
  toggleContainer: {
    width: 32,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  descriptionText: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20,
    color: '#FDFDFD',
    marginTop: 24,
    marginHorizontal: 32,
    textAlign: 'left',
  },
  manageDevicesButton: {
    backgroundColor: '#B7AFC5',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginTop: 32,
    marginHorizontal: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  manageDevicesButtonText: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    color: '#FDFDFD',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
