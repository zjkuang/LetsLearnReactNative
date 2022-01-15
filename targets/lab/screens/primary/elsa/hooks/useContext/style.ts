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
  horizontalContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalChild: {
    marginHorizontal: 4,
  },
  toggleText: {
    width: 60,
    marginHorizontal: 8,
  },
});

export {styles, commonStyles, positioning, color};
