import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Animated,
  AppState,
  Vibration,
} from 'react-native';
import { Svg, Circle, G, Defs, ClipPath, Path } from 'react-native-svg';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';

const userPersonalization = require('../utils/userPersonalization');
import AsyncStorage from '@react-native-async-storage/async-storage';
import audioManager from '../utils/audioManager';
import { usePersonalization } from '../components/PersonalizationProvider';

// Back arrow icon
const BackArrowIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M0.439453 10.9441C-0.146484 11.5301 -0.146484 12.4816 0.439453 13.0676L7.93945 20.5676C8.52539 21.1535 9.47695 21.1535 10.0629 20.5676C10.6488 19.9816 10.6488 19.0301 10.0629 18.4441L5.11758 13.5035H19.4988C20.3285 13.5035 20.9988 12.8332 20.9988 12.0035C20.9988 11.1738 20.3285 10.5035 19.4988 10.5035H5.12227L10.0582 5.56289C10.6441 4.97695 10.6441 4.02539 10.0582 3.43945C9.47227 2.85352 8.5207 2.85352 7.93477 3.43945L0.434766 10.9395L0.439453 10.9441Z"
      fill="#FDFDFD"
    />
  </Svg>
);

export default function NapInProgressScreen({ navigation, route }) {
  // Get nap duration and plan from route params (from FinalizeNapScreen)
  const napDurationFromRoute = route?.params?.selectedTime || '20';
  const userPlan = route?.params?.userPlan || 'advanced'; // Default to advanced
  const ambientSoundFromRoute = route?.params?.ambientSound || 'None';
  const wakeSoundFromRoute = route?.params?.wakeSound || 'Soft Chime';
  const [napDuration] = useState(parseInt(napDurationFromRoute));
  const [selectedAmbientSound] = useState(ambientSoundFromRoute);
  
  // Get vibration preference from PersonalizationProvider
  const { vibrationEnabled } = usePersonalization();

  // App phases: 'analyzing' -> 'ready' -> 'napping' -> 'complete' -> 'alarm'
  const [currentPhase, setCurrentPhase] = useState('analyzing');
  
  // Wake alarm state
  const [isAlarmPlaying, setIsAlarmPlaying] = useState(false);
  const [selectedWakeTone, setSelectedWakeTone] = useState(wakeSoundFromRoute);
  const [napStartTime, setNapStartTime] = useState(null);
  
  // Ambient sound state
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);
  const ambientStopTimeout = useRef(null);
  
  // Vibration state
  const vibrationInterval = useRef(null);
  
  // Background state management
  const [appState, setAppState] = useState(AppState.currentState);
  const backgroundStartTime = useRef(null);
  const napStartTimestamp = useRef(null);
  const lastUpdateTime = useRef(Date.now());
  
  // Wake tone audio paths (same as in SoundsScreen)
  const wakeToneCards = [
    { name: 'Soft Chime', audioPath: require('../assets/audio/wake-tones/windchimes.wav') },
    { name: 'Calm Bell', audioPath: require('../assets/audio/wake-tones/calmbell.wav') },
    { name: 'Gentle Breeze', audioPath: require('../assets/audio/wake-tones/gentlebreeze.mp3') },
    { name: 'Morning Birds', audioPath: require('../assets/audio/wake-tones/morningbirds.wav') },
    { name: 'Ocean Surf', audioPath: require('../assets/audio/wake-tones/oceansurf.wav') },
    { name: 'Rainforest', audioPath: require('../assets/audio/wake-tones/rainforest.mp3') }
  ];

  // Ambient sound audio paths (same as in SoundsScreen)
  const ambientSoundCards = [
    { name: 'Rain', audioPath: require('../assets/audio/ambient/rainambient.wav') },
    { name: 'Fireplace', audioPath: require('../assets/audio/ambient/fireplace.wav') },
    { name: 'Ocean Waves', audioPath: require('../assets/audio/ambient/oceanwavesambient.mp3') },
    { name: 'Night Crickets', audioPath: require('../assets/audio/ambient/cricketambient.wav') },
    { name: 'White Noise', audioPath: require('../assets/audio/ambient/whitenoise.wav') }
  ];

  // Timer state - start with full duration in seconds (but don't start yet)
  const [timeRemaining, setTimeRemaining] = useState(napDuration * 60);
  const [isNapTimerActive, setIsNapTimerActive] = useState(false);

  // Prediction phase timer (simulates algorithm analyzing user data)
  const [predictionTimeElapsed, setPredictionTimeElapsed] = useState(0);

  // Progress animation
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [progress, setProgress] = useState(0);

  // Text fade animation for smooth sentence transitions
  const textFadeAnim = useRef(new Animated.Value(1)).current;

  // Analyzing phase sentences - while algorithms are running
  const analyzingPrecisionSentences = [
    "🔬 Analyzing your personal sleep patterns...",
    "📊 Processing your nap history data...",
    "🧠 Calculating optimal sleep onset timing...",
    "⚡ Evaluating your energy levels...",
    "📈 Reviewing your past nap quality metrics...",
    "🎯 Determining your unique sleep signature...",
    "💤 Assessing your circadian rhythm...",
    "🔍 Studying your rest patterns...",
  ];

  const analyzingAdvancedSentences = [
    "🔮 AI is predicting your sleep onset window...",
    "🧙‍♂️ Algorithms learning your drowsiness patterns...",
    "🌙 Processing thousands of sleep data points...",
    "⭐ Machine learning mapping your nap journey...",
    "🎭 Neural networks reading your sleep signals...",
    "🚀 Advanced AI calculating sleep probability...",
    "💫 Predictive models analyzing your behavior...",
    "🔬 Smart algorithms optimizing your nap timing...",
  ];

  // Ready phase sentences - when analysis is complete but nap hasn't started
  const readyPrecisionSentences = [
    "⏰ Predicting you'll fall asleep in the next few minutes...",
    "🎯 Monitoring your readiness to sleep...",
    "🧠 Calculating optimal sleep onset window...",
    "📊 Analyzing circadian rhythm patterns...",
    "🔬 Detecting early drowsiness signals...",
    "⚡ Measuring your current energy levels...",
    "📈 Processing environmental sleep factors...",
  ];

  const readyAdvancedSentences = [
    "🔮 AI predicts sleep onset in the next few minutes...",
    "🧙‍♂️ Advanced algorithms monitoring your sleepiness...",
    "🌙 Machine learning analyzing your readiness...",
    "⭐ Neural networks detecting drowsiness patterns...",
    "🚀 Smart sensors reading your sleep signals...",
    "💫 Predictive models calculating optimal timing...",
    "🎭 AI watching for the perfect moment to start...",
  ];

  // Napping phase sentences - during actual nap
  const nappingPrecisionSentences = [
    "🔬 Monitoring your breathing patterns...",
    "📊 Tracking your heart rate variability...",
    "🧠 Observing your REM cycles in real-time...",
    "⚡ Measuring your nervous system activity...",
    "📈 Recording your sleep quality metrics...",
    "🎯 Optimizing your wake-up timing...",
    "💤 Detecting your sleep stage transitions...",
    "🔍 Monitoring your body's recovery signals...",
  ];

  const nappingAdvancedSentences = [
    "🔮 Predicting your optimal wake-up window...",
    "🧙‍♂️ AI monitoring your sleep depth...",
    "🌙 Algorithms tracking your dream cycles...",
    "⭐ Smart wake-up timing being calculated...",
    "🎭 Reading your sleep stage transitions...",
    "🚀 Advanced sensors monitoring rest quality...",
    "💫 AI ensuring you wake up refreshed...",
    "🔬 Precision timing for groggy-free awakening...",
  ];

  // Current sentence arrays based on phase and plan
  const getCurrentSentences = () => {
    if (currentPhase === 'analyzing') {
      return userPlan === 'precision' ? analyzingPrecisionSentences : analyzingAdvancedSentences;
    } else if (currentPhase === 'ready') {
      return userPlan === 'precision' ? readyPrecisionSentences : readyAdvancedSentences;
    } else {
      return userPlan === 'precision' ? nappingPrecisionSentences : nappingAdvancedSentences;
    }
  };

  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);

  // AppState listener for background/foreground handling
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      console.log(`🔄 App state changing from ${appState} to ${nextAppState}`);
      
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        // App coming back to foreground
        console.log('📱 App returned to foreground');
        
        if (currentPhase === 'napping' && napStartTimestamp.current) {
          // Recalculate timer based on actual elapsed time
          const now = Date.now();
          const totalElapsedTime = Math.floor((now - napStartTimestamp.current) / 1000);
          const totalNapSeconds = napDuration * 60;
          const newTimeRemaining = Math.max(0, totalNapSeconds - totalElapsedTime);
          
          console.log(`⚡ Background sync - Total elapsed: ${totalElapsedTime}s, Setting remaining to: ${newTimeRemaining}s`);
          
          setTimeRemaining(newTimeRemaining);
          
          // Update progress
          const napProgress = totalElapsedTime / totalNapSeconds;
          setProgress(Math.min(napProgress, 1));
          
          // If time is up while we were in background, trigger completion
          if (newTimeRemaining <= 0 && currentPhase === 'napping' && !isAlarmPlaying) {
            console.log('⏰ Nap completed while in background, triggering wake alarm');
            startContinuousVibration();
            setCurrentPhase('alarm');
            setIsNapTimerActive(false);
            setIsAlarmPlaying(true);
            // Start wake alarm
            startWakeAlarm();
          }
        }
        
        backgroundStartTime.current = null;
      } else if (nextAppState.match(/inactive|background/)) {
        // App going to background
        console.log('📱 App going to background');
        backgroundStartTime.current = Date.now();
      }
      
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => subscription?.remove();
  }, [appState, currentPhase, napDuration]);

  // Cycle through sentences every 4 seconds with fade animation
  useEffect(() => {
    const sentenceCycleInterval = setInterval(() => {
      // Fade out
      Animated.timing(textFadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Change text
        const currentSentences = getCurrentSentences();
        setCurrentSentenceIndex(prevIndex =>
          (prevIndex + 1) % currentSentences.length
        );
        // Fade in
        Animated.timing(textFadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }, 4000); // Change sentence every 4 seconds

    return () => clearInterval(sentenceCycleInterval);
  }, [currentPhase, userPlan]);

  // Prediction phase timer - runs algorithms for exactly 8 seconds
  useEffect(() => {
    let predictionInterval = null;

    if (currentPhase === 'analyzing') {
      // Simulate algorithm analysis time (exactly 8 seconds)
      const algorithmDuration = 8; // 8 seconds

      predictionInterval = setInterval(() => {
        setPredictionTimeElapsed(prevTime => {
          const newTime = prevTime + 1;

          // Calculate progress during prediction (0 to 1)
          const predictionProgress = Math.min(newTime / algorithmDuration, 1);
          setProgress(predictionProgress);

          // Animate progress ring
          Animated.timing(progressAnim, {
            toValue: predictionProgress,
            duration: 1000,
            useNativeDriver: false,
          }).start();

          // When algorithm is done, transition to ready phase
          if (newTime >= algorithmDuration) {
            console.log('Analysis complete! Moving to ready phase...');

            setCurrentPhase('ready');
            setCurrentSentenceIndex(0); // Reset sentence index for ready phase

            // Keep progress at 100% for ready phase
            setProgress(1);
            Animated.timing(progressAnim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: false,
            }).start();

            return newTime;
          }

          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (predictionInterval) clearInterval(predictionInterval);
    };
  }, [currentPhase]);

  // Advanced Sleep Onset Prediction Algorithm (based on sleep science research)
  // Range: 1.5–30 minutes
  // Note: Predictions over 20 minutes are ONLY allowed when the user self-reports
  // a sleep latency of at least 20 minutes. Otherwise, we cap at 20 minutes.
  const predictSleepOnsetTime = () => {
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();
    const currentTime = currentHour + currentMinute / 60;

    // Get actual user data from personalization system
    const userProfile = userPersonalization.getUserProfile();

    // Parse bedtime and wake time to decimal hours
    const parseBedtime = (timeStr) => {
      if (!timeStr) return 23.0; // Default 11 PM
      const [time, period] = timeStr.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      if (period === 'PM' && hours !== 12) hours += 12;
      else if (period === 'AM' && hours === 12) hours = 0;
      return hours + (minutes || 0) / 60;
    };

    const parseWakeTime = (timeStr) => {
      if (!timeStr) return 7.0; // Default 7 AM
      const [time, period] = timeStr.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      if (period === 'PM' && hours !== 12) hours += 12;
      else if (period === 'AM' && hours === 12) hours = 0;
      return hours + (minutes || 0) / 60;
    };

    // Map daily schedule to schedule type for algorithm
    const mapDailyScheduleToType = (dailySchedule) => {
      if (!dailySchedule) return 'regular';
      
      // Handle array of schedules (take the first one for algorithm purposes)
      const scheduleToCheck = Array.isArray(dailySchedule) 
        ? dailySchedule[0] 
        : dailySchedule;
      
      if (!scheduleToCheck || typeof scheduleToCheck !== 'string') return 'regular';
      
      const schedule = scheduleToCheck.toLowerCase();
      if (schedule.includes('shift') || schedule.includes('night') || schedule.includes('rotating')) {
        return 'shift_worker';
      } else if (schedule.includes('student') || schedule.includes('school') || schedule.includes('college')) {
        return 'student';
      } else if (schedule.includes('irregular') || schedule.includes('varying') || schedule.includes('flexible')) {
        return 'irregular';
      }
      return 'regular';
    };

    const userSleepProfile = {
      // PRIMARY FACTORS (highest weight)
      selfReportedSleepLatency: userProfile.sleepLatencyValue || 0, // Use calculated midpoint
      difficultyFallingAsleep: userProfile.difficultyFallingAsleep !== null && userProfile.difficultyFallingAsleep !== undefined ? (userProfile.difficultyFallingAsleep * 10) : 5, // Convert 0-1 to 1-10 scale
      typicalBedtime: parseBedtime(userProfile.bedtime),
      typicalWakeTime: parseWakeTime(userProfile.wakeTime),
      scheduleType: mapDailyScheduleToType(userProfile.dailySchedule),

      // SECONDARY FACTORS (medium weight)
      restingHeartRate: userProfile.restingHeartRate || 0, // 0 = unknown
      lastNapTime: null, // would track when they last napped

      // TERTIARY FACTORS (low weight)
      sleeperType: userProfile.sleeperType ? userProfile.sleeperType.toLowerCase() : 'average',
      wellnessFocus: userProfile.wellnessFocus || 'mental'
    };

    console.log('Using real user data for sleep onset prediction:', userSleepProfile);

    // Quick validation - warn if algorithm might still predict too high
    if (userSleepProfile.selfReportedSleepLatency > 0 && userSleepProfile.selfReportedSleepLatency <= 3 && userSleepProfile.difficultyFallingAsleep <= 3) {
      console.log('⚠️ USER REPORTS FAST SLEEPER: Algorithm should predict low onset time (2-5 minutes)');
    }

    // Handle unknown self-reported sleep latency (PRIMARY FACTOR - 40% weight)
    let baseLatency;
    let usingSelfReportedLatency = true;

    if (userSleepProfile.selfReportedSleepLatency === 0) {
      // User doesn't know - use conservative population average based on difficulty
      baseLatency = 8 + (userSleepProfile.difficultyFallingAsleep * 1.2); // 8-20 min range (increased from 6-14)
      usingSelfReportedLatency = false;
      console.log("User doesn't know sleep latency - using conservative difficulty-based estimate");
    } else {
      // Add buffer to self-reported latency to make it longer
      baseLatency = userSleepProfile.selfReportedSleepLatency * 1.5;
    }

    // 1. DIFFICULTY FALLING ASLEEP ADJUSTMENT (PRIMARY - 25% weight)
    // Scale: 1-10, where 10 is very difficult
    let difficultyMultiplier;

    if (usingSelfReportedLatency) {
      // Normal difficulty adjustment when using self-reported data - adjusted for longer times
      difficultyMultiplier = 0.8 + (userSleepProfile.difficultyFallingAsleep * 0.12);
      // Range: 0.92x (easy sleeper) to 2.0x (very difficult sleeper) - higher baseline
    } else {
      // Conservative difficulty adjustment for estimated values - adjusted for longer times
      difficultyMultiplier = 1.1 + (userSleepProfile.difficultyFallingAsleep * 0.05);
      // Range: 1.15x to 1.6x (higher baseline for longer onset times)
    }

    // 2. CIRCADIAN ALIGNMENT (PRIMARY - 20% weight)
    let circadianAlignment = calculateCircadianAlignment(currentTime, userSleepProfile);

    // 3. SCHEDULE TYPE IMPACT (PRIMARY - 10% weight)
    let scheduleMultiplier = 1.0;
    switch (userSleepProfile.scheduleType) {
      case 'shift_worker':
        scheduleMultiplier = 1.8; // Much harder for shift workers
        break;
      case 'student':
        scheduleMultiplier = 1.4; // Irregular schedules
        break;
      case 'irregular':
        scheduleMultiplier = 1.6; // Inconsistent sleep patterns
        break;
      case 'regular':
      default:
        scheduleMultiplier = 1.0; // Normal schedule
    }

    // 4. STRESS/AROUSAL INDICATOR (SECONDARY - 3% weight)
    let stressMultiplier = 1.0;
    let usingHeartRateData = true;

    if (userSleepProfile.restingHeartRate === 0) {
      // User doesn't know heart rate - skip this factor entirely
      stressMultiplier = 1.0;
      usingHeartRateData = false;
      console.log("User doesn't know heart rate - skipping stress indicator");
    } else if (userSleepProfile.restingHeartRate > 80) {
      stressMultiplier = 1.4; // High stress/arousal
    } else if (userSleepProfile.restingHeartRate > 70) {
      stressMultiplier = 1.2; // Moderate stress
    } else if (userSleepProfile.restingHeartRate < 55) {
      stressMultiplier = 0.8; // Very relaxed/fit
    }

    // 5. NAP TIMING INTERFERENCE (SECONDARY - 2% weight)
    let napInterferenceMultiplier = 1.0;
    if (currentHour >= 17) { // After 5 PM
      napInterferenceMultiplier = 1.3; // Late naps interfere with sleep
    }

    // Calculate final prediction with weighted factors
    let predictedMinutes = baseLatency *
      difficultyMultiplier *
      circadianAlignment *
      scheduleMultiplier *
      stressMultiplier *
      napInterferenceMultiplier;

    // Apply minor plan adjustment (advanced users might be more experienced)
    if (userPlan === 'advanced') {
      predictedMinutes *= 0.9;
    }

    // Clamp range
    // - Minimum: 1.5 minutes (or half of self-report for very fast sleepers)
    // - Maximum: 30 minutes ONLY if the user self-reported latency >= 20 minutes
    const minAllowed = usingSelfReportedLatency && userSleepProfile.selfReportedSleepLatency <= 3 
      ? Math.max(1.5, userSleepProfile.selfReportedSleepLatency * 0.5)
      : 1.5;

    const allowHighLatency = usingSelfReportedLatency && userSleepProfile.selfReportedSleepLatency >= 20;
    const maxAllowed = allowHighLatency ? 30 : 20;

    predictedMinutes = Math.max(minAllowed, Math.min(maxAllowed, predictedMinutes));

    console.log(`Advanced Sleep Onset Prediction:
      Base latency ${usingSelfReportedLatency ? '(self-reported)' : '(estimated from difficulty)'}: ${baseLatency.toFixed(1)} min
      Difficulty multiplier (${userSleepProfile.difficultyFallingAsleep}/10): ${difficultyMultiplier.toFixed(2)}x
      Circadian alignment: ${circadianAlignment.toFixed(2)}x
      Schedule type (${userSleepProfile.scheduleType}): ${scheduleMultiplier}x
      Stress indicator ${usingHeartRateData ? '(HR ' + userSleepProfile.restingHeartRate + ')' : '(unknown HR - skipped)'}: ${stressMultiplier}x
      Nap timing: ${napInterferenceMultiplier}x
      Plan adjustment (${userPlan}): ${userPlan === 'advanced' ? '0.9x' : '1.0x'}
      Calculated result: ${(baseLatency * difficultyMultiplier * circadianAlignment * scheduleMultiplier * stressMultiplier * napInterferenceMultiplier * (userPlan === 'advanced' ? 0.9 : 1.0)).toFixed(1)} min
      Minimum allowed: ${minAllowed.toFixed(1)} min
      Max allowed: ${maxAllowed} min
      Final prediction: ${predictedMinutes.toFixed(1)} minutes`);

    return Math.round(predictedMinutes);
  };

  // Calculate how well current time aligns with user's circadian rhythm
  const calculateCircadianAlignment = (currentTime, profile) => {
    const bedtime = profile.typicalBedtime;
    const wakeTime = profile.typicalWakeTime;

    // Calculate sleep window (bedtime to wake time, handling midnight crossover)
    let sleepDuration = wakeTime - bedtime;
    if (sleepDuration < 0) sleepDuration += 24; // Handle midnight crossover

    // Find midpoint of sleep (deepest sleep time)
    let sleepMidpoint = bedtime + (sleepDuration / 2);
    if (sleepMidpoint >= 24) sleepMidpoint -= 24;

    // Calculate distance from ideal nap time (early afternoon, 13-15)
    let idealNapTime = 14.0; // 2 PM
    let distanceFromIdeal = Math.abs(currentTime - idealNapTime);
    if (distanceFromIdeal > 12) distanceFromIdeal = 24 - distanceFromIdeal; // Handle day wrap

    // Calculate distance from sleep midpoint (when body is programmed to be asleep)
    let distanceFromSleepTime = Math.abs(currentTime - sleepMidpoint);
    if (distanceFromSleepTime > 12) distanceFromSleepTime = 24 - distanceFromSleepTime;

    // Best alignment: close to 2 PM, far from sleep midpoint
    let idealProximity = Math.max(0, 6 - distanceFromIdeal) / 6; // 0-1 scale
    let sleepDistanceBonus = Math.min(distanceFromSleepTime / 8, 1); // 0-1 scale

    // Combine factors (favor ideal nap time more heavily)
    let alignment = (idealProximity * 0.7) + (sleepDistanceBonus * 0.3);

    // Convert to multiplier: 0.8x (poor alignment) to 1.0x (perfect alignment) - adjusted for longer times
    return 0.8 + (alignment * 0.2);
  };

  // Ready phase timer - waits for predicted sleep onset
  useEffect(() => {
    let readyInterval = null;

    if (currentPhase === 'ready') {
      // Start ambient sound when ready phase begins
      startAmbientSound();
      
      // Use sleep onset prediction algorithm
      const predictedMinutes = predictSleepOnsetTime();
      const readyDuration = predictedMinutes * 60; // Convert to seconds
      let readyTimeElapsed = 0;

      readyInterval = setInterval(() => {
        readyTimeElapsed += 1;

        if (readyTimeElapsed >= readyDuration) {
          console.log('Sleep onset detected! Starting nap timer...');

          // Record the actual nap start time
          const napStartTimeString = new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          });
          setNapStartTime(napStartTimeString);
          console.log(`Nap actually started at: ${napStartTimeString}`);

          // Record the exact timestamp when napping starts for background calculation
          napStartTimestamp.current = Date.now();
          lastUpdateTime.current = Date.now();
          console.log(`📅 Nap timestamp recorded: ${napStartTimestamp.current}`);

          setCurrentPhase('napping');
          setIsNapTimerActive(true);
          setCurrentSentenceIndex(0); // Reset sentence index for napping phase

          // Set timeout to stop ambient sound 5 minutes after nap starts
          if (isAmbientPlaying) {
            ambientStopTimeout.current = setTimeout(() => {
              console.log('Stopping ambient sound after 5 minutes');
              stopAmbientSound();
            }, 5 * 60 * 1000); // 5 minutes in milliseconds
          }

          // Reset progress for nap phase
          setProgress(0);
          Animated.timing(progressAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
          }).start();
        }
      }, 1000);
    }

    return () => {
      if (readyInterval) clearInterval(readyInterval);
    };
  }, [currentPhase]);

  // Background-aware nap timer that continues running when app is minimized
  useEffect(() => {
    let napInterval = null;

    if (currentPhase === 'napping' && isNapTimerActive) {
      napInterval = setInterval(() => {
        const now = Date.now();
        
        // Calculate how much time should have elapsed based on real time
        if (napStartTimestamp.current) {
          const totalElapsedTime = Math.floor((now - napStartTimestamp.current) / 1000);
          const totalNapSeconds = napDuration * 60;
          const newTimeRemaining = Math.max(0, totalNapSeconds - totalElapsedTime);
          
          console.log(`⏱️ Timer update - Elapsed: ${totalElapsedTime}s, Remaining: ${newTimeRemaining}s`);
          
          setTimeRemaining(newTimeRemaining);
          
          // Calculate progress (0 to 1)
          const napProgress = totalElapsedTime / totalNapSeconds;
          setProgress(Math.min(napProgress, 1));

          // Animate progress ring
          Animated.timing(progressAnim, {
            toValue: Math.min(napProgress, 1),
            duration: 500,
            useNativeDriver: false,
          }).start();
          
          // Update last update time
          lastUpdateTime.current = now;
          
          // Check if nap is complete inside the interval
          if (newTimeRemaining <= 0 && !isAlarmPlaying) {
            console.log('⏰ Nap timer completed, starting wake alarm');
            
            // Start continuous vibration
            startContinuousVibration();
            
            setCurrentPhase('alarm');
            setIsNapTimerActive(false);
            setIsAlarmPlaying(true);
            startWakeAlarm();
          }
        } else {
          // Fallback to old method if timestamp not available
          setTimeRemaining(prevTime => {
            const newTime = Math.max(0, prevTime - 1);
            
            // Check if nap is complete in fallback method too
            if (newTime <= 0 && !isAlarmPlaying) {
              console.log('⏰ Nap timer completed (fallback), starting wake alarm');
              
              // Start continuous vibration
              startContinuousVibration();
              
              setCurrentPhase('alarm');
              setIsNapTimerActive(false);
              setIsAlarmPlaying(true);
              startWakeAlarm();
            }
            
            return newTime;
          });
        }
      }, 1000);
    }

    return () => {
      if (napInterval) clearInterval(napInterval);
    };
  }, [currentPhase, isNapTimerActive, napDuration, vibrationEnabled, isAlarmPlaying]);

  // Keep screen awake during nap phases
  useEffect(() => {
    if (currentPhase === 'analyzing' || currentPhase === 'ready' || currentPhase === 'napping') {
      console.log('Activating keep awake for phase:', currentPhase);
      activateKeepAwake();
    } else if (currentPhase === 'alarm' || currentPhase === 'complete') {
      console.log('Deactivating keep awake for phase:', currentPhase);
      deactivateKeepAwake();
    }
  }, [currentPhase]);

  // Cleanup ambient sounds and vibration on component unmount
  useEffect(() => {
    return () => {
      // Stop ambient sound and clear timeout on unmount
      stopAmbientSound();
      // Stop any ongoing vibration
      stopContinuousVibration();
      // Allow screen to sleep again
      deactivateKeepAwake();
    };
  }, []);

  // Format time display (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleBack = () => {
    // Allow screen to sleep when leaving nap screen
    deactivateKeepAwake();
    if (navigation) {
      navigation.goBack();
    }
  };

  // Continuous vibration functions
  const startContinuousVibration = () => {
    if (!vibrationEnabled) return;
    
    console.log('Starting continuous vibration');
    
    // Start with immediate vibration pattern
    Vibration.vibrate([0, 300, 100, 300]); // Short bursts with brief pauses
    
    // Set up repeating vibration every 500ms for constant feel
    vibrationInterval.current = setInterval(() => {
      Vibration.vibrate([0, 300, 100, 300]); // Pattern: pause 0ms, vibrate 300ms, pause 100ms, vibrate 300ms
    }, 800); // Every 800ms for overlapping effect
  };

  const stopContinuousVibration = () => {
    console.log('Stopping continuous vibration');
    
    // Cancel any ongoing vibration
    Vibration.cancel();
    
    // Clear the interval
    if (vibrationInterval.current) {
      clearInterval(vibrationInterval.current);
      vibrationInterval.current = null;
    }
  };

  const handleNapComplete = async () => {
    console.log('Nap completed! Starting wake alarm...');

    // Start continuous vibration
    startContinuousVibration();

    // Start wake-up alarm
    setCurrentPhase('alarm');
    setIsAlarmPlaying(true);
    await startWakeAlarm();
  };

  const startWakeAlarm = async () => {
    try {
      // Find the selected wake tone
      const wakeToneData = wakeToneCards.find(tone => tone.name === selectedWakeTone);
      
      if (!wakeToneData) {
        console.error('Wake tone not found:', selectedWakeTone);
        // Fallback to default
        wakeToneData = wakeToneCards[0];
      }

      console.log('Playing wake alarm with tone:', selectedWakeTone);

      // Play wake tone on loop (continues until manually dismissed)
      await audioManager.playSound(
        wakeToneData.audioPath,
        null, // No progress callback needed for alarm
        null, // No status callback needed
        true  // Loop indefinitely
      );
      
    } catch (error) {
      console.error('Error starting wake alarm:', error);
    }
  };

  const dismissAlarm = async () => {
    console.log('Dismissing wake alarm');
    setIsAlarmPlaying(false);
    
    // Stop continuous vibration
    stopContinuousVibration();
    
    // Allow screen to sleep when dismissing alarm
    deactivateKeepAwake();
    
    // Stop the alarm audio
    await audioManager.stopSound();
    
    // Calculate actual nap duration
    const actualDurationSeconds = (napDuration * 60) - timeRemaining;
    const actualDurationMinutes = Math.floor(actualDurationSeconds / 60);
    const actualDurationSecondsRemainder = actualDurationSeconds % 60;
    const actualDurationString = `${actualDurationMinutes} min ${actualDurationSecondsRemainder} s`;

    // Get current time for completion timestamp
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    // Navigate to NapCompleteScreen with nap data
    if (navigation) {
      navigation.navigate('NapComplete', {
        duration: actualDurationString,
        sleepStage: 'Light', // Could be calculated based on nap length
        finishedTime: timeString,
        startTime: napStartTime // Pass the actual nap start time
      });
    }
  };

  // Ambient sound functions
  const startAmbientSound = async () => {
    if (selectedAmbientSound === 'None') {
      console.log('No ambient sound selected');
      return;
    }

    try {
      // Find the selected ambient sound
      const ambientData = ambientSoundCards.find(sound => sound.name === selectedAmbientSound);
      
      if (!ambientData) {
        console.error('Ambient sound not found:', selectedAmbientSound);
        return;
      }

      console.log('Starting ambient sound:', selectedAmbientSound);

      // Play ambient sound on loop
      await audioManager.playSound(
        ambientData.audioPath,
        null, // No progress callback needed
        null, // No status callback needed
        true  // Loop indefinitely
      );
      
      setIsAmbientPlaying(true);
      
    } catch (error) {
      console.error('Error starting ambient sound:', error);
    }
  };

  const stopAmbientSound = async () => {
    if (!isAmbientPlaying) return;
    
    console.log('Stopping ambient sound');
    
    try {
      await audioManager.stopSound();
      setIsAmbientPlaying(false);
      
      // Clear any pending timeout
      if (ambientStopTimeout.current) {
        clearTimeout(ambientStopTimeout.current);
        ambientStopTimeout.current = null;
      }
    } catch (error) {
      console.error('Error stopping ambient sound:', error);
    }
  };

  const handleEndNap = () => {
    console.log('End nap pressed');
    
    // If in analyzing or ready phase, this is a cancel action - go back to home
    if (currentPhase === 'analyzing' || currentPhase === 'ready') {
      console.log('Canceling nap, returning to home');
      // Stop ambient sound if playing
      stopAmbientSound();
      // Stop any ongoing vibration
      stopContinuousVibration();
      // Allow screen to sleep when canceling
      deactivateKeepAwake();
      if (navigation) {
        navigation.navigate('Home');
      }
      return;
    }
    
    // Otherwise, this is ending an active nap
    setCurrentPhase('complete');
    setIsNapTimerActive(false);
    
    // Stop ambient sound if playing
    stopAmbientSound();
    
    // Stop any ongoing vibration
    stopContinuousVibration();

    // Calculate actual nap duration when manually ended
    const actualDurationSeconds = (napDuration * 60) - timeRemaining;
    const actualDurationMinutes = Math.floor(actualDurationSeconds / 60);
    const actualDurationSecondsRemainder = actualDurationSeconds % 60;
    const actualDurationString = `${actualDurationMinutes} min ${actualDurationSecondsRemainder} s`;

    // Get current time for completion timestamp
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    // Navigate to NapCompleteScreen with nap data
    if (navigation) {
      navigation.navigate('NapComplete', {
        duration: actualDurationString,
        sleepStage: actualDurationMinutes < 15 ? 'Light' : actualDurationMinutes < 30 ? 'Deep' : 'REM',
        finishedTime: timeString,
        startTime: napStartTime // Pass the actual nap start time
      });
    }
  };

  // Get display text based on current phase
  const getHeaderText = () => {
    switch (currentPhase) {
      case 'analyzing':
        return 'Analyzing sleep patterns';
      case 'ready':
        return 'Ready to nap';
      case 'napping':
        return 'Nap in progress';
      case 'complete':
        return 'Nap complete';
      case 'alarm':
        return 'Time to wake up!';
      default:
        return 'Preparing your nap';
    }
  };

  // Get timer display based on phase
  const getTimerDisplay = () => {
    if (currentPhase === 'analyzing') {
      return `${Math.round(progress * 100)}%`;
    } else if (currentPhase === 'ready') {
      return 'Ready';
    } else if (currentPhase === 'napping') {
      return formatTime(timeRemaining);
    } else if (currentPhase === 'alarm') {
      return '00:00'; // Nap time has ended
    } else {
      return '00:00';
    }
  };

  // Calculate stroke dash offset for progress ring
  const radius = 124; // Half of 248px diameter minus stroke width
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress * circumference);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.content}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <BackArrowIcon />
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerSubtitle}>{getHeaderText()}</Text>
          <Text style={styles.timer}>{getTimerDisplay()}</Text>
        </View>

        {/* Circular Progress Section */}
        <View style={styles.progressSection}>
          <View style={styles.progressContainer}>
            <Svg width={260} height={260} viewBox="0 0 260 260">
              <G clipPath="url(#clip0_241_25)">
                {/* Background circle */}
                <Circle
                  cx="130"
                  cy="130"
                  r="124"
                  stroke="#E5E8EC"
                  strokeWidth="12"
                  fill="none"
                />
                {/* Progress circle */}
                <Circle
                  cx="130"
                  cy="130"
                  r="124"
                  stroke={currentPhase === 'analyzing' ? "#B7AFC5" : "#A7D7C5"}
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${circumference} ${circumference}`}
                  strokeDashoffset={strokeDashoffset}
                  transform="rotate(-90 130 130)"
                />
              </G>
              <Defs>
                <ClipPath id="clip0_241_25">
                  <Path d="M0 0H260V260H0V0Z" fill="white"/>
                </ClipPath>
              </Defs>
            </Svg>
          </View>
        </View>

        {/* Message Section */}
        <View style={styles.messageSection}>
          <Text style={styles.mainMessage}>
            {currentPhase === 'analyzing'
              ? 'Getting ready...'
              : currentPhase === 'ready'
                ? 'Ready to nap!'
                : 'You\'re recharging...'
            }
          </Text>
          <Text style={styles.subMessage}>
            {currentPhase === 'analyzing'
              ? 'Our AI is analyzing your sleep patterns.'
              : currentPhase === 'ready'
                ? 'We\'ll start the timer when we predict you\'ll fall asleep.'
                : 'Relax while we monitor your nap.'
            }
          </Text>
        </View>

        {/* Ambient Sound Status */}
        {isAmbientPlaying && (
          <View style={styles.ambientSoundStatus}>
            <Text style={styles.ambientSoundText}>
              🎵 {selectedAmbientSound} playing
            </Text>
          </View>
        )}

        {/* Buttons Container - wraps Smart sensors card and Cancel button */}
        <View style={styles.buttonsContainer}>
          {/* Smart sensors card (messageCard) */}
          <View style={styles.messageCard}>
            <Animated.Text
              style={[
                styles.trackingText,
                { opacity: textFadeAnim }
              ]}
            >
              {getCurrentSentences()[currentSentenceIndex]}
            </Animated.Text>
          </View>

          {/* End Nap Button Section or Alarm Controls */}
          <View style={styles.buttonSection}>
          {currentPhase === 'alarm' ? (
            <View style={styles.alarmControls}>
              <TouchableOpacity
                style={[styles.endNapButton, styles.dismissAlarmButton]}
                onPress={dismissAlarm}
                activeOpacity={0.8}
              >
                <Text style={styles.endNapButtonText}>
                  Stop Alarm
                </Text>
              </TouchableOpacity>
              <Text style={styles.alarmToneText}>
                Playing: {selectedWakeTone}
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.endNapButton}
              onPress={handleEndNap}
              activeOpacity={0.8}
            >
              <Text style={styles.endNapButtonText}>
                {currentPhase === 'analyzing'
                  ? 'Cancel'
                  : currentPhase === 'ready'
                    ? 'Cancel'
                    : 'End Nap'
                }
              </Text>
            </TouchableOpacity>
          )}
          </View>
        </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2A38',
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center', // ✅ center the content container horizontally
    justifyContent: 'flex-start',
  },
  content: {
    width: '100%',
    maxWidth: 390,
    height: 844,
    position: 'relative',
    alignItems: 'center', // ✅ center children horizontally
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
    width: '100%',
    maxWidth: 390,
    height: 130,
    position: 'absolute',
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSubtitle: {
    width: 200,
    height: 20,
    color: 'rgba(253, 253, 253, 0.70)',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    position: 'absolute',
    left: '50%',
    marginLeft: -100, // Half of width to center
    top: 45,
  },
  timer: {
    width: 250, // Increased width to prevent cut-off
    height: 80,
    color: '#FDFDFD',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 42,
    fontWeight: '700',
    lineHeight: 50,
    position: 'absolute',
    left: '50%',
    marginLeft: -125, // Half of width to center
    top: 62,
  },
  progressSection: {
    width: '100%',
    maxWidth: 390,
    height: 260,
    paddingHorizontal: 65,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 154,
  },
  progressContainer: {
    width: 260,
    height: 260,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center', // ✅ keep circle centered
  },
  messageSection: {
    width: '100%',
    maxWidth: 390,
    height: 70,
    position: 'absolute',
    left: 0,
    top: 443,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainMessage: {
    width: 190,
    height: 26,
    color: '#FDFDFD',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26,
    position: 'absolute',
    left: '50%',
    marginLeft: -95, // Half of width to center
    top: -3,
  },
  subMessage: {
    width: 300,
    color: 'rgba(253, 253, 253, 0.80)',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    position: 'absolute',
    left: '50%',
    marginLeft: -150, // Half of width to center
    top: 29,
    flexWrap: 'wrap',
  },
  messageCard: {
    width: '100%',
    maxWidth: 358,
    height: 80,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#E5E8EC',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center', // ✅ center the card
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  trackingText: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 22,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  buttonsContainer: {
    width: '100%',
    maxWidth: 390,
    paddingHorizontal: 16,
    gap: 16,
    position: 'absolute',
    left: 0,
    top: 523,
    alignItems: 'center', // ✅ center horizontally
  },
  buttonSection: {
    width: '100%',
    maxWidth: 358,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 117,
  },
  endNapButton: {
    width: '100%',
    maxWidth: 358,
    height: 64,
    paddingHorizontal: 125,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#B7AFC5',
    alignSelf: 'center', // ✅ center the button
    shadowColor: 'rgba(183, 175, 197, 0.35)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 8,
  },
  endNapButtonText: {
    width: 108,
    height: 24,
    color: '#FDFDFD',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '700',
  },
  
  // Alarm-specific styles
  alarmControls: {
    alignItems: 'center',
    gap: 20,
  },
  
  dismissAlarmButton: {
    backgroundColor: '#FF6B6B', // Red for stopping alarm
  },
  
  alarmToneText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 10,
  },
  
  // Ambient sound status styles
  ambientSoundStatus: {
    alignItems: 'center',
    marginVertical: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'rgba(183, 175, 197, 0.08)',
    borderRadius: 15,
    marginHorizontal: 80,
    alignSelf: 'center',
  },
  
  ambientSoundText: {
    fontSize: 12,
    color: '#B7AFC5',
    textAlign: 'center',
    fontWeight: '400',
    opacity: 0.8,
  },
});
