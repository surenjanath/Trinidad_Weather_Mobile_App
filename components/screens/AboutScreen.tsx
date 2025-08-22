import React from 'react';
import { 
  View, 
  ScrollView, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  Linking
} from 'react-native';

export default function AboutScreen() {
  const openLinkedIn = () => {
    Linking.openURL('https://www.linkedin.com/in/surenjanath-singh/');
  };

  return (
    <View style={styles.aboutPageContainer}>
      <ScrollView 
        style={styles.aboutScrollView} 
        contentContainerStyle={styles.aboutScrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        bounces={true}
        alwaysBounceVertical={false}
      >
        <View style={styles.aboutContainer}>
          {/* App Introduction */}
          <View style={styles.introSection}>
            <Text style={styles.introLabel}>Your weather app is</Text>
            <Text style={styles.appName}>TTMS Weather Alert.</Text>
            <Text style={styles.appDescription}>
              TTMS Weather Alert is a comprehensive weather application for Trinidad and Tobago Meteorological Service. 
              Provides real-time weather forecasts, marine conditions, tide information, and critical weather alerts 
              to keep citizens informed and safe.
            </Text>
          </View>

          {/* Core Features Section */}
          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>Features</Text>
            <View style={styles.featuresGrid}>
              <View style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Text style={styles.iconText}>🌤️</Text>
                </View>
                <Text style={styles.featureName}>Forecasts</Text>
              </View>
              
              <View style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Text style={styles.iconText}>🌊</Text>
                </View>
                <Text style={styles.featureName}>Marine</Text>
              </View>
              
              <View style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Text style={styles.iconText}>📊</Text>
                </View>
                <Text style={styles.featureName}>Data</Text>
              </View>
            </View>
          </View>

          {/* Data Source */}
          <View style={styles.dataSection}>
            <Text style={styles.sectionTitle}>Data Source</Text>
            <Text style={styles.dataDescription}>
              All weather data is provided by the Trinidad and Tobago Meteorological Service 
              through their official API endpoints, ensuring accuracy and reliability.
            </Text>
          </View>

          {/* Creator Credit */}
          <View style={styles.creatorSection}>
            <Text style={styles.creatorText}>
              Created with ❤️ by{' '}
              <Text style={styles.creatorName} onPress={openLinkedIn}>
                Surenjanath Singh
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  aboutPageContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  aboutScrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  aboutScrollContent: {
    paddingBottom: 40, // Reduced since we removed the action button
  },
  aboutContainer: {
    paddingHorizontal: 24,
    paddingTop: 150, // User's preferred top padding
  },
  
  // Intro Section
  introSection: {
    marginBottom: 30,
  },
  introLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 8,
  },
  appName: {
    fontSize: 48,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 20,
    letterSpacing: -1,
    lineHeight: 52,
  },
  appDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 24,
  },

  // Features Section
  featuresSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  featureItem: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  iconText: {
    fontSize: 20,
  },
  featureName: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },

  // Data Section
  dataSection: {
    marginBottom: 30, // Increased to give space before creator credit
  },
  dataDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 24,
  },

  // Creator Credit Section
  creatorSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  creatorText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 24,
  },
  creatorName: {
    fontFamily: 'Inter-Bold',
    color: '#FF6B6B', // Same coral color as the old button
    textDecorationLine: 'underline',
  },
});
