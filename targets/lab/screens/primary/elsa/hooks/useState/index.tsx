/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Alert, Text, View} from 'react-native';
import {QuickTestButton} from '../../../../../../../common/components/widgets';
import {styles} from './style';
import {StackScreenProps} from '@react-navigation/stack';
import {ElsaNavigationParamList} from '../..';

type ScreenProps = StackScreenProps<ElsaNavigationParamList, 'UseStateDemo'>;
export const DemoUseStateScreen = ({navigation, route}: ScreenProps) => {
  type State = 'Welcome' | 'Order Placed' | 'Food Consumed' | 'Bill Paid';
  const [state, setState] = React.useState<State>('Welcome');

  // substates show that changing several states at a time will not cause multiple re-rendering
  const [substate1, setSubstate1] = React.useState(0);
  const [substate2, setSubstate2] = React.useState(0);
  const [substate3, setSubstate3] = React.useState(0);

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

  React.useEffect(() => {
    console.log('one or more substates changed');
  }, [substate1, substate2, substate3]);

  React.useEffect(() => {
    console.log(`${route.params.name} componentDidUpdate`);

    navigation.removeListener('beforeRemove', () => {});
    navigation.addListener('beforeRemove', e => {
      if (state === 'Welcome' || state === 'Bill Paid') {
        return;
      }

      e.preventDefault();

      Alert.alert('WAIT!!!', "You haven't paid the bill yet.", [
        {text: 'Sorry, I forgot.', style: 'cancel', onPress: () => {}},
      ]);
    });
  }, [navigation, state]);

  return (
    <View style={styles.baseView}>
      <Text>Virtual Restaurant</Text>
      <Text>{state}</Text>

      {state === 'Welcome' && (
        <QuickTestButton
          title={'Order Food'}
          onPress={() => {
            setState('Order Placed');

            // changing all the substates won't cause multiple re-rendering
            setSubstate1(substate1 + 1);
            setSubstate2(substate2 + 1);
            setSubstate3(substate3 + 1);
          }}
        />
      )}

      {state === 'Order Placed' && (
        <QuickTestButton
          title={'Eat The Meal'}
          onPress={() => {
            setState('Food Consumed');

            // changing all the substates won't cause multiple re-rendering
            setSubstate1(substate1 + 1);
            setSubstate2(substate2 + 1);
            setSubstate3(substate3 + 1);
          }}
        />
      )}

      {state === 'Food Consumed' && (
        <QuickTestButton
          title={'Pay The Bill'}
          onPress={() => {
            setState('Bill Paid');

            // changing all the substates won't cause multiple re-rendering
            setSubstate1(substate1 + 1);
            setSubstate2(substate2 + 1);
            setSubstate3(substate3 + 1);
          }}
        />
      )}
    </View>
  );
};
