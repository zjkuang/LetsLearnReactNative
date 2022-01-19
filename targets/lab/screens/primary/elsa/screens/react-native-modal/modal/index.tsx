import React from 'react';
import {View, Text, Modal} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {QuickTestButton} from '../../../../../../../../common/components/widgets';
import {InModalNavigator} from './navigation-stack';
import {styles} from './style';

export type ReactNativeModalViewProps = {
  visible: boolean;
  onClose: () => void;
  testInModalNavigation?: boolean;
};
export const ReactNativeModalView = (props: ReactNativeModalViewProps) => {
  return (
    <Modal
      visible={props.visible}
      animationType={'slide'}
      presentationStyle={'pageSheet'}>
      {props.testInModalNavigation ? (
        <InModalNavigator />
      ) : (
        <SafeAreaView>
          <View style={styles.baseView}>
            <Text>Modal (React Native)</Text>

            <QuickTestButton title={'Dismiss Modal'} onPress={props.onClose} />
          </View>
        </SafeAreaView>
      )}
    </Modal>
  );
};
