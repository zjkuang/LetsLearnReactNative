/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {RootView} from './components/root/index';
import {
  ExampleContextType,
  ExampleContext,
  ExampleContextValueType,
  defaultExampleContext,
} from './context/example-context';

const App = () => {
  const [
    exampleContextValue,
    setExampleContextValue,
  ] = React.useState<ExampleContextValueType>(
    defaultExampleContext.exampleContextValue,
  );
  const initialExampleContext: ExampleContextType = {
    exampleContextValue: exampleContextValue,
    setExampleContextValue: setExampleContextValue,
  };

  return (
    <ExampleContext.Provider value={initialExampleContext}>
      <RootView />
    </ExampleContext.Provider>
  );
};

export default App;
