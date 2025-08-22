import { useState, useEffect, useCallback } from 'react';
import { WeatherForecast } from '@/types/weather';
import { WeatherApiService } from '@/services/weatherApi';

export function useWeatherData() {
  // Dummy data for immediate testing - Replace with real API call later
  const dummyForecast: WeatherForecast = {
    id: "dummy-001",
    forecast_period: "Today",
    general_synopsis: "Partly cloudy with scattered showers",
    forecaster_name: "TTMS Forecaster",
    issue_time: "06:00",
    imageTrin: "",
    imagebago: "",
    piarco_max: 32,
    piarco_min: 24,
    crown_point_max: 30,
    crown_point_min: 22,
    heat_index_piarco: 35,
    heat_index_crown_point: 33,
    seas_state: "Moderate",
    wave_heights_open: "1.5m",
    wave_heights_sheltered: "0.5m",
    tides_trinidad: [
      { type: 'high', time: '14:30', height: '1.2m' },
      { type: 'low', time: '08:15', height: '0.3m' }
    ],
    tides_tobago: [
      { type: 'high', time: '15:00', height: '1.1m' },
      { type: 'low', time: '09:00', height: '0.2m' }
    ],
    sunrise_time: "06:15",
    sunset_time: "18:45",
    moonrise_time: "22:30",
    moonset_time: "10:15",
    outlook_24hr: "Continued partly cloudy conditions",
    outlook_48hr: "Gradual improvement in weather",
    outlook_24hr_max_min: "Max: 32°C, Min: 24°C",
    outlook_48hr_max_min: "Max: 31°C, Min: 23°C"
  };

  const [forecast, setForecast] = useState<WeatherForecast | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start with loading true to show spinner
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // To switch back to real API: 
  // 1. Keep isLoading as true initially
  // 2. Uncomment the fetchWeatherData() call in useEffect
  // 3. Remove the setTimeout below

  const fetchWeatherData = useCallback(async (isRefresh = false) => {
    try {
      setError(null);
      
      if (isRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      // Simulate API delay for demo purposes
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For now, just set the dummy data
      setForecast(dummyForecast);
      
      // When ready for real API:
      // const data = await WeatherApiService.fetchWeatherData();
      // if (data) {
      //   setForecast(data);
      // }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Could not connect to weather service');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  const onRefresh = useCallback(() => {
    fetchWeatherData(true);
  }, [fetchWeatherData]);

  return {
    forecast,
    isLoading,
    isRefreshing,
    error,
    onRefresh,
    fetchWeatherData,
  };
}
