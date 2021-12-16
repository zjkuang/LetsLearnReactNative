import React from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ProfileNavitationProp} from '..';
import {styles} from './style';

export const EdifProfileScreen = () => {
  const navigation = useNavigation<ProfileNavitationProp>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Edit Profile',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation]);

  return (
    <View style={styles.baseView}>
      <Text>To be implemented...</Text>
    </View>
  );
};
