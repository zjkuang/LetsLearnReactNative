import React from 'react';
import {View, Alert, NativeEventEmitter, NativeModules} from 'react-native';
import {styles} from './style';
import {QuickTestButton} from '../../../../../../../common/components/widgets';
import {StackScreenProps} from '@react-navigation/stack';
import {ElsaNavigationParamList} from '../..';
import {
  NativeModuleDemo,
  TimeOutResult,
} from '../../../../../native-modules/native-module-demo';

const nativeEventEmitter = new NativeEventEmitter(NativeModules.NativeDemo);

type ScreenProps = StackScreenProps<
  ElsaNavigationParamList,
  'NativeModuleDemo'
>;
export const NativeModuleDemoScreen = ({navigation}: ScreenProps) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Native Module',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation]);

  React.useEffect(() => {
    let listener = nativeEventEmitter.addListener(
      'timeOut',
      (event: TimeOutResult) => {
        Alert.alert('TIME OUT (Event)', `timeOut: ${event.timeOut}`);
      },
    );

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
      Alert.alert('REJECT', `error='${JSON.stringify(error)}'`);
    }
  }, []);

  const onPromiseTimerPress = React.useCallback(async () => {
    let result = await NativeModuleDemo.setTimer(1200, true);
    Alert.alert('TIME OUT (Promise)', `timeOut: ${result.timeOut}`);
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
