import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Modal,
  Alert,
} from 'react-native';
import { Svg, Path, G, Defs, ClipPath } from 'react-native-svg';
import * as Notifications from 'expo-notifications';
import TimePickerModal from '../components/TimePickerModal';
import { usePersonalization } from '../components/PersonalizationProvider';

// Configure notification handler
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

// Duration icon (Timer/Clock)
const DurationIcon = () => (
  <Svg width={18} height={21} viewBox="0 0 18 21" fill="none">
    <G clipPath="url(#clip0_349_116)">
      <Path
        d="M7.125 0.5C6.43359 0.5 5.875 1.05859 5.875 1.75C5.875 2.44141 6.43359 3 7.125 3H7.75V4.34375C3.85547 4.94531 0.875 8.3125 0.875 12.375C0.875 16.8633 4.51172 20.5 9 20.5C13.4883 20.5 17.125 16.8633 17.125 12.375C17.125 10.7422 16.6445 9.22266 15.8164 7.95312L16.7578 7.01172C17.2461 6.52344 17.2461 5.73047 16.7578 5.24219C16.2695 4.75391 15.4766 4.75391 14.9883 5.24219L14.1445 6.08594C13.0469 5.1875 11.7148 4.57031 10.25 4.34375V3H10.875C11.5664 3 12.125 2.44141 12.125 1.75C12.125 1.05859 11.5664 0.5 10.875 0.5H9H7.125ZM9.9375 8V13C9.9375 13.5195 9.51953 13.9375 9 13.9375C8.48047 13.9375 8.0625 13.5195 8.0625 13V8C8.0625 7.48047 8.48047 7.0625 9 7.0625C9.51953 7.0625 9.9375 7.48047 9.9375 8Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_349_116">
        <Path d="M0.25 0.5H17.75V20.5H0.25V0.5Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Reminder Time icon (Clock)
const ReminderTimeIcon = () => (
  <Svg width={20} height={21} viewBox="0 0 20 21" fill="none">
    <G clipPath="url(#clip0_349_121)">
      <Path
        d="M10 0.5C12.6522 0.5 15.1957 1.55357 17.0711 3.42893C18.9464 5.3043 20 7.84784 20 10.5C20 13.1522 18.9464 15.6957 17.0711 17.5711C15.1957 19.4464 12.6522 20.5 10 20.5C7.34784 20.5 4.8043 19.4464 2.92893 17.5711C1.05357 15.6957 0 13.1522 0 10.5C0 7.84784 1.05357 5.3043 2.92893 3.42893C4.8043 1.55357 7.34784 0.5 10 0.5ZM9.0625 5.1875V10.5C9.0625 10.8125 9.21875 11.1055 9.48047 11.2812L13.2305 13.7812C13.6602 14.0703 14.2422 13.9531 14.5312 13.5195C14.8203 13.0859 14.7031 12.5078 14.2695 12.2188L10.9375 10V5.1875C10.9375 4.66797 10.5195 4.25 10 4.25C9.48047 4.25 9.0625 4.66797 9.0625 5.1875Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_349_121">
        <Path d="M0 0.5H20V20.5H0V0.5Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Dropdown arrow icon
const DropdownIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path d="M16 16H0V0H16V16Z" stroke="#E5E7EB"/>
    <Path
      d="M7.29377 12.7062C7.6844 13.0968 8.31877 13.0968 8.7094 12.7062L14.7094 6.70615C15.1 6.31553 15.1 5.68115 14.7094 5.29053C14.3188 4.8999 13.6844 4.8999 13.2938 5.29053L8.00002 10.5843L2.70627 5.29365C2.31565 4.90303 1.68127 4.90303 1.29065 5.29365C0.900024 5.68428 0.900024 6.31865 1.29065 6.70928L7.29065 12.7093L7.29377 12.7062Z"
      fill="#1E2A38"
    />
  </Svg>
);

// Home icon for bottom navigation
const HomeIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M10 2.5L2.5 8.75V17.5C2.5 17.8315 2.6317 18.1495 2.86612 18.3839C3.10054 18.6183 3.41848 18.75 3.75 18.75H7.5V13.75C7.5 13.4185 7.6317 13.1005 7.86612 12.8661C8.10054 12.6317 8.41848 12.5 8.75 12.5H11.25C11.5815 12.5 11.8995 12.6317 12.1339 12.8661C12.3683 13.1005 12.5 13.4185 12.5 13.75V18.75H16.25C16.5815 18.75 16.8995 18.6183 17.1339 18.3839C17.3683 18.1495 17.5 17.8315 17.5 17.5V8.75L10 2.5Z"
      fill="#FDFDFD"
      fillOpacity="0.6"
    />
  </Svg>
);

