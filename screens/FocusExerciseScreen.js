import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { Svg, Path, G, Defs, ClipPath } from 'react-native-svg';

// Back arrow icon
const BackArrowIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M0.439453 10.9441C-0.146484 11.5301 -0.146484 12.4816 0.439453 13.0676L7.93945 20.5676C8.52539 21.1535 9.47695 21.1535 10.0629 20.5676C10.6488 19.9816 10.6488 19.0301 10.0629 18.4441L5.11758 13.5035H19.4988C20.3285 13.5035 20.9988 12.8332 20.9988 12.0035C20.9988 11.1738 20.3285 10.5035 19.4988 10.5035H5.12227L10.0582 5.56289C10.6441 4.97695 10.6441 4.02539 10.0582 3.43945C9.47227 2.85352 8.5207 2.85352 7.93477 3.43945L0.434766 10.9395L0.439453 10.9441Z"
      fill="#FDFDFD"
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
    <G clipPath="url(#clip0_349_276)">
      <Path
        d="M18.125 10C18.125 12.1549 17.269 14.2215 15.7452 15.7452C14.2215 17.269 12.1549 18.125 10 18.125C7.84512 18.125 5.77849 17.269 4.25476 15.7452C2.73102 14.2215 1.875 12.1549 1.875 10C1.875 7.84512 2.73102 5.77849 4.25476 4.25476C5.77849 2.73102 7.84512 1.875 10 1.875C12.1549 1.875 14.2215 2.73102 15.7452 4.25476C17.269 5.77849 18.125 7.84512 18.125 10ZM0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C4.8043 18.9464 7.34784 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 7.34784 18.9464 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10ZM9.0625 4.6875V10C9.0625 10.3125 9.21875 10.6055 9.48047 10.7812L13.2305 13.2812C13.6602 13.5703 14.2422 13.4531 14.5312 13.0195C14.8203 12.5859 14.7031 12.0078 14.2695 11.7188L10.9375 9.5V4.6875C10.9375 4.16797 10.5195 3.75 10 3.75C9.48047 3.75 9.0625 4.16797 9.0625 4.6875Z"
        fill="#FDFDFD"
        fillOpacity="0.6"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_349_276">
        <Path d="M0 0H20V20H0V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Profile icon for Profile tab
