import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from 'react-native';
import { Svg, Path } from 'react-native-svg';
import TimePickerModal from '../components/TimePickerModal';
const userPersonalization = require('../utils/userPersonalization');

const BackArrowIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M0.439453 10.9441C-0.146484 11.5301 -0.146484 12.4816 0.439453 13.0676L7.93945 20.5676C8.52539 21.1535 9.47695 21.1535 10.0629 20.5676C10.6488 19.9816 10.6488 19.0301 10.0629 18.4441L5.11758 13.5035H19.4988C20.3285 13.5035 20.9988 12.8332 20.9988 12.0035C20.9988 11.1738 20.3285 10.5035 19.4988 10.5035H5.12227L10.0582 5.56289C10.6441 4.97695 10.6441 4.02539 10.0582 3.43945C9.47227 2.85352 8.5207 2.85352 7.93477 3.43945L0.434766 10.9395L0.439453 10.9441Z"
      fill="#FDFDFD"
    />
  </Svg>
);

const StudentIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    {/* Graduation cap base - larger */}
    <Path
      d="M1 11L12 5L23 11L12 17L1 11Z"
      fill="#1E2A38"
    />
    {/* Graduation cap square top - larger */}
    <Path
      d="M6 13V19C6 20.5 8.5 22 12 22C15.5 22 18 20.5 18 19V13"
      stroke="#1E2A38"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
  </Svg>
);

const JobIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    {/* Briefcase body */}
    <Path
      d="M20 7H16V5C16 3.9 15.1 3 14 3H10C8.9 3 8 3.9 8 5V7H4C2.9 7 2 7.9 2 9V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V9C22 7.9 21.1 7 20 7Z"
      stroke="#1E2A38"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Handle */}
    <Path
      d="M10 5H14V7H10V5Z"
      stroke="#1E2A38"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Lock */}
    <Path
      d="M12 12V16"
      stroke="#1E2A38"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </Svg>
);

const ShiftWorkerIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    {/* Clock circle */}
    <Path
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
      stroke="#1E2A38"
      strokeWidth="2.5"
      fill="none"
    />
    {/* Clock hands */}
    <Path
      d="M12 7V13L16.25 16.15"
      stroke="#1E2A38"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

const RemoteWorkerIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 15H2.5C1.67157 15 1 15.6716 1 16.5C1 17.3284 1.67157 18 2.5 18H21.5C22.3284 18 23 17.3284 23 16.5C23 15.6716 22.3284 15 21.5 15H21M3 15H21M3 15V6.2002C3 5.08009 3 4.51962 3.21799 4.0918C3.40973 3.71547 3.71547 3.40973 4.0918 3.21799C4.51962 3 5.08009 3 6.2002 3H17.8002C18.9203 3 19.4796 3 19.9074 3.21799C20.2837 3.40973 20.5905 3.71547 20.7822 4.0918C21 4.5192 21 5.07899 21 6.19691V15"
      stroke="#1E2A38"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const OtherIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    {/* Info circle */}
    <Path
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
      stroke="#1E2A38"
      strokeWidth="2.5"
      fill="none"
    />
    {/* Info dot */}
    <Path
      d="M12 8V8.01"
      stroke="#1E2A38"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Info line */}
    <Path
      d="M12 12V16"
      stroke="#1E2A38"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </Svg>
);

const scheduleOptions = [
  {
    id: 1,
    title: 'Full-time student',
    icon: <StudentIcon />,
  },
  {
    id: 2,
    title: '9-5 Job',
    icon: <JobIcon />,
  },
  {
    id: 3,
    title: 'Shift worker (night/evening)',
    icon: <ShiftWorkerIcon />,
  },
  {
    id: 4,
    title: 'Remote or flexible worker',
    icon: <RemoteWorkerIcon />,
  },
  {
    id: 5,
    title: 'Other / Not working',
    icon: <OtherIcon />,
  },
];

