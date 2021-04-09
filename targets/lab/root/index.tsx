/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {SafeAreaView, View, Text} from 'react-native';
import {DrawerView} from '../drawer/index';
import {ModalView, ModalViewParamList} from '../modal/index';
import {styles, modalControl} from './style';
import {
  ExampleContextProvider,
  ExampleContext,
} from '../context/example-context';

const BottomMaskView = () => {
  const {exampleContextValue, setExampleContextValue} = React.useContext(
    ExampleContext,
  );
  if (
    exampleContextValue.bottomMask?.duration &&
    exampleContextValue.bottomMask.duration > 0
  ) {
    setTimeout(() => {
      let newExampleContextValue = {...exampleContextValue};
      if (newExampleContextValue.bottomMask) {
        newExampleContextValue.bottomMask.show = false;
        setExampleContextValue(newExampleContextValue);
      }
    }, exampleContextValue.bottomMask.duration);
  }
  const getBottomMaskCustomStyles = React.useCallback(() => {
    let customStyles = {
      view: {},
      text: {},
    };
    let bottomMask = exampleContextValue.bottomMask;
    if (bottomMask) {
      if (bottomMask.backgroundColor) {
        customStyles.view = {
          backgroundColor: bottomMask.backgroundColor,
        };
      }
      if (bottomMask.textColor) {
        customStyles.text = {
          color: bottomMask.textColor,
        };
      }
    }
    return customStyles;
  }, [exampleContextValue.bottomMask]);
  return (
    <View style={[styles.bottomMaskView, getBottomMaskCustomStyles().view]}>
      <Text style={[styles.bottomMaskText, getBottomMaskCustomStyles().text]}>
        {exampleContextValue.bottomMask?.text ?? ''}
      </Text>
    </View>
  );
};

export type RootStackParamList = {
  Drawer?: {};
  Modal?: ModalViewParamList; // This defines route.params for Modal component
};
export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;
const RootStack = createStackNavigator<RootStackParamList>();
const RootStackView = () => {
  const {exampleContextValue} = React.useContext(ExampleContext);
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
      {exampleContextValue.bottomMask?.show && <BottomMaskView />}
    </>
  );
};

export const RootView = () => {
  return (
    <ExampleContextProvider>
      <RootStackView />
    </ExampleContextProvider>
  );
};
