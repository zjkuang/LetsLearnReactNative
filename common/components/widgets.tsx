import React from 'react';
import {View, Text} from 'react-native';
import {commonStyles} from './style';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const FlatListItemSeparator = () => {
  return <View style={commonStyles.horizontalSeparator} />;
};

export type QuickTestButtonProps = {
  title: string;
  onPress: () => void;
  borderless?: boolean;
};
export const QuickTestButton = (props: QuickTestButtonProps) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text
        style={
          props.borderless
            ? commonStyles.quickTestButtonBorderless
            : commonStyles.quickTestButton
        }>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export type MockNavigationHeaderProps = {
  onCancel: () => void;
  title?: string;
};
export const MockNavigationHeader = (props: MockNavigationHeaderProps) => {
  return (
    <View style={commonStyles.mockNavigationHeader}>
      {props.title && (
        <View style={commonStyles.mockNavigationHeaderTitleContainer}>
          <Text>{props.title}</Text>
        </View>
      )}
      <View style={commonStyles.mockNavigationHeaderBottomLine} />
      <View style={commonStyles.mockNavigationHeaderCancelButton}>
        <QuickTestButton
          title={'Cancel'}
          onPress={props.onCancel}
          borderless={true}
        />
      </View>
    </View>
  );
};
