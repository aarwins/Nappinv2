import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { usePersonalization } from '../components/PersonalizationProvider';

// Back arrow icon for header
const BackArrowIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M0.439453 10.9441C-0.146484 11.5301 -0.146484 12.4816 0.439453 13.0676L7.93945 20.5676C8.52539 21.1535 9.47695 21.1535 10.0629 20.5676C10.6488 19.9816 10.6488 19.0301 10.0629 18.4441L5.11758 13.5035H19.4988C20.3285 13.5035 20.9988 12.8332 20.9988 12.0035C20.9988 11.1738 20.3285 10.5035 19.4988 10.5035H5.12227L10.0582 5.56289C10.6441 4.97695 10.6441 4.02539 10.0582 3.43945C9.47227 2.85352 8.5207 2.85352 7.93477 3.43945L0.434766 10.9395L0.439453 10.9441Z"
      fill="#FDFDFD"
    />
  </Svg>
);



// Custom toggle switch component (improved visibility)
const ToggleSwitch = ({ isEnabled, onToggle }) => {
  return (
    <TouchableOpacity
      style={[
        styles.toggleContainer,
        { backgroundColor: isEnabled ? '#B7AFC5' : '#6B7280' }
      ]}
      onPress={onToggle}
      activeOpacity={0.8}
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

export default function AppPreferencesScreen({ navigation }) {
  const { 
    vibrationEnabled, 
    setVibrationEnabled 
  } = usePersonalization();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleVibrationToggle = () => {
    setVibrationEnabled(!vibrationEnabled);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <BackArrowIcon />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>App Preferences</Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>

        {/* Vibration Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Vibration</Text>
          
          <View style={styles.settingCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Vibration on Wake</Text>
                <Text style={styles.settingSubtitle}>
                  Vibrate when nap timer completes
                </Text>
              </View>
              <ToggleSwitch
                isEnabled={vibrationEnabled}
                onToggle={handleVibrationToggle}
              />
            </View>
          </View>
        </View>

        {/* Description Text */}
        <Text style={styles.descriptionText}>
          Control how Nappin behaves when your nap timer ends. Vibration works alongside your selected wake tone.
        </Text>
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
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    marginLeft: -24,
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
  settingsSection: {
    marginTop: 24,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FDFDFD',
    fontFamily: 'Inter',
    marginBottom: 16,
    marginHorizontal: 16,
  },
  settingCard: {
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
  },
  settingContent: {
    flex: 1,
    justifyContent: 'center',
  },
  settingTitle: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    color: '#1E2A38',
  },
  settingSubtitle: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: '#6B7280',
    marginTop: 2,
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
});