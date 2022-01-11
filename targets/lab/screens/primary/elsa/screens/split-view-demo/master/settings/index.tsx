import React from 'react';
import {Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {MasterNavigationProp} from '..';
import {styles} from './style';

export type SettingsScreenParamList = {
  //
};

export const SettingsScreen = () => {
  const masterNavigation = useNavigation<MasterNavigationProp>();

  React.useLayoutEffect(() => {
    masterNavigation.setOptions({
      title: 'Settings',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [masterNavigation]);

  return (
    <View style={styles.baseView}>
      <Text>Settings (Main)</Text>
    </View>
  );
};
