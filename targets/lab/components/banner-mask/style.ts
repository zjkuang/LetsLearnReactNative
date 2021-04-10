import {StyleSheet} from 'react-native';
import {commonStyles} from '../../../../common/components/style';

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
    height: 24,
    left: 16,
    right: 16,
    top: 16,
    color: 'red',
  },
  topMaskView: {
    position: 'absolute',
    height: 90,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: 'rgba(255, 255, 0, 0.8)',
  },
  topMaskText: {
    position: 'absolute',
    height: 24,
    left: 16,
    right: 16,
    bottom: 8,
    color: 'red',
  },
});

export {styles, commonStyles};
