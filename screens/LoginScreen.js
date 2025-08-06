import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import { Svg, Path, G, Defs, ClipPath } from 'react-native-svg';

// TODO: Import Supabase client when ready
// import { supabase } from '../lib/supabase';

// Supabase Auth Configuration
const SUPABASE_CONFIG = {
  // TODO: Add your Supabase URL and anon key
  url: 'YOUR_SUPABASE_URL',
  anonKey: 'YOUR_SUPABASE_ANON_KEY',
  // Apple Sign In configuration
  apple: {
    redirectTo: 'your-app://auth/callback',
    scopes: ['email', 'name'],
  },
  // Google Sign In configuration  
  google: {
    redirectTo: 'your-app://auth/callback',
    scopes: ['email', 'profile'],
  },
};

const BackArrowIcon = () => (
  <Svg width={21} height={18} viewBox="0 0 21 18" fill="none">
    <Path
      d="M0.439453 7.94414C-0.146484 8.53008 -0.146484 9.48164 0.439453 10.0676L7.93945 17.5676C8.52539 18.1535 9.47695 18.1535 10.0629 17.5676C10.6488 16.9816 10.6488 16.0301 10.0629 15.4441L5.11758 10.5035H19.4988C20.3285 10.5035 20.9988 9.8332 20.9988 9.00352C20.9988 8.17383 20.3285 7.50352 19.4988 7.50352H5.12227L10.0582 2.56289C10.6441 1.97695 10.6441 1.02539 10.0582 0.439453C9.47227 -0.146484 8.5207 -0.146484 7.93477 0.439453L0.434766 7.93945L0.439453 7.94414Z"
      fill="#FDFDFD"
    />
  </Svg>
);

const AppleIcon = () => (
  <Svg width={15} height={20} viewBox="0 0 15 20" fill="none">
    <Path
      d="M12.4492 10.4961C12.4414 9.0625 13.0898 7.98047 14.4023 7.18359C13.668 6.13281 12.5586 5.55469 11.0938 5.44141C9.70703 5.33203 8.19141 6.25 7.63672 6.25C7.05078 6.25 5.70703 5.48047 4.65234 5.48047C2.47266 5.51562 0.15625 7.21875 0.15625 10.6836C0.15625 11.707 0.34375 12.7643 0.71875 13.8555C1.21875 15.2891 3.02344 18.8047 4.90625 18.7461C5.89062 18.7227 6.58594 18.0469 7.86719 18.0469C9.10938 18.0469 9.75391 18.7461 10.8516 18.7461C12.75 18.7188 14.3828 15.5234 14.8594 14.0859C12.3125 12.8867 12.4492 10.5703 12.4492 10.4961ZM10.2383 4.08203C11.3047 2.81641 11.207 1.66406 11.1758 1.25C10.2344 1.30469 9.14453 1.89063 8.52344 2.61328C7.83984 3.38672 7.4375 4.34375 7.52344 5.42188C8.54297 5.5 9.47266 4.97656 10.2383 4.08203Z"
      fill="#FDFDFD"
    />
  </Svg>
);

