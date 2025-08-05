import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import { Svg, Path, G, Defs, ClipPath } from 'react-native-svg';
import TimePickerModal from '../components/TimePickerModal';
import { usePersonalization } from '../components/PersonalizationProvider';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
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

// Left Arrow Icon for Calendar Navigation
const LeftArrowIcon = () => (
  <Svg width={11} height={18} viewBox="0 0 12 18" fill="none">
    <G clipPath="url(#clip0_285_475)">
      <Path
        d="M0.705475 8.20542C0.266022 8.64487 0.266022 9.35855 0.705475 9.798L7.45547 16.548C7.89493 16.9875 8.6086 16.9875 9.04805 16.548C9.48751 16.1085 9.48751 15.3949 9.04805 14.9554L3.09258 8.99995L9.04454 3.04448C9.48399 2.60503 9.48399 1.89136 9.04454 1.4519C8.60508 1.01245 7.89141 1.01245 7.45196 1.4519L0.701959 8.2019L0.705475 8.20542Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_285_475">
        <Path d="M0.375 0H11.625V18H0.375V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Right Arrow Icon for Calendar Navigation
const RightArrowIcon = () => (
  <Svg width={11} height={18} viewBox="0 0 12 18" fill="none">
    <G clipPath="url(#clip0_285_478)">
      <Path
        d="M11.2789 8.20542C11.7184 8.64487 11.7184 9.35855 11.2789 9.798L4.52892 16.548C4.08947 16.9875 3.37579 16.9875 2.93634 16.548C2.49689 16.1085 2.49689 15.3949 2.93634 14.9554L8.89181 8.99995L2.93986 3.04448C2.5004 2.60503 2.5004 1.89136 2.93986 1.4519C3.37931 1.01245 4.09298 1.01245 4.53243 1.4519L11.2824 8.2019L11.2789 8.20542Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_285_478">
        <Path d="M0.359375 0H11.6094V18H0.359375V0Z" fill="white"/>
      </ClipPath>
    </Defs>
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
    <G clipPath="url(#clip0_285_600)">
      <Path
        d="M18.125 10C18.125 12.1549 17.269 14.2215 15.7452 15.7452C14.2215 17.269 12.1549 18.125 10 18.125C7.84512 18.125 5.77849 17.269 4.25476 15.7452C2.73102 14.2215 1.875 12.1549 1.875 10C1.875 7.84512 2.73102 5.77849 4.25476 4.25476C5.77849 2.73102 7.84512 1.875 10 1.875C12.1549 1.875 14.2215 2.73102 15.7452 4.25476C17.269 5.77849 18.125 7.84512 18.125 10ZM0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C4.8043 18.9464 7.34784 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 7.34784 18.9464 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10ZM9.0625 4.6875V10C9.0625 10.3125 9.21875 10.6055 9.48047 10.7812L13.2305 13.2812C13.6602 13.5703 14.2422 13.4531 14.5312 13.0195C14.8203 12.5859 14.7031 12.0078 14.2695 11.7188L10.9375 9.5V4.6875C10.9375 4.16797 10.5195 3.75 10 3.75C9.48047 3.75 9.0625 4.16797 9.0625 4.6875Z"
        fill="#FDFDFD"
        fillOpacity="0.6"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_285_600">
        <Path d="M0 0H20V20H0V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Star/Features icon for Features tab
const StarIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M10 0L12.5 7.5H20L14.5 12L16.5 20L10 15L3.5 20L5.5 12L0 7.5H7.5L10 0Z"
      fill="#FDFDFD"
      fillOpacity="0.6"
    />
  </Svg>
);

// Profile icon for Profile tab
const ProfileIcon = () => (
  <Svg width={18} height={20} viewBox="0 0 18 20" fill="none">
    <G clipPath="url(#clip0_285_608)">
      <Path
        d="M12.0938 5C12.0938 4.1712 11.7645 3.37634 11.1785 2.79029C10.5924 2.20424 9.79755 1.875 8.96875 1.875C8.13995 1.875 7.34509 2.20424 6.75904 2.79029C6.17299 3.37634 5.84375 4.1712 5.84375 5C5.84375 5.8288 6.17299 6.62366 6.75904 7.20971C7.34509 7.79576 8.13995 8.125 8.96875 8.125C9.79755 8.125 10.5924 7.79576 11.1785 7.20971C11.7645 6.62366 12.0938 5.8288 12.0938 5ZM3.96875 5C3.96875 3.67392 4.49553 2.40215 5.43322 1.46447C6.3709 0.526784 7.64267 0 8.96875 0C10.2948 0 11.5666 0.526784 12.5043 1.46447C13.442 2.40215 13.9688 3.67392 13.9688 5C13.9688 6.32608 13.442 7.59785 12.5043 8.53553C11.5666 9.47322 10.2948 10 8.96875 10C7.64267 10 6.3709 9.47322 5.43322 8.53553C4.49553 7.59785 3.96875 6.32608 3.96875 5ZM2.14453 18.125H15.793C15.4453 15.6523 13.3203 13.75 10.7539 13.75H7.18359C4.61719 13.75 2.49219 15.6523 2.14453 18.125ZM0.21875 18.8398C0.21875 14.9922 3.33594 11.875 7.18359 11.875H10.7539C14.6016 11.875 17.7188 14.9922 17.7188 18.8398C17.7188 19.4805 17.1992 20 16.5586 20H1.37891C0.738281 20 0.21875 19.4805 0.21875 18.8398Z"
        fill="#FDFDFD"
        fillOpacity="0.6"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_285_608">
        <Path d="M0.21875 0H17.7188V20H0.21875V0Z" fill="white" transform="translate(0.21875)"/>
      </ClipPath>
    </Defs>
  </Svg>
);

export default function NapSchedulerScreen({ navigation }) {
  const { addScheduledDateReminder, removeScheduledDateReminder } = usePersonalization();
  
  // Get current date for calendar
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(() => {
    // Default to today's date if we're in the current month
    const today = new Date();
    return today.getDate();
  });
  const [selectedTime, setSelectedTime] = useState('2:30 PM');
  const [selectedFrequency, setSelectedFrequency] = useState('Once');
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  // Notification state
  const [notificationPermissionStatus, setNotificationPermissionStatus] = useState(null);
  const [scheduledNotificationIds, setScheduledNotificationIds] = useState([]);

  // Selected individual dates for weekdays mode (stored as date strings "YYYY-MM-DD")
  const [selectedWeekdayDates, setSelectedWeekdayDates] = useState([]);

  // Calendar data
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Get days for current month
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        isNextMonth: false
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isCurrentMonth: true,
        isNextMonth: false
      });
    }

    // Next month days to fill the grid
    const remainingCells = 42 - days.length; // 6 rows × 7 days
    for (let day = 1; day <= remainingCells; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        isNextMonth: true
      });
    }

    return days;
  };

  const days = getDaysInMonth();

  // Helper function to check if a date is a weekday (Monday = 1, Friday = 5)
  const isWeekday = (dateObj) => {
    if (!dateObj.isCurrentMonth) return false;
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), dateObj.day);
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    return dayOfWeek >= 1 && dayOfWeek <= 5; // Monday through Friday
  };

  // Helper function to check if a specific date is selected
  const isDateSelected = (dateObj) => {
    if (!dateObj.isCurrentMonth) return false;
    const dateString = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.day.toString().padStart(2, '0')}`;
    return selectedWeekdayDates.includes(dateString);
  };

  // Helper function to get date string for a date object
  const getDateString = (dateObj) => {
    return `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.day.toString().padStart(2, '0')}`;
  };

  // Helper function to get the day of week for a date
  const getDayOfWeek = (dateObj) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), dateObj.day);
    return date.getDay();
  };

  // Check notification permissions on component mount
  useEffect(() => {
    const checkPermissions = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      setNotificationPermissionStatus(status);
    };

    // Set notification categories
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

  // Schedule notification for "Once" frequency
  const scheduleOnceNotification = async () => {
    try {
      const { hour, minute, period } = parseTimeString(selectedTime);
      const hour24 = convertTo24Hour(hour, period);

      // Create notification date for the selected date and time
      const notificationDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDate);
      notificationDate.setHours(hour24, minute, 0, 0);

      // Make sure the notification is in the future
      const now = new Date();
      if (notificationDate <= now) {
        Alert.alert('Invalid Time', 'Please select a future date and time for your nap reminder.');
        return null;
      }

      // Schedule the notification
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "💤 Time for Your Nap!",
          body: "It's time to take that relaxing nap you scheduled. Sweet dreams! ☁️",
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
          categoryIdentifier: 'napScheduleReminder',
        },
        trigger: notificationDate,
      });

      console.log('Once notification scheduled with ID:', notificationId);
      console.log('Notification will fire at:', notificationDate.toLocaleString());

      return [notificationId];
    } catch (error) {
      console.error('Error scheduling once notification:', error);
      Alert.alert('Error', 'Failed to schedule notification reminder.');
      return null;
    }
  };

  // Schedule notifications for selected individual weekday dates
  const scheduleWeekdaysNotifications = async () => {
    try {
      const { hour, minute, period } = parseTimeString(selectedTime);
      const hour24 = convertTo24Hour(hour, period);
      const notificationIds = [];

      // Schedule for each selected individual date
      for (const dateString of selectedWeekdayDates) {
        const [year, month, day] = dateString.split('-').map(Number);
        const notificationDate = new Date(year, month - 1, day); // month - 1 because Date uses 0-based months
        notificationDate.setHours(hour24, minute, 0, 0);

        // Only schedule if the notification time is in the future
        if (notificationDate > new Date()) {
          const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
              title: "💤 Time for Your Nap!",
              body: "It's time for your scheduled nap! Time to recharge and relax. ☁️",
              sound: true,
              priority: Notifications.AndroidNotificationPriority.HIGH,
              categoryIdentifier: 'napScheduleReminder',
            },
            trigger: notificationDate,
          });

          notificationIds.push(notificationId);
          console.log(`Individual date notification scheduled for ${notificationDate.toLocaleString()} with ID: ${notificationId}`);
        }
      }

      if (notificationIds.length === 0) {
        Alert.alert('No Future Dates', 'No notifications could be scheduled. Please select future dates.');
        return null;
      }

      console.log(`Scheduled ${notificationIds.length} individual date notifications`);
      return notificationIds;
    } catch (error) {
      console.error('Error scheduling individual date notifications:', error);
      Alert.alert('Error', 'Failed to schedule notification reminders.');
      return null;
    }
  };

  const handleDatePress = (day) => {
    if (day.isCurrentMonth) {
      const today = new Date();
      const selectedDateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day.day);

      // Only allow selection of today or future dates
      if (selectedDateObj >= today.setHours(0, 0, 0, 0)) {
        if (selectedFrequency === 'Weekdays' && isWeekday(day)) {
          // Toggle individual date selection when in weekdays mode
          const dateString = getDateString(day);
          if (selectedWeekdayDates.includes(dateString)) {
            // Remove this specific date
            setSelectedWeekdayDates(prev => prev.filter(d => d !== dateString));
          } else {
            // Add this specific date
            setSelectedWeekdayDates(prev => [...prev, dateString].sort());
          }
        } else if (selectedFrequency === 'Once') {
          // Normal date selection for "Once" mode
          setSelectedDate(day.day);
        }
      }
    }
  };

  const handleTimePress = () => {
    setTimePickerVisible(true);
  };

  const handleTimeConfirm = (timeString) => {
    setSelectedTime(timeString);
  };

  // Helper function to get all future weekdays in a specific month
  const getAllFutureWeekdaysInMonth = (targetDate = currentDate) => {
    const today = new Date();
    const weekdayDates = [];
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

      // Check if it's a weekday (Monday through Friday) and not in the past
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        const dateObj = new Date(year, month, day);
        if (dateObj >= today.setHours(0, 0, 0, 0)) {
          const dateString = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
          weekdayDates.push(dateString);
        }
      }
    }

    return weekdayDates;
  };

  const handleFrequencyPress = (frequency) => {
    console.log('Frequency pressed:', frequency);
    
    if (frequency === 'Custom') {
      console.log('Navigating to CustomNapReminder screen...');
      try {
        navigation.navigate('CustomNapReminder');
        console.log('Navigation call completed');
      } catch (error) {
        console.error('Navigation error:', error);
        Alert.alert('Navigation Error', 'Could not open custom reminder screen. Please try again.');
      }
      return;
    }

    setSelectedFrequency(frequency);

    // Auto-select all future weekdays when switching to weekdays mode
    if (frequency === 'Weekdays') {
      const allWeekdays = getAllFutureWeekdaysInMonth();
      setSelectedWeekdayDates(allWeekdays);
    }
  };

  const handleContinue = async () => {
    // Cancel any existing notifications first
    if (scheduledNotificationIds.length > 0) {
      scheduledNotificationIds.forEach(id => {
        Notifications.cancelScheduledNotificationAsync(id);
      });
      setScheduledNotificationIds([]);
    }

    // Check and request notification permissions first
    const permission = await requestNotificationPermissions();
    if (!permission) {
      return;
    }

    let notificationIds = null;

    // Schedule notifications based on frequency
    if (selectedFrequency === 'Once') {
      notificationIds = await scheduleOnceNotification();
    } else if (selectedFrequency === 'Weekdays') {
      if (selectedWeekdayDates.length === 0) {
        Alert.alert('No Dates Selected', 'Please tap on weekday dates to select them for your reminders.');
        return;
      }
      notificationIds = await scheduleWeekdaysNotifications();
    }

    if (notificationIds && notificationIds.length > 0) {
      setScheduledNotificationIds(notificationIds);

      // Save reminder data to PersonalizationProvider
      const reminders = [];
      
      if (selectedFrequency === 'Once') {
        const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;
        reminders.push({
          id: `scheduled_${Date.now()}`,
          date: dateString,
          time: selectedTime,
          frequency: 'Once',
          notificationIds: notificationIds,
          createdAt: new Date().toISOString()
        });
      } else if (selectedFrequency === 'Weekdays') {
        selectedWeekdayDates.forEach((dateString, index) => {
          reminders.push({
            id: `scheduled_${Date.now()}_${index}`,
            date: dateString,
            time: selectedTime,
            frequency: 'Weekdays',
            notificationIds: notificationIds,
            createdAt: new Date().toISOString()
          });
        });
      }
      
      // Add all reminders to PersonalizationProvider
      reminders.forEach(reminder => {
        addScheduledDateReminder(reminder);
      });

      // Show success message
      let frequencyText = 'once';
      let dateText = '';

      if (selectedFrequency === 'Once') {
        frequencyText = 'once';
        dateText = `on ${new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`;
      } else if (selectedFrequency === 'Weekdays') {
        if (selectedWeekdayDates.length === 1) {
          const [year, month, day] = selectedWeekdayDates[0].split('-').map(Number);
          const date = new Date(year, month - 1, day);
          frequencyText = `on ${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`;
        } else {
          const dateStrings = selectedWeekdayDates.map(dateString => {
            const [year, month, day] = dateString.split('-').map(Number);
            const date = new Date(year, month - 1, day);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          });

          if (dateStrings.length <= 3) {
            frequencyText = `on ${dateStrings.slice(0, -1).join(', ')} and ${dateStrings.slice(-1)}`;
          } else {
            frequencyText = `on ${selectedWeekdayDates.length} selected dates`;
          }
        }
      }
      
      console.log('Saved scheduled date reminders:', reminders);

      Alert.alert(
        'Reminder Set! 🔔',
        `You'll receive notifications to nap ${frequencyText} at ${selectedTime} ${dateText}.`,
        [
          { text: 'Great!', style: 'default' },
          {
            text: 'Test Now',
            onPress: async () => {
              try {
                await Notifications.scheduleNotificationAsync({
                  content: {
                    title: "🧪 Test Notification",
                    body: "This is a test! Your nap reminders will work like this. 😴",
                    sound: true,
                    priority: Notifications.AndroidNotificationPriority.HIGH,
                    categoryIdentifier: 'napScheduleReminder',
                  },
                  trigger: { seconds: 5 },
                });
                Alert.alert('Test Sent!', 'Check your notifications in 5 seconds! 📱');
              } catch (error) {
                console.error('Error sending test notification:', error);
              }
            }
          }
        ]
      );
    }
  };

  const handleHomePress = () => {
    if (navigation) {
      navigation.navigate('Home');
    }
  };

  const handleHistoryPress = () => {
    if (navigation) {
      navigation.navigate('NapHistory');
    }
  };

  const handleFeaturesPress = () => {
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

  const handleBackPress = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
    // Reset selected date to 1st when changing months (for Once mode)
    setSelectedDate(1);

    // If in Weekdays mode, auto-select all weekdays in the new month
    if (selectedFrequency === 'Weekdays') {
      const allWeekdays = getAllFutureWeekdaysInMonth(newDate);
      setSelectedWeekdayDates(allWeekdays);
    }
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
    // Reset selected date to 1st when changing months (for Once mode)
    setSelectedDate(1);

    // If in Weekdays mode, auto-select all weekdays in the new month
    if (selectedFrequency === 'Weekdays') {
      const allWeekdays = getAllFutureWeekdaysInMonth(newDate);
      setSelectedWeekdayDates(allWeekdays);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <BackArrowIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Schedule Nap Reminder</Text>
      </View>

      {/* Calendar Section */}
      <View style={styles.calendarSection}>
        {/* Calendar Header */}
        <View style={styles.calendarHeader}>
          <TouchableOpacity style={styles.navButton} onPress={handlePreviousMonth}>
            <LeftArrowIcon />
          </TouchableOpacity>
          <Text style={styles.monthYear}>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</Text>
          <TouchableOpacity style={styles.navButton} onPress={handleNextMonth}>
            <RightArrowIcon />
          </TouchableOpacity>
        </View>

        {/* Helper Text */}
        <Text style={styles.helperText}>
          {(() => {
            const today = new Date();
            const isCurrentMonth = currentDate.getMonth() === today.getMonth() &&
                                  currentDate.getFullYear() === today.getFullYear();
            const isPastMonth = currentDate < new Date(today.getFullYear(), today.getMonth(), 1);

            if (isPastMonth) {
              return "This month is in the past";
            } else if (isCurrentMonth) {
              return "Pick today or any future day";
            } else {
              return "Pick any day";
            }
          })()}
        </Text>

        {/* Day Headers */}
        <View style={styles.dayHeaders}>
          {dayNames.map((day, index) => (
            <Text key={index} style={styles.dayHeader}>{day}</Text>
          ))}
        </View>

        {/* Calendar Grid */}
        <View style={styles.calendarGrid}>
          {days.map((dayObj, index) => {
            const today = new Date();
            const cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayObj.day);
            const isPastDate = dayObj.isCurrentMonth && cellDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const isWeekdayDate = isWeekday(dayObj);
            const isIndividualDateSelected = isDateSelected(dayObj);

            // Different highlighting based on frequency mode
            const shouldHighlightWeekday = selectedFrequency === 'Weekdays' && isWeekdayDate && !isPastDate && !isIndividualDateSelected;
            const shouldSelectWeekday = selectedFrequency === 'Weekdays' && isIndividualDateSelected && !isPastDate;
            const shouldSelectOnce = selectedFrequency === 'Once' && dayObj.day === selectedDate && dayObj.isCurrentMonth && !isPastDate;

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dayCell,
                  !dayObj.isCurrentMonth && styles.dayInactive,
                  isPastDate && styles.dayPast,
                  shouldSelectOnce && styles.daySelected,
                  shouldHighlightWeekday && styles.dayWeekdayHighlight,
                  shouldSelectWeekday && styles.dayWeekdaySelected
                ]}
                onPress={() => handleDatePress(dayObj)}
                disabled={!dayObj.isCurrentMonth || isPastDate || (selectedFrequency === 'Weekdays' && !isWeekdayDate)}
              >
                <Text style={[
                  styles.dayText,
                  !dayObj.isCurrentMonth && styles.dayTextInactive,
                  isPastDate && styles.dayTextPast,
                  shouldSelectOnce && styles.dayTextSelected,
                  shouldHighlightWeekday && styles.dayTextWeekdayHighlight,
                  shouldSelectWeekday && styles.dayTextWeekdaySelected
                ]}>
                  {dayObj.day}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Time Picker Section */}
      <View style={styles.timeSection}>
        <TouchableOpacity style={styles.timePicker} onPress={handleTimePress}>
          <Text style={styles.timeText}>{selectedTime}</Text>
          <EditIcon />
        </TouchableOpacity>
      </View>

      {/* Frequency Selection */}
      <View style={styles.frequencySection}>
        <TouchableOpacity
          style={[
            styles.frequencyChip,
            selectedFrequency === 'Once' && styles.frequencyChipSelected
          ]}
          onPress={() => handleFrequencyPress('Once')}
        >
          <Text style={[
            styles.frequencyText,
            selectedFrequency === 'Once' && styles.frequencyTextSelected
          ]}>
            Once
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.frequencyChip,
            selectedFrequency === 'Weekdays' && styles.frequencyChipSelected
          ]}
          onPress={() => handleFrequencyPress('Weekdays')}
        >
          <Text style={[
            styles.frequencyText,
            selectedFrequency === 'Weekdays' && styles.frequencyTextSelected
          ]}>
            Weekdays
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.frequencyChip,
            selectedFrequency === 'Custom' && styles.frequencyChipSelected
          ]}
          onPress={() => handleFrequencyPress('Custom')}
        >
          <Text style={[
            styles.frequencyText,
            selectedFrequency === 'Custom' && styles.frequencyTextSelected
          ]}>
            Custom
          </Text>
        </TouchableOpacity>
      </View>

      {/* Info Text */}
      <Text style={styles.infoText}>
        {selectedFrequency === 'Weekdays'
          ? 'All weekdays are selected by default. Tap any date to deselect it from your reminders.'
          : 'Once sends one reminder. Weekdays auto-selects all weekdays. Custom opens advanced settings.'
        }
      </Text>

      {/* Continue Button */}
      <View style={styles.continueSection}>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
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

      {/* Time Picker Modal */}
      <TimePickerModal
        visible={timePickerVisible}
        onClose={() => setTimePickerVisible(false)}
        onConfirm={handleTimeConfirm}
        title="Select Nap Time"
        initialHour={2}
        initialMinute={30}
        initialPeriod="PM"
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
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28,
    flex: 1,
  },
  calendarSection: {
    marginHorizontal: 16,
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  navButton: {
    padding: 3,
  },
  monthYear: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  helperText: {
    color: '#1E2A38',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    opacity: 0.6,
    marginBottom: 16,
  },
  dayHeaders: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  dayHeader: {
    width: '14.28%', // Same as dayCell to ensure alignment
    color: '#1E2A38',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  dayCell: {
    width: '14.28%', // 100% / 7 days = 14.28%
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  daySelected: {
    backgroundColor: '#B7AFC5',
  },
  dayInactive: {
    opacity: 0.4,
  },
  dayPast: {
    opacity: 0.3,
  },
  dayText: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  dayTextSelected: {
    color: '#FDFDFD',
  },
  dayTextInactive: {
    color: '#1E2A38',
  },
  dayTextPast: {
    color: '#1E2A38',
    opacity: 0.5,
  },
  dayWeekdayHighlight: {
    backgroundColor: 'rgba(183, 175, 197, 0.3)', // Light purple with transparency (unselected weekdays)
    borderWidth: 1,
    borderColor: '#B7AFC5',
  },
  dayTextWeekdayHighlight: {
    color: '#1E2A38',
    fontWeight: '500',
  },
  dayWeekdaySelected: {
    backgroundColor: '#B7AFC5', // Solid purple for selected weekdays
    borderWidth: 2,
    borderColor: '#9A8FA7',
  },
  dayTextWeekdaySelected: {
    color: '#FDFDFD',
    fontWeight: '700',
  },
  timeSection: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  timePicker: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#1E2A38',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    minWidth: 140,
    maxWidth: 180,
  },
  timeText: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    marginRight: 12,
  },
  frequencySection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
    gap: 12,
  },
  frequencyChip: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#1E2A38',
    paddingVertical: 8,
    paddingHorizontal: 20,
    minWidth: 90,
    alignItems: 'center',
  },
  frequencyChipSelected: {
    backgroundColor: '#B7AFC5',
    borderColor: '#B7AFC5',
  },
  frequencyText: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  frequencyTextSelected: {
    color: '#FDFDFD',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  infoText: {
    color: '#FDFDFD',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    marginHorizontal: 17,
    marginBottom: 12,
  },
  continueSection: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  continueButton: {
    backgroundColor: '#B7AFC5',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  continueText: {
    color: '#FDFDFD',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1E2A38',
    borderTopWidth: 1,
    borderTopColor: 'rgba(229, 232, 236, 0.20)',
    paddingVertical: 12,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    gap: 2,
  },
  navText: {
    color: 'rgba(253, 253, 253, 0.60)',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
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
});
