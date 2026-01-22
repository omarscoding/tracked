export interface Task {
  id: string;
  name: string;
  description: string;
  color: string;
  currentStreak: number;
  lastCompletedDate: string | null; // "YYYY-MM-DD" or null
  createdAt: string; // "YYYY-MM-DD"
}