export default function DailyScheduleScreen({ navigation }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showBreakTimePopup, setShowBreakTimePopup] = useState(false);
  const [showTimePickerModal, setShowTimePickerModal] = useState(false);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [breakTime, setBreakTime] = useState('12:00 PM');

  const handleOptionSelect = (optionId) => {
    // Check if this is the 9-5 Job option (id: 2)
    if (optionId === 2) {
      // First, handle the selection/deselection immediately
      setSelectedOptions(prev => {
        if (prev.includes(optionId)) {
          // If already selected, remove it (deselect)
          return prev.filter(id => id !== optionId);
        } else {
          // If not selected, add it (select) and show popup
          setShowBreakTimePopup(true);
          return [...prev, optionId];
        }
      });
      return;
    }

    setSelectedOptions(prev => {
      if (prev.includes(optionId)) {
        // Remove if already selected
        return prev.filter(id => id !== optionId);
      } else {
        // Add if not selected
        return [...prev, optionId];
      }
    });
  };

  // Handle break time popup responses
  const handleBreakTimeYes = () => {
    setShowBreakTimePopup(false);
    setShowTimePickerModal(true);
  };

  const handleBreakTimeNo = () => {
    setShowBreakTimePopup(false);
    // Option is already selected, no need to modify selection
  };

  const handleTimePickerConfirm = (timeString, hour, minute, period) => {
    setBreakTime(timeString);
    setShowTimePickerModal(false);
    
    // Save break time preference
    userPersonalization.setBreakTime(timeString);
    console.log('Break time saved:', timeString);
    
    // Show confirmation popup
    setShowConfirmationPopup(true);
  };

  const handleConfirmationClose = () => {
    setShowConfirmationPopup(false);
    // Option is already selected, no need to modify selection
  };

  const handleTimePickerClose = () => {
    setShowTimePickerModal(false);
  };

  const handleContinue = async () => {
    if (selectedOptions.length > 0) {
      try {
        // Map schedule IDs to simplified schedule names for easier matching
        const scheduleNames = selectedOptions.map(id => {
          const schedule = scheduleOptions.find(option => option.id === id);
          // Simplify schedule names for better algorithm matching
          if (schedule?.title.toLowerCase().includes('9') && schedule?.title.toLowerCase().includes('5')) return '9to5';
          if (schedule?.title.toLowerCase().includes('traditional')) return 'traditional';
          if (schedule?.title.toLowerCase().includes('night') && schedule?.title.toLowerCase().includes('shift')) return 'night_shift';
          if (schedule?.title.toLowerCase().includes('flexible')) return 'flexible';
          if (schedule?.title.toLowerCase().includes('student')) return 'student';
          if (schedule?.title.toLowerCase().includes('other') || schedule?.title.toLowerCase().includes('not working')) return 'other_not_working';
          return schedule?.title.toLowerCase().replace(/[\s&-]+/g, '_');
        });

        // Save all selected schedules, with first as primary
        const primarySchedule = scheduleNames[0];
        userPersonalization.setDailySchedule(scheduleNames); // Save array instead of single value
        console.log('Daily schedules saved:', scheduleNames, 'Primary:', primarySchedule);

        // Navigate to next screen after calculation completes
        navigation.navigate('OnboardingAccountEntry');
      } catch (err) {
        console.error('[DailySchedule] Failed to set schedule:', err);
        // Still navigate even if calculation fails to prevent blocking user
        navigation.navigate('OnboardingAccountEntry');
      }
    }
  };



  const handleBack = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <BackArrowIcon />
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>What's your daily schedule?</Text>
          <Text style={styles.subtitle}>
            We'll tailor nap timing to your lifestyle and routine.
          </Text>
        </View>

        {/* Schedule Options */}
        <View style={styles.optionsContainer}>
          {scheduleOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionCard,
                selectedOptions.includes(option.id) && styles.selectedCard,
              ]}
              onPress={() => handleOptionSelect(option.id)}
            >
              <View style={styles.iconContainer}>
                {option.icon}
              </View>
              <Text style={styles.optionText}>{option.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[
            styles.continueButton,
            selectedOptions.length > 0 && styles.continueButtonEnabled,
          ]}
          onPress={handleContinue}
          disabled={selectedOptions.length === 0}
        >
          <Text style={styles.continueText}>Continue 5/5</Text>
        </TouchableOpacity>

        {/* Break Time Popup Modal */}
        <Modal
          visible={showBreakTimePopup}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowBreakTimePopup(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.popupContainer}>
              <Text style={styles.popupTitle}>Break Time Napping</Text>
              <Text style={styles.popupMessage}>
                Do you plan on napping during your breaks at work?
              </Text>
              
              <View style={styles.popupButtonContainer}>
                <TouchableOpacity
                  style={[styles.popupButton, styles.popupButtonNo]}
                  onPress={handleBreakTimeNo}
                >
                  <Text style={styles.popupButtonTextNo}>No</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.popupButton, styles.popupButtonYes]}
                  onPress={handleBreakTimeYes}
                >
                  <Text style={styles.popupButtonTextYes}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Time Picker Modal */}
        <TimePickerModal
          visible={showTimePickerModal}
          onClose={handleTimePickerClose}
          onConfirm={handleTimePickerConfirm}
          title="Select Break Time"
          initialHour={12}
          initialMinute={0}
          initialPeriod="PM"
        />

        {/* Confirmation Popup Modal */}
        <Modal
          visible={showConfirmationPopup}
          transparent={true}
          animationType="fade"
          onRequestClose={handleConfirmationClose}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.confirmationContainer}>
              <Text style={styles.confirmationTitle}>Perfect! 🎯</Text>
              <Text style={styles.confirmationMessage}>
                We'll use your break time at {breakTime} to personalize your nap recommendations and create the perfect schedule just for you.
              </Text>
              
              <TouchableOpacity
                style={styles.confirmationButton}
                onPress={handleConfirmationClose}
              >
                <Text style={styles.confirmationButtonText}>Got it!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>
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
    paddingHorizontal: 24,
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
    alignItems: 'center',
    marginTop: 48,
    marginBottom: 34,
    paddingHorizontal: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FDFDFD',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 14,
    fontFamily: 'Inter',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '400',
    color: '#FDFDFD',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Inter',
  },
  optionsContainer: {
    flex: 1,
    gap: 16,
    maxHeight: 324,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E8EC',
    borderRadius: 16,
    padding: 16,
    height: 52,
  },
  selectedCard: {
    backgroundColor: '#B7AFC5',
  },
  iconContainer: {
    width: 32,
    height: 24,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginRight: 12,
    backgroundColor: 'transparent',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E2A38',
    fontFamily: 'Inter',
    flex: 1,
  },
  continueButton: {
    backgroundColor: '#B7AFC5',
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    marginTop: 16,
    marginHorizontal: -16,
    shadowColor: '#B7AFC5',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 8,
  },
  continueButtonEnabled: {
    backgroundColor: '#B7AFC5',
  },
  continueText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E5E8EC',
    fontFamily: 'Inter',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    backgroundColor: '#FDFDFD',
    borderRadius: 20,
    padding: 24,
    width: '85%',
    maxWidth: 350,
    alignItems: 'center',
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E2A38',
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'Inter',
  },
  popupMessage: {
    fontSize: 16,
    fontWeight: '400',
    color: '#1E2A38',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
    fontFamily: 'Inter',
  },
  popupButtonContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  popupButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  popupButtonNo: {
    backgroundColor: '#E5E8EC',
  },
  popupButtonYes: {
    backgroundColor: '#B7AFC5',
  },
  popupButtonTextNo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E2A38',
    fontFamily: 'Inter',
  },
  popupButtonTextYes: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FDFDFD',
    fontFamily: 'Inter',
  },
  // Confirmation popup styles
  confirmationContainer: {
    backgroundColor: '#FDFDFD',
    borderRadius: 20,
    padding: 28,
    width: '85%',
    maxWidth: 350,
    alignItems: 'center',
  },
  confirmationTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E2A38',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Inter',
  },
  confirmationMessage: {
    fontSize: 16,
    fontWeight: '400',
    color: '#1E2A38',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
    fontFamily: 'Inter',
  },
  confirmationButton: {
    backgroundColor: '#B7AFC5',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#B7AFC5',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmationButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FDFDFD',
    fontFamily: 'Inter',
  },

});
