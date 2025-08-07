import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

class NotificationManager {
  constructor() {
    this.isInitialized = false;
  }

  /**
   * Request notification permissions from the user
   * @returns {Promise<boolean>} Whether permission was granted
   */
  async requestPermissions() {
    try {
      if (!Device.isDevice) {
        console.log('Notifications only work on physical devices');
        return false;
      }

      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return false;
      }

      // Configure notification channel for Android
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('trial-reminders', {
          name: 'Trial Reminders',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#B7AFC5',
          sound: true,
        });
      }

      this.isInitialized = true;
      await AsyncStorage.setItem('notificationPermissionGranted', 'true');
      return true;
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
      return false;
    }
  }

  /**
   * Check if notification permissions are granted
   * @returns {Promise<boolean>}
   */
  async hasPermissions() {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error checking notification permissions:', error);
      return false;
    }
  }

  /**
   * Schedule a trial ending reminder notification
   * @param {string} subscriptionType - The type of subscription (e.g., 'advanced', 'precision')
   * @param {Date} trialEndDate - When the trial ends
   * @returns {Promise<string|null>} The notification identifier if successful
   */
  async scheduleTrialEndingReminder(subscriptionType, trialEndDate) {
    try {
      if (!this.isInitialized && !(await this.hasPermissions())) {
        console.log('Notification permissions not granted');
        return null;
      }

      // Calculate reminder date (1 day before trial ends)
      const reminderDate = new Date(trialEndDate);
      reminderDate.setDate(reminderDate.getDate() - 1);
      
      // Don't schedule if reminder date is in the past
      if (reminderDate <= new Date()) {
        console.log('Trial ending too soon, no reminder needed');
        return null;
      }

      // Cancel any existing trial reminder
      await this.cancelTrialReminder();

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: '⏰ Free Trial Ending Soon',
          body: `Your Nappin ${subscriptionType} free trial ends tomorrow. Continue enjoying premium features!`,
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
          categoryIdentifier: 'trial-reminder',
        },
        trigger: {
          date: reminderDate,
        },
      });

      // Store notification info for later reference
      const notificationInfo = {
        id: notificationId,
        subscriptionType,
        trialEndDate: trialEndDate.toISOString(),
        reminderDate: reminderDate.toISOString(),
        scheduledAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem('trialReminderNotification', JSON.stringify(notificationInfo));
      
      console.log(`Trial reminder scheduled for ${reminderDate.toLocaleDateString()} at ${reminderDate.toLocaleTimeString()}`);
      return notificationId;
    } catch (error) {
      console.error('Error scheduling trial reminder:', error);
      return null;
    }
  }

  /**
   * Cancel any existing trial reminder notification
   */
  async cancelTrialReminder() {
    try {
      const notificationInfo = await AsyncStorage.getItem('trialReminderNotification');
      if (notificationInfo) {
        const { id } = JSON.parse(notificationInfo);
        await Notifications.cancelScheduledNotificationAsync(id);
        await AsyncStorage.removeItem('trialReminderNotification');
        console.log('Previous trial reminder cancelled');
      }
    } catch (error) {
      console.error('Error cancelling trial reminder:', error);
    }
  }

  /**
   * Get current trial reminder info
   * @returns {Promise<Object|null>}
   */
  async getTrialReminderInfo() {
    try {
      const notificationInfo = await AsyncStorage.getItem('trialReminderNotification');
      return notificationInfo ? JSON.parse(notificationInfo) : null;
    } catch (error) {
      console.error('Error getting trial reminder info:', error);
      return null;
    }
  }

  /**
   * Send an immediate test notification
   */
  async sendTestNotification() {
    try {
      if (!this.isInitialized && !(await this.hasPermissions())) {
        console.log('Notification permissions not granted');
        return false;
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: '🧪 Test Notification',
          body: 'Your Nappin notifications are working perfectly!',
          sound: true,
        },
        trigger: {
          seconds: 1,
        },
      });

      return true;
    } catch (error) {
      console.error('Error sending test notification:', error);
      return false;
    }
  }

  /**
   * Set up notification categories and actions
   */
  async setupNotificationCategories() {
    try {
      await Notifications.setNotificationCategoryAsync('trial-reminder', [
        {
          identifier: 'open-app',
          buttonTitle: 'Open App',
          options: {
            opensAppToForeground: true,
          },
        },
        {
          identifier: 'remind-later',
          buttonTitle: 'Remind Later',
          options: {
            opensAppToForeground: false,
          },
        },
      ]);
    } catch (error) {
      console.error('Error setting up notification categories:', error);
    }
  }
}

export default new NotificationManager();
