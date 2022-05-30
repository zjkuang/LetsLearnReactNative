import React from 'react';
import {View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {ElsaNavigationParamList} from '..';
import {ExperimentalSectionList} from './sectionlist';
import {styles} from './style';

type ScreenProps = StackScreenProps<ElsaNavigationParamList, 'Experiments'>;
export const ExperimentsScreen = ({navigation}: ScreenProps) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Experiments',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation]);

  return (
    <View style={styles.baseView}>
      <ExperimentalSectionList />
    </View>
  );
};
