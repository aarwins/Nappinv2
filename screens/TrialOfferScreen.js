import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Svg, Path, G, Defs, ClipPath, Circle, Line } from 'react-native-svg';

// Crescent Moon Icon for sounds feature
const CrescentMoonIcon = () => (
  <Svg width={23} height={30} viewBox="0 0 24 31" fill="none">
    <G clipPath="url(#clip0_692_75)">
      <Path
        d="M13.8301 2.625C6.59375 2.625 0.734375 8.50195 0.734375 15.75C0.734375 22.998 6.59375 28.875 13.8301 28.875C17.3809 28.875 20.5977 27.457 22.959 25.1602C23.252 24.873 23.3281 24.4277 23.1406 24.0645C22.9531 23.7012 22.5488 23.4961 22.1445 23.5664C21.5703 23.666 20.9844 23.7188 20.3809 23.7188C14.7031 23.7188 10.0977 19.1016 10.0977 13.4062C10.0977 9.55078 12.207 6.19336 15.3301 4.42383C15.6875 4.21875 15.8691 3.80859 15.7812 3.41016C15.6934 3.01172 15.3535 2.71289 14.9434 2.67773C14.5742 2.64844 14.2051 2.63086 13.8301 2.63086V2.625Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_692_75">
        <Path d="M0.734375 0.75H23.2344V30.75H0.734375V0.75Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Brain Icon for AI features
const BrainIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    {/* Main brain outline */}
    <Path
      d="M7 4C5.5 4 4 5.5 4 7C4 8 4.3 8.9 4.8 9.6C4.3 10.2 4 11 4 12C4 13.5 5 14.8 6.2 15.4C6.1 15.6 6 15.8 6 16C6 17.1 6.9 18 8 18C8.5 18 8.9 17.8 9.2 17.5C10.1 18.5 11.4 19 12.8 19C14.2 19 15.5 18.5 16.4 17.5C16.7 17.8 17.1 18 17.6 18C18.7 18 19.6 17.1 19.6 16C19.6 15.8 19.5 15.6 19.4 15.4C20.6 14.8 21.6 13.5 21.6 12C21.6 11 21.3 10.2 20.8 9.6C21.3 8.9 21.6 8 21.6 7C21.6 5.5 20.1 4 18.6 4C17.8 4 17.1 4.3 16.6 4.8C15.8 4.3 14.9 4 13.9 4H11.7C10.7 4 9.8 4.3 9 4.8C8.5 4.3 7.8 4 7 4Z"
      stroke="#1E2A38"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Brain wrinkles */}
    <Path
      d="M8.5 8C9.5 9 10.5 9 11.5 8.5"
      stroke="#1E2A38"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <Path
      d="M14 8.5C15 9 16 9 16.5 8"
      stroke="#1E2A38"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <Path
      d="M9 12C10 13 11 13 12 12.5"
      stroke="#1E2A38"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <Path
      d="M13 12.5C14 13 15 13 15.5 12"
      stroke="#1E2A38"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Center division */}
    <Path
      d="M12.8 6C12.8 8 12.8 10 12.8 14"
      stroke="#1E2A38"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </Svg>
);

// Heart Icon for wellness features
const HeartIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z"
      stroke="#1E2A38"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

// Clock Icon for scheduling features
const ClockIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Circle 
      cx="12" 
      cy="12" 
      r="9" 
      stroke="#1E2A38" 
      strokeWidth="2.5"
      fill="none"
    />
    <Path 
      d="M12 7V12L15 15" 
      stroke="#1E2A38" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </Svg>
);

// ZZZ Sleep Icon for wake refreshed
const SleepIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    {/* Small Z */}
    <Path
      d="M4 18H7L5 21H7"
      stroke="#1E2A38"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Medium Z */}
    <Path
      d="M8 12H13L10 17H13"
      stroke="#1E2A38"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Large Z */}
    <Path
      d="M12 4H18L15 11H18"
      stroke="#1E2A38"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Audio/Speaker Icon for sound tools
const HeadphonesIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    {/* Speaker cone */}
    <Path
      d="M4 9V15C4 15.6 4.4 16 5 16H7L11 20V4L7 8H5C4.4 8 4 8.4 4 9Z"
      stroke="#1E2A38"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Sound waves */}
    <Path
      d="M15.5 8.5C16.5 9.5 16.5 14.5 15.5 15.5"
      stroke="#1E2A38"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <Path
      d="M18 6C20 8 20 16 18 18"
      stroke="#1E2A38"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </Svg>
);

// No Ads Icon
const NoAdsIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke="#1E2A38" strokeWidth="1.8" fill="none" />
    <Path d="M8 8L16 16" stroke="#1E2A38" strokeWidth="1.8" strokeLinecap="round" />
    <Path d="M8 16L16 8" stroke="#1E2A38" strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

// No Payment Icon (credit card with slash)
const NoPaymentIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M2 8C2 6.9 2.9 6 4 6H20C21.1 6 22 6.9 22 8V16C22 17.1 21.1 18 20 18H4C2.9 18 2 17.1 2 16V8Z"
      stroke="#1E2A38"
      strokeWidth="1.8"
      fill="none"
    />
    <Line x1="2" y1="10" x2="22" y2="10" stroke="#1E2A38" strokeWidth="1.8" />
    <Line x1="6" y1="14" x2="8" y2="14" stroke="#1E2A38" strokeWidth="1.8" strokeLinecap="round" />
    <Line x1="2" y1="2" x2="22" y2="22" stroke="#1E2A38" strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

