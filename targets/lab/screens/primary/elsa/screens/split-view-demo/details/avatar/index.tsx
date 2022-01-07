import React from 'react';
import {Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DetailsNavigationProp} from '..';
import {styles} from './style';

export type AvatarScreenParamList = {
  //
};

export const AvatarScreen = () => {
  const detailsNavigation = useNavigation<DetailsNavigationProp>();

  React.useLayoutEffect(() => {
    detailsNavigation.setOptions({
      title: 'Avatar',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [detailsNavigation]);

  return (
    <View style={styles.baseView}>
      <Text>Avatar</Text>
    </View>
  );
};
