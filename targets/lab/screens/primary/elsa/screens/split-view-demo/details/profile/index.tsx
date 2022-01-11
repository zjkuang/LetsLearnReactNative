import React from 'react';
import {Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ExampleSplitViewContext} from '../../../../../../../context/example-split-view-context';
import {QuickTestButton} from '../../../../../../../../../common/components/widgets';
import {DetailsNavigationProp} from '..';
import {styles} from './style';

export type ProfileScreenParamList = {
  //
};
export const ProfileScreen = () => {
  const detailsNavigation = useNavigation<DetailsNavigationProp>();
  const {exampleSplitViewContextValue} = React.useContext(
    ExampleSplitViewContext,
  );

  React.useLayoutEffect(() => {
    detailsNavigation.setOptions({
      title: exampleSplitViewContextValue.selectedItemInMain,
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [detailsNavigation, exampleSplitViewContextValue.selectedItemInMain]);

  return (
    <View style={styles.baseView}>
      <Text>Profile</Text>
      <QuickTestButton
        title={'Avatar'}
        onPress={() => {
          detailsNavigation.push('Avatar', {});
        }}
      />
    </View>
  );
};
