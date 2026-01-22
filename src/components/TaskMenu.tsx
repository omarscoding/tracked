import { Task } from '../types/task';

interface TaskMenuProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export function TaskMenu({ task, onEdit, onDelete, onClose }: TaskMenuProps) {
  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-25" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-sm w-full p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{task.name}</h3>

          <div className="space-y-2">
            <button
              onClick={onEdit}
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium"
            >
              Edit task
            </button>
            <button
              onClick={onDelete}
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 font-medium"
            >
              Delete task
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-4 px-4 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
