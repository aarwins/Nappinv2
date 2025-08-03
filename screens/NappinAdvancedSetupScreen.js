import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  PanResponder,
  Alert,
} from 'react-native';
import { Svg, Path, G } from 'react-native-svg';
import TimePickerModal from '../components/TimePickerModal';

const userPersonalization = require('../utils/userPersonalization');

// Helper function to calculate sleep duration from bedtime and wake time
const calculateSleepDuration = (bedtimeStr, wakeTimeStr) => {
  const parseTime = (timeStr) => {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }
    
    return hours + (minutes || 0) / 60;
  };

  const bedtimeHour = parseTime(bedtimeStr);
  const wakeTimeHour = parseTime(wakeTimeStr);
  
  // Calculate duration accounting for crossing midnight
  let duration;
  if (wakeTimeHour >= bedtimeHour) {
    duration = wakeTimeHour - bedtimeHour;
  } else {
    duration = (24 - bedtimeHour) + wakeTimeHour;
  }
  
  return Math.round(duration * 10) / 10; // Round to 1 decimal place
};

const BackArrowIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M0.439453 10.9441C-0.146484 11.5301 -0.146484 12.4816 0.439453 13.0676L7.93945 20.5676C8.52539 21.1535 9.47695 21.1535 10.0629 20.5676C10.6488 19.9816 10.6488 19.0301 10.0629 18.4441L5.11758 13.5035H19.4988C20.3285 13.5035 20.9988 12.8332 20.9988 12.0035C20.9988 11.1738 20.3285 10.5035 19.4988 10.5035H5.12227L10.0582 5.56289C10.6441 4.97695 10.6441 4.02539 10.0582 3.43945C9.47227 2.85352 8.5207 2.85352 7.93477 3.43945L0.434766 10.9395L0.439453 10.9441Z"
      fill="#FDFDFD"
    />
  </Svg>
);

const DropdownIcon = () => (
  <Svg width={12} height={12} viewBox="0 0 12 13" fill="none">
    <G opacity="0.8">
      <Path d="M12 12.5H0V0.5H12V12.5Z" stroke="#E5E7EB"/>
      <Path d="M5.4703 10.0297C5.76327 10.3227 6.23905 10.3227 6.53202 10.0297L11.032 5.52974C11.325 5.23677 11.325 4.76099 11.032 4.46802C10.7391 4.17505 10.2633 4.17505 9.9703 4.46802L5.99999 8.43833L2.02968 4.47036C1.73671 4.17739 1.26093 4.17739 0.967957 4.47036C0.674988 4.76333 0.674988 5.23911 0.967957 5.53208L5.46796 10.0321L5.4703 10.0297Z" fill="#1E2A38"/>
    </G>
  </Svg>
);

