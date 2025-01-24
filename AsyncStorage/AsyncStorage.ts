import AsyncStorage from '@react-native-async-storage/async-storage';

export default class StorageService {
    static async set(key: string, value: string): Promise<void> {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.error('Error setting value in AsyncStorage', error);
        }
    }

    static async get(key: string): Promise<string | null> {
        try {
            const value = await AsyncStorage.getItem(key);
            return value;
        } catch (error) {
            console.error('Error getting value from AsyncStorage', error);
            return null;
        }
    }

    static storeApiKey = async (apiKey: string) => {
        await StorageService.set('API_KEY', apiKey);
    };

    static getApiKey = async (): Promise<string | null> => {
        return await StorageService.get('API_KEY');
    };
};
