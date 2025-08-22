export interface WeatherForecast {
  id: string;
  forecast_period: string;
  general_synopsis: string;
  forecaster_name: string;
  issue_time: string;
  imageTrin: string;
  imagebago: string;
  
  // Temperature data
  piarco_max: number;
  piarco_min: number;
  piarco_actual_max?: number;
  piarco_actual_min?: number;
  crown_point_max: number;
  crown_point_min: number;
  crown_point_actual_max?: number;
  crown_point_actual_min?: number;
  heat_index_piarco: number;
  heat_index_crown_point: number;
  
  // Marine conditions
  seas_state: string;
  wave_heights_open: string;
  wave_heights_sheltered: string;
  
  // Tide information
  tides_trinidad: TideInfo[];
  tides_tobago: TideInfo[];
  
  // Sun/Moon times
  sunrise_time: string;
  sunset_time: string;
  moonrise_time?: string;
  moonset_time?: string;
  
  // Extended outlook
  outlook_24hr: string;
  outlook_48hr: string;
  outlook_24hr_max_min: string;
  outlook_48hr_max_min: string;
}

export interface TideInfo {
  type: 'high' | 'low';
  time: string;
  height?: string;
}

export interface WeatherError {
  message: string;
  timestamp: string;
}