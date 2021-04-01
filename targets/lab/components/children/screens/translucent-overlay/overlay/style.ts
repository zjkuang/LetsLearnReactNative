import {StyleSheet} from 'react-native';
import {
  commonStyles,
  positioning,
  color,
} from '../../../../../../../common/components/style';

const styles = StyleSheet.create({
  translucentOverlay: {
    ...commonStyles.fullSize,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    position: 'absolute',
    top: '0%',
    right: '0%',
    marginTop: 8,
    marginRight: 8,
  },
});

export {styles, commonStyles, positioning, color};
