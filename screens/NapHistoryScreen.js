import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Image,
  Modal,
  Alert,
} from 'react-native';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';
import napDataManager from '../utils/napDataManager';
import NapHistoryDetailCard from '../components/NapHistoryDetailCard.js';

const NapHistoryScreen = ({ navigation }) => {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.toLocaleDateString('en-US', { month: 'short' })} ${now.getFullYear()}`;
  });
  const [expandedItems, setExpandedItems] = useState({});
  const [napHistory, setNapHistory] = useState([]);
  const [totalNaps, setTotalNaps] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [availableMonths, setAvailableMonths] = useState([]);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);

  // Load nap data when component mounts or month changes
  useEffect(() => {
    loadNapData();
    loadAvailableMonths();
  }, [selectedMonth]);

  const loadNapData = async () => {
    try {
      const { month, year } = napDataManager.parseMonthString(selectedMonth);

      // Load nap history for selected month
      const history = await napDataManager.getFormattedNapHistory(month, year);
      setNapHistory(history);

      // Calculate total naps for current month
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      if (month === currentMonth && year === currentYear) {
        const total = await napDataManager.getTotalNapsThisMonth();
        setTotalNaps(total);
      } else {
        setTotalNaps(history.length);
      }

      // Calculate current streak (only for current month view)
      if (month === currentMonth && year === currentYear) {
        const streak = await napDataManager.getCurrentStreak();
        setCurrentStreak(streak);
      } else {
        setCurrentStreak(0);
      }
    } catch (error) {
      console.error('Failed to load nap data:', error);
    }
  };

  const loadAvailableMonths = async () => {
    try {
      const months = await napDataManager.getAvailableMonths();
      // Always include current month even if no data
      const currentMonth = `${new Date().toLocaleDateString('en-US', { month: 'short' })} ${new Date().getFullYear()}`;
      if (!months.includes(currentMonth)) {
        months.unshift(currentMonth);
      }
      setAvailableMonths(months.length > 0 ? months : [currentMonth]);
    } catch (error) {
      console.error('Failed to load available months:', error);
      // Fallback to current month if error
      const currentMonth = `${new Date().toLocaleDateString('en-US', { month: 'short' })} ${new Date().getFullYear()}`;
      setAvailableMonths([currentMonth]);
    }
  };

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    setShowMonthDropdown(false);
  };

  const navigateToPreviousMonth = () => {
    const { month, year } = napDataManager.parseMonthString(selectedMonth);
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    setSelectedMonth(`${monthNames[prevMonth]} ${prevYear}`);
  };

  const navigateToNextMonth = () => {
    const { month, year } = napDataManager.parseMonthString(selectedMonth);
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    setSelectedMonth(`${monthNames[nextMonth]} ${nextYear}`);
  };

  // Helper function to determine energy level from refreshed feeling
  const getEnergyLevel = (refreshedFeeling) => {
    if (refreshedFeeling >= 0.8) return 'Energized';
    if (refreshedFeeling >= 0.6) return 'Refreshed';
    if (refreshedFeeling >= 0.4) return 'Somewhat Tired';
    return 'Groggy';
  };

  // Callback functions for expanded view
  const handleAddNote = (napId) => {
    // Find the nap data for the given napId
    const napData = napHistory.find(nap => nap.id === napId);
    if (napData) {
      // Navigate to NapShareScreen with nap data
      navigation.navigate('NapShareScreen', {
        napData: {
          id: napData.id,
          title: `Nap on ${napData.day} • ${napData.startTime || napData.time}`,
          duration: napData.duration,
          startTime: napData.startTime || 'Unknown',
          endTime: napData.endTime || napData.finishedTime, // Use calculated endTime or finishedTime as fallback
          mood: getEnergyLevel(napData.refreshedFeeling || 0.6),
          sleepStage: napData.sleepStage || 'Light',
          date: napData.day,
          time: napData.time,
          note: napData.note || '' // Include existing note
        }
      });
    }
  };

  const handleCollapse = (napId) => {
    toggleExpand(napId);
  };

  const handleDeleteNap = (napId) => {
    Alert.alert(
      'Delete Nap',
      'Are you sure you want to delete this nap? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const success = await napDataManager.deleteNap(napId);
              if (success) {
                // Reload the data to show updated list
                await loadNapData();
                await loadAvailableMonths();
                console.log('Nap deleted successfully');
              }
            } catch (error) {
              console.error('Failed to delete nap:', error);
            }
          },
        },
      ]
    );
  };

  const BackArrowIcon = () => (
    <Svg width="18" height="20" viewBox="0 0 18 20" fill="none">
      <G clipPath="url(#clip0_254_267)">
        <Path
          d="M0.367188 9.11719C-0.121094 9.60547 -0.121094 10.3984 0.367188 10.8867L6.61719 17.1367C7.10547 17.625 7.89844 17.625 8.38672 17.1367C8.875 16.6484 8.875 15.8555 8.38672 15.3672L4.26562 11.25H16.25C16.9414 11.25 17.5 10.6914 17.5 10C17.5 9.30859 16.9414 8.75 16.25 8.75H4.26953L8.38281 4.63281C8.87109 4.14453 8.87109 3.35156 8.38281 2.86328C7.89453 2.375 7.10156 2.375 6.61328 2.86328L0.363281 9.11328L0.367188 9.11719Z"
          fill="#1E2A38"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_254_267">
          <Path d="M0 0H17.5V20H0V0Z" fill="white"/>
        </ClipPath>
      </Defs>
    </Svg>
  );

  const DropdownIcon = () => (
    <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <Path
        d="M5.4703 9.52969C5.76327 9.82266 6.23905 9.82266 6.53202 9.52969L11.032 5.02969C11.325 4.73672 11.325 4.26094 11.032 3.96797C10.7391 3.675 10.2633 3.675 9.9703 3.96797L5.99999 7.93828L2.02968 3.97031C1.73671 3.67734 1.26093 3.67734 0.967957 3.97031C0.674988 4.26328 0.674988 4.73906 0.967957 5.03203L5.46796 9.53203L5.4703 9.52969Z"
        fill="#FDFDFD"
      />
    </Svg>
  );

  const WaterDropIcon = () => (
    <Svg width="18" height="20" viewBox="0 0 18 20" fill="none">
      <G clipPath="url(#clip0_254_284)">
        <Path
          d="M6.22266 0.210932C6.52734 -0.074224 7 -0.0703177 7.30469 0.214839C8.38281 1.22656 9.39453 2.3164 10.3398 3.49609C10.7695 2.93359 11.2578 2.32031 11.7852 1.82031C12.0938 1.53124 12.5703 1.53124 12.8789 1.82421C14.2305 3.11328 15.375 4.8164 16.1797 6.43359C16.9727 8.02734 17.5 9.65625 17.5 10.8047C17.5 15.7891 13.6016 20 8.75 20C3.84375 20 0 15.7852 0 10.8008C0 9.30078 0.695313 7.46874 1.77344 5.65624C2.86328 3.8164 4.40234 1.89843 6.22266 0.210932ZM8.81641 16.25C9.80469 16.25 10.6797 15.9766 11.5039 15.4297C13.1484 14.2812 13.5898 11.9844 12.6016 10.1797C12.4258 9.82812 11.9766 9.80468 11.7227 10.1016L10.7383 11.2461C10.4805 11.543 10.0156 11.5352 9.77344 11.2266C9.12891 10.4062 7.97656 8.9414 7.32031 8.10937C7.07422 7.79687 6.60547 7.79296 6.35547 8.10546C5.03516 9.76562 4.37109 10.8125 4.37109 11.9883C4.375 14.6641 6.35156 16.25 8.81641 16.25Z"
          fill="#B7AFC5"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_254_284">
          <Path d="M0 0H17.5V20H0V0Z" fill="white"/>
        </ClipPath>
      </Defs>
    </Svg>
  );

  const ChevronDownIcon = () => (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <Path
        d="M7.29374 12.7062C7.68437 13.0969 8.31874 13.0969 8.70937 12.7062L14.7094 6.70624C15.1 6.31562 15.1 5.68124 14.7094 5.29062C14.3187 4.89999 13.6844 4.89999 13.2937 5.29062L7.99999 10.5844L2.70624 5.29374C2.31562 4.90312 1.68124 4.90312 1.29062 5.29374C0.899994 5.68437 0.899994 6.31874 1.29062 6.70937L7.29062 12.7094L7.29374 12.7062Z"
        fill="#1E2A38"
      />
    </Svg>
  );

  const LeftArrowIcon = () => (
    <Svg width="8" height="12" viewBox="0 0 8 12" fill="none">
      <Path
        d="M0.220312 5.4703C-0.0726566 5.76327 -0.0726566 6.23905 0.220312 6.53202L4.72031 11.032C5.01328 11.325 5.48906 11.325 5.78203 11.032C6.075 10.7391 6.075 10.2633 5.78203 9.9703L1.81172 5.99999L5.77969 2.02968C6.07266 1.73671 6.07266 1.26093 5.77969 0.967957C5.48672 0.674988 5.01094 0.674988 4.71797 0.967957L0.217968 5.46796L0.220312 5.4703Z"
        fill="#B7AFC5"
      />
    </Svg>
  );

  const RightArrowIcon = () => (
    <Svg width="8" height="12" viewBox="0 0 8 12" fill="none">
      <Path
        d="M7.77968 5.4703C8.07264 5.76327 8.07264 6.23905 7.77968 6.53202L3.27968 11.032C2.98671 11.325 2.51093 11.325 2.21796 11.032C1.92499 10.7391 1.92499 10.2633 2.21796 9.9703L6.18827 5.99999L2.2203 2.02968C1.92733 1.73671 1.92733 1.26093 2.2203 0.967957C2.51327 0.674988 2.98905 0.674988 3.28202 0.967957L7.78202 5.46796L7.77968 5.4703Z"
        fill="#B7AFC5"
      />
    </Svg>
  );

  // Home icon for Home tab
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
          fill="#B7AFC5"
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E2A38" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <BackArrowIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nap History</Text>
        </View>

        <TouchableOpacity
          style={styles.monthSelector}
          onPress={() => setShowMonthDropdown(true)}
        >
          <Text style={styles.monthText}>{selectedMonth}</Text>
          <DropdownIcon />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Total Naps Card */}
        <View style={styles.totalNapsCard}>
          <Text style={styles.totalNapsLabel}>Total naps this month:</Text>
          <Text style={styles.totalNapsCount}>{totalNaps}</Text>
        </View>

        {/* Streak Card - only show for current month */}
        {selectedMonth === `${new Date().toLocaleDateString('en-US', { month: 'short' })} ${new Date().getFullYear()}` && currentStreak > 0 && (
          <View style={styles.streakCard}>
            <WaterDropIcon />
            <View style={styles.streakContent}>
              <Text style={styles.streakTitle}>
                {currentStreak}-Day Nap Streak{currentStreak > 1 ? '!' : '!'}
              </Text>
              <Text style={styles.streakSubtitle}>Keep it up, your brain will thank you!</Text>
            </View>
          </View>
        )}

        {/* Nap History List */}
        {napHistory.length > 0 ? (
          napHistory.map((nap) => (
            <View key={nap.id} style={styles.napItemContainer}>
              {expandedItems[nap.id] ? (
                // Expanded view
                <NapHistoryDetailCard
                  date={nap.day}
                  time={nap.time}
                  duration={nap.duration}
                  sleepStage={nap.sleepStage || 'Light'}
                  energyLevel={getEnergyLevel(nap.refreshedFeeling || 0.6)}
                  onAddNote={() => handleAddNote(nap.id)}
                  onCollapse={() => handleCollapse(nap.id)}
                  onDelete={() => handleDeleteNap(nap.id)}
                />
              ) : (
                // Collapsed view
                <TouchableOpacity
                  style={styles.napItem}
                  onPress={() => toggleExpand(nap.id)}
                >
                  <View style={styles.napItemLeft}>
                    <View style={styles.napDateInfo}>
                      <Text style={styles.napDay}>{nap.day}</Text>
                      <Text style={styles.napTime}>{nap.time}</Text>
                    </View>
                  </View>

                  <View style={styles.napItemRight}>
                    <View style={styles.durationBadge}>
                      <Text style={styles.durationText}>{nap.duration}</Text>
                    </View>
                    <ChevronDownIcon />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No naps recorded for {selectedMonth}</Text>
            <Text style={styles.emptyStateSubtext}>Start a nap to see your history here!</Text>
          </View>
        )}

        {/* Month Navigation */}
        <View style={styles.monthNavigation}>
          <TouchableOpacity style={styles.monthNavButton} onPress={navigateToPreviousMonth}>
            <LeftArrowIcon />
            <Text style={styles.monthNavText}>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.monthNavButton} onPress={navigateToNextMonth}>
            <Text style={styles.monthNavText}>Next</Text>
            <RightArrowIcon />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <View style={styles.navContainer}>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
            <HomeIcon />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton}>
            <ClockIcon />
            <Text style={styles.navTextActive}>History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Features')}>
            <View style={styles.featuresIcon}>
              <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                <Path d="M10 0L12.5 7.5H20L14.5 12L16.5 20L10 15L3.5 20L5.5 12L0 7.5H7.5L10 0Z" fill="rgba(253, 253, 253, 0.6)" />
              </Svg>
            </View>
            <Text style={styles.navText}>Features</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Profile')}>
            <ProfileIcon />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Month Dropdown Modal */}
      <Modal
        visible={showMonthDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowMonthDropdown(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowMonthDropdown(false)}
        >
          <View style={styles.dropdownModal}>
            <ScrollView style={styles.dropdownList}>
              {availableMonths.map((month, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dropdownItem,
                    selectedMonth === month && styles.dropdownItemSelected
                  ]}
                  onPress={() => handleMonthSelect(month)}
                >
                  <Text style={[
                    styles.dropdownItemText,
                    selectedMonth === month && styles.dropdownItemTextSelected
                  ]}>
                    {month}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2A38',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 24,
    height: 104,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 5,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FDFDFD',
    fontFamily: 'Inter',
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#B7AFC5',
    backgroundColor: 'transparent',
  },
  monthText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FDFDFD',
    marginRight: 8,
    fontFamily: 'Inter',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 100, // Extra padding at bottom to prevent content from being hidden behind bottom navigation
  },
  totalNapsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginBottom: 12,
  },
  totalNapsLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1E2A38',
    fontFamily: 'Inter',
  },
  totalNapsCount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E2A38',
    fontFamily: 'Inter',
  },
  streakCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 18,
    marginBottom: 12,
  },
  streakContent: {
    marginLeft: 16,
    flex: 1,
  },
  streakTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E2A38',
    fontFamily: 'Inter',
    marginBottom: 4,
  },
  streakSubtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(30, 42, 56, 0.70)',
    fontFamily: 'Inter',
  },
  napItemContainer: {
    marginBottom: 11,
  },
  napItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  napItemLeft: {
    flex: 1,
  },
  napDateInfo: {
    marginRight: 16,
  },
  napDay: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E2A38',
    fontFamily: 'Inter',
    marginBottom: 4,
  },
  napTime: {
    fontSize: 12,
    fontWeight: '400',
    color: '#1E2A38',
    fontFamily: 'Inter',
  },
  napItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationBadge: {
    backgroundColor: 'rgba(183, 175, 197, 0.20)',
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 24,
  },
  durationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E2A38',
    fontFamily: 'Inter',
  },
  monthNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    marginTop: 0,
    marginBottom: 20, // Reset to original since we're using scrollContent padding
  },
  monthNavButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthNavText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#B7AFC5',
    fontFamily: 'Inter',
    marginHorizontal: 8,
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
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#B7AFC5',
    fontFamily: 'Inter',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(183, 175, 197, 0.7)',
    fontFamily: 'Inter',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownModal: {
    backgroundColor: '#1E2A38',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#B7AFC5',
    minWidth: 200,
    maxHeight: 300,
  },
  dropdownList: {
    maxHeight: 250,
  },
  dropdownItem: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(183, 175, 197, 0.2)',
  },
  dropdownItemSelected: {
    backgroundColor: 'rgba(183, 175, 197, 0.2)',
  },
  dropdownItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FDFDFD',
    fontFamily: 'Inter',
    textAlign: 'center',
  },
  dropdownItemTextSelected: {
    color: '#B7AFC5',
    fontWeight: '600',
  },
});

export default NapHistoryScreen;
