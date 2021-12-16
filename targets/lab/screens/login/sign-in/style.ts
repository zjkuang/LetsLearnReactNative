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
  signUpEntrance: {
    flexDirection: 'row',
    margin: 8,
    alignItems: 'center',
  },
});

export {styles, commonStyles, positioning, color};
