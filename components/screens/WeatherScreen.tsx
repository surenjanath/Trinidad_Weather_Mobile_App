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
import { Cloud, Wind, Moon, Sun, Waves, Thermometer } from 'lucide-react-native';

interface WeatherScreenProps {
  forecast: any; // Using any for now since we're working with your API structure
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
  // Extract data from your API structure
  const weatherData = forecast?.items?.[0] || {};
  
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
          {weatherData.forecastPeriod || 'Tonight and Tomorrow'} · {weatherData.PiarcoFcstMxTemp || '32'}°C
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
          {weatherData.PiarcoFcstMxTemp || '32'}°
        </Text>
        <Text style={styles.locationText}>Trinidad & Tobago</Text>
        <Text style={styles.forecastText}>
          {weatherData.textArea1?.split('Tomorrow:')[0]?.replace('Tonight:', '').trim() || 'Fair and hazy intervals'}
        </Text>
        <View style={styles.weatherDivider} />
      </View>

      {/* Weather Details - Clean Grid */}
      <View style={styles.weatherGrid}>
        <View style={styles.weatherCard}>
          <Thermometer size={18} color="rgba(255, 255, 255, 0.8)" />
          <Text style={styles.cardLabel}>Piarco</Text>
          <Text style={styles.cardValue}>{weatherData.PiarcoFcstMnTemp || '24'}° / {weatherData.PiarcoFcstMxTemp || '32'}°</Text>
        </View>
        
        <View style={styles.weatherCard}>
          <Thermometer size={18} color="rgba(255, 255, 255, 0.8)" />
          <Text style={styles.cardLabel}>Crown Point</Text>
          <Text style={styles.cardValue}>{weatherData.CrownFcstMnTemp || '26'}° / {weatherData.CrownFcstMxTemp || '30'}°</Text>
        </View>
        
        <View style={styles.weatherCard}>
          <Waves size={18} color="rgba(255, 255, 255, 0.8)" />
          <Text style={styles.cardLabel}>Seas</Text>
          <Text style={styles.cardValue}>{weatherData.seas || 'Moderate'}</Text>
        </View>
      </View>

      {/* Additional Weather Info - Minimal */}
      <View style={styles.additionalInfo}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Sun size={16} color="rgba(255, 255, 255, 0.7)" />
            <Text style={styles.infoText}>Sunrise {weatherData.sunrise || '5:56 AM'}</Text>
          </View>
          <View style={styles.infoItem}>
            <Moon size={16} color="rgba(255, 255, 255, 0.7)" />
            <Text style={styles.infoText}>Sunset {weatherData.sunset || '6:20 PM'}</Text>
          </View>
        </View>
        
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Cloud size={16} color="rgba(255, 255, 255, 0.7)" />
            <Text style={styles.infoText}>Rain {weatherData.probrainfall || '40'}%</Text>
          </View>
          <View style={styles.infoItem}>
            <Wind size={16} color="rgba(255, 255, 255, 0.7)" />
            <Text style={styles.infoText}>Waves {weatherData.waves1 || '1.5m to 2.0m'}</Text>
          </View>
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
    marginTop: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 50,
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
  forecastText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 20,
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
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
  additionalInfo: {
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  infoText: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.85)',
    marginLeft: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
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