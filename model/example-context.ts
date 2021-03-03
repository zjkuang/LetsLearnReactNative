import React from 'react';

export type ExampleContextValueType = {
  flag: boolean;
  count: number;
  text: string;
};
type ExampleContextType = {
  exampleContextValue: ExampleContextValueType;
  setExampleContextValue: (value: ExampleContextValueType) => void;
};
const defaultExampleContextValue: ExampleContextValueType = {
  flag: false,
  count: 0,
  text: '',
};
export const ExampleContext = React.createContext<ExampleContextType>({
  exampleContextValue: defaultExampleContextValue,
  setExampleContextValue: () => {},
});
