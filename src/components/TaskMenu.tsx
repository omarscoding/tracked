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
          className="bg-white rounded-xl shadow-xl max-w-sm w-full p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="font-semibold text-gray-900 mb-4">{task.name}</h3>

          <div className="space-y-2">
            <button
              onClick={onEdit}
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
            >
              Edit task
            </button>
            <button
              onClick={onDelete}
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 font-medium"
            >
              Delete task
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-4 px-4 py-2 text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
