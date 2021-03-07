import React from 'react';
import {Text, View} from 'react-native';
import {QuickTestButton} from '../../../common/widgets';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';

export const OlafModalView = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.baseView}>
      <Text>Olaf Modal</Text>

      <QuickTestButton
        title={'Dismiss Modal'}
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};
