import React from 'react';
import {View} from 'react-native';
import {QuickTestButton} from '../../../../../../../../common/components/widgets';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';

export type KristoffDetailsViewProp = {
  test?: string;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const KristoffDetailsView = (props: KristoffDetailsViewProp) => {
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
        title={'Go To Anna'}
        onPress={() => {
          navigation.navigate('Anna');
        }}
      />

      <QuickTestButton
        title={'Go Back'}
        onPress={() => {
          navigation.goBack();
        }}
      />

      <QuickTestButton
        title={'Go To Sven'}
        onPress={() => {
          navigation.navigate('Sven');
        }}
      />
    </View>
  );
};
