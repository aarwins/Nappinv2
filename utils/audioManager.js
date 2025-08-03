import { Audio } from 'expo-av';

class AudioManager {
  constructor() {
    this.currentSound = null;
    this.isPlaying = false;
    this.currentProgress = 0;
    this.duration = 0;
    this.progressUpdateInterval = null;
    this.onProgressUpdate = null;
    this.onPlaybackStatusUpdate = null;
    this.hasFinished = false; // Flag to prevent repeated finish callbacks
  }

  // Initialize audio mode
  async initialize() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        interruptionModeIOS: 1, // DoNotMix
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: 1, // DoNotMix
        playThroughEarpieceAndroid: false
      });
      console.log('Audio mode initialized');
    } catch (error) {
      console.error('Failed to initialize audio mode:', error);
    }
  }

  // Load and play audio file
  async playSound(audioSource, onProgressCallback = null, onStatusCallback = null, shouldLoop = false) {
    try {
      // Stop current sound if playing
      await this.stopSound();

      this.onProgressUpdate = onProgressCallback;
      this.onPlaybackStatusUpdate = onStatusCallback;

      // Create new sound object
      const { sound } = await Audio.Sound.createAsync(
        audioSource,
        { 
          shouldPlay: true,
          isLooping: shouldLoop,
          volume: 1.0 
        },
        this._onPlaybackStatusUpdate.bind(this)
      );

      this.currentSound = sound;
      this.isPlaying = true;

      console.log(`Sound loaded and playing, looping: ${shouldLoop}`);
      return sound;

    } catch (error) {
      console.error('Error playing sound:', error);
      throw error;
    }
  }

  // Pause current sound
  async pauseSound() {
    try {
      if (this.currentSound && this.isPlaying) {
        await this.currentSound.pauseAsync();
        this.isPlaying = false;
        console.log('Sound paused');
      }
    } catch (error) {
      console.error('Error pausing sound:', error);
    }
  }

  // Resume paused sound
  async resumeSound() {
    try {
      if (this.currentSound && !this.isPlaying) {
        await this.currentSound.playAsync();
        this.isPlaying = true;
        console.log('Sound resumed');
      }
    } catch (error) {
      console.error('Error resuming sound:', error);
    }
  }

  // Stop current sound
  async stopSound() {
    try {
      if (this.currentSound) {
        await this.currentSound.stopAsync();
        await this.currentSound.unloadAsync();
        this.currentSound = null;
        this.isPlaying = false;
        this.currentProgress = 0;
        this.hasFinished = false; // Reset finish flag
        this.onProgressUpdate = null;
        this.onPlaybackStatusUpdate = null;
        
        if (this.progressUpdateInterval) {
          clearInterval(this.progressUpdateInterval);
          this.progressUpdateInterval = null;
        }
        
        console.log('Sound stopped and unloaded');
      }
    } catch (error) {
      console.error('Error stopping sound:', error);
    }
  }

  // Seek to specific position (in milliseconds)
  async seekTo(positionMillis) {
    try {
      if (this.currentSound) {
        await this.currentSound.setPositionAsync(positionMillis);
        console.log(`Seeked to position: ${positionMillis}ms`);
      }
    } catch (error) {
      console.error('Error seeking:', error);
    }
  }

  // Set volume (0.0 to 1.0)
  async setVolume(volume) {
    try {
      if (this.currentSound) {
        await this.currentSound.setVolumeAsync(volume);
        console.log(`Volume set to: ${volume}`);
      }
    } catch (error) {
      console.error('Error setting volume:', error);
    }
  }

  // Internal method to handle playback status updates
  _onPlaybackStatusUpdate(status) {
    if (status.isLoaded) {
      this.duration = status.durationMillis || 0;
      this.currentProgress = status.positionMillis || 0;

      // Calculate progress percentage
      const progressPercentage = this.duration > 0 ? this.currentProgress / this.duration : 0;

      // Only call progress callback during normal playback (not when finished)
      if (this.onProgressUpdate && !status.didJustFinish) {
        this.onProgressUpdate({
          currentTime: this.currentProgress,
          duration: this.duration,
          progress: progressPercentage,
          isPlaying: status.isPlaying,
          isLoaded: status.isLoaded
        });
      }

      // Update playing state
      this.isPlaying = status.isPlaying;

      // Handle playback completion (only call once)
      if (status.didJustFinish && !this.hasFinished) {
        this.isPlaying = false;
        this.hasFinished = true;
        console.log('Playback finished naturally, isLooping:', status.isLooping);
        
        // Only clean up if not looping (looping sounds should continue)
        if (!status.isLooping) {
          // Clean up the sound object when playback finishes
          if (this.currentSound) {
            this.currentSound.unloadAsync().catch(err => console.log('Error unloading sound:', err));
            this.currentSound = null;
          }
          this.currentProgress = 0;
          
          // Call status callback for finish event
          if (this.onPlaybackStatusUpdate) {
            this.onPlaybackStatusUpdate(status);
          }
        } else {
          console.log('Sound is looping, manually restarting to avoid gap');
          // For seamless looping, manually restart the sound
          this.hasFinished = false;
          this.isPlaying = true;
          
          // Manually restart the sound for seamless looping
          setTimeout(async () => {
            try {
              if (this.currentSound) {
                await this.currentSound.setPositionAsync(0);
                await this.currentSound.playAsync();
                console.log('Sound manually restarted for seamless loop');
              }
            } catch (error) {
              console.error('Error manually restarting looped sound:', error);
            }
          }, 50); // Small delay to ensure smooth transition
        }
      }
    }
  }

  // Get current playback status
  getPlaybackStatus() {
    return {
      isPlaying: this.isPlaying,
      currentProgress: this.currentProgress,
      duration: this.duration,
      progressPercentage: this.duration > 0 ? this.currentProgress / this.duration : 0
    };
  }

  // Cleanup method
  async cleanup() {
    await this.stopSound();
    console.log('AudioManager cleanup completed');
  }
}

// Create singleton instance
const audioManager = new AudioManager();

export default audioManager;