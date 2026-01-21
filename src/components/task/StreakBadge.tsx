import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES } from '@/src/constants/theme';

interface StreakBadgeProps {
  streak: number;
  size?: 'sm' | 'md' | 'lg';
}

export function StreakBadge({ streak, size = 'md' }: StreakBadgeProps) {
  const iconSize = size === 'sm' ? 14 : size === 'md' ? 18 : 24;
  const fontSize = size === 'sm' ? FONT_SIZES.sm : size === 'md' ? FONT_SIZES.md : FONT_SIZES.xl;

  return (
    <View style={styles.container}>
      <Ionicons
        name="flame"
        size={iconSize}
        color={streak > 0 ? COLORS.streak : COLORS.textMuted}
      />
      <Text
        style={[
          styles.text,
          { fontSize },
          streak === 0 && styles.textMuted,
        ]}
      >
        {streak}
      </Text>
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
    fontWeight: '700',
    color: COLORS.text,
  },
  textMuted: {
    color: COLORS.textMuted,
  },
});
