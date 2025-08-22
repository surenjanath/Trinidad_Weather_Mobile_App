import AsyncStorage from '@react-native-async-storage/async-storage';
import { WeatherForecast, WeatherError } from '@/types/weather';

const API_ENDPOINT = 'https://metproducts.gov.tt/api/forecasts';
const CACHE_KEY = 'tt_weather_cache';
const CACHE_TIMESTAMP_KEY = 'tt_weather_cache_timestamp';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export class WeatherApiService {
  static async fetchWeatherData(): Promise<WeatherForecast | null> {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      });

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();
      
      // Cache the successful response
      await this.cacheWeatherData(data);
      
      return data;
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
      
      // Try to return cached data
      const cachedData = await this.getCachedWeatherData();
      if (cachedData) {
        return cachedData;
      }
      
      throw error;
    }
  }

  static async cacheWeatherData(data: WeatherForecast): Promise<void> {
    try {
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
      await AsyncStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
    } catch (error) {
      console.error('Failed to cache weather data:', error);
    }
  }

  static async getCachedWeatherData(): Promise<WeatherForecast | null> {
    try {
      const cachedData = await AsyncStorage.getItem(CACHE_KEY);
      const timestampStr = await AsyncStorage.getItem(CACHE_TIMESTAMP_KEY);
      
      if (!cachedData || !timestampStr) {
        return null;
      }

      const timestamp = parseInt(timestampStr, 10);
      const now = Date.now();
      
      // Check if cache is still valid (within cache duration)
      if (now - timestamp > CACHE_DURATION) {
        return null;
      }

      return JSON.parse(cachedData);
    } catch (error) {
      console.error('Failed to get cached weather data:', error);
      return null;
    }
  }

  static async clearCache(): Promise<void> {
    try {
      await AsyncStorage.removeItem(CACHE_KEY);
      await AsyncStorage.removeItem(CACHE_TIMESTAMP_KEY);
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  }
}