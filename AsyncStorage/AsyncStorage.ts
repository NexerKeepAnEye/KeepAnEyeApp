import * as SecureStore from 'expo-secure-store';

export default class StorageService {
  static async set(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error('Error setting value in SecureStore', error);
    }
  }

  static async get(key: string): Promise<string | null> {
    try {
      const value = await SecureStore.getItemAsync(key);
      return value;
    } catch (error) {
      console.error('Error getting value from SecureStore', error);
      return null;
    }
  }

  static async remove(key: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error('Error removing value from SecureStore', error);
    }
  }

  static async storeApiKey(apiKey: string): Promise<void> {
    await StorageService.set('API_KEY', apiKey);
  }

  static async getApiKey(): Promise<string | null> {
    return await StorageService.get('API_KEY');
  }

  static async clearApiKey(): Promise<void> {
    await StorageService.remove('API_KEY');
  }
}
