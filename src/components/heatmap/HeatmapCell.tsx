import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { HeatmapDay } from '@/src/hooks';
import { getIntensityColor } from '@/src/utils/color';
import { BORDER_RADIUS } from '@/src/constants/theme';

interface HeatmapCellProps {
  day: HeatmapDay;
  color: string;
  size: number;
  onPress: () => void;
}

export function HeatmapCell({ day, color, size, onPress }: HeatmapCellProps) {
  const backgroundColor = day.isFuture
    ? 'transparent'
    : getIntensityColor(color, day.intensity);

  return (
    <Pressable
      onPress={day.isFuture ? undefined : onPress}
      disabled={day.isFuture}
      style={[
        styles.cell,
        {
          width: size,
          height: size,
          backgroundColor,
          borderWidth: day.isToday ? 1 : 0,
          borderColor: day.isToday ? color : 'transparent',
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  cell: {
    borderRadius: BORDER_RADIUS.sm,
  },
});
