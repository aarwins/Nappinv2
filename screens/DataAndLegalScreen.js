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
import AsyncStorage from '@react-native-async-storage/async-storage';

// Back arrow icon for header (consistent with other screens)
const BackArrowIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M0.439453 10.9441C-0.146484 11.5301 -0.146484 12.4816 0.439453 13.0676L7.93945 20.5676C8.52539 21.1535 9.47695 21.1535 10.0629 20.5676C10.6488 19.9816 10.6488 19.0301 10.0629 18.4441L5.11758 13.5035H19.4988C20.3285 13.5035 20.9988 12.8332 20.9988 12.0035C20.9988 11.1738 20.3285 10.5035 19.4988 10.5035H5.12227L10.0582 5.56289C10.6441 4.97695 10.6441 4.02539 10.0582 3.43945C9.47227 2.85352 8.5207 2.85352 7.93477 3.43945L0.434766 10.9395L0.439453 10.9441Z"
      fill="#FDFDFD"
    />
  </Svg>
);

// Download icon for Data Exportation
const DownloadIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <G clipPath="url(#clip0_302_1480)">
      <Path
        d="M10.125 1.125C10.125 0.502734 9.62227 0 9 0C8.37773 0 7.875 0.502734 7.875 1.125V9.65742L5.29453 7.07695C4.85508 6.6375 4.14141 6.6375 3.70195 7.07695C3.2625 7.51641 3.2625 8.23008 3.70195 8.66953L8.20195 13.1695C8.64141 13.609 9.35508 13.609 9.79453 13.1695L14.2945 8.66953C14.734 8.23008 14.734 7.51641 14.2945 7.07695C13.8551 6.6375 13.1414 6.6375 12.702 7.07695L10.125 9.65742V1.125ZM2.25 12.375C1.00898 12.375 0 13.384 0 14.625V15.75C0 16.991 1.00898 18 2.25 18H15.75C16.991 18 18 16.991 18 15.75V14.625C18 13.384 16.991 12.375 15.75 12.375H12.1816L10.5891 13.9676C9.71016 14.8465 8.28633 14.8465 7.40742 13.9676L5.81836 12.375H2.25ZM15.1875 14.3438C15.4113 14.3438 15.6259 14.4326 15.7841 14.5909C15.9424 14.7491 16.0312 14.9637 16.0312 15.1875C16.0312 15.4113 15.9424 15.6259 15.7841 15.7841C15.6259 15.9424 15.4113 16.0312 15.1875 16.0312C14.9637 16.0312 14.7491 15.9424 14.5909 15.7841C14.4326 15.6259 14.3438 15.4113 14.3438 15.1875C14.3438 14.9637 14.4326 14.7491 14.5909 14.5909C14.7491 14.4326 14.9637 14.3438 15.1875 14.3438Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_302_1480">
        <Path d="M0 0H18V18H0V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Trash icon for Clear Journal
