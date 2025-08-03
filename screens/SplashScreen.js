import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OptimizedImage from '../components/OptimizedImage';
import { preloadAllImages } from '../utils/imagePreloader';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function SplashScreen() {
  const navigation = useNavigation();
  const [fadeAnim] = useState(new Animated.Value(1)); // Start fully opaque

  useEffect(() => {
    // Start preloading all images silently in the background
    const startPreloading = async () => {
      console.log('Starting image preloading...');
      
      const success = await preloadAllImages();
      
      if (success) {
        console.log('All images preloaded successfully');
      } else {
        console.warn('Some images failed to preload, continuing anyway');
      }
    };

    startPreloading();
  }, []);

  useEffect(() => {
    // Fade out the navy overlay after 1 second
    const fadeTimer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500, // 500ms fade transition
        useNativeDriver: true,
      }).start();
    }, 1000); // Wait 1 second before starting fade

    return () => clearTimeout(fadeTimer);
  }, [fadeAnim]);

  useEffect(() => {
    // Navigate after exactly 2.5 seconds
    const timer = setTimeout(() => {
      navigation.replace('GoalSelection');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <OptimizedImage
          source={require('../assets/splashlogo.png')}
          style={styles.logoImage}
          resizeMode="contain"
          showLoader={true}
          loaderColor="#B7AFC5"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.subtitle}>One Step Closer to a Productive Nap</Text>
      </View>
      
      {/* Navy blue overlay that fades out */}
      <Animated.View 
        style={[
          styles.overlay,
          {
            opacity: fadeAnim,
          }
        ]}
        pointerEvents="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2A38',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.6,
  },
  textContainer: {
    position: 'absolute',
    top: (screenHeight / 2) + 100,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    color: '#B7AFC5',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 30,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#1E2A38',
    zIndex: 10,
  },
});
