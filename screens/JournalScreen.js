import React, { useState, useMemo, useEffect } from 'react';
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
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import napDataManager from '../utils/napDataManager';

// Back arrow icon
const BackArrowIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M0.439453 10.9441C-0.146484 11.5301 -0.146484 12.4816 0.439453 13.0676L7.93945 20.5676C8.52539 21.1535 9.47695 21.1535 10.0629 20.5676C10.6488 19.9816 10.6488 19.0301 10.0629 18.4441L5.11758 13.5035H19.4988C20.3285 13.5035 20.9988 12.8332 20.9988 12.0035C20.9988 11.1738 20.3285 10.5035 19.4988 10.5035H5.12227L10.0582 5.56289C10.6441 4.97695 10.6441 4.02539 10.0582 3.43945C9.47227 2.85352 8.5207 2.85352 7.93477 3.43945L0.434766 10.9395L0.439453 10.9441Z"
      fill="#FDFDFD"
    />
  </Svg>
);

// Trophy icon for Total Naps
const TrophyIcon = () => (
  <Svg width={23} height={20} viewBox="0 0 24 20" fill="none">
    <G clipPath="url(#clip0_292_109)">
      <Path
        d="M16.375 0H7.625C6.58984 0 5.74609 0.851563 5.78516 1.88281C5.79297 2.08984 5.80078 2.29688 5.8125 2.5H1.6875C1.16797 2.5 0.75 2.91797 0.75 3.4375C0.75 7.05469 2.05859 9.57031 3.81641 11.2773C5.54688 12.9609 7.65625 13.8086 9.21094 14.2383C10.125 14.4922 10.75 15.2539 10.75 16.0195C10.75 16.8359 10.0859 17.5 9.26953 17.5H8.25C7.55859 17.5 7 18.0586 7 18.75C7 19.4414 7.55859 20 8.25 20H15.75C16.4414 20 17 19.4414 17 18.75C17 18.0586 16.4414 17.5 15.75 17.5H14.7305C13.9141 17.5 13.25 16.8359 13.25 16.0195C13.25 15.2539 13.8711 14.4883 14.7891 14.2383C16.3477 13.8086 18.457 12.9609 20.1875 11.2773C21.9414 9.57031 23.25 7.05469 23.25 3.4375C23.25 2.91797 22.832 2.5 22.3125 2.5H18.1875C18.1992 2.29688 18.207 2.09375 18.2148 1.88281C18.2539 0.851563 17.4102 0 16.375 0ZM2.66016 4.375H5.95703C6.3125 7.89453 7.09766 10.2461 7.98438 11.8203C7.01172 11.3906 6 10.7852 5.125 9.93359C3.875 8.71875 2.85938 6.96484 2.66406 4.375H2.66016ZM18.8789 9.93359C18.0039 10.7852 16.9922 11.3906 16.0195 11.8203C16.9062 10.2461 17.6914 7.89453 18.0469 4.375H21.3438C21.1445 6.96484 20.1289 8.71875 18.8828 9.93359H18.8789Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_292_109">
        <Path d="M0.75 0H23.25V20H0.75V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Clock icon for Average Duration
const ClockIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <G clipPath="url(#clip0_292_114)">
      <Path
        d="M10 0C12.6522 0 15.1957 1.05357 17.0711 2.92893C18.9464 4.8043 20 7.34784 20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20C7.34784 20 4.8043 18.9464 2.92893 17.0711C1.05357 15.1957 0 12.6522 0 10C0 7.34784 1.05357 4.8043 2.92893 2.92893C4.8043 1.05357 7.34784 0 10 0ZM9.0625 4.6875V10C9.0625 10.3125 9.21875 10.6055 9.48047 10.7812L13.2305 13.2812C13.6602 13.5703 14.2422 13.4531 14.5312 13.0195C14.8203 12.5859 14.7031 12.0078 14.2695 11.7188L10.9375 9.5V4.6875C10.9375 4.16797 10.5195 3.75 10 3.75C9.48047 3.75 9.0625 4.16797 9.0625 4.6875Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_292_114">
        <Path d="M0 0H20V20H0V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Edit/Pencil icon
const EditIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <G clipPath="url(#clip0_302_2366)">
      <Path
        d="M14.4246 8.12114L14.8219 7.72388L13.6301 6.53208L11.4469 4.34888L10.2551 3.15708L9.85781 3.55435L9.06328 4.34888L2.06015 11.352C1.69453 11.7176 1.42734 12.1711 1.27968 12.6668L0.0351511 16.8997C-0.0527396 17.195 0.0281198 17.5149 0.249604 17.7329C0.471089 17.9508 0.787495 18.0317 1.08281 17.9473L5.3121 16.7028C5.80781 16.5551 6.26132 16.2879 6.62695 15.9223L13.6301 8.91919L14.4246 8.12114ZM5.62499 14.0415L5.30507 14.8395C5.16445 14.9485 5.00624 15.0293 4.83749 15.0821L2.08828 15.8907L2.89687 13.145C2.94609 12.9727 3.03046 12.8145 3.13945 12.6774L3.93749 12.3575V13.4825C3.93749 13.7918 4.19062 14.045 4.49999 14.045H5.62499V14.0415ZM12.7512 0.657471L12.2449 1.16724L11.4504 1.96177L11.0496 2.35903L12.2414 3.55083L14.4246 5.73403L15.6164 6.92583L16.0137 6.52856L16.8082 5.73403L17.318 5.22427C18.1969 4.34536 18.1969 2.92153 17.318 2.04263L15.9363 0.657471C15.0574 -0.221436 13.6336 -0.221436 12.7547 0.657471H12.7512ZM11.0848 6.56372L6.02226 11.6262C5.80429 11.8442 5.4457 11.8442 5.22773 11.6262C5.00976 11.4083 5.00976 11.0497 5.22773 10.8317L10.2902 5.76919C10.5082 5.55122 10.8668 5.55122 11.0848 5.76919C11.3027 5.98716 11.3027 6.34575 11.0848 6.56372Z"
        fill="#1E2A38"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_302_2366">
        <Path d="M0 0H18V18H0V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Home icon for navigation
const HomeIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M10 2.5L2.5 8.75V17.5C2.5 17.8315 2.6317 18.1495 2.86612 18.3839C3.10054 18.6183 3.41848 18.75 3.75 18.75H7.5V13.75C7.5 13.4185 7.6317 13.1005 7.86612 12.8661C8.10054 12.6317 8.41848 12.5 8.75 12.5H11.25C11.5815 12.5 11.8995 12.6317 12.1339 12.8661C12.3683 13.1005 12.5 13.4185 12.5 13.75V18.75H16.25C16.5815 18.75 16.8995 18.6183 17.1339 18.3839C17.3683 18.1495 17.5 17.8315 17.5 17.5V8.75L10 2.5Z"
      fill="#FDFDFD"
      fillOpacity="0.6"
    />
  </Svg>
);

