import * as React from 'react';
import {BackHandler} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {isTablet} from 'react-native-device-info';

export const useSystemBack = () => {
  const navigation = useNavigation();

  React.useEffect(() => {
    if (!isTablet()) {
      return;
    }

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (navigation == null) {
          return false;
        }

        if (navigation.canGoBack() && navigation.isFocused()) {
          navigation.goBack();

          return true;
        }

        return false;
      },
    );

    return () => subscription.remove();
  }, [navigation]);
};
