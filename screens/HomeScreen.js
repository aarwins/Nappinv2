import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  Image,
} from 'react-native';
import { Svg, Path, G, Defs, ClipPath } from 'react-native-svg';
import napDataManager from '../utils/napDataManager';
const userPersonalization = require('../utils/userPersonalization');

// Moon icon for Nap Readiness section
const MoonIcon = () => (
  <Svg width={17} height={19} viewBox="0 0 17 20" fill="none">
    <Path
      d="M6.40525 3.32157C5.47567 4.76842 4.94005 6.4741 4.94005 8.29857C4.94005 12.4567 7.71994 15.9953 11.5976 17.2809C11.0487 17.3997 10.4777 17.4634 9.88896 17.4634C5.60404 17.4634 2.12475 14.1242 2.12475 9.99576C2.12475 7.07235 3.86882 4.54779 6.40968 3.32157H6.40525ZM9.15415 0.521215C4.03261 0.881867 0 4.98481 0 9.99576C0 15.2443 4.42657 19.5 9.89339 19.5C12.0093 19.5 13.9658 18.8636 15.5771 17.7774C15.6612 17.7222 15.7409 17.6628 15.8206 17.6076C16.033 17.4549 16.2367 17.2937 16.4359 17.1239C16.5554 17.0221 16.6705 16.9203 16.7856 16.8142C17.0069 16.6063 17.0644 16.2838 16.9228 16.0208C16.7811 15.7577 16.4757 15.6092 16.1703 15.6601C16.0065 15.6856 15.8427 15.711 15.6789 15.728C15.4576 15.7492 15.2318 15.7662 15.0016 15.7704C14.9485 15.7704 14.891 15.7704 14.8379 15.7704C14.8334 15.7704 14.829 15.7704 14.8246 15.7704C10.5397 15.7619 7.06923 12.4227 7.06923 8.30281C7.06923 5.97767 8.17145 3.90286 9.90667 2.53238C9.95093 2.49419 9.99962 2.46025 10.0483 2.42206C10.2254 2.28629 10.4113 2.159 10.6016 2.0402C10.7389 1.95534 10.8805 1.87048 11.0266 1.7941C11.2966 1.6456 11.4338 1.34859 11.3674 1.06007C11.301 0.77155 11.0443 0.555159 10.7344 0.529701C10.5751 0.516972 10.4201 0.508486 10.2608 0.504243C10.1413 0.5 10.0173 0.5 9.89781 0.5C9.75174 0.5 9.61009 0.504243 9.46401 0.508486C9.3622 0.512729 9.26039 0.516972 9.15858 0.525458L9.15415 0.521215Z"
      fill="#1E2A38"
    />
  </Svg>
);

// Dropdown arrow icon
const DropdownIcon = () => (
  <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
    <Path d="M12 12H0V0H12V12Z" stroke="#E5E7EB"/>
    <Path
      d="M5.47036 9.52968C5.76333 9.82264 6.23911 9.82264 6.53208 9.52968L11.0321 5.02968C11.325 4.73671 11.325 4.26093 11.0321 3.96796C10.7391 3.67499 10.2633 3.67499 9.97036 3.96796L6.00005 7.93827L2.02974 3.9703C1.73677 3.67733 1.26099 3.67733 0.968018 3.9703C0.675049 4.26327 0.675049 4.73905 0.968018 5.03202L5.46802 9.53202L5.47036 9.52968Z"
      fill="#1E2A38"
    />
  </Svg>
);

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
    <G clipPath="url(#clip0_191_653)">
      <Path
        d="M18.125 10C18.125 12.1549 17.269 14.2215 15.7452 15.7452C14.2215 17.269 12.1549 18.125 10 18.125C7.84512 18.125 5.77849 17.269 4.25476 15.7452C2.73102 14.2215 1.875 12.1549 1.875 10C1.875 7.84512 2.73102 5.77849 4.25476 4.25476C5.77849 2.73102 7.84512 1.875 10 1.875C12.1549 1.875 14.2215 2.73102 15.7452 4.25476C17.269 5.77849 18.125 7.84512 18.125 10ZM0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C4.8043 18.9464 7.34784 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 7.34784 18.9464 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10ZM9.0625 4.6875V10C9.0625 10.3125 9.21875 10.6055 9.48047 10.7812L13.2305 13.2812C13.6602 13.5703 14.2422 13.4531 14.5312 13.0195C14.8203 12.5859 14.7031 12.0078 14.2695 11.7188L10.9375 9.5V4.6875C10.9375 4.16797 10.5195 3.75 10 3.75C9.48047 3.75 9.0625 4.16797 9.0625 4.6875Z"
        fill="#FDFDFD"
        fillOpacity="0.6"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_191_653">
        <Path d="M0 0H20V20H0V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Profile icon for Profile tab
