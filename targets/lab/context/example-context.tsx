import React from 'react';
import {
  preferencesKeys,
  savePreferenceObject,
  getPreferenceObject,
} from '../../../services/async-storage';

// https://medium.com/technofunnel/usecontext-in-react-hooks-aa9a60b8a461
//   “useContext” hook is used to create common data that can be accessed throughout the component hierarchy without passing the props down manually to each level.
//   Context defined will be available to all the child components without involving “props”.

// Inspired by
//   https://www.carlrippon.com/react-context-with-typescript-p1/
//   https://www.carlrippon.com/react-context-with-typescript-p2/

export type Language = 'English' | 'French';
export type ExampleContextBackgroundColor = 'transparent' | 'cyan' | 'pink';
export const exampleContextGetNextColorForBackground = (
  current: ExampleContextBackgroundColor,
): ExampleContextBackgroundColor => {
  if (current === 'transparent') {
    return 'cyan';
  }
  if (current === 'cyan') {
    return 'pink';
  }
  if (current === 'pink') {
    return 'transparent';
  }
  return 'transparent';
};

type ExampleContextValueType = {
  persisted: boolean | undefined;
  count: number;
  text: string;
  language: Language;
  backgroundColor: ExampleContextBackgroundColor;
  bannerMask:
    | {
        show: boolean;
        text?: string;
        backgroundColor?: string;
        textColor?: string;
        position?: 'bottom' | 'top';
      }
    | undefined;
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
    backgroundColor: 'cyan',
    bannerMask: undefined,
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
      persistedExampleContextValue.bannerMask = undefined;
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
