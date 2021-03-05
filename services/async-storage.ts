// https://react-native-async-storage.github.io/async-storage/docs/install
// yarn add @react-native-async-storage/async-storage

import AsyncStorage from '@react-native-async-storage/async-storage';

export const preferencesKeys = {
  pkExampleContextValue: 'pkExampleContextValue',
};

export const savePreferenceString = async (
  key: string,
  value: string,
): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getPreferenceString = async (
  key: string,
): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const savePreferenceInt = async (
  key: string,
  value: number,
): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, `${value}`);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getPreferenceInt = async (
  key: string,
  defaultValue: number | null = null,
  radix?: number | undefined,
): Promise<number | null> => {
  try {
    const value: string | null = await AsyncStorage.getItem(key);
    return value === null ? defaultValue : parseInt(value, radix);
  } catch (e) {
    console.log(e);
    return defaultValue;
  }
};

export const savePreferenceObject = async (
  key: string,
  value: object,
): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getPreferenceObject = async (
  key: string,
): Promise<object | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value === null ? value : JSON.parse(value);
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const savePreferenceBool = async (
  key: string,
  value: boolean,
): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, `${value}`);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getPreferenceBool = async (
  key: string,
  defaultValue: false | null = null,
): Promise<boolean | null> => {
  try {
    const value: string | null = await AsyncStorage.getItem(key);
    return value === 'true' ? true : defaultValue;
  } catch (e) {
    console.log(e);
    return defaultValue;
  }
};
