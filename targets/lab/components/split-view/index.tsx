import * as React from 'react';
import {View} from 'react-native';
import {styles} from './style';

type SplitViewProp = {
  master: React.ReactNode;
  detail: React.ReactNode;
};
export const SplitView = ({master, detail}: SplitViewProp) => (
  <View style={styles.base}>
    <View style={styles.masterView}>{master}</View>
    <View style={styles.detailView}>{detail}</View>
  </View>
);
