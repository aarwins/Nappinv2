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
    <G clipPath="url(#clip0_314_76)">
      <Path
        d="M11.0297 2.47031C11.3227 2.76328 11.3227 3.23906 11.0297 3.53203L5.02969 9.53203C4.73672 9.82499 4.26094 9.82499 3.96797 9.53203L0.967968 6.53203C0.674999 6.23906 0.674999 5.76328 0.967968 5.47031C1.26094 5.17734 1.73672 5.17734 2.02969 5.47031L4.5 7.93828L9.97031 2.47031C10.2633 2.17734 10.7391 2.17734 11.032 2.47031H11.0297Z"
        fill="#FDFDFD"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_314_76">
        <Path d="M0.75 0H11.25V12H0.75V0Z" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

const LockIcon = () => (
  <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
    <G clipPath="url(#clip0_314_32)">
      <Path
        d="M4.28125 3.375V4.5H8.03125V3.375C8.03125 2.33906 7.19219 1.5 6.15625 1.5C5.12031 1.5 4.28125 2.33906 4.28125 3.375ZM2.78125 4.5V3.375C2.78125 1.51172 4.29297 0 6.15625 0C8.01953 0 9.53125 1.51172 9.53125 3.375V4.5H9.90625C10.7336 4.5 11.4062 5.17266 11.4062 6V10.5C11.4062 11.3273 10.7336 12 9.90625 12H2.40625C1.57891 12 0.90625 11.3273 0.90625 10.5V6C0.90625 5.17266 1.57891 4.5 2.40625 4.5H2.78125Z"
        fill="#FDFDFD"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_314_32">
        <Path d="M0.90625 0H11.4062V12H0.90625V0Z" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

const AppleWatchIcon = () => (
  <Svg width={120} height={120} viewBox="0 0 120 120" fill="none">
    <Path
      d="M52 10H28C23.5817 10 20 13.5817 20 18V72C20 76.4183 23.5817 80 28 80H52C56.4183 80 60 76.4183 60 72V18C60 13.5817 56.4183 10 52 10Z"
      stroke="#FDFDFD"
      strokeWidth="2"
    />
    <Path
      d="M40 22C41.1046 22 42 21.1046 42 20C42 18.8954 41.1046 18 40 18C38.8954 18 38 18.8954 38 20C38 21.1046 38.8954 22 40 22Z"
      fill="#FDFDFD"
    />
    <Path
      d="M84 35H66C62.6863 35 60 37.6863 60 41V64C60 67.3137 62.6863 70 66 70H84C87.3137 70 90 67.3137 90 64V41C90 37.6863 87.3137 35 84 35Z"
      stroke="#FDFDFD"
      strokeWidth="2"
    />
    <Path d="M65 30H85" stroke="#FDFDFD" strokeWidth="2" />
    <Path d="M65 75H85" stroke="#FDFDFD" strokeWidth="2" />
  </Svg>
);

const FeatureItem = ({ children, isLast = false }) => (
  <View style={isLast ? styles.lastFeatureItem : styles.featureItem}>
    <View style={styles.checkIconContainer}>
      <CheckIcon />
    </View>
    <Text style={styles.featureText}>{children}</Text>
  </View>
);

const PricingOption = ({ title, price, trial, isSelected, onPress, showBadge = false }) => (
  <TouchableOpacity
    style={[styles.pricingOption, isSelected && styles.selectedPricingOption]}
    onPress={onPress}
  >
    <View style={styles.pricingContent}>
      <Text style={styles.pricingTitle}>{title}</Text>
      <Text style={styles.pricingPrice}>{price}</Text>
      <Text style={styles.pricingTrial}>{trial}</Text>
    </View>
    {showBadge && (
      <View style={styles.bestValueBadge}>
        <Text style={styles.bestValueText}>Best Value</Text>
      </View>
    )}
  </TouchableOpacity>
);

export default function PrecisionPaywallScreen({ navigation }) {
  const [selectedPlan, setSelectedPlan] = useState('yearly');

  const handleBack = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleContinue = () => {
    // Handle continue with selected plan - navigate to Apple Watch setup for trial users
    console.log('Continue with plan:', selectedPlan);
    if (navigation) {
      navigation.navigate('AppleWatchSetup');
    }
  };

  const handleRestorePurchase = () => {
    // Handle restore purchase
    console.log('Restore purchase');
  };

  const handleMaybeLater = () => {
    // Handle maybe later - navigate to special offer screen
    console.log('Maybe later');
    if (navigation) {
      navigation.navigate('SpecialOffer');
    }
  };

  const handleTerms = () => {
    // Handle terms link
    console.log('Terms');
  };

  const handlePrivacy = () => {
    // Handle privacy link
    console.log('Privacy');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <BackArrowIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Apple Watch</Text>
        </View>

        {/* Apple Watch Icon */}
        <View style={styles.iconSection}>
          <AppleWatchIcon />
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Title */}
          <Text style={styles.mainTitle}>
            Unlock Automatic Sleep Tracking with Nappin Precision
          </Text>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <FeatureItem>
              With Nappin Precision we are able to set precise alarms so you never wake up feeling groggy or more tired than before.
            </FeatureItem>

            <FeatureItem>
              Nappin Apple Watch sync starts your nap timer the moment you fall asleep and wakes you while you're still in light sleep, so every nap feels perfect.
            </FeatureItem>

            <FeatureItem isLast={true}>
              Enjoy every feature from Nappin Free and Nappin Advanced with a completely ad-free experience.
            </FeatureItem>
          </View>

          {/* Pricing Options */}
          <View style={styles.pricingContainer}>
            <PricingOption
              title="1 Year"
              price="$59.99 / yr"
              trial="14-day free trial"
              isSelected={selectedPlan === 'yearly'}
              onPress={() => setSelectedPlan('yearly')}
              showBadge={true}
            />

            <PricingOption
              title="1 Month"
              price="$7.99 / mo"
              trial="7-day free trial"
              isSelected={selectedPlan === 'monthly'}
              onPress={() => setSelectedPlan('monthly')}
            />
          </View>

          {/* Continue Button */}
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>

          {/* Secondary Actions */}
          <View style={styles.secondaryActions}>
            <TouchableOpacity onPress={handleRestorePurchase}>
              <Text style={styles.secondaryActionText}>Restore Purchase</Text>
            </TouchableOpacity>
            <Text style={styles.separator}>•</Text>
            <TouchableOpacity onPress={handleMaybeLater}>
              <Text style={styles.secondaryActionText}>Maybe later</Text>
            </TouchableOpacity>
          </View>

          {/* Security Message */}
          <View style={styles.securityContainer}>
            <LockIcon />
            <Text style={styles.securityText}>Secure checkout via Apple</Text>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Payment will be charged to your Apple ID account at confirmation of purchase. Subscription automatically renews unless cancelled at least 24 hours before the end of the current period.{' '}
              <Text style={[styles.footerText, styles.footerLink]} onPress={handleTerms}>
                Terms
              </Text>
              <Text style={styles.footerText}> • </Text>
              <Text style={[styles.footerText, styles.footerLink]} onPress={handlePrivacy}>
                Privacy
              </Text>
            </Text>
          </View>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 0,
    height: 36,
    backgroundColor: '#1E2A38',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 8,
    width: 24,
    height: 24,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FDFDFD',
    fontFamily: 'Inter',
  },
  iconSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    paddingBottom: 0,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    marginTop: -16,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FDFDFD',
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 16,
    fontFamily: 'Inter',
  },
  featuresContainer: {
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    paddingTop: 18,
    paddingBottom: 18,
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  lastFeatureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 0,
  },
  checkIconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#B7AFC5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginTop: 2,
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    color: '#1E2A38',
    lineHeight: 20,
    fontFamily: 'Inter',
  },
  pricingContainer: {
    marginBottom: 16,
  },
  pricingOption: {
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    padding: 18,
    marginBottom: 6,
    position: 'relative',
  },
  selectedPricingOption: {
    borderColor: '#B7AFC5',
    backgroundColor: '#F3F1F6',
    transform: [{ scale: 1.02 }],
  },
  pricingContent: {
    paddingRight: 69,
  },
  pricingTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E2A38',
    lineHeight: 24,
    marginBottom: 3,
    fontFamily: 'Inter',
  },
  pricingPrice: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1E2A38',
    lineHeight: 20,
    marginBottom: 3,
    fontFamily: 'Inter',
  },
  pricingTrial: {
    fontSize: 12,
    fontWeight: '400',
    color: '#1E2A38',
    lineHeight: 16,
    fontFamily: 'Inter',
  },
  bestValueBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    backgroundColor: '#B7AFC5',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  bestValueText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FDFDFD',
    fontFamily: 'Inter',
  },
  continueButton: {
    backgroundColor: '#B7AFC5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
  },
  continueText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FDFDFD',
    fontFamily: 'Inter',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  secondaryActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  secondaryActionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#B7AFC5',
    fontFamily: 'Inter',
  },
  separator: {
    fontSize: 16,
    fontWeight: '400',
    color: '#B7AFC5',
    marginHorizontal: 8,
    fontFamily: 'Inter',
    lineHeight: 24,
  },
  securityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  securityText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#FDFDFD',
    marginLeft: 7,
    fontFamily: 'Inter',
    lineHeight: 16,
  },
  footer: {
    paddingHorizontal: 31,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(253, 253, 253, 0.6)',
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: 'Inter',
  },
  footerLink: {
    color: '#B7AFC5',
    textDecorationLine: 'underline',
  },
});
