import {StyleSheet} from 'react-native';
import {
  commonStyles,
  positioning,
  color,
} from '../../../../../../../../common/components/style';

const styles = StyleSheet.create({
  component: {
    width: '50%',
    height: '50%',
    backgroundColor: 'yellow',
    ...commonStyles.contentAlignmentCenter,
  },
});

export {styles, commonStyles, positioning, color};
