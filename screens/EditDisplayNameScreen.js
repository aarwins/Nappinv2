import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { Svg, Path, G, Defs, ClipPath } from 'react-native-svg';
import { usePersonalization } from '../components/PersonalizationProvider';

// Back arrow icon for header
const BackArrowIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M0.439453 10.9441C-0.146484 11.5301 -0.146484 12.4816 0.439453 13.0676L7.93945 20.5676C8.52539 21.1535 9.47695 21.1535 10.0629 20.5676C10.6488 19.9816 10.6488 19.0301 10.0629 18.4441L5.11758 13.5035H19.4988C20.3285 13.5035 20.9988 12.8332 20.9988 12.0035C20.9988 11.1738 20.3285 10.5035 19.4988 10.5035H5.12227L10.0582 5.56289C10.6441 4.97695 10.6441 4.02539 10.0582 3.43945C9.47227 2.85352 8.5207 2.85352 7.93477 3.43945L0.434766 10.9395L0.439453 10.9441Z"
      fill="#FDFDFD"
    />
  </Svg>
);

export default function EditDisplayNameScreen({ navigation }) {
  const { userName, userEmail, updateUserInfo, updateUserName } = usePersonalization();
  const [displayName, setDisplayName] = useState(userName || '');
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    // Initialize with current user name
    setDisplayName(userName || '');
  }, [userName]);

  useEffect(() => {
    // Validate name length (2-30 characters)
    const isValidLength = displayName.trim().length >= 2 && displayName.trim().length <= 30;
    setIsValid(isValidLength);
  }, [displayName]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSave = async () => {
    const trimmedName = displayName.trim();
    
    if (trimmedName.length < 2 || trimmedName.length > 30) {
      Alert.alert('Invalid Name', 'Display name must be 2–30 characters.');
      return;
    }

    try {
      await updateUserName(trimmedName);
      // Show success message briefly, then navigate back
      Alert.alert('Success', 'Display name updated successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to update display name. Please try again.');
      console.error('Error updating display name:', error);
    }
  };

  const isSaveEnabled = isValid && displayName.trim().length >= 2 && displayName.trim() !== userName;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <BackArrowIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Name</Text>
        </View>

        {/* Form Container */}
        <View style={styles.formContainer}>
          {/* Label */}
          <Text style={styles.label}>Display Name</Text>
          
          {/* Input Field */}
          <View style={[styles.inputContainer, !isValid && styles.inputContainerError]}>
            <TextInput
              style={styles.input}
              value={displayName}
              onChangeText={setDisplayName}
              placeholder="Name"
              placeholderTextColor="#ADAEBC"
              maxLength={30}
              autoFocus
              returnKeyType="done"
              onSubmitEditing={handleSave}
            />
          </View>
          
          {/* Helper Text */}
          <Text style={styles.helperText}>Must be 2–30 characters.</Text>
        </View>

        {/* Save Button */}
        <TouchableOpacity 
          style={[styles.saveButton, !isSaveEnabled && styles.saveButtonDisabled]} 
          onPress={handleSave}
          disabled={!isSaveEnabled}
        >
          <Text style={[styles.saveButtonText, !isSaveEnabled && styles.saveButtonTextDisabled]}>
            Save
          </Text>
        </TouchableOpacity>
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
    paddingTop: 48,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 48,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
  },
  formContainer: {
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 12,
    height: 140,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 8,
  },
  inputContainer: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#1E2A38',
    backgroundColor: '#FFF',
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  inputContainerError: {
    borderColor: '#EF4444',
  },
  input: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    height: 56,
    padding: 0,
  },
  helperText: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    opacity: 0.6,
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: '#B7AFC5',
    borderRadius: 12,
    height: 56,
    marginHorizontal: 16,
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: 'rgba(183, 175, 197, 0.5)',
  },
  saveButtonText: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  saveButtonTextDisabled: {
    color: 'rgba(253, 253, 253, 0.7)',
  },
});
