/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View} from 'react-native';
import {styles} from './style';
import {StackScreenProps} from '@react-navigation/stack';
import {ElsaStackParamList} from '../../../elsa/index';

// https://daveceddia.com/useeffect-vs-uselayouteffect/
// https://kentcdodds.com/blog/useeffect-vs-uselayouteffect
// useEffect - this runs after react renders your component and ensures that your effect callback does not block browser painting
// useLayoutEffect - if your effect is mutating the DOM (via a DOM node ref) and the DOM mutation will change the appearance of
//   the DOM node between the time that it is rendered and your effect mutates it, then you don't want to use useEffect. You'll
//   want to use useLayoutEffect. Otherwise the user could see a flicker when your DOM mutations take effect. This is pretty much
//   the only time you want to avoid useEffect and use useLayoutEffect instead.

type ViewProps = StackScreenProps<ElsaStackParamList, 'UseLayoutEffectDemo'>;
export const DemoUseLayoutEffectView = ({navigation, route}: ViewProps) => {
  // setNavigationTitleIn shall be 'useLayoutEffect'
  // If we setNavigationTitleIn 'useEffect', there supposed to be a flicker, but
  //   unfortunately I can't perceive it maybe because my computer is too fast.
  let setNavigationTitleIn: 'useLayoutEffect' | 'useEffect' = 'useLayoutEffect';

  React.useLayoutEffect(() => {
    console.log(`${route.params.name} useLayoutEffect`);

    if (setNavigationTitleIn === 'useLayoutEffect') {
      navigation.setOptions({
        title: `${route.params.title}`,
        headerTitleStyle: {
          alignSelf: 'center',
        },
      });
    }
  }, [navigation]);

  React.useEffect(() => {
    console.log(
      `${route.params.name} componentDidMount -- this is true only when the dependencies is []`,
    );

    if (setNavigationTitleIn === 'useEffect') {
      navigation.setOptions({
        title: `${route.params.title}`,
        headerTitleStyle: {
          alignSelf: 'center',
        },
      });
    }

    return () => {
      console.log(`${route.params.name} componentWillUnmount`);
    };
  }, []);

  return <View style={styles.baseView} />;
};
