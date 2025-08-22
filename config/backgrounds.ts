export const BACKGROUND_IMAGES = {
  // Current default
  default: 'wind-turbine-bg.jpg',
  
  // New options
  oceanSunset: 'backgrounds/ocean-sunset.jpg',
  stormClouds: 'backgrounds/storm-clouds.jpg',
  tropicalBeach: 'backgrounds/tropical-beach.jpg',
  rainWindow: 'backgrounds/rain-window.jpg',
  goldenFields: 'backgrounds/golden-fields.jpg',
  calmOcean: 'backgrounds/calm-ocean.jpg',
  blueSky: 'backgrounds/blue-sky.jpg',
  mountainDawn: 'backgrounds/mountain-dawn.jpg',
  tropicalStorm: 'backgrounds/tropical-storm.jpg',
  caribbeanSunset: 'backgrounds/caribbean-sunset.jpg',
} as const;

export type BackgroundKey = keyof typeof BACKGROUND_IMAGES;

// Background themes and descriptions
export const BACKGROUND_THEMES = {
  default: {
    name: 'Wind Turbine',
    theme: 'Renewable Energy',
    colors: 'Warm sunset, green fields',
    bestFor: 'General use, clean look'
  },
  oceanSunset: {
    name: 'Ocean Sunset',
    theme: 'Marine Weather',
    colors: 'Golden orange, deep blue',
    bestFor: 'Marine forecasts, tide info'
  },
  stormClouds: {
    name: 'Storm Clouds',
    theme: 'Severe Weather',
    colors: 'Dark grays, electric blue',
    bestFor: 'Rain forecasts, weather alerts'
  },
  tropicalBeach: {
    name: 'Tropical Beach',
    theme: 'Tropical Paradise',
    colors: 'Soft pinks, warm yellows',
    bestFor: 'Sunny day forecasts'
  },
  rainWindow: {
    name: 'Rain on Window',
    theme: 'Rainy Weather',
    colors: 'Cool blues, transparent',
    bestFor: 'Rainy day forecasts'
  },
  goldenFields: {
    name: 'Golden Fields',
    theme: 'Rural/Agricultural',
    colors: 'Warm golds, soft greens',
    bestFor: 'General weather info'
  },
  calmOcean: {
    name: 'Calm Ocean',
    theme: 'Peaceful Marine',
    colors: 'Deep purples, soft blues',
    bestFor: 'Calm weather conditions'
  },
  blueSky: {
    name: 'Blue Sky',
    theme: 'Clear Weather',
    colors: 'Bright blues, white clouds',
    bestFor: 'Fair weather forecasts'
  },
  mountainDawn: {
    name: 'Mountain Dawn',
    theme: 'Majestic Landscapes',
    colors: 'Soft pinks, deep purples',
    bestFor: 'Extended outlook sections'
  },
  tropicalStorm: {
    name: 'Tropical Storm',
    theme: 'Severe Weather',
    colors: 'Dark grays, ominous tones',
    bestFor: 'Weather alerts, warnings'
  },
  caribbeanSunset: {
    name: 'Caribbean Sunset',
    theme: 'Tropical Paradise',
    colors: 'Vibrant oranges, deep blues',
    bestFor: 'Trinidad & Tobago theme'
  }
} as const;

// Quick switch function
export const getBackgroundPath = (key: BackgroundKey): string => {
  return BACKGROUND_IMAGES[key];
};

// Get random background
export const getRandomBackground = (): string => {
  const keys = Object.keys(BACKGROUND_IMAGES) as BackgroundKey[];
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return BACKGROUND_IMAGES[randomKey];
};
