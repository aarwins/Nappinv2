// Nap Data Manager
// Handles storage, retrieval, and analysis of user nap sessions

import AsyncStorage from '@react-native-async-storage/async-storage';

class NapDataManager {
  constructor() {
    this.storageKey = 'nappin_nap_history';
  }

  // Save a completed nap session
  async saveNap(napData) {
    try {
      const existingData = await this.loadNaps();
      
      const newNap = {
        id: Date.now().toString(), // Simple ID based on timestamp
        date: new Date().toISOString(), // Full timestamp
        duration: napData.duration, // e.g., "24 min 32 s"
        durationMinutes: this.parseDurationToMinutes(napData.duration),
        sleepStage: napData.sleepStage || 'Light',
        finishedTime: napData.finishedTime, // e.g., "3:42 PM"
        startTime: napData.startTime, // e.g., "2:18 PM" (calculated)
        endTime: napData.endTime, // e.g., "3:42 PM" (calculated)
        refreshedFeeling: napData.refreshedFeeling || 0.6, // 0-1 scale
        day: new Date().toLocaleDateString('en-US', { weekday: 'short' }), // e.g., "Mon"
        dayNumber: new Date().getDate(), // e.g., 10
        month: new Date().getMonth(), // 0-11
        year: new Date().getFullYear(),
        note: napData.note || '', // User's note about the nap
      };

      const updatedData = [...existingData, newNap];
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(updatedData));
      
      console.log('Nap saved successfully:', newNap);
      return { success: true, napId: newNap.id };
    } catch (error) {
      console.error('Failed to save nap:', error);
      return false;
    }
  }

  // Load all nap sessions
  async loadNaps() {
    try {
      const data = await AsyncStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load naps:', error);
      return [];
    }
  }

  // Get naps for a specific month/year
  async getNapsForMonth(month, year) {
    try {
      const allNaps = await this.loadNaps();
      return allNaps.filter(nap => nap.month === month && nap.year === year);
    } catch (error) {
      console.error('Failed to get naps for month:', error);
      return [];
    }
  }

  // Calculate total naps for current month
  async getTotalNapsThisMonth() {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const naps = await this.getNapsForMonth(currentMonth, currentYear);
    return naps.length;
  }

  // Calculate current nap streak (consecutive days with naps)
  async getCurrentStreak() {
    try {
      const allNaps = await this.loadNaps();
      if (allNaps.length === 0) return 0;

      // Sort naps by date (newest first)
      const sortedNaps = allNaps.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Get unique days with naps (newest first)
      const uniqueDays = [];
      const seenDates = new Set();
      
      sortedNaps.forEach(nap => {
        const dateStr = new Date(nap.date).toDateString();
        if (!seenDates.has(dateStr)) {
          seenDates.add(dateStr);
          uniqueDays.push(new Date(nap.date));
        }
      });

      if (uniqueDays.length === 0) return 0;

      // Calculate streak starting from today or most recent nap day
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      let streakCount = 0;
      let currentDate = new Date(today);

      // Check if there's a nap today
      const todayStr = today.toDateString();
      let hasNapToday = false;
      
      for (const day of uniqueDays) {
        if (day.toDateString() === todayStr) {
          hasNapToday = true;
          break;
        }
      }

      // If no nap today, start checking from yesterday
      if (!hasNapToday) {
        currentDate.setDate(currentDate.getDate() - 1);
      }

      // Count consecutive days with naps
      for (const napDay of uniqueDays) {
        const napDateStr = napDay.toDateString();
        const currentDateStr = currentDate.toDateString();
        
        if (napDateStr === currentDateStr) {
          streakCount++;
          currentDate.setDate(currentDate.getDate() - 1);
        } else if (new Date(napDay) < currentDate) {
          // Gap in streak
          break;
        }
      }

      return streakCount;
    } catch (error) {
      console.error('Failed to calculate streak:', error);
      return 0;
    }
  }

  // Get formatted nap history for display
  async getFormattedNapHistory(month, year) {
    try {
      const naps = await this.getNapsForMonth(month, year);
      
      return naps.map(nap => ({
        id: nap.id,
        day: `${nap.day} ${nap.dayNumber}`,
        time: nap.startTime || nap.finishedTime, // Use start time for display, fallback to finished time
        duration: nap.duration,
        sleepStage: nap.sleepStage,
        refreshedFeeling: nap.refreshedFeeling,
        date: nap.date,
        note: nap.note || '', // Include the user's note
        startTime: nap.startTime || 'Unknown', // Include the actual start time
        endTime: nap.endTime || nap.finishedTime // Use finishedTime as fallback for endTime
      })).sort((a, b) => new Date(b.date) - new Date(a.date)); // Newest first
    } catch (error) {
      console.error('Failed to get formatted history:', error);
      return [];
    }
  }

  // Parse duration string to minutes (e.g., "24 min 32 s" -> 24.53)
  parseDurationToMinutes(durationStr) {
    const regex = /(\d+)\s*min(?:\s*(\d+)\s*s)?/;
    const match = durationStr.match(regex);
    
    if (match) {
      const minutes = parseInt(match[1]) || 0;
      const seconds = parseInt(match[2]) || 0;
      return minutes + (seconds / 60);
    }
    
    return 0;
  }

  // Get available months with nap data
  async getAvailableMonths() {
    try {
      const allNaps = await this.loadNaps();
      const months = new Set();
      
      allNaps.forEach(nap => {
        const date = new Date(nap.date);
        const monthYear = `${date.toLocaleDateString('en-US', { month: 'short' })} ${date.getFullYear()}`;
        months.add(monthYear);
      });

      // Convert to array and sort (newest first)
      return Array.from(months).sort((a, b) => {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateB - dateA;
      });
    } catch (error) {
      console.error('Failed to get available months:', error);
      return [];
    }
  }

  // Parse month string to month/year numbers
  parseMonthString(monthStr) {
    const [monthName, year] = monthStr.split(' ');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames.indexOf(monthName);
    return { month, year: parseInt(year) };
  }

  // Update an existing nap session
  async updateNap(napId, updates) {
    try {
      const existingData = await this.loadNaps();
      const napIndex = existingData.findIndex(nap => nap.id === napId);
      
      if (napIndex === -1) {
        console.error('Nap not found for update:', napId);
        return false;
      }
      
      // Update the existing nap with new data
      existingData[napIndex] = {
        ...existingData[napIndex],
        ...updates,
        // Recalculate duration minutes if duration changed
        durationMinutes: updates.duration ? this.parseDurationToMinutes(updates.duration) : existingData[napIndex].durationMinutes
      };
      
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(existingData));
      console.log('Nap updated successfully:', existingData[napIndex]);
      return true;
    } catch (error) {
      console.error('Failed to update nap:', error);
      return false;
    }
  }

  // Update note for a specific nap
  async updateNapNote(napId, note) {
    try {
      const existingData = await this.loadNaps();
      const napIndex = existingData.findIndex(nap => nap.id === napId);
      
      if (napIndex === -1) {
        console.error('Nap not found for note update:', napId);
        return false;
      }
      
      // Update the note
      existingData[napIndex].note = note;
      
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(existingData));
      console.log('Nap note updated successfully:', napId, note);
      return true;
    } catch (error) {
      console.error('Failed to update nap note:', error);
      return false;
    }
  }

  // Get a specific nap by ID
  async getNapById(napId) {
    try {
      const existingData = await this.loadNaps();
      const nap = existingData.find(nap => nap.id === napId);
      return nap || null;
    } catch (error) {
      console.error('Failed to get nap by ID:', error);
      return null;
    }
  }

  // Delete a specific nap by ID
  async deleteNap(napId) {
    try {
      const existingData = await this.loadNaps();
      const filteredData = existingData.filter(nap => nap.id !== napId);
      
      if (filteredData.length === existingData.length) {
        console.error('Nap not found for deletion:', napId);
        return false;
      }
      
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(filteredData));
      console.log('Nap deleted successfully:', napId);
      return true;
    } catch (error) {
      console.error('Failed to delete nap:', error);
      return false;
    }
  }

  // Clear all nap data (for testing/reset)
  async clearAllNaps() {
    try {
      await AsyncStorage.removeItem(this.storageKey);
      console.log('All nap data cleared');
      return true;
    } catch (error) {
      console.error('Failed to clear nap data:', error);
      return false;
    }
  }

  // Add sample data for testing (creates current month data)
  async addSampleData() {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    // Create sample naps for the current month instead of hardcoded June 2024
    const sampleNaps = [
      {
        id: '1',
        date: new Date(currentYear, currentMonth, Math.max(1, now.getDate() - 1), 14, 14).toISOString(),
        duration: '24 min',
        durationMinutes: 24,
        sleepStage: 'Light',
        finishedTime: '2:14 PM',
        refreshedFeeling: 0.8,
        day: new Date(currentYear, currentMonth, Math.max(1, now.getDate() - 1)).toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: Math.max(1, now.getDate() - 1),
        month: currentMonth,
        year: currentYear,
        note: 'Great power nap! Felt really refreshed after.',
      },
      {
        id: '2',
        date: new Date(currentYear, currentMonth, Math.max(1, now.getDate() - 2), 13, 45).toISOString(),
        duration: '18 min',
        durationMinutes: 18,
        sleepStage: 'Light',
        finishedTime: '1:45 PM',
        refreshedFeeling: 0.7,
        day: new Date(currentYear, currentMonth, Math.max(1, now.getDate() - 2)).toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: Math.max(1, now.getDate() - 2),
        month: currentMonth,
        year: currentYear,
        note: '',
      },
      {
        id: '3',
        date: new Date(currentYear, currentMonth, Math.max(1, now.getDate() - 3), 15, 22).toISOString(),
        duration: '32 min',
        durationMinutes: 32,
        sleepStage: 'Deep',
        finishedTime: '3:22 PM',
        refreshedFeeling: 0.9,
        day: new Date(currentYear, currentMonth, Math.max(1, now.getDate() - 3)).toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: Math.max(1, now.getDate() - 3),
        month: currentMonth,
        year: currentYear,
        note: 'Needed this longer nap after a tough morning. Woke up feeling amazing!',
      },
    ];

    try {
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(sampleNaps));
      console.log('Sample nap data added for current month');
      return true;
    } catch (error) {
      console.error('Failed to add sample data:', error);
      return false;
    }
  }
}

// Create singleton instance
const napDataManager = new NapDataManager();

export default napDataManager;