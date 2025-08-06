import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Svg, Path, Circle } from 'react-native-svg';
const userPersonalization = require('../utils/userPersonalization');

const BackArrowIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M0.439453 10.9441C-0.146484 11.5301 -0.146484 12.4816 0.439453 13.0676L7.93945 20.5676C8.52539 21.1535 9.47695 21.1535 10.0629 20.5676C10.6488 19.9816 10.6488 19.0301 10.0629 18.4441L5.11758 13.5035H19.4988C20.3285 13.5035 20.9988 12.8332 20.9988 12.0035C20.9988 11.1738 20.3285 10.5035 19.4988 10.5035H5.12227L10.0582 5.56289C10.6441 4.97695 10.6441 4.02539 10.0582 3.43945C9.47227 2.85352 8.5207 2.85352 7.93477 3.43945L0.434766 10.9395L0.439453 10.9441Z"
      fill="#FDFDFD"
    />
  </Svg>
);



const MorningSunIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    {/* Horizon line */}
    <Path 
      d="M4 16L20 16" 
      stroke="#1E2A38" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    {/* 3/4 sun rising */}
    <Path 
      d="M12 16C9.5 16 7.5 14 7.5 11.5C7.5 9 9.5 7 12 7C14.5 7 16.5 9 16.5 11.5C16.5 14 14.5 16 12 16Z" 
      stroke="#1E2A38" 
      strokeWidth="2"
      fill="transparent"
    />
    {/* Sun rays */}
    <Path 
      d="M12 4V6M6.34 6.34L7.76 7.76M17.66 6.34L16.24 7.76" 
      stroke="#1E2A38" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </Svg>
);

const MiddaySunIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path 
      d="M12 8C14 8 16 10 16 12C16 14 14 16 12 16C10 16 8 14 8 12C8 10 10 8 12 8Z" 
      stroke="#1E2A38" 
      strokeWidth="2"
      fill="transparent"
    />
    <Path 
      d="M12 4V6M12 18V20M20 12H18M6 12H4M17.66 6.34L16.24 7.76M7.76 16.24L6.34 17.66M17.66 17.66L16.24 16.24M7.76 7.76L6.34 6.34" 
      stroke="#1E2A38" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </Svg>
);

const AfternoonSandTimerIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    {/* Top and bottom frames */}
    <Path 
      d="M6 5H18M6 19H18" 
      stroke="#1E2A38" 
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Hourglass shape */}
    <Path 
      d="M8 5V8C8 10 10 12 12 12C14 12 16 10 16 8V5M8 19V16C8 14 10 12 12 12C14 12 16 14 16 16V19" 
      stroke="#1E2A38" 
      strokeWidth="2"
      fill="transparent"
    />
  </Svg>
);

const EveningHalfMoonSunIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 100 100" fill="none">
    {/* Diagonal line from bottom-left to top-right - thicker to match other SVGs */}
    <Path 
      d="M10 90L90 10" 
      stroke="#1E2A38" 
      strokeWidth="8"
      strokeLinecap="round"
    />
    {/* Sun circle (filled) */}
    <Circle 
      cx="35" 
      cy="35" 
      r="12" 
      fill="#1E2A38"
    />
    {/* Sun rays - thicker */}
    <Path 
      d="M33 15L33 5M48 20L56 12M18 20L10 12M13 35L3 35M20 50L12 58" 
      stroke="#1E2A38" 
      strokeWidth="6" 
      strokeLinecap="round"
    />
    {/* Crescent moon - less thick */}
    <Path 
      d="M65 45A25 25 0 1 1 40 70A18 18 0 1 0 65 45Z" 
      fill="#1E2A38"
    />
  </Svg>
);

const XIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path 
      d="M24 24H0V0H24V24Z" 
      stroke="none" 
      fill="transparent"
    />
    <Path 
      d="M12 4C16 4 20 7 20 12C20 17 16 20 12 20C8 20 4 16 4 12C4 8 8 4 12 4Z" 
      stroke="#1E2A38" 
      strokeWidth="2"
      fill="transparent"
    />
    <Path 
      d="M15 9L9 15M9 9L15 15" 
      stroke="#1E2A38" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </Svg>
);

