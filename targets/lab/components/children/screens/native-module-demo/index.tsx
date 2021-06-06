/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View} from 'react-native';
import {styles} from './style';
import {StackScreenProps} from '@react-navigation/stack';
import {ElsaStackParamList} from '../../../primary/elsa';

// https://daveceddia.com/useeffect-vs-uselayouteffect/
// https://kentcdodds.com/blog/useeffect-vs-uselayouteffect
// useEffect - this runs after react renders your component and ensures that your effect callback does not block browser painting
// useLayoutEffect - if your effect is mutating the DOM (via a DOM node ref) and the DOM mutation will change the appearance of
//   the DOM node between the time that it is rendered and your effect mutates it, then you don't want to use useEffect. You'll
//   want to use useLayoutEffect. Otherwise the user could see a flicker when your DOM mutations take effect. This is pretty much
//   the only time you want to avoid useEffect and use useLayoutEffect instead.

type ViewProps = StackScreenProps<ElsaStackParamList, 'NativeModuleDemo'>;
export const NativeModuleDemoView = ({navigation}: ViewProps) => {
  type State = 'Welcome' | 'Order Placed' | 'Food Consumed' | 'Bill Paid';

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Native Module',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation]);

  return <View style={styles.baseView} />;
};
