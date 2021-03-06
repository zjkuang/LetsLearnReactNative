import React from 'react';
import {
  preferencesKeys,
  savePreferenceObject,
  getPreferenceObject,
} from '../services/async-storage';

// Inspired by
//   https://www.carlrippon.com/react-context-with-typescript-p1/
//   https://www.carlrippon.com/react-context-with-typescript-p2/

export type Language = 'English' | 'French';

type ExampleContextValueType = {
  persisted: boolean | undefined;
  count: number;
  text: string;
  language: Language;
};

type ExampleContextType = {
  exampleContextValue: ExampleContextValueType;
  setExampleContextValue: Function;
};

const defaultExampleContext: ExampleContextType = {
  exampleContextValue: {
    persisted: undefined,
    count: 0,
    text: '',
    language: 'English',
  },
  setExampleContextValue: () => {},
};

export const ExampleContext = React.createContext<ExampleContextType>(
  defaultExampleContext,
);

type Props = {
  children: React.ReactNode;
};
export const ExampleContextProvider = ({children}: Props) => {
  const [exampleContextValue, setExampleContextValue] = React.useState(
    defaultExampleContext.exampleContextValue,
  );

  React.useEffect(() => {
    getPreferenceObject(preferencesKeys.pkExampleContextValue).then((value) => {
      if (value === null) {
        setExampleContextValue(defaultExampleContext.exampleContextValue);
      } else {
        let verifiedValue = value as ExampleContextValueType;
        if (verifiedValue === undefined || verifiedValue === null) {
          setExampleContextValue(defaultExampleContext.exampleContextValue);
        } else {
          setExampleContextValue(verifiedValue);
        }
      }
    });
  }, []);

  React.useEffect(() => {
    if (exampleContextValue.persisted === true) {
      let persistedExampleContextValue = {...exampleContextValue};
      persistedExampleContextValue.persisted = undefined;
      savePreferenceObject(
        preferencesKeys.pkExampleContextValue,
        persistedExampleContextValue,
      ).then(() => {
        //
      });
    }
  }, [exampleContextValue]);

  return (
    <ExampleContext.Provider
      value={{exampleContextValue, setExampleContextValue}}>
      {children}
    </ExampleContext.Provider>
  );
};
