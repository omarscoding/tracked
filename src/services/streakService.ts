import { Completion } from '@/src/types';
import {
  getLocalDateString,
  subtractDays,
  getEndOfDay,
  getMillisecondsDifference,
} from '@/src/utils/date';

export interface StreakInfo {
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate: string | null;
  isCompletedToday: boolean;
  streakStartDate: string | null;
  nextStreakDay: number;
}

/**
 * Calculate streak information for a task
 */
export function calculateStreak(
  completions: Completion[],
  taskId: string
): StreakInfo {
  const today = getLocalDateString();
  const yesterday = subtractDays(today, 1);

  // Filter completions for this task and sort by date descending
  const taskCompletions = completions
    .filter((c) => c.taskId === taskId)
    .sort((a, b) => b.localDate.localeCompare(a.localDate));

  if (taskCompletions.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastCompletedDate: null,
      isCompletedToday: false,
      streakStartDate: null,
      nextStreakDay: 1,
    };
  }

  const lastCompletion = taskCompletions[0];
  const isCompletedToday = lastCompletion.localDate === today;

  // If last completion was before yesterday, streak is broken
  if (!isCompletedToday && lastCompletion.localDate !== yesterday) {
    return {
      currentStreak: 0,
      longestStreak: calculateLongestStreak(taskCompletions),
      lastCompletedDate: lastCompletion.localDate,
      isCompletedToday: false,
      streakStartDate: null,
      nextStreakDay: 1,
    };
  }

  // Calculate current streak by walking backwards through dates
  let currentStreak = 0;
  let checkDate = isCompletedToday ? today : yesterday;
  let streakStartDate: string | null = null;

  // Get unique completion dates for this task
  const completionDates = new Set(taskCompletions.map((c) => c.localDate));

  while (completionDates.has(checkDate)) {
    currentStreak++;
    streakStartDate = checkDate;
    checkDate = subtractDays(checkDate, 1);
  }

  const longestStreak = Math.max(
    currentStreak,
    calculateLongestStreak(taskCompletions)
  );

  return {
    currentStreak,
    longestStreak,
    lastCompletedDate: lastCompletion.localDate,
    isCompletedToday,
    streakStartDate,
    nextStreakDay: isCompletedToday ? currentStreak : currentStreak + 1,
  };
}

/**
 * Calculate the longest streak in completion history
 */
function calculateLongestStreak(completions: Completion[]): number {
  if (completions.length === 0) return 0;

  const dates = [...new Set(completions.map((c) => c.localDate))].sort();
  let longest = 1;
  let current = 1;

  for (let i = 1; i < dates.length; i++) {
    const prevDate = dates[i - 1];
    const currDate = dates[i];

    // Check if dates are consecutive
    if (subtractDays(currDate, 1) === prevDate) {
      current++;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }

  return longest;
}

/**
 * Calculate time until streak breaks (midnight local time)
 */
export function getTimeUntilStreakBreaks(): {
  hours: number;
  minutes: number;
  seconds: number;
  totalMilliseconds: number;
} {
  const now = new Date();
  const endOfDay = getEndOfDay(now);
  const diff = getMillisecondsDifference(endOfDay, now);

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    hours,
    minutes,
    seconds,
    totalMilliseconds: diff,
  };
}

/**
 * Check if a streak should be reset (called on app open)
 */
export function shouldResetStreak(lastCompletedDate: string | null): boolean {
  if (!lastCompletedDate) return true;

  const today = getLocalDateString();
  const yesterday = subtractDays(today, 1);

  // Streak is valid if completed today or yesterday
  return lastCompletedDate !== today && lastCompletedDate !== yesterday;
}
