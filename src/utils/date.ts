/**
 * Get the day key for a date in local timezone
 * Format: "YYYY-MM-DD"
 */
export function getDayKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Get yesterday's day key from a given day key
 */
export function getYesterdayKey(dayKey: string): string {
  const [year, month, day] = dayKey.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() - 1);
  return getDayKey(date);
}

/**
 * Check if two day keys represent the same day
 */
export function isSameDay(keyA: string, keyB: string): boolean {
  return keyA === keyB;
}

/**
 * Get milliseconds until local midnight
 */
export function getMsUntilMidnight(now: Date = new Date()): number {
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return midnight.getTime() - now.getTime();
}

/**
 * Format milliseconds into "HHh MMm" format
 */
export function formatTimeRemaining(ms: number): string {
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}
