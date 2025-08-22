import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

interface NavigationDotsProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function NavigationDots({ currentPage, onPageChange }: NavigationDotsProps) {
  return (
    <View style={styles.fixedNavigationDots}>
      <TouchableOpacity onPress={() => onPageChange(0)}>
        <View style={[styles.dot, currentPage === 0 && styles.activeDot]} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPageChange(1)}>
        <View style={[styles.dot, currentPage === 1 && styles.activeDot]} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPageChange(2)}>
        <View style={[styles.dot, currentPage === 2 && styles.activeDot]} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fixedNavigationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 6,
    transition: 'all 0.3s ease',
  },
  activeDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 28,
    borderRadius: 4,
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
  },
});
