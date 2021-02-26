/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Alert, Text, View} from 'react-native';
import {styles, color} from './style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {ElsaStackParamList} from '../../../elsa/index';

type ViewProps = StackScreenProps<ElsaStackParamList, 'UseStateDemo'>;
export const DemoUseStateView = ({navigation, route}: ViewProps) => {
  type State = 'Welcome' | 'Order Placed' | 'Food Consumed' | 'Bill Paid';
  const [state, setState] = React.useState<State>('Welcome');

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
    console.log(`${route.params.name} componentDidUpdate`);

    navigation.removeListener('beforeRemove', () => {});
    navigation.addListener('beforeRemove', (e) => {
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
        <TouchableOpacity
          onPress={() => {
            setState('Order Placed');
          }}>
          <Text style={{color: color.iOSButtonColorLightTheme}}>
            Order Food
          </Text>
        </TouchableOpacity>
      )}

      {state === 'Order Placed' && (
        <TouchableOpacity
          onPress={() => {
            setState('Food Consumed');
          }}>
          <Text style={{color: color.iOSButtonColorLightTheme}}>
            Eat The Meal
          </Text>
        </TouchableOpacity>
      )}

      {state === 'Food Consumed' && (
        <TouchableOpacity
          onPress={() => {
            setState('Bill Paid');
          }}>
          <Text style={{color: color.iOSButtonColorLightTheme}}>
            Pay The Bill
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
