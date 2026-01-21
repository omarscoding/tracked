/**
 * Storage key prefix
 */
export const STORAGE_PREFIX = '@tracked:';

/**
 * Storage keys for different data stores
 */
export const STORAGE_KEYS = {
  TASKS: 'tasks',
  COINS: 'coins',
  SETTINGS: 'settings',
} as const;

/**
 * Current schema version for migrations
 */
export const CURRENT_SCHEMA_VERSION = 1;
