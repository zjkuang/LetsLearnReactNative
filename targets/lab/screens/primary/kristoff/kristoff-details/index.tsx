import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {QuickTestButton} from '../../../../../../common/components/widgets';
import {styles} from './style';

export type KristoffDetailsScreenProp = {
  test?: string;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const KristoffDetailsScreen = (props: KristoffDetailsScreenProp) => {
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

      {/* https://reactnavigation.org/docs/nesting-navigators/#navigating-to-a-screen-in-a-nested-navigator */}
      <QuickTestButton
        title={"Go To Sven's Details"}
        onPress={() => {
          navigation.navigate('Sven', {
            screen: 'SvenDetails',
          });
        }}
      />
      {/* Deeper nested */}
      <QuickTestButton
        title={"Go To Elsa/Screens/'Top Tab/THREE'"}
        onPress={() => {
          navigation.navigate('Elsa', {
            screen: 'TopTabDemo',
            params: {
              screen: 'Three',
            },
          });
        }}
      />
    </View>
  );
};
