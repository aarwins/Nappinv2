import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Svg, Path } from 'react-native-svg';

// Back arrow icon for header (consistent with other screens)
const BackArrowIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M0.439453 10.9441C-0.146484 11.5301 -0.146484 12.4816 0.439453 13.0676L7.93945 20.5676C8.52539 21.1535 9.47695 21.1535 10.0629 20.5676C10.6488 19.9816 10.6488 19.0301 10.0629 18.4441L5.11758 13.5035H19.4988C20.3285 13.5035 20.9988 12.8332 20.9988 12.0035C20.9988 11.1738 20.3285 10.5035 19.4988 10.5035H5.12227L10.0582 5.56289C10.6441 4.97695 10.6441 4.02539 10.0582 3.43945C9.47227 2.85352 8.5207 2.85352 7.93477 3.43945L0.434766 10.9395L0.439453 10.9441Z"
      fill="#FDFDFD"
    />
  </Svg>
);

// List item component for bulleted content
const ListItem = ({ children, style }) => (
  <View style={[styles.listItem, style]}>
    <Text style={styles.listBullet}>•</Text>
    <Text style={styles.listText}>{children}</Text>
  </View>
);

export default function PrivacyPolicyScreen({ navigation }) {
  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <BackArrowIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentContainer}>
          {/* Title */}
          <Text style={styles.title}>Privacy Policy</Text>
          
          {/* Last Updated */}
          <Text style={styles.lastUpdated}>
            <Text style={styles.lastUpdatedBold}>Last Updated:</Text> June 15, 2024
          </Text>

          {/* Introduction */}
          <Text style={styles.paragraph}>
            At Nappin, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our mobile application.
          </Text>

          {/* Section 1 */}
          <Text style={styles.sectionTitle}>1. Information We Collect</Text>
          
          <Text style={styles.subsectionTitle}>Personal Information</Text>
          <View style={styles.listContainer}>
            <ListItem>Account information (name, email address)</ListItem>
            <ListItem>Profile preferences and settings</ListItem>
            <ListItem>Device information and identifiers</ListItem>
          </View>

          <Text style={styles.subsectionTitle}>Nap and Wellness Data</Text>
          <View style={styles.listContainer}>
            <ListItem>Nap duration and timing</ListItem>
            <ListItem>Sleep quality ratings</ListItem>
            <ListItem>Mood assessments</ListItem>
            <ListItem>Journal entries and notes</ListItem>
            <ListItem>Breathing exercise usage</ListItem>
          </View>

          <Text style={styles.subsectionTitle}>Health Integration Data</Text>
          <View style={styles.listContainer}>
            <ListItem>Heart rate data (with Apple Watch integration)</ListItem>
            <ListItem>Sleep stage information (when available)</ListItem>
            <ListItem>Activity data from connected fitness devices</ListItem>
          </View>

          {/* Section 2 */}
          <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
          <Text style={styles.paragraph}>We use your information to:</Text>
          <View style={styles.listContainer}>
            <ListItem>Provide personalized nap recommendations</ListItem>
            <ListItem>Track your wellness progress over time</ListItem>
            <ListItem>Send helpful reminders and tips</ListItem>
            <ListItem>Improve our app features and user experience</ListItem>
            <ListItem>Ensure the security of your account</ListItem>
          </View>

          {/* Section 3 */}
          <Text style={styles.sectionTitle}>3. Data Sharing and Third Parties</Text>
          <Text style={styles.paragraph}>
            We do not sell or rent your personal information to third parties. We may share limited data in the following circumstances:
          </Text>
          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <Text style={styles.listBullet}>•</Text>
              <View style={styles.listTextContainer}>
                <Text style={styles.listTextBold}>Health Integrations:</Text>
                <Text style={styles.listText}>Only nap duration and mood data is shared with Apple Health or other connected services, and only with your explicit consent</Text>
              </View>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.listBullet}>•</Text>
              <View style={styles.listTextContainer}>
                <Text style={styles.listTextBold}>Service Providers:</Text>
                <Text style={styles.listText}>We work with trusted partners to provide cloud storage and analytics services</Text>
              </View>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.listBullet}>•</Text>
              <View style={styles.listTextContainer}>
                <Text style={styles.listTextBold}>Legal Requirements:</Text>
                <Text style={styles.listText}>We may disclose information if required by law or to protect our users' safety</Text>
              </View>
            </View>
          </View>

          {/* Section 4 */}
          <Text style={styles.sectionTitle}>4. Data Security</Text>
          <Text style={styles.paragraph}>
            We implement industry-standard security measures to protect your data:
          </Text>
          <View style={styles.listContainer}>
            <ListItem>End-to-end encryption for sensitive health data</ListItem>
            <ListItem>Secure cloud storage with regular backups</ListItem>
            <ListItem>Regular security audits and updates</ListItem>
            <ListItem>Limited access controls for our team members</ListItem>
          </View>

          {/* Section 5 */}
          <Text style={styles.sectionTitle}>5. Your Rights and Choices</Text>
          <Text style={styles.paragraph}>You have the right to:</Text>
          <View style={styles.listContainer}>
            <ListItem>Access and review your personal data</ListItem>
            <ListItem>Request corrections to inaccurate information</ListItem>
            <ListItem>Delete your account and associated data</ListItem>
            <ListItem>Export your data in a portable format</ListItem>
            <ListItem>Opt out of non-essential communications</ListItem>
            <ListItem>Disconnect third-party integrations at any time</ListItem>
          </View>

          {/* Section 6 */}
          <Text style={styles.sectionTitle}>6. Data Retention</Text>
          <Text style={styles.paragraph}>
            We retain your data for as long as your account is active or as needed to provide our services. You can delete your account and data at any time through the app settings. Some anonymized usage data may be retained for analytical purposes.
          </Text>

          {/* Section 7 */}
          <Text style={styles.sectionTitle}>7. Children's Privacy</Text>
          <Text style={styles.paragraph}>
            Nappin is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly.
          </Text>

          {/* Section 8 */}
          <Text style={styles.sectionTitle}>8. International Data Transfers</Text>
          <Text style={styles.paragraph}>
            Your data may be processed and stored in countries other than your own. We ensure that appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
          </Text>

          {/* Section 9 */}
          <Text style={styles.sectionTitle}>9. Changes to This Policy</Text>
          <Text style={styles.paragraph}>
            We may update this Privacy Policy from time to time. We will notify you of significant changes through the app or via email. Your continued use of Nappin after such modifications constitutes your acceptance of the updated policy.
          </Text>

          {/* Section 10 */}
          <Text style={styles.sectionTitle}>10. Contact Us</Text>
          <Text style={styles.paragraph}>
            If you have questions about this Privacy Policy or our data practices, please contact us:
          </Text>
          <View style={styles.listContainer}>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Email:</Text>
              <Text style={styles.contactValue}>nappinapplication@gmail.com</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Website:</Text>
              <Text style={styles.contactValue}>nappin.app</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Address:</Text>
              <Text style={styles.contactValue}>Southington, Connecticut</Text>
            </View>
          </View>
          <Text style={styles.paragraph}>
            We are committed to addressing your concerns and protecting your privacy rights.
          </Text>

          {/* Section 11 */}
          <Text style={styles.sectionTitle}>11. California Privacy Rights</Text>
          <Text style={styles.paragraph}>
            If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):
          </Text>
          <View style={styles.listContainer}>
            <ListItem>Right to know what personal information is collected</ListItem>
            <ListItem>Right to delete personal information</ListItem>
            <ListItem>Right to opt-out of the sale of personal information</ListItem>
            <ListItem>Right to non-discrimination for exercising your rights</ListItem>
          </View>
          <Text style={styles.paragraph}>
            To exercise these rights, please contact us using the information provided above.
          </Text>

          {/* Section 12 */}
          <Text style={styles.sectionTitle}>12. European Privacy Rights</Text>
          <Text style={styles.paragraph}>
            If you are in the European Economic Area (EEA), you have rights under the General Data Protection Regulation (GDPR), including:
          </Text>
          <View style={styles.listContainer}>
            <ListItem>Right of access to your personal data</ListItem>
            <ListItem>Right to rectification of inaccurate data</ListItem>
            <ListItem>Right to erasure ("right to be forgotten")</ListItem>
            <ListItem>Right to restrict processing</ListItem>
            <ListItem>Right to data portability</ListItem>
            <ListItem>Right to object to processing</ListItem>
          </View>
          <Text style={styles.paragraph}>
            Our legal basis for processing your data includes your consent, performance of our contract with you, and our legitimate interests in providing and improving our services.
          </Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    height: 48,
    marginTop: 48,
    backgroundColor: '#1E2A38',
  },
  backButton: {
    position: 'absolute',
    left: 15,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    gap: 12,
  },
  title: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 32,
    marginBottom: 22,
  },
  lastUpdated: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 23,
    marginBottom: 23,
  },
  lastUpdatedBold: {
    fontWeight: '700',
  },
  paragraph: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 23,
    marginBottom: 17,
  },
  sectionTitle: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 26,
    marginTop: 13,
    marginBottom: 16,
  },
  subsectionTitle: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 26,
    marginBottom: 1,
  },
  listContainer: {
    paddingLeft: 20,
    marginBottom: 15,
    gap: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  listBullet: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    marginRight: 8,
    marginTop: 1,
  },
  listText: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    flex: 1,
  },
  listTextContainer: {
    flex: 1,
  },
  listTextBold: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 23,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  contactLabel: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 23,
    marginRight: 8,
  },
  contactValue: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 23,
    flex: 1,
  },
});
