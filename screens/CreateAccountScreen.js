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
import OptimizedImage from '../components/OptimizedImage';

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
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M0.439453 10.9441C-0.146484 11.5301 -0.146484 12.4816 0.439453 13.0676L7.93945 20.5676C8.52539 21.1535 9.47695 21.1535 10.0629 20.5676C10.6488 19.9816 10.6488 19.0301 10.0629 18.4441L5.11758 13.5035H19.4988C20.3285 13.5035 20.9988 12.8332 20.9988 12.0035C20.9988 11.1738 20.3285 10.5035 19.4988 10.5035H5.12227L10.0582 5.56289C10.6441 4.97695 10.6441 4.02539 10.0582 3.43945C9.47227 2.85352 8.5207 2.85352 7.93477 3.43945L0.434766 10.9395L0.439453 10.9441Z"
      fill="#FDFDFD"
    />
  </Svg>
);

const AppleIcon = () => (
  <Svg width={15} height={20} viewBox="0 0 15 20" fill="none">
    <Path
      d="M12.4492 10.4961C12.4414 9.0625 13.0898 7.98047 14.4023 7.18359C13.668 6.13281 12.5586 5.55469 11.0938 5.44141C9.70703 5.33203 8.19141 6.25 7.63672 6.25C7.05078 6.25 5.70703 5.48047 4.65234 5.48047C2.47266 5.51562 0.15625 7.21875 0.15625 10.6836C0.15625 11.707 0.34375 12.7643 0.71875 13.8555C1.21875 15.2891 3.02344 18.8047 4.90625 18.7461C5.89062 18.7227 6.58594 18.0469 7.86719 18.0469C9.10938 18.0469 9.75391 18.7461 10.8516 18.7461C12.75 18.7188 14.3828 15.5234 14.8594 14.0859C12.3125 12.8867 12.4492 10.5703 12.4492 10.4961ZM10.2383 4.08203C11.3047 2.81641 11.207 1.66406 11.1758 1.25C10.2344 1.30469 9.14453 1.89063 8.52344 2.61328C7.83984 3.38672 7.4375 4.34375 7.52344 5.42188C8.54297 5.5 9.47266 4.97656 10.2383 4.08203Z"
      fill="white"
    />
  </Svg>
);

