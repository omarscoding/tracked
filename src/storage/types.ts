/**
 * Platform-agnostic storage interface
 * Matches the Zustand StateStorage interface
 */
export interface StorageAdapter {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
}

/**
 * Extended adapter for future sync capabilities
 */
export interface SyncableStorageAdapter extends StorageAdapter {
  sync?: () => Promise<void>;
  getLastSyncTime?: () => Promise<string | null>;
  setLastSyncTime?: (timestamp: string) => Promise<void>;
}
