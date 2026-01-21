import { useMemo } from 'react';
import { Completion } from '@/src/types';
import {
  getLocalDateString,
  subtractDays,
  getDayOfWeek,
  formatDate,
  isFutureDate,
  isToday,
} from '@/src/utils/date';

export interface HeatmapDay {
  date: string;
  intensity: 0 | 1 | 2 | 3 | 4;
  count: number;
  isToday: boolean;
  isFuture: boolean;
}

export interface HeatmapWeek {
  weekNumber: number;
  days: HeatmapDay[];
}

export interface MonthLabel {
  month: string;
  weekIndex: number;
}

interface HeatmapData {
  weeks: HeatmapWeek[];
  maxCount: number;
  monthLabels: MonthLabel[];
}

/**
 * Transform completions into heatmap data structure
 */
export function useHeatmapData(
  completions: Completion[],
  taskId?: string,
  weeksToShow: number = 52
): HeatmapData {
  return useMemo(() => {
    const today = getLocalDateString();
    const todayDow = getDayOfWeek(today);

    // Build completion count map
    const countMap = new Map<string, number>();

    const relevantCompletions = taskId
      ? completions.filter((c) => c.taskId === taskId)
      : completions;

    for (const completion of relevantCompletions) {
      const current = countMap.get(completion.localDate) ?? 0;
      countMap.set(completion.localDate, current + 1);
    }

    // Find max count for intensity scaling
    const counts = Array.from(countMap.values());
    const maxCount = counts.length > 0 ? Math.max(...counts) : 1;

    // Generate weeks
    const weeks: HeatmapWeek[] = [];
    const monthLabels: MonthLabel[] = [];
    let lastMonth = '';

    // Start from today and go back weeksToShow weeks
    // Each week starts on Sunday
    for (let weekIdx = weeksToShow - 1; weekIdx >= 0; weekIdx--) {
      const days: HeatmapDay[] = [];

      for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
        // Calculate the date
        const daysFromToday =
          weekIdx * 7 + (6 - todayDow) - (weeksToShow - 1) * 7 + dayOfWeek;
        const date = subtractDays(today, -daysFromToday);

        const count = countMap.get(date) ?? 0;
        const isFuture = isFutureDate(date);
        const isTodayDate = isToday(date);

        // Track month labels
        const month = formatDate(date, 'MMM');
        const actualWeekIndex = weeksToShow - 1 - weekIdx;
        if (month !== lastMonth && !isFuture && dayOfWeek === 0) {
          monthLabels.push({ month, weekIndex: actualWeekIndex });
          lastMonth = month;
        }

        days.push({
          date,
          intensity: isFuture ? 0 : calculateIntensity(count, maxCount),
          count,
          isToday: isTodayDate,
          isFuture,
        });
      }

      weeks.push({
        weekNumber: weeksToShow - 1 - weekIdx,
        days,
      });
    }

    return { weeks, maxCount, monthLabels };
  }, [completions, taskId, weeksToShow]);
}

function calculateIntensity(
  count: number,
  maxCount: number
): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (maxCount === 1) return 4;

  const ratio = count / maxCount;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}
