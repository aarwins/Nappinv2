import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

const TimePickerModal = ({ 
  visible, 
  onClose, 
  onConfirm, 
  title = "Select Time",
  initialHour = 10,
  initialMinute = 30,
  initialPeriod = "PM"
}) => {
  const [selectedHour, setSelectedHour] = useState(initialHour);
  const [selectedMinute, setSelectedMinute] = useState(initialMinute);
  const [selectedPeriod, setSelectedPeriod] = useState(initialPeriod);

  // Create time options
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 60 }, (_, i) => i); // All minutes 0-59
  const periods = ['AM', 'PM'];

  const hourScrollRef = useRef(null);
  const minuteScrollRef = useRef(null);
  const periodScrollRef = useRef(null);

  // Handle scroll selection for each picker
  const handleHourScroll = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / 50);
    const hour = hours[Math.max(0, Math.min(index, hours.length - 1))];
    if (hour && hour !== selectedHour) {
      setSelectedHour(hour);
    }
  };

  const handleMinuteScroll = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / 50);
    const minute = minutes[Math.max(0, Math.min(index, minutes.length - 1))];
    if (minute !== undefined && minute !== selectedMinute) {
      setSelectedMinute(minute);
    }
  };

  const handlePeriodScroll = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / 50);
    const period = periods[Math.max(0, Math.min(index, periods.length - 1))];
    if (period && period !== selectedPeriod) {
      setSelectedPeriod(period);
    }
  };

  const handleConfirm = () => {
    const timeString = `${selectedHour}:${selectedMinute.toString().padStart(2, '0')} ${selectedPeriod}`;
    onConfirm(timeString, selectedHour, selectedMinute, selectedPeriod);
    onClose();
  };

  // Initialize scroll positions when modal opens
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        // Set scroll positions based on initial values
        const hourIndex = hours.indexOf(initialHour);
        const minuteIndex = minutes.indexOf(initialMinute);
        const periodIndex = periods.indexOf(initialPeriod);

        if (hourScrollRef.current && hourIndex >= 0) {
          hourScrollRef.current.scrollTo({ y: hourIndex * 50, animated: false });
        }
        if (minuteScrollRef.current && minuteIndex >= 0) {
          minuteScrollRef.current.scrollTo({ y: minuteIndex * 50, animated: false });
        }
        if (periodScrollRef.current && periodIndex >= 0) {
          periodScrollRef.current.scrollTo({ y: periodIndex * 50, animated: false });
        }
      }, 100);
    }
  }, [visible, initialHour, initialMinute, initialPeriod]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={onClose}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity
              onPress={handleConfirm}
              style={styles.button}
            >
              <Text style={[styles.buttonText, styles.confirmText]}>Done</Text>
            </TouchableOpacity>
          </View>
          
          {/* Custom Time Picker Wheels */}
          <View style={styles.pickerContainer}>
            <View style={styles.pickerSelectionOverlay} />
            
            {/* Hour Picker */}
            <View style={styles.pickerColumn}>
              <ScrollView
                ref={hourScrollRef}
                style={styles.pickerScroll}
                showsVerticalScrollIndicator={false}
                snapToInterval={50}
                decelerationRate="fast"
                onMomentumScrollEnd={handleHourScroll}
                contentContainerStyle={styles.pickerScrollContent}
              >
                <View style={styles.pickerPadding} />
                {hours.map((hour) => (
                  <View key={hour} style={styles.pickerItem}>
                    <Text style={[
                      styles.pickerItemText,
                      hour === selectedHour && styles.pickerItemTextSelected
                    ]}>
                      {hour}
                    </Text>
                  </View>
                ))}
                <View style={styles.pickerPadding} />
              </ScrollView>
            </View>

            {/* Minute Picker */}
            <View style={styles.pickerColumn}>
              <ScrollView
                ref={minuteScrollRef}
                style={styles.pickerScroll}
                showsVerticalScrollIndicator={false}
                snapToInterval={50}
                decelerationRate="fast"
                onMomentumScrollEnd={handleMinuteScroll}
                contentContainerStyle={styles.pickerScrollContent}
              >
                <View style={styles.pickerPadding} />
                {minutes.map((minute) => (
                  <View key={minute} style={styles.pickerItem}>
                    <Text style={[
                      styles.pickerItemText,
                      minute === selectedMinute && styles.pickerItemTextSelected
                    ]}>
                      {minute.toString().padStart(2, '0')}
                    </Text>
                  </View>
                ))}
                <View style={styles.pickerPadding} />
              </ScrollView>
            </View>

            {/* Period Picker */}
            <View style={styles.pickerColumn}>
              <ScrollView
                ref={periodScrollRef}
                style={styles.pickerScroll}
                showsVerticalScrollIndicator={false}
                snapToInterval={50}
                decelerationRate="fast"
                onMomentumScrollEnd={handlePeriodScroll}
                contentContainerStyle={styles.pickerScrollContent}
              >
                <View style={styles.pickerPadding} />
                {periods.map((period) => (
                  <View key={period} style={styles.pickerItem}>
                    <Text style={[
                      styles.pickerItemText,
                      period === selectedPeriod && styles.pickerItemTextSelected
                    ]}>
                      {period}
                    </Text>
                  </View>
                ))}
                <View style={styles.pickerPadding} />
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '85%',
    maxWidth: 350,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  button: {
    padding: 5,
    minWidth: 60,
  },
  buttonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  confirmText: {
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E2A38',
  },
  pickerContainer: {
    flexDirection: 'row',
    height: 200,
    position: 'relative',
    marginTop: 20,
  },
  pickerSelectionOverlay: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    marginTop: -25,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.3)',
    zIndex: 1,
  },
  pickerColumn: {
    flex: 1,
    height: 200,
  },
  pickerScroll: {
    height: 200,
  },
  pickerScrollContent: {
    paddingVertical: 0,
  },
  pickerPadding: {
    height: 75,
  },
  pickerItem: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerItemText: {
    fontSize: 20,
    color: '#8E9AAF',
    fontWeight: '400',
  },
  pickerItemTextSelected: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default TimePickerModal;