const ProfileIcon = () => (
  <Svg width={18} height={20} viewBox="0 0 18 20" fill="none">
    <G clipPath="url(#clip0_191_667)">
      <Path
        d="M12.0938 5C12.0938 4.1712 11.7645 3.37634 11.1785 2.79029C10.5924 2.20424 9.79755 1.875 8.96875 1.875C8.13995 1.875 7.34509 2.20424 6.75904 2.79029C6.17299 3.37634 5.84375 4.1712 5.84375 5C5.84375 5.8288 6.17299 6.62366 6.75904 7.20971C7.34509 7.79576 8.13995 8.125 8.96875 8.125C9.79755 8.125 10.5924 7.79576 11.1785 7.20971C11.7645 6.62366 12.0938 5.8288 12.0938 5ZM3.96875 5C3.96875 3.67392 4.49553 2.40215 5.43322 1.46447C6.3709 0.526784 7.64267 0 8.96875 0C10.2948 0 11.5666 0.526784 12.5043 1.46447C13.442 2.40215 13.9688 3.67392 13.9688 5C13.9688 6.32608 13.442 7.59785 12.5043 8.53553C11.5666 9.47322 10.2948 10 8.96875 10C7.64267 10 6.3709 9.47322 5.43322 8.53553C4.49553 7.59785 3.96875 6.32608 3.96875 5ZM2.14453 18.125H15.793C15.4453 15.6523 13.3203 13.75 10.7539 13.75H7.18359C4.61719 13.75 2.49219 15.6523 2.14453 18.125ZM0.21875 18.8398C0.21875 14.9922 3.33594 11.875 7.18359 11.875H10.7539C14.6016 11.875 17.7188 14.9922 17.7188 18.8398C17.7188 19.4805 17.1992 20 16.5586 20H1.37891C0.738281 20 0.21875 19.4805 0.21875 18.8398Z"
        fill="#FDFDFD"
        fillOpacity="0.6"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_191_667">
        <Path d="M0 0H17.5V20H0V0Z" fill="white" transform="translate(0.21875)"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Array of cycling nap tips
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

export default function HomeScreen({ navigation }) {
  const [currentTime, setCurrentTime] = useState('');
  const [napReadiness, setNapReadiness] = useState(null); // Start with null to prevent flickering
  const [selectedTime, setSelectedTime] = useState('20');
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [currentTipIndex, setCurrentTipIndex] = useState(Math.floor(Math.random() * napTips.length));

  // Function to update readiness (accessible to debug buttons)
  const updateReadiness = () => {
    // Use whatever time is currently set (debug or real)
    const readinessScore = userPersonalization.recalculateReadiness();
    setNapReadiness(readinessScore);
  };

  useEffect(() => {
    const updateGreeting = () => {
      const now = new Date();
      const hour = now.getHours();

      if (hour < 12) {
        setCurrentTime('Morning');
      } else if (hour < 17) {
        setCurrentTime('Afternoon');
      } else {
        setCurrentTime('Evening');
      }
    };

    const cycleTip = () => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % napTips.length);
    };

    updateGreeting();

    // Calculate readiness immediately and synchronously
    const initialReadiness = userPersonalization.recalculateReadiness();
    setNapReadiness(initialReadiness);

    // Update greeting and readiness every minute
    const greetingInterval = setInterval(() => {
      updateGreeting();
      updateReadiness();
    }, 60000);

    // Cycle tips every 24 hours (86400000 ms)
    const tipInterval = setInterval(cycleTip, 86400000); // Daily cycling

    return () => {
      clearInterval(greetingInterval);
      clearInterval(tipInterval);
    };
  }, []);

  const handleStartNap = () => {
    console.log('Start Nap pressed');
    if (navigation) {
       navigation.navigate('FinalizeNap', { selectedTime });
    }
  };

  const handleTimeSelect = () => {
    setShowTimeDropdown(true);
  };

  const selectTime = (time) => {
    setSelectedTime(time);
    setShowTimeDropdown(false);
  };

  const handleTipPress = () => {
    // Allow users to manually cycle to next tip
    setCurrentTipIndex((prevIndex) => (prevIndex + 1) % napTips.length);
  };

  const handleHomePress = () => {
    console.log('Home tab pressed');
    // Already on home screen
  };

  const handleHistoryPress = () => {
    console.log('History tab pressed');
    if (navigation) {
      navigation.navigate('NapHistory');
    }
  };

  const handleFeaturesPress = () => {
    console.log('Features tab pressed');
    if (navigation) {
      navigation.navigate('Features');
    }
  };

  const handleProfilePress = () => {
    console.log('Profile tab pressed');
    // TODO: Navigate to profile screen
  };





  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Good {currentTime}</Text>
        </View>

        {/* Central Mascot Image */}
        <View style={styles.imageSection}>
          <Image
            source={napReadiness !== null && napReadiness > 75
              ? require('../assets/napready.png')
              : require('../assets/lestrest.png')
            }
            style={styles.mascotImage}
            resizeMode="contain"
            fadeDuration={0} // Remove fade animation for faster display
          />
        </View>

        {/* Nap Readiness Card */}
        <View style={styles.napReadinessCard}>
          <View style={styles.napReadinessHeader}>
            <MoonIcon />
            <Text style={styles.napReadinessTitle}>Nap Readiness</Text>
          </View>

          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: `${napReadiness}%` }]} />
            </View>
          </View>

          <View style={styles.napReadinessFooter}>
            <Text style={styles.napReadinessDescription}>
              Based on your current rest cycle and preferences
            </Text>
                            <Text style={styles.napReadinessPercentage}>{napReadiness}%</Text>
          </View>
        </View>

        {/* Daily Tip Card */}
        <TouchableOpacity style={styles.dailyTipCard} onPress={handleTipPress} activeOpacity={0.8}>
          <Text style={styles.tapToChangeText}>Tap to change tip</Text>
          <View style={styles.dailyTipBadge}>
            <Text style={styles.dailyTipBadgeText}>Daily Tip</Text>
          </View>
          <View style={styles.dailyTipContent}>
            <Text style={styles.dailyTipText}>{napTips[currentTipIndex]}</Text>
          </View>
        </TouchableOpacity>

        {/* Status Text */}
        <Text style={styles.statusText}>
          You're in a {
            napReadiness < 45 ? 'decent' :
            napReadiness < 75 ? 'good' : 'perfect'
          } zone for a quick recharge.
        </Text>





        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.startNapButton} onPress={handleStartNap}>
            <Text style={styles.startNapButtonText}>Start Nap</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.timeSelectButton} onPress={handleTimeSelect}>
            <Text style={styles.timeSelectButtonText}>{selectedTime} min</Text>
            <DropdownIcon />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Time Selection Modal */}
      <Modal
        visible={showTimeDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowTimeDropdown(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowTimeDropdown(false)}
        >
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => selectTime('10')}
            >
              <Text style={styles.dropdownOptionText}>10</Text>
            </TouchableOpacity>
            <View style={styles.dropdownSeparator} />
            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => selectTime('15')}
            >
              <Text style={styles.dropdownOptionText}>15</Text>
            </TouchableOpacity>
            <View style={styles.dropdownSeparator} />
            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => selectTime('20')}
            >
              <Text style={styles.dropdownOptionText}>20</Text>
            </TouchableOpacity>
            <View style={styles.dropdownSeparator} />
            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => selectTime('25')}
            >
              <Text style={styles.dropdownOptionText}>25</Text>
            </TouchableOpacity>
            <View style={styles.dropdownSeparator} />
            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => selectTime('90')}
            >
              <Text style={styles.dropdownOptionText}>90</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>


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
    paddingHorizontal: 24,
    paddingBottom: 100, // Space for bottom navigation
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  greeting: {
    color: '#FDFDFD',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 32,
  },
  imageSection: {
    alignItems: 'center',
    marginTop: -32,
    marginBottom: -105,
  },
  mascotImage: {
    width: 525,
    height: 375,
  },
  napReadinessCard: {
    backgroundColor: '#FDFDFD',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  napReadinessHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 9,
  },
  napReadinessTitle: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
  },
  progressBarContainer: {
    marginBottom: 12,
  },
  progressBarBackground: {
    height: 12,
    backgroundColor: '#E5E8EC',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#A7D7C5',
    borderRadius: 6,
  },
  napReadinessFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  napReadinessDescription: {
    color: 'rgba(30, 42, 56, 0.85)',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    flex: 1,
  },
  napReadinessPercentage: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '700',
  },
  dailyTipCard: {
    position: 'relative',
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dailyTipBadge: {
    backgroundColor: '#B7AFC5',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  dailyTipBadgeText: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 15,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  tapToChangeText: {
    position: 'absolute',
    top: 8,
    right: 8,
    color: '#B7AFC5',
    fontFamily: 'Inter',
    fontSize: 10,
    fontWeight: '400',
    opacity: 0.8,
    zIndex: 1,
  },
  dailyTipContent: {
    flex: 1,
  },
  dailyTipText: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
  },
  statusText: {
    color: '#FDFDFD',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    marginBottom: 24,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  startNapButton: {
    flex: 1,
    backgroundColor: '#B7AFC5',
    borderRadius: 12,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(183, 175, 197, 0.30)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 8,
  },
  startNapButtonText: {
    color: '#FDFDFD',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  timeSelectButton: {
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1E2A38',
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    minWidth: 100,
  },
  timeSelectButtonText: {
    color: '#1E2A38',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '700',
  },

  bottomNavigation: {
    backgroundColor: '#1E2A38',
    borderTopWidth: 1,
    borderTopColor: 'rgba(229, 232, 236, 0.20)',
    paddingVertical: 8,
    position: 'absolute',
    bottom: 6,
    left: 0,
    right: 0,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    gap: 4,
  },
  featuresIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },


  navTextActive: {
    color: '#B7AFC5',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
  },
  navText: {
    color: 'rgba(253, 253, 253, 0.60)',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    backgroundColor: '#FDFDFD',
    borderRadius: 12,
    width: 120,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  dropdownOption: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  dropdownOptionText: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '700',
  },
  dropdownSeparator: {
    height: 1,
    backgroundColor: '#E5E8EC',
    marginHorizontal: 12,
  },
});
