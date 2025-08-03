import React, { createContext, useContext, useState, useEffect } from 'react';
const userPersonalization = require('../utils/userPersonalization');

// Create context for personalization data
const PersonalizationContext = createContext();

// Provider component
export const PersonalizationProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(userPersonalization.getUserProfile());
  const [readinessScore, setReadinessScore] = useState(0);

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