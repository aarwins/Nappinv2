import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Svg, Path, G, Defs, ClipPath, Rect } from 'react-native-svg';
import napDataManager from '../utils/napDataManager';

// Home icon for Home tab
const HomeIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M10 2.5L2.5 8.75V17.5C2.5 17.8315 2.6317 18.1495 2.86612 18.3839C3.10054 18.6183 3.41848 18.75 3.75 18.75H7.5V13.75C7.5 13.4185 7.6317 13.1005 7.86612 12.8661C8.10054 12.6317 8.41848 12.5 8.75 12.5H11.25C11.5815 12.5 11.8995 12.6317 12.1339 12.8661C12.3683 13.1005 12.5 13.4185 12.5 13.75V18.75H16.25C16.5815 18.75 16.8995 18.6183 17.1339 18.3839C17.3683 18.1495 17.5 17.8315 17.5 17.5V8.75L10 2.5Z"
      fill="#B7AFC5"
    />
  </Svg>
);

// Clock icon for History tab
const ClockIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <G clipPath="url(#clip0_243_104)">
      <Path
        d="M18.125 10C18.125 12.1549 17.269 14.2215 15.7452 15.7452C14.2215 17.269 12.1549 18.125 10 18.125C7.84512 18.125 5.77849 17.269 4.25476 15.7452C2.73102 14.2215 1.875 12.1549 1.875 10C1.875 7.84512 2.73102 5.77849 4.25476 4.25476C5.77849 2.73102 7.84512 1.875 10 1.875C12.1549 1.875 14.2215 2.73102 15.7452 4.25476C17.269 5.77849 18.125 7.84512 18.125 10ZM0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C4.8043 18.9464 7.34784 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 7.34784 18.9464 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10ZM9.0625 4.6875V10C9.0625 10.3125 9.21875 10.6055 9.48047 10.7812L13.2305 13.2812C13.6602 13.5703 14.2422 13.4531 14.5312 13.0195C14.8203 12.5859 14.7031 12.0078 14.2695 11.7188L10.9375 9.5V4.6875C10.9375 4.16797 10.5195 3.75 10 3.75C9.48047 3.75 9.0625 4.16797 9.0625 4.6875Z"
        fill="#FDFDFD"
        fillOpacity="0.6"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_243_104">
        <Rect width="20" height="20" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Profile icon for Profile tab
