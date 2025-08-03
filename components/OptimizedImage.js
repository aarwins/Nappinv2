import React, { useState, useEffect } from 'react';
import { Image, View, ActivityIndicator, StyleSheet } from 'react-native';
import imagePreloader from '../utils/imagePreloader';

const OptimizedImage = ({ 
  source, 
  style, 
  resizeMode = 'contain',
  showLoader = true,
  loaderColor = '#B7AFC5',
  ...props 
}) => {
  const [loading, setLoading] = useState(() => {
    // Check if image is preloaded on initial render
    if (typeof source === 'string' || (source && source.uri)) {
      const uri = typeof source === 'string' ? source : source.uri;
      return !imagePreloader.isRemoteImagePreloaded(uri);
    } else if (source) {
      return !imagePreloader.isLocalAssetPreloaded(source);
    }
    return true;
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    // Check if this image is already preloaded whenever source changes
    let isPreloaded = false;
    
    if (typeof source === 'string' || (source && source.uri)) {
      // Remote image
      const uri = typeof source === 'string' ? source : source.uri;
      isPreloaded = imagePreloader.isRemoteImagePreloaded(uri);
    } else if (source) {
      // Local asset
      isPreloaded = imagePreloader.isLocalAssetPreloaded(source);
    }

    if (isPreloaded) {
      // Image is preloaded, so it should load instantly
      setLoading(false);
    } else {
      // Image is not preloaded, show loader
      setLoading(true);
    }
  }, [source]);

  const handleLoadStart = () => {
    setLoading(true);
    setError(false);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  // For preloaded images, we can optionally skip showing the loader initially
  const shouldShowLoader = () => {
    if (!showLoader) return false;
    
    // Check if image is preloaded
    if (typeof source === 'string' || (source && source.uri)) {
      const uri = typeof source === 'string' ? source : source.uri;
      return !imagePreloader.isRemoteImagePreloaded(uri);
    } else if (source) {
      return !imagePreloader.isLocalAssetPreloaded(source);
    }
    
    return true;
  };

  return (
    <View style={[style, styles.container]}>
      <Image
        source={source}
        style={[StyleSheet.absoluteFill, style]}
        resizeMode={resizeMode}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        {...props}
      />
      {loading && shouldShowLoader() && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator 
            size="small" 
            color={loaderColor}
          />
        </View>
      )}
      {error && (
        <View style={styles.errorContainer}>
          {/* Could add error placeholder here */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(229, 232, 236, 0.3)',
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E8EC',
  },
});

export default OptimizedImage;