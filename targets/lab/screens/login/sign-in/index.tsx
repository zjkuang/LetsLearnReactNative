import React from 'react';
import {View, Text, TextInput, Alert} from 'react-native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import validator from 'validator';
import {RootStackNavigationProp} from '../../../root';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  MockNavigationHeader,
  QuickTestButton,
} from '../../../../../common/components/widgets';
import {signIn} from '../../../models';
import {SignUpScreenParamList, SignUpScreen} from '../sign-up';
import {commonStyles, styles} from './style';

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
const SignInScreen = (prop: SignInScreenProp) => {
  const signInNavigation = useNavigation<SignInNavitationProp>();
  const [email, setEmail] = React.useState('');
  const [codeSent, setCodeSent] = React.useState(false);
  const [signInResult, setSignInResult] = React.useState('');
  const [code, setCode] = React.useState('');

  React.useEffect(() => {
    signInNavigation.setOptions({
      headerShown: false,
    });
  }, [signInNavigation]);

  const onCancel = React.useCallback(() => {
    prop.onClose();
  }, [prop]);

  const onSignIn = React.useCallback(() => {
    signIn(email)
      .then(message => {
        setSignInResult(message);
        setCodeSent(true);
      })
      .catch(reason => {
        console.log(`*** Sign-in failed. ${JSON.stringify(reason)}`);
        Alert.alert('Oops!', 'Something went wrong with this email.');
      });
  }, [email]);

  const onVerify = React.useCallback(() => {
    //
  }, []);

  const onSignUp = React.useCallback(() => {
    signInNavigation.navigate('SignUp');
  }, [signInNavigation]);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.baseView}>
      <MockNavigationHeader
        title={'Sign In'}
        leftItem={<Text style={commonStyles.iOSButton}>Cancel</Text>}
        onPressLeftItem={onCancel}
      />
      {prop.greeting && <Text style={styles.greeting}>{prop.greeting}</Text>}
      {!codeSent && (
        <View style={styles.emailContainer}>
          <Text style={styles.emailInputLabel}>Email</Text>
          <TextInput
            style={styles.emailInputBox}
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={setEmail}
          />
          <QuickTestButton
            title={'Sign In'}
            onPress={onSignIn}
            borderless={true}
            disabled={!validator.isEmail(email.trim()) || codeSent}
          />
        </View>
      )}
      {codeSent && <Text>{signInResult}</Text>}
      {codeSent && (
        <View style={styles.codeContainer}>
          <Text style={styles.codeInputLabel}>Code</Text>
          <TextInput
            style={styles.codeInputBox}
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={setCode}
          />
          <QuickTestButton
            title={'Submit'}
            onPress={onVerify}
            borderless={true}
            disabled={code.length === 0}
          />
        </View>
      )}
      <View style={styles.signUpEntrance}>
        <Text>No account yet?</Text>
        <QuickTestButton
          title={'Sign Up'}
          onPress={onSignUp}
          borderless={true}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};
