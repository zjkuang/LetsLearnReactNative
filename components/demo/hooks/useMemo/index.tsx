/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Alert, View} from 'react-native';
import {QuickTestButton} from '../../../common/widgets';
import {styles} from './style';
import {StackScreenProps} from '@react-navigation/stack';
import {ElsaStackParamList} from '../../../elsa/index';

type ViewProps = StackScreenProps<ElsaStackParamList, 'UseMemoDemo'>;
export const DemoUseMemoView = ({navigation, route}: ViewProps) => {
  React.useLayoutEffect(() => {
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

  const add = (a: number, b: number): number => {
    let c;
    for (let i = 0; i < 10000; i++) {
      console.log(`Calculating... (${i / 100}%)`);
    }
    c = a + b;
    Alert.alert('Addition', `${a} + ${b} = ${c}`);
    return c;
  };
  const memoAdd = React.useMemo(
    () => (a: number, b: number) => {
      let c;
      for (let i = 0; i < 10000; i++) {
        console.log(`Calculating... (${i / 100}%)`);
      }
      c = a + b;
      Alert.alert('Memoized Addition', `${a} + ${b} = ${c}`);
      return c;
    },
    [],
  );

  const method: 'Add' | 'Memoized Add' = 'Memoized Add';

  return (
    <View style={styles.baseView}>
      <QuickTestButton
        title={'Add 2 to 3'}
        onPress={() => {
          if (method === 'Memoized Add') {
            memoAdd(2, 3);
          } else {
            add(2, 3);
          }
        }}
      />

      <QuickTestButton
        title={'Add 7 to 11'}
        onPress={() => {
          if (method === 'Memoized Add') {
            memoAdd(7, 11);
          } else {
            add(7, 11);
          }
        }}
      />
    </View>
  );
};
