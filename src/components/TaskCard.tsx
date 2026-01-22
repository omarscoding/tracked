import { Task } from '../types/task';
import { isCompletedToday } from '../utils/streak';
import { getDayKey, formatTimeRemaining } from '../utils/date';

interface TaskCardProps {
  task: Task;
  msUntilMidnight: number;
  onComplete: (id: string) => void;
  onMenuClick: (task: Task) => void;
}

export function TaskCard({ task, msUntilMidnight, onComplete, onMenuClick }: TaskCardProps) {
  const todayKey = getDayKey();
  const completedToday = isCompletedToday(task, todayKey);

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-4"
      style={{ borderLeftColor: task.color, borderLeftWidth: '4px' }}
    >
      {/* Left: Name and streak */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 dark:text-white truncate">{task.name}</h3>
        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
          <span>🔥</span>
          <span>{task.currentStreak} day{task.currentStreak !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Center: Countdown or done message */}
      <div className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
        {completedToday ? (
          <span className="text-green-600 dark:text-green-400 font-medium">Done for today ✓</span>
        ) : (
          <span>{formatTimeRemaining(msUntilMidnight)} left</span>
        )}
      </div>

      {/* Right: Complete button and menu */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onComplete(task.id)}
          disabled={completedToday}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            completedToday
              ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              : 'bg-teal-500 text-white hover:bg-teal-600'
          }`}
        >
          {completedToday ? 'Done' : 'Complete'}
        </button>
        <button
          onClick={() => onMenuClick(task)}
          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          ⋮
        </button>
      </div>
    </div>
  );
}