// History Clock icon for navigation
const HistoryIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <G clipPath="url(#clip0_293_399)">
      <Path
        d="M18.125 10C18.125 12.1549 17.269 14.2215 15.7452 15.7452C14.2215 17.269 12.1549 18.125 10 18.125C7.84512 18.125 5.77849 17.269 4.25476 15.7452C2.73102 14.2215 1.875 12.1549 1.875 10C1.875 7.84512 2.73102 5.77849 4.25476 4.25476C5.77849 2.73102 7.84512 1.875 10 1.875C12.1549 1.875 14.2215 2.73102 15.7452 4.25476C17.269 5.77849 18.125 7.84512 18.125 10ZM0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C4.8043 18.9464 7.34784 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 7.34784 18.9464 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10ZM9.0625 4.6875V10C9.0625 10.3125 9.21875 10.6055 9.48047 10.7812L13.2305 13.2812C13.6602 13.5703 14.2422 13.4531 14.5312 13.0195C14.8203 12.5859 14.7031 12.0078 14.2695 11.7188L10.9375 9.5V4.6875C10.9375 4.16797 10.5195 3.75 10 3.75C9.48047 3.75 9.0625 4.16797 9.0625 4.6875Z"
        fill="#FDFDFD"
        fillOpacity="0.6"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_293_399">
        <Path d="M0 0H20V20H0V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Features icon for navigation
const FeaturesIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path d="M10 0L12.5 7.5H20L14.5 12L16.5 20L10 15L3.5 20L5.5 12L0 7.5H7.5L10 0Z" fill="#B7AFC5" />
  </Svg>
);

// Profile icon for navigation
const ProfileIcon = () => (
  <Svg width={18} height={20} viewBox="0 0 18 20" fill="none">
    <G clipPath="url(#clip0_293_407)">
      <Path
        d="M12.0938 5C12.0938 4.1712 11.7645 3.37634 11.1785 2.79029C10.5924 2.20424 9.79755 1.875 8.96875 1.875C8.13995 1.875 7.34509 2.20424 6.75904 2.79029C6.17299 3.37634 5.84375 4.1712 5.84375 5C5.84375 5.8288 6.17299 6.62366 6.75904 7.20971C7.34509 7.79576 8.13995 8.125 8.96875 8.125C9.79755 8.125 10.5924 7.79576 11.1785 7.20971C11.7645 6.62366 12.0938 5.8288 12.0938 5ZM3.96875 5C3.96875 3.67392 4.49553 2.40215 5.43322 1.46447C6.3709 0.526784 7.64267 0 8.96875 0C10.2948 0 11.5666 0.526784 12.5043 1.46447C13.442 2.40215 13.9688 3.67392 13.9688 5C13.9688 6.32608 13.442 7.59785 12.5043 8.53553C11.5666 9.47322 10.2948 10 8.96875 10C7.64267 10 6.3709 9.47322 5.43322 8.53553C4.49553 7.59785 3.96875 6.32608 3.96875 5ZM2.14453 18.125H15.793C15.4453 15.6523 13.3203 13.75 10.7539 13.75H7.18359C4.61719 13.75 2.49219 15.6523 2.14453 18.125ZM0.21875 18.8398C0.21875 14.9922 3.33594 11.875 7.18359 11.875H10.7539C14.6016 11.875 17.7188 14.9922 17.7188 18.8398C17.7188 19.4805 17.1992 20 16.5586 20H1.37891C0.738281 20 0.21875 19.4805 0.21875 18.8398Z"
        fill="#FDFDFD"
        fillOpacity="0.6"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_293_407">
        <Path d="M0.21875 0H17.7188V20H0.21875V0Z" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

// Delete/Trash icon
const DeleteIcon = () => (
  <Svg width={16} height={18} viewBox="0 0 16 18" fill="none">
    <Path
      d="M2.125 4.5V16.125C2.125 16.6223 2.32254 17.0992 2.67417 17.4508C3.02581 17.8025 3.50272 18 4 18H12C12.4973 18 12.9742 17.8025 13.3258 17.4508C13.6775 17.0992 13.875 16.6223 13.875 16.125V4.5H2.125ZM9.5 7.875V14.625C9.5 14.8739 9.40123 15.1127 9.22589 15.2881C9.05054 15.4634 8.81168 15.5625 8.5625 15.5625C8.31332 15.5625 8.07446 15.4634 7.89911 15.2881C7.72377 15.1127 7.625 14.8739 7.625 14.625V7.875C7.625 7.62582 7.72377 7.38696 7.89911 7.21161C8.07446 7.03627 8.31332 6.9375 8.5625 6.9375C8.81168 6.9375 9.05054 7.03627 9.22589 7.21161C9.40123 7.38696 9.5 7.62582 9.5 7.875ZM6.75 7.875V14.625C6.75 14.8739 6.65123 15.1127 6.47589 15.2881C6.30054 15.4634 6.06168 15.5625 5.8125 15.5625C5.56332 15.5625 5.32446 15.4634 5.14911 15.2881C4.97377 15.1127 4.875 14.8739 4.875 14.625V7.875C4.875 7.62582 4.97377 7.38696 5.14911 7.21161C5.32446 7.03627 5.56332 6.9375 5.8125 6.9375C6.06168 6.9375 6.30054 7.03627 6.47589 7.21161C6.65123 7.38696 6.75 7.62582 6.75 7.875ZM15.25 1.125H11.5625L10.9484 0.496875C10.7982 0.346797 10.6173 0.229297 10.4169 0.152344C10.2166 0.0753906 10.0009 0.0410156 9.78281 0.0515625H6.21719C5.99906 0.0410156 5.78344 0.0753906 5.58309 0.152344C5.38273 0.229297 5.20184 0.346797 5.05156 0.496875L4.4375 1.125H0.75C0.550781 1.125 0.359766 1.20402 0.219648 1.34414C0.0795313 1.48426 0.000625 1.67528 0.000625 1.875C0.000625 2.07472 0.0795313 2.26574 0.219648 2.40586C0.359766 2.54598 0.550781 2.625 0.75 2.625H15.25C15.4492 2.625 15.6402 2.54598 15.7803 2.40586C15.9205 2.26574 15.9994 2.07472 15.9994 1.875C15.9994 1.67528 15.9205 1.48426 15.7803 1.34414C15.6402 1.20402 15.4492 1.125 15.25 1.125Z"
      fill="#FF6B6B"
    />
  </Svg>
);

export default function JournalScreen({ navigation, route }) {
  // Journal entries - loaded from storage
  const [journalEntries, setJournalEntries] = useState([]);
  const [journalLoading, setJournalLoading] = useState(true);

  // Real nap history data loaded from storage
  const [napHistoryData, setNapHistoryData] = useState([]);
  const [totalNaps, setTotalNaps] = useState(0);

  // Journal storage functions
  const JOURNAL_STORAGE_KEY = 'nappin_journal_entries';

  const loadJournalEntries = async () => {
    setJournalLoading(true);
    try {
      const storedEntries = await AsyncStorage.getItem(JOURNAL_STORAGE_KEY);
      if (storedEntries) {
        const entries = JSON.parse(storedEntries);
        console.log('📖 Loaded journal entries from storage:', entries.length, 'entries');
        setJournalEntries(entries);
      } else {
        // First time - show some sample entries
        console.log('📖 First time user, creating sample entries');
        const sampleEntries = [
          {
            id: Date.now() - 1000,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            time: '2:30 PM',
            preview: 'Welcome to your nap journal! This is a sample entry to get you started.'
          }
        ];
        setJournalEntries(sampleEntries);
        await saveJournalEntries(sampleEntries);
      }
    } catch (error) {
      console.error('Failed to load journal entries:', error);
      setJournalEntries([]);
    } finally {
      setJournalLoading(false);
    }
  };

  const saveJournalEntries = async (entries) => {
    try {
      await AsyncStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(entries));
      console.log('💾 Saved journal entries:', entries.length, 'entries');
    } catch (error) {
      console.error('Failed to save journal entries:', error);
    }
  };

  // Load nap data from storage
  const loadNapData = async () => {
    try {
      const allNaps = await napDataManager.loadNaps();
      setNapHistoryData(allNaps);
      setTotalNaps(allNaps.length);
      console.log('📊 Journal loaded nap data:', allNaps.length, 'naps');
    } catch (error) {
      console.error('Failed to load nap data for journal:', error);
      setNapHistoryData([]);
      setTotalNaps(0);
    }
  };

  // Load data when component mounts
  useEffect(() => {
    loadNapData();
    loadJournalEntries();
  }, []);

  // Reload data when screen comes into focus (e.g., returning from history screen)
  useFocusEffect(
    React.useCallback(() => {
      loadNapData(); // Only reload nap data, not journal entries
      // Journal entries are managed through navigation params and local storage
    }, [])
  );

  // Handle new journal entry from NewJournalEntryScreen
  useEffect(() => {
    if (route?.params?.newEntry && !journalLoading) {
      const newEntry = route.params.newEntry;

      console.log('📝 Adding new journal entry...', newEntry);

      // Immediately add the entry to the current state
      setJournalEntries(prev => {
        const updatedEntries = [newEntry, ...prev];
        console.log('✅ Added new entry, total entries now:', updatedEntries.length);

        // Save to storage asynchronously but don't wait for it
        saveJournalEntries(updatedEntries).catch(error => {
          console.error('Failed to save journal entries:', error);
        });

        return updatedEntries;
      });

      // Clear the param so it doesn't add again on subsequent navigations
      navigation.setParams({ newEntry: undefined });
    }
  }, [route?.params?.newEntry, journalLoading]);

  // Handle entry deletion from JournalEntryDetailScreen
  useEffect(() => {
    if (route?.params?.deletedEntryId && !journalLoading) {
      const deletedEntryId = route.params.deletedEntryId;

      console.log('🗑️ Deleting journal entry from detail screen...', deletedEntryId);

      // Remove the entry from the current state
      setJournalEntries(prev => {
        const updatedEntries = prev.filter(entry => entry.id !== deletedEntryId);
        console.log('✅ Deleted entry, remaining entries:', updatedEntries.length);

        // Save to storage asynchronously but don't wait for it
        saveJournalEntries(updatedEntries).catch(error => {
          console.error('Failed to save after deletion:', error);
        });

        return updatedEntries;
      });

      // Clear the param so it doesn't delete again on subsequent navigations
      navigation.setParams({ deletedEntryId: undefined });
    }
  }, [route?.params?.deletedEntryId, journalLoading]);

  // Handle entry updates from JournalEntryDetailScreen
  useEffect(() => {
    if (route?.params?.updatedEntry && !journalLoading) {
      const updatedEntry = route.params.updatedEntry;

      console.log('📝 Updating journal entry from detail screen...', updatedEntry.id);

      // Update the entry in the current state
      setJournalEntries(prev => {
        const updatedEntries = prev.map(entry => 
          entry.id === updatedEntry.id ? updatedEntry : entry
        );
        console.log('✅ Updated entry successfully');

        return updatedEntries;
      });

      // Clear the param so it doesn't update again on subsequent navigations
      navigation.setParams({ updatedEntry: undefined });
    }
  }, [route?.params?.updatedEntry, journalLoading]);

  const averageDuration = useMemo(() => {
    if (napHistoryData.length === 0) return '0s';

    // Calculate average from real nap history
    const totalMinutes = napHistoryData.reduce((sum, nap) => {
      return sum + (nap.durationMinutes || 0);
    }, 0);
    const avgMinutes = Math.round(totalMinutes / napHistoryData.length);

    // Format as minutes and seconds
    if (avgMinutes >= 1) {
      return `${avgMinutes}m`;
    }

    return '0m';
  }, [napHistoryData]);

  // Debug logging
  console.log('🛌 Total naps (from real data):', totalNaps);
  console.log('🛌 Average nap duration:', averageDuration);
  console.log('📝 Total journal entries:', journalEntries.length);
  console.log('🔢 Loaded nap history data:', napHistoryData.length, 'entries');
  console.log('📱 Journal Screen State:', {
    journalEntries: journalEntries.length,
    journalLoading,
    hasNewEntry: !!route?.params?.newEntry
  });

  const handleBack = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleHomePress = () => {
    if (navigation) {
      navigation.navigate('Home');
    }
  };

  const handleHistoryPress = () => {
    if (navigation) {
      navigation.navigate('NapHistory');
    }
  };

  const handleFeaturesPress = () => {
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

  const handleAddEntry = () => {
    console.log('Add new journal entry');
    if (navigation) {
      navigation.navigate('NewJournalEntry');
    }
  };

  const handleDeleteEntry = (entryId) => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this journal entry? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            console.log('🗑️ Deleting journal entry with ID:', entryId);
            // Only delete the journal entry - nap statistics come from separate nap history data
            setJournalEntries(prev => {
              const newEntries = prev.filter(entry => entry.id !== entryId);
              console.log('✅ Deleted entry, remaining entries:', newEntries.length);

              // Save to storage asynchronously but don't wait for it
              saveJournalEntries(newEntries).catch(error => {
                console.error('Failed to save after deletion:', error);
              });

              return newEntries;
            });
          }
        }
      ]
    );
  };

  const handleEditEntry = (entryId) => {
    console.log('Edit journal entry:', entryId);
    // Find the entry by ID
    const entry = journalEntries.find(e => e.id === entryId);
    if (entry && navigation) {
      navigation.navigate('JournalEntryDetail', { entry });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <BackArrowIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nap Journal</Text>
      </View>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <TrophyIcon />
          </View>
          <Text style={styles.statLabel}>Total Naps</Text>
          <Text style={styles.statValue}>{totalNaps}</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <ClockIcon />
          </View>
          <Text style={styles.statLabel}>Avg Duration</Text>
          <Text style={styles.statValue}>{averageDuration}</Text>
        </View>
      </View>

      {/* Journal Entries */}
      <ScrollView style={styles.entriesContainer} showsVerticalScrollIndicator={false}>
        {journalEntries.length > 0 ? journalEntries.map((entry) => (
          <View key={entry.id} style={styles.entryCard}>
            <View style={styles.entryDateContainer}>
              <Text style={styles.entryDate}>{entry.date}</Text>
              <Text style={styles.entryTime}>{entry.time}</Text>
            </View>

            <View style={styles.entryContent}>
              <Text
                style={styles.entryPreview}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {entry.preview}
              </Text>
            </View>

            <View style={styles.entryActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleEditEntry(entry.id)}
              >
                <EditIcon />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleDeleteEntry(entry.id)}
              >
                <DeleteIcon />
              </TouchableOpacity>
            </View>
          </View>
        )) : (
          !journalLoading && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No journal entries yet</Text>
              <Text style={styles.emptyStateSubtext}>Tap the + button to create your first entry!</Text>
            </View>
          )
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={handleAddEntry}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <View style={styles.navContainer}>
          <TouchableOpacity style={styles.navButton} onPress={handleHomePress}>
            <HomeIcon />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={handleHistoryPress}>
            <HistoryIcon />
            <Text style={styles.navText}>History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={handleFeaturesPress}>
            <View style={styles.featuresIcon}>
              <FeaturesIcon />
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 34,
    paddingBottom: 20,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 37,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  headerTitle: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28,
    textAlign: 'center',
    flex: 1,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 75,
    paddingTop: 12,
    gap: 12,
  },
  statCard: {
    width: 104,
    height: 92,
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  statIconContainer: {
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statLabel: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 4,
  },
  statValue: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  entriesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100, // Space for FAB and bottom nav
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyStateText: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    color: 'rgba(253, 253, 253, 0.6)',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
  },
  entryCard: {
    height: 72,
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  entryDateContainer: {
    width: 48,
    marginRight: 16,
  },
  entryDate: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  entryTime: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  entryContent: {
    flex: 1,
    paddingRight: 8,
    justifyContent: 'center',
  },
  entryPreview: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  entryActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 8,
  },
  actionButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
  },
  fab: {
    position: 'absolute',
    bottom: 120,
    right: 16,
    width: 56,
    height: 56,
    backgroundColor: '#B7AFC5',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  fabText: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
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
});
