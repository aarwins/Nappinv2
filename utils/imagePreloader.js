import { Image } from 'react-native';
import React from 'react';

class ImagePreloader {
  constructor() {
    this.preloadedImages = new Set();
    this.preloadedAssets = new Set();
    this.preloadProgress = { loaded: 0, total: 0 };
    this.onProgressUpdate = null;
  }

  // Preload a single remote image
  preloadRemoteImage(uri) {
    return new Promise((resolve, reject) => {
      if (this.preloadedImages.has(uri)) {
        resolve(uri);
        return;
      }

      Image.prefetch(uri)
        .then(() => {
          this.preloadedImages.add(uri);
          this._updateProgress();
          resolve(uri);
        })
        .catch(reject);
    });
  }

  // Preload a single local asset by forcing it to decode
  preloadLocalAsset(assetSource) {
    return new Promise((resolve) => {
      const assetKey = JSON.stringify(assetSource);
      
      if (this.preloadedAssets.has(assetKey)) {
        resolve(assetSource);
        return;
      }

      // Create a hidden image component to force asset loading
      const hiddenImage = React.createElement(Image, {
        source: assetSource,
        style: { width: 1, height: 1, opacity: 0, position: 'absolute' },
        onLoad: () => {
          this.preloadedAssets.add(assetKey);
          this._updateProgress();
          resolve(assetSource);
        },
        onError: () => {
          console.warn('Failed to preload asset:', assetSource);
          this._updateProgress();
          resolve(assetSource);
        }
      });

      // The image will start loading when rendered
      setTimeout(() => {
        this.preloadedAssets.add(assetKey);
        this._updateProgress();
        resolve(assetSource);
      }, 100);
    });
  }

  // Preload multiple images (mixed remote URLs and local assets)
  async preloadImages(imageList, onProgress) {
    this.onProgressUpdate = onProgress;
    this.preloadProgress = { loaded: 0, total: imageList.length };

    const promises = imageList.map(imageItem => {
      if (typeof imageItem === 'string') {
        // Remote URL
        return this.preloadRemoteImage(imageItem);
      } else {
        // Local asset (require() result)
        return this.preloadLocalAsset(imageItem);
      }
    });

    try {
      await Promise.all(promises);
      console.log('All images preloaded successfully');
      return true;
    } catch (error) {
      console.warn('Failed to preload some images:', error);
      return false;
    }
  }

  // Update progress and notify callback
  _updateProgress() {
    this.preloadProgress.loaded++;
    if (this.onProgressUpdate) {
      this.onProgressUpdate(this.preloadProgress);
    }
  }

  // Clear preloaded cache
  clearCache() {
    this.preloadedImages.clear();
    this.preloadedAssets.clear();
    this.preloadProgress = { loaded: 0, total: 0 };
  }

  // Check if remote image is preloaded
  isRemoteImagePreloaded(uri) {
    return this.preloadedImages.has(uri);
  }

  // Check if local asset is preloaded
  isLocalAssetPreloaded(assetSource) {
    const assetKey = JSON.stringify(assetSource);
    return this.preloadedAssets.has(assetKey);
  }

  // Get current progress
  getProgress() {
    return this.preloadProgress;
  }
}

// Create a singleton instance
const imagePreloader = new ImagePreloader();

// All local assets available in the app
const LOCAL_ASSETS = {
  splashlogo: require('../assets/splashlogo.png'),
  napready: require('../assets/napready.png'),
  lestrest: require('../assets/lestrest.png'),
  fixed: require('../assets/fixed.png'),
  celreveve: require('../assets/celreveve.png'),
  mascot: require('../assets/nappin_mascot_final_original-removebg-preview (1).png'),
  napcompletecloud: require('../assets/napcompletecloud.png'),
  startnapcloud: require('../assets/startnapcloud.png'),
  off25: require('../assets/25%off.png'),
  imageedit: require('../assets/imageedit_5_9909093779.png'),
  icon: require('../assets/icon.png'),
  adaptiveIcon: require('../assets/adaptive-icon.png'),
  splashIcon: require('../assets/splash-icon.png'),
  favicon: require('../assets/favicon.png'),
};

// All remote images used in the app
const REMOTE_IMAGES = [
  'https://api.builder.io/api/v1/image/assets/TEMP/df5d300843af3e98a907c147cea1854b7128ade8?width=578',
  'https://api.builder.io/api/v1/image/assets/TEMP/d8572b253ed821491afe46a12466714cbe4a0c92?width=586',
  'https://api.builder.io/api/v1/image/assets/TEMP/1a97815c0b1f546036843b0ecef16e1b51c2e7dc?width=612',
  'https://api.builder.io/api/v1/image/assets/TEMP/63c1eb4bbb4ac6366cad133ea2b75f3a87d522a9?width=578',
];

// Preload all images used in the app
export const preloadAllImages = async (onProgress) => {
  // Combine local assets and remote images
  const allImages = [
    ...Object.values(LOCAL_ASSETS),
    ...REMOTE_IMAGES
  ];

  console.log(`Starting to preload ${allImages.length} images...`);
  
  try {
    const success = await imagePreloader.preloadImages(allImages, onProgress);
    if (success) {
      console.log('All app images preloaded successfully');
    }
    return success;
  } catch (error) {
    console.warn('Failed to preload images:', error);
    return false;
  }
};

// Export local assets for easy importing
export { LOCAL_ASSETS };

export default imagePreloader;