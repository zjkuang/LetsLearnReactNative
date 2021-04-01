import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {IconClose} from '../../../../../../../common/components/icons';
import {styles} from './style';

type TranslucentOverlayProps = {
  onClose: Function;
};
export const TranslucentOverlay = (props: TranslucentOverlayProps) => {
  return (
    <View style={styles.translucentOverlay}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => {
          props.onClose();
        }}>
        <IconClose size={30} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};
