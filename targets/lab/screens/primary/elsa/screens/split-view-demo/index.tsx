import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {isTablet} from 'react-native-device-info';
import {useSystemBack} from '../../../../../navigation/useSystemBack';
import {SplitView} from '../../../../../components/split-view';
import {ElsaNavigationParamList} from '../..';
import {MasterStackComponent} from './master';
import {DetailsStackComponent} from './details';

const SplitViewComponent = () => {
  useSystemBack();

  return (
    <SplitView master={<MasterStackComponent />} detail={<DetailsStackComponent />} />
  );
};

type ScreenProps = StackScreenProps<ElsaNavigationParamList, 'SplitViewDemo'>;
export const SplitViewDemoScreen = ({navigation}: ScreenProps) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  if (isTablet()) {
    return <SplitViewComponent />;
  }

  return <MasterStackComponent />;
};
