import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Svg, Path } from 'react-native-svg';
const userPersonalization = require('../utils/userPersonalization');

const BackArrowIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M0.439453 10.9441C-0.146484 11.5301 -0.146484 12.4816 0.439453 13.0676L7.93945 20.5676C8.52539 21.1535 9.47695 21.1535 10.0629 20.5676C10.6488 19.9816 10.6488 19.0301 10.0629 18.4441L5.11758 13.5035H19.4988C20.3285 13.5035 20.9988 12.8332 20.9988 12.0035C20.9988 11.1738 20.3285 10.5035 19.4988 10.5035H5.12227L10.0582 5.56289C10.6441 4.97695 10.6441 4.02539 10.0582 3.43945C9.47227 2.85352 8.5207 2.85352 7.93477 3.43945L0.434766 10.9395L0.439453 10.9441Z"
      fill="#FDFDFD"
    />
  </Svg>
);

const StudentIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    {/* Graduation cap base - larger */}
    <Path
      d="M1 11L12 5L23 11L12 17L1 11Z"
      fill="#1E2A38"
    />
    {/* Graduation cap square top - larger */}
    <Path
      d="M6 13V19C6 20.5 8.5 22 12 22C15.5 22 18 20.5 18 19V13"
      stroke="#1E2A38"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
  </Svg>
);

const JobIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    {/* Briefcase body */}
    <Path
      d="M20 7H16V5C16 3.9 15.1 3 14 3H10C8.9 3 8 3.9 8 5V7H4C2.9 7 2 7.9 2 9V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V9C22 7.9 21.1 7 20 7Z"
      stroke="#1E2A38"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Handle */}
    <Path
      d="M10 5H14V7H10V5Z"
      stroke="#1E2A38"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Lock */}
    <Path
      d="M12 12V16"
      stroke="#1E2A38"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </Svg>
);

const ShiftWorkerIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z"
      fill="#1E2A38"
    />
  </Svg>
);

const RemoteWorkerIcon = () => (
  <Svg width={26} height={26} viewBox="0 0 26 26" fill="none">
    <Path
      d="M5.41666 3.25C4.2275 3.25 3.25 4.2275 3.25 5.41666V16.25C3.25 17.4392 4.2275 18.4167 5.41666 18.4167H20.5833C21.7725 18.4167 22.75 17.4392 22.75 16.25V5.41666C22.75 4.2275 21.7725 3.25 20.5833 3.25H5.41666ZM5.41666 4.875H20.5833C20.8717 4.875 21.125 5.12833 21.125 5.41666V14.625H4.875V5.41666C4.875 5.12833 5.12833 4.875 5.41666 4.875ZM4.875 16.25V16.0833H21.125V16.25C21.125 16.5383 20.8717 16.7917 20.5833 16.7917H5.41666C5.12833 16.7917 4.875 16.5383 4.875 16.25ZM2.16666 20.125H23.8333V21.75H2.16666V20.125Z"
      fill="#1E2A38"
    />
  </Svg>
);

const OtherIcon = () => (
  <Svg width={26} height={26} viewBox="0 0 26 26" fill="none">
    <Path
      d="M13 2.1665C7.01833 2.1665 2.16667 7.01816 2.16667 12.9998C2.16667 18.9815 7.01833 23.8332 13 23.8332C18.9817 23.8332 23.8333 18.9815 23.8333 12.9998C23.8333 7.01816 18.9817 2.1665 13 2.1665ZM13 3.7915C18.0842 3.7915 22.2083 7.91566 22.2083 12.9998C22.2083 18.084 18.0842 22.2082 13 22.2082C7.91583 22.2082 3.79167 18.084 3.79167 12.9998C3.79167 7.91566 7.91583 3.7915 13 3.7915ZM12.1875 7.02067H13.8125V8.64567H12.1875V7.02067ZM12.1875 10.8332H13.8125V19.5207H12.1875V10.8332Z"
      fill="#1E2A38"
    />
  </Svg>
);

const scheduleOptions = [
  {
    id: 1,
    title: 'Full-time student',
    icon: <StudentIcon />,
  },
  {
    id: 2,
    title: '9-5 Job',
    icon: <JobIcon />,
  },
  {
    id: 3,
    title: 'Shift worker (night/evening)',
    icon: <ShiftWorkerIcon />,
  },
  {
    id: 4,
    title: 'Remote or flexible worker',
    icon: <RemoteWorkerIcon />,
  },
  {
    id: 5,
    title: 'Other / Not working',
    icon: <OtherIcon />,
  },
];

export default function DailyScheduleScreen({ navigation }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionSelect = (optionId) => {
    setSelectedOptions(prev => {
      if (prev.includes(optionId)) {
        // Remove if already selected
        return prev.filter(id => id !== optionId);
      } else {
        // Add if not selected
        return [...prev, optionId];
      }
    });
  };

  const handleContinue = () => {
    if (selectedOptions.length > 0) {
      // Map schedule IDs to simplified schedule names for easier matching
      const scheduleNames = selectedOptions.map(id => {
        const schedule = scheduleOptions.find(option => option.id === id);
        // Simplify schedule names for better algorithm matching
        if (schedule?.title.toLowerCase().includes('9') && schedule?.title.toLowerCase().includes('5')) return '9to5';
        if (schedule?.title.toLowerCase().includes('traditional')) return 'traditional';
        if (schedule?.title.toLowerCase().includes('night') && schedule?.title.toLowerCase().includes('shift')) return 'night_shift';
        if (schedule?.title.toLowerCase().includes('flexible')) return 'flexible';
        if (schedule?.title.toLowerCase().includes('student')) return 'student';
        if (schedule?.title.toLowerCase().includes('other') || schedule?.title.toLowerCase().includes('not working')) return 'other_not_working';
        return schedule?.title.toLowerCase().replace(/[\s&-]+/g, '_');
      });
      
      // Save all selected schedules, with first as primary  
      const primarySchedule = scheduleNames[0];
      userPersonalization.setDailySchedule(scheduleNames); // Save array instead of single value
      console.log('Daily schedules saved:', scheduleNames, 'Primary:', primarySchedule);
      
      navigation.navigate('ChooseDevice');
    }
  };

  const handleSkip = () => {
    // Navigate to choose device screen
    navigation.navigate('ChooseDevice');
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
          <Text style={styles.title}>What's your daily schedule?</Text>
          <Text style={styles.subtitle}>
            We'll tailor nap timing to your lifestyle and routine.
          </Text>
        </View>

        {/* Schedule Options */}
        <View style={styles.optionsContainer}>
          {scheduleOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionCard,
                selectedOptions.includes(option.id) && styles.selectedCard,
              ]}
              onPress={() => handleOptionSelect(option.id)}
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
            selectedOptions.length > 0 && styles.continueButtonEnabled,
          ]}
          onPress={handleContinue}
          disabled={selectedOptions.length === 0}
        >
          <Text style={styles.continueText}>Continue 5/5</Text>
        </TouchableOpacity>

        {/* Skip Link */}
        <TouchableOpacity style={styles.skipContainer} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip Personalization</Text>
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
  skipContainer: {
    alignItems: 'center',
    marginTop: 107,
    marginBottom: 24,
  },
  skipText: {
    fontSize: 13,
    fontWeight: '700',
    color: 'rgba(253, 253, 253, 0.6)',
    textDecorationLine: 'underline',
    fontFamily: 'Inter',
    lineHeight: 20,
  },
});
