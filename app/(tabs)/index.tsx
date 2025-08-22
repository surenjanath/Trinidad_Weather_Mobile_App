import React from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Dimensions,
  Text
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';

// Components
import {
  LoadingSpinner,
  ErrorState,
  WeatherScreen,
  DetailedWeatherScreen,
  AboutScreen,
  NavigationDots,
  SwipeHint
} from '@/components';

// Hooks
import { useWeatherData, useSwipeNavigation } from '@/hooks';

// Utils
import { getCurrentTime, getCurrentDate, getDayAbbreviation } from '@/utils';

const { width, height } = Dimensions.get('window');

export default function WeatherApp() {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  const { forecast, isLoading, isRefreshing, error, onRefresh, fetchWeatherData } = useWeatherData();
  const { currentPage, handleTouchStart, handleTouchMove, handleTouchEnd, goToPage } = useSwipeNavigation();

  if (!fontsLoaded) {
    return null;
  }

  // Show loading spinner when fetching weather data
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error && !forecast) {
    return <ErrorState message={error} onRetry={() => fetchWeatherData()} />;
  }

  if (!forecast) {
    return <ErrorState message="No weather data available" onRetry={() => fetchWeatherData()} />;
  }

  // Check if we're on the About page
  const isAboutPage = currentPage === 2;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Background Image with Rain Trinidad */}
      <ImageBackground
        source={require('@/assets/images/rain_trinidad.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Black fade overlay for better text readability */}
        <LinearGradient
          colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
          style={styles.gradientOverlay}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
      </ImageBackground>
      
      <SafeAreaView style={styles.safeArea}>
        <View 
          style={styles.pageContainer}
          onStartShouldSetResponder={() => true}
          onResponderGrant={handleTouchStart}
          onResponderMove={handleTouchMove}
          onResponderRelease={handleTouchEnd}
        >
          {/* App Name Header - Hidden on About page */}
          {!isAboutPage && (
            <View style={styles.appHeader}>
              <Text style={styles.appTitle}>TTMS Weather Alert</Text>
              <View style={styles.appTitleAccent} />
            </View>
          )}



          {/* Page Content */}
          {currentPage === 0 && (
            <WeatherScreen 
              forecast={forecast}
              isRefreshing={isRefreshing}
              onRefresh={onRefresh}
              getCurrentTime={getCurrentTime}
              getCurrentDate={getCurrentDate}
              getDayAbbreviation={getDayAbbreviation}
            />
          )}

          {currentPage === 1 && (
            <DetailedWeatherScreen forecast={forecast} />
          )}

          {currentPage === 2 && (
            <AboutScreen />
          )}

          {/* Fixed Navigation Dots */}
          <NavigationDots currentPage={currentPage} onPageChange={goToPage} />
          
          {/* Fixed Swipe Hint */}
          <SwipeHint currentPage={currentPage} />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  safeArea: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
  },
  appHeader: {
    paddingTop: 50,
    paddingBottom: 1,
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
    letterSpacing: 0.2,
  },
  appTitleAccent: {
    width: 40,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginTop: 6,
    borderRadius: 1,
  },
});