const GoogleIcon = () => (
  <Svg width={19.063} height={20} viewBox="0 0 20 21" fill="none">
    <G clipPath="url(#clip0_38_128)">
      <Path
        d="M19.0625 10.4141C19.0625 15.9414 15.2773 19.875 9.6875 19.875C4.32812 19.875 0 15.5469 0 10.1875C0 4.82812 4.32812 0.5 9.6875 0.5C12.2969 0.5 14.4922 1.45703 16.1836 3.03516L13.5469 5.57031C10.0977 2.24219 3.68359 4.74219 3.68359 10.1875C3.68359 13.5664 6.38281 16.3047 9.6875 16.3047C13.5234 16.3047 14.9609 13.5547 15.1875 12.1289H9.6875V8.79688H18.9102C19 9.29297 19.0625 9.76953 19.0625 10.4141Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_38_128">
        <Path d="M0.015625 0.5H19.0781V20.5H0.015625V0.5Z" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default function CreateAccountScreen({ navigation, route }) {
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

  const handleCreateAccount = async () => {
    console.log('Create Account', { email, password });
    
    // Basic validation
    if (!email || !password) {
      console.error('Email and password are required');
      // TODO: Show validation error to user
      return;
    }
    
    if (password.length < 6) {
      console.error('Password must be at least 6 characters');
      // TODO: Show password length error to user
      return;
    }
    
    // TODO: Implement Supabase account creation
    try {
      // Example Supabase sign up implementation:
      // const { data, error } = await supabase.auth.signUp({
      //   email: email.trim().toLowerCase(),
      //   password: password,
      //   options: {
      //     data: {
      //       // Add any additional user metadata here
      //       app_name: 'Nappin',
      //       sign_up_method: 'email',
      //     },
      //   },
      // });
      
      // if (error) throw error;
      // if (data?.user) {
      //   console.log('Account created successfully:', data.user);
      //   // Handle successful account creation
      //   if (data.user.email_confirmed_at) {
      //     // Email already confirmed, navigate to main app
      //     // navigation.navigate('Home');
      //   } else {
      //     // Email confirmation required
      //     // navigation.navigate('EmailConfirmation', { email });
      //   }
      // }
      
      // Temporary: For now, simulate successful account creation and navigate based on flow
      console.log('Account creation successful (simulated)');
      if (navigation) {
        // Check if user came from onboarding flow
        const fromOnboarding = route?.params?.fromOnboarding;
        if (fromOnboarding) {
          // User came from personalization -> onboarding -> create account, go to trial offer
          navigation.navigate('TrialOffer');
        } else {
          // User came from other flows (e.g., Account screen), go to device selection
          navigation.navigate('ChooseDevice');
        }
      }
      
    } catch (error) {
      console.error('Account Creation Error:', error);
      // TODO: Show error message to user based on error type
      // if (error.message.includes('already registered')) {
      //   // Show "email already exists" error
      // } else {
      //   // Show generic error
      // }
    }
  };

  const handleLogIn = () => {
    console.log('Navigate to Log In');
    if (navigation) {
      navigation.navigate('Login');
    }
  };

  const handleSkip = () => {
    console.log('Skip account creation');
    if (navigation) {
      // Check if user came from onboarding flow
      const fromOnboarding = route?.params?.fromOnboarding;
      if (fromOnboarding) {
        // User came from personalization -> onboarding -> create account, go to trial offer
        navigation.navigate('TrialOffer');
      } else {
        // User came from other flows, go to Home
        navigation.navigate('Home');
      }
    }
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
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Create Your Account</Text>
              <Text style={styles.headerSubtitle}>Save your nap data and sync across devices.</Text>
            </View>
          </View>

          {/* Mascot Image */}
          <View style={styles.mascotContainer}>
            <OptimizedImage
              source={require('../assets/nappin_mascot_final_original-removebg-preview (1).png')}
              style={styles.mascotImage}
              resizeMode="contain"
              showLoader={true}
              loaderColor="#B7AFC5"
            />
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

          {/* Form */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
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
                  />
                  <TouchableOpacity style={styles.showButton} onPress={toggleShowPassword}>
                    <Text style={styles.showButtonText}>Show</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.passwordHint}>Password must be 6+ characters</Text>
              </View>
            </View>

            {/* Create Account Button */}
            <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccount}>
              <Text style={styles.createAccountButtonText}>Create Account</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footerContainer}>
            <TouchableOpacity onPress={handleLogIn}>
              <Text style={styles.loginText}>
                Already have an account? <Text style={styles.loginLink}>Log In</Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSkip}>
              <Text style={styles.skipText}>
                Skip account creation — you can do this later in Settings.
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
    backgroundColor: '#1E2A38',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 36,
    position: 'relative',
    height: 99,
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 37,
    width: 24,
    height: 24,
    zIndex: 1,
  },
  headerContent: {
    alignItems: 'center',
    paddingTop: 0,
    paddingHorizontal: 10.531,
    paddingBottom: 1.475,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FDFDFD',
    fontFamily: 'Inter',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 4,
    width: 241,
  },
  headerSubtitle: {
    fontSize: 15,
    fontWeight: '400',
    color: 'rgba(253, 253, 253, 0.85)',
    fontFamily: 'Inter',
    textAlign: 'center',
    lineHeight: 23,
    width: 322,
  },
  mascotContainer: {
    alignItems: 'center',
    marginTop: -25,
    marginBottom: -80,
  },
  mascotImage: {
    width: 337,
    height: 337,
    aspectRatio: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  socialButtonsContainer: {
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 8,
  },
  appleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 48,
    backgroundColor: '#000',
    borderRadius: 12,
    paddingHorizontal: 83,
    gap: 8.203,
  },
  appleButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFF',
    fontFamily: 'Inter',
    textAlign: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 48,
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 76.016,
    gap: 8,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#1E2A38',
    fontFamily: 'Inter',
    textAlign: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    height: 24,
    marginBottom: 8,
  },
  dividerLine: {
    width: 148,
    height: 1,
    backgroundColor: '#FDFDFD',
    opacity: 0.6,
  },
  dividerText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FDFDFD',
    fontFamily: 'Inter',
    lineHeight: 20,
    marginHorizontal: 16,
  },
  formContainer: {
    paddingHorizontal: 24,
    gap: 20,
  },
  inputContainer: {
    gap: 16,
  },
  fieldContainer: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FDFDFD',
    fontFamily: 'Inter',
    lineHeight: 20,
  },
  input: {
    width: '100%',
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
  },
  passwordInput: {
    width: '100%',
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
    top: 12,
    width: 42,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  showButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(30, 42, 56, 0.60)',
    fontFamily: 'Inter',
    textAlign: 'center',
  },
  passwordHint: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(253, 253, 253, 0.60)',
    fontFamily: 'Inter',
    lineHeight: 16,
  },
  createAccountButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#B7AFC5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(183, 175, 197, 0.30)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 8,
  },
  createAccountButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FDFDFD',
    fontFamily: 'Inter',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  footerContainer: {
    paddingHorizontal: 24,
    marginTop: 10,
    alignItems: 'center',
    gap: 16,
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
  skipText: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(253, 253, 253, 0.60)',
    fontFamily: 'Inter',
    textAlign: 'center',
    lineHeight: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(253, 253, 253, 0.60)',
    paddingBottom: 1,
  },
});
