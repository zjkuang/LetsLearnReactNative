/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './style';

export interface MyComponentHandle {
  increase: () => void;
  reset: () => void;
}
type MyComponentProps = {};
export const MyComponent = React.forwardRef<
  MyComponentHandle,
  MyComponentProps
>((_props, forwardedRef) => {
  const [count, setCount] = React.useState(0);

  React.useImperativeHandle(forwardedRef, () => ({
    increase: () => {
      setCount(count + 1);
    },
    reset: () => {
      setCount(0);
    },
  }));

  return (
    <View style={styles.component}>
      <Text>{count}</Text>
    </View>
  );
});
