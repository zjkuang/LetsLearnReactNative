/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Image, View} from 'react-native';
import {styles} from './style';
import {StackScreenProps} from '@react-navigation/stack';
import {ElsaNavigationParamList} from '../..';

// https://daveceddia.com/useeffect-vs-uselayouteffect/
// https://kentcdodds.com/blog/useeffect-vs-uselayouteffect
// useEffect - this runs after react renders your component and ensures that your effect callback does not block browser painting
// useLayoutEffect - if your effect is mutating the DOM (via a DOM node ref) and the DOM mutation will change the appearance of
//   the DOM node between the time that it is rendered and your effect mutates it, then you don't want to use useEffect. You'll
//   want to use useLayoutEffect. Otherwise the user could see a flicker when your DOM mutations take effect. This is pretty much
//   the only time you want to avoid useEffect and use useLayoutEffect instead.

type ScreenProps = StackScreenProps<
  ElsaNavigationParamList,
  'UseLayoutEffectDemo'
>;
export const DemoUseLayoutEffectScreen = ({navigation, route}: ScreenProps) => {
  // setNavigationTitleIn shall be 'useLayoutEffect'
  // If we setNavigationTitleIn 'useEffect', there supposed to be a flicker, but
  //   unfortunately I can't perceive it maybe because my computer is too fast.
  let setNavigationTitleIn: 'useLayoutEffect' | 'useEffect' = 'useLayoutEffect';

  React.useLayoutEffect(() => {
    if (setNavigationTitleIn === 'useLayoutEffect') {
      navigation.setOptions({
        headerTitle: () => <NavigationHeaderTitleImage />,
      });
    }

    return () => {
      console.log(`${route.params.name} useLayoutEffect cleaning up...`);
    };
  }, [navigation]);

  React.useEffect(() => {
    console.log(
      `${route.params.name} componentDidMount -- this is true only when the dependencies is []`,
    );

    if (setNavigationTitleIn === 'useEffect') {
      navigation.setOptions({
        headerTitle: () => <NavigationHeaderTitleImage />,
      });
    }

    return () => {
      console.log(`${route.params.name} componentWillUnmount`);
    };
  }, []);

  return <View style={styles.baseView} />;
};

const NavigationHeaderTitleImage = () => {
  const imageURI = 'https://reactnative.dev/img/tiny_logo.png';
  return <Image source={{uri: imageURI}} style={styles.navigationHeaderIcon} />;
};
