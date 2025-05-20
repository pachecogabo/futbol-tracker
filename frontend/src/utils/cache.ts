// utils/cache.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setCache = async (key: string, data: any, ttl: number) => {
  const expiry = Date.now() + ttl * 1000;
  const value = JSON.stringify({ data, expiry });
  await AsyncStorage.setItem(key, value);
};

export const getCache = async (key: string) => {
  const value = await AsyncStorage.getItem(key);
  if (!value) return null;

  const { data, expiry } = JSON.parse(value);
  if (Date.now() > expiry) {
    await AsyncStorage.removeItem(key);
    return null;
  }
  return data;
};
