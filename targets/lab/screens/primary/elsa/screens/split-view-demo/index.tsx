import React from 'react';
import {View} from 'react-native';
import {styles} from './style';
import {StackScreenProps} from '@react-navigation/stack';
import {ElsaNavigationParamList} from '../..';

type ScreenProps = StackScreenProps<ElsaNavigationParamList, 'SplitViewDemo'>;
export const SplitViewDemoScreen = ({navigation}: ScreenProps) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Split View',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation]);

  return <View style={styles.baseView} />;
};
