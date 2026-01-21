import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Completion } from '@/src/types';
import { useHeatmapData, HeatmapDay } from '@/src/hooks';
import { HeatmapCell } from './HeatmapCell';
import { HeatmapLegend } from './HeatmapLegend';
import { HeatmapTooltip } from './HeatmapTooltip';
import { COLORS, SPACING, FONT_SIZES } from '@/src/constants/theme';

interface HeatmapProps {
  completions: Completion[];
  taskId?: string;
  taskColor: string;
  weeksToShow?: number;
}

const CELL_SIZE = 10;
const CELL_GAP = 2;
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

export function Heatmap({
  completions,
  taskId,
  taskColor,
  weeksToShow = 26,
}: HeatmapProps) {
  const { weeks, monthLabels } = useHeatmapData(completions, taskId, weeksToShow);
  const [selectedDay, setSelectedDay] = useState<HeatmapDay | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        <View style={styles.dayLabels}>
          {DAY_LABELS.map((label, idx) => (
            <Text key={idx} style={styles.dayLabel}>
              {label}
            </Text>
          ))}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View>
            <View style={styles.monthLabels}>
              {monthLabels.map(({ month, weekIndex }, idx) => (
                <Text
                  key={`${month}-${idx}`}
                  style={[
                    styles.monthLabel,
                    { left: weekIndex * (CELL_SIZE + CELL_GAP) },
                  ]}
                >
                  {month}
                </Text>
              ))}
            </View>

            <View style={styles.grid}>
              {weeks.map((week) => (
                <View key={week.weekNumber} style={styles.week}>
                  {week.days.map((day) => (
                    <HeatmapCell
                      key={day.date}
                      day={day}
                      color={taskColor}
                      size={CELL_SIZE}
                      onPress={() => setSelectedDay(day)}
                    />
                  ))}
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>

      <HeatmapLegend color={taskColor} />

      {selectedDay && (
        <HeatmapTooltip day={selectedDay} onClose={() => setSelectedDay(null)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  gridContainer: {
    flexDirection: 'row',
  },
  dayLabels: {
    width: 24,
    marginRight: SPACING.xs,
  },
  dayLabel: {
    height: CELL_SIZE + CELL_GAP,
    fontSize: 8,
    color: COLORS.textMuted,
    textAlign: 'right',
  },
  scrollContent: {
    paddingRight: SPACING.md,
  },
  monthLabels: {
    height: 14,
    position: 'relative',
    marginBottom: 2,
  },
  monthLabel: {
    position: 'absolute',
    fontSize: 9,
    color: COLORS.textMuted,
  },
  grid: {
    flexDirection: 'row',
    gap: CELL_GAP,
  },
  week: {
    flexDirection: 'column',
    gap: CELL_GAP,
  },
});
