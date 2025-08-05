import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { Svg, Path, G, Defs, ClipPath } from 'react-native-svg';

// Bell/Notification icon for Sounds
const SoundsIcon = () => (
  <Svg width={32} height={36} viewBox="0 0 32 36" fill="none">
    <G clipPath="url(#clip0_264_167)">
      <Path
        d="M15.75 0C14.5055 0 13.5 1.00547 13.5 2.25V3.50859C8.40236 4.31719 4.50001 8.73281 4.50001 14.0625V16.4109C4.50001 19.6031 3.41017 22.7039 1.42033 25.193L0.372671 26.5078C-0.0351416 27.0141 -0.112485 27.7102 0.168765 28.2937C0.450015 28.8773 1.04064 29.25 1.68751 29.25H29.8125C30.4594 29.25 31.05 28.8773 31.3313 28.2937C31.6125 27.7102 31.5352 27.0141 31.1274 26.5078L30.0797 25.2C28.0899 22.7039 27 19.6031 27 16.4109V14.0625C27 8.73281 23.0977 4.31719 18 3.50859V2.25C18 1.00547 16.9945 0 15.75 0ZM15.75 6.75H16.3125C20.3485 6.75 23.625 10.0266 23.625 14.0625V16.4109C23.625 19.7789 24.6024 23.0625 26.4164 25.875H5.08361C6.89767 23.0625 7.87501 19.7789 7.87501 16.4109V14.0625C7.87501 10.0266 11.1516 6.75 15.1875 6.75H15.75ZM20.25 31.5H15.75H11.25C11.25 32.6953 11.7211 33.8414 12.5649 34.6852C13.4086 35.5289 14.5547 36 15.75 36C16.9453 36 18.0914 35.5289 18.9352 34.6852C19.7789 33.8414 20.25 32.6953 20.25 31.5Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_264_167">
        <Path d="M0 0H31.5V36H0V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Wind/Breathing icon for Breathing Exercise
const BreathingIcon = () => (
  <Svg width={36} height={36} viewBox="0 0 36 36" fill="none">
    <Path
      d="M20.25 2.25C20.25 3.49453 21.2555 4.5 22.5 4.5H24.75C25.9945 4.5 27 5.50547 27 6.75C27 7.99453 25.9945 9 24.75 9H2.25C1.00547 9 0 10.0055 0 11.25C0 12.4945 1.00547 13.5 2.25 13.5H24.75C28.4766 13.5 31.5 10.4766 31.5 6.75C31.5 3.02344 28.4766 0 24.75 0H22.5C21.2555 0 20.25 1.00547 20.25 2.25ZM24.75 27C24.75 28.2445 25.7555 29.25 27 29.25H29.25C32.9766 29.25 36 26.2266 36 22.5C36 18.7734 32.9766 15.75 29.25 15.75H2.25C1.00547 15.75 0 16.7555 0 18C0 19.2445 1.00547 20.25 2.25 20.25H29.25C30.4945 20.25 31.5 21.2555 31.5 22.5C31.5 23.7445 30.4945 24.75 29.25 24.75H27C25.7555 24.75 24.75 25.7555 24.75 27ZM9 36H11.25C14.9766 36 18 32.9766 18 29.25C18 25.5234 14.9766 22.5 11.25 22.5H2.25C1.00547 22.5 0 23.5055 0 24.75C0 25.9945 1.00547 27 2.25 27H11.25C12.4945 27 13.5 28.0055 13.5 29.25C13.5 30.4945 12.4945 31.5 11.25 31.5H9C7.75547 31.5 6.75 32.5055 6.75 33.75C6.75 34.9945 7.75547 36 9 36Z"
      fill="#1E2A38"
    />
  </Svg>
);

// Calendar icon for Nap Scheduler
const SchedulerIcon = () => (
  <Svg width={32} height={36} viewBox="0 0 32 36" fill="none">
    <G clipPath="url(#clip0_264_182)">
      <Path
        d="M10.6875 1.6875C10.6875 0.752344 9.93516 0 9 0C8.06484 0 7.3125 0.752344 7.3125 1.6875V4.5H4.5C2.01797 4.5 0 6.51797 0 9V10.125V13.5V31.5C0 33.982 2.01797 36 4.5 36H27C29.482 36 31.5 33.982 31.5 31.5V13.5V10.125V9C31.5 6.51797 29.482 4.5 27 4.5H24.1875V1.6875C24.1875 0.752344 23.4352 0 22.5 0C21.5648 0 20.8125 0.752344 20.8125 1.6875V4.5H10.6875V1.6875ZM3.375 13.5H28.125V31.5C28.125 32.1188 27.6187 32.625 27 32.625H4.5C3.88125 32.625 3.375 32.1188 3.375 31.5V13.5Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_264_182">
        <Path d="M0 0H31.5V36H0V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Edit/Journal icon for Journal
const JournalIcon = () => (
  <Svg width={36} height={36} viewBox="0 0 36 36" fill="none">
    <G clipPath="url(#clip0_264_175)">
      <Path
        d="M31.0078 4.1414L31.8586 4.99218C32.5195 5.65312 32.5195 6.72187 31.8586 7.37577L29.8125 9.4289L26.5711 6.18749L28.6172 4.1414C29.2781 3.48046 30.3469 3.48046 31.0008 4.1414H31.0078ZM14.7516 18.0141L24.1875 8.57109L27.4289 11.8125L17.9859 21.2484C17.782 21.4523 17.5289 21.6 17.2547 21.6773L13.1414 22.8516L14.3156 18.7383C14.393 18.4641 14.5406 18.2109 14.7445 18.007L14.7516 18.0141ZM26.2336 1.75781L12.3609 15.6234C11.7492 16.2351 11.3062 16.9875 11.0742 17.8102L9.06328 24.8414C8.89453 25.432 9.05625 26.0648 9.49219 26.5008C9.92813 26.9367 10.5609 27.0984 11.1516 26.9297L18.1828 24.9187C19.0125 24.6797 19.7648 24.2367 20.3695 23.632L34.2422 9.7664C36.218 7.79062 36.218 4.58437 34.2422 2.60859L33.3914 1.75781C31.4156 -0.217975 28.2094 -0.217975 26.2336 1.75781ZM6.1875 4.49999C2.77031 4.49999 0 7.27031 0 10.6875V29.8125C0 33.2297 2.77031 36 6.1875 36H25.3125C28.7297 36 31.5 33.2297 31.5 29.8125V21.9375C31.5 21.0023 30.7477 20.25 29.8125 20.25C28.8773 20.25 28.125 21.0023 28.125 21.9375V29.8125C28.125 31.3664 26.8664 32.625 25.3125 32.625H6.1875C4.63359 32.625 3.375 31.3664 3.375 29.8125V10.6875C3.375 9.13359 4.63359 7.87499 6.1875 7.87499H14.0625C14.9977 7.87499 15.75 7.12265 15.75 6.18749C15.75 5.25234 14.9977 4.49999 14.0625 4.49999H6.1875Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_264_175">
        <Path d="M0 0H36V36H0V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Hourglass icon for Focus Exercise
const FocusIcon = () => (
  <Svg width={27} height={36} viewBox="0 0 27 36" fill="none">
    <G clipPath="url(#clip0_264_186)">
      <Path
        d="M1.6875 0C0.752344 0 0 0.752344 0 1.6875C0 2.62266 0.752344 3.375 1.6875 3.375H2.25V4.71094C2.25 7.54453 3.375 10.2656 5.37891 12.2695L11.1164 18L5.37891 23.7305C3.375 25.7344 2.25 28.4555 2.25 31.2891V32.625H1.6875C0.752344 32.625 0 33.3773 0 34.3125C0 35.2477 0.752344 36 1.6875 36H25.3125C26.2477 36 27 35.2477 27 34.3125C27 33.3773 26.2477 32.625 25.3125 32.625H24.75V31.2891C24.75 28.4555 23.625 25.7344 21.6211 23.7305L15.8836 18L21.6141 12.2695C23.625 10.2656 24.75 7.54453 24.75 4.71094V3.375H25.3125C26.2477 3.375 27 2.62266 27 1.6875C27 0.752344 26.2477 0 25.3125 0H1.6875ZM13.5 20.3836L19.2305 26.1141C20.6016 27.4922 21.375 29.3484 21.375 31.2891V32.625H5.625V31.2891C5.625 29.3484 6.39844 27.4922 7.76953 26.1211L13.5 20.3836ZM13.5 15.6094L7.76953 9.87891C6.39844 8.50781 5.625 6.65156 5.625 4.71094V3.375H21.375V4.71094C21.375 6.65156 20.6016 8.50781 19.2305 9.87891L13.5 15.6164V15.6094Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_264_186">
        <Path d="M0 0H27V36H0V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// List/Checklist icon for Daily Nap Planner
const PlannerIcon = () => (
  <Svg width={37} height={37} viewBox="0 0 37 37" fill="none">
    <Path
      d="M2 32H16.4375M35 23L26.75 35L22.625 29M2 17H24.6875M2 2H24.6875"
      stroke="#1E2A38"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
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
    <G clipPath="url(#clip0_191_653)">
      <Path
        d="M18.125 10C18.125 12.1549 17.269 14.2215 15.7452 15.7452C14.2215 17.269 12.1549 18.125 10 18.125C7.84512 18.125 5.77849 17.269 4.25476 15.7452C2.73102 14.2215 1.875 12.1549 1.875 10C1.875 7.84512 2.73102 5.77849 4.25476 4.25476C5.77849 2.73102 7.84512 1.875 10 1.875C12.1549 1.875 14.2215 2.73102 15.7452 4.25476C17.269 5.77849 18.125 7.84512 18.125 10ZM0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C4.8043 18.9464 7.34784 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 7.34784 18.9464 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10ZM9.0625 4.6875V10C9.0625 10.3125 9.21875 10.6055 9.48047 10.7812L13.2305 13.2812C13.6602 13.5703 14.2422 13.4531 14.5312 13.0195C14.8203 12.5859 14.7031 12.0078 14.2695 11.7188L10.9375 9.5V4.6875C10.9375 4.16797 10.5195 3.75 10 3.75C9.48047 3.75 9.0625 4.16797 9.0625 4.6875Z"
        fill="#FDFDFD"
        fillOpacity="0.6"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_191_653">
        <Path d="M0 0H20V20H0V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Profile icon for Profile tab
const ProfileIcon = () => (
  <Svg width={18} height={20} viewBox="0 0 18 20" fill="none">
    <G clipPath="url(#clip0_191_667)">
      <Path
        d="M12.0938 5C12.0938 4.1712 11.7645 3.37634 11.1785 2.79029C10.5924 2.20424 9.79755 1.875 8.96875 1.875C8.13995 1.875 7.34509 2.20424 6.75904 2.79029C6.17299 3.37634 5.84375 4.1712 5.84375 5C5.84375 5.8288 6.17299 6.62366 6.75904 7.20971C7.34509 7.79576 8.13995 8.125 8.96875 8.125C9.79755 8.125 10.5924 7.79576 11.1785 7.20971C11.7645 6.62366 12.0938 5.8288 12.0938 5ZM3.96875 5C3.96875 3.67392 4.49553 2.40215 5.43322 1.46447C6.3709 0.526784 7.64267 0 8.96875 0C10.2948 0 11.5666 0.526784 12.5043 1.46447C13.442 2.40215 13.9688 3.67392 13.9688 5C13.9688 6.32608 13.442 7.59785 12.5043 8.53553C11.5666 9.47322 10.2948 10 8.96875 10C7.64267 10 6.3709 9.47322 5.43322 8.53553C4.49553 7.59785 3.96875 6.32608 3.96875 5ZM2.14453 18.125H15.793C15.4453 15.6523 13.3203 13.75 10.7539 13.75H7.18359C4.61719 13.75 2.49219 15.6523 2.14453 18.125ZM0.21875 18.8398C0.21875 14.9922 3.33594 11.875 7.18359 11.875H10.7539C14.6016 11.875 17.7188 14.9922 17.7188 18.8398C17.7188 19.4805 17.1992 20 16.5586 20H1.37891C0.738281 20 0.21875 19.4805 0.21875 18.8398Z"
        fill="#FDFDFD"
        fillOpacity="0.6"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_191_667">
        <Path d="M0 0H17.5V20H0V0Z" fill="white" transform="translate(0.21875)"/>
      </ClipPath>
    </Defs>
  </Svg>
);

export default function FeaturesScreen({ navigation }) {

  const handleHomePress = () => {
    console.log('Home tab pressed');
    if (navigation) {
      navigation.navigate('Home');
    }
  };

  const handleHistoryPress = () => {
    console.log('History tab pressed');
    if (navigation) {
      navigation.navigate('NapHistory');
    }
  };

  const handleFeaturesPress = () => {
    console.log('Features tab pressed');
    // Already on features screen
  };

  const handleProfilePress = () => {
    console.log('Profile tab pressed');
    if (navigation) {
      navigation.navigate('Profile');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Features</Text>
      </View>

      {/* Feature Cards Grid */}
      <View style={styles.featuresSection}>
        <View style={styles.featuresGrid}>
          {/* First Row */}
          <View style={styles.gridRow}>
            <TouchableOpacity
              style={styles.featureCard}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Sounds')}
            >
              <View style={styles.iconContainer}>
                <SoundsIcon />
              </View>
              <Text style={styles.featureLabel}>Sounds</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.featureCard}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('BreathingExercise')}
            >
              <View style={styles.iconContainer}>
                <BreathingIcon />
              </View>
              <Text style={styles.featureLabel}>Breathing{'\n'}Exercise</Text>
            </TouchableOpacity>
          </View>

          {/* Second Row */}
          <View style={styles.gridRow}>
            <TouchableOpacity
              style={styles.featureCard}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('NapScheduler')}
            >
              <View style={styles.iconContainer}>
                <SchedulerIcon />
              </View>
              <Text style={styles.featureLabel}>Nap Scheduler</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.featureCard}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Journal')}
            >
              <View style={styles.iconContainer}>
                <JournalIcon />
              </View>
              <Text style={styles.featureLabel}>Journal</Text>
            </TouchableOpacity>
          </View>

          {/* Third Row */}
          <View style={styles.gridRow}>
            <TouchableOpacity
              style={styles.featureCard}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('FocusExercise')}
            >
              <View style={styles.iconContainer}>
                <FocusIcon />
              </View>
              <Text style={styles.featureLabel}>Focus Exercise</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.featureCard}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('DailyNapPlanner')}
            >
              <View style={styles.iconContainer}>
                <PlannerIcon />
              </View>
              <Text style={styles.featureLabel}>Daily Nap Planner</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Bottom Content */}
      <View style={styles.bottomContent}>
        <Text style={styles.subtitle}>Explore tools to enhance your naps.</Text>

        <View style={styles.mascotContainer}>
          <Image
            source={{ uri: 'https://api.builder.io/api/v1/image/assets/TEMP/97300427233e285e1c34f406fef5bf257d4767f5?width=544' }}
            style={styles.mascotImage}
            resizeMode="contain"
          />
        </View>
      </View>

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

          <TouchableOpacity style={styles.navButton}>
            <View style={styles.featuresIcon}>
              <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                <Path d="M10 0L12.5 7.5H20L14.5 12L16.5 20L10 15L3.5 20L5.5 12L0 7.5H7.5L10 0Z" fill="#B7AFC5" />
              </Svg>
            </View>
            <Text style={styles.navTextActive}>Features</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={handleProfilePress}>
            <ProfileIcon />
            <Text style={styles.navText}>Profile</Text>
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
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerTitle: {
    color: '#FDFDFD',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 30,
  },
  featuresSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  featuresGrid: {
    width: '100%',
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  featureCard: {
    width: 168,
    height: 120,
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  iconContainer: {
    marginBottom: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureLabel: {
    color: '#1E2A38',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '700', // Changed from 600 to 700 to match design
    lineHeight: 20,
  },
  bottomContent: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50, // Space for bottom navigation
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.75)',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700', // Changed from 600 to 700 to match design
    lineHeight: 20,
    marginBottom: 20,
  },
  mascotContainer: {
    width: 272,
    height: 166,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mascotImage: {
    width: 272,
    height: 166,
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
  featuresIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
