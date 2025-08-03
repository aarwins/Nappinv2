import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Svg, Path, G, Defs, ClipPath } from 'react-native-svg';

const userPersonalization = require('../utils/userPersonalization');

const SunIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <G clipPath="url(#clip0_189_203)">
      <Path
        d="M11.2969 0.0374973C11.4532 0.103122 11.5657 0.243747 11.5969 0.409372L12.2188 3.78125L15.5907 4.4C15.7563 4.43125 15.8969 4.54375 15.9626 4.7C16.0282 4.85625 16.0094 5.03437 15.9126 5.175L13.9657 8L15.9126 10.8219C16.0094 10.9625 16.0282 11.1406 15.9626 11.2969C15.8969 11.4531 15.7563 11.5656 15.5907 11.5969L12.2188 12.2187L11.5969 15.5906C11.5657 15.7562 11.4532 15.8969 11.2969 15.9625C11.1407 16.0281 10.9626 16.0094 10.8219 15.9125L8.00006 13.9656L5.17818 15.9125C5.03756 16.0094 4.85943 16.0281 4.70318 15.9625C4.54693 15.8969 4.43443 15.7562 4.40318 15.5906L3.78131 12.2187L0.409433 11.5969C0.243808 11.5656 0.103183 11.4531 0.0375584 11.2969C-0.0280666 11.1406 -0.00931662 10.9625 0.0875584 10.8219L2.03443 8L0.0875584 5.17812C-0.00931662 5.0375 -0.0280666 4.85937 0.0375584 4.70312C0.103183 4.54687 0.243808 4.43437 0.409433 4.40312L3.78131 3.78125L4.40318 0.409372C4.43443 0.243747 4.54693 0.103122 4.70318 0.0374973C4.85943 -0.0281277 5.03756 -0.00937766 5.17818 0.0874973L8.00006 2.03437L10.8219 0.0874973C10.9626 -0.00937766 11.1407 -0.0281277 11.2969 0.0374973ZM5.00006 8C5.00006 7.20435 5.31613 6.44129 5.87874 5.87868C6.44135 5.31607 7.20441 5 8.00006 5C8.79571 5 9.55877 5.31607 10.1214 5.87868C10.684 6.44129 11.0001 7.20435 11.0001 8C11.0001 8.79565 10.684 9.55871 10.1214 10.1213C9.55877 10.6839 8.79571 11 8.00006 11C7.20441 11 6.44135 10.6839 5.87874 10.1213C5.31613 9.55871 5.00006 8.79565 5.00006 8ZM12.0001 8C12.0001 6.93913 11.5786 5.92172 10.8285 5.17157C10.0783 4.42142 9.06092 4 8.00006 4C6.93919 4 5.92178 4.42142 5.17163 5.17157C4.42149 5.92172 4.00006 6.93913 4.00006 8C4.00006 9.06086 4.42149 10.0783 5.17163 10.8284C5.92178 11.5786 6.93919 12 8.00006 12C9.06092 12 10.0783 11.5786 10.8285 10.8284C11.5786 10.0783 12.0001 9.06086 12.0001 8Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_189_203">
        <Path d="M0 0H16V16H0V0Z" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

const DumbbellIcon = () => (
  <Svg width={20} height={16} viewBox="0 0 20 16" fill="none">
    <Path
      d="M3 2C3 1.44687 3.44688 1 4 1H5C5.55312 1 6 1.44687 6 2V7V9V14C6 14.5531 5.55312 15 5 15H4C3.44688 15 3 14.5531 3 14V12H2C1.44687 12 1 11.5531 1 11V9C0.446875 9 0 8.55312 0 8C0 7.44688 0.446875 7 1 7V5C1 4.44688 1.44687 4 2 4H3V2ZM17 2V4H18C18.5531 4 19 4.44688 19 5V7C19.5531 7 20 7.44688 20 8C20 8.55312 19.5531 9 19 9V11C19 11.5531 18.5531 12 18 12H17V14C17 14.5531 16.5531 15 16 15H15C14.4469 15 14 14.5531 14 14V9V7V2C14 1.44687 14.4469 1 15 1H16C16.5531 1 17 1.44687 17 2ZM13 7V9H7V7H13Z"
      fill="#1E2A38"
    />
  </Svg>
);

