import React from 'react';
import {
  preferencesKeys,
  savePreferenceObject,
  getPreferenceObject,
} from '../services/async-storage';

export type Language = 'English' | 'French';

export type ExampleContextValueType = {
  flag: boolean;
  count: number;
  text: string;
  language: Language;
};

export type ExampleContextType = {
  exampleContextValue: ExampleContextValueType;
  setExampleContextValue: Function;
};

export const defaultExampleContext: ExampleContextType = {
  exampleContextValue: {flag: false, count: 0, text: '', language: 'English'},
  setExampleContextValue: () => {},
};

export const ExampleContext = React.createContext<ExampleContextType>(
  defaultExampleContext,
);

export const saveExampleContextValue = (
  value: ExampleContextValueType,
): Promise<boolean> => {
  return savePreferenceObject(preferencesKeys.pkExampleContextValue, value);
};

export const retrieveExampleContextValue = (
  key: string,
): Promise<object | null> => {
  return getPreferenceObject(key);
};
