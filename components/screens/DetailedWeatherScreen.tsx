import React from 'react';
import { 
  View, 
  ScrollView, 
  Text, 
  StyleSheet
} from 'react-native';
import { WeatherForecast } from '@/types/weather';

interface DetailedWeatherScreenProps {
  forecast: WeatherForecast;
}

export default function DetailedWeatherScreen({ forecast }: DetailedWeatherScreenProps) {
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
      <View style={styles.detailedWeatherContainer}>
        <View style={styles.weatherDetailCard}>
          <Text style={styles.detailTitle}>Temperature Range</Text>
          <View style={styles.tempRange}>
            <Text style={styles.tempMin}>{forecast?.piarco_min || '--'}°C</Text>
            <Text style={styles.tempMax}>{forecast?.piarco_max || '--'}°C</Text>
          </View>
          <Text style={styles.detailSubtitle}>Min - Max</Text>
        </View>

        <View style={styles.weatherDetailCard}>
          <Text style={styles.detailTitle}>Marine Conditions</Text>
          <Text style={styles.detailValue}>{forecast?.seas_state || 'Data not available'}</Text>
          <Text style={styles.detailSubtitle}>Sea State</Text>
        </View>

        <View style={styles.weatherDetailCard}>
          <Text style={styles.detailTitle}>Tide Information</Text>
          <Text style={styles.detailValue}>{forecast?.tides_trinidad?.[0]?.time || 'Data not available'}</Text>
          <Text style={styles.detailSubtitle}>High Tide (Trinidad)</Text>
        </View>

        <View style={styles.weatherDetailCard}>
          <Text style={styles.detailTitle}>General Synopsis</Text>
          <Text style={styles.detailValue}>{forecast?.general_synopsis || 'Data not available'}</Text>
          <Text style={styles.detailSubtitle}>Weather Pattern</Text>
        </View>
      </View>
      
      {/* Swipe Hint */}
      <View style={styles.swipeHint}>
        <Text style={styles.swipeText}>
          Swipe left for about app
        </Text>
      </View>
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
  detailedWeatherContainer: {
    paddingHorizontal: 10,
  },
  weatherDetailCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  detailTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  detailValue: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
    lineHeight: 22,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  detailSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.6)',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  tempRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  tempMin: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#87CEEB',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  tempMax: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FF6B6B',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  swipeHint: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  swipeText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
