import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path, G, Defs, ClipPath } from 'react-native-svg';

const WakeToneDropdown = ({ 
  title = "Morning Birds",
  duration = "03:00",
  icon = null,
  playbackProgress = 0.4, // How far through the sound (0-1)
  isPlaying = false, // Whether audio is currently playing
  isAmbientSound = false, // Whether this is an ambient sound (hides progress bar)
  onPlay = () => {},
  onSave = () => {},
  onClose = () => {}
}) => {
  const [currentProgress, setCurrentProgress] = useState(playbackProgress);
  
  // Update internal progress when prop changes
  useEffect(() => {
    setCurrentProgress(playbackProgress);
  }, [playbackProgress]);
  
  // Convert duration string to seconds
  const parseDurationToSeconds = (durationStr) => {
    if (durationStr === '∞') return 0;
    const parts = durationStr.split(':');
    const minutes = parseInt(parts[0] || 0);
    const seconds = parseInt(parts[1] || 0);
    return minutes * 60 + seconds;
  };
  
  // Format seconds to MM:SS
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Calculate current time and total duration
  let totalSeconds, currentSeconds, currentTime, totalTime;
  
  if (isAmbientSound) {
    // For ambient sounds, show playing status instead of progress
    if (isPlaying) {
      currentTime = 'Playing';
      totalTime = '∞';
    } else {
      currentTime = 'Paused';
      totalTime = '∞';
    }
  } else {
    // For wake tones, use the 15-second preview logic
    totalSeconds = 15; // Always 15 seconds for wake tones
    currentSeconds = totalSeconds * currentProgress;
    currentTime = formatTime(currentSeconds);
    totalTime = '0:15'; // Always show 0:15 for wake tones
  }

  const BirdIcon = () => (
    <Svg width={36} height={36} viewBox="0 0 36 36" fill="none">
      <G clipPath="url(#clip0_272_474)">
        <Path
          d="M11.3063 6.78516C12.2906 7.98047 13.486 8.95782 14.7867 9.75235C16.6078 10.8633 18.5625 11.5734 20.25 11.9742V9.75938C18.6891 7.62891 17.5781 5.02735 17.4797 1.96875C17.4516 1.17422 16.9524 0.457034 16.186 0.253128C15.6516 0.112503 15.075 0.239065 14.7094 0.66094C13.7742 1.74375 12.4102 3.79688 11.3063 6.79219V6.78516ZM22.5 10.125V12.2766V12.368V14.625C18.225 14.2664 9.49221 11.5453 7.08049 3.57188C6.84846 2.8125 6.18049 2.25 5.38596 2.25C4.83049 2.25 4.31017 2.52422 4.06408 3.02344C3.29064 4.6336 2.25002 7.88203 2.25002 12.375C2.25002 20.5945 7.88205 25.0664 10.575 26.6344L0.829706 29.2922C0.471113 29.3906 0.182831 29.6578 0.0633002 30.0094C-0.0562311 30.3609 0.00705018 30.7547 0.225019 31.05C1.5258 32.7797 5.43517 36 11.25 36C11.5031 36 11.7563 35.9156 11.9531 35.7539L17.2688 31.5H22.5C28.7156 31.5 33.75 26.4656 33.75 20.25V9L35.8524 5.84297C35.9438 5.70235 36 5.5336 36 5.36485C36 4.88672 35.6133 4.5 35.1352 4.5H28.125C25.0172 4.5 22.5 7.01719 22.5 10.125ZM28.125 9C28.4234 9 28.7095 9.11853 28.9205 9.32951C29.1315 9.54049 29.25 9.82663 29.25 10.125C29.25 10.4234 29.1315 10.7095 28.9205 10.9205C28.7095 11.1315 28.4234 11.25 28.125 11.25C27.8267 11.25 27.5405 11.1315 27.3295 10.9205C27.1185 10.7095 27 10.4234 27 10.125C27 9.82663 27.1185 9.54049 27.3295 9.32951C27.5405 9.11853 27.8267 9 28.125 9Z"
          fill="#1E2A38"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_272_474">
          <Path d="M0 0H36V36H0V0Z" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );

  const ChevronIcon = () => (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M24 24H0V0H24V24Z" stroke="#E5E7EB" />
      <Path
        d="M10.9406 19.0594C11.5265 19.6453 12.4781 19.6453 13.064 19.0594L22.064 10.0594C22.65 9.47341 22.65 8.52185 22.064 7.93591C21.4781 7.34998 20.5265 7.34998 19.9406 7.93591L12 15.8765L4.05935 7.9406C3.47341 7.35466 2.52185 7.35466 1.93591 7.9406C1.34998 8.52654 1.34998 9.4781 1.93591 10.064L10.9359 19.064L10.9406 19.0594Z"
        fill="#1E2A38"
      />
    </Svg>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {icon || <BirdIcon />}
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={onClose} style={styles.chevronContainer}>
          <ChevronIcon />
        </TouchableOpacity>
      </View>

      {/* Playback Progress Bar with Slider - Hidden for ambient sounds */}
      {!isAmbientSound && (
        <View style={styles.sliderContainer}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${currentProgress * 100}%` }]} />
            <View 
              style={[
                styles.sliderHandle, 
                { left: `${currentProgress * 100 - 2.5}%` }
              ]} 
            />
          </View>
        </View>
      )}

      {/* Duration and Progress Info */}
      <View style={styles.durationContainer}>
        <Text style={styles.duration}>{currentTime} / {totalTime}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.playButton} onPress={onPlay}>
          <Text style={styles.playButtonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 358,
    height: 212,
    borderRadius: 12,
    backgroundColor: '#E5E8EC',
    position: 'relative',
  },
  header: {
    width: 326,
    height: 36,
    position: 'absolute',
    left: 16,
    top: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    width: 126,
    height: 28,
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
    position: 'absolute',
    left: 48,
    top: 4,
  },
  chevronContainer: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 0,
    top: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderContainer: {
    position: 'absolute',
    left: 16,
    top: 73,
    width: 326,
    height: 4,
  },
  progressTrack: {
    width: '100%',
    height: 4,
    borderRadius: 9999,
    backgroundColor: 'rgba(30, 42, 56, 0.4)',
    position: 'relative',
  },
  progressFill: {
    height: 4,
    borderRadius: 9999,
    backgroundColor: '#1E2A38',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  sliderHandle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#1E2A38',
    backgroundColor: '#B7AFC5',
    position: 'absolute',
    top: -6,
  },
  durationContainer: {
    position: 'absolute',
    left: 16,
    top: 102,
    width: 326,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  duration: {
    color: 'rgba(30, 42, 56, 0.8)',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  buttonContainer: {
    position: 'absolute',
    left: 16,
    top: 140,
    width: 326,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playButton: {
    width: 153,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#B7AFC5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonText: {
    color: '#FDFDFD',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
  },
  saveButton: {
    width: 157,
    height: 56,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#1E2A38',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#1E2A38',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default WakeToneDropdown;