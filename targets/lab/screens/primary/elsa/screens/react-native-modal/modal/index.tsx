import React from 'react';
import {View, Text, Modal} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {QuickTestButton} from '../../../../../../../../common/components/widgets';
import {styles} from './style';

export type ReactNativeModalViewProps = {
  visible: boolean;
  onClose: () => void;
};
export const ReactNativeModalView = (props: ReactNativeModalViewProps) => {
  return (
    <Modal
      visible={props.visible}
      animationType={'slide'}
      presentationStyle={'pageSheet'}>
      <SafeAreaView>
        <View style={styles.baseView}>
          <Text>Modal (React Native)</Text>

          <QuickTestButton title={'Dismiss Modal'} onPress={props.onClose} />
        </View>
      </SafeAreaView>
    </Modal>
  );
};
