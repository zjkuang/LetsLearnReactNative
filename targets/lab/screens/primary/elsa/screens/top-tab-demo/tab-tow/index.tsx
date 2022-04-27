import React from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {QuickTestButton} from '../../../../../../../../common/components/widgets';
import {NativeModuleDemo} from '../../../../../../native-modules/native-module-demo';
import {styles} from './style';

export const TopTabTwoScreen = () => {
  const [nativeModuleLocalValue, setNativeModuleLocalValue] =
    React.useState<number>();
  const navigation = useNavigation();

  React.useEffect(() => {
    NativeModuleDemo.fetchLocalValue().then(value => {
      setNativeModuleLocalValue(value);
    });
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      NativeModuleDemo.fetchLocalValue().then(value => {
        setNativeModuleLocalValue(value);
      });
    });

    return unsubscribe;
  }, [navigation]);

  const onPressStep = React.useCallback(async (direction: '+' | '-') => {
    const value = await NativeModuleDemo.fetchLocalValue();
    let newValue: number = value + (direction === '+' ? 1 : -1);
    if (newValue < 0) {
      newValue = 0;
    }
    await NativeModuleDemo.putLocalValue(newValue);
    newValue = await NativeModuleDemo.fetchLocalValue();
    setNativeModuleLocalValue(newValue);
  }, []);

  return (
    <View style={styles.baseView}>
      <Text>Two</Text>
      <View style={styles.nativeModuleTestView}>
        <QuickTestButton
          title={'-'}
          onPress={() => {
            onPressStep('-');
          }}
        />
        <Text>{nativeModuleLocalValue}</Text>
        <QuickTestButton
          title={'+'}
          onPress={() => {
            onPressStep('+');
          }}
        />
      </View>
    </View>
  );
};
