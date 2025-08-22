import React from 'react';
import { 
  View, 
  ScrollView, 
  Text, 
  StyleSheet
} from 'react-native';
import { 
  Thermometer, 
  Waves, 
  Clock, 
  Cloud, 
  Sun, 
  Wind, 
  Droplets,
  MapPin
} from 'lucide-react-native';

interface DetailedWeatherScreenProps {
  forecast: any; // Using any for now since we're working with your API structure
}

export default function DetailedWeatherScreen({ forecast }: DetailedWeatherScreenProps) {
  // Extract data from your API structure
  const weatherData = forecast?.items?.[0] || {};
  
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>Detailed Weather</Text>
        <Text style={styles.headerSubtitle}>
          {weatherData.forecastPeriod || 'Tonight and Tomorrow'}
        </Text>
        <Text style={styles.issuedText}>
          Issued: {weatherData.IssuedAt || '4:05 PM'} by {weatherData.forecaster || 'Albert Alexander'}
        </Text>
      </View>

      {/* Temperature Details */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Temperature Information</Text>
        
        <View style={styles.temperatureGrid}>
          <View style={styles.tempCard}>
            <View style={styles.tempHeader}>
              <MapPin size={16} color="rgba(255, 255, 255, 0.7)" />
              <Text style={styles.tempLocation}>Piarco</Text>
            </View>
            <View style={styles.tempRange}>
              <Text style={styles.tempMin}>{weatherData.PiarcoFcstMnTemp || '24'}°</Text>
              <Text style={styles.tempMax}>{weatherData.PiarcoFcstMxTemp || '32'}°</Text>
            </View>
            <Text style={styles.tempLabel}>Min - Max</Text>
            <Text style={styles.heatIndex}>Heat Index: {weatherData.PiarcoheatIndex || '35'}°</Text>
          </View>

          <View style={styles.tempCard}>
            <View style={styles.tempHeader}>
              <MapPin size={16} color="rgba(255, 255, 255, 0.7)" />
              <Text style={styles.tempLocation}>Crown Point</Text>
            </View>
            <View style={styles.tempRange}>
              <Text style={styles.tempMin}>{weatherData.CrownFcstMnTemp || '26'}°</Text>
              <Text style={styles.tempMax}>{weatherData.CrownFcstMxTemp || '30'}°</Text>
            </View>
            <Text style={styles.tempLabel}>Min - Max</Text>
            <Text style={styles.heatIndex}>Heat Index: {weatherData.CPointheatIndex || '34'}°</Text>
          </View>
        </View>
      </View>

      {/* Marine Conditions */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Marine Conditions</Text>
        
        <View style={styles.marineGrid}>
          <View style={styles.marineCard}>
            <Waves size={20} color="rgba(255, 255, 255, 0.8)" />
            <Text style={styles.marineTitle}>Sea State</Text>
            <Text style={styles.marineValue}>{weatherData.seas || 'Moderate'}</Text>
          </View>

          <View style={styles.marineCard}>
            <Wind size={20} color="rgba(255, 255, 255, 0.8)" />
            <Text style={styles.marineTitle}>Open Waters</Text>
            <Text style={styles.marineValue}>{weatherData.waves1 || '1.5m to 2.0m'}</Text>
          </View>

          <View style={styles.marineCard}>
            <MapPin size={20} color="rgba(255, 255, 255, 0.8)" />
            <Text style={styles.marineTitle}>Trinidad</Text>
            <Text style={styles.marineValue}>{weatherData.waves2?.split('Trinidad:')[1]?.split('.')[0] || '0.0m to 0.5m'}</Text>
          </View>

          <View style={styles.marineCard}>
            <MapPin size={20} color="rgba(255, 255, 255, 0.8)" />
            <Text style={styles.marineTitle}>Tobago</Text>
            <Text style={styles.marineValue}>{weatherData.waves2?.split('Tobago and elsewhere:')[1] || 'Up to 1.5m'}</Text>
          </View>
        </View>
      </View>

      {/* Tide Information */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Tide Information</Text>
        
        <View style={styles.tideGrid}>
          <View style={styles.tideCard}>
            <Text style={styles.tideLocation}>Trinidad</Text>
            <View style={styles.tideTimes}>
              <View style={styles.tideTime}>
                <Clock size={16} color="rgba(255, 255, 255, 0.7)" />
                <Text style={styles.tideLabel}>AM High</Text>
                <Text style={styles.tideValue}>{weatherData.trinAmHigh || '3:03 AM'}</Text>
              </View>
              <View style={styles.tideTime}>
                <Clock size={16} color="rgba(255, 255, 255, 0.7)" />
                <Text style={styles.tideLabel}>PM High</Text>
                <Text style={styles.tideValue}>{weatherData.trinPmHigh || '4:07 PM'}</Text>
              </View>
            </View>
            <View style={styles.tideTimes}>
              <View style={styles.tideTime}>
                <Clock size={16} color="rgba(255, 255, 255, 0.7)" />
                <Text style={styles.tideLabel}>AM Low</Text>
                <Text style={styles.tideValue}>{weatherData.trinAmLow || '9:43 AM'}</Text>
              </View>
              <View style={styles.tideTime}>
                <Clock size={16} color="rgba(255, 255, 255, 0.7)" />
                <Text style={styles.tideLabel}>PM Low</Text>
                <Text style={styles.tideValue}>{weatherData.trinPmLow || '9:47 PM'}</Text>
              </View>
            </View>
          </View>

          <View style={styles.tideCard}>
            <Text style={styles.tideLocation}>Tobago</Text>
            <View style={styles.tideTimes}>
              <View style={styles.tideTime}>
                <Clock size={16} color="rgba(255, 255, 255, 0.7)" />
                <Text style={styles.tideLabel}>AM High</Text>
                <Text style={styles.tideValue}>{weatherData.tobAmHigh || '2:54 AM'}</Text>
              </View>
              <View style={styles.tideTime}>
                <Clock size={16} color="rgba(255, 255, 255, 0.7)" />
                <Text style={styles.tideLabel}>PM High</Text>
                <Text style={styles.tideValue}>{weatherData.tobPmHigh || '3:48 PM'}</Text>
              </View>
            </View>
            <View style={styles.tideTimes}>
              <View style={styles.tideTime}>
                <Clock size={16} color="rgba(255, 255, 255, 0.7)" />
                <Text style={styles.tideLabel}>AM Low</Text>
                <Text style={styles.tideValue}>{weatherData.tobAmLow || '9:33 AM'}</Text>
              </View>
              <View style={styles.tideTime}>
                <Clock size={16} color="rgba(255, 255, 255, 0.7)" />
                <Text style={styles.tideLabel}>PM Low</Text>
                <Text style={styles.tideValue}>{weatherData.tobPmLow || '9:29 PM'}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Extended Outlook */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Extended Outlook</Text>
        
        <View style={styles.outlookGrid}>
          <View style={styles.outlookCard}>
            <Text style={styles.outlookPeriod}>24 Hours</Text>
            <View style={styles.outlookTemps}>
              <Text style={styles.outlookTemp}>Trinidad: {weatherData.minTrin24look || '24'}° - {weatherData.maxTrin24look || '33'}°</Text>
              <Text style={styles.outlookTemp}>Tobago: {weatherData.minTob24look || '25'}° - {weatherData.maxTob24look || '32'}°</Text>
            </View>
            <Text style={styles.outlookWeather}>{weatherData.wx24 || 'Isolated Showers'}</Text>
          </View>

          <View style={styles.outlookCard}>
            <Text style={styles.outlookPeriod}>48 Hours</Text>
            <View style={styles.outlookTemps}>
              <Text style={styles.outlookTemp}>Trinidad: {weatherData.minTrin48look || '25'}° - {weatherData.maxTrin48look || '33'}°</Text>
              <Text style={styles.outlookTemp}>Tobago: {weatherData.minTob48look || '25'}° - {weatherData.maxTob48look || '32'}°</Text>
            </View>
            <Text style={styles.outlookWeather}>{weatherData.wx48 || 'Isolated Showers'}</Text>
          </View>
        </View>
      </View>

      {/* Additional Information */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Additional Information</Text>
        
        <View style={styles.additionalGrid}>
          <View style={styles.additionalCard}>
            <Sun size={18} color="rgba(255, 255, 255, 0.7)" />
            <Text style={styles.additionalLabel}>Sunrise</Text>
            <Text style={styles.additionalValue}>{weatherData.sunrise || '5:56 AM'}</Text>
          </View>

          <View style={styles.additionalCard}>
            <Sun size={18} color="rgba(255, 255, 255, 0.7)" />
            <Text style={styles.additionalLabel}>Sunset</Text>
            <Text style={styles.additionalValue}>{weatherData.sunset || '6:20 PM'}</Text>
          </View>

          <View style={styles.additionalCard}>
            <Droplets size={18} color="rgba(255, 255, 255, 0.7)" />
            <Text style={styles.additionalLabel}>Rain Chance</Text>
            <Text style={styles.additionalValue}>{weatherData.probrainfall || '40'}%</Text>
          </View>

          <View style={styles.additionalCard}>
            <Cloud size={18} color="rgba(255, 255, 255, 0.7)" />
            <Text style={styles.additionalLabel}>Precipitation</Text>
            <Text style={styles.additionalValue}>{weatherData.precipitation || '25.5'}mm</Text>
          </View>
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
  
  // Header Section
  headerSection: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },
  headerSubtitle: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  issuedText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  // Section Container
  sectionContainer: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },

  // Temperature Grid
  temperatureGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tempCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 18,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
  },
  tempHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tempLocation: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.9)',
    marginLeft: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  tempRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
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
  tempLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  heatIndex: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.8)',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  // Marine Grid
  marineGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  marineCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
  },
  marineTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 8,
    marginBottom: 6,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  marineValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  // Tide Grid
  tideGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tideCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 18,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  tideLocation: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  tideTimes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  tideTime: {
    alignItems: 'center',
    flex: 1,
  },
  tideLabel: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 4,
    marginBottom: 2,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  tideValue: {
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  // Outlook Grid
  outlookGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  outlookCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 18,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  outlookPeriod: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  outlookTemps: {
    marginBottom: 8,
  },
  outlookTemp: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  outlookWeather: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  // Additional Grid
  additionalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  additionalCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
  },
  additionalLabel: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 8,
    marginBottom: 6,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  additionalValue: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  // Swipe Hint
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