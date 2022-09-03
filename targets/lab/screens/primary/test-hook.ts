import React from 'react';
import {useNavigation} from '@react-navigation/native';

export const useFocusCount = () => {
  const navigation = useNavigation();
  const [focusCount, setFocusCount] = React.useState(0);

  React.useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      console.log('useTest :: Did receive focus. count:'); // R/N equivalent to iOS viewDidAppear
      setFocusCount(focusCount + 1);
    });
    const unsubscribeBlur = navigation.addListener('blur', () => {
      console.log('useTest :: Did lose focus.'); // R/N equivalent to iOS viewDidDisappear
    });

    return () => {
      console.log('useTest :: Destroying focus/blur listeners...');
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [focusCount, navigation]);

  return focusCount;
};
