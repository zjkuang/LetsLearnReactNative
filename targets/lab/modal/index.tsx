import React from 'react';
import {View} from 'react-native';
import {RootStackParamList} from '../root';
import {StackScreenProps, TransitionPresets} from '@react-navigation/stack';
import {AboutView} from '../components/children/navigation/drawer/about';
import {RootStackModalView} from '../components/children/screens/root-stack-modal/modal';
import {TranslucentOverlay} from '../components/overlay';

export type ModalViewParamList = {
  context?: 'about' | 'rootStackModalDemo' | 'translucentOverlay';
  onClose?: Function;
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
  React.useEffect(() => {
    if (route.params?.context === 'translucentOverlay') {
      navigation.setOptions({
        headerShown: false,
        cardStyle: {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
        cardOverlayEnabled: true,
        headerStatusBarHeight: 0,
        ...TransitionPresets.ModalTransition,
      });
    } else {
      navigation.setOptions({
        title: 'Modal',
        headerTitleStyle: {
          alignSelf: 'center',
        },
      });
    }
  }, [navigation, route.params]);

  const onCloseTranslucentOverlay = React.useCallback(() => {
    navigation.goBack();
    if (route.params?.onClose) {
      route.params?.onClose();
    }
  }, [navigation, route.params]);

  if (route.params?.context === 'about') {
    return <AboutView />;
  } else if (route.params?.context === 'rootStackModalDemo') {
    return <RootStackModalView />;
  } else if (route.params?.context === 'translucentOverlay') {
    return <TranslucentOverlay onClose={onCloseTranslucentOverlay} />;
  } else {
    return <View />;
  }
};
