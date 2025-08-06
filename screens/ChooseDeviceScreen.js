import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Svg, Path, G, Defs, ClipPath } from 'react-native-svg';

const BackArrowIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M0.439453 10.9441C-0.146484 11.5301 -0.146484 12.4816 0.439453 13.0676L7.93945 20.5676C8.52539 21.1535 9.47695 21.1535 10.0629 20.5676C10.6488 19.9816 10.6488 19.0301 10.0629 18.4441L5.11758 13.5035H19.4988C20.3285 13.5035 20.9988 12.8332 20.9988 12.0035C20.9988 11.1738 20.3285 10.5035 19.4988 10.5035H5.12227L10.0582 5.56289C10.6441 4.97695 10.6441 4.02539 10.0582 3.43945C9.47227 2.85352 8.5207 2.85352 7.93477 3.43945L0.434766 10.9395L0.439453 10.9441Z"
      fill="#FDFDFD"
    />
  </Svg>
);

const AppleWatchIcon = () => (
  <Svg width={48} height={48} viewBox="0 0 49 48" fill="none">
    <Path
      d="M32.902 25.3249C32.8887 22.9488 33.9912 21.1554 36.2229 19.8346C34.9742 18.093 33.0879 17.1348 30.5972 16.947C28.2394 16.7657 25.6623 18.2872 24.7192 18.2872C23.7229 18.2872 21.4381 17.0118 19.6448 17.0118C15.9386 17.07 12 19.8929 12 25.6357C12 27.3319 12.3188 29.0844 12.9564 30.8929C13.8066 33.269 16.8751 39.0959 20.0765 38.9988C21.7503 38.96 22.9325 37.8399 25.1111 37.8399C27.2232 37.8399 28.3191 38.9988 30.1854 38.9988C33.4134 38.9535 36.1897 33.6574 37 31.2749C32.6695 29.2872 32.902 25.4479 32.902 25.3249ZM29.1427 14.6939C30.9559 12.5962 30.7899 10.6863 30.7367 10C29.136 10.0906 27.2829 11.0618 26.2269 12.2596C25.0646 13.5415 24.3804 15.1277 24.5266 16.9147C26.2601 17.0441 27.8409 16.1766 29.1427 14.6939Z"
      fill="#1E2A38"
    />
  </Svg>
);

