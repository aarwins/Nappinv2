import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '../utils/supabase';

const BackArrowIcon = () => (
  <Svg width={21} height={18} viewBox="0 0 21 18" fill="none">
    <Path
      d="M0.439453 7.94414C-0.146484 8.53008 -0.146484 9.48164 0.439453 10.0676L7.93945 17.5676C8.52539 18.1535 9.47695 18.1535 10.0629 17.5676C10.6488 16.9816 10.6488 16.0301 10.0629 15.4441L5.11758 10.5035H19.4988C20.3285 10.5035 20.9988 9.8332 20.9988 9.00352C20.9988 8.17383 20.3285 7.50352 19.4988 7.50352H5.12227L10.0582 2.56289C10.6441 1.97695 10.6441 1.02539 10.0582 0.439453C9.47227 -0.146484 8.5207 -0.146484 7.93477 0.439453L0.434766 7.93945L0.439453 7.94414Z"
      fill="#FDFDFD"
    />
  </Svg>
);

export default function ResetPasswordScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Read token from route params (comes from deep link or navigation)
  // Deep link format: nappin://reset-password?token=XYZ
  // React Navigation automatically parses query params into route.params
  const token = route.params?.token || route.params?.access_token || null;
  
  console.log('[ResetPasswordScreen] Route params:', route.params);
  console.log('[ResetPasswordScreen] token param:', token);

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Reset navigation stack to show OnboardingAccountEntry -> Login
  // This ensures users can't navigate back to Reset Password screen
  const handleBackToLogin = () => {
    console.log('[ResetPassword] Resetting navigation to OnboardingAccountEntry -> Login');
    navigation.reset({
      index: 1, // Set Login as the active screen (second in the stack)
      routes: [
        { name: 'OnboardingAccountEntry' }, // First route: Create Account / Log In choice screen
        { name: 'Login' }, // Second route: Log In screen (active)
      ],
    });
  };

  const handleReset = async () => {
    setError('');
    setMessage('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });

      if (updateError) {
        console.error('[ResetPassword] update error:', updateError);
        setError(updateError.message || 'Could not reset password. Please try again.');
        return;
      }

      setMessage('Password updated. You can now log in with your new password.');

      // Navigate to Login after a short delay using the same back-to-login flow
      setTimeout(() => {
        handleBackToLogin();
      }, 1200);
    } catch (err) {
      console.error('[ResetPassword] Unexpected error:', err);
      setError('Could not reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleBackToLogin}>
              <BackArrowIcon />
            </TouchableOpacity>
          </View>

          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Reset your password</Text>
            <Text style={styles.subtitle}>
              Enter a new password for your Nappin account.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* New Password Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>New password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="New password"
                  placeholderTextColor="rgba(30, 42, 56, 0.6)"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity style={styles.showButton} onPress={() => setShowPassword(!showPassword)}>
                  <Text style={styles.showButtonText}>{showPassword ? 'Hide' : 'Show'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Confirm new password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  secureTextEntry={!showConfirm}
                  value={confirm}
                  onChangeText={setConfirm}
                  placeholder="Confirm password"
                  placeholderTextColor="rgba(30, 42, 56, 0.6)"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity style={styles.showButton} onPress={() => setShowConfirm(!showConfirm)}>
                  <Text style={styles.showButtonText}>{showConfirm ? 'Hide' : 'Show'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Error Message */}
            {error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {/* Success Message */}
            {message ? (
              <View style={styles.messageContainer}>
                <Text style={styles.messageText}>{message}</Text>
              </View>
            ) : null}

            {/* Reset Button */}
            <TouchableOpacity 
              style={[
                styles.resetButton,
                loading && { opacity: 0.5 },
              ]} 
              onPress={handleReset} 
              disabled={loading}
            >
              {loading ? (
                <>
                  <ActivityIndicator color="#FDFDFD" style={{ marginRight: 8 }} />
                  <Text style={styles.resetButtonText}>Resetting...</Text>
                </>
              ) : (
                <Text style={styles.resetButtonText}>Reset Password</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2A38',
  },
  body: {
    flex: 1,
    width: 390,
    height: 844,
    backgroundColor: '#1E2A38',
    alignSelf: 'center',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    width: 342,
    height: 44,
    marginLeft: 16,
    marginTop: 37,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSection: {
    marginLeft: 24,
    marginTop: 31,
    width: 342,
  },
  title: {
    width: 290,
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    marginBottom: 11,
  },
  subtitle: {
    width: 342,
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 23,
  },
  formContainer: {
    marginLeft: 24,
    marginTop: 32,
    width: 342,
    gap: 16,
  },
  fieldContainer: {
    width: 342,
    height: 80,
    paddingTop: 4,
    gap: 11,
  },
  fieldLabel: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  passwordContainer: {
    position: 'relative',
    width: 342,
    height: 48,
  },
  passwordInput: {
    width: 342,
    height: 48,
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingRight: 58,
    fontSize: 16,
    fontFamily: 'Inter',
    color: '#1E2A38',
  },
  showButton: {
    position: 'absolute',
    right: 16,
    top: 14,
    width: 37,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  showButtonText: {
    width: 37,
    height: 20,
    color: '#1E2A38',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.3)',
  },
  errorText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FF3B30',
    fontFamily: 'Inter',
    textAlign: 'center',
    lineHeight: 20,
  },
  messageContainer: {
    backgroundColor: 'rgba(162, 232, 143, 0.1)',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(162, 232, 143, 0.3)',
  },
  messageText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#A2E88F',
    fontFamily: 'Inter',
    textAlign: 'center',
    lineHeight: 20,
  },
  resetButton: {
    width: 342,
    height: 48,
    backgroundColor: '#B7AFC5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    flexDirection: 'row',
    shadowColor: 'rgba(183, 175, 197, 0.30)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 8,
    marginTop: 8,
  },
  resetButtonText: {
    color: '#FDFDFD',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

