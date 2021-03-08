/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './style';
import {StackScreenProps} from '@react-navigation/stack';
import {ElsaStackParamList} from '../../../elsa/index';

type ViewProps = StackScreenProps<ElsaStackParamList, 'UseStateDemo'>;
export const DemoAutoLayoutView = ({navigation, route}: ViewProps) => {
  React.useLayoutEffect(() => {
    console.log(`${route.params.name} useLayoutEffect`);

    navigation.setOptions({
      title: `${route.params.title}`,
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation]);

  React.useEffect(() => {
    console.log(
      `${route.params.name} componentDidMount -- this is true only when the dependencies is []`,
    );

    return () => {
      console.log(`${route.params.name} componentWillUnmount`);
    };
  }, []);

  return (
    <View style={styles.baseView}>
      <View>
        <Text>Test</Text>
      </View>
    </View>
  );
};
