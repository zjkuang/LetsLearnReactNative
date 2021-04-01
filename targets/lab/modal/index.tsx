import React from 'react';
import {View} from 'react-native';
import {RootStackParamList} from '../root/index';
import {StackScreenProps} from '@react-navigation/stack';
import {AboutView} from '../components/children/navigation/drawer/about/index';
import {RootStackModalView} from '../components/children/screens/root-stack-modal/modal/index';

export type ModalViewParamList = {
  context?: 'about' | 'rootStackModalDemo';
};

// 2 alternative ways to provide navigation and route props:
// (1)
// type ModalViewNavigationProp = StackNavigationProp<RootStackParamList, 'Modal'>; // import {StackNavigationProp} from '@react-navigation/stack';
// type ModalViewRouteProp = RouteProp<RootStackParamList, 'Modal'>; // import {RouteProp} from '@react-navigation/native';
// type ModalViewProps = {
//   navigation: ModalViewNavigationProp;
//   route: ModalViewRouteProp;
// };
// (2)
type ModalViewProps = StackScreenProps<RootStackParamList, 'Modal'>; // import {StackScreenProps} from '@react-navigation/stack';
export const ModalView = ({navigation, route}: ModalViewProps) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Modal',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation]);

  if (route.params?.context === 'about') {
    return <AboutView />;
  } else if (route.params?.context === 'rootStackModalDemo') {
    return <RootStackModalView />;
  } else {
    return <View />;
  }
};
