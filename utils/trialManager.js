import AsyncStorage from '@react-native-async-storage/async-storage';
import notificationManager from './notificationManager';

class TrialManager {
  constructor() {
    this.STORAGE_KEYS = {
      TRIAL_INFO: 'userTrialInfo',
      SUBSCRIPTION_TYPE: 'subscriptionType',
      TRIAL_START_DATE: 'trialStartDate',
      TRIAL_END_DATE: 'trialEndDate',
      TRIAL_ACTIVE: 'isTrialActive',
    };

    // Different subscription types and their trial durations
    this.SUBSCRIPTION_TYPES = {
      ADVANCED: {
        name: 'Advanced',
        trialDays: 7,
        price: '$24.99',
        billing: 'per year',
      },
      PRECISION: {
        name: 'Precision',
        trialDays: 7,
        price: '$29.99',
        billing: 'per year',
      },
    };
  }

  /**
   * Start a free trial for the user
   * @param {string} subscriptionType - 'ADVANCED' or 'PRECISION'
   * @returns {Promise<Object>} Trial information
   */
  async startTrial(subscriptionType = 'ADVANCED') {
    try {
      const now = new Date();
      const subscription = this.SUBSCRIPTION_TYPES[subscriptionType];
      
      if (!subscription) {
        throw new Error(`Invalid subscription type: ${subscriptionType}`);
      }

      const trialEndDate = new Date(now);
      trialEndDate.setDate(trialEndDate.getDate() + subscription.trialDays);

      const trialInfo = {
        subscriptionType,
        subscriptionName: subscription.name,
        trialStartDate: now.toISOString(),
        trialEndDate: trialEndDate.toISOString(),
        trialDays: subscription.trialDays,
        price: subscription.price,
        billing: subscription.billing,
        isActive: true,
        startedAt: now.toISOString(),
      };

      // Store trial information
      await AsyncStorage.setItem(this.STORAGE_KEYS.TRIAL_INFO, JSON.stringify(trialInfo));
      await AsyncStorage.setItem(this.STORAGE_KEYS.SUBSCRIPTION_TYPE, subscriptionType);
      await AsyncStorage.setItem(this.STORAGE_KEYS.TRIAL_START_DATE, now.toISOString());
      await AsyncStorage.setItem(this.STORAGE_KEYS.TRIAL_END_DATE, trialEndDate.toISOString());
      await AsyncStorage.setItem(this.STORAGE_KEYS.TRIAL_ACTIVE, 'true');

      console.log(`Started ${subscription.name} trial until ${trialEndDate.toLocaleDateString()}`);

      // Schedule trial ending reminder notification
      await notificationManager.scheduleTrialEndingReminder(
        subscription.name,
        trialEndDate
      );

      return trialInfo;
    } catch (error) {
      console.error('Error starting trial:', error);
      throw error;
    }
  }

  /**
   * Get current trial information
   * @returns {Promise<Object|null>}
   */
  async getTrialInfo() {
    try {
      const trialInfoStr = await AsyncStorage.getItem(this.STORAGE_KEYS.TRIAL_INFO);
      if (!trialInfoStr) {
        return null;
      }

      const trialInfo = JSON.parse(trialInfoStr);
      
      // Check if trial is still active
      const now = new Date();
      const trialEndDate = new Date(trialInfo.trialEndDate);
      
      if (now > trialEndDate) {
        trialInfo.isActive = false;
        trialInfo.hasExpired = true;
        await this.endTrial();
      }

      return trialInfo;
    } catch (error) {
      console.error('Error getting trial info:', error);
      return null;
    }
  }

  /**
   * Check if user has an active trial
   * @returns {Promise<boolean>}
   */
  async hasActiveTrial() {
    try {
      const trialInfo = await this.getTrialInfo();
      return trialInfo && trialInfo.isActive && !trialInfo.hasExpired;
    } catch (error) {
      console.error('Error checking active trial:', error);
      return false;
    }
  }

  /**
   * Get days remaining in trial
   * @returns {Promise<number>} Days remaining (0 if expired)
   */
  async getDaysRemaining() {
    try {
      const trialInfo = await this.getTrialInfo();
      if (!trialInfo || !trialInfo.isActive) {
        return 0;
      }

      const now = new Date();
      const trialEndDate = new Date(trialInfo.trialEndDate);
      const diffTime = trialEndDate - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return Math.max(0, diffDays);
    } catch (error) {
      console.error('Error calculating days remaining:', error);
      return 0;
    }
  }

  /**
   * End the current trial
   */
  async endTrial() {
    try {
      await AsyncStorage.setItem(this.STORAGE_KEYS.TRIAL_ACTIVE, 'false');
      
      // Cancel any pending trial reminder notifications
      await notificationManager.cancelTrialReminder();
      
      console.log('Trial ended');
    } catch (error) {
      console.error('Error ending trial:', error);
    }
  }

  /**
   * Cancel trial and clear all data
   */
  async cancelTrial() {
    try {
      await AsyncStorage.multiRemove([
        this.STORAGE_KEYS.TRIAL_INFO,
        this.STORAGE_KEYS.SUBSCRIPTION_TYPE,
        this.STORAGE_KEYS.TRIAL_START_DATE,
        this.STORAGE_KEYS.TRIAL_END_DATE,
        this.STORAGE_KEYS.TRIAL_ACTIVE,
      ]);

      // Cancel any pending notifications
      await notificationManager.cancelTrialReminder();
      
      console.log('Trial cancelled and data cleared');
    } catch (error) {
      console.error('Error cancelling trial:', error);
    }
  }

  /**
   * Get trial status summary
   * @returns {Promise<Object>}
   */
  async getTrialStatus() {
    try {
      const trialInfo = await this.getTrialInfo();
      const hasActiveTrial = await this.hasActiveTrial();
      const daysRemaining = await this.getDaysRemaining();
      const notificationInfo = await notificationManager.getTrialReminderInfo();

      return {
        hasActiveTrial,
        daysRemaining,
        trialInfo,
        notificationScheduled: !!notificationInfo,
        notificationInfo,
      };
    } catch (error) {
      console.error('Error getting trial status:', error);
      return {
        hasActiveTrial: false,
        daysRemaining: 0,
        trialInfo: null,
        notificationScheduled: false,
        notificationInfo: null,
      };
    }
  }
}

export default new TrialManager();
