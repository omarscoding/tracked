/**
 * Represents a single completion of a task
 */
export interface Completion {
  id: string;
  taskId: string;
  completedAt: string;
  localDate: string;
  note?: string;
  coinsEarned: number;
  streakDay: number;
}

/**
 * Aggregated completion data for heatmap
 */
export interface DayCompletionData {
  date: string;
  count: number;
  taskIds: string[];
}