export default function NappinAdvancedSetupScreen({ navigation }) {
  const [sleepTimeLow, setSleepTimeLow] = useState('5');
  const [sleepTimeHigh, setSleepTimeHigh] = useState('10');
  const [heartRate, setHeartRate] = useState('70');
  const [bedtime, setBedtime] = useState('10:30 PM');
  const [wakeTime, setWakeTime] = useState('6:30 AM');
  const [sleeperType, setSleeperType] = useState('Average');
  const [difficulty, setDifficulty] = useState(0.5); // 0-1 range for slider
  
  // Time picker modal states
  const [showBedtimePicker, setShowBedtimePicker] = useState(false);
  const [showWakeTimePicker, setShowWakeTimePicker] = useState(false);
  const sliderRef = useRef(null);
  const [sliderWidth, setSliderWidth] = useState(326);

  // Helper function to parse time string to components
  const parseTimeString = (timeString) => {
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':');
    return {
      hour: parseInt(hours),
      minute: parseInt(minutes),
      period: period
    };
  };



  // Difficulty Slider Handlers
  const handleSliderPress = (evt) => {
    const { locationX } = evt.nativeEvent;
    updateSliderPosition(locationX);
  };

  const handleSliderMove = (evt) => {
    const { locationX } = evt.nativeEvent;
    updateSliderPosition(locationX);
  };

  const updateSliderPosition = (locationX) => {
    if (typeof locationX !== 'number' || locationX < 0 || sliderWidth <= 0) {
      return;
    }
    
    let newValue = locationX / sliderWidth;
    newValue = Math.max(0, Math.min(1, newValue));
    
    if (Math.abs(newValue - difficulty) > 0.001) {
      setDifficulty(newValue);
    }
  };

  const onSliderLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setSliderWidth(width);
  };



  // Create PanResponder for difficulty slider
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      updateSliderPosition(evt.nativeEvent.locationX);
    },
    onPanResponderMove: (evt) => {
      updateSliderPosition(evt.nativeEvent.locationX);
    },
    onPanResponderRelease: () => {
      // Optional: handle release
    },
  });

  // Get sleep time range display text
  const getSleepTimeRangeText = () => {
    const low = parseInt(sleepTimeLow) || 0;
    const high = parseInt(sleepTimeHigh) || 0;
    
    if (low === 0 && high === 0) return "Not sure";
    if (low === 0) return `Up to ${high} min`;
    if (high === 0) return `${low}+ min`;
    if (low === high) return `${low} min`;
    return `${low}-${high} min`;
  };

  // Get the midpoint value for algorithm calculation
  const getSleepTimeValue = () => {
    const low = parseInt(sleepTimeLow) || 0;
    const high = parseInt(sleepTimeHigh) || 0;
    
    if (low === 0 && high === 0) return 0; // User not sure
    if (low === 0) return high; // Use high value
    if (high === 0) return low; // Use low value
    return (low + high) / 2; // Use midpoint
  };

  const handleBack = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleContinue = () => {
    // Calculate actual sleep duration from bedtime and wake time
    const actualSleepDuration = calculateSleepDuration(bedtime, wakeTime);
    
    // Save sleep data to personalization system
    userPersonalization.setSleepDuration(actualSleepDuration.toString());
    userPersonalization.setBedtime(bedtime);
    userPersonalization.setWakeTime(wakeTime);
    
    // Map sleeperType to stress/activity levels for calculation
    let stressLevel = 'medium';
    let activityLevel = 'moderate';
    
    if (sleeperType === 'Light sleeper') {
      stressLevel = 'high';
      activityLevel = 'low';
    } else if (sleeperType === 'Heavy sleeper') {
      stressLevel = 'low';
      activityLevel = 'high';
    }
    
    userPersonalization.setStressLevel(stressLevel);
    userPersonalization.setActivityLevel(activityLevel);
    
    // Save sleep onset data
    userPersonalization.setSleepLatency(sleepTimeLow, sleepTimeHigh, getSleepTimeValue());
    userPersonalization.setDifficultyFallingAsleep(difficulty);
    userPersonalization.setRestingHeartRate(parseInt(heartRate) || 0);
    userPersonalization.setSleeperType(sleeperType);
    
    console.log('Sleep data saved to personalization:', {
      sleepTimeRange: getSleepTimeRangeText(),
      sleepTimeValue: getSleepTimeValue(),
      sleepTimeLow,
      sleepTimeHigh,
      heartRate,
      bedtime,
      wakeTime,
      sleeperType,
      difficulty,
      stressLevel,
      activityLevel
    });
    
    // Navigate to success screen with Apple Watch flag if coming from Apple Watch flow
    if (navigation) {
      const fromAppleWatch = navigation.getState().routes.some(route => route.name === 'AppleWatchSetup');
      navigation.navigate('NappinAdvancedSuccess', { fromAppleWatch });
    }
  };

  const handleBedtimePress = () => {
    setShowBedtimePicker(true);
  };

  const handleWakeTimePress = () => {
    setShowWakeTimePicker(true);
  };

  const handleBedtimeConfirm = (timeString) => {
    setBedtime(timeString);
  };

  const handleWakeTimeConfirm = (timeString) => {
    setWakeTime(timeString);
  };

  const renderSleeperTypeButton = (type) => {
    const isSelected = sleeperType === type;
    return (
      <TouchableOpacity
        key={type}
        style={[
          styles.sleeperButton,
          isSelected && styles.sleeperButtonSelected
        ]}
        onPress={() => setSleeperType(type)}
      >
        <Text style={[
          styles.sleeperButtonText,
          isSelected ? styles.sleeperButtonTextSelected : styles.sleeperButtonTextUnselected
        ]}>{type}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Set Up Nappin AI</Text>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.mainTitle}>Tell us about your sleep.</Text>
          </View>

          {/* Form Container */}
          <View style={styles.formContainer}>
            {/* Help Note */}
            <View style={styles.helpNoteContainer}>
              <Text style={styles.helpNoteText}>
                💡 Put 0 if you're not sure - we'll factor it out of your sleep onset calculation.
              </Text>
            </View>

            {/* Sleep Time Range Field */}
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Estimated time to fall asleep (range)</Text>
              <View style={styles.rangeInputContainer}>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.textInput}
                    value={sleepTimeLow}
                    onChangeText={setSleepTimeLow}
                    keyboardType="numeric"
                    maxLength={3}
                    placeholder="0"
                    placeholderTextColor="#999"
                  />
                </View>
                <Text style={styles.rangeConnector}>to</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.textInput}
                    value={sleepTimeHigh}
                    onChangeText={setSleepTimeHigh}
                    keyboardType="numeric"
                    maxLength={3}
                    placeholder="0"
                    placeholderTextColor="#999"
                  />
                </View>
                <Text style={styles.unitText}>min</Text>
              </View>
              <Text style={styles.rangePreview}>{getSleepTimeRangeText()}</Text>
            </View>

            {/* Heart Rate Field */}
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Average resting heart-rate</Text>
              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.textInput}
                    value={heartRate}
                    onChangeText={setHeartRate}
                    keyboardType="numeric"
                    maxLength={3}
                  />
                </View>
                <Text style={styles.unitText}>bpm</Text>
              </View>
            </View>

            {/* Bedtime Field */}
            <TouchableOpacity style={styles.formField} onPress={handleBedtimePress}>
              <Text style={styles.fieldLabel}>When do you typically go to sleep?</Text>
              <View style={styles.dropdownContainer}>
                <Text style={styles.dropdownText}>{bedtime}</Text>
                <DropdownIcon />
              </View>
            </TouchableOpacity>

            {/* Wake Time Field */}
            <TouchableOpacity style={styles.formField} onPress={handleWakeTimePress}>
              <Text style={styles.fieldLabel}>When do you usually wake up?</Text>
              <View style={styles.dropdownContainer}>
                <Text style={styles.dropdownText}>{wakeTime}</Text>
                <DropdownIcon />
              </View>
            </TouchableOpacity>

            {/* Sleeper Type */}
            <View style={styles.sleeperTypeSection}>
              <Text style={styles.sectionTitle}>Sleeper type</Text>
              <View style={styles.sleeperButtonsContainer}>
                {renderSleeperTypeButton('Light')}
                {renderSleeperTypeButton('Average')}
                {renderSleeperTypeButton('Heavy')}
              </View>
            </View>

            {/* Difficulty Slider */}
            <View style={styles.difficultySection}>
              <Text style={styles.sectionTitle}>Tap to choose your sleep difficulty</Text>
              <View style={styles.sliderContainer}>
                <View 
                  ref={sliderRef}
                  style={styles.sliderTouchArea}
                  onLayout={onSliderLayout}
                  {...panResponder.panHandlers}
                >
                  <View style={styles.sliderTrack}>
                    <View style={[styles.sliderThumb, { left: `${difficulty * 100}%` }]} />
                  </View>
                </View>
                <View style={styles.sliderLabels}>
                  <Text style={styles.sliderLabel}>Easy</Text>
                  <Text style={styles.sliderLabel}>Hard</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Continue Button */}
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueText}>Save & Continue</Text>
          </TouchableOpacity>

          {/* Description Text */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>
              Nappin Advanced combines your personalization choices with the data you enter here so our AI can pinpoint the moment you fall asleep, ensuring you wake fully recharged and free of grogginess.
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>You can change your data anytime in the settings.</Text>
        </View>
      </ScrollView>
      
      {/* Time Picker Modals */}
      <TimePickerModal
        visible={showBedtimePicker}
        onClose={() => setShowBedtimePicker(false)}
        onConfirm={handleBedtimeConfirm}
        title="Select Bedtime"
        initialHour={parseTimeString(bedtime).hour}
        initialMinute={parseTimeString(bedtime).minute}
        initialPeriod={parseTimeString(bedtime).period}
      />
      
      <TimePickerModal
        visible={showWakeTimePicker}
        onClose={() => setShowWakeTimePicker(false)}
        onConfirm={handleWakeTimeConfirm}
        title="Select Wake Time"
        initialHour={parseTimeString(wakeTime).hour}
        initialMinute={parseTimeString(wakeTime).minute}
        initialPeriod={parseTimeString(wakeTime).period}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2A38',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    height: 48,
    backgroundColor: '#1E2A38',
    position: 'relative',
    marginTop: 37,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FDFDFD',
    fontFamily: 'Inter',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  titleContainer: {
    alignItems: 'center',
    paddingHorizontal: 36,
    marginBottom: 30,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FDFDFD',
    textAlign: 'center',
    lineHeight: 32,
    fontFamily: 'Inter',
  },
  formContainer: {
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    marginBottom: 12,
  },
  helpNoteContainer: {
    backgroundColor: 'rgba(183, 175, 197, 0.15)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  helpNoteText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#5A5A5A',
    lineHeight: 18,
    fontFamily: 'Inter',
    textAlign: 'center',
  },
  formField: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(30, 42, 56, 0.20)',
    minHeight: 56,
    justifyContent: 'center',
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1E2A38',
    lineHeight: 20,
    fontFamily: 'Inter',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 13,
  },
  inputWrapper: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(30, 42, 56, 0.20)',
    paddingHorizontal: 30,
    paddingVertical: 7,
    width: 96,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1E2A38',
    fontFamily: 'Inter',
    textAlign: 'center',
    width: '100%',
  },
  unitText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1E2A38',
    lineHeight: 20,
    fontFamily: 'Inter',
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1E2A38',
    lineHeight: 20,
    fontFamily: 'Inter',
  },
  rangeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
  },
  rangeConnector: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1E2A38',
    lineHeight: 20,
    fontFamily: 'Inter',
  },
  rangePreview: {
    fontSize: 12,
    fontWeight: '500',
    color: '#B7AFC5',
    fontFamily: 'Inter',
    textAlign: 'right',
    marginTop: 4,
  },
  sleeperTypeSection: {
    paddingTop: 16,
    paddingBottom: 7,
    borderBottomWidth: 0,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E2A38',
    lineHeight: 20,
    fontFamily: 'Inter',
    marginBottom: 12,
  },
  sleeperButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingLeft: 7,
  },
  sleeperButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#B7AFC5',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minWidth: 80,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  sleeperButtonSelected: {
    backgroundColor: '#B7AFC5',
    borderColor: '#B7AFC5',
  },
  sleeperButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FDFDFD',
    fontFamily: 'Inter',
    textAlign: 'center',
    lineHeight: 20,
  },
  sleeperButtonTextSelected: {
    color: '#FDFDFD',
  },
  sleeperButtonTextUnselected: {
    color: '#8B7A99',
  },
  difficultySection: {
    paddingTop: 7,
    paddingBottom: 0,
  },
  sliderContainer: {
    marginTop: 12,
  },
  sliderTouchArea: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 12,
  },
  sliderTrack: {
    height: 4,
    backgroundColor: '#B7AFC5',
    borderRadius: 9999,
    position: 'relative',
    marginBottom: 4,
  },
  sliderThumb: {
    width: 20,
    height: 20,
    backgroundColor: '#FDFDFD',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#B7AFC5',
    position: 'absolute',
    top: -8,
    marginLeft: -10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -2,
  },
  sliderLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: '#1E2A38',
    lineHeight: 16,
    fontFamily: 'Inter',
  },
  continueButton: {
    backgroundColor: '#B7AFC5',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 6,
    height: 56,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
  },
  continueText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FDFDFD',
    fontFamily: 'Inter',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    paddingTop: 2,
    alignItems: 'center',
    minHeight: 24,
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#B7AFC5',
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: 'Inter',
  },
  footer: {
    paddingHorizontal: 28,
    paddingBottom: 37,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FDFDFD',
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: 'Inter',
  },
});
