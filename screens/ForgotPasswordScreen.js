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
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../utils/supabase';

const BackArrowIcon = () => (
  <Svg width={21} height={18} viewBox="0 0 21 18" fill="none">
    <Path
      d="M0.439453 7.94414C-0.146484 8.53008 -0.146484 9.48164 0.439453 10.0676L7.93945 17.5676C8.52539 18.1535 9.47695 18.1535 10.0629 17.5676C10.6488 16.9816 10.6488 16.0301 10.0629 15.4441L5.11758 10.5035H19.4988C20.3285 10.5035 20.9988 9.8332 20.9988 9.00352C20.9988 8.17383 20.3285 7.50352 19.4988 7.50352H5.12227L10.0582 2.56289C10.6441 1.97695 10.6441 1.02539 10.0582 0.439453C9.47227 -0.146484 8.5207 -0.146484 7.93477 0.439453L0.434766 7.93945L0.439453 7.94414Z"
      fill="#FDFDFD"
    />
  </Svg>
);

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Login');
    }
  };

  const handleReset = async () => {
    setError('');
    setMessage('');

    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }

    setLoading(true);
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: 'nappin://reset-password',
      });

      if (resetError) {
        console.error('[ForgotPassword] reset error:', resetError);
        setError(resetError.message || 'Something went wrong. Please try again.');
        return;
      }

      setMessage('Check your email for password reset instructions.');
      
      // Auto-navigate back to Login after 3 seconds
      setTimeout(() => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          navigation.navigate('Login');
        }
      }, 3000);
    } catch (err) {
      console.error('[ForgotPassword] Unexpected error:', err);
      setError('Something went wrong. Please try again.');
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
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <BackArrowIcon />
            </TouchableOpacity>
          </View>

          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Forgot your password?</Text>
            <Text style={styles.subtitle}>
              Enter the email you use for Nappin and we'll send you instructions to reset your password.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="you@example.com"
                placeholderTextColor="rgba(30, 42, 56, 0.6)"
              />
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
                  <Text style={styles.resetButtonText}>Sending...</Text>
                </>
              ) : (
                <Text style={styles.resetButtonText}>Reset Password</Text>
              )}
            </TouchableOpacity>

            {/* Helper Note */}
            <View style={styles.helperNoteContainer}>
              <Text style={styles.helperNote}>
                Note: If you usually sign in with Google or Apple, use those buttons on the Log In screen instead of resetting your password.
              </Text>
            </View>

            {/* Back to Log In Link */}
            <TouchableOpacity onPress={handleBack} style={styles.backLink}>
              <Text style={styles.backLinkText}>Back to Log In</Text>
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
  helperNoteContainer: {
    marginLeft: 24,
    marginRight: 24,
    marginTop: 24,
    marginBottom: 24,
  },
  helperNote: {
    fontSize: 13,
    color: '#B7AFC5',
    fontFamily: 'Inter',
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 18,
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
  backLink: {
    marginTop: 16,
    alignItems: 'center',
  },
  backLinkText: {
    color: '#B7AFC5',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
});

