import React from 'react';
import {View, Text, Modal} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {QuickTestButton} from '../../common/widgets';
import {styles} from './style';

export type AnnaLocalModalViewProps = {
  visible: boolean;
  onClose: () => void;
};
export const AnnaLocalModalView = (props: AnnaLocalModalViewProps) => {
  return (
    <Modal
      visible={props.visible}
      animationType={'slide'}
      presentationStyle={'pageSheet'}>
      <SafeAreaView>
        <View style={styles.baseView}>
          <Text>Anna Local Modal (React Native)</Text>

          <QuickTestButton title={'Dismiss Modal'} onPress={props.onClose} />
        </View>
      </SafeAreaView>
    </Modal>
  );
};
