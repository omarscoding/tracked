import {
  format,
  subDays,
  addDays,
  startOfDay,
  endOfDay,
  differenceInMilliseconds,
  getDay,
  parseISO,
} from 'date-fns';

/**
 * Get current date as ISO timestamp
 */
export function getISOTimestamp(): string {
  return new Date().toISOString();
}

/**
 * Get current date as YYYY-MM-DD in local timezone
 */
export function getLocalDateString(date: Date = new Date()): string {
  return format(date, 'yyyy-MM-dd');
}

/**
 * Subtract days from a date string and return YYYY-MM-DD
 */
export function subtractDays(dateStr: string, days: number): string {
  const date = parseISO(dateStr);
  return format(subDays(date, days), 'yyyy-MM-dd');
}

/**
 * Add days to a date string and return YYYY-MM-DD
 */
export function addDaysToDate(dateStr: string, days: number): string {
  const date = parseISO(dateStr);
  return format(addDays(date, days), 'yyyy-MM-dd');
}

/**
 * Get start of day for a given date
 */
export function getStartOfDay(date: Date): Date {
  return startOfDay(date);
}

/**
 * Get end of day for a given date
 */
export function getEndOfDay(date: Date): Date {
  return endOfDay(date);
}

/**
 * Get milliseconds between two dates
 */
export function getMillisecondsDifference(date1: Date, date2: Date): number {
  return differenceInMilliseconds(date1, date2);
}

/**
 * Get day of week (0 = Sunday, 6 = Saturday)
 */
export function getDayOfWeek(dateStr: string): number {
  return getDay(parseISO(dateStr));
}

/**
 * Format date with custom format
 */
export function formatDate(dateStr: string, formatStr: string): string {
  return format(parseISO(dateStr), formatStr);
}

/**
 * Check if a date string is today
 */
export function isToday(dateStr: string): boolean {
  return dateStr === getLocalDateString();
}

/**
 * Check if a date string is in the future
 */
export function isFutureDate(dateStr: string): boolean {
  return dateStr > getLocalDateString();
}
