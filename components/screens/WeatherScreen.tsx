import React from 'react';
import { 
  View, 
  ScrollView, 
  Text, 
  StyleSheet, 
  RefreshControl, 
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Cloud, Wind, Moon } from 'lucide-react-native';
import { WeatherForecast } from '@/types/weather';

interface WeatherScreenProps {
  forecast: WeatherForecast;
  isRefreshing: boolean;
  onRefresh: () => void;
  getCurrentTime: () => string;
  getCurrentDate: () => string;
  getDayAbbreviation: (dayOffset: number) => string;
}

export default function WeatherScreen({ 
  forecast, 
  isRefreshing, 
  onRefresh, 
  getCurrentTime, 
  getCurrentDate, 
  getDayAbbreviation 
}: WeatherScreenProps) {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          tintColor="#FFFFFF"
          colors={['#FFFFFF']}
        />
      }
      showsVerticalScrollIndicator={false}
    >
      {/* Time Display - Minimal */}
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{getCurrentTime()}</Text>
        <Text style={styles.dateText}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </Text>
        <Text style={styles.weatherSummary}>
          {forecast.general_synopsis} · {Math.round((forecast.piarco_max + forecast.piarco_min) / 2)}°C
        </Text>
      </View>

      {/* Minimal Week Selector */}
      <View style={styles.weekContainer}>
        {[0, 1, 2, 3, 4].map((dayOffset) => (
          <TouchableOpacity 
            key={dayOffset} 
            style={[styles.dayButton, dayOffset === 0 && styles.dayButtonActive]}
          >
            <Text style={[styles.dayText, dayOffset === 0 && styles.dayTextActive]}>
              {dayOffset === 0 ? 'Today' : getDayAbbreviation(dayOffset)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Power Reserve Info */}
      <View style={styles.powerContainer}>
        <View style={styles.powerBar}>
          <View style={styles.powerProgress} />
        </View>
        <Text style={styles.powerText}>Power reserve - 40% - Discharged in 10 hours</Text>
      </View>

      {/* Current Weather Display - Minimal */}
      <View style={styles.mainWeatherContainer}>
        <Text style={styles.temperatureText}>
          {Math.round((forecast.piarco_max + forecast.piarco_min) / 2)}°
        </Text>
        <Text style={styles.locationText}>Trinidad & Tobago</Text>
        <View style={styles.weatherDivider} />
      </View>

      {/* Weather Details - Clean Grid */}
      <View style={styles.weatherGrid}>
        <View style={styles.weatherCard}>
          <Cloud size={18} color="rgba(255, 255, 255, 0.8)" />
          <Text style={styles.cardLabel}>Conditions</Text>
          <Text style={styles.cardValue}>{forecast.general_synopsis}</Text>
        </View>
        
        <View style={styles.weatherCard}>
          <Wind size={18} color="rgba(255, 255, 255, 0.8)" />
          <Text style={styles.cardLabel}>Wind</Text>
          <Text style={styles.cardValue}>11 km/h</Text>
        </View>
        
        <View style={styles.weatherCard}>
          <Moon size={18} color="rgba(255, 255, 255, 0.8)" />
          <Text style={styles.cardLabel}>Sunset</Text>
          <Text style={styles.cardValue}>{forecast.sunset_time}</Text>
        </View>
      </View>

      {/* Refresh Status Indicator */}
      {isRefreshing && (
        <View style={styles.refreshIndicator}>
          <ActivityIndicator size="small" color="#FFFFFF" />
          <Text style={styles.refreshText}>Updating weather data...</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  timeContainer: {
    marginTop: 25,
    marginBottom: 20,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 56,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
    letterSpacing: -2,
  },
  dateText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  weatherSummary: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  dayButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  dayButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  dayText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  dayTextActive: {
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  powerContainer: {
    marginBottom: 28,
  },
  powerBar: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 2,
    marginBottom: 10,
    overflow: 'hidden',
  },
  powerProgress: {
    height: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    width: '40%',
  },
  powerText: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  mainWeatherContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 15,
  },
  temperatureText: {
    fontSize: 84,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 8,
    letterSpacing: -3,
  },
  locationText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.85)',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  weatherDivider: {
    width: 60,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginTop: 10,
  },
  weatherGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  weatherCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  cardLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  cardValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  refreshIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    marginHorizontal: 20,
  },
  refreshText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    marginLeft: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