// Right Arrow Icon for the button
const RightArrowIcon = () => (
  <Svg width={9} height={14} viewBox="0 0 9 15" fill="none">
    <G clipPath="url(#clip0_692_57)">
      <Path
        d="M8.71172 7.13201C9.05352 7.4738 9.05352 8.02888 8.71172 8.37068L3.46172 13.6207C3.11993 13.9625 2.56485 13.9625 2.22305 13.6207C1.88126 13.2789 1.88126 12.7238 2.22305 12.382L6.85508 7.74998L2.22579 3.11794C1.88399 2.77615 1.88399 2.22107 2.22579 1.87927C2.56758 1.53748 3.12266 1.53748 3.46446 1.87927L8.71446 7.12927L8.71172 7.13201Z"
        fill="#FDFDFD"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_692_57">
        <Path d="M0.21875 0.75H8.96875V14.75H0.21875V0.75Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Feature data for rotating cards
const featureData = [
  {
    icon: <CrescentMoonIcon />,
    title: "Sounds & Alarms",
    subtitle: "Customizable soundscapes for perfect naps"
  },
  {
    icon: <BrainIcon />,
    title: "AI Sleep Optimization",
    subtitle: "Smart wake timing in light sleep phases"
  },
  {
    icon: <HeartIcon />,
    title: "Wellness & Focus",
    subtitle: "Breathing exercises and meditation tools"
  },
  {
    icon: <ClockIcon />,
    title: "Smart Scheduling",
    subtitle: "Automated nap timing and daily planning"
  }
];

// Feature card component with rotating content
const FeatureCard = ({ feature }) => (
  <View style={styles.featureCard}>
    <View style={styles.featureCardContent}>
      <View style={styles.iconContainer}>
        {feature.icon}
      </View>
      <Text style={styles.featureTitle}>{feature.title}</Text>
      <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
    </View>
  </View>
);

// Bullet point component
const BulletPoint = ({ text }) => (
  <View style={styles.bulletPoint}>
    <View style={styles.checkmarkContainer}>
      <CheckmarkIcon />
    </View>
    <Text style={styles.bulletText}>{text}</Text>
  </View>
);

export default function TrialOfferScreen({ navigation }) {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  // Rotate feature cards every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prevIndex) => 
        (prevIndex + 1) % featureData.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleRestore = () => {
    // Handle restore purchases
    console.log('Restore purchases');
  };

  const handleStartTrial = () => {
    // Handle starting the free trial
    console.log('Start free trial');
    // Navigate to Trial Notification screen
    if (navigation) {
      navigation.navigate('TrialNotification');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >


        {/* Main headline */}
        <View style={styles.headlineSection}>
          <Text style={styles.headline}>Congrats, you're getting Nappin Advanced for free!</Text>
        </View>

        {/* Feature Card Section */}
        <View style={styles.featureSection}>
          <FeatureCard feature={featureData[currentFeatureIndex]} />
        </View>

        {/* Benefits list */}
        <View style={styles.benefitsSection}>
          <View style={styles.benefitCard}>
            <View style={styles.benefitIconContainer}>
              <SleepIcon />
            </View>
            <Text style={styles.benefitText}>Wake refreshed, AI ends naps in light sleep.</Text>
          </View>
          
          <View style={styles.benefitCard}>
            <View style={styles.benefitIconContainer}>
              <HeadphonesIcon />
            </View>
            <Text style={styles.benefitText}>Access every sound, breathing, and focus tool.</Text>
          </View>
          
          <View style={styles.benefitCard}>
            <View style={styles.benefitIconContainer}>
              <NoAdsIcon />
            </View>
            <Text style={styles.benefitText}>No ads while you recharge.</Text>
          </View>
          
          <View style={[styles.benefitCard, styles.specialBenefitCard]}>
            <View style={styles.benefitIconContainer}>
              <NoPaymentIcon />
            </View>
            <Text style={styles.benefitText}>No payment due today</Text>
          </View>
        </View>

        {/* Start Trial Button */}
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.startTrialButton} onPress={handleStartTrial}>
            <Text style={styles.startTrialText}>Start Free Trial</Text>
            <View style={styles.arrowContainer}>
              <RightArrowIcon />
            </View>
          </TouchableOpacity>
        </View>

        {/* Pricing text */}
        <View style={styles.pricingSection}>
          <Text style={styles.pricingText}>Then $24.99 per year (≈ $2.08/mo)</Text>
        </View>

        {/* Bottom divider */}
        <View style={styles.dividerSection}>
          <View style={styles.divider} />
        </View>

        {/* Restore button */}
        <View style={styles.restoreSection}>
          <TouchableOpacity onPress={handleRestore}>
            <Text style={styles.restoreText}>Restore</Text>
          </TouchableOpacity>
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
  scrollContent: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 40,
  },
  restoreSection: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  restoreText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#B7AFC5',
    fontFamily: 'Inter',
    lineHeight: 21,
  },
  featureSection: {
    paddingTop: 8,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureCard: {
    width: 300,
    height: 160,
    backgroundColor: '#E5E8EC',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 16,
  },
  featureCardContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    minWidth: 28,
    minHeight: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E2A38',
    textAlign: 'center',
    fontFamily: 'Inter',
    lineHeight: 28,
    marginBottom: 8,
  },
  featureSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1E2A38',
    textAlign: 'center',
    fontFamily: 'Inter',
    lineHeight: 20,
  },
  headlineSection: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headline: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FDFDFD',
    textAlign: 'center',
    fontFamily: 'Inter',
    lineHeight: 32,
  },
  benefitsSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 8,
  },
  benefitCard: {
    backgroundColor: 'rgba(42, 56, 72, 0.5)',
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(183, 175, 197, 0.2)',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  specialBenefitCard: {
    backgroundColor: 'rgba(183, 175, 197, 0.15)',
    borderColor: 'rgba(183, 175, 197, 0.4)',
    shadowColor: 'rgba(183, 175, 197, 0.2)',
  },
  benefitIconContainer: {
    width: 28,
    height: 28,
    backgroundColor: 'rgba(183, 175, 197, 0.2)',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  benefitText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FDFDFD',
    fontFamily: 'Inter',
    lineHeight: 18,
    flex: 1,
  },
  buttonSection: {
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  startTrialButton: {
    flex: 1,
    backgroundColor: '#B7AFC5',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 99,
    paddingVertical: 14.5,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  startTrialText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FDFDFD',
    textAlign: 'center',
    fontFamily: 'Inter',
  },
  arrowContainer: {
    width: 9,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pricingSection: {
    paddingHorizontal: 24,
    paddingBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pricingText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#FDFDFD',
    textAlign: 'center',
    fontFamily: 'Inter',
    lineHeight: 18,
  },
  dividerSection: {
    paddingHorizontal: 24,
    paddingBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    width: 312,
    height: 4,
    backgroundColor: '#B7AFC5',
    borderRadius: 9999,
  },
});
