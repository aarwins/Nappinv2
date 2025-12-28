import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Svg, Path, G, Defs, ClipPath } from 'react-native-svg';
import {
  fetchProductsForDevice,
  formatPrice,
  formatTrial,
} from '../services/subscriptionProductsService';
import { Alert } from 'react-native';

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
    <G clipPath="url(#clip0_333_14)">
      <Path
        d="M11.0297 2.47031C11.3226 2.76328 11.3226 3.23906 11.0297 3.53203L5.02968 9.53203C4.73671 9.82499 4.26093 9.82499 3.96796 9.53203L0.967957 6.53203C0.674988 6.23906 0.674988 5.76328 0.967957 5.47031C1.26093 5.17734 1.73671 5.17734 2.02968 5.47031L4.49999 7.93828L9.9703 2.47031C10.2633 2.17734 10.7391 2.17734 11.032 2.47031H11.0297Z"
        fill="#FDFDFD"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_333_14">
        <Path d="M0.75 0H11.25V12H0.75V0Z" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

const LockIcon = () => (
  <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
    <G clipPath="url(#clip0_333_54)">
      <Path
        d="M4.28125 3.375V4.5H8.03125V3.375C8.03125 2.33906 7.19219 1.5 6.15625 1.5C5.12031 1.5 4.28125 2.33906 4.28125 3.375ZM2.78125 4.5V3.375C2.78125 1.51172 4.29297 0 6.15625 0C8.01953 0 9.53125 1.51172 9.53125 3.375V4.5H9.90625C10.7336 4.5 11.4062 5.17266 11.4062 6V10.5C11.4062 11.3273 10.7336 12 9.90625 12H2.40625C1.57891 12 0.90625 11.3273 0.90625 10.5V6C0.90625 5.17266 1.57891 4.5 2.40625 4.5H2.78125Z"
        fill="#FDFDFD"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_333_54">
        <Path d="M0.90625 0H11.4062V12H0.90625V0Z" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

const FeatureItem = ({ children, marginBottom = 15 }) => (
  <View style={[styles.featureItem, { marginBottom }]}>
    <View style={styles.checkIconContainer}>
      <CheckIcon />
    </View>
    <Text style={styles.featureText}>{children}</Text>
  </View>
);

const PricingOption = ({ title, price, trial, isSelected, onPress, showBadge = false, monthlyEquivalent, originalYearlyPrice, customHeight }) => (
  <TouchableOpacity
    style={[
      styles.pricingOption, 
      isSelected && styles.selectedPricingOption,
      customHeight && { height: customHeight.base },
      isSelected && customHeight && { height: customHeight.selected }
    ]}
    onPress={onPress}
  >
    <View style={styles.pricingContent}>
      <Text style={styles.pricingTitle}>{title}</Text>
      {monthlyEquivalent ? (
        <View style={styles.monthlyEquivalentContainer}>
          <Text style={styles.pricingPrice}>{monthlyEquivalent}</Text>
          <Text style={styles.billingNote}>billed yearly ({originalYearlyPrice})</Text>
        </View>
      ) : (
        <Text style={styles.pricingPrice}>{price}</Text>
      )}
      <Text style={styles.pricingTrial}>{trial}</Text>
    </View>
    {showBadge && (
      <View style={styles.bestValueBadge}>
        <Text style={styles.bestValueText}>Best Value</Text>
      </View>
    )}
  </TouchableOpacity>
);

export default function NappinAdvancedPaywallScreen({ navigation }) {
  const [selectedPlan, setSelectedPlan] = useState('yearly');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch subscription products from backend on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        // Fetch products for non_watch device type (Advanced plans)
        const fetchedProducts = await fetchProductsForDevice('non_watch');
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('[NappinAdvancedPaywallScreen] Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Get the selected product based on selectedPlan
  const yearlyProduct = products.find((p) => p.sku === 'advanced_yearly');
  const monthlyProduct = products.find((p) => p.sku === 'advanced_monthly');

  const handleBack = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleContinue = () => {
    // Handle continue with selected plan
    console.log('Continue with plan:', selectedPlan);
    // Navigate to setup screen
    if (navigation) {
      navigation.navigate('NappinAdvancedSetup');
    }
  };

  const handleRestorePurchase = () => {
    // TODO: Implement restore via Edge Function restore-subscription when StoreKit is configured
    Alert.alert(
      'Restore Purchase',
      'Restore is not available in Simulator unless StoreKit test config is set up. If you have no purchases, nothing will happen.'
    );
  };

  const handleUseFreePlan = () => {
    // Navigate to Home screen instead of deleted NappinFree
    if (navigation) {
      navigation.navigate('Home');
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
          <Text style={styles.headerTitle}>Nappin Advanced</Text>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Main Title */}
          <Text style={styles.mainTitle}>
            Unlocks Nappin AI algorithms that predict when you fall asleep!
          </Text>

          {/* Features Container */}
          <View style={styles.featuresContainer}>
            <FeatureItem marginBottom={11}>
              With Nappin Advanced we are able to set accurate alarms so you never wake up feeling groggy or even more tired than before.
            </FeatureItem>

            <FeatureItem marginBottom={11}>
              Our Nappin AI algorithms start your nap timer the predicted moment you fall asleep based on inputted data from you and wakes you while you're still in a light sleep stage.
            </FeatureItem>

            <FeatureItem marginBottom={0}>
              Enjoy many other features with a completely ad-free experience.
            </FeatureItem>
          </View>

          {/* Pricing Options - Loaded from backend */}
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading pricing...</Text>
              <ActivityIndicator size="small" color="#B7AFC5" style={{ marginTop: 8 }} />
            </View>
          ) : products.length > 0 ? (
            <View style={styles.pricingContainer}>
              {yearlyProduct && (
                <PricingOption
                  title="1 Year"
                  price={`${formatPrice(yearlyProduct.price_cents, yearlyProduct.currency)} / yr`}
                  monthlyEquivalent={`${formatPrice(Math.round(yearlyProduct.price_cents / 12), yearlyProduct.currency)} / mo`}
                  originalYearlyPrice={formatPrice(yearlyProduct.price_cents, yearlyProduct.currency)}
                  trial={formatTrial(yearlyProduct.trial_days)}
                  isSelected={selectedPlan === 'yearly'}
                  onPress={() => setSelectedPlan('yearly')}
                  showBadge={true}
                  customHeight={{ base: 90, selected: 106 }}
                />
              )}

              {monthlyProduct && (
                <PricingOption
                  title="1 Month"
                  price={`${formatPrice(monthlyProduct.price_cents, monthlyProduct.currency)} / mo`}
                  trial={formatTrial(monthlyProduct.trial_days)}
                  isSelected={selectedPlan === 'monthly'}
                  onPress={() => setSelectedPlan('monthly')}
                />
              )}
            </View>
          ) : (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>No pricing available</Text>
            </View>
          )}

          {/* Continue Button */}
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueText}>Start Free Trial</Text>
          </TouchableOpacity>

          {/* Secondary Actions */}
          <View style={styles.secondaryActions}>
            <TouchableOpacity onPress={handleRestorePurchase}>
              <Text style={styles.secondaryActionText}>Restore Purchase</Text>
            </TouchableOpacity>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.secondaryActionText}>Cancel your subscription anytime.</Text>
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
    paddingTop: 10,
    paddingBottom: 0,
    height: 38,
    backgroundColor: '#1E2A38',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 13,
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
  content: {
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FDFDFD',
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 22,
    fontFamily: 'Inter',
  },
  featuresContainer: {
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    paddingTop: 12,
    paddingBottom: 18,
    paddingHorizontal: 16,
    marginBottom: 6,
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
    paddingTop: 0,
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
    height: 80,
    justifyContent: 'center',
  },
  selectedPricingOption: {
    borderColor: '#B7AFC5',
    backgroundColor: '#E5E8EC',
    height: 96,
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
  monthlyEquivalentContainer: {
    marginBottom: 3,
  },
  billingNote: {
    fontSize: 11,
    fontWeight: '400',
    color: '#666666',
    lineHeight: 14,
    fontFamily: 'Inter',
    marginTop: 1,
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
    paddingTop: 15,
    paddingBottom: 13,
    alignItems: 'center',
    marginBottom: 16,
    height: 56,
    justifyContent: 'center',
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
    height: 24,
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
  loadingContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
