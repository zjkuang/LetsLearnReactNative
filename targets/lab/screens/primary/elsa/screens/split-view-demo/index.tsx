import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {ElsaNavigationParamList} from '../..';
import {styles} from './style';

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

  return (
    <View style={styles.baseView}>
      <Text>Split View</Text>
    </View>
  );
};
