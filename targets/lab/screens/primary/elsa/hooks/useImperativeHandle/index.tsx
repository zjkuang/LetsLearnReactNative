/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View} from 'react-native';
import {QuickTestButton} from '../../../../../../../common/components/widgets';
import {StackScreenProps} from '@react-navigation/stack';
import {ElsaNavigationParamList} from '../..';
import {MyComponent, MyComponentHandle} from './child-component';
import {styles} from './style';

type ScreenProps = StackScreenProps<
  ElsaNavigationParamList,
  'UseImperativeHandleDemo'
>;
export const DemoUseImperativeHandleScreen = ({
  navigation,
  route,
}: ScreenProps) => {
  const myComponent = React.useRef<MyComponentHandle>(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: `${route.params.title}`,
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation]);

  return (
    <View style={styles.baseView}>
      <QuickTestButton
        title="Increase"
        onPress={() => {
          myComponent.current?.increase();
        }}
      />
      <QuickTestButton
        title="Reset"
        onPress={() => {
          myComponent.current?.reset();
        }}
      />
      <MyComponent ref={myComponent} />
    </View>
  );
};
