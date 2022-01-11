import React from 'react';

// https://medium.com/technofunnel/usecontext-in-react-hooks-aa9a60b8a461
//   “useContext” hook is used to create common data that can be accessed throughout the component hierarchy without passing the props down manually to each level.
//   Context defined will be available to all the child components without involving “props”.

// Inspired by
//   https://www.carlrippon.com/react-context-with-typescript-p1/
//   https://www.carlrippon.com/react-context-with-typescript-p2/

type ExampleSplitViewContextValueType = {
  selectedItemInMain: string | undefined;
};

type ExampleSplitViewContextType = {
  exampleSplitViewContextValue: ExampleSplitViewContextValueType;
  setExampleSplitViewContextValue: Function;
};

const defaultExampleSplitViewContext: ExampleSplitViewContextType = {
  exampleSplitViewContextValue: {
    selectedItemInMain: undefined,
  },
  setExampleSplitViewContextValue: () => {},
};

export const ExampleSplitViewContext =
  React.createContext<ExampleSplitViewContextType>(
    defaultExampleSplitViewContext,
  );

type Props = {
  children: React.ReactNode;
};
export const ExampleSplitViewContextProvider = ({children}: Props) => {
  const [exampleSplitViewContextValue, setExampleSplitViewContextValue] =
    React.useState(defaultExampleSplitViewContext.exampleSplitViewContextValue);

  return (
    <ExampleSplitViewContext.Provider
      value={{exampleSplitViewContextValue, setExampleSplitViewContextValue}}>
      {children}
    </ExampleSplitViewContext.Provider>
  );
};
