import React from 'react';
import {Alert, Text, View} from 'react-native';
import {styles, color} from './style';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

// https://daveceddia.com/useeffect-vs-uselayouteffect/
// https://kentcdodds.com/blog/useeffect-vs-uselayouteffect
// useEffect - this runs after react renders your component and ensures that your effect callback does not block browser painting
// useLayoutEffect - if your effect is mutating the DOM (via a DOM node ref) and the DOM mutation will change the appearance of
//   the DOM node between the time that it is rendered and your effect mutates it, then you don't want to use useEffect. You'll
//   want to use useLayoutEffect. Otherwise the user could see a flicker when your DOM mutations take effect. This is pretty much
//   the only time you want to avoid useEffect and use useLayoutEffect instead.

export const DemoUseStateView = () => {
  type State = 'Welcome' | 'Order Placed' | 'Food Consumed' | 'Bill Paid';
  const [state, setState] = React.useState<State>('Welcome');

  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    console.log('DemoUseStateView useLayoutEffect')

    navigation.setOptions({
      title: 'Virtual Restaurant',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation]);

  React.useEffect(() => {
    console.log(
      'DemoUseStateView componentDidMount -- this is true only when the dependencies is []',
    );

    return () => {
      console.log('DemoUseStateView componentWillUnmount');
    };
  }, []);

  React.useEffect(() => {
    console.log('DemoUseStateView componentDidUpdate');

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
