import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
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

// Person icon for user section
const PersonIcon = () => (
  <Svg width={16} height={18} viewBox="0 0 16 18" fill="none">
    <G clipPath="url(#clip0_297_1028)">
      <Path
        d="M7.875 9C9.06847 9 10.2131 8.52589 11.057 7.68198C11.9009 6.83807 12.375 5.69347 12.375 4.5C12.375 3.30653 11.9009 2.16193 11.057 1.31802C10.2131 0.474106 9.06847 0 7.875 0C6.68153 0 5.53693 0.474106 4.69302 1.31802C3.84911 2.16193 3.375 3.30653 3.375 4.5C3.375 5.69347 3.84911 6.83807 4.69302 7.68198C5.53693 8.52589 6.68153 9 7.875 9ZM6.26836 10.6875C2.80547 10.6875 0 13.493 0 16.9559C0 17.5324 0.467578 18 1.04414 18H14.7059C15.2824 18 15.75 17.5324 15.75 16.9559C15.75 13.493 12.9445 10.6875 9.48164 10.6875H6.26836Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_297_1028">
        <Path d="M0 0H15.75V18H0V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Email icon
const EmailIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path d="M18 18H0V0H18V18Z" stroke="#E5E7EB"/>
    <Path
      d="M1.6875 2.25C0.755859 2.25 0 3.00586 0 3.9375C0 4.46836 0.249609 4.96758 0.675 5.2875L8.325 11.025C8.72578 11.3238 9.27422 11.3238 9.675 11.025L17.325 5.2875C17.7504 4.96758 18 4.46836 18 3.9375C18 3.00586 17.2441 2.25 16.3125 2.25H1.6875ZM0 6.1875V13.5C0 14.741 1.00898 15.75 2.25 15.75H15.75C16.991 15.75 18 14.741 18 13.5V6.1875L10.35 11.925C9.54844 12.5262 8.45156 12.5262 7.65 11.925L0 6.1875Z"
      fill="#1E2A38"
    />
  </Svg>
);

// Lock icon for password
const LockIcon = () => (
  <Svg width={16} height={18} viewBox="0 0 16 18" fill="none">
    <G clipPath="url(#clip0_297_1046)">
      <Path
        d="M5.0625 5.0625V6.75H10.6875V5.0625C10.6875 3.50859 9.42891 2.25 7.875 2.25C6.32109 2.25 5.0625 3.50859 5.0625 5.0625ZM2.8125 6.75V5.0625C2.8125 2.26758 5.08008 0 7.875 0C10.6699 0 12.9375 2.26758 12.9375 5.0625V6.75H13.5C14.741 6.75 15.75 7.75898 15.75 9V15.75C15.75 16.991 14.741 18 13.5 18H2.25C1.00898 18 0 16.991 0 15.75V9C0 7.75898 1.00898 6.75 2.25 6.75H2.8125Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_297_1046">
        <Path d="M0 0H15.75V18H0V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Right arrow icon for navigation
const RightArrowIcon = () => (
  <Svg width={9} height={14} viewBox="0 0 9 14" fill="none">
    <Path d="M9 14H0.25V0H9V14Z" stroke="#E5E7EB"/>
    <Path
      d="M8.74297 6.38201C9.08477 6.7238 9.08477 7.27888 8.74297 7.62068L3.49297 12.8707C3.15118 13.2125 2.5961 13.2125 2.2543 12.8707C1.91251 12.5289 1.91251 11.9738 2.2543 11.632L6.88633 6.99998L2.25704 2.36794C1.91524 2.02615 1.91524 1.47107 2.25704 1.12927C2.59883 0.787476 3.15391 0.787476 3.49571 1.12927L8.74571 6.37927L8.74297 6.38201Z"
      fill="#1E2A38"
    />
  </Svg>
);

// Power icon for sign out (grayed out)
const PowerIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <G clipPath="url(#clip0_297_1053)">
      <Path
        d="M10.125 1.125C10.125 0.502734 9.62227 0 9 0C8.37773 0 7.875 0.502734 7.875 1.125V9C7.875 9.62227 8.37773 10.125 9 10.125C9.62227 10.125 10.125 9.62227 10.125 9V1.125ZM5.04492 4.23984C5.52305 3.84258 5.58633 3.13242 5.18906 2.6543C4.7918 2.17617 4.08164 2.11289 3.60352 2.51016C1.74727 4.05703 0.5625 6.39141 0.5625 9C0.5625 13.6582 4.3418 17.4375 9 17.4375C13.6582 17.4375 17.4375 13.6582 17.4375 9C17.4375 6.39141 16.2492 4.05703 14.393 2.51016C13.9148 2.11289 13.2047 2.17969 12.8074 2.6543C12.4102 3.12891 12.477 3.84258 12.9516 4.23984C14.3191 5.37539 15.184 7.0875 15.184 9C15.184 12.4172 12.4137 15.1875 8.99648 15.1875C5.5793 15.1875 2.80898 12.4172 2.80898 9C2.80898 7.0875 3.67734 5.37539 5.04141 4.23984H5.04492Z"
        fill="rgba(183, 175, 197, 0.8)"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_297_1053">
        <Path d="M0 0H18V18H0V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Home icon for bottom navigation
const HomeIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M10 2.5L2.5 8.75V17.5C2.5 17.8315 2.6317 18.1495 2.86612 18.3839C3.10054 18.6183 3.41848 18.75 3.75 18.75H7.5V13.75C7.5 13.4185 7.6317 13.1005 7.86612 12.8661C8.10054 12.6317 8.41848 12.5 8.75 12.5H11.25C11.5815 12.5 11.8995 12.6317 12.1339 12.8661C12.3683 13.1005 12.5 13.4185 12.5 13.75V18.75H16.25C16.5815 18.75 16.8995 18.6183 17.1339 18.3839C17.3683 18.1495 17.5 17.8315 17.5 17.5V8.75L10 2.5Z"
      fill="#FDFDFD"
      fillOpacity="0.6"
    />
  </Svg>
);

