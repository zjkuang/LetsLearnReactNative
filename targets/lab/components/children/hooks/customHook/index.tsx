/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Text, View} from 'react-native';
import {QuickTestButton} from '../../../../../../common/components/widgets';
import {styles} from './style';
import {StackScreenProps} from '@react-navigation/stack';
import {ElsaStackParamList} from '../../../primary/elsa';

const useCustomState = (initialState?: number) => {
  const [customState] = React.useState<number | undefined>(initialState);
  return [customState];
};

type ViewProps = StackScreenProps<ElsaStackParamList, 'UseStateDemo'>;
export const DemoCustomHookView = ({navigation, route}: ViewProps) => {
  const [state] = useCustomState(0);

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
    console.log(`${route.params.name} created/updated`);
  }); // no dependencies provided, it will be executed each time the component is rendered/re-rendered.

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
      <Text>{`Custom Hook: state=${state}`}</Text>
      <QuickTestButton
        title={'Increament'}
        onPress={() => {
          //
        }}
      />
    </View>
  );
};
