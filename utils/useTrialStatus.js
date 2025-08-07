import { useState, useEffect } from 'react';
import trialManager from './trialManager';

/**
 * Custom hook to manage trial status throughout the app
 * @returns {Object} Trial status and management functions
 */
export const useTrialStatus = () => {
  const [trialInfo, setTrialInfo] = useState(null);
  const [hasActiveTrial, setHasActiveTrial] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Load trial status
  const loadTrialStatus = async () => {
    try {
      setIsLoading(true);
      const info = await trialManager.getTrialInfo();
      const active = await trialManager.hasActiveTrial();
      const days = await trialManager.getDaysRemaining();

      setTrialInfo(info);
      setHasActiveTrial(active);
      setDaysRemaining(days);
    } catch (error) {
      console.error('Error loading trial status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Start a new trial
  const startTrial = async (subscriptionType = 'ADVANCED') => {
    try {
      const info = await trialManager.startTrial(subscriptionType);
      await loadTrialStatus(); // Refresh status
      return info;
    } catch (error) {
      console.error('Error starting trial:', error);
      throw error;
    }
  };

  // End the current trial
  const endTrial = async () => {
    try {
      await trialManager.endTrial();
      await loadTrialStatus(); // Refresh status
    } catch (error) {
      console.error('Error ending trial:', error);
      throw error;
    }
  };

  // Cancel the trial completely
  const cancelTrial = async () => {
    try {
      await trialManager.cancelTrial();
      await loadTrialStatus(); // Refresh status
    } catch (error) {
      console.error('Error cancelling trial:', error);
      throw error;
    }
  };

  // Load trial status when hook is used
  useEffect(() => {
    loadTrialStatus();
  }, []);

  // Return trial status and management functions
  return {
    trialInfo,
    hasActiveTrial,
    daysRemaining,
    isLoading,
    startTrial,
    endTrial,
    cancelTrial,
    refreshStatus: loadTrialStatus,
  };
};
