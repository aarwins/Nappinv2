import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Svg, Path, G, Defs, ClipPath } from 'react-native-svg';
import { usePersonalization } from '../components/PersonalizationProvider';
import { supabase } from '../utils/supabase';

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
  const { userName, userEmail, updateUserName } = usePersonalization();
  const [displayName, setDisplayName] = useState(userName || '');
  const [isValid, setIsValid] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch current user from Supabase to get initial display name
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          console.warn('[EditDisplayName] getUser error:', error);
        } else {
          setCurrentUser(data?.user ?? null);
          // Initialize with current user's display name from Supabase
          const userDisplayName =
            data?.user?.user_metadata?.full_name ||
            data?.user?.user_metadata?.name ||
            data?.user?.user_metadata?.display_name ||
            userName ||
            '';
          setDisplayName(userDisplayName);
        }
      } catch (err) {
        console.error('[EditDisplayName] Unexpected getUser error:', err);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    // Validate name length (2-30 characters)
    const isValidLength = displayName.trim().length >= 2 && displayName.trim().length <= 30;
    setIsValid(isValidLength);
  }, [displayName]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSave = async () => {
    const trimmed = displayName.trim();

    if (trimmed.length < 2 || trimmed.length > 30) {
      Alert.alert('Invalid Name', 'Display name must be between 2 and 30 characters.');
      return;
    }

    if (!currentUser?.id) {
      Alert.alert('Error', 'No user is logged in.');
      return;
    }

    setIsSaving(true);

    try {
      // Update in Supabase user metadata
      const { data, error } = await supabase.auth.updateUser({
        data: {
          display_name: trimmed,
          full_name: trimmed, // Also update full_name for backwards compatibility
        },
      });

      if (error) {
        console.error('[EditDisplayName] Error updating display name:', error);
        Alert.alert('Error', 'Could not update your name. Please try again.');
        return;
      }

      // Update local state for backwards compatibility
      if (updateUserName) {
        await updateUserName(trimmed);
      }

      // Show success message and navigate back
      Alert.alert('Success', 'Display name updated successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (err) {
      console.error('[EditDisplayName] Unexpected error:', err);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const currentDisplayName =
    currentUser?.user_metadata?.full_name ||
    currentUser?.user_metadata?.name ||
    currentUser?.user_metadata?.display_name ||
    userName ||
    '';

  const isSaveEnabled = isValid && displayName.trim().length >= 2 && displayName.trim() !== currentDisplayName && !isSaving;

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
          style={[styles.saveButton, (!isSaveEnabled || isSaving) && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={!isSaveEnabled || isSaving}
        >
          {isSaving ? (
            <>
              <ActivityIndicator color="#FDFDFD" style={{ marginRight: 8 }} />
              <Text style={styles.saveButtonText}>Saving…</Text>
            </>
          ) : (
            <Text style={[styles.saveButtonText, !isSaveEnabled && styles.saveButtonTextDisabled]}>
              Save
            </Text>
          )}
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
    flexDirection: 'row',
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
