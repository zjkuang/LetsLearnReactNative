import React from 'react';
import {View, Text} from 'react-native';
import {ViewModel} from './viewmodel';
import {styles} from './style';

type TemplateComponentProps = {
  testID?: string;
  // more props go here
};

export const TemplateComponent = (props: TemplateComponentProps) => {
  const viewModel = React.useMemo(() => {
    return new ViewModel('Hello, world!');
  }, []);

  return (
    <View
      style={[
        styles.fullSize,
        styles.flexContainer,
        styles.alignCenterFlexDirection,
        styles.alignCenterPerpendicularToFlexDirection,
      ]}
      testID={props.testID || ''}>
      <Text>{JSON.stringify(viewModel.dummy)}</Text>
    </View>
  );
};
