import React from 'react';
import {View} from 'react-native';
import {QuickTestButton} from '../../../../../../common/components/widgets';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';

export type SvenDetailsScreenProp = {
  test?: string;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const SvenDetailsScreen = (props: SvenDetailsScreenProp) => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Details',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation]);

  return (
    <View style={styles.baseView}>
      <QuickTestButton
        title={'Go To Kristoff'}
        onPress={() => {
          navigation.navigate('Kristoff');
        }}
      />

      <QuickTestButton
        title={'Go Back'}
        onPress={() => {
          navigation.goBack();
        }}
      />

      <QuickTestButton
        title={'Go To Olaf'}
        onPress={() => {
          navigation.navigate('Olaf');
        }}
      />
    </View>
  );
};
