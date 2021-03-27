import React from 'react';
import {View, Text} from 'react-native';
import {commonStyles} from './style';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const FlatListItemSeparator = () => {
  return <View style={commonStyles.horizontalSeparator} />;
};

export type QuickTestButtonProps = {
  title: string;
  onPress?: () => void;
};
export const QuickTestButton = (props: QuickTestButtonProps) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text style={commonStyles.textAs_iOS_Button}>{props.title}</Text>
    </TouchableOpacity>
  );
};
