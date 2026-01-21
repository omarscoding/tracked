import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { HeatmapDay } from '@/src/hooks';
import { formatDate } from '@/src/utils/date';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '@/src/constants/theme';

interface HeatmapTooltipProps {
  day: HeatmapDay;
  onClose: () => void;
}

export function HeatmapTooltip({ day, onClose }: HeatmapTooltipProps) {
  return (
    <Pressable style={styles.overlay} onPress={onClose}>
      <View style={styles.tooltip}>
        <Text style={styles.date}>{formatDate(day.date, 'EEEE, MMM d, yyyy')}</Text>
        <Text style={styles.count}>
          {day.count} {day.count === 1 ? 'completion' : 'completions'}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  tooltip: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  date: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  count: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
});
