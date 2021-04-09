import {StyleSheet} from 'react-native';
import {
  commonStyles,
  positioning,
  modalControl,
  color,
} from '../../../common/components/style';

const styles = StyleSheet.create({
  baseView: {
    ...commonStyles.fullSize,
    ...commonStyles.contentAlignmentCenter,
  },
  bottomMaskView: {
    position: 'absolute',
    height: 60,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 0, 0.8)',
  },
  bottomMaskText: {
    position: 'absolute',
    height: 28,
    left: 16,
    right: 16,
    bottom: 16,
  },
});

export {styles, commonStyles, color, positioning, modalControl};