// Clock icon for History tab
const ClockIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <G clipPath="url(#clip0_349_348)">
      <Path
        d="M18.125 10C18.125 12.1549 17.269 14.2215 15.7452 15.7452C14.2215 17.269 12.1549 18.125 10 18.125C7.84512 18.125 5.77849 17.269 4.25476 15.7452C2.73102 14.2215 1.875 12.1549 1.875 10C1.875 7.84512 2.73102 5.77849 4.25476 4.25476C5.77849 2.73102 7.84512 1.875 10 1.875C12.1549 1.875 14.2215 2.73102 15.7452 4.25476C17.269 5.77849 18.125 7.84512 18.125 10ZM0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C4.8043 18.9464 7.34784 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 7.34784 18.9464 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10ZM9.0625 4.6875V10C9.0625 10.3125 9.21875 10.6055 9.48047 10.7812L13.2305 13.2812C13.6602 13.5703 14.2422 13.4531 14.5312 13.0195C14.8203 12.5859 14.7031 12.0078 14.2695 11.7188L10.9375 9.5V4.6875C10.9375 4.16797 10.5195 3.75 10 3.75C9.48047 3.75 9.0625 4.16797 9.0625 4.6875Z"
        fill="#FDFDFD"
        fillOpacity="0.6"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_349_348">
        <Path d="M0 0H20V20H0V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Profile icon for Profile tab
