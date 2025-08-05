import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import { Svg, Path, G, Defs, ClipPath } from 'react-native-svg';
import { usePersonalization } from '../components/PersonalizationProvider';

// Back arrow icon for header
const BackArrowIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M0.439453 10.9441C-0.146484 11.5301 -0.146484 12.4816 0.439453 13.0676L7.93945 20.5676C8.52539 21.1535 9.47695 21.1535 10.0629 20.5676C10.6488 19.9816 10.6488 19.0301 10.0629 18.4441L5.11758 13.5035H19.4988C20.3285 13.5035 20.9988 12.8332 20.9988 12.0035C20.9988 11.1738 20.3285 10.5035 19.4988 10.5035H5.12227L10.0582 5.56289C10.6441 4.97695 10.6441 4.02539 10.0582 3.43945C9.47227 2.85352 8.5207 2.85352 7.93477 3.43945L0.434766 10.9395L0.439453 10.9441Z"
      fill="#FDFDFD"
    />
  </Svg>
);

// Notification bell icon
const NotificationBellIcon = () => (
  <Svg width={16} height={18} viewBox="0 0 16 18" fill="none">
    <G clipPath="url(#clip0_299_1342)">
      <Path
        d="M8 0C7.37773 0 6.875 0.502734 6.875 1.125V1.7543C4.32617 2.15859 2.375 4.36641 2.375 7.03125V8.20547C2.375 9.80156 1.83008 11.352 0.835156 12.5965L0.311328 13.2539C0.107422 13.507 0.0687497 13.8551 0.209375 14.1469C0.35 14.4387 0.645312 14.625 0.96875 14.625H15.0312C15.3547 14.625 15.65 14.4387 15.7906 14.1469C15.9312 13.8551 15.8926 13.507 15.6887 13.2539L15.1648 12.6C14.1699 11.352 13.625 9.80156 13.625 8.20547V7.03125C13.625 4.36641 11.6738 2.15859 9.125 1.7543V1.125C9.125 0.502734 8.62227 0 8 0ZM8 3.375H8.28125C10.2992 3.375 11.9375 5.01328 11.9375 7.03125V8.20547C11.9375 9.88945 12.4262 11.5312 13.3332 12.9375H2.6668C3.57383 11.5312 4.0625 9.88945 4.0625 8.20547V7.03125C4.0625 5.01328 5.70078 3.375 7.71875 3.375H8ZM10.25 15.75H8H5.75C5.75 16.3477 5.98555 16.9207 6.40742 17.3426C6.8293 17.7645 7.40234 18 8 18C8.59766 18 9.1707 17.7645 9.59258 17.3426C10.0145 16.9207 10.25 16.3477 10.25 15.75Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_299_1342">
        <Path d="M0.125 0H15.875V18H0.125V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Calendar icon for scheduled reminders
const CalendarIcon = () => (
  <Svg width={16} height={18} viewBox="0 0 16 18" fill="none">
    <Path
      d="M2 8H14M5 1V3M11 1V3M4.8 17H11.2C12.8802 17 13.7202 17 14.362 16.673C14.9265 16.3854 15.3854 15.9265 15.673 15.362C16 14.7202 16 13.8802 16 12.2V5.8C16 4.11984 16 3.27976 15.673 2.63803C15.3854 2.07354 14.9265 1.6146 14.362 1.32698C13.7202 1 12.8802 1 11.2 1H4.8C3.11984 1 2.27976 1 1.63803 1.32698C1.07354 1.6146 0.614601 2.07354 0.326983 2.63803C0 3.27976 0 4.11984 0 5.8V12.2C0 13.8802 0 14.7202 0.326983 15.362C0.614601 15.9265 1.07354 16.3854 1.63803 16.673C2.27976 17 3.11984 17 4.8 17Z"
      stroke="#1E2A38"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Clock icon for time-based reminders
const ClockIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path
      d="M9 1C13.4183 1 17 4.58172 17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1ZM9 5V9L12 12"
      stroke="#1E2A38"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Repeat icon for recurring reminders
const RepeatIcon = () => (
  <Svg width={18} height={14} viewBox="0 0 18 14" fill="none">
    <Path
      d="M13 1L17 5L13 9M1 5H17M5 13L1 9L5 5M17 9H1"
      stroke="#1E2A38"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Custom toggle switch component (improved visibility)
const ToggleSwitch = ({ isEnabled, onToggle }) => {
  return (
    <TouchableOpacity
      style={[
        styles.toggleContainer,
        { backgroundColor: isEnabled ? '#B7AFC5' : '#6B7280' }
      ]}
      onPress={onToggle}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.toggleCircle,
          {
            transform: [{ translateX: isEnabled ? 14 : 0 }],
            backgroundColor: isEnabled ? '#FDFDFD' : '#E5E8EC'
          }
        ]}
      />
    </TouchableOpacity>
  );
};

// Notification status card component
const NotificationStatusCard = ({ icon, title, subtitle, status, onPress = null }) => {
  const isClickable = status === 'active' && onPress;
  
  return (
    <TouchableOpacity 
      style={[styles.statusCard, isClickable && styles.clickableCard]} 
      onPress={onPress} 
      disabled={!isClickable}
      activeOpacity={isClickable ? 0.7 : 1}
    >
      <View style={styles.cardContent}>
        <View style={styles.iconContainer}>
          {icon}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubtitle}>{subtitle}</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={[styles.statusText, status === 'active' ? styles.activeStatus : styles.inactiveStatus]}>
            {status === 'active' ? 'Active' : 'None'}
          </Text>
          {isClickable && (
            <Text style={styles.tapText}>Tap to view</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Notification details modal component
const NotificationDetailsModal = ({ visible, onClose, type, data }) => {
  const renderContent = () => {
    switch (type) {
      case 'weekly':
        if (!data || data.length === 0) return null;
        return (
          <View>
            <Text style={styles.modalTitle}>Weekly Reminders</Text>
            {data.map((reminder, index) => (
              <View key={reminder.id || index} style={styles.reminderItem}>
                <Text style={styles.reminderTime}>{reminder.time}</Text>
                <Text style={styles.reminderDays}>
                  {reminder.days?.join(', ') || 'No days specified'}
                </Text>
                <Text style={styles.reminderDuration}>
                  Duration: {reminder.duration || 'Not specified'}
                </Text>
              </View>
            ))}
          </View>
        );
      
      case 'tomorrow':
        if (!data) return null;
        return (
          <View>
            <Text style={styles.modalTitle}>Tomorrow Reminder</Text>
            <View style={styles.reminderItem}>
              <Text style={styles.reminderTime}>{data.time}</Text>
              <Text style={styles.reminderDays}>Tomorrow</Text>
              <Text style={styles.reminderDuration}>
                Duration: {data.duration || 'Not specified'}
              </Text>
            </View>
          </View>
        );
      
      case 'scheduled':
        const { scheduledReminders, dailyPlanner } = data || {};
        const allReminders = [...(scheduledReminders || [])];
        if (dailyPlanner) {
          allReminders.push({
            ...dailyPlanner,
            date: 'Daily',
            type: 'Daily Planner'
          });
        }
        
        if (allReminders.length === 0) return null;
        
        return (
          <View>
            <Text style={styles.modalTitle}>Scheduled Reminders</Text>
            {allReminders.map((reminder, index) => (
              <View key={reminder.id || index} style={styles.reminderItem}>
                <Text style={styles.reminderTime}>{reminder.time}</Text>
                <Text style={styles.reminderDays}>
                  {reminder.type === 'Daily Planner' ? 'Daily Planner' : 
                   reminder.date ? new Date(reminder.date).toLocaleDateString() : 'Date not specified'}
                </Text>
                {reminder.duration && (
                  <Text style={styles.reminderDuration}>
                    Duration: {reminder.duration}
                  </Text>
                )}
              </View>
            ))}
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            {renderContent()}
            
            <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default function NotificationsScreen({ navigation }) {
  const { 
    activeNotifications, 
    napRemindersEnabled, 
    setNapRemindersEnabled 
  } = usePersonalization();
  
  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalData, setModalData] = useState(null);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleToggleNapReminders = () => {
    if (napRemindersEnabled) {
      // User is turning OFF notifications - show confirmation
      Alert.alert(
        'Turn Off Nap Reminders',
        'Are you sure you want to turn off all nap reminders? This will disable all your active notifications.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Turn Off',
            style: 'destructive',
            onPress: () => {
              setNapRemindersEnabled(false);
              console.log('Nap reminders turned off by user');
            },
          },
        ],
        { cancelable: true }
      );
    } else {
      // User is turning ON notifications - no confirmation needed
      setNapRemindersEnabled(true);
      console.log('Nap reminders turned on by user');
    }
  };

  // Modal handler functions
  const openWeeklyRemindersModal = () => {
    if (napRemindersEnabled && activeNotifications.customWeekdayReminders.length > 0) {
      setModalType('weekly');
      setModalData(activeNotifications.customWeekdayReminders);
      setModalVisible(true);
    }
  };

  const openTomorrowReminderModal = () => {
    if (napRemindersEnabled && activeNotifications.tomorrowReminder) {
      setModalType('tomorrow');
      setModalData(activeNotifications.tomorrowReminder);
      setModalVisible(true);
    }
  };

  const openScheduledRemindersModal = () => {
    if (napRemindersEnabled && (activeNotifications.scheduledDateReminders.length > 0 || activeNotifications.dailyPlannerReminder)) {
      setModalType('scheduled');
      setModalData({
        scheduledReminders: activeNotifications.scheduledDateReminders,
        dailyPlanner: activeNotifications.dailyPlannerReminder
      });
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalType(null);
    setModalData(null);
  };

  // Helper functions to determine notification status
  const getWeekdayRemindersStatus = () => {
    // If nap reminders are disabled, show as inactive
    if (!napRemindersEnabled) {
      return { status: 'none', subtitle: 'Reminders turned off' };
    }
    
    const weekdayReminders = activeNotifications.customWeekdayReminders;
    if (weekdayReminders.length === 0) return { status: 'none', subtitle: 'No weekly reminders set' };
    
    const activeDays = weekdayReminders.flatMap(reminder => reminder.days || []);
    const uniqueDays = [...new Set(activeDays)];
    return { 
      status: 'active', 
      subtitle: `${uniqueDays.length} day${uniqueDays.length === 1 ? '' : 's'} scheduled` 
    };
  };

  const getTomorrowReminderStatus = () => {
    // If nap reminders are disabled, show as inactive
    if (!napRemindersEnabled) {
      return { status: 'none', subtitle: 'Reminders turned off' };
    }
    
    if (!activeNotifications.tomorrowReminder) return { status: 'none', subtitle: 'No reminder for tomorrow' };
    
    return { 
      status: 'active', 
      subtitle: `Set for ${activeNotifications.tomorrowReminder.time}` 
    };
  };

  const getScheduledRemindersStatus = () => {
    // If nap reminders are disabled, show as inactive
    if (!napRemindersEnabled) {
      return { status: 'none', subtitle: 'Reminders turned off' };
    }
    
    const scheduledReminders = activeNotifications.scheduledDateReminders;
    const dailyPlanner = activeNotifications.dailyPlannerReminder;
    
    let totalReminders = scheduledReminders.length;
    if (dailyPlanner) totalReminders += 1;
    
    if (totalReminders === 0) return { status: 'none', subtitle: 'No scheduled reminders' };
    
    return { 
      status: 'active', 
      subtitle: `${totalReminders} reminder${totalReminders === 1 ? '' : 's'} scheduled` 
    };
  };

  const weekdayStatus = getWeekdayRemindersStatus();
  const tomorrowStatus = getTomorrowReminderStatus();
  const scheduledStatus = getScheduledRemindersStatus();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <BackArrowIcon />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Notifications</Text>
          </View>
        </View>

        {/* Main Notification Settings Card */}
        <View style={styles.notificationCard}>
          <View style={styles.cardContent}>
            <View style={styles.iconContainer}>
              <NotificationBellIcon />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>Nap Reminders</Text>
              <Text style={styles.cardSubtitle}>
                {napRemindersEnabled ? 'Notifications enabled' : 'All notifications disabled'}
              </Text>
            </View>
            <ToggleSwitch
              isEnabled={napRemindersEnabled}
              onToggle={handleToggleNapReminders}
            />
          </View>
        </View>

        {/* Active Notifications Status */}
        <View style={styles.statusSection}>
          <Text style={styles.sectionTitle}>Active Notifications</Text>
          
          <NotificationStatusCard
            icon={<RepeatIcon />}
            title="Weekly Reminders"
            subtitle={weekdayStatus.subtitle}
            status={weekdayStatus.status}
            onPress={openWeeklyRemindersModal}
          />
          
          <NotificationStatusCard
            icon={<ClockIcon />}
            title="Tomorrow Reminder"
            subtitle={tomorrowStatus.subtitle}
            status={tomorrowStatus.status}
            onPress={openTomorrowReminderModal}
          />
          
          <NotificationStatusCard
            icon={<CalendarIcon />}
            title="Scheduled Reminders"
            subtitle={scheduledStatus.subtitle}
            status={scheduledStatus.status}
            onPress={openScheduledRemindersModal}
          />
        </View>
      </ScrollView>
      
      {/* Notification Details Modal */}
      <NotificationDetailsModal
        visible={modalVisible}
        onClose={closeModal}
        type={modalType}
        data={modalData}
      />
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
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    marginTop: 48,
    marginBottom: 12,
  },
  backButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6.375,
    paddingVertical: 3,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -24, // Offset back button width for true centering
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28,
    color: '#FDFDFD',
    fontFamily: 'Inter',
    textAlign: 'center',
  },
  notificationCard: {
    width: 358,
    minHeight: 64,
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
    alignSelf: 'center',
    marginTop: 24,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4.125,
    paddingVertical: 3,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: '#1E2A38',
    fontFamily: 'Inter',
  },
  toggleContainer: {
    width: 32,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  statusSection: {
    marginTop: 32,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FDFDFD',
    fontFamily: 'Inter',
    marginBottom: 16,
    textAlign: 'left',
  },
  statusCard: {
    width: 358,
    minHeight: 64,
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    alignSelf: 'center',
    marginBottom: 12,
  },
  statusContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  activeStatus: {
    color: '#4CAF50',
  },
  inactiveStatus: {
    color: '#999',
  },
  cardSubtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#666',
    fontFamily: 'Inter',
    marginTop: 2,
  },
  clickableCard: {
    opacity: 1,
  },
  tapText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#B7AFC5',
    fontFamily: 'Inter',
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: '#FDFDFD',
    borderRadius: 16,
    width: '100%',
    maxWidth: 350,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  modalContent: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E2A38',
    fontFamily: 'Inter',
    marginBottom: 20,
    textAlign: 'center',
  },
  reminderItem: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#B7AFC5',
  },
  reminderTime: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E2A38',
    fontFamily: 'Inter',
    marginBottom: 4,
  },
  reminderDays: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    fontFamily: 'Inter',
    marginBottom: 4,
  },
  reminderDuration: {
    fontSize: 12,
    fontWeight: '400',
    color: '#999',
    fontFamily: 'Inter',
  },
  modalCloseButton: {
    backgroundColor: '#B7AFC5',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 20,
  },
  modalCloseText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FDFDFD',
    fontFamily: 'Inter',
  },
});
