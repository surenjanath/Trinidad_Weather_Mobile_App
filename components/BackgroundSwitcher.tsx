import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Modal
} from 'react-native';

interface BackgroundOption {
  key: string;
  name: string;
  description: string;
  colors: string;
}

const BACKGROUND_OPTIONS: BackgroundOption[] = [
  {
    key: 'wind-turbine-bg.jpg',
    name: 'Wind Turbine (Current)',
    description: 'Renewable energy theme',
    colors: 'Warm sunset, green fields'
  },
  {
    key: 'backgrounds/ocean-sunset.jpg',
    name: 'Ocean Sunset',
    description: 'Marine weather theme',
    colors: 'Golden orange, deep blue'
  },
  {
    key: 'backgrounds/storm-clouds.jpg',
    name: 'Storm Clouds',
    description: 'Severe weather theme',
    colors: 'Dark grays, electric blue'
  },
  {
    key: 'backgrounds/tropical-beach.jpg',
    name: 'Tropical Beach',
    description: 'Tropical paradise theme',
    colors: 'Soft pinks, warm yellows'
  },
  {
    key: 'backgrounds/rain-window.jpg',
    name: 'Rain on Window',
    description: 'Rainy weather theme',
    colors: 'Cool blues, transparent'
  },
  {
    key: 'backgrounds/golden-fields.jpg',
    name: 'Golden Fields',
    description: 'Rural/Agricultural theme',
    colors: 'Warm golds, soft greens'
  },
  {
    key: 'backgrounds/calm-ocean.jpg',
    name: 'Calm Ocean',
    description: 'Peaceful marine theme',
    colors: 'Deep purples, soft blues'
  },
  {
    key: 'backgrounds/blue-sky.jpg',
    name: 'Blue Sky',
    description: 'Clear weather theme',
    colors: 'Bright blues, white clouds'
  },
  {
    key: 'backgrounds/mountain-dawn.jpg',
    name: 'Mountain Dawn',
    description: 'Majestic landscapes theme',
    colors: 'Soft pinks, deep purples'
  },
  {
    key: 'backgrounds/tropical-storm.jpg',
    name: 'Tropical Storm',
    description: 'Severe weather theme',
    colors: 'Dark grays, ominous tones'
  },
  {
    key: 'backgrounds/caribbean-sunset.jpg',
    name: 'Caribbean Sunset',
    description: 'Tropical paradise theme',
    colors: 'Vibrant oranges, deep blues'
  }
];

interface BackgroundSwitcherProps {
  currentBackground: string;
  onBackgroundChange: (background: string) => void;
}

export default function BackgroundSwitcher({ 
  currentBackground, 
  onBackgroundChange 
}: BackgroundSwitcherProps) {
  const [isVisible, setIsVisible] = useState(false);

  const handleBackgroundSelect = (background: string) => {
    onBackgroundChange(background);
    setIsVisible(false);
  };

  return (
    <>
      {/* Background Switcher Button */}
      <TouchableOpacity 
        style={styles.switcherButton}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.switcherButtonText}>🎨 Switch Background</Text>
      </TouchableOpacity>

      {/* Background Selection Modal */}
      <Modal
        visible={isVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose Background</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setIsVisible(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.optionsList}>
              {BACKGROUND_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.optionItem,
                    currentBackground === option.key && styles.selectedOption
                  ]}
                  onPress={() => handleBackgroundSelect(option.key)}
                >
                  <View style={styles.optionContent}>
                    <Text style={styles.optionName}>{option.name}</Text>
                    <Text style={styles.optionDescription}>{option.description}</Text>
                    <Text style={styles.optionColors}>{option.colors}</Text>
                  </View>
                  {currentBackground === option.key && (
                    <Text style={styles.selectedIndicator}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.modalFooter}>
              <Text style={styles.footerText}>
                💡 Tip: Download unique images from Unsplash.com and save them in the backgrounds folder
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  switcherButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'center',
    marginVertical: 20,
  },
  switcherButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    width: '90%',
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  optionsList: {
    padding: 20,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedOption: {
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    borderColor: '#FF6B6B',
  },
  optionContent: {
    flex: 1,
  },
  optionName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  optionDescription: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 2,
  },
  optionColors: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  selectedIndicator: {
    color: '#FF6B6B',
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 18,
  },
});
