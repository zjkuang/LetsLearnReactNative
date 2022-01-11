import React from 'react';
import {View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ExampleSplitViewContext} from '../../../../../../../context/example-split-view-context';
import {DetailsNavigationProp} from '..';
import {styles} from './style';

export type AvatarScreenParamList = {
  //
};

export const AvatarScreen = () => {
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

  const asset = React.useMemo(() => {
    if (exampleSplitViewContextValue.selectedItemInMain === 'Anna') {
      return require('./Anna.jpg');
    } else if (exampleSplitViewContextValue.selectedItemInMain === 'Kristoff') {
      return require('./Kristoff.jpg');
    } else if (exampleSplitViewContextValue.selectedItemInMain === 'Olaf') {
      return require('./Olaf.jpg');
    } else if (exampleSplitViewContextValue.selectedItemInMain === 'Sven') {
      return require('./Sven.jpg');
    } else {
      return require('./No-Image-Placeholder.png');
    }
  }, [exampleSplitViewContextValue.selectedItemInMain]);

  return (
    <View style={styles.baseView}>
      <Image source={asset} />
    </View>
  );
};
