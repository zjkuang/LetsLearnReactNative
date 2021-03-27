import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type IconComponentProps = {
  size?: number;
  color?: string;
};

export const IconClose = (props: IconComponentProps) => {
  const name = 'close';
  const size = props.size || 24;
  return <AntDesign name={name} color={props.color} size={size} />;
};

export const IconTableOfContents = (props: IconComponentProps) => {
  const name = 'table-of-contents';
  const size = props.size || 24;
  return <MaterialCommunityIcons name={name} color={props.color} size={size} />;
};
