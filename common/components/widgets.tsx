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
  disabled?: boolean;
};
export const QuickTestButton = (prop: QuickTestButtonProp) => {
  let style: object = commonStyles.quickTestButton;
  if (prop.borderless) {
    if (prop.disabled) {
      style = commonStyles.quickTestButtonBorderlessDisabled;
    } else {
      style = commonStyles.quickTestButtonBorderless;
    }
  }
  return (
    <TouchableOpacity disabled={!!prop.disabled} onPress={prop.onPress}>
      <Text style={style}>{prop.title}</Text>
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
