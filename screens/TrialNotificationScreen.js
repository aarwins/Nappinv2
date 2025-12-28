import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import { Svg, Path, G, Defs, ClipPath, Line } from 'react-native-svg';
import notificationManager from '../utils/notificationManager';
import trialManager from '../utils/trialManager';
import { supabase } from '../utils/supabase';
import {
  fetchActiveProducts,
  getProductBySku,
  formatPrice,
  formatMonthlyEquivalent,
} from '../utils/subscriptions/products';

// Back arrow icon for header
const BackArrowIcon = () => (
  <Svg width={15} height={24} viewBox="0 0 15 24" fill="none">
    <Path d="M15 24H0V0H15V24Z" stroke="#E5E7EB"/>
    <Path
      d="M0.440624 10.9406C-0.145313 11.5265 -0.145313 12.4781 0.440624 13.064L9.44062 22.064C10.0266 22.65 10.9781 22.65 11.5641 22.064C12.15 21.4781 12.15 20.5265 11.5641 19.9406L3.62344 12L11.5594 4.05935C12.1453 3.47341 12.1453 2.52185 11.5594 1.93591C10.9734 1.34998 10.0219 1.34998 9.43594 1.93591L0.435937 10.9359L0.440624 10.9406Z"
      fill="#FDFDFD"
    />
  </Svg>
);

// No Payment Icon (credit card with slash) - exactly from trial offer screen
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

// Right arrow icon for button
const RightArrowIcon = () => (
  <Svg width={10} height={15} viewBox="0 0 10 15" fill="none">
    <G clipPath="url(#clip0_695_142)">
      <Path
        d="M9.16485 7.13213C9.50665 7.47393 9.50665 8.029 9.16485 8.3708L3.91485 13.6208C3.57305 13.9626 3.01797 13.9626 2.67618 13.6208C2.33438 13.279 2.33438 12.7239 2.67618 12.3821L7.30821 7.7501L2.67891 3.11807C2.33712 2.77627 2.33712 2.22119 2.67891 1.87939C3.02071 1.5376 3.57579 1.5376 3.91758 1.87939L9.16758 7.1294L9.16485 7.13213Z"
        fill="#FDFDFD"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_695_142">
        <Path d="M0.671875 0.75H9.42188V14.75H0.671875V0.75Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

export default function TrialNotificationScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [yearlyProduct, setYearlyProduct] = useState(null);

  // Fetch subscription products from backend on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const allProducts = await fetchActiveProducts(supabase);
        // Get advanced yearly product for pricing display
        const product = getProductBySku(allProducts, 'advanced_yearly');
        setYearlyProduct(product);
      } catch (error) {
        console.error('[TrialNotificationScreen] Error loading products:', error);
      }
    };

    loadProducts();
  }, []);

  const handleBack = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleRestore = () => {
    // Handle restore purchases
    console.log('Restore purchases');
  };

  const handleContinue = async () => {
    try {
      setIsLoading(true);
      console.log('Continue for FREE - requesting notifications and setting up trial');

      // Request notification permissions
      const permissionGranted = await notificationManager.requestPermissions();
      
      if (permissionGranted) {
        Alert.alert(
          "🔔 Notifications Enabled",
          "Great! We'll remind you before your free trial ends.",
          [{ text: "Continue", style: "default" }]
        );
        
        // Set up notification categories
        await notificationManager.setupNotificationCategories();
      } else {
        Alert.alert(
          "⚠️ Notifications Disabled",
          "No worries! You can still enjoy your free trial, but we won't be able to remind you when it's ending.",
          [{ text: "Continue Anyway", style: "default" }]
        );
      }

      // Start the trial (defaulting to Advanced subscription)
      const trialInfo = await trialManager.startTrial('ADVANCED');
      
      console.log('Trial started:', trialInfo);
      
      // Navigate to Choose Device screen to continue with paywall flow
      if (navigation) {
        navigation.navigate('ChooseDevice');
      }

    } catch (error) {
      console.error('Error setting up trial:', error);
      Alert.alert(
        "Error",
        "Something went wrong setting up your trial. Please try again.",
        [{ text: "OK", style: "default" }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        {/* Header - empty since restore moved below */}
        <View style={styles.header}>
        </View>

        {/* Main content */}
        <View style={styles.content}>
          {/* Headline */}
          <View style={styles.headlineContainer}>
            <Text style={styles.headline}>
              We'll send you a reminder before your free trial ends
            </Text>
          </View>

          {/* Cloud mascot image - bigger */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://api.builder.io/api/v1/image/assets/TEMP/219e03c8e9ff88cbaa2e7d79d7d63f5dd28d61b6?width=656' }}
              style={styles.cloudImage}
              resizeMode="contain"
            />
          </View>

          {/* No payment due today - copied exactly from trial offer screen */}
          <View style={styles.benefitsSection}>
            <View style={[styles.benefitCard, styles.specialBenefitCard]}>
              <View style={styles.benefitIconContainer}>
                <NoPaymentIcon />
              </View>
              <Text style={styles.benefitText}>No payment due today</Text>
            </View>
          </View>

          {/* Continue button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.continueButton, isLoading && styles.continueButtonDisabled]} 
              onPress={handleContinue}
              disabled={isLoading}
            >
              <Text style={styles.continueButtonText}>
                {isLoading ? 'Setting up...' : 'Continue for FREE'}
              </Text>
              {!isLoading && (
                <View style={styles.arrowContainer}>
                  <RightArrowIcon />
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Pricing text - matching trial offer, loaded from backend */}
          <View style={styles.pricingSection}>
            {yearlyProduct ? (
              <Text style={styles.pricingText}>
                Then {formatPrice(yearlyProduct.price_cents, yearlyProduct.currency)} per year (≈ {formatMonthlyEquivalent(yearlyProduct.price_cents, yearlyProduct.currency)}/mo)
              </Text>
            ) : (
              <Text style={styles.pricingText}>Loading pricing...</Text>
            )}
          </View>
        </View>

        {/* Restore button - exactly like trial offer */}
        <View style={styles.restoreSection}>
          <TouchableOpacity onPress={handleRestore}>
            <Text style={styles.restoreText}>Restore</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#1E2A38',
  },
  header: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 30,
    zIndex: 1,
  },
  backButton: {
    width: 15,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  restoreText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#B7AFC5',
    fontFamily: 'Inter',
    lineHeight: 21,
  },
  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 60,
  },
  headlineContainer: {
    width: 295,
    marginBottom: 15,
    paddingHorizontal: 3,
  },
  headline: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FDFDFD',
    textAlign: 'center',
    fontFamily: 'Inter',
    lineHeight: 35,
  },
  imageContainer: {
    width: 450,
    height: 360,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cloudImage: {
    width: 725,
    height: 525,
  },
  // Benefits section - with proper spacing to prevent cutoff
  benefitsSection: {
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 8,
  },
  benefitCard: {
    width: '100%',
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
  buttonContainer: {
    width: 358,
    height: 56,
    marginBottom: 8,
  },
  continueButton: {
    flex: 1,
    backgroundColor: '#B7AFC5',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 89.578,
    paddingVertical: 14.5,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FDFDFD',
    textAlign: 'center',
    fontFamily: 'Inter',
  },
  continueButtonDisabled: {
    opacity: 0.6,
  },
  arrowContainer: {
    width: 9,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Pricing section - exactly like trial offer screen
  pricingSection: {
    paddingHorizontal: 24,
    paddingBottom: 8,
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

  // Restore section - moved up
  restoreSection: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
