import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Svg, Path } from 'react-native-svg';
import OptimizedImage from '../components/OptimizedImage';

const BackArrowIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M0.439453 10.9441C-0.146484 11.5301 -0.146484 12.4816 0.439453 13.0676L7.93945 20.5676C8.52539 21.1535 9.47695 21.1535 10.0629 20.5676C10.6488 19.9816 10.6488 19.0301 10.0629 18.4441L5.11758 13.5035H19.4988C20.3285 13.5035 20.9988 12.8332 20.9988 12.0035C20.9988 11.1738 20.3285 10.5035 19.4988 10.5035H5.12227L10.0582 5.56289C10.6441 4.97695 10.6441 4.02539 10.0582 3.43945C9.47227 2.85352 8.5207 2.85352 7.93477 3.43945L0.434766 10.9395L0.439453 10.9441Z"
      fill="#FDFDFD"
    />
  </Svg>
);

export default function SpecialOfferScreen({ navigation, route }) {
  const [selectedPlan, setSelectedPlan] = useState('yearly');
  const fromIntegrations = route?.params?.fromIntegrations || false;

  const handleBack = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleClaimOffer = () => {
    // Handle claiming the discount offer - navigate to Apple Watch setup for trial users
    console.log('Claim discount offer');
    if (navigation) {
      navigation.navigate('AppleWatchSetup');
    }
  };

  const handleRestorePurchase = () => {
    // Handle restore purchase
    console.log('Restore purchase');
  };

  const handleNoThanks = () => {
    // Handle declining the offer - different flow based on where user came from
    console.log('No thanks');
    if (navigation) {
      if (fromIntegrations) {
        // When coming from integrations, go to Home
        navigation.navigate('Home');
      } else {
        // Normal flow - navigate to NappinAdvancedPaywallScreen
        navigation.navigate('NappinAdvancedPaywall');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <BackArrowIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Special Offer</Text>
        </View>

        {/* Main Content Container */}
        <View style={styles.mainContainer}>
          {/* Logo/Image Section */}
          <View style={styles.logoSection}>
            <OptimizedImage
              source={{ uri: 'https://api.builder.io/api/v1/image/assets/TEMP/df5d300843af3e98a907c147cea1854b7128ade8?width=578' }}
              style={styles.logoImage}
              resizeMode="contain"
              showLoader={true}
              loaderColor="#B7AFC5"
            />
          </View>

          {/* Promotional Text */}
          <View style={styles.promotionalSection}>
            <Text style={styles.promotionalText}>Save 25% on Precision today!</Text>
            <Text style={styles.oneTimeOfferText}>You won't see this again, treat yourself to better rest.</Text>
          </View>

          {/* Pricing Cards Section */}
          <View style={styles.pricingSection}>
            {/* Yearly Plan - Best Value */}
            <View style={styles.yearlyPlanContainer}>
              <View style={styles.bestValueBadge}>
                <Text style={styles.bestValueText}>BEST VALUE</Text>
              </View>
              <TouchableOpacity
                style={[styles.pricingCard, selectedPlan === 'yearly' && styles.selectedCard]}
                onPress={() => setSelectedPlan('yearly')}
              >
                <View style={styles.pricingContent}>
                  <View style={styles.priceRow}>
                    <Text style={styles.currentPrice}>$3.75 / mo</Text>
                    <Text style={styles.originalPrice}>$4.99</Text>
                  </View>
                  <Text style={styles.billingNoteSpecial}>billed yearly ($44.99)</Text>
                  <Text style={styles.trialText}>14-day free trial</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Monthly Plan */}
            <TouchableOpacity
              style={[styles.monthlyPricingCard, selectedPlan === 'monthly' && styles.selectedCard]}
              onPress={() => setSelectedPlan('monthly')}
            >
              <View style={styles.pricingContent}>
                <View style={styles.priceRow}>
                  <Text style={styles.monthlyCurrentPrice}>$5.99 / mo</Text>
                  <Text style={styles.monthlyOriginalPrice}>$7.99</Text>
                </View>
                <Text style={styles.monthlyTrialText}>7-day free trial</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Claim Offer Button */}
          <View style={styles.claimButtonSection}>
            <TouchableOpacity style={styles.claimButton} onPress={handleClaimOffer}>
              <Text style={styles.claimButtonText}>Claim Discount & Start Trial</Text>
            </TouchableOpacity>
          </View>

          {/* Secondary Actions */}
          <View style={styles.secondaryActions}>
            <TouchableOpacity onPress={handleRestorePurchase}>
              <Text style={styles.secondaryActionText}>Restore Purchase</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNoThanks}>
              <Text style={styles.secondaryActionText}>No thanks</Text>
            </TouchableOpacity>
          </View>

          {/* Legal Disclaimer */}
          <View style={styles.disclaimerSection}>
            <Text style={styles.disclaimerText}>
              Payment will be charged to Apple Account at confirmation of purchase. Subscription automatically renews unless auto-renew is turned off at least 24-hours before the end of the current period.
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
  mainContainer: {
    flex: 1,
    paddingHorizontal: 16,
    position: 'relative',
  },
  logoSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
    marginTop: -10,
    marginBottom: 0,
  },
  logoImage: {
    width: 289,
    height: 289,
    aspectRatio: 1,
  },
  promotionalSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingBottom: 5,
    paddingTop: 0,
    height: 50,
    marginBottom: -20,
  },
  promotionalText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FDFDFD',
    textAlign: 'center',
    lineHeight: 32,
    fontFamily: 'Inter',
  },
  oneTimeOfferText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#B7AFC5',
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: 'Inter',
    marginTop: -2,
  },
  pricingSection: {
    marginBottom: 30,
    marginTop: 20,
  },
  yearlyPlanContainer: {
    position: 'relative',
    marginBottom: 12,
    marginTop: 15,
  },
  bestValueBadge: {
    position: 'absolute',
    top: -6,
    right: 18,
    backgroundColor: '#B7AFC5',
    borderRadius: 4,
    paddingHorizontal: 7,
    paddingVertical: 2,
    zIndex: 2,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bestValueText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FDFDFD',
    fontFamily: 'Inter',
  },
  pricingCard: {
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 18,
    height: 96,
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
  selectedCard: {
    borderColor: '#B7AFC5',
    backgroundColor: '#F3F1F6',
    transform: [{ scale: 1.02 }],
  },
  monthlyPlanContainer: {
    marginBottom: 6,
  },
  monthlyPricingCard: {
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    paddingHorizontal: 17,
    paddingVertical: 17,
    height: 78,
  },
  pricingContent: {
    flex: 1,
    justifyContent: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  currentPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E2A38',
    lineHeight: 28,
    fontFamily: 'Inter',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8B7A99',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter',
    lineHeight: 16,
  },
  billingNoteSpecial: {
    fontSize: 11,
    fontWeight: '400',
    color: '#666666',
    lineHeight: 14,
    fontFamily: 'Inter',
    marginBottom: 2,
  },
  trialText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#1E2A38',
    lineHeight: 16,
    fontFamily: 'Inter',
  },
  monthlyCurrentPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E2A38',
    lineHeight: 28,
    fontFamily: 'Inter',
    marginRight: 7,
  },
  monthlyOriginalPrice: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8B7A99',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter',
    lineHeight: 16,
  },
  monthlyTrialText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#1E2A38',
    lineHeight: 16,
    fontFamily: 'Inter',
  },
  claimButtonSection: {
    marginBottom: 16,
    marginTop: -8,
  },
  claimButton: {
    backgroundColor: '#B7AFC5',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 59,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
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
  claimButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FDFDFD',
    textAlign: 'center',
    fontFamily: 'Inter',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  secondaryActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 73,
    gap: 24,
    marginBottom: 24,
    height: 20,
  },
  secondaryActionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#B7AFC5',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontFamily: 'Inter',
    lineHeight: 20,
  },
  disclaimerSection: {
    paddingHorizontal: 15,
    paddingTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    marginTop: -11,
  },
  disclaimerText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#FDFDFD',
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: 'Inter',
  },
});
