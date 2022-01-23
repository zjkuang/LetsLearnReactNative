/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native';
import {initializeFirebase} from '../../../services/firebase';
import {requestUserPermission} from '../../../services/permissions';
import {DrawerScreen} from '../screens/drawer';
import {SignInNavigator} from '../screens/login/sign-in';
import {ModalScreen, ModalScreenParamList} from '../screens/modal';
import {ExampleContextProvider} from '../context/example-context';
import {BannerMask} from '../components/banner-mask';
import {modalControl} from './style';

export type RootStackParamList = {
  Drawer?: {};
  SignIn?: {};
  Modal?: ModalScreenParamList; // This defines route.params for Modal component
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

  React.useEffect(() => {
    initializeFirebase().then(() => {
      requestUserPermission();
    });
  }, []);

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <RootStack.Navigator
            headerMode={headerMode}
            mode={mode}
            screenOptions={screenOptions}>
            <RootStack.Screen name="Drawer" component={DrawerScreen} />
            <RootStack.Screen
              name="SignIn"
              children={() => [<SignInNavigator key={0} />]}
            />
            <RootStack.Screen name="Modal" component={ModalScreen} />
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
