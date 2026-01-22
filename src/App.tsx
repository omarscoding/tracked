import { useState } from 'react';
import { Task } from './types/task';
import { useTasks } from './hooks/useTasks';
import { useCountdown } from './hooks/useCountdown';
import { useDarkMode } from './hooks/useDarkMode';
import { TaskCard } from './components/TaskCard';
import { TaskForm } from './components/TaskForm';
import { TaskMenu } from './components/TaskMenu';

function App() {
  const { tasks, addTask, updateTask, deleteTask, completeTask } = useTasks();
  const msUntilMidnight = useCountdown();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [menuTask, setMenuTask] = useState<Task | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Task | null>(null);

  const handleAddTask = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleFormSubmit = (name: string, description: string, color: string) => {
    if (editingTask) {
      updateTask(editingTask.id, { name, description, color });
    } else {
      addTask(name, description, color);
    }
    setShowForm(false);
    setEditingTask(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleMenuClick = (task: Task) => {
    setMenuTask(task);
  };

  const handleMenuEdit = () => {
    if (menuTask) {
      setEditingTask(menuTask);
      setShowForm(true);
    }
    setMenuTask(null);
  };

  const handleMenuDelete = () => {
    if (menuTask) {
      setDeleteConfirm(menuTask);
    }
    setMenuTask(null);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirm) {
      deleteTask(deleteConfirm.id);
    }
    setDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tracked</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-xl"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <button
              onClick={handleAddTask}
              className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 font-medium"
            >
              + Add Task
            </button>
          </div>
        </div>

        {/* Task List */}
        {tasks.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p className="text-lg mb-2">No tasks yet</p>
            <p className="text-sm">Add your first task to start tracking!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                msUntilMidnight={msUntilMidnight}
                onComplete={completeTask}
                onMenuClick={handleMenuClick}
              />
            ))}
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <TaskForm
          task={editingTask}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}

      {/* Menu Modal */}
      {menuTask && (
        <TaskMenu
          task={menuTask}
          onEdit={handleMenuEdit}
          onDelete={handleMenuDelete}
          onClose={() => setMenuTask(null)}
        />
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-sm w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Delete task?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete "{deleteConfirm.name}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
