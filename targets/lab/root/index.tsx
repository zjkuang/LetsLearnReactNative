/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native';
import {DrawerView} from '../drawer';
import {ModalView, ModalViewParamList} from '../modal';
import {modalControl} from './style';
import {ExampleContextProvider} from '../context/example-context';
import {BannerMask} from '../components/banner-mask';

export type RootStackParamList = {
  Drawer?: {};
  Modal?: ModalViewParamList; // This defines route.params for Modal component
};
export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;
const RootStack = createStackNavigator<RootStackParamList>();
const RootStackView = () => {
  //
  // The top level Navigator must be wrapped with NavigationContainer to be registered in the app
  // `RootStack = createStackNavigator<RootStackParamList>()` ensures that name="MainTab" and name="Modal" are strictly type-checked
  // We can either register multiple modal screens to RootStack, or register one single modal screen which renders variant components
  //   here we choose single modal screen in order to show how to pass parameters to it
  //
  const headerMode: 'float' | 'screen' | 'none' = 'none';
  const {mode, screenOptions} = modalControl();
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <RootStack.Navigator
            headerMode={headerMode}
            mode={mode}
            screenOptions={screenOptions}>
            <RootStack.Screen name="Drawer" component={DrawerView} />
            <RootStack.Screen name="Modal" component={ModalView} />
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

export const RootView = () => {
  return (
    <ExampleContextProvider>
      <RootStackView />
      <BannerMask />
    </ExampleContextProvider>
  );
};
