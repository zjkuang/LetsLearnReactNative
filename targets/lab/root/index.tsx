/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, View, Text, Alert} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import messaging from '@react-native-firebase/messaging';
import {
  initializeFirebase,
  getCloudMessagingToken,
} from '../../../services/Firebase';
import {requestUserPermission} from '../../../services/Firebase/messaging';
import {DrawerScreen} from '../screens/drawer';
import {SignInNavigator} from '../screens/login/sign-in';
import {ModalScreen, ModalScreenParamList} from '../screens/modal';
import {ExampleContextProvider} from '../context/example-context';
import {BannerMask} from '../components/banner-mask';
import {modalControl} from './style';
import {styles} from '../screens/primary/anna/anna-details/style';

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

  const [firebaseInitialized, setFirebaseInitialized] = React.useState(false);

  React.useEffect(() => {
    if (!firebaseInitialized) {
      initializeFirebase().then(() => {
        setFirebaseInitialized(true);
        requestUserPermission()
          .catch(_reason => {})
          .finally(() => {
            getCloudMessagingToken()
              .then(token => {
                console.log('getCloudMessagingToken():', token);
              })
              .catch(reason => {
                console.log(
                  'getCloudMessagingToken() failed.',
                  JSON.stringify(reason),
                );
              });
          });
      });
    }
  }, [firebaseInitialized]);

  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('Firebase Cloud Message', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {firebaseInitialized ? (
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
      ) : (
        <View style={styles.baseView}>
          <Text>Initializing Firebase...</Text>
        </View>
      )}
    </SafeAreaView>
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
