import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './style';

export const TopTabThreeView = () => {
  // To make the in-view overlay (TranslucentOverlay) work properly, besides the translucentOverlay style definition, it must be the last one of the immediate child components of the base view in JSX
  return (
    <View style={styles.baseView}>
      <Text>Three</Text>
    </View>
  );
};
