import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import { Svg, Path, G, Defs, ClipPath, Rect } from 'react-native-svg';
import TimePickerModal from '../components/TimePickerModal';
import { usePersonalization } from '../components/PersonalizationProvider';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
  }),
});

// Back Arrow Icon
const BackArrowIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M0.439453 10.9441C-0.146484 11.5301 -0.146484 12.4816 0.439453 13.0676L7.93945 20.5676C8.52539 21.1535 9.47695 21.1535 10.0629 20.5676C10.6488 19.9816 10.6488 19.0301 10.0629 18.4441L5.11758 13.5035H19.4988C20.3285 13.5035 20.9988 12.8332 20.9988 12.0035C20.9988 11.1738 20.3285 10.5035 19.4988 10.5035H5.12227L10.0582 5.56289C10.6441 4.97695 10.6441 4.02539 10.0582 3.43945C9.47227 2.85352 8.5207 2.85352 7.93477 3.43945L0.434766 10.9395L0.439453 10.9441Z"
      fill="#FDFDFD"
    />
  </Svg>
);

// Dropdown Arrow Icon
const DropdownArrowIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path d="M24 24H0V0H24V24Z" stroke="#E5E7EB"/>
    <Path d="M10.9406 19.0595C11.5265 19.6454 12.4781 19.6454 13.064 19.0595L22.064 10.0595C22.65 9.47354 22.65 8.52197 22.064 7.93604C21.4781 7.3501 20.5265 7.3501 19.9406 7.93604L12 15.8767L4.05935 7.94072C3.47341 7.35478 2.52185 7.35478 1.93591 7.94072C1.34998 8.52666 1.34998 9.47822 1.93591 10.0642L10.9359 19.0642L10.9406 19.0595Z" fill="#1E2A38"/>
  </Svg>
);

// Edit/Pencil Icon for Time Picker
const EditIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <G clipPath="url(#clip0_285_440)">
      <Path
        d="M14.4246 8.12114L14.8219 7.72388L13.6301 6.53208L11.4469 4.34888L10.2551 3.15708L9.85781 3.55435L9.06328 4.34888L2.06015 11.352C1.69453 11.7176 1.42734 12.1711 1.27968 12.6668L0.0351511 16.8997C-0.0527396 17.195 0.0281198 17.5149 0.249604 17.7329C0.471089 17.9508 0.787495 18.0317 1.08281 17.9473L5.3121 16.7028C5.80781 16.5551 6.26132 16.2879 6.62695 15.9223L13.6301 8.91919L14.4246 8.12114ZM5.62499 14.0415L5.30507 14.8395C5.16445 14.9485 5.00624 15.0293 4.83749 15.0821L2.08828 15.8907L2.89687 13.145C2.94609 12.9727 3.03046 12.8145 3.13945 12.6774L3.93749 12.3575V13.4825C3.93749 13.7918 4.19062 14.045 4.49999 14.045H5.62499V14.0415ZM12.7512 0.657471L12.2449 1.16724L11.4504 1.96177L11.0496 2.35903L12.2414 3.55083L14.4246 5.73403L15.6164 6.92583L16.0137 6.52856L16.8082 5.73403L17.318 5.22427C18.1969 4.34536 18.1969 2.92153 17.318 2.04263L15.9363 0.657471C15.0574 -0.221436 13.6336 -0.221436 12.7547 0.657471H12.7512ZM11.0848 6.56372L6.02226 11.6262C5.80429 11.8442 5.4457 11.8442 5.22773 11.6262C5.00976 11.4083 5.00976 11.0497 5.22773 10.8317L10.2902 5.76919C10.5082 5.55122 10.8668 5.55122 11.0848 5.76919C11.3027 5.98716 11.3027 6.34575 11.0848 6.56372Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_285_440">
        <Path d="M0 0H18V18H0V0Z" fill="white"/>
      </ClipPath>
    </Defs>
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
    <G clipPath="url(#clip0_287_744)">
      <Path d="M18.125 10C18.125 12.1549 17.269 14.2215 15.7452 15.7452C14.2215 17.269 12.1549 18.125 10 18.125C7.84512 18.125 5.77849 17.269 4.25476 15.7452C2.73102 14.2215 1.875 12.1549 1.875 10C1.875 7.84512 2.73102 5.77849 4.25476 4.25476C5.77849 2.73102 7.84512 1.875 10 1.875C12.1549 1.875 14.2215 2.73102 15.7452 4.25476C17.269 5.77849 18.125 7.84512 18.125 10ZM0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C4.8043 18.9464 7.34784 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 7.34784 18.9464 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10ZM9.0625 4.6875V10C9.0625 10.3125 9.21875 10.6055 9.48047 10.7812L13.2305 13.2812C13.6602 13.5703 14.2422 13.4531 14.5312 13.0195C14.8203 12.5859 14.7031 12.0078 14.2695 11.7188L10.9375 9.5V4.6875C10.9375 4.16797 10.5195 3.75 10 3.75C9.48047 3.75 9.0625 4.16797 9.0625 4.6875Z" fill="#FDFDFD" fillOpacity="0.6"/>
    </G>
    <Defs>
      <ClipPath id="clip0_287_744">
        <Rect width="20" height="20" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Profile icon for Profile tab
