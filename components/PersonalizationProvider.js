import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const userPersonalization = require('../utils/userPersonalization');

// Create context for personalization data
const PersonalizationContext = createContext();

// Provider component
export const PersonalizationProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(userPersonalization.getUserProfile());
  const [readinessScore, setReadinessScore] = useState(0);
  
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState(''); // For demo purposes - in real app would be handled securely

  // App preferences state
  const [napRemindersEnabled, setNapRemindersEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  // Notifications state
  const [activeNotifications, setActiveNotifications] = useState({
    customWeekdayReminders: [],
    tomorrowReminder: null,
    scheduledDateReminders: [],
    dailyPlannerReminder: null,
  });

  // Load authentication state on mount
  useEffect(() => {
    loadAuthState();
  }, []);

  const loadAuthState = async () => {
    try {
      const authData = await AsyncStorage.getItem('nappin_auth_state');
      if (authData) {
        const { isLoggedIn: loggedIn, email, name, password } = JSON.parse(authData);
        setIsLoggedIn(loggedIn || false);
        setUserEmail(email || '');
        setUserName(name || '');
        setUserPassword(password || ''); // For demo - real apps use secure storage
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
    }
  };

  const saveAuthState = async (authData) => {
    try {
      await AsyncStorage.setItem('nappin_auth_state', JSON.stringify(authData));
    } catch (error) {
      console.error('Error saving auth state:', error);
    }
  };

  // Update user profile and recalculate readiness
  const updateUserProfile = (updates) => {
    // Apply updates to the personalization manager
    Object.keys(updates).forEach(key => {
      if (userPersonalization[`set${key.charAt(0).toUpperCase() + key.slice(1)}`]) {
        userPersonalization[`set${key.charAt(0).toUpperCase() + key.slice(1)}`](updates[key]);
      }
    });

    // Get updated profile and readiness
    const newProfile = userPersonalization.getUserProfile();
    const newReadiness = userPersonalization.getReadinessScore();
    
    setUserProfile(newProfile);
    setReadinessScore(newReadiness);
  };

  // Set specific personalization data
  const setGoals = (goals) => {
    userPersonalization.setGoals(goals);
    updateState();
  };

  const setWellnessFocus = (focus) => {
    userPersonalization.setWellnessFocus(focus);
    updateState();
  };

  const setNapEnvironment = (environment) => {
    userPersonalization.setNapEnvironment(environment);
    updateState();
  };

  const setNapTiming = (timing) => {
    userPersonalization.setNapTiming(timing);
    updateState();
  };

  const setDailySchedule = (schedule) => {
    userPersonalization.setDailySchedule(schedule);
    updateState();
  };

  const setPreferredDevice = (device) => {
    userPersonalization.setPreferredDevice(device);
    updateState();
  };

  const setSleepDuration = (duration) => {
    userPersonalization.setSleepDuration(duration);
    updateState();
  };

  const setBedtime = (time) => {
    userPersonalization.setBedtime(time);
    updateState();
  };

  const setWakeTime = (time) => {
    userPersonalization.setWakeTime(time);
    updateState();
  };

  const setWorkSchedule = (schedule) => {
    userPersonalization.setWorkSchedule(schedule);
    updateState();
  };

  const setActivityLevel = (level) => {
    userPersonalization.setActivityLevel(level);
    updateState();
  };

  const setStressLevel = (level) => {
    userPersonalization.setStressLevel(level);
    updateState();
  };

  // Authentication functions
  const login = async (email, name = '', password = '') => {
    const authData = {
      isLoggedIn: true,
      email: email,
      name: name || email.split('@')[0], // Use part before @ as default name
      password: password, // For demo - real apps would hash this
    };
    
    setIsLoggedIn(true);
    setUserEmail(email);
    setUserName(name || email.split('@')[0]);
    setUserPassword(password);
    await saveAuthState(authData);
  };

  const logout = async () => {
    const authData = {
      isLoggedIn: false,
      email: '',
      name: '',
      password: '',
    };
    
    setIsLoggedIn(false);
    setUserEmail('');
    setUserName('');
    setUserPassword('');
    await saveAuthState(authData);
  };

  const updateUserInfo = async (email, name) => {
    const authData = {
      isLoggedIn: isLoggedIn,
      email: email || userEmail,
      name: name,
      password: userPassword,
    };
    
    setUserEmail(email || userEmail);
    setUserName(name);
    await saveAuthState(authData);
  };

  const updateUserName = async (name) => {
    const authData = {
      isLoggedIn: isLoggedIn,
      email: userEmail,
      name: name,
      password: userPassword,
    };
    
    setUserName(name);
    await saveAuthState(authData);
  };

  const changePassword = async (oldPassword, newPassword) => {
    // Verify old password
    if (oldPassword !== userPassword) {
      throw new Error('Current password is incorrect');
    }
    
    // Update password
    const authData = {
      isLoggedIn: isLoggedIn,
      email: userEmail,
      name: userName,
      password: newPassword,
    };
    
    setUserPassword(newPassword);
    await saveAuthState(authData);
  };

  // Advanced sleep data functions
  const getAdvancedSleepData = () => {
    const profile = userPersonalization.getUserProfile();
    return {
      sleepLatencyLow: profile.sleepLatencyLow,
      sleepLatencyHigh: profile.sleepLatencyHigh,
      sleepLatencyValue: profile.sleepLatencyValue,
      restingHeartRate: profile.restingHeartRate,
      bedtime: profile.bedtime,
      wakeTime: profile.wakeTime,
      sleeperType: profile.sleeperType,
      difficultyFallingAsleep: profile.difficultyFallingAsleep,
      sleepDuration: profile.sleepDuration,
      stressLevel: profile.stressLevel,
      activityLevel: profile.activityLevel,
    };
  };

  const updateAdvancedSleepData = async (data) => {
    try {
      // Update all the advanced sleep data using the userPersonalization methods
      if (data.sleepTimeLow !== undefined && data.sleepTimeHigh !== undefined && data.sleepTimeValue !== undefined) {
        userPersonalization.setSleepLatency(data.sleepTimeLow, data.sleepTimeHigh, data.sleepTimeValue);
      }
      
      if (data.heartRate !== undefined) {
        userPersonalization.setRestingHeartRate(data.heartRate);
      }
      
      if (data.bedtime !== undefined) {
        userPersonalization.setBedtime(data.bedtime);
      }
      
      if (data.wakeTime !== undefined) {
        userPersonalization.setWakeTime(data.wakeTime);
      }
      
      if (data.sleeperType !== undefined) {
        userPersonalization.setSleeperType(data.sleeperType);
        
        // Map sleeperType to stress/activity levels like the original setup screen
        let stressLevel = 'medium';
        let activityLevel = 'moderate';
        
        if (data.sleeperType === 'Light sleeper' || data.sleeperType === 'Light') {
          stressLevel = 'high';
          activityLevel = 'low';
        } else if (data.sleeperType === 'Heavy sleeper' || data.sleeperType === 'Heavy') {
          stressLevel = 'low';
          activityLevel = 'high';
        }
        
        userPersonalization.setStressLevel(stressLevel);
        userPersonalization.setActivityLevel(activityLevel);
      }
      
      if (data.difficulty !== undefined) {
        userPersonalization.setDifficultyFallingAsleep(data.difficulty);
      }
      
      if (data.sleepDuration !== undefined) {
        userPersonalization.setSleepDuration(data.sleepDuration);
      }
      
      // Update the state to reflect changes
      updateState();
      
      console.log('Advanced sleep data updated successfully');
    } catch (error) {
      console.error('Error updating advanced sleep data:', error);
      throw error;
    }
  };

  // Notification management functions
  const addCustomWeekdayReminder = (reminder) => {
    setActiveNotifications(prev => ({
      ...prev,
      customWeekdayReminders: [...prev.customWeekdayReminders, reminder]
    }));
  };

  const removeCustomWeekdayReminder = (id) => {
    setActiveNotifications(prev => ({
      ...prev,
      customWeekdayReminders: prev.customWeekdayReminders.filter(r => r.id !== id)
    }));
  };

  const setTomorrowReminder = (reminder) => {
    setActiveNotifications(prev => ({
      ...prev,
      tomorrowReminder: reminder
    }));
  };

  const clearTomorrowReminder = () => {
    setActiveNotifications(prev => ({
      ...prev,
      tomorrowReminder: null
    }));
  };

  const addScheduledDateReminder = (reminder) => {
    setActiveNotifications(prev => ({
      ...prev,
      scheduledDateReminders: [...prev.scheduledDateReminders, reminder]
    }));
  };

  const removeScheduledDateReminder = (id) => {
    setActiveNotifications(prev => ({
      ...prev,
      scheduledDateReminders: prev.scheduledDateReminders.filter(r => r.id !== id)
    }));
  };

  const setDailyPlannerReminder = (reminder) => {
    setActiveNotifications(prev => ({
      ...prev,
      dailyPlannerReminder: reminder
    }));
  };

  const clearDailyPlannerReminder = () => {
    setActiveNotifications(prev => ({
      ...prev,
      dailyPlannerReminder: null
    }));
  };

  const clearAllNotifications = () => {
    setActiveNotifications({
      customWeekdayReminders: [],
      tomorrowReminder: null,
      scheduledDateReminders: [],
      dailyPlannerReminder: null,
    });
  };

  const updateState = () => {
    const newProfile = userPersonalization.getUserProfile();
    const newReadiness = userPersonalization.getReadinessScore();
    setUserProfile(newProfile);
    setReadinessScore(newReadiness);
  };

  // Recalculate readiness (for time-based updates)
  const recalculateReadiness = () => {
    const newReadiness = userPersonalization.recalculateReadiness();
    setReadinessScore(newReadiness);
    return newReadiness;
  };

  const value = {
    userProfile,
    readinessScore,
    setGoals,
    setWellnessFocus,
    setNapEnvironment,
    setNapTiming,
    setDailySchedule,
    setPreferredDevice,
    setSleepDuration,
    setBedtime,
    setWakeTime,
    setWorkSchedule,
    setActivityLevel,
    setStressLevel,
    updateUserProfile,
    recalculateReadiness,
    // Authentication state and functions
    isLoggedIn,
    userEmail,
    userName,
    login,
    logout,
    updateUserInfo,
    updateUserName,
    changePassword,
    // Advanced sleep data functions
    getAdvancedSleepData,
    updateAdvancedSleepData,
    // App preferences
    napRemindersEnabled,
    setNapRemindersEnabled,
    vibrationEnabled,
    setVibrationEnabled,
    // Notification management functions
    activeNotifications,
    addCustomWeekdayReminder,
    removeCustomWeekdayReminder,
    setTomorrowReminder,
    clearTomorrowReminder,
    addScheduledDateReminder,
    removeScheduledDateReminder,
    setDailyPlannerReminder,
    clearDailyPlannerReminder,
    clearAllNotifications,
  };

  return (
    <PersonalizationContext.Provider value={value}>
      {children}
    </PersonalizationContext.Provider>
  );
};

// Hook to use personalization context
export const usePersonalization = () => {
  const context = useContext(PersonalizationContext);
  if (!context) {
    throw new Error('usePersonalization must be used within a PersonalizationProvider');
  }
  return context;
};

export default PersonalizationContext;