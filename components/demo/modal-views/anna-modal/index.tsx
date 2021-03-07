import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './style';
import {QuickTestButton} from '../../../common/widgets';
import {useNavigation} from '@react-navigation/native';

export const AnnaModalView = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.baseView}>
      <Text>Anna Modal</Text>

      <QuickTestButton
        title={'Dismiss Modal'}
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};
