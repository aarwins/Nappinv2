import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Svg, Path, G, Defs, ClipPath } from 'react-native-svg';

const BedIcon = () => (
  <Svg width={20} height={16} viewBox="0 0 20 16" fill="none" style={{backgroundColor: 'transparent'}}>
    <Path
      d="M1 1C1.55313 1 2 1.44687 2 2V10H9V5C9 4.44688 9.44687 4 10 4H17C18.6562 4 20 5.34375 20 7V14C20 14.5531 19.5531 15 19 15C18.4469 15 18 14.5531 18 14V13H11H10H2V14C2 14.5531 1.55313 15 1 15C0.446875 15 0 14.5531 0 14V2C0 1.44687 0.446875 1 1 1ZM5.5 4C6.16304 4 6.79893 4.26339 7.26777 4.73223C7.73661 5.20107 8 5.83696 8 6.5C8 7.16304 7.73661 7.79893 7.26777 8.26777C6.79893 8.73661 6.16304 9 5.5 9C4.83696 9 4.20107 8.73661 3.73223 8.26777C3.26339 7.79893 3 7.16304 3 6.5C3 5.83696 3.26339 5.20107 3.73223 4.73223C4.20107 4.26339 4.83696 4 5.5 4Z"
      fill="#1E2A38"
    />
  </Svg>
);

const CloudIcon = () => (
  <Svg width={20} height={16} viewBox="0 0 20 16" fill="none" style={{backgroundColor: 'transparent'}}>
    <Path
      d="M0 10.5C0 12.9844 2.01562 15 4.5 15H16C18.2094 15 20 13.2094 20 11C20 9.06563 18.625 7.45 16.8 7.08125C16.9281 6.74688 17 6.38125 17 6C17 4.34375 15.6562 3 14 3C13.3844 3 12.8094 3.1875 12.3344 3.50625C11.4688 2.00625 9.85312 1 8 1C5.2375 1 3 3.2375 3 6C3 6.08437 3.00312 6.16875 3.00625 6.25313C1.25625 6.86875 0 8.5375 0 10.5Z"
      fill="#1E2A38"
    />
  </Svg>
);

const SnowflakeIcon = () => (
  <Svg width={14} height={16} viewBox="0 0 14 16" fill="none">
    <G clipPath="url(#clip0_189_169)">
      <Path
        d="M6.99998 0C7.5531 0 7.99998 0.446875 7.99998 1V1.94062L8.46873 1.47187C8.76248 1.17812 9.23748 1.17812 9.5281 1.47187C9.81873 1.76562 9.82185 2.24062 9.5281 2.53125L7.99685 4.0625V6.25938L9.9156 5.14062L10.4687 3.075C10.575 2.675 10.9875 2.4375 11.3875 2.54375C11.7875 2.65 12.025 3.0625 11.9187 3.4625L11.7562 4.06563L12.4937 3.63438C12.9719 3.35625 13.5844 3.51875 13.8625 3.99375C14.1406 4.46875 13.9812 5.08438 13.5031 5.3625L12.7125 5.825L13.3906 6.00625C13.7906 6.1125 14.0281 6.525 13.9219 6.925C13.8156 7.325 13.4031 7.5625 13.0031 7.45625L10.8875 6.89062L8.98435 8L10.8875 9.10938L13.0031 8.54375C13.4031 8.4375 13.8156 8.675 13.9219 9.075C14.0281 9.475 13.7906 9.8875 13.3906 9.99375L12.7125 10.175L13.5031 10.6375C13.9812 10.9156 14.1406 11.5281 13.8625 12.0063C13.5844 12.4844 12.9719 12.6438 12.4937 12.3656L11.7562 11.9344L11.9187 12.5375C12.025 12.9375 11.7875 13.35 11.3875 13.4563C10.9875 13.5625 10.575 13.325 10.4687 12.925L9.9156 10.8594L7.99998 9.74063V11.9375L9.53123 13.4688C9.82498 13.7625 9.82498 14.2375 9.53123 14.5281C9.23748 14.8187 8.76248 14.8219 8.47185 14.5281L8.0031 14.0594V15C8.0031 15.5531 7.55623 16 7.0031 16C6.44998 16 6.0031 15.5531 6.0031 15V14.0594L5.53435 14.5281C5.2406 14.8219 4.7656 14.8219 4.47498 14.5281C4.18435 14.2344 4.18123 13.7594 4.47498 13.4688L6.00623 11.9375V9.74063L4.08748 10.8594L3.53435 12.925C3.4281 13.325 3.0156 13.5625 2.6156 13.4563C2.2156 13.35 1.9781 12.9375 2.08435 12.5375L2.24685 11.9344L1.5031 12.3625C1.02498 12.6406 0.412476 12.4781 0.134351 12.0031C-0.143774 11.5281 0.0187261 10.9125 0.493726 10.6344L1.28435 10.1719L0.606226 9.99063C0.206226 9.88438 -0.031274 9.47187 0.074976 9.07187C0.181226 8.67188 0.593726 8.43437 0.993726 8.54062L3.10935 9.10625L5.0156 8L3.11248 6.89062L0.996851 7.45625C0.596851 7.5625 0.184351 7.325 0.078101 6.925C-0.028149 6.525 0.209351 6.1125 0.609351 6.00625L1.28748 5.825L0.496851 5.3625C0.018726 5.08438 -0.140649 4.47188 0.137476 3.99688C0.415601 3.52188 1.0281 3.35938 1.50623 3.6375L2.24373 4.06875L2.08123 3.46563C1.97498 3.06562 2.21248 2.65313 2.61248 2.54688C3.01248 2.44062 3.42498 2.67812 3.53123 3.07812L4.08435 5.14375L5.99998 6.25938V4.05937L4.46873 2.53125C4.17498 2.2375 4.17498 1.7625 4.46873 1.47187C4.76248 1.18125 5.23748 1.17812 5.5281 1.47187L5.99685 1.94062V1C5.99685 0.446875 6.44373 0 6.99685 0H6.99998Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_189_169">
        <Path d="M0 0H14V16H0V0Z" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

const HeartIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{backgroundColor: 'transparent'}}>
    <Path
      d="M7.13438 14.6594L1.4875 9.38752C1.35625 9.26564 1.23125 9.13439 1.11563 9.00001H3.83437C4.54063 9.00001 5.17812 8.57501 5.45 7.92189L5.77812 7.13439L7.31875 10.5563C7.4375 10.8219 7.69688 10.9938 7.9875 10.9969C8.27812 11 8.54375 10.8406 8.675 10.5813L10 7.92814L10.0531 8.03439C10.35 8.62814 10.9562 9.00314 11.6187 9.00314H14.8844C14.7687 9.13752 14.6438 9.26877 14.5125 9.39064L8.86563 14.6594C8.63125 14.8781 8.32187 15 8 15C7.67812 15 7.36875 14.8781 7.13438 14.6594ZM15.7406 7.50001H11.6156C11.5219 7.50001 11.4344 7.44689 11.3906 7.36251L10.6656 5.91564C10.5375 5.66251 10.2781 5.50001 9.99375 5.50001C9.70937 5.50001 9.45 5.65939 9.32187 5.91564L8.02812 8.50314L6.43437 4.94376C6.3125 4.67189 6.0375 4.49689 5.74062 4.50314C5.44375 4.50939 5.175 4.68751 5.05937 4.96564L4.06563 7.35001C4.02813 7.44376 3.93437 7.50314 3.83437 7.50314H0.5C0.41875 7.50314 0.34375 7.51564 0.271875 7.53751C0.09375 7.03751 0 6.50626 0 5.96564V5.78439C0 3.60001 1.57812 1.73751 3.73125 1.37814C5.15625 1.14064 6.60625 1.60626 7.625 2.62501L8 3.00001L8.375 2.62501C9.39375 1.60626 10.8438 1.14064 12.2688 1.37814C14.4219 1.73751 16 3.60001 16 5.78439V5.96564C16 6.49376 15.9125 7.01251 15.7406 7.50001Z"
      fill="#1E2A38"
    />
  </Svg>
);

