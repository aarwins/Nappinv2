import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Share,
  Alert,
} from 'react-native';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';
import napDataManager from '../utils/napDataManager';

const NapShareScreen = ({ navigation, route }) => {
  const [noteText, setNoteText] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Get nap data from navigation params or use default sample data
  const napData = route?.params?.napData || {
    title: 'Nap on Mon 10 • 2:14 PM',
    duration: '24 min 32 s',
    startTime: '2:14 PM',
    endTime: '2:38 PM',
    mood: 'Energized',
    sleepStage: 'Light',
  };
  
  // Debug logging for timing data
  console.log('📄 NapShareScreen received data:', {
    startTime: napData.startTime,
    endTime: napData.endTime,
    duration: napData.duration,
    title: napData.title
  });

  // Load existing note when component mounts
  useEffect(() => {
    const loadExistingNote = async () => {
      if (napData.id) {
        try {
          const existingNap = await napDataManager.getNapById(napData.id);
          if (existingNap && existingNap.note) {
            setNoteText(existingNap.note);
          }
        } catch (error) {
          console.error('Failed to load existing note:', error);
        }
      }
    };

    loadExistingNote();
  }, [napData.id]);

  // Function to get duration in minutes from duration string
  const getDurationInMinutes = (durationStr) => {
    const match = durationStr.match(/(\d+)\s*min/);
    return match ? parseInt(match[1]) : 20; // default to 20 if can't parse
  };

  // Helper function to get energy indicator color (matching NapHistoryDetailCard)
  const getEnergyColor = (energyLevel) => {
    switch (energyLevel) {
      case 'Energized':
        return '#A7D7C5'; // Green
      case 'Refreshed':
        return '#A7D7C5'; // Green
      case 'Somewhat Tired':
        return '#F5B041'; // Orange
      case 'Groggy':
        return '#F5B041'; // Orange
      default:
        return '#A7D7C5'; // Default green
    }
  };

  // Function to generate dynamic tips based on nap data
  const getDynamicTip = () => {
    const duration = getDurationInMinutes(napData.duration);
    const mood = napData.mood;

    // Groggy tips take priority
    if (mood === 'Groggy') {
      const groggyTips = [
        "Try limiting naps to 20-30 minutes to avoid deep sleep phases that cause grogginess.",
        "Consider napping earlier in the day (before 3 PM) to avoid interfering with nighttime sleep.",
        "Try the 'coffee nap' technique: drink coffee right before a 20-minute nap for enhanced alertness.",
        "Ensure you're well-hydrated before napping, as dehydration can worsen post-nap grogginess.",
        "Expose yourself to bright light immediately after waking to help reset your circadian rhythm."
      ];
      return groggyTips[Math.floor(Math.random() * groggyTips.length)];
    }

    // Short nap tips (under 30 minutes)
    if (duration < 30) {
      const shortNapTips = [
        "Perfect! Short naps like this boost alertness without causing sleep inertia.",
        "Power naps of 10-20 minutes are ideal for a quick energy boost during the day.",
        "Short naps help improve memory consolidation and cognitive performance.",
        "Your timing is great - brief naps prevent you from entering deep sleep phases.",
        "Studies show 20-minute naps can improve mood and reduce stress hormones."
      ];
      return shortNapTips[Math.floor(Math.random() * shortNapTips.length)];
    }

    // Medium nap tips (30-60 minutes)
    if (duration >= 30 && duration <= 60) {
      const mediumNapTips = [
        "Longer naps can include slow-wave sleep, which is great for physical recovery.",
        "Be mindful that 30-60 minute naps might cause some temporary grogginess.",
        "Medium-length naps are good for creative problem-solving and memory consolidation.",
        "Try to keep longer naps before 3 PM to avoid disrupting your nighttime sleep.",
        "Consider splitting this into two shorter naps if you feel groggy after waking."
      ];
      return mediumNapTips[Math.floor(Math.random() * mediumNapTips.length)];
    }

    // Long nap tips (over 60 minutes)
    if (duration > 60) {
      const longNapTips = [
        "Long naps can complete a full sleep cycle, which may help you wake up more refreshed.",
        "Naps over 90 minutes might affect your nighttime sleep - consider earlier bedtime adjustments.",
        "Extended naps are sometimes needed when catching up on lost sleep from the night before.",
        "If you frequently need long naps, consider evaluating your nighttime sleep quality.",
        "Try to keep long naps occasional rather than daily to maintain healthy sleep patterns."
      ];
      return longNapTips[Math.floor(Math.random() * longNapTips.length)];
    }

    // Energized/good mood tips
    if (mood === 'Energized' || mood === 'Refreshed') {
      const energizedTips = [
        "Great job! You've found the sweet spot for restorative napping.",
        "Your nap timing and duration seem perfect for your body's needs.",
        "Feeling energized after a nap is a sign of good sleep hygiene.",
        "Consider maintaining this nap schedule for consistent energy boosts.",
        "Share your successful nap strategy with friends who struggle with daytime fatigue!"
      ];
      return energizedTips[Math.floor(Math.random() * energizedTips.length)];
    }

    // Default tip
    return "Regular napping can improve alertness, mood, and cognitive performance when done correctly.";
  };

  const handleNotePress = () => {
    setShowNoteInput(true);
  };

  const handleNoteSave = () => {
    setShowNoteInput(false);
    // Here you could save the note to storage or send to API
    console.log('Note saved:', noteText);
  };

  const handleShare = async () => {
    try {
      const shareMessage = `🌙 My Nap Summary 

📅 ${napData.title}
⏰ Duration: ${napData.duration}
🌅 Start: ${napData.startTime}
🌆 End: ${napData.endTime}
😴 Sleep Stage: ${napData.sleepStage}
💫 How I felt: ${napData.mood}

${noteText ? `📝 My note: ${noteText}` : ''}

💤 Tracked with Nappin - The smart napping app!`;

      const result = await Share.share({
        message: shareMessage,
        title: 'My Nap Summary',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type of', result.activityType);
        } else {
          console.log('Shared');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while sharing your nap summary.');
      console.error('Share error:', error);
    }
  };

  const handleSaveEntry = async () => {
    if (!napData.id) {
      Alert.alert('Error', 'Unable to save - nap data not found.');
      return;
    }

    setIsSaving(true);
    try {
      const success = await napDataManager.updateNapNote(napData.id, noteText);
      
      if (success) {
        Alert.alert(
          'Success', 
          'Your note has been saved successfully!',
          [
            {
              text: 'OK',
              onPress: () => {
                // Optionally navigate back to history
                navigation.goBack();
              }
            }
          ]
        );
      } else {
        Alert.alert('Error', 'Failed to save your note. Please try again.');
      }
    } catch (error) {
      console.error('Failed to save note:', error);
      Alert.alert('Error', 'Something went wrong while saving your note.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteNap = async () => {
    if (!napData.id) {
      Alert.alert('Error', 'Unable to delete - nap data not found.');
      return;
    }

    // Show confirmation dialog
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
              const success = await napDataManager.deleteNap(napData.id);
              
              if (success) {
                Alert.alert(
                  'Deleted',
                  'Your nap has been deleted successfully.',
                  [
                    {
                      text: 'OK',
                      onPress: () => {
                        // Navigate back to history
                        navigation.goBack();
                      }
                    }
                  ]
                );
              } else {
                Alert.alert('Error', 'Failed to delete the nap. Please try again.');
              }
            } catch (error) {
              console.error('Failed to delete nap:', error);
              Alert.alert('Error', 'Something went wrong while deleting the nap.');
            }
          }
        }
      ]
    );
  };

  const BackArrowIcon = () => (
    <Svg width={18} height={20} viewBox="0 0 18 20" fill="none">
      <G clipPath="url(#clip0_256_645)">
        <Path
          d="M0.367188 9.11719C-0.121094 9.60547 -0.121094 10.3984 0.367188 10.8867L6.61719 17.1367C7.10547 17.625 7.89844 17.625 8.38672 17.1367C8.875 16.6484 8.875 15.8555 8.38672 15.3672L4.26562 11.25H16.25C16.9414 11.25 17.5 10.6914 17.5 10C17.5 9.30859 16.9414 8.75 16.25 8.75H4.26953L8.38281 4.63281C8.87109 4.14453 8.87109 3.35156 8.38281 2.86328C7.89453 2.375 7.10156 2.375 6.61328 2.86328L0.363281 9.11328L0.367188 9.11719Z"
          fill="#1E2A38"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_256_645">
          <Path d="M0 0H17.5V20H0V0Z" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );

  const ShareIcon = () => (
    <Svg width={23} height={20} viewBox="0 0 23 20" fill="none">
      <G clipPath="url(#clip0_256_635)">
        <Path
          d="M14.25 8.75H12.4336C10.6758 8.75 9.25 10.1758 9.25 11.9336C9.25 12.8047 9.65234 13.2734 10 13.5156C10.2656 13.6992 10.5 13.9844 10.5 14.3086C10.5 14.6914 10.1875 15.0039 9.80469 15.0039H9.70703C9.61328 15.0039 9.51953 14.9883 9.42969 14.9492C8.73438 14.6406 5.5 13.0234 5.5 9.375C5.5 6.26953 8.01953 3.75 11.125 3.75H14.25V1.35547C14.25 0.605469 14.8555 0 15.6055 0C15.9414 0 16.2617 0.125 16.5117 0.347656L21.9102 5.20703C22.207 5.47266 22.375 5.85156 22.375 6.25C22.375 6.64844 22.207 7.02734 21.9102 7.29297L16.4805 12.1797C16.25 12.3867 15.9531 12.5 15.6445 12.5H15.5C14.8086 12.5 14.25 11.9414 14.25 11.25V8.75ZM3.625 3.75C3.28125 3.75 3 4.03125 3 4.375V16.875C3 17.2188 3.28125 17.5 3.625 17.5H16.125C16.4688 17.5 16.75 17.2188 16.75 16.875V15C16.75 14.3086 17.3086 13.75 18 13.75C18.6914 13.75 19.25 14.3086 19.25 15V16.875C19.25 18.6016 17.8516 20 16.125 20H3.625C1.89844 20 0.5 18.6016 0.5 16.875V4.375C0.5 2.64844 1.89844 1.25 3.625 1.25H5.5C6.19141 1.25 6.75 1.80859 6.75 2.5C6.75 3.19141 6.19141 3.75 5.5 3.75H3.625Z"
          fill="#B7AFC5"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_256_635">
          <Path d="M0.5 0H23V20H0.5V0Z" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );

  const EditIcon = () => (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <G clipPath="url(#clip0_256_658)">
        <Path
          d="M14.4246 8.12108L14.8219 7.72382L13.6301 6.53202L11.4469 4.34882L10.2551 3.15702L9.85781 3.55428L9.06328 4.34882L2.06015 11.3519C1.69453 11.7176 1.42734 12.1711 1.27968 12.6668L0.0351511 16.8996C-0.0527396 17.1949 0.0281198 17.5148 0.249604 17.7328C0.471089 17.9508 0.787495 18.0316 1.08281 17.9473L5.3121 16.7027C5.80781 16.5551 6.26132 16.2879 6.62695 15.9223L13.6301 8.91913L14.4246 8.12108ZM5.62499 14.0414L5.30507 14.8394C5.16445 14.9484 5.00624 15.0293 4.83749 15.082L2.08828 15.8906L2.89687 13.1449C2.94609 12.9726 3.03046 12.8144 3.13945 12.6773L3.93749 12.3574V13.4824C3.93749 13.7918 4.19062 14.0449 4.49999 14.0449H5.62499V14.0414ZM12.7512 0.65741L12.2449 1.16718L11.4504 1.96171L11.0496 2.35897L12.2414 3.55077L14.4246 5.73397L15.6164 6.92577L16.0137 6.5285L16.8082 5.73397L17.318 5.22421C18.1969 4.3453 18.1969 2.92147 17.318 2.04257L15.9363 0.65741C15.0574 -0.221497 13.6336 -0.221497 12.7547 0.65741H12.7512ZM11.0848 6.56366L6.02226 11.6262C5.80429 11.8441 5.4457 11.8441 5.22773 11.6262C5.00976 11.4082 5.00976 11.0496 5.22773 10.8316L10.2902 5.76913C10.5082 5.55116 10.8668 5.55116 11.0848 5.76913C11.3027 5.9871 11.3027 6.34569 11.0848 6.56366Z"
          fill="#1E2A38"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_256_658">
          <Path d="M0 0H18V18H0V0Z" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );

  const HeartRateChart = () => (
    <Svg width={318} height={80} viewBox="0 0 318 80" fill="none">
      <G opacity="0.6">
        <G clipPath="url(#clip0_256_682)">
          <Path
            d="M0 59.875L39.75 44.9687L79.5 49.9375L119.25 35.0312L159 40L198.75 30.0625L238.5 44.9687L278.25 35.0312L318 40"
            stroke="#A7D7C5"
            strokeWidth="1.9875"
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="clip0_256_682">
          <Path d="M0 0.25H318V79.75H0V0.25Z" fill="white" />
        </ClipPath>
      </Defs>
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

  const ProfileIcon = () => (
    <Svg width={18} height={20} viewBox="0 0 18 20" fill="none">
      <G clipPath="url(#clip0_256_758)">
        <Path
          d="M12.0938 5C12.0938 4.1712 11.7645 3.37634 11.1785 2.79029C10.5924 2.20424 9.79755 1.875 8.96875 1.875C8.13995 1.875 7.34509 2.20424 6.75904 2.79029C6.17299 3.37634 5.84375 4.1712 5.84375 5C5.84375 5.8288 6.17299 6.62366 6.75904 7.20971C7.34509 7.79576 8.13995 8.125 8.96875 8.125C9.79755 8.125 10.5924 7.79576 11.1785 7.20971C11.7645 6.62366 12.0938 5.8288 12.0938 5ZM3.96875 5C3.96875 3.67392 4.49553 2.40215 5.43322 1.46447C6.3709 0.526784 7.64267 0 8.96875 0C10.2948 0 11.5666 0.526784 12.5043 1.46447C13.442 2.40215 13.9688 3.67392 13.9688 5C13.9688 6.32608 13.442 7.59785 12.5043 8.53553C11.5666 9.47322 10.2948 10 8.96875 10C7.64267 10 6.3709 9.47322 5.43322 8.53553C4.49553 7.59785 3.96875 6.32608 3.96875 5ZM2.14453 18.125H15.793C15.4453 15.6523 13.3203 13.75 10.7539 13.75H7.18359C4.61719 13.75 2.49219 15.6523 2.14453 18.125ZM0.21875 18.8398C0.21875 14.9922 3.33594 11.875 7.18359 11.875H10.7539C14.6016 11.875 17.7188 14.9922 17.7188 18.8398C17.7188 19.4805 17.1992 20 16.5586 20H1.37891C0.738281 20 0.21875 19.4805 0.21875 18.8398Z"
          fill="#FDFDFD"
          fillOpacity="0.6"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_256_758">
          <Path d="M0.21875 0H17.7188V20H0.21875V0Z" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );

  const BackArrowWhite = () => (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M0.439453 10.9441C-0.146484 11.5301 -0.146484 12.4816 0.439453 13.0676L7.93945 20.5676C8.52539 21.1535 9.47695 21.1535 10.0629 20.5676C10.6488 19.9816 10.6488 19.0301 10.0629 18.4441L5.11758 13.5035H19.4988C20.3285 13.5035 20.9988 12.8332 20.9988 12.0035C20.9988 11.1738 20.3285 10.5035 19.4988 10.5035H5.12227L10.0582 5.56289C10.6441 4.97695 10.6441 4.02539 10.0582 3.43945C9.47227 2.85352 8.5207 2.85352 7.93477 3.43945L0.434766 10.9395L0.439453 10.9441Z"
        fill="#FDFDFD"
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E2A38" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackArrowWhite />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>{napData.title}</Text>
        
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <ShareIcon />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Duration Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Duration</Text>
            <Text style={styles.summaryValue}>{napData.duration}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summarySubtext}>Start: {napData.startTime}</Text>
            <Text style={styles.summarySubtext}>End: {napData.endTime}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.summaryBottomRow}>
                      <View style={styles.moodContainer}>
            <Text style={styles.summarySubtext}>Mood:</Text>
            <View style={[styles.moodIndicator, { backgroundColor: getEnergyColor(napData.mood) }]} />
            <Text style={styles.moodText}>{napData.mood}</Text>
          </View>
            <Text style={styles.summarySubtext}>Sleep Stage: {napData.sleepStage}</Text>
          </View>
        </View>

        {/* Heart Rate Chart Card */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Heart-Rate Trace (BPM)</Text>
          <View style={styles.chartContainer}>
            <HeartRateChart />
          </View>
          <Text style={styles.chartSubtitle}>Sensor integration coming soon for Apple Watch users</Text> 
        </View>

        {/* Note Input Card */}
        {!showNoteInput ? (
          <TouchableOpacity style={styles.noteCard} onPress={handleNotePress}>
            <EditIcon />
            <Text style={styles.noteText}>
              {noteText ? noteText : "Tap here to add a note about your nap."}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.noteInputCard}>
            <View style={styles.noteInputHeader}>
              <EditIcon />
              <Text style={styles.noteInputTitle}>Add a note about your nap</Text>
            </View>
            <TextInput
              style={styles.noteTextInput}
              value={noteText}
              onChangeText={setNoteText}
              placeholder="How did you feel? What helped you relax? Any thoughts about this nap..."
              placeholderTextColor="rgba(30, 42, 56, 0.5)"
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              autoFocus={true}
            />
            <View style={styles.noteInputActions}>
              <TouchableOpacity 
                style={styles.noteCancelButton}
                onPress={() => setShowNoteInput(false)}
              >
                <Text style={styles.noteCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.noteSaveButton}
                onPress={handleNoteSave}
              >
                <Text style={styles.noteSaveText}>Save Note</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Tip Card */}
        <View style={styles.tipCard}>
          <View style={styles.tipBadge}>
            <Text style={styles.tipBadgeText}>Tip</Text>
          </View>
          <Text style={styles.tipText}>
            {getDynamicTip()}
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.saveButton, isSaving && styles.saveButtonDisabled]} 
            onPress={handleSaveEntry}
            disabled={isSaving}
          >
            <Text style={styles.saveButtonText}>
              {isSaving ? 'Saving...' : 'Save Entry'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteNap}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.spacer} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <View style={styles.navContainer}>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
            <HomeIcon />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('NapHistory')}>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    height: 98,
    paddingTop: 36,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  shareButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  summaryCard: {
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  summaryValue: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  summarySubtext: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#1E2A38',
    marginVertical: 8,
  },
  summaryBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  moodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#1E2A38',
    marginHorizontal: 8,
  },
  moodText: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  chartCard: {
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
  },
  chartTitle: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    marginBottom: 16,
  },
  chartContainer: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartSubtitle: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
  },
  noteCard: {
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  noteText: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 12,
    flex: 1,
  },
  noteInputCard: {
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
  },
  noteInputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  noteInputTitle: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  noteTextInput: {
    backgroundColor: '#FDFDFD',
    borderRadius: 8,
    padding: 12,
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    minHeight: 100,
    borderWidth: 1,
    borderColor: 'rgba(30, 42, 56, 0.2)',
    marginBottom: 16,
  },
  noteInputActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  noteCancelButton: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#B7AFC5',
    paddingVertical: 12,
    alignItems: 'center',
  },
  noteCancelText: {
    color: '#B7AFC5',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
  },
  noteSaveButton: {
    flex: 1,
    backgroundColor: '#B7AFC5',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  noteSaveText: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
  },
  tipCard: {
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipBadge: {
    backgroundColor: '#B7AFC5',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 9,
    marginRight: 12,
  },
  tipBadgeText: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '600',
  },
  tipText: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 16,
  },
  saveButton: {
    backgroundColor: '#B7AFC5',
    borderRadius: 12,
    paddingVertical: 19,
    paddingHorizontal: 36,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#B7AFC5',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 12,
  },
  saveButtonDisabled: {
    backgroundColor: 'rgba(183, 175, 197, 0.5)',
    shadowOpacity: 0,
    elevation: 0,
  },
  saveButtonText: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  deleteButton: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#B7AFC5',
    paddingVertical: 15,
    flex: 1,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#B7AFC5',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  spacer: {
    height: 16,
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

export default NapShareScreen;
