/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Alert, Text, View} from 'react-native';
import {QuickTestButton} from '../../../../../common/components/widgets';
import {styles} from './style';
import {StackScreenProps} from '@react-navigation/stack';
import {ElsaStackParamList} from '../../../elsa/index';

// https://daveceddia.com/useeffect-vs-uselayouteffect/
// https://kentcdodds.com/blog/useeffect-vs-uselayouteffect
// useEffect - this runs after react renders your component and ensures that your effect callback does not block browser painting
// useLayoutEffect - if your effect is mutating the DOM (via a DOM node ref) and the DOM mutation will change the appearance of
//   the DOM node between the time that it is rendered and your effect mutates it, then you don't want to use useEffect. You'll
//   want to use useLayoutEffect. Otherwise the user could see a flicker when your DOM mutations take effect. This is pretty much
//   the only time you want to avoid useEffect and use useLayoutEffect instead.

type ViewProps = StackScreenProps<ElsaStackParamList, 'UseEffectDemo'>;
export const DemoUseEffectView = ({navigation, route}: ViewProps) => {
  type State = 'Welcome' | 'Order Placed' | 'Food Consumed' | 'Bill Paid';
  const [state, setState] = React.useState<State>('Welcome');

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
        <QuickTestButton
          title={'Order Food'}
          onPress={() => {
            setState('Order Placed');
          }}
        />
      )}

      {state === 'Order Placed' && (
        <QuickTestButton
          title={'Eat The Meal'}
          onPress={() => {
            setState('Food Consumed');
          }}
        />
      )}

      {state === 'Food Consumed' && (
        <QuickTestButton
          title={'Pay The Bill'}
          onPress={() => {
            setState('Bill Paid');
          }}
        />
      )}
    </View>
  );
};