const timingOptions = [
  {
    id: 1,
    title: 'Late morning (10–11 AM)',
    icon: <MorningSunIcon />,
  },
  {
    id: 2,
    title: 'Midday (12–1 PM)',
    icon: <MiddaySunIcon />,
  },
  {
    id: 3,
    title: 'Afternoon (2–4 PM)',
    icon: <AfternoonSandTimerIcon />,
  },
  {
    id: 4,
    title: 'Evening (5–6 PM)',
    icon: <EveningHalfMoonSunIcon />,
  },
  {
    id: 5,
    title: 'Whenever I feel tired',
    icon: <XIcon />,
  },
];

export default function NapTimingScreen({ navigation }) {
  const [selectedTimings, setSelectedTimings] = useState([]);

  const handleTimingSelect = (timingId) => {
    setSelectedTimings(prev => {
      if (prev.includes(timingId)) {
        // Remove if already selected
        return prev.filter(id => id !== timingId);
      } else {
        // Add if not selected
        return [...prev, timingId];
      }
    });
  };

  const handleContinue = () => {
    if (selectedTimings.length > 0) {
      // Map timing IDs to simplified timing names for easier matching
      const timingNames = selectedTimings.map(id => {
        const timing = timingOptions.find(option => option.id === id);
        // Simplify the timing names for better algorithm matching
        if (timing?.title.toLowerCase().includes('morning')) return 'morning';
        if (timing?.title.toLowerCase().includes('midday') || timing?.title.toLowerCase().includes('noon')) return 'midday';
        if (timing?.title.toLowerCase().includes('evening') || timing?.title.toLowerCase().includes('afternoon')) return 'evening';
        if (timing?.title.toLowerCase().includes('flexible')) return 'flexible';
        return timing?.title.toLowerCase().replace(/\s+/g, '_');
      });
      
      // Save all selected timings, with first as primary
      const primaryTiming = timingNames[0];
      userPersonalization.setNapTiming(timingNames); // Save array instead of single value
      console.log('Nap timings saved:', timingNames, 'Primary:', primaryTiming);
      
      navigation.navigate('WellnessFocus');
    }
  };



  const handleBack = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <BackArrowIcon />
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>What's your ideal nap timing?</Text>
          <Text style={styles.subtitle}>
            We'll personalize suggestions based on your daily energy needs.
          </Text>
        </View>

        {/* Timing Options */}
        <View style={styles.optionsContainer}>
          {timingOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionCard,
                selectedTimings.includes(option.id) && styles.selectedCard,
              ]}
              onPress={() => handleTimingSelect(option.id)}
            >
              <View style={styles.iconContainer}>
                {option.icon}
              </View>
              <Text style={styles.optionText}>{option.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[
            styles.continueButton,
            selectedTimings.length > 0 && styles.continueButtonEnabled,
          ]}
          onPress={handleContinue}
          disabled={selectedTimings.length === 0}
        >
          <Text style={styles.continueText}>Continue 3/5</Text>
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
    paddingHorizontal: 24,
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 37,
    zIndex: 1,
    width: 24,
    height: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 48,
    marginBottom: 34,
    paddingHorizontal: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FDFDFD',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 14,
    fontFamily: 'Inter',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '400',
    color: '#FDFDFD',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Inter',
  },
  optionsContainer: {
    flex: 1,
    gap: 16,
    maxHeight: 324,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E8EC',
    borderRadius: 16,
    padding: 16,
    height: 52,
  },
  selectedCard: {
    backgroundColor: '#B7AFC5',
  },
  iconContainer: {
    width: 32,
    height: 24,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginRight: 12,
    backgroundColor: 'transparent',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E2A38',
    fontFamily: 'Inter',
    flex: 1,
  },
  continueButton: {
    backgroundColor: '#B7AFC5',
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    marginTop: 16,
    marginHorizontal: -16,
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

});