// Clock icon for History tab
const ClockIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <G clipPath="url(#clip0_297_941)">
      <Path
        d="M18.125 10C18.125 12.1549 17.269 14.2215 15.7452 15.7452C14.2215 17.269 12.1549 18.125 10 18.125C7.84512 18.125 5.77849 17.269 4.25476 15.7452C2.73102 14.2215 1.875 12.1549 1.875 10C1.875 7.84512 2.73102 5.77849 4.25476 4.25476C5.77849 2.73102 7.84512 1.875 10 1.875C12.1549 1.875 14.2215 2.73102 15.7452 4.25476C17.269 5.77849 18.125 7.84512 18.125 10ZM0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C4.8043 18.9464 7.34784 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 7.34784 18.9464 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10ZM9.0625 4.6875V10C9.0625 10.3125 9.21875 10.6055 9.48047 10.7812L13.2305 13.2812C13.6602 13.5703 14.2422 13.4531 14.5312 13.0195C14.8203 12.5859 14.7031 12.0078 14.2695 11.7188L10.9375 9.5V4.6875C10.9375 4.16797 10.5195 3.75 10 3.75C9.48047 3.75 9.0625 4.16797 9.0625 4.6875Z"
        fill="rgba(253, 253, 253, 0.6)"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_297_941">
        <Path d="M0 0H20V20H0V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Features icon for bottom navigation
const FeaturesIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path d="M10 0L12.5 7.5H20L14.5 12L16.5 20L10 15L3.5 20L5.5 12L0 7.5H7.5L10 0Z" fill="#FDFDFD" fillOpacity="0.6" />
  </Svg>
);

// Profile icon for bottom navigation
const ProfileIcon = () => (
  <Svg width={18} height={20} viewBox="0 0 18 20" fill="none">
    <G clipPath="url(#clip0_191_667)">
      <Path
        d="M12.0938 5C12.0938 4.1712 11.7645 3.37634 11.1785 2.79029C10.5924 2.20424 9.79755 1.875 8.96875 1.875C8.13995 1.875 7.34509 2.20424 6.75904 2.79029C6.17299 3.37634 5.84375 4.1712 5.84375 5C5.84375 5.8288 6.17299 6.62366 6.75904 7.20971C7.34509 7.79576 8.13995 8.125 8.96875 8.125C9.79755 8.125 10.5924 7.79576 11.1785 7.20971C11.7645 6.62366 12.0938 5.8288 12.0938 5ZM3.96875 5C3.96875 3.67392 4.49553 2.40215 5.43322 1.46447C6.3709 0.526784 7.64267 0 8.96875 0C10.2948 0 11.5666 0.526784 12.5043 1.46447C13.442 2.40215 13.9688 3.67392 13.9688 5C13.9688 6.32608 13.442 7.59785 12.5043 8.53553C11.5666 9.47322 10.2948 10 8.96875 10C7.64267 10 6.3709 9.47322 5.43322 8.53553C4.49553 7.59785 3.96875 6.32608 3.96875 5ZM2.14453 18.125H15.793C15.4453 15.6523 13.3203 13.75 10.7539 13.75H7.18359C4.61719 13.75 2.49219 15.6523 2.14453 18.125ZM0.21875 18.8398C0.21875 14.9922 3.33594 11.875 7.18359 11.875H10.7539C14.6016 11.875 17.7188 14.9922 17.7188 18.8398C17.7188 19.4805 17.1992 20 16.5586 20H1.37891C0.738281 20 0.21875 19.4805 0.21875 18.8398Z"
        fill="#B7AFC5"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_191_667">
        <Path d="M0 0H17.5V20H0V0Z" fill="white" transform="translate(0.21875)"/>
      </ClipPath>
    </Defs>
  </Svg>
);

