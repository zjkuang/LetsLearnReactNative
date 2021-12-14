import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './style';
import {QuickTestButton} from '../../../../../../../../common/components/widgets';
import {useNavigation} from '@react-navigation/native';

export const RootStackModalView = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.baseView}>
      <Text>RootStack Modal (react-navigation)</Text>

      <QuickTestButton
        title={'Dismiss Modal'}
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};
