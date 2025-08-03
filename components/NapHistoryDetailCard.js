import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';

const NapHistoryDetailCard = ({ 
  date = "Mon 10",
  time = "2:14 PM",
  duration = "24 min",
  sleepStage = "Light",
  energyLevel = "Energized",
  onAddNote,
  onCollapse,
  onDelete
}) => {
  // Helper function to get energy indicator color
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

  // Handle sleep specialist email for groggy users
  const handleSleepSpecialist = () => {
    const subject = 'Sleep Specialist Consultation - Feeling Groggy After Naps';
    const body = `Hello,

I've been experiencing grogginess after my naps and would like to speak with a sleep specialist.

Recent nap details:
- Date: ${date}
- Time: ${time}
- Duration: ${duration}
- Sleep Stage: ${sleepStage}
- How I felt: ${energyLevel}

I would appreciate guidance on how to improve my nap quality and avoid feeling groggy.

Thank you!`;

    const emailUrl = `mailto:nappinapplication@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    Linking.openURL(emailUrl).catch(err => {
      console.error('Failed to open email client:', err);
    });
  };

  return (
    <View style={styles.container}>
      {/* Collapsible Area - Header and Sleep Info */}
      <TouchableOpacity 
        style={styles.collapsibleArea} 
        onPress={onCollapse}
        activeOpacity={0.7}
      >
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.dateTimeContainer}>
            <View style={styles.dateTimeContent}>
              <Text style={styles.dateText}>{date}</Text>
              <Text style={styles.timeText}>{time}</Text>
            </View>
          </View>

          <View style={styles.durationContainer}>
            <View style={styles.durationPill}>
              <Text style={styles.durationText}>{duration}</Text>
            </View>
            <View style={styles.arrowButton}>
              <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
                <Path
                  d="M7.29377 3.29376C7.6844 2.90314 8.31877 2.90314 8.7094 3.29376L14.7094 9.29376C15.1 9.68439 15.1 10.3188 14.7094 10.7094C14.3188 11.1 13.6844 11.1 13.2938 10.7094L8.00002 5.41564L2.70627 10.7063C2.31565 11.0969 1.68127 11.0969 1.29065 10.7063C0.900024 10.3156 0.900024 9.68126 1.29065 9.29064L7.29065 3.29064L7.29377 3.29376Z"
                  fill="#1E2A38"
                />
              </Svg>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Sleep Information Section */}
        <View style={styles.sleepInfoContainer}>
          <Text style={styles.sleepStageText}>Sleep Stage: {sleepStage}</Text>
          
          <View style={styles.energyContainer}>
            <View style={[styles.energyIndicator, { backgroundColor: getEnergyColor(energyLevel) }]} />
            <Text style={styles.energyText}>{energyLevel}</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Action Buttons Section - Separate from collapsible area */}
      <View style={styles.actionsContainer}>
        <View style={styles.normalActionsRow}>
          <TouchableOpacity onPress={onAddNote} style={styles.addNoteContainer}>
            <Svg width={18} height={18} viewBox="0 0 14 14" fill="none">
              <G clipPath="url(#clip0_259_22)">
                <Path
                  d="M11.2191 6.3164L11.5281 6.00742L10.6012 5.08046L8.90313 3.38242L7.97618 2.45546L7.66719 2.76445L7.04922 3.38242L1.60235 8.82929C1.31797 9.11367 1.11016 9.4664 0.995315 9.85195L0.0273465 13.1441C-0.0410129 13.3738 0.0218777 13.6226 0.194143 13.7922C0.366409 13.9617 0.612503 14.0246 0.84219 13.959L4.13164 12.991C4.51719 12.8762 4.86992 12.6684 5.1543 12.384L10.6012 6.9371L11.2191 6.3164ZM4.375 10.9211L4.12617 11.5418C4.0168 11.6266 3.89375 11.6894 3.7625 11.7305L1.62422 12.3594L2.25313 10.2238C2.29141 10.0898 2.35703 9.96679 2.4418 9.86015L3.0625 9.61132V10.4863C3.0625 10.7269 3.25938 10.9238 3.5 10.9238H4.375V10.9211ZM9.91758 0.511322L9.52383 0.907806L8.90586 1.52578L8.59414 1.83476L9.5211 2.76171L11.2191 4.45976L12.1461 5.38671L12.4551 5.07773L13.0731 4.45976L13.4695 4.06328C14.1531 3.37968 14.1531 2.27226 13.4695 1.58867L12.3949 0.511322C11.7113 -0.172272 10.6039 -0.172272 9.92032 0.511322H9.91758ZM8.62149 5.10507L4.68399 9.04257C4.51446 9.2121 4.23555 9.2121 4.06602 9.04257C3.89649 8.87304 3.89649 8.59413 4.06602 8.4246L8.00352 4.4871C8.17305 4.31757 8.45196 4.31757 8.62149 4.4871C8.79102 4.65663 8.79102 4.93554 8.62149 5.10507Z"
                  fill="#B7AFC5"
                />
              </G>
              <Defs>
                <ClipPath id="clip0_259_22">
                  <Rect width={14} height={14} fill="white" />
                </ClipPath>
              </Defs>
            </Svg>
            <Text style={styles.addNoteText}>Add a note or share</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onDelete} style={styles.deleteContainer}>
            <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
              <Path
                d="M11 1.5L10.5 1H5.5L5 1.5V3H2V4H3V13.5C3 14.3284 3.67157 15 4.5 15H11.5C12.3284 15 13 14.3284 13 13.5V4H14V3H11V1.5ZM6 2H10V3H6V2ZM12 4V13.5C12 13.7761 11.7761 14 11.5 14H4.5C4.22386 14 4 13.7761 4 13.5V4H12ZM6 5V12H7V5H6ZM9 5V12H10V5H9Z"
                fill="#DC3545"
              />
            </Svg>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>

        {energyLevel === 'Groggy' && (
          // Show sleep specialist option for groggy users below normal actions
          <TouchableOpacity onPress={handleSleepSpecialist} style={styles.sleepSpecialistContainer}>
            <Text style={styles.sleepSpecialistText}>We're sorry to hear you're feeling groggy. Click here to talk to a sleep specialist that can help!</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E5E8EC',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 120,
  },
  collapsibleArea: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    marginTop: 12,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  dateTimeContent: {
    justifyContent: 'center',
    height: 40,
    gap: 3.76,
  },
  dateText: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    color: '#1E2A38',
  },
  timeText: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: '#1E2A38',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    gap: 23.75,
  },
  durationPill: {
    height: 32,
    paddingHorizontal: 10.844,
    paddingVertical: 8,
    backgroundColor: 'rgba(183, 175, 197, 0.20)',
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 67,
  },
  durationText: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '700',
    color: '#1E2A38',
  },
  arrowButton: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#1E2A38',
    marginTop: 16,
    alignSelf: 'stretch',
  },
  sleepInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 20,
    marginTop: 5,
  },
  sleepStageText: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: '#1E2A38',
  },
  energyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 20,
  },
  energyIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#1E2A38',
  },
  energyText: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    color: '#1E2A38',
  },
  actionsContainer: {
    marginTop: 8,
  },

  normalActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addNoteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    flex: 1,
  },
  addNoteText: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: '#B7AFC5',
    textDecorationLine: 'underline',
  },
  sleepSpecialistContainer: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  sleepSpecialistText: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    color: '#4CAF50',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  deleteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  deleteText: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#DC3545',
  },
});

export default NapHistoryDetailCard;