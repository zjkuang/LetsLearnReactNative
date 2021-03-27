import React from 'react';
import {View} from 'react-native';
import {RootStackParamList} from '../root/index';
import {StackScreenProps} from '@react-navigation/stack';
import {AboutView} from '../components/children/about/index';
import {AnnaModalView} from '../components/children/modal-views/anna-modal';
import {OlafModalView} from '../components/children/modal-views/olaf-modal';

export type ModalViewParamList = {
  context?: 'about' | 'anna' | 'olaf';
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
  } else if (route.params?.context === 'anna') {
    return <AnnaModalView />;
  } else if (route.params?.context === 'olaf') {
    return <OlafModalView />;
  } else {
    return <View />;
  }
};
