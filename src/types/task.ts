/**
 * Predefined color palette for tasks
 */
export type TaskColor =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'pink';

/**
 * Color values mapped to hex codes
 */
export const TASK_COLORS: Record<TaskColor, string> = {
  red: '#EF4444',
  orange: '#F97316',
  yellow: '#EAB308',
  green: '#22C55E',
  teal: '#14B8A6',
  blue: '#3B82F6',
  indigo: '#6366F1',
  purple: '#A855F7',
  pink: '#EC4899',
};

/**
 * Represents a habit/task that the user wants to track
 */
export interface Task {
  id: string;
  name: string;
  description?: string;
  color: TaskColor;
  createdAt: string;
  updatedAt: string;
  archivedAt?: string;
}
