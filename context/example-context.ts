import React from 'react';

export type ExampleContextValueType = {
  flag: boolean;
  count: number;
  text: string;
};

export type ExampleContextType = {
  exampleContextValue: ExampleContextValueType;
  setExampleContextValue: Function;
};

export const defaultExampleContext: ExampleContextType = {
  exampleContextValue: {flag: false, count: 0, text: ''},
  setExampleContextValue: () => {},
};

export const ExampleContext = React.createContext<ExampleContextType>(
  defaultExampleContext,
);
