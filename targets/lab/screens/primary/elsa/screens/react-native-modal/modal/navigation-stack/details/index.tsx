import React from 'react';
import {View} from 'react-native';
import {QuickTestButton} from '../../../../../../../../../../common/components/widgets';
import {StackScreenProps} from '@react-navigation/stack';
import {InModalNavigationParamList} from '..';
import {styles} from './style';

export type DetailsScreenParamList = {
  generation?: number;
};
type DetailsScreenProps = StackScreenProps<
  InModalNavigationParamList,
  'Details'
>;
export const DetailsScreen = ({navigation, route}: DetailsScreenProps) => {
  const title = React.useMemo(() => {
    return route.params?.generation
      ? `Details(${route.params.generation})`
      : 'Details';
  }, [route.params]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation, title]);

  return (
    <View style={styles.baseView}>
      <QuickTestButton
        title={'Go Back'}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <QuickTestButton
        title={'Clone myself'}
        onPress={() => {
          if (route.params?.generation !== undefined) {
            navigation.push('Details', {
              generation: route.params.generation + 1,
            });
          } else {
            navigation.push('Details', {});
          }
        }}
      />

      <QuickTestButton
        title={'Back to Main immediately'}
        onPress={() => {
          navigation.navigate('Main');
        }}
      />
    </View>
  );
};
