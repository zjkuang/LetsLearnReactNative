import React from 'react';
import {View, Text} from 'react-native';
import {QuickTestButton} from '../../../../../../../common/components/widgets';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';

// called by DrawerView/DrawerContent, rootNavigation.navigate('Modal', {context: 'about'});

export type AboutProps = {
  test?: string;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AboutView = (props: AboutProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.baseView}>
      <Text>About</Text>
      <QuickTestButton
        title={'Dismiss'}
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};
