import * as React from 'react';
import {Platform} from 'react-native';
import {useSystemBack} from './useSystemBack';

// JavaScript example: https://github.com/zjkuang/react-native-split-view-demo

export function withSystemBackFix(Comp: React.ElementType) {
  if (Platform.OS === 'android') {
    return React.forwardRef((props, ref) => {
      useSystemBack();
      return <Comp ref={ref} {...props} />;
    });
  }
  return Comp;
}