const SpeakerIcon = () => (
  <Svg width={20} height={16} viewBox="0 0 20 16" fill="none" style={{backgroundColor: 'transparent'}}>
    <Path
      d="M1 3H4L9 0V16L4 13H1C0.45 13 0 12.55 0 12V4C0 3.45 0.45 3 1 3Z"
      fill="#1E2A38"
    />
    <Path
      d="M12 4C13.2 5.2 13.8 6.8 13.8 8.5C13.8 10.2 13.2 11.8 12 13"
      stroke="#1E2A38"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  </Svg>
);

const BackArrowIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M0.439453 10.9441C-0.146484 11.5301 -0.146484 12.4816 0.439453 13.0676L7.93945 20.5676C8.52539 21.1535 9.47695 21.1535 10.0629 20.5676C10.6488 19.9816 10.6488 19.0301 10.0629 18.4441L5.11758 13.5035H19.4988C20.3285 13.5035 20.9988 12.8332 20.9988 12.0035C20.9988 11.1738 20.3285 10.5035 19.4988 10.5035H5.12227L10.0582 5.56289C10.6441 4.97695 10.6441 4.02539 10.0582 3.43945C9.47227 2.85352 8.5207 2.85352 7.93477 3.43945L0.434766 10.9395L0.439453 10.9441Z"
      fill="#FDFDFD"
    />
  </Svg>
);

const environmentOptions = [
  {
    id: 1,
    icon: <BedIcon />,
    title: 'Quiet and dark',
  },
  {
    id: 2,
    icon: <SpeakerIcon />,
    title: 'Calming nature sounds',
  },
  {
    id: 3,
    icon: <CloudIcon />,
    title: 'Low light and ambient music',
  },
  {
    id: 4,
    icon: <SnowflakeIcon />,
    title: 'Cool room temperature',
  },
  {
    id: 5,
    icon: <HeartIcon />,
    title: 'None of these fit',
  },
];

export default function NapEnvironmentScreen({ navigation }) {
  const [selectedEnvironments, setSelectedEnvironments] = useState([]);

  const handleEnvironmentSelect = (environmentId) => {
    setSelectedEnvironments(prev => {
      if (prev.includes(environmentId)) {
        // Remove if already selected
        return prev.filter(id => id !== environmentId);
      } else {
        // Add if not selected
        return [...prev, environmentId];
      }
    });
  };

  const handleContinue = () => {
    if (selectedEnvironments.length > 0) {
      // Navigate to timing screen
      navigation.navigate('NapTiming');
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
          <Text style={styles.title}>What's your ideal nap environment?</Text>
          <Text style={styles.subtitle}>
            We'll tailor your experience based on how you nap best.
          </Text>
        </View>

        {/* Environment Options */}
        <View style={styles.optionsContainer}>
          {environmentOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionCard,
                selectedEnvironments.includes(option.id) && styles.selectedCard,
              ]}
              onPress={() => handleEnvironmentSelect(option.id)}
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
            selectedEnvironments.length > 0 && styles.continueButtonEnabled,
          ]}
          onPress={handleContinue}
          disabled={selectedEnvironments.length === 0}
        >
          <Text style={styles.continueText}>Continue 2/5</Text>
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
