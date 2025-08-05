import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Animated,
  Modal,
  Alert,
  Platform,
  Dimensions,
  Linking,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import { Svg, Path, G, Defs, ClipPath } from 'react-native-svg';
import OptimizedImage from '../components/OptimizedImage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePersonalization } from '../components/PersonalizationProvider';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Back arrow icon
const BackArrowIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M0.439453 10.9441C-0.146484 11.5301 -0.146484 12.4816 0.439453 13.0676L7.93945 20.5676C8.52539 21.1535 9.47695 21.1535 10.0629 20.5676C10.6488 19.9816 10.6488 19.0301 10.0629 18.4441L5.11758 13.5035H19.4988C20.3285 13.5035 20.9988 12.8332 20.9988 12.0035C20.9988 11.1738 20.3285 10.5035 19.4988 10.5035H5.12227L10.0582 5.56289C10.6441 4.97695 10.6441 4.02539 10.0582 3.43945C9.47227 2.85352 8.5207 2.85352 7.93477 3.43945L0.434766 10.9395L0.439453 10.9441Z"
      fill="#FDFDFD"
    />
  </Svg>
);

// Dropdown arrow icon
const DropdownIcon = () => (
  <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
    <Path d="M12 12H0V0H12V12Z" stroke="#E5E7EB"/>
    <Path
      d="M5.47036 9.52969C5.76333 9.82266 6.23911 9.82266 6.53208 9.52969L11.0321 5.02969C11.325 4.73672 11.325 4.26094 11.0321 3.96797C10.7391 3.675 10.2633 3.675 9.97036 3.96797L6.00005 7.93828L2.02974 3.97032C1.73677 3.67735 1.26099 3.67735 0.968018 3.97032C0.675049 4.26328 0.675049 4.73907 0.968018 5.03203L5.46802 9.53203L5.47036 9.52969Z"
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
    <G clipPath="url(#clip0_232_177)">
      <Path
        d="M18.125 10C18.125 12.1549 17.269 14.2215 15.7452 15.7452C14.2215 17.269 12.1549 18.125 10 18.125C7.84512 18.125 5.77849 17.269 4.25476 15.7452C2.73102 14.2215 1.875 12.1549 1.875 10C1.875 7.84512 2.73102 5.77849 4.25476 4.25476C5.77849 2.73102 7.84512 1.875 10 1.875C12.1549 1.875 14.2215 2.73102 15.7452 4.25476C17.269 5.77849 18.125 7.84512 18.125 10ZM0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C4.8043 18.9464 7.34784 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 7.34784 18.9464 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10ZM9.0625 4.6875V10C9.0625 10.3125 9.21875 10.6055 9.48047 10.7812L13.2305 13.2812C13.6602 13.5703 14.2422 13.4531 14.5312 13.0195C14.8203 12.5859 14.7031 12.0078 14.2695 11.7188L10.9375 9.5V4.6875C10.9375 4.16797 10.5195 3.75 10 3.75C9.48047 3.75 9.0625 4.16797 9.0625 4.6875Z"
        fill="#FDFDFD"
        fillOpacity="0.6"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_232_177">
        <Path d="M0 0H20V20H0V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Profile icon for Profile tab
const ProfileIcon = () => (
  <Svg width={18} height={20} viewBox="0 0 18 20" fill="none">
    <G clipPath="url(#clip0_232_185)">
      <Path
        d="M12.0938 5C12.0938 4.1712 11.7645 3.37634 11.1785 2.79029C10.5924 2.20424 9.79755 1.875 8.96875 1.875C8.13995 1.875 7.34509 2.20424 6.75904 2.79029C6.17299 3.37634 5.84375 4.1712 5.84375 5C5.84375 5.8288 6.17299 6.62366 6.75904 7.20971C7.34509 7.79576 8.13995 8.125 8.96875 8.125C9.79755 8.125 10.5924 7.79576 11.1785 7.20971C11.7645 6.62366 12.0938 5.8288 12.0938 5ZM3.96875 5C3.96875 3.67392 4.49553 2.40215 5.43322 1.46447C6.3709 0.526784 7.64267 0 8.96875 0C10.2948 0 11.5666 0.526784 12.5043 1.46447C13.442 2.40215 13.9688 3.67392 13.9688 5C13.9688 6.32608 13.442 7.59785 12.5043 8.53553C11.5666 9.47322 10.2948 10 8.96875 10C7.64267 10 6.3709 9.47322 5.43322 8.53553C4.49553 7.59785 3.96875 6.32608 3.96875 5ZM2.14453 18.125H15.793C15.4453 15.6523 13.3203 13.75 10.7539 13.75H7.18359C4.61719 13.75 2.49219 15.6523 2.14453 18.125ZM0.21875 18.8398C0.21875 14.9922 3.33594 11.875 7.18359 11.875H10.7539C14.6016 11.875 17.7188 14.9922 17.7188 18.8398C17.7188 19.4805 17.1992 20 16.5586 20H1.37891C0.738281 20 0.21875 19.4805 0.21875 18.8398Z"
        fill="#FDFDFD"
        fillOpacity="0.6"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_232_185">
        <Path d="M0.21875 0H17.7188V20H0.21875V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);



// Dropdown Card Component
const DropdownCard = ({ title, value, description, onPress }) => (
  <TouchableOpacity 
    style={styles.dropdownCard} 
    onPress={() => {
      console.log(`Dropdown pressed: ${title}`);
      onPress();
    }}
    activeOpacity={0.7}
  >
    <View style={styles.dropdownHeader}>
      <Text style={styles.dropdownTitle}>{title}</Text>
      {value && <Text style={styles.dropdownValue}>{value}</Text>}
      <DropdownIcon />
    </View>
    {description && (
      <Text style={styles.dropdownDescription}>{description}</Text>
    )}
  </TouchableOpacity>
);

export default function FinalizeNapScreen({ navigation, route }) {
  // Get selected time from home screen, default to 20
  const selectedTimeFromHome = route?.params?.selectedTime || '20';
  const { setTomorrowReminder, clearTomorrowReminder } = usePersonalization();
  
  const [napLength, setNapLength] = useState(`${selectedTimeFromHome} min`);
  const [selectedNapTime, setSelectedNapTime] = useState(selectedTimeFromHome);
  const [selectedWakeSound, setSelectedWakeSound] = useState('Soft Chime');
  const [selectedAmbientSound, setSelectedAmbientSound] = useState('None');
  
  // Modal visibility states
  const [showNapLengthModal, setShowNapLengthModal] = useState(false);
  const [showWakeSoundModal, setShowWakeSoundModal] = useState(false);
  const [showReminderTimePicker, setShowReminderTimePicker] = useState(false);
  
  // Notification state
  const [notificationPermissionStatus, setNotificationPermissionStatus] = useState(null);
  const [scheduledNotificationId, setScheduledNotificationId] = useState(null);
  
  // Default reminder time (2:00 PM)
  const [selectedHour, setSelectedHour] = useState(2);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState('PM');

  // Create time options
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const periods = ['AM', 'PM'];

  const hourScrollRef = useRef(null);
  const minuteScrollRef = useRef(null);
  const periodScrollRef = useRef(null);
  
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };
    pulse();
  }, [pulseAnim]);

  // Check notification permissions on component mount
  useEffect(() => {
    const checkPermissions = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      setNotificationPermissionStatus(status);
    };
    
    // Set notification categories
    const setNotificationCategories = async () => {
      await Notifications.setNotificationCategoryAsync('napReminder', [
        {
          identifier: 'start_nap',
          buttonTitle: 'Start Nap',
          options: {
            opensAppToForeground: true,
          },
        },
        {
          identifier: 'snooze',
          buttonTitle: 'Remind in 5 min',
          options: {
            opensAppToForeground: false,
          },
        },
      ]);
    };
    
    checkPermissions();
    setNotificationCategories();
  }, []);

  // Initialize picker positions when modal opens
  useEffect(() => {
    if (showReminderTimePicker) {
      setTimeout(() => {
        // Set initial scroll positions
        if (hourScrollRef.current) {
          hourScrollRef.current.scrollTo({ 
            y: (selectedHour - 1) * 50, 
            animated: false 
          });
        }
        if (minuteScrollRef.current) {
          minuteScrollRef.current.scrollTo({ 
            y: selectedMinute * 50, 
            animated: false 
          });
        }
        if (periodScrollRef.current) {
          periodScrollRef.current.scrollTo({ 
            y: (selectedPeriod === 'PM' ? 1 : 0) * 50, 
            animated: false 
          });
        }
      }, 100);
    }
  }, [showReminderTimePicker, selectedHour, selectedMinute, selectedPeriod]);

  // Cleanup notifications on unmount
  useEffect(() => {
    return () => {
      if (scheduledNotificationId) {
        Notifications.cancelScheduledNotificationAsync(scheduledNotificationId);
      }
    };
  }, [scheduledNotificationId]);

  // Load saved wake tone and ambient sound from SoundsScreen
  useEffect(() => {
    const loadSavedSounds = async () => {
      try {
        const savedWakeTone = await AsyncStorage.getItem('selectedWakeTone');
        if (savedWakeTone) {
          setSelectedWakeSound(savedWakeTone);
        }
        
        const savedAmbientSound = await AsyncStorage.getItem('selectedAmbientSound');
        if (savedAmbientSound) {
          setSelectedAmbientSound(savedAmbientSound);
        }
      } catch (error) {
        console.log('Error loading saved sounds:', error);
      }
    };
    
    loadSavedSounds();
  }, []);

  const handleBack = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleNapLengthPress = () => {
    console.log('Nap Length pressed');
    setShowNapLengthModal(true);
  };

  const handleWakeUpSoundPress = () => {
    console.log('Wake Up Sound pressed');
    setShowWakeSoundModal(true);
  };

  const handleReminderPress = async () => {
    console.log('Reminder pressed');
    
    // Check and request notification permissions first
    const permission = await requestNotificationPermissions();
    if (permission) {
      setShowReminderTimePicker(true);
    }
  };

  // Nap length selection handlers
  const selectNapTime = (time) => {
    setSelectedNapTime(time);
    // Special handling for dev 1-minute option
    if (time === '1') {
      setNapLength('1 min (DEV)');
    } else {
      setNapLength(`${time} min`);
    }
    setShowNapLengthModal(false);
  };

  // Wake sound selection handlers
  const selectWakeSound = (sound) => {
    setSelectedWakeSound(sound);
    setShowWakeSoundModal(false);
  };

  // Ambient sound selection handlers
  const selectAmbientSound = (sound) => {
    setSelectedAmbientSound(sound);
    setShowWakeSoundModal(false);
  };

  // Format time for display
  const formatTime = () => {
    const formattedMinute = selectedMinute.toString().padStart(2, '0');
    return `${selectedHour}:${formattedMinute} ${selectedPeriod}`;
  };

  // Handle scroll selection for each picker
  const handleHourScroll = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / 50);
    const hour = hours[Math.max(0, Math.min(index, hours.length - 1))];
    if (hour && hour !== selectedHour) {
      setSelectedHour(hour);
    }
  };

  const handleMinuteScroll = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / 50);
    const minute = minutes[Math.max(0, Math.min(index, minutes.length - 1))];
    if (minute !== undefined && minute !== selectedMinute) {
      setSelectedMinute(minute);
    }
  };

  const handlePeriodScroll = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / 50);
    const period = periods[Math.max(0, Math.min(index, periods.length - 1))];
    if (period && period !== selectedPeriod) {
      setSelectedPeriod(period);
    }
  };

  // Request notification permissions
  const requestNotificationPermissions = async () => {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      setNotificationPermissionStatus(finalStatus);
      
      if (finalStatus !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please enable notifications in your device settings to receive nap reminders.',
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Open Settings', 
              onPress: () => {
                if (Platform.OS === 'ios') {
                  Linking.openURL('app-settings:');
                } else {
                  Linking.openSettings();
                }
              }
            }
          ]
        );
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
      Alert.alert('Error', 'Failed to request notification permissions.');
      return false;
    }
  };

  // Schedule the actual notification
  const scheduleNapReminder = async () => {
    try {
      // Cancel any existing notification
      if (scheduledNotificationId) {
        await Notifications.cancelScheduledNotificationAsync(scheduledNotificationId);
      }

      // Create notification date for tomorrow at the selected time
      const notificationDate = new Date();
      notificationDate.setDate(notificationDate.getDate() + 1); // Tomorrow
      
      // Convert 12-hour format to 24-hour format
      let hour24 = selectedHour;
      if (selectedPeriod === 'PM' && selectedHour !== 12) {
        hour24 += 12;
      } else if (selectedPeriod === 'AM' && selectedHour === 12) {
        hour24 = 0;
      }
      
      notificationDate.setHours(hour24, selectedMinute, 0, 0);
      
      // Schedule the notification
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "💤 Time for Your Nap!",
          body: "It's time to take that relaxing nap you scheduled. Sweet dreams! ☁️",
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
          categoryIdentifier: 'napReminder',
        },
        trigger: notificationDate,
      });
      
      setScheduledNotificationId(notificationId);
      console.log('Notification scheduled with ID:', notificationId);
      console.log('Notification will fire at:', notificationDate.toLocaleString());
      
      return notificationId;
    } catch (error) {
      console.error('Error scheduling notification:', error);
      Alert.alert('Error', 'Failed to schedule notification reminder.');
      return null;
    }
  };

  // Test notification (fires in 5 seconds)
  const scheduleTestNotification = async () => {
    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "🧪 Test Notification",
          body: "This is a test! Your nap reminders will work like this. 😴",
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
          categoryIdentifier: 'napReminder',
        },
        trigger: { seconds: 5 },
      });
      
      console.log('Test notification scheduled:', notificationId);
      return notificationId;
    } catch (error) {
      console.error('Error scheduling test notification:', error);
      return null;
    }
  };

  const confirmReminderTime = async () => {
    const timeString = formatTime();
    setShowReminderTimePicker(false);
    
    // Schedule the actual notification
    const notificationId = await scheduleNapReminder();
    
    if (notificationId) {
      // Save reminder data to PersonalizationProvider
      const reminderData = {
        id: `tomorrow_${Date.now()}`,
        time: timeString,
        duration: napLength,
        date: 'tomorrow',
        notificationId: notificationId,
        createdAt: new Date().toISOString()
      };
      
      setTomorrowReminder(reminderData);
      
      Alert.alert(
        'Reminder Set! 🔔', 
        `You'll receive a notification to nap at ${timeString} tomorrow.`,
        [
          { text: 'Great!', style: 'default' },
          { 
            text: 'Test Now', 
            onPress: async () => {
              await scheduleTestNotification();
              Alert.alert('Test Sent!', 'Check your notifications in 5 seconds! 📱');
            }
          }
        ]
      );
      
      console.log('Saved tomorrow reminder data:', reminderData);
    }
  };

  const handleHomePress = () => {
    console.log('Home tab pressed');
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

  const handleStartNap = () => {
    console.log('Ready for a Nap? pressed - Cloud or text tapped');
    console.log(`Starting nap with duration: ${selectedNapTime} minutes`);
    console.log(`Wake sound: ${selectedWakeSound}`);
    console.log(`Ambient sound: ${selectedAmbientSound}`);
    
    // Navigate to NapInProgressScreen with the selected settings
    if (navigation) {
      navigation.navigate('NapInProgress', {
        selectedTime: selectedNapTime,
        wakeSound: selectedWakeSound,
        ambientSound: selectedAmbientSound,
        reminderTime: formatTime(),
        userPlan: 'advanced', // TODO: Get actual user plan from user state/context
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <BackArrowIcon />
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Finalize Your Nap</Text>
        </View>

        <ScrollView 
          style={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
        >
          {/* Main Settings Section */}
          <View style={styles.mainSection}>
            <DropdownCard
              title="Nap Length"
              value={napLength}
              onPress={handleNapLengthPress}
            />

            <DropdownCard
              title="Wake Up Sound"
              value={`${selectedWakeSound}, ${selectedAmbientSound}`}
              description="Choose a tone to gently wake you up, and ambient noise to fall asleep to."
              onPress={handleWakeUpSoundPress}
            />

            <DropdownCard
              title="Set a nap reminder for tomorrow"
              value={`${formatTime()} ${notificationPermissionStatus === 'granted' ? '🔔' : '🔕'}`}
              description={notificationPermissionStatus === 'granted' 
                ? "We'll send you a notification at the time you choose." 
                : "Tap to enable notifications for reminders."
              }
              onPress={handleReminderPress}
            />
          </View>

          {/* Cloud Image and Ready Section */}
          <View style={styles.readySection}>
            <TouchableOpacity 
              onPress={() => {
                console.log('Cloud image tapped!');
                handleStartNap();
              }} 
              activeOpacity={0.8}
              style={styles.cloudButton}
            >
              <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                <OptimizedImage
                  source={{
                    uri: 'https://api.builder.io/api/v1/image/assets/TEMP/1a97815c0b1f546036843b0ecef16e1b51c2e7dc?width=612'
                  }}
                  style={styles.cloudImage}
                  resizeMode="contain"
                  showLoader={false}
                />
              </Animated.View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleStartNap} activeOpacity={0.8}>
              <Text style={styles.readyTitle}>Ready for a Nap?</Text>
              <Text style={styles.readySubtitle}>Tap the cloud to start your smart nap.</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

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

      {/* Nap Length Modal */}
      <Modal
        visible={showNapLengthModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowNapLengthModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowNapLengthModal(false)}
        >
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={[styles.dropdownOption, styles.devOption]}
              onPress={() => selectNapTime('1')}
            >
              <Text style={[styles.dropdownOptionText, styles.devOptionText]}>1 min (DEV)</Text>
            </TouchableOpacity>
            <View style={styles.dropdownSeparator} />
            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => selectNapTime('10')}
            >
              <Text style={styles.dropdownOptionText}>10 min</Text>
            </TouchableOpacity>
            <View style={styles.dropdownSeparator} />
            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => selectNapTime('15')}
            >
              <Text style={styles.dropdownOptionText}>15 min</Text>
            </TouchableOpacity>
            <View style={styles.dropdownSeparator} />
            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => selectNapTime('20')}
            >
              <Text style={styles.dropdownOptionText}>20 min</Text>
            </TouchableOpacity>
            <View style={styles.dropdownSeparator} />
            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => selectNapTime('25')}
            >
              <Text style={styles.dropdownOptionText}>25 min</Text>
            </TouchableOpacity>
            <View style={styles.dropdownSeparator} />
            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => selectNapTime('90')}
            >
              <Text style={styles.dropdownOptionText}>90 min</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Wake Up Sound Modal */}
      <Modal
        visible={showWakeSoundModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowWakeSoundModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowWakeSoundModal(false)}
        >
          <ScrollView style={styles.modalScrollContainer} contentContainerStyle={styles.modalScrollContent}>
            <View style={styles.dropdownContainer}>
              {/* Wake Sounds Section */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>Wake Up Tones</Text>
              </View>
              <TouchableOpacity
                style={styles.dropdownOption}
                onPress={() => selectWakeSound('Soft Chime')}
              >
                <View style={styles.dropdownOptionContent}>
                  <Text style={styles.dropdownOptionText}>Soft Chime</Text>
                  {selectedWakeSound === 'Soft Chime' && (
                    <Text style={styles.checkMark}>✓</Text>
                  )}
                </View>
              </TouchableOpacity>
              <View style={styles.dropdownSeparator} />
              <TouchableOpacity
                style={styles.dropdownOption}
                onPress={() => selectWakeSound('Calm Bell')}
              >
                <View style={styles.dropdownOptionContent}>
                  <Text style={styles.dropdownOptionText}>Calm Bell</Text>
                  {selectedWakeSound === 'Calm Bell' && (
                    <Text style={styles.checkMark}>✓</Text>
                  )}
                </View>
              </TouchableOpacity>
              <View style={styles.dropdownSeparator} />
              <TouchableOpacity
                style={styles.dropdownOption}
                onPress={() => selectWakeSound('Gentle Breeze')}
              >
                <View style={styles.dropdownOptionContent}>
                  <Text style={styles.dropdownOptionText}>Gentle Breeze</Text>
                  {selectedWakeSound === 'Gentle Breeze' && (
                    <Text style={styles.checkMark}>✓</Text>
                  )}
                </View>
              </TouchableOpacity>
              <View style={styles.dropdownSeparator} />
              <TouchableOpacity
                style={styles.dropdownOption}
                onPress={() => selectWakeSound('Morning Birds')}
              >
                <View style={styles.dropdownOptionContent}>
                  <Text style={styles.dropdownOptionText}>Morning Birds</Text>
                  {selectedWakeSound === 'Morning Birds' && (
                    <Text style={styles.checkMark}>✓</Text>
                  )}
                </View>
              </TouchableOpacity>
              <View style={styles.dropdownSeparator} />
              <TouchableOpacity
                style={styles.dropdownOption}
                onPress={() => selectWakeSound('Ocean Surf')}
              >
                <View style={styles.dropdownOptionContent}>
                  <Text style={styles.dropdownOptionText}>Ocean Surf</Text>
                  {selectedWakeSound === 'Ocean Surf' && (
                    <Text style={styles.checkMark}>✓</Text>
                  )}
                </View>
              </TouchableOpacity>
              <View style={styles.dropdownSeparator} />
              <TouchableOpacity
                style={styles.dropdownOption}
                onPress={() => selectWakeSound('Rainforest')}
              >
                <View style={styles.dropdownOptionContent}>
                  <Text style={styles.dropdownOptionText}>Rainforest</Text>
                  {selectedWakeSound === 'Rainforest' && (
                    <Text style={styles.checkMark}>✓</Text>
                  )}
                </View>
              </TouchableOpacity>

              {/* Ambient Sounds Section */}
              <View style={[styles.sectionHeader, styles.sectionHeaderSpacing]}>
                <Text style={styles.sectionHeaderText}>Ambient Sounds</Text>
              </View>
              <TouchableOpacity
                style={styles.dropdownOption}
                onPress={() => selectAmbientSound('None')}
              >
                <View style={styles.dropdownOptionContent}>
                  <Text style={styles.dropdownOptionText}>None</Text>
                  {selectedAmbientSound === 'None' && (
                    <Text style={styles.checkMark}>✓</Text>
                  )}
                </View>
              </TouchableOpacity>
              <View style={styles.dropdownSeparator} />
              <TouchableOpacity
                style={styles.dropdownOption}
                onPress={() => selectAmbientSound('Rain')}
              >
                <View style={styles.dropdownOptionContent}>
                  <Text style={styles.dropdownOptionText}>Rain</Text>
                  {selectedAmbientSound === 'Rain' && (
                    <Text style={styles.checkMark}>✓</Text>
                  )}
                </View>
              </TouchableOpacity>
              <View style={styles.dropdownSeparator} />
              <TouchableOpacity
                style={styles.dropdownOption}
                onPress={() => selectAmbientSound('Fireplace')}
              >
                <View style={styles.dropdownOptionContent}>
                  <Text style={styles.dropdownOptionText}>Fireplace</Text>
                  {selectedAmbientSound === 'Fireplace' && (
                    <Text style={styles.checkMark}>✓</Text>
                  )}
                </View>
              </TouchableOpacity>
              <View style={styles.dropdownSeparator} />
              <TouchableOpacity
                style={styles.dropdownOption}
                onPress={() => selectAmbientSound('Ocean Waves')}
              >
                <View style={styles.dropdownOptionContent}>
                  <Text style={styles.dropdownOptionText}>Ocean Waves</Text>
                  {selectedAmbientSound === 'Ocean Waves' && (
                    <Text style={styles.checkMark}>✓</Text>
                  )}
                </View>
              </TouchableOpacity>
              <View style={styles.dropdownSeparator} />
              <TouchableOpacity
                style={styles.dropdownOption}
                onPress={() => selectAmbientSound('Night Crickets')}
              >
                <View style={styles.dropdownOptionContent}>
                  <Text style={styles.dropdownOptionText}>Night Crickets</Text>
                  {selectedAmbientSound === 'Night Crickets' && (
                    <Text style={styles.checkMark}>✓</Text>
                  )}
                </View>
              </TouchableOpacity>
              <View style={styles.dropdownSeparator} />
              <TouchableOpacity
                style={styles.dropdownOption}
                onPress={() => selectAmbientSound('White Noise')}
              >
                <View style={styles.dropdownOptionContent}>
                  <Text style={styles.dropdownOptionText}>White Noise</Text>
                  {selectedAmbientSound === 'White Noise' && (
                    <Text style={styles.checkMark}>✓</Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableOpacity>
      </Modal>

      {/* Reminder Time Picker */}
      <Modal
        visible={showReminderTimePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowReminderTimePicker(false)}
      >
        <View style={styles.timePickerModalOverlay}>
          <View style={styles.timePickerContainer}>
            <View style={styles.timePickerHeader}>
              <TouchableOpacity
                onPress={() => setShowReminderTimePicker(false)}
                style={styles.timePickerButton}
              >
                <Text style={styles.timePickerButtonText}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.timePickerTitle}>Set Reminder Time</Text>
              <TouchableOpacity
                onPress={confirmReminderTime}
                style={styles.timePickerButton}
              >
                <Text style={[styles.timePickerButtonText, styles.timePickerConfirmText]}>Done</Text>
              </TouchableOpacity>
            </View>
            
            {/* Custom Time Picker Wheels */}
            <View style={styles.pickerContainer}>
              <View style={styles.pickerSelectionOverlay} />
              
              {/* Hour Picker */}
              <View style={styles.pickerColumn}>
                <ScrollView
                  ref={hourScrollRef}
                  style={styles.pickerScroll}
                  showsVerticalScrollIndicator={false}
                  snapToInterval={50}
                  decelerationRate="fast"
                  onMomentumScrollEnd={handleHourScroll}
                  contentContainerStyle={styles.pickerScrollContent}
                >
                  <View style={styles.pickerPadding} />
                  {hours.map((hour) => (
                    <View key={hour} style={styles.pickerItem}>
                      <Text style={[
                        styles.pickerItemText,
                        hour === selectedHour && styles.pickerItemTextSelected
                      ]}>
                        {hour}
                      </Text>
                    </View>
                  ))}
                  <View style={styles.pickerPadding} />
                </ScrollView>
              </View>

              {/* Minute Picker */}
              <View style={styles.pickerColumn}>
                <ScrollView
                  ref={minuteScrollRef}
                  style={styles.pickerScroll}
                  showsVerticalScrollIndicator={false}
                  snapToInterval={50}
                  decelerationRate="fast"
                  onMomentumScrollEnd={handleMinuteScroll}
                  contentContainerStyle={styles.pickerScrollContent}
                >
                  <View style={styles.pickerPadding} />
                  {minutes.map((minute) => (
                    <View key={minute} style={styles.pickerItem}>
                      <Text style={[
                        styles.pickerItemText,
                        minute === selectedMinute && styles.pickerItemTextSelected
                      ]}>
                        {minute.toString().padStart(2, '0')}
                      </Text>
                    </View>
                  ))}
                  <View style={styles.pickerPadding} />
                </ScrollView>
              </View>

              {/* Period Picker */}
              <View style={styles.pickerColumn}>
                <ScrollView
                  ref={periodScrollRef}
                  style={styles.pickerScroll}
                  showsVerticalScrollIndicator={false}
                  snapToInterval={50}
                  decelerationRate="fast"
                  onMomentumScrollEnd={handlePeriodScroll}
                  contentContainerStyle={styles.pickerScrollContent}
                >
                  <View style={styles.pickerPadding} />
                  {periods.map((period) => (
                    <View key={period} style={styles.pickerItem}>
                      <Text style={[
                        styles.pickerItemText,
                        period === selectedPeriod && styles.pickerItemTextSelected
                      ]}>
                        {period}
                      </Text>
                    </View>
                  ))}
                  <View style={styles.pickerPadding} />
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
  backButton: {
    position: 'absolute',
    left: 15,
    top: 37,
    zIndex: 1,
    width: 24,
    height: 24,
  },
  header: {
    alignItems: 'center',
    paddingTop: 46,
    paddingBottom: 20,
    paddingHorizontal: 77,
    height: 106,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FDFDFD',
    textAlign: 'center',
    lineHeight: 34,
    fontFamily: 'Inter',
    width: 237,
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  mainSection: {
    marginTop: 0,
    gap: 14,
  },
  dropdownCard: {
    backgroundColor: '#FDFDFD',
    borderRadius: 12,
    padding: 16,
    minHeight: 72,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  dropdownTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E2A38',
    fontFamily: 'Inter',
    flex: 1,
  },
  dropdownValue: {
    fontSize: 16,
    fontWeight: '400',
    color: '#1E2A38',
    fontFamily: 'Inter',
    marginRight: 11,
  },
  dropdownDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1E2A38',
    fontFamily: 'Inter',
    marginTop: 4,
    paddingRight: 76,
  },
  readySection: {
    alignItems: 'center',
    marginTop: 50,
    paddingHorizontal: 26,
    marginBottom: 100,
  },
  cloudButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cloudImage: {
    width: 306,
    height: 209,
    marginTop: -20,
    marginBottom: -3,
    shadowColor: 'rgba(183, 175, 197, 0.40)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  readyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FDFDFD',
    textAlign: 'center',
    fontFamily: 'Inter',
    lineHeight: 28,
    marginBottom: 11,
  },
  readySubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(253, 253, 253, 0.80)',
    textAlign: 'center',
    fontFamily: 'Inter',
    lineHeight: 20,
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
    width: 200,
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
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  dropdownOptionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  dropdownOptionText: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '700',
  },
  checkMark: {
    color: '#1E2A38',
    fontSize: 18,
    fontWeight: '700',
  },
  dropdownSeparator: {
    height: 1,
    backgroundColor: '#E5E8EC',
    marginHorizontal: 12,
  },
  devOption: {
    backgroundColor: '#FFE4B5',
  },
  devOptionText: {
    color: '#FF8C00',
    fontWeight: '800',
  },
  modalScrollContainer: {
    maxHeight: '85%',
    width: '100%',
  },
  modalScrollContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  sectionHeader: {
    backgroundColor: '#F0F2F5',
    paddingVertical: 8,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  sectionHeaderSpacing: {
    marginTop: 10,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  sectionHeaderText: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
  },
  sectionSubtext: {
    color: '#6B7280',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    marginTop: 4,
    textAlign: 'center',
  },
  timePickerModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  timePickerContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
  timePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E8EC',
  },
  timePickerButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 60,
  },
  timePickerButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontFamily: 'Inter',
  },
  timePickerConfirmText: {
    fontWeight: '600',
  },
  timePickerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E2A38',
    fontFamily: 'Inter',
  },
  timePicker: {
    height: 200,
    backgroundColor: '#FFFFFF',
  },
  pickerContainer: {
    flexDirection: 'row',
    height: 250,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  pickerSelectionOverlay: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    height: 50,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#C7C7CC',
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    zIndex: 1,
    pointerEvents: 'none',
  },
  pickerColumn: {
    flex: 1,
    height: 250,
  },
  pickerScroll: {
    flex: 1,
  },
  pickerScrollContent: {
    paddingVertical: 0,
  },
  pickerPadding: {
    height: 100,
  },
  pickerItem: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerItemText: {
    fontSize: 20,
    fontFamily: 'Inter',
    color: '#8E8E93',
    fontWeight: '400',
  },
  pickerItemTextSelected: {
    color: '#000000',
    fontWeight: '500',
  },
});