const ProfileIcon = () => (
  <Svg width={18} height={20} viewBox="0 0 18 20" fill="none">
    <G clipPath="url(#clip0_287_752)">
      <Path d="M12.0938 5C12.0938 4.1712 11.7645 3.37634 11.1785 2.79029C10.5924 2.20424 9.79755 1.875 8.96875 1.875C8.13995 1.875 7.34509 2.20424 6.75904 2.79029C6.17299 3.37634 5.84375 4.1712 5.84375 5C5.84375 5.8288 6.17299 6.62366 6.75904 7.20971C7.34509 7.79576 8.13995 8.125 8.96875 8.125C9.79755 8.125 10.5924 7.79576 11.1785 7.20971C11.7645 6.62366 12.0938 5.8288 12.0938 5ZM3.96875 5C3.96875 3.67392 4.49553 2.40215 5.43322 1.46447C6.3709 0.526784 7.64267 0 8.96875 0C10.2948 0 11.5666 0.526784 12.5043 1.46447C13.442 2.40215 13.9688 3.67392 13.9688 5C13.9688 6.32608 13.442 7.59785 12.5043 8.53553C11.5666 9.47322 10.2948 10 8.96875 10C7.64267 10 6.3709 9.47322 5.43322 8.53553C4.49553 7.59785 3.96875 6.32608 3.96875 5ZM2.14453 18.125H15.793C15.4453 15.6523 13.3203 13.75 10.7539 13.75H7.18359C4.61719 13.75 2.49219 15.6523 2.14453 18.125ZM0.21875 18.8398C0.21875 14.9922 3.33594 11.875 7.18359 11.875H10.7539C14.6016 11.875 17.7188 14.9922 17.7188 18.8398C17.7188 19.4805 17.1992 20 16.5586 20H1.37891C0.738281 20 0.21875 19.4805 0.21875 18.8398Z" fill="#FDFDFD" fillOpacity="0.6"/>
    </G>
    <Defs>
      <ClipPath id="clip0_287_752">
        <Rect x="0.21875" y="0" width="17.5" height="20" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

const CustomNapReminderScreen = ({ navigation }) => {
  console.log('CustomNapReminderScreen loaded!');
  
  const { addCustomWeekdayReminder, removeCustomWeekdayReminder } = usePersonalization();
  
  const [selectedDays, setSelectedDays] = useState({
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
  });
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedWeeks, setSelectedWeeks] = useState('1 week');
  const [selectedTime, setSelectedTime] = useState('2:30 PM');
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  
  // Notification state
  const [notificationPermissionStatus, setNotificationPermissionStatus] = useState(null);
  const [scheduledNotificationIds, setScheduledNotificationIds] = useState([]);

  const weekOptions = ['1 week', '2 weeks', '3 weeks', '4 weeks'];
  
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Check notification permissions and set up categories on component mount
  useEffect(() => {
    const checkPermissions = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      setNotificationPermissionStatus(status);
    };

    const setNotificationCategories = async () => {
      await Notifications.setNotificationCategoryAsync('napScheduleReminder', [
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

  // Cleanup notifications on unmount
  useEffect(() => {
    return () => {
      if (scheduledNotificationIds.length > 0) {
        scheduledNotificationIds.forEach(id => {
          Notifications.cancelScheduledNotificationAsync(id);
        });
      }
    };
  }, [scheduledNotificationIds]);

  const handleDayPress = (day) => {
    setSelectedDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  const handleTimePress = () => {
    setTimePickerVisible(true);
  };

  const handleTimeConfirm = (timeString) => {
    setSelectedTime(timeString);
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

  // Parse time string to get hour, minute, and period
  const parseTimeString = (timeString) => {
    const [time, period] = timeString.split(' ');
    const [hour, minute] = time.split(':');
    return {
      hour: parseInt(hour),
      minute: parseInt(minute),
      period: period
    };
  };

  // Convert 12-hour format to 24-hour format
  const convertTo24Hour = (hour, period) => {
    let hour24 = hour;
    if (period === 'PM' && hour !== 12) {
      hour24 += 12;
    } else if (period === 'AM' && hour === 12) {
      hour24 = 0;
    }
    return hour24;
  };

  // Schedule notifications for custom schedule
  const scheduleCustomNotifications = async () => {
    try {
      const { hour, minute, period } = parseTimeString(selectedTime);
      const hour24 = convertTo24Hour(hour, period);
      const notificationIds = [];
      const weeksCount = parseInt(selectedWeeks.split(' ')[0]);

      // Get selected days
      const selectedDayNames = Object.keys(selectedDays).filter(day => selectedDays[day]);
      
      if (selectedDayNames.length === 0) {
        Alert.alert('No Days Selected', 'Please select at least one day for your custom reminder schedule.');
        return null;
      }

      // Map day names to day indices (0 = Sunday, 1 = Monday, etc.)
      const dayMap = {
        'Sunday': 0,
        'Monday': 1,
        'Tuesday': 2,
        'Wednesday': 3,
        'Thursday': 4,
        'Friday': 5,
        'Saturday': 6
      };

      // Schedule notifications for each week and each selected day
      for (let week = 0; week < weeksCount; week++) {
        for (const dayName of selectedDayNames) {
          const dayIndex = dayMap[dayName];
          
          // Find the next occurrence of this day in this week
          const today = new Date();
          const currentDay = today.getDay();
          
          // Calculate days until the target day in this week
          let daysUntil = dayIndex - currentDay + (week * 7);
          
          // If it's the same day and we're in week 0, make sure it's in the future
          if (week === 0 && dayIndex === currentDay) {
            const notificationTime = new Date();
            notificationTime.setHours(hour24, minute, 0, 0);
            
            // If the time has passed today, schedule for next week
            if (notificationTime <= new Date()) {
              daysUntil += 7;
            }
          } else if (week === 0 && daysUntil < 0) {
            // If the day has passed this week, add 7 days
            daysUntil += 7;
          }

          const notificationDate = new Date(today);
          notificationDate.setDate(today.getDate() + daysUntil);
          notificationDate.setHours(hour24, minute, 0, 0);

          // Only schedule if the notification time is in the future
          if (notificationDate > new Date()) {
            const notificationId = await Notifications.scheduleNotificationAsync({
              content: {
                title: "💤 Custom Nap Time!",
                body: `Time for your scheduled ${dayName} nap! Time to recharge and relax. ☁️`,
                sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
                categoryIdentifier: 'napScheduleReminder',
              },
              trigger: notificationDate,
            });

            notificationIds.push(notificationId);
            console.log(`Custom notification scheduled for ${dayName}, ${notificationDate.toLocaleString()} with ID: ${notificationId}`);
          }
        }
      }

      if (notificationIds.length === 0) {
        Alert.alert('No Future Dates', 'No notifications could be scheduled. Please select future dates and times.');
        return null;
      }

      console.log(`Scheduled ${notificationIds.length} custom notifications`);
      return notificationIds;
    } catch (error) {
      console.error('Error scheduling custom notifications:', error);
      Alert.alert('Error', 'Failed to schedule notification reminders.');
      return null;
    }
  };

  const handleSave = async () => {
    // Check if at least one day is selected
    const hasSelectedDays = Object.values(selectedDays).some(day => day);
    
    if (!hasSelectedDays) {
      Alert.alert('No Days Selected', 'Please select at least one day for your custom reminder schedule.');
      return;
    }

    // Request notification permissions if not already granted
    if (notificationPermissionStatus !== 'granted') {
      const permissionGranted = await requestNotificationPermissions();
      if (!permissionGranted) {
        return; // User denied permissions
      }
    }

    // Schedule notifications
    const notificationIds = await scheduleCustomNotifications();
    
    if (notificationIds && notificationIds.length > 0) {
      setScheduledNotificationIds(notificationIds);
      
      // Count selected days for success message
      const selectedDayNames = Object.keys(selectedDays).filter(day => selectedDays[day]);
      const weeksCount = parseInt(selectedWeeks.split(' ')[0]);
      const totalNotifications = selectedDayNames.length * weeksCount;
      
      // Save reminder data to PersonalizationProvider
      const reminderData = {
        id: `custom_${Date.now()}`, // Unique ID
        days: selectedDayNames,
        time: selectedTime,
        duration: selectedWeeks,
        notificationIds: notificationIds,
        createdAt: new Date().toISOString()
      };
      
      addCustomWeekdayReminder(reminderData);
      
      Alert.alert(
        'Schedule Saved! 🔔', 
        `Your custom nap reminder schedule has been saved successfully!\n\n${totalNotifications} notifications scheduled for your selected days over ${selectedWeeks}.`, 
        [{ text: 'Great!', onPress: () => navigation.goBack() }]
      );
      
      console.log('Selected days:', selectedDays);
      console.log('Selected time:', selectedTime);
      console.log('Selected weeks:', selectedWeeks);
      console.log('Scheduled notification IDs:', notificationIds);
      console.log('Saved reminder data:', reminderData);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleHomePress = () => {
    navigation.navigate('Home');
  };

  const handleHistoryPress = () => {
    navigation.navigate('NapHistory');
  };

  const handleFeaturesPress = () => {
    navigation.navigate('Features');
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <BackArrowIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Custom Nap Reminder</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        {/* Weekday Selection Card */}
        <View style={styles.weekdayCard}>
          <View style={styles.weekdayList}>
            {days.map((day, index) => (
              <TouchableOpacity
                key={day}
                style={styles.dayRow}
                onPress={() => handleDayPress(day)}
              >
                <View style={[
                  styles.checkbox,
                  selectedDays[day] && styles.checkboxSelected
                ]}>
                  {selectedDays[day] && (
                    <View style={styles.checkmark} />
                  )}
                </View>
                <Text style={styles.dayText}>{day}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Time Picker Section */}
          <View style={styles.timePickerSection}>
            <Text style={styles.timeLabel}>Reminder Time:</Text>
            <TouchableOpacity style={styles.timePicker} onPress={handleTimePress}>
              <Text style={styles.timeText}>{selectedTime}</Text>
              <EditIcon />
            </TouchableOpacity>
          </View>
        </View>

        {/* Helper Text Card */}
        <View style={styles.helperCard}>
          <Text style={styles.helperText}>
            Select days and time for your custom reminder schedule. Choose how many weeks this pattern should repeat.
          </Text>
        </View>

        {/* Dropdown Section */}
        <View style={styles.dropdownContainer}>
          <TouchableOpacity 
            style={styles.dropdown}
            onPress={() => setDropdownVisible(true)}
          >
            <Text style={styles.dropdownLabel}>Duration: {selectedWeeks}</Text>
            <DropdownArrowIcon />
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <View style={styles.saveSection}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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

      {/* Dropdown Modal */}
      <Modal
        visible={dropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setDropdownVisible(false)}
        >
          <View style={styles.dropdownModal}>
            {weekOptions.map((option, index) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.dropdownOption,
                  index < weekOptions.length - 1 && styles.dropdownOptionBorder
                ]}
                onPress={() => {
                  setSelectedWeeks(option);
                  setDropdownVisible(false);
                }}
              >
                <Text style={styles.dropdownOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Time Picker Modal */}
      <TimePickerModal
        visible={timePickerVisible}
        onClose={() => setTimePickerVisible(false)}
        onConfirm={handleTimeConfirm}
        title="Select Reminder Time"
        initialHour={2}
        initialMinute={30}
        initialPeriod="PM"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2A38',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 34,
    paddingBottom: 20,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 37,
    zIndex: 1,
  },
  headerTitle: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28,
    textAlign: 'center',
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 90, // Add bottom padding to account for absolute positioned navigation
  },
  weekdayCard: {
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    padding: 16,
    marginTop: 4,
    marginBottom: 9,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  weekdayList: {
    gap: 8,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingVertical: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#1E2A38',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#1E2A38',
  },
  checkmark: {
    width: 8,
    height: 8,
    backgroundColor: '#E5E8EC',
    borderRadius: 1,
  },
  dayText: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
  },
  timePickerSection: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#C7C7C7',
  },
  timeLabel: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  timePicker: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDFDFD',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#1E2A38',
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'center',
    minWidth: 140,
    maxWidth: 180,
  },
  timeText: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 12,
  },
  helperCard: {
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  helperText: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdown: {
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#1E2A38',
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 56,
  },
  dropdownLabel: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '700',
  },
  saveSection: {
    marginBottom: 30,
  },
  saveButton: {
    backgroundColor: '#B7AFC5',
    borderRadius: 12,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
  },
  saveButtonText: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
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
  dropdownModal: {
    backgroundColor: '#FDFDFD',
    borderRadius: 12,
    width: 150,
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
  dropdownOptionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E8EC',
  },
  dropdownOptionText: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default CustomNapReminderScreen;
