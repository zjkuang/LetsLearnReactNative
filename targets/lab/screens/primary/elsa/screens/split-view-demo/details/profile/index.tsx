import React from 'react';
import {Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DetailsNavigationProp} from '..';
import {styles} from './style';

export type ProfileScreenParamList = {
  //
};

export const ProfileScreen = () => {
  const detailsNavigation = useNavigation<DetailsNavigationProp>();

  React.useLayoutEffect(() => {
    detailsNavigation.setOptions({
      title: 'Profile',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [detailsNavigation]);

  return (
    <View style={styles.baseView}>
      <Text>Profile</Text>
    </View>
  );
};