const FitbitIcon = () => (
  <Svg width={48} height={48} viewBox="0 0 49 48" fill="none">
    <Path
      d="M24.5 14C25.6046 14 26.5 13.1046 26.5 12C26.5 10.8954 25.6046 10 24.5 10C23.3954 10 22.5 10.8954 22.5 12C22.5 13.1046 23.3954 14 24.5 14Z"
      fill="#1E2A38"
    />
    <Path
      d="M18.5 20C19.6046 20 20.5 19.1046 20.5 18C20.5 16.8954 19.6046 16 18.5 16C17.3954 16 16.5 16.8954 16.5 18C16.5 19.1046 17.3954 20 18.5 20Z"
      fill="#1E2A38"
    />
    <Path
      d="M24.5 20C25.6046 20 26.5 19.1046 26.5 18C26.5 16.8954 25.6046 16 24.5 16C23.3954 16 22.5 16.8954 22.5 18C22.5 19.1046 23.3954 20 24.5 20Z"
      fill="#1E2A38"
    />
    <Path
      d="M30.5 20C31.6046 20 32.5 19.1046 32.5 18C32.5 16.8954 31.6046 16 30.5 16C29.3954 16 28.5 16.8954 28.5 18C28.5 19.1046 29.3954 20 30.5 20Z"
      fill="#1E2A38"
    />
    <Path
      d="M12.5 26C13.6046 26 14.5 25.1046 14.5 24C14.5 22.8954 13.6046 22 12.5 22C11.3954 22 10.5 22.8954 10.5 24C10.5 25.1046 11.3954 26 12.5 26Z"
      fill="#1E2A38"
    />
    <Path
      d="M18.5 26C19.6046 26 20.5 25.1046 20.5 24C20.5 22.8954 19.6046 22 18.5 22C17.3954 22 16.5 22.8954 16.5 24C16.5 25.1046 17.3954 26 18.5 26Z"
      fill="#1E2A38"
    />
    <Path
      d="M24.5 26C25.6046 26 26.5 25.1046 26.5 24C26.5 22.8954 25.6046 22 24.5 22C23.3954 22 22.5 22.8954 22.5 24C22.5 25.1046 23.3954 26 24.5 26Z"
      fill="#1E2A38"
    />
    <Path
      d="M30.5 26C31.6046 26 32.5 25.1046 32.5 24C32.5 22.8954 31.6046 22 30.5 22C29.3954 22 28.5 22.8954 28.5 24C28.5 25.1046 29.3954 26 30.5 26Z"
      fill="#1E2A38"
    />
    <Path
      d="M36.5 26C37.6046 26 38.5 25.1046 38.5 24C38.5 22.8954 37.6046 22 36.5 22C35.3954 22 34.5 22.8954 34.5 24C34.5 25.1046 35.3954 26 36.5 26Z"
      fill="#1E2A38"
    />
    <Path
      d="M18.5 32C19.6046 32 20.5 31.1046 20.5 30C20.5 28.8954 19.6046 28 18.5 28C17.3954 28 16.5 28.8954 16.5 30C16.5 31.1046 17.3954 32 18.5 32Z"
      fill="#1E2A38"
    />
    <Path
      d="M24.5 32C25.6046 32 26.5 31.1046 26.5 30C26.5 28.8954 25.6046 28 24.5 28C23.3954 28 22.5 28.8954 22.5 30C22.5 31.1046 23.3954 32 24.5 32Z"
      fill="#1E2A38"
    />
    <Path
      d="M30.5 32C31.6046 32 32.5 31.1046 32.5 30C32.5 28.8954 31.6046 28 30.5 28C29.3954 28 28.5 28.8954 28.5 30C28.5 31.1046 29.3954 32 30.5 32Z"
      fill="#1E2A38"
    />
    <Path
      d="M24.5 38C25.6046 38 26.5 37.1046 26.5 36C26.5 34.8954 25.6046 34 24.5 34C23.3954 34 22.5 34.8954 22.5 36C22.5 37.1046 23.3954 38 24.5 38Z"
      fill="#1E2A38"
    />
  </Svg>
);

const OuraRingIcon = () => (
  <Svg width={48} height={48} viewBox="0 0 49 48" fill="none">
    <Path
      d="M24.5 40C31.6797 40 37.5 34.5496 37.5 27.8261C37.5 21.1026 31.6797 15.6522 24.5 15.6522C17.3203 15.6522 11.5 21.1026 11.5 27.8261C11.5 34.5496 17.3203 40 24.5 40Z"
      stroke="#1E2A38"
      strokeWidth="4"
      fill="none"
    />
    <Path
      d="M29.7 10H19.3V12.4348H29.7V10Z"
      fill="#1E2A38"
    />
  </Svg>
);

const GarminIcon = () => (
  <Svg width={48} height={48} viewBox="0 0 49 48" fill="none">
    <Path
      d="M24.5 11L37.5 35H11.5L24.5 11Z"
      fill="#1E2A38"
    />
  </Svg>
);

