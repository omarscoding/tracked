import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageAdapter } from '../types';
import { STORAGE_PREFIX } from '@/src/constants/storage';

export class AsyncStorageAdapter implements StorageAdapter {
  private getKey(key: string): string {
    return `${STORAGE_PREFIX}${key}`;
  }

  async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(this.getKey(key));
    } catch (error) {
      console.error('AsyncStorage getItem error:', error);
      return null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(this.getKey(key), value);
    } catch (error) {
      console.error('AsyncStorage setItem error:', error);
      throw error;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.getKey(key));
    } catch (error) {
      console.error('AsyncStorage removeItem error:', error);
      throw error;
    }
  }
}
