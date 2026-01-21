import { useMemo } from 'react';
import { useTaskStore } from '@/src/store';
import { calculateStreak, StreakInfo } from '@/src/services/streakService';

/**
 * Hook to get streak information for a task
 */
export function useStreak(taskId: string): StreakInfo {
  const completions = useTaskStore((state) => state.completions);

  return useMemo(
    () => calculateStreak(completions, taskId),
    [completions, taskId]
  );
}
