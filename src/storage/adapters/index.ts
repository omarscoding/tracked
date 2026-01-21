import { Platform } from 'react-native';
import { StorageAdapter } from '../types';
import { AsyncStorageAdapter } from './AsyncStorageAdapter';
import { LocalStorageAdapter } from './LocalStorageAdapter';

let storageAdapter: StorageAdapter | null = null;

export function getStorageAdapter(): StorageAdapter {
  if (storageAdapter) return storageAdapter;

  if (Platform.OS === 'web') {
    storageAdapter = new LocalStorageAdapter();
  } else {
    storageAdapter = new AsyncStorageAdapter();
  }

  return storageAdapter;
}

/**
 * Get storage interface for Zustand's createJSONStorage
 */
export function getZustandStorage() {
  const adapter = getStorageAdapter();
  return {
    getItem: adapter.getItem.bind(adapter),
    setItem: adapter.setItem.bind(adapter),
    removeItem: adapter.removeItem.bind(adapter),
  };
}
