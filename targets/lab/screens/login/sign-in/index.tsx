import React from 'react';
import {View, Text} from 'react-native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../../../root';
import {
  MockNavigationHeader,
  QuickTestButton,
} from '../../../../../common/components/widgets';
import {SignUpScreenParamList, SignUpScreen} from '../sign-up';
import {styles} from './style';

// Use Prop (instead of ParamList) to register SignInNavigator to its parent navigator so that in case it is loaded as the first child screen it can receive props
export type SignInNavigatorProp = {
  email?: string;
};
export type SignInNavigationParamList = {
  SignIn?: {}; // navigation root
  SignUp?: SignUpScreenParamList;
  // more navigation children can be added here
};
export type SignInNavitationProp =
  StackNavigationProp<SignInNavigationParamList>;
const SignInStack = createStackNavigator<SignInNavigationParamList>();
export const SignInNavigator = (prop: SignInNavigatorProp) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const onSignInClose = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  return (
    <SignInStack.Navigator>
      <SignInStack.Screen
        name="SignIn"
        children={() => [
          <SignInScreen
            key={0}
            greeting={'Welcome!'}
            email={prop.email}
            onClose={onSignInClose}
          />,
        ]}
      />
      <SignInStack.Screen name="SignUp" component={SignUpScreen} />
    </SignInStack.Navigator>
  );
};

type SignInScreenProp = {
  greeting?: string;
  email?: string;
  onClose: () => void;
};
export const SignInScreen = (prop: SignInScreenProp) => {
  const signInNavigation = useNavigation<SignInNavitationProp>();
  const rootNavigation = useNavigation<RootStackNavigationProp>();
  React.useEffect(() => {
    signInNavigation.setOptions({
      headerShown: false,
      title: 'Sign In',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [signInNavigation]);

  const onCancel = React.useCallback(() => {
    rootNavigation.pop();
  }, [rootNavigation]);

  const onSignUp = React.useCallback(() => {
    signInNavigation.navigate('SignUp');
  }, [signInNavigation]);

  return (
    <View style={styles.baseView}>
      <MockNavigationHeader title={'Sign In'} onCancel={onCancel} />
      {prop.greeting && <Text>{prop.greeting}</Text>}
      <View style={styles.signUpEntrance}>
        <Text>No account yet?</Text>
        <QuickTestButton
          title={'Sign Up'}
          onPress={onSignUp}
          borderless={true}
        />
      </View>
    </View>
  );
};
