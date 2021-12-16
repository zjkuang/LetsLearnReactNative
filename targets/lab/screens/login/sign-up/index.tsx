import React from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SignInNavitationProp} from '../sign-in';
import {styles} from './style';

export type SignUpScreenParamList = {
  email?: string;
};
export const SignUpScreen = () => {
  const navigation = useNavigation<SignInNavitationProp>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Sign Up',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation]);

  return (
    <View style={styles.baseView}>
      <Text>Welcome</Text>
    </View>
  );
};
