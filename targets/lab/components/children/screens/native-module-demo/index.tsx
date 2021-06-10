import React from 'react';
import {View, Alert, NativeEventEmitter, NativeModules} from 'react-native';
import {styles} from './style';
import {QuickTestButton} from '../../../../../../common/components/widgets';
import {StackScreenProps} from '@react-navigation/stack';
import {ElsaStackParamList} from '../../../primary/elsa';
import {NativeModuleDemo} from '../../../../native-modules/native-module-demo';

// https://daveceddia.com/useeffect-vs-uselayouteffect/
// https://kentcdodds.com/blog/useeffect-vs-uselayouteffect
// useEffect - this runs after react renders your component and ensures that your effect callback does not block browser painting
// useLayoutEffect - if your effect is mutating the DOM (via a DOM node ref) and the DOM mutation will change the appearance of
//   the DOM node between the time that it is rendered and your effect mutates it, then you don't want to use useEffect. You'll
//   want to use useLayoutEffect. Otherwise the user could see a flicker when your DOM mutations take effect. This is pretty much
//   the only time you want to avoid useEffect and use useLayoutEffect instead.

const nativeEventEmitter = new NativeEventEmitter(NativeModules.NativeDemo);

type ViewProps = StackScreenProps<ElsaStackParamList, 'NativeModuleDemo'>;
export const NativeModuleDemoView = ({navigation}: ViewProps) => {
  type State = 'Welcome' | 'Order Placed' | 'Food Consumed' | 'Bill Paid';

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Native Module',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation]);

  React.useEffect(() => {
    let listener = nativeEventEmitter.addListener('timeOut', event => {
      Alert.alert('TIME OUT (Event)', `${JSON.stringify(event)}`);
    });

    return () => {
      listener.remove();
    };
  }, []);

  const onTestPress = React.useCallback(async (justReject: boolean) => {
    try {
      let result = await NativeModuleDemo.test(
        'test from NativeModuleDemoView',
        justReject,
      );
      Alert.alert('RESOLVE', result);
    } catch (error) {
      Alert.alert(
        'REJECT',
        `error.code='${JSON.stringify(
          error.code,
        )}', error.message='${JSON.stringify(error.message)}'`,
      );
    }
  }, []);

  const onPromiseTimerPress = React.useCallback(async () => {
    let result = await NativeModuleDemo.setTimer(1200, true);
    Alert.alert('TIME OUT (Promise)', `${JSON.stringify(result)}`);
  }, []);

  const onEventTimerPress = React.useCallback(async () => {
    NativeModuleDemo.setTimer(1200, false);
  }, []);

  return (
    <View style={styles.baseView}>
      <QuickTestButton
        title={'Test (Resolve)'}
        onPress={() => {
          onTestPress(false);
        }}
      />
      <QuickTestButton
        title={'Test (Reject)'}
        onPress={() => {
          onTestPress(true);
        }}
      />
      <QuickTestButton
        title={'Timer (Promise)'}
        onPress={onPromiseTimerPress}
      />
      <QuickTestButton title={'Timer (Event)'} onPress={onEventTimerPress} />
    </View>
  );
};
