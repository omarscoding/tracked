import { useState, useEffect, useCallback } from 'react';
import { Task } from '../types/task';
import { loadTasks, saveTasks } from '../utils/storage';
import { getDayKey, getYesterdayKey } from '../utils/date';
import { completeTask as completeTaskLogic, normalizeTasksForToday } from '../utils/streak';
import { generateId } from '../utils/id';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [initialized, setInitialized] = useState(false);

  // Load and normalize tasks on mount
  useEffect(() => {
    const todayKey = getDayKey();
    const yesterdayKey = getYesterdayKey(todayKey);
    const loadedTasks = loadTasks();
    const normalizedTasks = normalizeTasksForToday(loadedTasks, todayKey, yesterdayKey);

    // Save back if any tasks were normalized
    if (JSON.stringify(loadedTasks) !== JSON.stringify(normalizedTasks)) {
      saveTasks(normalizedTasks);
    }

    setTasks(normalizedTasks);
    setInitialized(true);
  }, []);

  // Save tasks whenever they change (after initial load)
  useEffect(() => {
    if (initialized) {
      saveTasks(tasks);
    }
  }, [tasks, initialized]);

  const addTask = useCallback((name: string, description: string, color: string) => {
    const newTask: Task = {
      id: generateId(),
      name,
      description,
      color,
      currentStreak: 0,
      lastCompletedDate: null,
      createdAt: getDayKey(),
    };
    setTasks((prev) => [...prev, newTask]);
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Pick<Task, 'name' | 'description' | 'color'>>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const completeTask = useCallback((id: string) => {
    const todayKey = getDayKey();
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? completeTaskLogic(task, todayKey) : task))
    );
  }, []);

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    completeTask,
  };
}
