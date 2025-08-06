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

export default function TermsOfUseScreen({ navigation }) {
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
        <Text style={styles.headerTitle}>Terms of Use</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentContainer}>
          {/* Title */}
          <Text style={styles.title}>Terms of Use</Text>
          
          {/* Last Updated */}
          <Text style={styles.lastUpdated}>
            <Text style={styles.lastUpdatedBold}>Last Updated:</Text> June 15, 2024
          </Text>

          {/* Introduction */}
          <Text style={styles.paragraph}>
            Welcome to Nappin. These Terms of Use govern your access to and use of the Nappin mobile application and related services. By downloading, installing, or using our app, you agree to be bound by these terms.
          </Text>

          {/* Section 1 */}
          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.paragraph}>
            By accessing or using Nappin, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree to these terms, please do not use our services.
          </Text>

          {/* Section 2 */}
          <Text style={styles.sectionTitle}>2. Description of Service</Text>
          <Text style={styles.paragraph}>
            Nappin is a wellness application designed to help users optimize their napping habits and improve their overall well-being through:
          </Text>
          <View style={styles.listContainer}>
            <ListItem>Personalized nap recommendations</ListItem>
            <ListItem>Sleep tracking and analytics</ListItem>
            <ListItem>Breathing exercises and relaxation tools</ListItem>
            <ListItem>Journal and mood tracking features</ListItem>
            <ListItem>Integration with health and fitness devices</ListItem>
          </View>

          {/* Section 3 */}
          <Text style={styles.sectionTitle}>3. Eligibility</Text>
          <Text style={styles.paragraph}>
            You must be at least 13 years old to use Nappin. If you are under 18, you must have permission from a parent or legal guardian. By using our service, you represent and warrant that you meet these age requirements.
          </Text>

          {/* Section 4 */}
          <Text style={styles.sectionTitle}>4. User Accounts</Text>
          <Text style={styles.paragraph}>
            To access certain features of Nappin, you may need to create an account. You agree to:
          </Text>
          <View style={styles.listContainer}>
            <ListItem>Provide accurate, current, and complete information</ListItem>
            <ListItem>Maintain and update your account information</ListItem>
            <ListItem>Keep your login credentials secure and confidential</ListItem>
            <ListItem>Notify us immediately of any unauthorized use of your account</ListItem>
            <ListItem>Accept responsibility for all activities that occur under your account</ListItem>
          </View>

          {/* Section 5 */}
          <Text style={styles.sectionTitle}>5. Acceptable Use</Text>
          <Text style={styles.paragraph}>
            You agree to use Nappin only for lawful purposes and in accordance with these Terms. You may not:
          </Text>
          <View style={styles.listContainer}>
            <ListItem>Use the app to harm, harass, or violate the rights of others</ListItem>
            <ListItem>Upload or share content that is illegal, harmful, or inappropriate</ListItem>
            <ListItem>Attempt to reverse engineer, hack, or compromise our systems</ListItem>
            <ListItem>Use automated tools to access or interact with our services</ListItem>
            <ListItem>Impersonate others or provide false information</ListItem>
            <ListItem>Interfere with or disrupt our services or servers</ListItem>
          </View>

          {/* Section 6 */}
          <Text style={styles.sectionTitle}>6. Health and Medical Disclaimers</Text>
          <Text style={styles.paragraph}>
            <Text style={styles.boldText}>Important:</Text> Nappin is not a medical device and is not intended to diagnose, treat, cure, or prevent any disease or medical condition. Our app provides general wellness information and should not replace professional medical advice.
          </Text>
          <Text style={styles.paragraph}>
            You should consult with a healthcare professional before:
          </Text>
          <View style={styles.listContainer}>
            <ListItem>Making significant changes to your sleep patterns</ListItem>
            <ListItem>Using our app if you have sleep disorders</ListItem>
            <ListItem>Relying on our recommendations for health decisions</ListItem>
          </View>

          {/* Section 7 */}
          <Text style={styles.sectionTitle}>7. Data and Privacy</Text>
          <Text style={styles.paragraph}>
            Your privacy is important to us. Our collection, use, and protection of your personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
          </Text>

          {/* Section 8 */}
          <Text style={styles.sectionTitle}>8. Intellectual Property</Text>
          <Text style={styles.paragraph}>
            All content, features, and functionality of Nappin are owned by us or our licensors and are protected by copyright, trademark, and other intellectual property laws. You may not:
          </Text>
          <View style={styles.listContainer}>
            <ListItem>Copy, modify, or distribute our app or content</ListItem>
            <ListItem>Use our trademarks or branding without permission</ListItem>
            <ListItem>Create derivative works based on our services</ListItem>
          </View>

          {/* Section 9 */}
          <Text style={styles.sectionTitle}>9. User-Generated Content</Text>
          <Text style={styles.paragraph}>
            You retain ownership of content you create in Nappin (such as journal entries). By using our services, you grant us a limited license to store, process, and display your content as necessary to provide our services.
          </Text>

          {/* Section 10 */}
          <Text style={styles.sectionTitle}>10. Third-Party Integrations</Text>
          <Text style={styles.paragraph}>
            Nappin may integrate with third-party services (such as Apple Health or fitness trackers). Your use of these integrations is subject to the terms and privacy policies of those third parties. We are not responsible for third-party services or their practices.
          </Text>

          {/* Section 11 */}
          <Text style={styles.sectionTitle}>11. Subscription and Payments</Text>
          <Text style={styles.paragraph}>
            Some features of Nappin may require a paid subscription. By purchasing a subscription, you agree to:
          </Text>
          <View style={styles.listContainer}>
            <ListItem>Pay all applicable fees as described in the app</ListItem>
            <ListItem>Automatic renewal unless cancelled before the renewal date</ListItem>
            <ListItem>Our refund policy as outlined in the app stores</ListItem>
          </View>

          {/* Section 12 */}
          <Text style={styles.sectionTitle}>12. Termination</Text>
          <Text style={styles.paragraph}>
            We may suspend or terminate your access to Nappin at any time for any reason, including violation of these Terms. You may also delete your account at any time through the app settings.
          </Text>
          <Text style={styles.paragraph}>Upon termination:</Text>
          <View style={styles.listContainer}>
            <ListItem>Your access to our services will cease immediately</ListItem>
            <ListItem>We may delete your account and data</ListItem>
            <ListItem>Provisions of these Terms that should survive will remain in effect</ListItem>
          </View>

          {/* Section 13 */}
          <Text style={styles.sectionTitle}>13. Disclaimers and Limitations of Liability</Text>
          <Text style={styles.paragraph}>
            Nappin is provided "as is" without warranties of any kind. We disclaim all warranties, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.
          </Text>
          <Text style={styles.paragraph}>
            To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.
          </Text>

          {/* Section 14 */}
          <Text style={styles.sectionTitle}>14. Indemnification</Text>
          <Text style={styles.paragraph}>
            You agree to indemnify and hold us harmless from any claims, damages, losses, or expenses arising from your use of Nappin or violation of these Terms.
          </Text>

          {/* Section 15 */}
          <Text style={styles.sectionTitle}>15. Governing Law</Text>
          <Text style={styles.paragraph}>
            These Terms are governed by the laws of the State of California, without regard to conflict of law principles. Any disputes will be resolved in the courts of San Francisco County, California.
          </Text>

          {/* Section 16 */}
          <Text style={styles.sectionTitle}>16. Changes to Terms</Text>
          <Text style={styles.paragraph}>
            We may update these Terms from time to time. We will notify you of significant changes through the app or via email. Your continued use of Nappin after such changes constitutes acceptance of the new Terms.
          </Text>

          {/* Section 17 */}
          <Text style={styles.sectionTitle}>17. Severability</Text>
          <Text style={styles.paragraph}>
            If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
          </Text>

          {/* Section 18 */}
          <Text style={styles.sectionTitle}>18. Contact Information</Text>
          <Text style={styles.paragraph}>
            If you have questions about these Terms of Use, please contact us:
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
            Thank you for using Nappin. We hope our app helps you achieve better rest and wellness.
          </Text>

          {/* Additional Information */}
          <Text style={styles.sectionTitle}>19. Effective Date</Text>
          <Text style={styles.paragraph}>
            These Terms of Use are effective as of the last updated date listed above and will remain in effect until modified or replaced.
          </Text>

          <Text style={styles.sectionTitle}>20. Entire Agreement</Text>
          <Text style={styles.paragraph}>
            These Terms of Use, together with our Privacy Policy, constitute the entire agreement between you and Nappin regarding your use of our services and supersede all prior agreements and understandings.
          </Text>

          <Text style={styles.paragraph}>
            By continuing to use Nappin, you acknowledge that you have read and understood these Terms of Use and agree to be bound by them. We appreciate your trust in us and are committed to providing you with the best possible napping and wellness experience.
          </Text>

          <Text style={[styles.paragraph, styles.footerText]}>
            © 2024 Nappin. All rights reserved.
          </Text>

          {/* Audio Attribution Credits */}
          <Text style={styles.sectionTitle}>Audio Attribution</Text>
          <Text style={styles.attributionText}>
            UnderTreeInRain.mp3 by acclivity -- https://freesound.org/s/28283/ -- License: Attribution NonCommercial 4.0
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
  },
  title: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 32,
    marginBottom: 21,
  },
  lastUpdated: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 23,
    marginBottom: 24,
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
    marginBottom: 18,
  },
  sectionTitle: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 26,
    marginTop: 10,
    marginBottom: 12,
  },
  boldText: {
    fontWeight: '700',
  },
  listContainer: {
    paddingLeft: 20,
    marginBottom: 18,
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
  footerText: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#B7AFC5',
    marginTop: 8,
    marginBottom: 24,
  },
  attributionText: {
    color: '#FDFDFD',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    marginBottom: 24,
    textAlign: 'left',
  },
});
