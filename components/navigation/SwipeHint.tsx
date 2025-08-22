import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SwipeHintProps {
  currentPage: number;
}

export default function SwipeHint({ currentPage }: SwipeHintProps) {
  const getSwipeText = () => {
    switch (currentPage) {
      case 0:
        return 'Swipe left for details';
      case 1:
        return 'Swipe left for about';
      case 2:
        return 'Swipe right to go back';
      default:
        return 'Swipe to navigate';
    }
  };

  return (
    <View style={styles.fixedSwipeHint}>
      <Text style={styles.swipeText}>
        {getSwipeText()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fixedSwipeHint: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    zIndex: 1000,
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
