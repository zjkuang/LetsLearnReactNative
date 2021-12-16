import React from 'react';
import {View, Text} from 'react-native';
import {commonStyles} from './style';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const FlatListItemSeparator = () => {
  return <View style={commonStyles.horizontalSeparator} />;
};

export type QuickTestButtonProp = {
  title: string;
  onPress: () => void;
  borderless?: boolean;
};
export const QuickTestButton = (prop: QuickTestButtonProp) => {
  return (
    <TouchableOpacity onPress={prop.onPress}>
      <Text
        style={
          prop.borderless
            ? commonStyles.quickTestButtonBorderless
            : commonStyles.quickTestButton
        }>
        {prop.title}
      </Text>
    </TouchableOpacity>
  );
};

export type MockNavigationHeaderProp = {
  title?: string;
  leftItem?: React.ReactNode;
  rightItem?: React.ReactNode;
  onPressLeftItem?: () => void;
  onPressRightItem?: () => void;
};
export const MockNavigationHeader = (prop: MockNavigationHeaderProp) => {
  return (
    <View style={commonStyles.mockNavigationHeader}>
      {prop.title && (
        <View style={commonStyles.mockNavigationHeaderTitleContainer}>
          <Text>{prop.title}</Text>
        </View>
      )}
      <View style={commonStyles.mockNavigationHeaderBottomLine} />
      <View style={commonStyles.mockNavigationHeaderLeftItem}>
        <TouchableOpacity
          onPress={() => {
            prop.onPressLeftItem?.();
          }}>
          {prop.leftItem}
        </TouchableOpacity>
      </View>
      <View style={commonStyles.mockNavigationHeaderRightItem}>
        <TouchableOpacity
          onPress={() => {
            prop.onPressRightItem?.();
          }}>
          {prop.rightItem}
        </TouchableOpacity>
      </View>
    </View>
  );
};
