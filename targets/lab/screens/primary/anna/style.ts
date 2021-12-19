import {StyleSheet} from 'react-native';
import {
  commonStyles,
  positioning,
  color,
} from '../../../../../common/components/style';

const styles = StyleSheet.create({
  baseView: {
    ...commonStyles.fullSize,
    ...commonStyles.contentAlignmentCenter,
  },
  navigationHeaderLeft: {
    left: 8,
  },
});

export {styles, commonStyles, positioning, color};