const ProfileIcon = () => (
  <Svg width={18} height={20} viewBox="0 0 18 20" fill="none">
    <G clipPath="url(#clip0_243_112)">
      <Path
        d="M12.0938 5C12.0938 4.1712 11.7645 3.37634 11.1785 2.79029C10.5924 2.20424 9.79755 1.875 8.96875 1.875C8.13995 1.875 7.34509 2.20424 6.75904 2.79029C6.17299 3.37634 5.84375 4.1712 5.84375 5C5.84375 5.8288 6.17299 6.62366 6.75904 7.20971C7.34509 7.79576 8.13995 8.125 8.96875 8.125C9.79755 8.125 10.5924 7.79576 11.1785 7.20971C11.7645 6.62366 12.0938 5.8288 12.0938 5ZM3.96875 5C3.96875 3.67392 4.49553 2.40215 5.43322 1.46447C6.3709 0.526784 7.64267 0 8.96875 0C10.2948 0 11.5666 0.526784 12.5043 1.46447C13.442 2.40215 13.9688 3.67392 13.9688 5C13.9688 6.32608 13.442 7.59785 12.5043 8.53553C11.5666 9.47322 10.2948 10 8.96875 10C7.64267 10 6.3709 9.47322 5.43322 8.53553C4.49553 7.59785 3.96875 6.32608 3.96875 5ZM2.14453 18.125H15.793C15.4453 15.6523 13.3203 13.75 10.7539 13.75H7.18359C4.61719 13.75 2.49219 15.6523 2.14453 18.125ZM0.21875 18.8398C0.21875 14.9922 3.33594 11.875 7.18359 11.875H10.7539C14.6016 11.875 17.7188 14.9922 17.7188 18.8398C17.7188 19.4805 17.1992 20 16.5586 20H1.37891C0.738281 20 0.21875 19.4805 0.21875 18.8398Z"
        fill="#FDFDFD"
        fillOpacity="0.6"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_243_112">
        <Path d="M0.21875 0H17.7188V20H0.21875V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Array of cycling nap tips (same as HomeScreen)
const napTips = [
  "The ideal nap length is 10-20 minutes to avoid grogginess and sleep inertia.",
  "Keep your nap room between 60-67°F (15-19°C) for optimal rest quality.",
  "Napping between 1-3 PM aligns with your natural circadian rhythm dip.",
  "Avoid caffeine 6 hours before your planned nap time for better sleep quality.",
  "Use a sleep mask or blackout curtains to create the perfect dark environment.",
  "Listen to brown noise or nature sounds to mask distracting background noises.",
  "Set your phone to Do Not Disturb mode to prevent interruptions during rest.",
  "Practice deep breathing: inhale for 4, hold for 7, exhale for 8 to relax quickly.",
  "Keep a consistent nap schedule to train your body's internal clock.",
  "Elevate your feet slightly during naps to improve circulation and comfort.",
  "Use a weighted blanket for deeper relaxation and reduced anxiety during naps.",
  "Try progressive muscle relaxation: tense and release each muscle group slowly.",
  "Keep your bedroom temperature cool but have warm feet for optimal sleep onset.",
  "Consider a 90-minute nap if you're very sleep deprived - it's a full sleep cycle.",
  "Use aromatherapy with lavender or chamomile scents to promote relaxation.",
  "Keep your nap space clean and clutter-free to create a peaceful environment.",
];

export default function NapCompleteScreen({ navigation, route }) {
  const [refreshedValue, setRefreshedValue] = useState(0.6); // Default to 60% like in design
  const [currentTipIndex, setCurrentTipIndex] = useState(Math.floor(Math.random() * napTips.length));
  const [napSaved, setNapSaved] = useState(false);
  const [savedNapId, setSavedNapId] = useState(null); // Store the ID of the saved nap
  
  // Get nap data from navigation params or use defaults
  const napData = route?.params || {
    duration: '24 min 32 s',
    sleepStage: 'Light',
    finishedTime: '3:42 PM',
    startTime: null
  };

  // Helper function to calculate start time from duration and finish time
  const calculateStartAndEndTimes = (duration, finishedTime) => {
    try {
      // Parse duration like "24 min 32 s"
      const durationMatch = duration.match(/(\d+)\s*min(?:\s*(\d+)\s*s)?/);
      if (!durationMatch) return { startTime: 'Unknown', endTime: finishedTime };
      
      const minutes = parseInt(durationMatch[1]) || 0;
      const seconds = parseInt(durationMatch[2]) || 0;
      const totalMinutes = minutes + (seconds > 0 ? 1 : 0); // Round up if there are seconds
      
      // Parse finish time
      const finishDate = new Date();
      const timeMatch = finishedTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (!timeMatch) return { startTime: 'Unknown', endTime: finishedTime };
      
      let hours = parseInt(timeMatch[1]);
      const mins = parseInt(timeMatch[2]);
      const period = timeMatch[3].toUpperCase();
      
      // Convert to 24-hour format
      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      
      finishDate.setHours(hours, mins, 0, 0);
      
      // Calculate start time by subtracting duration
      const startDate = new Date(finishDate.getTime() - (totalMinutes * 60 * 1000));
      
      // Format start time
      const startTime = startDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      
      console.log(`Calculated times - Start: ${startTime}, End: ${finishedTime} (Duration: ${totalMinutes} min)`);
      
      return { startTime, endTime: finishedTime };
      
    } catch (error) {
      console.error('Error calculating start/end times:', error);
      return { startTime: 'Unknown', endTime: finishedTime };
    }
  };

  // Save nap data when screen loads
  useEffect(() => {
    const saveNapData = async () => {
      if (!napSaved) {
        let startTime, endTime;
        
        if (napData.startTime) {
          // Use the provided start time from when napping phase actually began
          startTime = napData.startTime;
          endTime = napData.finishedTime;
          console.log(`🕐 Using actual nap times - Start: ${startTime}, End: ${endTime}`);
        } else {
          // Fallback to calculating from duration (for backward compatibility)
          const calculatedTimes = calculateStartAndEndTimes(napData.duration, napData.finishedTime);
          startTime = calculatedTimes.startTime;
          endTime = calculatedTimes.endTime;
          console.log(`🧮 Calculated times from duration - Start: ${startTime}, End: ${endTime}`);
        }
        
        console.log(`💾 Saving nap with times - Start: ${startTime}, End: ${endTime}, Duration: ${napData.duration}`);
        
        const napToSave = {
          ...napData,
          startTime,
          endTime,
          refreshedFeeling: refreshedValue
        };
        
        const result = await napDataManager.saveNap(napToSave);
        if (result && result.success) {
          setNapSaved(true);
          setSavedNapId(result.napId);
          console.log('Nap data saved to history');
        }
      }
    };

    saveNapData();
  }, [napData, napSaved]); // Removed refreshedValue from dependencies

  // Log refreshed feeling when slider changes and update saved data
  const handleRefreshedValueChange = async (value) => {
    setRefreshedValue(value);
    const percentage = Math.round(value * 100);
    console.log(`💭 User feels ${percentage}% refreshed after nap (${napData.duration})`);
    
    // Update the existing nap data with new refreshed feeling
    if (napSaved && savedNapId) {
      await napDataManager.updateNap(savedNapId, {
        refreshedFeeling: value
      });
    }
  };

  // Tip rotation logic (faster cycling)
  useEffect(() => {
    const cycleTip = () => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % napTips.length);
    };

    // Cycle tips every 10 seconds (10000 ms)
    const tipInterval = setInterval(cycleTip, 10000); // 10-second cycling

    return () => {
      clearInterval(tipInterval);
    };
  }, []);

  const handleTipPress = () => {
    // Allow users to manually cycle to next tip
    setCurrentTipIndex((prevIndex) => (prevIndex + 1) % napTips.length);
  };

  const handleBackToHome = () => {
    if (navigation) {
      navigation.navigate('Home');
    }
  };

  const handleViewHistory = () => {
    if (navigation) {
      console.log('Navigating to nap history...');
      navigation.navigate('NapHistory');
    }
  };

  const handleHomePress = () => {
    if (navigation) {
      navigation.navigate('Home');
    }
  };

  const handleHistoryPress = () => {
    console.log('History tab pressed');
    if (navigation) {
      navigation.navigate('NapHistory');
    }
  };

  const handleFeaturesPress = () => {
    console.log('Features tab pressed');
    navigation.navigate('Features');
  };

  const handleProfilePress = () => {
    console.log('Profile tab pressed');
    if (navigation) {
      navigation.navigate('Profile');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Nap Complete</Text>
          <Text style={styles.timestamp}>Finished at {napData.finishedTime}</Text>
        </View>

        {/* Cloud Mascot with Celebration Elements */}
        <View style={styles.mascotSection}>
          <Image
            source={{ uri: 'https://api.builder.io/api/v1/image/assets/TEMP/d8572b253ed821491afe46a12466714cbe4a0c92?width=586' }}
            style={styles.mascotImage}
            resizeMode="contain"
          />
        </View>

        {/* Duration and Sleep Stage Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Duration</Text>
            <Text style={styles.summaryValue}>{napData.duration}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Sleep Stage</Text>
            <Text style={styles.summaryValue}>{napData.sleepStage}</Text>
          </View>
        </View>

        {/* How Refreshed Slider Card */}
        <View style={styles.refreshedCard}>
          <Text style={styles.refreshedTitle}>How refreshed do you feel?</Text>
          
          <View style={styles.sliderContainer}>
            <View style={styles.sliderWrapper}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                value={refreshedValue}
                onValueChange={handleRefreshedValueChange}
                minimumTrackTintColor="#A7D7C5"
                maximumTrackTintColor="#E5E8EC"
                thumbStyle={styles.sliderThumb}
                trackStyle={styles.sliderTrack}
              />
            </View>
            
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>Groggy</Text>
              <Text style={styles.sliderLabel}>Energized</Text>
            </View>
          </View>
        </View>

        {/* Tip Card */}
        <TouchableOpacity style={styles.tipCard} onPress={handleTipPress} activeOpacity={0.8}>
          <View style={styles.tipBadge}>
            <Text style={styles.tipBadgeText}>Tip</Text>
          </View>
          <Text style={styles.tipText}>
            {napTips[currentTipIndex]}
          </Text>
        </TouchableOpacity>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.backToHomeButton} onPress={handleBackToHome}>
            <Text style={styles.backToHomeButtonText}>Back to Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.viewHistoryButton} onPress={handleViewHistory}>
            <Text style={styles.viewHistoryButtonText}>View History ›</Text>
          </TouchableOpacity>
        </View>
        
        {/* Bottom spacing */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <View style={styles.navContainer}>
          <TouchableOpacity style={styles.navButton} onPress={handleHomePress}>
            <HomeIcon />
            <Text style={styles.navTextActive}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={handleHistoryPress}>
            <ClockIcon />
            <Text style={styles.navText}>History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={handleFeaturesPress}>
            <View style={styles.featuresIcon}>
              <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                <Path d="M10 0L12.5 7.5H20L14.5 12L16.5 20L10 15L3.5 20L5.5 12L0 7.5H7.5L10 0Z" fill="rgba(253, 253, 253, 0.6)" />
              </Svg>
            </View>
            <Text style={styles.navText}>Features</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={handleProfilePress}>
            <ProfileIcon />
            <Text style={styles.navText}>Profile</Text>
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
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 90, // Space for bottom navigation
  },
  header: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  title: {
    color: '#FDFDFD',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 30,
    marginBottom: 8,
  },
  timestamp: {
    color: 'rgba(253, 253, 253, 0.70)',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  mascotSection: {
    alignItems: 'center',
    marginTop: -35,
    marginBottom: -40,
  },
  mascotImage: {
    width: 280,
    height: 280,
  },
  summaryCard: {
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 4,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 24,
    marginBottom: 18,
  },
  summaryLabel: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  summaryValue: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  refreshedCard: {
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  refreshedTitle: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 16,
  },
  sliderContainer: {
    paddingHorizontal: 28,
  },
  sliderWrapper: {
    height: 34,
    justifyContent: 'center',
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderTrack: {
    height: 6,
    borderRadius: 3,
  },
  sliderThumb: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#B7AFC5',
    borderWidth: 2,
    borderColor: '#1E2A38',
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
  sliderLabel: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  tipCard: {
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  tipBadge: {
    backgroundColor: '#B7AFC5',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  tipBadgeText: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  tipText: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 20,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  backToHomeButton: {
    flex: 1,
    backgroundColor: '#B7AFC5',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(183, 175, 197, 0.35)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 8,
  },
  backToHomeButtonText: {
    color: '#FDFDFD',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  viewHistoryButton: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#B7AFC5',
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 29,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewHistoryButtonText: {
    color: '#B7AFC5',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
  },
  bottomSpacer: {
    height: 8,
  },
  bottomNavigation: {
    backgroundColor: '#1E2A38',
    borderTopWidth: 1,
    borderTopColor: 'rgba(229, 232, 236, 0.20)',
    paddingVertical: 12,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 81,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 12,
    gap: 25,
  },
  navButton: {
    width: 66,
    height: 56,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 8,
  },

  navTextActive: {
    color: '#B7AFC5',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
  navText: {
    color: 'rgba(253, 253, 253, 0.60)',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
  featuresIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
