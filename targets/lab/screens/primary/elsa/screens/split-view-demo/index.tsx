import React from 'react';
import {View, Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {isTablet} from 'react-native-device-info';
import {useSystemBack} from '../../../../../navigation/useSystemBack';
import {SplitView} from '../../../../../components/split-view';
import {ElsaNavigationParamList} from '../..';
import {MasterStackComponent} from './master';
import {DetailsStackComponent} from './details';
import {styles} from './style';

const SplitViewComponent = () => {
  useSystemBack();

  return (
    <SplitView master={MasterStackComponent} detail={DetailsStackComponent} />
  );
};

type ScreenProps = StackScreenProps<ElsaNavigationParamList, 'SplitViewDemo'>;
export const SplitViewDemoScreen = ({navigation}: ScreenProps) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Split View',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation]);

  if (isTablet()) {
    return <SplitViewComponent />;
  }

  return <MasterStackComponent />;
};