const ClockIcon = () => (
  <Svg width={30} height={30} viewBox="0 0 31 30" fill="none">
    <G clipPath="url(#clip0_18_37)">
      <Path
        d="M27.6875 15C27.6875 18.2323 26.4035 21.3323 24.1179 23.6179C21.8323 25.9035 18.7323 27.1875 15.5 27.1875C12.2677 27.1875 9.16774 25.9035 6.88214 23.6179C4.59654 21.3323 3.3125 18.2323 3.3125 15C3.3125 11.7677 4.59654 8.66774 6.88214 6.38214C9.16774 4.09654 12.2677 2.8125 15.5 2.8125C18.7323 2.8125 21.8323 4.09654 24.1179 6.38214C26.4035 8.66774 27.6875 11.7677 27.6875 15ZM0.5 15C0.5 18.9782 2.08035 22.7936 4.8934 25.6066C7.70644 28.4196 11.5218 30 15.5 30C19.4782 30 23.2936 28.4196 26.1066 25.6066C28.9196 22.7936 30.5 18.9782 30.5 15C30.5 11.0218 28.9196 7.20644 26.1066 4.3934C23.2936 1.58035 19.4782 0 15.5 0C11.5218 0 7.70644 1.58035 4.8934 4.3934C2.08035 7.20644 0.5 11.0218 0.5 15ZM14.0938 7.03125V15C14.0938 15.4688 14.3281 15.9082 14.7207 16.1719L20.3457 19.9219C20.9902 20.3555 21.8633 20.1797 22.2969 19.5293C22.7305 18.8789 22.5547 18.0117 21.9043 17.5781L16.9062 14.25V7.03125C16.9062 6.25195 16.2793 5.625 15.5 5.625C14.7207 5.625 14.0938 6.25195 14.0938 7.03125Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_18_37">
        <Path d="M0.5 0H30.5V30H0.5V0Z" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

const deviceOptions = [
  {
    id: 'apple-watch',
    title: 'Apple Watch',
    icon: <AppleWatchIcon />,
  },
  {
    id: 'fitbit',
    title: 'Fitbit',
    icon: <FitbitIcon />,
  },
  {
    id: 'oura-ring',
    title: 'Oura Ring',
    icon: <OuraRingIcon />,
  },
  {
    id: 'garmin',
    title: 'Garmin',
    icon: <GarminIcon />,
  },
];

const DeviceCard = ({ device, isSelected, onPress, isFullWidth = false }) => (
  <TouchableOpacity
    style={[
      styles.deviceCard,
      isFullWidth && styles.fullWidthCard,
      isSelected && styles.selectedCard,
    ]}
    onPress={onPress}
  >
    <View style={styles.deviceContent}>
      <View style={styles.iconContainer}>
        {device.icon}
      </View>
      <Text style={styles.deviceText}>{device.title}</Text>
    </View>
  </TouchableOpacity>
);

export default function ChooseDeviceScreen({ navigation, route }) {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const fromIntegrations = route?.params?.fromIntegrations || false;

  const handleDeviceSelect = (deviceId) => {
    setSelectedDevice(deviceId);
  };

  const handleContinue = () => {
    if (selectedDevice) {
      if (fromIntegrations) {
        // Special flow when coming from integrations
        if (selectedDevice === 'apple-watch') {
          // Navigate to PrecisionPaywall for Apple Watch with integration flag
          navigation.navigate('PrecisionPaywall', { fromIntegrations: true });
        } else {
          // For other devices, show Apple Health sync prompt and go to Home
          const deviceName = selectedDevice === 'fitbit' ? 'Fitbit' :
                           selectedDevice === 'oura-ring' ? 'Oura Ring' :
                           selectedDevice === 'garmin' ? 'Garmin' : 'your device';
          
          Alert.alert(
            'Sync with Apple Health',
            `Would you like to sync your ${deviceName} data with Apple Health to improve your nap recommendations?`,
            [
              {
                text: 'Not Now',
                style: 'cancel',
                onPress: () => {
                  console.log('Apple Health sync declined for device:', selectedDevice);
                  navigation.navigate('Home');
                },
              },
              {
                text: 'Sync Data',
                onPress: () => {
                  console.log('Apple Health sync accepted for device:', selectedDevice);
                  // TODO: Implement actual Apple Health sync
                  navigation.navigate('Home');
                },
              },
            ]
          );
        }
      } else {
        // Normal onboarding flow
        if (selectedDevice === 'apple-watch') {
          // Navigate to PrecisionPaywallScreen for Apple Watch
          navigation.navigate('PrecisionPaywall');
        } else {
          // Navigate to NappinAdvancedPaywallNonApple for all other devices
          navigation.navigate('NappinAdvancedPaywallNonApple');
        }
      }
    }
  };

  const handleSkip = () => {
    if (fromIntegrations) {
      // When coming from integrations, skip goes back to Home
      navigation.navigate('Home');
    } else {
      // Normal onboarding flow
      navigation.navigate('NappinAdvancedPaywallNonApple');
    }
  };

  const handleBack = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <BackArrowIcon />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Let's Get You Set Up</Text>
            <Text style={styles.subtitle}>
              Select the device you use to track sleep.
            </Text>
          </View>

          {/* Device Grid */}
          <View style={styles.main}>
            <View style={styles.devicesGrid}>
              {/* 2x2 Grid */}
              <View style={styles.gridRow}>
                <DeviceCard
                  device={deviceOptions[0]}
                  isSelected={selectedDevice === deviceOptions[0].id}
                  onPress={() => handleDeviceSelect(deviceOptions[0].id)}
                />
                <DeviceCard
                  device={deviceOptions[1]}
                  isSelected={selectedDevice === deviceOptions[1].id}
                  onPress={() => handleDeviceSelect(deviceOptions[1].id)}
                />
              </View>
              <View style={styles.gridRow}>
                <DeviceCard
                  device={deviceOptions[2]}
                  isSelected={selectedDevice === deviceOptions[2].id}
                  onPress={() => handleDeviceSelect(deviceOptions[2].id)}
                />
                <DeviceCard
                  device={deviceOptions[3]}
                  isSelected={selectedDevice === deviceOptions[3].id}
                  onPress={() => handleDeviceSelect(deviceOptions[3].id)}
                />
              </View>
            </View>

            {/* Other / Set Up Later - Full Width */}
            <DeviceCard
              device={{
                id: 'other',
                title: 'Other / Set Up Later',
                icon: <ClockIcon />,
              }}
              isSelected={selectedDevice === 'other'}
              onPress={() => handleDeviceSelect('other')}
              isFullWidth={true}
            />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={[
                styles.continueButton,
                selectedDevice && styles.continueButtonEnabled,
              ]}
              onPress={handleContinue}
              disabled={!selectedDevice}
            >
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.skipContainer} onPress={handleSkip}>
              <Text style={styles.skipText}>Skip for now</Text>
            </TouchableOpacity>
          </View>

          {/* Disclaimer */}
          <Text style={styles.disclaimer}>
            You can still use Nappin without connecting a device.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2A38',
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 100,
    zIndex: 1,
    width: 24,
    height: 24,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 19,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FDFDFD',
    textAlign: 'center',
    lineHeight: 35,
    marginBottom: 12,
    fontFamily: 'Inter',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '400',
    color: 'rgba(253, 253, 253, 0.8)',
    textAlign: 'center',
    lineHeight: 23,
    fontFamily: 'Inter',
  },
  main: {
    flex: 1,
    marginBottom: 24,
  },
  devicesGrid: {
    marginBottom: 16,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  deviceCard: {
    width: 153,
    height: 120,
    backgroundColor: '#E5E8EC',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
    // Additional shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  fullWidthCard: {
    width: '100%',
    height: 120,
  },
  selectedCard: {
    backgroundColor: '#B7AFC5',
  },
  deviceContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  iconContainer: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 7,
  },
  deviceText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E2A38',
    textAlign: 'center',
    fontFamily: 'Inter',
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 14,
  },
  continueButton: {
    width: '100%',
    backgroundColor: '#B7AFC5',
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#B7AFC5',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 8,
  },
  continueButtonEnabled: {
    backgroundColor: '#B7AFC5',
  },
  continueText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E5E8EC',
    fontFamily: 'Inter',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  skipContainer: {
    alignItems: 'center',
  },
  skipText: {
    fontSize: 13,
    fontWeight: '700',
    color: 'rgba(253, 253, 253, 0.6)',
    textDecorationLine: 'underline',
    fontFamily: 'Inter',
    lineHeight: 20,
  },
  disclaimer: {
    fontSize: 13,
    fontWeight: '400',
    color: 'rgba(253, 253, 253, 0.6)',
    textAlign: 'center',
    fontFamily: 'Inter',
    lineHeight: 16,
  },
});
