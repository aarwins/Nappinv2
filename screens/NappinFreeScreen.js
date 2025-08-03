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
import OptimizedImage from '../components/OptimizedImage';

const BackArrowIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M0.439453 10.9441C-0.146484 11.5301 -0.146484 12.4816 0.439453 13.0676L7.93945 20.5676C8.52539 21.1535 9.47695 21.1535 10.0629 20.5676C10.6488 19.9816 10.6488 19.0301 10.0629 18.4441L5.11758 13.5035H19.4988C20.3285 13.5035 20.9988 12.8332 20.9988 12.0035C20.9988 11.1738 20.3285 10.5035 19.4988 10.5035H5.12227L10.0582 5.56289C10.6441 4.97695 10.6441 4.02539 10.0582 3.43945C9.47227 2.85352 8.5207 2.85352 7.93477 3.43945L0.434766 10.9395L0.439453 10.9441Z"
      fill="#FDFDFD"
    />
  </Svg>
);

const CheckIcon = () => (
  <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
    <G clipPath="url(#clip0_336_199)">
      <Path
        d="M11.0297 2.47031C11.3227 2.76328 11.3227 3.23906 11.0297 3.53203L5.02974 9.53203C4.73677 9.82499 4.26099 9.82499 3.96802 9.53203L0.968018 6.53203C0.675049 6.23906 0.675049 5.76328 0.968018 5.47031C1.26099 5.17734 1.73677 5.17734 2.02974 5.47031L4.50005 7.93828L9.97036 2.47031C10.2633 2.17734 10.7391 2.17734 11.0321 2.47031H11.0297Z"
        fill="#FDFDFD"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_336_199">
        <Path d="M0.75 0H11.25V12H0.75V0Z" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

const MegaphoneIcon = () => (
  <Svg width={25} height={24} viewBox="0 0 25 24" fill="none">
    <G clipPath="url(#clip0_336_190)">
      <Path
        d="M23.0625 1.49998C23.0625 0.895297 22.6969 0.34686 22.1344 0.112485C21.5719 -0.12189 20.9297 0.00936 20.4984 0.435923L18.4547 2.48436C16.2047 4.73436 13.1531 5.99998 9.97031 5.99998H9.5625H8.0625H3.5625C1.90781 5.99998 0.5625 7.3453 0.5625 8.99998V13.5C0.5625 15.1547 1.90781 16.5 3.5625 16.5V22.5C3.5625 23.3297 4.23281 24 5.0625 24H8.0625C8.89219 24 9.5625 23.3297 9.5625 22.5V16.5H9.97031C13.1531 16.5 16.2047 17.7656 18.4547 20.0156L20.4984 22.0594C20.9297 22.4906 21.5719 22.6172 22.1344 22.3828C22.6969 22.1484 23.0625 21.6047 23.0625 20.9953V14.0812C23.9344 13.6687 24.5625 12.5578 24.5625 11.25C24.5625 9.94217 23.9344 8.83123 23.0625 8.41874V1.49998ZM20.0625 5.0953V11.25V17.4047C17.3062 14.8969 13.7109 13.5 9.97031 13.5H9.5625V8.99998H9.97031C13.7109 8.99998 17.3062 7.60311 20.0625 5.0953Z"
        fill="#B7AFC5"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_336_190">
        <Path d="M0.5625 0H24.5625V24H0.5625V0Z" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

const FeatureItem = ({ children }) => (
  <View style={styles.featureItem}>
    <View style={styles.checkIconContainer}>
      <CheckIcon />
    </View>
    <Text style={styles.featureText}>{children}</Text>
  </View>
);

export default function NappinFreeScreen({ navigation }) {
  const handleBack = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleContinueWithFree = () => {
    // TODO: Navigate to home screen when it's created
    console.log('Continue with Free - Home screen not implemented yet');
  };

  const handleUpgrade = () => {
    // Navigate back to paywall or upgrade screen
    if (navigation) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Back Arrow */}
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <BackArrowIcon />
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>You're on Nappin Free</Text>
        </View>

        {/* Fixed Image */}
        <View style={styles.imageSection}>
          <OptimizedImage 
            source={require('../assets/fixed.png')} 
            style={styles.fixedImage}
            resizeMode="contain"
            showLoader={false}
          />
        </View>

        {/* Main Title */}
        <Text style={styles.mainTitle}>
          Enjoy the essentials, totally free.
        </Text>

        {/* Features Container */}
        <View style={styles.featuresContainer}>
          <FeatureItem>
            Core nap sounds, breathing, and focus tools
          </FeatureItem>

          <View style={styles.separator} />

          <FeatureItem>
            Manual nap journal with mood tracking
          </FeatureItem>

          <View style={styles.separator} />

          <FeatureItem>
            Daily nap reminders to build the habit
          </FeatureItem>
        </View>

        {/* Ad Notice */}
        <View style={styles.adNotice}>
          <MegaphoneIcon />
          <Text style={styles.adNoticeText}>
            Ads help keep Nappin Free free for everyone.
          </Text>
        </View>

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueButton} onPress={handleContinueWithFree}>
          <Text style={styles.continueText}>Continue with Free</Text>
        </TouchableOpacity>

        {/* Upgrade Link */}
        <TouchableOpacity style={styles.upgradeLink} onPress={handleUpgrade}>
          <Text style={styles.upgradeLinkText}>
            Upgrade anytime for more features →
          </Text>
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
  backButton: {
    position: 'absolute',
    left: 15,
    top: 37,
    width: 24,
    height: 24,
    zIndex: 1,
  },
  header: {
    paddingHorizontal: 30,
    paddingVertical: 8,
    backgroundColor: '#1E2A38',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FDFDFD',
    fontFamily: 'Inter',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FDFDFD',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 8,
    fontFamily: 'Inter',
    alignSelf: 'center',
  },
  imageSection: {
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
  fixedImage: {
    width: 420,
    height: 300,
  },
  featuresContainer: {
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    height: 36,
  },
  checkIconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#B7AFC5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginTop: 0,
  },
  featureText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '400',
    color: '#1E2A38',
    lineHeight: 18,
    fontFamily: 'Inter',
  },
  separator: {
    height: 1,
    backgroundColor: '#FDFDFD',
    opacity: 0.2,
    marginHorizontal: 0,
  },
  adNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 6,
  },
  adNoticeText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#FDFDFD',
    fontFamily: 'Inter',
    lineHeight: 18,
    marginLeft: 8,
  },
  continueButton: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#B7AFC5',
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 95,
    alignItems: 'center',
    marginBottom: 6,
    height: 48,
    justifyContent: 'center',
  },
  continueText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FDFDFD',
    fontFamily: 'Inter',
    textAlign: 'center',
  },
  upgradeLink: {
    alignItems: 'center',
    paddingHorizontal: 51.8,
    paddingVertical: 4,
    height: 24,
    justifyContent: 'center',
    marginBottom: 20,
  },
  upgradeLinkText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#B7AFC5',
    fontFamily: 'Inter',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
