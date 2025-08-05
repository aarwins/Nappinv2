import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { Svg, Path, G, Defs, ClipPath } from 'react-native-svg';
import TimePickerModal from '../components/TimePickerModal';

// Back arrow icon
const BackArrowIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M0.439453 10.9441C-0.146484 11.5301 -0.146484 12.4816 0.439453 13.0676L7.93945 20.5676C8.52539 21.1535 9.47695 21.1535 10.0629 20.5676C10.6488 19.9816 10.6488 19.0301 10.0629 18.4441L5.11758 13.5035H19.4988C20.3285 13.5035 20.9988 12.8332 20.9988 12.0035C20.9988 11.1738 20.3285 10.5035 19.4988 10.5035H5.12227L10.0582 5.56289C10.6441 4.97695 10.6441 4.02539 10.0582 3.43945C9.47227 2.85352 8.5207 2.85352 7.93477 3.43945L0.434766 10.9395L0.439453 10.9441Z"
      fill="#FDFDFD"
    />
  </Svg>
);

// Pencil/Edit icon
const EditIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <G clipPath="url(#clip0_292_31)">
      <Path
        d="M14.4247 8.12114L14.8219 7.72388L13.6301 6.53208L11.4469 4.34888L10.2551 3.15708L9.85787 3.55435L9.06334 4.34888L2.06021 11.352C1.69459 11.7176 1.4274 12.1711 1.27974 12.6668L0.0352121 16.8997C-0.0526785 17.195 0.0281808 17.5149 0.249665 17.7329C0.47115 17.9508 0.787556 18.0317 1.08287 17.9473L5.31217 16.7028C5.80787 16.5551 6.26138 16.2879 6.62701 15.9223L13.6301 8.91919L14.4247 8.12114ZM5.62506 14.0415L5.30513 14.8395C5.16451 14.9485 5.00631 15.0293 4.83756 15.0821L2.08834 15.8907L2.89693 13.145C2.94615 12.9727 3.03052 12.8145 3.13951 12.6774L3.93756 12.3575V13.4825C3.93756 13.7918 4.19068 14.045 4.50006 14.045H5.62506V14.0415ZM12.7512 0.657471L12.245 1.16724L11.4504 1.96177L11.0497 2.35903L12.2415 3.55083L14.4247 5.73403L15.6165 6.92583L16.0137 6.52856L16.8083 5.73403L17.318 5.22427C18.1969 4.34536 18.1969 2.92153 17.318 2.04263L15.9364 0.657471C15.0575 -0.221436 13.6336 -0.221436 12.7547 0.657471H12.7512ZM11.0848 6.56372L6.02232 11.6262C5.80435 11.8442 5.44576 11.8442 5.22779 11.6262C5.00982 11.4083 5.00982 11.0497 5.22779 10.8317L10.2903 5.76919C10.5083 5.55122 10.8669 5.55122 11.0848 5.76919C11.3028 5.98716 11.3028 6.34575 11.0848 6.56372Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_292_31">
        <Path d="M0 0H18V18H0V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Navigation icons
const HomeIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M10 2.5L2.5 8.75V17.5C2.5 17.8315 2.6317 18.1495 2.86612 18.3839C3.10054 18.6183 3.41848 18.75 3.75 18.75H7.5V13.75C7.5 13.4185 7.6317 13.1005 7.86612 12.8661C8.10054 12.6317 8.41848 12.5 8.75 12.5H11.25C11.5815 12.5 11.8995 12.6317 12.1339 12.8661C12.3683 13.1005 12.5 13.4185 12.5 13.75V18.75H16.25C16.5815 18.75 16.8995 18.6183 17.1339 18.3839C17.3683 18.1495 17.5 17.8315 17.5 17.5V8.75L10 2.5Z"
      fill="#FDFDFD"
      fillOpacity="0.6"
    />
  </Svg>
);

const HistoryIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <G clipPath="url(#clip0_293_363)">
      <Path
        d="M18.125 10C18.125 12.1549 17.269 14.2215 15.7452 15.7452C14.2215 17.269 12.1549 18.125 10 18.125C7.84512 18.125 5.77849 17.269 4.25476 15.7452C2.73102 14.2215 1.875 12.1549 1.875 10C1.875 7.84512 2.73102 5.77849 4.25476 4.25476C5.77849 2.73102 7.84512 1.875 10 1.875C12.1549 1.875 14.2215 2.73102 15.7452 4.25476C17.269 5.77849 18.125 7.84512 18.125 10ZM0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C4.8043 18.9464 7.34784 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 7.34784 18.9464 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10ZM9.0625 4.6875V10C9.0625 10.3125 9.21875 10.6055 9.48047 10.7812L13.2305 13.2812C13.6602 13.5703 14.2422 13.4531 14.5312 13.0195C14.8203 12.5859 14.7031 12.0078 14.2695 11.7188L10.9375 9.5V4.6875C10.9375 4.16797 10.5195 3.75 10 3.75C9.48047 3.75 9.0625 4.16797 9.0625 4.6875Z"
        fill="#FDFDFD"
        fillOpacity="0.6"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_293_363">
        <Path d="M0 0H20V20H0V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

const FeaturesIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path d="M10 0L12.5 7.5H20L14.5 12L16.5 20L10 15L3.5 20L5.5 12L0 7.5H7.5L10 0Z" fill="#B7AFC5" />
  </Svg>
);