const MoonIcon = () => (
  <Svg width={12} height={16} viewBox="0 0 12 16" fill="none">
    <G clipPath="url(#clip0_189_225)">
      <Path
        d="M6.98438 1C3.125 1 0 4.13438 0 8C0 11.8656 3.125 15 6.98438 15C8.87813 15 10.5938 14.2438 11.8531 13.0188C12.0094 12.8656 12.05 12.6281 11.95 12.4344C11.85 12.2406 11.6344 12.1312 11.4187 12.1687C11.1125 12.2219 10.8 12.25 10.4781 12.25C7.45 12.25 4.99375 9.7875 4.99375 6.75C4.99375 4.69375 6.11875 2.90313 7.78438 1.95938C7.975 1.85 8.07187 1.63125 8.025 1.41875C7.97812 1.20625 7.79688 1.04688 7.57812 1.02813C7.38125 1.0125 7.18437 1.00312 6.98438 1.00312V1Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_189_225">
        <Path d="M0 0H12V16H0V0Z" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

const BrainIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <G clipPath="url(#clip0_189_236)">
      <Path
        d="M5.75 0C6.71562 0 7.5 0.784375 7.5 1.75V14.25C7.5 15.2156 6.71562 16 5.75 16C4.84688 16 4.10313 15.3156 4.00938 14.4344C3.84688 14.4781 3.675 14.5 3.5 14.5C2.39687 14.5 1.5 13.6031 1.5 12.5C1.5 12.2688 1.54062 12.0437 1.6125 11.8375C0.66875 11.4812 0 10.5688 0 9.5C0 8.50313 0.584375 7.64062 1.43125 7.24062C1.15937 6.9 1 6.46875 1 6C1 5.04063 1.675 4.24062 2.575 4.04375C2.525 3.87187 2.5 3.6875 2.5 3.5C2.5 2.56562 3.14375 1.77813 4.00938 1.55938C4.10313 0.684375 4.84688 0 5.75 0ZM10.25 0C11.1531 0 11.8938 0.684375 11.9906 1.55938C12.8594 1.77813 13.5 2.5625 13.5 3.5C13.5 3.6875 13.475 3.87187 13.425 4.04375C14.325 4.2375 15 5.04063 15 6C15 6.46875 14.8406 6.9 14.5688 7.24062C15.4156 7.64062 16 8.50313 16 9.5C16 10.5688 15.3313 11.4812 14.3875 11.8375C14.4594 12.0437 14.5 12.2688 14.5 12.5C14.5 13.6031 13.6031 14.5 12.5 14.5C12.325 14.5 12.1531 14.4781 11.9906 14.4344C11.8969 15.3156 11.1531 16 10.25 16C9.28438 16 8.5 15.2156 8.5 14.25V1.75C8.5 0.784375 9.28438 0 10.25 0Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_189_236">
        <Path d="M0 0H16V16H0V0Z" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

const LeafIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path
      d="M8.5 3C6.04375 3 3.96563 4.60938 3.25938 6.82813C4.30937 6.29688 5.49375 6 6.75 6H9.5C9.775 6 10 6.225 10 6.5C10 6.775 9.775 7 9.5 7H9H6.75C6.23125 7 5.72813 7.05938 5.24375 7.16875C4.43438 7.35313 3.68125 7.68125 3.0125 8.12813C1.19688 9.3375 0 11.4031 0 13.75V14.25C0 14.6656 0.334375 15 0.75 15C1.16562 15 1.5 14.6656 1.5 14.25V13.75C1.5 12.2281 2.14688 10.8594 3.18125 9.9C3.8 12.2594 5.94688 14 8.5 14H8.53125C12.6594 13.9781 16 9.90938 16 4.89375C16 3.5625 15.7656 2.29688 15.3406 1.15625C15.2594 0.940628 14.9438 0.950003 14.8344 1.15313C14.2469 2.25313 13.0844 3 11.75 3H8.5Z"
      fill="#1E2A38"
    />
  </Svg>
);

const goalOptions = [
  {
    id: 1,
    icon: <SunIcon />,
    title: 'Recharge midday',
  },
  {
    id: 2,
    icon: <DumbbellIcon />,
    title: 'Recover after activity',
  },
  {
    id: 3,
    icon: <MoonIcon />,
    title: 'Fall asleep faster at night',
  },
  {
    id: 4,
    icon: <BrainIcon />,
    title: 'Improve mood and focus',
  },
  {
    id: 5,
    icon: <LeafIcon />,
    title: 'Reduce stress & anxiety',
  },
];

export default function GoalSelectionScreen({ navigation }) {
  const [selectedGoals, setSelectedGoals] = useState([]);

  const handleGoalSelect = (goalId) => {
    setSelectedGoals(prev => {
      if (prev.includes(goalId)) {
        // Remove if already selected
        return prev.filter(id => id !== goalId);
      } else {
        // Add if not selected
        return [...prev, goalId];
      }
    });
  };

  const handleContinue = () => {
    if (selectedGoals.length > 0) {
      // Map goal IDs to goal names and save to personalization
      const goalNames = selectedGoals.map(id => {
        const goal = goalOptions.find(option => option.id === id);
        switch (goal?.title) {
          case 'Recharge midday': return 'midday_recharge';
          case 'Recover after activity': return 'post_activity_recovery';
          case 'Fall asleep faster at night': return 'night_sleep_improvement';
          case 'Improve mood and focus': return 'mood_focus_enhancement';
          case 'Reduce stress & anxiety': return 'stress_anxiety_reduction';
          default: return goal?.title.toLowerCase().replace(/\s+/g, '_');
        }
      });
      
      // Save goals to personalization system
      userPersonalization.setGoals(goalNames);
      console.log('Selected goals saved:', goalNames);
      
      navigation.navigate('NapEnvironment');
    }
  };

  const handleSkip = () => {
    // Navigate to choose device screen
    navigation.navigate('ChooseDevice');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>What's your main nap goal?</Text>
          <Text style={styles.subtitle}>
            We'll personalize your experience to help you rest smarter.
          </Text>
        </View>

        {/* Goal Options */}
        <View style={styles.optionsContainer}>
          {goalOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionCard,
                selectedGoals.includes(option.id) && styles.selectedCard,
              ]}
              onPress={() => handleGoalSelect(option.id)}
            >
              <View style={styles.iconContainer}>{option.icon}</View>
              <Text style={styles.optionText}>{option.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[
            styles.continueButton,
            selectedGoals.length > 0 && styles.continueButtonEnabled,
          ]}
          onPress={handleContinue}
          disabled={selectedGoals.length === 0}
        >
          <Text style={styles.continueText}>Continue 1/5</Text>
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
