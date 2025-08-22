# TTMS Weather Alert

A modern, elegant weather application for Trinidad and Tobago providing official weather forecasts from the Trinidad and Tobago Meteorological Service (TTMS).

![TTMS Weather Alert](assets/images/icon.png)

## 🌟 Features

### Core Functionality
- **Real-time Weather Data**: Fetches live weather forecasts from TTMS official API
- **Multi-screen Interface**: Three intuitive screens accessible via swipe navigation
- **Offline Support**: Caches weather data for offline viewing
- **Pull-to-Refresh**: Manual data refresh with visual feedback

### Weather Information
- **Current Conditions**: Temperature, forecast period, and general synopsis
- **Detailed Temperatures**: Min/Max temperatures for Piarco and Crown Point
- **Heat Index**: Real-feel temperature calculations
- **Marine Conditions**: Sea state and wave heights for open waters and sheltered areas
- **Tide Information**: High and low tide times for Trinidad and Tobago
- **Sun & Moon Times**: Official sunrise and sunset times
- **Extended Outlook**: 24-hour and 48-hour weather forecasts

### User Experience
- **Glassmorphism Design**: Modern frosted-glass UI with beautiful backgrounds
- **Swipe Navigation**: Intuitive left/right swipe between screens
- **Responsive Layout**: Optimized for all device sizes
- **Smooth Animations**: Fluid transitions and interactions

## 📱 Screenshots

The app features three main screens:

1. **Weather Screen**: Main forecast display with current conditions
2. **Detailed Weather Screen**: Comprehensive weather data and marine information
3. **About Screen**: App information and developer credits

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ttms-weather-alert
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   expo start
   ```

4. **Run on your device/simulator**
   - Scan the QR code with Expo Go app (mobile)
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Press `w` for web browser

### Building for Production

```bash
# Build for web
npm run build:web

# Build for iOS/Android (requires Expo EAS)
eas build --platform ios
eas build --platform android
```

## 🏗️ Project Structure

```
ttms-weather-alert/
├── app/                          # Expo Router app directory
│   ├── _layout.tsx              # Root layout configuration
│   ├── (tabs)/                  # Tab navigation (hidden in UI)
│   │   ├── _layout.tsx          # Tab layout
│   │   └── index.tsx            # Main app entry point
│   └── +not-found.tsx           # 404 error page
├── assets/                       # Static assets
│   └── images/                  # App images and backgrounds
├── components/                   # Reusable UI components
│   ├── screens/                 # Screen components
│   │   ├── WeatherScreen.tsx    # Main weather display
│   │   ├── DetailedWeatherScreen.tsx # Detailed weather info
│   │   └── AboutScreen.tsx      # About page
│   ├── navigation/              # Navigation components
│   │   ├── NavigationDots.tsx   # Page indicator dots
│   │   └── SwipeHint.tsx        # Swipe navigation hints
│   ├── GlassPanel.tsx           # Glassmorphism panel component
│   ├── LoadingSpinner.tsx       # Loading animation
│   ├── ErrorState.tsx           # Error display component
│   └── index.ts                 # Component exports
├── config/                       # Configuration files
│   └── backgrounds.ts            # Background image configuration
├── hooks/                        # Custom React hooks
│   ├── useWeatherData.ts        # Weather data management
│   ├── useSwipeNavigation.ts    # Swipe gesture handling
│   ├── useFrameworkReady.ts     # Framework initialization
│   └── index.ts                 # Hook exports
├── services/                     # API and external services
│   └── weatherApi.ts            # TTMS weather API integration
├── types/                        # TypeScript type definitions
│   └── weather.ts               # Weather data interfaces
├── utils/                        # Utility functions
│   ├── dateTimeUtils.ts         # Date and time helpers
│   └── index.ts                 # Utility exports
├── app.json                      # Expo configuration
├── package.json                  # Dependencies and scripts
└── tsconfig.json                # TypeScript configuration
```

## 🛠️ Technology Stack

- **Framework**: React Native with Expo SDK 53
- **Language**: TypeScript
- **Navigation**: Expo Router with file-based routing
- **State Management**: React Hooks (useState, useEffect, useCallback)
- **UI Components**: Native React Native components with custom styling
- **Icons**: Lucide React Native icons
- **Fonts**: Inter font family via Expo Google Fonts
- **Storage**: AsyncStorage for offline data caching
- **Styling**: StyleSheet with glassmorphism design patterns

## 🔧 Configuration

### Environment Variables

The app uses the TTMS weather API endpoint:
```
API_ENDPOINT: https://metproducts.gov.tt/api/forecasts
```

### API Integration

The app integrates with the Trinidad and Tobago Meteorological Service API to fetch:
- Current weather forecasts
- Temperature data for Piarco and Crown Point
- Marine conditions and wave heights
- Tide information
- Sunrise/sunset times
- Extended weather outlooks

### Caching Strategy

- **Cache Duration**: 30 minutes
- **Storage**: AsyncStorage for offline access
- **Fallback**: Graceful degradation when API is unavailable

## 🎨 Design System

### Color Palette
- **Primary**: White text on dark backgrounds
- **Accent**: Blue tones (#1E3A8A)
- **Background**: Dynamic weather-themed images with overlay gradients
- **Glass Effect**: Semi-transparent panels with backdrop blur

### Typography
- **Font Family**: Inter (Regular, Medium, SemiBold, Bold)
- **Hierarchy**: Clear size and weight variations for information hierarchy
- **Readability**: High contrast text for optimal visibility

### Layout Principles
- **Single Page Design**: All information accessible through scrolling
- **Card-based Layout**: Information organized in logical, grouped sections
- **Responsive Design**: Adapts to different screen sizes and orientations

## 📱 Platform Support

- **iOS**: iOS 13+ (supports tablets)
- **Android**: API level 21+ (Android 5.0+)
- **Web**: Modern web browsers with React Native Web

## 🔄 Development Workflow

### Code Quality
- **Linting**: ESLint with Expo configuration
- **Type Safety**: Strict TypeScript configuration
- **Component Architecture**: Functional components with hooks
- **Error Handling**: Comprehensive error boundaries and user feedback

### Testing
- **Component Testing**: Individual component testing
- **Hook Testing**: Custom hook validation
- **Integration Testing**: API integration testing

### Performance
- **Optimization**: React.memo and useCallback for performance
- **Lazy Loading**: Efficient image and asset loading
- **Memory Management**: Proper cleanup in useEffect hooks

## 🚀 Deployment

### Expo EAS Build
```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Configure build
eas build:configure

# Build for platforms
eas build --platform all
```

### App Store Deployment
- **iOS**: Submit to App Store Connect via EAS
- **Android**: Upload to Google Play Console
- **Web**: Deploy to hosting service (Vercel, Netlify, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow React Native best practices
- Use TypeScript for all new code
- Maintain consistent code style
- Add proper error handling
- Include TypeScript types for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Surenjanath Singh**
- LinkedIn: [Surenjanath Singh](https://www.linkedin.com/in/surenjanath-singh/)
- Project: TTMS Weather Alert

## 🙏 Acknowledgments

- **TTMS**: Trinidad and Tobago Meteorological Service for providing the weather API
- **Expo Team**: For the excellent React Native development platform
- **React Native Community**: For the robust ecosystem and tools

## 📞 Support

For support, questions, or feature requests:
- Create an issue in the GitHub repository
- Contact the developer via LinkedIn
- Check the documentation for common solutions

---

**Built with ❤️ for Trinidad and Tobago**
