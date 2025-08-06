import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
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

const PhysicalRecoveryIcon = () => (
  <Svg width={20} height={16} viewBox="0 0 20 16" fill="none">
    <Path
      d="M3 2C3 1.44687 3.44688 1 4 1H5C5.55312 1 6 1.44687 6 2V7V9V14C6 14.5531 5.55312 15 5 15H4C3.44688 15 3 14.5531 3 14V12H2C1.44687 12 1 11.5531 1 11V9C0.446875 9 0 8.55312 0 8C0 7.44688 0.446875 7 1 7V5C1 4.44688 1.44687 4 2 4H3V2ZM17 2V4H18C18.5531 4 19 4.44688 19 5V7C19.5531 7 20 7.44688 20 8C20 8.55312 19.5531 9 19 9V11C19 11.5531 18.5531 12 18 12H17V14C17 14.5531 16.5531 15 16 15H15C14.4469 15 14 14.5531 14 14V9V7V2C14 1.44687 14.4469 1 15 1H16C16.5531 1 17 1.44687 17 2ZM13 7V9H7V7H13Z"
      fill="#1E2A38"
    />
  </Svg>
);

const MentalSharpnessIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <G clipPath="url(#clip0_156_144)">
      <Path
        d="M5.75 0C6.71562 0 7.5 0.784375 7.5 1.75V14.25C7.5 15.2156 6.71562 16 5.75 16C4.84688 16 4.10313 15.3156 4.00938 14.4344C3.84688 14.4781 3.675 14.5 3.5 14.5C2.39687 14.5 1.5 13.6031 1.5 12.5C1.5 12.2688 1.54062 12.0437 1.6125 11.8375C0.66875 11.4812 0 10.5688 0 9.5C0 8.50313 0.584375 7.64062 1.43125 7.24062C1.15937 6.9 1 6.46875 1 6C1 5.04063 1.675 4.24062 2.575 4.04375C2.525 3.87187 2.5 3.6875 2.5 3.5C2.5 2.56562 3.14375 1.77813 4.00938 1.55938C4.10313 0.684375 4.84688 0 5.75 0ZM10.25 0C11.1531 0 11.8938 0.684375 11.9906 1.55938C12.8594 1.77813 13.5 2.5625 13.5 3.5C13.5 3.6875 13.475 3.87187 13.425 4.04375C14.325 4.2375 15 5.04063 15 6C15 6.46875 14.8406 6.9 14.5688 7.24062C15.4156 7.64062 16 8.50313 16 9.5C16 10.5688 15.3313 11.4812 14.3875 11.8375C14.4594 12.0437 14.5 12.2688 14.5 12.5C14.5 13.6031 13.6031 14.5 12.5 14.5C12.325 14.5 12.1531 14.4781 11.9906 14.4344C11.8969 15.3156 11.1531 16 10.25 16C9.28438 16 8.5 15.2156 8.5 14.25V1.75C8.5 0.784375 9.28438 0 10.25 0Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_156_144">
        <Path d="M0 0H16V16H0V0Z" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

const BalancedMoodIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
      stroke="#1E2A38"
      strokeWidth="2"
    />
    <Path
      d="M9 13C9.6 14.5 10.639 15 12 15C13.361 15 14.4 14.5 15 13"
      stroke="#1E2A38"
      strokeWidth="2"
    />
    <Path
      d="M9 11C9.55228 11 10 10.5523 10 10C10 9.44772 9.55228 9 9 9C8.44772 9 8 9.44772 8 10C8 10.5523 8.44772 11 9 11Z"
      stroke="#1E2A38"
      strokeWidth="2"
    />
    <Path
      d="M15 11C15.5523 11 16 10.5523 16 10C16 9.44772 15.5523 9 15 9C14.4477 9 14 9.44772 14 10C14 10.5523 14.4477 11 15 11Z"
      stroke="#1E2A38"
      strokeWidth="2"
    />
  </Svg>
);

const ReducedAnxietyIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{backgroundColor: 'transparent'}}>
    <Path
      d="M7.13438 14.6594L1.4875 9.38752C1.35625 9.26564 1.23125 9.13439 1.11563 9.00001H3.83437C4.54063 9.00001 5.17812 8.57501 5.45 7.92189L5.77812 7.13439L7.31875 10.5563C7.4375 10.8219 7.69688 10.9938 7.9875 10.9969C8.27812 11 8.54375 10.8406 8.675 10.5813L10 7.92814L10.0531 8.03439C10.35 8.62814 10.9562 9.00314 11.6187 9.00314H14.8844C14.7687 9.13752 14.6438 9.26877 14.5125 9.39064L8.86563 14.6594C8.63125 14.8781 8.32187 15 8 15C7.67812 15 7.36875 14.8781 7.13438 14.6594ZM15.7406 7.50001H11.6156C11.5219 7.50001 11.4344 7.44689 11.3906 7.36251L10.6656 5.91564C10.5375 5.66251 10.2781 5.50001 9.99375 5.50001C9.70937 5.50001 9.45 5.65939 9.32187 5.91564L8.02812 8.50314L6.43437 4.94376C6.3125 4.67189 6.0375 4.49689 5.74062 4.50314C5.44375 4.50939 5.175 4.68751 5.05937 4.96564L4.06563 7.35001C4.02813 7.44376 3.93437 7.50314 3.83437 7.50314H0.5C0.41875 7.50314 0.34375 7.51564 0.271875 7.53751C0.09375 7.03751 0 6.50626 0 5.96564V5.78439C0 3.60001 1.57812 1.73751 3.73125 1.37814C5.15625 1.14064 6.60625 1.60626 7.625 2.62501L8 3.00001L8.375 2.62501C9.39375 1.60626 10.8438 1.14064 12.2688 1.37814C14.4219 1.73751 16 3.60001 16 5.78439V5.96564C16 6.49376 15.9125 7.01251 15.7406 7.50001Z"
      fill="#1E2A38"
    />
  </Svg>
);

const OverallWellnessIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{backgroundColor: 'transparent'}}>
    <Path
      d="M8.5 3C6.04375 3 3.96563 4.60938 3.25938 6.82813C4.30937 6.29688 5.49375 6 6.75 6H9.5C9.775 6 10 6.225 10 6.5C10 6.775 9.775 7 9.5 7H9H6.75C6.23125 7 5.72813 7.05938 5.24375 7.16875C4.43438 7.35313 3.68125 7.68125 3.0125 8.12813C1.19688 9.3375 0 11.4031 0 13.75V14.25C0 14.6656 0.334375 15 0.75 15C1.16562 15 1.5 14.6656 1.5 14.25V13.75C1.5 12.2281 2.14688 10.8594 3.18125 9.9C3.8 12.2594 5.94688 14 8.5 14H8.53125C12.6594 13.9781 16 9.90938 16 4.89375C16 3.5625 15.7656 2.29688 15.3406 1.15625C15.2594 0.940628 14.9438 0.950003 14.8344 1.15313C14.2469 2.25313 13.0844 3 11.75 3H8.5Z"
      fill="#1E2A38"
    />
  </Svg>
);

const wellnessOptions = [
  {
    id: 1,
    title: 'Physical recovery',
    icon: <PhysicalRecoveryIcon />,
  },
  {
    id: 2,
    title: 'Mental sharpness',
    icon: <MentalSharpnessIcon />,
  },
  {
    id: 3,
    title: 'Balanced mood',
    icon: <BalancedMoodIcon />,
  },
  {
    id: 4,
    title: 'Reduced anxiety',
    icon: <ReducedAnxietyIcon />,
  },
  {
    id: 5,
    title: 'Overall wellness',
    icon: <OverallWellnessIcon />,
  },
];

export default function WellnessFocusScreen({ navigation }) {
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
      // Navigate to daily schedule screen
      navigation.navigate('DailySchedule');
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
          <Text style={styles.title}>What's your wellness focus?</Text>
          <Text style={styles.subtitle}>
            We'll customize your experience to support your wellbeing goals.
          </Text>
        </View>

        {/* Wellness Options */}
        <View style={styles.optionsContainer}>
          {wellnessOptions.map((option) => (
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
          <Text style={styles.continueText}>Continue 4/5</Text>
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
