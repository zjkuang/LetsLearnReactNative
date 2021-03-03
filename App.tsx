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
import {AppContextProvider} from './model/app-context';
import {RootView} from './components/root/index';

const App = () => {
  return (
    <AppContextProvider>
      <RootView />
    </AppContextProvider>
  );
};

export default App;
