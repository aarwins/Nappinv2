import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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


export default function JournalEntryDetailScreen({ navigation, route }) {
  // Get the journal entry data from navigation params
  const { entry } = route?.params || {};

  // Fallback to sample data if no entry is provided
  const entryData = entry || {
    id: Date.now(),
    date: 'Jun 15',
    time: '2:30 PM',
    fullText: 'Felt refreshed after this nap. Had a vivid dream about walking on the beach with gentle waves lapping at my feet. The sound was so soothing. Perfect timing before my afternoon meeting - I felt much more focused and energized. This was exactly what I needed to get through the rest of the day productively.'
  };

  // State for editing
  const [editedText, setEditedText] = useState(entryData.fullText || entryData.preview || '');

  const handleBack = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleSave = async () => {
    if (!editedText.trim()) {
      Alert.alert('Empty Entry', 'Please enter some text before saving.');
      return;
    }

    try {
      // Load existing journal entries
      const existingData = await AsyncStorage.getItem('nappin_journal_entries');
      let journalEntries = existingData ? JSON.parse(existingData) : [];
      
      // Find and update the entry
      const entryIndex = journalEntries.findIndex(e => e.id === entryData.id);
      if (entryIndex !== -1) {
        journalEntries[entryIndex] = {
          ...journalEntries[entryIndex],
          fullText: editedText,
          preview: editedText.length > 50 ? editedText.substring(0, 50) + '...' : editedText
        };
        
        // Save back to storage
        await AsyncStorage.setItem('nappin_journal_entries', JSON.stringify(journalEntries));
        
        console.log('📝 Journal entry updated successfully');
        
        // Navigate back to journal screen with updated entry
        if (navigation) {
          navigation.navigate('Journal', { updatedEntry: journalEntries[entryIndex] });
        }
      }
    } catch (error) {
      console.error('Failed to save journal entry:', error);
      Alert.alert('Error', 'Failed to save your changes. Please try again.');
    }
  };

  const handleDeleteEntry = () => {
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
            console.log('🗑️ Deleting journal entry with ID:', entryData.id);
            // Navigate back to journal screen
            if (navigation) {
              navigation.navigate('Journal', { deletedEntryId: entryData.id });
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <View style={styles.div}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <BackArrowIcon />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {entryData.date} • {entryData.time}
            </Text>
          </View>

          {/* Journal Entry Content */}
          <View style={styles.entrySection}>
            <View style={styles.entryContentContainer}>
              <View style={styles.entryTextContainer}>
                <TextInput
                  style={styles.entryTextInput}
                  value={editedText}
                  onChangeText={setEditedText}
                  multiline={true}
                  placeholder="Start writing your journal entry..."
                  placeholderTextColor="#8A8A8A"
                  textAlignVertical="top"
                />
              </View>
            </View>
          </View>

          {/* Save Button */}
          <View style={styles.saveButtonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>

          {/* Delete Button */}
          <View style={styles.deleteButtonContainer}>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteEntry}>
              <Text style={styles.deleteButtonText}>Delete Entry</Text>
            </TouchableOpacity>
          </View>
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
  body: {
    flex: 1,
    width: 390,
    height: 844,
    backgroundColor: '#1E2A38',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  div: {
    width: 390,
    height: 844,
    backgroundColor: 'rgba(0, 0, 0, 0.00)',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  header: {
    width: 390,
    height: 48,
    backgroundColor: 'rgba(0, 0, 0, 0.00)',
    position: 'absolute',
    left: 0,
    top: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    width: 24,
    height: 24,
    position: 'absolute',
    left: 16,
    top: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  headerTitle: {
    width: 164,
    height: 28,
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
    textAlign: 'center',
    position: 'absolute',
    left: 113,
    top: 8,
  },
  entrySection: {
    width: 358,
    height: 188,
    position: 'absolute',
    left: 16,
    top: 96,
    borderRadius: 12,
    backgroundColor: '#E5E8EC',
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    padding: 16,
    paddingTop: 9,
    paddingRight: 22,
  },
  entryContentContainer: {
    width: 320,
    height: 179,
    position: 'relative',
  },
  entryTextContainer: {
    width: 298,
    height: 140,
    position: 'absolute',
    left: 0,
    top: 0,
    paddingRight: 27,
    paddingBottom: 39,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  entryTextInput: {
    color: '#1E2A38',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    flex: 1,
    textAlignVertical: 'top',
  },
  saveButtonContainer: {
    position: 'absolute',
    left: 16,
    top: 297,
    width: 358,
    marginBottom: 12,
  },
  saveButton: {
    height: 56,
    backgroundColor: '#B7AFC5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  deleteButtonContainer: {
    position: 'absolute',
    left: 16,
    top: 365,
    width: 358,
    marginBottom: 12,
  },
  deleteButton: {
    height: 56,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(183, 175, 197, 0.80)',
    backgroundColor: 'rgba(0, 0, 0, 0.00)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'rgba(183, 175, 197, 0.80)',
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});
