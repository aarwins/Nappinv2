import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { signUpWithEmail } from '../services/authService';

const BackArrowIcon = () => (
  <Svg width={21} height={18} viewBox="0 0 21 18" fill="none">
    <Path
      d="M0.439453 7.94414C-0.146484 8.53008 -0.146484 9.48164 0.439453 10.0676L7.93945 17.5676C8.52539 18.1535 9.47695 18.1535 10.0629 17.5676C10.6488 16.9816 10.6488 16.0301 10.0629 15.4441L5.11758 10.5035H19.4988C20.3285 10.5035 20.9988 9.8332 20.9988 9.00352C20.9988 8.17383 20.3285 7.50352 19.4988 7.50352H5.12227L10.0582 2.56289C10.6441 1.97695 10.6441 1.02539 10.0582 0.439453C9.47227 -0.146484 8.5207 -0.146484 7.93477 0.439453L0.434766 7.93945L0.439453 7.94414Z"
      fill="#FDFDFD"
    />
  </Svg>
);

export default function EmailSignUpScreen({ navigation, route }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const handleBack = () => {
    if (navigation) {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate('CreateAccount');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const toggleConfirmVisibility = () => {
    setIsConfirmVisible((prev) => !prev);
  };

  const goToPostSignupFlow = () => {
    if (!navigation || !navigation.navigate) return;
    const fromOnboarding = route?.params?.fromOnboarding;
    if (fromOnboarding) {
      navigation.navigate('TrialOffer');
    } else {
      navigation.navigate('OnboardingAccountEntry');
    }
  };

  const handleEmailSignUp = async () => {
    if (isSubmitting) return;
    
    // Clear previous errors
    setPasswordError('');
    setConfirmPasswordError('');
    setGeneralError('');

    const trimmedEmail = email.trim();

    let hasError = false;

    if (!trimmedEmail) {
      setGeneralError('Please enter your email.');
      hasError = true;
    }

    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      hasError = true;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password.');
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords don't match.");
      hasError = true;
    }

    // If validation failed, do not hit Supabase
    if (hasError) {
      return;
    }

    try {
      setIsSubmitting(true);
      const { error } = await signUpWithEmail(trimmedEmail, password);

      if (error) {
        console.error('[Auth] Sign up error', error);
        setGeneralError(error.message ?? 'Could not create account. Please try again.');
        return;
      }

      // SUCCESS: navigate using shared post-signup flow
      goToPostSignupFlow();
    } catch (err) {
      console.error('[EmailSignUp] Unexpected error:', err);
      setGeneralError('Something went wrong creating your account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogIn = () => {
    if (navigation) {
      navigation.navigate('Login');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <BackArrowIcon />
            </TouchableOpacity>
          </View>

          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Create your account</Text>
            <Text style={styles.subtitle}>
              Use your email and password to create a Nappin account.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* Email Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (generalError) setGeneralError('');
                }}
                placeholder=""
                placeholderTextColor="rgba(30, 42, 56, 0.6)"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Password Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (passwordError) setPasswordError('');
                    if (generalError) setGeneralError('');
                  }}
                  placeholder=""
                  placeholderTextColor="rgba(30, 42, 56, 0.6)"
                  secureTextEntry={!isPasswordVisible}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity style={styles.showButton} onPress={togglePasswordVisibility}>
                  <Text style={styles.showButtonText}>
                    {isPasswordVisible ? 'Hide' : 'Show'}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.passwordHint}>Password must be 6+ characters</Text>
              {passwordError ? (
                <Text style={styles.fieldErrorText}>{passwordError}</Text>
              ) : null}
            </View>

            {/* Confirm Password Field */}
            <View style={[styles.fieldContainer, { marginTop: 20 }]}>
              <Text style={styles.fieldLabel}>Confirm password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    if (confirmPasswordError) setConfirmPasswordError('');
                    if (generalError) setGeneralError('');
                  }}
                  placeholder=""
                  placeholderTextColor="rgba(30, 42, 56, 0.6)"
                  secureTextEntry={!isConfirmVisible}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity style={styles.showButton} onPress={toggleConfirmVisibility}>
                  <Text style={styles.showButtonText}>
                    {isConfirmVisible ? 'Hide' : 'Show'}
                  </Text>
                </TouchableOpacity>
              </View>
              {confirmPasswordError ? (
                <Text style={styles.fieldErrorText}>{confirmPasswordError}</Text>
              ) : null}
            </View>

            {/* Create Account Button */}
            <TouchableOpacity
              style={[
                styles.createAccountButton,
                isSubmitting && { opacity: 0.5 },
              ]}
              onPress={handleEmailSignUp}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <ActivityIndicator color="#FDFDFD" style={{ marginRight: 8 }} />
                  <Text style={styles.createAccountButtonText}>Creating account…</Text>
                </>
              ) : (
                <Text style={styles.createAccountButtonText}>Create Account</Text>
              )}
            </TouchableOpacity>

            {/* General Error Message */}
            {generalError ? (
              <Text style={styles.generalErrorText}>{generalError}</Text>
            ) : null}
          </View>

          {/* Footer */}
          <View style={styles.footerContainer}>
            <TouchableOpacity onPress={handleLogIn}>
              <Text style={styles.loginText}>
                Already have an account? <Text style={styles.loginLink}>Log In</Text>
              </Text>
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
    minHeight: 80,
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
  input: {
    width: 342,
    height: 48,
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Inter',
    color: '#1E2A38',
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
  passwordHint: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(253, 253, 253, 0.60)',
    fontFamily: 'Inter',
    lineHeight: 16,
  },
  fieldErrorText: {
    color: '#FF3B30',
    marginTop: 4,
    fontSize: 13,
    fontFamily: 'Inter',
    lineHeight: 18,
  },
  generalErrorText: {
    color: '#FF3B30',
    marginTop: 8,
    textAlign: 'center',
    fontSize: 13,
    fontFamily: 'Inter',
    lineHeight: 18,
  },
  createAccountButton: {
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
  createAccountButtonText: {
    color: '#FDFDFD',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  footerContainer: {
    marginLeft: 24,
    marginTop: 24,
    width: 342,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FDFDFD',
    fontFamily: 'Inter',
    textAlign: 'center',
    lineHeight: 20,
  },
  loginLink: {
    color: '#B7AFC5',
  },
});

