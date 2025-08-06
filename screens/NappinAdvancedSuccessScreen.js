import React from 'react';
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

export default function NappinAdvancedSuccessScreen({ navigation, route }) {
  // Check if user came from Apple Watch flow
  const fromAppleWatch = route?.params?.fromAppleWatch || false;

  const handleBack = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleGoHome = () => {
    // Navigate to home screen
    console.log('Navigate to home screen');
    if (navigation) {
      navigation.navigate('Home');
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
          <Text style={[styles.headerTitle, fromAppleWatch && styles.headerTitleLong]}>
            {fromAppleWatch ? 'Congrats you\'re good to go!' : 'Nappin AI Set Up Complete!'}
          </Text>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
                  {/* Celebration Image */}
        <View style={styles.imageSection}>
          <OptimizedImage
            source={require('../assets/celreveve.png')}
            style={styles.celebrationImage}
            resizeMode="contain"
            showLoader={false}
          />
        </View>

          {/* Success Message */}
          <Text style={styles.successTitle}>
            {fromAppleWatch ? 'Nappin AI and Apple Watch Connectivity are now active.' : 'Nappin AI is now active.'}
          </Text>

          {/* Description Text */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>
              {fromAppleWatch 
                ? 'Your personalized nap recommendations are ready based on your sleep data and preferences.'
                : 'We\'ll use your sleep data to start the timer the moment you doze off and wake you in light sleep, so every nap feels refreshing.'
              }
            </Text>
          </View>

          {/* Go Home Button */}
          <TouchableOpacity style={styles.primaryButton} onPress={handleGoHome}>
            <Text style={styles.primaryButtonText}>Go Home</Text>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    height: 48,
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
    headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FDFDFD',
    fontFamily: 'Inter',
    textAlign: 'center',
    flex: 1,
    marginLeft: 40,
    marginRight: 16,
  },
  headerTitleLong: {
    fontSize: 22,
    marginLeft: 30,
    marginRight: 10,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 2,
    alignItems: 'center',
    flex: 1,
  },
  imageSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 1,
  },
  celebrationImage: {
    width: 291,
    height: 291,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FDFDFD',
    textAlign: 'center',
    lineHeight: 32,
    fontFamily: 'Inter',
    marginBottom: 8,
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FDFDFD',
    textAlign: 'center',
    fontFamily: 'Inter',
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: '#B7AFC5',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    width: '100%',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FDFDFD',
    textAlign: 'center',
    fontFamily: 'Inter',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#B7AFC5',
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    width: '100%',
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FDFDFD',
    textAlign: 'center',
    fontFamily: 'Inter',
  },
});
