import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCountdown } from '@/src/hooks';
import { COLORS, SPACING, FONT_SIZES } from '@/src/constants/theme';

export function CountdownTimer() {
  const { formatted } = useCountdown();

  return (
    <View style={styles.container}>
      <Ionicons name="time-outline" size={14} color={COLORS.textSecondary} />
      <Text style={styles.text}>{formatted} left</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  text: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
});
