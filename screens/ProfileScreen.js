import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import { Svg, Path, G, Defs, ClipPath } from 'react-native-svg';
import { usePersonalization } from '../components/PersonalizationProvider';

// Back arrow icon for header
const BackArrowIcon = () => (
  <Svg width={11} height={18} viewBox="0 0 12 18" fill="none">
    <G clipPath="url(#clip0_297_851)">
      <Path
        d="M0.705469 8.20547C0.266016 8.64492 0.266016 9.35859 0.705469 9.79804L7.45547 16.548C7.89492 16.9875 8.60859 16.9875 9.04805 16.548C9.4875 16.1086 9.4875 15.3949 9.04805 14.9555L3.09258 9L9.04453 3.04453C9.48398 2.60508 9.48398 1.8914 9.04453 1.45195C8.60508 1.0125 7.89141 1.0125 7.45195 1.45195L0.701954 8.20195L0.705469 8.20547Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_297_851">
        <Path d="M0.375 0H11.625V18H0.375V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Right arrow icon for cards
const RightArrowIcon = () => (
  <Svg width={11} height={18} viewBox="0 0 12 18" fill="none">
    <Path
      d="M11.6695 8.20547C12.109 8.64492 12.109 9.35859 11.6695 9.79804L4.91954 16.548C4.48009 16.9875 3.76642 16.9875 3.32697 16.548C2.88751 16.1086 2.88751 15.3949 3.32697 14.9555L9.28243 9L3.33048 3.04453C2.89103 2.60508 2.89103 1.8914 3.33048 1.45195C3.76993 1.0125 4.48361 1.0125 4.92306 1.45195L11.6731 8.20195L11.6695 8.20547Z"
      fill="#1E2A38"
    />
  </Svg>
);

// Account icon
const AccountIcon = () => (
  <Svg width={16} height={18} viewBox="0 0 16 18" fill="none">
    <G clipPath="url(#clip0_297_900)">
      <Path
        d="M8 9C9.19347 9 10.3381 8.52589 11.182 7.68198C12.0259 6.83807 12.5 5.69347 12.5 4.5C12.5 3.30653 12.0259 2.16193 11.182 1.31802C10.3381 0.474106 9.19347 0 8 0C6.80653 0 5.66193 0.474106 4.81802 1.31802C3.97411 2.16193 3.5 3.30653 3.5 4.5C3.5 5.69347 3.97411 6.83807 4.81802 7.68198C5.66193 8.52589 6.80653 9 8 9ZM6.39336 10.6875C2.93047 10.6875 0.125 13.493 0.125 16.9559C0.125 17.5324 0.592578 18 1.16914 18H14.8309C15.4074 18 15.875 17.5324 15.875 16.9559C15.875 13.493 13.0695 10.6875 9.60664 10.6875H6.39336Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_297_900">
        <Path d="M0.125 0H15.875V18H0.125V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Nappin AI Data icon (database)
const DatabaseIcon = () => (
  <Svg width={12} height={16} viewBox="0 0 12 16" fill="none">
    <Path
      d="M12 8V13C12 14.6569 9.31371 16 6 16C2.68629 16 0 14.6569 0 13V8M12 8V3M12 8C12 9.65685 9.31371 11 6 11C2.68629 11 0 9.65685 0 8M12 3C12 1.34315 9.31371 0 6 0C2.68629 0 0 1.34315 0 3M12 3C12 4.65685 9.31371 6 6 6C2.68629 6 0 4.65685 0 3M0 8V3"
      stroke="#1E2A38"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Notifications icon
const NotificationsIcon = () => (
  <Svg width={16} height={18} viewBox="0 0 16 18" fill="none">
    <G clipPath="url(#clip0_297_907)">
      <Path
        d="M8 0C7.37773 0 6.875 0.502734 6.875 1.125V1.7543C4.32617 2.15859 2.375 4.36641 2.375 7.03125V8.20547C2.375 9.80156 1.83008 11.352 0.835156 12.5965L0.311328 13.2539C0.107422 13.507 0.0687497 13.8551 0.209375 14.1469C0.35 14.4387 0.645312 14.625 0.96875 14.625H15.0312C15.3547 14.625 15.65 14.4387 15.7906 14.1469C15.9312 13.8551 15.8926 13.507 15.6887 13.2539L15.1648 12.6C14.1699 11.352 13.625 9.80156 13.625 8.20547V7.03125C13.625 4.36641 11.6738 2.15859 9.125 1.7543V1.125C9.125 0.502734 8.62227 0 8 0ZM8 3.375H8.28125C10.2992 3.375 11.9375 5.01328 11.9375 7.03125V8.20547C11.9375 9.88945 12.4262 11.5312 13.3332 12.9375H2.6668C3.57383 11.5312 4.0625 9.88945 4.0625 8.20547V7.03125C4.0625 5.01328 5.70078 3.375 7.71875 3.375H8ZM10.25 15.75H8H5.75C5.75 16.3477 5.98555 16.9207 6.40742 17.3426C6.8293 17.7645 7.40234 18 8 18C8.59766 18 9.1707 17.7645 9.59258 17.3426C10.0145 16.9207 10.25 16.3477 10.25 15.75Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_297_907">
        <Path d="M0.125 0H15.875V18H0.125V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Integrations icon (weight/health)
const IntegrationsIcon = () => (
  <Svg width={14} height={18} viewBox="0 0 14 18" fill="none">
    <G clipPath="url(#clip0_297_914)">
      <Path
        d="M3.625 0C3.00273 0 2.5 0.502734 2.5 1.125V4.5H4.75V1.125C4.75 0.502734 4.24727 0 3.625 0ZM10.375 0C9.75273 0 9.25 0.502734 9.25 1.125V4.5H11.5V1.125C11.5 0.502734 10.9973 0 10.375 0ZM1.375 5.625C0.752734 5.625 0.25 6.12773 0.25 6.75C0.25 7.37227 0.752734 7.875 1.375 7.875V9C1.375 11.7211 3.30859 13.9922 5.875 14.5125V16.875C5.875 17.4973 6.37773 18 7 18C7.62227 18 8.125 17.4973 8.125 16.875V14.5125C10.6914 13.9922 12.625 11.7211 12.625 9V7.875C13.2473 7.875 13.75 7.37227 13.75 6.75C13.75 6.12773 13.2473 5.625 12.625 5.625H1.375Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_297_914">
        <Path d="M0.25 0H13.75V18H0.25V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// App Preferences icon (settings)
const SettingsIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <G clipPath="url(#clip0_297_921)">
      <Path
        d="M17.434 5.85703C17.5465 6.16289 17.4516 6.50391 17.209 6.72187L15.6867 8.10703C15.7254 8.39883 15.7465 8.69766 15.7465 9C15.7465 9.30234 15.7254 9.60117 15.6867 9.89297L17.209 11.2781C17.4516 11.4961 17.5465 11.8371 17.434 12.143C17.2793 12.5613 17.093 12.9621 16.8785 13.3488L16.7133 13.6336C16.4812 14.0203 16.2211 14.3859 15.9363 14.7305C15.7289 14.9836 15.3844 15.068 15.075 14.9695L13.1168 14.3473C12.6457 14.7094 12.1254 15.0117 11.5699 15.2402L11.1305 17.2477C11.0602 17.5676 10.8141 17.8207 10.4906 17.8734C10.0055 17.9543 9.50625 17.9965 8.99648 17.9965C8.48672 17.9965 7.9875 17.9543 7.50234 17.8734C7.17891 17.8207 6.93281 17.5676 6.8625 17.2477L6.42305 15.2402C5.86758 15.0117 5.34726 14.7094 4.87617 14.3473L2.92148 14.973C2.61211 15.0715 2.26758 14.9836 2.06016 14.734C1.77539 14.3895 1.51523 14.0238 1.2832 13.6371L1.11797 13.3523C0.903515 12.9656 0.717187 12.5648 0.562499 12.1465C0.449999 11.8406 0.544921 11.4996 0.787499 11.2816L2.30976 9.89648C2.27109 9.60117 2.25 9.30234 2.25 9C2.25 8.69766 2.27109 8.39883 2.30976 8.10703L0.787499 6.72187C0.544921 6.50391 0.449999 6.16289 0.562499 5.85703C0.717187 5.43867 0.903515 5.03789 1.11797 4.65117L1.2832 4.36641C1.51523 3.97969 1.77539 3.61406 2.06016 3.26953C2.26758 3.01641 2.61211 2.93203 2.92148 3.03047L4.87969 3.65273C5.35078 3.29063 5.87109 2.98828 6.42656 2.75977L6.86601 0.752344C6.93633 0.432422 7.18242 0.179297 7.50586 0.126562C7.99101 0.0421875 8.49023 0 9 0C9.50976 0 10.009 0.0421875 10.4941 0.123047C10.8176 0.175781 11.0637 0.428906 11.134 0.748828L11.5734 2.75625C12.1289 2.98477 12.6492 3.28711 13.1203 3.64922L15.0785 3.02695C15.3879 2.92852 15.7324 3.01641 15.9398 3.26602C16.2246 3.61055 16.4848 3.97617 16.7168 4.36289L16.882 4.64766C17.0965 5.03437 17.2828 5.43516 17.4375 5.85352L17.434 5.85703ZM9 11.8125C9.74592 11.8125 10.4613 11.5162 10.9887 10.9887C11.5162 10.4613 11.8125 9.74592 11.8125 9C11.8125 8.25408 11.5162 7.53871 10.9887 7.01126C10.4613 6.48382 9.74592 6.1875 9 6.1875C8.25408 6.1875 7.53871 6.48382 7.01126 7.01126C6.48382 7.53871 6.1875 8.25408 6.1875 9C6.1875 9.74592 6.48382 10.4613 7.01126 10.9887C7.53871 11.5162 8.25408 11.8125 9 11.8125Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_297_921">
        <Path d="M0 0H18V18H0V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Data & Legal icon (document)
const DocumentIcon = () => (
  <Svg width={14} height={18} viewBox="0 0 14 18" fill="none">
    <G clipPath="url(#clip0_297_928)">
      <Path
        d="M2.5 0C1.25898 0 0.25 1.00898 0.25 2.25V15.75C0.25 16.991 1.25898 18 2.5 18H11.5C12.741 18 13.75 16.991 13.75 15.75V5.625H9.25C8.62773 5.625 8.125 5.12227 8.125 4.5V0H2.5ZM9.25 0V4.5H13.75L9.25 0ZM4.1875 9H9.8125C10.1219 9 10.375 9.25313 10.375 9.5625C10.375 9.87187 10.1219 10.125 9.8125 10.125H4.1875C3.87812 10.125 3.625 9.87187 3.625 9.5625C3.625 9.25313 3.87812 9 4.1875 9ZM4.1875 11.25H9.8125C10.1219 11.25 10.375 11.5031 10.375 11.8125C10.375 12.1219 10.1219 12.375 9.8125 12.375H4.1875C3.87812 12.375 3.625 12.1219 3.625 11.8125C3.625 11.5031 3.87812 11.25 4.1875 11.25ZM4.1875 13.5H9.8125C10.1219 13.5 10.375 13.7531 10.375 14.0625C10.375 14.3719 10.1219 14.625 9.8125 14.625H4.1875C3.87812 14.625 3.625 14.3719 3.625 14.0625C3.625 13.7531 3.87812 13.5 4.1875 13.5Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_297_928">
        <Path d="M0.25 0H13.75V18H0.25V0Z" fill="white"/>
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

// Profile icon for bottom navigation (active)
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

// Profile card component
const ProfileCard = ({ icon, title, subtitle, onPress }) => (
  <TouchableOpacity style={styles.profileCard} onPress={onPress}>
    <View style={styles.cardIconContainer}>
      {icon}
    </View>
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </View>
    <RightArrowIcon />
  </TouchableOpacity>
);

export default function ProfileScreen({ navigation }) {
  const { isLoggedIn, userEmail, userName } = usePersonalization();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAccountPress = () => {
    navigation.navigate('Account');
  };

  const handleNappinDataPress = () => {
    console.log('Nappin AI Data pressed');
    navigation.navigate('NappinAiData');
  };

  const handleNotificationsPress = () => {
    navigation.navigate('Notifications');
  };

  const handleIntegrationsPress = () => {
    navigation.navigate('Integrations');
  };

  const handleAppPreferencesPress = () => {
    console.log('App Preferences pressed');
    navigation.navigate('AppPreferences');
  };

  const handleDataLegalPress = () => {
    console.log('Data & Legal pressed');
    // TODO: Navigate to Data & Legal screen
  };

  const handleFeedbackPress = () => {
    const email = 'nappinapplication@gmail.com';
    const subject = 'Nappin App Feedback';
    const body = 'Hi Nappin Team,\n\nI have some feedback/recommendations for the app:\n\n';

    const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.canOpenURL(mailto)
      .then((supported) => {
        if (supported) {
          Linking.openURL(mailto);
        } else {
          Alert.alert(
            'Email Not Available',
            'Please send your feedback to nappinapplication@gmail.com',
            [{ text: 'OK' }]
          );
        }
      })
      .catch((error) => {
        console.error('Error opening email:', error);
        Alert.alert(
          'Email Not Available',
          'Please send your feedback to nappinapplication@gmail.com',
          [{ text: 'OK' }]
        );
      });
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <BackArrowIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* Profile Cards */}
        <View style={styles.cardsContainer}>
          <ProfileCard
            icon={<AccountIcon />}
            title="Account"
            subtitle={isLoggedIn ? userEmail : "Tap to sign up or log in"}
            onPress={handleAccountPress}
          />

          <ProfileCard
            icon={<DatabaseIcon />}
            title="Nappin Ai Data"
            subtitle="Edit your advanced data"
            onPress={handleNappinDataPress}
          />

          <ProfileCard
            icon={<NotificationsIcon />}
            title="Notifications"
            subtitle="2 of 3 reminders on"
            onPress={handleNotificationsPress}
          />

          <ProfileCard
            icon={<IntegrationsIcon />}
            title="Integrations"
            subtitle="Apple Health connected"
            onPress={handleIntegrationsPress}
          />

          <ProfileCard
            icon={<SettingsIcon />}
            title="App Preferences"
            subtitle="Sound hints • Haptics"
            onPress={handleAppPreferencesPress}
          />

          <ProfileCard
            icon={<DocumentIcon />}
            title="Data & Legal"
            subtitle="Privacy • Terms • Export"
            onPress={handleDataLegalPress}
          />
        </View>

        {/* Feedback Link */}
        <TouchableOpacity onPress={handleFeedbackPress}>
          <Text style={styles.feedbackLink}>
            Send us recommendations, bugs, and features you'd like to see added here!
          </Text>
        </TouchableOpacity>
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

          <TouchableOpacity style={styles.navButton}>
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
  cardsContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 12,
  },
  profileCard: {
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  cardIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(183, 175, 197, 0.30)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: -1,
  },
  cardSubtitle: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    marginTop: 2,
  },
  feedbackLink: {
    color: '#B7AFC5',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'center',
    textDecorationLine: 'underline',
    paddingHorizontal: 16,
    marginTop: 40,
    marginBottom: 20,
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
  navTextActive: {
    color: '#B7AFC5',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
  },
  navText: {
    color: 'rgba(253, 253, 253, 0.60)',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
  },
});