export default function AccountScreen({ navigation }) {
  const { isLoggedIn, userEmail, userName, logout, login } = usePersonalization();

  const handleBackPress = () => {
    navigation.navigate('Profile');
  };

  const handleNamePress = () => {
    navigation.navigate('EditDisplayName');
  };

  const handleEmailPress = () => {
    console.log('Email pressed');
    // TODO: Navigate to edit email screen or show email is not editable
  };

  const handleChangePasswordPress = () => {
    console.log('Change Password pressed');
    navigation.navigate('ChangePassword');
  };

  const handleSignOutPress = async () => {
    console.log('Sign Out pressed');
    
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigation.navigate('Profile');
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleCreateAccountPress = () => {
    console.log('Create Account pressed');
    navigation.navigate('CreateAccount');
  };

  const handleSignInPress = () => {
    console.log('Sign In pressed');
    navigation.navigate('Login');
  };

  const handleHomePress = () => {
    navigation.navigate('Home');
  };

  const handleHistoryPress = () => {
    navigation.navigate('NapHistory');
  };

  const handleFeaturesPress = () => {
    navigation.navigate('Features');
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <BackArrowIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Account</Text>
        </View>

        {/* User Profile Card */}
        <View style={styles.userProfileCard}>
          <Text style={styles.userName}>{userName || (isLoggedIn ? 'No name set' : 'Not signed in')}</Text>
          <Text style={styles.userEmail}>{userEmail || (isLoggedIn ? 'No email set' : 'No email available')}</Text>
        </View>

        {/* Account Details Card */}
        <View style={styles.accountDetailsCard}>
          {/* Name Row */}
          <TouchableOpacity style={styles.accountRow} onPress={handleNamePress}>
            <PersonIcon />
            <View style={styles.rowContent}>
              <Text style={styles.rowLabel}>Name</Text>
            </View>
            <Text style={styles.rowValue}>{userName || (isLoggedIn ? 'No name set' : 'Not available')}</Text>
            <RightArrowIcon />
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Email Row */}
          <TouchableOpacity style={styles.accountRow} onPress={handleEmailPress}>
            <EmailIcon />
            <View style={styles.rowContent}>
              <Text style={styles.rowLabel}>Email</Text>
            </View>
            <Text style={styles.rowValue}>{userEmail || (isLoggedIn ? 'No email set' : 'Not available')}</Text>
          </TouchableOpacity>
        </View>

        {/* Settings Card - only show when logged in */}
        {isLoggedIn && (
          <View style={styles.settingsCard}>
            {/* Change Password */}
            <TouchableOpacity style={styles.settingsRow} onPress={handleChangePasswordPress}>
              <LockIcon />
              <View style={styles.rowContent}>
                <Text style={styles.rowLabel}>Change Password</Text>
              </View>
              <RightArrowIcon />
            </TouchableOpacity>

            {/* Sign Out */}
            <TouchableOpacity style={styles.signOutRow} onPress={handleSignOutPress}>
              <PowerIcon />
              <View style={styles.rowContent}>
                <Text style={styles.signOutLabel}>Sign Out</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Authentication Buttons - only show when not logged in */}
        {!isLoggedIn && (
          <View style={styles.authButtonsContainer}>
            <TouchableOpacity style={styles.primaryButton} onPress={handleCreateAccountPress}>
              <Text style={styles.primaryButtonText}>Create Account</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton} onPress={handleSignInPress}>
              <Text style={styles.secondaryButtonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <View style={styles.navContainer}>
          <TouchableOpacity style={styles.navButton} onPress={handleHomePress}>
            <HomeIcon />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={handleHistoryPress}>
            <ClockIcon />
            <Text style={styles.navText}>History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={handleFeaturesPress}>
            <FeaturesIcon />
            <Text style={styles.navText}>Features</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={handleProfilePress}>
            <ProfileIcon />
            <Text style={styles.navTextActive}>Profile</Text>
          </TouchableOpacity>
        </View>
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
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100, // Space for bottom navigation
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 48,
    marginTop: 48,
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
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28,
  },
  userProfileCard: {
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    paddingVertical: 21,
    paddingHorizontal: 107,
    marginHorizontal: 16,
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  userName: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
    textAlign: 'center',
  },
  userEmail: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    opacity: 0.8,
    textAlign: 'center',
    marginTop: 0,
  },
  accountDetailsCard: {
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
  },
  rowContent: {
    flex: 1,
    marginLeft: 12,
  },
  rowLabel: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  rowValue: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    marginRight: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#1E2A38',
    opacity: 0.2,
    marginHorizontal: 0,
  },
  settingsCard: {
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
  },
  signOutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    marginTop: 16,
  },
  signOutLabel: {
    color: 'rgba(183, 175, 197, 0.8)',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
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
  authButtonsContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#B7AFC5',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#B7AFC5',
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#B7AFC5',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
});
