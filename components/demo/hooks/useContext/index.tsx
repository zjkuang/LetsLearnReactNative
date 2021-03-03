/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View} from 'react-native';
import {styles} from './style';
import {StackScreenProps} from '@react-navigation/stack';
import {ElsaStackParamList} from '../../../elsa/index';
import {
  ExampleContext,
  ExampleContextValueType,
} from '../../../../model/example-context';

type ViewProps = StackScreenProps<ElsaStackParamList, 'UseContextDemo'>;
export const DemoUseContextView = ({navigation, route}: ViewProps) => {
  const {setExampleContextValue} = React.useContext(ExampleContext);

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

    const exampleContextValue: ExampleContextValueType = {
      flag: true,
      count: 1,
      text: 'hello',
    };
    setExampleContextValue(exampleContextValue);

    return () => {
      console.log(`${route.params.name} componentWillUnmount`);
    };
  }, []);

  return <View style={styles.baseView} />;
};
