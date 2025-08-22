import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PageHeaderProps {
  currentPage: number;
  title?: string;
}

export default function PageHeader({ currentPage, title }: PageHeaderProps) {
  const getPageTitle = () => {
    if (title) return title;
    
    switch (currentPage) {
      case 0:
        return '';
      case 1:
        return 'Weather Details';
      case 2:
        return 'About App';
      default:
        return '';
    }
  };

  return (
    <View style={styles.titleContainer}>
      <Text style={styles.appTitle}>{getPageTitle()}</Text>
      <View style={styles.titleAccent} />
      <Text style={styles.pageIndicator}>
        Page {currentPage + 1} of 3
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  titleAccent: {
    width: 40,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginTop: 8,
    borderRadius: 1,
  },
  pageIndicator: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