const TrashIcon = () => (
  <Svg width={16} height={18} viewBox="0 0 16 18" fill="none">
    <G clipPath="url(#clip0_302_1488)">
      <Path
        d="M4.87812 0.622266L4.625 1.125H1.25C0.627734 1.125 0.125 1.62773 0.125 2.25C0.125 2.87227 0.627734 3.375 1.25 3.375H14.75C15.3723 3.375 15.875 2.87227 15.875 2.25C15.875 1.62773 15.3723 1.125 14.75 1.125H11.375L11.1219 0.622266C10.932 0.239063 10.5418 0 10.1164 0H5.88359C5.4582 0 5.06797 0.239063 4.87812 0.622266ZM14.75 4.5H1.25L1.99531 16.418C2.05156 17.3074 2.78984 18 3.6793 18H12.3207C13.2102 18 13.9484 17.3074 14.0047 16.418L14.75 4.5Z"
        fill="#B7AFC5"
        fillOpacity="0.8"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_302_1488">
        <Path d="M0.125 0H15.875V18H0.125V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Shield icon for Privacy Policy
const ShieldIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <G clipPath="url(#clip0_302_1496)">
      <Path
        d="M9 0C9.16172 0 9.32344 0.0351563 9.47109 0.101953L16.091 2.91094C16.8645 3.23789 17.441 4.00078 17.4375 4.92188C17.4199 8.40938 15.9855 14.7902 9.92813 17.6906C9.34102 17.9719 8.65899 17.9719 8.07188 17.6906C2.01445 14.7902 0.580079 8.40938 0.562501 4.92188C0.558985 4.00078 1.13555 3.23789 1.90899 2.91094L8.53242 0.101953C8.67656 0.0351563 8.83828 0 9 0ZM9 2.34844V15.6375C13.8516 13.2891 15.1559 8.08945 15.1875 4.97109L9 2.34844Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_302_1496">
        <Path d="M0 0H18V18H0V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Document icon for Terms of Use
const DocumentIcon = () => (
  <Svg width={14} height={18} viewBox="0 0 14 18" fill="none">
    <G clipPath="url(#clip0_302_1504)">
      <Path
        d="M2.5 0C1.25898 0 0.25 1.00898 0.25 2.25V15.75C0.25 16.991 1.25898 18 2.5 18H11.5C12.741 18 13.75 16.991 13.75 15.75V5.625H9.25C8.62773 5.625 8.125 5.12227 8.125 4.5V0H2.5ZM9.25 0V4.5H13.75L9.25 0ZM4.1875 9H9.8125C10.1219 9 10.375 9.25313 10.375 9.5625C10.375 9.87187 10.1219 10.125 9.8125 10.125H4.1875C3.87812 10.125 3.625 9.87187 3.625 9.5625C3.625 9.25313 3.87812 9 4.1875 9ZM4.1875 11.25H9.8125C10.1219 11.25 10.375 11.5031 10.375 11.8125C10.375 12.1219 10.1219 12.375 9.8125 12.375H4.1875C3.87812 12.375 3.625 12.1219 3.625 11.8125C3.625 11.5031 3.87812 11.25 4.1875 11.25ZM4.1875 13.5H9.8125C10.1219 13.5 10.375 13.7531 10.375 14.0625C10.375 14.3719 10.1219 14.625 9.8125 14.625H4.1875C3.87812 14.625 3.625 14.3719 3.625 14.0625C3.625 13.7531 3.87812 13.5 4.1875 13.5Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_302_1504">
        <Path d="M0.25 0H13.75V18H0.25V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Right arrow icon for cards
const RightArrowIcon = ({ isActive = true }) => (
  <Svg width={9} height={14} viewBox="0 0 10 14" fill="none">
    <G clipPath="url(#clip0_302_1485)">
      <Path
        d="M9.11797 6.38213C9.45977 6.72393 9.45977 7.279 9.11797 7.6208L3.86797 12.8708C3.52618 13.2126 2.9711 13.2126 2.6293 12.8708C2.28751 12.529 2.28751 11.9739 2.6293 11.6321L7.26133 7.0001L2.63204 2.36807C2.29024 2.02627 2.29024 1.47119 2.63204 1.12939C2.97383 0.787598 3.52891 0.787598 3.87071 1.12939L9.12071 6.3794L9.11797 6.38213Z"
        fill={isActive ? "#1E2A38" : "#B7AFC5"}
        fillOpacity={isActive ? "1" : "0.8"}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_302_1485">
        <Path d="M0.625 0H9.375V14H0.625V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Menu card component
const MenuCard = ({ children }) => (
  <View style={styles.menuCard}>
    {children}
  </View>
);

// Menu item component
const MenuItem = ({ icon, title, subtitle, onPress, isActive = true }) => (
  <TouchableOpacity
    style={[styles.menuItem, !isActive && styles.menuItemInactive]}
    onPress={isActive ? onPress : null}
    disabled={!isActive}
  >
    <View style={styles.menuIconContainer}>
      {icon}
    </View>
    <View style={styles.menuContent}>
      <Text style={[styles.menuTitle, !isActive && styles.menuTitleInactive]}>
        {title}
      </Text>
      {subtitle && (
        <Text style={[styles.menuSubtitle, !isActive && styles.menuSubtitleInactive]}>
          {subtitle}
        </Text>
      )}
    </View>
    <View style={styles.arrowContainer}>
      <RightArrowIcon isActive={isActive} />
    </View>
  </TouchableOpacity>
);

// Separator component
const MenuSeparator = () => <View style={styles.menuSeparator} />;

export default function DataAndLegalScreen({ navigation }) {
  const handleBackPress = () => {
    console.log('Back button pressed');
    if (navigation) {
      navigation.goBack();
    } else {
      console.log('Navigation prop is undefined');
    }
  };

  const handleDataExportationPress = () => {
    Alert.alert(
      'Coming Soon',
      'Data exportation feature will be available in a future update.',
      [{ text: 'OK' }]
    );
  };

  const handleClearJournalPress = () => {
    Alert.alert(
      'Clear Journal',
      'Are you sure you want to clear all journal entries? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            try {
              // Clear journal entries from AsyncStorage
              await AsyncStorage.removeItem('nappin_journal_entries');
              console.log('🗑️ Cleared all journal entries from storage');

              // Show success message
              Alert.alert(
                'Journal Cleared',
                'All journal entries have been successfully cleared.',
                [{ text: 'OK' }]
              );
            } catch (error) {
              console.error('Failed to clear journal entries:', error);
              Alert.alert(
                'Error',
                'Failed to clear journal entries. Please try again.',
                [{ text: 'OK' }]
              );
            }
          }
        }
      ]
    );
  };

  const handlePrivacyPolicyPress = () => {
    navigation.navigate('PrivacyPolicy');
  };

  const handleTermsOfUsePress = () => {
    navigation.navigate('TermsOfUse');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <BackArrowIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Data & Legal</Text>
        </View>

        {/* Menu Cards */}
        <View style={styles.cardsContainer}>
          {/* First Card - Data Options */}
          <MenuCard>
            <MenuItem
              icon={<DownloadIcon />}
              title="Data Exportation (Coming Soon)"
              onPress={handleDataExportationPress}
              isActive={true}
            />
            <MenuSeparator />
            <MenuItem
              icon={<TrashIcon />}
              title="Clear Journal"
              onPress={handleClearJournalPress}
              isActive={true}
            />
          </MenuCard>

          {/* Second Card - Legal Options */}
          <MenuCard>
            <MenuItem
              icon={<ShieldIcon />}
              title="Privacy Policy"
              onPress={handlePrivacyPolicyPress}
              isActive={true}
            />
            <MenuSeparator />
            <MenuItem
              icon={<DocumentIcon />}
              title="Terms of Use"
              onPress={handleTermsOfUsePress}
              isActive={true}
            />
          </MenuCard>
        </View>
      </ScrollView>
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
    paddingBottom: 100, // Space for bottom navigation if needed
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 56,
    marginTop: 48,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    zIndex: 1,
  },
  headerTitle: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    textAlign: 'center',
    flex: 1,
    paddingHorizontal: 48,
  },
  cardsContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 12,
  },
  menuCard: {
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 56,
  },
  menuItemInactive: {
    opacity: 1, // Keep full opacity, color changes handled in text/icon styles
  },
  menuIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
    justifyContent: 'center',
  },
  menuTitle: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  menuTitleInactive: {
    color: 'rgba(183, 175, 197, 0.8)',
  },
  menuSubtitle: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    marginTop: 2,
  },
  menuSubtitleInactive: {
    color: 'rgba(183, 175, 197, 0.8)',
  },
  arrowContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
  },
  menuSeparator: {
    height: 1,
    backgroundColor: '#1E2A38',
    opacity: 0.2,
    marginLeft: 16,
    marginRight: 16,
  },
});