const GoogleIcon = () => (
  <Svg width={19} height={20} viewBox="0 0 20 20" fill="none">
    <G clipPath="url(#clip0_189_286)">
      <Path
        d="M19.0625 10.2266C19.0625 15.7539 15.2773 19.6875 9.6875 19.6875C4.32812 19.6875 0 15.3594 0 10C0 4.64062 4.32812 0.3125 9.6875 0.3125C12.2969 0.3125 14.4922 1.26953 16.1836 2.84766L13.5469 5.38281C10.0977 2.05469 3.68359 4.55469 3.68359 10C3.68359 13.3789 6.38281 16.1172 9.6875 16.1172C13.5234 16.1172 14.9609 13.3672 15.1875 11.9414H9.6875V8.60938H18.9102C19 9.10547 19.0625 9.58203 19.0625 10.2266Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_189_286">
        <Path d="M0 0H19.0625V20H0V0Z" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleBack = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleContinueWithApple = async () => {
    console.log('Continue with Apple');
    
    // TODO: Implement Apple Sign In with Supabase
    try {
      // Example Supabase Apple Auth implementation:
      // const { data, error } = await supabase.auth.signInWithOAuth({
      //   provider: 'apple',
      //   options: {
      //     redirectTo: SUPABASE_CONFIG.apple.redirectTo,
      //     scopes: SUPABASE_CONFIG.apple.scopes.join(' '),
      //   },
      // });
      
      // if (error) throw error;
      // if (data?.user) {
      //   console.log('Apple sign in successful:', data.user);
      //   // Navigate to main app or next screen
      //   // navigation.navigate('Home');
      // }
      
    } catch (error) {
      console.error('Apple Sign In Error:', error);
      // TODO: Show error message to user
    }
  };

  const handleContinueWithGoogle = async () => {
    console.log('Continue with Google');
    
    // TODO: Implement Google Sign In with Supabase
    try {
      // Example Supabase Google Auth implementation:
      // const { data, error } = await supabase.auth.signInWithOAuth({
      //   provider: 'google',
      //   options: {
      //     redirectTo: SUPABASE_CONFIG.google.redirectTo,
      //     scopes: SUPABASE_CONFIG.google.scopes.join(' '),
      //   },
      // });
      
      // if (error) throw error;
      // if (data?.user) {
      //   console.log('Google sign in successful:', data.user);
      //   // Navigate to main app or next screen
      //   // navigation.navigate('Home');
      // }
      
    } catch (error) {
      console.error('Google Sign In Error:', error);
      // TODO: Show error message to user
    }
  };

  const handleLogin = async () => {
    console.log('Log In', { email, password });
    
    // Basic validation
    if (!email || !password) {
      console.error('Email and password are required');
      // TODO: Show validation error to user
      return;
    }
    
    // TODO: Implement Supabase login authentication
    try {
      // Example Supabase sign in implementation:
      // const { data, error } = await supabase.auth.signInWithPassword({
      //   email: email.trim().toLowerCase(),
      //   password: password,
      // });
      
      // if (error) throw error;
      // if (data?.user) {
      //   console.log('Login successful:', data.user);
      //   // Navigate to main app or home screen
      //   // navigation.navigate('Home');
      // }
      
      // Temporary: For now, simulate successful login and navigate to home (for returning users)
      console.log('Login successful (simulated)');
      if (navigation) {
        navigation.navigate('Home');
      }
      
    } catch (error) {
      console.error('Login Error:', error);
      // TODO: Show error message to user based on error type
      // if (error.message.includes('Invalid login credentials')) {
      //   // Show "invalid email/password" error
      // } else if (error.message.includes('Email not confirmed')) {
      //   // Show "email not verified" error and option to resend
      // } else {
      //   // Show generic error
      // }
    }
  };

  const handleForgotPassword = async () => {
    console.log('Forgot password');
    
    // TODO: Implement Supabase password reset
    try {
      // Example Supabase password reset implementation:
      // if (!email) {
      //   console.error('Please enter your email first');
      //   // TODO: Show validation error to user
      //   return;
      // }
      
      // const { error } = await supabase.auth.resetPasswordForEmail(
      //   email.trim().toLowerCase(),
      //   {
      //     redirectTo: 'your-app://reset-password',
      //   }
      // );
      
      // if (error) throw error;
      // console.log('Password reset email sent');
      // TODO: Show success message to user
      
    } catch (error) {
      console.error('Password Reset Error:', error);
      // TODO: Show error message to user
    }
    
    // TODO: Navigate to forgot password screen for more complex flow
    // navigation.navigate('ForgotPassword');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
            <Text style={styles.title}>Log In to Nappin</Text>
            <Text style={styles.subtitle}>Welcome back — let's get you rested.</Text>
          </View>

          {/* Social Login Buttons */}
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.appleButton} onPress={handleContinueWithApple}>
              <AppleIcon />
              <Text style={styles.appleButtonText}>Continue with Apple</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.googleButton} onPress={handleContinueWithGoogle}>
              <GoogleIcon />
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Login Form */}
          <View style={styles.formContainer}>
            {/* Email Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
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
                  onChangeText={setPassword}
                  placeholder=""
                  placeholderTextColor="rgba(30, 42, 56, 0.6)"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity style={styles.showButton} onPress={toggleShowPassword}>
                  <Text style={styles.showButtonText}>Show</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password Link */}
            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Log In</Text>
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
    height: 63,
  },
  title: {
    width: 190,
    height: 32,
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
  subtitle: {
    width: 267,
    height: 23,
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 23,
    marginTop: 11,
  },
  socialButtonsContainer: {
    marginLeft: 24,
    marginTop: 32,
    width: 342,
    height: 108,
    gap: 12,
  },
  appleButton: {
    width: 342,
    height: 48,
    backgroundColor: '#000',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 8,
  },
  appleButtonText: {
    color: '#FDFDFD',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
  },
  googleButton: {
    width: 342,
    height: 48,
    backgroundColor: '#FDFDFD',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 8,
  },
  googleButtonText: {
    color: '#1E2A38',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
  },
  dividerContainer: {
    marginLeft: 24,
    marginTop: 32,
    width: 342,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  dividerLine: {
    width: 148,
    height: 1,
    backgroundColor: '#FDFDFD',
    opacity: 0.6,
  },
  dividerText: {
    width: 14,
    height: 20,
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    textAlign: 'center',
  },
  formContainer: {
    marginLeft: 24,
    marginTop: 16,
    width: 342,
    height: 280,
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
  forgotPasswordContainer: {
    width: 342,
    height: 24,
    paddingTop: 3.245,
    paddingBottom: 1.255,
    paddingLeft: 232.094,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
    width: 110,
    height: 20,
    color: '#B7AFC5',
    textAlign: 'right',
    fontFamily: 'Inter',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20,
  },
  loginButton: {
    width: 342,
    height: 48,
    backgroundColor: '#B7AFC5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    shadowColor: 'rgba(183, 175, 197, 0.30)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 8,
  },
  loginButtonText: {
    width: 48,
    height: 24,
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
