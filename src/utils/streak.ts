import { Task } from '../types/task';
import { isSameDay, getYesterdayKey } from './date';

/**
 * Complete a task and update its streak
 * - If already completed today: no change
 * - If completed yesterday: increment streak
 * - Otherwise: reset streak to 1
 */
export function completeTask(task: Task, todayKey: string): Task {
  // Already completed today - no change
  if (task.lastCompletedDate && isSameDay(task.lastCompletedDate, todayKey)) {
    return task;
  }

  const yesterdayKey = getYesterdayKey(todayKey);

  // Completed yesterday - increment streak
  if (task.lastCompletedDate && isSameDay(task.lastCompletedDate, yesterdayKey)) {
    return {
      ...task,
      currentStreak: task.currentStreak + 1,
      lastCompletedDate: todayKey,
    };
  }

  // Otherwise - reset streak to 1
  return {
    ...task,
    currentStreak: 1,
    lastCompletedDate: todayKey,
  };
}

/**
 * Normalize tasks on app load
 * If lastCompletedDate is neither today nor yesterday AND streak > 0: reset streak to 0
 */
export function normalizeTasksForToday(
  tasks: Task[],
  todayKey: string,
  yesterdayKey: string
): Task[] {
  return tasks.map((task) => {
    if (task.currentStreak === 0) return task;
    if (!task.lastCompletedDate) return { ...task, currentStreak: 0 };

    const isToday = isSameDay(task.lastCompletedDate, todayKey);
    const isYesterday = isSameDay(task.lastCompletedDate, yesterdayKey);

    if (!isToday && !isYesterday) {
      return { ...task, currentStreak: 0 };
    }

    return task;
  });
}

/**
 * Check if a task is completed today
 */
export function isCompletedToday(task: Task, todayKey: string): boolean {
  return task.lastCompletedDate !== null && isSameDay(task.lastCompletedDate, todayKey);
}
