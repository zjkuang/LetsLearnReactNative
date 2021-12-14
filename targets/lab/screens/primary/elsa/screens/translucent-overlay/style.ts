import {StyleSheet} from 'react-native';
import {
  commonStyles,
  positioning,
  color,
} from '../../../../../../../common/components/style';

const styles = StyleSheet.create({
  baseView: {
    ...commonStyles.fullSize,
    ...commonStyles.contentAlignmentCenter,
  },
  groupContainter: {
    width: '100%',
    margin: 16,
    padding: 8,
    ...commonStyles.contentAlignmentCenter,
  },
});

export {styles, commonStyles, positioning, color};
