import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WeatherForecast } from '@/types/weather';

interface MainForecastHeaderProps {
  forecast: WeatherForecast;
}

export default function MainForecastHeader({ forecast }: MainForecastHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TTMS Weather Alert</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
    letterSpacing: 0.2,
  },
});