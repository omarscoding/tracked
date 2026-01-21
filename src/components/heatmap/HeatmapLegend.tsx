import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getIntensityColor } from '@/src/utils/color';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '@/src/constants/theme';

interface HeatmapLegendProps {
  color: string;
}

export function HeatmapLegend({ color }: HeatmapLegendProps) {
  const intensities: (0 | 1 | 2 | 3 | 4)[] = [0, 1, 2, 3, 4];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Less</Text>
      <View style={styles.squares}>
        {intensities.map((intensity) => (
          <View
            key={intensity}
            style={[
              styles.square,
              { backgroundColor: getIntensityColor(color, intensity) },
            ]}
          />
        ))}
      </View>
      <Text style={styles.label}>More</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: SPACING.sm,
    gap: SPACING.xs,
  },
  label: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textMuted,
  },
  squares: {
    flexDirection: 'row',
    gap: 2,
  },
  square: {
    width: 10,
    height: 10,
    borderRadius: BORDER_RADIUS.sm,
  },
});