const ProfileIcon = () => (
  <Svg width={18} height={20} viewBox="0 0 18 20" fill="none">
    <G clipPath="url(#clip0_349_356)">
      <Path
        d="M12.0938 5C12.0938 4.1712 11.7645 3.37634 11.1785 2.79029C10.5924 2.20424 9.79755 1.875 8.96875 1.875C8.13995 1.875 7.34509 2.20424 6.75904 2.79029C6.17299 3.37634 5.84375 4.1712 5.84375 5C5.84375 5.8288 6.17299 6.62366 6.75904 7.20971C7.34509 7.79576 8.13995 8.125 8.96875 8.125C9.79755 8.125 10.5924 7.79576 11.1785 7.20971C11.7645 6.62366 12.0938 5.8288 12.0938 5ZM3.96875 5C3.96875 3.67392 4.49553 2.40215 5.43322 1.46447C6.3709 0.526784 7.64267 0 8.96875 0C10.2948 0 11.5666 0.526784 12.5043 1.46447C13.442 2.40215 13.9688 3.67392 13.9688 5C13.9688 6.32608 13.442 7.59785 12.5043 8.53553C11.5666 9.47322 10.2948 10 8.96875 10C7.64267 10 6.3709 9.47322 5.43322 8.53553C4.49553 7.59785 3.96875 6.32608 3.96875 5ZM2.14453 18.125H15.793C15.4453 15.6523 13.3203 13.75 10.7539 13.75H7.18359C4.61719 13.75 2.49219 15.6523 2.14453 18.125ZM0.21875 18.8398C0.21875 14.9922 3.33594 11.875 7.18359 11.875H10.7539C14.6016 11.875 17.7188 14.9922 17.7188 18.8398C17.7188 19.4805 17.1992 20 16.5586 20H1.37891C0.738281 20 0.21875 19.4805 0.21875 18.8398Z"
        fill="#FDFDFD"
        fillOpacity="0.6"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_349_356">
        <Path d="M0.21875 0H17.7188V20H0.21875V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

export default function DailyNapPlannerScreen({ navigation }) {
  const { setDailyPlannerReminder, clearDailyPlannerReminder } = usePersonalization();
  
  const [selectedDuration, setSelectedDuration] = useState('20 min');
  const [selectedReminderTime, setSelectedReminderTime] = useState('3:00 PM');
  
  // Modal states
  const [showDurationModal, setShowDurationModal] = useState(false);
  const [showTimePickerModal, setShowTimePickerModal] = useState(false);
  
  // Notification states
  const [notificationPermissionStatus, setNotificationPermissionStatus] = useState(null);
  const [scheduledNotificationId, setScheduledNotificationId] = useState(null);
  
  // Time picker states
  const [selectedHour, setSelectedHour] = useState(3);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState('PM');
  
  // Duration options (matching main screens, no 30 min)
  const durationOptions = ['10 min', '15 min', '20 min', '25 min', '90 min'];

  // Check notification permissions on component mount
  useEffect(() => {
    checkNotificationPermissions();
  }, []);

  const checkNotificationPermissions = async () => {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      setNotificationPermissionStatus(status);
      console.log('Current notification permission status:', status);
      
      if (status === 'granted') {
        await Notifications.setNotificationCategoryAsync('napPlannerReminder', [
          {
            identifier: 'openApp',
            buttonTitle: 'Open App',
            options: {
              opensAppToForeground: true,
            },
          },
        ]);
      }
    } catch (error) {
      console.error('Error checking notification permissions:', error);
    }
  };

  // Cleanup notifications on unmount
  useEffect(() => {
    return () => {
      if (scheduledNotificationId) {
        Notifications.cancelScheduledNotificationAsync(scheduledNotificationId);
      }
    };
  }, [scheduledNotificationId]);

  const handleBack = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleDurationPress = () => {
    setShowDurationModal(true);
  };

  const handleReminderTimePress = async () => {
    // Check and request notification permissions first
    const permission = await requestNotificationPermissions();
    if (permission) {
      setShowTimePickerModal(true);
    }
  };

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
          [{ text: 'OK' }]
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
      return false;
    }
  };

  const selectDuration = (duration) => {
    setSelectedDuration(duration);
    setShowDurationModal(false);
  };

  const handleTimeConfirm = (timeString, hour, minute, period) => {
    setSelectedHour(hour);
    setSelectedMinute(minute);
    setSelectedPeriod(period);
    const formattedTime = `${hour}:${minute.toString().padStart(2, '0')} ${period}`;
    setSelectedReminderTime(formattedTime);
    setShowTimePickerModal(false);
  };

  const scheduleNotification = async () => {
    try {
      // Cancel any existing notification (like other screens do)
      if (scheduledNotificationId) {
        await Notifications.cancelScheduledNotificationAsync(scheduledNotificationId);
      }

      const now = new Date();
      const notificationDate = new Date();
      
      // Convert 12-hour to 24-hour format (same as other screens)
      let hour24 = selectedHour;
      if (selectedPeriod === 'PM' && selectedHour !== 12) {
        hour24 += 12;
      } else if (selectedPeriod === 'AM' && selectedHour === 12) {
        hour24 = 0;
      }
      
      notificationDate.setHours(hour24, selectedMinute, 0, 0);
      
      // If the time has already passed today, schedule for tomorrow
      if (notificationDate <= now) {
        notificationDate.setDate(notificationDate.getDate() + 1);
      }

      // Only schedule if the notification time is in the future (like other screens)
      if (notificationDate <= new Date()) {
        Alert.alert('Invalid Time', 'Please select a future time for your nap reminder.');
        return null;
      }
      
      // Extract duration number for the notification message
      const durationNumber = selectedDuration.replace(' min', '');
      
      // Schedule the notification (same pattern as other screens)
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "💤 Time for Your Nap!",
          body: `It's time for your ${durationNumber}-minute recharge! Time to relax and rest. ☁️`,
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
          categoryIdentifier: 'napPlannerReminder',
        },
        trigger: notificationDate, // Direct trigger like other screens
      });

      setScheduledNotificationId(notificationId);
      console.log('Notification scheduled with ID:', notificationId);
      console.log('Notification will fire at:', notificationDate.toLocaleString());
      
      const timeString = selectedReminderTime;
      const isToday = notificationDate.toDateString() === now.toDateString();
      const dayText = isToday ? 'today' : 'tomorrow';
      
      // Save reminder data to PersonalizationProvider
      const reminderData = {
        id: `daily_${Date.now()}`,
        time: timeString,
        duration: selectedDuration,
        notificationId: notificationId,
        scheduledFor: dayText,
        createdAt: new Date().toISOString()
      };
      
      setDailyPlannerReminder(reminderData);
      
      Alert.alert(
        'Reminder Set! 🔔',
        `Reminder set for ${timeString} ${dayText}\n\nYou'll be reminded to take your ${durationNumber}-minute nap.`,
        [
          { text: 'Perfect!', style: 'default' },
          { 
            text: 'Test Now', 
            onPress: async () => {
              await scheduleTestNotification();
            }
          }
        ]
      );
      
      console.log('Saved daily planner reminder data:', reminderData);

      return notificationId;
    } catch (error) {
      console.error('Error scheduling notification:', error);
      Alert.alert('Error', 'Failed to schedule notification reminder.');
      return null;
    }
  };

  // Test notification (fires in 5 seconds) - same as other screens
  const scheduleTestNotification = async () => {
    try {
      const durationNumber = selectedDuration.replace(' min', '');
      
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "🧪 Test Notification",
          body: `This is a test! Your ${durationNumber}-minute nap reminders will work like this. 😴`,
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
          categoryIdentifier: 'napPlannerReminder',
        },
        trigger: { seconds: 5 },
      });
      
      console.log('Test notification scheduled:', notificationId);
      Alert.alert('Test Sent!', 'Check your notifications in 5 seconds! 📱');
      return notificationId;
    } catch (error) {
      console.error('Error scheduling test notification:', error);
      return null;
    }
  };

  const handleRemindMe = async () => {
    console.log('Remind Me pressed');
    
    // Check permissions first
    const permission = await requestNotificationPermissions();
    if (permission) {
      await scheduleNotification();
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
    if (navigation) {
      navigation.navigate('Features');
    }
  };

  const handleProfilePress = () => {
    console.log('Profile tab pressed');
    if (navigation) {
      navigation.navigate('Profile');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <BackArrowIcon />
        </TouchableOpacity>
        
        {/* Title */}
        <Text style={styles.headerTitle}>Today's Nap Plan</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Dynamic Recharge Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{selectedDuration.replace(' min', '-minute')} Recharge</Text>
        </View>

        {/* Settings Card */}
        <View style={styles.settingsCard}>
          {/* Duration Row */}
          <TouchableOpacity style={styles.settingRow} onPress={handleDurationPress}>
            <View style={styles.settingLeft}>
              <DurationIcon />
              <Text style={styles.settingLabel}>Duration</Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>{selectedDuration}</Text>
              <DropdownIcon />
            </View>
          </TouchableOpacity>

          {/* Reminder Time Row */}
          <TouchableOpacity style={[styles.settingRow, styles.lastSettingRow]} onPress={handleReminderTimePress}>
            <View style={styles.settingLeft}>
              <ReminderTimeIcon />
              <Text style={styles.settingLabel}>Reminder Time</Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>
                {selectedReminderTime} {notificationPermissionStatus === 'granted' ? '🔔' : '🔕'}
              </Text>
              <DropdownIcon />
            </View>
          </TouchableOpacity>
        </View>

        {/* Action Button */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.remindMeButton} onPress={handleRemindMe} activeOpacity={0.8}>
            <Text style={styles.remindMeButtonText}>Remind Me</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <View style={styles.navContainer}>
          <TouchableOpacity style={styles.navButton} onPress={handleHomePress}>
            <HomeIcon />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={handleHistoryPress}>
            <ClockIcon />
            <Text style={styles.navText}>History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={handleFeaturesPress}>
            <View style={styles.featuresIcon}>
              <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                <Path d="M10 0L12.5 7.5H20L14.5 12L16.5 20L10 15L3.5 20L5.5 12L0 7.5H7.5L10 0Z" fill="#B7AFC5" />
              </Svg>
            </View>
            <Text style={styles.navTextActive}>Features</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={handleProfilePress}>
            <ProfileIcon />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Duration Selection Modal */}
      <Modal
        visible={showDurationModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDurationModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowDurationModal(false)}
        >
          <View style={styles.dropdownContainer}>
            {durationOptions.map((duration, index) => (
              <View key={duration}>
                <TouchableOpacity
                  style={styles.dropdownOption}
                  onPress={() => selectDuration(duration)}
                >
                  <Text style={styles.dropdownOptionText}>{duration}</Text>
                </TouchableOpacity>
                {index < durationOptions.length - 1 && (
                  <View style={styles.dropdownSeparator} />
                )}
              </View>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Time Picker Modal */}
      <TimePickerModal
        visible={showTimePickerModal}
        onClose={() => setShowTimePickerModal(false)}
        onConfirm={handleTimeConfirm}
        title="Select Reminder Time"
        initialHour={selectedHour}
        initialMinute={selectedMinute}
        initialPeriod={selectedPeriod}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2A38',
  },
  header: {
    height: 77,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 46,
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 41,
    padding: 8,
    zIndex: 10,
  },
  headerTitle: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 70, // Space for bottom navigation
  },
  titleContainer: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 24,
  },
  title: {
    color: '#FDFDFD',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
  settingsCard: {
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(30, 42, 56, 0.20)',
  },
  lastSettingRow: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingLabel: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingValue: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  actionButtonsContainer: {
    gap: 16,
  },
  remindMeButton: {
    backgroundColor: '#B7AFC5',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  remindMeButtonText: {
    color: '#FDFDFD',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
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
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    backgroundColor: '#FDFDFD',
    borderRadius: 12,
    minWidth: 200,
    maxWidth: 300,
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
    justifyContent: 'center',
  },
  dropdownOptionText: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  dropdownSeparator: {
    height: 1,
    backgroundColor: 'rgba(30, 42, 56, 0.1)',
    marginHorizontal: 16,
  },
});
