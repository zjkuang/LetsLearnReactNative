import * as React from 'react';
import {Platform} from 'react-native';
import {useSystemBack} from './useSystemBack';

// JavaScript example: https://github.com/zjkuang/react-native-split-view-demo

export const withSystemBackFix = Comp =>
  Platform.select({
    android: React.forwardRef((props, ref) => {
      useSystemBack();

      return <Comp ref={ref} {...props} />;
    }),
    default: Comp,
  });
