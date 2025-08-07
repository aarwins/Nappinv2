import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Svg, Path, G, Defs, ClipPath } from 'react-native-svg';

const BackArrowIcon = () => (
  <Svg width={21} height={18} viewBox="0 0 21 18" fill="none">
    <Path
      d="M0.439453 7.94414C-0.146484 8.53008 -0.146484 9.48164 0.439453 10.0676L7.93945 17.5676C8.52539 18.1535 9.47695 18.1535 10.0629 17.5676C10.6488 16.9816 10.6488 16.0301 10.0629 15.4441L5.11758 10.5035H19.4988C20.3285 10.5035 20.9988 9.8332 20.9988 9.00352C20.9988 8.17383 20.3285 7.50352 19.4988 7.50352H5.12227L10.0582 2.56289C10.6441 1.97695 10.6441 1.02539 10.0582 0.439453C9.47227 -0.146484 8.5207 -0.146484 7.93477 0.439453L0.434766 7.93945L0.439453 7.94414Z"
      fill="#FDFDFD"
    />
  </Svg>
);

const MoonIcon = () => (
  <Svg width={18} height={24} viewBox="0 0 18 24" fill="none">
    <G clipPath="url(#clip0_23_64)">
      <Path
        d="M10.4766 1.5C4.6875 1.5 0 6.20156 0 12C0 17.7984 4.6875 22.5 10.4766 22.5C13.3172 22.5 15.8906 21.3656 17.7797 19.5281C18.0141 19.2984 18.075 18.9422 17.925 18.6516C17.775 18.3609 17.4516 18.1969 17.1281 18.2531C16.6687 18.3328 16.2 18.375 15.7172 18.375C11.175 18.375 7.49063 14.6812 7.49063 10.125C7.49063 7.04062 9.17813 4.35469 11.6766 2.93906C11.9625 2.775 12.1078 2.44688 12.0375 2.12813C11.9672 1.80938 11.6953 1.57031 11.3672 1.54219C11.0719 1.51875 10.7766 1.50469 10.4766 1.50469V1.5Z"
        fill="#B7AFC5"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_23_64">
        <Path d="M0 0H18V24H0V0Z" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

const ClockIcon = () => (
  <Svg width={24} height={25} viewBox="0 0 24 25" fill="none">
    <G clipPath="url(#clip0_23_67)">
      <Path
        d="M12 0.5C15.1826 0.5 18.2348 1.76428 20.4853 4.01472C22.7357 6.26516 24 9.3174 24 12.5C24 15.6826 22.7357 18.7348 20.4853 20.9853C18.2348 23.2357 15.1826 24.5 12 24.5C8.8174 24.5 5.76516 23.2357 3.51472 20.9853C1.26428 18.7348 0 15.6826 0 12.5C0 9.3174 1.26428 6.26516 3.51472 4.01472C5.76516 1.76428 8.8174 0.5 12 0.5ZM10.875 6.125V12.5C10.875 12.875 11.0625 13.2266 11.3766 13.4375L15.8766 16.4375C16.3922 16.7844 17.0906 16.6437 17.4375 16.1234C17.7844 15.6031 17.6437 14.9094 17.1234 14.5625L13.125 11.9V6.125C13.125 5.50156 12.6234 5 12 5C11.3766 5 10.875 5.50156 10.875 6.125Z"
        fill="#A3D9B1"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_23_67">
        <Path d="M0 0.5H24V24.5H0V0.5Z" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

const ChartIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 3C3 2.17031 2.32969 1.5 1.5 1.5C0.670312 1.5 0 2.17031 0 3V18.75C0 20.8219 1.67812 22.5 3.75 22.5H22.5C23.3297 22.5 24 21.8297 24 21C24 20.1703 23.3297 19.5 22.5 19.5H3.75C3.3375 19.5 3 19.1625 3 18.75V3ZM22.0594 7.05938C22.6453 6.47344 22.6453 5.52188 22.0594 4.93594C21.4734 4.35 20.5219 4.35 19.9359 4.93594L15 9.87656L12.3094 7.18594C11.7234 6.6 10.7719 6.6 10.1859 7.18594L4.93594 12.4359C4.35 13.0219 4.35 13.9734 4.93594 14.5594C5.52188 15.1453 6.47344 15.1453 7.05938 14.5594L11.25 10.3734L13.9406 13.0641C14.5266 13.65 15.4781 13.65 16.0641 13.0641L22.0641 7.06406L22.0594 7.05938Z"
      fill="#B7AFC5"
    />
  </Svg>
);

export default function OnboardingAccountEntryScreen({ navigation }) {
  const handleBack = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleCreateAccount = () => {
    // Navigate to account creation screen
    console.log('Navigate to account creation');
    if (navigation) {
      navigation.navigate('CreateAccount', { fromOnboarding: true });
    }
  };

  const handleSignIn = () => {
    // Navigate to sign in screen
    console.log('Navigate to sign in');
    if (navigation) {
      navigation.navigate('Login');
    }
  };

  const handleMaybeLater = () => {
    // Skip account creation and show trial offer
    console.log('Skip account creation');
    if (navigation) {
      navigation.navigate('TrialOffer');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <BackArrowIcon />
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>How Nappin Helps</Text>
              <Text style={styles.headerSubtitle}>You Rest Smarter</Text>
              <Text style={styles.headerDescription}>Your naps just got more intentional.</Text>
            </View>
          </View>

          {/* Features Section */}
          <View style={styles.featuresSection}>
            {/* Smart Nap Detection Card */}
            <View style={styles.featureCard}>
              <View style={styles.featureContent}>
                <View style={styles.featureIcon}>
                  <MoonIcon />
                </View>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>Smart Nap Detection</Text>
                  <Text style={styles.featureDescription}>
                    Nappin detects when you fall asleep so you never over-nap.
                  </Text>
                </View>
              </View>
            </View>

            {/* Gentle Wake Timing Card */}
            <View style={styles.featureCard}>
              <View style={styles.featureContent}>
                <View style={[styles.featureIcon, styles.clockIconBackground]}>
                  <ClockIcon />
                </View>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>Gentle Wake Timing</Text>
                  <Text style={styles.featureDescription}>
                    Wake up at the ideal time in your nap cycle.
                  </Text>
                </View>
              </View>
            </View>

            {/* Nap Insights Card */}
            <View style={styles.featureCard}>
              <View style={styles.featureContent}>
                <View style={styles.featureIcon}>
                  <ChartIcon />
                </View>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>Nap Insights</Text>
                  <Text style={styles.featureDescription}>
                    Track your rest patterns and improve your naps over time.
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Account Section */}
          <View style={styles.accountSection}>

            <View style={styles.accountContent}>

              {/* Create Account Button */}
              <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccount}>
                <Text style={styles.createAccountButtonText}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign In Section */}
          <View style={styles.signInSection}>
            {/* Sign In Button */}
            <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
              <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>

            {/* Maybe Later Link */}
            <TouchableOpacity onPress={handleMaybeLater}>
              <Text style={styles.maybeLaterText}>Maybe Later</Text>
            </TouchableOpacity>

            <Text style={styles.settingsNote}>
              You can create an account anytime in Settings.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2A38',
  },
  body: {
    flex: 1,
    backgroundColor: '#1E2A38',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 0,
    backgroundColor: '#1E2A38',
    position: 'relative',
    marginTop: 48,
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 12,
    width: 24,
    height: 24,
    zIndex: 1,
  },
  headerContent: {
    alignItems: 'center',
    paddingTop: 0,
    marginTop: -15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FDFDFD',
    fontFamily: 'Inter',
    textAlign: 'center',
    lineHeight: 42,
    marginBottom: 0,
  },
  headerSubtitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FDFDFD',
    fontFamily: 'Inter',
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 12,
  },
  headerDescription: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(253, 253, 253, 0.80)',
    fontFamily: 'Inter',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresSection: {
    paddingHorizontal: 24,
    marginTop: 5,
    gap: 16,
  },
  featureCard: {
    backgroundColor: 'rgba(42, 56, 72, 0.70)',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  featureContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  featureIcon: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(183, 175, 197, 0.20)',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clockIconBackground: {
    backgroundColor: 'rgba(163, 217, 177, 0.20)',
  },
  featureText: {
    flex: 1,
    paddingTop: 6,
  },
  featureTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FDFDFD',
    fontFamily: 'Inter',
    lineHeight: 26,
    marginBottom: 6,
  },
  featureDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(253, 253, 253, 0.90)',
    fontFamily: 'Inter',
    lineHeight: 20,
  },
  accountSection: {
    paddingHorizontal: 24,
    marginTop: 12,
  },
  accountTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FDFDFD',
    fontFamily: 'Inter',
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 22,
  },
  accountContent: {
    alignItems: 'center',
    gap: 20,
  },
  accountDescription: {
    fontSize: 13.5,
    fontWeight: '400',
    color: 'rgba(253, 253, 253, 0.85)',
    fontFamily: 'Inter',
    textAlign: 'center',
    lineHeight: 21,
    paddingHorizontal: 10,
  },
  createAccountButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#B7AFC5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(183, 175, 197, 0.30)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 8,
  },
  createAccountButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FDFDFD',
    fontFamily: 'Inter',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  signInSection: {
    paddingHorizontal: 24,
    marginTop: 20,
    alignItems: 'center',
    gap: 16,
  },
  signInButton: {
    width: '100%',
    height: 56,
    backgroundColor: 'transparent',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#B7AFC5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(183, 175, 197, 0.30)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 8,
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FDFDFD',
    fontFamily: 'Inter',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  maybeLaterText: {
    fontSize: 13,
    fontWeight: '700',
    color: 'rgba(253, 253, 253, 0.60)',
    fontFamily: 'Inter',
    textAlign: 'center',
    lineHeight: 20,
    textDecorationLine: 'underline',
  },
  settingsNote: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(253, 253, 253, 0.65)',
    fontFamily: 'Inter',
    textAlign: 'center',
    lineHeight: 18,
  },
});
