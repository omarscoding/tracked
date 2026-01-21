import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Task, Completion, TaskColor } from '@/src/types';
import { getZustandStorage } from '@/src/storage/adapters';
import { generateId } from '@/src/utils/id';
import { getISOTimestamp, getLocalDateString } from '@/src/utils/date';

interface TaskState {
  tasks: Task[];
  completions: Completion[];

  // Task CRUD
  addTask: (name: string, color: TaskColor, description?: string) => Task;
  updateTask: (
    id: string,
    updates: Partial<Pick<Task, 'name' | 'description' | 'color'>>
  ) => void;
  deleteTask: (id: string) => void;

  // Completion actions
  completeTask: (
    taskId: string,
    coinsEarned: number,
    streakDay: number,
    note?: string
  ) => Completion;

  // Queries
  getTask: (id: string) => Task | undefined;
  getTaskCompletions: (taskId: string) => Completion[];
  getCompletionsForDate: (date: string) => Completion[];
  isTaskCompletedToday: (taskId: string) => boolean;
  getLastCompletionForTask: (taskId: string) => Completion | undefined;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      completions: [],

      addTask: (name, color, description) => {
        const now = getISOTimestamp();
        const newTask: Task = {
          id: generateId(),
          name,
          color,
          description,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ tasks: [...state.tasks, newTask] }));
        return newTask;
      },

      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, ...updates, updatedAt: getISOTimestamp() }
              : task
          ),
        }));
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
          completions: state.completions.filter((c) => c.taskId !== id),
        }));
      },

      completeTask: (taskId, coinsEarned, streakDay, note) => {
        const now = getISOTimestamp();
        const completion: Completion = {
          id: generateId(),
          taskId,
          completedAt: now,
          localDate: getLocalDateString(),
          note,
          coinsEarned,
          streakDay,
        };
        set((state) => ({
          completions: [...state.completions, completion],
        }));
        return completion;
      },

      getTask: (id) => get().tasks.find((t) => t.id === id),

      getTaskCompletions: (taskId) =>
        get().completions.filter((c) => c.taskId === taskId),

      getCompletionsForDate: (date) =>
        get().completions.filter((c) => c.localDate === date),

      isTaskCompletedToday: (taskId) => {
        const today = getLocalDateString();
        return get().completions.some(
          (c) => c.taskId === taskId && c.localDate === today
        );
      },

      getLastCompletionForTask: (taskId) => {
        const completions = get()
          .completions.filter((c) => c.taskId === taskId)
          .sort((a, b) => b.localDate.localeCompare(a.localDate));
        return completions[0];
      },
    }),
    {
      name: 'tracked-tasks',
      storage: createJSONStorage(() => getZustandStorage()),
    }
  )
);