const ProfileIcon = () => (
  <Svg width={18} height={20} viewBox="0 0 18 20" fill="none">
    <G clipPath="url(#clip0_349_284)">
      <Path
        d="M12.0938 5C12.0938 4.1712 11.7645 3.37634 11.1785 2.79029C10.5924 2.20424 9.79755 1.875 8.96875 1.875C8.13995 1.875 7.34509 2.20424 6.75904 2.79029C6.17299 3.37634 5.84375 4.1712 5.84375 5C5.84375 5.8288 6.17299 6.62366 6.75904 7.20971C7.34509 7.79576 8.13995 8.125 8.96875 8.125C9.79755 8.125 10.5924 7.79576 11.1785 7.20971C11.7645 6.62366 12.0938 5.8288 12.0938 5ZM3.96875 5C3.96875 3.67392 4.49553 2.40215 5.43322 1.46447C6.3709 0.526784 7.64267 0 8.96875 0C10.2948 0 11.5666 0.526784 12.5043 1.46447C13.442 2.40215 13.9688 3.67392 13.9688 5C13.9688 6.32608 13.442 7.59785 12.5043 8.53553C11.5666 9.47322 10.2948 10 8.96875 10C7.64267 10 6.3709 9.47322 5.43322 8.53553C4.49553 7.59785 3.96875 6.32608 3.96875 5ZM2.14453 18.125H15.793C15.4453 15.6523 13.3203 13.75 10.7539 13.75H7.18359C4.61719 13.75 2.49219 15.6523 2.14453 18.125ZM0.21875 18.8398C0.21875 14.9922 3.33594 11.875 7.18359 11.875H10.7539C14.6016 11.875 17.7188 14.9922 17.7188 18.8398C17.7188 19.4805 17.1992 20 16.5586 20H1.37891C0.738281 20 0.21875 19.4805 0.21875 18.8398Z"
        fill="#FDFDFD"
        fillOpacity="0.6"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_349_284">
        <Path d="M0.21875 0H17.7188V20H0.21875V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

export default function FocusExerciseScreen({ navigation }) {

  const handleBack = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

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
    if (navigation) {
      navigation.navigate('Features');
    }
  };

  const handleProfilePress = () => {
    console.log('Profile tab pressed');
    if (navigation) {
      navigation.navigate('Profile');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <BackArrowIcon />
          </TouchableOpacity>
          
          {/* Title */}
          <Text style={styles.headerTitle}>Focus Exercise</Text>
        </View>

        {/* Main Headline */}
        <View style={styles.headlineSection}>
          <Text style={styles.headline}>Let Go, Focus, Relax</Text>
        </View>

        {/* Instructions Card */}
        <View style={styles.instructionsCard}>
          <ScrollView style={styles.instructionsContent} showsVerticalScrollIndicator={false}>
            {/* Instruction 1 */}
            <View style={styles.instructionItem}>
              <Text style={styles.instructionNumber}>1.</Text>
              <View style={styles.instructionTextContainer}>
                <Text style={styles.instructionTitle}>Create a quiet space</Text>
                <Text style={styles.instructionDescription}>
                  Silence notifications and reduce background noise.
                </Text>
              </View>
            </View>

            {/* Instruction 2 */}
            <View style={styles.instructionItem}>
              <Text style={styles.instructionNumber}>2.</Text>
              <View style={styles.instructionTextContainer}>
                <Text style={styles.instructionTitle}>Close your eyes gently</Text>
                <Text style={styles.instructionDescription}>
                  Soften the muscles around your eyes and forehead.
                </Text>
              </View>
            </View>

            {/* Instruction 3 */}
            <View style={styles.instructionItem}>
              <Text style={styles.instructionNumber}>3.</Text>
              <View style={styles.instructionTextContainer}>
                <Text style={styles.instructionTitle}>Follow your breath</Text>
                <Text style={styles.instructionDescription}>
                  Notice each inhalation and exhalation without changing it.
                </Text>
              </View>
            </View>

            {/* Instruction 4 */}
            <View style={styles.instructionItem}>
              <Text style={styles.instructionNumber}>4.</Text>
              <View style={styles.instructionTextContainer}>
                <Text style={styles.instructionTitle}>Acknowledge distractions, then let them go</Text>
                <Text style={styles.instructionDescription}>
                  Focus on the numbers, you'll forget about everything else going on in that busy brain.
                </Text>
              </View>
            </View>

            {/* Instruction 5 */}
            <View style={styles.instructionItem}>
              <Text style={styles.instructionNumber}>5.</Text>
              <View style={styles.instructionTextContainer}>
                <Text style={styles.instructionTitle}>Count slowly from 1 to 60</Text>
                <Text style={styles.instructionDescription}>
                  Match each number to a natural breath or heartbeat. If you lose track, simply begin again.
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Meditation Character Image - Outside the instructions box */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: 'https://api.builder.io/api/v1/image/assets/TEMP/67979d9bf633126582f0a0dc03b4f0064845d856?width=508'
            }}
            style={styles.meditationImage}
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

          <TouchableOpacity style={styles.navButton} onPress={handleFeaturesPress}>
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
  content: {
    flex: 1,
    paddingBottom: 70, // Space for bottom navigation
  },
  header: {
    height: 77,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 46,
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 41,
    padding: 8,
    zIndex: 10,
  },
  headerTitle: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28,
    textAlign: 'center',
  },
  headlineSection: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 6,
  },
  headline: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 34,
    fontWeight: '700',
    lineHeight: 36,
    textAlign: 'center',
  },
  instructionsCard: {
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  instructionsContent: {
    paddingBottom: 0,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
    minHeight: 60,
  },
  instructionNumber: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    width: 18,
    marginTop: -1,
  },
  instructionTextContainer: {
    flex: 1,
    marginLeft: 0,
  },
  instructionTitle: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 2,
  },
  instructionDescription: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  imageContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    marginHorizontal: 16,
  },
  meditationImage: {
    width: 254,
    height: 171,
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