const ProfileIcon = () => (
  <Svg width={18} height={20} viewBox="0 0 18 20" fill="none">
    <G clipPath="url(#clip0_293_371)">
      <Path
        d="M12.0938 5C12.0938 4.1712 11.7645 3.37634 11.1785 2.79029C10.5924 2.20424 9.79755 1.875 8.96875 1.875C8.13995 1.875 7.34509 2.20424 6.75904 2.79029C6.17299 3.37634 5.84375 4.1712 5.84375 5C5.84375 5.8288 6.17299 6.62366 6.75904 7.20971C7.34509 7.79576 8.13995 8.125 8.96875 8.125C9.79755 8.125 10.5924 7.79576 11.1785 7.20971C11.7645 6.62366 12.0938 5.8288 12.0938 5ZM3.96875 5C3.96875 3.67392 4.49553 2.40215 5.43322 1.46447C6.3709 0.526784 7.64267 0 8.96875 0C10.2948 0 11.5666 0.526784 12.5043 1.46447C13.442 2.40215 13.9688 3.67392 13.9688 5C13.9688 6.32608 13.442 7.59785 12.5043 8.53553C11.5666 9.47322 10.2948 10 8.96875 10C7.64267 10 6.3709 9.47322 5.43322 8.53553C4.49553 7.59785 3.96875 6.32608 3.96875 5ZM2.14453 18.125H15.793C15.4453 15.6523 13.3203 13.75 10.7539 13.75H7.18359C4.61719 13.75 2.49219 15.6523 2.14453 18.125ZM0.21875 18.8398C0.21875 14.9922 3.33594 11.875 7.18359 11.875H10.7539C14.6016 11.875 17.7188 14.9922 17.7188 18.8398C17.7188 19.4805 17.1992 20 16.5586 20H1.37891C0.738281 20 0.21875 19.4805 0.21875 18.8398Z"
        fill="#FDFDFD"
        fillOpacity="0.6"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_293_371">
        <Path d="M0.21875 0H17.7188V20H0.21875V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

export default function NewJournalEntryScreen({ navigation }) {
  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  };

  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [selectedTime, setSelectedTime] = useState(getCurrentTime());

  const [journalText, setJournalText] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleBack = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleTimeSelect = (timeString) => {
    setSelectedTime(timeString);
  };



  const handleSave = () => {
    // Only save if there's some text content
    if (!journalText.trim()) {
      Alert.alert('Empty Entry', 'Please write something in your journal entry before saving.');
      return;
    }

    // Create new journal entry
    const newEntry = {
      id: Date.now(), // Simple ID based on timestamp
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: selectedTime,
      preview: journalText.trim().substring(0, 100) + (journalText.trim().length > 100 ? '...' : ''), // First 100 chars as preview
      fullText: journalText.trim()
    };

    console.log('💾 Saving journal entry:', newEntry);

    // Navigate immediately to journal screen with the new entry
    if (navigation) {
      navigation.navigate('Journal', { newEntry });
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <BackArrowIcon />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>New Journal Entry</Text>
          </View>

      {/* Date/Time Section */}
      <View style={styles.dateTimeSection}>
        <View style={styles.dateRow}>
          <Text style={styles.dateText}>{selectedDate}</Text>
        </View>
        <View style={styles.timeRow}>
          <Text style={styles.timeText}>{selectedTime}</Text>
        </View>
      </View>



      {/* Text Input Section */}
      <View style={styles.textInputSection}>
        <TextInput
          style={styles.textInput}
          placeholder="How did you feel before and after?"
          placeholderTextColor="#ADAEBC"
          multiline
          textAlignVertical="top"
          value={journalText}
          onChangeText={setJournalText}
          maxLength={500}
        />
      </View>

      {/* Save Button */}
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
        </View>
      </TouchableWithoutFeedback>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <View style={styles.navContainer}>
          <TouchableOpacity style={styles.navButton} onPress={handleHomePress}>
            <HomeIcon />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={handleHistoryPress}>
            <HistoryIcon />
            <Text style={styles.navText}>History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={handleFeaturesPress}>
            <View style={styles.featuresIcon}>
              <FeaturesIcon />
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
        visible={showTimePicker}
        onClose={() => setShowTimePicker(false)}
        onConfirm={handleTimeSelect}
        title="Select Time"
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
    paddingBottom: 81,
  },
  content: {
    flex: 1,
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
    width: 24,
    height: 24,
    justifyContent: 'center', 
    alignItems: 'center',
    zIndex: 1,
  },
  headerTitle: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28,
    textAlign: 'center',
    flex: 1,
  },
  dateTimeSection: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 12,
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    height: 100,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateText: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },

  textInputSection: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    height: 259,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  textInput: {
    height: 227,
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    textAlignVertical: 'top',
  },
  saveButtonContainer: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  saveButton: {
    height: 56,
    backgroundColor: '#B7AFC5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  bottomNavigation: {
    backgroundColor: '#1E2A38',
    borderTopWidth: 1,
    borderTopColor: 'rgba(229, 232, 236, 0.20)',
    paddingVertical: 8,
    position: 'absolute',
    bottom: 6,
    left: 0,
    right: 0,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    gap: 4,
  },
  featuresIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    color: 'rgba(253, 253, 253, 0.60)',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
  },
  navTextActive: {
    color: '#B7AFC5',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
  },
});
