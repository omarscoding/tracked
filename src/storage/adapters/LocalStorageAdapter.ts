import { StorageAdapter } from '../types';
import { STORAGE_PREFIX } from '@/src/constants/storage';

export class LocalStorageAdapter implements StorageAdapter {
  private getKey(key: string): string {
    return `${STORAGE_PREFIX}${key}`;
  }

  async getItem(key: string): Promise<string | null> {
    try {
      if (typeof window === 'undefined') return null;
      return localStorage.getItem(this.getKey(key));
    } catch (error) {
      console.error('localStorage getItem error:', error);
      return null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      if (typeof window === 'undefined') return;
      localStorage.setItem(this.getKey(key), value);
    } catch (error) {
      console.error('localStorage setItem error:', error);
      throw error;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      if (typeof window === 'undefined') return;
      localStorage.removeItem(this.getKey(key));
    } catch (error) {
      console.error('localStorage removeItem error:', error);
      throw error;
    }
  }
}
